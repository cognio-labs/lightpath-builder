"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SOLUTIONS_LIST } from "@/data/solutionsData";
import { ArrowRight, Sparkles } from "lucide-react";

export const CATEGORY_IMAGE_MAP: Record<string, string> = {
  depression: "/category-icons/family-150x150.webp",
  anxiety: "/category-icons/headache-150x150.webp",
  "sleeping-disorder": "/category-icons/sleeping-150x150.webp",
  overthinking: "/category-icons/overthinking-150x150.webp",
  parenting: "/category-icons/child-150x150.webp",
  wellness: "/category-icons/yoga-150x150.webp",
  relationships: "/category-icons/couple-150x150.webp",
};

const SEVEN_SLUGS = [
  "depression",
  "anxiety",
  "sleeping-disorder",
  "overthinking",
  "parenting",
  "wellness",
  "relationships",
];

export default function SolutionsCarousel() {
  // Only keep the exact 7 requested categories
  const filteredList = SOLUTIONS_LIST.filter((item) =>
    SEVEN_SLUGS.includes(item.slug)
  );

  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-advance active card info continuously every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % filteredList.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [filteredList.length]);

  // Duplicate items 6 times for uninterrupted, continuous infinite looping
  const marqueeItems = [
    ...filteredList,
    ...filteredList,
    ...filteredList,
    ...filteredList,
    ...filteredList,
    ...filteredList,
  ];

  return (
    <section
      className="relative overflow-hidden pt-2 md:pt-4 pb-10 md:pb-12 bg-[#FFFDF9] text-[#4E1321] select-none border-b border-amber-100/80"
      aria-label="Wellness Solutions Navigation Carousel"
    >
      <style>{`
        @keyframes continuousScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-continuous-scroll {
          display: flex;
          width: max-content;
          animation: continuousScroll 48s linear infinite;
        }
      `}</style>

      {/* Soft Ambient Radial Wash */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] pointer-events-none rounded-full blur-[140px] opacity-35"
        style={{
          background:
            "radial-gradient(circle, rgba(212, 175, 55, 0.25) 0%, rgba(255, 248, 230, 0.6) 60%, transparent 80%)",
        }}
      />

      <div className="container-page relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFDF7] border border-[#D4AF37]/40 shadow-sm">
            <Sparkles size={14} className="text-[#B8860B]" />
            <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-[#B8860B]">
              YOUR WELLBEING, OUR PURPOSE
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#4E1321] leading-tight">
            Find Solutions For :
          </h2>

          <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Explore Sakshi Shree&apos;s teachings centered around overcoming common struggles such as depression, anxiety, anger, and more. Find practical guidance to navigate life&apos;s challenges and enhance your well-being.
          </p>
        </div>

        {/* Continuous Uninterrupted Auto-Sliding Marquee Track */}
        <div className="overflow-hidden w-full py-6">
          <div className="animate-continuous-scroll gap-6 sm:gap-10 md:gap-14">
            {marqueeItems.map((item, idx) => {
              const originalIndex = idx % filteredList.length;
              const iconSrc =
                CATEGORY_IMAGE_MAP[item.slug] || "/category-icons/family-150x150.webp";
              const isActive = originalIndex === activeIndex;

              return (
                <div
                  key={`${item.slug}-${idx}`}
                  onClick={() => setActiveIndex(originalIndex)}
                  className="flex-shrink-0"
                >
                  <Link
                    href={`/solutions/${item.slug}`}
                    className={`group relative flex flex-col items-center p-3 rounded-2xl w-[125px] sm:w-[140px] md:w-[150px] transition-all duration-300 text-center ${
                      isActive
                        ? "-translate-y-2 scale-105"
                        : "hover:-translate-y-1.5 opacity-90 hover:opacity-100"
                    }`}
                  >
                    {/* Circle Icon Container */}
                    <div
                      className={`relative w-22 h-22 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${
                        isActive
                          ? "bg-amber-50/90 border-2 border-[#B8860B] shadow-[0_10px_28px_rgba(184,134,11,0.35)] scale-105"
                          : "bg-white border-2 border-[#6B1728] shadow-sm group-hover:border-[#B8860B] group-hover:bg-amber-50/50 group-hover:shadow-md"
                      }`}
                    >
                      <img
                        src={iconSrc}
                        alt={item.name}
                        className={`w-12 h-12 sm:w-14 sm:h-14 object-contain transition-transform duration-300 ${
                          isActive ? "scale-110" : "group-hover:scale-110"
                        }`}
                      />

                      {/* Active Ring Pulse */}
                      {isActive && (
                        <div className="absolute inset-0 rounded-full border border-[#B8860B] animate-ping opacity-30 pointer-events-none" />
                      )}
                    </div>

                    {/* Category Label */}
                    <span
                      className={`text-xs sm:text-sm font-semibold tracking-wide transition-colors duration-300 ${
                        isActive
                          ? "text-[#4E1321] font-bold"
                          : "text-[#521623]/85 group-hover:text-[#B8860B]"
                      }`}
                    >
                      {item.name}
                    </span>

                    {/* Active State Dot Indicator */}
                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full bg-[#B8860B] mt-1.5 shadow-[0_0_6px_#B8860B]" />
                    )}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}


