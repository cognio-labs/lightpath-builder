export interface TTSOptions {
  onStart?: () => void;
  onEnded?: () => void;
  onError?: (error: any) => void;
}

export class TextToSpeechClient {
  private currentAudio: HTMLAudioElement | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeaking = false;

  public async speak(text: string, options: TTSOptions = {}) {
    this.stop();
    this.isSpeaking = true;

    // Clean markdown symbols from voice synthesis
    const cleanText = text
      .replace(/[*_~`#\[\]\(\)]/g, "")
      .replace(/https?:\/\/\S+/g, "")
      .trim();

    if (!cleanText) {
      options.onEnded?.();
      return;
    }

    try {
      // 1. Try ElevenLabs API endpoint first
      const res = await fetch("/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: cleanText }),
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
            console.warn("ElevenLabs audio playback failed, falling back to browser synthesis:", err);
            this.fallbackBrowserSpeech(cleanText, options);
          };

          await audio.play();
          return;
        }
      }

      // Fallback if ElevenLabs not available
      this.fallbackBrowserSpeech(cleanText, options);
    } catch (err) {
      console.warn("TTS error, using browser speech fallback:", err);
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

    // Choose Hindi / Indian English voice if available
    const voices = window.speechSynthesis.getVoices();
    const hiVoice = voices.find(
      (v) => v.lang.startsWith("hi") || v.lang.includes("IN") || v.name.includes("India")
    );
    if (hiVoice) {
      utterance.voice = hiVoice;
    }

    utterance.rate = 0.95; // peaceful, calm cadence
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

  public stop() {
    this.isSpeaking = false;
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
