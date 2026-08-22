import type { KnowledgeItem } from "@/lib/knowledge";

export interface WebsiteChunk {
  id: string;
  url: string;
  title: string;
  pageType: string;
  section: string;
  language: "en" | "hi" | "mixed";
  content: string;
  contentHash: string;
  embedding?: number[] | null;
  updatedAt: string;
}

function supabaseConfig() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? { url: url.replace(/\/$/, ""), key } : null;
}

async function supabaseRequest(path: string, init: RequestInit = {}) {
  const config = supabaseConfig();
  if (!config) throw new Error("Supabase RAG storage is not configured");

  return fetch(`${config.url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
    signal: init.signal || AbortSignal.timeout(15_000),
  });
}

export function isRagStoreConfigured(): boolean {
  return Boolean(supabaseConfig());
}

export async function upsertWebsiteChunks(chunks: WebsiteChunk[]): Promise<number> {
  if (chunks.length === 0) return 0;
  const response = await supabaseRequest("knowledge_chunks?on_conflict=id", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify(
      chunks.map((chunk) => ({
        id: chunk.id,
        url: chunk.url,
        title: chunk.title,
        page_type: chunk.pageType,
        section: chunk.section,
        language: chunk.language,
        content: chunk.content,
        content_hash: chunk.contentHash,
        embedding: chunk.embedding || null,
        source_kind: "website",
        source_updated_at: chunk.updatedAt,
        indexed_at: new Date().toISOString(),
      }))
    ),
  });

  if (!response.ok) throw new Error(`Knowledge upsert failed: ${await response.text()}`);
  return chunks.length;
}

interface MatchRow {
  id: string;
  url: string;
  title: string;
  page_type: string;
  section: string;
  language: "en" | "hi" | "mixed";
  content: string;
  source_updated_at: string;
  score: number;
}

export async function searchWebsiteKnowledge(
  query: string,
  embedding: number[] | null,
  limit = 6
): Promise<KnowledgeItem[]> {
  if (!isRagStoreConfigured()) return [];

  const response = await supabaseRequest("rpc/match_knowledge_chunks", {
    method: "POST",
    body: JSON.stringify({
      query_text: query,
      query_embedding: embedding,
      match_count: limit,
      full_text_weight: 0.4,
      semantic_weight: 0.6,
    }),
  });

  if (!response.ok) {
    console.warn(`[RAG] Database retrieval failed: ${response.status}`);
    return [];
  }

  const rows = (await response.json()) as MatchRow[];
  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    category: "GENERAL",
    content: row.content,
    sourceUrl: row.url,
    keywords: [],
    pageType: row.page_type,
    section: row.section,
    language: row.language,
    updatedAt: row.source_updated_at,
    sourceKind: "website",
    score: row.score,
  }));
}
