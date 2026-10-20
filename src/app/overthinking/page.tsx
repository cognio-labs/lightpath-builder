"use client";
import Link from "next/link";

import { SectionHeading } from "@/components/PageHero";
import { SolutionHeroImage } from "@/components/SolutionPageLayout";
import { useState } from "react";
import {
  BookOpen,
  Quote,
  PlayCircle,
  Mic,
  ArrowRight,
  Star,
  Brain,
  ChevronRight,
  Heart,
  Compass,
  Flower2,
  Sun,
  Moon,
} from "lucide-react";
import { FastVideoCard, FastTestimonialCard } from "@/components/FastMediaCards";




type Tab = "articles" | "quotes" | "videos";

const ARTICLES = [
  {
    title: "How to Stop Overthinking: 7 Bhagavad Gita Lessons",
    href: "https://sciencedivine.org/blog/how-to-stop-overthinking-bhagavad-gita",
    tag: "Bhagavad Gita Wisdom",
    readTime: "14 min read",
    desc: "Discover how to stop overthinking through 7 Bhagavad Gita lessons on mind control, detachment, Sakshi Bhav, meditation and lasting inner peace.",
    image: "https://auth.typeflo.io/storage/v1/object/public/posts/public/6eae6931-f95c-4bcd-b740-e9c3acce8146/5b2558fa-24ca-469d-a05f-2ec4b71c7437/featuredImg/hd.webp?1789112544660",
    alt: "How to Stop Overthinking Bhagavad Gita Lessons",
  },
  {
    title: "Witness Consciousness for Overthinking Relief",
    href: "https://sciencedivine.org/blog/witness-consciousness-overthinking-emotional-stress",
    tag: "Consciousness & Mind",
    readTime: "10 min read",
    desc: "Discover how witness consciousness reduces overthinking, emotional stress and negative thoughts by helping you observe the mind without reacting.",
    image: "https://auth.typeflo.io/storage/v1/object/public/posts/public/6eae6931-f95c-4bcd-b740-e9c3acce8146/2dec8965-48ae-4ff3-a895-598fac5bee46/featuredImg/hd.webp?1783932963071",
    alt: "Witness Consciousness for Overthinking Relief",
  },
  {
    title: "Spiritual Healing for Stress & Overthinking",
    href: "https://sciencedivine.org/blog/why-your-soul-feels-tired-spiritual-healing",
    tag: "Spiritual Healing",
    readTime: "10 min read",
    desc: "Discover why your soul feels tired from stress and overthinking, and how spiritual healing can restore inner peace, emotional balance and calm.",
    image: "https://auth.typeflo.io/storage/v1/object/public/posts/public/6eae6931-f95c-4bcd-b740-e9c3acce8146/507003de-2ddc-402d-80bb-7ef8b89a87d1/featuredImg/hd.webp?1779951502590",
    alt: "Spiritual Healing for Stress and Overthinking",
  },
  {
    title: "Stop Overthinking & Protect Peace of Mind",
    href: "https://sciencedivine.org/blog/how-to-stop-overthinking-protect-peace-of-mind",
    tag: "Peace of Mind",
    readTime: "11 min read",
    desc: "Learn how to stop overthinking, calm your mind, protect your peace of mind, and find inner peace through mindfulness and spiritual awareness.",
    image: "https://auth.typeflo.io/storage/v1/object/public/posts/public/6eae6931-f95c-4bcd-b740-e9c3acce8146/27ff193c-ef3c-43a1-b8e9-84bdc7121b68/featuredImg/hd.webp?1779698633076",
    alt: "Stop Overthinking and Protect Peace of Mind",
  },
  {
    title: "Meditation for Overthinking & Inner Peace",
    href: "https://sciencedivine.org/blog/meditation-for-overthinking-inner-peace",
    tag: "Meditation & Calm",
    readTime: "11 min read",
    desc: "Learn how meditation for overthinking helps calm your mind, reduce stress, and bring inner peace, mental clarity, and emotional balance.",
    image: "https://auth.typeflo.io/storage/v1/object/public/posts/public/6eae6931-f95c-4bcd-b740-e9c3acce8146/ae9717ef-8276-4580-b490-eeb600d846ec/featuredImg/hd.webp?1779275544606",
    alt: "Meditation for Overthinking and Inner Peace",
  },
  {
    title: "Stop Overthinking with These Powerful Gita Quotes",
    href: "https://sciencedivine.org/blog/bhagavad-gita-quotes-stop-overthinking",
    tag: "Gita Quotes",
    readTime: "4 min read",
    desc: "Discover powerful Bhagavad Gita quotes to reduce stress, anxiety, and overthinking. Find peace, clarity, and inner calm with timeless wisdom.",
    image: "https://auth.typeflo.io/storage/v1/object/public/posts/public/6eae6931-f95c-4bcd-b740-e9c3acce8146/a205d1ea-9be9-45e8-a9fd-360271c00c84/featuredImg/hd.webp?1777554180027",
    alt: "Stop Overthinking with Powerful Gita Quotes",
  },
  {
    title: "Stop Overthinking Instantly with Mystic Flow",
    href: "https://sciencedivine.org/blog/stop-overthinking-instantly-mystic-flow",
    tag: "Mystic Flow",
    readTime: "4 min read",
    desc: "Learn how to stop overthinking instantly using Mystic Flow. Discover simple techniques to calm your mind, reduce stress, and find inner peace naturally.",
    image: "https://auth.typeflo.io/storage/v1/object/public/posts/public/6eae6931-f95c-4bcd-b740-e9c3acce8146/485bb5f6-815d-4061-b578-6b22f3366da3/featuredImg/hd.webp?1777366490740",
    alt: "Stop Overthinking Instantly with Mystic Flow",
  },
  {
    title: "Stop Overthinking & Trust Your Intuition",
    href: "https://sciencedivine.org/blog/stop-overthinking-trust-intuition",
    tag: "Intuition & Clarity",
    readTime: "5 min read",
    desc: "Learn how to stop overthinking and trust your intuition for mental peace. Simple techniques to calm your mind and reduce anxiety naturally.",
    image: "https://auth.typeflo.io/storage/v1/object/public/posts/public/6eae6931-f95c-4bcd-b740-e9c3acce8146/762a3ecb-a147-4edd-9e69-ab91c4bab593/featuredImg/hd.webp?1776769215190",
    alt: "Stop Overthinking and Trust Your Intuition",
  },
  {
    title: "Trying Mindfulness but Still Overthinking?",
    href: "https://sciencedivine.org/blog/mindfulness-not-working-stop-overthinking",
    tag: "Mindfulness Insights",
    readTime: "4 min read",
    desc: "Trying mindfulness but still overthinking? Learn why mindfulness isn’t working and how to stop overthinking with simple, practical techniques.",
    image: "https://auth.typeflo.io/storage/v1/object/public/posts/public/6eae6931-f95c-4bcd-b740-e9c3acce8146/d826c2db-7115-4ebd-90a7-34e823bcc62f/featuredImg/hd.webp?1775802058928",
    alt: "Trying Mindfulness but Still Overthinking",
  },
];

