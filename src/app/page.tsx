"use client";
import Link from "next/link";

import * as React from "react";
import { SectionHeading } from "@/components/PageHero";
import { YouTubeThumb } from "@/components/YouTubeEmbed";
import { Lens } from "@/components/ui/lens";
import { Counter } from "@/lib/useCounter";
import { RAZORPAY_DONATION_LINK } from "@/lib/payment-links";
import TextType from "@/components/ui/TextType";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import GlareHover from "@/components/ui/GlareHover";
import SolutionsCarousel from "@/components/SolutionsCarousel";
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
  },
  {
    title: "Spiritual Enlightenment: The Science of Breathing",
    href: "https://sciencedivine.org/the-science-of-breathing/",
    excerpt: "Ancient breath techniques that transform body and mind.",
  },
  {
    title: "Is the Law of Attraction a Myth?",
    href: "https://sciencedivine.org/power-of-law-of-attraction/",
    excerpt: "A scientific and spiritual look at manifestation and intention.",
  },
  {
    title: "Power Of Spirituality In Self Discovery",
    href: "https://sciencedivine.org/power-of-spirituality-in-self-discovery/",
    excerpt: "How spiritual practices unlock your deepest potential.",
  },
  {
    title: "Master Your Own Fate",
    href: "https://sciencedivine.org/master-your-own-fate/",
    excerpt: "Taking conscious control of your destiny through awareness.",
  },
  {
    title: "Easy Habits That Can Change Your Life In a Month",
    href: "https://sciencedivine.org/habits-that-can-change-your-life/",
    excerpt: "Simple daily practices for lasting transformation.",
  },
];

