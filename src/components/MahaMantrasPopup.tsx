"use client";
import { useEffect, useState } from "react";
import { X, ShoppingBag, Sparkles, BookOpen } from "lucide-react";

export function MahaMantrasPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("mm-dismissed")) return;
    const t = setTimeout(() => setOpen(true), 3500);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setOpen(false);
    sessionStorage.setItem("mm-dismissed", "1");
  };

  if (!open) return null;

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 max-w-[320px] sm:max-w-sm animate-fade-in pointer-events-auto">
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl p-4 pr-9 shadow-2xl border border-amber-300/60 dark:border-slate-700 relative text-slate-800 dark:text-slate-100 font-sans">
        <button
          onClick={close}
          className="absolute top-2.5 right-2.5 p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close Announcement"
        >
          <X size={15} />
        </button>

        <div className="flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
          <Sparkles size={12} className="text-amber-500" />
          <span>Transform Your Life</span>
        </div>

        <h4 className="font-serif font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-1 leading-tight flex items-center gap-1.5">
          <BookOpen size={16} className="text-amber-600 shrink-0" />
          <span>Maha Mantras by Sakshi Shree</span>
        </h4>

        <p className="text-[11.5px] text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
          Be among the first to experience ancient divine wisdom for modern joyful living.
        </p>

        <a
          href="https://amzn.in/d/0cR0rBnu"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 rounded-full px-4 py-1.5 text-xs font-bold shadow-md shadow-amber-500/20 active:scale-95 transition-all"
        >
          <ShoppingBag size={13} />
          <span>Book Now on Amazon</span>
        </a>
      </div>
    </div>
  );
}
