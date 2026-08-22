export type VoiceState =
  | "idle"
  | "requesting_permission"
  | "listening"
  | "recording"
  | "transcribing"
  | "thinking"
  | "speaking"
  | "interrupted"
  | "error";

export const VOICE_STATE_LABELS: Record<VoiceState, { en: string; hi: string }> = {
  idle: { en: "Ready when you are", hi: "Bolne ke liye ready hoon..." },
  requesting_permission: { en: "Allow microphone...", hi: "Mic ki permission dein..." },
  listening: { en: "Listening for speech...", hi: "Main sun raha hoon..." },
  recording: { en: "Recording your voice...", hi: "Aap bol rahe hain..." },
  transcribing: { en: "Understanding words...", hi: "Samajh raha hoon..." },
  thinking: { en: "Reflecting with Divine Wisdom...", hi: "Soch raha hoon..." },
  speaking: { en: "Divine AI Guide is speaking...", hi: "Divine AI Guide bol raha hai..." },
  interrupted: { en: "Listening again...", hi: "Sun raha hoon..." },
  error: { en: "Please say that again", hi: "Ek baar phir bolenge?" },
};
