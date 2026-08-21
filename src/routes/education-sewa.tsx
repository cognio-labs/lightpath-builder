import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, ArrowRight, GraduationCap, BookOpen, Heart, Award } from "lucide-react";
import { RAZORPAY_DONATION_LINK } from "@/lib/payment-links";

export const Route = createFileRoute("/education-sewa")({
  head: () => ({
    meta: [
      { title: "Shiksha Sewa ,  Illuminating Young Minds | Science Divine Foundation" },
      {
        name: "description",
        content:
          "Guided by Guru Sakshi Shree, Shiksha Seva reaches forgotten children, making every classroom a temple of learning.",
      },
      { property: "og:title", content: "Shiksha Sewa ,  Science Divine Foundation" },
      { property: "og:url", content: "/education-sewa" },
    ],
    links: [{ rel: "canonical", href: "/education-sewa" }],
  }),
  component: Page,
});

const METRICS = [
  {
    icon: "🌱",
    value: "1,000+",
    label: "Children Empowered",
    desc: "Across rural and urban communities with essential education.",
  },
  {
    icon: "📚",
    value: "Distribution",
    label: "Books & School Kits",
    desc: "Annual distribution of essential materials, a symbol of light and opportunity.",
  },
  {
    icon: "🎓",
    value: "Scholarships",
    label: "Higher Learning",
    desc: "Opening doors to advanced education for talented young minds.",
  },
  {
    icon: "🕉️",
    value: "Value-Based",
    label: "Education",
    desc: "Cultivating strong character and self-belief, rooted in Indian wisdom.",
  },
];

const PATHS = [
  {
    num: "1.",
    title: "Free & Subsidized Schooling",
    desc: "For children whose dreams deserve no price tag, education that uplifts, enlightens, and empowers.",
  },
  {
    num: "2.",
    title: "After-School Enrichment",
    desc: "Art, music, science, and play blend together, nurturing creativity and curiosity for balanced growth.",
  },
  {
    num: "3.",
    title: "Vocational & Career Guidance",
    desc: "Practical skills training and mentorship prepare youth to walk confidently into the world.",
  },
  {
    num: "4.",
    title: "Life-Skills & Meditation Programs",
    desc: "Grounded in the wisdom of Sadguru Sakshi Shree, these sessions develop emotional strength, focus, and self-mastery.",
  },
];

const DONATIONS = [
  {
    amount: "₹500",
    title: "Book Sponsor",
    desc: "Sponsor annual supplies for one child (books and stationary).",
    link: RAZORPAY_DONATION_LINK,
    badge: "Basic Kit",
  },
  {
    amount: "₹2,500",
    title: "Uniform Sponsor",
    desc: "Provides a full school kit including uniform, shoes, and bag for one student.",
    link: RAZORPAY_DONATION_LINK,
    badge: "Full Kit",
  },
  {
    amount: "₹5,000",
    title: "EDUCATION SPONSOR",
    desc: "Sponsors the entire tuition and resources for one child for a whole year.",
    link: RAZORPAY_DONATION_LINK,
    badge: "Most Impact",
    highlight: true,
  },
  {
    amount: "Custom",
    title: "Scholarship Fund",
    desc: "Contributes to the higher education scholarship fund for deserving students.",
    link: RAZORPAY_DONATION_LINK,
    badge: "Future Leader",
  },
];

const GALLERY = [
  { src: "https://assets.cdn.filesafe.space/z3Nz1DGIjH8cQEHGGNs5/media/68ffb5b543e05d1a60e480d9.png", label: "Children studying in a classroom" },
  { src: "https://assets.cdn.filesafe.space/z3Nz1DGIjH8cQEHGGNs5/media/692a9033313bfdf888edafd3.jpg", label: "Distribution of books and uniforms" },
  { src: "https://assets.cdn.filesafe.space/z3Nz1DGIjH8cQEHGGNs5/media/690477eca3a7bb422164d734.webp", label: "Classroom activities" },
  { src: "https://assets.cdn.filesafe.space/z3Nz1DGIjH8cQEHGGNs5/media/692a90332b865e7c71a36db9.jpg", label: "Youth practicing meditation" }
];

