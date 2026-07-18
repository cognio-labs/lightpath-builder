import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Heart, BookOpen, Brain, Users } from "lucide-react";

export const Route = createFileRoute("/har-ghar-shiksha")({
  head: () => ({
    meta: [
      { title: "Har Ghar Shiksha, Har Ghar Dhyan — Science Divine Foundation" },
      {
        name: "description",
        content:
          "Education and Meditation in Every Home. A massive movement for education and meditation. A commitment to the birth of a new humanity.",
      },
      { property: "og:title", content: "Har Ghar Shiksha, Har Ghar Dhyan" },
      {
        property: "og:image",
        content: "https://sciencedivine.org/wp-content/uploads/2025/02/mzlvjnkn-1-scaled.webp",
      },
      { property: "og:url", content: "/har-ghar-shiksha" },
    ],
    links: [{ rel: "canonical", href: "/har-ghar-shiksha" }],
  }),
  component: Page,
});

/* ─── Data ─── */
const STATS = [
  {
    icon: "https://sciencedivine.org/wp-content/uploads/2025/02/meditation-1.png",
    value: "50,000+",
    label: "Lives",
    desc: "Changed Worldwide Through Meditation",
  },
  {
    icon: "https://sciencedivine.org/wp-content/uploads/2025/02/countries.png",
    value: "12,000+",
    label: "Students Educated",
    desc: "Empowering 12,000+ students through quality education",
  },
  {
    icon: "https://sciencedivine.org/wp-content/uploads/2025/02/teamwork.png",
    value: "100,000+",
    label: "Lives Enriched",
    desc: "With Meditation and Education",
  },
  {
    icon: "https://sciencedivine.org/wp-content/uploads/2025/02/public-library.png",
    value: "20+",
    label: "Years in Operation",
    desc: "20+ years of dedicated educational service",
  },
  {
    icon: "https://sciencedivine.org/wp-content/uploads/2025/02/programmer.png",
    value: "45%",
    label: "Girls' Education",
    desc: "Fostering education, with 45% female students educated.",
  },
];

const PROBLEMS = [
  {
    icon: "https://sciencedivine.org/wp-content/uploads/2025/02/equanimity.png",
    title: "Spiritual Growth",
    desc: "Discover your inner divinity and connect with your true self through guided meditation practices.",
  },
  {
    icon: "https://sciencedivine.org/wp-content/uploads/2025/02/growth-mindset.png",
    title: "Mental Clarity",
    desc: "Achieve peace of mind and enhanced focus through regular meditation practice.",
  },
  {
    icon: "https://sciencedivine.org/wp-content/uploads/2025/02/graduation-cap.png",
    title: "Knowledge for All",
    desc: "Access spiritual wisdom and practical knowledge that transforms daily life.",
  },
];

const HOW_WE_WORK = [
  {
    num: "01",
    title: "Community Outreach",
    desc: "Dedicated volunteers, experienced in meditation practices, reach out to communities",
    img: "https://sciencedivine.org/wp-content/uploads/2025/02/participation-1.png",
  },
  {
    num: "02",
    title: "Educational Access",
    desc: "Free educational programs for underprivileged children and adults",
    img: "https://sciencedivine.org/wp-content/uploads/2025/02/online-education.png",
  },
  {
    num: "03",
    title: "Meditation For All",
    desc: "Complimentary meditation sessions designed for all age groups",
    img: "https://sciencedivine.org/wp-content/uploads/2025/02/yoga-pose.png",
  },
  {
    num: "04",
    title: "Creative Growth",
    desc: "Extracurricular activities that nurture creativity and life skills",
    img: "https://sciencedivine.org/wp-content/uploads/2025/02/self-improvement.png",
  },
];

const EVENTS_ROW1 = [
  "https://sciencedivine.org/wp-content/uploads/2025/02/2.webp",
  "https://sciencedivine.org/wp-content/uploads/2025/02/5.png",
  "https://sciencedivine.org/wp-content/uploads/2025/02/1.webp",
];
const EVENTS_ROW2 = [
  "https://sciencedivine.org/wp-content/uploads/2025/02/1-1.png",
  "https://sciencedivine.org/wp-content/uploads/2025/02/2.png",
  "https://sciencedivine.org/wp-content/uploads/2025/02/3-1.png",
];
const EVENTS_ROW3 = [
  "https://sciencedivine.org/wp-content/uploads/2025/02/4-1.png",
  "https://sciencedivine.org/wp-content/uploads/2025/02/3.webp",
  "https://sciencedivine.org/wp-content/uploads/2025/02/6.png",
];

