"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  DepressionIcon,
  MentalHealthIcon,
  SleepIcon,
  StressIcon,
  ParentingIcon,
  WellnessIcon,
  RelationshipsIcon,
} from "@/components/ui/CategoryIcons";

const GUIDANCE_CARDS = [
  {
    name: "Depression",
    slug: "depression",
    icon: DepressionIcon,
  },
  {
    name: "Anxiety",
    slug: "mental-health",
    icon: MentalHealthIcon,
  },
  {
    name: "Sleeping Disorder",
    slug: "sleep",
    icon: SleepIcon,
  },
  {
    name: "Overthinking",
    slug: "stress",
    icon: StressIcon,
  },
  {
    name: "Parenting",
    slug: "parenting",
    icon: ParentingIcon,
  },
  {
    name: "Wellness",
    slug: "wellness",
    icon: WellnessIcon,
  },
  {
    name: "Relationships",
    slug: "relationships",
    icon: RelationshipsIcon,
  },
];

export default function FindSolutionsSection() {
  return (
    <section className="relative overflow-hidden py-20 px-4 sm:px-6 md:px-12 bg-gradient-to-b from-[#E4F0FA] via-[#EEF5FB] to-[#F8FAFC] text-slate-900">
      {/* Background Soft Sky Cloud Overlay */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none bg-cover bg-center"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.8) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-[1520px] mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Left Content & Grid */}
          <div className="lg:col-span-7 space-y-6">

            {/* Header Badge */}
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C79A2E] block">
              GUIDANCE
            </span>

            {/* Title */}
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E293B] leading-tight">
              Find Solutions For :
            </h2>

            {/* Paragraph Description */}
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-xl">
              Explore Sakshi Shree&apos;s teachings centered around overcoming common struggles such as depression, anxiety, anger, and more. Find practical guidance to navigate life&apos;s challenges and enhance your well-being.
            </p>

            {/* Solution Cards 3-Column Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              {GUIDANCE_CARDS.map((card, idx) => {
                const IconComponent = card.icon;
                return (
                  <Link
                    key={card.name}
                    href={`/solutions/${card.slug}`}
                    className="group flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white/95 border border-white/80 shadow-[0_8px_20px_rgba(30,50,80,0.05)] hover:shadow-[0_14px_30px_rgba(30,50,80,0.12)] hover:-translate-y-1.5 transition-all duration-300 text-center"
                  >
                    <img src={["/premium-heroes/depression-hero.png", "/premium-heroes/anxiety-hero.png", "/premium-heroes/sleeping-disorder-hero.png", "/premium-heroes/overthinking-hero.png", "/premium-heroes/parenting-hero.png", "/premium-heroes/wellness-hero.png", "/premium-heroes/relationships-hero.png"][idx]} alt="" className="mb-3 h-20 w-full rounded-xl object-cover" loading="lazy" />
                    <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-3 group-hover:bg-amber-50 group-hover:border-amber-200 transition-colors">
                      <IconComponent
                        size={26}
                        className="text-slate-800 group-hover:text-[#B8860B] transition-colors"
                      />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight group-hover:text-[#B8860B] transition-colors">
                      {card.name}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* All Solutions Button */}
            <div className="pt-3">
              <Link
                href="/get-solutions-for"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:opacity-95 transition-all hover:scale-105"
              >
                All Solutions <ArrowRight size={16} />
              </Link>
            </div>

          </div>

          {/* Right Floating HD Meditating Image Frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative rounded-3xl bg-white/50 border border-white/90 shadow-[0_20px_60px_rgba(30,50,80,0.1)] backdrop-blur-md p-6 max-w-[480px] w-full flex items-center justify-center group overflow-hidden">
              {/* Soft Ambient Inner Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-100/30 via-sky-50/40 to-transparent pointer-events-none" />

              {/* HD Floating Sadguru Sakshi Shree Meditation Portrait */}
              <img
                src="/guruji-meditation-hd.png"
                alt="Sadguru Sakshi Shree Floating in Meditation"
                className="relative z-10 w-full h-auto max-h-[520px] object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.18)] transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