function Page() {
  return (
    <div style={{ background: "#FFFFFF", color: "#1E293B", fontFamily: "'Inter', sans-serif" }}>
      {/* Hero Header */}
      <section style={{ background: "linear-gradient(135deg, #0F172A 0%, #1A2744 60%, #0F172A 100%)", paddingTop: "140px", paddingBottom: "80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div className="container-page" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: "100px", padding: "6px 16px", marginBottom: "20px" }}>
            <GraduationCap size={14} style={{ color: "#D4AF37" }} />
            <span style={{ color: "#D4AF37", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Project Shiksha Sewa</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 5vw, 3.8rem)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.15, marginBottom: "16px" }}>
            Shiksha Sewa
          </h1>
          <p style={{ fontSize: "1.25rem", color: "rgba(255,255,255,0.85)", fontWeight: 600, letterSpacing: "0.02em", maxWidth: "700px", margin: "0 auto" }}>
            Illuminating Young Minds
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="section-pad" style={{ background: "#FFFDF9" }}>
        <div className="container-page" style={{ maxWidth: "850px", textAlign: "center" }}>
          <span style={{ fontSize: "11px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Our Mission</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#0F172A", marginTop: "8px", marginBottom: "24px" }}>
            Education as Enlightenment 📖
          </h2>
          <p style={{ color: "#475569", fontSize: "1.1rem", lineHeight: 1.8, fontStyle: "italic" }}>
            "Guided by the compassionate teachings of <span style={{ color: "#B45309", fontWeight: 700 }}>Guru Sakshi Shree</span>, <span style={{ fontWeight: 700 }}>Shiksha Seva</span> reaches the hearts of children who have long been forgotten by fortune, making every classroom a <span style={{ color: "#B45309", fontWeight: 700 }}>temple of learning</span>, every lesson a <span style={{ color: "#B45309", fontWeight: 700 }}>path toward self-realization</span>."
          </p>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="section-pad" style={{ background: "#FFFFFF", borderTop: "1px solid #F1F5F9" }}>
        <div className="container-page">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "28px" }}>
            {METRICS.map((m, i) => (
              <div key={i} style={{ background: "#FAF9F6", border: "1px solid #E2E8F0", borderRadius: "20px", padding: "28px 20px", textAlign: "center" }}>
                <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{m.icon}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 800, color: "#B45309" }}>{m.value}</div>
                <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#0F172A", marginTop: "4px" }}>{m.label}</div>
                <p style={{ color: "#64748B", fontSize: "0.8rem", marginTop: "8px", lineHeight: 1.45 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Illuminate */}
      <section className="section-pad" style={{ background: "#FAF9F6" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 48px" }}>
            <span style={{ fontSize: "11px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Methodology</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "#0F172A", marginTop: "4px" }}>How We Illuminate the Path 💡</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "28px" }}>
            {PATHS.map((p, i) => (
              <div key={i} style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "20px", padding: "32px 24px", position: "relative" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 900, color: "rgba(180,83,9,0.1)", marginBottom: "8px" }}>{p.num}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: "#0F172A", marginBottom: "8px" }}>{p.title}</h3>
                <p style={{ color: "#64748B", fontSize: "0.85rem", lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voices of Transformation & Gallery */}
      <section className="section-pad" style={{ background: "#FFFFFF" }}>
        <div className="container-page">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px", alignItems: "center" }}>
            <div>
              <span style={{ fontSize: "11px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Voices of Transformation ⭐</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#0F172A", marginTop: "8px", marginBottom: "24px" }}>Seeker Stories</h2>
              <blockquote style={{ borderLeft: "4px solid #D4AF37", paddingLeft: "20px", color: "#475569", fontStyle: "italic", fontSize: "1.1rem", lineHeight: 1.7, marginBottom: "20px" }}>
                "Before Shiksha Seva, my path was dark. Today, I carry the lamp of learning, and I dream to become a teacher who lights the way for others."
              </blockquote>
              <div style={{ fontWeight: 800, color: "#0F172A" }}>,  Pooja, Age 14</div>
            </div>
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {GALLERY.map((img, i) => (
                  <div key={i} style={{ borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}>
                    <img src={img.src} alt={img.label} style={{ width: "100%", height: "130px", objectFit: "cover" }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Grid */}
      <section id="donate" className="section-pad" style={{ background: "#FAF9F6", borderTop: "1px solid #E2E8F0" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 48px" }}>
            <span style={{ fontSize: "11px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Support Us</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "#0F172A", marginTop: "4px" }}>Join the Journey of Light</h2>
            <p style={{ color: "#64748B", fontSize: "0.95rem", marginTop: "8px" }}>Be the sunrise for a child’s future. Your support helps Guru Sakshi Shree’s vision of universal education shine across every home and heart.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "28px" }}>
            {DONATIONS.map((d, i) => (
              <div key={i} style={{ background: d.highlight ? "#FFFDF9" : "#FFFFFF", border: d.highlight ? "2px solid #D4AF37" : "1px solid #E2E8F0", borderRadius: "20px", padding: "32px 24px", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 8px 24px rgba(0,0,0,0.02)", position: "relative" }}>
                <div>
                  <span style={{ position: "absolute", top: "16px", right: "16px", background: d.highlight ? "#D4AF37" : "#F1F5F9", color: d.highlight ? "#0F172A" : "#64748B", fontSize: "10px", fontWeight: 800, padding: "4px 10px", borderRadius: "100px", textTransform: "uppercase" }}>{d.badge}</span>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 900, color: "#B45309", marginBottom: "6px", marginTop: "12px" }}>{d.amount}</div>
                  <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: "#0F172A", marginBottom: "8px" }}>{d.title}</h4>
                  <p style={{ color: "#64748B", fontSize: "0.825rem", lineHeight: 1.5, marginBottom: "24px" }}>{d.desc}</p>
                </div>
                <a href={d.link} target="_blank" rel="noopener noreferrer" style={{ display: "block", textAlign: "center", background: d.highlight ? "linear-gradient(135deg, #F59E0B, #D4AF37)" : "#FAF9F6", border: d.highlight ? "none" : "1px solid #D2D6DC", color: d.highlight ? "#0F172A" : "#0F172A", padding: "12px", borderRadius: "100px", fontWeight: 800, fontSize: "0.85rem", textDecoration: "none", boxShadow: d.highlight ? "0 4px 15px rgba(212,175,55,0.2)" : "none" }}>
                  Donate {d.amount}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Other Initiatives */}
      <section className="section-pad" style={{ background: "#FFFFFF", borderTop: "1px solid #E2E8F0" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700, color: "#0F172A" }}>Explore Other Science Divine Initiatives</h3>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {[
              { title: "Annapurna Sewa", desc: "Feeding Hearts, Nourishing Souls through sacred food offerings.", link: "/annapurna-sewa" },
              { title: "Dhyan Sewa", desc: "Empowering lives through knowledge, health, and holistic well-being.", link: "/dhyan-sewa" },
              { title: "Nirman Sewa", desc: "The Spiritual Retreat & Wellness Center, established to help you achieve personal guidance, grace, and blessings.", link: "/nirman-sewa" },
            ].map((init, i) => (
              <div key={i} style={{ background: "#FAF9F6", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: "#0F172A", marginBottom: "8px" }}>{init.title}</h4>
                  <p style={{ color: "#64748B", fontSize: "0.85rem", lineHeight: 1.5, marginBottom: "16px" }}>{init.desc}</p>
                </div>
                <Link to={init.link} style={{ color: "#B45309", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  Explore Initiative <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
