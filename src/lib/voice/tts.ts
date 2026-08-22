import { cleanTextForSpeech } from "./text-cleaner";
import { sanitizeAIResponse } from "@/lib/ai/divine-system-prompt";

export interface TTSOptions {
  onStart?: () => void;
  onEnded?: () => void;
  onError?: (error: any) => void;
}

// 0.05s silent MP3 data URI to warm up mobile audio
const SILENT_AUDIO_URI =
  "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";

export class TextToSpeechClient {
  private persistentAudio: HTMLAudioElement | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeaking = false;
  private currentAbortController: AbortController | null = null;
  private isAudioUnlocked = false;

  constructor() {
    if (typeof window !== "undefined") {
      try {
        this.persistentAudio = new Audio();
      } catch (e) {
        // ignore
      }
    }
  }

  /**
   * Unlock browser audio playback on direct user gesture (touch/click).
   * Essential for iOS Safari and Android Chrome.
   */
  public unlockAudio() {
    if (typeof window === "undefined") return;

    try {
      // 1. Unlock Web Audio API AudioContext
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        if (ctx.state === "suspended") {
          ctx.resume();
        }
      }

      // 2. Unlock HTMLAudioElement with silent buffer
      if (!this.persistentAudio) {
        this.persistentAudio = new Audio();
      }

      if (!this.isAudioUnlocked) {
        this.persistentAudio.src = SILENT_AUDIO_URI;
        const playPromise = this.persistentAudio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              this.isAudioUnlocked = true;
            })
            .catch(() => {
              // will unlock on next interaction
            });
        }
      }

      // 3. Unlock SpeechSynthesis on mobile
      if ("speechSynthesis" in window) {
        window.speechSynthesis.resume();
      }
    } catch (e) {
      console.warn("Mobile audio unlock exception:", e);
    }
  }

  public async speakText(text: string, options: TTSOptions = {}) {
    this.stopSpeaking();
    this.isSpeaking = true;
    this.unlockAudio();

    // Sanitize any reasoning artifacts and strip markdown/URLs
    const sanitized = sanitizeAIResponse(text);
    const cleanText = cleanTextForSpeech(sanitized);

    if (!cleanText || cleanText.length < 1) {
      this.isSpeaking = false;
      options.onEnded?.();
      return;
    }

    if (process.env.NODE_ENV === "development") {
      console.log("[DIVINE TTS] speaking:", cleanText);
    }

    this.currentAbortController = new AbortController();

    try {
      // 1. Try server-side Free.ai / OpenRouter TTS
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: cleanText }),
        signal: this.currentAbortController.signal,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.available && data.audioBase64) {
          const audioSrc = `data:${data.contentType || "audio/mpeg"};base64,${data.audioBase64}`;

          if (!this.persistentAudio) {
            this.persistentAudio = new Audio();
          }

          const audio = this.persistentAudio;
          audio.src = audioSrc;
          audio.currentTime = 0;

          audio.onplay = () => {
            this.isSpeaking = true;
            options.onStart?.();
          };

          audio.onended = () => {
            this.isSpeaking = false;
            options.onEnded?.();
          };

          audio.onerror = (err) => {
            console.warn("Audio element error, falling back to browser synthesis:", err);
            this.fallbackBrowserSpeech(cleanText, options);
          };

          try {
            await audio.play();
            return;
          } catch (playErr) {
            console.warn("audio.play() blocked on mobile, using browser synthesis fallback:", playErr);
            this.fallbackBrowserSpeech(cleanText, options);
            return;
          }
        }
      }

      // If server speech unavailable, use browser synthesis fallback
      this.fallbackBrowserSpeech(cleanText, options);
    } catch (err: any) {
      if (err.name === "AbortError") {
        return; // Interrupted intentionally
      }
      console.warn("TTS fetch error, using browser fallback:", err);
      this.fallbackBrowserSpeech(cleanText, options);
    }
  }

  // Alias for backward compatibility
  public async speak(text: string, options: TTSOptions = {}) {
    return this.speakText(text, options);
  }

  private fallbackBrowserSpeech(text: string, options: TTSOptions) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      this.isSpeaking = false;
      options.onEnded?.();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();

      const utterance = new SpeechSynthesisUtterance(text);
      this.currentUtterance = utterance;

      const setVoiceAndSpeak = () => {
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice =
          voices.find((v) => v.lang === "hi-IN" || v.lang === "hi_IN") ||
          voices.find((v) => v.lang.startsWith("hi")) ||
          voices.find((v) => v.lang.includes("IN") || v.name.includes("India")) ||
          voices.find((v) => v.lang.startsWith("en"));

        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }

        utterance.rate = 0.98;
        utterance.pitch = 1.0;

        utterance.onstart = () => {
          this.isSpeaking = true;
          options.onStart?.();
        };

        utterance.onend = () => {
          this.isSpeaking = false;
          this.currentUtterance = null;
          options.onEnded?.();
        };

        utterance.onerror = (err) => {
          this.isSpeaking = false;
          this.currentUtterance = null;
          options.onError?.(err);
          options.onEnded?.();
        };

        window.speechSynthesis.speak(utterance);
      };

      if (window.speechSynthesis.getVoices().length > 0) {
        setVoiceAndSpeak();
      } else {
        window.speechSynthesis.onvoiceschanged = () => {
          setVoiceAndSpeak();
        };
        // Fallback speak immediately in case voiceschanged does not fire
        setTimeout(() => {
          if (!this.isSpeaking) {
            window.speechSynthesis.speak(utterance);
          }
        }, 100);
      }
    } catch (synthErr) {
      console.warn("speechSynthesis error:", synthErr);
      this.isSpeaking = false;
      options.onEnded?.();
    }
  }

  public stopSpeaking() {
    if (this.currentAbortController) {
      this.currentAbortController.abort();
      this.currentAbortController = null;
    }

    if (this.persistentAudio) {
      try {
        this.persistentAudio.pause();
        this.persistentAudio.currentTime = 0;
      } catch (e) {
        // ignore
      }
    }

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        // ignore
      }
    }

    this.currentUtterance = null;
    this.isSpeaking = false;
  }

  public get speaking(): boolean {
    return this.isSpeaking;
  }
}
