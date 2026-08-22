/**
 * SCIENCE DIVINE — SPEECH TO TEXT CLIENT
 * Supports Web Speech API (hi-IN, en-IN) with fallback to server-side Whisper.
 */

export interface STTCallbacks {
  onStart?: () => void;
  onInterimResult?: (transcript: string) => void;
  onFinalResult?: (transcript: string) => void;
  onError?: (error: string) => void;
  onEnd?: () => void;
}

export class SpeechToTextClient {
  private recognition: any = null;
  private isListening = false;
  private callbacks: STTCallbacks = {};
  private currentLanguage = "hi-IN";
  private finalTranscript = "";

  constructor(callbacks: STTCallbacks = {}) {
    this.callbacks = callbacks;
    this.initBrowserRecognition();
  }

  private initBrowserRecognition() {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      return;
    }

    try {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = this.currentLanguage;
      this.recognition.maxAlternatives = 1;

      this.recognition.onstart = () => {
        this.isListening = true;
        this.finalTranscript = "";
        if (process.env.NODE_ENV === "development") {
          console.log("[DIVINE VOICE] state: listening");
        }
        this.callbacks.onStart?.();
      };

      this.recognition.onresult = (event: any) => {
        let interim = "";
        let final = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const item = event.results[i];
          const text = item[0].transcript;
          if (item.isFinal) {
            final += text;
          } else {
            interim += text;
          }
        }

        if (interim) {
          this.callbacks.onInterimResult?.(interim.trim());
        }

        if (final) {
          const cleanFinal = final.trim();
          this.finalTranscript = cleanFinal;
          if (process.env.NODE_ENV === "development") {
            console.log("[DIVINE VOICE] final transcript:", cleanFinal);
          }
          this.callbacks.onFinalResult?.(cleanFinal);
        }
      };

      this.recognition.onerror = (event: any) => {
        const errType = event.error || "unknown";
        if (process.env.NODE_ENV === "development") {
          console.warn("[DIVINE VOICE] recognition error:", errType);
        }
        this.isListening = false;
        if (errType === "not-allowed" || errType === "permission-denied") {
          this.callbacks.onError?.("permission-denied");
        } else if (errType !== "no-speech" && errType !== "aborted") {
          this.callbacks.onError?.(errType);
        }
      };

      this.recognition.onend = () => {
        this.isListening = false;
        if (process.env.NODE_ENV === "development") {
          console.log("[DIVINE VOICE] recognition ended");
        }
        this.callbacks.onEnd?.();
      };
    } catch (e) {
      console.warn("Failed to initialize Web Speech Recognition:", e);
    }
  }

  public isSupported(): boolean {
    if (typeof window === "undefined") return false;
    return Boolean(
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    );
  }

  public start(lang = "hi-IN") {
    this.currentLanguage = lang;
    this.finalTranscript = "";

    if (!this.recognition) {
      this.initBrowserRecognition();
    }
    if (!this.recognition) {
      return;
    }

    try {
      this.recognition.lang = lang;
      this.recognition.start();
    } catch (err: any) {
      if (err.name !== "InvalidStateError") {
        console.error("Failed to start speech recognition:", err);
      }
    }
  }

  public stop() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (err) {
        // ignore
      }
    }
    this.isListening = false;
  }

  public abort() {
    if (this.recognition) {
      try {
        this.recognition.abort();
      } catch (err) {
        // ignore
      }
    }
    this.isListening = false;
  }

  public getIsListening(): boolean {
    return this.isListening;
  }

  /**
   * Fallback: Transcribes an audio blob using server-side Whisper Large v3
   */
  public async transcribeBlob(audioBlob: Blob): Promise<string> {
    try {
      const formData = new FormData();
      formData.append("file", audioBlob, "speech.webm");

      const res = await fetch("/api/voice/transcribe", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        return data.text ? data.text.trim() : "";
      }
    } catch (err) {
      console.warn("Server transcribe error:", err);
    }
    return "";
  }
}
