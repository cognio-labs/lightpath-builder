"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SolutionData, SOLUTIONS_LIST } from "@/data/solutionsData";
import SolutionsCarousel from "@/components/SolutionsCarousel";
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
} from "lucide-react";

export default function SolutionPageTemplate({ solution }: { solution: SolutionData }) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="bg-[#FAF7F2] text-slate-900 min-h-screen">
      
      {/* ════════════════════════════════════
          1. HERO SECTION
      ════════════════════════════════════ */}
      <section
        className="relative overflow-hidden min-h-[580px] lg:min-h-[640px] flex items-center py-20 px-6 md:px-12 bg-cover bg-center text-white"
        style={{
          backgroundImage: `url('${solution.heroImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        {/* Dark Overlay Gradient Wash */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#090D16]/95 via-[#090D16]/85 to-[#090D16]/40 pointer-events-none" />

        <div className="max-w-[1400px] w-full mx-auto relative z-10 space-y-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-300/80 uppercase tracking-widest">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>&bull;</span>
            <Link href="/#solutions" className="hover:text-white transition-colors">
              Solutions
            </Link>
            <span>&bull;</span>
            <span className="text-white">{solution.name}</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 backdrop-blur-md">
            <Sparkles size={14} className="text-[#D4AF37]" />
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#FDF4D7]">
              {solution.badge}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-3xl leading-tight">
            {solution.tagline}
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-200 font-medium max-w-2xl leading-relaxed">
            {solution.shortDesc}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href="/book-session"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#B8860B] via-[#C79A2E] to-[#D4AF37] text-slate-950 font-bold text-sm uppercase tracking-wider shadow-xl hover:scale-105 transition-all"
            >
              <User size={18} /> Book Personal Session <ArrowRight size={18} />
            </Link>
            <Link
              href="/events"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white/10 border border-[#D4AF37]/50 text-white font-bold text-sm uppercase tracking-wider backdrop-blur-md hover:bg-white/20 transition-all"
            >
              <Calendar size={18} className="text-[#D4AF37]" /> Attend Live Event
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          2. KEY BENEFITS SECTION
      ════════════════════════════════════ */}
      <section className="py-20 px-6 max-w-[1300px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C79A2E]">
            TRANSFORMATIVE BENEFITS
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#4E1321]">
            How {solution.name} Solution Helps You
          </h2>
          <p className="text-slate-600 text-sm md:text-base font-medium">
            Scientific, simple, and proven techniques crafted by Sadguru Sakshi Shree to bring lasting physical, mental, and emotional harmony.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {solution.benefits.map((b, i) => (
            <div
              key={i}
              className="group p-7 rounded-3xl bg-white border border-amber-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center mb-6 text-[#4E1321] group-hover:bg-[#4E1321] group-hover:text-[#D4AF37] transition-colors">
                  {b.icon === "Shield" && <Shield size={26} />}
                  {b.icon === "Sparkles" && <Sparkles size={26} />}
                  {b.icon === "Heart" && <Heart size={26} />}
                  {b.icon === "Sun" && <Sun size={26} />}
                  {b.icon === "Flame" && <Activity size={26} />}
                  {b.icon === "Zap" && <Activity size={26} />}
                  {b.icon === "Moon" && <Sun size={26} />}
                </div>
                <h3 className="font-serif text-xl font-bold text-[#4E1321] mb-2">
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

      {/* ════════════════════════════════════
          3. SYMPTOMS & COMMON CHALLENGES
      ════════════════════════════════════ */}
      <section className="py-16 px-6 bg-[#FAF3E8] border-y border-amber-100">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C79A2E]">
                UNDERSTANDING THE ISSUE
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#4E1321]">
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
                  <CheckCircle2 size={22} className="text-[#C79A2E] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-base text-[#4E1321]">{s.title}</h4>
                    <p className="text-sm text-slate-600 mt-1 font-medium">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          4. RECOMMENDED PRACTICES
      ════════════════════════════════════ */}
      <section className="py-20 px-6 max-w-[1300px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C79A2E]">
            DAILY SADHNA & ROUTINES
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#4E1321]">
            Recommended Practices for {solution.name}
          </h2>
          <p className="text-slate-600 text-sm md:text-base font-medium">
            Perform these simple daily practices to cultivate lasting vitality, inner quietude, and happiness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solution.practices.map((p, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl bg-white border border-amber-200/80 shadow-md flex flex-col justify-between"
            >
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-[#8B6914] font-bold text-xs">
                  {p.duration}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#4E1321]">
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 font-medium">
                  {p.desc}
                </p>
              </div>
              <div className="pt-6">
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

      {/* ════════════════════════════════════
          5. EXPERT MASTER WISDOM & QUOTE
      ════════════════════════════════════ */}
      <section className="py-20 px-6 bg-[#4E1321] text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-15 pointer-events-none bg-cover bg-center"
          style={{ backgroundImage: "url('/about-section-bg.png')" }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <Quote size={48} className="mx-auto text-[#D4AF37] opacity-80" />
          <blockquote className="font-serif italic text-2xl sm:text-3xl md:text-4xl leading-relaxed text-amber-100">
            &ldquo;{solution.quote.text}&rdquo;
          </blockquote>
          <div className="pt-2">
            <p className="font-bold text-lg text-white">{solution.quote.author}</p>
            <p className="text-xs text-amber-300/80 uppercase tracking-widest mt-1">
              Enlightened Spiritual Master & Founder
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          6. FAQ SECTION & HEALTH DISCLAIMER
      ════════════════════════════════════ */}
      <section className="py-20 px-6 max-w-[1000px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C79A2E]">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#4E1321]">
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
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base md:text-lg text-[#4E1321] hover:text-[#B8860B] transition-colors"
              >
                <span className="flex items-center gap-3">
                  <HelpCircle size={20} className="text-[#C79A2E] flex-shrink-0" />
                  {faq.question}
                </span>
                <ChevronDown
                  size={20}
                  className={`text-[#C79A2E] transition-transform duration-300 ${
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
        <div className="mt-12 p-6 rounded-2xl bg-amber-100/60 border border-amber-300/60 text-xs text-amber-950 font-medium leading-relaxed">
          <strong className="font-bold">Medical Disclaimer:</strong> Science Divine practices and Sakshi Sadhna techniques complement overall physical and mental wellbeing. They are not intended as a medical cure or substitute for professional clinical treatment. For medical or psychiatric conditions, please seek appropriate care from qualified healthcare professionals.
        </div>
      </section>

      {/* ════════════════════════════════════
          7. STRONG CALL TO ACTION BANNER
      ════════════════════════════════════ */}
      <section className="py-16 px-6 bg-gradient-to-r from-[#521623] via-[#4E1321] to-[#3B0F19] text-white text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-amber-100">
            Begin Your Transformation Today
          </h2>
          <p className="text-slate-200 text-base md:text-lg max-w-2xl mx-auto font-medium">
            Join thousands who have restored peace, vitality, and purpose in their lives through Sakshi Shree&apos;s direct guidance.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link
              href="/book-session"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-slate-950 font-bold text-sm uppercase tracking-wider shadow-xl hover:scale-105 transition-all"
            >
              Book Personal Guidance
            </Link>
            <Link
              href="/events"
              className="px-8 py-4 rounded-full bg-white/10 border border-[#D4AF37] text-white font-bold text-sm uppercase tracking-wider backdrop-blur-md hover:bg-white/20 transition-all"
            >
              Explore Upcoming Events
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          8. RELATED SOLUTIONS CAROUSEL
      ════════════════════════════════════ */}
      <SolutionsCarousel />

    </div>
  );
}
