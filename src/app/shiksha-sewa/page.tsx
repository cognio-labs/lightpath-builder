"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  ArrowRight,
  Eye,
  GraduationCap,
  Users,
  Flower2,
  Home as HomeIcon,
  Briefcase,
  HeartPulse,
  BookOpen,
  Award,
  Phone,
  Mail,
  Globe,
  MapPin,
  Check,
  Copy,
  QrCode,
  Lock,
  X,
} from "lucide-react";

/* ─────────────────────────────────────────────
   DATA & CONSTANTS
───────────────────────────────────────────── */
const MONTHLY_AMOUNTS = [
  { value: 500, label: "₹500", sub: "/Month" },
  { value: 1100, label: "₹1100", sub: "/Month" },
  { value: 2100, label: "₹2100", sub: "/Month" },
  { value: 0, label: "Other Amount", sub: "" },
];

const YEARLY_AMOUNTS = [
  { value: 5100, label: "₹5100", sub: "/Year" },
  { value: 11000, label: "₹11,000", sub: "/Year" },
  { value: 21000, label: "₹21,000", sub: "/Year" },
  { value: 0, label: "Other Amount", sub: "" },
];

const CHALLENGES = [
  {
    icon: GraduationCap,
    title: "One in four children never sees the inside of a classroom",
  },
  {
    icon: Briefcase,
    title: "7.8 million children are trapped in child labor",
  },
  {
    icon: HomeIcon,
    title: "52 million children live in poverty",
  },
  {
    icon: HeartPulse,
    title: "Without intervention, potential is forever lost",
  },
];

const ACHIEVEMENTS = [
  {
    icon: Flower2,
    number: "300+",
    label: "Meditation workshops conducted",
  },
  {
    icon: Users,
    number: "3+ Lakh",
    label: "People benefited from meditation",
  },
  {
    icon: BookOpen,
    number: "150,000+",
    label: "Teaching hours",
  },
  {
    icon: Award,
    number: "Thousands",
    label: "of children already on the path to transformation",
  },
];

/* ─────────────────────────────────────────────
   LOTUS LOGO ICON (Gold)
───────────────────────────────────────────── */
function LotusLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M24 6C24 6 18 16 18 25C18 30.5 20.7 35 24 37C27.3 35 30 30.5 30 25C30 16 24 6 24 6Z"
        fill="url(#lotus-gold-1)"
      />
      <path
        d="M23 14C23 14 11 19 8 28C6.5 32.5 8.5 36.5 12 37.5C16.5 38.8 21.5 34.5 23 31C23.6 29.5 23 14 23 14Z"
        fill="url(#lotus-gold-2)"
        opacity="0.95"
      />
      <path
        d="M25 14C25 14 37 19 40 28C41.5 32.5 39.5 36.5 36 37.5C31.5 38.8 26.5 34.5 25 31C24.4 29.5 25 14 25 14Z"
        fill="url(#lotus-gold-2)"
        opacity="0.95"
      />
      <path
        d="M17 25C17 25 5 28 4 35C3.3 39.5 7 42 11 41C16 39.7 19 35 19 32C19 32 17 25 17 25Z"
        fill="url(#lotus-gold-3)"
        opacity="0.85"
      />
      <path
        d="M31 25C31 25 43 28 44 35C44.7 39.5 41 42 37 41C32 39.7 29 35 29 32C29 32 31 25 31 25Z"
        fill="url(#lotus-gold-3)"
        opacity="0.85"
      />
      <defs>
        <linearGradient id="lotus-gold-1" x1="24" y1="6" x2="24" y2="37" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE68A" />
          <stop offset="0.5" stopColor="#EAB308" />
          <stop offset="1" stopColor="#CA8A04" />
        </linearGradient>
        <linearGradient id="lotus-gold-2" x1="8" y1="14" x2="24" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FCD34D" />
          <stop offset="1" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id="lotus-gold-3" x1="4" y1="25" x2="19" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE68A" />
          <stop offset="1" stopColor="#92400E" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   PILLAR LOTUS ICON (Exact match to card design)
