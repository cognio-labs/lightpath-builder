"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { PAGE_PATH } from "@/lib/mahotsav/event";
import "./mahotsav-popup.css";

const POSTER = "/mahotsav/images/bhajan-clubbing-poster.jpg";
const POSTER_ALT =
  "Live Bhajan Clubbing with Arjun Bhowmick — Sunday 13 December 2026, Siddha Sudarshan Sakshi Dham, Ghaziabad. Get your free tickets now.";

// Opens once per full page load (a refresh shows it again), not on every
// client-side navigation back to the home page.
let shownThisLoad = false;

/**
 * Home-page announcement for Live Bhajan Clubbing / Shiksha Sewa Sankalp Mahotsav.
 * Opens as a big poster popup; closing it leaves a small reminder fixed in the
 * bottom-right corner (tap it to open the event page, × to hide it until reload).
 */
export function MahotsavHomePopup() {
  const [bigOpen, setBigOpen] = useState(false);
  const [miniHidden, setMiniHidden] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shownThisLoad) return;
    const timer = setTimeout(() => {
      shownThisLoad = true;
      setBigOpen(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const minimise = useCallback(() => setBigOpen(false), []);

  useEffect(() => {
    if (!bigOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    wrapRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") minimise();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [bigOpen, minimise]);

  const mini = miniHidden ? null : (
    <aside className="mhp-mini" aria-label="Live Bhajan Clubbing reminder">
      <button type="button" className="mhp-mini-x" onClick={() => setMiniHidden(true)} aria-label="Hide reminder">
        <X size={13} />
      </button>
      <Link href={PAGE_PATH} className="mhp-mini-open" aria-label="Open the Live Bhajan Clubbing event page">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="mhp-mini-thumb" src={POSTER} alt="" width={56} height={56} />
        <span className="mhp-mini-text">
          <span className="mhp-mini-title">Live Bhajan Clubbing</span>
          <span className="mhp-mini-meta">13 Dec 2026 • Free Entry</span>
        </span>
      </Link>
      <Link href={`${PAGE_PATH}#register`} className="mhp-mini-cta">
        Register
      </Link>
    </aside>
  );

  if (!bigOpen) return mini;

  return (
    <>
    {mini}
    <div
      className="mhp-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) minimise();
      }}
    >
      <div
        ref={wrapRef}
        role="dialog"
        aria-modal="true"
        aria-label="Live Bhajan Clubbing — you are invited"
        tabIndex={-1}
        className="mhp-wrap"
      >
        <button type="button" className="mhp-close" onClick={minimise} aria-label="Close announcement">
          <X size={18} />
        </button>

        <div className="mhp-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="mhp-poster" src={POSTER} alt={POSTER_ALT} width={1080} height={1080} />
          <div className="mhp-actions">
            <Link href={`${PAGE_PATH}#register`} className="mhp-btn mhp-btn--primary" onClick={minimise}>
              Register Free
              <ArrowRight size={15} />
            </Link>
            <Link href={PAGE_PATH} className="mhp-btn mhp-btn--ghost" onClick={minimise}>
              Know More
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
