"use client";
import React, { useEffect, useState } from "react";
import { X, Sparkles, BookOpen, ArrowRight, Eye, Infinity } from "lucide-react";

export function MahaMantrasPopup() {
  const [open, setOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [userDismissed, setUserDismissed] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("mm-dismissed")) return;

    let hideTimer: NodeJS.Timeout;
    let showTimer: NodeJS.Timeout;

    const startCycle = () => {
      setOpen(true);
      setIsExiting(false);
      setProgressKey((prev) => prev + 1);

      // 1. Visible for 10 seconds
      hideTimer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          setOpen(false);

          // 2. Hide for 12 seconds, then show again
          showTimer = setTimeout(() => {
            if (!sessionStorage.getItem("mm-dismissed")) {
              startCycle();
            }
          }, 12000);
        }, 400);
      }, 10000);
    };

    // Initial show after 1.5s
    const initialDelay = setTimeout(() => {
      startCycle();
    }, 1500);

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(hideTimer);
      clearTimeout(showTimer);
    };
  }, []);

  const close = () => {
    setIsExiting(true);
    setUserDismissed(true);
    setTimeout(() => {
      setOpen(false);
      sessionStorage.setItem("mm-dismissed", "1");
    }, 300);
  };

  if (!open || userDismissed) return null;

  return (
    <aside
      aria-label="New Book Release Announcement"
      className={`fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-[110] w-[calc(100vw-24px)] sm:w-[380px] max-w-[380px] pointer-events-auto transition-all duration-400 ease-out select-none ${
        isExiting
          ? "opacity-0 translate-y-4 scale-95 pointer-events-none"
          : "opacity-100 translate-y-0 scale-100"
      }`}
    >
      {/* Outer ambient golden halo glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37]/25 via-[#F59E0B]/30 to-[#D4AF37]/25 rounded-2xl blur-md pointer-events-none" />

      {/* Luxury Sacred Card Container */}
      <div
        className="relative rounded-2xl border-[1.5px] border-[#E5C16C]/85 shadow-[0_16px_36px_rgba(0,0,0,0.6),0_0_20px_rgba(212,175,55,0.2)] overflow-hidden text-white backdrop-blur-xl"
        style={{
          background:
            "radial-gradient(ellipse at 85% 20%, #2D0B19 0%, #1A050F 55%, #100208 100%)",
        }}
      >
        {/* Animated Countdown Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-amber-950/40 z-30">
          <div
            key={progressKey}
            className="h-full bg-gradient-to-r from-[#FDE68A] via-[#F59E0B] to-[#D97706]"
            style={{
              animation: "shrinkBar 10s linear forwards",
            }}
          />
        </div>

        <style>{`
          @keyframes shrinkBar {
            from { width: 100%; }
            to { width: 0%; }
          }
        `}</style>

        {/* Close Button */}
        <button
          onClick={close}
          className="absolute top-2 right-2 w-5.5 h-5.5 rounded-full bg-black/40 hover:bg-[#D4AF37] border border-[#E5C16C]/40 text-amber-200 hover:text-[#2E0D1A] flex items-center justify-center transition-all duration-200 shadow-xs z-30 cursor-pointer"
          aria-label="Close Announcement"
        >
          <X size={12} strokeWidth={2.2} />
        </button>

        {/* Card Content: Taller Book + Detailed Info */}
        <div className="flex items-center p-3 sm:p-3.5 pt-3.5 sm:pt-4 gap-2.5">
          {/* Left: Taller 3D Book on Altar */}
          <div className="w-[110px] sm:w-[118px] shrink-0 flex items-center justify-center">
            <img
              src="/maha-mantras-book-left.png"
              alt="Maha Mantras Book by Sakshi Shree"
              className="w-full h-auto max-h-[148px] sm:max-h-[156px] object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.65)]"
            />
          </div>

          {/* Right: Info & Actions */}
          <div className="flex-1 min-w-0 pr-2 flex flex-col justify-between gap-1.5">
            {/* Tag Badge */}
            <div className="flex items-center">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#4E1423]/90 border border-[#D4AF37]/60 text-[8px] font-bold uppercase tracking-wider text-[#FDE68A]">
                <BookOpen size={9} className="text-[#F3CE6E]" />
                New Release
              </span>
            </div>

            {/* Title & Author */}
            <div>
              <h3 className="font-serif text-[17px] sm:text-[18px] font-bold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FFF2CC] via-[#F5D580] to-[#E5AC3A]">
                Maha Mantras
              </h3>
              <p className="font-serif italic text-amber-100/90 text-[11px] leading-tight pt-0.5">
                by <span className="font-medium text-amber-50">Sakshi Shree</span>
              </p>
            </div>

            {/* Short Sacred Quote */}
            <p className="text-[9.5px] text-amber-100/75 italic leading-tight line-clamp-2">
              Ancient divine wisdom for inner peace, clarity &amp; destiny.
            </p>

            {/* 3 Sacred Benefit Badges */}
            <div className="flex items-center gap-1.5 py-0.5 border-y border-amber-500/20 text-[8px] font-medium text-amber-200/90">
              <span className="flex items-center gap-0.5">
                <span className="text-[#F3CE6E] text-[9px]">🪷</span> Peace
              </span>
              <span className="text-amber-500/40">•</span>
              <span className="flex items-center gap-0.5">
                <Eye size={9} className="text-[#F3CE6E]" /> Clarity
              </span>
              <span className="text-amber-500/40">•</span>
              <span className="flex items-center gap-0.5">
                <Infinity size={9} className="text-[#F3CE6E]" /> Destiny
              </span>
            </div>

            {/* CTA Row */}
            <div className="flex items-center justify-between gap-1 pt-0.5">
              <span className="text-[9px] font-bold text-[#F3CE6E] flex items-center gap-0.5">
                <Sparkles size={8.5} className="text-[#FDE68A]" />
                Available Now
              </span>
              <a
                href="https://amzn.in/d/0cR0rBnu"
                target="_blank"
                rel="noreferrer"
                onClick={close}
                className="inline-flex items-center justify-center gap-1 bg-gradient-to-r from-[#D7A316] via-[#F7D272] to-[#C98B28] hover:from-[#F7D272] hover:to-[#D7A316] text-[#350C17] rounded-full px-3 py-1 text-[10px] sm:text-[10.5px] font-extrabold shadow-[0_2px_8px_rgba(212,175,55,0.35)] hover:scale-105 active:scale-95 transition-all duration-200 group cursor-pointer"
              >
                <span>Order Now</span>
                <ArrowRight size={10} className="transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default MahaMantrasPopup;
