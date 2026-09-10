"use client";

import React, { useState } from "react";
import { User, Mail, Phone, MessageSquare, ArrowRight, CheckCircle2, Headphones, PlaySquare, FileText, Send, Shield } from "lucide-react";

function LotusIcon({ size = 16, color = "#C9910B", className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3C12 3 8 8 8 13C8 17.4183 9.79086 21 12 21C14.2091 21 16 17.4183 16 13C16 8 12 3 12 3Z" />
      <path d="M12 21C7.5 21 3 18.5 3 14C3 10.5 7 8 10 9.5" />
      <path d="M12 21C16.5 21 21 18.5 21 14C21 10.5 17 8 14 9.5" />
    </svg>
  );
}

const benefits = [
  { label: "Exclusive Audios", icon: Headphones },
  { label: "Inspiring Videos", icon: PlaySquare },
  { label: "Insightful Blogs", icon: FileText },
  { label: "Latest Newsletters", icon: Send },
];

export default function ExclusiveContentCard() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    } catch (err) {
      console.warn("Submit error:", err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="exclusive-content-card relative overflow-hidden">
      {/* Left Visual Image Container with S-Wave Divider */}
      <div className="exclusive-content-visual relative">
        <img
          src="/exclusive-content-user-img.png"
          alt="Science Divine community practicing yoga at sunrise"
        />

        {/* Top Quote Overlay */}
        <div className="exclusive-content-quote-overlay">
          <blockquote className="font-serif italic">
            “Better Mind<br />&lsquo;Brighter Life&rsquo;”
          </blockquote>
          <div className="flex items-center justify-center gap-2 mt-1.5">
            <div className="w-5 h-[1px] bg-[#C9910B]/60" />
            <LotusIcon size={16} color="#C9910B" />
            <div className="w-5 h-[1px] bg-[#C9910B]/60" />
          </div>
        </div>

        {/* S-Curve Curved Wave Divider */}
        <svg
          className="exclusive-content-wave hidden lg:block"
          viewBox="0 0 100 600"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M 100,0 C 15,200 85,400 0,600 L 100,600 Z" fill="#FFFDF8" />
        </svg>
      </div>

      {/* Right Form Panel */}
      <div className="exclusive-content-body relative z-10">
        {/* Subtle Mandala Watermark */}
        <div className="exclusive-content-mandala-bg pointer-events-none" aria-hidden="true" />

        <div className="exclusive-content-copy">
          <span className="exclusive-content-badge">
            <LotusIcon size={13} color="#8B6914" /> JOIN THE COMMUNITY
          </span>
          <h2>
            Get Access to<br />
            <span className="text-[#521623] font-bold">Exclusive Content</span>
          </h2>
          <p>
            Get access to exclusive audios, videos, blogs, newsletters, and more.
            Subscribe for practical wisdom, deep insights, and guided moments of stillness.
          </p>
        </div>

        <div className="exclusive-content-benefits" aria-label="Membership benefits">
          {benefits.map(({ label, icon: Icon }) => (
            <div key={label} className="exclusive-content-benefit">
              <span><Icon aria-hidden="true" /></span>
              <strong>{label}</strong>
            </div>
          ))}
        </div>

        {submitted ? (
          <div className="exclusive-content-success">
            <CheckCircle2 size={30} />
            <h3>Thank You, {formData.name || "Friend"}!</h3>
            <p>Your details are registered. We will send the next spiritual insight to your inbox.</p>
            <button type="button" onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", message: "" }); }}>Submit another request</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="exclusive-content-form">
            {errorMsg && <div className="exclusive-content-error">{errorMsg}</div>}
            <label><User aria-hidden="true" /><input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Your Name *" /></label>
            <label><Mail aria-hidden="true" /><input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="Your Email *" /></label>
            <label><Phone aria-hidden="true" /><input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number *" /></label>
            <label><MessageSquare aria-hidden="true" /><input type="text" name="message" value={formData.message} onChange={handleChange} placeholder="Message (optional)" /></label>
            <div className="exclusive-content-form-footer">
              <span className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                <Shield size={14} className="text-amber-700/80 shrink-0" /> We respect your privacy. No spam, ever.
              </span>
              <button type="submit" disabled={loading}>{loading ? "Submitting…" : <>Submit Now <ArrowRight size={16} /></>}</button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

