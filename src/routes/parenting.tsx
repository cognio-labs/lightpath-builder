import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/PageHero";
import { useState } from "react";
import { BookOpen, Quote, PlayCircle, Mic, ArrowRight, Star, Heart, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/parenting")({
  head: () => ({
    meta: [
      { title: "Parenting Guidance | Science Divine Foundation" },
      { name: "description", content: "Sakshi Shree's Guide to Parenting Through the Ages ,  spiritual wisdom to navigate the joys and challenges of raising conscious children." },
      { property: "og:title", content: "Parenting ,  Science Divine" },
      { property: "og:url", content: "/parenting" },
    ],
    links: [{ rel: "canonical", href: "/parenting" }],
  }),
  component: Page,
});

type Tab = "articles" | "quotes" | "videos" | "podcasts";

const ARTICLES = [
  { title: "7 Ways to Foster an Optimistic Mind", href: "https://sciencedivine.org/optimistic-mind/", tag: "Mindset", readTime: "7 min", desc: "Practical wisdom for cultivating a positive outlook in children and parents alike through conscious daily habits." },
  { title: "How to Be Conscious: Wake Up Your Mind Every Day", href: "https://sciencedivine.org/conscious/", tag: "Awareness", readTime: "9 min", desc: "Step-by-step guide to awakening mindful presence as the foundation of conscious parenting." },
  { title: "How to Feel Calm: Easy Ways to Find Peace of Mind", href: "https://sciencedivine.org/what-is-peace-of-mind/", tag: "Peace", readTime: "6 min", desc: "Simple practices to cultivate inner calm so parents can respond rather than react in challenging moments." },
  { title: "Why Should You Prioritize Your Mental Health Every Day?", href: "https://sciencedivine.org/what-is-mental-health/", tag: "Mental Health", readTime: "6 min", desc: "Understanding how a parent's mental wellness directly shapes the emotional landscape of their children." },
  { title: "Benefits of Yoga for Hypertension Management", href: "https://sciencedivine.org/yoga-for-hypertension/", tag: "Wellness", readTime: "8 min", desc: "How gentle asana practice supports nervous system regulation ,  essential for patient, grounded parenting." },
  { title: "Yoga Nidra: Mastering the Art of Conscious Relaxation", href: "https://sciencedivine.org/yoga-nidra/", tag: "Sleep", readTime: "10 min", desc: "Restore deep energy after sleepless parenting nights with the science of yogic sleep." },
  { title: "Exploring the Symbiotic Connection Between Yoga and Mindfulness Meditation", href: "https://sciencedivine.org/unveiling-the-harmony/", tag: "Mindfulness", readTime: "8 min", desc: "Bridging physical practice and quiet mental observation for a holistic parenting lifestyle." },
  { title: "Meditation for Seniors: Embrace a Journey to Serenity and Healthy Aging", href: "https://sciencedivine.org/meditation-for-seniors/", tag: "Aging", readTime: "7 min", desc: "Wisdom for grandparents on maintaining presence and connection through the generations." },
  { title: "Harmonizing Mind and Body: The Transformative Power of Yoga and Meditation", href: "https://sciencedivine.org/harmonizing-mind-and-body/", tag: "Harmony", readTime: "9 min", desc: "How integrated mind-body practices create the inner stability needed for conscious parenting." },
];

