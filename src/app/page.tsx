"use client";
import Link from "next/link";

import * as React from "react";
import { SectionHeading } from "@/components/PageHero";
import { YouTubeThumb } from "@/components/YouTubeEmbed";
import { Lens } from "@/components/ui/lens";
import { Counter } from "@/lib/useCounter";
import { RAZORPAY_DONATION_LINK } from "@/lib/payment-links";
import TextType from "@/components/ui/TextType";
import GlareHover from "@/components/ui/GlareHover";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import {
  COURSES,
  EVENTS,
  TESTIMONIALS,
  TESTIMONIAL_VIDEOS,
  SOCIALS,
  LEADERS,
} from "@/data/content";
import { ArrowRight, Calendar, MapPin, Clock, Heart, BookOpen, Droplets, Sparkles, Users, User,  } from "lucide-react";
import { Facebook, Youtube, Instagram, Linkedin } from "@/components/SocialIcons";




/* ─────────────── SOLUTION TOPICS ─────────────── */
const SOLUTION_ITEMS = [
  {
    slug: "depression",
    label: "Depression",
    icon: "https://sciencedivine.org/wp-content/uploads/2025/01/child-150x150.png",
  },
  {
    slug: "anxiety",
    label: "Anxiety",
    icon: "https://sciencedivine.org/wp-content/uploads/2025/01/headache-150x150.png",
  },
  {
    slug: "sleeping-disorder",
    label: "Sleeping Disorder",
    icon: "https://sciencedivine.org/wp-content/uploads/2025/01/sleeping-150x150.png",
  },
  {
    slug: "overthinking",
    label: "Overthinking",
    icon: "https://sciencedivine.org/wp-content/uploads/2025/01/overthinking-150x150.png",
  },
  {
    slug: "parenting",
    label: "Parenting",
    icon: "https://sciencedivine.org/wp-content/uploads/2025/01/family-150x150.png",
  },
  {
    slug: "wellness",
    label: "Wellness",
    icon: "https://sciencedivine.org/wp-content/uploads/2025/01/yoga-150x150.png",
  },
  {
    slug: "relationship",
    label: "Relationships",
    icon: "https://sciencedivine.org/wp-content/uploads/2025/01/couple-150x150.png",
  },
];

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
    image: "/feature-cards/sound-body.png",
    alt: "Person practicing sunrise meditation in nature for physical wellness",
  },
  {
    title: "Sound Mind",
    desc: "Mental clarity through meditation and mindfulness practice.",
    image: "/feature-cards/sound-mind.png",
    alt: "Person meditating peacefully over mountain scenery for mental clarity",
  },
  {
    title: "Self Realization",
    desc: "Spiritual awakening under Sakshi Shree's direct guidance.",
    image: "/feature-cards/self-realization.png",
    alt: "Meditation surrounded by divine golden light and lotus flowers",
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
          HERO SECTION ,  LUXURY SPIRITUAL REDESIGN
      ════════════════════════════════════ */}
      <section className="hero-luxury-bg" style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}>
        <style>{`
          @keyframes homeFadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
          @keyframes homeFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
          @keyframes homePulse { 0%,100%{opacity:.3} 50%{opacity:.7} }
          @keyframes rotateMandala {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
          }
          @keyframes homeParticle {
            0%{transform:translateY(0) translateX(0);opacity:0}
            30%{opacity:.6}
            70%{opacity:.4}
            100%{transform:translateY(-140px) translateX(25px);opacity:0}
          }
          .hm-fade-1 { animation: homeFadeUp 0.8s 0.1s both; }
          .hm-fade-2 { animation: homeFadeUp 0.8s 0.3s both; }
          .hm-fade-3 { animation: homeFadeUp 0.8s 0.5s both; }
          .hm-fade-4 { animation: homeFadeUp 0.8s 0.7s both; }
          .hm-fade-5 { animation: homeFadeUp 0.8s 0.9s both; }
          .hm-fade-6 { animation: homeFadeUp 0.8s 1.1s both; }
          .hm-fade-img { animation: homeFadeUp 1s 0.4s both; }

          .btn-hero-primary {
            display: inline-flex; align-items: center; gap: 12px;
            background: linear-gradient(135deg, #B8860B 0%, #C79A2E 50%, #D4AF37 100%);
            background-size: 200% auto;
            color: #FFFFFF; padding: 16px 38px; border-radius: 100px;
            font-weight: 700; font-size: 1rem; text-decoration: none;
            box-shadow: 0 12px 32px rgba(199,154,46,0.35);
            transition: background-position 0.4s, box-shadow 0.4s, transform 0.25s;
            white-space: nowrap;
          }
          .btn-hero-primary:hover {
            background-position: right center;
            box-shadow: 0 16px 42px rgba(199,154,46,0.5);
            transform: translateY(-3px);
          }
          .btn-hero-primary:hover .btn-arrow { transform: translateX(5px); }
          .btn-arrow { transition: transform 0.3s; }

          .btn-hero-secondary {
            display: inline-flex; align-items: center; gap: 12px;
            background: #FFFDF9;
            border: 1.5px solid rgba(199,154,46,0.5);
            color: #16233D; padding: 16px 38px; border-radius: 100px;
            font-weight: 600; font-size: 1rem; text-decoration: none;
            box-shadow: 0 4px 18px rgba(199,154,46,0.08);
            transition: background 0.4s, border-color 0.4s, transform 0.25s, box-shadow 0.4s;
            white-space: nowrap;
          }
          .btn-hero-secondary:hover {
            background: rgba(199,154,46,0.1);
            border-color: #C79A2E;
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(199,154,46,0.22);
          }

          .hm-stat-sep { width: 1px; height: 48px; background: rgba(199,154,46,0.3); }
          .hm-stat-card {
            transition: transform 0.3s ease;
          }
          .hm-stat-card:hover {
            transform: translateY(-3px);
          }

          .hm-particle {
            position: absolute; border-radius: 50%;
            background: radial-gradient(circle, #C79A2E, rgba(199,154,46,0));
            animation: homeParticle linear infinite;
            pointer-events: none;
          }

          /* Sacred 580px Golden Lotus Mandala Rotation */
          .hero-mandala-580 {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 580px;
            height: 580px;
            opacity: 0.95;
            pointer-events: none;
            animation: rotateMandala 80s linear infinite;
            will-change: transform;
            transform: translate(-50%, -50%) translateZ(0);
            z-index: 0;
            filter: drop-shadow(0 0 10px rgba(146, 96, 12, 0.35));
          }

          /* ── Hero Container & Grid Layout ── */
          .hm-inner {
            max-width: 1440px;
            width: 100%;
            margin: 0 auto;
            padding: 0 60px;
            position: relative;
            z-index: 10;
          }
          .hm-grid {
            display: grid;
            grid-template-columns: 1.05fr 0.95fr;
            align-items: center;
            gap: 30px;
            min-height: auto;
            padding: 30px 0 20px;
          }
          .hm-left { max-width: 650px; }
          .hm-left p { max-width: 580px; }
          .hm-left .hm-btns { display: flex; flex-direction: row; flex-wrap: wrap; gap: 14px; align-items: center; }
          .hm-left .hm-stats { display: flex; flex-direction: row; flex-wrap: wrap; align-items: center; gap: 24px; }
          
          .hm-right {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            min-height: 480px;
          }

          /* Responsive Breakpoints */
          @media (max-width: 1200px) {
            .hm-inner { padding: 0 24px; }
            .hm-grid { gap: 24px; }
            .hero-mandala-580 { width: 440px; height: 440px; }
          }
          @media (max-width: 900px) {
            .hm-inner { padding: 0 16px; }
            .hm-grid {
              grid-template-columns: 1fr;
              min-height: auto;
              padding: 24px 0 20px;
              gap: 20px;
            }
            .hm-left { max-width: 100%; order: 2; text-align: center; }
            .hm-left p { margin-left: auto; margin-right: auto; }
            .hm-left .hm-btns { justify-content: center; }
            .hm-left .hm-stats { justify-content: center; }
            .hm-right { order: 1; min-height: 320px; margin-bottom: 5px; }
            .hero-mandala-580 { width: 320px; height: 320px; }
            .hero-guru-cutout { max-width: 290px !important; }
          }
          @media (max-width: 600px) {
            .hm-grid { padding: 16px 0 16px; gap: 16px; }
            .hm-left .hm-btns { flex-direction: column; width: 100%; gap: 10px; }
            .btn-hero-primary, .btn-hero-secondary { width: 100%; justify-content: center; padding: 12px 18px; font-size: 0.9rem; }
            .hm-left .hm-stats {
              display: grid !important;
              grid-template-columns: repeat(3, 1fr) !important;
              gap: 6px !important;
              width: 100% !important;
              justify-items: center !important;
              align-items: flex-start !important;
            }
            .hm-stat-card {
              align-items: center !important;
              text-align: center !important;
              width: 100% !important;
            }
            .hm-stat-sep { display: none !important; }
            .hm-right { order: 1; min-height: 260px; margin-bottom: 0px; }
            .hero-mandala-580 { width: 260px; height: 260px; }
            .hero-guru-cutout { max-width: 230px !important; }
          }
        `}</style>

        {/* Ambient background subtle lighting */}
        <div style={{
          position: "absolute", top: "-10%", left: "-5%",
          width: "650px", height: "650px",
          background: "radial-gradient(circle, rgba(199,154,46,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "-5%", right: "-5%",
          width: "750px", height: "750px",
          background: "radial-gradient(circle, rgba(199,154,46,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Luxury paper texture pattern overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(rgba(199,154,46,0.035) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
        }} />

        {/* Floating dust & sparkle particles */}
        {[{s:8,l:"12%",b:"15%",d:"12s",del:"0s"},{s:6,l:"22%",b:"35%",d:"15s",del:"1s"},{s:9,l:"7%",b:"55%",d:"14s",del:"2s"},{s:5,l:"28%",b:"25%",d:"18s",del:"3s"},{s:7,l:"85%",b:"40%",d:"16s",del:"1.5s"}].map((p,i)=>(
          <div key={i} className="hm-particle" style={{
            width: `${p.s}px`, height: `${p.s}px`,
            left: p.l, bottom: p.b,
            animationDuration: p.d, animationDelay: p.del,
            opacity: 0.4,
          }} />
        ))}

        <div className="hm-inner">
          <div className="hm-grid">

            {/* ── LEFT COLUMN CONTENT ── */}
            <div className="hm-left hm-fade-1">

              {/* Small Premium Badge */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                background: "rgba(255, 253, 249, 0.9)",
                border: "1.5px solid rgba(199, 154, 46, 0.45)",
                borderRadius: "100px", padding: "8px 22px",
                backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
                marginBottom: "20px",
                boxShadow: "0 4px 18px rgba(199,154,46,0.08)"
              }}>
                <LotusIcon size={18} color="#C79A2E" />
                <span style={{
                  color: "#8B6914", fontSize: "11px", fontWeight: 700,
                  letterSpacing: "0.2em", textTransform: "uppercase" as const
                }}>
                  Sound Body &bull; Sound Mind &bull; Self Realization
                </span>
              </div>

              {/* Editorial Heading */}
              <h1 style={{ margin: "0 0 18px", fontFamily: "'Playfair Display', serif", lineHeight: 1.02, fontWeight: 700 }}>
                <span className="hm-fade-1" style={{ display: "block", fontSize: "clamp(30px, 3.8vw, 56px)", color: "var(--foreground)", letterSpacing: "-0.015em" }}>
                  Awaken Your
                </span>
                <span className="hm-fade-2" style={{
                  display: "block", fontSize: "clamp(32px, 4.2vw, 60px)", fontStyle: "italic", fontWeight: 700,
                  backgroundImage: "linear-gradient(135deg, #B8860B 0%, #C79A2E 50%, #E6C84A 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                  paddingTop: "0.08em", marginTop: "-0.05em", paddingRight: "0.1em"
                }}>
                  <TextType 
                    text={["True Potential", "Sound Body", "Sound Mind", "Self Realization"]}
                    typingSpeed={75}
                    pauseDuration={1800}
                    showCursor
                    cursorCharacter="_"
                    deletingSpeed={50}
                    variableSpeedEnabled={false}
                    cursorBlinkDuration={0.5}
                  />
                </span>
                <span className="hm-fade-3" style={{ display: "block", fontSize: "clamp(30px, 3.8vw, 56px)", color: "var(--foreground)", letterSpacing: "-0.015em", marginTop: "-0.05em" }}>
                  with Science Divine
                </span>
                <span className="hm-fade-3" style={{ display: "block", fontSize: "clamp(30px, 3.8vw, 56px)", color: "var(--foreground)", letterSpacing: "-0.015em" }}>
                  Movement
                </span>
              </h1>


              {/* Description */}
              <p className="hm-fade-4" style={{ fontSize: "1.05rem", color: "var(--foreground)", opacity: 0.8, lineHeight: 1.65, marginBottom: "28px", maxWidth: "580px" }}>
                Journey towards conscious living through Sound Body, Sound Mind, and Self-Realization, guided by enlightened master{" "}
                <strong style={{ color: "#C79A2E", fontWeight: 700 }}>Sakshi Shree</strong>.
              </p>

              {/* CTA Buttons */}
              <div className="hm-fade-5 hm-btns" style={{ marginBottom: "36px" }}>
                <Link href="/book-session" className="btn-hero-primary">
                  <User size={18} />
                  Meet Sakshi Shree <ArrowRight size={18} className="btn-arrow" />
                </Link>
                <Link href="/events" className="btn-hero-secondary">
                  <Calendar size={18} style={{ color: "#C79A2E" }} />
                  Join Our Next Event
                </Link>
              </div>

              {/* Statistics */}
              <div className="hm-fade-6 hm-stats">
                {[
                  { icon: <Users size={22} color="#C79A2E" />, num: "5M+", label: "Lives Impacted" },
                  { icon: <LotusIcon size={22} color="#C79A2E" />, num: "40+", label: "Years of Wisdom" },
                  { icon: <Calendar size={22} color="#C79A2E" />, num: "1000+", label: "Events Held" }
                ].map((s, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <div className="hm-stat-sep" />}
                    <div className="hm-stat-card" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                      <div style={{ marginBottom: "6px" }}>{s.icon}</div>
                      <div style={{
                        fontFamily: "'Playfair Display', serif", fontSize: "2.2rem",
                        fontWeight: 800, color: "var(--foreground)", lineHeight: 1,
                        display: "flex", alignItems: "baseline"
                      }}>
                        {s.num.replace(/\D/g, '')}
                        <span style={{ fontSize: "1.6rem", fontWeight: 700, marginLeft: "2px", color: "#C79A2E" }}>
                          {s.num.replace(/\d/g, '')}
                        </span>
                      </div>
                      <div style={{
                        fontSize: "0.78rem", color: "var(--foreground)", opacity: 0.7, marginTop: "6px",
                        fontWeight: 600, letterSpacing: "0.02em"
                      }}>{s.label}</div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* ── RIGHT COLUMN ── GURU JI & ROTATING CHAKRA MANDALA ── */}
            <div className="hm-right hm-fade-img">

              {/* Radiant Golden Backlight Aura */}
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "500px",
                height: "500px",
                background: "radial-gradient(circle, rgba(245, 158, 11, 0.35) 0%, rgba(212, 175, 55, 0.2) 45%, transparent 70%)",
                borderRadius: "50%",
                filter: "blur(28px)",
                pointerEvents: "none",
                zIndex: 1,
                animation: "homePulse 4s ease-in-out infinite",
              }} />

              {/* Rotating Sacred Golden Chakra Mandala Layer */}
              <svg className="hero-mandala-580" style={{ opacity: 0.95 }} viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
                <g stroke="#92400E" fill="none" strokeWidth="2.2">
                  {/* Outer Sacred Geometry Rings */}
                  <circle cx="300" cy="300" r="290" stroke="#78350F" strokeWidth="2" opacity="0.85" strokeDasharray="5 7" />
                  <circle cx="300" cy="300" r="280" stroke="#854D0E" strokeWidth="3.2" opacity="0.95" />
                  <circle cx="300" cy="300" r="270" stroke="#9A3412" strokeWidth="1.8" opacity="0.85" />
                  
                  {/* Sacred Lotus Petals ── Outer Layer */}
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => (
                    <g key={deg} transform={`rotate(${deg} 300 300)`}>
                      <path d="M300,25 Q335,150 300,275 Q265,150 300,25" opacity="0.95" stroke="#78350F" strokeWidth="2.6" />
                      <circle cx="300" cy="45" r="4.5" fill="#854D0E" stroke="#78350F" strokeWidth="1.2" opacity="1" />
                      <line x1="300" y1="25" x2="300" y2="275" opacity="0.65" stroke="#92400E" strokeWidth="1.5" />
                    </g>
                  ))}
                  
                  {/* Sacred Lotus Petals ── Inner Layer */}
                  {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map(deg => (
                    <g key={deg} transform={`rotate(${deg} 300 300)`}>
                      <path d="M300,60 Q325,170 300,275 Q275,170 300,60" opacity="0.9" stroke="#9A3412" strokeWidth="2.4" />
                      <circle cx="300" cy="85" r="4" fill="#78350F" opacity="0.95" />
                    </g>
                  ))}

                  {/* Inner Concentric Rings */}
                  <circle cx="300" cy="300" r="210" stroke="#854D0E" strokeWidth="3" opacity="0.95" />
                  <circle cx="300" cy="300" r="195" stroke="#78350F" strokeWidth="2.5" opacity="0.85" strokeDasharray="4 8" />
                  <circle cx="300" cy="300" r="150" stroke="#92400E" strokeWidth="2.4" opacity="0.95" />
                  
                  {/* Sunburst Rays Core */}
                  {[...Array(36)].map((_, i) => (
                    <line key={i} x1="300" y1="170" x2="300" y2="275" opacity="0.75" stroke="#78350F" strokeWidth="1.8" transform={`rotate(${i * 10} 300 300)`} />
                  ))}
                </g>
              </svg>

              {/* Main Static Guru Ji Portrait floating gracefully above mountain clouds */}
              <img
                src="https://sciencedivine.org/wp-content/uploads/2025/01/dhyan-with-happy-face-copy-1-1-896x1024.webp"
                alt="Sakshi Shree ── Enlightened Spiritual Master in Meditation"
                className="hero-guru-cutout"
                style={{
                  position: "relative", zIndex: 2,
                  width: "100%",
                  maxWidth: "490px",
                  height: "auto",
                  maxHeight: "560px",
                  objectFit: "contain",
                  animation: "homeFloat 6s ease-in-out infinite",
                  filter: "drop-shadow(0 16px 36px rgba(184, 134, 11, 0.32))",
                  maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 84%, rgba(0,0,0,0) 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 84%, rgba(0,0,0,0) 100%)",
                }}
              />

              {/* Floating gold sparkle particles */}
              {[{t:"12%",r:"6%",s:10,d:"5s",del:"0s"},{t:"52%",r:"2%",s:7,d:"7s",del:"1.5s"},{t:"78%",r:"10%",s:5,d:"6s",del:"3s"},{t:"22%",l:"4%",s:8,d:"8s",del:"2s"}].map((p,i)=>(
                <div key={i} className="hm-particle" style={{
                  width: `${p.s}px`, height: `${p.s}px`,
                  top: p.t,
                  ...('right' in p ? { right: p.r } : {}),
                  ...('left' in p ? { left: p.l } : {}),
                  animationDuration: p.d, animationDelay: p.del,
                  opacity: 0.75, zIndex: 3,
                }} />
              ))}
            </div>

          </div>
        </div>


      </section>

      {/* ════════════════════════════════════
          SCIENCE DIVINE MOVEMENT
      ════════════════════════════════════ */}
      <section
        className="section-pad relative overflow-hidden"
        style={{
          position: "relative",
          backgroundImage: "url('/clean-golden-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container-page relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-start mb-10">
            <div>
              <SectionHeading eyebrow="Our Mission" title="Science Divine Movement" />
              <p className="text-gray-700 leading-relaxed font-medium">
                The Science Divine Movement is a global initiative helping people realize their
                optimum potential through definite scientific techniques for sound body, sound mind,
                and self-realization. Founded by enlightened spiritual master Sakshi Shree, it
                simplifies spirituality to become an integral part of everyday life.
              </p>
            </div>
            <div>
              <blockquote
                className="font-quote text-xl md:text-2xl text-slate-900 leading-relaxed mb-6 italic pl-5 border-l-4 rounded-r-2xl p-4"
                style={{
                  borderColor: "#D4AF37",
                  background: "rgba(255, 255, 255, 0.75)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 6px 24px rgba(212, 175, 55, 0.12)",
                }}
              >
                "Bheetar se sanyaas, bahar se sansaar", total participation in worldly life while
                enjoying complete inner renunciation.
              </blockquote>
              <Link
                href="/about-movement"
                className="btn-outline-gold rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm shadow-md"
              >
                Learn More <ArrowRight size={15} />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {FEATURE_CARDS.map((p) => (
              <GlareHover
                key={p.title}
                glareColor="#ffffff"
                glareOpacity={0.35}
                glareAngle={-30}
                glareSize={320}
                transitionDuration={800}
                playOnce={false}
                className="h-full rounded-[20px]"
              >
                <div
                  className="group flex h-full flex-col rounded-[20px] p-6 transition-all duration-500 hover:-translate-y-2 md:p-7"
                  style={{
                    background: "rgba(255, 255, 255, 0.88)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.95)",
                    boxShadow: "0 12px 36px rgba(184, 134, 11, 0.08)",
                  }}
                >
                  <div className="h-[220px] w-full overflow-hidden rounded-[18px] bg-gray-100 shadow-md">
                    <LensImage
                      src={p.image}
                      alt={p.alt}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col px-1 pb-1 pt-7 text-center">
                    <h3 className="font-display text-2xl font-bold leading-tight text-gray-900">
                      {p.title}
                    </h3>
                    <p className="mx-auto mt-4 max-w-xs text-sm leading-7 text-gray-600 font-medium">{p.desc}</p>
                  </div>
                </div>
              </GlareHover>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          FIND SOLUTIONS FOR
      ════════════════════════════════════ */}
      <section
        className="section-pad"
        style={{
          position: "relative",
          backgroundImage: "url('/solutions-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container-page" style={{ position: "relative", zIndex: 1 }}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Solutions icon grid */}
            <div>
              <SectionHeading eyebrow="Guidance" title="Find Solutions For :" />
              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed font-medium">
                Explore Sakshi Shree's teachings centered around overcoming common struggles such as
                depression, anxiety, anger, and more. Find practical guidance to navigate life's
                challenges and enhance your well-being.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {SOLUTION_ITEMS.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/${item.slug}` as string}
                    className="p-4 rounded-2xl text-center group transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: "rgba(255, 255, 255, 0.85)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      border: "1px solid rgba(255, 255, 255, 0.9)",
                      boxShadow: "0 8px 24px rgba(0, 40, 100, 0.05)",
                    }}
                  >
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="w-12 h-12 object-contain mx-auto mb-2 group-hover:scale-110 transition-transform"
                    />
                    <p className="text-xs font-bold text-gray-800 dark:text-gray-900">{item.label}</p>
                  </Link>
                ))}
              </div>
              <div className="mt-6">
                <Link
                  href="/get-solutions-for"
                  className="btn-gold rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center gap-2 shadow-lg"
                >
                  All Solutions <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Right image */}
            <div className="flex justify-center">
              <div className="w-full max-w-sm overflow-hidden rounded-3xl shadow-2xl border-4 border-white/80">
                <LensImage
                  src="https://sciencedivine.org/wp-content/uploads/2025/01/dhyan-with-happy-face-copy-1-1-896x1024.webp"
                  alt="Meditation and inner peace"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

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
                  src="https://sciencedivine.org/wp-content/uploads/2024/05/aboutsakshishree.jpg"
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
          STATS BANNER
      ════════════════════════════════════ */}
      <section className="py-16" style={{ background: "#0F172A" }}>
        <div className="container-page">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            {[
              { val: <Counter to={5000000} suffix="+" />, label: "Lives Impacted" },
              { val: <Counter to={1000} suffix="+" />, label: "Meditation Events" },
              { val: <Counter to={10000} suffix="+" />, label: "Students Educated" },
              { val: "9/10", label: "Experience Inner Peace" },
              { val: <Counter to={40} suffix="+" />, label: "Years of Guidance" },
            ].map((s, i) => (
              <div key={i} className="space-y-2">
                <div
                  className="font-display text-3xl md:text-4xl font-bold"
                  style={{ color: "#D4AF37" }}
                >
                  {s.val}
                </div>
                <div className="text-xs text-white/60 uppercase tracking-wider">{s.label}</div>
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
          HAR GHAR SHIKSHA BANNER
      ════════════════════════════════════ */}
      <section className="relative overflow-hidden py-24" style={{ background: "#0B132B" }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(https://sciencedivine.org/wp-content/uploads/2025/02/mzlvjnkn-1-scaled.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center 20%",
            opacity: 0.55,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(15,23,42,0.6) 0%, rgba(15,23,42,0.8) 100%)",
          }}
        />
        <div className="container-page relative text-center text-white">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border"
            style={{
              borderColor: "rgba(212,175,55,0.4)",
              color: "#D4AF37",
              background: "rgba(212,175,55,0.1)",
            }}
          >
            Campaign
          </div>
          <h2
            className="font-display text-3xl md:text-5xl font-bold mb-4"
            style={{ textShadow: "0 4px 12px rgba(0,0,0,0.6)" }}
          >
            Har Ghar Shiksha,{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #FBBF24, #F59E0B)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Har Ghar Dhyan
            </span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-8 text-base leading-relaxed">
            Empowering futures through education. Science Divine provides free schooling for
            underprivileged children, aiming to shape brighter futures and break the cycle of
            poverty through quality education.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={RAZORPAY_DONATION_LINK}
              target="_blank"
              rel="noreferrer"
              className="btn-gold rounded-full px-8 py-3.5 text-sm font-semibold"
            >
              Donate Now
            </a>
            <Link
              href="/har-ghar-shiksha"
              className="rounded-full px-8 py-3.5 text-sm font-semibold border border-white/30 text-white hover:bg-white/10 transition-colors"
            >
              Learn More
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
