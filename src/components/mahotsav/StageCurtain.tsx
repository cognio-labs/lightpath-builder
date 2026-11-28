"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Theatre-curtain reveal for the Bhajan Clubbing section.
 * Two velvet panels cover the section and sweep open (gathering towards the
 * sides) the first time the section scrolls into view, leaving slim gathered
 * drapes framing the edges like a stage. Plays once.
 * Visitors with "reduce motion" enabled see it already open.
 * The parent section must be `relative overflow-hidden`.
 */
export function StageCurtain() {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = requestAnimationFrame(() => {
        setOpen(true);
        setGone(true);
      });
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOpen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (gone) return null;

  const velvet: React.CSSProperties = {
    backgroundColor: "#7A1019",
    backgroundImage: [
      // light & shadow down the drape
      "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 18%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.45) 100%)",
      // vertical velvet folds
      "repeating-linear-gradient(90deg, #4E0810 0px, #7A1019 14px, #A61E2A 26px, #C2303B 32px, #A61E2A 38px, #7A1019 50px, #4E0810 64px)",
    ].join(", "),
  };

  const panelBase = "mh-curtain-panel " +
    "absolute inset-y-0 w-1/2 transition-transform delay-[400ms] duration-[3600ms] ease-[cubic-bezier(0.45,0,0.2,1)] will-change-transform";

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-[9]"
      aria-hidden="true"
    >
      {/* Left curtain */}
      <div
        className={`${panelBase} left-0 origin-left`}
        style={{ ...velvet, transform: open ? "scaleX(0.04)" : "scaleX(1)" }}
      >
        {/* gold trim on the meeting edge */}
        <div className="absolute inset-y-0 right-0 w-[6px] bg-gradient-to-b from-[#F2C97D] via-[#D49635] to-[#9A6213] shadow-[0_0_12px_rgba(242,201,125,0.6)]" />
        {/* gold fringe along the bottom */}
        <div
          className="absolute inset-x-0 bottom-0 h-5"
          style={{
            backgroundImage:
              "linear-gradient(180deg, #D49635 0 5px, transparent 5px), repeating-linear-gradient(90deg, #F2C97D 0 2px, transparent 2px 6px)",
          }}
        />
      </div>

      {/* Right curtain */}
      <div
        className={`${panelBase} right-0 origin-right`}
        style={{ ...velvet, transform: open ? "scaleX(0.04)" : "scaleX(1)" }}
      >
        <div className="absolute inset-y-0 left-0 w-[6px] bg-gradient-to-b from-[#F2C97D] via-[#D49635] to-[#9A6213] shadow-[0_0_12px_rgba(242,201,125,0.6)]" />
        <div
          className="absolute inset-x-0 bottom-0 h-5"
          style={{
            backgroundImage:
              "linear-gradient(180deg, #D49635 0 5px, transparent 5px), repeating-linear-gradient(90deg, #F2C97D 0 2px, transparent 2px 6px)",
          }}
        />
      </div>

      {/* Centre glow where the curtains meet (fades as they open) */}
      <div
        className={`mh-curtain-glow absolute inset-y-0 left-1/2 w-24 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#F2C97D]/25 to-transparent blur-xl transition-opacity delay-[400ms] duration-[1500ms] ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}
