import { createHash } from "node:crypto";
import * as cheerio from "cheerio";
import { generateEmbeddings } from "./embeddings.server";
import { upsertWebsiteChunks, type WebsiteChunk } from "./rag-store.server";

const OFFICIAL_ORIGIN = "https://sciencedivine.org";
const DEFAULT_SITEMAPS = ["/sitemap_index.xml", "/wp-sitemap.xml", "/sitemap.xml"];
const FALLBACK_PATHS = [
  "/", "/about/", "/about-sakshi-shree/", "/courses/", "/events/",
  "/personal-session/", "/initiatives/", "/young-mind-movement/",
  "/project-shiksha-sewa/", "/contact/", "/cancellation-and-refund-policy/",
  "/privacy-policy/", "/terms-and-conditions/",
];

function isOfficialUrl(value: string): boolean {
  try {
    const url = new URL(value, OFFICIAL_ORIGIN);
    return url.protocol === "https:" && url.hostname === "sciencedivine.org";
  } catch {
    return false;
  }
}

async function fetchText(url: string): Promise<{ text: string; updatedAt: string }> {
  const response = await fetch(url, {
    headers: { "User-Agent": "ScienceDivineKnowledgeIndexer/1.0" },
    cache: "no-store",
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) throw new Error(`Fetch ${response.status}: ${url}`);
  return {
    text: await response.text(),
    updatedAt: response.headers.get("last-modified") || new Date().toISOString(),
  };
}

async function discoverUrls(maxPages: number): Promise<string[]> {
  const pages = new Set<string>();
  const sitemapQueue = DEFAULT_SITEMAPS.map((path) => `${OFFICIAL_ORIGIN}${path}`);
  const visitedSitemaps = new Set<string>();

  while (sitemapQueue.length > 0 && pages.size < maxPages) {
    const sitemapUrl = sitemapQueue.shift()!;
    if (visitedSitemaps.has(sitemapUrl)) continue;
    visitedSitemaps.add(sitemapUrl);

    try {
      const { text } = await fetchText(sitemapUrl);
      const $ = cheerio.load(text, { xmlMode: true });
      $("loc").each((_, element) => {
        const loc = $(element).text().trim();
        if (!isOfficialUrl(loc)) return;
        if (loc.endsWith(".xml")) sitemapQueue.push(loc);
        else if (pages.size < maxPages) pages.add(loc);
      });
    } catch {
      // WordPress deployments do not always expose every conventional sitemap path.
    }
  }

  if (pages.size === 0) {
    FALLBACK_PATHS.slice(0, maxPages).forEach((path) => pages.add(`${OFFICIAL_ORIGIN}${path}`));
  }
  return [...pages];
}

function classifyPage(url: string): string {
  const path = new URL(url).pathname.toLowerCase();
  if (path.includes("course") || /design-your-destiny|mind-power|joyful-living|sanjeev/.test(path)) return "course";
  if (path.includes("event")) return "event";
  if (path.includes("session") || path.includes("meet-sakshi")) return "personal_session";
  if (/sewa|initiative|young-mind/.test(path)) return "initiative";
  if (/wisdom|blog|article/.test(path)) return "article";
  if (path.includes("contact")) return "contact";
  if (/refund|policy|terms|privacy/.test(path)) return "policy";
  if (path.includes("sakshi")) return "guruji";
  return "general";
}

function detectLanguage(content: string): WebsiteChunk["language"] {
  const hindi = (content.match(/[\u0900-\u097F]/g) || []).length;
  if (hindi === 0) return "en";
  return hindi / Math.max(content.length, 1) > 0.25 ? "hi" : "mixed";
}

function splitText(text: string, maxChars = 1800): string[] {
  const paragraphs = text.split(/\n+/).map((part) => part.trim()).filter(Boolean);
  const chunks: string[] = [];
  let current = "";
  for (const paragraph of paragraphs) {
    if (current && current.length + paragraph.length + 1 > maxChars) {
      chunks.push(current);
      current = "";
    }
    if (paragraph.length > maxChars) {
      const sentences = paragraph.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [paragraph];
      for (const sentence of sentences) {
        if (current.length + sentence.length > maxChars && current) {
          chunks.push(current.trim());
          current = "";
        }
        current += `${sentence.trim()} `;
      }
    } else {
      current += `${paragraph}\n`;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

function extractChunks(url: string, html: string, updatedAt: string): WebsiteChunk[] {
  const $ = cheerio.load(html);
  $("script, style, noscript, iframe, svg, form, nav").remove();
  const title = $("h1").first().text().trim() || $("title").text().trim() || new URL(url).pathname;
  const pageType = classifyPage(url);
  const sections: Array<{ heading: string; content: string }> = [];
  let heading = title;
  let content: string[] = [];

  $("main, article, body").first().find("h1, h2, h3, p, li, td, th").each((_, element) => {
    const text = $(element).text().replace(/\s+/g, " ").trim();
    if (!text) return;
    if (/^h[1-3]$/i.test(element.tagName)) {
      if (content.length) sections.push({ heading, content: content.join("\n") });
      heading = text;
      content = [];
    } else if (!content.includes(text)) {
      content.push(text);
    }
  });
  if (content.length) sections.push({ heading, content: content.join("\n") });

  return sections.flatMap((section) =>
    splitText(section.content).map((chunk, index) => {
      const contentHash = createHash("sha256").update(chunk).digest("hex");
      return {
        id: createHash("sha256").update(`${url}|${section.heading}|${index}`).digest("hex"),
        url,
        title,
        pageType,
        section: section.heading,
        language: detectLanguage(chunk),
        content: chunk,
        contentHash,
        updatedAt,
      };
    })
  );
}

export interface IngestionReport {
  discovered: number;
  indexedPages: number;
  indexedChunks: number;
  failedPages: Array<{ url: string; error: string }>;
  embeddingsEnabled: boolean;
}

export async function ingestOfficialWebsite(maxPages = 80): Promise<IngestionReport> {
  const urls = await discoverUrls(Math.min(Math.max(maxPages, 1), 300));
  const report: IngestionReport = {
    discovered: urls.length,
    indexedPages: 0,
    indexedChunks: 0,
    failedPages: [],
    embeddingsEnabled: false,
  };

  for (let offset = 0; offset < urls.length; offset += 5) {
    const batch = urls.slice(offset, offset + 5);
    await Promise.all(batch.map(async (url) => {
      try {
        const { text, updatedAt } = await fetchText(url);
        const chunks = extractChunks(url, text, updatedAt);
        const embeddings = await generateEmbeddings(chunks.map((chunk) => chunk.content));
        if (embeddings) {
          report.embeddingsEnabled = true;
          chunks.forEach((chunk, index) => { chunk.embedding = embeddings[index]; });
        }
        await upsertWebsiteChunks(chunks);
        report.indexedPages += 1;
        report.indexedChunks += chunks.length;
      } catch (error) {
        report.failedPages.push({
          url,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }));
  }
  return report;
}
