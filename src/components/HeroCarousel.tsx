"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar, Sparkles } from "lucide-react";
import Link from "next/link";

export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  tag: string;
  link: string;
  buttonText: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "vasant-mahotsav",
    image: "/hero-slider/vasant-mahotsav.jpg",
    title: "Vasant Mahotsav & Divine Celebrations",
    subtitle: "Experience profound meditation, soul-touching kirtan, and Sakshi Shree's divine discourses.",
    tag: "Upcoming Event",
    link: "/events",
    buttonText: "Register for Event",
  },
  {
    id: "new-year-dhyan",
    image: "/hero-slider/new-year-dhyan.jpg",
    title: "New Year Dhyan & Inner Transformation",
    subtitle: "Start your journey towards peace, vitality, and boundless joy with guided Sakshi Sadhna.",
    tag: "Special Sadhna",
    link: "/events",
    buttonText: "Join Session",
  },
  {
    id: "sd-main-banner",
    image: "/hero-slider/sd-main-banner.jpg",
    title: "Science Divine Foundation",
    subtitle: "Spreading the message of love, awareness, and meditation worldwide under Sakshi Shree's guidance.",
    tag: "Global Movement",
    link: "/about-movement",
    buttonText: "Explore Movement",
  },
  {
    id: "banner-1",
    image: "/hero-slider/banner-1.webp",
    title: "Sakshi Sadhna & Meditation Programs",
    subtitle: "Scientific meditation techniques for modern individuals to overcome stress and overthinking.",
    tag: "Spiritual Practice",
    link: "/meditation",
    buttonText: "Learn Meditation",
  },
  {
    id: "banner-2",
    image: "/hero-slider/banner-2.webp",
    title: "Sanjeevani Kriya: Complete Vitality",
    subtitle: "A 15-minute scientific breathing and sound practice to revitalize mind and body daily.",
    tag: "Signature Kriya",
    link: "/sanjeevni-kriya",
    buttonText: "Discover Kriya",
  },
  {
    id: "banner-3",
    image: "/hero-slider/banner-3.webp",
    title: "Design Your Destiny Course",
    subtitle: "Unlock your full potential and align your subconscious mind with your highest aspirations.",
    tag: "Flagship Course",
    link: "/design-your-destiny",
    buttonText: "Enroll Now",
  },
  {
    id: "banner-4",
    image: "/hero-slider/banner-4.webp",
    title: "Science of Joyful Living",
    subtitle: "Transform your relationships, career, and inner health through practical spirituality.",
    tag: "Life Transformation",
    link: "/science-of-joyful-living",
    buttonText: "Explore Course",
  },
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const current = HERO_SLIDES[currentIndex];

  return (
    <div
      className="relative w-full overflow-hidden rounded-3xl border border-amber-300/60 shadow-[0_20px_50px_rgba(82,22,35,0.15)] bg-[#521623] text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Aspect Ratio Container */}
      <div className="relative aspect-[16/9] sm:aspect-[21/9] lg:aspect-[24/9] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* Background Image */}
            <img
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover object-center"
            />

            {/* Gradient Overlays for readable text */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#521623] via-[#521623]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#521623]/80 via-transparent to-transparent" />

            {/* Overlay Text Content */}
            <div className="absolute inset-0 p-6 sm:p-10 lg:p-14 flex flex-col justify-end items-start max-w-2xl space-y-3.5 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/70 backdrop-blur-md border border-amber-400/80 text-amber-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-sm">
                <Sparkles size={12} className="text-amber-400" />
                {current.tag}
              </span>

              <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white leading-tight drop-shadow-md">
                {current.title}
              </h2>

              <p className="text-amber-100/90 text-xs sm:text-sm lg:text-base leading-relaxed line-clamp-2 drop-shadow-xs max-w-xl">
                {current.subtitle}
              </p>

              <div className="pt-2">
                <Link
                  href={current.link}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#F59E0B] hover:bg-[#D97706] text-[#521623] font-extrabold text-xs sm:text-sm shadow-xl transition-all transform hover:scale-105 active:scale-95"
                >
                  <span>{current.buttonText}</span>
                  <ChevronRight size={16} strokeWidth={3} />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Previous Button */}
        <button
          onClick={prevSlide}
          aria-label="Previous Banner"
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all hover:scale-110 cursor-pointer shadow-lg"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          aria-label="Next Banner"
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all hover:scale-110 cursor-pointer shadow-lg"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Bottom Dot Indicators */}
      <div className="bg-[#3B0F19] py-2.5 px-4 flex items-center justify-center gap-2 border-t border-amber-400/20">
        {HERO_SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 cursor-pointer ${
              currentIndex === idx
                ? "w-6 sm:w-8 h-1.5 sm:h-2 bg-[#F59E0B] rounded-full"
                : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-amber-200/40 hover:bg-amber-200/70 rounded-full"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
