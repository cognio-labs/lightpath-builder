// Typeflo Headless Content API client (server only — reads TYPEFLO_CONTENT_API_KEY).
// Docs: https://typeflo.io/knowledge-base/headless-cms-content-api-documentation
import { cache } from "react";
import { unstable_cache } from "next/cache";
import type { BlogPost } from "@/data/blogPosts";

export const TYPEFLO_ORIGIN = "https://science-divine.typeflo.io";
const API = `${TYPEFLO_ORIGIN}/api/headless/content`;

/** Seconds before cached Typeflo data (and the blog pages built from it) refresh. */
export const TYPEFLO_REVALIDATE = 300;

// 50 posts ≈ 700 KB per response, safely under the 2 MB per-entry fetch cache limit.
const PAGE_SIZE = 50;
const PARALLEL_PAGES = 4;

/**
 * Share one in-flight/recent result per server process. Without this, every
 * page rendered at the same moment (e.g. ~100 pages during `next build`)
 * fetches the full post list itself and Typeflo starts refusing requests.
 */
function sharedPerProcess<T>(fn: () => Promise<T>, ttlMs: number): () => Promise<T> {
  let entry: { at: number; promise: Promise<T> } | null = null;
  return () => {
    if (!entry || Date.now() - entry.at > ttlMs) {
      const promise = fn();
      entry = { at: Date.now(), promise };
      promise.catch(() => {
        if (entry?.promise === promise) entry = null; // don't keep a failure around
      });
    }
    return entry.promise;
  };
}

interface TfRef {
  label: string;
  value: string;
}

interface TfPost {
  id: string;
  slug: string | null;
  title: string | null;
  excerpt: string | null;
  content: string | null;
  author: string | null;
  categories: TfRef[] | null;
  tags: TfRef[] | null;
  created_at: string;
  featured_image: { hd?: string; sd?: string; alt?: string } | null;
  metatitle: string | null;
  metadescription: string | null;
  reading_time: string | null;
  toc_status: boolean | null;
  opengraph: {
    facebook?: { metatitle?: string; metadescription?: string; image?: string | null };
    twitter?: { metatitle?: string; metadescription?: string; image?: string | null };
  } | null;
  is_draft: boolean | null;
  scheduled: string | null;
}

interface TfCategory {
  id: string;
  title: string; // the category slug
  name: string;
}

interface TfAuthor {
  id: string;
  name: string;
  avatar: string | null;
  description: string | null;
}

export interface FaqItem {
  question: string;
  answerHtml: string;
}

export interface TocItem {
  id: string;
  text: string;
}

/** A Typeflo post in the shape the blog pages already use, plus SEO extras. */
export interface TypefloBlogPost extends BlogPost {
  seoTitle: string;
  seoDescription: string;
  showToc: boolean;
  hasFaq: boolean;
}

// Typeflo rate-limits bursts (seen as 406) — retry those and server errors briefly.
const RETRY_STATUSES = new Set([406, 408, 425, 429, 500, 502, 503, 504]);
const RETRY_DELAYS_MS = [500, 1500, 4000];

async function api<T>(path: string): Promise<T | null> {
  const key = process.env.TYPEFLO_CONTENT_API_KEY;
  if (!key) return null;
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(`${API}${path}`, {
      headers: { Authorization: `Bearer ${key}` },
      next: { revalidate: TYPEFLO_REVALIDATE, tags: ["typeflo"] },
    });
    // The API answers 404 for "No posts found for the specified filters".
    if (res.status === 404) return null;
    if (res.ok) return res.json() as Promise<T>;
    if (!RETRY_STATUSES.has(res.status) || attempt >= RETRY_DELAYS_MS.length) {
      throw new Error(`Typeflo API ${path} responded ${res.status}`);
    }
    await new Promise((r) => setTimeout(r, RETRY_DELAYS_MS[attempt]));
  }
}

export function isTypefloConfigured(): boolean {
  return Boolean(process.env.TYPEFLO_CONTENT_API_KEY);
}

const getCategoryMap = cache(async () => {
  const res = await api<{ data: TfCategory[] }>("/category");
  return new Map((res?.data ?? []).map((c) => [c.id, c]));
});

const getAuthorMap = cache(async () => {
  const res = await api<{ data: TfAuthor[] }>("/authors");
  return new Map((res?.data ?? []).map((a) => [a.id, a]));
});

function isPublished(p: TfPost): p is TfPost & { slug: string; title: string } {
  if (p.is_draft || !p.slug || !p.title) return false;
  if (p.scheduled && new Date(p.scheduled).getTime() > Date.now()) return false;
  return true;
}

