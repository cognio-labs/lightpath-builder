import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { BlogNewsletterForm } from "@/components/blog/BlogNewsletterForm";
import { getAllPostSummaries, getCategories } from "@/lib/blog.server";

const POSTS_PER_PAGE = 12;

export const metadata: Metadata = {
  title: "Blog | Science Divine Foundation",
  description:
    "Explore Sakshi Shree's teachings on meditation, mindfulness, festivals and life transformation. Awaken inner peace with the Science Divine blog.",
  alternates: { canonical: "/blog" },
};

interface PageProps {
  searchParams: Promise<{ category?: string; q?: string; page?: string }>;
}

function blogHref(params: { category?: string; q?: string; page?: number }) {
  const sp = new URLSearchParams();
  if (params.category && params.category !== "all") sp.set("category", params.category);
  if (params.q) sp.set("q", params.q);
  if (params.page && params.page > 1) sp.set("page", String(params.page));
  const qs = sp.toString();
  return qs ? `/blog?${qs}` : "/blog";
}

/** 1 … 4 5 [6] 7 8 … 90 */
function pageWindow(current: number, total: number): (number | "gap")[] {
  const pages = new Set([1, total, current - 2, current - 1, current, current + 1, current + 2]);
  const sorted = [...pages].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  const out: (number | "gap")[] = [];
  sorted.forEach((n, i) => {
    if (i > 0 && n - sorted[i - 1] > 1) out.push("gap");
    out.push(n);
  });
  return out;
}

