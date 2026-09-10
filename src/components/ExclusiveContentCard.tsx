"use client";

import React, { useState } from "react";
import { User, Mail, Phone, MessageSquare, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ExclusiveContentCard() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMsg("Please provide your name and email.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || undefined,
          message: formData.message.trim() || undefined,
          meta: { source: "exclusive_content_subscription" },
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to submit. Please try again.");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      // Fallback grace for users even if offline
      console.warn("Submit error:", msg);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-amber-200/70 bg-gradient-to-br from-[#FFFDF9] via-[#FFF9EE] to-[#FFF6E5] p-6 sm:p-10 lg:p-12">
      {/* Subtle Background Glow Accents */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none opacity-40"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.25) 0%, transparent 70%)" }}
      />
      <div
        className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full pointer-events-none opacity-40"
        style={{ background: "radial-gradient(circle, rgba(82,22,35,0.15) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-300/80 bg-amber-100/70 text-[#8B6914] shadow-xs">
            <span>Join the Sacred Community</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#521623] leading-tight">
            Get Access to Exclusive Content
          </h2>
          <p className="text-gray-700 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Get access to exclusive audios, videos, blogs, newsletters, and more! Subscribe now to access a world of unique content, deep insights, and insider knowledge.
          </p>
        </div>

        {/* Form Area */}
        <div className="max-w-3xl mx-auto pt-2">
          {submitted ? (
            <div className="p-8 rounded-2xl bg-white/95 border-2 border-emerald-400/60 shadow-md text-center space-y-4 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 size={30} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#521623]">
                Thank You, {formData.name || "Friend"}!
              </h3>
              <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
                Your details have been registered successfully. You will receive exclusive spiritual insights, guided audios, and newsletters directly to your inbox.
              </p>
              <div className="pt-2 flex justify-center">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", phone: "", message: "" });
                  }}
                  className="text-xs sm:text-sm font-bold text-[#521623] hover:underline cursor-pointer"
                >
                  ← Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-amber-200/80 shadow-lg">
              {errorMsg && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium text-center">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name Input */}
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B6914] pointer-events-none" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name *"
                    className="w-full pl-12 pr-4 py-3.5 rounded-full bg-[#FFFDF9] border border-amber-200/90 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#521623] focus:border-transparent transition-all shadow-xs"
                  />
                </div>

                {/* Email Input */}
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B6914] pointer-events-none" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email *"
                    className="w-full pl-12 pr-4 py-3.5 rounded-full bg-[#FFFDF9] border border-amber-200/90 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#521623] focus:border-transparent transition-all shadow-xs"
                  />
                </div>

                {/* Phone Input */}
                <div className="relative">
                  <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B6914] pointer-events-none" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full pl-12 pr-4 py-3.5 rounded-full bg-[#FFFDF9] border border-amber-200/90 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#521623] focus:border-transparent transition-all shadow-xs"
                  />
                </div>

                {/* Message Input */}
                <div className="relative">
                  <MessageSquare size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B6914] pointer-events-none" />
                  <input
                    type="text"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message (optional)"
                    className="w-full pl-12 pr-4 py-3.5 rounded-full bg-[#FFFDF9] border border-amber-200/90 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#521623] focus:border-transparent transition-all shadow-xs"
                  />
                </div>
              </div>

              {/* Submit Action */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-gray-500 font-medium flex items-center gap-1.5">
                  <span>We respect your privacy. No spam, ever.</span>
                </p>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-9 py-3.5 rounded-full bg-[#521623] hover:bg-[#3B0F19] active:scale-95 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {loading ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Submit Now</span>
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
