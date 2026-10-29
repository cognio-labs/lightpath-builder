"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Sparkles, ZoomIn } from "lucide-react";

export interface QuoteCardData {
  id: number;
  label: string;
  themeName: string;
  quote: string;
  highlight: string;
  portrait: string;
  bgImage: string;
  overlayGradient: string;
  layout:
    | "split-horizontal"
    | "circular-medallion"
    | "editorial-minimal"
    | "botanical-dark"
    | "cinematic-profile"
    | "midnight-luxury"
    | "olive-editorial"
    | "burgundy-rose"
    | "champagne-arched";
  cardBg: string;
  cardBorder: string;
  textColor: string;
  highlightColor: string;
  eyebrowColor: string;
  authorColor: string;
  quoteMarkColor: string;
  dividerColor: string;
  tagColor: string;
  tagBg: string;
  badgeGlow: string;
}

export const INSPIRATIONAL_QUOTES: QuoteCardData[] = [
  {
    id: 1,
    label: "Inner Wisdom",
    themeName: "Warm Ivory & Champagne-Gold Waves",
    quote: "Your soul’s voice is the most powerful guide you have; learn to listen to it.",
    highlight: "most powerful guide",
    portrait: "/images/quotes/portraits/portrait-1.webp",
    bgImage: "/images/quotes/backgrounds/bg-1.webp",
    overlayGradient: "linear-gradient(150deg, rgba(253, 251, 247, 0.45) 0%, rgba(248, 240, 228, 0.25) 55%, rgba(243, 230, 210, 0.5) 100%)",
    layout: "split-horizontal",
    cardBg: "#FAF6EE",
    cardBorder: "rgba(212, 175, 55, 0.4)",
    textColor: "#241B16",
    highlightColor: "#9E7418",
    eyebrowColor: "#8C6A2E",
    authorColor: "#6B5020",
    quoteMarkColor: "rgba(212, 175, 55, 0.26)",
    dividerColor: "linear-gradient(90deg, #D4AF37, transparent)",
    tagColor: "#7A591C",
    tagBg: "rgba(255, 255, 255, 0.75)",
    badgeGlow: "rgba(212, 175, 55, 0.25)",
  },
  {
    id: 2,
    label: "Intelligent Living",
    themeName: "Deep Burgundy & Rose-Gold Curves",
    quote: "Every experience is a teacher in disguise. What seems difficult today can become a blessing tomorrow.",
    highlight: "blessing tomorrow",
    portrait: "/images/quotes/portraits/portrait-2.webp",
    bgImage: "/images/quotes/backgrounds/bg-2.webp",
    overlayGradient: "linear-gradient(150deg, rgba(65, 12, 22, 0.3) 0%, rgba(40, 7, 14, 0.45) 100%)",
    layout: "circular-medallion",
    cardBg: "#3A0A12",
    cardBorder: "rgba(232, 180, 184, 0.35)",
    textColor: "#FFF2F4",
    highlightColor: "#F8CAD0",
    eyebrowColor: "#F0B8C0",
    authorColor: "#F5D6DC",
    quoteMarkColor: "rgba(232, 180, 184, 0.22)",
    dividerColor: "linear-gradient(90deg, #F5C2C7, transparent)",
    tagColor: "#FFE3E7",
    tagBg: "rgba(90, 20, 32, 0.7)",
    badgeGlow: "rgba(245, 194, 199, 0.3)",
  },
  {
    id: 3,
    label: "Learn from Mistakes",
    themeName: "Cream & Soft Gold Accents",
    quote: "Never be scared of making mistakes. Learn from every experience and turn new ideas into action.",
    highlight: "turn new ideas into action",
    portrait: "/images/quotes/portraits/portrait-3.webp",
    bgImage: "/images/quotes/backgrounds/bg-3.webp",
    overlayGradient: "linear-gradient(140deg, rgba(255, 255, 255, 0.5) 0%, rgba(252, 247, 238, 0.3) 60%, rgba(247, 237, 218, 0.45) 100%)",
    layout: "editorial-minimal",
    cardBg: "#FAF6EE",
    cardBorder: "rgba(212, 175, 55, 0.38)",
    textColor: "#201A14",
    highlightColor: "#A6802C",
    eyebrowColor: "#8C6A2E",
    authorColor: "#664F24",
    quoteMarkColor: "rgba(197, 168, 92, 0.26)",
    dividerColor: "linear-gradient(90deg, #C5A85C, transparent)",
    tagColor: "#7A5B1D",
    tagBg: "rgba(255, 255, 255, 0.8)",
    badgeGlow: "rgba(197, 168, 92, 0.2)",
  },
  {
    id: 4,
    label: "Become Your Best Self",
    themeName: "Dark Forest Green & Elegant Gold Lines",
    quote: "If you can constantly think of yourself as the person you want to be, you will eventually become that person.",
    highlight: "person you want to be",
    portrait: "/images/quotes/portraits/portrait-4.webp",
    bgImage: "/images/quotes/backgrounds/bg-4.webp",
    overlayGradient: "linear-gradient(155deg, rgba(14, 32, 24, 0.35) 0%, rgba(8, 19, 14, 0.52) 100%)",
    layout: "botanical-dark",
    cardBg: "#0F241B",
    cardBorder: "rgba(212, 175, 55, 0.32)",
    textColor: "#F4F7F4",
    highlightColor: "#F0D796",
    eyebrowColor: "#B6CEAC",
    authorColor: "#E2C068",
    quoteMarkColor: "rgba(212, 175, 55, 0.2)",
    dividerColor: "linear-gradient(90deg, #E5CA85, transparent)",
    tagColor: "#D6E8D0",
    tagBg: "rgba(20, 48, 36, 0.75)",
    badgeGlow: "rgba(212, 175, 55, 0.26)",
  },
  {
    id: 5,
    label: "Master Your Mind",
    themeName: "Warm Beige & Circular Gold Framing",
    quote: "True freedom is found in the mastery of your thoughts and emotions.",
    highlight: "mastery of your thoughts",
    portrait: "/images/quotes/portraits/portrait-5.webp",
    bgImage: "/images/quotes/backgrounds/bg-5.webp",
    overlayGradient: "linear-gradient(145deg, rgba(46, 34, 27, 0.5) 0%, rgba(28, 20, 16, 0.68) 100%)",
    layout: "cinematic-profile",
    cardBg: "#2B1E17",
    cardBorder: "rgba(223, 198, 157, 0.32)",
    textColor: "#FAF6F0",
    highlightColor: "#F5D5A4",
    eyebrowColor: "#DFCCA8",
    authorColor: "#F0E1C9",
    quoteMarkColor: "rgba(223, 198, 157, 0.22)",
    dividerColor: "linear-gradient(90deg, #DFC69D, transparent)",
    tagColor: "#F5E9D5",
    tagBg: "rgba(64, 48, 38, 0.75)",
    badgeGlow: "rgba(223, 198, 157, 0.25)",
  },
  {
    id: 6,
    label: "The Power of Inspiration",
    themeName: "Midnight Navy & Gold Waves",
    quote: "Being inspired is wonderful, but inspiring others is even greater.",
    highlight: "inspiring others is even greater",
    portrait: "/images/quotes/portraits/portrait-6.webp",
    bgImage: "/images/quotes/backgrounds/bg-6.webp",
    overlayGradient: "linear-gradient(150deg, rgba(12, 24, 34, 0.35) 0%, rgba(8, 16, 24, 0.55) 100%)",
    layout: "midnight-luxury",
    cardBg: "#0C1823",
    cardBorder: "rgba(212, 175, 55, 0.48)",
    textColor: "#FFFFFF",
    highlightColor: "#F4DC9A",
    eyebrowColor: "#E2C068",
    authorColor: "#F7E6B6",
    quoteMarkColor: "rgba(212, 175, 55, 0.26)",
    dividerColor: "linear-gradient(90deg, #F2D78F, #B8860B)",
    tagColor: "#F9ECD0",
    tagBg: "rgba(18, 38, 54, 0.75)",
    badgeGlow: "rgba(212, 175, 55, 0.35)",
  },
  {
    id: 7,
    label: "Learn from Others",
    themeName: "Ivory & Muted Olive Accents",
    quote: "Wise people learn from the experiences of others, because learning from your own mistakes can be a costly affair.",
    highlight: "experiences of others",
    portrait: "/images/quotes/portraits/portrait-7.webp",
    bgImage: "/images/quotes/backgrounds/bg-7.webp",
    overlayGradient: "linear-gradient(145deg, rgba(253, 250, 243, 0.48) 0%, rgba(246, 240, 227, 0.3) 60%, rgba(240, 231, 213, 0.45) 100%)",
    layout: "olive-editorial",
    cardBg: "#F6F1E6",
    cardBorder: "rgba(122, 138, 108, 0.42)",
    textColor: "#222D21",
    highlightColor: "#6B5D21",
    eyebrowColor: "#516547",
    authorColor: "#394A31",
    quoteMarkColor: "rgba(122, 138, 108, 0.25)",
    dividerColor: "linear-gradient(90deg, #8A7632, transparent)",
    tagColor: "#415438",
    tagBg: "rgba(255, 255, 255, 0.8)",
    badgeGlow: "rgba(122, 138, 108, 0.22)",
  },
  {
    id: 8,
    label: "Positive Mindset",
    themeName: "Burgundy & Blush with Flowing Curves",
    quote: "A positive mind brings peace, a clear vision, and the strength to create a better life.",
    highlight: "peace, a clear vision",
    portrait: "/images/quotes/portraits/portrait-8.webp",
    bgImage: "/images/quotes/backgrounds/bg-8.webp",
    overlayGradient: "linear-gradient(150deg, rgba(74, 20, 29, 0.32) 0%, rgba(42, 8, 14, 0.52) 100%)",
    layout: "burgundy-rose",
    cardBg: "#3A0B13",
    cardBorder: "rgba(240, 185, 195, 0.38)",
    textColor: "#FFF5F7",
    highlightColor: "#FCC8D0",
    eyebrowColor: "#F4B2BC",
    authorColor: "#F9D7DC",
    quoteMarkColor: "rgba(240, 185, 195, 0.24)",
    dividerColor: "linear-gradient(90deg, #FBC4CC, transparent)",
    tagColor: "#FFE8EC",
    tagBg: "rgba(92, 22, 34, 0.75)",
    badgeGlow: "rgba(251, 196, 204, 0.3)",
  },
  {
    id: 9,
    label: "Continuous Growth",
    themeName: "Cream & Champagne Gold Layered Waves",
    quote: "Keep learning, keep growing, and keep moving forward. That is the path to an intelligent life.",
    highlight: "intelligent life",
    portrait: "/images/quotes/portraits/portrait-9.webp",
    bgImage: "/images/quotes/backgrounds/bg-9.webp",
    overlayGradient: "linear-gradient(145deg, rgba(254, 252, 248, 0.45) 0%, rgba(247, 239, 227, 0.28) 55%, rgba(242, 228, 207, 0.48) 100%)",
    layout: "champagne-arched",
    cardBg: "#F9F4EA",
    cardBorder: "rgba(212, 175, 55, 0.42)",
    textColor: "#221A14",
    highlightColor: "#9E7418",
    eyebrowColor: "#8C6A2A",
    authorColor: "#694D18",
    quoteMarkColor: "rgba(212, 175, 55, 0.26)",
    dividerColor: "linear-gradient(90deg, #D4AF37, transparent)",
    tagColor: "#7A5716",
    tagBg: "rgba(255, 255, 255, 0.78)",
    badgeGlow: "rgba(212, 175, 55, 0.26)",
  },
];

