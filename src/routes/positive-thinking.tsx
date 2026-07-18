import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/PageHero";
import { useState } from "react";
import { BookOpen, Quote, PlayCircle, Mic, ArrowRight, Star, Sun, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/positive-thinking")({
  head: () => ({
    meta: [
      { title: "Power of Positive Thinking | Science Divine Foundation" },
      { name: "description", content: "The Power of Positive Thinking with Sakshi Shree. Align thoughts, foster optimism, eliminate negative spirals, and manifest success." },
      { property: "og:title", content: "Positive Thinking — Science Divine" },
      { property: "og:url", content: "/positive-thinking" },
    ],
    links: [{ rel: "canonical", href: "/positive-thinking" }],
  }),
  component: Page,
});

type Tab = "articles" | "quotes" | "videos" | "podcasts";

const ARTICLES = [
  { title: "7 Ways to Foster an Optimistic Mind", href: "https://sciencedivine.org/optimistic-mind/", tag: "Optimism", readTime: "7 min", desc: "How shifting to positive mental habits opens doors to creativity and joy." },
  { title: "10 Ways to Overcome Negative Thoughts", href: "https://sciencedivine.org/stop-negative-thinking/", tag: "Positivity", readTime: "8 min", desc: "Scientific and spiritual strategies to bypass negative thought cycles and find alignment." },
  { title: "How to Activate Seven Chakras in Human Body", href: "https://sciencedivine.org/seven-chakras/", tag: "Energy Centers", readTime: "10 min", desc: "Unlocking body energy to clear somatically stored doubts and foster positive thoughts." },
  { title: "What Your Conscious Mind Can Do: Simple Explained", href: "https://sciencedivine.org/what-is-conscious-mind/", tag: "Mind", readTime: "7 min", desc: "Harnessing conscious intent to actively direct thoughts toward serve and success." },
  { title: "The Basics of Conscious mind and Subconscious mind", href: "https://sciencedivine.org/conscious-mind-and-subconscious-mind/", tag: "Psychology", readTime: "8 min", desc: "Reprogramming deep-seated subconscious biases for natural optimism." },
  { title: "How to Be Conscious: Wake Up Your Mind Every Day", href: "https://sciencedivine.org/conscious/", tag: "Awareness", readTime: "9 min", desc: "Waking up to the present moment to prevent automatic negative loop patterns." },
  { title: "How to Feel Calm: Easy Ways to Find Peace of Mind", href: "https://sciencedivine.org/what-is-peace-of-mind/", tag: "Calmness", readTime: "6 min", desc: "Simple techniques to calm mental noise and tap into peaceful optimism." },
  { title: "What Is Positive Thinking and Why It Matters", href: "https://sciencedivine.org/what-is-positive-thinking/", tag: "Mindset", readTime: "7 min", desc: "Why embracing optimism and self-belief attracts success and happiness." },
  { title: "The Simple Guide to Effective Manifestation", href: "https://sciencedivine.org/what-is-manifestation/", tag: "Manifestation", readTime: "7 min", desc: "How maintaining positive thinking triggers the law of attraction to fulfill desires." },
];

const VIDEOS = [
  { id: "zbHTL4AIbjQ", title: "How to Always Think Positive? | सकारात्मक दृष्टिकोण | Sakshi Shree", lang: "Hindi" },
  { id: "WuexPS1a9DM", title: "Immediate freedom from anxiety, stress & fear | Sakshi Shree", lang: "English" },
  { id: "oXOuT0m_e1Q", title: "पूरी तरह जागना ही आपके जीवन का उद्देश्य है | The purpose of your life | Sakshi Shree", lang: "Hindi" },
  { id: "dvZQfyU3k8E", title: "जीवन की सही राह कैसे चुनें? | How to find the right way of life? | Sakshi Shree", lang: "Hindi" },
  { id: "pAbmY2WfuIQ", title: "आप अस्तित्व से हर चीज़ पा सकते हो, जाने वह कुंजी | Manifest your desires", lang: "Hindi" },
  { id: "VLUrgEdTY7A", title: "आनंद का सबसे बड़ा रहस्य! जो हो रहा है… उसे स्वीकार करो", lang: "Hindi" },
  { id: "g3D8KeFWUoQ", title: "Finding Success on the Spiritual Path | साधना के मार्ग", lang: "Hindi" },
];

