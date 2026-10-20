"use client";
import Link from "next/link";

import { SectionHeading } from "@/components/PageHero";
import { useState } from "react";
import { BookOpen, Quote, PlayCircle, Mic, ArrowRight, Star, Target, Heart, ChevronRight } from "lucide-react";
import { FastVideoCard, FastTestimonialCard } from "@/components/FastMediaCards";




type Tab = "articles" | "quotes" | "videos";

const ARTICLES = [
  { title: "7 Ways to Foster an Optimistic Mind", href: "https://sciencedivine.org/optimistic-mind/", tag: "Mindset", readTime: "7 min", desc: "How shifting to positive patterns clears mental fog and reveals your true passion.", image: "/images/articles/optimistic-mind.webp", alt: "Woman smiling softly in warm morning light" },
  { title: "How to Be Conscious: Wake Up Your Mind Every Day", href: "https://sciencedivine.org/conscious/", tag: "Awareness", readTime: "9 min", desc: "A practical guide to living consciously and discovering what truly matters to you.", image: "/images/articles/conscious-mind.webp", alt: "Person practicing a quiet morning mindfulness ritual" },
  { title: "How to Feel Calm: Easy Ways to Find Peace of Mind", href: "https://sciencedivine.org/what-is-peace-of-mind/", tag: "Inner Peace", readTime: "6 min", desc: "Quiet the external noise so that the subtle inner calling of your purpose can be heard.", image: "/images/articles/feel-calm.webp", alt: "Calm woman resting in soft golden light" },
  { title: "Why Should You Prioritize Your Mental Health Every Day?", href: "https://sciencedivine.org/what-is-mental-health/", tag: "Mental Health", readTime: "6 min", desc: "Why daily self-care and mental alignment are prerequisites for finding your life path.", image: "/images/articles/mental-health.webp", alt: "Person taking a peaceful pause outdoors" },
  { title: "Benefits of Yoga for Hypertension Management", href: "https://sciencedivine.org/yoga-for-hypertension/", tag: "Wellness", readTime: "8 min", desc: "Regulating the body's energy levels to approach self-discovery with vigor.", image: "/images/articles/yoga-hypertension.webp", alt: "Woman practicing yoga in a sunlit studio" },
  { title: "Yoga Nidra: Mastering the Art of Conscious Relaxation", href: "https://sciencedivine.org/yoga-nidra/", tag: "Relaxation", readTime: "10 min", desc: "Access the deep subconscious spaces where your authentic desires and purposes reside.", image: "/images/articles/yoga-nidra.webp", alt: "Person resting comfortably during a yoga nidra practice" },
  { title: "Exploring the Symbiotic Connection Between Yoga and Mindfulness Meditation", href: "https://sciencedivine.org/unveiling-the-harmony/", tag: "Mindfulness", readTime: "8 min", desc: "Aligning physical movements and mental stillness to gain clarity on your life's goals.", image: "/images/articles/yoga-mindfulness.webp", alt: "Woman moving through a mindful yoga pose" },
  { title: "Meditation for Seniors: Embrace a Journey to Serenity and Healthy Aging", href: "https://sciencedivine.org/meditation-for-seniors/", tag: "Healthy Aging", readTime: "7 min", desc: "It is never too late to redefine your purpose and live with serenity and wisdom.", image: "/images/articles/meditation-seniors.webp", alt: "Older couple meditating together at home" },
  { title: "Harmonizing Mind and Body: The Transformative Power of Yoga and Meditation", href: "https://sciencedivine.org/harmonizing-mind-and-body/", tag: "Transformation", readTime: "9 min", desc: "Integrating the physical and spiritual to manifest your true potential and calling.", image: "/images/articles/mind-body-harmony.webp", alt: "Person meditating beside a quiet lake at sunset" },
];

