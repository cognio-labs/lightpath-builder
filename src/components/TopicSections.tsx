"use client";

import React, { useState } from "react";
import { CheckCircle2, Quote, HelpCircle, ChevronDown } from "lucide-react";

export interface SymptomCard {
  title: string;
  desc: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TopicSectionsProps {
  symptoms: SymptomCard[];
  symptomsIntro: string;
  quoteText: string;
  quoteAuthor?: string;
  faqs: FaqItem[];
}

/**
 * Renders three sections matching the SolutionPageTemplate reference design:
 *  1. Recognizing Common Patterns (symptoms/challenges)
 *  2. Guru Quote Banner (maroon bg, spiritual image overlay)
 *  3. FAQ Accordion + Medical Disclaimer
 */
export default function TopicSections({
  symptoms,
  symptomsIntro,
  quoteText,
  quoteAuthor = "Sadguru Sakshi Shree",
  faqs,
}: TopicSectionsProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <>
      {/* ── Section 1: Recognizing Common Patterns ── */}
      <section className="w-full section-pad px-4 sm:px-6 bg-white border-y border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left column: heading */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C79A2E]">
                UNDERSTANDING THE ISSUE
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#111827]">
                Recognizing Common Patterns
              </h2>
              <p className="text-slate-700 leading-relaxed font-medium text-sm md:text-base">
                {symptomsIntro}
              </p>
            </div>

            {/* Right column: symptom cards */}
            <div className="lg:col-span-7 grid gap-4">
              {symptoms.map((s, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-white border border-amber-200/70 shadow-sm flex items-start gap-4"
                >
                  <CheckCircle2
                    size={22}
                    className="text-[#D4AF37] flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <h4 className="font-bold text-base text-[#111827]">
                      {s.title}
                    </h4>
                    <p className="text-sm text-slate-600 mt-1 font-medium">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Guru Quote Banner ── */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#521623] via-[#3D0E18] to-[#521623] text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-15 pointer-events-none bg-cover bg-center"
          style={{ backgroundImage: "url('/images/about-section-bg.webp')" }}
        />
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center relative z-10 space-y-6">
          <Quote size={48} className="mx-auto text-[#D4AF37] opacity-80" />
          <blockquote
            className="font-serif italic text-2xl sm:text-3xl md:text-4xl leading-relaxed text-amber-100 text-center w-full"
            style={{ textAlign: "center" }}
          >
            &ldquo;{quoteText}&rdquo;
          </blockquote>
          <div className="pt-2 flex flex-col items-center justify-center text-center w-full">
            <p
              className="font-bold text-lg sm:text-xl text-white text-center w-full"
              style={{ textAlign: "center" }}
            >
              {quoteAuthor}
            </p>
            <p
              className="text-xs sm:text-sm text-[#D4AF37] uppercase tracking-widest mt-1.5 text-center w-full"
              style={{ textAlign: "center" }}
            >
              Enlightened Spiritual Master &amp; Founder
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 3: FAQ Accordion + Disclaimer ── */}
      <section className="w-full bg-white py-20 px-6">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12 space-y-3">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C79A2E]">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#111827]">
              Common Guidance &amp; Queries
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-amber-200/80 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={openFaqIndex === idx}
                  aria-controls={`faq-answer-ts-${idx}`}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base md:text-lg text-[#111827] hover:text-[#D4AF37] transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle
                      size={20}
                      className="text-[#D4AF37] flex-shrink-0"
                    />
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-[#D4AF37] transition-transform duration-300 flex-shrink-0 ${
                      openFaqIndex === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openFaqIndex === idx && (
                  <div
                    id={`faq-answer-ts-${idx}`}
                    className="px-6 pb-6 pt-2 text-sm leading-relaxed text-slate-700 font-medium border-t border-amber-100"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Medical / Wellbeing Disclaimer */}
          <div className="mt-12 p-6 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 font-medium leading-relaxed">
            <strong className="font-bold">Medical Disclaimer:</strong> Science
            Divine practices and Sakshi Sadhna techniques complement overall
            physical and mental wellbeing. They are not intended as a medical
            cure or substitute for professional clinical treatment. For medical
            or psychiatric conditions, please seek appropriate care from
            qualified healthcare professionals.
          </div>
        </div>
      </section>
    </>
  );
}
