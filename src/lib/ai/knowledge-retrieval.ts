import { searchKnowledge, KnowledgeItem } from "../knowledge";

export interface RetrievalResult {
  contextText: string;
  sourceItems: KnowledgeItem[];
  primaryLinks: { label: string; url: string }[];
}

export function retrieveRelevantKnowledge(query: string): RetrievalResult {
  const items = searchKnowledge(query, { limit: 5, threshold: 1 });

  if (items.length === 0) {
    return {
      contextText: "No specific match found in current knowledge base.",
      sourceItems: [],
      primaryLinks: [],
    };
  }

  const contextBlocks = items.map((item, idx) => {
    return `[Source ${idx + 1}: ${item.title} (${item.category})] (Link: ${item.sourceUrl})
${item.content}${item.quotes && item.quotes.length > 0 ? `\nVerified Quotes: ${item.quotes.join(" | ")}` : ""}`;
  });

  const primaryLinks = items
    .filter((item) => item.sourceUrl && item.sourceUrl !== "/")
    .slice(0, 3)
    .map((item) => ({
      label: item.title,
      url: item.sourceUrl,
    }));

  return {
    contextText: contextBlocks.join("\n\n---\n\n"),
    sourceItems: items,
    primaryLinks,
  };
}