const VIDEOS = [
  { id: "MPIOJ_POKi0", title: "Parenting tips & Spirituality ,  Sadhguru Sakshi Shri", lang: "Hindi" },
  { id: "5g4pqByHHUU", title: "बच्चे कहना ना मानें तो ऐसा करें | Parenting Tips | Sakshi Shree", lang: "Hindi" },
  { id: "pM5E2sKZoX8", title: "बच्चों के साथ कैसा व्यवहार करें | Parenting in Hindi | Sadhguru", lang: "Hindi" },
  { id: "lwGzIH3504s", title: "Powerful Tips To Raise Your Children | Parenting Advice", lang: "English" },
  { id: "KNbWWcyp7kQ", title: "बच्चों को कैसी शिक्षा दें? How to teach good manners to kids", lang: "Hindi" },
  { id: "zyhwVR7m5O8", title: "Why no one understands you? | आपको कोई क्यों नहीं समझता? | Sakshi Shree", lang: "Bilingual" },
  { id: "Q3HIZe4hsbE", title: "Youth and Values and Sanskar | Sakshi Shree", lang: "English" },
  { id: "hR_8-XOo0zY", title: "Follow these parenting tips, your child can create miracle ,  SakshiShreeEnglish", lang: "English" },
  { id: "xlx8bDuMLVo", title: "Disobeying Parents is not a sin! | Virtues of Disobeying Your Parents | Sakshi Shree", lang: "English" },
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
      <section style={{ background: "linear-gradient(135deg, #0D2137 0%, #1B3A5C 50%, #0D2137 100%)", paddingTop: "120px", paddingBottom: "80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-100px", left: "-60px", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(99,179,237,0.08) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div className="container-page" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "800px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: "100px", padding: "6px 16px", marginBottom: "24px" }}>
              <Heart size={14} style={{ color: "#D4AF37" }} />
              <span style={{ color: "#D4AF37", fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Solutions ,  Parenting</span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.15, marginBottom: "24px" }}>
              Guide to{" "}
              <span style={{ background: "linear-gradient(90deg, #F59E0B, #D4AF37)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                Parenting Through the Ages
              </span>
            </h1>
            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.8, maxWidth: "660px", marginBottom: "40px" }}>
              Parenting is a rollercoaster filled with love, laughter, and its fair share of challenges. From sleepless nights to navigating adolescence, join Sakshi Shree on an incredible journey ,  forging deeper connections with our children and ourselves along the way.
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
              <SectionHeading eyebrow="Read & Learn" title="Parenting Wisdom from Sakshi Shree" subtitle="Curated articles to help you raise conscious, resilient children through spiritual wisdom." />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px", marginTop: "40px" }}>
                {ARTICLES.map((a, i) => (
                  <a key={i} href={a.href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", flexDirection: "column", background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "20px", padding: "28px", textDecoration: "none", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s", position: "relative", overflow: "hidden" }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-6px)"; el.style.boxShadow = "0 16px 40px rgba(212,175,55,0.14)"; el.style.borderColor = "#D4AF37"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; el.style.borderColor = "#E5E7EB"; }}
                  >
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, #F59E0B, #D4AF37)", borderRadius: "20px 20px 0 0" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                      <span style={{ background: "rgba(212,175,55,0.12)", color: "#B45309", fontSize: "11px", fontWeight: 700, padding: "4px 10px", borderRadius: "100px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{a.tag}</span>
                      <span style={{ color: "#9CA3AF", fontSize: "12px" }}>{a.readTime} read</span>
                    </div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", fontWeight: 700, color: "#111827", lineHeight: 1.45, marginBottom: "12px", flex: 1 }}>{a.title}</h3>
                    <p style={{ color: "#6B7280", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "20px" }}>{a.desc}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#D4AF37", fontWeight: 700, fontSize: "0.875rem" }}>Read Article <ArrowRight size={14} /></div>
                  </a>
                ))}
              </div>
              <div style={{ textAlign: "center", marginTop: "40px" }}>
                <a href="https://sciencedivine.org/category/anxiety/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)", color: "#B45309", padding: "12px 28px", borderRadius: "100px", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none" }}>
                  Read More Articles <ArrowRight size={15} />
                </a>
              </div>
            </div>
          )}

          {tab === "quotes" && (
            <div>
              <SectionHeading eyebrow="Words of Wisdom" title="Inspirational Quotes" subtitle="Let these sacred words from Sakshi Shree guide your parenting journey." />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px", marginTop: "40px" }}>
                {QUOTES.map((src, i) => (
                  <div key={i} style={{ borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", transition: "transform 0.3s, box-shadow 0.3s" }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-6px) scale(1.01)"; el.style.boxShadow = "0 16px 40px rgba(212,175,55,0.2)"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0) scale(1)"; el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)"; }}
                  >
                    <img src={src} alt={`Parenting Quote ${i + 1}`} loading="lazy" style={{ width: "100%", height: "auto", display: "block" }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "videos" && (
            <div>
              <SectionHeading eyebrow="Watch & Learn" title="Parenting Video Teachings" subtitle="Powerful sessions from Sakshi Shree on raising children with love, wisdom, and values." />
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
              <SectionHeading eyebrow="Real Transformation" title="Testimonials ,  Stories of Change" subtitle="Real people sharing how Sakshi Shree's guidance transformed their families and relationships." />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "28px", marginTop: "40px" }}>
                {TESTIMONIALS.map((t, i) => (
                  <div key={i} style={{ background: "#FFFFFF", borderRadius: "20px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #E5E7EB", transition: "transform 0.25s, box-shadow 0.25s" }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-6px)"; el.style.boxShadow = "0 20px 50px rgba(212,175,55,0.12)"; }}
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
      <section style={{ background: "linear-gradient(135deg, #0D2137 0%, #1B3A5C 100%)", padding: "80px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div className="container-page" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, color: "#FFFFFF", marginBottom: "16px" }}>
            Raise{" "}
            <span style={{ background: "linear-gradient(90deg, #F59E0B, #D4AF37)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              Conscious Children
            </span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1.05rem", maxWidth: "540px", margin: "0 auto 36px", lineHeight: 1.75 }}>
            Connect with Sakshi Shree for personalised parenting guidance rooted in ancient wisdom and modern understanding.
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
