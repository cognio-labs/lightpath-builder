import { searchKnowledge, type KnowledgeItem } from "../knowledge";
import { generateEmbedding } from "./embeddings.server";
import { isRagStoreConfigured, searchWebsiteKnowledge } from "./rag-store.server";

export interface PageContext {
  currentUrl?: string;
  currentPage?: string;
  pageTitle?: string;
  pageType?: string;
}

export type ActionKind =
  | "explore_course"
  | "view_event"
  | "register_event"
  | "book_session"
  | "read_article"
  | "view_initiative"
  | "donate"
  | "contact"
  | "open_page";

export interface GuideAction {
  label: string;
  url: string;
  kind: ActionKind;
}

export interface RetrievalResult {
  contextText: string;
  sourceItems: KnowledgeItem[];
  primaryLinks: GuideAction[];
  usedWebsiteIndex: boolean;
}

function actionFor(item: KnowledgeItem): GuideAction {
  const type = item.pageType || item.category.toLowerCase();
  if (type === "course" || item.category === "COURSES") {
    return { label: `Explore ${item.title.replace(/ Course$/, "")}`, url: item.sourceUrl, kind: "explore_course" };
  }
  if (type === "event" || item.category === "EVENTS") {
    return { label: "View event", url: item.sourceUrl, kind: "view_event" };
  }
  if (type === "personal_session" || item.category === "BOOKING") {
    return { label: "Book personal session", url: item.sourceUrl, kind: "book_session" };
  }
  if (type === "initiative" || item.category === "INITIATIVES") {
    return { label: "View initiative", url: item.sourceUrl, kind: "view_initiative" };
  }
  if (type === "article" || item.category === "ARTICLES") {
    return { label: "Read article", url: item.sourceUrl, kind: "read_article" };
  }
  if (type === "contact" || item.category === "CONTACT") {
    return { label: "Contact team", url: item.sourceUrl, kind: "contact" };
  }
  return { label: item.title, url: item.sourceUrl, kind: "open_page" };
}

function normalizedUrl(value?: string): string {
  if (!value) return "";
  try {
    return new URL(value, "https://sciencedivine.org").pathname.replace(/\/$/, "") || "/";
  } catch {
    return value.replace(/\/$/, "") || "/";
  }
}

function mergeResults(
  websiteItems: KnowledgeItem[],
  curatedItems: KnowledgeItem[],
  pageContext?: PageContext,
  limit = 6
): KnowledgeItem[] {
  const currentPath = normalizedUrl(pageContext?.currentUrl);
  const seen = new Set<string>();
  return [...websiteItems, ...curatedItems]
    .map((item) => ({
      ...item,
      sourceKind: item.sourceKind || ("curated" as const),
      score:
        (item.score || 0) +
        (item.sourceKind === "website" ? 1 : 0) +
        (currentPath && normalizedUrl(item.sourceUrl) === currentPath ? 2 : 0),
    }))
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .filter((item) => {
      const key = `${normalizedUrl(item.sourceUrl)}|${item.section || item.title}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, limit);
}

export async function retrieveRelevantKnowledge(
  query: string,
  pageContext?: PageContext
): Promise<RetrievalResult> {
  const contextQuery = [
    query,
    pageContext?.pageTitle,
    pageContext?.pageType,
    pageContext?.currentPage,
  ].filter(Boolean).join(" ");

  const curatedItems = searchKnowledge(contextQuery, { limit: 6, threshold: 1 }).map(
    (item, index) => ({ ...item, sourceKind: "curated" as const, score: 0.5 - index * 0.02 })
  );

  let websiteItems: KnowledgeItem[] = [];
  if (isRagStoreConfigured()) {
    try {
      const embedding = await generateEmbedding(contextQuery);
      websiteItems = await searchWebsiteKnowledge(contextQuery, embedding, 7);
    } catch (error) {
      console.warn("[RAG] Website retrieval unavailable; using curated knowledge.", error);
    }
  }

  const items = mergeResults(websiteItems, curatedItems, pageContext);
  if (items.length === 0) {
    return {
      contextText: "No verified match was found in the available Science Divine resources.",
      sourceItems: [],
      primaryLinks: [],
      usedWebsiteIndex: false,
    };
  }

  const contextBlocks = items.map((item, index) =>
    `[Source ${index + 1}]
Title: ${item.title}
Official URL: ${item.sourceUrl}
Page type: ${item.pageType || item.category.toLowerCase()}
Section: ${item.section || "General"}
Source updated: ${item.updatedAt || "Date not provided"}
Content: ${item.content}`
  );

  const primaryLinks = items
    .filter((item) => item.sourceUrl && item.sourceUrl !== "/")
    .map(actionFor)
    .filter((action, index, actions) => actions.findIndex((candidate) => candidate.url === action.url) === index)
    .slice(0, 3);

  return {
    contextText: contextBlocks.join("\n\n---\n\n"),
    sourceItems: items,
    primaryLinks,
    usedWebsiteIndex: websiteItems.length > 0,
  };
}
