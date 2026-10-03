"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { HandHeart, X } from "lucide-react";
import { brand, donation } from "./content";
import SessionRequestForm from "./SessionRequestForm";

const OPEN_EVENT = "sd:open-booking";

/**
 * Opens the site-wide Personal Session booking popup (mounted once in the root layout).
 * Pass the clicked element so focus can return to it on close.
 */
export function openBookingModal(trigger?: HTMLElement | null) {
  window.dispatchEvent(new CustomEvent<HTMLElement | null>(OPEN_EVENT, { detail: trigger ?? null }));
}

/** Mount once, in the root layout. Opens whenever openBookingModal() is called from any page. */
export function BookingModalHost() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    const onOpen = (e: Event) => {
      const trigger = (e as CustomEvent<HTMLElement | null>).detail;
      returnFocus.current = trigger ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    returnFocus.current?.focus();
  }, []);

  if (!mounted) return null;
  return createPortal(
    <BookingModal open={open} onClose={close} source={`Personal session request (booking popup) from ${pathname}`} />,
    document.body,
  );
}

function BookingModal({ open, onClose, source }: { open: boolean; onClose: () => void; source: string }) {
  const reduce = useReducedMotion();
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
        >
          <div aria-hidden className="absolute inset-0 bg-maroon-950/55 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="sd-hairline relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-[0_30px_80px_-20px_rgba(42,10,18,0.55)]"
            initial={reduce ? false : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <span aria-hidden className="block h-1 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300" />

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-4 grid h-9 w-9 place-items-center rounded-full text-ink-500 transition-colors hover:bg-cream-200 hover:text-ink-900 focus-visible:outline-2 focus-visible:outline-gold-500"
            >
              <X className="h-4.5 w-4.5" strokeWidth={2} />
            </button>

            <div className="px-6 pb-6 pt-6 sm:px-7">
              <h2 id={titleId} className="pr-10 font-display text-[1.45rem] leading-snug text-ink-900">
                Book Your <span className="sd-gold-text">Personal Session</span>
              </h2>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-500">
                Share your details and our team will contact you within 24 hours to schedule your session with{" "}
                {brand.teacher}.
              </p>

              <div className="mt-4 flex items-center gap-3 rounded-xl bg-cream-100 px-4 py-3">
                <HandHeart className="h-6 w-6 shrink-0 text-gold-500" strokeWidth={1.4} />
                <p className="text-[12px] leading-snug text-ink-700">
                  <span className="font-display text-[15px] text-ink-900">{donation.amount}</span> {donation.word} ·{" "}
                  supports the {brand.mission}
                </p>
              </div>

              <div className="mt-5">
                <SessionRequestForm source={source} submitLabel="Book My Session" autoFocus />
              </div>

              <p className="mt-3 text-center text-[11px] text-ink-500">Your details are kept 100% confidential.</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
