import type { ComponentProps, ReactNode, SVGProps } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function cn(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(" ");
}

export function Lotus({ className, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 32" fill="none" className={className} aria-hidden="true" {...rest}>
      <g stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
        <path d="M24 6c3.6 3.6 5.2 8 4.8 13.4-.3 3.8-2 6.8-4.8 8.6-2.8-1.8-4.5-4.8-4.8-8.6C18.8 14 20.4 9.6 24 6Z" />
        <path d="M24 28c-4.6.6-8.8-.8-12-4.2-2.2-2.4-3.3-5.3-3.2-8.6 4.4-.6 8.2.6 11.2 3.6 2.2 2.2 3.5 5.3 4 9.2Z" />
        <path d="M24 28c4.6.6 8.8-.8 12-4.2 2.2-2.4 3.3-5.3 3.2-8.6-4.4-.6-8.2.6-11.2 3.6-2.2 2.2-3.5 5.3-4 9.2Z" />
      </g>
    </svg>
  );
}

/** tone "dark" = dark text for the cream sections; "light" = cream text for the maroon cards. */
export function SectionHeading({
  children,
  tone = "dark",
  className,
  as: Tag = "h2",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
  as?: "h2" | "h3";
}) {
  return (
    <Tag
      className={cn(
        "font-display tracking-[-0.01em] text-balance",
        tone === "light" ? "text-cream-50" : "text-ink-900",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function IconBadge({
  children,
  size = "md",
  tone = "gold",
  className,
}: {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  tone?: "gold" | "gold-solid" | "gold-soft";
  className?: string;
}) {
  const dims = {
    sm: "h-9 w-9 rounded-[10px]",
    md: "h-11 w-11 rounded-xl",
    lg: "h-14 w-14 rounded-2xl",
  }[size];

  const tones = {
    gold: "border border-gold-500/40 text-gold-600 bg-white",
    "gold-soft": "border border-gold-500/25 text-gold-600 bg-gold-50",
    "gold-solid": "sd-gold-btn text-[#2a1a06] border border-gold-600/30 shadow-none",
  }[tone];

  return (
    <span className={cn("inline-grid shrink-0 place-items-center transition-colors duration-300", dims, tones, className)}>
      {children}
    </span>
  );
}

export function goldButtonClass(size: "md" | "lg" = "lg", className?: string) {
  return cn(
    "sd-gold-btn group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl font-semibold uppercase tracking-[0.08em]",
    "transition-transform duration-300 will-change-transform hover:-translate-y-0.5 active:translate-y-0",
    "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold-500",
    size === "lg" ? "px-7 py-4 text-[13px] sm:text-sm" : "px-5 py-3 text-[12px]",
    className,
  );
}

export function ButtonInner({ children, withArrow }: { children: ReactNode; withArrow: boolean }) {
  return (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
      <span className="relative inline-flex items-center gap-2">{children}</span>
      {withArrow && (
        <span className="relative grid h-6 w-6 place-items-center rounded-full bg-[#2a1a06]/85 text-gold-100 transition-transform duration-300 group-hover:translate-x-0.5">
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
        </span>
      )}
    </>
  );
}

export function GoldSubmitButton({
  children,
  className,
  size = "lg",
  withArrow = true,
  ...rest
}: ComponentProps<"button"> & { size?: "md" | "lg"; withArrow?: boolean }) {
  return (
    <button type="submit" {...rest} className={goldButtonClass(size, cn("disabled:opacity-60 disabled:pointer-events-none", className))}>
      <ButtonInner withArrow={withArrow}>{children}</ButtonInner>
    </button>
  );
}

/** tone "dark" = for cream sections; "light" = for the maroon cards. */
export function TrustPill({ label, tone = "dark" }: { label: string; tone?: "light" | "dark" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[11px] font-medium tracking-wide sm:text-xs",
        tone === "light" ? "text-cream-200/85" : "text-ink-700",
      )}
    >
      <ShieldCheck className={cn("h-4 w-4", tone === "light" ? "text-gold-300" : "text-gold-500")} strokeWidth={1.8} />
      {label}
    </span>
  );
}