/** Every published Typeflo post, newest first (includes content). */
const getRawPosts = cache(async (): Promise<TfPost[]> => {
  const all: TfPost[] = [];
  for (let first = 0; ; first += PARALLEL_PAGES) {
    const pages = await Promise.all(
      Array.from({ length: PARALLEL_PAGES }, (_, i) => {
        const start = (first + i) * PAGE_SIZE;
        return api<{ data: TfPost[] }>(`/posts?start_range=${start}&end_range=${start + PAGE_SIZE - 1}`);
      }),
    );
    let done = false;
    for (const page of pages) {
      const rows = page?.data ?? [];
      all.push(...rows);
      if (rows.length < PAGE_SIZE) done = true;
    }
    if (done) break;
  }
  const seen = new Set<string>();
  return all
    .filter(isPublished)
    .filter((p) => (seen.has(p.slug!) ? false : (seen.add(p.slug!), true)))
    .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
});

// ── text helpers ──────────────────────────────────────────────────

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', "#39": "'", apos: "'", nbsp: " " };

function decodeEntities(s: string): string {
  return s.replace(/&(#\d+|#x[0-9a-f]+|[a-z]+);/gi, (m, e: string) => {
    if (e[0] === "#") {
      const code = e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : m;
    }
    return ENTITIES[e.toLowerCase()] ?? m;
  });
}

function stripTags(html: string): string {
  return decodeEntities(html.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function slugify(s: string): string {
  return s.toLowerCase().normalize("NFKD").replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "").slice(0, 80) || "section";
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "Asia/Kolkata" }).format(new Date(iso));
}

function attrs(tag: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const m of tag.matchAll(/([a-z_:-]+)\s*=\s*"([^"]*)"/gi)) out[m[1].toLowerCase()] = decodeEntities(m[2]);
  return out;
}

// ── mapping ───────────────────────────────────────────────────────

type Lookups = { categories: Map<string, TfCategory>; authors: Map<string, TfAuthor> };

async function getLookups(): Promise<Lookups> {
  const [categories, authors] = await Promise.all([getCategoryMap(), getAuthorMap()]);
  return { categories, authors };
}

function toBlogPost(p: TfPost & { slug: string; title: string }, { categories, authors }: Lookups): TypefloBlogPost {
  const cat = p.categories?.[0];
  const catInfo = cat ? categories.get(cat.value) : undefined;
  const author = p.author ? authors.get(p.author) : undefined;
  const content = p.content ?? "";
  const plain = stripTags(content);
  const excerpt = stripTags(p.excerpt ?? "") || plain.slice(0, 200);
  const og = p.opengraph?.facebook ?? p.opengraph?.twitter;
  return {
    slug: p.slug,
    oldUrl: "",
    title: decodeEntities(p.title).trim(),
    excerpt,
    category: (cat?.label ?? catInfo?.name ?? "Blog").trim(),
    categorySlug: catInfo?.title ?? (cat ? slugify(cat.label) : "blog"),
    date: formatDate(p.created_at),
    datePublished: p.created_at,
    readTime: p.reading_time ?? `${Math.max(1, Math.round(plain.split(" ").length / 200))} min read`,
    words: plain ? plain.split(" ").length : 0,
    author: {
      name: author?.name ?? "Science Divine Foundation",
      role: "Science Divine Foundation",
      avatar: author?.avatar ?? "/images/sakshi-shree-avatar.webp",
    },
    image: p.featured_image?.hd ?? p.featured_image?.sd ?? og?.image ?? "/images/guruji-meditation-hd.webp",
    content: plain,
    contentHtml: content,
    tags: (p.tags ?? []).map((t) => t.label.trim()).filter(Boolean),
    seoTitle: (p.metatitle ?? og?.metatitle ?? p.title).trim(),
    seoDescription: (p.metadescription ?? og?.metadescription ?? excerpt).trim(),
    showToc: Boolean(p.toc_status),
    hasFaq: content.includes("<faq"),
  };
}

/**
 * Listing data for every published post (content stripped to keep it light).
 * The finished list (~700 KB) is cached across requests, so listings don't
 * re-process ~1,000 full posts on every visit.
 */
export const getTypefloPostSummaries = sharedPerProcess(
  unstable_cache(
    async (): Promise<TypefloBlogPost[]> => {
      const [raw, lookups] = await Promise.all([getRawPosts(), getLookups()]);
      return raw.map((p) => ({
        ...toBlogPost(p as TfPost & { slug: string; title: string }, lookups),
        content: "",
        contentHtml: "",
      }));
    },
    ["typeflo-post-summaries-v1"],
    { revalidate: TYPEFLO_REVALIDATE, tags: ["typeflo"] },
  ),
  // shorter than the data cache, so a process never serves a list older than ~5 min
  60_000,
);

