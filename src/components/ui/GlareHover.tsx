"use client";
import React, { useRef, useState, useEffect } from "react";

interface GlareHoverProps {
  children: React.ReactNode;
  glareColor?: string;
  glareOpacity?: number;
  glareAngle?: number;
  glareSize?: number;
  transitionDuration?: number;
  playOnce?: boolean;
  className?: string;
}

export default function GlareHover({
  children,
  glareColor = "#ffffff",
  glareOpacity = 0.3,
  glareAngle = -30,
  glareSize = 300,
  transitionDuration = 800,
  playOnce = false,
  className = "",
}: GlareHoverProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
    transition: `all ${transitionDuration}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
  });
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({
    opacity: 0,
    transform: "translate(-50%, -50%)",
    left: "0px",
    top: "0px",
    width: `${glareSize}px`,
    height: `${glareSize}px`,
    background: `radial-gradient(circle, ${glareColor} 0%, transparent 80%)`,
    transition: `opacity ${transitionDuration}ms ease`,
  });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const width = rect.width;
    const height = rect.height;

    // Calculate rotation angles (max 10 degrees)
    const rotateY = ((x - width / 2) / (width / 2)) * 10;
    const rotateX = -((y - height / 2) / (height / 2)) * 10;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      transition: "transform 100ms ease-out",
    });

    setGlareStyle({
      opacity: glareOpacity,
      transform: `translate(-50%, -50%) rotate(${glareAngle}deg)`,
      left: `${x}px`,
      top: `${y}px`,
      width: `${glareSize}px`,
      height: `${glareSize}px`,
      background: `radial-gradient(circle, ${glareColor} 0%, transparent 85%)`,
      transition: "left 50ms ease-out, top 50ms ease-out, opacity 200ms ease",
    });
  };

  const handlePointerLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
      transition: `transform ${transitionDuration}ms ease`,
    });
    setGlareStyle((prev) => ({
      ...prev,
      opacity: 0,
      transition: `opacity ${transitionDuration}ms ease`,
    }));
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative overflow-hidden ${className}`}
      style={style}
    >
      <div className="relative z-10">{children}</div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute z-20 rounded-full mix-blend-overlay"
        style={glareStyle}
      />
    </div>
  );
}

