"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, User, ExternalLink, Volume2, ShieldCheck } from "lucide-react";
import { KnowledgeItem } from "@/lib/knowledge/types";

export interface MessageItem {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  sources?: KnowledgeItem[];
  links?: { label: string; url: string }[];
  suggestedQuestions?: string[];
}

interface ConversationMessagesProps {
  messages: MessageItem[];
  isThinking: boolean;
  onSuggestionClick: (suggestion: string) => void;
  onSpeakMessage?: (text: string) => void;
}

export function ConversationMessages({
  messages,
  isThinking,
  onSuggestionClick,
  onSpeakMessage,
}: ConversationMessagesProps) {
  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
        >
          {msg.sender === "bot" && (
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 grid place-items-center text-white shrink-0 shadow-md">
              <Sparkles size={16} />
            </div>
          )}

          <div
            className={`max-w-[85%] rounded-2xl p-4 shadow-sm text-sm ${
              msg.sender === "user"
                ? "bg-[#5B1209] text-white rounded-tr-none ml-auto"
                : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-amber-100 dark:border-slate-700 rounded-tl-none"
            }`}
          >
            {/* Sender Label & Timestamp */}
            <div className="flex items-center justify-between gap-2 mb-1 opacity-75 text-[11px]">
              <span className="font-semibold">
                {msg.sender === "user" ? "Aap (Seeker)" : "Divine AI Guide"}
              </span>
              <span className="flex items-center gap-1">
                {msg.timestamp}
                {msg.sender === "bot" && onSpeakMessage && (
                  <button
                    onClick={() => onSpeakMessage(msg.text)}
                    className="p-1 hover:text-amber-500 transition-colors ml-1"
                    title="Play voice"
                  >
                    <Volume2 size={12} />
                  </button>
                )}
              </span>
            </div>

            {/* Message Body with clean formatting */}
            <div className="whitespace-pre-wrap leading-relaxed space-y-2">
              {msg.text.split("\n\n").map((para, pIdx) => (
                <p key={pIdx}>
                  {para.split("**").map((chunk, cIdx) =>
                    cIdx % 2 === 1 ? (
                      <strong key={cIdx} className="font-semibold text-amber-700 dark:text-amber-400">
                        {chunk}
                      </strong>
                    ) : (
                      chunk
                    )
                  )}
                </p>
              ))}
            </div>

            {/* Verified Source Badges & Quick Action Links */}
            {msg.links && msg.links.length > 0 && (
              <div className="mt-3 pt-3 border-t border-amber-100 dark:border-slate-700 flex flex-wrap gap-2">
                {msg.links.map((link, lIdx) => (
                  <Link
                    key={lIdx}
                    href={link.url}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-xs font-semibold hover:bg-amber-100 dark:hover:bg-amber-900 transition-colors border border-amber-200 dark:border-amber-800/60"
                  >
                    <ShieldCheck size={12} className="text-amber-600" />
                    <span>{link.label}</span>
                    <ExternalLink size={10} />
                  </Link>
                ))}
              </div>
            )}

            {/* Suggested Follow-up Questions */}
            {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
              <div className="mt-3 pt-2 flex flex-wrap gap-1.5">
                {msg.suggestedQuestions.map((sug, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => onSuggestionClick(sug)}
                    className="text-left px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-900 hover:bg-amber-50 dark:hover:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300 hover:text-amber-700 transition-colors border border-slate-200 dark:border-slate-700"
                  >
                    💬 {sug}
                  </button>
                ))}
              </div>
            )}
          </div>

          {msg.sender === "user" && (
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 grid place-items-center text-slate-700 dark:text-slate-200 shrink-0">
              <User size={16} />
            </div>
          )}
        </div>
      ))}

      {isThinking && (
        <div className="flex gap-3 justify-start items-center animate-fade-in">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 grid place-items-center text-white shrink-0 animate-spin">
            <Sparkles size={16} />
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl rounded-tl-none p-3 border border-amber-100 dark:border-slate-700 shadow-sm">
            <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span>Divine Wisdom dhoondh rahe hain...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
