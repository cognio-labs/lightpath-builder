"use client";

import React, { useEffect, useRef } from "react";

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatar?: string;
}

function Card({ t }: { t: Testimonial }) {
  const isUrl = t.avatar && (t.avatar.startsWith("http") || t.avatar.startsWith("/"));
  return (
    <div
      className="testimonial-card-item flex-shrink-0"
      style={{
        width: "380px",
        background: "linear-gradient(135deg,#ffffff 0%,#fffdf5 100%)",
        border: "1.5px solid rgba(212,175,55,0.38)",
        borderRadius: "24px",
        padding: "24px",
        boxShadow: "0 8px 28px rgba(82,22,35,0.07)",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        minHeight: "215px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {isUrl ? (
            <img
              src={t.avatar}
              alt={t.author}
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2.5px solid #D4AF37",
                flexShrink: 0,
              }}
            />
          ) : (
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                border: "2.5px solid #D4AF37",
                background: "linear-gradient(135deg,#521623,#B8860B)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontWeight: 700,
                fontSize: "16px",
                color: "#FFF4CF",
              }}
            >
              {(t.avatar ?? t.author.slice(0, 2)).toUpperCase()}
            </div>
          )}
          <div>
            <div
              style={{
                fontFamily: "'Playfair Display',serif",
                fontWeight: 700,
                fontSize: "15px",
                color: "#521623",
                lineHeight: 1.2,
              }}
            >
              {t.author}
            </div>
            <div style={{ fontSize: "12px", color: "#8B6914", fontWeight: 500, marginTop: "3px" }}>
              {t.role}
              {t.company ? ` · ${t.company}` : ""}
            </div>
          </div>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, opacity: 0.4 }}>
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" fill="#D4AF37" />
          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" fill="#D4AF37" />
        </svg>
      </div>

      <p
        style={{
          fontSize: "14px",
          color: "#374151",
          lineHeight: 1.7,
          fontStyle: "italic",
          fontFamily: "'Playfair Display',serif",
          flexGrow: 1,
          margin: 0,
        }}
      >
        &ldquo;{t.quote}&rdquo;
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "12px",
          borderTop: "1px solid rgba(212,175,55,0.28)",
        }}
      >
        <div style={{ display: "flex", gap: "3px" }}>
          {[1, 2, 3, 4, 5].map((s) => (
            <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill="#F59E0B">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
        <span
          style={{
            fontSize: "10px",
            fontWeight: 700,
            color: "#92400E",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Verified Seeker
        </span>
      </div>
    </div>
  );
}

/**
 * Uses the EXACT SAME technique as SolutionsCarousel.tsx:
 *   - Items cloned 4× for seamless infinite loop
 *   - requestAnimationFrame increments scrollLeft every frame
 *   - Resets scrollLeft at scrollWidth / 2 (one full clone set)
 *   - overflow-x: hidden hides the scrollbar but still allows programmatic scrollLeft
 */
export function TestimonialMarquee({ testimonials }: { testimonials: Testimonial[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Clone 4× — same as SolutionsCarousel
  const displayList = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrameId: number;
    const speed = 0.6; // px per frame — medium pace

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
  }, []); // empty deps — only runs once on mount, same as SolutionsCarousel

  return (
    <div className="relative w-full overflow-hidden">
      {/* Fade edges — same as SolutionsCarousel */}
      <div
        className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #FFFDF9 0%, transparent 100%)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #FFFDF9 0%, transparent 100%)" }}
      />

      {/*
        Scroll track — same structure as SolutionsCarousel scrollContainerRef div.
        overflow-x-hidden  +  scrollLeft manipulation  =  smooth infinite scroll
      */}
      <div
        ref={scrollRef}
        className="flex items-stretch gap-5 overflow-x-hidden py-4 px-4 w-full"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
      >
        {displayList.map((t, idx) => (
          <Card key={`${t.author}-${idx}`} t={t} />
        ))}
      </div>
    </div>
  );
}

export default TestimonialMarquee;
