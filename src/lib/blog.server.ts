// Blog data source: live Typeflo posts first, then the old WordPress posts that
// exist only in src/data/blogPosts.ts (kept so their indexed URLs keep working).
import { cache } from "react";
import { BLOG_POSTS, type BlogPost } from "@/data/blogPosts";
import {
  getTypefloFaqs,
  getTypefloPost,
  getTypefloPostSummaries,
  isTypefloConfigured,
  renderTypefloHtml,
  type FaqItem,
  type TocItem,
} from "@/lib/typeflo.server";

export type { FaqItem, TocItem };

export interface BlogCategory {
  name: string;
  slug: string;
  count: number;
}

export interface BlogPostPage {
  post: BlogPost;
  html: string;
  toc: TocItem[];
  faqs: FaqItem[];
  seoTitle: string;
  seoDescription: string;
  source: "typeflo" | "legacy";
}

// Old local category slugs → the matching Typeflo category, so one topic shows once.
const LEGACY_CATEGORY_MAP: Record<string, { slug: string; name: string }> = {
  "festivals-traditions": { slug: "festivals-and-traditions", name: "Festivals & Traditions" },
  "spirituality-wellness": { slug: "spirituality-and-wellness", name: "Spirituality & Wellness" },
  "meditation-sadhna": { slug: "meditation", name: "Meditation" },
  "stress-anxiety": { slug: "anxiety-and-depression", name: "Anxiety and Depression" },
};

function normalizeLegacy(p: BlogPost): BlogPost {
  const mapped = LEGACY_CATEGORY_MAP[p.categorySlug];
  return mapped ? { ...p, categorySlug: mapped.slug, category: mapped.name } : p;
}

const getLegacyPosts = cache(() => BLOG_POSTS.map(normalizeLegacy));

async function typefloSummariesSafe(): Promise<BlogPost[]> {
  if (!isTypefloConfigured()) {
    console.warn("[blog] TYPEFLO_CONTENT_API_KEY is not set — showing only the local posts.");
    return [];
  }
  return getTypefloPostSummaries();
}

/** Every post for listings, newest first (contentHtml is empty for Typeflo posts). */
export const getAllPostSummaries = cache(async (): Promise<BlogPost[]> => {
  const live = await typefloSummariesSafe();
  const liveSlugs = new Set(live.map((p) => p.slug));
  const legacy = getLegacyPosts().filter((p) => !liveSlugs.has(p.slug));
  return [...live, ...legacy].sort((a, b) => Date.parse(b.datePublished) - Date.parse(a.datePublished));
});

/** Categories that have at least one post, most-used first. */
export function getCategories(posts: BlogPost[]): BlogCategory[] {
  const bySlug = new Map<string, BlogCategory>();
  for (const p of posts) {
    const c = bySlug.get(p.categorySlug);
    if (c) c.count++;
    else bySlug.set(p.categorySlug, { name: p.category, slug: p.categorySlug, count: 1 });
  }
  return [...bySlug.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/** One post ready to render, or null when neither Typeflo nor the local data has it. */
export const getPostPage = cache(async (slug: string): Promise<BlogPostPage | null> => {
  const legacy = getLegacyPosts().find((p) => p.slug === slug);
  // The cached Typeflo list says whether Typeflo has this slug; skip the API for
  // local-only posts (avoids ~100 lookups per build, which Typeflo rate-limits).
  const onTypeflo = isTypefloConfigured() && (await getTypefloPostSummaries()).some((p) => p.slug === slug);
  // Also try unknown slugs, in case the post was published after the list was cached.
  if (onTypeflo || (!legacy && isTypefloConfigured())) {
    const post = await getTypefloPost(slug);
    if (post) {
      const faqs = post.hasFaq ? await getTypefloFaqs(slug) : [];
      const { html, toc } = renderTypefloHtml(post.contentHtml, faqs);
      return {
        post,
        html,
        toc: post.showToc ? toc : [],
        faqs,
        seoTitle: post.seoTitle,
        seoDescription: post.seoDescription,
        source: "typeflo",
      };
    }
  }
  if (!legacy) return null;
  return {
    post: legacy,
    html: legacy.contentHtml,
    toc: [],
    faqs: [],
    seoTitle: legacy.title,
    seoDescription: legacy.excerpt,
    source: "legacy",
  };
});

/** Slugs of the local-only posts, prerendered at build time (Typeflo posts render on first visit). */
export function getLegacySlugs(): string[] {
  return getLegacyPosts().map((p) => p.slug);
}
