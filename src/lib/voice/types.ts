export type VoiceState =
  | "idle"
  | "listening"
  | "transcribing"
  | "thinking"
  | "speaking"
  | "error";

export interface VoiceStateInfo {
  state: VoiceState;
  label: string;
  hindiLabel: string;
}

export const VOICE_STATE_LABELS: Record<VoiceState, { en: string; hi: string }> = {
  idle: { en: "Tap to speak", hi: "Tap karke bolein" },
  listening: { en: "Listening to you...", hi: "Main sun raha hoon..." },
  transcribing: { en: "Processing voice...", hi: "Samajh raha hoon..." },
  thinking: { en: "Reflecting with Divine Wisdom...", hi: "Soch raha hoon..." },
  speaking: { en: "Divine AI Guide is speaking...", hi: "Divine AI bol raha hai..." },
  error: { en: "Voice service unavailable", hi: "Kripya punah prayas karein" },
};
