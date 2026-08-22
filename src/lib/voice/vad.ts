export interface VADCallbacks {
  onSpeechStart?: () => void;
  onSpeechEnd?: (audioBlob: Blob) => void;
  onVolumeChange?: (volume: number) => void;
  onError?: (error: string) => void;
}

export class VoiceActivityDetector {
  private audioContext: AudioContext | null = null;
  private mediaStream: MediaStream | null = null;
  private analyser: AnalyserNode | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];

  private isRunning = false;
  private isSpeaking = false;
  private silenceTimer: NodeJS.Timeout | null = null;
  private animFrameId: number | null = null;

  private threshold = 0.025; // Energy threshold to trigger speech
  private silenceDurationMs = 1200; // Silence duration before considering speech finished
  private minSpeechDurationMs = 400; // Minimum duration to prevent false clicks
  private speechStartTime = 0;

  private callbacks: VADCallbacks;

  constructor(callbacks: VADCallbacks = {}) {
    this.callbacks = callbacks;
  }

  public async start(): Promise<boolean> {
    this.stop();

    if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      this.callbacks.onError?.("Microphone is not supported in this browser.");
      return false;
    }

    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.audioContext = new AudioContextClass();
      const source = this.audioContext.createMediaStreamSource(this.mediaStream);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 512;
      this.analyser.smoothingTimeConstant = 0.4;
      source.connect(this.analyser);

      // Determine supported mime type for MediaRecorder
      const mimeTypes = [
        "audio/webm;codecs=opus",
        "audio/webm",
        "audio/ogg;codecs=opus",
        "audio/mp4",
        "audio/wav",
      ];
      const selectedMime = mimeTypes.find((m) => MediaRecorder.isTypeSupported(m)) || "";

      this.mediaRecorder = new MediaRecorder(this.mediaStream, selectedMime ? { mimeType: selectedMime } : {});
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        if (this.audioChunks.length > 0) {
          const mime = this.mediaRecorder?.mimeType || "audio/webm";
          const blob = new Blob(this.audioChunks, { type: mime });
          this.callbacks.onSpeechEnd?.(blob);
        }
        this.audioChunks = [];
      };

      this.isRunning = true;
      this.monitorAudioLevel();
      return true;
    } catch (err: any) {
      console.warn("VAD microphone permission/access error:", err);
      let errorMsg = "Microphone permission is required to use voice mode.";
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        errorMsg = "I couldn't access your microphone. Please check your browser permissions.";
      } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        errorMsg = "No microphone found on this device.";
      }
      this.callbacks.onError?.(errorMsg);
      this.stop();
      return false;
    }
  }

  private monitorAudioLevel = () => {
    if (!this.isRunning || !this.analyser) return;

    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteTimeDomainData(dataArray);

    // Calculate Root Mean Square (RMS) volume
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      const val = (dataArray[i] - 128) / 128;
      sum += val * val;
    }
    const rms = Math.sqrt(sum / dataArray.length);

    // Normalize volume 0 to 1
    const normalizedVol = Math.min(1, rms * 4);
    this.callbacks.onVolumeChange?.(normalizedVol);

    if (rms > this.threshold) {
      if (!this.isSpeaking) {
        // Speech just started!
        this.isSpeaking = true;
        this.speechStartTime = Date.now();
        this.audioChunks = [];
        try {
          if (this.mediaRecorder && this.mediaRecorder.state === "inactive") {
            this.mediaRecorder.start(100);
          }
        } catch (e) {
          // ignore
        }
        this.callbacks.onSpeechStart?.();
      }

      // Reset silence timer while user is actively speaking
      if (this.silenceTimer) {
        clearTimeout(this.silenceTimer);
        this.silenceTimer = null;
      }
    } else if (this.isSpeaking) {
      // User was speaking, now silence detected
      if (!this.silenceTimer) {
        this.silenceTimer = setTimeout(() => {
          const duration = Date.now() - this.speechStartTime;
          this.isSpeaking = false;
          this.silenceTimer = null;

          if (duration >= this.minSpeechDurationMs) {
            try {
              if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
                this.mediaRecorder.stop();
              }
            } catch (e) {
              // ignore
            }
          } else {
            // Speech was too short / noise spike
            this.audioChunks = [];
          }
        }, this.silenceDurationMs);
      }
    }

    this.animFrameId = requestAnimationFrame(this.monitorAudioLevel);
  };

  public stop() {
    this.isRunning = false;
    this.isSpeaking = false;

    if (this.silenceTimer) {
      clearTimeout(this.silenceTimer);
      this.silenceTimer = null;
    }

    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }

    if (this.mediaRecorder && this.mediaRecorder.state !== "inactive") {
      try {
        this.mediaRecorder.stop();
      } catch (e) {
        // ignore
      }
    }

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }

    if (this.audioContext && this.audioContext.state !== "closed") {
      try {
        this.audioContext.close();
      } catch (e) {
        // ignore
      }
      this.audioContext = null;
    }

    this.callbacks.onVolumeChange?.(0);
  }

  public getIsRunning(): boolean {
    return this.isRunning;
  }
}
