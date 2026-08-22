"use client";
import { useEffect, useState } from "react";
import { X, ShoppingBag } from "lucide-react";

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
    <div className="fixed bottom-4 right-4 z-40 max-w-sm animate-fade-in">
      <div className="bg-white rounded-2xl p-4 pr-10 shadow-2xl border border-primary/20 relative">
        <button
          onClick={close}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-secondary"
          aria-label="Close"
        >
          <X size={16} />
        </button>
        <div className="text-xs font-semibold uppercase tracking-wider gradient-text mb-1">
          Transform Your Life
        </div>
        <h4 className="font-display font-bold text-base mb-1">Maha Mantras by Sakshi Shree</h4>
        <p className="text-xs text-muted-foreground mb-3">
          Be among the first to experience ancient wisdom for modern life.
        </p>
        <a
          href="https://amzn.in/d/0cR0rBnu"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 btn-gradient rounded-full px-4 py-2 text-xs font-semibold"
        >
          <ShoppingBag size={14} /> Book Now
        </a>
      </div>
    </div>
  );
}