export const getTypefloPost = cache(async (slug: string): Promise<TypefloBlogPost | null> => {
  const res = await api<{ data: TfPost[] }>(`/posts?slug=${encodeURIComponent(slug)}`);
  const p = res?.data?.find((x) => x.slug === slug);
  return p && isPublished(p) ? toBlogPost(p, await getLookups()) : null;
});

/**
 * The API only returns <faq id="…"> placeholders, but Typeflo's own published
 * page carries the questions as FAQPage JSON-LD, so read them from there.
 */
export const getTypefloFaqs = cache(async (slug: string): Promise<FaqItem[]> => {
  try {
    const res = await fetch(`${TYPEFLO_ORIGIN}/blog/${encodeURIComponent(slug)}`, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; ScienceDivineSite/1.0)" },
      next: { revalidate: TYPEFLO_REVALIDATE * 12, tags: ["typeflo"] },
    });
    if (!res.ok) return [];
    const html = await res.text();
    for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
      let data: { "@type"?: string; mainEntity?: { name?: string; acceptedAnswer?: { text?: string } }[] };
      try {
        data = JSON.parse(m[1]);
      } catch {
        continue;
      }
      if (data["@type"] !== "FAQPage" || !Array.isArray(data.mainEntity)) continue;
      return data.mainEntity
        .map((q) => ({
          question: (q.name ?? "").replace(/^\s*Q:\s*/i, "").trim(),
          // drop the "Learn more" link Typeflo appends, which points back to this same post
          answerHtml: (q.acceptedAnswer?.text ?? "").replace(/\s*<a [^>]*>\s*Learn more\s*<\/a>\s*$/i, "").trim(),
        }))
        .filter((q) => q.question && q.answerHtml);
    }
  } catch (err) {
    console.error(`[typeflo] could not load FAQs for ${slug}:`, err);
  }
  return [];
});

/**
 * Turn Typeflo's stored HTML into what the page renders: expand <cta>/<faq>,
 * demote <h1> (the page already has one), make own-site links relative,
 * lazy-load images, and give h2s ids for the table of contents.
 */
export function renderTypefloHtml(html: string, faqs: FaqItem[]): { html: string; toc: TocItem[] } {
  let out = html
    .replace(/<cta\b[^>]*>(?:\s*<\/cta>)?/gi, (tag) => {
      const a = attrs(tag);
      const title = a.title ? `<p class="tf-cta-title">${escapeHtml(a.title.trim())}</p>` : "";
      const sub = a.subtitle ? `<p class="tf-cta-subtitle">${escapeHtml(a.subtitle.trim())}</p>` : "";
      const btn =
        a.btnname && a.btnlink
          ? `<a class="tf-cta-btn" href="${escapeHtml(a.btnlink)}" target="_blank" rel="noopener noreferrer">${escapeHtml(a.btnname.trim())}</a>`
          : "";
      return title || sub || btn ? `<div class="tf-cta">${title}${sub}${btn}</div>` : "";
    })
    .replace(/<h1(\s|>)/gi, "<h2$1")
    .replace(/<\/h1>/gi, "</h2>")
    .replace(/https?:\/\/(?:www\.)?sciencedivine\.org\/blog(?=[/"#?])/gi, "/blog")
    .replace(/<img(?![^>]*\bloading=)/gi, '<img loading="lazy" decoding="async"');

  let faqDone = false;
  out = out.replace(/<faq\b[^>]*>(?:\s*<\/faq>)?/gi, () => {
    if (faqDone || faqs.length === 0) return "";
    faqDone = true;
    const items = faqs
      .map((f) => `<details class="tf-faq-item"><summary>${escapeHtml(f.question)}</summary><div class="tf-faq-answer">${f.answerHtml}</div></details>`)
      .join("");
    return `<section class="tf-faq"><h2 id="faqs">Frequently Asked Questions</h2>${items}</section>`;
  });

  const toc: TocItem[] = [];
  const used = new Set<string>();
  out = out.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (full, attr: string, inner: string) => {
    const text = stripTags(inner);
    if (!text) return full;
    let id = /\bid="([^"]+)"/.exec(attr)?.[1];
    if (!id) {
      const base = slugify(text);
      id = base;
      for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
      attr = `${attr} id="${id}"`;
    }
    used.add(id);
    toc.push({ id, text });
    return `<h2${attr}>${inner}</h2>`;
  });

  return { html: out, toc };
}
