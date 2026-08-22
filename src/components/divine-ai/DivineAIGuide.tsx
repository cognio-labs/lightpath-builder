"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { VoiceOrb } from "./VoiceOrb";
import { ConversationMessages, MessageItem } from "./ConversationMessages";
import { VoiceState, VOICE_STATE_LABELS } from "@/lib/voice/types";
import { VoiceActivityDetector } from "@/lib/voice/vad";
import { SpeechToTextClient } from "@/lib/voice/stt";
import { TextToSpeechClient } from "@/lib/voice/tts";
import {
  X,
  Send,
  Sparkles,
  RefreshCw,
  MessageSquare,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Radio,
  StopCircle,
  Headphones,
  ArrowLeft,
  AudioLines,
} from "lucide-react";
import { LOGO_URL } from "@/data/content";

const INITIAL_GREETING: MessageItem = {
  id: "initial",
  sender: "bot",
  text: "🙏 **Hari Om & Namaste!** Main aapka **Divine AI Guide** hoon.\n\nAap Sakshi Shree, Science Divine Movement, courses, meditation techniques, ya personal session ke baare mein pooch sakte hain.",
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
  const [activeMode, setActiveMode] = useState<"chat" | "voice">("chat");
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [audioLevel, setAudioLevel] = useState(0);
  const [isContinuousListening, setIsContinuousListening] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
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
  const activeModeRef = useRef(activeMode);

  useEffect(() => {
    isContinuousRef.current = isContinuousListening;
  }, [isContinuousListening]);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    activeModeRef.current = activeMode;
  }, [activeMode]);

  // Scroll to bottom when messages update in chat mode
  useEffect(() => {
    if (isOpen && activeMode === "chat") {
      chatScrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isThinking, isOpen, activeMode]);

  // Initialize TTS
  useEffect(() => {
    ttsRef.current = new TextToSpeechClient();
    return () => {
      ttsRef.current?.stop();
      vadRef.current?.stop();
      sttRef.current?.stop();
    };
  }, []);

  // Send message to API
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

      // Stop VAD while fetching response
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
            isVoiceMode: isFromVoice || activeModeRef.current === "voice",
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

        // Speak aloud if voice mode or not muted
        if (activeModeRef.current === "voice" && !isMutedRef.current) {
          setVoiceState("speaking");
          await ttsRef.current?.speak(spokenText, {
            onStart: () => {
              setVoiceState("speaking");
            },
            onEnded: () => {
              setVoiceState("idle");
              if (isContinuousRef.current && activeModeRef.current === "voice") {
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
          if (activeModeRef.current === "voice" && isContinuousRef.current) {
            setTimeout(() => {
              startVoiceListening();
            }, 400);
          }
        }
      } catch (err) {
        console.error("Chat error:", err);
        setIsThinking(false);
        setVoiceState("error");
      }
    },
    [messages]
  );

  // Activate continuous Voice Activity Detection + STT
  const startVoiceListening = useCallback(async () => {
    ttsRef.current?.stop();
    setVoiceState("requesting_permission");

    if (!vadRef.current) {
      vadRef.current = new VoiceActivityDetector({
        onSpeechStart: () => {
          ttsRef.current?.stop();
          setVoiceState("recording");
          setLiveTranscript("Aap bol rahe hain...");
        },
        onSpeechEnd: async (audioBlob: Blob) => {
          setVoiceState("transcribing");
          setLiveTranscript("Samajh raha hoon...");

          let transcript = "";
          if (sttRef.current) {
            transcript = await sttRef.current.transcribeBlob(audioBlob);
          }

          if (transcript) {
            sendMessage(transcript, true);
          } else {
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
      if (sttRef.current.isSupported()) {
        sttRef.current.start();
      }
    }
  }, [sendMessage]);

  // Stop listening
  const stopVoiceListening = useCallback(() => {
    vadRef.current?.stop();
    sttRef.current?.stop();
    ttsRef.current?.stop();
    setVoiceState("idle");
    setLiveTranscript("");
    setAudioLevel(0);
  }, []);

  // Switch to Voice Mode
  const handleOpenVoiceMode = () => {
    setActiveMode("voice");
    setTimeout(() => {
      startVoiceListening();
    }, 300);
  };

  // Switch to Chat Mode
  const handleOpenChatMode = () => {
    stopVoiceListening();
    setActiveMode("chat");
  };

  const toggleMicInVoiceMode = () => {
    if (voiceState === "speaking") {
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
    ttsRef.current?.stop();
    setVoiceState("speaking");
    ttsRef.current?.speak(text, {
      onStart: () => setVoiceState("speaking"),
      onEnded: () => setVoiceState("idle"),
    });
  };

  const stateLabel = VOICE_STATE_LABELS[voiceState] || VOICE_STATE_LABELS.idle;

  return (
    <>
      {/* 1. FLOATING LAUNCHER BUTTON (With Science Divine Logo + Sky Blue Voice Button) */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-[999] flex items-center gap-2">
          {/* Direct Quick Voice Mode Button (ChatGPT Style Sky Blue) */}
          <button
            onClick={() => {
              setIsOpen(true);
              handleOpenVoiceMode();
            }}
            className="group relative p-3 rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-sky-600 text-white shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border border-sky-300/40"
            title="Open Real-time Voice Mode"
            aria-label="Open Voice Mode"
          >
            <span className="absolute -inset-1 rounded-full bg-sky-400 opacity-40 blur-md group-hover:opacity-80 animate-pulse" />
            <AudioLines size={20} className="relative z-10 animate-pulse" />
          </button>

          {/* Main Divine AI Guide Pill Button (With Official Science Divine Logo) */}
          <button
            onClick={() => {
              setIsOpen(true);
              setActiveMode("chat");
            }}
            className="group relative flex items-center gap-3 pl-2.5 pr-4 py-2 rounded-full bg-gradient-to-r from-[#5B1209] via-amber-900 to-[#5B1209] text-white shadow-2xl border border-amber-400/50 hover:scale-105 active:scale-95 transition-all duration-300"
            aria-label="Open Divine AI Guide"
          >
            <span className="absolute -inset-1 rounded-full bg-amber-400 opacity-30 blur-md group-hover:opacity-75 transition duration-500" />

            <div className="relative z-10 flex items-center gap-2.5">
              {/* Official Science Divine Sun Logo */}
              <div className="w-8 h-8 rounded-full bg-white/95 p-1 flex items-center justify-center shadow-inner overflow-hidden border border-amber-300">
                <img
                  src={LOGO_URL}
                  alt="Science Divine Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="text-left">
                <div className="text-xs font-bold tracking-wide uppercase text-amber-300 flex items-center gap-1">
                  <span>Divine AI</span>
                  <Sparkles size={11} className="text-yellow-400" />
                </div>
                <div className="text-[10px] text-amber-100/80 font-medium leading-none">
                  Chat &amp; Voice Guide
                </div>
              </div>
            </div>
          </button>
        </div>
      )}

      {/* 2. MAIN PHONE-SIZED POPUP WINDOW (Compact Mobile Form Factor) */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-[9999] flex items-end sm:items-center justify-center pointer-events-none">
          <div
            className="w-full sm:w-[400px] h-[92vh] sm:h-[600px] max-h-[92vh] bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-amber-200/60 dark:border-slate-800 flex flex-col overflow-hidden pointer-events-auto transition-all animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* TOP BAR HEADER */}
            <div className="px-4 py-3 bg-[#5B1209] text-white flex items-center justify-between border-b border-amber-500/30 shrink-0">
              <div className="flex items-center gap-2.5">
                {/* Science Divine Logo */}
                <div className="w-7 h-7 rounded-full bg-white/95 p-0.5 grid place-items-center overflow-hidden border border-amber-300">
                  <img
                    src={LOGO_URL}
                    alt="Science Divine"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-amber-200 flex items-center gap-1 leading-tight">
                    Divine AI Guide
                  </h3>
                  <p className="text-[10px] text-amber-100/75">
                    Guru Ji Wisdom &amp; Voice Assistant
                  </p>
                </div>
              </div>

              {/* Mode Switch Tabs + Action Buttons */}
              <div className="flex items-center gap-1.5">
                {/* Mode Selector Tabs (Chat / Voice) */}
                <div className="bg-black/25 p-0.5 rounded-full flex items-center text-xs">
                  <button
                    onClick={handleOpenChatMode}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                      activeMode === "chat"
                        ? "bg-amber-400 text-slate-950 font-bold shadow-sm"
                        : "text-amber-100/80 hover:text-white"
                    }`}
                  >
                    Chat
                  </button>
                  <button
                    onClick={handleOpenVoiceMode}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-medium flex items-center gap-1 transition-all ${
                      activeMode === "voice"
                        ? "bg-gradient-to-r from-sky-400 to-cyan-400 text-slate-950 font-bold shadow-sm"
                        : "text-sky-300 hover:text-white"
                    }`}
                  >
                    <AudioLines size={11} />
                    <span>Voice</span>
                  </button>
                </div>

                <button
                  onClick={handleClearHistory}
                  className="p-1 text-amber-200 hover:text-white rounded-md hover:bg-white/10 transition-colors"
                  title="Clear Chat"
                >
                  <RefreshCw size={14} />
                </button>
                <button
                  onClick={() => {
                    stopVoiceListening();
                    setIsOpen(false);
                  }}
                  className="p-1 text-amber-200 hover:text-white rounded-md hover:bg-white/10 transition-colors"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* 📱 TAB 1: CHAT MODE (ChatGPT / Gemini Text Style) */}
            {/* ========================================================================= */}
            {activeMode === "chat" && (
              <div className="flex-1 flex flex-col min-h-0 bg-slate-50/50 dark:bg-slate-950/50">
                {/* Message Stream */}
                <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5">
                  <ConversationMessages
                    messages={messages}
                    isThinking={isThinking}
                    onSuggestionClick={(sug) => sendMessage(sug, false)}
                    onSpeakMessage={handleSpeakSingleMessage}
                  />
                  <div ref={chatScrollRef} />
                </div>

                {/* Bottom Input Area with Sky Blue Voice Button */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage(inputText, false);
                  }}
                  className="p-2.5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 shrink-0"
                >
                  {/* Sky Blue ChatGPT-Style Voice Mode Launcher Button */}
                  <button
                    type="button"
                    onClick={handleOpenVoiceMode}
                    className="p-2 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 text-white hover:from-sky-600 hover:to-cyan-600 shadow-md shadow-sky-500/20 active:scale-95 transition-all shrink-0"
                    title="Switch to Real-Time Voice Mode"
                  >
                    <AudioLines size={16} />
                  </button>

                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Poochiye Guru Ji ya Science Divine ke baare mein..."
                    className="flex-1 min-w-0 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-full px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500 dark:text-white"
                  />

                  <button
                    type="submit"
                    disabled={!inputText.trim() || isThinking}
                    className="p-2 rounded-full bg-[#5B1209] hover:bg-amber-900 text-white disabled:opacity-40 transition-colors shrink-0"
                    aria-label="Send Message"
                  >
                    <Send size={15} />
                  </button>
                </form>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 🎙️ TAB 2: VOICE MODE (Gemini / Kimi / ChatGPT Live Voice Screen) */}
            {/* ========================================================================= */}
            {activeMode === "voice" && (
              <div className="flex-1 flex flex-col justify-between items-center p-6 bg-gradient-to-b from-amber-50/70 via-white to-sky-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
                {/* Back to Chat header bar */}
                <div className="w-full flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <button
                    onClick={handleOpenChatMode}
                    className="flex items-center gap-1 hover:text-amber-700 dark:hover:text-amber-300 font-medium"
                  >
                    <ArrowLeft size={14} />
                    <span>Back to Chat</span>
                  </button>
                  <span className="flex items-center gap-1 text-sky-600 dark:text-sky-400 font-semibold text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
                    Live Voice
                  </span>
                </div>

                {/* Center Animated Glowing Divine Orb */}
                <div className="flex flex-col items-center justify-center my-auto">
                  <VoiceOrb
                    state={voiceState}
                    audioLevel={audioLevel}
                    onClick={toggleMicInVoiceMode}
                    size="lg"
                  />

                  {/* Status Text & Live Transcription */}
                  <div className="mt-4 text-center max-w-[280px]">
                    {liveTranscript ? (
                      <p className="text-xs font-semibold text-sky-700 dark:text-sky-300 animate-pulse">
                        🎙️ &quot;{liveTranscript}&quot;
                      </p>
                    ) : (
                      <div>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                          {stateLabel.hi}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {stateLabel.en}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Voice Controls */}
                <div className="w-full flex flex-col items-center gap-3">
                  <div className="flex items-center justify-center gap-4">
                    {/* Auto Voice Continuous Mode Toggle */}
                    <button
                      onClick={() => setIsContinuousListening(!isContinuousListening)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all ${
                        isContinuousListening
                          ? "bg-amber-600 text-white shadow-sm"
                          : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      }`}
                      title="Continuous Auto-Listening"
                    >
                      <Radio size={11} className={isContinuousListening ? "animate-pulse" : ""} />
                      <span>Auto Voice</span>
                    </button>

                    {/* Central Mic / Interrupt Button (Sky Blue / Red) */}
                    <button
                      onClick={toggleMicInVoiceMode}
                      className={`p-4 rounded-full shadow-xl transition-all transform hover:scale-110 active:scale-95 ${
                        voiceState === "speaking"
                          ? "bg-amber-500 text-white shadow-amber-500/40"
                          : voiceState === "listening" || voiceState === "recording"
                          ? "bg-red-500 text-white shadow-red-500/50 animate-pulse"
                          : "bg-gradient-to-r from-sky-500 via-cyan-500 to-sky-600 text-white shadow-sky-500/40"
                      }`}
                      aria-label="Toggle Mic / Interrupt"
                    >
                      {voiceState === "speaking" ? (
                        <StopCircle size={22} />
                      ) : voiceState === "listening" || voiceState === "recording" ? (
                        <MicOff size={22} />
                      ) : (
                        <Mic size={22} />
                      )}
                    </button>

                    {/* Mute Voice Toggle */}
                    <button
                      onClick={() => {
                        const newMuted = !isMuted;
                        setIsMuted(newMuted);
                        if (newMuted) ttsRef.current?.stop();
                      }}
                      className={`p-2.5 rounded-full text-xs transition-colors ${
                        isMuted
                          ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                          : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300"
                      }`}
                      title={isMuted ? "Unmute AI Voice" : "Mute AI Voice"}
                    >
                      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                  </div>

                  <p className="text-[10px] text-slate-400 text-center">
                    Bolo aur suno — AI beech mein bolne par turant chup ho jayega (Barge-in).
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
