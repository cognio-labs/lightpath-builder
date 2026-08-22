export interface STTCallbacks {
  onStart?: () => void;
  onResult?: (transcript: string, isFinal: boolean) => void;
  onError?: (error: string) => void;
  onEnd?: () => void;
}

export class SpeechToTextClient {
  private recognition: any = null;
  private isListening = false;
  private callbacks: STTCallbacks = {};

  constructor(callbacks: STTCallbacks = {}) {
    this.callbacks = callbacks;
    this.initRecognition();
  }

  private initRecognition() {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("Web Speech Recognition is not supported in this browser.");
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = true;
    this.recognition.lang = "hi-IN"; // Supports Hindi & Hinglish naturally, works with English accents too

    this.recognition.onstart = () => {
      this.isListening = true;
      this.callbacks.onStart?.();
    };

    this.recognition.onresult = (event: any) => {
      let interim = "";
      let final = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const text = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += text;
        } else {
          interim += text;
        }
      }

      const text = final || interim;
      if (text) {
        this.callbacks.onResult?.(text, Boolean(final));
      }
    };

    this.recognition.onerror = (event: any) => {
      console.warn("Speech recognition error:", event.error);
      this.isListening = false;
      this.callbacks.onError?.(event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      this.callbacks.onEnd?.();
    };
  }

  public isSupported(): boolean {
    return Boolean(this.recognition);
  }

  public start(lang = "hi-IN") {
    if (!this.recognition) {
      this.initRecognition();
    }
    if (!this.recognition) {
      this.callbacks.onError?.("Speech recognition not supported");
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
}