const QUOTES = Array.from({ length: 9 }, (_, i) => `https://sciencedivine.org/wp-content/uploads/2024/04/Anxiety-Quote-${i + 1}.jpg`);

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

const LANG_COLORS: Record<string, { bg: string; text: string }> = {
  English: { bg: "rgba(59,130,246,0.1)", text: "#2563EB" },
  Hindi: { bg: "rgba(212,175,55,0.12)", text: "#B45309" },
};

function Page() {
  const [tab, setTab] = useState<Tab>("articles");

  return (
    <>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #78350F 0%, #B45309 50%, #78350F 100%)", paddingTop: "120px", paddingBottom: "80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-80px", left: "-60px", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div className="container-page" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "800px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.3)", borderRadius: "100px", padding: "6px 16px", marginBottom: "24px" }}>
              <Sun size={14} style={{ color: "#FBBF24" }} />
              <span style={{ color: "#FBBF24", fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Solutions — Positive Thinking</span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.15, marginBottom: "24px" }}>
              The Power of{" "}
              <span style={{ background: "linear-gradient(90deg, #FBBF24, #D4AF37)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                Positive Thinking
              </span>
            </h1>
            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.8, maxWidth: "660px", marginBottom: "40px" }}>
              Positive thinking is like a sunny outlook on life, even when it's cloudy. When you believe in yourself, focus on your strengths, and manifest your dreams, opportunities appear from nowhere. Learn to embrace optimism with Sakshi Shree.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <Link to="/book-session" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg, #F59E0B, #D4AF37)", color: "#0F172A", padding: "14px 28px", borderRadius: "100px", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", boxShadow: "0 4px 20px rgba(212,175,55,0.35)" }}>
                Book a Session <ArrowRight size={16} />
              </Link>
              <a href="#explore" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", color: "#FFFFFF", padding: "14px 28px", borderRadius: "100px", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none", backdropFilter: "blur(10px)" }}>
                Explore Resources <ChevronRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section id="explore" style={{ background: "#F8F7F4", borderBottom: "1px solid #E5E7EB" }}>
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

          {tab === "articles" && (
            <div>
              <SectionHeading eyebrow="Read & Learn" title="Articles on Optimistic Thinking" subtitle="Cultivate self-belief, eliminate negative thoughts, and redirect your conscious focus." />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px", marginTop: "40px" }}>
                {ARTICLES.map((a, i) => (
                  <a key={i} href={a.href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", flexDirection: "column", background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "20px", padding: "28px", textDecoration: "none", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s", position: "relative", overflow: "hidden" }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-6px)"; el.style.boxShadow = "0 16px 40px rgba(217,119,6,0.12)"; el.style.borderColor = "#D97706"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; el.style.borderColor = "#E5E7EB"; }}
                  >
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, #D97706, #D4AF37)", borderRadius: "20px 20px 0 0" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                      <span style={{ background: "rgba(217,119,6,0.1)", color: "#D97706", fontSize: "11px", fontWeight: 700, padding: "4px 10px", borderRadius: "100px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{a.tag}</span>
                      <span style={{ color: "#9CA3AF", fontSize: "12px" }}>{a.readTime} read</span>
                    </div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", fontWeight: 700, color: "#111827", lineHeight: 1.45, marginBottom: "12px", flex: 1 }}>{a.title}</h3>
                    <p style={{ color: "#6B7280", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "20px" }}>{a.desc}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#D97706", fontWeight: 700, fontSize: "0.875rem" }}>Read Article <ArrowRight size={14} /></div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {tab === "quotes" && (
            <div>
              <SectionHeading eyebrow="Words of Wisdom" title="Inspirational Quotes" subtitle="Inspirational mantras from Sakshi Shree on self-belief, hope, and optimism." />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px", marginTop: "40px" }}>
                {QUOTES.map((src, i) => (
                  <div key={i} style={{ borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", transition: "transform 0.3s, box-shadow 0.3s" }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-6px) scale(1.01)"; el.style.boxShadow = "0 16px 40px rgba(217,119,6,0.18)"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0) scale(1)"; el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)"; }}
                  >
                    <img src={src} alt={`Positive Thinking Quote ${i + 1}`} loading="lazy" style={{ width: "100%", height: "auto", display: "block" }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "videos" && (
            <div>
              <SectionHeading eyebrow="Watch & Learn" title="Videos on the Power of Positive Thinking" subtitle="7 video teachings from Sakshi Shree on overcoming fear, thinking positive, and choosing your destiny." />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "28px", marginTop: "40px" }}>
                {VIDEOS.map((v, i) => (
                  <div key={i} style={{ background: "#FFFFFF", borderRadius: "20px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #E5E7EB", transition: "transform 0.25s, box-shadow 0.25s" }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-6px)"; el.style.boxShadow = "0 20px 50px rgba(0,0,0,0.12)"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"; }}
                  >
                    <div style={{ position: "relative", paddingTop: "56.25%" }}>
                      <iframe src={`https://www.youtube.com/embed/${v.id}`} title={v.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }} />
                    </div>
                    <div style={{ padding: "20px" }}>
                      <span style={{ background: LANG_COLORS[v.lang]?.bg, color: LANG_COLORS[v.lang]?.text, fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "100px", display: "inline-block", marginBottom: "8px" }}>{v.lang}</span>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.95rem", fontWeight: 700, color: "#111827", lineHeight: 1.5 }}>{v.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "podcasts" && (
            <div>
              <SectionHeading eyebrow="Real Transformation" title="Positive Thinking Testimonials" subtitle="Real stories from our community members about how adopting optimism transformed their lives." />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "28px", marginTop: "40px" }}>
                {TESTIMONIALS.map((t, i) => (
                  <div key={i} style={{ background: "#FFFFFF", borderRadius: "20px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #E5E7EB", transition: "transform 0.25s, box-shadow 0.25s" }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-6px)"; el.style.boxShadow = "0 20px 50px rgba(217,119,6,0.12)"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"; }}
                  >
                    <div style={{ position: "relative", paddingTop: "56.25%" }}>
                      <iframe src={`https://www.youtube.com/embed/${t.id}`} title={t.name} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }} />
                    </div>
                    <div style={{ padding: "20px" }}>
                      <div style={{ display: "flex", gap: "3px", marginBottom: "8px" }}>{Array.from({ length: 5 }).map((_, si) => <Star key={si} size={14} fill="#F59E0B" style={{ color: "#F59E0B" }} />)}</div>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700, color: "#111827" }}>{t.name}</h3>
                      <p style={{ color: "#9CA3AF", fontSize: "0.8rem", marginTop: "4px" }}>Science Divine Community Member</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: "center", marginTop: "48px" }}>
                <Link to="/latest-testimonials-videos" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg, #F59E0B, #D4AF37)", color: "#0F172A", padding: "14px 32px", borderRadius: "100px", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", boxShadow: "0 4px 20px rgba(212,175,55,0.3)" }}>
                  Watch All Testimonials <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg, #78350F 0%, #B45309 100%)", padding: "80px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div className="container-page" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, color: "#FFFFFF", marginBottom: "16px" }}>
            Embrace the{" "}
            <span style={{ background: "linear-gradient(90deg, #FBBF24, #D4AF37)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              Wonders of Hope
            </span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1.05rem", maxWidth: "540px", margin: "0 auto 36px", lineHeight: 1.75 }}>
            Why not take a leap of faith today? Amplify your positive energy and manifest your dreams. Book a personal session with Sakshi Shree.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/book-session" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg, #FBBF24, #D4AF37)", color: "#0F172A", padding: "16px 36px", borderRadius: "100px", fontWeight: 700, fontSize: "1rem", textDecoration: "none", boxShadow: "0 8px 30px rgba(212,175,55,0.4)" }}>
              Book Personal Session <ArrowRight size={16} />
            </Link>
            <Link to="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", color: "#FFFFFF", padding: "16px 36px", borderRadius: "100px", fontWeight: 600, fontSize: "1rem", textDecoration: "none" }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