───────────────────────────────────────────── */
function PillarLotusIcon({ className = "w-8 h-8 text-[#54121E]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Central petal */}
      <path d="M18 7C15 13 14 18 14 22C14 25.5 15.8 28 18 29C20.2 28 22 25.5 22 22C22 18 21 13 18 7Z" />
      {/* Left petal */}
      <path d="M14.5 15.5C11 18 7.5 22 8 26C8.5 28.5 11.5 29 14.5 26" />
      {/* Right petal */}
      <path d="M21.5 15.5C25 18 28.5 22 28 26C27.5 28.5 24.5 29 21.5 26" />
      {/* Left lower petal */}
      <path d="M11 24.5C7.5 25 5 27 5.5 29C6 31 10 30 13.5 28.5" />
      {/* Right lower petal */}
      <path d="M25 24.5C28.5 25 31 27 30.5 29C30 31 26 30 22.5 28.5" />
      {/* Bottom base connecting curves */}
      <path d="M12.5 30.5C15 32 21 32 23.5 30.5" />
    </svg>
  );
}

const DONATION_PRESETS = [500, 1100, 2100, 5100, 11000, 21000];

/* ─────────────────────────────────────────────
   MAIN SHIKSHA SEWA PAGE
───────────────────────────────────────────── */
export default function ShikshaSewaPage() {
  const [frequency, setFrequency] = useState<"monthly" | "yearly">("monthly");
  const [selectedAmount, setSelectedAmount] = useState<number>(500);
  const [isOther, setIsOther] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const amounts = frequency === "monthly" ? MONTHLY_AMOUNTS : YEARLY_AMOUNTS;

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#FFFDF9] text-[#2C1810] font-sans selection:bg-[#E8B86D] selection:text-[#4A0E17]">

      {/* ══════════════════════════════════════════════════════
          2. HERO SECTION — Mobile: Heading then Image; Desktop: Side-by-side
      ══════════════════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative overflow-hidden text-white"
        style={{
          background: "linear-gradient(105deg, #3D0A12 0%, #5C1421 40%, #6B1A28 60%, #9B4E2A 80%, #C87941 100%)",
        }}
      >
        {/* Desktop only: Right-side blended image */}
        <div
          className="hidden md:block absolute top-0 right-0 h-full w-[54%] lg:w-[58%]"
          style={{ zIndex: 0 }}
        >
          <img
            src="/images/shiksha-sewa/hero-small-steps.png"
            alt="Small Steps, Big Changes - Shiksha Sewa"
            className="h-full w-full object-cover object-left-top"
            style={{ display: "block" }}
          />
          {/* Smooth left fade */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, #5C1421 0%, rgba(92,20,33,0.85) 20%, rgba(92,20,33,0.4) 45%, rgba(92,20,33,0.05) 70%, transparent 100%)",
            }}
          />
        </div>

        {/* Content Layer: Heading on mobile */}
        <div
          className="relative max-w-7xl mx-auto px-5 pr-14 sm:pr-8 sm:px-8 lg:px-12 pt-8 pb-3 sm:py-14 lg:py-20 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8"
          style={{ zIndex: 4 }}
        >
          {/* Top on mobile, Left on desktop: Heading & Description */}
          <div className="w-full md:max-w-[50%] lg:max-w-[46%] space-y-3.5 sm:space-y-5 text-left">
            {/* Eyebrow */}
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] sm:tracking-[0.3em] text-[#E8B86D] uppercase block">
              EDUCATE · EMPOWER · TRANSFORM
            </span>

            {/* Main Title */}
            <h1 className="font-serif text-2xl xs:text-3xl sm:text-4xl lg:text-[46px] font-extrabold leading-[1.18] sm:leading-[1.1] tracking-tight text-white">
              Education for Every Child,
              <br className="hidden xs:inline" />
              <span className="text-[#EBA528]"> A Better India</span>
            </h1>

            {/* Paragraph */}
            <p className="text-xs sm:text-sm lg:text-[15px] text-white/90 leading-relaxed font-normal max-w-md">
              Shiksha Sewa is a non-profit organization dedicated to providing education, vocational training and meditation for a brighter, more compassionate and self-reliant society.
            </p>

            {/* Button */}
            <div className="pt-1.5 sm:pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 sm:gap-2.5 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#EBA528] hover:bg-[#D9941C] text-[#3B0910] font-bold text-xs sm:text-sm shadow-lg shadow-amber-900/40 transition-all duration-200 active:scale-95"
              >
                <Heart className="w-4 h-4 fill-current" />
                <span>Join Our Movement</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Below on mobile: FULL-WIDTH edge-to-edge image without left/right space */}
        <div className="w-full md:hidden relative z-10 pt-2 pb-0">
          <img
            src="/images/shiksha-sewa/hero-small-steps.png"
            alt="Small Steps, Big Changes - Shiksha Sewa"
            className="w-full h-auto object-cover block"
          />
        </div>

        {/* Gold bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[3px]"
          style={{
            background: "linear-gradient(90deg, #3D0A12 0%, #D4AF37 30%, #EBA528 50%, #D4AF37 70%, #3D0A12 100%)",
            zIndex: 5,
          }}
        />
      </section>

      {/* ══════════════════════════════════════════════════════
          3. OUR VISION SECTION
      ══════════════════════════════════════════════════════ */}
      <section id="vision" className="py-14 sm:py-20 lg:py-28 bg-[#FFFDF9] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left Text */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-6">
              {/* Vision Badge & Eyebrow */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#5E1522] text-amber-200 flex items-center justify-center shadow-md">
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#5E1522] uppercase">
                  OUR VISION
                </span>
              </div>

              {/* Heading */}
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-[42px] font-bold text-[#4A0E17] leading-[1.2]">
                A Society Where Every Child Has the Right to Learn
              </h2>

              {/* Description */}
              <p className="text-sm sm:text-lg text-[#554347] leading-relaxed">
                Through this mission, we aim to bring education and meditation to every corner of India, reaching all districts across the nation. In the coming years we will transform the lives of countless children trapped in the cycle of poverty.
              </p>

              {/* Button */}
              <div className="pt-1 sm:pt-2">
                <button
                  onClick={() => scrollTo("approach")}
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full border-[1.5px] border-[#4A0E17] text-[#4A0E17] font-semibold text-xs sm:text-sm hover:bg-[#4A0E17] hover:text-white transition-all duration-200"
                >
                  <span>Know More About Us</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Image — frameless, clean margins */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <img
                src="/images/shiksha-sewa/vision-daydream.png"
                alt="Young girl daydreaming in classroom"
                className="w-full max-w-[500px] lg:max-w-[620px] h-auto object-contain"
                style={{ display: "block" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          4. OUR APPROACH SECTION
      ══════════════════════════════════════════════════════ */}
      <section id="approach" className="py-14 sm:py-20 lg:py-28 bg-[#FAF6F0] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-2.5 sm:space-y-3">
            <div className="inline-flex items-center justify-center gap-3">
              <span className="w-8 sm:w-10 h-[1.5px] bg-[#B07640]" />
              <span className="text-xs sm:text-sm font-bold tracking-[0.22em] text-[#B07640] uppercase">
                OUR APPROACH
              </span>
              <span className="w-8 sm:w-10 h-[1.5px] bg-[#B07640]" />
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-[42px] font-bold text-[#4A0E17] tracking-tight">
              Holistic Development for a Brighter Future
            </h2>
          </div>

          {/* 3 Pillars Cards — Replicated to match the reference design */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">

            {/* Card 1: EDUCATION */}
            <div className="group rounded-3xl overflow-hidden shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 bg-transparent flex flex-col">
              <img
                src="/images/shiksha-sewa/approach-education-card.png"
                alt="EDUCATION: Providing access to quality schools, transportation and learning materials for life, especially to those children who live in Jhuggi Jhopadi's and never see the inside of a classroom."
                className="w-full h-auto object-cover rounded-3xl transition-transform duration-500 group-hover:scale-[1.02] shadow-md"
              />
            </div>

            {/* Card 2: VOCATION */}
            <div className="group rounded-3xl overflow-hidden shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 bg-transparent flex flex-col">
              <img
                src="/images/shiksha-sewa/approach-vocation-card.png"
                alt="VOCATION: Age-appropriate skills development preparing children for self-reliance and dignified livelihoods."
                className="w-full h-auto object-cover rounded-3xl transition-transform duration-500 group-hover:scale-[1.02] shadow-md"
              />
            </div>

            {/* Card 3: MEDITATION */}
            <div className="group rounded-3xl overflow-hidden shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 bg-transparent flex flex-col">
              <img
                src="/images/shiksha-sewa/approach-meditation-card.png"
                alt="MEDITATION: Mind power techniques that develop focus, emotional resilience, and inner strength."
                className="w-full h-auto object-cover rounded-3xl transition-transform duration-500 group-hover:scale-[1.02] shadow-md"
              />
            </div>

          </div>

          {/* Centered Donate Now Button Below Cards */}
          <div className="flex justify-center mt-10 sm:mt-12">
            <a
              href="#donate"
              className="inline-flex items-center justify-center gap-2.5 px-8 sm:px-11 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#52121E] via-[#6E1828] to-[#52121E] text-[#FFF8E8] font-bold text-sm sm:text-base tracking-wide uppercase shadow-[0_10px_25px_rgba(82,18,30,0.32)] hover:shadow-[0_14px_34px_rgba(82,18,30,0.45)] hover:scale-105 active:scale-95 border border-amber-400/40 transition-all duration-300 group cursor-pointer"
            >
              <Heart className="w-5 h-5 text-amber-300 fill-amber-300 group-hover:scale-110 transition-transform" />
              <span>Donate Now</span>
              <ArrowRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          5. THE CHALLENGE SECTION
      ══════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 lg:py-28 bg-[#FFFDF9] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
            {/* Column 1: The Challenge List (Left) */}
            <div className="lg:col-span-4 space-y-5 sm:space-y-6">
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#5E1522] tracking-tight mb-6 sm:mb-8 uppercase text-center sm:text-left">
                THE CHALLENGE
              </h2>

              <div className="space-y-4 sm:space-y-6">
                {CHALLENGES.map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <div key={idx} className="flex items-center gap-3.5 sm:gap-4 group">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#5E1522] text-amber-200 flex-shrink-0 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                        <IconComp className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <p className="text-xs sm:text-base font-medium text-[#3E2B2E] leading-snug">
                        {item.title}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Column 2: Center Image */}
            <div className="lg:col-span-4 flex justify-center my-2 lg:my-0">
              <div className="relative w-full max-w-[320px] sm:max-w-[380px] rounded-2xl overflow-hidden shadow-xl transition-transform hover:scale-[1.01] duration-300">
                <img
                  src="/images/shiksha-sewa/challenge-children.png"
                  alt="Children in need of education"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Column 3: Sakshi Shree's Pledge (Right) */}
            <div className="lg:col-span-4">
              <div className="rounded-2xl p-6 sm:p-10 bg-gradient-to-b from-[#FFF9F0] to-[#FBF0DE] border border-amber-300/50 shadow-xl relative text-center">
                <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#4A0E17] mb-4 sm:mb-6">
                  Sakshi Shree’s Pledge
                </h3>

                {/* Decorative Quotes */}
                <div className="text-[#D4AF37] font-serif text-4xl sm:text-5xl leading-none -mb-2 sm:-mb-3">
                  “
                </div>

                <p className="font-serif italic text-sm sm:text-lg text-[#472E32] leading-relaxed px-1 sm:px-2">
                  Through the twin powers of education and meditation, we pledge to create a new generation of smiling conscious humans.
                </p>

                <div className="text-[#D4AF37] font-serif text-4xl sm:text-5xl leading-none mt-1 sm:mt-2">
                  ”
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          6. OUR ACHIEVEMENTS SECTION
      ══════════════════════════════════════════════════════ */}
      <section id="achievements" className="py-14 sm:py-20 lg:py-24 bg-[#FAF6F0] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-14">
            <div className="inline-flex items-center justify-center gap-3">
              <span className="w-8 sm:w-10 h-[1.5px] bg-[#B07640]" />
              <span className="text-xs sm:text-sm font-bold tracking-[0.22em] text-[#B07640] uppercase">
                OUR ACHIEVEMENTS
              </span>
              <span className="w-8 sm:w-10 h-[1.5px] bg-[#B07640]" />
            </div>
          </div>

          {/* 4 Clean Stats Cards — 2x2 grid on mobile for compactness, 4 cols on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {ACHIEVEMENTS.map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-white p-4 sm:p-7 text-center border border-amber-200/70 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-50 text-[#C06A3E] flex items-center justify-center mb-2.5 sm:mb-4">
                    <IconComp className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="font-serif text-2xl sm:text-4xl font-extrabold text-[#4A0E17] mb-1 sm:mb-2 tracking-tight">
                    {stat.number}
                  </div>
                  <p className="text-[11px] sm:text-sm text-[#6C565A] font-medium leading-snug">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          7. JOIN OUR MOVEMENT / DONATION SECTION — Replicated to match Reference Image
      ══════════════════════════════════════════════════════ */}
      <section id="donate" className="py-14 sm:py-20 lg:py-24 bg-[#FAF6F0] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Deep Maroon Banner Card */}
          <div className="rounded-[32px] bg-[#4E0E18] text-white shadow-2xl relative overflow-hidden border border-amber-900/30 p-4 sm:p-6 lg:p-7">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-4 relative z-10">

              {/* Left Column: Schoolboy Photo + "Your Support Builds Their Tomorrow" + Wave */}
              <div className="w-full lg:w-[38%] max-w-[430px] flex justify-center shrink-0">
                <img
                  src="/images/shiksha-sewa/donation-left-banner.png"
                  alt="Your Support Builds Their Tomorrow - Give them access to quality education, life skills and a brighter future"
                  className="w-full h-auto object-contain rounded-2xl select-none pointer-events-none drop-shadow-md"
                />
              </div>

              {/* Center Column: White/Cream Donation Form Card */}
              <div className="w-full lg:w-[42%] max-w-[430px] shrink-0">
                <div className="bg-[#FFFDF9] rounded-[28px] p-5 sm:p-6 lg:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.35)] text-center border border-amber-100 flex flex-col justify-between">
                  <div>
                    {/* Top Icon Badge: Golden circular badge with hands holding heart */}
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#FFF4D0] to-[#F5B544] border border-amber-300 shadow-md flex items-center justify-center mx-auto mb-2 text-[#4A0E17]">
                      <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-[#4A0E17]/25 text-[#4A0E17]" strokeWidth={2.2} />
                    </div>

                    {/* Title */}
                    <h3 className="font-serif font-bold text-2xl sm:text-[26px] text-[#4A0E17] tracking-tight leading-tight">
                      Join Our Movement
                    </h3>
                    <p className="text-xs text-[#7A5A60] mt-1">
                      Your contribution creates lasting impact.
                    </p>

                    {/* Golden Lotus Divider */}
                    <div className="flex items-center justify-center my-2 text-amber-500">
                      <PillarLotusIcon className="w-5 h-5 text-amber-500" />
                    </div>

                    {/* Choose Amount Section */}
                    <div className="text-left mt-3">
                      <span className="text-[10px] font-bold tracking-wider text-[#6B2D38] uppercase block mb-1.5">
                        CHOOSE AMOUNT
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        {DONATION_PRESETS.map((amt) => {
                          const isSelected = !isOther && selectedAmount === amt;
                          return (
                            <button
                              key={amt}
                              type="button"
                              onClick={() => {
                                setSelectedAmount(amt);
                                setIsOther(false);
                              }}
                              className={`py-2 px-1 rounded-xl text-xs sm:text-sm font-bold transition-all text-center border cursor-pointer ${
                                isSelected
                                  ? "bg-[#F5B544] text-[#4A0E17] border-[#E5A430] shadow-sm font-extrabold scale-[1.02]"
                                  : "bg-[#FDF9F3] hover:bg-[#F7EFE4] text-[#4A0E17] border-amber-200/80 hover:border-amber-300"
                              }`}
                            >
                              ₹{amt}
                            </button>
                          );
                        })}
                      </div>

                      {/* Custom amount toggle */}
                      {isOther ? (
                        <div className="mt-2 relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-xs">₹</span>
                          <input
                            type="number"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            placeholder="Enter custom amount"
                            className="w-full pl-7 pr-3 py-1.5 text-xs rounded-xl bg-white border border-amber-300 text-[#4A0E17] font-bold focus:outline-none focus:ring-1 focus:ring-amber-500"
                            autoFocus
                          />
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setIsOther(true)}
                          className="text-[10px] text-amber-800 hover:text-amber-950 font-semibold underline mt-1.5 block text-center w-full cursor-pointer"
                        >
                          Or enter custom amount
                        </button>
                      )}
                    </div>

                    {/* Choose Frequency Section */}
                    <div className="text-left mt-3">
                      <span className="text-[10px] font-bold tracking-wider text-[#6B2D38] uppercase block mb-1.5">
                        CHOOSE FREQUENCY
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setFrequency("monthly")}
                          className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all text-center border cursor-pointer ${
                            frequency === "monthly"
                              ? "bg-[#F5B544] text-[#4A0E17] border-[#E5A430] shadow-sm font-extrabold scale-[1.02]"
                              : "bg-[#FDF9F3] hover:bg-[#F7EFE4] text-[#4A0E17] border-amber-200/80 hover:border-amber-300"
                          }`}
                        >
                          Monthly
                        </button>
                        <button
                          type="button"
                          onClick={() => setFrequency("yearly")}
                          className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all text-center border cursor-pointer ${
                            frequency === "yearly"
                              ? "bg-[#F5B544] text-[#4A0E17] border-[#E5A430] shadow-sm font-extrabold scale-[1.02]"
                              : "bg-[#FDF9F3] hover:bg-[#F7EFE4] text-[#4A0E17] border-amber-200/80 hover:border-amber-300"
                          }`}
                        >
                          Yearly
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Donate Now Button */}
                  <div className="mt-4 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowPaymentModal(true)}
                      className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-[#4A0E17] via-[#5C131F] to-[#3B0910] hover:from-[#3B0910] hover:to-[#220409] text-white font-bold text-sm sm:text-base shadow-[0_8px_20px_rgba(74,14,23,0.38)] hover:shadow-xl hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer group"
                    >
                      <span>Donate Now</span>
                      <span className="w-6 h-6 rounded-full bg-[#F5B544] text-[#4A0E17] flex items-center justify-center ml-1 group-hover:translate-x-0.5 transition-transform">
                        <ArrowRight size={13} strokeWidth={2.5} />
                      </span>
                    </button>

                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 font-medium pt-2">
                      <Lock className="w-3.5 h-3.5 text-gray-400" />
                      <span>100% Secure Payment</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: 4 Feature Badges + "Small Support, Big Change" */}
              <div className="w-full lg:w-[20%] max-w-[210px] flex justify-center shrink-0">
                <img
                  src="/images/shiksha-sewa/donation-right-banner.png"
                  alt="Quality Education, Life Skills Development, Better Opportunities, Brighter Futures - Small Support, Big Change"
                  className="w-full max-w-[190px] lg:max-w-none h-auto object-contain rounded-2xl select-none pointer-events-none drop-shadow-md"
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Payment Details Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-amber-200 text-[#2C1810]">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-amber-50 hover:bg-amber-100 text-[#4A0E17] flex items-center justify-center transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="text-center pb-4 border-b border-amber-100">
              <span className="text-[11px] font-bold tracking-wider text-amber-700 uppercase">
                COMPLETE YOUR CONTRIBUTION
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#4A0E17] mt-0.5">
                Jhuggi Jhopadi Shiksha Sewa
              </h3>
              <div className="inline-block mt-2 px-4 py-1.5 rounded-full bg-amber-100/70 text-[#4A0E17] font-bold text-sm">
                Amount: ₹{isOther && customAmount ? customAmount : selectedAmount} ({frequency === "monthly" ? "Monthly" : "Yearly"})
              </div>
            </div>

            {/* Bank & UPI side-by-side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5 items-stretch">
              {/* Bank Details Card */}
              <div className="bg-[#FAF6F0] rounded-2xl p-4 border border-amber-200/60 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[#4A0E17] font-bold text-sm border-b border-amber-200/60 pb-2">
                    <HomeIcon className="w-4 h-4 text-[#4A0E17]" />
                    <span>Direct Bank Transfer</span>
                  </div>
                  <div className="text-[12px] space-y-1.5 text-[#473034] pt-2.5">
                    <p className="leading-snug">
                      <strong className="text-[#2C1810]">Account Name:</strong><br />
                      Jhuggi Jhopadi Shiksha Sewa Samiti
                    </p>
                    <p className="leading-snug">
                      <strong className="text-[#2C1810]">Bank:</strong> Bank of India<br />
                      <strong className="text-[#2C1810]">Branch:</strong> Harsuan, Ghaziabad
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <p className="font-mono text-[11px]">
                        <strong>A/C:</strong> 7111201100000139
                      </p>
                      <button
                        type="button"
                        onClick={() => handleCopy("7111201100000139", "acc")}
                        className="text-[10px] text-[#5E1522] hover:text-amber-800 flex items-center gap-1 font-bold px-2 py-0.5 rounded bg-white border border-amber-300 shadow-xs cursor-pointer"
                      >
                        {copiedField === "acc" ? (
                          <><Check className="w-3 h-3 text-green-600" /> Copied</>
                        ) : (
                          <><Copy className="w-3 h-3" /> Copy</>
                        )}
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-[11px]">
                        <strong>IFSC:</strong> BKID0007111
                      </p>
                      <button
                        type="button"
                        onClick={() => handleCopy("BKID0007111", "ifsc")}
                        className="text-[10px] text-[#5E1522] hover:text-amber-800 flex items-center gap-1 font-bold px-2 py-0.5 rounded bg-white border border-amber-300 shadow-xs cursor-pointer"
                      >
                        {copiedField === "ifsc" ? (
                          <><Check className="w-3 h-3 text-green-600" /> Copied</>
                        ) : (
                          <><Copy className="w-3 h-3" /> Copy</>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 italic pt-2 border-t border-amber-200/50 mt-2">
                  80(G) tax-exempt under IT Act 1962.
                </p>
              </div>

              {/* UPI QR Card */}
              <div className="bg-[#FAF6F0] rounded-2xl p-4 border border-amber-200/60 flex flex-col items-center justify-between text-center">
                <div className="font-bold text-sm text-[#4A0E17]">
                  Scan &amp; Pay with UPI
                </div>
                <div className="relative w-32 h-32 border-2 border-dashed border-amber-400 rounded-xl bg-white flex flex-col items-center justify-center p-2 my-2 shadow-xs">
                  <div className="absolute top-1 left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-[#4A0E17]" />
                  <div className="absolute top-1 right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-[#4A0E17]" />
                  <div className="absolute bottom-1 left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-[#4A0E17]" />
                  <div className="absolute bottom-1 right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-[#4A0E17]" />
                  <QrCode className="w-12 h-12 text-[#4A0E17]" />
                  <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wide mt-1">
                    UPI SCAN &amp; PAY
                  </span>
                </div>
                <p className="text-[11px] text-[#473034] font-medium">
                  Scan using GPay, PhonePe, Paytm or any UPI app.
                </p>
              </div>
            </div>

            <div className="text-center pt-4">
              <button
                type="button"
                onClick={() => setShowPaymentModal(false)}
                className="text-xs text-gray-500 hover:text-gray-800 font-semibold underline cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
