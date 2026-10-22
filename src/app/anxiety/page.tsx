"use client";
import Link from "next/link";
import { SectionHeading } from "@/components/PageHero";
import InspirationalQuotesSection from "@/components/InspirationalQuotesSection";
import VideoCard from "@/components/VideoCard";
import SolutionBenefits from "@/components/SolutionBenefits";
import SolutionsCarousel from "@/components/SolutionsCarousel";
import TopicSections from "@/components/TopicSections";
import { useState, useCallback } from "react";

import {
  BookOpen,
  Quote,
  PlayCircle,
  Mic,
  ArrowRight,
  ChevronRight,
  Heart,
  Shield,
  X,
  ZoomIn,
} from "lucide-react";

type Tab = "articles" | "quotes" | "videos";

const ARTICLES = [
  {
    title: "Social Media Anxiety: How to Stop Comparing Yourself to Others",
    href: "https://sciencedivine.org/blog/social-media-anxiety-stop-comparing-yourself",
    tag: "Bhagavad Gita & Anxiety",
    readTime: "11 min read",
    desc: "Social media makes it easy to compare your everyday life with curated highlights. Discover why comparison fuels anxiety and how to find self-worth beyond external validation.",
    image: "https://auth.typeflo.io/storage/v1/object/public/posts/public/6eae6931-f95c-4bcd-b740-e9c3acce8146/dfc2c65b-7abb-4dbd-aaad-8a65de158919/featuredImg/hd.webp?1789981589957",
    alt: "Social Media Anxiety How to Stop Comparing Yourself to Others",
  },
  {
    title: "How to Control Anxiety: 7 Bhagavad Gita Ways to Calm Your Mind and Find Inner Peace",
    href: "https://sciencedivine.org/blog/how-to-control-anxiety-7-bhagavad-gita-ways-to-calm-your-mind-and-find-inner-peace",
    tag: "Spirituality & Wellness",
    readTime: "11 min read",
    desc: "Struggling with anxiety, constant worry or overthinking? Discover seven practical teachings from the Bhagavad Gita that help you understand your mind and find inner peace.",
    image: "https://auth.typeflo.io/storage/v1/object/public/posts/public/6eae6931-f95c-4bcd-b740-e9c3acce8146/45ec8a3c-1a2a-4e55-9148-955458ca2eb3/featuredImg/hd.webp?1789114087888",
    alt: "How to Control Anxiety Bhagavad Gita Ways to Calm Your Mind",
  },
  {
    title: "Krishna’s Wisdom and Psychology: Managing Desire, Fear, and Anxiety",
    href: "https://sciencedivine.org/blog/krishnas-wisdom-modern-psychology-anxiety",
    tag: "Spirituality & Psychology",
    readTime: "8 min read",
    desc: "Discover how Krishna’s teachings and modern psychology offer practical ways to understand desire, release fear, manage anxiety, and cultivate inner peace.",
    image: "https://auth.typeflo.io/storage/v1/object/public/posts/public/6eae6931-f95c-4bcd-b740-e9c3acce8146/234fb590-35f8-4b40-9fd0-e7fc6e9d111f/featuredImg/hd.webp?1782732217415",
    alt: "Krishna’s Wisdom and Psychology Managing Desire Fear Anxiety",
  },
  {
    title: "Fear, Anxiety and Mind: What Science and Spirituality Reveal",
    href: "https://sciencedivine.org/blog/fear-anxiety-mind-science-spirituality",
    tag: "Anxiety & Science",
    readTime: "11 min read",
    desc: "Fear and anxiety can make the mind feel restless and exhausted. Explore what science reveals about anxiety and what spirituality teaches about inner peace.",
    image: "https://auth.typeflo.io/storage/v1/object/public/posts/public/6eae6931-f95c-4bcd-b740-e9c3acce8146/b0a4c816-dd08-4582-8191-53bf2f68aaba/featuredImg/hd.webp?1782727855712",
    alt: "Fear Anxiety and Mind Science and Spirituality",
  },
  {
    title: "Spiritual Lessons Hidden Behind Anxiety and Overthinking",
    href: "https://sciencedivine.org/blog/spiritual-lessons-behind-anxiety-overthinking",
    tag: "Spiritual Healing",
    readTime: "11 min read",
    desc: "Anxiety and overthinking can feel overwhelming, but they may also reveal important inner lessons. Discover gentle ways to return to calm and inner peace.",
    image: "https://auth.typeflo.io/storage/v1/object/public/posts/public/6eae6931-f95c-4bcd-b740-e9c3acce8146/fb8c1753-cebc-47df-b0f0-e0a6096366f9/featuredImg/hd.webp?1782463966158",
    alt: "Spiritual Lessons Hidden Behind Anxiety and Overthinking",
  },
  {
    title: "How Yoga Helps You Deal with Stress, Anxiety and Overthinking",
    href: "https://sciencedivine.org/blog/how-yoga-helps-stress-anxiety-overthinking",
    tag: "Anxiety & Stress",
    readTime: "10 min read",
    desc: "Discover how yoga reduces stress, calms anxiety, and stops overthinking. Learn simple yoga poses, breathing, and mindfulness for a peaceful mind.",
    image: "https://auth.typeflo.io/storage/v1/object/public/posts/public/6eae6931-f95c-4bcd-b740-e9c3acce8146/4afc40a6-7c46-4eeb-9517-93dbbd06bfc1/featuredImg/hd.webp?1781247089548",
    alt: "How Yoga Helps Deal with Stress Anxiety and Overthinking",
  },
  {
    title: "Spiritual Meaning of Anxiety: A Soul Healing Guide",
    href: "https://sciencedivine.org/blog/spiritual-meaning-of-anxiety-soul-healing",
    tag: "Anxiety & Soul Healing",
    readTime: "9 min read",
    desc: "Anxiety is not always just fear or overthinking. Sometimes, it can also be your inner self asking for attention, healing and deeper spiritual awareness.",
    image: "https://auth.typeflo.io/storage/v1/object/public/posts/public/6eae6931-f95c-4bcd-b740-e9c3acce8146/1305dd5d-d37c-449e-b8c7-1a0bade36d43/featuredImg/hd.webp?1779959929675",
    alt: "Spiritual Meaning of Anxiety Soul Healing Guide",
  },
  {
    title: "Stress and Panic: Why the Mind Won’t Calm Down",
    href: "https://sciencedivine.org/blog/when-the-mind-wont-calm-down-stress-panic",
    tag: "Stress & Panic",
    readTime: "6 min read",
    desc: "Learn why the mind won’t calm down. Discover causes of stress, panic, and racing thoughts, with natural techniques to heal anxiety.",
    image: "https://auth.typeflo.io/storage/v1/object/public/posts/public/6eae6931-f95c-4bcd-b740-e9c3acce8146/0590a90e-4439-4663-8d2e-3e7e67cfa68a/featuredImg/hd.webp?1778576035837",
    alt: "Stress and Panic Why the Mind Won’t Calm Down",
  },
  {
    title: "Sleep Problems: Hidden Reasons You Missed",
    href: "https://sciencedivine.org/blog/sleep-problems-hidden-causes",
    tag: "Anxiety & Sleep",
    readTime: "4 min read",
    desc: "Struggling with sleep problems, insomnia, or nighttime anxiety? Discover hidden causes and natural ways to calm your racing mind and rest better.",
    image: "https://auth.typeflo.io/storage/v1/object/public/posts/public/6eae6931-f95c-4bcd-b740-e9c3acce8146/8d2a61f1-2578-4af6-8756-19a0ef3b2572/featuredImg/hd.webp?1777012808322",
    alt: "Sleep Problems Hidden Reasons You Missed",
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

const QUOTES = [
  { src: "/images/old-site/pages/anxiety/Anxiety-Quote-1.webp", label: "Inner Wisdom",       theme: "ivory" },
  { src: "/images/old-site/pages/anxiety/Anxiety-Quote-2.webp", label: "Intelligent Living",  theme: "burgundy" },
  { src: "/images/old-site/pages/anxiety/Anxiety-Quote-3.webp", label: "Learn from Mistakes", theme: "cream" },
  { src: "/images/old-site/pages/anxiety/Anxiety-Quote-4.webp", label: "Become Your Best Self",theme: "burgundy" },
  { src: "/images/old-site/pages/anxiety/Anxiety-Quote-5.webp", label: "Master Your Mind",    theme: "taupe" },
  { src: "/images/old-site/pages/anxiety/Anxiety-Quote-6.webp", label: "Power of Inspiration",theme: "charcoal" },
  { src: "/images/old-site/pages/anxiety/Anxiety-Quote-7.webp", label: "Learn from Others",   theme: "ivory" },
  { src: "/images/old-site/pages/anxiety/Anxiety-Quote-8.webp", label: "Positive Mindset",    theme: "burgundy" },
  { src: "/images/old-site/pages/anxiety/Anxiety-Quote-9.webp", label: "Continuous Growth",   theme: "cream" },
];

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
];

export default function Page() {
  const [tab, setTab] = useState<Tab>("articles");
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null);

  return (
    <>
      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          paddingTop: "140px",
          paddingBottom: "100px",
          minHeight: "75vh",
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(135deg, #FFFBF0 0%, #FFF8E7 60%, #FFFFFF 100%)",
        }}
      >
        {/* Subtle gold glow orbs */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "360px",
            height: "360px",
            background: "radial-gradient(circle, rgba(212,175,55,0.14) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "-40px",
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(82,22,35,0.08) 0%, transparent 70%)",
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
                  background: "rgba(75, 16, 27, 0.08)",
                  border: "1px solid rgba(212, 175, 55, 0.4)",
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
                    fontWeight: 700,
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
                  color: "#111827",
                  lineHeight: 1.15,
                  marginBottom: "20px",
                }}
              >
                Calming the Mind:{" "}
                <span style={{ color: "#4B101B" }}>
                  Overcoming Anxiety
                </span>
              </h1>

              <p
                style={{
                  fontSize: "1.05rem",
                  color: "#4B5563",
                  lineHeight: 1.8,
                  maxWidth: "620px",
                  marginBottom: "32px",
                }}
              >
                If feeling anxious about what lies ahead or overwhelmed by constant worry makes you
                feel lonely, then know that you are not alone. Under Sakshi Shree&apos;s guidance,
                explore practical solutions and age-old wisdom to help calm your mind and ease your
                worries.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
                <Link
                  href="/book-session"
                  className="rounded-full px-8 py-3.5 text-sm font-semibold inline-flex items-center gap-2 shadow-lg hover:scale-105 transition-all text-white"
                  style={{
                    background: "linear-gradient(135deg, #4B101B, #6B1727)",
                    border: "1px solid rgba(212,175,55,0.5)",
                    boxShadow: "0 6px 25px rgba(75,16,27,0.35)",
                  }}
                >
                  Book a Session <ArrowRight size={16} />
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
                  Explore Events <ChevronRight size={16} />
                </Link>
              </div>
            </div>

            {/* Right side topic image */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative w-full max-w-[480px] aspect-[4/3] sm:aspect-[1.15] overflow-hidden rounded-3xl shadow-2xl border-4 border-[#D4AF37]/40 hover:scale-105 transition-transform duration-700">
                <img loading="lazy" decoding="async"
                  src="/images/premium-heroes/anxiety.jpeg"
                  alt="Calming the Mind and Overcoming Anxiety"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs Bar */}
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
                            color: "#521623",
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
          </div>

          {/* Quotes */}
          <div style={{ display: tab === "quotes" ? "block" : "none" }}>
            <div className="animate-fade-in">
              <SectionHeading
                eyebrow="Words of Wisdom"
                title="Inspirational Quotes"
                subtitle="Let these sacred words from Sakshi Shree light your path to inner peace."
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: "24px",
                  marginTop: "40px",
                }}
              >
                {QUOTES.map((q, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedQuote(q.src)}
                    style={{
                      borderRadius: "20px",
                      overflow: "hidden",
                      boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
                      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                      cursor: "pointer",
                      background: "#FFFFFF",
                      border: "1px solid rgba(212,175,55,0.2)",
                      position: "relative",
                    }}
                    className="group hover:-translate-y-2 hover:shadow-2xl"
                  >
                    <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1", overflow: "hidden" }}>
                      <img
                        src={q.src}
                        alt={`Sakshi Shree Quote ${i + 1}`}
                        loading="eager"
                        decoding="async"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                          transition: "transform 0.5s ease",
                        }}
                        className="group-hover:scale-105"
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)",
                          opacity: 0,
                          transition: "opacity 0.3s ease",
                          display: "flex",
                          alignItems: "flex-end",
                          justifyContent: "space-between",
                          padding: "16px 20px",
                        }}
                        className="group-hover:opacity-100"
                      >
                        <span style={{ color: "#FFF", fontSize: "13px", fontWeight: 600 }}>{q.label}</span>
                        <span
                          style={{
                            background: "rgba(255,255,255,0.95)",
                            color: "#521623",
                            borderRadius: "100px",
                            padding: "6px 14px",
                            fontSize: "12px",
                            fontWeight: 700,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <ZoomIn size={14} /> View Quote
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Videos */}
          <div style={{ display: tab === "videos" ? "block" : "none" }}>
            <div className="animate-fade-in">
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
                  <VideoCard
                    key={v.id}
                    id={v.id}
                    title={v.title}
                    category="Teachings"
                    index={i}
                    isPriority={i === 0}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Podcasts / Video Testimonials */}
          
        </div>
      </section>

      <TopicSections
        symptomsIntro="If you experience any of these daily struggles, Sakshi Shree's guided Sadhna offers a direct, gentle path to resolution."
        symptoms={[
          {
            title: "Racing Thoughts & Heartbeat",
            desc: "Feeling tightness in chest or rapid pulse during stressful triggers.",
          },
          {
            title: "Restlessness & Anticipatory Worry",
            desc: "Constant apprehension about what might go wrong next.",
          },
          {
            title: "Shortness of Breath",
            desc: "Shallow, rapid breathing when feeling nervous, overwhelmed, or before a stressful event.",
          },
        ]}
        quoteText="Fear lives in the future; peace lives right now. Return to the present moment."
        quoteAuthor="Sadguru Sakshi Shree"
        faqs={[
          {
            question: "How can I calm a panic attack quickly?",
            answer:
              "Focus on slow, deep belly exhales — exhaling twice as long as you inhale. Practice Sakshi Bhav: observe sensations without fighting them. Grounding your attention on the soles of your feet also dissolves panic rapidly.",
          },
          {
            question: "What daily practice helps reduce anxiety over time?",
            answer:
              "Sanjeevni Kriya breathwork practiced for 15 minutes each morning steadily lowers your baseline nervous-system arousal. Combine it with an evening Sakshi Bhav sit to release the day's accumulated tension.",
          },
          {
            question: "Should I see a professional alongside this practice?",
            answer:
              "Yes. Spiritual practices powerfully complement clinical care. If anxiety significantly disrupts daily life, sleep, or work, please consult a qualified mental health professional alongside your Sadhna.",
          },
        ]}
      />
      <SolutionBenefits topic="Anxiety" cards={[
        { title: "Understanding Anxiety", desc: "Recognize worry patterns with kindness instead of judgment.", image: "/images/premium-heroes/anxiety.jpeg", icon: "shield" },
        { title: "Beating Anxiety Together: Simple Steps to Calm", desc: "Use small, practical tools to slow the body and steady the mind.", image: "/images/old-site/pages/anxiety/Anxiety-scaled.webp", icon: "sparkles" },
        { title: "Find Your Inner Peace", desc: "Return to a calm, grounded awareness in the present moment.", image: "/images/feature-cards/sound-mind.webp", icon: "heart" },
        { title: "Daily Practices for Emotional Balance", desc: "Build a reliable routine of breath, awareness, and self-care.", image: "/images/feature-cards/physical-ease.webp", icon: "sun" },
      ]} />
      <SolutionsCarousel />

      {/* CTA Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #521623 0%, #3D0E18 100%)",
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
          {/* Fullscreen Quote Lightbox Modal */}
      {selectedQuote && (
        <div
          onClick={() => setSelectedQuote(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(15, 23, 42, 0.88)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: "640px",
              width: "100%",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
              background: "#000",
            }}
          >
            <button
              onClick={() => setSelectedQuote(null)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                zIndex: 10,
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                background: "rgba(0,0,0,0.65)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "#FFFFFF",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
              }}
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <img
              src={selectedQuote}
              alt="Sakshi Shree Inspirational Quote"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        </div>
      )}
    </>
  );
}