const VIDEOS = [
  { id: "xt2_nrTL5BA", title: "You can change the world | Sakshi Shree & Vikram Sampath Podcast | Ep 10", lang: "English" },
  { id: "QqsTE6kS6mQ", title: "The Ultimate Purpose Of Life | इस अस्तित्व में आपके जीवन का अंतिम उद्देश्य क्या है।", lang: "Hindi" },
  { id: "oXOuT0m_e1Q", title: "पूरी तरह जागना ही आपके जीवन का उद्देश्य है | The purpose of your life | Sakshi Shree", lang: "Hindi" },
  { id: "dvZQfyU3k8E", title: "जीवन की सही राह कैसे चुनें? | How to find the right way of life? | Sakshi Shree", lang: "Hindi" },
  { id: "pAbmY2WfuIQ", title: "आप अस्तित्व से हर चीज़ पा सकते हो, जाने वह कुंजी। Manifest your desires I Sakshi Shree", lang: "Hindi" },
  { id: "VLUrgEdTY7A", title: "आनंद का सबसे बड़ा रहस्य! जो हो रहा है… उसे स्वीकार करो", lang: "Hindi" },
  { id: "g3D8KeFWUoQ", title: "Finding Success on the Spiritual Path | साधना के 2 मार्ग- संकल्प और समर्पण", lang: "Hindi" },
  { id: "8lv7lyneXVY", title: "What's the real purpose of your life?", lang: "English" },
];

