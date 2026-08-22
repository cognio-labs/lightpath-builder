const DEFAULT_EMBEDDING_MODEL = "openai/text-embedding-3-small";

interface EmbeddingResponse {
  data?: Array<{ embedding?: number[] }>;
}

function embeddingConfig() {
  const openAiKey = process.env.OPENAI_API_KEY?.trim();
  const openRouterKey = process.env.OPENROUTER_API_KEY?.trim();

  if (openAiKey) {
    return {
      key: openAiKey,
      url: process.env.EMBEDDING_API_URL || "https://api.openai.com/v1/embeddings",
      model: process.env.EMBEDDING_MODEL || "text-embedding-3-small",
    };
  }

  if (openRouterKey) {
    return {
      key: openRouterKey,
      url: process.env.EMBEDDING_API_URL || "https://openrouter.ai/api/v1/embeddings",
      model: process.env.EMBEDDING_MODEL || DEFAULT_EMBEDDING_MODEL,
    };
  }

  return null;
}

export async function generateEmbeddings(inputs: string[]): Promise<number[][] | null> {
  if (inputs.length === 0) return [];
  const config = embeddingConfig();
  if (!config) return null;

  const response = await fetch(config.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.key}`,
      "Content-Type": "application/json",
      ...(process.env.OPENROUTER_SITE_URL
        ? { "HTTP-Referer": process.env.OPENROUTER_SITE_URL }
        : {}),
      ...(process.env.OPENROUTER_SITE_NAME
        ? { "X-Title": process.env.OPENROUTER_SITE_NAME }
        : {}),
    },
    body: JSON.stringify({ model: config.model, input: inputs }),
    signal: AbortSignal.timeout(20_000),
  });

  if (!response.ok) {
    console.warn(`[RAG] Embedding request failed with ${response.status}. Using text search.`);
    return null;
  }

  const payload = (await response.json()) as EmbeddingResponse;
  const embeddings = payload.data?.map((item) => item.embedding || []);
  return embeddings?.every((embedding) => embedding.length > 0) ? embeddings : null;
}

export async function generateEmbedding(input: string): Promise<number[] | null> {
  const result = await generateEmbeddings([input]);
  return result?.[0] || null;
}
