import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Optional CSS class name to apply custom styles
   */
  className?: string;
  /**
   * Whether to reverse the animation direction
   * @default false
   */
  reverse?: boolean;
  /**
   * Whether to pause the animation on hover
   * @default true
   */
  pauseOnHover?: boolean;
  /**
   * Content to be displayed in the marquee
   */
  children: React.ReactNode;
  /**
   * Whether to animate vertically instead of horizontally
   * @default false
   */
  vertical?: boolean;
  /**
   * Animation speed variant
   * @default "normal"
   */
  speed?: "slow" | "normal" | "fast";
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = true,
  children,
  vertical = false,
  speed = "normal",
  ...props
}: MarqueeProps) {
  const durationMap = {
    slow: "60s",
    normal: "40s",
    fast: "20s",
  };
  const duration = durationMap[speed] || "40s";

  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden py-3 w-full select-none relative",
        className
      )}
    >
      <div
        className={cn(
          "flex shrink-0 gap-6 w-max motion-reduce:animate-none",
          {
            "group-hover:[animation-play-state:paused]": pauseOnHover,
          }
        )}
        style={{
          willChange: "transform",
          animation: `${vertical ? "marquee-vertical" : "testimonialMarquee"} ${duration} linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {/* Track 1: Original items */}
        <div className="flex gap-6 shrink-0">{children}</div>
        {/* Track 2: Duplicated items for a mathematically perfect -50% loop */}
        <div className="flex gap-6 shrink-0" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
