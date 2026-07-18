import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, GraduationCap, Brain, Sparkles, Users, BookOpen } from "lucide-react";

export const Route = createFileRoute("/shiksha-sewa")({
  head: () => ({
    meta: [
      { title: "Har Ghar Shiksha, Har Ghar Dhyan — Shiksha Sewa | Science Divine Foundation" },
      {
        name: "description",
        content:
          "Bringing education and meditation to the doorsteps of India and its forgotten children. Sponsor a child. Join the Movement.",
      },
      { property: "og:title", content: "Shiksha Sewa — Science Divine Foundation" },
      { property: "og:url", content: "/shiksha-sewa" },
    ],
    links: [{ rel: "canonical", href: "/shiksha-sewa" }],
  }),
  component: Page,
});

/* ─── Data ─── */
const ABOUT_CARDS = [
  {
    title: "What We Do",
    desc: "Transform lives through the power of meditation and education, creating a ripple effect of positive change.",
  },
  {
    title: "Why We Do It",
    desc: "We believe in the inherent potential of every human being to live a fulfilled, conscious life.",
  },
  {
    title: "How We Do It",
    desc: "Through a holistic approach combining traditional wisdom with modern teaching methodologies.",
  },
];

const PURPOSE_IMAGES = [
  {
    src: "https://sciencedivine.org/wp-content/uploads/2025/02/goal.png",
    title: "Our Goal",
    desc: "To create conscious individuals who live joyfully and meaningfully.",
  },
  {
    src: "https://sciencedivine.org/wp-content/uploads/2025/02/mission.png",
    title: "Our Vision",
    desc: "To provide quality education and meditation practices to those who need it most.",
  },
  {
    src: "https://sciencedivine.org/wp-content/uploads/2025/02/leadership.png",
    title: "Our Approach",
    desc: "Guided by the wisdom and vision of Sakshi Shree to create positive change.",
  },
];

const STATS = [
  { value: "50,000+", label: "Lives Changed Worldwide Through Meditation" },
  { value: "12,000+", label: "Students Educated — Empowering through quality education" },
  { value: "20+", label: "Years in Operation — Dedicated educational service" },
  { value: "45%", label: "Female Students Educated — Fostering gender-balanced education" },
];

const SOLUTIONS = [
  {
    img: "https://sciencedivine.org/wp-content/uploads/2025/09/sprit.png",
    title: "Spiritual Growth",
    desc: "Discover your inner divinity and connect with your true self through guided meditation practices.",
  },
  {
    img: "https://sciencedivine.org/wp-content/uploads/2025/01/Untitled-design-5.webp",
    title: "Mental Clarity",
    desc: "Achieve peace of mind and enhanced focus through regular meditation practice.",
  },
  {
    img: "https://sciencedivine.org/wp-content/uploads/2023/06/Screen-Shot-2023-05-07-at-9.16.25-PM.png",
    title: "Knowledge for All",
    desc: "Access spiritual wisdom and practical knowledge that transforms daily life.",
  },
];

const EVENTS = [
  { img: "https://sciencedivine.org/wp-content/uploads/2025/04/IMG_6954-1-scaled.webp", title: "Event 1", desc: "Transforming lives through meditation" },
  { img: "https://sciencedivine.org/wp-content/uploads/2025/04/IMG_1319-1-1-1-scaled.webp", title: "Event 2", desc: "Transforming lives through meditation" },
  { img: "https://sciencedivine.org/wp-content/uploads/2025/02/1-1.png", title: "Event 3", desc: "Transforming lives through meditation" },
  { img: "https://sciencedivine.org/wp-content/uploads/2025/02/4-1.png", title: "Event 4", desc: "Transforming lives through meditation" },
  { img: "https://sciencedivine.org/wp-content/uploads/2023/06/IMG_9938-copy.webp", title: "Event 5", desc: "Transforming lives through meditation" },
  { img: "https://sciencedivine.org/wp-content/uploads/2024/05/IMG_20240420_134241288-scaled.jpg", title: "Event 6", desc: "Transforming lives through meditation" },
];

const VOLUNTEERS = [
  { name: "Ranjana Sharma", role: "Volunteer", img: "https://sciencedivine.org/wp-content/uploads/2025/09/ranjana.jpg" },
  { name: "Archana Nirali", role: "Volunteer", img: "https://sciencedivine.org/wp-content/uploads/elementor/thumbs/archana-rch2fbwt9mgpew2j74mthaog953mpr0qr0affqqcjk.webp" },
];

