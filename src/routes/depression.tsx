import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { useState } from "react";
import { BookOpen, Quote, PlayCircle, Mic, ArrowRight, Heart, Star, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/depression")({
  head: () => ({
    meta: [
      { title: "Overcome Depression | Science Divine Foundation" },
      {
        name: "description",
        content:
          "Step by Step: Beating Depression with Sakshi Shree. Spiritual tools and techniques rooted in ancient wisdom to guide you through darkness towards healing and inner peace.",
      },
      { property: "og:title", content: "Overcome Depression — Science Divine" },
      { property: "og:url", content: "/depression" },
    ],
    links: [{ rel: "canonical", href: "/depression" }],
  }),
  component: Page,
});

type Tab = "articles" | "quotes" | "videos" | "podcasts";

const ARTICLES = [
  {
    title: "Master Stress Management: Simple Techniques for Effective Stress Reduction",
    href: "https://sciencedivine.org/stress-reduction/",
    desc: "A practical guide to implementing daily meditation and mindfulness to reduce biological stress responses and break free from depressive cycles.",
    readTime: "8 min read",
    tag: "Mindfulness",
  },
  {
    title: "Mastering Calm: Effective Meditation Practices for Managing Stress and Anxiety",
    href: "https://sciencedivine.org/mastering-calm/",
    desc: "Deep dive into meditative processes best suited for emotional healing and restoring inner balance during difficult times.",
    readTime: "10 min read",
    tag: "Meditation",
  },
  {
    title: "Why Should You Prioritize Your Mental Health Every Day?",
    href: "https://sciencedivine.org/what-is-mental-health/",
    desc: "Understanding the pillars of mental wellness and why daily spiritual practice is the foundation of lasting emotional health.",
    readTime: "6 min read",
    tag: "Mental Health",
  },
  {
    title: "Why Should You Prioritize Your Mental Health Every Day?",
    href: "https://sciencedivine.org/what-is-mental-health/",
    desc: "Exploring the deeper connection between self-awareness, purpose, and sustained mental well-being through ancient wisdom.",
    readTime: "6 min read",
    tag: "Self-Awareness",
  },
  {
    title: "How to Be Conscious: Wake Up Your Mind Every Day",
    href: "https://sciencedivine.org/conscious/",
    desc: "A step-by-step guide to waking up the dormant consciousness within, breaking automatic negative thinking patterns.",
    readTime: "9 min read",
    tag: "Consciousness",
  },
  {
    title: "7 Ways to Foster an Optimistic Mind",
    href: "https://sciencedivine.org/optimistic-mind/",
    desc: "Science-backed spiritual practices for cultivating an unshakeable positive mindset even in the midst of life's greatest challenges.",
    readTime: "7 min read",
    tag: "Positivity",
  },
];

const VIDEOS = [
  { id: "ePg4GtxzWa4", title: "I am Stressed in College Life!! — Sakshi Shree", lang: "English" },
  { id: "Rsn5FX-mO9g", title: "How to find your true nature? | True Nature | Sakshi Shree English", lang: "English" },
  { id: "ZcH73i7Blz4", title: "युवाओं के लिए डिप्रेशन से मुक्ति का आसान उपाय | साक्षी श्री", lang: "Hindi" },
  { id: "En0wjpQXRtU", title: "असफलता का भय और निराशा से बचने का सरलतम उपाय | Easiest way to avoid depression & fear of failure", lang: "Hindi" },
  { id: "UwitMvjhZWU", title: "चिंता, तनाव एवं भय से तत्काल मुक्त होने का महाउपाय। Immediate freedom from anxiety, stress & fear", lang: "Hindi" },
  { id: "FyduZS4Ce9A", title: "आत्म हत्या करने के विचार से मुक्त होने का सबसे अच्छा तरीका | Sadhguru Sakshi Shree", lang: "Hindi" },
  { id: "WuexPS1a9DM", title: "एक बड़ी समस्या भय, चिंता और तनाव से तुरंत मुक्त होने का 1 सरल महासूत्र | Sadhguru Sakshi Shree", lang: "Hindi" },
];

