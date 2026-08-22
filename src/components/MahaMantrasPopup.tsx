"use client";
import { useEffect, useState } from "react";
import { X, ShoppingBag, Sparkles, BookOpen } from "lucide-react";

export function MahaMantrasPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("mm-dismissed")) return;
    const t = setTimeout(() => setOpen(true), 4000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setOpen(false);
    sessionStorage.setItem("mm-dismissed", "1");
  };

  if (!open) return null;

  return (
    <aside
      aria-label="Book Announcement"
      className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 max-w-[calc(100vw-32px)] sm:max-w-[340px] animate-fade-in pointer-events-auto"
    >
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-xl border border-amber-300/70 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-sans flex flex-col gap-2 relative">
        {/* Close button */}
        <button
          onClick={close}
          className="absolute top-2 right-2 p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close Announcement"
        >
          <X size={14} />
        </button>

        {/* Header & Title */}
        <div className="flex items-center gap-2 pr-6">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 grid place-items-center text-slate-950 shrink-0 shadow-sm">
            <BookOpen size={16} />
          </div>
          <div>
            <span className="flex items-center gap-1 text-[9.5px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              <Sparkles size={10} className="text-amber-500" />
              <span>New Book Release</span>
            </span>
            <h4 className="font-serif font-bold text-[13px] sm:text-[13.5px] text-slate-900 dark:text-white leading-tight">
              Maha Mantras by Sakshi Shree
            </h4>
          </div>
        </div>

        {/* Quick Action Button */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-amber-100/80 dark:border-slate-800">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
            Ancient wisdom for modern life
          </span>
          <a
            href="https://amzn.in/d/0cR0rBnu"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 rounded-full px-3 py-1 text-[11px] font-bold shadow-sm active:scale-95 transition-all shrink-0"
          >
            <ShoppingBag size={12} />
            <span>Book Now</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
