import { cleanTextForSpeech } from "./text-cleaner";

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

  public async speak(text: string, options: TTSOptions = {}) {
    this.stop();
    this.isSpeaking = true;

    const cleanText = cleanTextForSpeech(text);
    if (!cleanText) {
      this.isSpeaking = false;
      options.onEnded?.();
      return;
    }

    this.currentAbortController = new AbortController();

    try {
      // 1. Try server-side OpenRouter / Fish Audio / ElevenLabs TTS
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
            options.onStart?.();
          };

          audio.onended = () => {
            this.isSpeaking = false;
            this.currentAudio = null;
            options.onEnded?.();
          };

          audio.onerror = (err) => {
            console.warn("Server audio playback failed, falling back to browser speech synthesis:", err);
            this.fallbackBrowserSpeech(cleanText, options);
          };

          await audio.play();
          return;
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

  private fallbackBrowserSpeech(text: string, options: TTSOptions) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      this.isSpeaking = false;
      options.onEnded?.();
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance = utterance;

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) => v.lang.startsWith("hi") || v.lang.includes("IN") || v.name.includes("India")
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      options.onStart?.();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      options.onEnded?.();
    };

    utterance.onerror = (e) => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      options.onError?.(e);
      options.onEnded?.();
    };

    window.speechSynthesis.speak(utterance);
  }

  /**
   * Immediately stops any ongoing speech playback (Barge-in / Interruption).
   */
  public stop() {
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

  public getIsSpeaking(): boolean {
    return this.isSpeaking;
  }
}
