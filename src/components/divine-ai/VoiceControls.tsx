"use client";

import React from "react";
import { VoiceState, VOICE_STATE_LABELS } from "@/lib/voice/types";
import { Mic, MicOff, Volume2, VolumeX, Keyboard, Radio, StopCircle } from "lucide-react";

interface VoiceControlsProps {
  voiceState: VoiceState;
  isContinuousListening: boolean;
  isMuted: boolean;
  liveTranscript?: string;
  onToggleMic: () => void;
  onToggleContinuous: () => void;
  onToggleMute: () => void;
  onToggleKeyboardMode: () => void;
  showKeyboardInput: boolean;
}

export function VoiceControls({
  voiceState,
  isContinuousListening,
  isMuted,
  liveTranscript,
  onToggleMic,
  onToggleContinuous,
  onToggleMute,
  onToggleKeyboardMode,
  showKeyboardInput,
}: VoiceControlsProps) {
  const stateLabel = VOICE_STATE_LABELS[voiceState] || VOICE_STATE_LABELS.idle;

  const isMicActive =
    voiceState === "listening" ||
    voiceState === "recording" ||
    voiceState === "requesting_permission";

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      {/* Live transcript or State status label */}
      <div className="text-center min-h-[32px] px-4 py-1.5 rounded-full bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 max-w-full">
        {liveTranscript ? (
          <p className="text-xs md:text-sm font-medium text-amber-900 dark:text-amber-200 animate-pulse truncate max-w-xs md:max-w-sm">
            🎙️ &quot;{liveTranscript}&quot;
          </p>
        ) : (
          <p className="text-xs md:text-sm font-medium text-amber-900 dark:text-amber-300">
            {stateLabel.hi} <span className="opacity-60 text-[11px]">({stateLabel.en})</span>
          </p>
        )}
      </div>

      {/* Control Buttons Toolbar */}
      <div className="flex items-center gap-3">
        {/* Continuous Conversation Toggle */}
        <button
          onClick={onToggleContinuous}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            isContinuousListening
              ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
          }`}
          title="Auto-listening mode (Gemini style continuous talk)"
        >
          <Radio size={12} className={isContinuousListening ? "animate-pulse" : ""} />
          <span>Auto Voice</span>
        </button>

        {/* Central Mic / Interrupt / Action Button */}
        <button
          onClick={onToggleMic}
          className={`p-3.5 rounded-full shadow-lg transition-all transform hover:scale-110 active:scale-95 ${
            voiceState === "speaking"
              ? "bg-amber-500 text-white shadow-amber-500/50 hover:bg-amber-600"
              : isMicActive
              ? "bg-red-500 text-white shadow-red-500/50 animate-pulse"
              : "bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-amber-500/30"
          }`}
          aria-label={voiceState === "speaking" ? "Interrupt AI" : "Toggle Microphone"}
          title={voiceState === "speaking" ? "Tap to interrupt AI" : "Tap to speak"}
        >
          {voiceState === "speaking" ? (
            <StopCircle size={20} />
          ) : isMicActive ? (
            <MicOff size={20} />
          ) : (
            <Mic size={20} />
          )}
        </button>

        {/* Audio Mute/Unmute */}
        <button
          onClick={onToggleMute}
          className={`p-2 rounded-full text-xs transition-colors ${
            isMuted
              ? "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
          }`}
          title={isMuted ? "Unmute Voice" : "Mute Voice"}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>

        {/* Keyboard Input Switch */}
        <button
          onClick={onToggleKeyboardMode}
          className={`p-2 rounded-full text-xs transition-colors ${
            showKeyboardInput
              ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
          }`}
          title="Toggle Text Keyboard"
        >
          <Keyboard size={16} />
        </button>
      </div>
    </div>
  );
}
