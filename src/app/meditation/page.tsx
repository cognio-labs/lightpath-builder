"use client";
import Link from "next/link";

import { SectionHeading } from "@/components/PageHero";
import { useState } from "react";
import { BookOpen, Quote, PlayCircle, Mic, ArrowRight, Star, Compass, Heart, ChevronRight } from "lucide-react";
import { FastVideoCard, FastTestimonialCard } from "@/components/FastMediaCards";




type Tab = "articles" | "quotes" | "videos";

const ARTICLES = [
  { title: "How to become a spiritual person?", href: "https://sciencedivine.org/what-is-spiritual/", tag: "Spirituality", readTime: "8 min", desc: "A beginner's exploration on transitioning from material orientation to spiritual mindfulness and inner joy." },
  { title: "What is Sahasrara Chakra & How to Activate it", href: "https://sciencedivine.org/sahasrara-chakra/", tag: "Chakra", readTime: "11 min", desc: "Understanding the Crown Chakra, the seat of universal connection, cosmic consciousness, and ultimate awakening." },
  { title: "What is Ajna Chakra & How to Activate it", href: "https://sciencedivine.org/ajna-chakra/", tag: "Chakra", readTime: "10 min", desc: "Unlocking the Third-Eye Chakra to tap into your intuition, inner guidance, and mental clarity." },
  { title: "What is Vishuddha Chakra & How to Activate it", href: "https://sciencedivine.org/vishuddha-chakra/", tag: "Chakra", readTime: "9 min", desc: "A guide to the Throat Chakra, governing expression, creative flow, and authentic communication." },
  { title: "What is Anahata Chakra & How to Activate it", href: "https://sciencedivine.org/anahata-chakra/", tag: "Chakra", readTime: "10 min", desc: "Opening the Heart Chakra to foster unconditional love, compassion, acceptance, and emotional healing." },
  { title: "Manipura Chakra: A beginners Guide to activate it", href: "https://sciencedivine.org/manipura-chakra/", tag: "Chakra", readTime: "8 min", desc: "Awakening the Solar Plexus Chakra to ignite personal power, self-esteem, courage, and vitality." },
  { title: "A Beginner’s Guide to the Svadhisthana Chakra", href: "https://sciencedivine.org/svadhisthana-chakra/", tag: "Chakra", readTime: "9 min", desc: "Nurturing the Sacral Chakra, the center of sensuality, emotional balance, and creative energies." },
  { title: "What is Muladhara Chakra and How to Activate it", href: "https://sciencedivine.org/muladhara-chakra/", tag: "Chakra", readTime: "10 min", desc: "Stabilizing the Root Chakra to establish safety, grounding, physical presence, and base stability." },
  { title: "Spirituality’s Role in Healing Childhood Trauma", href: "https://sciencedivine.org/spiritualitys-role-in-healing-childhood-trauma/", tag: "Trauma Healing", readTime: "12 min", desc: "How spiritual awareness and quiet meditation can dissolve deeply stored emotional blockages from childhood." },
];

const VIDEOS = [
  { id: "VBr86HnrDZQ", title: "चमत्कारी है विपस्सना/विपश्यना साधना || What is Vipassna meditation || Sakshi Shree", lang: "Hindi" },
  { id: "lKKsSYvsGHg", title: "ध्यान का सही समय क्या है? || Right time to meditate || Sakshi Shree", lang: "Hindi" },
  { id: "DnEHD04Wu1c", title: "खाना कैसे खाएं की सभी बीमारी ठीक हो जाए #HowTo live in present, best way of #Meditation", lang: "Hindi" },
  { id: "Zn-IuX9Wgho", title: "कहाँ मिलेगा ध्यान का रिपोर्ट कार्ड || How to measure progress in meditation || Sakshi Shree", lang: "Hindi" },
  { id: "cH5qIsADaec", title: "साक्षी साधना ध्यान कैसे करें How to do the meditation of Sakshi Sadhna", lang: "Hindi" },
  { id: "hLakweacD5M", title: "कैसा ध्यान करते हैं शिव? || Lord Shiva's Meditation Technique || Sakshi Shree", lang: "Hindi" },
  { id: "wB3X-CSKi-0", title: "Just Sitting, Doing Nothing. See the Magic in your Life | Sadhguru Sakshi Shree", lang: "English" },
  { id: "GWT4D_RYEKg", title: "Manifestation Through Third-Eye MEDITATION | Sakshi Shree", lang: "English" },
  { id: "_kR1yEhIBYM", title: "ध्यान करने की सही दिशा क्या है? साक्षी श्री || Right direction for meditation", lang: "Hindi" },
];

