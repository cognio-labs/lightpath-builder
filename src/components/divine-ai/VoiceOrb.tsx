"use client";

import React from "react";
import { VoiceState } from "@/lib/voice/types";
import { Sparkles, Mic, Volume2, Loader2, AlertCircle, Radio } from "lucide-react";

interface VoiceOrbProps {
  state: VoiceState;
  audioLevel?: number; // 0 to 1 from VAD/TTS
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
}

export function VoiceOrb({ state, audioLevel = 0, onClick, size = "md" }: VoiceOrbProps) {
  const sizeClasses = {
    sm: "w-20 h-20",
    md: "w-32 h-32 md:w-36 md:h-36",
    lg: "w-44 h-44 md:w-52 md:h-52",
  }[size];

  // Dynamic state configurations
  const stateConfig = {
    idle: {
      orbBg: "from-amber-400 via-amber-600 to-yellow-700",
      glowBg: "rgba(212, 175, 55, 0.35)",
      ringColor: "border-amber-400/40",
      icon: <Sparkles className="w-8 h-8 text-amber-100 animate-pulse" />,
      pulseScale: 1,
    },
    requesting_permission: {
      orbBg: "from-blue-400 via-amber-500 to-yellow-600",
      glowBg: "rgba(59, 130, 246, 0.4)",
      ringColor: "border-blue-400 animate-spin",
      icon: <Radio className="w-8 h-8 text-white animate-pulse" />,
      pulseScale: 1.05,
    },
    listening: {
      orbBg: "from-amber-300 via-yellow-500 to-amber-600",
      glowBg: "rgba(245, 158, 11, 0.65)",
      ringColor: "border-yellow-300",
      icon: <Mic className="w-9 h-9 text-white animate-bounce" />,
      pulseScale: 1.05 + audioLevel * 0.2,
    },
    recording: {
      orbBg: "from-red-500 via-amber-500 to-yellow-500",
      glowBg: "rgba(239, 68, 68, 0.65)",
      ringColor: "border-red-400 animate-ping",
      icon: <Mic className="w-9 h-9 text-white" />,
      pulseScale: 1.1 + audioLevel * 0.3,
    },
    transcribing: {
      orbBg: "from-yellow-400 via-amber-500 to-orange-600",
      glowBg: "rgba(245, 158, 11, 0.5)",
      ringColor: "border-amber-400/60 animate-spin",
      icon: <Loader2 className="w-8 h-8 text-white animate-spin" />,
      pulseScale: 1.05,
    },
    thinking: {
      orbBg: "from-amber-500 via-orange-600 to-purple-800",
      glowBg: "rgba(168, 85, 247, 0.55)",
      ringColor: "border-purple-400 animate-spin",
      icon: <Sparkles className="w-8 h-8 text-amber-200 animate-spin" />,
      pulseScale: 1.08,
    },
    speaking: {
      orbBg: "from-yellow-300 via-amber-400 to-orange-500",
      glowBg: "rgba(251, 191, 36, 0.8)",
      ringColor: "border-yellow-400/80 animate-pulse",
      icon: <Volume2 className="w-9 h-9 text-white animate-pulse" />,
      pulseScale: 1.12 + Math.random() * 0.08,
    },
    interrupted: {
      orbBg: "from-orange-400 via-amber-500 to-yellow-600",
      glowBg: "rgba(249, 115, 22, 0.5)",
      ringColor: "border-orange-400",
      icon: <Mic className="w-8 h-8 text-white" />,
      pulseScale: 1.02,
    },
    error: {
      orbBg: "from-red-500 via-rose-600 to-amber-700",
      glowBg: "rgba(239, 68, 68, 0.4)",
      ringColor: "border-red-400/50",
      icon: <AlertCircle className="w-8 h-8 text-white" />,
      pulseScale: 1,
    },
  }[state];

  return (
    <div
      onClick={onClick}
      className="relative flex items-center justify-center cursor-pointer select-none group py-2"
      role="button"
      tabIndex={0}
      aria-label={`Divine AI Voice Orb — ${state}`}
    >
      {/* Outer Halo Glow */}
      <div
        className="absolute inset-0 rounded-full blur-2xl transition-all duration-300 pointer-events-none"
        style={{
          background: stateConfig.glowBg,
          transform: `scale(${stateConfig.pulseScale * 1.3})`,
        }}
      />

      {/* Pulsing Ripple Rings */}
      <div
        className={`absolute inset-0 rounded-full border-2 transition-all duration-300 ${stateConfig.ringColor}`}
        style={{
          transform: `scale(${stateConfig.pulseScale * 1.25})`,
          opacity: state === "speaking" || state === "recording" ? 0.8 : 0.4,
        }}
      />
      <div
        className={`absolute inset-0 rounded-full border transition-all duration-500 ${stateConfig.ringColor}`}
        style={{
          transform: `scale(${stateConfig.pulseScale * 1.45})`,
          opacity: state === "speaking" || state === "recording" ? 0.5 : 0.2,
        }}
      />

      {/* Main Divine Crystal Orb */}
      <div
        className={`relative ${sizeClasses} rounded-full bg-gradient-to-tr ${stateConfig.orbBg} shadow-2xl flex items-center justify-center transition-transform duration-300 transform group-hover:scale-105 active:scale-95`}
        style={{
          transform: `scale(${stateConfig.pulseScale})`,
          boxShadow: `0 0 35px ${stateConfig.glowBg}, inset 0 2px 14px rgba(255,255,255,0.6), inset 0 -4px 12px rgba(0,0,0,0.4)`,
        }}
      >
        {/* Divine Light Shimmer Overlay */}
        <div className="absolute top-2 left-3 w-1/3 h-1/3 rounded-full bg-gradient-to-b from-white/75 to-transparent blur-[1px] pointer-events-none" />

        {/* Center Audio Waveform Bars (When Speaking or Recording) */}
        {(state === "speaking" || state === "recording" || state === "listening") && (
          <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-70 pointer-events-none">
            {[1, 2, 3, 4, 3, 2, 1].map((bar, idx) => (
              <span
                key={idx}
                className="w-1 bg-white/80 rounded-full transition-all duration-150"
                style={{
                  height: `${Math.max(6, (audioLevel * 30 + bar * 5) * (state === "speaking" ? 1.2 : 0.8))}px`,
                }}
              />
            ))}
          </div>
        )}

        {/* Center Status Icon */}
        <div className="relative z-10 transition-transform duration-200">
          {stateConfig.icon}
        </div>
      </div>
    </div>
  );
}
