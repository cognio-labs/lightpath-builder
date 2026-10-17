"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SolutionData } from "@/data/solutionsData";
import SolutionsCarousel from "@/components/SolutionsCarousel";
import { ARTICLES_BY_TOPIC, VIDEOS_BY_TOPIC } from "@/data/content";
import { FastVideoCard } from "@/components/FastMediaCards";
import {
  ArrowRight,
  CheckCircle2,
  Calendar,
  Sparkles,
  Shield,
  Sun,
  Heart,
  HelpCircle,
  ChevronDown,
  Quote,
  Activity,
  User,
  BookOpen,
  PlayCircle,
  ChevronRight,
  ZoomIn,
  X,
} from "lucide-react";

type ContentTab = "articles" | "quotes" | "videos";

const TABS: { id: ContentTab; label: string; icon: React.ReactNode }[] = [
  { id: "articles", label: "Articles", icon: <BookOpen size={17} /> },
  { id: "quotes", label: "Quotes", icon: <Quote size={17} /> },
  { id: "videos", label: "Videos", icon: <PlayCircle size={17} /> },
];

const ARTICLE_PREVIEWS = [
  "/images/articles/optimistic-mind-ai.webp",
  "/images/articles/conscious-mind-ai.webp",
  "/images/articles/feel-calm-ai.webp",
  "/images/articles/mental-health-ai.webp",
  "/images/articles/yoga-hypertension-ai.webp",
  "/images/articles/yoga-nidra-ai.webp",
  "/images/articles/yoga-mindfulness-ai.webp",
  "/images/articles/meditation-seniors-ai.webp",
  "/images/articles/mind-body-harmony-ai.webp",
];

const cardImages = [
  "/images/exclusive-meditation-woman.webp",
  "/images/feature-cards/sound-body.webp",
  "/images/feature-cards/sound-mind.webp",
  "/images/feature-cards/self-realization.webp",
  "/images/about-sound-body.webp",
  "/images/about-sound-mind.webp",
];