const VIDEOS = [
  {
    id: "V6N--wsi2PA",
    title: "Overthinking का चक्र कैसे तोड़ें? | #overthinking #meditation #SakshiShree",
    lang: "Hindi",
  },
  {
    id: "K8GXgnAchBY",
    title:
      "रुक जायेगा विचारों का ये तूफ़ान | Stop this train of thoughts | Mental Peace | साक्षी श्री",
    lang: "Hindi",
  },
  {
    id: "zbHTL4AIbjQ",
    title: "How to Always Think Positive? | सकारात्मक दृष्टिकोण | Sakshi Shree",
    lang: "Bilingual",
  },
  {
    id: "qZRAoRzMwmM",
    title: "Heart or Mind, whom to follow | Heart and mind Conflict | Sakshi Shree",
    lang: "English",
  },
  { id: "mnLKvGNvlFc", title: "मन के जाल से मुक्ति मिल जाएगी | Sakshi Shree", lang: "Hindi" },
  {
    id: "H_gHAxWkMzQ",
    title: "Power of thoughtless mind | जीवन में सफल होने के लिए विचार शून्यता",
    lang: "Bilingual",
  },
  {
    id: "ds00dU3dK1U",
    title: "विचार शक्ति से आप हर मनचाही सफलता प्राप्त कर सकते हैं | Sadhguru Sakshi Shree",
    lang: "Hindi",
  },
];

