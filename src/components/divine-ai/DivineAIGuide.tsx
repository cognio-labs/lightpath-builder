"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { VoiceOrb } from "./VoiceOrb";
import { VoiceControls } from "./VoiceControls";
import { ConversationMessages, MessageItem } from "./ConversationMessages";
import { VoiceState } from "@/lib/voice/types";
import { SpeechToTextClient } from "@/lib/voice/stt";
import { TextToSpeechClient } from "@/lib/voice/tts";
import { X, Send, Sparkles, MessageSquare, RefreshCw, Volume2, Shield } from "lucide-react";
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
  const [isVoiceOrbMode, setIsVoiceOrbMode] = useState(true);
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [isContinuousListening, setIsContinuousListening] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showKeyboardInput, setShowKeyboardInput] = useState(false);
  const [inputText, setInputText] = useState("");
  const [liveTranscript, setLiveTranscript] = useState("");
  const [messages, setMessages] = useState<MessageItem[]>([INITIAL_GREETING]);
  const [isThinking, setIsThinking] = useState(false);

  const sttRef = useRef<SpeechToTextClient | null>(null);
  const ttsRef = useRef<TextToSpeechClient | null>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const isContinuousRef = useRef(isContinuousListening);
  const isMutedRef = useRef(isMuted);

  useEffect(() => {
    isContinuousRef.current = isContinuousListening;
  }, [isContinuousListening]);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  // Scroll messages to bottom on update
  useEffect(() => {
    if (isOpen) {
      chatScrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isThinking, isOpen]);

  // Initialize TTS
  useEffect(() => {
    ttsRef.current = new TextToSpeechClient();
    return () => {
      ttsRef.current?.stop();
    };
  }, []);

  // Send message to API and receive knowledge-backed response
  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      const userMsg: MessageItem = {
        id: `user-${Date.now()}`,
        sender: "user",
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInputText("");
      setLiveTranscript("");
      setVoiceState("thinking");
      setIsThinking(true);

      // Prepare conversation history
      const historyPayload = messages.slice(-8).map((m) => ({
        role: m.sender === "bot" ? ("assistant" as const) : ("user" as const),
        content: m.text,
      }));

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, history: historyPayload }),
        });

        const data = await res.json();
        const botResponseText =
          data.response ||
          "🙏 Main aapka prashna samajh gaya hoon. Kripya thoda aur spasht poochein.";

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

        // Speak the response if not muted
        if (!isMutedRef.current) {
          setVoiceState("speaking");
          await ttsRef.current?.speak(botResponseText, {
            onStart: () => setVoiceState("speaking"),
            onEnded: () => {
              setVoiceState("idle");
              // Auto-Listening for continuous conversational voice flow
              if (isContinuousRef.current && sttRef.current?.isSupported()) {
                setTimeout(() => {
                  startListening();
                }, 400);
              }
            },
            onError: () => {
              setVoiceState("idle");
            },
          });
        } else {
          setVoiceState("idle");
        }
      } catch (err) {
        console.error("Chat error:", err);
        setIsThinking(false);
        setVoiceState("error");
      }
    },
    [messages]
  );

  // STT start helper
  const startListening = useCallback(() => {
    // Stop any ongoing TTS immediately (interruption support)
    ttsRef.current?.stop();

    if (!sttRef.current) {
      sttRef.current = new SpeechToTextClient({
        onStart: () => {
          setVoiceState("listening");
          setLiveTranscript("");
        },
        onResult: (transcript, isFinal) => {
          setLiveTranscript(transcript);
          if (isFinal) {
            setVoiceState("transcribing");
            sendMessage(transcript);
          }
        },
        onError: (err) => {
          console.warn("STT error:", err);
          setVoiceState("idle");
          setLiveTranscript("");
        },
        onEnd: () => {
          if (voiceState === "listening") {
            setVoiceState("idle");
          }
        },
      });
    }

    sttRef.current.start();
  }, [sendMessage, voiceState]);

  // STT stop helper
  const stopListening = useCallback(() => {
    sttRef.current?.stop();
    setVoiceState("idle");
    setLiveTranscript("");
  }, []);

  const toggleMic = () => {
    if (voiceState === "listening") {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleClearHistory = () => {
    ttsRef.current?.stop();
    sttRef.current?.stop();
    setVoiceState("idle");
    setMessages([INITIAL_GREETING]);
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
              // Start in voice listening mode on open
              setTimeout(() => startListening(), 400);
            }}
            className="group relative flex items-center gap-3 px-5 py-3.5 rounded-full bg-gradient-to-r from-[#5B1209] via-amber-800 to-[#5B1209] text-white shadow-2xl border border-amber-400/50 hover:scale-105 active:scale-95 transition-all duration-300"
            aria-label="Open Divine AI Guide"
          >
            {/* Glowing Aura */}
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
                  Talk with Guru Ji Wisdom
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
            className="w-full sm:max-w-xl md:max-w-2xl h-[92vh] sm:h-[85vh] bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-amber-200/50 dark:border-slate-800 flex flex-col overflow-hidden"
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
                    Official Science Divine Knowledge &amp; Voice Guide
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
                    ttsRef.current?.stop();
                    sttRef.current?.stop();
                    setVoiceState("idle");
                    setIsOpen(false);
                  }}
                  className="p-1.5 text-amber-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Voice Mode View (Divine Orb Top Section) */}
            <div className="p-4 bg-gradient-to-b from-amber-50/50 via-white to-transparent dark:from-slate-800/40 dark:to-transparent border-b border-amber-100/60 dark:border-slate-800 flex flex-col items-center justify-center shrink-0">
              <VoiceOrb state={voiceState} onClick={toggleMic} size="md" />

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

            {/* Scrollable Chat History List */}
            <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-4">
              <ConversationMessages
                messages={messages}
                isThinking={isThinking}
                onSuggestionClick={(sug) => sendMessage(sug)}
                onSpeakMessage={handleSpeakSingleMessage}
              />
              <div ref={chatScrollRef} />
            </div>

            {/* Bottom Keyboard Text Input Area */}
            {showKeyboardInput && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(inputText);
                }}
                className="p-3 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex gap-2 items-center"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Guru Ji ke pravachan, courses, ya meditation ke baare mein poochein..."
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