export default function SolutionPageTemplate({ solution }: { solution: SolutionData }) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [contentTab, setContentTab] = useState<ContentTab>("articles");
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null);

  const articles = ARTICLES_BY_TOPIC[solution.slug] || ARTICLES_BY_TOPIC["stress"] || [];
  const videos = VIDEOS_BY_TOPIC[solution.slug] || VIDEOS_BY_TOPIC["stress"] || [];

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const getCardStyle = (index: number) => {
    const configs = [
      {
        backgroundImage: "url('/images/feature-cards/sound-body.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
      },
      {
        backgroundImage: "url('/images/feature-cards/sound-mind.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
      },
      {
        backgroundImage: "url('/images/feature-cards/self-realization.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
      },
      {
        backgroundImage: "url('/images/exclusive-meditation-woman.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
      },
      {
        backgroundImage: "url('/images/about-sound-body.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
      },
      {
        backgroundImage: "url('/images/about-sound-mind.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
      },
    ];
    return configs[index % configs.length];
  };

  const getPracticeStyle = (index: number) => {
    const configs = [
      {
        backgroundImage: "url('/images/about-sound-body.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
      },
      {
        backgroundImage: "url('/images/about-sound-mind.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
      },
      {
        backgroundImage: "url('/images/about-self-realization.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
      },
    ];
    return configs[index % configs.length];
  };

  return (
    <div className="bg-[#FAF8F5] text-slate-800 min-h-screen">

      <section
        className="relative overflow-hidden min-h-[520px] lg:min-h-[580px] flex items-center py-16 sm:py-20 lg:py-24 px-4 sm:px-6 text-white"
        style={{
          background: "linear-gradient(135deg, #521623 0%, #3D0E18 50%, #521623 100%)",
        }}
      >
        <div
          className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(212,175,55,0.14) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)" }}
        />

        <div className="max-w-[1280px] w-full mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              {/* Breadcrumb */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-widest">
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <span>&bull;</span>
                <Link href="/#solutions" className="hover:text-white transition-colors">
                  Solutions
                </Link>
                <span>&bull;</span>
                <span className="text-white/90">{solution.name}</span>
              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(212,175,55,0.15)] border border-[rgba(212,175,55,0.3)]">
                <Sparkles size={14} className="text-[#D4AF37]" />
                <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#D4AF37]">
                  {solution.badge}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-[clamp(2.25rem,5vw,3.8rem)] font-bold tracking-tight text-white max-w-3xl leading-[1.12]">
                {solution.tagline.includes(":") ? (
                  <>
                    {solution.tagline.split(":")[0]}:{" "}
                    <span className="bg-gradient-to-r from-[#F59E0B] to-[#D4AF37] bg-clip-text text-transparent">
                      {solution.tagline.split(":")[1]}
                    </span>
                  </>
                ) : (
                  <span className="bg-gradient-to-r from-[#F59E0B] to-[#D4AF37] bg-clip-text text-transparent">
                    {solution.tagline}
                  </span>
                )}
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-white/80 font-medium max-w-2xl leading-relaxed">
                {solution.shortDesc}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href="/book-session"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#D4AF37] text-[#0F172A] font-bold text-sm uppercase tracking-wider shadow-[0_4px_20px_rgba(212,175,55,0.35)] hover:scale-105 transition-transform"
                >
                  <User size={18} /> Book Personal Session <ArrowRight size={18} />
                </Link>
                <a
                  href="#explore"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-white/10 border border-white/20 text-white font-bold text-sm uppercase tracking-wider hover:bg-white/20 transition-colors backdrop-blur-md"
                >
                  Explore Resources <ChevronRight size={16} className="text-[#D4AF37]" />
                </a>
              </div>
            </div>

            {/* Right side hero image */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative w-full max-w-[480px] aspect-[4/3] sm:aspect-[1.15] overflow-hidden rounded-3xl shadow-2xl border-4 border-white/20 hover:scale-105 transition-transform duration-700">
                <img loading="lazy" decoding="async"
                  src={solution.heroImage}
                  alt={solution.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          2. NAVIGATION TABS BAR (Articles, Quotes, Videos)
      ────────────────────────────────────────────────────────── */}
      <section id="explore" style={{ background: "#F8F7F4", borderBottom: "1px solid #E5E7EB" }}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div style={{ display: "flex", gap: "4px", overflowX: "auto", paddingTop: "8px" }} className="scrollbar-none">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setContentTab(t.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "16px 24px",
                  border: "none",
                  borderBottom: contentTab === t.id ? "3px solid #D4AF37" : "3px solid transparent",
                  background: "transparent",
                  color: contentTab === t.id ? "#D4AF37" : "#6B7280",
                  fontWeight: contentTab === t.id ? 700 : 500,
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "color 0.2s, border-color 0.2s",
                }}
              >
                {t.icon} <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          3. TAB CONTENT (Articles / Quotes / Videos)
      ────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 max-w-[1280px] mx-auto bg-white">
        {contentTab === "articles" && (
          <div className="space-y-10 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C79A2E]">
                READ &amp; HEAL
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#111827]">
                Articles on {solution.name}
              </h2>
              <p className="text-slate-600 text-sm md:text-base font-medium">
                Wisdom-backed articles and spiritual guidance from Sakshi Shree to support your journey towards healing and inner peace.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((a, i) => {
                const cardImg = a.image || ARTICLE_PREVIEWS[i % ARTICLE_PREVIEWS.length];
                const cardTag = a.tag || solution.name;
                const cardReadTime = a.readTime || "7 min read";
                const isExternal = Boolean(a.href?.startsWith("http"));
                const articleLink = a.href || `/blog?search=${encodeURIComponent(solution.name)}`;

                return (
                  <div
                    key={i}
                    className="rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#D4AF37] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col group relative"
                  >
                    <div className="h-1 bg-gradient-to-r from-[#521623] via-[#D4AF37] to-[#521623]" />
                    <div className="relative aspect-[16/10] overflow-hidden bg-amber-50/40">
                      {a.href ? (
                        <a
                          href={a.href}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          className="block w-full h-full"
                        >
                          <img
                            src={cardImg}
                            alt={a.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </a>
                      ) : (
                        <img
                          src={cardImg}
                          alt={a.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2.5 py-1 rounded-full bg-[rgba(82,22,35,0.08)] text-[#521623] font-bold text-[11px] uppercase tracking-wider">
                            {cardTag}
                          </span>
                          <span className="text-xs text-slate-400">· {cardReadTime}</span>
                        </div>
                        <h3 className="font-serif text-lg font-bold text-[#111827] group-hover:text-[#521623] transition-colors line-clamp-2">
                          {a.href ? (
                            <a
                              href={a.href}
                              target={isExternal ? "_blank" : undefined}
                              rel={isExternal ? "noopener noreferrer" : undefined}
                            >
                              {a.title}
                            </a>
                          ) : (
                            a.title
                          )}
                        </h3>
                        <p className="text-sm text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                          {a.excerpt}
                        </p>
                      </div>
                      {isExternal ? (
                        <a
                          href={articleLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#521623] group-hover:text-[#D4AF37] transition-colors pt-2"
                        >
                          Read Full Article <ArrowRight size={13} />
                        </a>
                      ) : (
                        <Link
                          href={articleLink}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#521623] group-hover:text-[#D4AF37] transition-colors pt-2"
                        >
                          Read Full Article <ArrowRight size={13} />
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {contentTab === "quotes" && (
          <div className="space-y-10 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C79A2E]">
                WORDS OF WISDOM
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#111827]">
                Inspirational Quotes on {solution.name}
              </h2>
              <p className="text-slate-600 text-sm md:text-base font-medium">
                Sacred reflections and meditative pearls from Sadguru Sakshi Shree to anchor your mind in profound stillness.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }, (_, i) => {
                const quoteSrc = `/images/old-site/pages/${solution.slug}/Anxiety-Quote-${i + 1}.webp`;
                return (
                  <div
                    key={i}
                    onClick={() => setSelectedQuote(quoteSrc)}
                    style={{
                      borderRadius: "20px",
                      overflow: "hidden",
                      boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
                      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                      cursor: "pointer",
                      background: "#FFFFFF",
                      border: "1px solid rgba(212,175,55,0.2)",
                      position: "relative",
                    }}
                    className="group hover:-translate-y-2 hover:shadow-2xl"
                  >
                    <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1", overflow: "hidden" }}>
                      <img
                        src={quoteSrc}
                        alt={`${solution.name} quote ${i + 1}`}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = `/images/old-site/pages/anxiety/Anxiety-Quote-${i + 1}.webp`;
                        }}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                          transition: "transform 0.5s ease",
                        }}
                        className="group-hover:scale-105"
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)",
                          opacity: 0,
                          transition: "opacity 0.3s ease",
                          display: "flex",
                          alignItems: "flex-end",
                          justifyContent: "space-between",
                          padding: "16px 20px",
                        }}
                        className="group-hover:opacity-100"
                      >
                        <span style={{ color: "#FFF", fontSize: "13px", fontWeight: 600 }}>
                          {solution.name} Quote {i + 1}
                        </span>
                        <span
                          style={{
                            background: "rgba(255,255,255,0.95)",
                            color: "#521623",
                            borderRadius: "100px",
                            padding: "6px 14px",
                            fontSize: "12px",
                            fontWeight: 700,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <ZoomIn size={14} /> View Quote
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {contentTab === "videos" && (
          <div className="space-y-10 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C79A2E]">
                WATCH &amp; TRANSFORM
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#111827]">
                Video Teachings on {solution.name}
              </h2>
              <p className="text-slate-600 text-sm md:text-base font-medium">
                Direct guidance, masterclasses, and practical techniques taught by Sadguru Sakshi Shree.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((v, i) => (
                <FastVideoCard
                  key={v.id || i}
                  id={v.id}
                  title={v.title}
                  lang="Hindi / English"
                  langBg="rgba(82,22,35,0.08)"
                  langColor="#521623"
                />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          2. KEY BENEFITS SECTION
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="section-pad px-4 sm:px-6 max-w-[1280px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12 space-y-3">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C79A2E]">
            TRANSFORMATIVE BENEFITS
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#111827]">
            How {solution.name} Solution Helps You
          </h2>
          <p className="text-slate-600 text-sm md:text-base font-medium">
            Scientific, simple, and proven techniques crafted by Sadguru Sakshi Shree to bring lasting physical, mental, and emotional harmony.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {solution.benefits.map((b, i) => (
            <div
              key={i}
              className="group min-h-full rounded-3xl bg-white border border-[#E5E7EB] hover:border-[#D4AF37] shadow-sm hover:shadow-[0_16px_40px_rgba(212,175,55,0.15)] transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div
                className="h-44 sm:h-48 bg-no-repeat overflow-hidden"
                role="img"
                aria-label={`${b.title} wellbeing practice`}
                style={
                  b.image
                    ? {
                        backgroundImage: `url('${b.image}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }
                    : getCardStyle(i)
                }
              />
              <div className="p-5 sm:p-6 flex-1">
                <div className="w-12 h-12 rounded-2xl bg-[rgba(212,175,55,0.12)] border border-[rgba(212,175,55,0.3)] flex items-center justify-center mb-4 text-[#D4AF37] group-hover:bg-[#521623] group-hover:text-[#D4AF37] transition-colors">
                  {b.icon === "Shield" && <Shield size={26} />}
                  {b.icon === "Sparkles" && <Sparkles size={26} />}
                  {b.icon === "Heart" && <Heart size={26} />}
                  {b.icon === "Sun" && <Sun size={26} />}
                  {b.icon === "Flame" && <Activity size={26} />}
                  {b.icon === "Zap" && <Activity size={26} />}
                  {b.icon === "Moon" && <Sun size={26} />}
                </div>
                <h3 className="font-serif text-xl font-bold text-[#111827] mb-2">
                  {b.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 font-medium">
                  {b.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SYMPTOMS & COMMON CHALLENGES */}
      <section className="section-pad px-4 sm:px-6 bg-[#F8F7F4] border-y border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C79A2E]">
                UNDERSTANDING THE ISSUE
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#111827]">
                Recognizing Common Patterns
              </h2>
              <p className="text-slate-700 leading-relaxed font-medium text-sm md:text-base">
                If you experience any of these daily struggles, Sakshi Shree&apos;s guided Sadhna offers a direct, gentle path to resolution.
              </p>
            </div>

            <div className="lg:col-span-7 grid gap-4">
              {solution.symptoms.map((s, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-white border border-amber-200/70 shadow-sm flex items-start gap-4"
                >
                  <CheckCircle2 size={22} className="text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-base text-[#111827]">{s.title}</h4>
                    <p className="text-sm text-slate-600 mt-1 font-medium">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. RECOMMENDED PRACTICES */}
      <section className="section-pad px-4 sm:px-6 max-w-[1280px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12 space-y-3">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C79A2E]">
            DAILY SADHNA & ROUTINES
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#111827]">
            Recommended Practices for {solution.name}
          </h2>
          <p className="text-slate-600 text-sm md:text-base font-medium">
            Perform these simple daily practices to cultivate lasting vitality, inner quietude, and happiness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7">
          {solution.practices.map((p, i) => (
            <div
              key={i}
              className="rounded-3xl bg-white border border-[#E5E7EB] hover:border-[#D4AF37] shadow-sm overflow-hidden flex flex-col"
            >
              <div
                className="h-48 bg-no-repeat overflow-hidden"
                role="img"
                aria-label={`${p.title} guided practice`}
                style={
                  p.image
                    ? {
                        backgroundImage: `url('${p.image}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }
                    : getPracticeStyle(i)
                }
              />
              <div className="p-6 sm:p-7 space-y-4 flex-1">
                <span className="inline-block px-3 py-1 rounded-full bg-[rgba(212,175,55,0.12)] text-[#521623] font-bold text-xs">
                  {p.duration}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#111827]">
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 font-medium">
                  {p.desc}
                </p>
              </div>
              <div className="px-6 sm:px-7 pb-6">
                <Link
                  href="/book-session"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#521623] hover:text-[#B8860B] transition-colors"
                >
                  Learn Guided Technique <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* ———————————————————————————————————
          5. EXPERT MASTER WISDOM & QUOTE
      ——————————————————————————————————— */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#521623] via-[#3D0E18] to-[#521623] text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-15 pointer-events-none bg-cover bg-center"
          style={{ backgroundImage: "url('/images/about-section-bg.webp')" }}
        />
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center relative z-10 space-y-6">
          <Quote size={48} className="mx-auto text-[#D4AF37] opacity-80" />
          <blockquote className="font-serif italic text-2xl sm:text-3xl md:text-4xl leading-relaxed text-amber-100 text-center w-full" style={{ textAlign: "center" }}>
            &ldquo;{solution.quote.text}&rdquo;
          </blockquote>
          <div className="pt-2 flex flex-col items-center justify-center text-center w-full">
            <p className="font-bold text-lg sm:text-xl text-white text-center w-full" style={{ textAlign: "center" }}>
              {solution.quote.author}
            </p>
            <p className="text-xs sm:text-sm text-[#D4AF37] uppercase tracking-widest mt-1.5 text-center w-full" style={{ textAlign: "center" }}>
              Enlightened Spiritual Master &amp; Founder
            </p>
          </div>
        </div>
      </section>

      {/* ———————————————————————————————————
          6. FAQ SECTION & HEALTH DISCLAIMER
      ——————————————————————————————————— */}
      <section className="py-20 px-6 max-w-[1000px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12 space-y-3">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C79A2E]">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#111827]">
            Common Guidance & Queries
          </h2>
        </div>

        <div className="space-y-4">
          {solution.faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-amber-200/80 overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base md:text-lg text-[#111827] hover:text-[#D4AF37] transition-colors"
              >
                <span className="flex items-center gap-3">
                  <HelpCircle size={20} className="text-[#D4AF37] flex-shrink-0" />
                  {faq.question}
                </span>
                <ChevronDown
                  size={20}
                  className={`text-[#D4AF37] transition-transform duration-300 ${
                    openFaqIndex === idx ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openFaqIndex === idx && (
                <div className="px-6 pb-6 pt-2 text-sm leading-relaxed text-slate-700 font-medium border-t border-amber-100">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Responsible Medical Disclaimer Note */}
        <div className="mt-12 p-6 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 font-medium leading-relaxed">
          <strong className="font-bold">Medical Disclaimer:</strong> Science Divine practices and Sakshi Sadhna techniques complement overall physical and mental wellbeing. They are not intended as a medical cure or substitute for professional clinical treatment. For medical or psychiatric conditions, please seek appropriate care from qualified healthcare professionals.
        </div>
      </section>

      {/* ———————————————————————————————————
          7. STRONG CALL TO ACTION BANNER
      ——————————————————————————————————— */}
      <section className="py-16 px-6 bg-gradient-to-r from-[#521623] via-[#3D0E18] to-[#521623] text-white text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white">
            Begin Your Transformation Today
          </h2>
          <p className="text-slate-200 text-base md:text-lg max-w-2xl mx-auto font-medium">
            Join thousands who have restored peace, vitality, and purpose in their lives through Sakshi Shree&apos;s direct guidance.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link
              href="/book-session"
              className="px-8 py-4 rounded-full bg-[#D7A316] text-[#521623] font-bold text-sm uppercase tracking-wider shadow-md hover:bg-[#C48F0A] transition-colors"
            >
              Book Personal Guidance
            </Link>
            <Link
              href="/events"
              className="px-8 py-4 rounded-full bg-[#FFF9ED] border-2 border-[#D7A316] text-[#521623] font-bold text-sm uppercase tracking-wider hover:bg-[#FFF4CF] transition-colors"
            >
              Explore Upcoming Events
            </Link>
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          8. RELATED SOLUTIONS CAROUSEL
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <SolutionsCarousel />

      {/* Quote Lightbox Modal */}
      {selectedQuote && (
        <div
          onClick={() => setSelectedQuote(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(8px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: "600px",
              width: "100%",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
              border: "2px solid #D4AF37",
            }}
          >
            <button
              onClick={() => setSelectedQuote(null)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "rgba(0,0,0,0.7)",
                color: "#FFF",
                border: "1px solid rgba(255,255,255,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              <X size={20} />
            </button>
            <img
              src={selectedQuote}
              alt="Sakshi Shree Quote"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        </div>
      )}

    </div>
  );
}
