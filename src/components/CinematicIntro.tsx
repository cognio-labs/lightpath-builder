"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

export default function CinematicIntro() {
  const [shouldRender, setShouldRender] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [darkVeil, setDarkVeil] = useState(true);
  const [isEnding, setIsEnding] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isEndingRef = useRef(false);
  const textAppearedRef = useRef(false);
  const textDisappearedRef = useRef(false);

  const finishIntro = useCallback((immediate = false) => {
    if (isEndingRef.current) return;
    isEndingRef.current = true;
    setIsEnding(true);

    try {
      sessionStorage.setItem("science_divine_intro_seen", "true");
    } catch {}

    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
      document.documentElement.classList.add("skip-intro");
    }

    // Allow graceful fade out into the existing homepage
    const unmountDelay = immediate ? 250 : 850;
    setTimeout(() => {
      setShouldRender(false);
    }, unmountDelay);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    isEndingRef.current = false;

    // Check query param ?intro=true
    const searchParams = new URLSearchParams(window.location.search);
    const forceIntro = searchParams.get("intro") === "true";

    if (forceIntro) {
      document.documentElement.classList.remove("skip-intro");
    }

    // Check sessionStorage
    let hasSeen = false;
    try {
      hasSeen = sessionStorage.getItem("science_divine_intro_seen") === "true";
    } catch {
      hasSeen = false;
    }

    if (hasSeen && !forceIntro) {
      document.documentElement.classList.add("skip-intro");
      return;
    }

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion && !forceIntro) {
      // Shortened intro with a simple fade transition for reduced motion
      setShouldRender(true);
      setTextVisible(true);
      const reducedTimer = setTimeout(() => {
        finishIntro(false);
      }, 1500);
      return () => clearTimeout(reducedTimer);
    }

    // Activate 8-second cinematic intro
    setShouldRender(true);
    setIsEnding(false);
    document.body.style.overflow = "hidden";

    // Start video playback immediately
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }

    // Text appears smoothly
    const textEnterTimer = setTimeout(() => {
      setTextVisible(true);
      textAppearedRef.current = true;
    }, 300);

    // Text fades away smoothly at ~2.2s right as the doors start opening,
    // giving the user ample time to read the spiritual message before focus shifts to Guru Ji
    const textExitTimer = setTimeout(() => {
      setTextVisible(false);
      setDarkVeil(false);
      textDisappearedRef.current = true;
    }, 2200);

    // Fallback safety timer: ensure homepage is ALWAYS revealed within ~8.5s
    const fallbackTimer = setTimeout(() => {
      finishIntro(false);
    }, 8500);

    return () => {
      clearTimeout(textEnterTimer);
      clearTimeout(textExitTimer);
      clearTimeout(fallbackTimer);
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [finishIntro]);

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    finishIntro(true);
  };

  const handleVideoEnded = () => {
    finishIntro(false);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration || isEndingRef.current) return;

    const current = video.currentTime;
    const duration = video.duration;

    // Dynamically synchronize the final reveal with the actual HTML5 video duration:
    // When the camera pushes through the doorway into the sunrise (within 0.45s of the video end),
    // trigger the dissolve into the matching homepage sunrise
    if (duration - current <= 0.45) {
      finishIntro(false);
    }
  };

  if (!shouldRender) return null;

  return (
    <div
      id="science-divine-cinematic-intro"
      role="dialog"
      aria-label="Welcome Experience"
      aria-modal="true"
      className={`fixed inset-0 z-[99999] overflow-hidden flex items-center justify-center select-none transition-all duration-800 ease-out ${
        isEnding
          ? "opacity-0 scale-105 pointer-events-none"
          : "opacity-100 scale-100"
      }`}
      style={{
        backgroundColor: "#FFF8E8", // Cream background matching website
      }}
    >
      {/* ─── 1. 4-Second Cinematic Door Opening Video with Guru Ji ─── */}
      <video
        ref={videoRef}
        src="/intro-door.mp4"
        muted
        playsInline
        autoPlay
        preload="auto"
        onEnded={handleVideoEnded}
        onTimeUpdate={handleTimeUpdate}
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        style={{
          filter: "contrast(1.02) brightness(1.0)",
        }}
      />

      {/* ─── 2. Atmospheric Divine Cream & Soft Golden Light Veil ─── */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ease-in-out ${
          darkVeil ? "opacity-60" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,248,232,0.4) 0%, rgba(255,248,232,0.85) 75%, #FFF8E8 100%)",
        }}
      />

      {/* ─── 3. Subtle Warm Cream Vignette ─── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(245,235,215,0.35) 85%, rgba(235,220,195,0.6) 100%)",
        }}
      />

      {/* ─── 4. Elegant Spiritual Message Layer ─── */}
      <div
        className={`relative z-20 max-w-3xl px-6 text-center transition-all duration-700 ease-out pointer-events-none ${
          textVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-2 scale-98"
        }`}
      >
        {/* Sacred Lotus Emblem in Divine Gold */}
        <div className="inline-block mb-3 opacity-95">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C9910B"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mx-auto drop-shadow-[0_2px_12px_rgba(201,145,11,0.4)]"
          >
            <path d="M12 3C12 3 8 8 8 13C8 17.4183 9.79086 21 12 21C14.2091 21 16 17.4183 16 13C16 8 12 3 12 3Z" />
            <path d="M12 21C7.5 21 3 18.5 3 14C3 10.5 7 8 10 9.5" />
            <path d="M12 21C16.5 21 21 18.5 21 14C21 10.5 17 8 14 9.5" />
          </svg>
        </div>

        {/* Elegant Serif Typography in Sacred Maroon & Divine Gold */}
        <h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-serif leading-[1.3] tracking-wide"
          style={{
            fontFamily:
              "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
            textShadow:
              "0 2px 20px rgba(255,255,255,0.95), 0 1px 6px rgba(82,22,35,0.12)",
          }}
        >
          <span className="block font-semibold text-[#521623] tracking-normal">
            Step beyond the ordinary.
          </span>
          <span className="block mt-2 sm:mt-2.5 font-normal italic text-[#B8860B] tracking-wider text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem]">
            Enter a journey of awareness.
          </span>
        </h2>
      </div>

      {/* ─── 5. Subtle, Glassmorphic Skip Intro Button matching website ─── */}
      <button
        onClick={handleSkip}
        type="button"
        aria-label="Skip Intro and enter website"
        className="absolute top-5 right-5 sm:top-8 sm:right-8 z-30 px-4 py-2 rounded-full border border-amber-600/30 bg-[#521623]/85 hover:bg-[#521623] text-[#FFFDF8] text-[11px] sm:text-xs font-semibold tracking-widest uppercase backdrop-blur-md transition-all duration-200 hover:border-amber-400 hover:scale-105 active:scale-95 cursor-pointer shadow-[0_4px_20px_rgba(82,22,35,0.35)] flex items-center gap-2"
      >
        <span>Skip Intro</span>
        <span className="text-[#F5A623] font-bold">&rarr;</span>
      </button>
    </div>
  );
}
