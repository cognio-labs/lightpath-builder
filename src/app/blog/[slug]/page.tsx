"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Bookmark,
  CheckCircle2,
  Sparkles,
  BookOpen,
  ArrowRight,
  Copy,
  Check,
} from "lucide-react";
import { BLOG_POSTS } from "@/data/blogPosts";

export default function BlogArticleDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [copied, setCopied] = useState(false);

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 bg-[#FFFDF7]">
        <h2 className="font-serif font-bold text-3xl text-[#521623] mb-3">Article Not Found</h2>
        <p className="text-gray-600 text-sm mb-6 max-w-md">
          The wisdom article you are looking for might have been renamed or moved.
        </p>
        <Link
          href="/blog"
          className="px-6 py-3 rounded-full bg-[#521623] text-amber-100 font-bold text-xs sm:text-sm hover:bg-[#3B0F19] transition-all"
        >
          ← Back to All Articles
        </Link>
      </div>
    );
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  const copyToClipboard = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <article className="min-h-screen bg-[#FFFDF7] text-[#332211] font-sans selection:bg-amber-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-[#521623] to-[#3B0F19] text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-amber-400/30">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs text-amber-200/80 font-medium">
            <Link href="/" className="hover:text-amber-300 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-amber-300 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-amber-100 font-bold truncate max-w-xs">{post.title}</span>
          </div>

          {/* Category Pill */}
          <div>
            <span className="px-3.5 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-amber-50 leading-tight">
            {post.title}
          </h1>

          {/* Subtitle / Excerpt */}
          <p className="text-amber-100/85 text-base sm:text-lg leading-relaxed font-serif italic border-l-2 border-amber-400 pl-4">
            "{post.excerpt}"
          </p>

          {/* Author Metadata Bar */}
          <div className="pt-4 border-t border-amber-200/20 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-amber-400/30 border border-amber-400/60 flex items-center justify-center font-serif font-bold text-amber-200 text-sm">
                SS
              </div>
              <div>
                <div className="text-sm font-bold text-amber-100">{post.author.name}</div>
                <div className="text-xs text-amber-200/70">{post.author.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-amber-200/80 font-medium">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-amber-400" />
                {post.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-amber-400" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-10">
        {/* Featured Image */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-amber-200/80">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-auto max-h-[500px] object-cover"
          />
        </div>

        {/* Key Takeaways Callout Box */}
        <div className="bg-gradient-to-r from-amber-50 to-amber-100/60 rounded-2xl p-6 lg:p-8 border border-amber-300/80 space-y-3 shadow-xs">
          <h3 className="font-serif font-bold text-lg text-[#521623] flex items-center gap-2">
            <Sparkles size={18} className="text-[#B8860B]" />
            Key Wisdom Takeaways
          </h3>
          <ul className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm text-gray-800">
            <li className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-[#521623] shrink-0 mt-0.5" />
              <span>Conscious shift from identification with mental chatter.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-[#521623] shrink-0 mt-0.5" />
              <span>Practical breath &amp; meditation routines for instant relief.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-[#521623] shrink-0 mt-0.5" />
              <span>Ancient Vedic clarity adapted for modern lifestyle challenges.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-[#521623] shrink-0 mt-0.5" />
              <span>Daily anchors to stay grounded in eternal present presence.</span>
            </li>
          </ul>
        </div>

        {/* Article Body Content */}
        <div className="prose prose-amber max-w-none text-gray-800 text-base sm:text-lg leading-relaxed space-y-6">
          {post.content.split("\n\n").map((paragraph, index) => {
            const trimmed = paragraph.trim();

            if (trimmed.startsWith("### ")) {
              return (
                <h3
                  key={index}
                  className="font-serif font-bold text-2xl lg:text-3xl text-[#521623] pt-6 pb-2 border-b border-amber-200/80"
                >
                  {trimmed.replace("### ", "")}
                </h3>
              );
            }

            if (trimmed.startsWith("#### ")) {
              return (
                <h4
                  key={index}
                  className="font-serif font-bold text-xl text-[#B8860B] pt-4 pb-1"
                >
                  {trimmed.replace("#### ", "")}
                </h4>
              );
            }

            if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
              const items = trimmed.split("\n").map((item) => item.replace(/^[\*\-]\s*/, ""));
              return (
                <ul key={index} className="space-y-2 my-4 pl-4 border-l-2 border-amber-300">
                  {items.map((it, i) => (
                    <li key={i} className="text-base text-gray-700 font-medium">
                      {it}
                    </li>
                  ))}
                </ul>
              );
            }

            return (
              <p key={index} className="text-gray-700 leading-relaxed font-sans">
                {trimmed}
              </p>
            );
          })}
        </div>

        {/* Tags & Share Bar */}
        <div className="pt-8 border-t border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-amber-900/60 uppercase">Tags:</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-amber-100/70 border border-amber-200/90 text-xs font-semibold text-[#521623]"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Social Share & Copy Link */}
          <div className="flex items-center gap-3">
            <button
              onClick={copyToClipboard}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 hover:bg-amber-200 text-[#521623] text-xs font-bold transition-all cursor-pointer"
            >
              {copied ? <Check size={14} className="text-green-700" /> : <Copy size={14} />}
              <span>{copied ? "Link Copied!" : "Share Link"}</span>
            </button>
          </div>
        </div>

        {/* Author Profile Bio Box */}
        <div className="bg-gradient-to-br from-[#521623] to-[#3B0F19] text-white rounded-3xl p-8 border border-amber-400/30 shadow-xl flex flex-col md:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-amber-400/30 border-2 border-amber-400 flex items-center justify-center font-serif font-bold text-2xl text-amber-200 shrink-0">
            SS
          </div>
          <div className="space-y-2 text-center md:text-left">
            <h4 className="font-serif font-bold text-xl text-amber-100">{post.author.name}</h4>
            <p className="text-xs font-semibold text-amber-300 uppercase tracking-wide">{post.author.role}</p>
            <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed">
              Enlightened spiritual master, divine messenger, and founder of the Science Divine Movement. Sakshi Shree has transformed millions of lives worldwide through simple, scientific meditation practices and timeless wisdom.
            </p>
          </div>
        </div>

        {/* Related Articles Section */}
        <div className="pt-12 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-2xl text-[#521623] flex items-center gap-2">
              <BookOpen size={20} className="text-[#B8860B]" />
              Related Wisdom Articles
            </h3>
            <Link
              href="/blog"
              className="text-xs font-bold text-[#521623] hover:text-[#B8860B] inline-flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rel) => (
              <Link
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                className="group bg-white rounded-2xl p-5 border border-amber-200/80 shadow-xs hover:shadow-lg transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#B8860B]">
                    {rel.category}
                  </span>
                  <h4 className="font-serif font-bold text-base text-[#521623] group-hover:text-[#B8860B] transition-colors line-clamp-2 leading-snug">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {rel.excerpt}
                  </p>
                </div>
                <div className="text-[11px] font-semibold text-amber-900/60 pt-2 border-t border-amber-100">
                  {rel.readTime}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
