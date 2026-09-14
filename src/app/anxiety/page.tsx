"use client";
import Link from "next/link";
import { SectionHeading } from "@/components/PageHero";
import { useState } from "react";
import {
  BookOpen,
  Quote,
  PlayCircle,
  Mic,
  ArrowRight,
  ChevronRight,
  Heart,
  Shield,
} from "lucide-react";

type Tab = "articles" | "quotes" | "videos" | "podcasts";

const ARTICLES = [
  {
    title: "7 Ways to Foster an Optimistic Mind",
    href: "https://sciencedivine.org/optimistic-mind/",
    tag: "Mindset",
    readTime: "7 min read",
    desc: "Learn to shift focus to positive options and consciously reprogram negative thought patterns.",
    image: "/articles/optimistic-mind-ai.webp",
    alt: "Young person in peaceful contemplation at sunrise reflecting on an optimistic mindset",
  },
  {
    title: "How to Be Conscious: Wake Up Your Mind Every Day",
    href: "https://sciencedivine.org/conscious/",
    tag: "Awareness",
    readTime: "8 min read",
    desc: "Cultivating presence to escape constant loops of anxiety and worry.",
    image: "/articles/conscious-mind-ai.webp",
    alt: "Person sitting mindfully by large sunlit window practicing conscious awareness",
  },
  {
    title: "How to Feel Calm: Easy Ways to Find Peace of Mind",
    href: "https://sciencedivine.org/what-is-peace-of-mind/",
    tag: "Peace",
    readTime: "6 min read",
    desc: "Simple somatic practices that immediately downregulate stress response in the body.",
    image: "/articles/feel-calm-ai.webp",
    alt: "Mindful hand mudra in warm peaceful sunlight representing calm and inner peace",
  },
  {
    title: "Why Should You Prioritize Your Mental Health Every Day?",
    href: "https://sciencedivine.org/what-is-mental-health/",
    tag: "Wellness",
    readTime: "6 min read",
    desc: "Understanding the balance between mental wellness, sleep, and physical breathing.",
    image: "/articles/mental-health-ai.webp",
    alt: "Young Indian professional woman taking a mindful break from laptop work near a window surrounded by plants",
  },
  {
    title: "Benefits of Yoga for Hypertension Management",
    href: "https://sciencedivine.org/yoga-for-hypertension/",
    tag: "Yoga",
    readTime: "8 min read",
    desc: "How dynamic alignment helps manage heart rate variability and blood pressure.",
    image: "/articles/yoga-hypertension-ai.webp",
    alt: "Middle-aged Indian man practicing gentle seated yoga pranayama in a peaceful sunlit living room",
  },
  {
    title: "Yoga Nidra: Mastering the Art of Conscious Relaxation",
    href: "https://sciencedivine.org/yoga-nidra/",
    tag: "Relaxation",
    readTime: "10 min read",
    desc: "Restorative deep relaxation method to clear chronic fatigue and mental tension.",
    image: "/articles/yoga-nidra-ai.webp",
    alt: "Indian woman in peaceful Shavasana Yoga Nidra pose on jute mat with soft candlelight and draped blanket",
  },
  {
    title: "Exploring the Symbiotic Connection Between Yoga and Mindfulness Meditation",
    href: "https://sciencedivine.org/unveiling-the-harmony/",
    tag: "Mindfulness",
    readTime: "9 min read",
    desc: "Deep meditation and somatic stretching working together for balance.",
    image: "/articles/yoga-mindfulness-ai.webp",
    alt: "Indian woman in sage green kurta meditating peacefully in a lush sunlit garden path",
  },
  {
    title: "Meditation for Seniors: Embrace a Journey to Serenity and Healthy Aging",
    href: "https://sciencedivine.org/meditation-for-seniors/",
    tag: "Meditation",
    readTime: "7 min read",
    desc: "Tailored meditation techniques suitable for senior practitioners.",
    image: "/articles/meditation-seniors-ai.webp",
    alt: "Graceful Indian senior woman in sari meditating joyfully in a sunlit home garden with greenery",
  },
  {
    title: "Harmonizing Mind and Body: The Transformative Power of Yoga and Meditation",
    href: "https://sciencedivine.org/harmonizing-mind-and-body/",
    tag: "Healing",
    readTime: "9 min read",
    desc: "A general guide to aligning biological energy paths.",
    image: "/articles/mind-body-harmony-ai.webp",
    alt: "Indian man in ivory linen meditating at sunrise on a terrace surrounded by terracotta pots and greenery",
  },
];

