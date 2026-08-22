"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { VoiceOrb } from "./VoiceOrb";
import { ConversationMessages, MessageItem } from "./ConversationMessages";
import { VoiceState, VOICE_STATE_LABELS } from "@/lib/voice/types";
import { SpeechToTextClient } from "@/lib/voice/stt";
import { TextToSpeechClient } from "@/lib/voice/tts";
import { sanitizeAIResponse } from "@/lib/ai/divine-system-prompt";
import {
  X,
  Send,
  RefreshCw,
  Mic,
  Volume2,
  VolumeX,
  ArrowLeft,
  AudioLines,
  PhoneOff,
} from "lucide-react";
import { LOGO_URL } from "@/data/content";

const INITIAL_GREETING: MessageItem = {
  id: "initial",
  sender: "bot",
  text: "Hey! Hari Om 🙏 Kaise hain aap? Aaj kis baare mein baat karna chahenge?",
  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  suggestedQuestions: [
    "Sakshi Shree kaun hain?",
    "Science Divine ke courses kaunse hain?",
    "Meditation ke baare mein batao",
    "Personal session kaise book karein?",
  ],
};

function isFillerOrEmpty(text: string): boolean {
  const trimmed = text.trim().toLowerCase();
  if (!trimmed || trimmed.length < 2) return true;
  const fillers = ["um", "hmm", "uh", "ah", "err", "hmmm", "uhh"];
  return fillers.includes(trimmed);
}

