"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number; // delay between letters/words in ms (default: 50)
  duration?: number; // duration in seconds (default: 1.25)
  ease?: string; // gsap ease (default: "power3.out")
  splitType?: "chars" | "words";
  from?: Record<string, any>;
  to?: Record<string, any>;
  threshold?: number;
  rootMargin?: string;
  textAlign?: "left" | "center" | "right";
  onLetterAnimationComplete?: () => void;
  showCallback?: boolean;
}

export default function SplitText({
  text = "",
  className = "",
  delay = 50,
  duration = 1.25,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-50px",
  textAlign = "left",
  onLetterAnimationComplete,
  showCallback = false,
}: SplitTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const el = containerRef.current;
    if (!el) return;

    let ctx: gsap.Context;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.disconnect();

            const targets = el.querySelectorAll(".split-unit");
            if (targets.length === 0) return;

            const staggerSeconds = (delay || 50) / 1000;

            ctx = gsap.context(() => {
              gsap.fromTo(
                targets,
                {
                  opacity: from.opacity !== undefined ? from.opacity : 0,
                  y: from.y !== undefined ? from.y : 40,
                  x: from.x !== undefined ? from.x : 0,
                  scale: from.scale !== undefined ? from.scale : 1,
                  ...from,
                },
                {
                  opacity: to.opacity !== undefined ? to.opacity : 1,
                  y: to.y !== undefined ? to.y : 0,
                  x: to.x !== undefined ? to.x : 0,
                  scale: to.scale !== undefined ? to.scale : 1,
                  duration: duration || 1.25,
                  ease: ease || "power3.out",
                  stagger: {
                    each: staggerSeconds,
                    onComplete: function () {
                      if (showCallback && onLetterAnimationComplete) {
                        onLetterAnimationComplete();
                      }
                    },
                  },
                  ...to,
                }
              );
            }, el);
          }
        });
      },
      {
        threshold,
        rootMargin: rootMargin || "0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (ctx) ctx.revert();
    };
  }, [mounted, delay, duration, ease, from, to, threshold, rootMargin, showCallback, onLetterAnimationComplete]);

  // Words split
  const words = text.split(" ");

  return (
    <span
      ref={containerRef}
      className={`inline-block ${className}`}
      style={{ textAlign, display: "inline-block" }}
    >
      {splitType === "words"
        ? words.map((word, wIdx) => (
            <span
              key={wIdx}
              className="split-unit inline-block"
              style={{
                opacity: mounted ? 0 : 1,
                willChange: "transform, opacity",
                marginRight: wIdx < words.length - 1 ? "0.28em" : 0,
              }}
            >
              {word}
            </span>
          ))
        : words.map((word, wIdx) => (
            <span
              key={wIdx}
              className="inline-block whitespace-nowrap"
              style={{ marginRight: wIdx < words.length - 1 ? "0.28em" : 0 }}
            >
              {word.split("").map((char, cIdx) => (
                <span
                  key={cIdx}
                  className="split-unit inline-block"
                  style={{
                    opacity: mounted ? 0 : 1,
                    willChange: "transform, opacity",
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
    </span>
  );
}
