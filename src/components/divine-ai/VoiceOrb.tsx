"use client";

import React from "react";
import { VoiceState } from "@/lib/voice/types";
import { Sparkles, Mic, Volume2, Loader2, AlertCircle } from "lucide-react";

interface VoiceOrbProps {
  state: VoiceState;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
}

export function VoiceOrb({ state, onClick, size = "md" }: VoiceOrbProps) {
  const sizeClasses = {
    sm: "w-20 h-20",
    md: "w-32 h-32 md:w-36 md:h-36",
    lg: "w-44 h-44 md:w-52 md:h-52",
  }[size];

  // Dynamic animation and ring colors based on state
  const stateStyles = {
    idle: {
      orbBg: "from-amber-400 via-amber-600 to-yellow-700",
      glowBg: "rgba(212, 175, 55, 0.35)",
      ringColor: "border-amber-400/40",
      icon: <Sparkles className="w-8 h-8 text-amber-100 animate-pulse" />,
      pulseClass: "animate-pulse duration-3000",
    },
    listening: {
      orbBg: "from-amber-300 via-yellow-500 to-amber-600",
      glowBg: "rgba(245, 158, 11, 0.65)",
      ringColor: "border-yellow-300 animate-ping",
      icon: <Mic className="w-10 h-10 text-white animate-bounce" />,
      pulseClass: "scale-110 shadow-[0_0_50px_rgba(245,158,11,0.8)]",
    },
    transcribing: {
      orbBg: "from-yellow-400 via-amber-500 to-orange-600",
      glowBg: "rgba(245, 158, 11, 0.5)",
      ringColor: "border-amber-400/60 animate-spin",
      icon: <Loader2 className="w-8 h-8 text-white animate-spin" />,
      pulseClass: "scale-105",
    },
    thinking: {
      orbBg: "from-amber-500 via-orange-600 to-purple-800",
      glowBg: "rgba(168, 85, 247, 0.5)",
      ringColor: "border-purple-400 animate-spin duration-2000",
      icon: <Sparkles className="w-8 h-8 text-amber-200 animate-spin" />,
      pulseClass: "animate-pulse scale-105 shadow-[0_0_40px_rgba(168,85,247,0.6)]",
    },
    speaking: {
      orbBg: "from-yellow-300 via-amber-400 to-orange-500",
      glowBg: "rgba(251, 191, 36, 0.75)",
      ringColor: "border-yellow-400/80 animate-pulse",
      icon: <Volume2 className="w-10 h-10 text-white animate-pulse" />,
      pulseClass: "scale-115 shadow-[0_0_60px_rgba(251,191,36,0.9)] animate-pulse",
    },
    error: {
      orbBg: "from-red-500 via-rose-600 to-amber-700",
      glowBg: "rgba(239, 68, 68, 0.4)",
      ringColor: "border-red-400/50",
      icon: <AlertCircle className="w-8 h-8 text-white" />,
      pulseClass: "",
    },
  }[state];

  return (
    <div
      onClick={onClick}
      className="relative flex items-center justify-center cursor-pointer select-none group"
      role="button"
      tabIndex={0}
      aria-label={`Divine AI Voice Orb — ${state}`}
    >
      {/* Outer Halo Glow */}
      <div
        className="absolute inset-0 rounded-full blur-2xl transition-all duration-700 pointer-events-none"
        style={{
          background: stateStyles.glowBg,
          transform: state === "speaking" || state === "listening" ? "scale(1.4)" : "scale(1.1)",
        }}
      />

      {/* Pulsing Ripple Rings */}
      <div
        className={`absolute inset-0 rounded-full border-2 transition-all duration-700 ${stateStyles.ringColor}`}
        style={{ transform: "scale(1.25)" }}
      />
      <div
        className={`absolute inset-0 rounded-full border transition-all duration-1000 ${stateStyles.ringColor} opacity-40`}
        style={{ transform: "scale(1.5)" }}
      />

      {/* Main Divine Crystal Orb */}
      <div
        className={`relative ${sizeClasses} rounded-full bg-gradient-to-tr ${stateStyles.orbBg} shadow-2xl flex items-center justify-center transition-all duration-500 transform group-hover:scale-105 active:scale-95 ${stateStyles.pulseClass}`}
        style={{
          boxShadow: `0 0 35px ${stateStyles.glowBg}, inset 0 2px 14px rgba(255,255,255,0.6), inset 0 -4px 12px rgba(0,0,0,0.4)`,
        }}
      >
        {/* Divine Light Shimmer Overlay */}
        <div className="absolute top-2 left-3 w-1/3 h-1/3 rounded-full bg-gradient-to-b from-white/70 to-transparent blur-[1px] pointer-events-none" />

        {/* Center Status Icon */}
        <div className="relative z-10 transition-transform duration-300">
          {stateStyles.icon}
        </div>
      </div>
    </div>
  );
}
