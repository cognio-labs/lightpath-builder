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

  // Vibrant, luminous sacred color palettes (No hard outline lines)
  const stateConfig = {
    idle: {
      orbBg: "from-amber-300 via-yellow-500 to-amber-600",
      glowBg: "rgba(245, 158, 11, 0.45)",
      innerShadow: "0 0 50px rgba(245, 158, 11, 0.55)",
      icon: <Sparkles className="w-8 h-8 text-white drop-shadow-md animate-pulse" />,
      pulseScale: 1,
    },
    requesting_permission: {
      orbBg: "from-sky-300 via-cyan-500 to-blue-600",
      glowBg: "rgba(14, 165, 233, 0.55)",
      innerShadow: "0 0 50px rgba(14, 165, 233, 0.6)",
      icon: <Radio className="w-8 h-8 text-white animate-pulse" />,
      pulseScale: 1.04,
    },
    listening: {
      orbBg: "from-sky-400 via-cyan-400 to-blue-500",
      glowBg: "rgba(56, 189, 248, 0.75)",
      innerShadow: "0 0 60px rgba(56, 189, 248, 0.8)",
      icon: <Mic className="w-9 h-9 text-white animate-bounce drop-shadow-lg" />,
      pulseScale: 1.06 + audioLevel * 0.22,
    },
    recording: {
      orbBg: "from-rose-400 via-amber-500 to-red-500",
      glowBg: "rgba(244, 63, 94, 0.7)",
      innerShadow: "0 0 60px rgba(244, 63, 94, 0.75)",
      icon: <Mic className="w-9 h-9 text-white drop-shadow-lg" />,
      pulseScale: 1.1 + audioLevel * 0.3,
    },
    transcribing: {
      orbBg: "from-yellow-300 via-amber-400 to-orange-500",
      glowBg: "rgba(251, 191, 36, 0.6)",
      innerShadow: "0 0 50px rgba(251, 191, 36, 0.6)",
      icon: <Loader2 className="w-8 h-8 text-white animate-spin drop-shadow-md" />,
      pulseScale: 1.05,
    },
    thinking: {
      orbBg: "from-violet-400 via-purple-500 to-amber-500",
      glowBg: "rgba(168, 85, 247, 0.65)",
      innerShadow: "0 0 55px rgba(168, 85, 247, 0.7)",
      icon: <Sparkles className="w-8 h-8 text-amber-100 animate-spin drop-shadow-md" />,
      pulseScale: 1.08,
    },
    speaking: {
      orbBg: "from-yellow-200 via-amber-400 to-yellow-500",
      glowBg: "rgba(250, 204, 21, 0.85)",
      innerShadow: "0 0 65px rgba(250, 204, 21, 0.9)",
      icon: <Volume2 className="w-9 h-9 text-white animate-pulse drop-shadow-lg" />,
      pulseScale: 1.12 + Math.random() * 0.08,
    },
    interrupted: {
      orbBg: "from-sky-400 via-amber-400 to-cyan-500",
      glowBg: "rgba(56, 189, 248, 0.6)",
      innerShadow: "0 0 45px rgba(56, 189, 248, 0.6)",
      icon: <Mic className="w-8 h-8 text-white" />,
      pulseScale: 1.02,
    },
    error: {
      orbBg: "from-red-500 via-rose-600 to-amber-700",
      glowBg: "rgba(239, 68, 68, 0.45)",
      innerShadow: "0 0 35px rgba(239, 68, 68, 0.5)",
      icon: <AlertCircle className="w-8 h-8 text-white" />,
      pulseScale: 1,
    },
  }[state];

  return (
    <div
      onClick={onClick}
      className="relative flex items-center justify-center cursor-pointer select-none group py-4"
      role="button"
      tabIndex={0}
      aria-label={`Divine AI Voice Orb — ${state}`}
    >
      {/* 🌟 1. OUTER SOFT LUMINOUS ENERGY GLOW (NO HARD OUTLINES) */}
      <div
        className="absolute inset-0 rounded-full blur-3xl transition-all duration-500 pointer-events-none"
        style={{
          background: stateConfig.glowBg,
          transform: `scale(${stateConfig.pulseScale * 1.4})`,
        }}
      />
      <div
        className="absolute inset-0 rounded-full blur-xl transition-all duration-300 pointer-events-none opacity-60"
        style={{
          background: stateConfig.glowBg,
          transform: `scale(${stateConfig.pulseScale * 1.2})`,
        }}
      />

      {/* 🌟 2. MAIN 3D CRYSTAL SACRED ORB (Clean Seamless Sphere) */}
      <div
        className={`relative ${sizeClasses} rounded-full bg-gradient-to-tr ${stateConfig.orbBg} shadow-2xl flex items-center justify-center transition-transform duration-300 transform group-hover:scale-105 active:scale-95`}
        style={{
          transform: `scale(${stateConfig.pulseScale})`,
          boxShadow: `${stateConfig.innerShadow}, inset 0 4px 20px rgba(255,255,255,0.9), inset 0 -6px 18px rgba(0,0,0,0.35)`,
        }}
      >
        {/* 🌟 3D Glass Specular Reflection Highlight (Top Left Shimmer) */}
        <div
          className="absolute top-2.5 left-3.5 w-2/5 h-2/5 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.3) 40%, transparent 80%)",
          }}
        />

        {/* 🌟 Bottom Soft Ambient Reflection */}
        <div
          className="absolute bottom-1.5 right-2.5 w-1/3 h-1/4 rounded-full pointer-events-none opacity-30 blur-[2px]"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.7) 0%, transparent 70%)",
          }}
        />

        {/* 🌟 Dynamic Audio Frequency Waveform Bars (When Speaking or Listening) */}
        {(state === "speaking" || state === "recording" || state === "listening") && (
          <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-80 pointer-events-none">
            {[1, 2.2, 3.5, 4.2, 3.5, 2.2, 1].map((bar, idx) => (
              <span
                key={idx}
                className="w-1 bg-white/95 rounded-full transition-all duration-150 shadow-sm"
                style={{
                  height: `${Math.max(8, (audioLevel * 36 + bar * 6) * (state === "speaking" ? 1.2 : 0.85))}px`,
                }}
              />
            ))}
          </div>
        )}

        {/* 🌟 Center State Icon */}
        <div className="relative z-10 transition-transform duration-200 drop-shadow-md">
          {stateConfig.icon}
        </div>
      </div>
    </div>
  );
}