const QUOTES = Array.from(
  { length: 9 },
  (_, i) => `/images/old-site/pages/overthinking/Anxiety-Quote-${i + 1}.webp`,
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
];

const LANG_COLORS: Record<string, { bg: string; text: string }> = {
  English: { bg: "rgba(212,175,55,0.15)", text: "#8B6914" },
  Hindi: { bg: "rgba(75,16,27,0.1)", text: "#4B101B" },
  Bilingual: { bg: "rgba(75,16,27,0.1)", text: "#4B101B" },
};

export default function Page() {
  const [tab, setTab] = useState<Tab>("articles");

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden pt-28 pb-16"
        style={{ background: "linear-gradient(135deg, #FFFBF0 0%, #FFF8E7 60%, #FFFFFF 100%)" }}
      >
        {/* Decorative gold orbs */}
        <div
          className="absolute -top-16 -right-16 w-80 h-80 rounded-full opacity-10 animate-glow-pulse"
          style={{ background: "radial-gradient(circle, #D4AF37, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-10 animate-glow-pulse"
          style={{ background: "radial-gradient(circle, #521623, transparent 70%)" }}
        />

        <div className="container-page relative z-10">
          {/* Top Row: Content & Image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              {/* Eyebrow badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border"
                style={{
                  borderColor: "rgba(212, 175, 55, 0.4)",
                  color: "#D4AF37",
                  background: "rgba(75, 16, 27, 0.08)",
                }}
              >
                <Brain size={14} />
                <span>SOLUTIONS · OVERTHINKING</span>
              </div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.15]">
                Overthinking <span style={{ color: "#4B101B" }}>No More</span>: Clarity &amp; Calm
              </h1>

              <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-xl">
                Replaying scenarios and imagining worst-case outcomes? Overthinking drains mental
                energy, leaving us exhausted, anxious, and unable to focus. At Science Divine,
                discover techniques to quiet the mind's chatter, find clarity, and nurture inner
                peace through mindfulness and self-awareness.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/book-session"
                  className="rounded-full px-8 py-3.5 text-sm font-semibold inline-flex items-center gap-2 shadow-lg hover:scale-105 transition-all text-white"
                  style={{
                    background: "linear-gradient(135deg, #4B101B, #6B1727)",
                    border: "1px solid rgba(212,175,55,0.5)",
                    boxShadow: "0 6px 25px rgba(75,16,27,0.35)",
                  }}
                >
                  Book a Session <ArrowRight size={15} />
                </Link>
                <Link
                  href="/events"
                  className="rounded-full px-8 py-3.5 text-sm font-bold border-2 border-[#521623] bg-white text-[#521623] hover:bg-[#521623] hover:text-white transition-all inline-flex items-center gap-2 shadow-sm hover:scale-105"
                  style={{
                    color: "#521623",
                    background: "#FFFFFF",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#521623";
                    e.currentTarget.style.color = "#FFFFFF";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#FFFFFF";
                    e.currentTarget.style.color = "#521623";
                  }}
                >
                  Explore Resources <ChevronRight size={16} />
                </Link>
              </div>
            </div>
            {/* Right side image */}
            <SolutionHeroImage
              src="/images/premium-heroes/overthinking.jpeg"
              alt="Finding clarity from overthinking"
              themeColor="#4B101B"
            />
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section id="explore" style={{ background: "#FFFFFF", borderBottom: "1px solid #E5E7EB" }}>
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
          <div style={{ display: tab === "articles" ? "block" : "none" }}>
            <div>
              <SectionHeading
                eyebrow="Read & Reflect"
                title="Articles on Quieting the Mind"
                subtitle="Guidance from Sakshi Shree to break free from overthinking and find lasting mental clarity."
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
                      el.style.boxShadow = "0 16px 40px rgba(75,16,27,0.14)";
                      el.style.borderColor = "#4B101B";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateY(0)";
                      el.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
                      el.style.borderColor = "#E5E7EB";
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "3px",
                        background: "linear-gradient(90deg, #4B101B, #D4AF37)",
                        zIndex: 2,
                      }}
                    />
                    {a.image && (
                      <div className="relative aspect-[16/10] overflow-hidden bg-amber-50/40">
                        <img
                          src={a.image}
                          alt={a.alt || a.title}
                          loading={i < 3 ? "eager" : "lazy"}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                    )}
                    <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          marginBottom: "14px",
                        }}
                      >
                        <span
                          style={{
                            background: "rgba(75,16,27,0.1)",
                            color: "#4B101B",
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
                          fontSize: "1.05rem",
                          fontWeight: 700,
                          color: "#4B101B",
                          lineHeight: 1.45,
                          marginBottom: "12px",
                          flex: 1,
                        }}
                      >
                        {a.title}
                      </h3>
                      <p
                        style={{
                          color: "#6B7280",
                          fontSize: "0.875rem",
                          lineHeight: 1.7,
                          marginBottom: "20px",
                        }}
                      >
                        {a.desc}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          color: "#4B101B",
                          fontWeight: 700,
                          fontSize: "0.875rem",
                        }}
                      >
                        Read Article <ArrowRight size={14} />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: tab === "quotes" ? "block" : "none" }}>
            <div>
              <SectionHeading
                eyebrow="Words of Wisdom"
                title="Inspirational Quotes"
                subtitle="Sacred wisdom from Sakshi Shree to anchor you in stillness and clarity."
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
                      el.style.boxShadow = "0 16px 40px rgba(75,16,27,0.18)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateY(0) scale(1)";
                      el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
                    }}
                  >
                    <img
                      src={src}
                      alt={`Quote ${i + 1}`}
                      loading="eager"
                      decoding="async"
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: tab === "videos" ? "block" : "none" }}>
            <div>
              <SectionHeading
                eyebrow="Watch & Transform"
                title="Video Teachings on Overthinking"
                subtitle="7 powerful sessions from Sakshi Shree on silencing the mental noise and reclaiming clarity."
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
                  <FastVideoCard
                    key={i}
                    id={v.id}
                    title={v.title}
                    lang={v.lang}
                    langBg={LANG_COLORS[v.lang]?.bg}
                    langColor={LANG_COLORS[v.lang]?.text}
                  />
                ))}
              </div>
            </div>
          </div>

          
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: "linear-gradient(135deg, #4B101B 0%, #2E070F 100%)",
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
        <div
          className="container-page"
          style={{ textAlign: "center", position: "relative", zIndex: 1 }}
        >
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
                background: "linear-gradient(90deg, #D4AF37, #FDE68A)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Mental Clarity
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
            Stop the endless thought spiral. Connect with Sakshi Shree for personalised guidance on
            achieving lasting stillness, focus, and inner peace.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/book-session"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "linear-gradient(135deg, #4B101B, #6B1727)",
                border: "1px solid #D4AF37",
                color: "#FFFFFF",
                padding: "16px 36px",
                borderRadius: "100px",
                fontWeight: 700,
                fontSize: "1rem",
                textDecoration: "none",
                boxShadow: "0 8px 30px rgba(75,16,27,0.5)",
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