const STORIES = [
  {
    quote: "Education is the key to achieving something bigger.",
    name: "Sneha Kumari",
    role: "Student",
    img: "https://sciencedivine.org/wp-content/uploads/2025/09/sneha.png",
    desc: "At just 12 years old, Sneha Kumari already knows her life's purpose. Supported by her mother, who works as a housemaid in the city, and her father, who provides for the family from their village, Sneha has developed remarkable skills in mehndi art while nurturing a bigger dream: becoming a teacher.",
  },
  {
    quote: "I want to show that no matter where you come from, you can achieve great things with hard work and passion.",
    name: "Khushi Rajput",
    role: "Student",
    img: "https://sciencedivine.org/wp-content/uploads/2025/09/khushi.png",
    desc: "Khushi Rajput, along with her three siblings, is raised by their father, a driver, and their mother, a homemaker. This talented young girl has already made her mark by winning first prize in the Sanskriti Art and Craft Competition.",
  },
  {
    quote: "When I'm on stage, I feel unstoppable. It's where I belong.",
    name: "Akhilesh",
    role: "Student",
    img: "https://sciencedivine.org/wp-content/uploads/2025/09/akhilesh.png",
    desc: "From overcoming stage fright to becoming his school's most accomplished speaker, Akhilesh's journey exemplifies the power of determination. His breakthrough moment came during an Independence Day celebration, where he delivered a compelling speech to an audience of over 500 people.",
  },
];

const TESTIMONIALS = [
  {
    name: "Piyush Pasbola",
    quote: "Growing up in Dehradun, I searched for spiritual truth in ashrams and books, but something essential was always missing. The day I met Guruji, that missing piece was revealed—not through words but through presence.",
    img: "https://sciencedivine.org/wp-content/uploads/2025/09/guruji.jpg",
  },
  {
    name: "Preeti Kimothi",
    quote: "After working in finance for years, I was looking for something meaningful. Thanks to my sister, I discovered Sakshi Shree and Gurudev's Sanjeevani Kriya. This meditation practice is remarkably easy to learn and quick to do, yet it offers deep benefits.",
    img: "https://sciencedivine.org/wp-content/uploads/2025/09/guruji.jpg",
  },
  {
    name: "Tulika Sharma",
    quote: "After practicing Sanjeevani Kriya taught by Gurudev, I experienced feelings that are difficult to put into words. I felt an incredible sense of calm and a profound connection with my inner self.",
    img: "https://sciencedivine.org/wp-content/uploads/2025/09/guruji-1.jpg",
  },
];

const LEADER_IMGS = [
  "https://sciencedivine.org/wp-content/uploads/2025/09/leader-1.jpg",
  "https://sciencedivine.org/wp-content/uploads/2025/09/leader-2.jpg",
  "https://sciencedivine.org/wp-content/uploads/2025/09/leader-4.jpg",
];

const MEDIA_IMGS = [
  "https://sciencedivine.org/wp-content/uploads/2025/09/media-1.jpg",
  "https://sciencedivine.org/wp-content/uploads/2025/09/media-2.jpg",
  "https://sciencedivine.org/wp-content/uploads/2025/09/guruji-1.jpg",
];

