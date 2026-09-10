"use client";

import Link from "next/link";
import {
  GraduationCap,
  Brain,
  UtensilsCrossed,
  Building2,
  Heart,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Users,
  CheckCircle2,
} from "lucide-react";
import { RAZORPAY_DONATION_LINK } from "@/lib/payment-links";

const INITIATIVES = [
  {
    icon: GraduationCap,
    title: "Shiksha Sewa",
    tagline: "Har Ghar Shiksha — Young Mind Movement",
    achieved: 300000,
    goal: 1000000,
    donateUrl: RAZORPAY_DONATION_LINK,
    knowMoreSlug: "shiksha-sewa",
    image: "https://sciencedivine.org/wp-content/uploads/2025/04/WhatsApp-Image-2025-04-04-at-1.02.45-PM.jpeg",
    imagePosition: "center 25%",
    desc: "Every child deserves the light of wisdom. Through Shiksha Sewa, we sponsor underprivileged children with free education, books, values, and holistic grooming.",
    bulletPoints: [
      "Free education, school fees & stationery for needy children",
      "Moral values, mindfulness, and personality development",
      "Breaking the cycle of generational poverty",
      "Building a conscious and self-reliant next generation",
    ],
  },
  {
    icon: Brain,
    title: "Dhyan Sewa",
    tagline: "Spreading the Gift of Meditation & Inner Peace",
    achieved: 500000,
    goal: 1000000,
    donateUrl: RAZORPAY_DONATION_LINK,
    knowMoreSlug: "dhyan-sewa",
    image: "https://sciencedivine.org/wp-content/uploads/2023/06/young-img1.jpg",
    imagePosition: "center 15%",
    desc: "Meditation is the universal doorway to health and joy. Dhyan Sewa organizes free community meditation workshops, youth camps, and stress-relief camps.",
    bulletPoints: [
      "Free public meditation and pranayama camps",
      "Practical techniques to dissolve stress, panic & anxiety",
      "Mind Power Meditation workshops in schools & colleges",
      "Awakening collective peace and social harmony",
    ],
  },
  {
    icon: UtensilsCrossed,
    title: "Annapurna Sewa",
    tagline: "Nourishing Communities — Food for All",
    achieved: 350000,
    goal: 1000000,
    donateUrl: RAZORPAY_DONATION_LINK,
    knowMoreSlug: "annapurna-sewa",
    image: "https://sciencedivine.org/wp-content/uploads/2024/04/gospelforasia-RT18-03070.jpeg",
    imagePosition: "center 20%",
    desc: "No soul should sleep hungry. Annapurna Sewa runs community kitchens offering hot, nutritious, hygienic meals to the needy, sadhus, and destitute families.",
    bulletPoints: [
      "Daily distribution of wholesome, nutritious cooked meals",
      "Serving with unconditional love, respect, and dignity",
      "Reaching daily wage earners and impoverished families",
      "Serving humanity as the purest offering to the Divine",
    ],
  },
  {
    icon: Building2,
    title: "Nirman Sewa",
    tagline: "Spiritual Retreat & Meditation Ashrams",
    achieved: 700000,
    goal: 1000000,
    donateUrl: RAZORPAY_DONATION_LINK,
    knowMoreSlug: "nirman-sewa",
    image: "https://sciencedivine.org/wp-content/uploads/2023/06/2.jpg",
    imagePosition: "center center",
    desc: "Building and maintaining sacred spaces like Sakshi Dhaam (Ghaziabad & Vrindavan) where thousands come to meditate, heal, and experience spiritual awakening.",
    bulletPoints: [
      "Developing state-of-the-art Dhyan Kendras & retreat halls",
      "Free stay and accommodation for serious spiritual seekers",
      "Hosting annual spiritual mahotsavs and live satsangs",
      "Sanctuaries of peace, energy, and deep transformation",
    ],
  },
];

const IMPACT_STATS = [
  { value: "10,000+", label: "Children Educated", desc: "Through Har Ghar Shiksha" },
  { value: "500,000+", label: "Meals Served", desc: "Via Annapurna Sewa" },
  { value: "120+", label: "Free Dhyan Camps", desc: "Across India & Abroad" },
  { value: "2 Dhaams", label: "Sakshi Dhaam Centers", desc: "Ghaziabad & Vrindavan" },
];

