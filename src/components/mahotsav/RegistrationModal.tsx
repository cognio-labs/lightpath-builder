"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { RegistrationForm } from "@/components/mahotsav/RegistrationForm";

// Golden sun-rays fanning from the top centre (fading out before the fields),
// with warm glows at the top and corners. No tiled pattern, so the form stays calm.
const FORM_BACKGROUND = [
  "radial-gradient(ellipse 70% 34% at 50% 0%, rgba(255,252,246,0) 0%, rgba(255,252,246,0) 30%, #FFFCF6 100%)",
  "repeating-conic-gradient(from -90deg at 50% 0%, rgba(212,150,53,0.17) 0deg 2.5deg, rgba(212,150,53,0) 2.5deg 8deg)",
  "radial-gradient(ellipse 70% 30% at 50% 0%, rgba(242,201,125,0.5), rgba(242,201,125,0) 75%)",
  "radial-gradient(circle at 0% 100%, rgba(212,150,53,0.2), rgba(212,150,53,0) 40%)",
  "radial-gradient(circle at 100% 100%, rgba(122,27,31,0.09), rgba(122,27,31,0) 40%)",
].join(", ");

export function RegistrationModal() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    if (window.location.hash === "#register") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    lastFocused.current?.focus();
  }, []);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.('a[href="#register"]');
      if (!link) return;
      event.preventDefault();
      lastFocused.current = link as HTMLElement;
      setOpen(true);
    }
    function openFromHash() {
      if (window.location.hash === "#register") setOpen(true);
    }
    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", openFromHash);
    const frame = requestAnimationFrame(openFromHash);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", openFromHash);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#1A0A0B]/70 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="registration-title"
        tabIndex={-1}
        className="relative max-h-[94dvh] w-full max-w-2xl no-scrollbar overflow-y-auto rounded-t-3xl border-2 border-[#D49635]/50 bg-[#FFFCF6] shadow-2xl outline-none transition-[max-width] has-[[data-success]]:max-w-[26rem] sm:rounded-3xl"
        style={{ backgroundColor: "#FFFCF6", backgroundImage: FORM_BACKGROUND }}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close registration form"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#E8D8BC] bg-[#FDF8EF] text-[#5E1216] transition-colors hover:bg-[#F6ECDA]"
        >
          <X className="h-4 w-4" />
        </button>
        <RegistrationForm />
      </div>
    </div>
  );
}
