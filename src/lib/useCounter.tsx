import { useEffect, useRef, useState } from "react";

export function parseStatValue(str: string): { to: number; suffix: string; prefix: string } {
  const match = str.match(/^([^\d]*)([\d,.]+)(.*)$/);
  if (!match) return { to: 0, suffix: str, prefix: "" };
  const prefix = match[1] || "";
  const to = parseFloat(match[2].replace(/,/g, "")) || 0;
  const suffix = match[3] || "";
  return { to, suffix, prefix };
}

export function useCounter(target: number, duration = 2000) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setValue(Math.floor(eased * target));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return { ref, value };
}

interface CounterProps {
  to?: number;
  value?: string;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function Counter({
  to,
  value,
  suffix = "",
  prefix = "",
  duration = 2000,
  className,
}: CounterProps) {
  let target = to ?? 0;
  let finalSuffix = suffix;
  let finalPrefix = prefix;

  if (value !== undefined) {
    const parsed = parseStatValue(value);
    target = parsed.to;
    finalSuffix = parsed.suffix;
    finalPrefix = parsed.prefix;
  }

  const { ref, value: currentVal } = useCounter(target, duration);

  return (
    <span ref={ref} className={className}>
      {finalPrefix}
      {currentVal.toLocaleString()}
      {finalSuffix}
    </span>
  );
}

