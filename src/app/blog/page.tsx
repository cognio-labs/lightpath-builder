"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Mail,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/data/blogPosts";
import { LOGO_URL } from "@/data/content";

export default function BlogListingPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [headerEmail, setHeaderEmail] = useState("");
  const [footerEmail, setFooterEmail] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.categorySlug === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const handleHeaderSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (headerEmail) {
      alert(`Thank you for subscribing with ${headerEmail}!`);
      setHeaderEmail("");
    }
  };

  const handleFooterSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (footerEmail) {
      alert(`Thank you for signing up with ${footerEmail}!`);
      setFooterEmail("");
    }
  };

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
          <form
            onSubmit={handleHeaderSubscribe}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-0 max-w-md w-full"
          >
            <div className="relative flex-1">
              <Mail
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                required
                placeholder="Enter your Email"
                value={headerEmail}
                onChange={(e) => setHeaderEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none bg-white border border-gray-200 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400 shadow-xs"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-b-xl sm:rounded-r-xl sm:rounded-bl-none bg-[#8B1515] hover:bg-[#701010] text-white font-bold text-xs sm:text-sm transition-all shadow-xs shrink-0 cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* ════════════════════════════════════
          CATEGORY & SEARCH BAR
      ════════════════════════════════════ */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-100 pb-6">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 scrollbar-none">
            {BLOG_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#8B1515] text-white shadow-xs"
                      : "bg-gray-100/80 text-gray-700 hover:bg-gray-200/80 border border-gray-200/60"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-full bg-gray-50 border border-gray-200 text-xs font-medium text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#8B1515]"
            />
          </div>
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
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="px-5 py-2 rounded-full bg-[#8B1515] text-white font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredPosts.map((post, idx) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

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
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer link */}
                <div className="px-6 pb-6 pt-0">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#8B1515] hover:underline"
                  >
                    Read Article →
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* ════════════════════════════════════
            PAGINATION (< 1 2 3 ... 69 >)
        ════════════════════════════════════ */}
        <div className="flex items-center justify-center gap-2 pt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 text-xs transition-colors cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentPage === num
                  ? "bg-[#FDF0F0] text-[#8B1515] border border-rose-200"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {num}
            </button>
          ))}
          <span className="text-xs text-gray-400 px-1">...</span>
          <button
            onClick={() => setCurrentPage(69)}
            className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              currentPage === 69
                ? "bg-[#FDF0F0] text-[#8B1515] border border-rose-200"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            69
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(69, p + 1))}
            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 text-xs transition-colors cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* ════════════════════════════════════
            BOTTOM NEWSLETTER SIGNUP BOX
        ════════════════════════════════════ */}
        <div className="bg-[#F9FAFB] rounded-2xl p-8 lg:p-12 border border-gray-200/90 text-center max-w-2xl mx-auto space-y-4 shadow-xs">
          <h3 className="font-serif font-bold text-2xl text-[#1A202C]">
            Signup for the newsletter
          </h3>
          <p className="text-xs sm:text-sm text-[#718096] max-w-md mx-auto leading-relaxed">
            Stay up to date with the roadmap progress, announcements feel free to sign up with your email.
          </p>

          <form
            onSubmit={handleFooterSubscribe}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-0 max-w-md mx-auto pt-2"
          >
            <div className="relative flex-1">
              <Mail
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                required
                placeholder="Enter your Email"
                value={footerEmail}
                onChange={(e) => setFooterEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none bg-white border border-gray-300 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#8B1515]"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-b-xl sm:rounded-r-xl sm:rounded-bl-none bg-[#8B1515] hover:bg-[#701010] text-white font-bold text-xs sm:text-sm transition-all shrink-0 cursor-pointer shadow-xs"
            >
              Subscribe
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