const VIDEOS = [
  {
    id: "okTnWaUrrcc",
    title: "Anxiety (एंग्जायटी) कैसे ठीक करें? | How to cure anxiety? | Sakshi Shree",
  },
  { id: "rBEYkNe1wIo", title: "How to Fight Fear & Anxiety : Part 2" },
  { id: "UwitMvjhZWU", title: "Immediate freedom from anxiety, stress & fear" },
  {
    id: "WuexPS1a9DM",
    title: "एक बड़ी समस्या भय, चिंता और तनाव से तुरंत मुक्त होने का 1 सरल महासूत्र",
  },
  { id: "YsHfFDVjhgg", title: "जीवन की चिंताओं से मुक्ति पाने का उपाय by सदगुरु" },
  { id: "BPBGUq-7DwM", title: "How to Fight Fear & Anxiety : Part 1" },
  { id: "DJRJ8osnYd0", title: "युवाओं के लिए डिप्रेशन, तनाव, व चिंता से मुक्ति का उपाय" },
  { id: "paffCWKd720", title: "चिंता तनाव और भय से मुक्त होने की महत्वपूर्ण तकनीक" },
];

const QUOTES = Array.from(
  { length: 9 },
  (_, i) => `https://sciencedivine.org/wp-content/uploads/2024/04/Anxiety-Quote-${i + 1}.jpg`,
);

const PODCASTS = [
  {
    name: "Swaparna Testimonial",
    id: "QLmL230dApk",
    desc: "A student sharing how she completely overcame study-related panic attacks.",
  },
  {
    name: "Helen Testimonial",
    id: "EiFMTSo8Yws",
    desc: "How mindfulness and breathwork cured years of chronic anxious loops.",
  },
  {
    name: "Pooja Testimonial",
    id: "6bkJdkmAt20",
    desc: "Reclaiming control over a fast-paced corporate life through meditation.",
  },
  {
    name: "Patty Testimonial",
    id: "5KmsxqJXACM",
    desc: "Finding peace and emotional balance after experiencing major life changes.",
  },
];

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "articles", label: "Articles", icon: <BookOpen size={17} /> },
  { id: "quotes", label: "Quotes", icon: <Quote size={17} /> },
  { id: "videos", label: "Videos", icon: <PlayCircle size={17} /> },
  { id: "podcasts", label: "Podcasts", icon: <Mic size={17} /> },
];

