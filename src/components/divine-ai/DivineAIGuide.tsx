"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { VoiceOrb } from "./VoiceOrb";
import { VoiceControls } from "./VoiceControls";
import { ConversationMessages, MessageItem } from "./ConversationMessages";
import { VoiceState } from "@/lib/voice/types";
import { VoiceActivityDetector } from "@/lib/voice/vad";
import { SpeechToTextClient } from "@/lib/voice/stt";
import { TextToSpeechClient } from "@/lib/voice/tts";
import { X, Send, Sparkles, RefreshCw } from "lucide-react";
import { LOGO_URL } from "@/data/content";

const INITIAL_GREETING: MessageItem = {
  id: "initial",
  sender: "bot",
  text: "🙏 **Hari Om & Namaste!** Main aapka **Divine AI Guide** hoon.\n\nAap Sakshi Shree, Science Divine Movement, courses, meditation techniques, personal session ya kisi bhi jeevan ki duvidha ke vishay mein pooch sakte hain.",
  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  suggestedQuestions: [
    "Guru Ji kaun hain?",
    "Science Divine ke courses kaunse hain?",
    "Overthinking se mukti kaise payein?",
    "Personal session kaise book karein?",
  ],
};

export function DivineAIGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [audioLevel, setAudioLevel] = useState(0);
  const [isContinuousListening, setIsContinuousListening] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showKeyboardInput, setShowKeyboardInput] = useState(false);
  const [inputText, setInputText] = useState("");
  const [liveTranscript, setLiveTranscript] = useState("");
  const [messages, setMessages] = useState<MessageItem[]>([INITIAL_GREETING]);
  const [isThinking, setIsThinking] = useState(false);

  const vadRef = useRef<VoiceActivityDetector | null>(null);
  const sttRef = useRef<SpeechToTextClient | null>(null);
  const ttsRef = useRef<TextToSpeechClient | null>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const conversationIdRef = useRef<string>(`conv-${Date.now()}`);

  const isContinuousRef = useRef(isContinuousListening);
  const isMutedRef = useRef(isMuted);
  const voiceStateRef = useRef(voiceState);

  useEffect(() => {
    isContinuousRef.current = isContinuousListening;
  }, [isContinuousListening]);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    voiceStateRef.current = voiceState;
  }, [voiceState]);

  // Scroll to bottom on message updates
  useEffect(() => {
    if (isOpen) {
      chatScrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isThinking, isOpen]);

  // Initialize TTS on mount
  useEffect(() => {
    ttsRef.current = new TextToSpeechClient();
    return () => {
      ttsRef.current?.stop();
      vadRef.current?.stop();
      sttRef.current?.stop();
    };
  }, []);

  // Send message to voice chat API
  const sendMessage = useCallback(
    async (text: string, isFromVoice = false) => {
      const cleanInput = text.trim();
      if (!cleanInput) return;

      const userMsg: MessageItem = {
        id: `user-${Date.now()}`,
        sender: "user",
        text: cleanInput,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInputText("");
      setLiveTranscript("");
      setVoiceState("thinking");
      setIsThinking(true);

      // Stop VAD while processing LLM
      vadRef.current?.stop();
      sttRef.current?.stop();

      const historyPayload = messages.slice(-8).map((m) => ({
        role: m.sender === "bot" ? ("assistant" as const) : ("user" as const),
        content: m.text,
      }));

      try {
        const res = await fetch("/api/voice/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: cleanInput,
            history: historyPayload,
            isVoiceMode: isFromVoice,
            conversationId: conversationIdRef.current,
          }),
        });

        const data = await res.json();
        const botResponseText =
          data.response ||
          "🙏 Main aapka prashna samajh gaya hoon. Kripya thoda aur spasht poochein.";
        const spokenText = data.spokenText || botResponseText;

        const botMsg: MessageItem = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: botResponseText,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          sources: data.sources || [],
          links: data.links || [],
          suggestedQuestions: data.sources?.[0]?.suggestedQuestions || [],
        };

        setMessages((prev) => [...prev, botMsg]);
        setIsThinking(false);

        // Speak aloud if not muted
        if (!isMutedRef.current) {
          setVoiceState("speaking");
          await ttsRef.current?.speak(spokenText, {
            onStart: () => {
              setVoiceState("speaking");
            },
            onEnded: () => {
              setVoiceState("idle");
              // Continuous Auto-Listening (Gemini style)
              if (isContinuousRef.current && isOpen) {
                setTimeout(() => {
                  startVoiceListening();
                }, 400);
              }
            },
            onError: () => {
              setVoiceState("idle");
            },
          });
        } else {
          setVoiceState("idle");
          if (isContinuousRef.current && isOpen) {
            setTimeout(() => {
              startVoiceListening();
            }, 400);
          }
        }
      } catch (err) {
        console.error("Voice Chat error:", err);
        setIsThinking(false);
        setVoiceState("error");
      }
    },
    [messages, isOpen]
  );

  // Activate continuous Voice Activity Detection + STT
  const startVoiceListening = useCallback(async () => {
    // Interruption / Barge-in: Stop any speaking audio immediately
    ttsRef.current?.stop();

    setVoiceState("requesting_permission");

    if (!vadRef.current) {
      vadRef.current = new VoiceActivityDetector({
        onSpeechStart: () => {
          // Barge-in: Stop AI speech instantly if user speaks
          ttsRef.current?.stop();
          setVoiceState("recording");
          setLiveTranscript("Aap bol rahe hain...");
        },
        onSpeechEnd: async (audioBlob: Blob) => {
          setVoiceState("transcribing");
          setLiveTranscript("Samajh raha hoon...");

          // 1. Try server-side Whisper transcription
          let transcript = "";
          if (sttRef.current) {
            transcript = await sttRef.current.transcribeBlob(audioBlob);
          }

          if (transcript) {
            sendMessage(transcript, true);
          } else {
            // Fallback: If no server transcript returned, return to listening
            setVoiceState("listening");
            setLiveTranscript("");
          }
        },
        onVolumeChange: (vol) => {
          setAudioLevel(vol);
        },
        onError: (err) => {
          console.warn("VAD error:", err);
          setVoiceState("error");
          setLiveTranscript(err);
        },
      });
    }

    if (!sttRef.current) {
      sttRef.current = new SpeechToTextClient({
        onResult: (text, isFinal) => {
          setLiveTranscript(text);
          if (isFinal) {
            sendMessage(text, true);
          }
        },
      });
    }

    const success = await vadRef.current.start();
    if (success) {
      setVoiceState("listening");
      setLiveTranscript("");
      // Also start browser speech recognition as fast parallel fallback
      if (sttRef.current.isSupported()) {
        sttRef.current.start();
      }
    }
  }, [sendMessage]);

  // Stop listening helper
  const stopVoiceListening = useCallback(() => {
    vadRef.current?.stop();
    sttRef.current?.stop();
    ttsRef.current?.stop();
    setVoiceState("idle");
    setLiveTranscript("");
    setAudioLevel(0);
  }, []);

  const toggleMic = () => {
    if (voiceState === "speaking") {
      // Barge-in / Interrupt AI speech
      ttsRef.current?.stop();
      startVoiceListening();
    } else if (
      voiceState === "listening" ||
      voiceState === "recording" ||
      voiceState === "requesting_permission"
    ) {
      stopVoiceListening();
    } else {
      startVoiceListening();
    }
  };

  const handleClearHistory = () => {
    ttsRef.current?.stop();
    vadRef.current?.stop();
    sttRef.current?.stop();
    setVoiceState("idle");
    setLiveTranscript("");
    setMessages([INITIAL_GREETING]);
    conversationIdRef.current = `conv-${Date.now()}`;
  };

  const handleSpeakSingleMessage = (text: string) => {
    setVoiceState("speaking");
    ttsRef.current?.speak(text, {
      onStart: () => setVoiceState("speaking"),
      onEnded: () => setVoiceState("idle"),
    });
  };

  return (
    <>
      {/* Floating Widget Launcher Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-[999]">
          <button
            onClick={() => {
              setIsOpen(true);
              setTimeout(() => startVoiceListening(), 400);
            }}
            className="group relative flex items-center gap-3 px-5 py-3.5 rounded-full bg-gradient-to-r from-[#5B1209] via-amber-800 to-[#5B1209] text-white shadow-2xl border border-amber-400/50 hover:scale-105 active:scale-95 transition-all duration-300"
            aria-label="Open Divine AI Voice Guide"
          >
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 opacity-40 blur-md group-hover:opacity-75 animate-pulse transition duration-500" />

            <div className="relative z-10 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 grid place-items-center shadow-inner animate-glow-pulse">
                <Sparkles size={16} />
              </span>
              <div className="text-left">
                <div className="text-xs font-extrabold tracking-wider uppercase text-amber-300">
                  Divine AI Guide
                </div>
                <div className="text-[11px] text-amber-100/90 font-medium">
                  Voice &amp; Knowledge Assistant
                </div>
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Main Modal & Conversation Window */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] bg-slate-950/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
          <div
            className="w-full sm:max-w-xl md:max-w-2xl h-[94vh] sm:h-[86vh] bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-amber-200/50 dark:border-slate-800 flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar Header */}
            <div className="px-5 py-3.5 bg-[#5B1209] text-white flex items-center justify-between border-b border-amber-500/30">
              <div className="flex items-center gap-3">
                <img
                  src={LOGO_URL}
                  alt="Science Divine"
                  className="h-8 w-auto object-contain brightness-125"
                />
                <div>
                  <h3 className="font-display text-sm md:text-base font-bold text-amber-200 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-amber-400" />
                    Divine AI Guide
                  </h3>
                  <p className="text-[11px] text-amber-100/80">
                    Gemini-Style Conversational Voice &amp; Knowledge
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearHistory}
                  className="p-1.5 text-amber-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                  title="Clear Chat History"
                >
                  <RefreshCw size={16} />
                </button>
                <button
                  onClick={() => {
                    stopVoiceListening();
                    setIsOpen(false);
                  }}
                  className="p-1.5 text-amber-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Voice Mode View (Divine Orb with Waveform Visualizer) */}
            <div className="p-4 bg-gradient-to-b from-amber-50/60 via-white to-transparent dark:from-slate-800/50 dark:to-transparent border-b border-amber-100/60 dark:border-slate-800 flex flex-col items-center justify-center shrink-0">
              <VoiceOrb
                state={voiceState}
                audioLevel={audioLevel}
                onClick={toggleMic}
                size="md"
              />

              <div className="mt-3 w-full max-w-sm">
                <VoiceControls
                  voiceState={voiceState}
                  isContinuousListening={isContinuousListening}
                  isMuted={isMuted}
                  liveTranscript={liveTranscript}
                  onToggleMic={toggleMic}
                  onToggleContinuous={() => setIsContinuousListening(!isContinuousListening)}
                  onToggleMute={() => {
                    const newMuted = !isMuted;
                    setIsMuted(newMuted);
                    if (newMuted) ttsRef.current?.stop();
                  }}
                  onToggleKeyboardMode={() => setShowKeyboardInput(!showKeyboardInput)}
                  showKeyboardInput={showKeyboardInput}
                />
              </div>
            </div>

            {/* Scrollable Conversation History */}
            <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-4">
              <ConversationMessages
                messages={messages}
                isThinking={isThinking}
                onSuggestionClick={(sug) => sendMessage(sug, false)}
                onSpeakMessage={handleSpeakSingleMessage}
              />
              <div ref={chatScrollRef} />
            </div>

            {/* Bottom Keyboard Text Input Area */}
            {showKeyboardInput && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(inputText, false);
                }}
                className="p-3 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex gap-2 items-center"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Guru Ji ke pravachan, courses ya meditation ke baare mein poochein..."
                  className="flex-1 min-w-0 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-amber-500 dark:text-white"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isThinking}
                  className="btn-gold rounded-full px-5 py-2 text-sm font-semibold inline-flex items-center gap-1 shrink-0 disabled:opacity-50"
                >
                  <span>Send</span>
                  <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