const QUOTES = Array.from({ length: 9 }, (_, i) => `/images/old-site/pages/meditation/Anxiety-Quote-${i + 1}.webp`);

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
                <Compass size={14} style={{ color: "#D4AF37" }} />
                <span style={{ color: "#D4AF37", fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Practices · Meditation</span>
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 4.5vw, 3.8rem)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.15, marginBottom: "20px" }}>
                Start Meditating Today:{" "}
                <span style={{ background: "linear-gradient(90deg, #D4AF37, #FDE68A)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                  Health & Happiness
                </span>
              </h1>
              <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.8, maxWidth: "620px", marginBottom: "32px" }}>
                Meditation is a timeless practice that offers profound benefits for body and mind. Focus your attention, quiet the chatter of the mind, reduce stress, and promote physical healing. Let Sakshi Shree’s wisdom illuminate your path to inner peace and well-being.
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
              <div className="relative w-full max-w-[480px] aspect-square overflow-hidden rounded-3xl shadow-2xl border-4 border-white/20">
                <img loading="lazy" decoding="async"
                  src="/images/meditation-hero.jpg"
                  alt="Meditation for Health and Happiness"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
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
            <SectionHeading eyebrow="Read & Learn" title="Guided Articles on Meditation & Chakras" subtitle="Learn about spiritual development, energy activation, and clearing somatic blocks." />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px", marginTop: "40px" }}>
              {ARTICLES.map((a, i) => (
                <a key={i} href={a.href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", flexDirection: "column", background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "20px", padding: "28px", textDecoration: "none", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s", position: "relative", overflow: "hidden" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-6px)"; el.style.boxShadow = "0 16px 40px rgba(75,16,27,0.12)"; el.style.borderColor = "#4B101B"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; el.style.borderColor = "#E5E7EB"; }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, #4B101B, #D4AF37)", borderRadius: "20px 20px 0 0" }} />
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                    <span style={{ background: "rgba(75,16,27,0.1)", color: "#4B101B", fontSize: "11px", fontWeight: 700, padding: "4px 10px", borderRadius: "100px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{a.tag}</span>
                    <span style={{ color: "#9CA3AF", fontSize: "12px" }}>{a.readTime} read</span>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", fontWeight: 700, color: "#4B101B", lineHeight: 1.45, marginBottom: "12px", flex: 1 }}>{a.title}</h3>
                  <p style={{ color: "#6B7280", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "20px" }}>{a.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#4B101B", fontWeight: 700, fontSize: "0.875rem" }}>Read Article <ArrowRight size={14} /></div>
                </a>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <a href="https://sciencedivine.org/category/meditation/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(75,16,27,0.08)", border: "1px solid rgba(75,16,27,0.25)", color: "#4B101B", padding: "12px 28px", borderRadius: "100px", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none" }}>
                Read More Articles <ArrowRight size={15} />
              </a>
            </div>
          </div>

          <div style={{ display: tab === "quotes" ? "block" : "none" }}>
            <SectionHeading eyebrow="Words of Wisdom" title="Inspirational Quotes" subtitle="Let these sacred insights on mindfulness and meditation settle into your awareness." />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px", marginTop: "40px" }}>
              {QUOTES.map((src, i) => (
                <div key={i} style={{ borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", transition: "transform 0.3s, box-shadow 0.3s" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-6px) scale(1.01)"; el.style.boxShadow = "0 16px 40px rgba(75,16,27,0.18)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0) scale(1)"; el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)"; }}
                >
                  <img src={src} alt={`Meditation Quote ${i + 1}`} decoding="async" style={{ width: "100%", height: "auto", display: "block" }} />
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: tab === "videos" ? "block" : "none" }}>
            <SectionHeading eyebrow="Watch & Practice" title="Guided Meditation & Teachings" subtitle="9 video lessons from Sakshi Shree on meditation methods, Vipassana, and measuring progress." />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "28px", marginTop: "40px" }}>
              {VIDEOS.map((v, i) => (
                <FastVideoCard
                  key={i}
                  id={v.id}
                  title={v.title}
                  lang={v.lang || "Hindi"}
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
            Begin Your{" "}
            <span style={{ background: "linear-gradient(90deg, #D4AF37, #FDE68A)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              Meditation Practice
            </span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.05rem", maxWidth: "540px", margin: "0 auto 36px", lineHeight: 1.75 }}>
            Establish a direct pathway to knowing yourself. Connect with Sakshi Shree in a personal session to receive personalized meditation techniques.
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