/* ─── Component ─── */
function Page() {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: "", number: "", email: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div style={{ background: "#FFFFFF", color: "#1E293B", fontFamily: "'Inter', sans-serif" }}>

      {/* ═══ HERO ═══ */}
      <section style={{ background: "linear-gradient(135deg, #0F172A 0%, #1A2744 60%, #0F172A 100%)", paddingTop: "140px", paddingBottom: "80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div className="container-page" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px", alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.25)", borderRadius: "100px", padding: "6px 16px", marginBottom: "16px" }}>
                <span style={{ fontSize: "10px", color: "#FCD34D", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Science Divine Foundation</span>
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.1, marginBottom: "16px" }}>
                Har Ghar Shiksha,<br />
                <span style={{ background: "linear-gradient(90deg, #F59E0B, #D4AF37)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Har Ghar Dhyan</span>
              </h1>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.05rem", lineHeight: 1.65, marginBottom: "16px" }}>
                Bringing education and meditation to the doorsteps of India and its forgotten children.
              </p>
              <blockquote style={{ borderLeft: "3px solid #D4AF37", paddingLeft: "16px", color: "rgba(255,255,255,0.7)", fontStyle: "italic", fontSize: "0.95rem", marginBottom: "32px", lineHeight: 1.65 }}>
                "Education without meditation is incomplete; meditation without purpose is unfulfilled. Together, they create the enlightened human of tomorrow." <br />
                <span style={{ color: "#D4AF37", fontStyle: "normal", fontWeight: 700 }}>– Sakshi Shree</span>
              </blockquote>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
                <a href="#donate" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg, #F59E0B, #D4AF37)", color: "#0F172A", padding: "14px 32px", borderRadius: "100px", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", boxShadow: "0 8px 25px rgba(212,175,55,0.3)" }}>
                  Sponsor a Child <ArrowRight size={16} />
                </a>
                <a href="#about" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", color: "#FFFFFF", padding: "14px 32px", borderRadius: "100px", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none" }}>
                  Join the Movement
                </a>
              </div>
            </div>
            <div>
              <img src="https://sciencedivine.org/wp-content/uploads/2025/09/guruji.webp" alt="Sakshi Shree" style={{ width: "100%", height: "auto", borderRadius: "24px", boxShadow: "0 20px 50px rgba(0,0,0,0.3)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ COMMITMENT ═══ */}
      <section style={{ background: "#FFFDF9", padding: "80px 0" }}>
        <div className="container-page">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px", alignItems: "center" }}>
            <div>
              <span style={{ fontSize: "12px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>Our Vision</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#0F172A", marginTop: "8px", marginBottom: "20px" }}>Sakshi Shree's Commitment</h2>
              <p style={{ color: "#475569", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "20px" }}>
                To create a new human being flourishing on earth, which is only possible through education and meditation.
              </p>
              <div style={{ background: "#FAF9F6", border: "1px solid #F1E9D2", borderRadius: "16px", padding: "20px" }}>
                <h4 style={{ fontWeight: 700, color: "#0F172A", marginBottom: "6px" }}>Spiritual Guidance</h4>
                <p style={{ color: "#64748B", fontSize: "0.875rem", lineHeight: 1.5 }}>Providing wisdom and practices for inner transformation</p>
              </div>
              <div style={{ background: "#FAF9F6", border: "1px solid #F1E9D2", borderRadius: "16px", padding: "20px", marginTop: "12px" }}>
                <h4 style={{ fontWeight: 700, color: "#0F172A", marginBottom: "6px" }}>Compassionate Service</h4>
                <p style={{ color: "#64748B", fontSize: "0.875rem", lineHeight: 1.5 }}>Leading with love and care for all beings</p>
              </div>
            </div>
            <div>
              <img src="https://sciencedivine.org/wp-content/uploads/2025/09/sakshi-shree.webp" alt="About Sakshi Shree" style={{ width: "100%", height: "auto", borderRadius: "24px", boxShadow: "0 10px 30px rgba(0,0,0,0.06)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ABOUT SECTION ═══ */}
      <section id="about" style={{ background: "#FFFFFF", padding: "80px 0" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 48px" }}>
            <span style={{ fontSize: "12px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>About Us</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "#0F172A", marginTop: "8px", marginBottom: "16px" }}>About Har Ghar Shiksha, Har Ghar Dhyan</h2>
            <p style={{ color: "#64748B", fontSize: "1rem", lineHeight: 1.7, fontWeight: 600 }}>Empowering Every Individual Through Education and Meditation.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px", alignItems: "center", marginBottom: "48px" }}>
            <div>
              <img src="https://sciencedivine.org/wp-content/uploads/2025/06/Har-Ghar-Shiksha.webp" alt="Har Ghar Shiksha" style={{ width: "100%", height: "auto", borderRadius: "24px", boxShadow: "0 10px 30px rgba(0,0,0,0.06)" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {ABOUT_CARDS.map((c, i) => (
                <div key={i} style={{ background: "#FAF9F6", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "20px 24px" }}>
                  <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: "#0F172A", marginBottom: "6px" }}>{c.title}</h4>
                  <p style={{ color: "#64748B", fontSize: "0.875rem", lineHeight: 1.6 }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ OUR PURPOSE ═══ */}
      <section style={{ background: "#FAF9F6", padding: "80px 0" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 40px" }}>
            <span style={{ fontSize: "12px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>Our Vision</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "#0F172A", marginTop: "8px" }}>Our Purpose</h2>
            <p style={{ color: "#64748B", marginTop: "12px", lineHeight: 1.7 }}>We awaken human potential through meditation and education. Our goal is to create conscious individuals who live joyfully and break cycles of poverty.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
            {PURPOSE_IMAGES.map((p, i) => (
              <div key={i} style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "20px", padding: "32px 20px", textAlign: "center" }}>
                <img src={p.src} alt={p.title} style={{ width: "60px", height: "60px", objectFit: "contain", margin: "0 auto 16px", display: "block" }} />
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", marginBottom: "8px" }}>{p.title}</h3>
                <p style={{ color: "#64748B", fontSize: "0.825rem", lineHeight: 1.5 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ IMPACT STATS ═══ */}
      <section style={{ background: "linear-gradient(135deg, #0F172A, #1A2744)", padding: "80px 0" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={{ fontSize: "12px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>Our Impact</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", fontWeight: 800, color: "#FFFFFF", marginTop: "8px" }}>
              Enriching Over <span style={{ color: "#F59E0B" }}>100,000 Lives</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.65)", marginTop: "4px" }}>With Meditation and Education</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "28px 16px", textAlign: "center" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 800, color: "#F59E0B" }}>{s.value}</div>
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.825rem", marginTop: "8px", lineHeight: 1.4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SOLUTIONS ═══ */}
      <section style={{ background: "#FFFFFF", padding: "80px 0" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 48px" }}>
            <span style={{ fontSize: "12px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>Our Solutions</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "#0F172A", marginTop: "8px" }}>We Solve Real Problems</h2>
            <p style={{ color: "#64748B", marginTop: "8px" }}>Transform Your Life</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "28px" }}>
            {SOLUTIONS.map((s, i) => (
              <div key={i} style={{ background: "#FAF9F6", border: "1px solid #E2E8F0", borderRadius: "20px", overflow: "hidden" }}>
                <div style={{ height: "200px", overflow: "hidden" }}>
                  <img src={s.img} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "24px" }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", fontWeight: 700, color: "#0F172A", marginBottom: "8px" }}>{s.title}</h3>
                  <p style={{ color: "#64748B", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "16px" }}>{s.desc}</p>
                  <a href="#about" style={{ color: "#B45309", fontWeight: 700, fontSize: "0.875rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    Learn More <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EVENTS ═══ */}
      <section style={{ background: "#FAF9F6", padding: "80px 0" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ fontSize: "12px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>Events & Activities</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "#0F172A", marginTop: "8px" }}>Our Events</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
            {EVENTS.map((ev, i) => (
              <div key={i} style={{ background: "#FFFFFF", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.03)", border: "1px solid #E2E8F0" }}>
                <img src={ev.img} alt={ev.title} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                <div style={{ padding: "16px" }}>
                  <div style={{ fontWeight: 800, color: "#0F172A", fontSize: "0.95rem" }}>{ev.title}</div>
                  <div style={{ color: "#64748B", fontSize: "0.8rem", marginTop: "4px" }}>{ev.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VOLUNTEERS ═══ */}
      <section style={{ background: "#FFFFFF", padding: "60px 0" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: "#0F172A" }}>Our Dedicated Volunteers</h2>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "32px", flexWrap: "wrap" }}>
            {VOLUNTEERS.map((v, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <img src={v.img} alt={v.name} style={{ width: "110px", height: "110px", borderRadius: "100px", objectFit: "cover", margin: "0 auto 10px", display: "block", border: "3px solid #D4AF37" }} />
                <div style={{ fontWeight: 700, color: "#0F172A" }}>{v.name}</div>
                <div style={{ fontSize: "0.75rem", color: "#64748B" }}>{v.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STUDENT STORIES ═══ */}
      <section style={{ background: "#FAF9F6", padding: "80px 0" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <span style={{ fontSize: "12px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>Success Stories</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "#0F172A", marginTop: "8px" }}>Stories of Transformation</h2>
            <p style={{ color: "#64748B", marginTop: "8px" }}>We're not just changing lives. We're building a new India — child by child, soul by soul.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "28px", marginTop: "40px" }}>
            {STORIES.map((s, i) => (
              <div key={i} style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "20px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
                <img src={s.img} alt={s.name} style={{ width: "100%", height: "220px", objectFit: "cover" }} />
                <div style={{ padding: "24px" }}>
                  <p style={{ fontStyle: "italic", color: "#B45309", fontWeight: 600, fontSize: "0.9rem", marginBottom: "12px" }}>"{s.quote}"</p>
                  <div style={{ fontWeight: 800, color: "#0F172A" }}>{s.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "#64748B", marginBottom: "12px" }}>{s.role}</div>
                  <p style={{ color: "#64748B", fontSize: "0.825rem", lineHeight: 1.55 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ LEADERS ═══ */}
      <section style={{ background: "#FFFFFF", padding: "80px 0" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ fontSize: "12px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>Recognition</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#0F172A", marginTop: "8px" }}>Recognized by Top Leaders & Media</h2>
            <p style={{ color: "#64748B", marginTop: "8px" }}>Our initiatives have received recognition and support from leaders across various sectors</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginBottom: "40px" }}>
            {LEADER_IMGS.map((img, i) => (
              <div key={i} style={{ borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}>
                <img src={img} alt={`Leader ${i + 1}`} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <span style={{ fontSize: "12px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>Media Coverage</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {MEDIA_IMGS.map((img, i) => (
              <div key={i} style={{ borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}>
                <img src={img} alt={`Media coverage ${i + 1}`} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DONATE CTA ═══ */}
      <section id="donate" style={{ background: "linear-gradient(135deg, #0F172A, #1A2744)", padding: "80px 0", textAlign: "center" }}>
        <div className="container-page" style={{ maxWidth: "700px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "16px" }}>Join the Divine Movement</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "32px" }}>
            Together, we can bring the light of education to every underprivileged child and the peace of meditation to every troubled mind.
          </p>
          <a href="https://pages.razorpay.com/pl_RdFnZzHa9b4WmZ/view" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg, #F59E0B, #D4AF37)", color: "#0F172A", padding: "16px 40px", borderRadius: "100px", fontWeight: 700, fontSize: "1rem", textDecoration: "none", boxShadow: "0 8px 30px rgba(212,175,55,0.3)" }}>
            Join Us Now <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section style={{ background: "#FAF9F6", padding: "80px 0" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={{ fontSize: "12px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>Testimonials</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "#0F172A", marginTop: "8px" }}>They Believe In Us</h2>
            <p style={{ color: "#64748B", marginTop: "8px" }}>Transformative Experiences</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "20px", padding: "28px", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <img src={t.img} alt={t.name} style={{ width: "44px", height: "44px", borderRadius: "100px", objectFit: "cover", flexShrink: 0 }} />
                  <div style={{ fontWeight: 700, color: "#B45309", fontSize: "0.85rem" }}>— {t.name}</div>
                </div>
                <p style={{ color: "#475569", fontSize: "0.875rem", lineHeight: 1.65, fontStyle: "italic" }}>"{t.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DONATE / CONTACT FORM ═══ */}
      <section style={{ background: "#FFFFFF", padding: "80px 0" }}>
        <div className="container-page" style={{ maxWidth: "800px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "48px" }}>
            <div>
              <span style={{ fontSize: "12px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>Make a Difference</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#0F172A", marginTop: "8px", marginBottom: "16px" }}>Donate to make a child's future brighter!</h2>
              <p style={{ color: "#64748B", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "24px" }}>
                Your contribution helps provide quality education and meditation training to underprivileged children.
              </p>
              <img src="https://sciencedivine.org/wp-content/uploads/2025/09/donation-956x1024.webp" alt="Donation" style={{ width: "100%", height: "auto", borderRadius: "20px" }} />
            </div>

            <div>
              <span style={{ fontSize: "12px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>Contact Us</span>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700, color: "#0F172A", marginTop: "8px", marginBottom: "24px" }}>Drop us a line and keep in touch</h3>

              {sent ? (
                <div style={{ background: "#F0FDF4", border: "1px solid #DCFCE7", borderRadius: "16px", padding: "32px", textAlign: "center" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "12px" }}>🙏</div>
                  <h4 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#0F172A" }}>Message Sent!</h4>
                  <p style={{ color: "#64748B", fontSize: "0.85rem", marginTop: "6px" }}>We'll be in touch soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {[
                    { key: "name", label: "Name", type: "text", placeholder: "Your Name" },
                    { key: "number", label: "Number", type: "tel", placeholder: "+91 99999 99999" },
                    { key: "email", label: "Email", type: "email", placeholder: "you@example.com" },
                  ].map((f) => (
                    <input key={f.key} required type={f.type} placeholder={f.placeholder} value={(formData as Record<string, string>)[f.key]} onChange={(e) => setFormData((p) => ({ ...p, [f.key]: e.target.value }))} style={{ background: "#FAF9F6", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "12px 16px", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" }} />
                  ))}
                  <textarea rows={4} placeholder="Message" value={formData.message} onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))} style={{ background: "#FAF9F6", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "12px 16px", fontSize: "0.9rem", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
                  <button type="submit" style={{ background: "linear-gradient(135deg, #F59E0B, #D4AF37)", color: "#0F172A", border: "none", borderRadius: "100px", padding: "14px", fontWeight: 800, fontSize: "0.95rem", cursor: "pointer" }}>
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
