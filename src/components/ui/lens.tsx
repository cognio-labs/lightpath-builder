"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface LensProps {
  children: React.ReactNode;
  zoomFactor?: number;
  lensSize?: number;
  isStatic?: boolean;
  position?: { x: number; y: number };
  hovering?: boolean;
  setHovering?: (hovering: boolean) => void;
  className?: string;
}

export const Lens: React.FC<LensProps> = ({
  children,
  zoomFactor = 1.55,
  lensSize = 150,
  isStatic = false,
  position = { x: 0, y: 0 },
  hovering,
  setHovering,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [localHovering, setLocalHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState(position);

  const isHovering = hovering ?? localHovering;
  const setIsHovering = setHovering ?? setLocalHovering;
  const currentPosition = isStatic ? position : mousePosition;
  const containerWidth = containerRef.current?.offsetWidth ?? 0;
  const containerHeight = containerRef.current?.offsetHeight ?? 0;

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isStatic || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovering(true)}
      onPointerLeave={() => setIsHovering(false)}
      onPointerCancel={() => setIsHovering(false)}
      className={cn("relative overflow-hidden cursor-none", className)}
    >
      <div className="relative z-10 h-full w-full">{children}</div>

      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute z-30 overflow-hidden rounded-full border border-white/60 bg-white/10 shadow-2xl transition duration-200 ease-out",
          isHovering ? "opacity-100 scale-100" : "opacity-0 scale-90",
        )}
        style={{
          width: lensSize,
          height: lensSize,
          left: currentPosition.x - lensSize / 2,
          top: currentPosition.y - lensSize / 2,
          boxShadow: "0 18px 45px rgba(15, 23, 42, 0.35), inset 0 0 0 1px rgba(255,255,255,0.45)",
        }}
      >
        <div
          className="absolute left-0 top-0 h-full w-full"
          style={{
            width: containerWidth || "100%",
            height: containerHeight || "100%",
            transform: `translate(${-currentPosition.x * zoomFactor + lensSize / 2}px, ${-currentPosition.y * zoomFactor + lensSize / 2}px) scale(${zoomFactor})`,
            transformOrigin: "top left",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
