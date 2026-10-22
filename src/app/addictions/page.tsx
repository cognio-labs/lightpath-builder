"use client";
import Link from "next/link";
import { SectionHeading } from "@/components/PageHero";
import { useState } from "react";
import { BookOpen, Quote, PlayCircle, Mic, ArrowRight, Star, Shield, ChevronRight } from "lucide-react";
import { FastVideoCard, FastTestimonialCard } from "@/components/FastMediaCards";
import SolutionBenefits from "@/components/SolutionBenefits";
import SolutionsCarousel from "@/components/SolutionsCarousel";
import TopicSections from "@/components/TopicSections";

type Tab = "articles" | "quotes" | "videos";

const ARTICLES = [
  {
    title: "What Is Addiction ? Causes, Symptoms and Treatment",
    href: "https://sciencedivine.org/blog/what-is-addiction-causes-symptoms-types-treatment",
    tag: "Addiction",
    readTime: "8 min",
    desc: "Learn what addiction is, its causes, symptoms, common types, how it affects the brain, treatment options and when to seek professional help.",
    image: "https://auth.typeflo.io/storage/v1/object/public/posts/public/6eae6931-f95c-4bcd-b740-e9c3acce8146/5d05cee2-a26c-4094-8356-a2bc6fb11ffd/featuredImg/hd.webp?1792226297105",
    alt: "What Is Addiction ? Causes, Symptoms and Treatment",
  },
  {
    title: "Phone Addiction Signs: 12 Red Flags to Know Today!",
    href: "https://sciencedivine.org/blog/phone-addiction-signs-smartphone-disconnecting-you",
    tag: "Digital Wellness",
    readTime: "7 min",
    desc: "Discover 12 phone addiction signs, how excessive smartphone use affects your mind and inner peace, and mindful ways to reconnect with yourself.",
    image: "https://auth.typeflo.io/storage/v1/object/public/posts/public/6eae6931-f95c-4bcd-b740-e9c3acce8146/5ad774eb-7d0e-4a23-98eb-6fae73ab018e/featuredImg/hd.webp?1792221902895",
    alt: "Phone Addiction Signs: 12 Red Flags",
  },
  {
    title: "The Overstimulated Brain & Digital Burnout",
    href: "https://sciencedivine.org/blog/the-overstimulated-brain-digital-overload",
    tag: "Mind & Brain",
    readTime: "6 min",
    desc: "Learn how digital overstimulation affects your brain, focus, emotions, and sleep - plus practical ways to recover mental peace.",
    image: "https://auth.typeflo.io/storage/v1/object/public/posts/public/6eae6931-f95c-4bcd-b740-e9c3acce8146/82f8858a-1531-421c-9f98-edc1064815a0/featuredImg/hd.webp?1778931131982",
    alt: "The Overstimulated Brain & Digital Burnout",
  },
  {
    title: "Protect Your Mind from Digital Overstimulation",
    href: "https://sciencedivine.org/blog/protect-your-mind-from-digital-stimulation",
    tag: "Mental Peace",
    readTime: "6 min",
    desc: "Learn how to protect your mind from constant digital stimulation with practical tips to reduce screen overload, improve focus, and restore mental peace.",
    image: "https://auth.typeflo.io/storage/v1/object/public/posts/public/6eae6931-f95c-4bcd-b740-e9c3acce8146/06b25727-8080-44e5-9a06-913c1e09b697/featuredImg/hd.webp?1778568556660",
    alt: "Protect Your Mind from Digital Overstimulation",
  },
  {
    title: "Brain Rot in Modern Life: Digital Mind Trap",
    href: "https://sciencedivine.org/blog/brain-rot-modern-life-digital-mind-trap",
    tag: "Clarity",
    readTime: "7 min",
    desc: "Discover how brain rot in modern life affects mental clarity, focus, and wellbeing - and learn how to escape the digital mind trap.",
    image: "https://auth.typeflo.io/storage/v1/object/public/posts/public/6eae6931-f95c-4bcd-b740-e9c3acce8146/7ec582e6-a871-47db-a554-627e61185dd9/featuredImg/hd.webp?1778481775266",
    alt: "Brain Rot in Modern Life: Digital Mind Trap",
  },
  {
    title: "AI vs Human Consciousness: Future Battle",
    href: "https://sciencedivine.org/blog/ai-vs-human-consciousness",
    tag: "Consciousness",
    readTime: "8 min",
    desc: "Explore the battle between AI and human consciousness. Discover how artificial intelligence is changing emotions, awareness, creativity, and humanity.",
    image: "https://auth.typeflo.io/storage/v1/object/public/posts/public/6eae6931-f95c-4bcd-b740-e9c3acce8146/fe61164f-1514-4f63-b5bb-c2e780dec639/featuredImg/hd.webp?1778316725919",
    alt: "AI vs Human Consciousness",
  },
  {
    title: "Youth Drug Addiction: Silent Epidemic",
    href: "https://sciencedivine.org/blog/youth-drug-addiction-silent-epidemic",
    tag: "Youth Awareness",
    readTime: "9 min",
    desc: "Discover why youth drug addiction is rising, its hidden causes, warning signs, and how to prevent it. A complete guide to understanding this silent epidemic.",
    image: "https://auth.typeflo.io/storage/v1/object/public/posts/public/6eae6931-f95c-4bcd-b740-e9c3acce8146/f73a05e7-53cc-472c-941c-2df2c59e3edc/featuredImg/hd.webp?1776235970266",
    alt: "Youth Drug Addiction: Silent Epidemic",
  },
  {
    title: "Digital Detox: Silence Over Scrolling Guide",
    href: "https://sciencedivine.org/blog/digital-detox-silence-over-scrolling",
    tag: "Digital Detox",
    readTime: "7 min",
    desc: "Struggling with social media addiction? Discover how digital detox and silence can help you break scrolling habits and find inner peace.",
    image: "https://auth.typeflo.io/storage/v1/object/public/posts/public/6eae6931-f95c-4bcd-b740-e9c3acce8146/943d8eaf-9372-4445-acf8-5f2cd55ba8b0/featuredImg/hd.webp?1777888659358",
    alt: "Digital Detox: Silence Over Scrolling Guide",
  },
  {
    title: "Approval Addiction: Signs & How to Overcome",
    href: "https://sciencedivine.org/blog/approval-addiction-signs-how-to-overcome",
    tag: "Self-Worth",
    readTime: "8 min",
    desc: "Struggling with approval addiction? Learn the signs of validation seeking behavior and practical ways to stop seeking approval and build self confidence.",
    image: "https://auth.typeflo.io/storage/v1/object/public/posts/public/6eae6931-f95c-4bcd-b740-e9c3acce8146/a64bd0e0-cf52-47af-a7ac-e930f4e04b81/featuredImg/hd.webp?1772884015502",
    alt: "Approval Addiction: Signs & How to Overcome",
  },
  {
    title: "Are You a Master For Cell Phone or Slave?",
    href: "https://sciencedivine.org/blog/are-you-controlling-your-phone-or-is-it-controlling-you",
    tag: "Mindful Living",
    readTime: "6 min",
    desc: "Are you addicted to your phone? Learn signs of phone addiction, its mental health impact, and how to regain control through mindful phone use.",
    image: "https://auth.typeflo.io/storage/v1/object/public/posts/public/6eae6931-f95c-4bcd-b740-e9c3acce8146/1b2c9019-9e22-446f-af73-686e50cbdef7/featuredImg/hd.webp?1767434788934",
    alt: "Are You a Master For Cell Phone or Slave?",
  },
];

