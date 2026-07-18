"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LensProps {
  children: React.ReactNode;
  zoomFactor?: number;
  lensSize?: number;
  isStatic?: boolean;
  position?: { x: number; y: number };
  hovering?: boolean;
  setHovering?: (hovering: boolean) => void;
}

export const Lens: React.FC<LensProps> = ({
  children,
  zoomFactor = 1.5,
  lensSize = 170,
  isStatic = false,
  position = { x: 0, y: 0 },
  hovering,
  setHovering,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [localHovering, setLocalHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const isHovering = hovering !== undefined ? hovering : localHovering;
  const setIsHovering = setHovering || setLocalHovering;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isStatic || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const currentPosition = isStatic ? position : mousePosition;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden rounded-2xl cursor-none"
    >
      {/* Original Content */}
      <div className="w-full h-full relative z-10">
        {children}
      </div>

      {/* Lens Overlay */}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              width: lensSize,
              height: lensSize,
              left: currentPosition.x - lensSize / 2,
              top: currentPosition.y - lensSize / 2,
              borderRadius: "50%",
              border: "2px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
              overflow: "hidden",
              pointerEvents: "none",
              zIndex: 30,
            }}
          >
            {/* Magnified Duplicate Content */}
            <div
              style={{
                position: "absolute",
                width: containerRef.current?.offsetWidth || "100%",
                height: containerRef.current?.offsetHeight || "100%",
                left: -(currentPosition.x * zoomFactor - lensSize / 2),
                top: -(currentPosition.y * zoomFactor - lensSize / 2),
                transform: `scale(${zoomFactor})`,
                transformOrigin: "top left",
              }}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
