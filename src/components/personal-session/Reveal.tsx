"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "./ui";

/**
 * Fades + lifts its children into view once, when they are scrolled to.
 *
 * Fail-safe by design: the content renders VISIBLE and only hides itself
 * if, on mount, it is genuinely below the fold. So if JavaScript never
 * runs — or IntersectionObserver is unavailable — nothing disappears.
 */

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

type State = "static" | "hidden" | "shown";

export default function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<State>("static");

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const belowFold =
      el.getBoundingClientRect().top > window.innerHeight * 0.88;
    if (!belowFold) {
      setState("shown");
      return;
    }

    setState("hidden");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      style={state === "hidden" ? undefined : { transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-[opacity,translate] duration-700 ease-out motion-reduce:transition-none",
        state === "hidden" ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
