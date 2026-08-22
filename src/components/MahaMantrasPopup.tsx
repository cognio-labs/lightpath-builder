"use client";
import { useEffect, useState } from "react";
import { X, ShoppingBag, Sparkles, BookOpen } from "lucide-react";

export function MahaMantrasPopup() {
  const [open, setOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("mm-dismissed")) return;

    // 1. Show after 1.5 seconds
    const showTimer = setTimeout(() => {
      setOpen(true);
    }, 1500);

    // 2. Automatically fade out & hide after 4.5 seconds of display
    const hideTimer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setOpen(false);
        sessionStorage.setItem("mm-dismissed", "1");
      }, 400);
    }, 6000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const close = () => {
    setIsExiting(true);
    setTimeout(() => {
      setOpen(false);
      sessionStorage.setItem("mm-dismissed", "1");
    }, 300);
  };

  if (!open) return null;

  return (
    <aside
      aria-label="Book Announcement"
      className={`fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 max-w-[calc(100vw-32px)] sm:max-w-[330px] pointer-events-auto transition-all duration-400 ${
        isExiting ? "opacity-0 translate-y-4 scale-95 pointer-events-none" : "animate-fade-in opacity-100 translate-y-0 scale-100"
      }`}
    >
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-2xl border border-amber-300/80 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-sans flex flex-col gap-2 relative overflow-hidden">
        {/* Subtle auto-dismiss countdown bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 animate-[shrink_4.5s_linear_forwards]" />

        {/* Close button */}
        <button
          onClick={close}
          className="absolute top-2.5 right-2.5 p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close Announcement"
        >
          <X size={14} />
        </button>

        {/* Header & Title */}
        <div className="flex items-center gap-2 pr-6">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 grid place-items-center text-slate-950 shrink-0 shadow-sm">
            <BookOpen size={14} />
          </div>
          <div>
            <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              <Sparkles size={9} className="text-amber-500" />
              <span>New Book Release</span>
            </span>
            <h4 className="font-serif font-bold text-[12.5px] sm:text-[13px] text-slate-900 dark:text-white leading-tight">
              Maha Mantras by Sakshi Shree
            </h4>
          </div>
        </div>

        {/* Quick Action Button */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-amber-100/80 dark:border-slate-800">
          <span className="text-[10.5px] text-slate-500 dark:text-slate-400 font-medium truncate">
            Ancient divine wisdom
          </span>
          <a
            href="https://amzn.in/d/0cR0rBnu"
            target="_blank"
            rel="noreferrer"
            onClick={close}
            className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 rounded-full px-3 py-1 text-[10.5px] font-bold shadow-sm active:scale-95 transition-all shrink-0"
          >
            <ShoppingBag size={11} />
            <span>Book Now</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
