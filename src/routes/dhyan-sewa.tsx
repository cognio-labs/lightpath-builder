import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, ArrowRight, Brain, Heart, Info, MapPin } from "lucide-react";

export const Route = createFileRoute("/dhyan-sewa")({
  head: () => ({
    meta: [
      { title: "Dhyan & Gyan Sewa — Spreading the Light | Science Divine Foundation" },
      {
        name: "description",
        content:
          "Meditation is not an escape; it is a homecoming. Support the Dhyan Sewa mission of spreading inner peace.",
      },
      { property: "og:title", content: "Dhyan & Gyan Sewa — Science Divine Foundation" },
      { property: "og:url", content: "/dhyan-sewa" },
    ],
    links: [{ rel: "canonical", href: "/dhyan-sewa" }],
  }),
  component: Page,
});

const DONATIONS = [
  {
    amount: "₹500",
    title: "Seva Contributor",
    desc: "Supports the logistics for one seeker to attend a day-long shivir.",
    link: "https://rzp.io/rzp/gAfqVkYJ",
    badge: "Seeker Support",
  },
  {
    amount: "₹2,500",
    title: "Wisdom Sustainer",
    desc: "Helps publish and distribute 50 copies of insightful Gyan Sewa books.",
    link: "https://rzp.io/rzp/gqtqIKGC",
    badge: "Knowledge",
  },
  {
    amount: "₹5,000",
    title: "SHIVIR SPONSOR",
    desc: "Sponsor the space and resources needed for a full day of teaching and practice.",
    link: "https://rzp.io/rzp/d43om0wy",
    badge: "Most Impact",
    highlight: true,
  },
  {
    amount: "Custom",
    title: "Global Expansion",
    desc: "Supports the long-term establishment of new Dhyan centers worldwide.",
    link: "https://rzp.io/rzp/umjZDU0c",
    badge: "Global Growth",
  },
];

function Page() {
  return (
    <div style={{ background: "#FFFFFF", color: "#1E293B", fontFamily: "'Inter', sans-serif" }}>

      {/* Hero Header */}
      <section style={{ background: "linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #1E1B4B 100%)", paddingTop: "140px", paddingBottom: "80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div className="container-page" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: "100px", padding: "6px 16px", marginBottom: "20px" }}>
            <Brain size={14} style={{ color: "#D4AF37" }} />
            <span style={{ color: "#D4AF37", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Dhyan & Gyan Sewa</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 5vw, 3.8rem)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.15, marginBottom: "16px" }}>
            Dhyan Sewa
          </h1>
          <p style={{ fontSize: "1.25rem", color: "rgba(255,255,255,0.85)", fontWeight: 600, letterSpacing: "0.02em", maxWidth: "700px", margin: "0 auto" }}>
            Spreading the Light, Sharing the Wisdom
          </p>
        </div>
      </section>

      {/* Inner Peace Quote */}
      <section className="section-pad" style={{ background: "#FFFDF9" }}>
        <div className="container-page" style={{ maxWidth: "800px", textAlign: "center" }}>
          <span style={{ fontSize: "11px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Spreading the Light of Inner Peace</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: "#1E1B4B", lineHeight: 1.5, marginTop: "12px", marginBottom: "24px" }}>
            "In a world that never stops talking, Dhyan Sewa invites you to listen — not to the noise outside, but to the silence within."
          </h2>
          <blockquote style={{ color: "#475569", fontSize: "1.1rem", fontStyle: "italic", marginBottom: "16px" }}>
            "Meditation is not an escape; it is a homecoming."
          </blockquote>
          <p style={{ color: "#D4AF37", fontWeight: 700, fontSize: "0.95rem" }}>— Sadhguru Sakshi Shree</p>
        </div>
      </section>

      {/* Grid of description */}
      <section className="section-pad" style={{ background: "#FFFFFF" }}>
        <div className="container-page">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px", alignItems: "center" }}>
            <div>
              <img src="https://sciencedivine.org/wp-content/uploads/2024/05/aboutsakshishree.jpg" alt="Meditation camp" style={{ width: "100%", height: "auto", borderRadius: "24px", boxShadow: "0 15px 35px rgba(0,0,0,0.06)" }} />
            </div>
            <div>
              <div style={{ marginBottom: "32px" }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700, color: "#0F172A", marginBottom: "12px" }}>Where Stillness Becomes a Celebration</h3>
                <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.75 }}>
                  Through 1-day meditation workshops and 3-day shivirs held in spiritually charged locations like Haridwar, Rishikesh, and Vrindavan, Sadhguru Sakshi Shree gently awakens people to the forgotten art of being.
                </p>
              </div>

              <div style={{ marginBottom: "32px" }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700, color: "#0F172A", marginBottom: "12px" }}>The Transformative Power</h3>
                <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.75 }}>
                  In these gatherings, laughter replaces stress, tears turn into release, and silence becomes strength. It's not about renouncing life—it's about rediscovering it, deeply, consciously, joyfully.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700, color: "#0F172A", marginBottom: "12px" }}>Mission of Dhyan Sewa</h3>
                <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.75 }}>
                  The purpose is simple yet profound—to make meditation accessible, practical, and transformative for all. Every shivir is conducted as an act of compassion, ensuring no soul is denied the path to peace.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Banner 2 */}
      <section style={{ background: "linear-gradient(135deg, #1E1B4B, #312E81)", padding: "60px 0", textAlign: "center" }}>
        <div className="container-page" style={{ maxWidth: "700px" }}>
          <p style={{ color: "#E0E7FF", fontSize: "1.25rem", fontStyle: "italic", lineHeight: 1.6, marginBottom: "16px" }}>
            "From the outside, we look for peace. From the inside, we realize we are peace."
          </p>
          <p style={{ color: "#D4AF37", fontWeight: 700, fontSize: "0.95rem", letterSpacing: "0.05em" }}>— Sadhguru Sakshi Shree</p>
        </div>
      </section>

      {/* Donation Options */}
      <section className="section-pad" style={{ background: "#FFFFFF" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 48px" }}>
            <span style={{ fontSize: "11px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Support The Cause</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "#0F172A", marginTop: "4px" }}>Join the Mission of Awakening</h2>
            <p style={{ color: "#64748B", fontSize: "0.95rem", marginTop: "8px" }}>Be a part of this profound act of compassion. Your contribution directly fuels the expansion of both Dhyan and Gyan Sewa globally.</p>
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
      <section className="section-pad" style={{ background: "#FAF9F6", borderTop: "1px solid #E2E8F0" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700, color: "#0F172A" }}>Explore Other Science Divine Initiatives</h3>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {[
              { title: "Annapurna Sewa", desc: "Feeding Hearts, Nourishing Souls through sacred food offerings.", link: "/annapurna-sewa" },
              { title: "Shiksha Sewa", desc: "The core mission of illuminating minds through education and knowledge.", link: "/education-sewa" },
              { title: "Nirman Sewa", desc: "The Spiritual Retreat & Wellness Center, established to help you achieve personal guidance, grace, and blessings.", link: "/nirman-sewa" },
            ].map((init, i) => (
              <div key={i} style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
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