const QUOTES = Array.from(
  { length: 9 },
  (_, i) => `https://sciencedivine.org/wp-content/uploads/2024/04/Anxiety-Quote-${i + 1}.jpg`
);

const TESTIMONIALS = [
  { id: "QLmL230dApk", name: "Swaparna Testimonial" },
  { id: "EiFMTSo8Yws", name: "Helen Testimonial" },
  { id: "6bkJdkmAt20", name: "Pooja Pagaddinnimath Testimonial" },
  { id: "5KmsxqJXACM", name: "Patty Testimonial" },
];

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "articles", label: "Articles", icon: <BookOpen size={17} /> },
  { id: "quotes", label: "Quotes", icon: <Quote size={17} /> },
  { id: "videos", label: "Videos", icon: <PlayCircle size={17} /> },
  { id: "podcasts", label: "Podcasts", icon: <Mic size={17} /> },
];

function Page() {
  const [tab, setTab] = useState<Tab>("articles");

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(135deg, #0F172A 0%, #1E293B 40%, #0F2027 100%)",
          position: "relative",
          overflow: "hidden",
          paddingTop: "120px",
          paddingBottom: "80px",
        }}
      >
        {/* Decorative glows */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />

        <div className="container-page" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "800px" }}>
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
                marginBottom: "24px",
              }}
            >
              <Heart size={14} style={{ color: "#D4AF37" }} />
              <span style={{ color: "#D4AF37", fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Solutions — Depression
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 700,
                color: "#FFFFFF",
                lineHeight: 1.15,
                marginBottom: "24px",
              }}
            >
              Step by Step:{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #F59E0B, #D4AF37)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Beating Depression
              </span>
            </h1>

            <p
              style={{
                fontSize: "1.125rem",
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.8,
                maxWidth: "660px",
                marginBottom: "40px",
              }}
            >
              Feeling the weight of depression can be like drowning in an ocean of darkness, where each day feels like an uphill battle. With Sakshi Shree's spiritual tools and techniques, rooted in ancient wisdom, there lies a pathway to healing and inner peace. You're not alone — we are here to support you every step of the way.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <Link
                to="/book-session"
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
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(212,175,55,0.5)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(212,175,55,0.35)";
                }}
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
                  backdropFilter: "blur(10px)",
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.14)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)")}
              >
                Explore Resources <ChevronRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Tabs ─────────────────────────────────────────────── */}
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
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Tab Content ──────────────────────────────────────── */}
      <section className="section-pad bg-white">
        <div className="container-page">

          {/* ── Articles ── */}
          {tab === "articles" && (
            <div>
              <SectionHeading
                eyebrow="Read & Learn"
                title="Insightful Articles on Depression"
                subtitle="Curated wisdom from Sakshi Shree's teachings to help you understand and overcome depression."
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
                      padding: "28px",
                      textDecoration: "none",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                      transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateY(-6px)";
                      el.style.boxShadow = "0 16px 40px rgba(212,175,55,0.14)";
                      el.style.borderColor = "#D4AF37";
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateY(0)";
                      el.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
                      el.style.borderColor = "#E5E7EB";
                    }}
                  >
                    {/* Gold accent top bar */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "3px",
                        background: "linear-gradient(90deg, #F59E0B, #D4AF37)",
                        borderRadius: "20px 20px 0 0",
                      }}
                    />

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
                      }}
                    >
                      Read Article <ArrowRight size={14} />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* ── Quotes ── */}
          {tab === "quotes" && (
            <div>
              <SectionHeading
                eyebrow="Words of Wisdom"
                title="Inspirational Quotes"
                subtitle="Let these sacred words from Sakshi Shree illuminate your path through darkness."
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
                      background: "#F8F7F4",
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateY(-6px) scale(1.01)";
                      el.style.boxShadow = "0 16px 40px rgba(212,175,55,0.2)";
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateY(0) scale(1)";
                      el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
                    }}
                  >
                    <img
                      src={src}
                      alt={`Inspirational Quote ${i + 1} by Sakshi Shree`}
                      loading="lazy"
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Videos ── */}
          {tab === "videos" && (
            <div>
              <SectionHeading
                eyebrow="Watch & Transform"
                title="Guided Video Teachings"
                subtitle="Powerful video sessions from Sakshi Shree on overcoming depression and rediscovering joy."
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
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateY(-6px)";
                      el.style.boxShadow = "0 20px 50px rgba(0,0,0,0.12)";
                    }}
                    onMouseLeave={e => {
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
                        style={{
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                          border: 0,
                        }}
                      />
                    </div>
                    <div style={{ padding: "20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                        <span
                          style={{
                            background: v.lang === "English" ? "rgba(59,130,246,0.1)" : "rgba(212,175,55,0.1)",
                            color: v.lang === "English" ? "#2563EB" : "#B45309",
                            fontSize: "11px",
                            fontWeight: 700,
                            padding: "3px 10px",
                            borderRadius: "100px",
                          }}
                        >
                          {v.lang}
                        </span>
                      </div>
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

          {/* ── Podcasts / Testimonials ── */}
          {tab === "podcasts" && (
            <div>
              <SectionHeading
                eyebrow="Real Transformation"
                title="Testimonials — Real Stories of Healing"
                subtitle="Watch how Sakshi Shree's teachings have helped real people overcome depression and find joy."
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                  gap: "28px",
                  marginTop: "40px",
                }}
              >
                {TESTIMONIALS.map((t, i) => (
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
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateY(-6px)";
                      el.style.boxShadow = "0 20px 50px rgba(212,175,55,0.12)";
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateY(0)";
                      el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
                    }}
                  >
                    <div style={{ position: "relative", paddingTop: "56.25%" }}>
                      <iframe
                        src={`https://www.youtube.com/embed/${t.id}`}
                        title={t.name}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                        style={{
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                          border: 0,
                        }}
                      />
                    </div>
                    <div style={{ padding: "20px" }}>
                      <div
                        style={{ display: "flex", gap: "3px", marginBottom: "8px" }}
                      >
                        {Array.from({ length: 5 }).map((_, si) => (
                          <Star key={si} size={14} fill="#F59E0B" style={{ color: "#F59E0B" }} />
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
                        {t.name}
                      </h3>
                      <p style={{ color: "#9CA3AF", fontSize: "0.8rem", marginTop: "4px" }}>
                        Science Divine Community Member
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ textAlign: "center", marginTop: "48px" }}>
                <Link
                  to="/latest-testimonials-videos"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "linear-gradient(135deg, #F59E0B, #D4AF37)",
                    color: "#0F172A",
                    padding: "14px 32px",
                    borderRadius: "100px",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    textDecoration: "none",
                    boxShadow: "0 4px 20px rgba(212,175,55,0.3)",
                  }}
                >
                  Watch All Testimonials <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─── CTA Banner ───────────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
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
            background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
        <div className="container-page" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(212,175,55,0.12)",
              border: "1px solid rgba(212,175,55,0.3)",
              borderRadius: "100px",
              padding: "6px 16px",
              marginBottom: "24px",
            }}
          >
            <Heart size={14} style={{ color: "#D4AF37" }} />
            <span style={{ color: "#D4AF37", fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              You Are Not Alone
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: 700,
              color: "#FFFFFF",
              marginBottom: "16px",
            }}
          >
            Take the First Step{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #F59E0B, #D4AF37)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Toward Healing
            </span>
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: "1.05rem",
              maxWidth: "560px",
              margin: "0 auto 36px",
              lineHeight: 1.75,
            }}
          >
            Connect with Sakshi Shree in a personal one-on-one session and begin your journey from darkness to light.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              to="/book-session"
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
              to="/contact"
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
