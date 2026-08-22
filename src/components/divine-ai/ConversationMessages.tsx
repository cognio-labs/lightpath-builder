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
    <div className="space-y-3 font-sans">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
        >
          {msg.sender === "bot" && (
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 grid place-items-center text-slate-950 shrink-0 shadow-sm mt-0.5">
              <Sparkles size={12} className="animate-pulse" />
            </div>
          )}

          <div
            className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 shadow-sm text-[12.5px] leading-relaxed transition-all ${
              msg.sender === "user"
                ? "bg-gradient-to-br from-[#5B1209] to-[#781b0f] text-white rounded-tr-sm ml-auto"
                : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-amber-100 dark:border-slate-700 rounded-tl-sm shadow-sm"
            }`}
          >
            {/* Header info */}
            <div className="flex items-center justify-between gap-2 mb-1 opacity-70 text-[9.5px]">
              <span className="font-semibold tracking-wide uppercase">
                {msg.sender === "user" ? "You" : "Divine AI Guide"}
              </span>
              <div className="flex items-center gap-1.5">
                <span>{msg.timestamp}</span>
                {msg.sender === "bot" && onSpeakMessage && (
                  <button
                    onClick={() => onSpeakMessage(msg.text)}
                    className="p-0.5 hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
                    title="Listen to response"
                    aria-label="Listen to response"
                  >
                    <Volume2 size={11} />
                  </button>
                )}
              </div>
            </div>

            {/* Formatted Message Content */}
            <div className="space-y-1.5">
              {msg.text.split("\n\n").map((paragraph, pIdx) => (
                <p key={pIdx} className="leading-[1.55]">
                  {paragraph.split("**").map((chunk, cIdx) =>
                    cIdx % 2 === 1 ? (
                      <strong key={cIdx} className="font-semibold text-amber-800 dark:text-amber-300">
                        {chunk}
                      </strong>
                    ) : (
                      chunk
                    )
                  )}
                </p>
              ))}
            </div>

            {/* Verified Page Navigation Badges */}
            {msg.links && msg.links.length > 0 && (
              <div className="mt-2.5 pt-2 border-t border-amber-100/70 dark:border-slate-700/70 flex flex-wrap gap-1">
                {msg.links.map((link, lIdx) => (
                  <Link
                    key={lIdx}
                    href={link.url}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 text-[10px] font-medium hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-colors border border-amber-200/70 dark:border-amber-800/50"
                  >
                    <ShieldCheck size={10} className="text-amber-600" />
                    <span>{link.label}</span>
                    <ExternalLink size={8} className="opacity-60" />
                  </Link>
                ))}
              </div>
            )}

            {/* Quick Suggestion Follow-up Buttons */}
            {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
              <div className="mt-2.5 pt-1.5 flex flex-wrap gap-1">
                {msg.suggestedQuestions.map((sug, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => onSuggestionClick(sug)}
                    className="text-left px-2 py-0.5 rounded-md bg-slate-50 dark:bg-slate-900 hover:bg-amber-50 dark:hover:bg-slate-800 text-[10.5px] text-slate-600 dark:text-slate-300 hover:text-amber-800 transition-colors border border-slate-200/80 dark:border-slate-700/80"
                  >
                    💬 {sug}
                  </button>
                ))}
              </div>
            )}
          </div>

          {msg.sender === "user" && (
            <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 grid place-items-center text-slate-600 dark:text-slate-200 shrink-0 shadow-sm mt-0.5">
              <User size={12} />
            </div>
          )}
        </div>
      ))}

      {isThinking && (
        <div className="flex gap-2 justify-start items-center animate-fade-in">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 grid place-items-center text-slate-950 shrink-0 animate-spin">
            <Sparkles size={12} />
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl rounded-tl-sm px-3 py-1.5 border border-amber-100 dark:border-slate-700 shadow-sm">
            <div className="flex items-center gap-1.5 text-[11px] text-amber-700 dark:text-amber-300 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
              <span>Divine Wisdom soch rahe hain...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