export default async function BlogListingPage({ searchParams }: PageProps) {
  const { category = "all", q = "", page = "1" } = await searchParams;
  const query = q.trim();

  const allPosts = await getAllPostSummaries();
  const categories = [{ name: "All Articles", slug: "all", count: allPosts.length }, ...getCategories(allPosts)];

  const needle = query.toLowerCase();
  const filteredPosts = allPosts.filter((post) => {
    const matchesCategory = category === "all" || post.categorySlug === category;
    const matchesSearch =
      !needle ||
      post.title.toLowerCase().includes(needle) ||
      post.excerpt.toLowerCase().includes(needle) ||
      post.tags.some((t) => t.toLowerCase().includes(needle));
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const activePage = Math.min(Math.max(1, parseInt(page, 10) || 1), totalPages);
  const displayedPosts = filteredPosts.slice((activePage - 1) * POSTS_PER_PAGE, activePage * POSTS_PER_PAGE);

  return (
    <div className="min-h-screen bg-white text-[#1A202C] font-sans selection:bg-rose-100">
      {/* ════════════════════════════════════
          TOP HEADER BANNER (Soft Pink Theme)
      ════════════════════════════════════ */}
      <section className="bg-[#FDF0F0] py-12 lg:py-16 border-b border-rose-100">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="space-y-2">
            <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1A202C] tracking-tight">
              Science Divine Foundation
            </h1>
            <p className="text-sm sm:text-base font-medium text-[#718096] tracking-wide">
              Sound Body | Sound Mind | Self- Realisation
            </p>
          </div>

          {/* Top Newsletter Subscribe Form */}
          <BlogNewsletterForm variant="header" />
        </div>
      </section>

      {/* ════════════════════════════════════
          CATEGORY & SEARCH BAR
      ════════════════════════════════════ */}
      <div id="articles" className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 scroll-mt-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-100 pb-6">
          {/* Category Filter Pills */}
          <nav aria-label="Blog categories" className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = category === cat.slug;
              return (
                <Link
                  key={cat.slug}
                  href={`${blogHref({ category: cat.slug, q: query })}#articles`}
                  aria-current={isActive ? "page" : undefined}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "bg-[#8B1515] text-white shadow-xs"
                      : "bg-gray-100/80 text-gray-700 hover:bg-gray-200/80 border border-gray-200/60"
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </nav>

          {/* Search Box — a plain GET form, works without JavaScript */}
          <form action="/blog#articles" method="get" role="search" className="relative w-full md:w-72 shrink-0">
            {category !== "all" && <input type="hidden" name="category" value={category} />}
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search articles..."
              aria-label="Search articles"
              className="w-full pl-9 pr-3 py-2 rounded-full bg-gray-50 border border-gray-200 text-xs font-medium text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#8B1515]"
            />
          </form>
        </div>
      </div>

      {/* ════════════════════════════════════
          ARTICLES GRID
      ════════════════════════════════════ */}
      <main className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-200 p-8 space-y-3">
            <p className="text-base font-bold text-gray-800">No articles found</p>
            <p className="text-xs text-gray-500">Try adjusting your search terms or category selection.</p>
            <Link
              href="/blog#articles"
              className="inline-block px-5 py-2 rounded-full bg-[#8B1515] text-white font-bold text-xs hover:bg-[#701010] transition-colors"
            >
              Reset Filters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {displayedPosts.map((post) => (
              <article
                key={post.slug}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Image */}
                  <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <img
                      loading="lazy"
                      decoding="async"
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {/* Card Content */}
                  <div className="p-6 space-y-3">
                    {/* Date & Read Time */}
                    <div className="flex items-center gap-3 text-xs text-[#718096] font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar size={13} className="text-gray-400" />
                        {post.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock size={13} className="text-gray-400" />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif font-bold text-base sm:text-lg text-[#1A202C] group-hover:text-[#8B1515] transition-colors leading-snug line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed line-clamp-3">{post.excerpt}</p>
                  </div>
                </div>

                {/* Footer link */}
                <div className="px-6 pb-6 pt-0">
                  <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-xs font-bold text-[#8B1515] hover:underline">
                    Read Article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ════════════════════════════════════
            PAGINATION (12 posts/page)
        ════════════════════════════════════ */}
        {totalPages > 1 && (
          <nav aria-label="Pagination" className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {activePage > 1 ? (
              <Link
                href={`${blogHref({ category, q: query, page: activePage - 1 })}#articles`}
                aria-label="Previous page"
                className="w-8 h-8 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 flex items-center justify-center"
              >
                <ChevronLeft size={16} />
              </Link>
            ) : (
              <span aria-hidden="true" className="w-8 h-8 rounded-lg border border-gray-100 text-gray-300 flex items-center justify-center">
                <ChevronLeft size={16} />
              </span>
            )}

            {pageWindow(activePage, totalPages).map((num, i) =>
              num === "gap" ? (
                <span key={`gap-${i}`} className="w-8 text-center text-xs text-gray-400">
                  …
                </span>
              ) : (
                <Link
                  key={num}
                  href={`${blogHref({ category, q: query, page: num })}#articles`}
                  aria-label={`Page ${num}`}
                  aria-current={activePage === num ? "page" : undefined}
                  className={`min-w-8 h-8 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                    activePage === num
                      ? "bg-[#FDF0F0] text-[#8B1515] border border-rose-200 shadow-xs"
                      : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {num}
                </Link>
              ),
            )}

            {activePage < totalPages ? (
              <Link
                href={`${blogHref({ category, q: query, page: activePage + 1 })}#articles`}
                aria-label="Next page"
                className="w-8 h-8 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 flex items-center justify-center"
              >
                <ChevronRight size={16} />
              </Link>
            ) : (
              <span aria-hidden="true" className="w-8 h-8 rounded-lg border border-gray-100 text-gray-300 flex items-center justify-center">
                <ChevronRight size={16} />
              </span>
            )}
          </nav>
        )}

        {/* ════════════════════════════════════
            BOTTOM NEWSLETTER SIGNUP BOX
        ════════════════════════════════════ */}
        <div className="bg-[#F9FAFB] rounded-2xl p-8 lg:p-12 border border-gray-200/90 text-center max-w-2xl mx-auto space-y-4 shadow-xs">
          <h3 className="font-serif font-bold text-2xl text-[#1A202C]">Signup for the newsletter</h3>
          <p className="text-xs sm:text-sm text-[#718096] max-w-md mx-auto leading-relaxed">
            Stay up to date with transformative wisdom, festival insights, and meditation techniques directly from Sakshi Shree.
          </p>

          <BlogNewsletterForm variant="footer" />
        </div>
      </main>
    </div>
  );
}
