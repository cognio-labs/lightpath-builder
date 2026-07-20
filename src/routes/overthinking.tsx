import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/PageHero";
import { useState } from "react";
import { BookOpen, Quote, PlayCircle, Mic, ArrowRight, Star, Brain, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/overthinking")({
  head: () => ({
    meta: [
      { title: "Overcome Overthinking | Science Divine Foundation" },
      { name: "description", content: "Overthinking No More: Techniques for Clarity and Calm by Sakshi Shree. Break free from the relentless whirlwind of doubt and reclaim mental peace." },
      { property: "og:title", content: "Overthinking ,  Science Divine" },
      { property: "og:url", content: "/overthinking" },
    ],
    links: [{ rel: "canonical", href: "/overthinking" }],
  }),
  component: Page,
});

type Tab = "articles" | "quotes" | "videos" | "podcasts";

const ARTICLES = [
  { title: "Understanding Feminine Energy and 6 Ways to Reclaim it", href: "https://sciencedivine.org/feminine-energy/", tag: "Energy", readTime: "9 min", desc: "How reconnecting with intuitive, receptive energy naturally quiets the analytical overdrive of overthinking." },
  { title: "7 Ways to Foster an Optimistic Mind", href: "https://sciencedivine.org/optimistic-mind/", tag: "Mindset", readTime: "7 min", desc: "Practical daily habits for shifting from catastrophic thinking loops to a solution-oriented, positive mindset." },
  { title: "10 Ways to Overcome Negative Thoughts", href: "https://sciencedivine.org/stop-negative-thinking/", tag: "Negativity", readTime: "8 min", desc: "Evidence-based spiritual techniques for interrupting negative thought spirals before they gain momentum." },
  { title: "What is Spirituality & How to Grow it?", href: "https://sciencedivine.org/what-is-spirituality/", tag: "Spirituality", readTime: "10 min", desc: "Understanding how spiritual depth creates the inner spaciousness that makes overthinking simply fall away." },
  { title: "What is Consciousness: A Beginner's Guide", href: "https://sciencedivine.org/what-is-consciousness/", tag: "Consciousness", readTime: "8 min", desc: "An accessible introduction to the witness state ,  the awareness that watches thoughts without being swept away." },
  { title: "The Basics of Conscious Mind and Subconscious Mind", href: "https://sciencedivine.org/conscious-mind-and-subconscious-mind/", tag: "Mind", readTime: "8 min", desc: "Understanding why the subconscious mind runs repetitive thought loops ,  and how to reprogram them." },
  { title: "What Your Conscious Mind Can Do: Simply Explained", href: "https://sciencedivine.org/what-is-conscious-mind/", tag: "Awareness", readTime: "7 min", desc: "Harnessing the directing power of the conscious mind to steer mental energy toward clarity and action." },
  { title: "How to Be Conscious: Wake Up Your Mind Every Day", href: "https://sciencedivine.org/conscious/", tag: "Daily Practice", readTime: "9 min", desc: "A morning-to-evening protocol for maintaining present-moment awareness and preventing thought spiraling." },
  { title: "Why Should You Prioritize Your Mental Health Every Day?", href: "https://sciencedivine.org/what-is-mental-health/", tag: "Mental Health", readTime: "6 min", desc: "How daily mental wellness practices directly reduce the cognitive load that triggers overthinking." },
];

const VIDEOS = [
  { id: "V6N--wsi2PA", title: "Overthinking का चक्र कैसे तोड़ें? | #overthinking #meditation #SakshiShree", lang: "Hindi" },
  { id: "K8GXgnAchBY", title: "रुक जायेगा विचारों का ये तूफ़ान | Stop this train of thoughts | Mental Peace | साक्षी श्री", lang: "Hindi" },
  { id: "zbHTL4AIbjQ", title: "How to Always Think Positive? | सकारात्मक दृष्टिकोण | Sakshi Shree", lang: "Bilingual" },
  { id: "qZRAoRzMwmM", title: "Heart or Mind, whom to follow | Heart and mind Conflict | Sakshi Shree", lang: "English" },
  { id: "mnLKvGNvlFc", title: "मन के जाल से मुक्ति मिल जाएगी | Sakshi Shree", lang: "Hindi" },
  { id: "H_gHAxWkMzQ", title: "Power of thoughtless mind | जीवन में सफल होने के लिए विचार शून्यता", lang: "Bilingual" },
  { id: "ds00dU3dK1U", title: "विचार शक्ति से आप हर मनचाही सफलता प्राप्त कर सकते हैं | Sadhguru Sakshi Shree", lang: "Hindi" },
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
  Bilingual: { bg: "rgba(16,185,129,0.1)", text: "#059669" },
};

