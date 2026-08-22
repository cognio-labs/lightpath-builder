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
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Radio,
  StopCircle,
  ArrowLeft,
  AudioLines,
} from "lucide-react";
import { LOGO_URL } from "@/data/content";

const INITIAL_GREETING: MessageItem = {
  id: "initial",
  sender: "bot",
  text: "🙏 **Hari Om & Namaste!** Main aapka **Divine AI Guide** hoon.\n\nAap Sakshi Shree, Science Divine Movement, Sound Body, Sound Mind, courses, ya personal session ke baare mein pooch sakte hain.",
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

        // Speak response if in Voice mode or unmuted
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
      {/* ========================================================================= */}
      {/* 🌟 1. CLEAN CIRCULAR FLOATING ICON (Only Official Science Divine Logo) */}
      {/* ========================================================================= */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-[999]">
          <button
            onClick={() => {
              setIsOpen(true);
              setActiveMode("chat");
            }}
            className="group relative w-14 h-14 rounded-full bg-white dark:bg-slate-900 shadow-2xl border-2 border-amber-400 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300"
            aria-label="Open Divine AI Guide"
            title="Divine AI Guide — Science Divine"
          >
            {/* Luminous Pulsing Outer Halo */}
            <span className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 opacity-40 blur-md group-hover:opacity-80 animate-pulse transition duration-500 pointer-events-none" />

            {/* Official Science Divine Sun Logo */}
            <div className="relative z-10 w-10 h-10 rounded-full overflow-hidden flex items-center justify-center p-0.5">
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
      {/* 📱 2. COMPACT PHONE-SIZED POPUP WINDOW */}
      {/* ========================================================================= */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-[9999] flex items-end sm:items-center justify-center pointer-events-none">
          <div
            className="w-full sm:w-[385px] h-[90vh] sm:h-[580px] max-h-[90vh] bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-amber-200/70 dark:border-slate-800 flex flex-col overflow-hidden pointer-events-auto transition-all animate-fade-in font-sans"
            onClick={(e) => e.stopPropagation()}
          >
            {/* TOP BAR HEADER */}
            <div className="px-3.5 py-2.5 bg-gradient-to-r from-[#5B1209] to-[#73190e] text-white flex items-center justify-between border-b border-amber-500/30 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white p-0.5 grid place-items-center overflow-hidden border border-amber-300 shadow-sm">
                  <img
                    src={LOGO_URL}
                    alt="Science Divine"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-[13px] font-bold text-amber-200 flex items-center gap-1 leading-tight">
                    Divine AI Guide
                  </h3>
                  <p className="text-[9.5px] text-amber-100/75">
                    Official Science Divine Assistant
                  </p>
                </div>
              </div>

              {/* Segmented Mode Selector & Controls */}
              <div className="flex items-center gap-1.5">
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
                  <RefreshCw size={13} />
                </button>
                <button
                  onClick={() => {
                    stopVoiceListening();
                    setIsOpen(false);
                  }}
                  className="p-1 text-amber-200 hover:text-white rounded-md hover:bg-white/10 transition-colors"
                  aria-label="Close"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* 💬 TAB 1: MODERN CHAT MODE */}
            {/* ========================================================================= */}
            {activeMode === "chat" && (
              <div className="flex-1 flex flex-col min-h-0 bg-slate-50/60 dark:bg-slate-950/60">
                {/* Scrollable Message List */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
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
                  className="p-2.5 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 flex items-center gap-2 shrink-0 shadow-lg"
                >
                  {/* Sky Blue ChatGPT-Style Voice Mic Trigger */}
                  <button
                    type="button"
                    onClick={handleOpenVoiceMode}
                    className="p-2 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 text-white hover:from-sky-600 hover:to-cyan-600 shadow-md shadow-sky-500/25 active:scale-90 transition-all shrink-0"
                    title="Switch to Real-Time Voice Mode"
                  >
                    <AudioLines size={16} />
                  </button>

                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Poochiye Guru Ji ya courses ke baare mein..."
                    className="flex-1 min-w-0 bg-slate-100/80 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-3.5 py-1.5 text-[12px] focus:outline-none focus:border-amber-500 dark:text-white"
                  />

                  <button
                    type="submit"
                    disabled={!inputText.trim() || isThinking}
                    className="p-2 rounded-full bg-[#5B1209] hover:bg-amber-900 text-white disabled:opacity-40 transition-colors shrink-0 shadow-sm"
                    aria-label="Send Message"
                  >
                    <Send size={14} />
                  </button>
                </form>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 🎙️ TAB 2: IMMERSIVE FULL VOICE SCREEN */}
            {/* ========================================================================= */}
            {activeMode === "voice" && (
              <div className="flex-1 flex flex-col justify-between items-center p-5 bg-gradient-to-b from-amber-50/70 via-white to-sky-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
                {/* Back to Chat button */}
                <div className="w-full flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <button
                    onClick={handleOpenChatMode}
                    className="flex items-center gap-1 hover:text-amber-800 dark:hover:text-amber-300 font-medium text-[11px]"
                  >
                    <ArrowLeft size={13} />
                    <span>Chat par wapas</span>
                  </button>
                  <span className="flex items-center gap-1 text-sky-600 dark:text-sky-400 font-semibold text-[10.5px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping" />
                    Live Voice Mode
                  </span>
                </div>

                {/* Center Glowing Sacred Orb */}
                <div className="flex flex-col items-center justify-center my-auto">
                  <VoiceOrb
                    state={voiceState}
                    audioLevel={audioLevel}
                    onClick={toggleMicInVoiceMode}
                    size="lg"
                  />

                  {/* Status & Live Transcript */}
                  <div className="mt-3.5 text-center max-w-[260px]">
                    {liveTranscript ? (
                      <p className="text-xs font-semibold text-sky-700 dark:text-sky-300 animate-pulse">
                        🎙️ &quot;{liveTranscript}&quot;
                      </p>
                    ) : (
                      <div>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                          {stateLabel.hi}
                        </p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {stateLabel.en}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Voice Controls */}
                <div className="w-full flex flex-col items-center gap-2.5">
                  <div className="flex items-center justify-center gap-4">
                    {/* Auto Voice Continuous Listening Toggle */}
                    <button
                      onClick={() => setIsContinuousListening(!isContinuousListening)}
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-semibold transition-all ${
                        isContinuousListening
                          ? "bg-amber-600 text-white shadow-sm"
                          : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      }`}
                      title="Auto Voice"
                    >
                      <Radio size={10} className={isContinuousListening ? "animate-pulse" : ""} />
                      <span>Auto Voice</span>
                    </button>

                    {/* Central Sky Blue / Red Voice Action Button */}
                    <button
                      onClick={toggleMicInVoiceMode}
                      className={`p-3.5 rounded-full shadow-xl transition-all transform hover:scale-110 active:scale-95 ${
                        voiceState === "speaking"
                          ? "bg-amber-500 text-white shadow-amber-500/40"
                          : voiceState === "listening" || voiceState === "recording"
                          ? "bg-red-500 text-white shadow-red-500/50 animate-pulse"
                          : "bg-gradient-to-r from-sky-500 via-cyan-500 to-sky-600 text-white shadow-sky-500/40"
                      }`}
                      aria-label="Toggle Mic / Stop"
                    >
                      {voiceState === "speaking" ? (
                        <StopCircle size={20} />
                      ) : voiceState === "listening" || voiceState === "recording" ? (
                        <MicOff size={20} />
                      ) : (
                        <Mic size={20} />
                      )}
                    </button>

                    {/* Mute Voice Button */}
                    <button
                      onClick={() => {
                        const newMuted = !isMuted;
                        setIsMuted(newMuted);
                        if (newMuted) ttsRef.current?.stop();
                      }}
                      className={`p-2 rounded-full text-xs transition-colors ${
                        isMuted
                          ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                          : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300"
                      }`}
                      title={isMuted ? "Unmute Voice" : "Mute Voice"}
                    >
                      {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                    </button>
                  </div>

                  <p className="text-[9.5px] text-slate-400 text-center">
                    Bolo aur suno — AI beech mein bolne par turant chup ho jayega.
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
