"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { EVENT_CONFIG } from "@/lib/mahotsav/event";

/**
 * Phone-only sticky call to action. Appears once the visitor scrolls past the
 * hero; the `#register` link is picked up by RegistrationModal and opens the popup.
 */
export function MobileRegisterBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`mh-register-bar fixed inset-x-0 bottom-0 z-40 border-t border-[#D49635]/40 bg-[#FDF8EF]/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_24px_rgba(94,18,22,0.12)] backdrop-blur-md transition-transform duration-300 sm:hidden ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-[11px] font-bold uppercase tracking-[0.12em] text-[#9A6213]">
            {EVENT_CONFIG.dateDisplay} • {EVENT_CONFIG.startTime}
          </p>
          <p className="truncate font-mahotsav-display text-base font-bold text-[#5E1216]">
            Free Entry • Limited Passes
          </p>
        </div>
        <a
          href="#register"
          tabIndex={visible ? 0 : -1}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-[#5E1216] via-[#7A1B1F] to-[#5E1216] px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#FDF8EF] shadow-md"
        >
          Register
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
