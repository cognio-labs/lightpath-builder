"use client";
import { useEffect, useState } from "react";
import { X, ShoppingBag, Sparkles, BookOpen } from "lucide-react";

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

      // 1. Visible for 8 seconds
      hideTimer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          setOpen(false);

          // 2. Hide for 8 seconds, then show again
          showTimer = setTimeout(() => {
            if (!sessionStorage.getItem("mm-dismissed")) {
              startCycle();
            }
          }, 8000);
        }, 400);
      }, 8000);
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
      aria-label="Book Announcement"
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 max-w-[calc(100vw-32px)] sm:max-w-[330px] pointer-events-auto transition-all duration-400 ${
        isExiting ? "opacity-0 translate-y-4 scale-95 pointer-events-none" : "animate-fade-in opacity-100 translate-y-0 scale-100"
      }`}
    >
      <div className="bg-white/95 dark:bg-[#3b0f19]/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-2xl border border-amber-300/80 dark:border-amber-700/60 text-[#521623] dark:text-amber-100 font-sans flex flex-col gap-2 relative overflow-hidden">
        {/* Animated 8-Second Progress Countdown Bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-amber-100 dark:bg-amber-950">
          <div
            key={progressKey}
            className="h-full bg-gradient-to-r from-amber-400 to-yellow-500"
            style={{
              animation: "shrinkBar 8s linear forwards",
            }}
          />
        </div>

        <style>{`
          @keyframes shrinkBar {
            from { width: 100%; }
            to { width: 0%; }
          }
        `}</style>

        {/* Close button */}
        <button
          onClick={close}
          className="absolute top-2.5 right-2.5 p-1 rounded-full text-amber-700 hover:text-[#521623] dark:text-amber-300 dark:hover:text-white hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-colors"
          aria-label="Close Announcement"
        >
          <X size={14} />
        </button>

        {/* Header & Title */}
        <div className="flex items-center gap-2 pr-6">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 grid place-items-center text-[#521623] shrink-0 shadow-sm">
            <BookOpen size={14} />
          </div>
          <div>
            <span className="flex items-center text-[9px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              <span>New Book Release</span>
            </span>
            <h4 className="font-serif font-bold text-[12.5px] sm:text-[13px] text-[#521623] dark:text-white leading-tight">
              Maha Mantras by Sakshi Shree
            </h4>
          </div>
        </div>

        {/* Quick Action Button */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-amber-100/80 dark:border-amber-900/60">
          <span className="text-[10.5px] text-amber-800 dark:text-amber-200 font-medium truncate">
            Ancient divine wisdom
          </span>
          <a
            href="https://amzn.in/d/0cR0rBnu"
            target="_blank"
            rel="noreferrer"
            onClick={close}
            className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-[#521623] rounded-full px-3 py-1 text-[10.5px] font-bold shadow-sm active:scale-95 transition-all shrink-0"
          >
            <ShoppingBag size={11} />
            <span>Book Now</span>
          </a>
        </div>
      </div>
    </aside>
  );
}

