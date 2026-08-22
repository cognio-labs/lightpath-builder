CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA extensions;

CREATE TABLE IF NOT EXISTS public.knowledge_chunks (
  id text PRIMARY KEY,
  url text NOT NULL,
  title text NOT NULL,
  page_type text NOT NULL DEFAULT 'general',
  section text NOT NULL DEFAULT '',
  language text NOT NULL DEFAULT 'en',
  content text NOT NULL,
  content_hash text NOT NULL,
  embedding extensions.vector(1536),
  source_kind text NOT NULL DEFAULT 'website',
  source_updated_at timestamptz NOT NULL DEFAULT now(),
  indexed_at timestamptz NOT NULL DEFAULT now(),
  search_document tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('simple', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(section, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(content, '')), 'C')
  ) STORED
);

CREATE INDEX IF NOT EXISTS knowledge_chunks_search_idx
  ON public.knowledge_chunks USING gin(search_document);
CREATE INDEX IF NOT EXISTS knowledge_chunks_url_idx ON public.knowledge_chunks(url);
CREATE INDEX IF NOT EXISTS knowledge_chunks_embedding_idx
  ON public.knowledge_chunks USING hnsw (embedding vector_cosine_ops)
  WHERE embedding IS NOT NULL;

ALTER TABLE public.knowledge_chunks ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.knowledge_chunks FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.knowledge_chunks TO service_role;

CREATE OR REPLACE FUNCTION public.match_knowledge_chunks(
  query_text text,
  query_embedding extensions.vector(1536) DEFAULT NULL,
  match_count integer DEFAULT 6,
  full_text_weight real DEFAULT 0.4,
  semantic_weight real DEFAULT 0.6
)
RETURNS TABLE (
  id text, url text, title text, page_type text, section text, language text,
  content text, source_updated_at timestamptz, score real
)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, extensions
AS $$
  WITH ranked AS (
    SELECT k.*,
      ts_rank_cd(k.search_document, websearch_to_tsquery('simple', query_text)) AS text_score,
      CASE WHEN query_embedding IS NULL OR k.embedding IS NULL THEN 0
        ELSE 1 - (k.embedding <=> query_embedding) END AS semantic_score
    FROM public.knowledge_chunks k
    WHERE query_embedding IS NOT NULL
       OR k.search_document @@ websearch_to_tsquery('simple', query_text)
  )
  SELECT r.id, r.url, r.title, r.page_type, r.section, r.language,
    r.content, r.source_updated_at,
    (full_text_weight * r.text_score + semantic_weight * r.semantic_score)::real AS score
  FROM ranked r
  ORDER BY score DESC, r.source_updated_at DESC
  LIMIT LEAST(GREATEST(match_count, 1), 12);
$$;

REVOKE ALL ON FUNCTION public.match_knowledge_chunks(text, extensions.vector, integer, real, real)
  FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.match_knowledge_chunks(text, extensions.vector, integer, real, real)
  TO service_role;
