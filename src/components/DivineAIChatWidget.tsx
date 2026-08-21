import { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  X,
  Send,
  RefreshCw,
  ExternalLink,
  User,
  Mic,
  MicOff,
  Volume2,
  Radio,
  Sparkles,
  MessageSquare
} from "lucide-react";
import { QUICK_SUGGESTIONS, generateBotResponse, BotResponse, addToHistory, clearHistory } from "@/data/aiKnowledgeBase";
import { LOGO_URL } from "@/data/content";

export const ELEVENLABS_VOICE_ID = "gHu9GtaHOXcSqFTK06ux";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  links?: { label: string; url: string }[];
  suggestions?: string[];
  timestamp: string;
}

export function DivineAIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // ChatGPT Voice Mode State
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState<"idle" | "listening" | "thinking" | "speaking">("idle");
  const [liveTranscript, setLiveTranscript] = useState("");
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const isVoiceModeRef = useRef(false);
  const voiceStatusRef = useRef<"idle" | "listening" | "thinking" | "speaking">("idle");
  const isRecognitionRunningRef = useRef(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial",
      sender: "bot",
      text: "🙏 **Hari Om & Namaste!** Main hoon aapka **Divine AI Guide** — Science Divine Foundation ka.\n\nSakshi Shree Guru Ji, courses, meditation, ya session booking — kuch bhi poochein!",
      links: [
        { label: "Courses", url: "/courses" },
        { label: "Book Session", url: "/book-session" },
      ],
      suggestions: [
        "Guru Ji ke baare mein batao",
        "Courses dekhein",
        "English Book link",
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !isVoiceMode) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen, isVoiceMode]);

  useEffect(() => {
    isVoiceModeRef.current = isVoiceMode;
  }, [isVoiceMode]);

  useEffect(() => {
    voiceStatusRef.current = voiceStatus;
  }, [voiceStatus]);

  // Initialize Web Speech Recognition once. Chrome/Edge support this best.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "hi-IN";

      recognition.onstart = () => {
        isRecognitionRunningRef.current = true;
        setVoiceStatus("listening");
        setLiveTranscript("Sun raha hoon...");
      };

      recognition.onresult = (event: any) => {
        let interim = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }

        const currentText = finalTranscript || interim;
        if (currentText) {
          setLiveTranscript(`"${currentText}"`);
        }

        if (finalTranscript) {
          const spokenText = finalTranscript.trim();
          setLiveTranscript(`"${spokenText}"`);
          if (spokenText) {
            try {
              recognition.stop();
            } catch (err) {
              console.warn("Recognition stop after result issue:", err);
            }
            handleSend(spokenText, true);
          }
        }
      };

      recognition.onerror = (e: any) => {
        console.warn("Voice recognition error:", e);
        isRecognitionRunningRef.current = false;
        if (isVoiceModeRef.current) {
          const message =
            e?.error === "not-allowed"
              ? "Mic permission allow kijiye."
              : e?.error === "no-speech"
              ? "Awaaz clear nahi aayi. Dobara mic dabayein."
              : "Mic dabayein aur boliye.";
          setVoiceStatus("idle");
          setLiveTranscript(message);
        }
      };

      recognition.onend = () => {
        isRecognitionRunningRef.current = false;
        if (isVoiceModeRef.current && voiceStatusRef.current === "listening") {
          setVoiceStatus("idle");
        }
      };

      recognitionRef.current = recognition;
    } else {
      setLiveTranscript("Voice input is browser mein supported nahi hai. Chrome/Edge use karein.");
    }
  }, []);

  // Clean TTS function (ElevenLabs with Web Speech fallback)
  const speakText = async (text: string, msgId?: string, continueListeningInVoiceMode = false) => {
    stopCurrentAudio();

    if (speakingMsgId === msgId && !isVoiceMode) {
      setSpeakingMsgId(null);
      return;
    }

    setVoiceStatus("speaking");
    if (msgId) setSpeakingMsgId(msgId);

    const clean = text
      .replace(/\*\*/g, "")
      .replace(/[#_`~]/g, "")
      .replace(/- /g, ", ")
      .replace(/🙏|✨|🌸|🌿|🤝|📅|🌟|💡|🧘|📚|🔴/g, "");
    setLiveTranscript("Bol raha hoon...");

    const apiKey = (import.meta as any).env?.VITE_ELEVENLABS_API_KEY;

    // 1. Try ElevenLabs API if key exists
    if (apiKey) {
      try {
        const response = await fetch(
          `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "xi-api-key": apiKey,
            },
            body: JSON.stringify({
              text: clean,
              model_id: "eleven_multilingual_v2",
              voice_settings: {
                stability: 0.5,
                similarity_boost: 0.8,
              },
            }),
          }
        );

        if (response.ok) {
          const audioBlob = await response.blob();
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          currentAudioRef.current = audio;

          audio.onended = () => {
            setSpeakingMsgId(null);
            setVoiceStatus("idle");
            setLiveTranscript("Bolein, main sun raha hoon...");
            URL.revokeObjectURL(audioUrl);
            if (continueListeningInVoiceMode && isVoiceModeRef.current) {
              startListening();
            }
          };

          audio.onerror = () => {
            setSpeakingMsgId(null);
            setVoiceStatus("idle");
            setLiveTranscript("Voice play nahi ho payi. Text response dekh sakte hain.");
          };

          await audio.play();
          return;
        }
      } catch (err) {
        console.warn("ElevenLabs TTS fallback:", err);
      }
    }

    // 2. Native Web Speech API fallback
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(clean);
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice =
        voices.find((voice) => /hi-IN/i.test(voice.lang)) ||
        voices.find((voice) => /en-IN/i.test(voice.lang)) ||
        voices.find((voice) => /Google|Microsoft|Natural|Heera|Kalpana|Neerja/i.test(voice.name));

      if (preferredVoice) {
        utterance.voice = preferredVoice;
        utterance.lang = preferredVoice.lang;
      } else {
        utterance.lang = "hi-IN";
      }
      utterance.rate = 0.9;
      utterance.pitch = 1.05;
      utterance.volume = 1;

      utterance.onend = () => {
        setSpeakingMsgId(null);
        setVoiceStatus("idle");
        setLiveTranscript("Bolein, main sun raha hoon...");
        if (continueListeningInVoiceMode && isVoiceModeRef.current) {
          startListening();
        }
      };

      utterance.onerror = () => {
        setSpeakingMsgId(null);
        setVoiceStatus("idle");
        setLiveTranscript("Voice play nahi ho payi. Text response dekh sakte hain.");
      };

      window.speechSynthesis.speak(utterance);
    } else {
      setSpeakingMsgId(null);
      setVoiceStatus("idle");
    }
  };

  const stopCurrentAudio = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  const startListening = () => {
    stopCurrentAudio();
    if (recognitionRef.current) {
      try {
        if (isRecognitionRunningRef.current) return;
        setLiveTranscript("Sun raha hoon...");
        recognitionRef.current.start();
        setVoiceStatus("listening");
      } catch (err) {
        console.warn("Recognition start issue:", err);
        setLiveTranscript("Mic start nahi hua. Permission/browser check karein.");
        setVoiceStatus("idle");
      }
    } else {
      setLiveTranscript("Voice input unsupported hai. Chrome/Edge browser use karein.");
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        isRecognitionRunningRef.current = false;
        setVoiceStatus("idle");
      } catch (err) {
        console.warn("Recognition stop issue:", err);
      }
    }
  };

  const toggleChatGPTVoiceMode = () => {
    if (!isVoiceMode) {
      setIsVoiceMode(true);
      setLiveTranscript("Bolein, main sun raha hoon...");
      setTimeout(() => {
        startListening();
      }, 300);
    } else {
      stopCurrentAudio();
      stopListening();
      setIsVoiceMode(false);
      setVoiceStatus("idle");
    }
  };

  const handleSend = (textToSend?: string, fromVoice = false) => {
    const query = (textToSend || inputMessage).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    // Save to memory
    addToHistory("user", query);

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsTyping(true);

    if (fromVoice || isVoiceMode) {
      setVoiceStatus("thinking");
      setLiveTranscript("Soch raha hoon...");
    }

    setTimeout(() => {
      const response: BotResponse = generateBotResponse(query);
      const botMsgId = (Date.now() + 1).toString();
      const botMsg: ChatMessage = {
        id: botMsgId,
        sender: "bot",
        text: response.text,
        links: response.links,
        suggestions: response.suggestions,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      // Save bot response to memory
      addToHistory("bot", response.text);

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);

      if (fromVoice || isVoiceMode) {
        speakText(response.text, botMsgId, true);
      }
    }, 400);
  };

  const handleClearChat = () => {
    stopCurrentAudio();
    stopListening();
    clearHistory();
    setMessages([
      {
        id: Date.now().toString(),
        sender: "bot",
        text: "🙏 **Hari Om & Namaste!** Main hoon aapka **Divine AI Guide** — Science Divine Foundation ka.\n\nSakshi Shree Guru Ji, courses, meditation, ya session booking — kuch bhi poochein!",
        links: [
          { label: "Courses", url: "/courses" },
          { label: "Book Session", url: "/book-session" },
        ],
        suggestions: [
          "Guru Ji ke baare mein batao",
          "Courses dekhein",
          "English Book link",
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <>
      {/* Compact Floating Toggle Button */}
      {!isOpen && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2">
          {/* Subtle Attention Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/95 text-sky-900 text-[10.5px] font-bold shadow-md border border-sky-200 backdrop-blur-md animate-bounce">
            <Sparkles size={11} className="text-amber-500" />
            <span>Ask AI Guide</span>
          </div>

          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className="group relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-sky-500 via-sky-400 to-amber-400 p-0.5 text-slate-950 shadow-lg flex items-center justify-center border-2 border-white hover:scale-105 active:scale-95 transition-all duration-300"
            aria-label="Open Divine AI Assistant"
          >
            <span className="absolute -inset-1 rounded-full bg-sky-400/30 animate-ping pointer-events-none" />

            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden p-1 shadow-inner">
              <img
                src={LOGO_URL}
                alt="Science Divine Logo"
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </button>
        </div>
      )}

      {/* Chat Window Modal */}
      {isOpen && (
        <div
          className="fixed z-50 transition-all duration-300 bottom-4 right-4 sm:bottom-5 sm:right-5 w-[calc(100vw-32px)] sm:w-[350px] max-h-[82vh] h-[480px] bg-white/95 backdrop-blur-2xl border border-sky-200 rounded-2xl shadow-[0_15px_45px_-10px_rgba(2,132,199,0.25)] flex flex-col overflow-hidden text-slate-800 font-sans"
          style={{
            background: "linear-gradient(180deg, #FFFFFF 0%, #F0F9FF 100%)",
          }}
        >
          {/* Header */}
          <div
            className="px-3.5 py-2.5 border-b border-sky-100 flex items-center justify-between select-none shadow-xs text-white"
            style={{
              background: "linear-gradient(135deg, #0284C7 0%, #0369A1 60%, #075985 100%)",
            }}
          >
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-white p-0.5 shadow-xs flex items-center justify-center overflow-hidden">
                  <img src={LOGO_URL} alt="Science Divine Logo" className="w-full h-full object-contain" />
                </div>
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 ring-1 ring-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-[14px] leading-tight tracking-wide">Divine AI Guide</h3>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* ChatGPT Style Voice Mode Toggle in Header */}
              <button
                onClick={toggleChatGPTVoiceMode}
                title={isVoiceMode ? "Switch to Text Chat" : "Open Voice Mode"}
                className={`px-2 py-1 rounded-lg transition-all flex items-center gap-1 font-bold ${
                  isVoiceMode
                    ? "bg-white text-sky-700 shadow-xs animate-pulse"
                    : "text-white/90 hover:bg-white/15 hover:text-amber-300"
                }`}
              >
                <Radio size={13} className={isVoiceMode ? "animate-spin text-sky-500" : ""} />
                <span className="text-[11px]">{isVoiceMode ? "Active" : "Voice"}</span>
              </button>

              {/* Clear chat */}
              <button
                onClick={handleClearChat}
                title="Clear Chat"
                className="p-1.5 rounded-lg text-white/80 hover:bg-white/15 hover:text-white transition-colors"
              >
                <RefreshCw size={14} />
              </button>

              {/* Close */}
              <button
                onClick={() => {
                  stopCurrentAudio();
                  stopListening();
                  setIsOpen(false);
                  setIsVoiceMode(false);
                }}
                title="Close"
                className="p-1.5 rounded-lg text-white/80 hover:bg-rose-500 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* ChatGPT Style Voice Mode Overlay */}
          {isVoiceMode ? (
            <div className="flex-1 flex flex-col items-center justify-between px-4 py-4 bg-gradient-to-b from-sky-50 via-sky-100 to-white text-slate-800 select-none animate-in fade-in duration-200">
              
              {/* Pill Badge */}
              <div className="px-3 py-1 bg-white/80 backdrop-blur-md rounded-full shadow-2xs border border-sky-100 text-[10px] font-bold text-slate-700 flex items-center gap-1.5">
                <Sparkles size={12} className="text-sky-500" />
                <span>Divine AI Guide</span>
              </div>

              {/* Center 3D Glass Fluid Voice Sphere */}
              <div className="relative flex items-center justify-center my-2">
                {/* Outer glow rings */}
                <div
                  className="absolute rounded-full animate-ping opacity-20"
                  style={{
                    width: voiceStatus === "speaking" ? "140px" : "120px",
                    height: voiceStatus === "speaking" ? "140px" : "120px",
                    background: "radial-gradient(circle, rgba(56,189,248,0.5) 0%, transparent 70%)",
                    animationDuration: voiceStatus === "speaking" ? "0.8s" : "2s",
                  }}
                />
                <div
                  className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 ${
                    voiceStatus === "speaking"
                      ? "scale-105"
                      : voiceStatus === "listening"
                      ? "scale-100"
                      : "scale-95 hover:scale-100"
                  }`}
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(186,230,253,0.7) 40%, rgba(125,211,252,0.8) 100%)",
                    boxShadow: voiceStatus === "speaking"
                      ? "inset -6px -6px 14px rgba(56,189,248,0.4), inset 6px 6px 14px rgba(255,255,255,0.9), 0 0 40px rgba(56,189,248,0.45)"
                      : "inset -6px -6px 14px rgba(56,189,248,0.25), inset 6px 6px 14px rgba(255,255,255,0.9), 0 10px 24px rgba(2,132,199,0.18)",
                    backdropFilter: "blur(10px)",
                    animation: voiceStatus === "speaking" ? "pulse 0.8s ease-in-out infinite" : "pulse 2.5s ease-in-out infinite",
                  }}
                >
                  <img
                    src={LOGO_URL}
                    alt="AI Core"
                    className={`w-13 h-13 object-contain opacity-80 drop-shadow-sm transition-transform duration-300 ${
                      voiceStatus === "speaking" ? "scale-110" : ""
                    }`}
                  />
                </div>
              </div>

              {/* Status / Transcript Text */}
              <p className="text-[13px] font-semibold text-slate-700 text-center leading-snug px-3 min-h-[34px] flex items-center justify-center">
                {liveTranscript || (voiceStatus === "listening" ? "Sun raha hoon..." : voiceStatus === "thinking" ? "Soch raha hoon..." : "Bolein, main sun raha hoon...")}
              </p>

              {/* Bottom Control Bar */}
              <div className="flex justify-center items-center gap-7 mt-2 w-full">
                {/* Chat Switch Button */}
                <button
                  onClick={toggleChatGPTVoiceMode}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors shadow-xs border border-slate-200"
                  title="Switch to Chat"
                >
                  <MessageSquare size={16} />
                </button>

                {/* Main Mic Button */}
                <button
                  onClick={voiceStatus === "listening" ? stopListening : startListening}
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-white transition-all transform active:scale-95 shadow-md ${
                    voiceStatus === "listening"
                      ? "bg-rose-500 ring-4 ring-rose-200 animate-pulse"
                      : "bg-slate-900 hover:bg-slate-800 ring-4 ring-slate-100"
                  }`}
                  title={voiceStatus === "listening" ? "Stop Listening" : "Start Listening"}
                >
                  {voiceStatus === "listening" ? <MicOff size={22} /> : <Mic size={22} />}
                </button>

                {/* Close Button */}
                <button
                  onClick={() => {
                    stopCurrentAudio();
                    stopListening();
                    setIsOpen(false);
                    setIsVoiceMode(false);
                  }}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-600 hover:bg-rose-50 hover:text-rose-500 transition-colors shadow-xs border border-slate-200"
                  title="Close Assistant"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ) : (
            /* Regular Text & Audio Chat View */
            <>
              {/* Quick Topics Banner - Hidden Scrollbar */}
              <div
                className="no-scrollbar px-3 py-1.5 bg-sky-50/80 border-b border-sky-100 flex gap-1.5 overflow-x-auto"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {QUICK_SUGGESTIONS.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(item.query)}
                    className="whitespace-nowrap text-[10px] font-medium px-2.5 py-1 rounded-full bg-white hover:bg-sky-500 text-sky-800 hover:text-white border border-sky-200 hover:border-sky-500 shadow-2xs transition-all flex items-center shrink-0"
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Messages Scroll Area */}
              <div
                className="no-scrollbar flex-1 overflow-y-auto p-3 space-y-3 text-[13px] leading-relaxed"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.sender === "bot" && (
                      <div className="w-6 h-6 rounded-full bg-white border border-sky-200 p-0.5 shadow-2xs flex items-center justify-center shrink-0 mt-0.5 overflow-hidden">
                        <img src={LOGO_URL} alt="Logo" className="w-full h-full object-contain" />
                      </div>
                    )}

                    <div
                      className={`max-w-[86%] rounded-2xl px-3.5 py-2.5 shadow-2xs ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-sky-600 to-sky-700 text-white font-medium rounded-tr-none"
                          : "bg-white text-slate-800 border border-sky-100 rounded-tl-none shadow-sky-900/5"
                      }`}
                    >
                      {/* Message Text formatted with clean word wrapping and paragraph structure */}
                      <div className="chat-message whitespace-normal [overflow-wrap:break-word] [word-break:normal] [hyphens:none] text-[13px] sm:text-[13.5px] leading-relaxed">
                        {msg.text.split("\n\n").map((paragraph, pIdx) => (
                          <div key={pIdx} className={pIdx > 0 ? "mt-2" : ""}>
                            {paragraph.split("\n").map((line, lIdx) => {
                              const isBullet = line.startsWith("-") || line.startsWith("•");
                              const cleanLine = isBullet ? line.replace(/^[-•]\s*/, "") : line;
                              const parts = cleanLine.split(/(\*\*.*?\*\*)/g);
                              return (
                                <div
                                  key={lIdx}
                                  className={
                                    isBullet
                                      ? "flex items-start gap-1.5 ml-1 my-0.5"
                                      : lIdx > 0
                                      ? "mt-1"
                                      : ""
                                  }
                                >
                                  {isBullet && (
                                    <span className="text-sky-500 font-bold select-none">•</span>
                                  )}
                                  <span className="flex-1">
                                    {parts.map((part, pIdx2) => {
                                      if (part.startsWith("**") && part.endsWith("**")) {
                                        return (
                                          <strong
                                            key={pIdx2}
                                            className={
                                              msg.sender === "user"
                                                ? "text-amber-200 font-bold"
                                                : "text-sky-950 font-bold"
                                            }
                                          >
                                            {part.slice(2, -2)}
                                          </strong>
                                        );
                                      }
                                      return part;
                                    })}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        ))}
                      </div>

                      {/* Attached Route Links */}
                      {msg.links && msg.links.length > 0 && (
                        <div className="mt-2 pt-1.5 border-t border-sky-100 flex flex-wrap gap-1.5">
                          {msg.links.map((link, lIdx) =>
                            link.url.startsWith("http") ? (
                              <a
                                key={lIdx}
                                href={link.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-sky-50 hover:bg-sky-100 text-sky-700 hover:text-sky-900 text-[10.5px] font-semibold border border-sky-200 transition-colors"
                              >
                                <span>{link.label}</span>
                                <ExternalLink size={10} />
                              </a>
                            ) : (
                              <Link
                                key={lIdx}
                                to={link.url}
                                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-sky-50 hover:bg-sky-100 text-sky-700 hover:text-sky-900 text-[10.5px] font-semibold border border-sky-200 transition-colors"
                              >
                                <span>{link.label}</span>
                                <ExternalLink size={10} />
                              </Link>
                            )
                          )}
                        </div>
                      )}

                      {/* Suggested Followups */}
                      {msg.suggestions && msg.suggestions.length > 0 && (
                        <div className="mt-2 pt-1.5 flex flex-wrap gap-1">
                          {msg.suggestions.map((sug, sIdx) => (
                            <button
                              key={sIdx}
                              onClick={() => handleSend(sug)}
                              className="text-[9.5px] px-2.5 py-0.5 rounded-full bg-sky-50 hover:bg-sky-500 text-sky-800 hover:text-white border border-sky-200/80 transition-all text-left font-medium"
                            >
                              <span>{sug}</span>
                            </button>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-1.5 pt-0.5">
                        {msg.sender === "bot" ? (
                          <button
                            onClick={() => speakText(msg.text, msg.id)}
                            title="Listen to this response"
                            className="text-[10px] text-sky-600 hover:text-sky-800 flex items-center gap-1 font-semibold transition-colors"
                          >
                            <Volume2 size={11} className={speakingMsgId === msg.id ? "text-amber-500 animate-pulse" : ""} />
                            <span>{speakingMsgId === msg.id ? "Speaking..." : "Listen"}</span>
                          </button>
                        ) : (
                          <span />
                        )}

                        <span
                          className={`text-[9px] ${
                            msg.sender === "user" ? "text-sky-200" : "text-slate-400"
                          }`}
                        >
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>

                    {msg.sender === "user" && (
                      <div className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                        <User size={12} />
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing Animation */}
                {isTyping && (
                  <div className="flex gap-2 justify-start items-center">
                    <div className="w-6 h-6 rounded-full bg-white border border-sky-200 p-0.5 shadow-2xs flex items-center justify-center shrink-0 overflow-hidden">
                      <img src={LOGO_URL} alt="Logo" className="w-full h-full object-contain animate-pulse" />
                    </div>
                    <div className="bg-white border border-sky-100 rounded-xl rounded-tl-none px-3 py-2 flex items-center gap-1 shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Input Bar with Voice Button */}
              <div className="p-2.5 bg-white border-t border-sky-100">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex items-center gap-1.5 bg-sky-50/70 border border-sky-200 focus-within:border-sky-500 focus-within:bg-white rounded-xl px-2.5 py-1 transition-all shadow-inner"
                >
                  {/* Voice Mode Toggle Button */}
                  <button
                    type="button"
                    onClick={toggleChatGPTVoiceMode}
                    title="Open Voice Mode"
                    className="p-1 rounded text-sky-600 hover:bg-sky-200/60 hover:text-sky-900 transition-all flex items-center"
                  >
                    <Mic size={15} />
                  </button>

                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Courses, yoga, Sakshi Shree..."
                    className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none py-0.5"
                  />

                  <button
                    type="submit"
                    disabled={!inputMessage.trim()}
                    className="p-1.5 rounded-lg bg-gradient-to-r from-sky-500 to-sky-600 text-white hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity shrink-0 shadow-2xs"
                    aria-label="Send Message"
                  >
                    <Send size={14} />
                  </button>
                </form>
                <div className="flex justify-start items-center px-1 mt-1 text-[10px] text-slate-500 font-medium">
                  <button
                    onClick={toggleChatGPTVoiceMode}
                    className="text-sky-600 hover:text-sky-800 flex items-center gap-1 font-semibold transition-colors"
                  >
                    <Radio size={10} className="text-amber-500" />
                    <span>Voice Mode</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
