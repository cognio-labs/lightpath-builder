import { createFileRoute, Link } from "@tanstack/react-router";
import * as React from "react";
import { SectionHeading } from "@/components/PageHero";
import { YouTubeThumb } from "@/components/YouTubeEmbed";
import { Lens } from "@/components/ui/lens";
import { Counter } from "@/lib/useCounter";
import {
  COURSES,
  EVENTS,
  TESTIMONIALS,
  TESTIMONIAL_VIDEOS,
  SOCIALS,
  LEADERS,
} from "@/data/content";
import {
  ArrowRight,
  Calendar,
  MapPin,
  Clock,
  Facebook,
  Youtube,
  Instagram,
  Linkedin,
  Heart,
  BookOpen,
  Droplets,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Science Divine Foundation | Sound Body, Sound Mind, Self Realization" },
      {
        name: "description",
        content:
          "Awaken your true potential with Science Divine Movement. Sound Body, Sound Mind, Self-Realization through meditation and spiritual guidance by Sakshi Shree.",
      },
      { property: "og:title", content: "Science Divine Foundation" },
      {
        property: "og:description",
        content:
          "Awaken your true potential with Science Divine Movement by enlightened master Sakshi Shree.",
      },
      { property: "og:url", content: "/" },
    ],
  }),
  component: Home,
});

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
function Home() {
  return (
    <>
      {/* ════════════════════════════════════
          HERO — Master Premium Redesign
      ════════════════════════════════════ */}
      <section style={{
        background: "#FCF8F1",
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}>
        <style>{`
          @keyframes homeFadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
          @keyframes homeFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
          @keyframes homePulse { 0%,100%{opacity:.3} 50%{opacity:.65} }
          @keyframes homeRotate { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
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
            display: inline-flex; align-items: center; gap: 10px;
            background: linear-gradient(135deg, #C9910B, #D4AF37, #E6C84A, #C9910B);
            background-size: 200% auto;
            color: #FFFFFF; padding: 16px 36px; border-radius: 100px;
            font-weight: 700; font-size: 1rem; text-decoration: none;
            box-shadow: 0 10px 30px rgba(212,175,55,0.35);
            transition: background-position 0.4s, box-shadow 0.4s, transform 0.2s;
            white-space: nowrap;
          }
          .btn-hero-primary:hover {
            background-position: right center;
            box-shadow: 0 14px 40px rgba(212,175,55,0.5);
            transform: translateY(-2px);
          }
          .btn-hero-primary:hover .btn-arrow { transform: translateX(4px); }
          .btn-arrow { transition: transform 0.3s; }

          .btn-hero-secondary {
            display: inline-flex; align-items: center; gap: 10px;
            background: rgba(255,255,255,0.75);
            border: 1.5px solid rgba(212,175,55,0.45);
            color: #081A36; padding: 16px 36px; border-radius: 100px;
            font-weight: 600; font-size: 1rem; text-decoration: none;
            backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
            transition: background 0.4s, border-color 0.4s, transform 0.2s;
            white-space: nowrap;
          }
          .btn-hero-secondary:hover {
            background: rgba(212,175,55,0.08);
            border-color: #D4AF37;
            transform: translateY(-2px);
          }

          .hm-stat-sep { width: 1px; height: 40px; background: rgba(8,26,54,0.15); }
          .hm-particle {
            position: absolute; border-radius: 50%;
            background: radial-gradient(circle, #D4AF37, rgba(212,175,55,0));
            animation: homeParticle linear infinite;
            pointer-events: none;
          }

          /* ── Hero Grid Layout ── */
          .hm-inner {
            max-width: 1440px;
            width: 100%;
            margin: 0 auto;
            padding: 0 80px;
            position: relative;
            z-index: 10;
          }
          .hm-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            align-items: center;
            gap: 80px;
            min-height: 100vh;
            padding: 100px 0 80px;
          }
          .hm-left { max-width: 700px; }
          .hm-left p { max-width: 620px; }
          .hm-left .hm-btns { display: flex; flex-direction: row; flex-wrap: wrap; gap: 16px; align-items: center; }
          .hm-left .hm-stats { display: flex; flex-direction: row; flex-wrap: wrap; align-items: center; gap: 32px; }
          .hm-right {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 600px;
          }

          /* Responsive */
          @media (max-width: 1100px) {
            .hm-inner { padding: 0 40px; }
            .hm-grid { gap: 48px; }
          }
          @media (max-width: 800px) {
            .hm-inner { padding: 0 24px; }
            .hm-grid {
              grid-template-columns: 1fr;
              min-height: auto;
              padding: 100px 0 60px;
              gap: 40px;
            }
            .hm-left { max-width: 100%; order: 2; }
            .hm-right { order: 1; min-height: 400px; }
          }
        `}</style>

        {/* Ambient background glows */}
        <div style={{
          position: "absolute", top: "-10%", left: "-5%",
          width: "700px", height: "700px",
          background: "radial-gradient(circle, rgba(212,175,55,0.14) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "-10%", right: "40%",
          width: "600px", height: "600px",
          background: "radial-gradient(circle, rgba(46,139,87,0.09) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Right side golden glow behind guru */}
        <div style={{
          position: "absolute", top: "-20%", right: "-10%",
          width: "900px", height: "900px",
          background: "radial-gradient(circle, rgba(212,175,55,0.18) 0%, rgba(245,200,60,0.10) 40%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Lotus subtle watermark overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(rgba(212,175,55,0.025) 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
          pointerEvents: "none",
        }} />

        {/* Floating particles */}
        {[{s:8,l:"12%",b:"15%",d:"7s",del:"0s"},{s:6,l:"22%",b:"35%",d:"9s",del:"1s"},{s:9,l:"7%",b:"55%",d:"8s",del:"2s"},{s:5,l:"28%",b:"25%",d:"10s",del:"3s"}].map((p,i)=>(
          <div key={i} className="hm-particle" style={{
            width: `${p.s}px`, height: `${p.s}px`,
            left: p.l, bottom: p.b,
            animationDuration: p.d, animationDelay: p.del,
            opacity: 0.5,
          }} />
        ))}

        <div className="hm-inner">
          <div className="hm-grid">

            {/* ── LEFT COLUMN ── */}
            <div className="hm-left hm-fade-1">

              {/* Badge */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                background: "rgba(255,255,255,0.85)",
                border: "1.5px solid rgba(212,175,55,0.45)",
                borderRadius: "100px", padding: "8px 22px",
                backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
                marginBottom: "28px",
              }}>
                <Sparkles size={16} color="#D4AF37" />
                <span style={{
                  color: "#8B6914", fontSize: "11px", fontWeight: 700,
                  letterSpacing: "0.22em", textTransform: "uppercase" as const
                }}>
                  Sound Body &bull; Sound Mind &bull; Self Realization
                </span>
              </div>

              {/* Heading */}
              <h1 style={{ margin: "0 0 24px", fontFamily: "'Playfair Display', serif", lineHeight: 1.05, fontWeight: 700 }}>
                <span className="hm-fade-1" style={{ display: "block", fontSize: "clamp(38px, 5.2vw, 80px)", color: "#081A36" }}>Awaken Your</span>
                <span className="hm-fade-2" style={{
                  display: "block", fontSize: "clamp(38px, 5.2vw, 80px)", fontStyle: "italic",
                  background: "linear-gradient(135deg, #B8860B 0%, #D4AF37 40%, #E6C84A 60%, #C9910B 100%)",
                  WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
                  paddingTop: "0.15em", marginTop: "-0.15em", paddingRight: "0.1em"
                }}>True Potential</span>
                <span className="hm-fade-3" style={{ display: "block", fontSize: "clamp(38px, 5.2vw, 80px)", color: "#081A36" }}>with Science Divine</span>
                <span className="hm-fade-3" style={{ display: "block", fontSize: "clamp(38px, 5.2vw, 80px)", color: "#081A36" }}>Movement</span>
              </h1>

              {/* Subtitle */}
              <p className="hm-fade-4" style={{ fontSize: "1.1rem", color: "#5C677D", lineHeight: 1.7, marginBottom: "36px", maxWidth: "620px" }}>
                Begin a journey of meditation, wisdom, and conscious living under the guidance of enlightened master{" "}
                <strong style={{ color: "#D4AF37", fontWeight: 700 }}>Sakshi Shree</strong>. Discover inner peace, unlock your true potential, and transform every aspect of your life.
              </p>

              {/* Buttons */}
              <div className="hm-fade-5 hm-btns" style={{ marginBottom: "40px" }}>
                <Link to="/book-session" className="btn-hero-primary">
                  Meet Sakshi Shree <ArrowRight size={18} className="btn-arrow" />
                </Link>
                <Link to="/courses" className="btn-hero-secondary">
                  Explore Programs
                </Link>
              </div>

              {/* Stats */}
              <div className="hm-fade-6 hm-stats">
                {[
                  { num: "5M+", label: "Lives Impacted" },
                  { num: "40+", label: "Years of Wisdom" },
                  { num: "1000+", label: "Meditation Programs" }
                ].map((s, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <div className="hm-stat-sep" />}
                    <div>
                      <div style={{
                        fontFamily: "'Playfair Display', serif", fontSize: "2.5rem",
                        fontWeight: 800, color: "#D4AF37", lineHeight: 1,
                        display: "flex", alignItems: "baseline"
                      }}>
                        {s.num.replace(/\D/g, '')}
                        <span style={{ fontSize: "1.75rem", fontWeight: 600, marginLeft: "2px" }}>
                          {s.num.replace(/\d/g, '')}
                        </span>
                      </div>
                      <div style={{
                        fontSize: "0.78rem", color: "#5C677D", marginTop: "6px",
                        fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" as const
                      }}>{s.label}</div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className="hm-right hm-fade-img">

              {/* Outer pulsing golden glow */}
              <div style={{
                position: "absolute", inset: 0, margin: "auto",
                width: "88%", aspectRatio: "1", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(212,175,55,0.30) 0%, rgba(212,175,55,0.10) 55%, transparent 75%)",
                animation: "homePulse 4s ease-in-out infinite",
                pointerEvents: "none", zIndex: 0,
              }} />

              {/* Mandala ring */}
              <div style={{
                position: "absolute", inset: 0, margin: "auto",
                width: "72%", aspectRatio: "1", borderRadius: "50%",
                border: "1.5px solid rgba(212,175,55,0.28)",
                boxShadow: "0 0 60px rgba(212,175,55,0.22), inset 0 0 60px rgba(212,175,55,0.10)",
                animation: "homePulse 5s 1s ease-in-out infinite",
                pointerEvents: "none", zIndex: 0,
              }} />

              {/* Inner halo */}
              <div style={{
                position: "absolute", inset: 0, margin: "auto",
                width: "52%", aspectRatio: "1", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,245,190,0.65) 0%, transparent 70%)",
                pointerEvents: "none", zIndex: 0,
              }} />

              {/* Ivory fade at bottom */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "100px",
                background: "linear-gradient(to top, #FCF8F1 15%, rgba(252,248,241,0.8) 50%, transparent 100%)",
                zIndex: 2, pointerEvents: "none",
              }} />

              {/* Guru Ji portrait */}
              <img
                src="https://sciencedivine.org/wp-content/uploads/2025/01/dhyan-with-happy-face-copy-1-1-896x1024.webp"
                alt="Sakshi Shree — Enlightened Spiritual Master in Meditation"
                style={{
                  position: "relative", zIndex: 1,
                  width: "100%",
                  maxWidth: "520px",
                  height: "700px",
                  objectFit: "contain",
                  objectPosition: "center bottom",
                  animation: "homeFloat 6s ease-in-out infinite",
                  filter: "drop-shadow(0 24px 48px rgba(150,100,0,0.18))",
                }}
              />

              {/* Floating gold particles */}
              {[{t:"12%",r:"6%",s:10,d:"5s",del:"0s"},{t:"52%",r:"2%",s:7,d:"7s",del:"1.5s"},{t:"78%",r:"10%",s:5,d:"6s",del:"3s"},{t:"22%",l:"4%",s:8,d:"8s",del:"2s"}].map((p,i)=>(
                <div key={i} className="hm-particle" style={{
                  width: `${p.s}px`, height: `${p.s}px`,
                  top: p.t,
                  ...('right' in p ? { right: p.r } : {}),
                  ...('left' in p ? { left: p.l } : {}),
                  animationDuration: p.d, animationDelay: p.del,
                  opacity: 0.7, zIndex: 3,
                }} />
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          SCIENCE DIVINE MOVEMENT
      ════════════════════════════════════ */}
      <section className="section-pad" style={{ background: "#FAFAFA" }}>
        <div className="container-page">
          <div className="grid md:grid-cols-2 gap-12 items-start mb-12">
            <div>
              <SectionHeading eyebrow="Our Mission" title="Science Divine Movement" />
              <p className="text-gray-600 leading-relaxed">
                The Science Divine Movement is a global initiative helping people realize their
                optimum potential through definite scientific techniques for sound body, sound mind,
                and self-realization. Founded by enlightened spiritual master Sakshi Shree, it
                simplifies spirituality to become an integral part of everyday life.
              </p>
            </div>
            <div>
              <p className="text-gray-500 leading-relaxed mb-6 italic font-quote text-xl text-amber-700">
                "Bheetar se sanyaas, bahar se sansaar" — total participation in worldly life while
                enjoying complete inner renunciation.
              </p>
              <Link
                to="/about-movement"
                className="btn-outline-gold rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center gap-2"
              >
                Learn More <ArrowRight size={15} />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {FEATURE_CARDS.map((p) => (
              <div
                key={p.title}
                className="group flex h-full flex-col rounded-[20px] border border-[#EAEAEA] bg-white p-6 shadow-[0_12px_36px_rgba(17,24,39,0.07)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_56px_rgba(17,24,39,0.12)] md:p-7"
              >
                <div className="h-[220px] w-full overflow-hidden rounded-[18px] bg-gray-100">
                  <img
                    src={p.image}
                    alt={p.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col px-1 pb-1 pt-7 text-center">
                  <h3 className="font-display text-2xl font-bold leading-tight text-gray-900">
                    {p.title}
                  </h3>
                  <p className="mx-auto mt-4 max-w-xs text-sm leading-7 text-gray-500">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          FIND SOLUTIONS FOR
      ════════════════════════════════════ */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Solutions icon grid */}
            <div>
              <SectionHeading eyebrow="Guidance" title="Find Solutions For :" />
              <p className="text-gray-500 mb-8 leading-relaxed">
                Explore Sakshi Shree's teachings centered around overcoming common struggles such as
                depression, anxiety, anger, and more. Find practical guidance to navigate life's
                challenges and enhance your well-being.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {SOLUTION_ITEMS.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/${item.slug}` as string}
                    className="card-premium p-4 rounded-2xl text-center hover:border-amber-300 group"
                  >
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="w-12 h-12 object-contain mx-auto mb-2 group-hover:scale-110 transition-transform"
                    />
                    <p className="text-xs font-semibold text-gray-700">{item.label}</p>
                  </Link>
                ))}
              </div>
              <div className="mt-6">
                <Link
                  to="/get-solutions-for"
                  className="btn-gold rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center gap-2"
                >
                  All Solutions <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Right image */}
            <div className="flex justify-center">
              <div className="w-full max-w-sm overflow-hidden rounded-3xl shadow-xl">
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
        className="section-pad"
        style={{ background: "linear-gradient(135deg, #FFFBF0 0%, #FFF3D0 100%)" }}
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
              <blockquote className="font-quote text-2xl md:text-3xl text-gray-800 leading-relaxed -mt-4">
                Your thoughts create your reality. Choose them wisely, for they hold the power to
                design your destiny.
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 max-w-12" style={{ background: "#D4AF37" }} />
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
      <section className="section-pad bg-white">
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
      <section className="section-pad" style={{ background: "#FAFAFA" }}>
        <div className="container-page">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-12">
            <SectionHeading
              eyebrow="Transformative Programs"
              title="Courses by Sakshi Shree"
              subtitle="Four foundational programs that thousands have used to reshape their inner life."
            />
            <Link
              to="/courses"
              className="btn-outline-gold rounded-full px-6 py-2.5 text-sm font-semibold whitespace-nowrap shrink-0"
            >
              All Courses <ArrowRight size={14} className="inline ml-1" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COURSES.map((c) => (
              <Link
                key={c.slug}
                to={`/${c.slug}` as string}
                className="card-premium rounded-2xl overflow-hidden group"
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
      <section className="section-pad bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Voices"
            title="Empowering millions through conscious living."
            subtitle="Real stories from real people whose lives have transformed."
          />
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {TESTIMONIALS.slice(0, 3).map((t) => (
              <div key={t.name} className="card-premium rounded-2xl p-6 relative">
                <div className="text-4xl font-quote text-amber-200 absolute top-4 right-5">"</div>
                <p className="font-quote text-lg text-gray-700 leading-relaxed mb-5 italic">
                  {t.quote}
                </p>
                <div
                  className="flex items-center gap-3 pt-4 border-t"
                  style={{ borderColor: "#F3E5AB" }}
                >
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-sm text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Video testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {TESTIMONIAL_VIDEOS.slice(0, 3).map((v) => (
              <YouTubeThumb key={v.id} id={v.id} title={v.title} />
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/testimonials"
              className="btn-outline-gold rounded-full px-7 py-3 text-sm font-semibold inline-flex items-center gap-2"
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
              subtitle="Enriching Lives Through Compassionate Initiatives — Empowering Education, Nourishing Communities, and Ensuring Health Equity."
            />
            <Link
              to="/initiatives"
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
                  href="https://rzp.io/rzp/XtVLpqil"
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
                  href="https://rzp.io/rzp/XtVLpqil"
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
                  href="https://rzp.io/rzp/XtVLpqil"
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
            backgroundPosition: "center",
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
              href="https://rzp.io/rzp/XtVLpqil"
              target="_blank"
              rel="noreferrer"
              className="btn-gold rounded-full px-8 py-3.5 text-sm font-semibold"
            >
              Donate Now
            </a>
            <Link
              to="/har-ghar-shiksha"
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
      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-12">
            <SectionHeading eyebrow="Coming Up" title="Upcoming Events & Retreats" />
            <Link
              to="/events"
              className="btn-outline-gold rounded-full px-6 py-2.5 text-sm font-semibold whitespace-nowrap shrink-0"
            >
              View All Events <ArrowRight size={14} className="inline ml-1" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {EVENTS.slice(0, 3).map((e, i) => (
              <div key={i} className="card-premium rounded-2xl p-6">
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
                  to="/events"
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
          SAKSHI WISDOM — BLOGS
      ════════════════════════════════════ */}
      <section className="section-pad" style={{ background: "#FAFAFA" }}>
        <div className="container-page">
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
                className="card-premium rounded-2xl p-6 group"
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
          JOIN COMMUNITY — NEWSLETTER
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
