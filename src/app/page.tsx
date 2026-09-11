"use client";
import Link from "next/link";

import * as React from "react";
import { SectionHeading } from "@/components/PageHero";
import { YouTubeThumb } from "@/components/YouTubeEmbed";
import { Counter } from "@/lib/useCounter";
import { RAZORPAY_DONATION_LINK } from "@/lib/payment-links";
import TextType from "@/components/ui/TextType";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import GlareHover from "@/components/ui/GlareHover";
import SolutionsCarousel from "@/components/SolutionsCarousel";
import ExclusiveContentCard from "@/components/ExclusiveContentCard";
import MarqueeTestimonials from "@/components/ui/marquee-card";
import { TestimonialMarquee } from "@/components/marquee";
import CinematicIntro from "@/components/CinematicIntro";
import {
  COURSES,
  EVENTS,
  TESTIMONIALS,
  TESTIMONIAL_VIDEOS,
  SOCIALS,
  LEADERS,
} from "@/data/content";
import { ArrowRight, Calendar, MapPin, Clock, Heart, BookOpen, Droplets, Sparkles, Users, User, Mail, MessageCircle } from "lucide-react";
import { Facebook, Youtube, Instagram, Linkedin } from "@/components/SocialIcons";






const BLOG_POSTS = [
  {
    title: "Does Spirituality Require Renouncement of Materialism?",
    href: "https://sciencedivine.org/spirituality-and-materialism/",
    excerpt: "Exploring the balance between material life and spiritual awakening.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    alt: "Balance between materialism and spirituality - peaceful lotus meditation",
  },
  {
    title: "Spiritual Enlightenment: The Science of Breathing",
    href: "https://sciencedivine.org/the-science-of-breathing/",
    excerpt: "Ancient breath techniques that transform body and mind.",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80",
    alt: "Science of breathing - pranayama meditation in tranquil nature",
  },
  {
    title: "Is the Law of Attraction a Myth?",
    href: "https://sciencedivine.org/power-of-law-of-attraction/",
    excerpt: "A scientific and spiritual look at manifestation and intention.",
    image: "/law-of-attraction.png",
    alt: "Law of attraction - intentions journal and manifestation desk at sunset",
  },
  {
    title: "Power Of Spirituality In Self Discovery",
    href: "https://sciencedivine.org/power-of-spirituality-in-self-discovery/",
    excerpt: "How spiritual practices unlock your deepest potential.",
    image: "/spirituality-self-discovery.png",
    alt: "Power of spirituality in self discovery - meditation by serene lake at sunrise",
  },
  {
    title: "Master Your Own Fate",
    href: "https://sciencedivine.org/master-your-own-fate/",
    excerpt: "Taking conscious control of your destiny through awareness.",
    image: "/master-your-own-fate.jpg",
    alt: "Master your own fate - scenic sunrise mountain overview with compass",
  },
  {
    title: "Easy Habits That Can Change Your Life In a Month",
    href: "https://sciencedivine.org/habits-that-can-change-your-life/",
    excerpt: "Simple daily practices for lasting transformation.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    alt: "Easy habits that change your life - morning wellness meditation routine",
  },
];

const FEATURE_CARDS = [
  {
    title: "Sound Body",
    desc: "Physical vitality through yoga, breath, and conscious movement.",
    image: "/feature-sound-body.png",
    alt: "Graceful outdoor yoga practice at sunrise with golden light and vitality",
  },
  {
    title: "Sound Mind",
    desc: "Mental clarity through meditation and mindfulness practice.",
    image: "/feature-sound-mind.png",
    alt: "Peaceful meditation in serene nature with morning mist and stillness",
  },
  {
    title: "Self Realization",
    desc: "Spiritual awakening under Sakshi Shree's direct guidance.",
    image: "/feature-self-realization.png",
    alt: "Spiritual awakening on mountain peak overlooking golden sunrise landscape",
  },
];
function LensImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={
        className ??
        "h-full w-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
      }
    />
  );
}
function LotusIcon({ size = 20, color = "#C9910B", className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3C12 3 8 8 8 13C8 17.4183 9.79086 21 12 21C14.2091 21 16 17.4183 16 13C16 8 12 3 12 3Z" />
      <path d="M12 21C7.5 21 3 18.5 3 14C3 10.5 7 8 10 9.5" />
      <path d="M12 21C16.5 21 21 18.5 21 14C21 10.5 17 8 14 9.5" />
    </svg>
  );
}

