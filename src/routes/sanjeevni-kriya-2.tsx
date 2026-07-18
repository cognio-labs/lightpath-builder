import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Star, Download, Sparkles, BookOpen, User, Briefcase, Heart, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/sanjeevni-kriya-2")({
  head: () => ({
    meta: [
      { title: "Sanjeevani Kriya | Science Divine Foundation" },
      { name: "description", content: "Revitalize Your Body and Spirit. Discover Sanjeevani Kriya's transformative power for holistic well-being, mind, and soul with Sakshi Shree." },
      { property: "og:title", content: "Sanjeevani Kriya by Sakshi Shree" },
      { property: "og:image", content: "https://sciencedivine.org/wp-content/uploads/2024/04/pexels-min-an-1234035-1-1.png" },
      { property: "og:url", content: "/sanjeevni-kriya-2" },
    ],
    links: [{ rel: "canonical", href: "/sanjeevni-kriya-2" }],
  }),
  component: Page,
});

const PILLARS = [
  {
    icon: "https://sciencedivine.org/wp-content/uploads/2024/03/651fc93c262ba8e696be1107_icon1-1.png",
    title: "Cultivates Inner Peace and Clarity",
    desc: "Experience profound tranquility and mental clarity through Immortality Meditation, finding deep inner peace and focus."
  },
  {
    icon: "https://sciencedivine.org/wp-content/uploads/2024/03/651fc89a25635db7a0e5309b_Frame-2-1.png",
    title: "Balances Energy Centers",
    desc: "Achieve harmony and balance in your body's energy centers, promoting overall physical health and subtle energy alignment."
  },
  {
    icon: "https://sciencedivine.org/wp-content/uploads/2024/03/651fc915c87a9d5daaa98adb_Icon-3-1.png",
    title: "Facilitates Self-Realization",
    desc: "Embark on a journey of self-discovery and spiritual growth with Immortality Meditation, connecting with your true divine nature."
  },
  {
    icon: "https://sciencedivine.org/wp-content/uploads/2024/03/651fc9f32693b049340e24ae_icon-4-1.png",
    title: "Awakens the Heart Chakra",
    desc: "Open your heart to boundless love, compassion, and sensitivity as Immortality Meditation activates the heart chakra."
  }
];

const AUDIENCE = [
  { role: "Aspiring Souls", icon: <Sparkles size={20} style={{ color: "#D4AF37" }} />, desc: "Ready to awaken the infinite potential stored in the physical layer." },
  { role: "Seekers", icon: <CompassIcon size={20} style={{ color: "#D4AF37" }} />, desc: "Searching for practical, direct spiritual experiences beyond dogmas." },
  { role: "Visionaries", icon: <User size={20} style={{ color: "#D4AF37" }} />, desc: "Desiring high clarity and focus to lead and transform their communities." },
  { role: "Dreamers", icon: <Heart size={20} style={{ color: "#D4AF37" }} />, desc: "Ready to align heart and brain wave patterns for ultimate creation." }
];

function CompassIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
  );
}

const MODULES = [
  {
    num: "1",
    img: "https://sciencedivine.org/wp-content/uploads/2024/03/1693895910-research-shows-one-1.png",
    title: "Manifest Your Reality",
    desc: "This part of the course likely delves into the power of manifestation, helping individuals understand how their thoughts, beliefs, and actions shape their reality. It includes techniques for setting clear intentions, visualization, and aligning one's mindset."
  },
  {
    num: "2",
    img: "https://sciencedivine.org/wp-content/uploads/2024/03/1693895906-research-shows-two-1-1.png",
    title: "Science of Thoughtfulness",
    desc: "This part could explore the psychology behind thought patterns and how they influence emotions, behaviors, and overall well-being. It may involve practices to cultivate positive thinking, mindfulness, and emotional intelligence."
  },
  {
    num: "3",
    img: "https://sciencedivine.org/wp-content/uploads/2024/03/1693895901-research-shows-three-1.png",
    title: "Secret of Blissful Living",
    desc: "This segment might focus on finding inner peace, happiness, and fulfillment. It could include teachings on gratitude, living in the present moment, and fostering a sense of contentment regardless of external circumstances."
  },
  {
    num: "4",
    img: "https://sciencedivine.org/wp-content/uploads/2024/03/1693895903-research-shows-four-1.png",
    title: "Art of Inner Cleansing",
    desc: "This part likely addresses the purification and healing of the mind, body, and spirit. Techniques for releasing negative energy, letting go of past traumas or limiting beliefs, and cultivating self-love and acceptance may be covered."
  }
];