const QUOTES = Array.from({ length: 9 }, (_, i) => `/images/old-site/pages/finding-purpose/Anxiety-Quote-${i + 1}.webp`);

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
      <section style={{ background: "linear-gradient(135deg, #4B101B 0%, #2E070F 50%, #4B101B 100%)", paddingTop: "120px", paddingBottom: "80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-80px", left: "-60px", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(75,16,27,0.4) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div className="container-page" style={{ position: "relative", zIndex: 1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: "100px", padding: "6px 16px", marginBottom: "20px" }}>
                <Target size={14} style={{ color: "#D4AF37" }} />
                <span style={{ color: "#D4AF37", fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Solutions · Finding Purpose</span>
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 4.5vw, 3.8rem)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.15, marginBottom: "20px" }}>
                Finding Your Purpose:{" "}
                <span style={{ background: "linear-gradient(90deg, #D4AF37, #FDE68A)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                  A Journey to Self-Discovery
                </span>
              </h1>
              <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.8, maxWidth: "620px", marginBottom: "32px" }}>
                Sometimes, figuring out your purpose can feel like searching for a needle in a haystack. But once you find what truly makes you happy, it's like finding the last piece of a puzzle. Let Sakshi Shree's guidance and our programs help you understand yourself better and find what really matters.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                <Link href="/book-session" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg, #D4AF37, #B8860B)", color: "#2E070F", padding: "14px 28px", borderRadius: "100px", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", boxShadow: "0 4px 20px rgba(212,175,55,0.35)" }}>
                  Book a Session <ArrowRight size={16} />
                </Link>
                <a href="#explore" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", color: "#FFFFFF", padding: "14px 28px", borderRadius: "100px", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none", backdropFilter: "blur(10px)" }}>
                  Explore Resources <ChevronRight size={16} />
                </a>
              </div>
            </div>

            {/* Right side topic image */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative w-full max-w-[480px] aspect-[4/3] sm:aspect-[1.15] overflow-hidden rounded-3xl shadow-2xl border-4 border-white/20">
                <img loading="lazy" decoding="async"
                  src="/images/uploads/2025/01/dhyan-with-happy-face-copy-1-1-896x1024.webp"
                  alt="Finding Your Purpose"
                  className="w-full h-full object-cover object-top transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
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
            <SectionHeading eyebrow="Read & Reflect" title="Explore Your Life's Purpose" subtitle="Guiding articles from Sakshi Shree on self-discovery, spiritual values, and conscious living." />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px", marginTop: "40px" }}>
              {ARTICLES.map((a, i) => (
                <a key={i} href={a.href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", flexDirection: "column", background: "#FFFFFF", border: "1px solid rgba(75,16,27,0.18)", borderRadius: "22px", textDecoration: "none", boxShadow: "0 8px 24px rgba(75,16,27,0.06)", transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s", position: "relative", overflow: "hidden" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-6px)"; el.style.boxShadow = "0 16px 40px rgba(75,16,27,0.14)"; el.style.borderColor = "#4B101B"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 8px 24px rgba(75,16,27,0.06)"; el.style.borderColor = "rgba(75,16,27,0.18)"; }}
                >
                  <div style={{ position: "relative", height: "164px", overflow: "hidden", background: "#F7EEDC" }}>
                    <img src={a.image} alt={a.alt} loading={i < 3 ? "eager" : "lazy"} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", transition: "transform 0.45s ease" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(75,16,27,0.02) 20%, rgba(75,16,27,0.48) 100%)", pointerEvents: "none" }} />
                    <span style={{ position: "absolute", left: "18px", bottom: "16px", background: "rgba(255,250,240,0.9)", color: "#4B101B", fontSize: "10px", fontWeight: 800, padding: "5px 10px", borderRadius: "999px", textTransform: "uppercase", letterSpacing: "0.12em", backdropFilter: "blur(8px)" }}>{a.tag}</span>
                  </div>
                  <div style={{ padding: "22px 24px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", marginBottom: "12px" }}>
                    <div style={{ width: "36px", height: "2px", background: "linear-gradient(90deg, #4B101B, #D4AF37)", borderRadius: "999px" }} />
                    <span style={{ color: "#9CA3AF", fontSize: "12px" }}>{a.readTime} read</span>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", fontWeight: 700, color: "#4B101B", lineHeight: 1.45, marginBottom: "12px", flex: 1 }}>{a.title}</h3>
                  <p style={{ color: "#6B7280", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "20px" }}>{a.desc}</p>
                  <div style={{ paddingTop: "14px", borderTop: "1px solid #F1E6CF", display: "flex", alignItems: "center", gap: "6px", color: "#4B101B", fontWeight: 800, fontSize: "0.8rem", letterSpacing: "0.03em" }}>Read Article <ArrowRight size={14} /></div>
                  </div>
                </a>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <Link href="/latest-testimonials-videos" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(75,16,27,0.08)", border: "1px solid rgba(75,16,27,0.25)", color: "#4B101B", padding: "12px 28px", borderRadius: "100px", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none" }}>
                Watch Testimonials <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div style={{ display: tab === "quotes" ? "block" : "none" }}>
            <SectionHeading eyebrow="Words of Wisdom" title="Inspirational Quotes" subtitle="Inspirational mantras from Sakshi Shree to light your path to self-discovery." />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px", marginTop: "40px" }}>
              {QUOTES.map((src, i) => (
                <div key={i} style={{ borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", transition: "transform 0.3s, box-shadow 0.3s" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-6px) scale(1.01)"; el.style.boxShadow = "0 16px 40px rgba(75,16,27,0.18)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0) scale(1)"; el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)"; }}
                >
                  <img src={src} alt={`Finding Purpose Quote ${i + 1}`} decoding="async" style={{ width: "100%", height: "auto", display: "block" }} />
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: tab === "videos" ? "block" : "none" }}>
            <SectionHeading eyebrow="Watch & Realize" title="Videos on the Purpose of Life" subtitle="8 powerful sessions from Sakshi Shree on awakening, choosing the right path, and fulfilling your destiny." />
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

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg, #4B101B 0%, #2E070F 100%)", padding: "80px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div className="container-page" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, color: "#FFFFFF", marginBottom: "16px" }}>
            Align with Your{" "}
            <span style={{ background: "linear-gradient(90deg, #D4AF37, #FDE68A)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              Highest Destiny
            </span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.05rem", maxWidth: "540px", margin: "0 auto 36px", lineHeight: 1.75 }}>
            Do not let self-doubt hold you back. Reclaim your potential and take charge of your life's path. Book a personal session with Sakshi Shree today.
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