export default function Page() {
  return (
    <>
      <CinematicIntro />
      {/* ════════════════════════════════════
          HERO SECTION ,  DIVINE LIVING REDESIGN
      ════════════════════════════════════ */}
      <section className="hero-sunrise-bg relative overflow-hidden min-h-[540px] sm:min-h-[560px] md:min-h-[600px] pt-8 sm:pt-12 md:pt-14 pb-0 lg:py-0 lg:min-h-[640px] xl:min-h-[670px] flex flex-col justify-between lg:flex-row lg:items-center bg-[#fffaf0]" style={{
        backgroundImage: "url('/hero-sunrise-mountains.png')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}>
        <style>{`
          .hero-badge-title {
            font-family: 'Cormorant Garamond', Georgia, serif;
            color: #521623;
            font-size: 1.35rem;
            font-weight: 600;
            line-height: 1.1;
          }
          .hero-main-title {
            font-family: 'Cormorant Garamond', Georgia, serif;
            font-size: clamp(22px, 5.5vw, 54px);
            line-height: 1.15;
            font-weight: 600;
            letter-spacing: -0.02em;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
          }
          .hero-tagline {
            font-family: 'Cormorant Garamond', Georgia, serif;
            color: rgba(93, 59, 54, 0.95);
            font-size: clamp(1rem, 2.8vw, 1.4rem);
            font-weight: 600;
            line-height: 1.25;
            -webkit-font-smoothing: antialiased;
          }
          .hero-copy {
            width: 100%;
            max-width: 100%;
            color: #4a403e;
            font-size: 1.02rem;
            line-height: 1.6;
            font-weight: 450;
            -webkit-font-smoothing: antialiased;
          }
          @media (min-width: 1024px) {
            .hero-copy {
              max-width: 540px;
            }
          }
          .btn-explore {
            background: #521623;
            color: #ffffff;
            padding: 13px 26px;
            border-radius: 8px;
            font-weight: 700;
            font-size: 0.85rem;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 14px rgba(82, 22, 35, 0.25);
          }
          .btn-explore:hover {
            background: #3B0F19;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(82, 22, 35, 0.35);
          }
          .btn-experience {
            background: rgba(255, 255, 255, 0.95);
            border: 1.5px solid #D4AF37;
            color: #521623;
            padding: 13px 26px;
            border-radius: 8px;
            font-weight: 700;
            font-size: 0.85rem;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            transition: all 0.3s ease;
          }
          .btn-experience:hover {
            background: #FFFDF7;
            border-color: #B8860B;
            transform: translateY(-2px);
          }
          .hero-sunrise-wash {
            background: linear-gradient(90deg, rgba(255,253,247,0.96) 0%, rgba(255,253,247,0.88) 45%, rgba(255,253,247,0.25) 75%, rgba(255,253,247,0.05) 100%);
          }
          @media (max-width: 1023px) {
            .hero-sunrise-bg {
              background-position: 50% 100% !important;
              background-size: cover !important;
            }
            .hero-sunrise-wash {
              background: linear-gradient(180deg, rgba(255,253,247,0.92) 0%, rgba(255,253,247,0.78) 32%, rgba(255,253,247,0.15) 62%, rgba(255,253,247,0.0) 100%);
            }
            .about-section-bg {
              background-position: center bottom !important;
              background-size: cover !important;
            }
          }
          .quick-action-bar {
            position: fixed;
            right: 6px;
            top: 52%;
            transform: translateY(-50%);
            z-index: 50;
            background: rgba(255, 255, 255, 0.96);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1.5px solid rgba(212, 175, 55, 0.45);
            border-radius: 24px;
            box-shadow: 0 10px 32px rgba(82, 22, 35, 0.16);
            width: 78px;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 4px 2px;
          }
          @media (min-width: 640px) {
            .quick-action-bar {
              right: 12px;
              width: 86px;
              padding: 8px 4px;
            }
          }
          @media (min-width: 1024px) {
            .quick-action-bar {
              right: 16px;
              width: 92px;
              padding: 10px 4px;
            }
          }
          .quick-action-bar a {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 7px 2px !important;
            border: none !important;
            border-bottom: 1px solid rgba(212, 175, 55, 0.25) !important;
          }
          .quick-action-bar a:last-child {
            border-bottom: none !important;
          }
          .quick-action-bar a span {
            font-size: 9px !important;
            line-height: 1.15 !important;
            font-weight: 700 !important;
            color: #4E1321 !important;
            white-space: normal !important;
          }
          @media (min-width: 640px) {
            .quick-action-bar a span {
              font-size: 10px !important;
            }
          }
          .quick-action-bar a svg {
            width: 19px !important;
            height: 19px !important;
            margin-bottom: 3px !important;
            color: #4E1321 !important;
          }
        `}</style>

        {/* Luminous Golden Yellow Sunrise Halo & Cloud Glow */}
        <div
          className="hero-golden-sun-glow absolute right-2 lg:right-10 xl:right-16 top-2 lg:top-6 w-[280px] sm:w-[380px] md:w-[520px] h-[280px] sm:h-[380px] md:h-[520px] rounded-full blur-[60px] md:blur-[80px] opacity-65 pointer-events-none z-0"
          style={{
            background: "radial-gradient(circle, rgba(255, 210, 60, 0.75) 0%, rgba(245, 170, 30, 0.35) 45%, transparent 75%)",
          }}
        />

        <div className="hero-sunrise-wash absolute inset-0 pointer-events-none" />

        <div className="container-page pt-6 sm:pt-8 lg:pt-10 lg:pb-12 pb-0 relative z-10 w-full flex items-center justify-start">
          <div className="grid lg:grid-cols-12 gap-8 items-center w-full">

            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5 relative z-10 pt-2 lg:pt-4">

              {/* Main Heading */}
              <h1 className="hero-main-title">
                <span className="block text-[#521623] lg:whitespace-nowrap">Awaken the Divine Within,</span>
                <span className="block text-[#B8860B] lg:whitespace-nowrap">Transform the World Around.</span>
              </h1>

              {/* Subheading / Tagline */}
              <p className="hero-tagline italic">
                The Science of Awareness for a Conscious Life.
              </p>

              {/* Body Text */}
              <p className="hero-copy font-normal">
                Science Divine is a non-profit organisation dedicated to spreading the timeless wisdom of <span className="font-medium text-amber-950">Awareness (Sakshi Bhav)</span> and <span className="font-medium text-amber-950">Bhagavad Gita</span> for a better, conscious & compassionate world.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2 w-full sm:w-auto">
                <Link href="#teachings" className="btn-explore w-full sm:w-auto">
                  EXPLORE THE TEACHINGS <ArrowRight size={16} />
                </Link>
                <Link href="#events" className="btn-experience w-full sm:w-auto">
                  JOIN AN EXPERIENCE <Calendar size={16} className="text-[#B8860B]" />
                </Link>
              </div>

              {/* Mobile Portrait attached flush to bottom edge */}
              <div className="lg:hidden mt-8 flex flex-col items-center w-full">
                <div className="relative max-w-[360px] sm:max-w-[440px] w-full flex flex-col items-center">
                  <img
                    src="/sakshi-shree-hero-portrait.png"
                    alt="Sadguru Sakshi Shree"
                    className="w-full h-auto max-h-[480px] sm:max-h-[560px] object-contain object-bottom block -mb-1 drop-shadow-[0_16px_22px_rgba(55,35,20,0.18)]"
                  />
                  {/* Founder Badge staying strictly on white cloth, never touching background, text 100% inside card */}
                  <div className="absolute bottom-2.5 left-[10%] sm:left-[12%] z-20 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-[#B8860B]/40 shadow-md flex flex-col items-start text-left w-[124px] overflow-hidden">
                    <div className="flex items-center gap-1 w-full">
                      <Heart size={8.5} className="text-[#C79A2E] fill-[#C79A2E] shrink-0" />
                      <h4 className="font-serif text-[9.5px] font-bold text-[#521623] leading-tight truncate">
                        Sadguru Sakshi Shree
                      </h4>
                    </div>
                    <p className="text-[7px] text-amber-950/85 font-semibold tracking-tight leading-tight pt-0.5 truncate w-full">
                      Founder, Science Divine Foundation
                    </p>
                    <img
                      src="/signature.png"
                      alt="Sakshi Shree Signature"
                      className="h-3.5 w-auto object-contain pt-0.5 mix-blend-multiply opacity-95"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Desktop Spacer Column */}
            <div className="lg:col-span-5 hidden lg:block" aria-hidden="true" />

          </div>
        </div>

        {/* Desktop Portrait attached flush to section bottom with generous breathing space on the right */}
        <div className="hidden lg:flex absolute bottom-0 right-[116px] lg:right-[124px] xl:right-[140px] 2xl:right-[168px] z-10 items-end pointer-events-none">
          <div className="relative flex items-end max-w-[440px] xl:max-w-[500px] 2xl:max-w-[540px]">
            <img
              src="/sakshi-shree-hero-portrait.png"
              alt="Sadguru Sakshi Shree"
              className="w-full h-auto max-h-[580px] xl:max-h-[640px] 2xl:max-h-[670px] object-contain object-bottom block drop-shadow-[0_16px_24px_rgba(55,35,20,0.18)]"
            />
            {/* Founder Badge Attached directly over lower left white robe, safely clear of hand */}
            <div className="absolute bottom-2 lg:bottom-2.5 left-[16%] xl:left-[18%] z-20 pointer-events-auto">
              <div className="space-y-0.5 text-left border-b border-[#B8860B]/60 pb-1 w-[145px] sm:w-[155px]">
                <div className="flex items-center gap-1">
                  <Heart size={11} className="text-[#C79A2E] fill-[#C79A2E] shrink-0" />
                  <h4 className="font-serif text-xs font-semibold text-[#521623] leading-tight whitespace-nowrap">
                    Sadguru Sakshi Shree
                  </h4>
                </div>
                <p className="text-[9px] text-amber-950/80 font-medium tracking-tight leading-tight pl-0.5 whitespace-nowrap">
                  Founder, Science Divine Foundation
                </p>
                <img
                  src="/signature.png"
                  alt="Sakshi Shree Signature"
                  className="h-5 w-auto object-contain pt-0.5 mix-blend-multiply opacity-90"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          EXPLORE YOUR INNER JOURNEY
      ════════════════════════════════════ */}
      <section className="py-8 sm:py-10 md:py-14 lg:py-16 relative overflow-hidden bg-[#FAF7F2]">
        <div className="container-page text-center relative z-10">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C79A2E] block mb-1.5">
            EXPLORE YOUR
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#4E1321] mb-6 sm:mb-8 md:mb-10">
            Inner Journey
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 justify-items-center [&>*:last-child]:col-span-2 sm:[&>*:last-child]:col-span-1 lg:[&>*:last-child]:col-span-1">
            {[
              {
                title: "Awareness",
                subtitle: "Sakshi Bhav",
                href: "/about",
                icon: (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#4E1321" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ),
              },
              {
                title: "Wisdom",
                subtitle: "Bhagavad Gita",
                href: "/courses",
                icon: <BookOpen size={24} className="text-[#4E1321]" />,
              },
              {
                title: "Practice",
                subtitle: "Sakshi Sadhna",
                href: "/practices",
                icon: (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#4E1321" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                ),
              },
              {
                title: "Purpose",
                subtitle: "Conscious Living",
                href: "/about-movement",
                icon: (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#4E1321" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg>
                ),
              },
              {
                title: "Seva",
                subtitle: "Serving Humanity",
                href: "/initiatives",
                icon: <Heart size={24} className="text-[#4E1321]" />,
              },
            ].map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1.5"
              >
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white border-2 border-[#D4AF37] shadow-md flex items-center justify-center mb-3 transition-shadow group-hover:shadow-lg group-hover:border-[#B8860B]">
                  {item.icon}
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#4E1321] mb-0.5 group-hover:text-[#B8860B] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs font-medium text-[#8B6914] mb-1">
                  {item.subtitle}
                </p>
                <span className="text-xs text-[#C79A2E] transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          ABOUT SCIENCE DIVINE MOVEMENT
      ════════════════════════════════════ */}
      <section className="about-section-bg relative overflow-hidden min-h-[520px] sm:min-h-[560px] md:min-h-[600px] lg:min-h-[640px] xl:min-h-[690px] pt-10 sm:pt-14 lg:pt-20 pb-0 lg:pb-0 bg-cover flex flex-col justify-between" style={{
        backgroundImage: "url('/about-section-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}>
        {/* Gradient overlay — keeps text readable while letting scenic mountains & temple background show vibrantly */}
        <div className="absolute inset-0 pointer-events-none z-0"
          style={{ background: "linear-gradient(160deg, rgba(255,250,242,0.85) 0%, rgba(255,250,242,0.60) 35%, rgba(255,250,242,0.25) 70%, transparent 100%)" }}
        />

        <div className="container-page pb-0 relative z-10 h-full flex flex-col justify-between flex-1">
          <div className="grid lg:grid-cols-12 gap-8 items-start flex-1">
            <div className="lg:col-span-7 xl:col-span-7 space-y-5 relative z-20 pb-2 lg:pb-12">
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C79A2E] block">
                ABOUT SCIENCE DIVINE
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[3.25rem] font-bold text-[#4E1321] leading-[1.12]">
                Science Divine Movement
              </h2>
              <p className="text-gray-700 leading-relaxed font-medium text-base sm:text-lg max-w-full lg:max-w-2xl">
                The Science Divine Movement is a global initiative helping people realize their optimum
                potential through definite scientific techniques for sound body, sound mind, and self-realization.
                Founded by enlightened spiritual master Sakshi Shree, it simplifies spirituality to become an
                integral part of everyday life, freeing humanity from ideologies and belief systems that have divided us through the ages.
              </p>
              <p className="text-gray-700 leading-relaxed font-medium text-base sm:text-lg max-w-full lg:max-w-2xl">
                Our fundamental maxim is <span className="font-serif italic font-semibold text-[#8B6914] text-lg lg:text-xl">&quot;Bheetar se sanyaas, bahar se sansaar&quot;</span> – total participation in worldly life while enjoying complete inner renunciation.
              </p>
              <div className="pt-3">
                <Link
                  href="/about-movement"
                  className="inline-flex items-center gap-2 font-bold text-sm text-[#4E1321] hover:text-[#B8860B] transition-colors"
                >
                  Know Sakshi Shree <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Desktop Spacer Column */}
            <div className="lg:col-span-5 xl:col-span-5 hidden lg:block" />
          </div>

          {/* Mobile Portrait placed flush at section bottom without empty space underneath */}
          <div className="lg:hidden mt-4 flex justify-center w-full relative z-20 -mb-1">
            <img
              src="/about-sakshi-shree-user.png"
              alt="Sadguru Sakshi Shree"
              className="w-full max-w-[340px] sm:max-w-[400px] h-auto object-contain object-bottom block drop-shadow-[0_16px_28px_rgba(40,20,10,0.18)]"
            />
          </div>
        </div>

        {/* Desktop Portrait — absolutely positioned at bottom right */}
        <img
          src="/about-sakshi-shree-user.png"
          alt="Sadguru Sakshi Shree"
          className="hidden lg:block absolute bottom-0 right-0 lg:right-10 xl:right-14
            w-auto lg:max-w-[520px] lg:max-h-[96%]
            xl:max-w-[600px] xl:max-h-[100%]
            h-auto object-contain object-bottom z-10 pointer-events-none
            drop-shadow-[0_24px_36px_rgba(40,20,10,0.18)]"
        />
      </section>

      {/* ════════════════════════════════════
          SOUND BODY, SOUND MIND, SELF REALIZATION
      ════════════════════════════════════ */}
      <section className="relative z-20 py-6 sm:py-8 md:py-10 lg:py-12 bg-[#FFFDF9] w-full">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 w-full">
            {FEATURE_CARDS.map((p) => (
              <div
                key={p.title}
                className="group flex flex-col rounded-[2rem] p-5 sm:p-6 lg:p-7 bg-white border border-amber-200/80 shadow-[0_12px_30px_rgba(66,38,22,0.08)] hover:shadow-[0_20px_45px_rgba(66,38,22,0.15)] transition-all duration-300 hover:-translate-y-2 text-center w-full"
              >
                {/* Landscape Image Container with clean breathing space */}
                <div className="w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-2xl bg-amber-50 mb-5 sm:mb-6 border border-amber-200/60 shadow-xs">
                  <img
                    src={p.image}
                    alt={p.alt}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between px-2 pb-2">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#521623] mb-2.5">
                      {p.title}
                    </h3>
                    <p className="text-sm sm:text-base leading-relaxed text-gray-700 font-medium max-w-sm mx-auto">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          WELLNESS SOLUTIONS CAROUSEL
      ════════════════════════════════════ */}
      <SolutionsCarousel />

      {/* ════════════════════════════════════
          SAKSHI SHREE QUOTE SECTION
      ════════════════════════════════════ */}
      <section className="relative pt-10 sm:pt-14 md:pt-16 lg:pt-20 pb-16 sm:pb-20 md:pb-24 lg:pb-20 overflow-hidden bg-gradient-to-br from-[#FFFDF9] via-[#FFF8EB] to-[#FFF4DE] border-y border-amber-200/60">
        {/* Background Ambient Radial Glow */}
        <div
          className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-50"
          style={{ background: "radial-gradient(circle, rgba(212,175,55,0.22) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-40"
          style={{ background: "radial-gradient(circle, rgba(82,22,35,0.12) 0%, transparent 70%)" }}
        />

        <div className="container-page relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Image Column with Sadguru Sakshi Shree Photo */}
            <div className="lg:col-span-5 flex justify-center items-end relative">
              {/* Backplate Decorative Arch Frame */}
              <div className="relative w-full max-w-[440px] sm:max-w-[480px] lg:max-w-[520px] aspect-[3/4] rounded-[3.5rem] bg-gradient-to-b from-amber-100/90 via-white/90 to-amber-50/80 border border-amber-300/60 shadow-[0_25px_60px_rgba(82,22,35,0.12)] flex justify-center items-end group pt-6 sm:pt-8 pb-1 px-4 overflow-hidden">
                <div
                  className="absolute inset-x-4 top-4 bottom-0 rounded-t-[3rem] pointer-events-none opacity-40"
                  style={{ background: "radial-gradient(circle at 50% 30%, rgba(212,175,55,0.35), transparent 70%)" }}
                />
                <img
                  src="/guruji-namaste-new.png"
                  alt="Sadguru Sakshi Shree"
                  className="relative z-10 w-full h-full max-h-[96%] object-contain object-bottom transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
            </div>

            {/* Right Quote & Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left pl-0 lg:pl-4">

              {/* Tag Header */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-300/80 bg-amber-100/70 text-[#8B6914] shadow-xs">
                <span>Words of Divine Wisdom</span>
              </div>

              {/* Quote Card */}
              <div className="relative bg-white/80 backdrop-blur-md p-7 sm:p-9 rounded-3xl border border-amber-200/80 shadow-xl space-y-5">
                <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#521623] font-semibold italic leading-relaxed tracking-wide">
                  &ldquo;Your thoughts create your reality. Choose them wisely, for they hold the power to design your destiny.&rdquo;
                </blockquote>

                <div className="pt-4 border-t border-amber-100 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#521623]">
                      Sakshi Shree
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-[#8B6914] tracking-wide">
                      Enlightened Spiritual Master & Divine Messenger
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-1">
                <Link
                  href="/about-movement"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#521623] hover:bg-[#3B0F19] active:scale-95 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
                >
                  <span>Discover Sakshi Shree's Vision</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          RECOGNIZED BY LEADERS & MEDIA
      ════════════════════════════════════ */}
      <section className="section-pad bg-[#FFFDF9] border-b border-amber-200/50">
        <div className="container-page space-y-10">
          <SectionHeading
            center
            eyebrow="Recognition"
            title="Recognized by Top Leaders & Media"
          />

          {/* Leaders Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LEADERS.map((l) => (
              <div key={l.name} className="card-premium rounded-2xl overflow-hidden group">
                <div className="aspect-[4/3] overflow-hidden">
                  <LensImage src={l.image} alt={l.name} />
                </div>
                <div className="p-5 border-t" style={{ borderColor: "rgba(212,175,55,0.2)" }}>
                  <h3 className="font-display font-bold text-gray-900 text-sm leading-tight mb-1">
                    {l.name}
                  </h3>
                  <p className="text-xs text-gray-500">{l.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Newspaper Media Cards – Horizontal Carousel */}
          <div className="pt-6 border-t border-amber-200/50">
            <div className="relative">
              {/* Left Arrow */}
              <button
                onClick={() => {
                  const el = document.getElementById("news-carousel");
                  if (el) el.scrollBy({ left: -320, behavior: "smooth" });
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-10 h-10 rounded-full bg-white border border-amber-300 shadow-md flex items-center justify-center hover:bg-amber-50 hover:shadow-lg transition-all duration-200 group"
                aria-label="Previous"
              >
                <svg className="w-5 h-5 text-[#521623] group-hover:text-[#B8860B] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Scrollable Cards Row */}
              <div
                id="news-carousel"
                className="flex gap-4 overflow-x-auto scroll-smooth pb-2 px-1"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {[
                  {
                    outlet: "Page 3 News",
                    date: "July 10, 2024",
                    image: "/media/page3-news.png",
                  },
                  {
                    outlet: "Dainik Bhaskar",
                    date: "July 23, 2024",
                    image: "/media/dainik-bhaskar-guru-purnima.png",
                  },
                  {
                    outlet: "Dainik Bhaskar",
                    date: "December 13, 2021",
                    image: "/media/dainik-bhaskar-shiksha-seva.png",
                  },
                  {
                    outlet: "Science Divine",
                    date: "July 13, 2024",
                    image: "/media/news-meditation-workshop.png",
                  },
                  {
                    outlet: "Science Divine",
                    date: "July 26, 2024",
                    image: "/media/news-guru-purnima-event.png",
                  },
                ].map((news, idx) => (
                  <div
                    key={idx}
                    className="card-premium rounded-2xl overflow-hidden bg-white border border-amber-200/80 shadow-sm hover:shadow-lg transition-all duration-300 group flex-none"
                    style={{ width: "calc(25% - 18px)", minWidth: "220px" }}
                  >
                    {/* Image — same aspect-[4/3] as leader cards */}
                    <div className="aspect-[4/3] bg-[#FAF7F2] relative overflow-hidden flex items-center justify-center p-2">
                      <img
                        src={news.image}
                        alt={news.outlet}
                        loading="lazy"
                        className="w-full h-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Arrow */}
              <button
                onClick={() => {
                  const el = document.getElementById("news-carousel");
                  if (el) el.scrollBy({ left: 320, behavior: "smooth" });
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-10 h-10 rounded-full bg-white border border-amber-300 shadow-md flex items-center justify-center hover:bg-amber-50 hover:shadow-lg transition-all duration-200 group"
                aria-label="Next"
              >
                <svg className="w-5 h-5 text-[#521623] group-hover:text-[#B8860B] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          COURSES
      ════════════════════════════════════ */}
      <section className="section-pad bg-[#FFFBF2] border-b border-amber-200/50">
        <div className="container-page">
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <SectionHeading
              center
              eyebrow="Transformative Programs"
              title="Courses by Sakshi Shree"
              subtitle="Four foundational programs that thousands have used to reshape their inner life."
            />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COURSES.map((c) => (
              <GlareHover
                key={c.slug}
                glareColor="#ffffff"
                glareOpacity={0.3}
                glareAngle={-30}
                glareSize={300}
                transitionDuration={800}
                playOnce={false}
                className="rounded-2xl h-full"
              >
                <Link
                  href={`/${c.slug}` as string}
                  className="card-premium rounded-2xl overflow-hidden group block h-full"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <LensImage src={c.image} alt={c.title} />
                  </div>
                  <div className="p-5">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-amber-600 mb-2">
                      {c.level} · {c.duration}
                    </div>
                    <h3 className="font-display font-bold text-gray-900 text-base mb-2 leading-tight">
                      {c.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-4 line-clamp-2">{c.description}</p>
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="font-display text-xl font-bold" style={{ color: "#D4AF37" }}>
                          ₹{c.price}
                        </span>
                        <span className="text-xs text-gray-400 line-through ml-2">
                          ₹{c.originalPrice.toLocaleString()}
                        </span>
                      </div>
                      <ArrowRight
                        size={16}
                        className="text-amber-500 group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                </Link>
              </GlareHover>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/courses"
              className="btn-outline-gold rounded-full px-7 py-3 text-sm font-semibold inline-flex items-center gap-2 shadow-md bg-white/90 backdrop-blur-sm transition-all hover:scale-105"
            >
              <span>View All Courses</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          OUR IMPACT SECTION
      ════════════════════════════════════ */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-[#FAF6F0] text-center border-t border-b border-amber-100/70 relative overflow-hidden">
        <div className="container-page">

          {/* Heading & Subtitle */}
          <div className="mb-8 sm:mb-10 md:mb-12 space-y-2">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#521623]">
              Our Impact
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-normal tracking-wide">
              A growing movement of awareness, peace and service.
            </p>
          </div>

          {/* 4 Stats Grid with vertical line dividers */}
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-amber-900/15">
            {[
              { val: "50+", label: "Seva Initiatives" },
              { val: "1M+", label: "Lives Touched" },
              { val: "700+", label: "Events Conducted" },
              { val: "25+", label: "Countries Reached" },
            ].map((item, idx) => (
              <div key={idx} className="py-6 px-4 flex flex-col items-center justify-center space-y-2">
                <div className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#521623] tracking-tight">
                  <Counter value={item.val} duration={2500} />
                </div>
                <div className="text-xs sm:text-sm font-normal text-gray-600 tracking-wide">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════ */}
      <section
        className="section-pad relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #FFFDF9 0%, #FFF4E0 45%, #FFFBF2 100%)" }}
      >
        {/* Ambient Glowing Lighting Orbs */}
        <div
          className="absolute -top-16 -right-16 w-[300px] sm:w-[420px] lg:w-[550px] h-[300px] sm:h-[420px] lg:h-[550px] rounded-full pointer-events-none overflow-hidden"
          style={{ background: "radial-gradient(circle, rgba(212,175,55,0.22) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-16 -left-16 w-[300px] sm:w-[420px] lg:w-[550px] h-[300px] sm:h-[420px] lg:h-[550px] rounded-full pointer-events-none overflow-hidden"
          style={{ background: "radial-gradient(circle, rgba(245,158,11,0.18) 0%, transparent 70%)" }}
        />



        <div className="container-page relative z-10">
          <SectionHeading
            title="Empowering millions through conscious living."
            subtitle="Real stories from real people whose lives have transformed."
          />


          {/* ── Premium Infinite Testimonials Marquee ── */}
          <div className="mb-14">
            <TestimonialMarquee
              testimonials={[
                { quote: "Sakshi Shree's guidance changed how I see my anxiety. I finally feel completely free, grounded, and focused in life.",       author: "Sanaya Aggarwal",    role: "Student & Practitioner",   avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" },
                { quote: "The scientific approach of Sakshi Sadhna transformed both my high-stress medical profession and my inner well-being.",        author: "Dr. Rajesh Verma",   role: "Senior Cardiologist",      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80" },
                { quote: "Total participation in worldly life with complete inner peace — Sakshi Shree's teachings are pure gold for modern seekers.", author: "Priya Sharma",       role: "Enterprise Architect",     avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80" },
                { quote: "Every teaching of Sakshi Shree has a scientific basis. I use these practices daily to lead my team with calm and clarity.",  author: "Amit Sharma",        role: "Technology Consultant",    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" },
                { quote: "The Inner Cleansing Kriya revitalized my energy and brought lasting emotional healing into my everyday routine.",            author: "Neha Kapoor",        role: "Wellness Practitioner",    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=200&q=80" },
                { quote: "Meditation techniques here provide unmatched mental poise and calm even during the most intense professional challenges.",    author: "Arjun Mehta",        role: "Business Professional",    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80" },
                { quote: "Spiritual grounding cleared my mental clutter completely. My creativity now flows effortlessly and abundantly every day.",   author: "Riya Malhotra",      role: "Creative Director",        avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&q=80" },
                { quote: "Practicing Mind Power Meditation helped me overcome burnout and discover the clarity I needed in both work and personal life.",author: "Vivek Singh",        role: "Senior Manager",           avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80" },
              ]}
            />
          </div>

          {/* Video testimonials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10">
            {TESTIMONIAL_VIDEOS.slice(0, 6).map((v) => (
              <div key={v.id} className="rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-1.5 border border-white/80">
                <YouTubeThumb id={v.id} title={v.title} />
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/testimonials"
              className="btn-outline-gold rounded-full px-7 py-3 text-sm font-semibold inline-flex items-center gap-2 shadow-md bg-white/80 backdrop-blur-sm"
            >
              See All Testimonials <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          INITIATIVES
      ════════════════════════════════════ */}
      <section className="section-pad" style={{ background: "#FAFAFA" }}>
        <div className="container-page">
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <SectionHeading
              center
              eyebrow="Science Divine Foundation"
              title="Our Initiatives"
              subtitle="Enriching Lives Through Compassionate Initiatives ,  Empowering Education, Nourishing Communities, and Ensuring Health Equity."
            />
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mt-6 md:mt-8">
            {/* Shiksha Sewa */}
            <div className="card-premium rounded-2xl overflow-hidden flex flex-col">
              <div className="aspect-[16/10] overflow-hidden">
                <LensImage
                  src="https://sciencedivine.org/wp-content/uploads/elementor/thumbs/IMG_1317-scaled-qycnje1x5jro0x3zk3hzanf2tn181d8a1m064pjdls.webp"
                  alt="Shiksha Sewa - Free Education for Underprivileged Children"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-8 h-8 rounded-lg grid place-items-center"
                    style={{ background: "rgba(212,175,55,0.15)" }}
                  >
                    <BookOpen size={16} className="text-amber-600" />
                  </div>
                  <h3 className="font-display font-bold text-gray-900">Shiksha Sewa</h3>
                </div>
                <p className="text-xs text-amber-700 uppercase tracking-wider font-semibold mb-2">
                  Har Ghar Shiksha, Har Ghar Dhyan
                </p>
                <p className="text-sm text-gray-600 leading-relaxed mb-5 flex-1">
                  Science Divine provides free schooling for underprivileged children, aiming to
                  shape brighter futures and break the cycle of poverty through quality education.
                </p>
                <a
                  href={RAZORPAY_DONATION_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold rounded-full px-5 py-2.5 text-sm font-semibold flex items-center justify-center text-center w-full mt-auto"
                >
                  Donate Now
                </a>
              </div>
            </div>

            {/* Annapurna Sewa */}
            <div className="card-premium rounded-2xl overflow-hidden flex flex-col">
              <div className="aspect-[16/10] overflow-hidden">
                <LensImage
                  src="https://sciencedivine.org/wp-content/uploads/2024/04/IMG-20200818-WA0055.jpg"
                  alt="Annapurna Sewa - Free Meals for the Needy"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-8 h-8 rounded-lg grid place-items-center"
                    style={{ background: "rgba(212,175,55,0.15)" }}
                  >
                    <Heart size={16} className="text-amber-600" />
                  </div>
                  <h3 className="font-display font-bold text-gray-900">Annapurna Sewa</h3>
                </div>
                <p className="text-xs text-amber-700 uppercase tracking-wider font-semibold mb-2">
                  Feeding hearts, one meal at a time
                </p>
                <p className="text-sm text-gray-600 leading-relaxed mb-5 flex-1">
                  Annapurna Bhog initiative offers free meals to ensure no one goes hungry,
                  fostering unity and compassion within communities.
                </p>
                <a
                  href={RAZORPAY_DONATION_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold rounded-full px-5 py-2.5 text-sm font-semibold flex items-center justify-center text-center w-full mt-auto"
                >
                  Donate Now
                </a>
              </div>
            </div>

            {/* Swastha Sewa */}
            <div className="card-premium rounded-2xl overflow-hidden flex flex-col">
              <div className="aspect-[16/10] overflow-hidden">
                <LensImage
                  src="https://sciencedivine.org/wp-content/uploads/elementor/thumbs/gospelforasia-RT18-03070-qvla74wkzfu03jfb5e7plwpddk8afeo1uqh0978hb4.jpeg"
                  alt="Swastha Sewa - Free Healthcare"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-8 h-8 rounded-lg grid place-items-center"
                    style={{ background: "rgba(212,175,55,0.15)" }}
                  >
                    <Droplets size={16} className="text-amber-600" />
                  </div>
                  <h3 className="font-display font-bold text-gray-900">Swastha Sewa</h3>
                </div>
                <p className="text-xs text-amber-700 uppercase tracking-wider font-semibold mb-2">
                  Healthcare for all, no exceptions
                </p>
                <p className="text-sm text-gray-600 leading-relaxed mb-5 flex-1">
                  Through Swastha Sewa, Science Divine provides free healthcare services, promoting
                  well-being and ensuring access to essential medical care for all.
                </p>
                <a
                  href={RAZORPAY_DONATION_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold rounded-full px-5 py-2.5 text-sm font-semibold flex items-center justify-center text-center w-full mt-auto"
                >
                  Donate Now
                </a>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/initiatives"
              className="btn-outline-gold rounded-full px-7 py-3 text-sm font-semibold inline-flex items-center gap-2 shadow-md bg-white/90 backdrop-blur-sm transition-all hover:scale-105"
            >
              <span>Explore All Initiatives</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          UPCOMING EVENTS
      ════════════════════════════════════ */}
      <section className="section-pad relative overflow-hidden" style={{ background: "linear-gradient(135deg, #FFFDF9 0%, #FFF8E8 50%, #FFFDF5 100%)" }}>
        {/* Ambient background glowing light orbs */}
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)" }}
        />

        <div className="container-page relative z-10">
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <SectionHeading
              center
              eyebrow="Find the Events for Conscious Awakening"
              title="Upcoming Events"
              subtitle="Join us at enriching events, where we seamlessly blend learning with inspiration, to foster growth and build lasting connections."
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EVENTS.slice(0, 3).map((e, i) => (
              <div
                key={i}
                className="card-premium rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 group"
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(212,175,55,0.3)",
                  boxShadow: "0 14px 36px rgba(82,22,35,0.06)",
                }}
              >
                <div>
                  {/* Event Card Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-amber-50">
                    <img
                      src={e.image}
                      alt={e.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold tracking-wider shadow-sm uppercase ${
                          e.status === "Completed"
                            ? "bg-slate-900/80 text-slate-200 border border-slate-700"
                            : "bg-amber-400/90 text-slate-950 border border-amber-300"
                        }`}
                      >
                        {e.status}
                      </span>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="p-6 space-y-3">
                    <h3 className="font-serif font-bold text-[#521623] text-xl leading-tight group-hover:text-[#B8860B] transition-colors">
                      {e.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
                      {e.description}
                    </p>

                    <div className="pt-2 space-y-2 text-xs font-medium text-gray-600 border-t border-amber-100">
                      <div className="flex items-center gap-2 text-[#521623] font-semibold">
                        <Calendar size={14} className="text-[#8B6914] shrink-0" />
                        <span>{e.date} &nbsp;|&nbsp; {e.time}</span>
                      </div>
                      <div className="flex items-start gap-2 text-gray-500">
                        <MapPin size={14} className="text-[#8B6914] shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{e.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <Link
                    href={e.link}
                    className="w-full py-2.5 rounded-full border border-amber-300/80 bg-amber-50/70 hover:bg-[#521623] text-[#521623] hover:text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span>{e.status === "Completed" ? "Event Recap" : "Learn More & Register"}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/events"
              className="btn-outline-gold rounded-full px-7 py-3 text-sm font-semibold inline-flex items-center gap-2 shadow-md bg-white/90 backdrop-blur-sm transition-all hover:scale-105"
            >
              <span>View All Events</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          SAKSHI WISDOM ,  BLOGS
      ════════════════════════════════════ */}
      <section className="section-pad relative overflow-hidden" style={{ background: "linear-gradient(135deg, #FAFAFA 0%, #FFF9EC 50%, #F8FAFC 100%)" }}>
        {/* Subtle background ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)" }}
        />

        <div className="container-page relative z-10">
          <SectionHeading
            center
            eyebrow="Sakshi Wisdom"
            title="From the Pen of Sakshi Shree"
            subtitle="Delve into profound insights and teachings. Explore mindfulness, personal growth, and spiritual enlightenment."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {BLOG_POSTS.map((post) => (
              <a
                key={post.title}
                href={post.href}
                target="_blank"
                rel="noreferrer"
                className="card-premium rounded-[1.75rem] overflow-hidden group transition-all duration-300 hover:-translate-y-2 flex flex-col h-full bg-white border border-amber-200/70 shadow-[0_10px_30px_rgba(82,22,35,0.06)] hover:shadow-[0_20px_45px_rgba(82,22,35,0.14)]"
              >
                {/* Blog Card Image Container */}
                <div className="w-full aspect-[16/10] overflow-hidden bg-amber-50 relative border-b border-amber-100">
                  <img
                    src={post.image}
                    alt={post.alt}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
                </div>

                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="w-10 h-0.5 mb-3.5 transition-all group-hover:w-16 bg-gradient-to-r from-amber-500 to-amber-700" />
                    <h3 className="font-serif text-xl font-bold text-[#521623] mb-2.5 leading-tight group-hover:text-[#B8860B] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-5 font-normal">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-amber-100/80 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8B6914] group-hover:text-[#521623] transition-colors inline-flex items-center gap-1.5">
                      Read Article <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="https://sciencedivine.org/blog"
              target="_blank"
              rel="noreferrer"
              className="btn-outline-gold rounded-full px-7 py-3 text-sm font-semibold inline-flex items-center gap-2 shadow-md bg-white/90 backdrop-blur-sm transition-all hover:scale-105"
            >
              <span>Read All Articles &amp; Wisdom</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