const FEATURE_CARDS = [
  {
    title: "Sound Body",
    desc: "Physical vitality through yoga, breath, and conscious movement.",
    image: "https://images.pexels.com/photos/13849091/pexels-photo-13849091.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Physical vitality through yoga, breath, and conscious movement",
  },
  {
    title: "Sound Mind",
    desc: "Mental clarity through meditation and mindfulness practice.",
    image: "https://images.pexels.com/photos/12520110/pexels-photo-12520110.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Mental clarity through meditation and mindfulness practice",
  },
  {
    title: "Self Realization",
    desc: "Spiritual awakening under Sakshi Shree's direct guidance.",
    image: "https://images.unsplash.com/photo-1757941899028-c40a5ae28245?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=85&w=1600",
    alt: "Spiritual awakening under Sakshi Shree's direct guidance",
  },
];
function LensImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <Lens className="h-full w-full rounded-2xl" lensSize={140} zoomFactor={1.7}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={
          className ??
          "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        }
      />
    </Lens>
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
      {/* ════════════════════════════════════
          HERO SECTION ,  DIVINE LIVING REDESIGN
      ════════════════════════════════════ */}
      <section className="relative overflow-hidden min-h-[640px] lg:h-[730px] flex items-center bg-[#fffaf0]" style={{
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
            font-size: clamp(44px, 4.6vw, 64px);
            line-height: 1.04;
            font-weight: 500;
            letter-spacing: -0.025em;
          }
          .hero-founder {
            width: 210px;
            padding-bottom: 12px;
            border-bottom: 1px solid rgba(184, 134, 11, 0.55);
          }
          .hero-tagline {
            font-family: 'Cormorant Garamond', Georgia, serif;
            color: rgba(93, 59, 54, 0.9);
            font-size: 1.2rem;
            font-weight: 500;
            line-height: 1.2;
          }
          .hero-copy {
            max-width: 430px;
            color: #5f5553;
            font-size: 0.95rem;
            line-height: 1.58;
          }
          .btn-explore {
            background: #521623;
            color: #ffffff;
            padding: 14px 28px;
            border-radius: 8px;
            font-weight: 700;
            font-size: 0.85rem;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            display: inline-flex;
            align-items: center;
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
            background: rgba(255, 255, 255, 0.9);
            border: 1.5px solid #D4AF37;
            color: #521623;
            padding: 14px 28px;
            border-radius: 8px;
            font-weight: 700;
            font-size: 0.85rem;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            transition: all 0.3s ease;
          }
          .btn-experience:hover {
            background: #FFFDF7;
            border-color: #B8860B;
            transform: translateY(-2px);
          }
          .quick-action-bar {
            position: fixed;
            right: 18px;
            top: 50%;
            transform: translateY(-50%);
            z-index: 50;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(212, 175, 55, 0.35);
            border-radius: 24px;
            box-shadow: 0 12px 36px rgba(0, 0, 0, 0.12);
            width: 95px;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 12px 6px;
          }
          .hero-sunrise-wash {
            background: linear-gradient(90deg, rgba(255,253,247,0.92) 0%, rgba(255,253,247,0.72) 36%, rgba(255,253,247,0.15) 65%, rgba(255,253,247,0.02) 85%);
          }
          .hero-portrait {
            width: clamp(480px, 44vw, 750px);
            max-width: 52vw;
            filter: drop-shadow(0 20px 18px rgba(70, 39, 20, 0.13));
          }
          @media (max-width: 1024px) {
            .quick-action-bar {
              position: static;
              transform: none;
              flex-direction: row;
              width: 100%;
              max-width: 500px;
              justify-content: space-around;
              margin: 30px auto 0;
            }
            .hero-portrait {
              width: min(62vw, 550px);
              max-width: none;
            }
          }
          @media (max-width: 640px) {
            .hero-sunrise-wash {
              background: linear-gradient(180deg, rgba(255,253,247,0.88) 0%, rgba(255,253,247,0.76) 54%, rgba(255,253,247,0.18) 100%);
            }
          }
        `}</style>

        {/* Luminous Golden Yellow Sunrise Halo & Cloud Glow */}
        <div
          className="hero-golden-sun-glow absolute right-8 lg:right-24 top-6 w-[520px] h-[520px] rounded-full blur-[80px] opacity-75 pointer-events-none z-0"
          style={{
            background: "radial-gradient(circle, rgba(255, 210, 60, 0.8) 0%, rgba(245, 170, 30, 0.45) 45%, transparent 75%)",
          }}
        />

        <div className="hero-sunrise-wash absolute inset-0 pointer-events-none" />

        <div className="hero-content-shell max-w-[1580px] w-full mx-auto px-6 md:px-12 py-10 lg:py-0 lg:pt-[50px] relative z-10 h-full flex items-center lg:items-start">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 relative z-10">
              
              {/* Founder Header Badge */}
              <div className="hero-founder space-y-1">
                <div className="flex items-center gap-2">
                  <Heart size={18} className="text-[#C79A2E] fill-[#C79A2E]" />
                </div>
                <h3 className="hero-badge-title">Sadguru Sakshi Shree</h3>
                <p className="text-xs text-amber-900/70 font-medium tracking-wide">
                  Founder, Science Divine Foundation
                </p>
                <img 
                  src="/signature.png" 
                  alt="Sakshi Shree Signature" 
                  className="h-10 opacity-85 object-contain pt-1"
                />
              </div>

              {/* Main Heading */}
              <h1 className="hero-main-title">
                <span className="block text-[#521623]">Awaken the Divine Within,</span>
                <span className="block text-[#B8860B]">Transform the World Around.</span>
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
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="#teachings" className="btn-explore">
                  EXPLORE THE TEACHINGS <ArrowRight size={16} />
                </Link>
                <Link href="#events" className="btn-experience">
                  JOIN AN EXPERIENCE <Calendar size={16} className="text-[#B8860B]" />
                </Link>
              </div>

            </div>

            {/* Right Column Spacer for Desktop */}
            <div className="lg:col-span-5 hidden lg:block" />

          </div>
        </div>

        {/* Right Portrait Image - Anchored flush to bottom and right */}
        <img
          src="/sakshi-shree-hero-portrait.png"
          alt="Sadguru Sakshi Shree"
          className="absolute bottom-0 right-0 lg:right-0 xl:right-0 max-h-[85%] lg:max-h-[88%] lg:max-w-[540px] xl:max-w-[580px] w-auto object-contain object-bottom z-10 pointer-events-none drop-shadow-[0_16px_22px_rgba(55,35,20,0.15)]"
        />

        {/* Floating Quick Actions Widget on Right Edge */}
        <div className="quick-action-bar">
          <Link href="#events" className="flex flex-col items-center p-3 text-center group hover:opacity-85 transition-opacity w-full border-b border-amber-100/80">
            <Calendar size={22} className="text-[#4E1321] mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold text-[#4E1321] leading-tight">Attend<br/>Live Event</span>
          </Link>
          
          <Link href="#programs" className="flex flex-col items-center p-3 text-center group hover:opacity-85 transition-opacity w-full border-b border-amber-100/80">
            <BookOpen size={22} className="text-[#4E1321] mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold text-[#4E1321] leading-tight">Book<br/>Session</span>
          </Link>
          
          <Link href="#contact" className="flex flex-col items-center p-3 text-center group hover:opacity-85 transition-opacity w-full border-b border-amber-100/80">
            <Mail size={22} className="text-[#4E1321] mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold text-[#4E1321] leading-tight">Ask<br/>Question</span>
          </Link>
          
          <Link href="#contact" className="flex flex-col items-center p-3 text-center group hover:opacity-85 transition-opacity w-full">
            <MessageCircle size={22} className="text-[#4E1321] mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold text-[#4E1321] leading-tight">WhatsApp<br/>Connect</span>
          </Link>
        </div>

      </section>

      {/* ════════════════════════════════════
          EXPLORE YOUR INNER JOURNEY
      ════════════════════════════════════ */}
      <section className="py-20 px-6 relative overflow-hidden bg-[#FAF7F2]">
        <div className="max-w-[1300px] mx-auto text-center relative z-10">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C79A2E] block mb-2">
            EXPLORE YOUR
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#4E1321] mb-14">
            Inner Journey
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10 justify-items-center">
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
                <div className="w-20 h-20 rounded-full bg-white border-2 border-[#D4AF37] shadow-md flex items-center justify-center mb-4 transition-shadow group-hover:shadow-lg group-hover:border-[#B8860B]">
                  {item.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-[#4E1321] mb-1 group-hover:text-[#B8860B] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs font-medium text-[#8B6914] mb-2">
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
      {/* ════════════════════════════════════
          ABOUT SCIENCE DIVINE MOVEMENT
      ════════════════════════════════════ */}
      <section className="relative overflow-hidden min-h-[620px] lg:min-h-[680px] flex items-center py-16 lg:py-20 px-4 md:px-10 bg-cover bg-center" style={{
        backgroundImage: "url('/about-section-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center right",
      }}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#fffaf2]/95 via-[#fffaf2]/80 to-transparent pointer-events-none z-0" />
        
        <div className="max-w-[1440px] w-full mx-auto grid lg:grid-cols-12 gap-6 items-center relative z-10 h-full">
          <div className="lg:col-span-8 space-y-5 relative z-20">
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C79A2E] block">
              ABOUT SCIENCE DIVINE
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#4E1321]">
              Science Divine Movement
            </h2>
            <p className="text-gray-700 leading-relaxed font-medium text-base sm:text-lg max-w-2xl lg:max-w-3xl">
              The Science Divine Movement is a global initiative helping people realize their optimum
              potential through definite scientific techniques for sound body, sound mind, and self-realization.
              Founded by enlightened spiritual master Sakshi Shree, it simplifies spirituality to become an
              integral part of everyday life, freeing humanity from ideologies and belief systems that have divided us through the ages.
            </p>
            <p className="text-gray-700 leading-relaxed font-medium text-base sm:text-lg max-w-2xl lg:max-w-3xl">
              Our fundamental maxim is <span className="font-serif italic font-semibold text-[#8B6914] text-lg lg:text-xl">&quot;Bheetar se sanyaas, bahar se sansaar&quot;</span> – total participation in worldly life while enjoying complete inner renunciation.
            </p>
            <div className="pt-2">
              <Link
                href="/about-movement"
                className="inline-flex items-center gap-2 font-bold text-sm text-[#4E1321] hover:text-[#B8860B] transition-colors"
              >
                Know Sakshi Shree <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Desktop Spacer Column */}
          <div className="lg:col-span-4 hidden lg:block" />
        </div>

        {/* Sakshi Shree Portrait Positioned Closer */}
        <img
          src="/about-sakshi-shree-new.png"
          alt="Sadguru Sakshi Shree"
          className="absolute bottom-0 right-0 md:right-[2%] lg:right-[4%] max-h-[96%] lg:max-h-[102%] w-auto object-contain object-bottom z-10 pointer-events-none drop-shadow-[0_20px_30px_rgba(40,20,10,0.22)]"
        />
      </section>

      {/* ════════════════════════════════════
          SOUND BODY, SOUND MIND, SELF REALIZATION
      ════════════════════════════════════ */}
      <section className="relative z-20 pt-16 md:pt-24 pb-24 px-4 md:px-8 bg-[#FFFDF9]">
        <div className="max-w-[1720px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {FEATURE_CARDS.map((p) => (
              <div
                key={p.title}
                className="group flex flex-col rounded-3xl p-7 md:p-9 bg-white border border-amber-100/90 shadow-[0_12px_28px_rgba(66,38,22,0.08)] hover:shadow-[0_20px_40px_rgba(66,38,22,0.15)] transition-all duration-300 hover:-translate-y-2 text-center"
              >
                <div className="h-[260px] md:h-[280px] w-full overflow-hidden rounded-2xl bg-amber-50 mb-7 shadow-sm">
                  <img
                    src={p.image}
                    alt={p.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between px-2">
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#4E1321] mb-3">
                      {p.title}
                    </h3>
                    <p className="text-base leading-relaxed text-gray-600 font-medium">
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
      <section
        className="section-pad quote-section-bg"
      >
        <div className="container-page">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-full m-4 animate-glow-pulse"
                  style={{
                    background: "radial-gradient(circle, rgba(212,175,55,0.2), transparent 70%)",
                  }}
                />
                <img
                  src="/about-sakshi-shree-new.png"
                  alt="Sakshi Shree"
                  className="relative z-10 w-72 h-72 md:w-80 md:h-80 rounded-full object-cover border-4"
                  style={{ borderColor: "#D4AF37", boxShadow: "0 0 40px rgba(212,175,55,0.3)" }}
                />
              </div>
            </div>
            <div className="space-y-6">
              <div className="text-5xl font-quote text-amber-300">"</div>
              <blockquote className="font-quote text-2xl md:text-3xl text-gray-800 dark:text-gray-100 leading-relaxed -mt-4">
                Your thoughts create your reality. Choose them wisely, for they hold the power to
                design your destiny.
              </blockquote>
              <div className="flex items-center gap-4">
                <div>
                  <p className="font-display font-bold text-gray-900">Sakshi Shree</p>
                  <p className="text-sm text-gray-500">Enlightened Spiritual Master</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          RECOGNIZED BY LEADERS & MEDIA
      ════════════════════════════════════ */}
      <section className="section-pad bg-white dark:bg-slate-950">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="Recognition"
            title="Recognized by Top Leaders & Media"
            subtitle="Sakshi Shree has shared his wisdom with heads of state, ministers, scholars, and leaders across the globe."
          />
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
        </div>
      </section>

      {/* ════════════════════════════════════
          COURSES
      ════════════════════════════════════ */}
      <section className="section-pad bg-[#FAFAFA] dark:bg-slate-900/40 border-t border-b border-gray-100 dark:border-slate-800">
        <div className="container-page">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-12">
            <SectionHeading
              eyebrow="Transformative Programs"
              title="Courses by Sakshi Shree"
              subtitle="Four foundational programs that thousands have used to reshape their inner life."
            />
            <Link
              href="/courses"
              className="btn-outline-gold rounded-full px-6 py-2.5 text-sm font-semibold whitespace-nowrap shrink-0"
            >
              All Courses <ArrowRight size={14} className="inline ml-1" />
            </Link>
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
        </div>
      </section>

      {/* ════════════════════════════════════
          OUR IMPACT SECTION
      ════════════════════════════════════ */}
      <section className="py-20 px-6 bg-[#FAF6F0] text-center border-t border-b border-amber-100/70 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          
          {/* Heading & Subtitle */}
          <div className="mb-14 space-y-2">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#521623]">
              Our Impact
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-medium tracking-wide">
              A growing movement of awareness, peace and service.
            </p>
          </div>

          {/* 4 Stats Grid with vertical line dividers */}
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-amber-900/15">
            {[
              { val: "50+", label: "Seva Initiatives" },
              { val: "1M+", label: "Lives Touched" },
              { val: "500+", label: "Events Conducted" },
              { val: "25+", label: "Countries Reached" },
            ].map((item, idx) => (
              <div key={idx} className="py-6 px-4 flex flex-col items-center justify-center space-y-2">
                <div className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#521623] tracking-tight">
                  {item.val}
                </div>
                <div className="text-xs sm:text-sm font-medium text-gray-600 tracking-wide">
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
          className="absolute -top-32 -right-32 w-[550px] h-[550px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(212,175,55,0.22) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[550px] h-[550px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(245,158,11,0.18) 0%, transparent 70%)" }}
        />



        <div className="container-page relative z-10">
          <SectionHeading
            eyebrow="Voices"
            title="Empowering millions through conscious living."
            subtitle="Real stories from real people whose lives have transformed."
          />
          <div className="mb-10">
            <AnimatedTestimonials
              testimonials={TESTIMONIALS.map((t) => ({
                quote: t.quote,
                name: t.name,
                designation: t.role,
                src: t.avatar,
              }))}
            />
          </div>
          {/* Video testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {TESTIMONIAL_VIDEOS.slice(0, 3).map((v) => (
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
          <div className="text-center mb-12">
            <SectionHeading
              center
              eyebrow="Science Divine Foundation"
              title="Our Initiatives"
              subtitle="Enriching Lives Through Compassionate Initiatives ,  Empowering Education, Nourishing Communities, and Ensuring Health Equity."
            />
            <Link
              href="/initiatives"
              className="btn-outline-gold rounded-full px-6 py-2.5 text-sm font-semibold inline-flex items-center gap-2"
            >
              Know More <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-10">
            {/* Shiksha Sewa */}
            <div className="card-premium rounded-2xl overflow-hidden">
              <div className="h-52 overflow-hidden">
                <LensImage
                  src="https://sciencedivine.org/wp-content/uploads/elementor/thumbs/IMG_1317-scaled-qycnje1x5jro0x3zk3hzanf2tn181d8a1m064pjdls.webp"
                  alt="Shiksha Sewa - Free Education for Underprivileged Children"
                />
              </div>
              <div className="p-6">
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
                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  Science Divine provides free schooling for underprivileged children, aiming to
                  shape brighter futures and break the cycle of poverty through quality education.
                </p>
                <a
                  href={RAZORPAY_DONATION_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold rounded-full px-5 py-2.5 text-sm font-semibold inline-block"
                >
                  Donate Now
                </a>
              </div>
            </div>

            {/* Annapurna Sewa */}
            <div className="card-premium rounded-2xl overflow-hidden">
              <div className="h-52 overflow-hidden">
                <LensImage
                  src="https://sciencedivine.org/wp-content/uploads/2024/04/IMG-20200818-WA0055.jpg"
                  alt="Annapurna Sewa - Free Meals for the Needy"
                />
              </div>
              <div className="p-6">
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
                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  Annapurna Bhog initiative offers free meals to ensure no one goes hungry,
                  fostering unity and compassion within communities.
                </p>
                <a
                  href={RAZORPAY_DONATION_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold rounded-full px-5 py-2.5 text-sm font-semibold inline-block"
                >
                  Donate Now
                </a>
              </div>
            </div>

            {/* Swastha Sewa */}
            <div className="card-premium rounded-2xl overflow-hidden">
              <div className="h-52 overflow-hidden">
                <LensImage
                  src="https://sciencedivine.org/wp-content/uploads/elementor/thumbs/gospelforasia-RT18-03070-qvla74wkzfu03jfb5e7plwpddk8afeo1uqh0978hb4.jpeg"
                  alt="Swastha Sewa - Free Healthcare"
                />
              </div>
              <div className="p-6">
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
                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  Through Swastha Sewa, Science Divine provides free healthcare services, promoting
                  well-being and ensuring access to essential medical care for all.
                </p>
                <a
                  href={RAZORPAY_DONATION_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold rounded-full px-5 py-2.5 text-sm font-semibold inline-block"
                >
                  Donate Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          HAR GHAR SHIKSHA CAMPAIGN SHOWCASE
      ════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 lg:py-24 bg-gradient-to-br from-[#2B0602] via-[#4A0E08] to-[#1A0301] text-white">
        {/* Ambient background aura */}
        <div
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(245,158,11,0.2) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 70%)" }}
        />

        <div className="container-page relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 text-center lg:text-left space-y-6">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm"
                style={{
                  borderColor: "rgba(212,175,55,0.5)",
                  color: "#FBBF24",
                  background: "rgba(212,175,55,0.15)",
                }}
              >
                <Heart size={13} className="text-amber-400 animate-pulse" />
                <span>Har Ghar Shiksha Campaign</span>
              </div>

              <h2
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight"
                style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
              >
                Har Ghar Shiksha,{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #FDE68A 0%, #FBBF24 50%, #F59E0B 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Har Ghar Dhyan
                </span>
              </h2>

              <p className="text-amber-100/90 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                Empowering futures through education and meditation. Under the compassionate guidance of{" "}
                <strong className="text-amber-300 font-semibold">Sakshi Shree</strong>, Science Divine provides free schooling,
                learning materials, values, and holistic grooming for underprivileged children.
              </p>

              {/* Campaign Highlights */}
              <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto lg:mx-0 pt-1 text-left">
                <div className="p-3 rounded-2xl bg-white/5 border border-amber-400/20 backdrop-blur-sm">
                  <div className="text-xl font-bold text-amber-300 font-serif">10,000+</div>
                  <div className="text-xs text-amber-100/80">Children Sponsored</div>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-amber-400/20 backdrop-blur-sm">
                  <div className="text-xl font-bold text-amber-300 font-serif">100%</div>
                  <div className="text-xs text-amber-100/80">Free Education &amp; Kits</div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
                <a
                  href={RAZORPAY_DONATION_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 transition-all transform hover:scale-105 active:scale-95"
                >
                  Donate Now
                </a>
                <Link
                  href="/shiksha-sewa"
                  className="rounded-full px-8 py-3.5 text-sm font-semibold border border-amber-300/40 text-amber-100 hover:bg-white/10 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Right Image Showcase Column (Fully visible, uncut Guru Ji & Students portrait) */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-400/40 group bg-slate-950/40">
                <img
                  src="https://sciencedivine.org/wp-content/uploads/2025/02/mzlvjnkn-1-scaled.webp"
                  alt="Sakshi Shree with children - Har Ghar Shiksha"
                  className="w-full h-auto max-h-[460px] object-cover object-top group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/90 text-slate-950 font-bold text-[11px] mb-1">
                    <Sparkles size={12} />
                    <span>Sakshi Shree with Students</span>
                  </div>
                  <p className="text-xs text-amber-100/90 drop-shadow-sm">
                    Shaping young minds into conscious, joyful human beings.
                  </p>
                </div>
              </div>
            </div>
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
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
            <SectionHeading eyebrow="Coming Up" title="Upcoming Events & Retreats" />
            <Link
              href="/events"
              className="btn-outline-gold rounded-full px-6 py-2.5 text-sm font-semibold whitespace-nowrap shrink-0 shadow-sm"
            >
              View All Events <ArrowRight size={14} className="inline ml-1" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {EVENTS.slice(0, 3).map((e, i) => (
              <div key={i} className="card-premium rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5" style={{ background: "rgba(255, 255, 255, 0.9)", backdropFilter: "blur(10px)", border: "1px solid rgba(212,175,55,0.25)", boxShadow: "0 10px 30px rgba(15,23,42,0.04)" }}>
                <div
                  className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4"
                  style={{
                    background:
                      (e.status as string) === "Completed" ? "#F3F4F6" : "rgba(212,175,55,0.15)",
                    color: (e.status as string) === "Completed" ? "#6B7280" : "#92700A",
                  }}
                >
                  {e.status}
                </div>
                <h3 className="font-display font-bold text-gray-900 text-lg mb-4 leading-tight">
                  {e.title}
                </h3>
                <div className="space-y-2 text-sm text-gray-500 mb-5">
                  <div className="flex items-center gap-2">
                    <Calendar size={13} className="text-amber-500" /> {e.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={13} className="text-amber-500" /> {e.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={13} className="text-amber-500" /> {e.location}
                  </div>
                </div>
                <Link
                  href="/events"
                  className="text-sm font-semibold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1"
                >
                  Register <ArrowRight size={13} />
                </Link>
              </div>
            ))}
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <a
                key={post.title}
                href={post.href}
                target="_blank"
                rel="noreferrer"
                className="card-premium rounded-2xl p-6 group transition-all duration-300 hover:-translate-y-1.5"
                style={{ background: "#FFFFFF", border: "1px solid rgba(212,175,55,0.2)", boxShadow: "0 10px 30px rgba(15,23,42,0.04)" }}
              >
                <div
                  className="w-8 h-0.5 mb-4 transition-all group-hover:w-12"
                  style={{ background: "linear-gradient(90deg, #F59E0B, #D4AF37)" }}
                />
                <h3 className="font-display font-bold text-gray-900 mb-3 leading-tight group-hover:text-amber-700 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{post.excerpt}</p>
                <span className="text-xs font-semibold text-amber-600 inline-flex items-center gap-1">
                  Read More <ArrowRight size={12} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          JOIN COMMUNITY ,  NEWSLETTER
      ════════════════════════════════════ */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <div
            className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #FFFBF0 0%, #FFF3D0 100%)",
              border: "1px solid rgba(212,175,55,0.3)",
            }}
          >
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-30"
              style={{
                background: "radial-gradient(circle, rgba(212,175,55,0.4), transparent 70%)",
              }}
            />
            <div className="relative">
              <div
                className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5 border"
                style={{
                  borderColor: "rgba(212,175,55,0.5)",
                  color: "#92700A",
                  background: "rgba(212,175,55,0.1)",
                }}
              >
                Join the Community
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Get Access to Exclusive Content
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto mb-8">
                Get access to exclusive audios, videos, blogs, newsletters, and more! Subscribe now
                to access a world of unique content, deep insights, and insider knowledge.
              </p>
              <form className="max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="rounded-full border px-5 py-3 text-sm focus:outline-none focus:border-amber-400"
                    style={{ borderColor: "#E5E7EB" }}
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="rounded-full border px-5 py-3 text-sm focus:outline-none focus:border-amber-400"
                    style={{ borderColor: "#E5E7EB" }}
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-3 mb-5">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="rounded-full border px-5 py-3 text-sm focus:outline-none focus:border-amber-400"
                    style={{ borderColor: "#E5E7EB" }}
                  />
                  <input
                    type="text"
                    placeholder="Message (optional)"
                    className="rounded-full border px-5 py-3 text-sm focus:outline-none focus:border-amber-400"
                    style={{ borderColor: "#E5E7EB" }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-gold rounded-full px-10 py-3.5 text-sm font-semibold w-full sm:w-auto"
                >
                  Submit Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
