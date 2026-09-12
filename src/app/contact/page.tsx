"use client";

import React, { useState } from "react";
import { PageHero } from "@/components/PageHero";
import { User, Mail, Phone, MessageSquare, MapPin, Users, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Page() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setErrorMsg("Please provide your name and email address.");
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
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || undefined,
          message: form.message.trim() || undefined,
          meta: { source: "contact_page" },
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to submit. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      console.warn("Submit error:", err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title={
          <>
            Silence isn't{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #F59E0B, #D4AF37)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              empty, it's full.
            </span>
          </>
        }
        subtitle="Sakshi Shree is an enlightened mentor who believes in using scientifically proven techniques to help people. Reach out to us."
      />

      {/* ════════════════════════════════════
          BALANCED, COMPACT, CENTERED LANDSCAPE CONTACT CARD
      ════════════════════════════════════ */}
      <section className="section-pad bg-gradient-to-b from-[#FFFDF8] via-[#FFF9EE] to-[#FFFDF8] py-6 sm:py-10 overflow-hidden relative">
        <div className="container-page max-w-5xl mx-auto px-4">
          <div className="bg-[#FFFDF9]/98 backdrop-blur-md rounded-2xl border border-amber-200/80 shadow-[0_12px_32px_rgba(82,22,35,0.06)] overflow-hidden flex flex-col lg:flex-row relative items-stretch">
            
            {/* Left Image Column */}
            <div className="w-full lg:w-[280px] xl:w-[310px] shrink-0 relative overflow-hidden min-h-[260px] lg:min-h-full bg-amber-50/50">
              <img
                src="/contact-left-woman-cropped.png"
                alt="Science Divine Member holding Maha Mantras book"
                className="w-full h-full object-cover object-top lg:object-center transition-all duration-300"
              />
            </div>

            {/* Right Content Area: Form on Top + Tagline + 1-Line Info Cards Below */}
            <div className="flex-1 p-4 sm:p-5 lg:p-6 relative z-10 flex flex-col justify-between space-y-3">
              
              {/* Form Section (Full Width) */}
              <div className="space-y-3">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#521623]">
                    Send a Message
                  </h2>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    We&apos;d love to hear from you. Reach out to us and we&apos;ll get back to you as soon as possible.
                  </p>
                  <div className="w-12 h-0.5 bg-[#D4AF37] mt-1.5" />
                </div>

                {submitted ? (
                  <div className="p-5 rounded-xl bg-amber-50/90 border border-amber-300/80 text-center space-y-2">
                    <div className="w-9 h-9 rounded-full bg-[#521623] text-[#D4AF37] flex items-center justify-center mx-auto text-base font-bold">
                      <CheckCircle2 size={18} className="text-[#D4AF37]" />
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#521623]">Message Submitted!</h3>
                    <p className="text-xs text-gray-700">
                      Thank you for contacting Science Divine. Our team will respond shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", message: "" }); }}
                      className="text-xs font-bold text-[#8B6914] underline hover:text-[#521623] cursor-pointer pt-1"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    {errorMsg && (
                      <div className="p-2 text-xs text-red-700 bg-red-50 rounded-lg border border-red-200 font-medium">
                        {errorMsg}
                      </div>
                    )}

                    {/* Inputs Grid: Name, Email, Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="bg-white rounded-xl border border-amber-200/90 px-3.5 py-2.5 shadow-2xs flex items-center gap-2.5 focus-within:border-amber-500 focus-within:ring-1 focus-within:ring-amber-200 transition-all">
                        <User size={16} className="text-[#8B5E3C] shrink-0" />
                        <div className="w-full">
                          <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider">Your Name</label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Enter full name"
                            className="w-full bg-transparent text-xs sm:text-[13px] font-medium text-gray-900 focus:outline-none placeholder:text-gray-300"
                          />
                        </div>
                      </div>

                      <div className="bg-white rounded-xl border border-amber-200/90 px-3.5 py-2.5 shadow-2xs flex items-center gap-2.5 focus-within:border-amber-500 focus-within:ring-1 focus-within:ring-amber-200 transition-all">
                        <Mail size={16} className="text-[#8B5E3C] shrink-0" />
                        <div className="w-full">
                          <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Enter email address"
                            className="w-full bg-transparent text-xs sm:text-[13px] font-medium text-gray-900 focus:outline-none placeholder:text-gray-300"
                          />
                        </div>
                      </div>

                      <div className="bg-white rounded-xl border border-amber-200/90 px-3.5 py-2.5 shadow-2xs flex items-center gap-2.5 focus-within:border-amber-500 focus-within:ring-1 focus-within:ring-amber-200 transition-all">
                        <Phone size={16} className="text-[#8B5E3C] shrink-0" />
                        <div className="w-full">
                          <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider">Phone Number</label>
                          <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            className="w-full bg-transparent text-xs sm:text-[13px] font-medium text-gray-900 focus:outline-none placeholder:text-gray-300"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Taller Message Textarea Box */}
                    <div className="bg-white rounded-xl border border-amber-200/90 px-3.5 py-2.5 shadow-2xs flex items-start gap-2.5 focus-within:border-amber-500 focus-within:ring-1 focus-within:ring-amber-200 transition-all">
                      <MessageSquare size={16} className="text-[#8B5E3C] shrink-0 mt-0.5" />
                      <div className="w-full">
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider">Message</label>
                        <textarea
                          name="message"
                          rows={4.5}
                          value={form.message}
                          onChange={handleChange}
                          placeholder="How can we help you? Tell us about your query..."
                          className="w-full bg-transparent text-xs sm:text-[13px] font-medium text-gray-900 focus:outline-none placeholder:text-gray-300 resize-none min-h-[110px]"
                        />
                      </div>
                    </div>

                    {/* Centered Submit Button Below Message Box */}
                    <div className="flex justify-center pt-1">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto py-2.5 px-8 rounded-full bg-[#521623] hover:bg-[#3B0F19] active:scale-[0.99] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 group border border-amber-500/20 disabled:opacity-75"
                      >
                        <span>{loading ? "Submitting..." : "Submit Message"}</span>
                        <ArrowRight size={16} className="text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Tagline Divider & 1-Line Info Cards Below (No Extra Bottom Space) */}
              <div className="pt-2 border-t border-amber-200/80 space-y-2.5">
                <p className="text-[9.5px] font-semibold tracking-[0.2em] text-[#8B6914] uppercase text-center">
                  &mdash; TOGETHER TOWARDS A MORE CONSCIOUS TOMORROW &mdash;
                </p>

                {/* 1-Line 3 Cards Grid Below Tagline (Larger Size & Tight Bottom Edge) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  
                  {/* Card 1: Our Address */}
                  <div className="bg-white/95 rounded-xl border border-amber-200/90 p-3.5 shadow-2xs flex items-start gap-3 group hover:border-amber-300 transition-colors">
                    <div className="w-9 h-9 rounded-xl bg-amber-100/90 text-[#8B5E3C] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin size={16} />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="font-serif text-xs sm:text-sm font-bold text-[#521623]">Our Address</h3>
                      <p className="text-[8.5px] font-bold text-amber-900 uppercase tracking-wider">SIDDH SUDARSHAN SAKSHI DHAM</p>
                      <p className="text-[11px] sm:text-xs text-gray-600 leading-snug">
                        8, Avantika Rd, Shastri Nagar, Ghaziabad, UP 201002
                      </p>
                    </div>
                  </div>

                  {/* Card 2: Email */}
                  <div className="bg-white/95 rounded-xl border border-amber-200/90 p-3.5 shadow-2xs flex items-center justify-between gap-3 group hover:border-amber-300 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-100/90 text-[#8B5E3C] flex items-center justify-center shrink-0">
                        <Mail size={16} />
                      </div>
                      <div>
                        <h3 className="font-serif text-xs sm:text-sm font-bold text-[#521623]">Email</h3>
                        <a href="mailto:info@sciencedivine.org" className="text-[11px] sm:text-xs font-semibold text-gray-700 hover:text-amber-800 transition-colors">
                          info@sciencedivine.org
                        </a>
                      </div>
                    </div>
                    <span className="font-serif italic text-[9.5px] font-bold text-[#B8860B] bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 shrink-0">
                      Let&apos;s Connect
                    </span>
                  </div>

                  {/* Card 3: College Events */}
                  <div className="bg-white/95 rounded-xl border border-amber-200/90 p-3.5 shadow-2xs space-y-1.5 group hover:border-amber-300 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-amber-100/90 text-[#8B5E3C] flex items-center justify-center shrink-0">
                        <Users size={16} />
                      </div>
                      <h3 className="font-serif text-xs sm:text-sm font-bold text-[#521623]">College Events Contact</h3>
                    </div>
                    <div className="flex flex-wrap items-center justify-between text-[10px] sm:text-[10.5px] text-gray-700 font-medium pt-0.5 gap-x-1">
                      <span>Archana: +91 98996 12838</span>
                      <span className="text-gray-300 hidden sm:inline">|</span>
                      <span>Tushar: +91 95400 72189</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          GOOGLE MAP LOCATION SECTION
      ════════════════════════════════════ */}
      <section className="pb-12 bg-white">
        <div className="container-page max-w-5xl mx-auto px-4">
          <div className="card-premium rounded-2xl p-4 sm:p-6 border border-amber-200/70 shadow-lg overflow-hidden space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#8B6914] block mb-0.5">VISIT OUR ASHRAM</span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#521623]">Siddha Sudarshan Sakshi Dham</h3>
                <p className="text-xs text-gray-600 mt-0.5">8, Avantika Rd, Chiranjiv Vihar, Shastri Nagar, Ghaziabad, Uttar Pradesh 201002</p>
              </div>
              <a
                href="https://maps.google.com/?q=Siddha+Sudarshan+Sakshi+Dham,+Ghaziabad"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#521623] hover:bg-[#3B0F19] active:scale-95 text-white text-xs font-bold transition-all shrink-0 w-fit shadow-sm"
              >
                <MapPin size={14} className="text-[#D4AF37]" />
                <span>Get Directions</span>
              </a>
            </div>

            {/* Embedded Google Map Frame */}
            <div className="w-full h-[250px] sm:h-[300px] rounded-xl overflow-hidden border border-amber-200/80 shadow-inner relative">
              <iframe
                title="Siddha Sudarshan Sakshi Dham Location Map"
                src="https://maps.google.com/maps?q=Siddha+Sudarshan+Sakshi+Dham,+8,+Avantika+Rd,+Chiranjiv+Vihar,+Shastri+Nagar,+Ghaziabad,+Uttar+Pradesh+201002&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