export default function Page() {
  const [tab, setTab] = useState<Tab>("articles");

  return (
    <>
      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          paddingTop: "140px",
          paddingBottom: "120px",
          minHeight: "85vh",
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(135deg, #1A0A2E 0%, #2D1B4E 50%, #1A0A2E 100%)",
        }}
      >
        {/* Subtle gold glow orbs */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-60px",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />

        <div className="container-page" style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              {/* Eyebrow badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(212,175,55,0.15)",
                  border: "1px solid rgba(212,175,55,0.3)",
                  borderRadius: "100px",
                  padding: "6px 16px",
                  marginBottom: "20px",
                }}
              >
                <Heart size={14} style={{ color: "#D4AF37" }} />
                <span
                  style={{
                    color: "#D4AF37",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Solutions · Anxiety
                </span>
              </div>

              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2.5rem, 4.5vw, 3.8rem)",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  lineHeight: 1.15,
                  marginBottom: "20px",
                }}
              >
                Calming the Mind:{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #F59E0B, #D4AF37)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Overcoming Anxiety
                </span>
              </h1>

              <p
                style={{
                  fontSize: "1.05rem",
                  color: "rgba(255,255,255,0.8)",
                  lineHeight: 1.8,
                  maxWidth: "620px",
                  marginBottom: "36px",
                }}
              >
                If feeling anxious about what lies ahead or overwhelmed by constant worry makes you
                feel lonely, then know that you are not alone. Under Sakshi Shree's guidance,
                explore practical solutions and age-old wisdom to help calm your mind and ease your
                worries.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                <Link
                  href="/book-session"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "linear-gradient(135deg, #F59E0B, #D4AF37)",
                    color: "#0F172A",
                    padding: "14px 28px",
                    borderRadius: "100px",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    boxShadow: "0 4px 20px rgba(212,175,55,0.35)",
                    transition: "transform 0.2s ease",
                  }}
                  className="hover:scale-105"
                >
                  Book a Session <ArrowRight size={16} />
                </Link>
                <a
                  href="#explore"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "#FFFFFF",
                    padding: "14px 28px",
                    borderRadius: "100px",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    transition: "background 0.2s ease",
                  }}
                  className="hover:bg-white/15"
                >
                  Explore Resources <ChevronRight size={16} />
                </a>
              </div>
            </div>

            {/* Right side topic image */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative w-full max-w-[480px] aspect-[4/3] sm:aspect-[1.15] overflow-hidden rounded-3xl shadow-2xl border-4 border-[#D4AF37] hover:scale-105 transition-transform duration-700">
                <img
                  src="/articles/yoga-mindfulness-ai.webp"
                  alt="Calming the Mind and Overcoming Anxiety"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs Bar */}
      <section id="explore" style={{ background: "#F8F7F4", borderBottom: "1px solid #E5E7EB" }}>
        <div className="container-page">
          <div style={{ display: "flex", gap: "4px", overflowX: "auto", paddingTop: "8px" }}>
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "16px 24px",
                  border: "none",
                  borderBottom: tab === t.id ? "3px solid #D4AF37" : "3px solid transparent",
                  background: "transparent",
                  color: tab === t.id ? "#D4AF37" : "#6B7280",
                  fontWeight: tab === t.id ? 700 : 500,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "color 0.2s, border-color 0.2s",
                }}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="section-pad bg-white">
        <div className="container-page">
          {tab === "articles" && (
            <div>
              <SectionHeading
                eyebrow="Read & Heal"
                title="Articles on Overcoming Anxiety"
                subtitle="Wisdom-backed articles from Sakshi Shree to support your journey from fear to freedom."
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                  gap: "24px",
                  marginTop: "40px",
                }}
              >
                {ARTICLES.map((a, i) => (
                  <a
                    key={i}
                    href={a.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      background: "#FFFFFF",
                      border: "1px solid #E5E7EB",
                      borderRadius: "20px",
                      overflow: "hidden",
                      textDecoration: "none",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                      transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s",
                      position: "relative",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateY(-6px)";
                      el.style.boxShadow = "0 16px 40px rgba(212,175,55,0.15)";
                      el.style.borderColor = "#D4AF37";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateY(0)";
                      el.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
                      el.style.borderColor = "#E5E7EB";
                    }}
                  >
                    {/* Top gradient accent line */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "3px",
                        background: "linear-gradient(90deg, #F59E0B, #D4AF37)",
                        zIndex: 2,
                      }}
                    />

                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-amber-50/40">
                      <img
                        src={a.image}
                        alt={a.alt}
                        loading={i < 3 ? "eager" : "lazy"}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>

                    {/* Content */}
                    <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                        <span
                          style={{
                            background: "rgba(212,175,55,0.12)",
                            color: "#B45309",
                            fontSize: "11px",
                            fontWeight: 700,
                            padding: "4px 10px",
                            borderRadius: "100px",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {a.tag}
                        </span>
                        <span style={{ color: "#9CA3AF", fontSize: "12px" }}>{a.readTime}</span>
                      </div>

                      <h3
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "1.1rem",
                          fontWeight: 700,
                          color: "#111827",
                          lineHeight: 1.45,
                          marginBottom: "12px",
                          flex: 1,
                        }}
                      >
                        {a.title}
                      </h3>
                      <p style={{ color: "#6B7280", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "20px" }}>
                        {a.desc}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          color: "#D4AF37",
                          fontWeight: 700,
                          fontSize: "0.875rem",
                          marginTop: "auto",
                        }}
                      >
                        Read Article <ArrowRight size={14} />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Quotes */}
          {tab === "quotes" && (
            <div>
              <SectionHeading
                eyebrow="Words of Wisdom"
                title="Inspirational Quotes"
                subtitle="Let these sacred words from Sakshi Shree light your path to inner peace."
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "20px",
                  marginTop: "40px",
                }}
              >
                {QUOTES.map((src, i) => (
                  <div
                    key={i}
                    style={{
                      borderRadius: "16px",
                      overflow: "hidden",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                      transition: "transform 0.3s, box-shadow 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateY(-6px) scale(1.01)";
                      el.style.boxShadow = "0 16px 40px rgba(212,175,55,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateY(0) scale(1)";
                      el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
                    }}
                  >
                    <img
                      src={src}
                      alt={`Anxiety quote ${i + 1}`}
                      loading="lazy"
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Videos */}
          {tab === "videos" && (
            <div>
              <SectionHeading
                eyebrow="Watch & Transform"
                title="Video Teachings on Overcoming Anxiety"
                subtitle="Powerful sessions from Sakshi Shree on dissolving anxiety, panic, and persistent fear."
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
                  gap: "28px",
                  marginTop: "40px",
                }}
              >
                {VIDEOS.map((v, i) => (
                  <div
                    key={i}
                    style={{
                      background: "#FFFFFF",
                      borderRadius: "20px",
                      overflow: "hidden",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                      border: "1px solid #E5E7EB",
                      transition: "transform 0.25s, box-shadow 0.25s",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateY(-6px)";
                      el.style.boxShadow = "0 20px 50px rgba(0,0,0,0.12)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateY(0)";
                      el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
                    }}
                  >
                    <div style={{ position: "relative", paddingTop: "56.25%" }}>
                      <iframe
                        src={`https://www.youtube.com/embed/${v.id}`}
                        title={v.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
                      />
                    </div>
                    <div style={{ padding: "20px" }}>
                      <span
                        style={{
                          background: "rgba(212,175,55,0.12)",
                          color: "#B45309",
                          fontSize: "11px",
                          fontWeight: 700,
                          padding: "3px 10px",
                          borderRadius: "100px",
                          display: "inline-block",
                          marginBottom: "8px",
                        }}
                      >
                        Teachings
                      </span>
                      <h3
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "0.95rem",
                          fontWeight: 700,
                          color: "#111827",
                          lineHeight: 1.5,
                        }}
                      >
                        {v.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Podcasts / Video Testimonials */}
          {tab === "podcasts" && (
            <div>
              <SectionHeading
                eyebrow="Real Stories"
                title="Testimonials — Finding Calm & Peace"
                subtitle="Watch how Sakshi Shree's teachings have helped seekers overcome anxiety and live freely."
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                  gap: "28px",
                  marginTop: "40px",
                }}
              >
                {PODCASTS.map((p, i) => (
                  <div
                    key={i}
                    style={{
                      background: "#FFFFFF",
                      borderRadius: "20px",
                      overflow: "hidden",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                      border: "1px solid #E5E7EB",
                      transition: "transform 0.25s, box-shadow 0.25s",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateY(-6px)";
                      el.style.boxShadow = "0 20px 50px rgba(212,175,55,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateY(0)";
                      el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
                    }}
                  >
                    <div style={{ position: "relative", paddingTop: "56.25%" }}>
                      <iframe
                        src={`https://www.youtube.com/embed/${p.id}`}
                        title={p.name}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
                      />
                    </div>
                    <div style={{ padding: "20px" }}>
                      <div style={{ display: "flex", gap: "3px", marginBottom: "8px" }}>
                        {Array.from({ length: 5 }).map((_, si) => (
                          <Heart key={si} size={14} fill="#F59E0B" style={{ color: "#F59E0B" }} />
                        ))}
                      </div>
                      <h3
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "1rem",
                          fontWeight: 700,
                          color: "#111827",
                        }}
                      >
                        {p.name}
                      </h3>
                      <p style={{ color: "#6B7280", fontSize: "0.85rem", marginTop: "6px", lineHeight: 1.6 }}>
                        {p.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #1A0A2E 0%, #2D1B4E 100%)",
          padding: "80px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
        <div className="container-page" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: 700,
              color: "#FFFFFF",
              marginBottom: "16px",
            }}
          >
            Reclaim{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #F59E0B, #D4AF37)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Your Life
            </span>
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: "1.05rem",
              maxWidth: "540px",
              margin: "0 auto 36px",
              lineHeight: 1.75,
            }}
          >
            Break free from the cycle of anxiety with Sakshi Shree's personal guidance, meditation, and spiritual tools proven to bring lasting transformation.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/book-session"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "linear-gradient(135deg, #F59E0B, #D4AF37)",
                color: "#0F172A",
                padding: "16px 36px",
                borderRadius: "100px",
                fontWeight: 700,
                fontSize: "1rem",
                textDecoration: "none",
                boxShadow: "0 8px 30px rgba(212,175,55,0.4)",
              }}
            >
              Book Personal Session <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#FFFFFF",
                padding: "16px 36px",
                borderRadius: "100px",
                fontWeight: 600,
                fontSize: "1rem",
                textDecoration: "none",
              }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
