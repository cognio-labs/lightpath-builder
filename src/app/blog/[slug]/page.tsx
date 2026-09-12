import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { BLOG_POSTS } from "@/data/blogPosts";
import { BlogNewsletterForm } from "@/components/blog/BlogNewsletterForm";
import { ShareButton } from "@/components/blog/ShareButton";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Article Not Found | Science Divine",
      description: "The requested wisdom article was not found.",
    };
  }

  const canonicalUrl = `https://sciencedivine.org/blog/${post.slug}`;
  const ogImageUrl = post.image.startsWith("http")
    ? post.image
    : `https://sciencedivine.org${post.image}`;

  return {
    title: `${post.title} | Science Divine`,
    description: post.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonicalUrl,
      siteName: "Science Divine",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
      publishedTime: post.datePublished,
      authors: [post.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const postIndex = BLOG_POSTS.findIndex((p) => p.slug === slug);

  if (postIndex === -1) {
    notFound();
  }

  const post = BLOG_POSTS[postIndex];

  // Previous & Next navigation
  const prevPost = postIndex > 0 ? BLOG_POSTS[postIndex - 1] : null;
  const nextPost = postIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[postIndex + 1] : null;

  // 3 Related Posts in same category
  let relatedPosts = BLOG_POSTS.filter(
    (p) => p.slug !== post.slug && p.categorySlug === post.categorySlug
  ).slice(0, 3);

  if (relatedPosts.length < 3) {
    const fallback = BLOG_POSTS.filter(
      (p) => p.slug !== post.slug && !relatedPosts.some((r) => r.slug === p.slug)
    ).slice(0, 3 - relatedPosts.length);
    relatedPosts = [...relatedPosts, ...fallback];
  }

  // Schema.org Article structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: [
      post.image.startsWith("http")
        ? post.image
        : `https://sciencedivine.org${post.image}`,
    ],
    datePublished: post.datePublished,
    dateModified: post.datePublished,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
      url: "https://sciencedivine.org/about-sakshi-shree",
    },
    publisher: {
      "@type": "Organization",
      name: "Science Divine",
      url: "https://sciencedivine.org",
      logo: {
        "@type": "ImageObject",
        url: "https://sciencedivine.org/wp-content/uploads/2024/03/Science-Divine-Logo.webp",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://sciencedivine.org/blog/${post.slug}`,
    },
    wordCount: post.words,
    keywords: post.tags.join(", "),
  };

  return (
    <div className="min-h-screen bg-white text-[#1A202C] font-sans selection:bg-rose-100">
      {/* Schema.org Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ════════════════════════════════════
          TOP HEADER BANNER (Soft Pink Theme)
          Matches /blog listing page header
      ════════════════════════════════════ */}
      <section className="bg-[#FDF0F0] py-12 lg:py-16 border-b border-rose-100">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="space-y-2">
            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1A202C] tracking-tight">
              Science Divine Foundation
            </h2>
            <p className="text-sm sm:text-base font-medium text-[#718096] tracking-wide">
              Sound Body | Sound Mind | Self- Realisation
            </p>
          </div>

          {/* Top Newsletter Subscribe Form */}
          <BlogNewsletterForm variant="header" />
        </div>
      </section>

      {/* ════════════════════════════════════
          BREADCRUMB & BACK LINK
      ════════════════════════════════════ */}
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#8B1515] hover:text-[#701010] transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>

          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
            <Link href="/" className="hover:text-gray-800 transition-colors">Home</Link>
            <ChevronRight size={13} className="text-gray-400" />
            <Link href="/blog" className="hover:text-gray-800 transition-colors">Blog</Link>
            <ChevronRight size={13} className="text-gray-400" />
            <span className="text-gray-700 font-semibold truncate max-w-[200px] sm:max-w-xs">{post.category}</span>
          </nav>
        </div>
      </div>

      {/* ════════════════════════════════════
          ARTICLE HEADER & CONTENT
      ════════════════════════════════════ */}
      <main className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Article Meta Header */}
        <header className="space-y-5">
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-rose-50 text-[#8B1515] border border-rose-200/70 text-xs font-bold uppercase tracking-wider">
              {post.category}
            </span>
          </div>

          <h1 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1A202C] leading-tight sm:leading-snug">
            {post.title}
          </h1>

          {/* Author & Date Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-rose-100 shrink-0 border border-rose-200">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-gray-900">{post.author.name}</p>
                <p className="text-[11px] text-gray-500">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
              <span className="flex items-center gap-1">
                <Calendar size={13} className="text-gray-400" />
                {post.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock size={13} className="text-gray-400" />
                {post.readTime}
              </span>
              <span>•</span>
              <ShareButton title={post.title} />
            </div>
          </div>
        </header>

        {/* Featured Cover Image */}
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-gray-100 shadow-sm border border-gray-200/80">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Full Article Content */}
        <article
          className="blog-article-content pt-2 pb-8 border-b border-gray-100"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-gray-500 mr-1">Topics:</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs font-medium hover:bg-gray-200 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* ════════════════════════════════════
            PREVIOUS & NEXT POST NAVIGATION
        ════════════════════════════════════ */}
        <nav aria-label="Post navigation" className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 pb-10 border-b border-gray-100">
          {prevPost ? (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="group p-5 rounded-2xl border border-gray-200 hover:border-rose-200 bg-white hover:bg-rose-50/40 transition-all space-y-1.5 flex flex-col justify-between"
            >
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#8B1515] uppercase tracking-wider">
                <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
                Previous Article
              </span>
              <h3 className="font-serif font-bold text-sm text-gray-800 group-hover:text-[#8B1515] transition-colors line-clamp-2">
                {prevPost.title}
              </h3>
            </Link>
          ) : (
            <div />
          )}

          {nextPost ? (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="group p-5 rounded-2xl border border-gray-200 hover:border-rose-200 bg-white hover:bg-rose-50/40 transition-all space-y-1.5 text-right flex flex-col justify-between"
            >
              <span className="inline-flex items-center justify-end gap-1 text-xs font-bold text-[#8B1515] uppercase tracking-wider">
                Next Article
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <h3 className="font-serif font-bold text-sm text-gray-800 group-hover:text-[#8B1515] transition-colors line-clamp-2">
                {nextPost.title}
              </h3>
            </Link>
          ) : (
            <div />
          )}
        </nav>

        {/* ════════════════════════════════════
            RELATED POSTS (3 Cards, Same Category)
        ════════════════════════════════════ */}
        <section className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif font-bold text-2xl text-[#1A202C]">
              Related Articles
            </h2>
            <Link
              href="/blog"
              className="text-xs font-bold text-[#8B1515] hover:underline"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((related) => (
              <article
                key={related.slug}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <Link href={`/blog/${related.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                      <span>{related.date}</span>
                      <span>•</span>
                      <span>{related.readTime}</span>
                    </div>

                    <h3 className="font-serif font-bold text-sm text-[#1A202C] group-hover:text-[#8B1515] transition-colors leading-snug line-clamp-2">
                      <Link href={`/blog/${related.slug}`}>
                        {related.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                      {related.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-0">
                  <Link
                    href={`/blog/${related.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#8B1515] hover:underline"
                  >
                    Read Article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════
            BOTTOM NEWSLETTER SIGNUP BOX
        ════════════════════════════════════ */}
        <div className="bg-[#F9FAFB] rounded-2xl p-8 lg:p-12 border border-gray-200/90 text-center max-w-2xl mx-auto space-y-4 shadow-xs mt-12">
          <h3 className="font-serif font-bold text-2xl text-[#1A202C]">
            Signup for the newsletter
          </h3>
          <p className="text-xs sm:text-sm text-[#718096] max-w-md mx-auto leading-relaxed">
            Stay up to date with transformative wisdom, festival insights, and meditation techniques directly from Sakshi Shree.
          </p>

          <BlogNewsletterForm variant="footer" />
        </div>
      </main>
    </div>
  );
}
