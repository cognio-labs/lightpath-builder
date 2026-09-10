"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { SOLUTIONS_LIST } from "@/data/solutionsData";
import { Sparkles } from "lucide-react";

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
  const filteredList = SOLUTIONS_LIST.filter((item) =>
    SEVEN_SLUGS.includes(item.slug)
  );

  // Clone items 4 times to ensure a completely seamless continuous infinite marquee
  const displayList = [
    ...filteredList,
    ...filteredList,
    ...filteredList,
    ...filteredList,
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Smooth continuous auto-scroll that never stops (no pause on hover, 60fps)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId: number;
    const speed = 0.85; // smooth scrolling speed

    const step = () => {
      if (container) {
        container.scrollLeft += speed;
        // Seamlessly loop back by half width when passing the midpoint
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft -= container.scrollWidth / 2;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [filteredList]);

  return (
    <section
      className="relative overflow-hidden pt-6 pb-12 bg-[#FFFDF9] text-[#4E1321] select-none border-b border-amber-100/80"
      aria-label="Wellness Solutions Navigation Carousel"
    >
      {/* Soft Ambient Radial Wash */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] pointer-events-none rounded-full blur-[140px] opacity-35"
        style={{
          background:
            "radial-gradient(circle, rgba(212, 175, 55, 0.25) 0%, rgba(255, 248, 230, 0.6) 60%, transparent 80%)",
        }}
      />

      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
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

        {/* Continuous Auto-Scrolling Track (No Arrow Buttons, Never Stops) */}
        <div className="relative w-full overflow-hidden">
          {/* Subtle edge fade masks for high-end look */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#FFFDF9] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#FFFDF9] to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollContainerRef}
            className="flex items-center gap-4 sm:gap-6 overflow-x-hidden py-6 px-4 w-full"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {displayList.map((item, idx) => {
              const iconSrc =
                CATEGORY_IMAGE_MAP[item.slug] || "/category-icons/family-150x150.webp";

              return (
                <div
                  key={`${item.slug}-${idx}`}
                  className="carousel-card-item flex-shrink-0"
                >
                  <Link
                    href={`/solutions/${item.slug}`}
                    className="group relative flex flex-col items-center p-3 rounded-2xl w-[120px] sm:w-[135px] md:w-[150px] transition-all duration-300 text-center hover:-translate-y-2 hover:scale-105"
                  >
                    {/* Circle Icon Container */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mb-3 transition-all duration-300 bg-white border-2 border-[#6B1728] shadow-sm group-hover:border-[#B8860B] group-hover:bg-amber-50/70 group-hover:shadow-[0_8px_24px_rgba(184,134,11,0.25)]">
                      <img
                        src={iconSrc}
                        alt={item.name}
                        className="w-11 h-11 sm:w-14 sm:h-14 object-contain transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>

                    {/* Category Label */}
                    <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#521623]/90 group-hover:text-[#B8860B] group-hover:font-bold transition-colors duration-300">
                      {item.name}
                    </span>
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