const VIDEOS = [
  { id: "iYdRUPD7qZs", title: "बुरी आदतों से छुटकारा पाने की सबसे शक्तिशाली विधि | How to get rid of bad habits", lang: "Hindi" },
  { id: "qy5gyXNujhM", title: "नशा करना गलत क्यों है? | Why is it wrong to take drugs? | Sakshi Shree", lang: "Hindi" },
  { id: "Qpq9DGgJ2j4", title: "Drug Addiction and Meditation | Vikram Sampath & Sakshi Shree Podcast | Ep 11", lang: "English" },
  { id: "IWvSd-uNgGI", title: "Emotions, Relationships and Addictions in Youth | Vikram Sampath & Sakshi Shree Podcast | Ep 12", lang: "English" },
];

const QUOTES = Array.from({ length: 9 }, (_, i) => `/images/old-site/pages/addictions/Anxiety-Quote-${i + 1}.webp`);

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
  English: { bg: "rgba(59,130,246,0.1)", text: "#2563EB" },
  Hindi: { bg: "rgba(75,16,27,0.1)", text: "#4B101B" },
};

export default function Page() {
  const [tab, setTab] = useState<Tab>("articles");

  return (
    <>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #FFFBF0 0%, #FFF8E7 60%, #FFFFFF 100%)", paddingTop: "140px", paddingBottom: "100px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "360px", height: "360px", background: "radial-gradient(circle, rgba(212,175,55,0.14) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "-40px", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(82,22,35,0.08) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div className="container-page" style={{ position: "relative", zIndex: 1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(75, 16, 27, 0.08)", border: "1px solid rgba(212, 175, 55, 0.4)", borderRadius: "100px", padding: "6px 16px", marginBottom: "20px" }}>
                <Shield size={14} style={{ color: "#D4AF37" }} />
                <span style={{ color: "#D4AF37", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Solutions · Addictions</span>
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 4.5vw, 3.8rem)", fontWeight: 700, color: "#111827", lineHeight: 1.15, marginBottom: "20px" }}>
                Find Your{" "}
                <span style={{ color: "#4B101B" }}>
                  Freedom
                </span>
                : Overcoming Addiction
              </h1>
              <p style={{ fontSize: "1.05rem", color: "#4B5563", lineHeight: 1.8, maxWidth: "620px", marginBottom: "32px" }}>
                Addiction can happen for many reasons — often as a way to cope with difficult emotions. With compassion, understanding, and under Sakshi Shree&apos;s guidance, we offer a helping hand. Break free from the grip of addiction and reclaim control of your life.
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
                  src="/images/premium-heroes/addictions.jpeg"
                  alt="Overcoming Addiction and Healing"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section id="explore" style={{ background: "#FFFFFF", borderBottom: "1px solid #E5E7EB" }}>
        <div className="container-page">
          <div style={{ display: "flex", gap: "4px", overflowX: "auto", paddingTop: "8px" }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "16px 24px", border: "none", borderBottom: tab === t.id ? "3px solid #D4AF37" : "3px solid transparent", background: "transparent", color: tab === t.id ? "#D4AF37" : "#6B7280", fontWeight: tab === t.id ? 700 : 500, fontSize: "0.9rem", cursor: "pointer", whiteSpace: "nowrap", transition: "color 0.2s, border-color 0.2s" }}>
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
              <SectionHeading eyebrow="Read & Heal" title="Articles on Overcoming Addiction" subtitle="Wisdom-backed articles from Sakshi Shree to support your journey from bondage to freedom." />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px", marginTop: "40px" }}>
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
                      el.style.boxShadow = "0 16px 40px rgba(75,16,27,0.12)";
                      el.style.borderColor = "#4B101B";
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
                        background: "linear-gradient(90deg, #4B101B, #D4AF37)",
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
                        <span style={{ color: "#9CA3AF", fontSize: "12px" }}>{a.readTime} read</span>
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
                      <p style={{ color: "#6B7280", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "20px" }}>
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

          <div style={{ display: tab === "quotes" ? "block" : "none" }}>
            <SectionHeading eyebrow="Words of Wisdom" title="Inspirational Quotes" subtitle="Let these sacred words from Sakshi Shree light your path to freedom." />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px", marginTop: "40px" }}>
              {QUOTES.map((src, i) => (
                <div key={i} style={{ borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", transition: "transform 0.3s, box-shadow 0.3s" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-6px) scale(1.01)"; el.style.boxShadow = "0 16px 40px rgba(212,175,55,0.18)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0) scale(1)"; el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)"; }}
                >
                  <img src={src} alt={`Quote ${i + 1}`} decoding="async" style={{ width: "100%", height: "auto", display: "block" }} />
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: tab === "videos" ? "block" : "none" }}>
            <SectionHeading eyebrow="Watch & Transform" title="Video Teachings on Addiction Recovery" subtitle="Powerful sessions from Sakshi Shree on breaking free from harmful habits and addictions." />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "28px", marginTop: "40px" }}>
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
      </section>

      <SolutionBenefits topic="Addiction Solution" cards={[
        { title: "Understanding Addiction", desc: "See the patterns beneath compulsive behavior with honesty and care.", image: "/images/premium-heroes/addictions.jpeg", icon: "shield" },
        { title: "Find Your Freedom: Overcoming Addiction", desc: "Discover compassionate support for choosing freedom one day at a time.", image: "/images/old-site/pages/addictions/Addictions-scaled.webp", icon: "sparkles" },
        { title: "Breaking Unhealthy Habits", desc: "Replace automatic cycles with mindful, nourishing choices.", image: "/images/feature-cards/sound-mind.webp", icon: "heart" },
        { title: "Building a Healthier Lifestyle", desc: "Create rhythms that protect your energy, relationships, and wellbeing.", image: "/images/feature-cards/physical-ease.webp", icon: "sun" },
      ]} />

      <TopicSections
        symptomsIntro="If you recognise any of these patterns in yourself or a loved one, Sakshi Shree's guided Sadhna offers compassionate, steady support toward lasting freedom."
        symptoms={[
          {
            title: "Loss of Control Over Use",
            desc: "Finding it impossible to stop or limit a substance or behaviour despite repeated attempts.",
          },
          {
            title: "Withdrawal & Craving",
            desc: "Intense urges or physical discomfort when the addictive habit is paused or reduced.",
          },
          {
            title: "Neglecting Relationships & Responsibilities",
            desc: "Allowing the addiction to erode work performance, family bonds, and self-care routines.",
          },
        ]}
        quoteText="True freedom is freedom from the chains of your own mind. When awareness awakens, every habit loses its grip."
        quoteAuthor="Sadguru Sakshi Shree"
        faqs={[
          {
            question: "How does Sakshi Sadhna support addiction recovery?",
            answer:
              "Spiritual practice elevates bio-energy, reduces the mental craving loop, and restores a sense of inner fulfilment — naturally reducing the pull towards external substances or behaviours. Daily breathwork and Sakshi Bhav create a powerful inner anchor.",
          },
          {
            question: "Can I practice these techniques alongside a formal treatment programme?",
            answer:
              "Absolutely. Mindfulness, breathwork, and spiritual practices integrate powerfully with counselling, rehabilitation, and medical treatment. Always keep your healthcare team informed.",
          },
          {
            question: "When should I seek professional help for addiction?",
            answer:
              "If the addiction involves substances like alcohol, drugs, or prescription medications, or if it is causing harm to your health, relationships, or livelihood, please seek support from a qualified addiction counsellor or medical professional without delay.",
          },
        ]}
      />
      <SolutionsCarousel />

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg, #4B101B 0%, #2E070F 100%)", padding: "80px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div className="container-page" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, color: "#FFFFFF", marginBottom: "16px" }}>
            Reclaim{" "}
            <span style={{ background: "linear-gradient(90deg, #D4AF37, #FDE68A)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              Your Life
            </span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.05rem", maxWidth: "540px", margin: "0 auto 36px", lineHeight: 1.75 }}>
            Break free from the cycle of addiction with Sakshi Shree's personal guidance, meditation, and spiritual tools proven to bring lasting transformation.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/book-session" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg, #D4AF37, #B8860B)", color: "#2E070F", padding: "16px 36px", borderRadius: "100px", fontWeight: 700, fontSize: "1rem", textDecoration: "none", boxShadow: "0 8px 30px rgba(212,175,55,0.4)" }}>
              Book Personal Session <ArrowRight size={16} />
            </Link>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", color: "#FFFFFF", padding: "16px 36px", borderRadius: "100px", fontWeight: 600, fontSize: "1rem", textDecoration: "none" }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

