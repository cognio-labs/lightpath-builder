"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import {
  Mail,
  CheckCircle2,
  BookOpen,
  Sparkles,
  Headphones,
  Calendar,
  ShieldCheck,
  ArrowRight,
  Heart,
} from "lucide-react";

export default function SubscribeNewsletterPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topics: ["meditation", "wisdom"],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email) {
      setSubmitted(true);
    }
  };

  const toggleTopic = (topic: string) => {
    setFormData((prev) => ({
      ...prev,
      topics: prev.topics.includes(topic)
        ? prev.topics.filter((t) => t !== topic)
        : [...prev.topics, topic],
    }));
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-[#332211] font-sans selection:bg-amber-200">
      {/* Page Hero */}
      <PageHero
        title="Subscribe to Science Divine Newsletter"
        subtitle="Join over 100,000+ seekers worldwide. Receive weekly spiritual discourses, guided meditation audios, and priority event invitations directly to your inbox."
        eyebrow="Inner Circle Newsletter"
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-16">
        {/* Main Grid: Form + Benefits */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Interactive Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 lg:p-12 border border-amber-200/80 shadow-[0_15px_40px_rgba(82,22,35,0.06)] space-y-6">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="font-serif font-bold text-2xl lg:text-3xl text-[#521623]">
                  Welcome to the Inner Circle!
                </h3>
                <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-[#521623]">{formData.name || "Seeker"}</span>! We have sent a confirmation email to <span className="font-bold text-[#521623]">{formData.email}</span> along with your free downloadable Meditation E-Book.
                </p>
                <div className="pt-4">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#521623] text-amber-100 font-bold text-xs sm:text-sm shadow-md hover:bg-[#3B0F19] transition-all"
                  >
                    <span>Explore Wisdom Articles</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2 border-b border-amber-200/70 pb-4">
                  <h3 className="font-serif font-bold text-2xl text-[#521623]">
                    Join 100,000+ Conscious Seekers
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Fill in your details below to activate your free subscription and receive your instant welcome gift.
                  </p>
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#521623] uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-amber-50/40 border border-amber-200/90 text-sm font-medium text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#521623] uppercase tracking-wider">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-amber-50/40 border border-amber-200/90 text-sm font-medium text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>

                {/* Topic Preferences */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold text-[#521623] uppercase tracking-wider">
                    Select Your Areas of Interest
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { id: "meditation", label: "Meditation & Breathwork" },
                      { id: "wisdom", label: "Sakshi Wisdom Discourses" },
                      { id: "stress", label: "Stress & Anxiety Relief" },
                      { id: "parenting", label: "Conscious Parenting" },
                    ].map((topic) => {
                      const selected = formData.topics.includes(topic.id);
                      return (
                        <button
                          key={topic.id}
                          type="button"
                          onClick={() => toggleTopic(topic.id)}
                          className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer flex items-center justify-between ${
                            selected
                              ? "bg-amber-100/80 border-amber-400 text-[#521623] shadow-xs"
                              : "bg-white border-amber-200 text-gray-600 hover:border-amber-300"
                          }`}
                        >
                          <span>{topic.label}</span>
                          {selected && <CheckCircle2 size={15} className="text-[#521623]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#521623] to-[#3B0F19] hover:from-[#3B0F19] hover:to-[#2A0A12] text-amber-100 font-bold text-sm shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Mail size={18} />
                  <span>Subscribe Now &amp; Get Free E-Book</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500 font-medium pt-2">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  <span>We respect your privacy. Zero spam. Unsubscribe in 1-click anytime.</span>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Member Benefits & E-book Preview */}
          <div className="lg:col-span-5 space-y-6">
            {/* Free E-book Badge */}
            <div className="bg-gradient-to-br from-[#521623] to-[#3B0F19] text-white rounded-3xl p-8 border border-amber-400/30 shadow-xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold">
                <Sparkles size={14} />
                Instant Welcome Gift
              </div>
              <h4 className="font-serif font-bold text-xl text-amber-100">
                Free E-Book: "The Path to Inner Freedom"
              </h4>
              <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed">
                As soon as you confirm your email, you will immediately receive Sakshi Shree's celebrated handbook on practical meditation and stress-free living.
              </p>
            </div>

            {/* Subscriber Benefits */}
            <div className="bg-white rounded-3xl p-8 border border-amber-200/80 shadow-sm space-y-4">
              <h4 className="font-serif font-bold text-lg text-[#521623]">
                What You Will Receive Weekly
              </h4>
              <ul className="space-y-3.5 text-xs sm:text-sm text-gray-700">
                <li className="flex items-start gap-3">
                  <BookOpen size={18} className="text-[#B8860B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#521623] block font-serif">Sakshi Wisdom Insights</strong>
                    <span>Short, powerful reflections to elevate your daily consciousness.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Headphones size={18} className="text-[#B8860B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#521623] block font-serif">Guided Sadhna Audio Links</strong>
                    <span>Direct links to Sakshi Shree's relaxing voice meditations.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Calendar size={18} className="text-[#B8860B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#521623] block font-serif">Priority Event Passes</strong>
                    <span>Early notification for physical retreats and live digital sessions.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
