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

/* ─────────────────────────────────────────────
   MAIN SHIKSHA SEWA PAGE
───────────────────────────────────────────── */
export default function ShikshaSewaPage() {
  const [frequency, setFrequency] = useState<"monthly" | "yearly">("monthly");
  const [selectedAmount, setSelectedAmount] = useState<number>(500);
  const [isOther, setIsOther] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

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
              <button
                onClick={() => scrollTo("donate")}
                className="inline-flex items-center gap-2 sm:gap-2.5 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#EBA528] hover:bg-[#D9941C] text-[#3B0910] font-bold text-xs sm:text-sm shadow-lg shadow-amber-900/40 transition-all duration-200 active:scale-95"
              >
                <Heart className="w-4 h-4 fill-current" />
                <span>Join Our Movement</span>
                <ArrowRight className="w-4 h-4" />
              </button>
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

          {/* 3 Pillars Cards — Reference Screenshot Compositions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">

            {/* Card 1: EDUCATION (Horizontal on desktop, stacked on mobile; Boy 100% visible with full head and hair) */}
            <div className="group rounded-3xl bg-[#52121E] text-white overflow-hidden shadow-xl hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 flex flex-col sm:flex-row items-center justify-between min-h-[380px] sm:min-h-[400px] lg:min-h-[420px]">
              {/* Meditating Boy Photo — Full body and head fully visible with generous headroom */}
              <div className="relative w-full sm:w-[50%] flex items-center justify-center pt-7 pb-2 px-4 sm:p-0 sm:h-full sm:min-h-[320px] flex-shrink-0">
                <img
                  src="/images/shiksha-sewa/approach-education.png"
                  alt="Education"
                  className="w-auto h-56 sm:h-72 max-h-[280px] sm:max-h-none sm:w-full object-contain object-center sm:object-bottom pointer-events-none drop-shadow-xl"
                />
              </div>

              {/* Icon Badge + Heading + Description */}
              <div className="flex-1 p-5 sm:p-5 lg:p-6 text-left flex flex-col justify-center">
                {/* Cream Icon Badge */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FCECD8] shadow-md flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-105 transition-transform duration-300">
                  <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-[#52121E]" strokeWidth={2.2} />
                </div>
                <h3 className="font-sans text-lg sm:text-2xl font-bold tracking-wider uppercase text-white mb-2 sm:mb-2.5">
                  EDUCATION
                </h3>
                <p className="text-xs sm:text-[13px] text-white/90 leading-relaxed font-normal">
                  Providing access to quality schools, transportation and learning materials for life, especially to those children who live in Jhuggi Jhopadi's and never see the inside of a classroom.
                </p>
              </div>
            </div>

            {/* Card 2: VOCATION (Vertical composition: Schoolchildren top, Pure Golden-Orange bottom, Full Image, Badge on seam) */}
            <div className="group rounded-3xl bg-[#BF7428] text-white overflow-hidden shadow-xl hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between min-h-[380px] sm:min-h-[400px] lg:min-h-[420px] relative">
              {/* Top: Schoolchildren Photo covering full width — 16:9 on mobile so sides don't get cut */}
              <div className="relative w-full aspect-[16/10] sm:aspect-auto sm:h-64 overflow-hidden bg-[#BF7428]">
                <img
                  src="/images/shiksha-sewa/approach-vocation.png"
                  alt="Vocational Training"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Centered Cream Icon Badge Overlapping Seam */}
              <div className="absolute top-[40%] sm:top-64 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#FCECD8] shadow-xl flex items-center justify-center border-2 border-[#BF7428] group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 sm:w-7 sm:h-7 text-[#52121E]" strokeWidth={2.2} />
              </div>

              {/* Bottom: Golden-Orange Content Section — Pure Warm Tone */}
              <div className="flex-1 bg-[#BF7428] pt-8 sm:pt-10 pb-6 sm:pb-7 px-5 sm:px-7 text-center flex flex-col justify-center items-center">
                <h3 className="font-sans text-lg sm:text-2xl font-bold tracking-wider uppercase text-white mb-2">
                  VOCATION
                </h3>
                <p className="text-xs sm:text-[13px] text-white/95 leading-relaxed font-normal max-w-xs mx-auto">
                  Age-appropriate skills development preparing children for self-reliance and dignified livelihoods.
                </p>
              </div>
            </div>

            {/* Card 3: MEDITATION (New Group Image: All people clearly visible across width, Lotus Badge + Content) */}
            <div className="group rounded-3xl bg-[#52121E] text-white overflow-hidden shadow-xl hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between min-h-[380px] sm:min-h-[400px] lg:min-h-[420px] relative">
              {/* Upper Visual Area — Full width showing all children/people meditating */}
              <div className="relative w-full aspect-[16/10] sm:aspect-auto sm:h-64 overflow-hidden bg-[#52121E]">
                <img
                  src="/images/shiksha-sewa/approach-meditation.png"
                  alt="Meditation"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Cream Icon Badge on Top-Left */}
                <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-10 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#FCECD8] shadow-md flex items-center justify-center border-2 border-white/20 group-hover:scale-105 transition-transform duration-300">
                  <PillarLotusIcon className="w-6 h-6 sm:w-7 sm:h-7 text-[#52121E]" />
                </div>
              </div>

              {/* Content Area */}
              <div className="px-5 sm:px-7 pb-6 pt-4 sm:pt-5 text-left flex-1 flex flex-col justify-center bg-[#52121E]">
                <h3 className="font-sans text-lg sm:text-2xl font-bold tracking-wider uppercase text-white mb-2">
                  MEDITATION
                </h3>
                <p className="text-xs sm:text-[13px] text-white/90 leading-relaxed font-normal max-w-sm">
                  Mind power techniques that develop focus, emotional resilience, and inner strength.
                </p>
              </div>
            </div>

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
          7. JOIN OUR MOVEMENT / DONATION SECTION
      ══════════════════════════════════════════════════════ */}
      <section id="donate" className="py-14 sm:py-20 lg:py-28 bg-[#FFFDF9] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Deep Maroon Card Container */}
          <div className="rounded-3xl bg-[#521623] text-white p-5 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">

              {/* Left Column: Boy Photo (Frameless, background se connected) + Quote */}
              <div className="lg:col-span-3 flex items-center sm:items-end gap-3 sm:gap-4">
                {/* Image — NO frame card, seamlessly blended into maroon background with radial gradient mask */}
                <div className="flex-shrink-0 w-32 sm:w-36 lg:w-40 overflow-hidden">
                  <img
                    src="/images/shiksha-sewa/donation-schoolboy.png"
                    alt="Hopeful Schoolboy"
                    className="w-full h-auto object-contain pointer-events-none select-none"
                    style={{
                      display: "block",
                      maskImage: "radial-gradient(ellipse at 50% 48%, black 42%, transparent 75%)",
                      WebkitMaskImage: "radial-gradient(ellipse at 50% 48%, black 42%, transparent 75%)",
                    }}
                  />
                </div>
                <div className="font-serif italic text-amber-300 text-base sm:text-lg lg:text-xl font-bold leading-snug pb-2">
                  Your<br />Support<br />Builds<br />Their ♡<br />Tomorrow
                </div>
              </div>

              {/* Center Column: Donation Form (Exact match to Image 2) */}
              <div className="lg:col-span-4 space-y-4">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-1 tracking-tight">
                    Join Our Movement
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80">
                    Your contribution creates lasting impact.
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-bold text-amber-300 tracking-wider uppercase">
                    CHOOSE YOUR PREFERRED AMOUNT:
                  </p>

                  {/* Amount Grid — 2 columns × 2 lines (Pill buttons matching Image 2) */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { value: 500, label: "₹500" },
                      { value: 1100, label: "₹1100" },
                      { value: 2100, label: "₹2100" },
                      { value: 0, label: "Other Amount" },
                    ].map((opt, idx) => {
                      const isSelected =
                        opt.value === 0 ? isOther : selectedAmount === opt.value && !isOther;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            if (opt.value === 0) {
                              setIsOther(true);
                            } else {
                              setIsOther(false);
                              setSelectedAmount(opt.value);
                            }
                          }}
                          className={`py-2.5 px-4 rounded-full text-xs sm:text-sm font-bold border transition-all text-center ${
                            isSelected
                              ? "bg-[#EBA528] text-[#3B0910] border-[#EBA528] shadow-md scale-[1.02]"
                              : "bg-black/25 border-white/20 text-white hover:bg-white/10 hover:border-white/35"
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Amount Input if 'Other Amount' is selected */}
                  {isOther && (
                    <div className="pt-0.5">
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/70 font-semibold text-sm">₹</span>
                        <input
                          type="number"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          placeholder="Enter custom amount"
                          className="w-full pl-8 pr-4 py-2 rounded-full bg-black/30 border border-white/30 text-white text-xs sm:text-sm placeholder-white/50 focus:outline-none focus:border-amber-300"
                          autoFocus
                        />
                      </div>
                    </div>
                  )}

                  {/* Frequency Toggle — Monthly / Yearly in 1 row (Pill buttons matching Image 2) */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <button
                      type="button"
                      onClick={() => setFrequency("monthly")}
                      className={`py-2.5 px-4 rounded-full text-xs sm:text-sm font-bold transition-all text-center border ${
                        frequency === "monthly"
                          ? "bg-[#EBA528] text-[#3B0910] border-[#EBA528] shadow-md scale-[1.02]"
                          : "bg-black/25 border-white/20 text-white hover:bg-white/10 hover:border-white/35"
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      type="button"
                      onClick={() => setFrequency("yearly")}
                      className={`py-2.5 px-4 rounded-full text-xs sm:text-sm font-bold transition-all text-center border ${
                        frequency === "yearly"
                          ? "bg-[#EBA528] text-[#3B0910] border-[#EBA528] shadow-md scale-[1.02]"
                          : "bg-black/25 border-white/20 text-white hover:bg-white/10 hover:border-white/35"
                      }`}
                    >
                      Yearly
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Bank Details + UPI — LANDSCAPE (1 line side-by-side) */}
              <div className="lg:col-span-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 items-stretch">

                  {/* Bank Details Card */}
                  <div className="bg-white text-[#2C1810] rounded-2xl p-4 shadow-xl flex flex-col justify-between space-y-2">
                    <div>
                      <div className="flex items-center gap-1.5 text-[#4A0E17] font-bold text-sm border-b border-gray-100 pb-2">
                        <HomeIcon className="w-4 h-4 text-[#4A0E17] flex-shrink-0" />
                        <span>Bank Details</span>
                      </div>
                      <div className="text-[11px] space-y-1.5 text-[#473034] pt-2">
                        <p className="leading-tight">
                          <strong className="text-[#2C1810]">Account Name:</strong><br />
                          Jhuggi Jhopadi Shiksha Sewa Samiti
                        </p>
                        <p className="leading-tight">
                          <strong className="text-[#2C1810]">Bank:</strong> Bank of India<br />
                          <strong className="text-[#2C1810]">Branch:</strong> Harsuan, Ghaziabad
                        </p>
                        <div className="flex items-center justify-between pt-0.5">
                          <p className="font-mono text-[10px]">
                            <strong className="text-[#2C1810] font-sans">A/C:</strong> 7111201100000139
                          </p>
                          <button
                            type="button"
                            onClick={() => handleCopy("7111201100000139", "acc")}
                            className="text-[9px] text-[#5E1522] hover:text-amber-700 flex items-center gap-0.5 font-bold ml-1 px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200"
                            title="Copy Account Number"
                          >
                            {copiedField === "acc" ? (
                              <><Check className="w-2.5 h-2.5 text-green-600" /> Copied</>
                            ) : (
                              <><Copy className="w-2.5 h-2.5" /> Copy</>
                            )}
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="font-mono text-[10px]">
                            <strong className="text-[#2C1810] font-sans">IFSC:</strong> BKID0007111
                          </p>
                          <button
                            type="button"
                            onClick={() => handleCopy("BKID0007111", "ifsc")}
                            className="text-[9px] text-[#5E1522] hover:text-amber-700 flex items-center gap-0.5 font-bold ml-1 px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200"
                            title="Copy IFSC Code"
                          >
                            {copiedField === "ifsc" ? (
                              <><Check className="w-2.5 h-2.5 text-green-600" /> Copied</>
                            ) : (
                              <><Copy className="w-2.5 h-2.5" /> Copy</>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    <p className="text-[9px] text-[#7A6165] italic pt-1.5 border-t border-gray-100 leading-snug">
                      80(G) tax-exempt under IT Act 1962.
                    </p>
                  </div>

                  {/* Scan & Pay with UPI Card */}
                  <div className="bg-white text-[#2C1810] rounded-2xl p-4 shadow-xl flex flex-col items-center justify-between text-center space-y-2">
                    <div className="font-bold text-sm text-[#4A0E17]">
                      Scan & Pay with UPI
                    </div>
                    {/* QR Frame with scan brackets */}
                    <div className="relative w-28 h-28 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center justify-center p-1.5 group hover:border-[#4A0E17] transition-colors">
                      <div className="absolute top-1 left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-[#4A0E17]" />
                      <div className="absolute top-1 right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-[#4A0E17]" />
                      <div className="absolute bottom-1 left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-[#4A0E17]" />
                      <div className="absolute bottom-1 right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-[#4A0E17]" />
                      <QrCode className="w-10 h-10 text-[#4A0E17]/85 mb-0.5" />
                      <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wide text-center leading-tight">
                        QR CODE<br />PLACEHOLDER
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6B5357] font-medium leading-tight">
                      Scan & Pay with any UPI app.
                    </p>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