const VOLUNTEERS = [
  {
    name: "Ranjana Sharma",
    role: "Volunteer",
    img: "https://sciencedivine.org/wp-content/uploads/2025/02/oreso8osvo2c0seqonq9.webp",
  },
  {
    name: "Archana Nirali",
    role: "Volunteer",
    img: "https://sciencedivine.org/wp-content/uploads/2025/02/hnxycgntcsjbttrxbo7q.webp",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Growing up in Dehradun, I searched for spiritual truth in ashrams and books, but something essential was always missing. The day I met Guruji, that missing piece was revealed—not through words but through presence. In meditation, I experienced unconditional divine love not as a concept but as a living reality within me.",
    name: "Piyush Pasbola",
    img: "https://sciencedivine.org/wp-content/uploads/2025/02/oreso8osvo2c0seqonq9.webp",
  },
  {
    quote:
      "After practicing Sanjeevani Kriya taught by Gurudev, I experienced feelings that are difficult to put into words. I felt an incredible sense of calm and a profound connection with my inner self. This beautiful practice has opened a doorway to deeper self-understanding. The peace I discovered within myself was truly transformative.",
    name: "Tulika Sharma",
    img: "https://sciencedivine.org/wp-content/uploads/2025/02/hnxycgntcsjbttrxbo7q.webp",
  },
  {
    quote:
      "After working in finance for years, I was looking for something meaningful. Thanks to my sister, I discovered Sakshi Shree and Gurudev's Sanjeevani Kriya. This meditation practice is remarkably easy to learn and quick to do, yet it offers deep benefits. I'm so thankful to Gurudev for this simple but life-changing practice.",
    name: "Preeti Kimothi",
    img: "https://sciencedivine.org/wp-content/uploads/2025/02/v2vc4kpupfnzyblbghdh.webp",
  },
];

const TICKER_ICONS = [
  "https://sciencedivine.org/wp-content/uploads/2025/02/goal.png",
  "https://sciencedivine.org/wp-content/uploads/2025/02/mission-accomplished.png",
  "https://sciencedivine.org/wp-content/uploads/2025/02/mountain.png",
  "https://sciencedivine.org/wp-content/uploads/2025/02/mission.png",
  "https://sciencedivine.org/wp-content/uploads/2025/02/leadership.png",
  "https://sciencedivine.org/wp-content/uploads/2025/02/financial-freedom.png",
];

