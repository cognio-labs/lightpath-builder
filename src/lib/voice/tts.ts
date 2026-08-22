import { cleanTextForSpeech } from "./text-cleaner";
import { sanitizeAIResponse } from "@/lib/ai/divine-system-prompt";

export interface TTSOptions {
  onStart?: () => void;
  onEnded?: () => void;
  onError?: (error: any) => void;
}

export class TextToSpeechClient {
  private currentAudio: HTMLAudioElement | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeaking = false;
  private currentAbortController: AbortController | null = null;
  private isAudioUnlocked = false;

  /**
   * Unlock browser audio playback on first user gesture.
   */
  public unlockAudio() {
    if (this.isAudioUnlocked || typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const audioCtx = new AudioCtx();
        if (audioCtx.state === "suspended") {
          audioCtx.resume();
        }
      }
      const dummy = new Audio();
      dummy.play().catch(() => {});
      this.isAudioUnlocked = true;
    } catch (e) {
      // ignore
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
      // 1. Try server-side OpenRouter Fish Audio Free TTS
      const res = await fetch("/api/voice/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: cleanText }),
        signal: this.currentAbortController.signal,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.available && data.audioBase64) {
          const audioSrc = `data:${data.contentType || "audio/mpeg"};base64,${data.audioBase64}`;
          const audio = new Audio(audioSrc);
          this.currentAudio = audio;

          audio.onplay = () => {
            this.isSpeaking = true;
            options.onStart?.();
          };

          audio.onended = () => {
            this.isSpeaking = false;
            this.currentAudio = null;
            if (process.env.NODE_ENV === "development") {
              console.log("[DIVINE TTS] finished");
            }
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
            console.warn("audio.play() blocked, using browser synthesis fallback:", playErr);
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
          if (process.env.NODE_ENV === "development") {
            console.log("[DIVINE TTS] browser speech finished");
          }
          options.onEnded?.();
        };

        utterance.onerror = (e) => {
          console.warn("Browser SpeechSynthesis error:", e);
          this.isSpeaking = false;
          this.currentUtterance = null;
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
        setTimeout(setVoiceAndSpeak, 150);
      }
    } catch (e) {
      console.warn("Failed to trigger browser speech:", e);
      this.isSpeaking = false;
      options.onEnded?.();
    }
  }

  /**
   * Immediately stops any ongoing speech playback (Barge-in / Interruption).
   */
  public stopSpeaking() {
    this.isSpeaking = false;

    if (this.currentAbortController) {
      this.currentAbortController.abort();
      this.currentAbortController = null;
    }

    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch (err) {
        // ignore
      }
      this.currentAudio = null;
    }

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (err) {
        // ignore
      }
      this.currentUtterance = null;
    }
  }

  // Alias for backward compatibility
  public stop() {
    this.stopSpeaking();
  }

  public getIsSpeaking(): boolean {
    return this.isSpeaking;
  }
}