const GALLERY = [
  {
    url: "https://sciencedivine.org/wp-content/uploads/2025/03/AAP_0044-1-1.webp",
    caption: "Empowering Underprivileged Children",
  },
  {
    url: "https://sciencedivine.org/wp-content/uploads/2025/02/3-1.png",
    caption: "Annapurna Kitchen Distribution",
  },
  {
    url: "https://sciencedivine.org/wp-content/uploads/2025/04/WhatsApp-Image-2025-04-04-at-1.02.45-PM.jpeg",
    caption: "Har Ghar Shiksha Classes",
  },
  {
    url: "https://sciencedivine.org/wp-content/uploads/2025/02/3.webp",
    caption: "Community Meditation Camps",
  },
  {
    url: "https://sciencedivine.org/wp-content/uploads/2025/02/4-1.png",
    caption: "Sakshi Dhaam Spiritual Gathering",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-[#FCFBF8] text-slate-800 font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* ========================================================================= */}
      {/* 🌟 1. HERO HEADER SECTION (Warm Sacred Ivory & Gold Aura) */}
      {/* ========================================================================= */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-[#FFFDF9] via-[#FFF8EB] to-[#FFF4DE] text-[#521623] overflow-hidden border-b border-[#E8C969]/40">
        {/* Background Sacred Aura Orbs & Glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-[#F59E0B]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="container-page relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF4CF] border border-[#E8C969] mb-6 shadow-sm">
                <Heart size={14} className="text-[#D4AF37] animate-pulse" />
                <span className="text-[#521623] text-xs font-bold tracking-wider uppercase">
                  Science Divine Foundation
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#521623] leading-tight tracking-tight mb-5">
                Our Initiatives <br />
                <span className="bg-gradient-to-r from-[#D7A316] via-[#B8860B] to-[#D7A316] bg-clip-text text-transparent">
                  Enriching Lives with Compassion
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-[#634E50] leading-relaxed font-medium max-w-2xl mb-8">
                Empowering Education, Nourishing Communities, and Ensuring Holistic Wellbeing
                under the divine guidance of <strong className="text-[#521623] font-semibold">Sakshi Shree</strong>.
              </p>

              {/* Pillars Banner */}
              <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm font-semibold text-[#8B6914] pt-2 border-t border-[#E8C969]/40">
                <span>Sound Body</span>
                <span className="text-[#D4AF37]">•</span>
                <span>Sound Mind</span>
                <span className="text-[#D4AF37]">•</span>
                <span>Self Realization</span>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
                <img
                  src="https://sciencedivine.org/wp-content/uploads/2025/03/AAP_0044-1-1.webp"
                  alt="Science Divine Initiatives"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FFF4CF] backdrop-blur-md text-[11px] font-bold text-[#521623] mb-1 border border-[#E8C969]">
                    <Sparkles size={11} className="text-[#D4AF37]" />
                    Har Ghar Shiksha
                  </span>
                  <p className="text-xs text-slate-100 font-medium">
                    Transforming underprivileged lives with values &amp; knowledge.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 📊 2. IMPACT STATS COUNTER STRIP */}
      {/* ========================================================================= */}
      <section className="relative z-20 -mt-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl shadow-lg border border-[#E8C969]/70 p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center" style={{ backgroundColor: "#FFFDF9" }}>
          {IMPACT_STATS.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#521623] font-serif">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#B8860B] uppercase tracking-wider">
                {stat.label}
              </div>
              <div className="text-[11px] text-[#634E50] font-medium">
                {stat.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ☸️ 3. SACRED MOVEMENT PHILOSOPHY INTRO */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 bg-[#FFFDF9] relative">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF4CF] text-[#521623] font-bold text-xs tracking-wider uppercase border border-[#E8C969]">
            <Sparkles size={13} className="text-[#D4AF37]" />
            <span>A Living Movement of Transformation</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#521623] leading-tight">
            Have you experienced the divine grace of Sakshi Shree?
          </h2>

          <p className="text-[#634E50] text-base sm:text-lg leading-relaxed font-medium">
            Do you wish his transformative wisdom, meditation techniques, and unconditional compassion
            to touch millions of seekers and underprivileged families worldwide?
          </p>

          <p className="text-[#634E50] text-sm sm:text-base leading-relaxed max-w-3xl mx-auto font-medium">
            Sakshi Shree walks this path selflessly for all. The teachings, the energy, and the spiritual awakening
            reach seekers everywhere through tireless sewa. Your support and seva ensure that this divine mission
            reaches every home — spreading peace, health, and enlightenment.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🌟 4. CORE INITIATIVES CARDS (Rich UI/UX Cards) */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#FBF8F2] to-[#FAF6EE] relative">
        <div className="container-page">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900">
              Our Active Sewa Projects
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Join hands with Science Divine Foundation in creating a conscious, healthy, and educated society.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {INITIATIVES.map((init, idx) => {
              const percent = Math.min(100, Math.round((init.achieved / init.goal) * 100));
              const IconComp = init.icon;

              return (
                <div
                  key={idx}
                  className="rounded-3xl overflow-hidden border border-[#E8C969]/80 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group"
                  style={{ backgroundColor: "#FFFDF9" }}
                >
                  {/* Top Image & Badge */}
                  <div className="relative h-48 overflow-hidden bg-[#FFFBF2]">
                    <img
                      src={init.image}
                      alt={init.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      style={{ objectPosition: init.imagePosition }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#521623]/80 via-[#521623]/25 to-transparent pointer-events-none" />

                    {/* Icon Badge */}
                    <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-[#FFF4CF] border border-[#E8C969] text-[#521623] flex items-center justify-center shadow-md">
                      <IconComp size={20} />
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[10px] font-bold text-[#F5C445] tracking-wider uppercase block drop-shadow-sm">
                        {init.tagline}
                      </span>
                      <h3 className="font-serif text-xl font-bold leading-tight text-white drop-shadow-md">
                        {init.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4" style={{ backgroundColor: "#FFFDF9" }}>
                    <div className="space-y-3">
                      <p className="text-xs text-[#533C3F] leading-relaxed font-medium">
                        {init.desc}
                      </p>

                      {/* Bullet Highlights */}
                      <ul className="space-y-2 pt-1">
                        {init.bulletPoints.map((bp, bpi) => (
                          <li
                            key={bpi}
                            className="flex items-start gap-2 text-[11.5px] text-[#4E1321] font-semibold leading-tight"
                          >
                            <CheckCircle2 size={14} className="text-[#C79A2E] shrink-0 mt-0.5" />
                            <span>{bp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Progress Bar & Buttons */}
                    <div className="pt-3 border-t border-[#E8C969]/40 space-y-3">
                      <div>
                        <div className="flex justify-between text-[11px] font-bold text-[#521623] mb-1.5">
                          <span>₹{init.achieved.toLocaleString()}</span>
                          <span className="text-[#B8860B]">{percent}%</span>
                          <span>₹{init.goal.toLocaleString()}</span>
                        </div>
                        <div className="w-full h-2.5 bg-[#FFF4CF] border border-[#E8C969]/50 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#D7A316] to-[#F59E0B] rounded-full transition-all duration-700"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5 pt-1">
                        <a
                          href={init.donateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-center py-2.5 px-3 rounded-full bg-gradient-to-r from-[#D7A316] to-[#C48F0A] hover:from-[#C48F0A] hover:to-[#B8860B] text-[#521623] text-xs font-bold shadow-sm transition-all active:scale-95 flex items-center justify-center gap-1.5"
                        >
                          <Heart size={13} className="fill-[#521623]" />
                          <span>Donate</span>
                        </a>
                        <Link
                          href={`/${init.knowMoreSlug}` as any}
                          className="text-center py-2.5 px-3 rounded-full bg-white hover:bg-[#FFF4CF] text-[#521623] text-xs font-bold transition-all border-2 border-[#521623] flex items-center justify-center"
                        >
                          Know More
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 📸 5. LIVE SEWA GALLERY SLIDER */}
      {/* ========================================================================= */}
      <section className="py-16 bg-[#FFFDF9] border-y border-[#E8C969]/50">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-[#B8860B] tracking-wider uppercase block">
                Moments of Compassion
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#521623]">
                Ground Reality &amp; Sewa Gallery
              </h2>
            </div>
            <p className="text-xs text-[#634E50] max-w-sm mt-2 sm:mt-0 font-medium">
              Photographs capturing education, free food distribution, and community empowerment.
            </p>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
            {GALLERY.map((g, i) => (
              <div
                key={i}
                className="relative min-w-[260px] sm:min-w-[300px] h-64 sm:h-72 rounded-2xl overflow-hidden shadow-md group shrink-0 bg-[#FFFBF2] border border-[#E8C969]/40"
              >
                <img
                  src={g.url}
                  alt={g.caption}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#521623]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs font-bold drop-shadow-md text-amber-100">{g.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🤝 6. CALL TO ACTION BANNER */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#FFFDF9] via-[#FFF8EB] to-[#FFF3DC] border-t border-[#E8C969]/60 text-[#521623] relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#521623] leading-tight">
            Be a Part of the Divine Mission
          </h2>

          <p className="text-[#634E50] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium">
            Your generous contribution or volunteer support brings food to the hungry, education to underprivileged
            children, and peaceful meditation to millions of souls.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={RAZORPAY_DONATION_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D7A316] to-[#C48F0A] hover:from-[#C48F0A] hover:to-[#B8860B] text-[#521623] font-bold text-sm shadow-lg transition-all transform hover:scale-105 active:scale-95"
            >
              Donate Now via Razorpay
            </a>
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full bg-white hover:bg-[#FFF4CF] text-[#521623] font-bold text-sm border-2 border-[#521623] shadow-sm transition-all"
            >
              Volunteer with Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
