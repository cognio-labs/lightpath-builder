"use client";

import React, { useState } from "react";
import { Share2, Check, Copy } from "lucide-react";

export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (typeof window === "undefined") return;
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
        return;
      } catch (err) {
        // Fallback to clipboard if user dismissed share sheet
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer border border-gray-200/60"
      title="Share or Copy Link"
    >
      {copied ? (
        <>
          <Check size={13} className="text-emerald-600" />
          <span className="text-emerald-700">Link Copied!</span>
        </>
      ) : (
        <>
          <Share2 size={13} className="text-gray-500" />
          <span>Share</span>
        </>
      )}
    </button>
  );
}