function Page() {
  const [tab, setTab] = useState<Tab>("articles");

  return (
    <>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #052E16 0%, #14532D 50%, #052E16 100%)", paddingTop: "120px", paddingBottom: "80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-80px", left: "-60px", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div className="container-page" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "48px", alignItems: "center" }}>
            <div style={{ maxWidth: "660px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: "100px", padding: "6px 16px", marginBottom: "24px" }}>
                <Brain size={14} style={{ color: "#D4AF37" }} />
                <span style={{ color: "#D4AF37", fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Solutions · Overthinking</span>
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.15, marginBottom: "24px" }}>
                Overthinking{" "}
                <span style={{ background: "linear-gradient(90deg, #F59E0B, #D4AF37)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                  No More
                </span>
                : Clarity &amp; Calm
              </h1>
              <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.8, maxWidth: "560px", marginBottom: "40px" }}>
                Replaying scenarios and imagining worst-case outcomes? Overthinking drains mental energy, leaving us exhausted, anxious, and unable to focus. At Science Divine, discover techniques to quiet the mind's chatter, find clarity, and nurture inner peace through mindfulness and self-awareness.
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
            {/* Hero Image */}
            <div style={{ display: "flex", justifyContent: "center", flexShrink: 0 }}>
              <div style={{ position: "relative", width: "340px", height: "420px", borderRadius: "24px", overflow: "hidden", boxShadow: "0 0 60px rgba(74,222,128,0.15), 0 30px 60px rgba(0,0,0,0.4)" }}>
                <img
                  src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=700&q=85&fit=crop&crop=faces,center"
                  alt="Person achieving mental clarity through meditation"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,46,22,0.6) 0%, transparent 50%)" }} />
              </div>
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
              <SectionHeading eyebrow="Read & Reflect" title="Articles on Quieting the Mind" subtitle="Guidance from Sakshi Shree to break free from overthinking and find lasting mental clarity." />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px", marginTop: "40px" }}>
                {ARTICLES.map((a, i) => (
                  <a key={i} href={a.href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", flexDirection: "column", background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "20px", padding: "28px", textDecoration: "none", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s", position: "relative", overflow: "hidden" }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-6px)"; el.style.boxShadow = "0 16px 40px rgba(16,185,129,0.12)"; el.style.borderColor = "#10B981"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; el.style.borderColor = "#E5E7EB"; }}
                  >
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, #10B981, #D4AF37)", borderRadius: "20px 20px 0 0" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                      <span style={{ background: "rgba(16,185,129,0.1)", color: "#059669", fontSize: "11px", fontWeight: 700, padding: "4px 10px", borderRadius: "100px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{a.tag}</span>
                      <span style={{ color: "#9CA3AF", fontSize: "12px" }}>{a.readTime} read</span>
                    </div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", fontWeight: 700, color: "#111827", lineHeight: 1.45, marginBottom: "12px", flex: 1 }}>{a.title}</h3>
                    <p style={{ color: "#6B7280", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "20px" }}>{a.desc}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#10B981", fontWeight: 700, fontSize: "0.875rem" }}>Read Article <ArrowRight size={14} /></div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {tab === "quotes" && (
            <div>
              <SectionHeading eyebrow="Words of Wisdom" title="Inspirational Quotes" subtitle="Sacred wisdom from Sakshi Shree to anchor you in stillness and clarity." />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px", marginTop: "40px" }}>
                {QUOTES.map((src, i) => (
                  <div key={i} style={{ borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", transition: "transform 0.3s, box-shadow 0.3s" }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-6px) scale(1.01)"; el.style.boxShadow = "0 16px 40px rgba(16,185,129,0.18)"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0) scale(1)"; el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)"; }}
                  >
                    <img src={src} alt={`Quote ${i + 1}`} loading="lazy" style={{ width: "100%", height: "auto", display: "block" }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "videos" && (
            <div>
              <SectionHeading eyebrow="Watch & Transform" title="Video Teachings on Overthinking" subtitle="7 powerful sessions from Sakshi Shree on silencing the mental noise and reclaiming clarity." />
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
              <SectionHeading eyebrow="Real Transformation" title="Testimonials ,  From Chaos to Calm" subtitle="Real people sharing how Sakshi Shree's teachings stopped the overthinking spiral." />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "28px", marginTop: "40px" }}>
                {TESTIMONIALS.map((t, i) => (
                  <div key={i} style={{ background: "#FFFFFF", borderRadius: "20px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #E5E7EB", transition: "transform 0.25s, box-shadow 0.25s" }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-6px)"; el.style.boxShadow = "0 20px 50px rgba(16,185,129,0.12)"; }}
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
      <section style={{ background: "linear-gradient(135deg, #052E16 0%, #14532D 100%)", padding: "80px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div className="container-page" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, color: "#FFFFFF", marginBottom: "16px" }}>
            Reclaim{" "}
            <span style={{ background: "linear-gradient(90deg, #F59E0B, #D4AF37)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              Mental Clarity
            </span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1.05rem", maxWidth: "540px", margin: "0 auto 36px", lineHeight: 1.75 }}>
            Stop the endless thought spiral. Connect with Sakshi Shree for personalised guidance on achieving lasting stillness, focus, and inner peace.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/book-session" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg, #F59E0B, #D4AF37)", color: "#0F172A", padding: "16px 36px", borderRadius: "100px", fontWeight: 700, fontSize: "1rem", textDecoration: "none", boxShadow: "0 8px 30px rgba(212,175,55,0.4)" }}>
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
