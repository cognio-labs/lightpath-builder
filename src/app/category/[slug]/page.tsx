"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/data/blogPosts";
import { PageHero } from "@/components/PageHero";
import { Calendar, Clock, User, ArrowRight, BookOpen } from "lucide-react";

export default function CategoryArchivePage() {
  const params = useParams();
  const catSlug = params?.slug as string;

  const currentCategory = BLOG_CATEGORIES.find((c) => c.slug === catSlug) || {
    name: catSlug ? catSlug.replace("-", " ") : "Category",
    slug: catSlug,
  };

  const posts = BLOG_POSTS.filter((p) => p.categorySlug === catSlug);

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-[#332211] font-sans">
      <PageHero
        title={`Category: ${currentCategory.name}`}
        subtitle={`Browse all wisdom articles and guided insights in ${currentCategory.name}.`}
        eyebrow="Wisdom Archive"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="flex items-center justify-between border-b border-amber-200/80 pb-4">
          <h2 className="font-serif font-bold text-2xl text-[#521623] flex items-center gap-2">
            <BookOpen size={22} className="text-[#B8860B]" />
            Articles ({posts.length})
          </h2>
          <Link
            href="/blog"
            className="text-xs font-bold text-[#521623] hover:text-[#B8860B]"
          >
            ← All Categories
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16 bg-amber-50/50 rounded-3xl border border-amber-200 p-8 space-y-3">
            <p className="text-lg font-bold text-[#521623]">No articles found in this category.</p>
            <Link
              href="/blog"
              className="inline-block mt-2 px-6 py-2.5 rounded-full bg-[#521623] text-amber-100 font-bold text-xs"
            >
              Explore All Articles
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post.slug}
                className="group bg-white rounded-3xl overflow-hidden border border-amber-200/70 shadow-[0_10px_25px_rgba(82,22,35,0.05)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-amber-900/60 font-medium">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="font-serif font-bold text-lg text-[#521623] group-hover:text-[#B8860B] transition-colors leading-snug">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-3">{post.excerpt}</p>
                  </div>
                </div>
                <div className="p-6 pt-0 border-t border-amber-100 mt-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700">{post.author.name}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#521623]"
                  >
                    Read →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