export function DivineAIGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMode, setActiveMode] = useState<"chat" | "voice">("chat");
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [inputText, setInputText] = useState("");
  const [liveTranscript, setLiveTranscript] = useState("");
  const [messages, setMessages] = useState<MessageItem[]>([INITIAL_GREETING]);
  const [isThinking, setIsThinking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  const sttRef = useRef<SpeechToTextClient | null>(null);
  const ttsRef = useRef<TextToSpeechClient | null>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const activeModeRef = useRef(activeMode);
  const isMutedRef = useRef(isMuted);
  const isRequestInProgressRef = useRef(false);

  useEffect(() => {
    activeModeRef.current = activeMode;
  }, [activeMode]);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  // Auto-scroll in chat mode
  useEffect(() => {
    if (isOpen && activeMode === "chat") {
      chatScrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isThinking, isOpen, activeMode]);

  // Initialize TTS
  useEffect(() => {
    ttsRef.current = new TextToSpeechClient();
    return () => {
      ttsRef.current?.stopSpeaking();
      sttRef.current?.stop();
    };
  }, []);

  // Send message to /api/divine-ai
  const sendMessage = useCallback(
    async (text: string, isFromVoice = false) => {
      const cleanInput = text.trim();
      if (!cleanInput || isFillerOrEmpty(cleanInput)) return;

      if (isRequestInProgressRef.current) {
        return;
      }

      isRequestInProgressRef.current = true;
      setPermissionError(null);

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

      sttRef.current?.stop();
      ttsRef.current?.stopSpeaking();

      const historyPayload = messages.slice(-6).map((m) => ({
        role: m.sender === "bot" ? ("assistant" as const) : ("user" as const),
        content: m.text,
      }));

      abortControllerRef.current = new AbortController();

      try {
        const res = await fetch("/api/divine-ai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...historyPayload, { role: "user", content: cleanInput }],
            mode: isFromVoice || activeModeRef.current === "voice" ? "voice" : "chat",
          }),
          signal: abortControllerRef.current.signal,
        });

        const data = await res.json();
        const rawAnswer = data.answer || data.response || "🙏 Hari Om! Kripya apna prashna punah poochhein.";
        const cleanAnswer = sanitizeAIResponse(rawAnswer);
        const spokenAnswer = data.spokenText || cleanAnswer;

        const botMsg: MessageItem = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: cleanAnswer,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          sources: data.sources || [],
          links: data.links || [],
          suggestedQuestions: data.sources?.[0]?.suggestedQuestions || [],
        };

        setMessages((prev) => [...prev, botMsg]);
        setIsThinking(false);
        isRequestInProgressRef.current = false;

        // 🌟 Voice Mode Auto-Speak Pipeline
        if (activeModeRef.current === "voice" && !isMutedRef.current) {
          setVoiceState("speaking");
          ttsRef.current?.speakText(spokenAnswer, {
            onStart: () => {
              setVoiceState("speaking");
            },
            onEnded: () => {
              if (activeModeRef.current === "voice") {
                setVoiceState("listening");
                setTimeout(() => {
                  startVoiceListening();
                }, 300);
              } else {
                setVoiceState("idle");
              }
            },
            onError: () => {
              if (activeModeRef.current === "voice") {
                startVoiceListening();
              } else {
                setVoiceState("idle");
              }
            },
          });
        } else {
          setVoiceState("idle");
          if (activeModeRef.current === "voice") {
            setTimeout(() => {
              startVoiceListening();
            }, 300);
          }
        }
      } catch (err: any) {
        isRequestInProgressRef.current = false;
        if (err.name === "AbortError") return;

        console.error("AI chat error:", err);
        setIsThinking(false);
        setVoiceState("error");

        const errorMsg: MessageItem = {
          id: `bot-err-${Date.now()}`,
          sender: "bot",
          text: "Sorry, abhi connection mein problem aa rahi hai. Please try again.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    },
    [messages]
  );

  // Start Speech-to-Text
  const startVoiceListening = useCallback(async () => {
    ttsRef.current?.stopSpeaking();
    ttsRef.current?.unlockAudio();
    setPermissionError(null);
    setVoiceState("listening");

    if (!sttRef.current) {
      sttRef.current = new SpeechToTextClient({
        onStart: () => {
          setVoiceState("listening");
          setLiveTranscript("");
        },
        onInterimResult: (interim) => {
          setLiveTranscript(interim);
        },
        onFinalResult: (final) => {
          setLiveTranscript(final);
          if (!isFillerOrEmpty(final)) {
            sendMessage(final, true);
          } else {
            setVoiceState("listening");
            setLiveTranscript("");
          }
        },
        onError: (err) => {
          if (err === "permission-denied" || err === "not-allowed") {
            setVoiceState("error");
            setPermissionError(
              "Microphone permission is required for voice conversations. Please allow microphone access in your browser settings and try again."
            );
          } else {
            setVoiceState("error");
          }
        },
        onEnd: () => {
          if (activeModeRef.current === "voice" && !isRequestInProgressRef.current && voiceState === "listening") {
            setTimeout(() => {
              if (activeModeRef.current === "voice" && !isRequestInProgressRef.current) {
                sttRef.current?.start();
              }
            }, 200);
          }
        },
      });
    }

    sttRef.current.start("hi-IN");
  }, [sendMessage, voiceState]);

  // Stop everything (Stop Button / Barge-In)
  const stopVoiceSession = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    isRequestInProgressRef.current = false;
    sttRef.current?.stop();
    ttsRef.current?.stopSpeaking();
    setVoiceState("idle");
    setLiveTranscript("");
    setIsThinking(false);
  }, []);

  // Switch to Voice Mode
  const handleOpenVoiceMode = () => {
    ttsRef.current?.unlockAudio();
    setActiveMode("voice");
    setTimeout(() => {
      startVoiceListening();
    }, 200);
  };

  // Switch to Chat Mode
  const handleOpenChatMode = () => {
    stopVoiceSession();
    setActiveMode("chat");
  };

  // Toggle Voice Orb (Tap to Interrupt or Speak)
  const handleToggleVoiceOrb = () => {
    if (voiceState === "speaking") {
      ttsRef.current?.stopSpeaking();
      startVoiceListening();
    } else if (voiceState === "listening" || voiceState === "thinking") {
      stopVoiceSession();
    } else {
      startVoiceListening();
    }
  };

  const handleClearHistory = () => {
    stopVoiceSession();
    setMessages([INITIAL_GREETING]);
  };

  const handleSpeakSingleMessage = (text: string) => {
    ttsRef.current?.stopSpeaking();
    ttsRef.current?.unlockAudio();
    setVoiceState("speaking");
    ttsRef.current?.speakText(text, {
      onStart: () => setVoiceState("speaking"),
      onEnded: () => setVoiceState("idle"),
    });
  };

  const stateLabel = VOICE_STATE_LABELS[voiceState] || VOICE_STATE_LABELS.idle;

  return (
    <>
      {/* ========================================================================= */}
      {/* 🌟 1. CLEAN CIRCULAR FLOATING ICON (Pure Science Divine Sun Logo Only) */}
      {/* ========================================================================= */}
      {!isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[999]">
          <button
            onClick={() => {
              ttsRef.current?.unlockAudio();
              setIsOpen(true);
              setActiveMode("chat");
            }}
            className="group relative w-13 h-13 sm:w-14 sm:h-14 min-w-[44px] min-h-[44px] rounded-full bg-white dark:bg-slate-900 shadow-2xl border-2 border-amber-400 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300"
            aria-label="Open Divine AI Guide"
            title="Divine AI Guide — Science Divine"
          >
            {/* Soft Luminous Outer Glow */}
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 opacity-40 blur-sm group-hover:opacity-80 animate-pulse transition duration-500 pointer-events-none" />

            {/* Official Science Divine Sun Logo */}
            <div className="relative z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden flex items-center justify-center p-0.5">
              <img
                src={LOGO_URL}
                alt="Science Divine"
                className="w-full h-full object-contain drop-shadow-sm"
              />
            </div>
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 📱 2. COMPACT RESPONSIVE POPUP WINDOW (Optimized for Mobile, Tablet, Laptop & Desktop) */}
      {/* ========================================================================= */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-5 sm:right-5 z-[9999] flex items-end sm:items-center justify-center pointer-events-none p-0 sm:p-0">
          <div
            className="w-full sm:w-[355px] md:w-[365px] h-[82vh] sm:h-[495px] max-h-[calc(100vh-60px)] bg-white dark:bg-slate-900 rounded-t-2xl sm:rounded-2xl shadow-2xl border border-amber-200/80 dark:border-slate-800 flex flex-col overflow-hidden pointer-events-auto transition-all animate-fade-in font-sans"
            onClick={(e) => e.stopPropagation()}
          >
            {/* TOP BAR HEADER */}
            <div className="px-3 py-2 bg-gradient-to-r from-[#5B1209] to-[#73190e] text-white flex items-center justify-between border-b border-amber-500/30 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white p-0.5 grid place-items-center overflow-hidden border border-amber-300 shadow-sm">
                  <img
                    src={LOGO_URL}
                    alt="Science Divine"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-[12.5px] font-bold text-amber-200 flex items-center gap-1 leading-tight">
                    Divine AI Guide
                  </h3>
                  <p className="text-[9px] text-amber-100/75">
                    Official Science Divine Assistant
                  </p>
                </div>
              </div>

              {/* Segmented Mode Selector & Controls */}
              <div className="flex items-center gap-1">
                <div className="bg-black/30 p-0.5 rounded-full flex items-center">
                  <button
                    onClick={handleOpenChatMode}
                    className={`px-2 py-0.5 rounded-full text-[10.5px] font-medium transition-all ${
                      activeMode === "chat"
                        ? "bg-amber-400 text-slate-950 font-bold shadow-sm"
                        : "text-amber-100/80 hover:text-white"
                    }`}
                  >
                    Chat
                  </button>
                  <button
                    onClick={handleOpenVoiceMode}
                    className={`px-2 py-0.5 rounded-full text-[10.5px] font-medium flex items-center gap-1 transition-all ${
                      activeMode === "voice"
                        ? "bg-gradient-to-r from-sky-400 to-cyan-400 text-slate-950 font-bold shadow-sm"
                        : "text-sky-300 hover:text-white"
                    }`}
                  >
                    <AudioLines size={10} />
                    <span>Voice</span>
                  </button>
                </div>

                <button
                  onClick={handleClearHistory}
                  className="p-1 text-amber-200 hover:text-white rounded-md hover:bg-white/10 transition-colors"
                  title="Clear Chat"
                >
                  <RefreshCw size={12} />
                </button>
                <button
                  onClick={() => {
                    stopVoiceSession();
                    setIsOpen(false);
                  }}
                  className="p-1 text-amber-200 hover:text-white rounded-md hover:bg-white/10 transition-colors"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* 💬 TAB 1: MODERN CHAT MODE */}
            {/* ========================================================================= */}
            {activeMode === "chat" && (
              <div className="flex-1 flex flex-col min-h-0 bg-slate-50/60 dark:bg-slate-950/60">
                {/* Scrollable Message List */}
                <div className="flex-1 overflow-y-auto p-2.5 space-y-2.5">
                  <ConversationMessages
                    messages={messages}
                    isThinking={isThinking}
                    onSuggestionClick={(sug) => sendMessage(sug, false)}
                    onSpeakMessage={handleSpeakSingleMessage}
                  />
                  <div ref={chatScrollRef} />
                </div>

                {/* Bottom Input Area with Sky Blue Voice Launcher */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage(inputText, false);
                  }}
                  className="p-2 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 flex items-center gap-1.5 shrink-0 shadow-md"
                >
                  {/* Sky Blue Voice Launcher */}
                  <button
                    type="button"
                    onClick={handleOpenVoiceMode}
                    className="p-2 min-w-[38px] min-h-[38px] rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 text-white hover:from-sky-600 hover:to-cyan-600 shadow-sm active:scale-90 transition-all shrink-0 flex items-center justify-center"
                    title="Switch to Voice Mode"
                  >
                    <AudioLines size={16} />
                  </button>

                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Poochiye Guru Ji ya courses ke baare mein..."
                    className="flex-1 min-w-0 bg-slate-100/80 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-3 py-1.5 text-[11.5px] focus:outline-none focus:border-amber-500 dark:text-white"
                  />

                  <button
                    type="submit"
                    disabled={!inputText.trim() || isThinking}
                    className="p-2 min-w-[38px] min-h-[38px] rounded-full bg-[#5B1209] hover:bg-amber-900 text-white disabled:opacity-40 transition-colors shrink-0 shadow-sm flex items-center justify-center"
                    aria-label="Send Message"
                  >
                    <Send size={13} />
                  </button>
                </form>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 🎙️ TAB 2: IMMERSIVE FULL VOICE SCREEN (100% Automatic Hands-Free) */}
            {/* ========================================================================= */}
            {activeMode === "voice" && (
              <div className="flex-1 flex flex-col justify-between items-center p-4 bg-gradient-to-b from-amber-50/70 via-white to-sky-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
                {/* Header Back Button */}
                <div className="w-full flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <button
                    onClick={handleOpenChatMode}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 text-slate-700 dark:text-slate-200 font-medium text-[10.5px] transition-colors"
                  >
                    <ArrowLeft size={12} />
                    <span>Back to Chat</span>
                  </button>
                  <span className="flex items-center gap-1 text-sky-600 dark:text-sky-400 font-semibold text-[10.5px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping" />
                    Hands-Free Voice AI
                  </span>
                </div>

                {/* Center Glowing Sacred Orb (Tap to interrupt/speak) */}
                <div className="flex flex-col items-center justify-center my-auto py-2">
                  <VoiceOrb
                    state={voiceState}
                    onClick={handleToggleVoiceOrb}
                    size="md"
                  />

                  {/* Status & Live Transcript */}
                  <div className="mt-3 text-center max-w-[270px]">
                    {permissionError ? (
                      <p className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 p-2 rounded-xl border border-rose-200 dark:border-rose-900">
                        {permissionError}
                      </p>
                    ) : liveTranscript ? (
                      <p className="text-[11.5px] font-semibold text-sky-700 dark:text-sky-300 animate-pulse bg-sky-100/70 dark:bg-sky-950/70 px-3 py-1 rounded-full border border-sky-300/40">
                        🎙️ &quot;{liveTranscript}&quot;
                      </p>
                    ) : (
                      <div className="space-y-0.5">
                        <p className="text-[13px] font-bold text-slate-800 dark:text-slate-100">
                          {stateLabel.hi}
                        </p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">
                          {stateLabel.en}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Minimalist Controls */}
                <div className="w-full flex flex-col items-center gap-2">
                  <div className="flex items-center justify-center gap-5">
                    {/* Mute Voice Audio Toggle */}
                    <button
                      onClick={() => {
                        const newMuted = !isMuted;
                        setIsMuted(newMuted);
                        if (newMuted) ttsRef.current?.stopSpeaking();
                      }}
                      className={`p-2.5 rounded-full shadow-sm transition-all flex items-center justify-center ${
                        isMuted
                          ? "bg-red-500 text-white"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                      }`}
                      title={isMuted ? "Unmute Voice" : "Mute Voice"}
                      aria-label="Mute / Unmute Voice"
                    >
                      {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
                    </button>

                    {/* Microphone Action (Tap to speak if stopped) */}
                    <button
                      onClick={handleToggleVoiceOrb}
                      className={`p-3.5 rounded-full shadow-lg transition-all flex items-center justify-center ${
                        voiceState === "speaking"
                          ? "bg-amber-500 text-white shadow-amber-500/40"
                          : voiceState === "listening"
                          ? "bg-red-500 text-white shadow-red-500/50 animate-pulse"
                          : "bg-gradient-to-r from-sky-500 via-cyan-500 to-sky-600 text-white shadow-sky-500/40"
                      }`}
                      title={voiceState === "speaking" ? "Stop Speaking" : "Start Listening"}
                      aria-label="Voice Action"
                    >
                      <Mic size={20} />
                    </button>

                    {/* End Call / Return to Chat */}
                    <button
                      onClick={handleOpenChatMode}
                      className="p-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
                      title="End Voice Mode"
                      aria-label="End Voice Mode"
                    >
                      <PhoneOff size={17} />
                    </button>
                  </div>

                  <p className="text-[9.5px] text-slate-400 text-center">
                    Aap naturally bolte rahein — AI automatic sunega aur bol kar uttar dega.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