/* ─── Component ─── */
function Page() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div style={{ background: "#FFFFFF", color: "#1E293B", fontFamily: "'Inter', sans-serif" }}>

      {/* ═══ HERO ═══ */}
      <section style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E3A2A 50%, #0F172A 100%)", paddingTop: "140px", paddingBottom: "80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-80px", left: "-80px", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

        <div className="container-page" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px", alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: "100px", padding: "6px 16px", marginBottom: "24px" }}>
                <Heart size={14} style={{ color: "#22C55E" }} />
                <span style={{ color: "#22C55E", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>A National Movement</span>
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.1, marginBottom: "16px" }}>
                Har Ghar Shiksha,<br />
                <span style={{ background: "linear-gradient(90deg, #22C55E, #4ADE80)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Har Ghar Dhyan</span>
              </h1>
              <p style={{ fontSize: "1.15rem", color: "rgba(255,255,255,0.85)", fontWeight: 600, marginBottom: "8px" }}>
                Education and Meditation in Every Home.
              </p>
              <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: "8px" }}>A massive movement for education and meditation.</p>
              <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: "36px" }}>A commitment to the birth of a new humanity.</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                <a href="#donate" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg, #22C55E, #16A34A)", color: "#FFFFFF", padding: "14px 32px", borderRadius: "100px", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", boxShadow: "0 8px 25px rgba(34,197,94,0.3)" }}>
                  Join the Movement <ArrowRight size={16} />
                </a>
                <a href="#about" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", color: "#FFFFFF", padding: "14px 32px", borderRadius: "100px", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none" }}>
                  Learn More
                </a>
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <img src="https://sciencedivine.org/wp-content/uploads/2025/02/mzlvjnkn-1-scaled.webp" alt="Movement Hero" style={{ width: "100%", height: "auto", borderRadius: "24px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ COMMITMENT ═══ */}
      <section style={{ background: "#FFFDF9", padding: "80px 0" }}>
        <div className="container-page">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px", alignItems: "center" }}>
            <div style={{ textAlign: "center", position: "relative" }}>
              <img src="https://sciencedivine.org/wp-content/uploads/2025/02/6.png" alt="Sakshi Shree commitment" style={{ width: "100%", maxWidth: "400px", height: "auto", margin: "0 auto", display: "block" }} />
            </div>
            <div>
              <span style={{ color: "#22C55E", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>Sakshi Shree's Commitment</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#0F172A", marginTop: "8px", marginBottom: "20px" }}>
                To create a new human being flourishing on earth, which is only possible through education and meditation.
              </h2>
              <p style={{ color: "#64748B", fontSize: "1rem", lineHeight: 1.7 }}>
                A visionary movement by Guru Sakshi Shree and the Science Divine Foundation, Har Ghar Shiksha, Har Ghar Dhyan brings together ancient wisdom and modern science to transform lives across communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ANIMATED ICON TICKER ═══ */}
      <div style={{ background: "#F0FDF4", padding: "28px 0", overflow: "hidden", borderTop: "1px solid #DCFCE7", borderBottom: "1px solid #DCFCE7" }}>
        <div style={{ display: "flex", gap: "48px", animation: "ticker 20s linear infinite", width: "max-content" }}>
          {[...TICKER_ICONS, ...TICKER_ICONS, ...TICKER_ICONS].map((src, i) => (
            <img key={i} src={src} alt="" style={{ width: "52px", height: "52px", objectFit: "contain", opacity: 0.7 }} />
          ))}
        </div>
        <style>{`@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-33.33%); } }`}</style>
      </div>

      {/* ═══ OUR PURPOSE ═══ */}
      <section id="about" style={{ background: "#FFFFFF", padding: "80px 0" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 48px" }}>
            <span style={{ color: "#22C55E", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>What</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "#0F172A", marginTop: "8px", marginBottom: "16px" }}>Our Purpose</h2>
            <p style={{ color: "#64748B", fontSize: "1rem", lineHeight: 1.7 }}>
              We awaken human potential through meditation and education. Our goal is to create conscious individuals who live joyfully and break cycles of poverty by providing inner transformation through Sanjeevani Kriya and quality education to underprivileged children.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section style={{ background: "linear-gradient(135deg, #0F172A, #1E3A2A)", padding: "80px 0" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={{ color: "#22C55E", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>Science Divine Foundation</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "#FFFFFF", marginTop: "8px" }}>Guiding Light in Meditation & Education</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "28px" }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", padding: "28px 20px", textAlign: "center" }}>
                <img src={s.icon} alt={s.label} style={{ width: "48px", height: "48px", objectFit: "contain", margin: "0 auto 12px", display: "block" }} />
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 800, color: "#22C55E" }}>{s.value}</div>
                <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#FFFFFF", marginTop: "4px" }}>{s.label}</div>
                <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", marginTop: "6px", lineHeight: 1.4 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SOLVE REAL PROBLEMS ═══ */}
      <section style={{ background: "#FFFFFF", padding: "80px 0" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 48px" }}>
            <span style={{ color: "#22C55E", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>We Solve Real Problems</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "#0F172A", marginTop: "8px" }}>Transform Your Life</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "28px" }}>
            {PROBLEMS.map((p, i) => (
              <div key={i} style={{ background: "#F0FDF4", border: "1px solid #DCFCE7", borderRadius: "20px", padding: "32px 24px", textAlign: "center" }}>
                <img src={p.icon} alt={p.title} style={{ width: "64px", height: "64px", objectFit: "contain", margin: "0 auto 16px", display: "block" }} />
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, color: "#0F172A", marginBottom: "10px" }}>{p.title}</h3>
                <p style={{ color: "#64748B", fontSize: "0.9rem", lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW WE WORK ═══ */}
      <section style={{ background: "#FAF9F6", padding: "80px 0" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 48px" }}>
            <span style={{ color: "#22C55E", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>How We Work</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
            {HOW_WE_WORK.map((step, i) => (
              <div key={i} style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "20px", padding: "32px 20px", textAlign: "center", position: "relative" }}>
                <div style={{ position: "absolute", top: "16px", left: "16px", fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 900, color: "rgba(34,197,94,0.1)" }}>{step.num}.</div>
                <img src={step.img} alt={step.title} style={{ width: "64px", height: "64px", objectFit: "contain", margin: "0 auto 16px", display: "block" }} />
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", marginBottom: "8px" }}>{step.title}</h3>
                <p style={{ color: "#64748B", fontSize: "0.825rem", lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EVENTS GALLERY ═══ */}
      <section style={{ background: "#FFFFFF", padding: "80px 0" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ color: "#22C55E", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>Our</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "#0F172A", marginTop: "4px" }}>Events</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", overflow: "hidden" }}>
            {[EVENTS_ROW1, EVENTS_ROW2, EVENTS_ROW3].map((row, ri) => (
              <div key={ri} style={{ display: "flex", gap: "16px", overflowX: "auto", paddingBottom: "8px" }}>
                {[...row, ...row].map((img, i) => (
                  <img key={i} src={img} alt={`Event ${ri}-${i}`} style={{ height: "180px", width: "auto", minWidth: "260px", objectFit: "cover", borderRadius: "16px", flexShrink: 0 }} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VOLUNTEERS ═══ */}
      <section style={{ background: "#F0FDF4", padding: "80px 0" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#0F172A" }}>Our Dedicated Volunteers</h2>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "32px", flexWrap: "wrap" }}>
            {VOLUNTEERS.map((v, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <img src={v.img} alt={v.name} style={{ width: "120px", height: "120px", borderRadius: "100px", objectFit: "cover", margin: "0 auto 12px", display: "block", border: "3px solid #22C55E" }} />
                <div style={{ fontWeight: 700, color: "#0F172A" }}>{v.name}</div>
                <div style={{ fontSize: "0.8rem", color: "#64748B" }}>{v.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ JOIN CTA ═══ */}
      <section style={{ background: "linear-gradient(135deg, #1E3A2A, #0F172A)", padding: "80px 0", textAlign: "center" }}>
        <div className="container-page" style={{ maxWidth: "700px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "16px" }}>Join the Divine Movement</h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "32px" }}>
            Together, we can bring the light of education to every underprivileged child and the peace of meditation to every troubled mind.
          </p>
          <a href="#donate" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg, #22C55E, #16A34A)", color: "#FFFFFF", padding: "16px 40px", borderRadius: "100px", fontWeight: 700, fontSize: "1rem", textDecoration: "none", boxShadow: "0 8px 30px rgba(34,197,94,0.3)" }}>
            Join Us Now <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section style={{ background: "#FFFFFF", padding: "80px 0" }}>
        <div className="container-page" style={{ maxWidth: "800px" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={{ color: "#22C55E", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>They Believe In Us</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "#0F172A", marginTop: "8px" }}>Transformative Experiences</h2>
          </div>

          <div style={{ background: "#F0FDF4", border: "1px solid #DCFCE7", borderRadius: "24px", padding: "40px", marginBottom: "24px" }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "#1E293B", lineHeight: 1.75, marginBottom: "24px", fontStyle: "italic" }}>
              "{TESTIMONIALS[activeTestimonial].quote}"
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <img src={TESTIMONIALS[activeTestimonial].img} alt={TESTIMONIALS[activeTestimonial].name} style={{ width: "48px", height: "48px", borderRadius: "100px", objectFit: "cover" }} />
              <div>
                <div style={{ fontWeight: 700, color: "#0F172A" }}>— {TESTIMONIALS[activeTestimonial].name}</div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} style={{ width: i === activeTestimonial ? "28px" : "8px", height: "8px", borderRadius: "100px", background: i === activeTestimonial ? "#22C55E" : "#CBD5E1", border: "none", cursor: "pointer", transition: "all 0.3s" }} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT / DONATE FORM ═══ */}
      <section id="donate" style={{ background: "#FAF9F6", padding: "80px 0" }}>
        <div className="container-page" style={{ maxWidth: "640px" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: "#0F172A", marginBottom: "8px" }}>Donate to make a child's future brighter!</h2>
            <p style={{ color: "#64748B", fontSize: "0.95rem" }}>Drop us a line and keep in touch</p>
          </div>

          {sent ? (
            <div style={{ background: "#F0FDF4", border: "1px solid #DCFCE7", borderRadius: "20px", padding: "40px", textAlign: "center" }}>
              <div style={{ fontSize: "2rem", marginBottom: "12px" }}>🌿</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, color: "#0F172A" }}>Thank you for reaching out!</h3>
              <p style={{ color: "#64748B", marginTop: "8px" }}>We will get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "24px", padding: "40px", display: "flex", flexDirection: "column", gap: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.02)" }}>
              {[
                { key: "name", label: "Name", placeholder: "Your Name", type: "text" },
                { key: "phone", label: "Phone Number", placeholder: "+91 99999 99999", type: "tel" },
                { key: "email", label: "Email", placeholder: "you@example.com", type: "email" },
              ].map((field) => (
                <div key={field.key}>
                  <label htmlFor={field.key} style={{ fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>{field.label}</label>
                  <input required id={field.key} type={field.type} placeholder={field.placeholder} value={(formData as Record<string, string>)[field.key]} onChange={(e) => setFormData((p) => ({ ...p, [field.key]: e.target.value }))} style={{ width: "100%", background: "#FAF9F6", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "12px 16px", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" }} />
                </div>
              ))}
              <div>
                <label htmlFor="message" style={{ fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Message</label>
                <textarea id="message" rows={4} placeholder="Your message..." value={formData.message} onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))} style={{ width: "100%", background: "#FAF9F6", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "12px 16px", fontSize: "0.9rem", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
              </div>
              <button type="submit" style={{ background: "linear-gradient(135deg, #22C55E, #16A34A)", color: "#FFFFFF", border: "none", borderRadius: "100px", padding: "14px 28px", fontWeight: 800, fontSize: "0.95rem", cursor: "pointer" }}>
                Send
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
