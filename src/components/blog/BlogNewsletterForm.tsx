"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";

interface BlogNewsletterFormProps {
  variant?: "header" | "footer";
  placeholder?: string;
  buttonText?: string;
}

export function BlogNewsletterForm({
  variant = "header",
  placeholder = "Enter your Email",
  buttonText = "Subscribe",
}: BlogNewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  if (isSubscribed) {
    return (
      <div className="flex items-center gap-2 py-3 px-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs sm:text-sm font-medium">
        <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
        <span>Thank you for subscribing! Wisdom updates will be sent to your inbox.</span>
      </div>
    );
  }

  const isHeader = variant === "header";

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-0 w-full ${
        isHeader ? "max-w-md" : "max-w-md mx-auto pt-2"
      }`}
    >
      <div className="relative flex-1">
        <Mail
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="email"
          required
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full pl-11 pr-4 py-3 rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none bg-white text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400 shadow-xs ${
            isHeader
              ? "border border-gray-200"
              : "border border-gray-300 focus:border-[#8B1515]"
          }`}
        />
      </div>
      <button
        type="submit"
        className="px-6 py-3 rounded-b-xl sm:rounded-r-xl sm:rounded-bl-none bg-[#8B1515] hover:bg-[#701010] text-white font-bold text-xs sm:text-sm transition-all shadow-xs shrink-0 cursor-pointer"
      >
        {buttonText}
      </button>
    </form>
  );
}