const TESTIMONIALS = [
  { id: "QLmL230dApk", name: "Swaparna Testimonial" },
  { id: "EiFMTSo8Yws", name: "Helen Testimonial" },
  { id: "6bkJdkmAt20", name: "Pooja Pagaddinnimath Testimonial" },
  { id: "5KmsxqJXACM", name: "Patty Testimonial" },
];

const KEYWORDS = ["Meditation", "Yoga", "Mindfulness", "Spirituality", "Wellness", "Enlightenment"];

function Page() {
  return (
    <div style={{ background: "#FFFFFF", color: "#1E293B", fontFamily: "'Inter', sans-serif" }}>
      {/* Hero Section */}
      <section style={{ background: "linear-gradient(135deg, #042F2E 0%, #115E59 50%, #042F2E 100%)", paddingTop: "140px", paddingBottom: "80px", borderBottom: "1px solid #14B8A6", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(20,184,166,0.15) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div className="container-page" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px", alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(20,184,166,0.15)", border: "1px solid rgba(20,184,166,0.3)", borderRadius: "100px", padding: "6px 16px", marginBottom: "20px" }}>
                <Sparkles size={14} style={{ color: "#14B8A6" }} />
                <span style={{ color: "#14B8A6", fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>Sacred Kriya</span>
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.3rem, 4.5vw, 3.6rem)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.15, marginBottom: "16px" }}>
                Sanjeevani Kriya <br />
                <span style={{ background: "linear-gradient(90deg, #14B8A6, #D4AF37)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                  By Sakshi Shree
                </span>
              </h1>
              <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "480px" }}>
                Discover Sanjeevani Kriya's transformative power for holistic well-being, revitalizing body, mind, and spirit to achieve your utmost potential.
              </p>
              <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "24px" }}>
                <a href="https://sciencedivine.org/coming-soon-course/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg, #F59E0B, #D4AF37)", color: "#0F172A", padding: "16px 36px", borderRadius: "100px", fontWeight: 700, fontSize: "1rem", textDecoration: "none", boxShadow: "0 8px 30px rgba(212,175,55,0.3)" }}>
                  Start Course <ArrowRight size={16} />
                </a>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ display: "flex", gap: "2px" }}>
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={15} fill="#F59E0B" style={{ color: "#F59E0B" }} />)}
                </div>
                <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", fontWeight: 600 }}>Trusted By 10,000+ Students</span>
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", top: "-10px", left: "-10px", width: "100%", height: "100%", border: "2px solid #14B8A6", borderRadius: "24px", opacity: 0.15, pointerEvents: "none" }} />
              <img src="https://sciencedivine.org/wp-content/uploads/2024/04/pexels-min-an-1234035-1-1.png" alt="Sanjeevani Kriya" style={{ width: "100%", height: "auto", borderRadius: "24px", boxShadow: "0 20px 40px rgba(0,0,0,0.08)", display: "block" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Ticker */}
      <div style={{ background: "#14B8A6", color: "#FFFFFF", overflow: "hidden", padding: "12px 0", whiteSpace: "nowrap" }}>
        <div style={{ display: "inline-block", animation: "marquee 25s linear infinite" }}>
          {Array.from({ length: 4 }).flatMap(() => KEYWORDS).map((k, i) => (
            <span key={i} style={{ fontSize: "14px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 24px" }}>• {k}</span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-25%, 0, 0); }
        }
      `}</style>

      {/* Overview Block */}
      <section className="section-pad" style={{ background: "#FFFFFF" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 50px" }}>
            <span style={{ fontSize: "12px", color: "#14B8A6", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>Course Introduction</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#0F172A", marginTop: "8px", marginBottom: "16px" }}>What is Sanjeevani Kriya?</h2>
            <p style={{ color: "#475569", fontSize: "1.05rem", lineHeight: 1.7 }}>
              Embark on a transformative journey with Sanjeevani Kriya, finding inner calm, balance, and self-discovery for a fulfilling life and conscious living. This practice holds the key to a transformative journey towards love and divinity, helping realize one's true self.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "28px" }}>
            {PILLARS.map((p, i) => (
              <div key={i} style={{ background: "#FFFDF9", border: "1px solid #F1F5F9", borderRadius: "20px", padding: "32px", display: "flex", flexDirection: "column", gap: "16px", boxShadow: "0 4px 15px rgba(0,0,0,0.02)", transition: "transform 0.25s, box-shadow 0.25s" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-6px)"; el.style.boxShadow = "0 12px 30px rgba(20,184,166,0.12)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 4px 15px rgba(0,0,0,0.02)"; }}
              >
                <img src={p.icon} alt={p.title} style={{ width: "48px", height: "48px", objectFit: "contain" }} />
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", fontWeight: 700, color: "#0F172A" }}>{p.title}</h3>
                <p style={{ color: "#64748B", fontSize: "0.875rem", lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="section-pad" style={{ background: "#FAF9F6" }}>
        <div className="container-page">
          <SectionHeading center eyebrow="Designed For The Soul" title="Sanjeevani Kriya Program is For" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginTop: "40px" }}>
            {AUDIENCE.map((a, i) => (
              <div key={i} style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "24px", textAlign: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "100px", background: "rgba(20,184,166,0.1)", display: "flex", alignItems: "center", margin: "0 auto 16px", justifyContent: "center" }}>{a.icon}</div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0F172A", marginBottom: "8px" }}>{a.role}</h3>
                <p style={{ color: "#64748B", fontSize: "0.85rem", lineHeight: 1.5 }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Master Quote Block */}
      <section style={{ background: "#FFFFFF", padding: "100px 0" }}>
        <div className="container-page">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px", alignItems: "center" }}>
            <div style={{ textAlign: "center", background: "#FAF9F6", borderRadius: "24px", padding: "20px" }}>
              <img src="https://sciencedivine.org/wp-content/uploads/2025/01/dhyan-with-happy-face-copy-1-1-896x1024.webp" alt="Sakshi Shree Ji" style={{ width: "100%", maxWidth: "340px", height: "auto", mixBlendMode: "multiply", margin: "0 auto", display: "block" }} />
            </div>
            <div>
              <span style={{ fontSize: "12px", color: "#14B8A6", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>Words from the Master</span>
              <blockquote style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.65rem", fontStyle: "italic", fontWeight: 600, color: "#0F172A", lineHeight: 1.45, margin: "16px 0 24px 0", position: "relative" }}>
                “Staying motivated can be hard – sometimes. I made my life mission to give you that first push of motivation.”
              </blockquote>
              <h4 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#14B8A6" }}>— Sakshi Shree</h4>
              <p style={{ color: "#64748B", fontSize: "0.9rem", marginTop: "4px" }}>Enlightened Spiritual Master & Divine Messenger</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Structure */}
      <section className="section-pad" style={{ background: "#FAF9F6" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 50px" }}>
            <span style={{ fontSize: "12px", color: "#14B8A6", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>Curriculum</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#0F172A", marginTop: "8px", marginBottom: "16px" }}>Course Structure And Process</h2>
            <p style={{ color: "#64748B", fontSize: "1rem" }}>
              Embark on a transformative journey with Sanjeevani Kriya, unlocking self-discovery and empowerment.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "28px" }}>
            {MODULES.map((m, i) => (
              <div key={i} style={{ background: "#FFFFFF", borderRadius: "20px", overflow: "hidden", border: "1px solid #E2E8F0", boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}>
                <div style={{ position: "relative", paddingTop: "56.25%" }}>
                  <img src={m.img} alt={m.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: "12px", left: "12px", background: "#14B8A6", color: "#FFFFFF", width: "28px", height: "28px", borderRadius: "100px", display: "grid", placeItems: "center", fontWeight: 800, fontSize: "14px" }}>
                    {m.num}
                  </div>
                </div>
                <div style={{ padding: "24px" }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", fontWeight: 700, color: "#0F172A", marginBottom: "8px" }}>{m.title}</h3>
                  <p style={{ color: "#64748B", fontSize: "0.85rem", lineHeight: 1.6 }}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-pad" style={{ background: "#FFFFFF" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={{ fontSize: "12px", color: "#14B8A6", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>Success Stories</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "#0F172A", marginTop: "8px" }}>10000+ Lives Changed</h2>
            <p style={{ color: "#64748B", fontSize: "1rem", marginTop: "8px" }}>Over 10,000 lives have been positively changed by Sanjeevani Kriya.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "28px", marginTop: "40px" }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ background: "#FFFFFF", borderRadius: "20px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #E5E7EB", transition: "transform 0.25s, box-shadow 0.25s" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-6px)"; el.style.boxShadow = "0 20px 50px rgba(20,184,166,0.12)"; }}
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
            <a href="https://sciencedivine.org/latest-testimonials-videos/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg, #F59E0B, #D4AF37)", color: "#0F172A", padding: "14px 32px", borderRadius: "100px", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", boxShadow: "0 4px 20px rgba(212,175,55,0.3)" }}>
              Watch All Testimonials <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Enroll Widget */}
      <section style={{ background: "linear-gradient(135deg, #F0FDFA 0%, #FFFDF9 100%)", padding: "80px 0", borderTop: "1px solid #14B8A6", borderBottom: "1px solid #14B8A6" }}>
        <div className="container-page" style={{ maxWidth: "700px", textAlign: "center" }}>
          <span style={{ fontSize: "12px", color: "#14B8A6", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>Enroll Today</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#0F172A", marginTop: "8px", marginBottom: "16px" }}>TAKE CONTROL OF YOUR LIFE</h2>
          <div style={{ background: "#FFFFFF", border: "2px dashed #14B8A6", borderRadius: "24px", padding: "40px", boxShadow: "0 10px 30px rgba(20,184,166,0.06)" }}>
            <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#0F172A", marginBottom: "12px" }}>Sanjeevani Kriya Course</h3>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline", gap: "8px", marginBottom: "12px" }}>
              <span style={{ fontSize: "2rem", fontWeight: 900, color: "#0D9488" }}>₹999/-</span>
              <span style={{ textDecoration: "line-through", color: "#94A3B8", fontSize: "1.1rem" }}>₹5,100/-</span>
            </div>
            <p style={{ color: "#64748B", fontSize: "0.85rem", fontWeight: 600, marginBottom: "28px" }}>Lifetime Access + Dedicated Kriya Meditation Video Guides Included</p>
            <a href="https://sciencedivine.org/coming-soon-course/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "linear-gradient(135deg, #F59E0B, #D4AF37)", color: "#0F172A", padding: "16px 48px", borderRadius: "100px", fontWeight: 800, fontSize: "1rem", textDecoration: "none", boxShadow: "0 8px 25px rgba(212,175,55,0.3)" }}>
              BUY NOW
            </a>
          </div>
        </div>
      </section>

      {/* App Download widget */}
      <section style={{ background: "#0F172A", color: "#FFFFFF", padding: "80px 0" }}>
        <div className="container-page">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px", alignItems: "center" }}>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, marginBottom: "16px" }}>Download our app!</h2>
              <p style={{ color: "#94A3B8", fontSize: "1rem", lineHeight: 1.7, marginBottom: "32px" }}>
                Download our empowering app to embark on a transformative journey of self-discovery. Unlock the secrets of manifestation, thought science, blissful living, and inner cleansing.
              </p>
              <a href="https://play.google.com/store/apps/details?id=com.sakshishree.learners&pcampaignid=web_share" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block" }}>
                <img src="https://sciencedivine.org/wp-content/uploads/2024/03/Group-2611.png" alt="Download on Google Play" style={{ height: "48px", display: "block" }} />
              </a>
            </div>
            <div style={{ textAlign: "center" }}>
              <img src="https://sciencedivine.org/wp-content/uploads/2024/03/Group-2622.png" alt="Science Divine Mobile App Mockup" style={{ width: "100%", maxWidth: "360px", height: "auto", margin: "0 auto", display: "block" }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
function SectionHeading({ eyebrow, title, center }: { eyebrow: string; title: string; center?: boolean }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", marginBottom: "32px" }}>
      <span style={{ fontSize: "12px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>{eyebrow}</span>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#0F172A", marginTop: "8px" }}>{title}</h2>
    </div>
  );
}