export default function InspirationalQuotesSection() {
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const openModal = useCallback((index: number) => {
    setActiveModalIndex(index);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModalIndex(null);
  }, []);

  const nextQuote = useCallback(() => {
    setActiveModalIndex((prev) => (prev === null ? null : (prev + 1) % INSPIRATIONAL_QUOTES.length));
  }, []);

  const prevQuote = useCallback(() => {
    setActiveModalIndex((prev) =>
      prev === null ? null : (prev - 1 + INSPIRATIONAL_QUOTES.length) % INSPIRATIONAL_QUOTES.length
    );
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (activeModalIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      else if (e.key === "ArrowRight") nextQuote();
      else if (e.key === "ArrowLeft") prevQuote();
    };

    window.addEventListener("keydown", handleKeyDown);
    if (modalRef.current) {
      modalRef.current.focus();
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalIndex, closeModal, nextQuote, prevQuote]);

  // Helper to render quote with highlighted words
  const renderHighlightedQuote = (quote: string, highlight: string, highlightColor: string) => {
    const parts = quote.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <>
        “
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span
              key={i}
              style={{
                color: highlightColor,
                fontWeight: 600,
                textDecoration: "underline",
                textDecorationColor: "currentColor",
                textUnderlineOffset: "4px",
                textDecorationThickness: "1.5px",
              }}
            >
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
        ”
      </>
    );
  };

  return (
    <section className="iq-editorial-section" aria-label="Words of Wisdom — Inspirational Quotes">
      <style>{`
        /* ── Typography & Global Styles ── */
        .iq-editorial-section {
          position: relative;
          width: 100%;
          padding: 80px 0 100px;
          background: #FAF8F5;
          scroll-margin-top: 100px;
        }

        /* ── Section Header ── */
        .iq-header-wrap {
          text-align: center;
          max-width: 820px;
          margin: 0 auto 64px auto;
          padding: 0 20px;
        }
        .iq-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.22em;
          color: #9B7A3A;
          text-transform: uppercase;
          margin-bottom: 18px;
        }
        .iq-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2rem, 4vw, 3.25rem);
          font-weight: 700;
          line-height: 1.18;
          color: #1A130E;
          letter-spacing: -0.015em;
          margin-bottom: 20px;
        }
        .iq-title span {
          color: #521623;
          font-style: italic;
        }
        .iq-desc {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: clamp(1rem, 1.8vw, 1.125rem);
          color: #5C4B3C;
          line-height: 1.7;
          max-width: 580px;
          margin: 0 auto;
        }

        /* ── 3x3 Responsive Grid ── */
        .iq-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        @media (max-width: 1040px) {
          .iq-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
            padding: 0 20px;
          }
        }

        @media (max-width: 680px) {
          .iq-grid {
            grid-template-columns: 1fr;
            gap: 24px;
            padding: 0 16px;
          }
        }

        /* ── Base Card ── */
        .iq-card {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 490px;
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 6px 24px rgba(28, 16, 9, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04);
          transition: transform 0.38s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.38s cubic-bezier(0.22, 1, 0.36, 1),
                      border-color 0.38s ease;
          cursor: pointer;
          overflow: hidden;
          outline: none;
        }

        .iq-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 50px rgba(28, 16, 9, 0.18), 0 0 0 1px rgba(212, 175, 55, 0.35);
        }

        .iq-card:focus-visible {
          outline: 2px solid #D4AF37;
          outline-offset: 4px;
        }

        /* ── Decorative Background Image Layer ── */
        .iq-card-bg-layer {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          transition: transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
          pointer-events: none;
        }

        .iq-card:hover .iq-card-bg-layer {
          transform: scale(1.04);
        }

        /* ── Readability Overlay Layer ── */
        .iq-card-readability-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }

        /* Image hover zoom inside cards */
        .iq-card:hover .iq-portrait-img {
          transform: scale(1.05);
        }

        .iq-portrait-img {
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          transform-origin: center center;
          object-fit: cover;
          display: block;
        }

        /* Card Top Metadata */
        .iq-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          position: relative;
          z-index: 2;
        }

        .iq-tag {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 100px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          backdrop-filter: blur(8px);
        }

        .iq-card-num {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 14px;
          font-weight: 600;
          opacity: 0.75;
          letter-spacing: 0.08em;
        }

        /* Watermark quotation symbol */
        .iq-quote-watermark {
          position: absolute;
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 120px;
          line-height: 1;
          user-select: none;
          pointer-events: none;
          z-index: 2;
        }

        /* Quote typography */
        .iq-quote-text {
          position: relative;
          z-index: 2;
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(1.15rem, 1.8vw, 1.35rem);
          line-height: 1.55;
          margin-bottom: 24px;
          letter-spacing: -0.01em;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
        }


        /* Card Footer: Author details */
        .iq-card-footer {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
        }

        .iq-author-name {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .iq-author-sub {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 10px;
          opacity: 0.78;
          letter-spacing: 0.04em;
          margin-top: 2px;
        }

        .iq-zoom-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.85;
          transition: opacity 0.2s, transform 0.2s;
          backdrop-filter: blur(6px);
        }
        .iq-card:hover .iq-zoom-btn {
          opacity: 1;
          transform: scale(1.1);
        }

        /* ── Layout Variations ── */

        /* 1. Split Horizontal (Card 1) */
        .iq-layout-split-h {
          display: grid;
          grid-template-columns: 1fr 140px;
          gap: 20px;
          align-items: center;
          margin-bottom: 20px;
          position: relative;
          z-index: 2;
        }
        .iq-portrait-frame-1 {
          width: 140px;
          height: 180px;
          border-radius: 70px 70px 20px 20px;
          overflow: hidden;
          box-shadow: 0 10px 24px rgba(212, 175, 55, 0.25);
          border: 2px solid rgba(212, 175, 55, 0.5);
          background: #FFF;
        }

        /* 2. Circular Medallion (Card 2) */
        .iq-medallion-wrap {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 22px;
          position: relative;
          z-index: 2;
        }
        .iq-medallion-circle {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
          box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.6), 0 0 0 5px rgba(245, 194, 199, 0.35);
          background: #4A121E;
        }

        /* 3. Editorial Minimalist (Card 3) */
        .iq-editorial-box {
          display: flex;
          gap: 18px;
          align-items: flex-start;
          margin-bottom: 20px;
          position: relative;
          z-index: 2;
        }
        .iq-gold-accent-rail {
          width: 3px;
          align-self: stretch;
          background: linear-gradient(180deg, #D4AF37, #E5CA85, transparent);
          border-radius: 3px;
          flex-shrink: 0;
        }
        .iq-portrait-stamp {
          width: 72px;
          height: 88px;
          border-radius: 12px;
          overflow: hidden;
          border: 1.5px solid rgba(212, 175, 55, 0.5);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
          margin-top: 6px;
          flex-shrink: 0;
          background: #FFF;
        }

        /* 4. Botanical Dark (Card 4) */
        .iq-botanical-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
          position: relative;
          z-index: 2;
        }
        .iq-botanical-portrait {
          width: 82px;
          height: 104px;
          border-radius: 18px;
          overflow: hidden;
          border: 1.5px solid rgba(212, 175, 55, 0.5);
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.45);
          flex-shrink: 0;
          background: #0E241B;
        }

        /* 5. Cinematic Profile (Card 5) */
        .iq-cinematic-wrap {
          position: relative;
          display: flex;
          flex-direction: column;
          z-index: 2;
        }
        .iq-cinematic-banner {
          width: 100%;
          height: 140px;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 20px;
          position: relative;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
          border: 1.5px solid rgba(223, 198, 157, 0.4);
          background: #231914;
        }
        .iq-cinematic-banner::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(0deg, rgba(32, 22, 17, 0.75) 0%, transparent 60%);
        }

        /* 6. Midnight Luxury (Card 6) */
        .iq-midnight-frame {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 22px;
          position: relative;
          z-index: 2;
        }
        .iq-midnight-portrait {
          width: 86px;
          height: 106px;
          border-radius: 14px;
          overflow: hidden;
          border: 1.5px solid rgba(212, 175, 55, 0.65);
          box-shadow: 0 8px 24px rgba(212, 175, 55, 0.25);
          flex-shrink: 0;
          background: #0D1A25;
        }

        /* 7. Olive Editorial (Card 7) */
        .iq-olive-wrap {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 20px;
          position: relative;
          z-index: 2;
        }
        .iq-olive-portrait {
          width: 82px;
          height: 100px;
          border-radius: 40px 40px 14px 14px;
          overflow: hidden;
          border: 1.5px solid rgba(122, 138, 108, 0.5);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
          flex-shrink: 0;
          background: #FFF;
        }

        /* 8. Burgundy Rose (Card 8) */
        .iq-rose-wrap {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 22px;
          position: relative;
          z-index: 2;
        }
        .iq-rose-portrait {
          width: 86px;
          height: 86px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid rgba(245, 194, 199, 0.6);
          box-shadow: 0 0 20px rgba(245, 194, 199, 0.3);
          flex-shrink: 0;
          background: #4A121E;
        }

        /* 9. Champagne Arched (Card 9) */
        .iq-arched-wrap {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 22px;
          position: relative;
          z-index: 2;
        }
        .iq-arched-portrait {
          width: 84px;
          height: 110px;
          border-radius: 42px 42px 16px 16px;
          overflow: hidden;
          border: 2px solid rgba(212, 175, 55, 0.55);
          box-shadow: 0 10px 24px rgba(212, 175, 55, 0.25);
          flex-shrink: 0;
          background: #FFF;
        }

        /* ═══ LUXURY LIGHTBOX MODAL ═══ */
        .iq-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(12, 8, 6, 0.92);
          backdrop-filter: blur(14px) saturate(0.8);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: iqFadeIn 0.22s ease-out;
        }

        @keyframes iqFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .iq-modal-card {
          position: relative;
          width: 100%;
          max-width: 680px;
          border-radius: 28px;
          padding: 44px 40px;
          box-shadow: 0 40px 100px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(212, 175, 55, 0.35);
          animation: iqScaleIn 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          overflow: hidden;
          outline: none;
        }

        @keyframes iqScaleIn {
          from { opacity: 0; transform: scale(0.92) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .iq-modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 10;
          backdrop-filter: blur(8px);
        }
        .iq-modal-close:hover {
          transform: scale(1.1);
        }

        .iq-modal-nav-btn {
          position: fixed;
          top: 50%;
          transform: translateY(-50%);
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(24, 16, 12, 0.85);
          backdrop-filter: blur(10px);
          border: 1.5px solid rgba(212, 175, 55, 0.55);
          color: #E2C068;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.22s ease;
          z-index: 999999;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        .iq-modal-nav-btn:hover {
          background: #D4AF37;
          color: #1A130E;
          transform: translateY(-50%) scale(1.08);
          box-shadow: 0 12px 32px rgba(212, 175, 55, 0.45);
        }
        .iq-modal-nav-btn.prev { left: 24px; }
        .iq-modal-nav-btn.next { right: 24px; }

        @media (max-width: 768px) {
          .iq-modal-nav-btn { width: 42px; height: 42px; }
          .iq-modal-nav-btn.prev { left: 8px; }
          .iq-modal-nav-btn.next { right: 8px; }
        }

        .iq-modal-portrait-wrap {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          overflow: hidden;
          margin: 0 auto 24px auto;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
          border: 3px solid #D4AF37;
          background: #FFF;
        }

        /* Dot Indicators */
        .iq-modal-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 24px;
        }
        .iq-modal-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.25);
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }
        .iq-modal-dot.active {
          background: #D4AF37;
          transform: scale(1.35);
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .iq-card, .iq-card-bg-layer, .iq-portrait-img, .iq-modal-card, .iq-zoom-btn {
            transition: none !important;
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* ── Section Header ── */}
      <div className="iq-header-wrap">
        <div className="iq-eyebrow">WISDOM FOR EVERYDAY LIVING</div>
        <h2 className="iq-title">
          Words That <span>Inspire.</span> Wisdom That <span>Transforms.</span>
        </h2>
        <p className="iq-desc">
          Discover timeless insights from Sakshi Shree to bring clarity, purpose, and peace into
          everyday life.
        </p>
      </div>

      {/* ── 9 Quote Cards Responsive Grid ── */}
      <div className="iq-grid" role="list">
        {INSPIRATIONAL_QUOTES.map((item, index) => {
          return (
            <div
              key={item.id}
              role="listitem"
              tabIndex={0}
              className="iq-card"
              style={{
                backgroundColor: item.cardBg,
                border: `1px solid ${item.cardBorder}`,
              }}
              onClick={() => openModal(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openModal(index);
                }
              }}
              aria-label={`Quote ${item.id} of 9: ${item.label} by Sakshi Shree. Press enter to open detail.`}
            >
              {/* ── 1. Background Image Layer ── */}
              <div
                className="iq-card-bg-layer"
                style={{
                  backgroundImage: `url(${item.bgImage})`,
                }}
              />

              {/* ── 2. Readability Overlay Layer ── */}
              <div
                className="iq-card-readability-overlay"
                style={{
                  background: item.overlayGradient,
                }}
              />

              {/* Giant Watermark quotation mark */}
              <div
                className="iq-quote-watermark"
                style={{
                  color: item.quoteMarkColor,
                  top: item.layout === "cinematic-profile" ? "80px" : "12px",
                  right: "24px",
                }}
              >
                “
              </div>

              {/* Card Top: Eyebrow Tag + Number */}
              <div className="iq-card-top">
                <span
                  className="iq-tag"
                  style={{
                    color: item.tagColor,
                    background: item.tagBg,
                    boxShadow: `0 0 12px ${item.badgeGlow}`,
                    border: `1px solid ${item.cardBorder}`,
                  }}
                >
                  <Sparkles size={11} />
                  {item.label}
                </span>
                <span className="iq-card-num" style={{ color: item.textColor }}>
                  0{item.id}
                </span>
              </div>

              {/* ── Visual Layout Variations ── */}

              {/* Card 1: Split Horizontal */}
              {item.layout === "split-horizontal" && (
                <div className="iq-layout-split-h">
                  <p className="iq-quote-text" style={{ color: item.textColor, margin: 0 }}>
                    {renderHighlightedQuote(item.quote, item.highlight, item.highlightColor)}
                  </p>
                  <div className="iq-portrait-frame-1">
                    <img
                      src={item.portrait}
                      alt="Sakshi Shree — Inner Wisdom portrait"
                      width={280}
                      height={360}
                      className="iq-portrait-img w-full h-full"
                      loading="lazy"
                    />
                  </div>
                </div>
              )}

              {/* Card 2: Circular Medallion */}
              {item.layout === "circular-medallion" && (
                <div>
                  <div className="iq-medallion-wrap">
                    <div className="iq-medallion-circle">
                      <img
                        src={item.portrait}
                        alt="Sakshi Shree — Intelligent Living portrait"
                        width={180}
                        height={180}
                        className="iq-portrait-img w-full h-full"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "11px",
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: item.eyebrowColor,
                          fontWeight: 700,
                        }}
                      >
                        SACRED REFLECTION
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: item.textColor,
                          opacity: 0.85,
                          fontStyle: "italic",
                        }}
                      >
                        Timeless clarity
                      </div>
                    </div>
                  </div>
                  <p className="iq-quote-text" style={{ color: item.textColor }}>
                    {renderHighlightedQuote(item.quote, item.highlight, item.highlightColor)}
                  </p>
                </div>
              )}

              {/* Card 3: Editorial Minimalist */}
              {item.layout === "editorial-minimal" && (
                <div>
                  <div className="iq-editorial-box">
                    <div className="iq-gold-accent-rail" />
                    <div>
                      <p className="iq-quote-text" style={{ color: item.textColor, margin: 0 }}>
                        {renderHighlightedQuote(item.quote, item.highlight, item.highlightColor)}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
                    <div className="iq-portrait-stamp">
                      <img
                        src={item.portrait}
                        alt="Sakshi Shree — Learn from Mistakes portrait"
                        width={150}
                        height={180}
                        className="iq-portrait-img w-full h-full"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Card 4: Botanical Dark */}
              {item.layout === "botanical-dark" && (
                <div>
                  <div className="iq-botanical-header">
                    <div className="iq-botanical-portrait">
                      <img
                        src={item.portrait}
                        alt="Sakshi Shree — Become Your Best Self portrait"
                        width={160}
                        height={208}
                        className="iq-portrait-img w-full h-full"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "11px",
                          letterSpacing: "0.16em",
                          textTransform: "uppercase",
                          color: item.eyebrowColor,
                          fontWeight: 700,
                          marginBottom: "4px",
                        }}
                      >
                        CONSCIOUS BEING
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: item.textColor,
                          opacity: 0.85,
                        }}
                      >
                        Transforming thought into reality
                      </div>
                    </div>
                  </div>
                  <p className="iq-quote-text" style={{ color: item.textColor }}>
                    {renderHighlightedQuote(item.quote, item.highlight, item.highlightColor)}
                  </p>
                </div>
              )}

              {/* Card 5: Cinematic Profile */}
              {item.layout === "cinematic-profile" && (
                <div className="iq-cinematic-wrap">
                  <div className="iq-cinematic-banner">
                    <img
                      src={item.portrait}
                      alt="Sakshi Shree — Master Your Mind cinematic profile"
                      width={500}
                      height={280}
                      className="iq-portrait-img w-full h-full"
                      style={{ objectPosition: "center 25%" }}
                      loading="lazy"
                    />
                  </div>
                  <p className="iq-quote-text" style={{ color: item.textColor }}>
                    {renderHighlightedQuote(item.quote, item.highlight, item.highlightColor)}
                  </p>
                </div>
              )}

              {/* Card 6: Midnight Luxury */}
              {item.layout === "midnight-luxury" && (
                <div>
                  <div className="iq-midnight-frame">
                    <div className="iq-midnight-portrait">
                      <img
                        src={item.portrait}
                        alt="Sakshi Shree — The Power of Inspiration portrait"
                        width={172}
                        height={212}
                        className="iq-portrait-img w-full h-full"
                        style={{ objectPosition: "center 20%" }}
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "11px",
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: item.eyebrowColor,
                          fontWeight: 700,
                        }}
                      >
                        LUMINOUS PRESENCE
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: item.textColor,
                          opacity: 0.85,
                          fontStyle: "italic",
                        }}
                      >
                        High-frequency living
                      </div>
                    </div>
                  </div>
                  <p className="iq-quote-text" style={{ color: item.textColor }}>
                    {renderHighlightedQuote(item.quote, item.highlight, item.highlightColor)}
                  </p>
                </div>
              )}

              {/* Card 7: Olive Editorial */}
              {item.layout === "olive-editorial" && (
                <div>
                  <div className="iq-olive-wrap">
                    <div className="iq-olive-portrait">
                      <img
                        src={item.portrait}
                        alt="Sakshi Shree — Learn from Others portrait"
                        width={164}
                        height={200}
                        className="iq-portrait-img w-full h-full"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "11px",
                          letterSpacing: "0.16em",
                          textTransform: "uppercase",
                          color: item.eyebrowColor,
                          fontWeight: 700,
                          marginBottom: "4px",
                        }}
                      >
                        DEEP DISCERNMENT
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: item.textColor,
                          opacity: 0.85,
                        }}
                      >
                        The wisdom of observation
                      </div>
                    </div>
                  </div>
                  <p className="iq-quote-text" style={{ color: item.textColor }}>
                    {renderHighlightedQuote(item.quote, item.highlight, item.highlightColor)}
                  </p>
                </div>
              )}

              {/* Card 8: Burgundy Rose */}
              {item.layout === "burgundy-rose" && (
                <div>
                  <div className="iq-rose-wrap">
                    <div className="iq-rose-portrait">
                      <img
                        src={item.portrait}
                        alt="Sakshi Shree — Positive Mindset portrait"
                        width={172}
                        height={172}
                        className="iq-portrait-img w-full h-full"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "11px",
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: item.eyebrowColor,
                          fontWeight: 700,
                        }}
                      >
                        INNER HARMONY
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: item.textColor,
                          opacity: 0.85,
                          fontStyle: "italic",
                        }}
                      >
                        Grace and stillness
                      </div>
                    </div>
                  </div>
                  <p className="iq-quote-text" style={{ color: item.textColor }}>
                    {renderHighlightedQuote(item.quote, item.highlight, item.highlightColor)}
                  </p>
                </div>
              )}

              {/* Card 9: Champagne Arched */}
              {item.layout === "champagne-arched" && (
                <div>
                  <div className="iq-arched-wrap">
                    <div className="iq-arched-portrait">
                      <img
                        src={item.portrait}
                        alt="Sakshi Shree — Continuous Growth portrait"
                        width={168}
                        height={220}
                        className="iq-portrait-img w-full h-full"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "11px",
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: item.eyebrowColor,
                          fontWeight: 700,
                          marginBottom: "4px",
                        }}
                      >
                        EXPANSIVE CONSCIOUSNESS
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: item.textColor,
                          opacity: 0.85,
                        }}
                      >
                        The evolutionary path
                      </div>
                    </div>
                  </div>
                  <p className="iq-quote-text" style={{ color: item.textColor }}>
                    {renderHighlightedQuote(item.quote, item.highlight, item.highlightColor)}
                  </p>
                </div>
              )}

              {/* Card Footer */}
              <div className="iq-card-footer">
                <div>
                  <div className="iq-author-name" style={{ color: item.authorColor }}>
                    SAKSHI SHREE
                  </div>
                  <div className="iq-author-sub" style={{ color: item.textColor }}>
                    Enlightened Master & Spiritual Guide
                  </div>
                </div>

                <div
                  className="iq-zoom-btn"
                  style={{
                    background: item.tagBg,
                    color: item.highlightColor,
                    border: `1px solid ${item.cardBorder}`,
                  }}
                  title="View full quote detail"
                >
                  <ZoomIn size={14} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Subtitle Count Indicator ── */}
      <div
        style={{
          textAlign: "center",
          marginTop: "44px",
          color: "#9B7A3A",
          fontSize: "12.5px",
          letterSpacing: "0.08em",
          fontWeight: 600,
          textTransform: "uppercase",
        }}
      >
        9 Curated Quotes for Transformation · Click any card to expand
      </div>

      {/* ═══ LUXURY LIGHTBOX MODAL ═══ */}
      {activeModalIndex !== null && (
        <div
          className="iq-modal-backdrop"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label={`Expanded Quote: ${INSPIRATIONAL_QUOTES[activeModalIndex].label}`}
        >
          <div
            ref={modalRef}
            tabIndex={-1}
            className="iq-modal-card"
            style={{
              backgroundColor: INSPIRATIONAL_QUOTES[activeModalIndex].cardBg,
              border: `1px solid ${INSPIRATIONAL_QUOTES[activeModalIndex].cardBorder}`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Background Layer */}
            <div
              className="iq-card-bg-layer"
              style={{
                backgroundImage: `url(${INSPIRATIONAL_QUOTES[activeModalIndex].bgImage})`,
              }}
            />
            {/* Modal Readability Overlay */}
            <div
              className="iq-card-readability-overlay"
              style={{
                background: INSPIRATIONAL_QUOTES[activeModalIndex].overlayGradient,
              }}
            />

            {/* Modal Interactive Content (z-index: 2) */}
            <div style={{ position: "relative", zIndex: 2 }}>
              {/* Close Button */}
              <button
                className="iq-modal-close"
                style={{
                  color: INSPIRATIONAL_QUOTES[activeModalIndex].textColor,
                  background: INSPIRATIONAL_QUOTES[activeModalIndex].tagBg,
                  border: `1px solid ${INSPIRATIONAL_QUOTES[activeModalIndex].cardBorder}`,
                }}
                onClick={closeModal}
                aria-label="Close quote modal"
              >
                <X size={20} />
              </button>

              {/* Prev / Next Buttons */}
              <button
                className="iq-modal-nav-btn prev"
                onClick={prevQuote}
                aria-label="Previous quote"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className="iq-modal-nav-btn next"
                onClick={nextQuote}
                aria-label="Next quote"
              >
                <ChevronRight size={24} />
              </button>

              {/* Modal Portrait */}
              <div className="iq-modal-portrait-wrap">
                <img
                  src={INSPIRATIONAL_QUOTES[activeModalIndex].portrait}
                  alt={`Sakshi Shree — ${INSPIRATIONAL_QUOTES[activeModalIndex].label}`}
                  width={280}
                  height={280}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Modal Tag */}
              <div style={{ textAlign: "center", marginBottom: "16px" }}>
                <span
                  className="iq-tag"
                  style={{
                    color: INSPIRATIONAL_QUOTES[activeModalIndex].tagColor,
                    background: INSPIRATIONAL_QUOTES[activeModalIndex].tagBg,
                    border: `1px solid ${INSPIRATIONAL_QUOTES[activeModalIndex].cardBorder}`,
                  }}
                >
                  <Sparkles size={11} />
                  {INSPIRATIONAL_QUOTES[activeModalIndex].label} · CARD 0
                  {INSPIRATIONAL_QUOTES[activeModalIndex].id} OF 09
                </span>
              </div>

              {/* Modal Quote */}
              <p
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(1.35rem, 2.5vw, 1.85rem)",
                  lineHeight: 1.5,
                  textAlign: "center",
                  color: INSPIRATIONAL_QUOTES[activeModalIndex].textColor,
                  marginBottom: "24px",
                }}
              >
                {renderHighlightedQuote(
                  INSPIRATIONAL_QUOTES[activeModalIndex].quote,
                  INSPIRATIONAL_QUOTES[activeModalIndex].highlight,
                  INSPIRATIONAL_QUOTES[activeModalIndex].highlightColor
                )}
              </p>

              {/* Author */}
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: INSPIRATIONAL_QUOTES[activeModalIndex].authorColor,
                    marginBottom: "4px",
                  }}
                >
                  SAKSHI SHREE
                </div>
                <div
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: "11px",
                    color: INSPIRATIONAL_QUOTES[activeModalIndex].textColor,
                    opacity: 0.8,
                  }}
                >
                  Enlightened Master & Founder, Science Divine Foundation
                </div>
              </div>

              {/* Dot Navigation */}
              <div className="iq-modal-dots">
                {INSPIRATIONAL_QUOTES.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    className={`iq-modal-dot ${dotIdx === activeModalIndex ? "active" : ""}`}
                    onClick={() => setActiveModalIndex(dotIdx)}
                    aria-label={`Jump to quote ${dotIdx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
