import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Compass, Sparkles, ArrowRight, UtensilsCrossed } from "lucide-react";

export const Route = createFileRoute("/annapurna-sewa")({
  head: () => ({
    meta: [
      { title: "Annapurna Sewa — Feeding Hearts, Nourishing Souls | Science Divine Foundation" },
      {
        name: "description",
        content:
          "Food is not merely nourishment here; it is prasad — a sacred offering. Support the Annapurna Sewa mission of selfless service.",
      },
      { property: "og:title", content: "Annapurna Sewa — Science Divine Foundation" },
      { property: "og:url", content: "/annapurna-sewa" },
    ],
    links: [{ rel: "canonical", href: "/annapurna-sewa" }],
  }),
  component: Page,
});

const DONATIONS = [
  {
    amount: "₹500",
    title: "Meal Seva",
    desc: "Sponsor basic ingredients for a day of community meals.",
    link: "https://rzp.io/rzp/QQTFn4O",
    badge: "Essential Support",
  },
  {
    amount: "₹2,500",
    title: "Kitchen Sustainer",
    desc: "Contribute to the daily running costs of the Annapurna kitchen.",
    link: "https://rzp.io/rzp/JdLseB7w",
    badge: "Sustainer",
  },
  {
    amount: "₹5,000",
    title: "PRASAD SPONSOR",
    desc: "Sponsor all the food and resources for one full day of sacred offering.",
    link: "https://rzp.io/rzp/qoEmiF7M",
    badge: "Most Impact",
    highlight: true,
  },
  {
    amount: "Custom",
    title: "Divine Abundance",
    desc: "Support the long-term growth of Annapurna Sewa initiatives.",
    link: "https://rzp.io/rzp/1a0W5Y6",
    badge: "Growth Fund",
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
            <UtensilsCrossed size={14} style={{ color: "#D4AF37" }} />
            <span style={{ color: "#D4AF37", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Sacred Food Offering</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 5vw, 3.8rem)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.15, marginBottom: "16px" }}>
            Annapurna Sewa
          </h1>
          <p style={{ fontSize: "1.25rem", color: "rgba(255,255,255,0.85)", fontWeight: 600, letterSpacing: "0.02em", maxWidth: "700px", margin: "0 auto" }}>
            Feeding Hearts, Nourishing Souls
          </p>
        </div>
      </section>

      {/* The Sacred Offering Quote */}
      <section className="section-pad" style={{ background: "#FFFDF9" }}>
        <div className="container-page" style={{ maxWidth: "800px", textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: "20px" }}>🌾</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: "#1E1B4B", lineHeight: 1.5, marginBottom: "24px" }}>
            "Food is not merely nourishment here; it is <span style={{ color: "#D4AF37" }}>prasad</span> — a sacred offering. Each meal is served with folded hands, reminding us that in feeding another, we honor the Divine within them."
          </h2>
          <div style={{ width: "60px", height: "3px", background: "linear-gradient(90deg, #F59E0B, #D4AF37)", margin: "0 auto" }} />
        </div>
      </section>

      {/* Features layout */}
      <section className="section-pad" style={{ background: "#FFFFFF" }}>
        <div className="container-page">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px", alignItems: "center" }}>
            <div>
              <img src="https://sciencedivine.org/wp-content/uploads/2024/04/gospelforasia-RT18-03070.jpeg" alt="Annapurna kitchen" style={{ width: "100%", height: "auto", borderRadius: "24px", boxShadow: "0 15px 35px rgba(0,0,0,0.06)" }} />
            </div>
            <div>
              <div style={{ marginBottom: "32px" }}>
                <span style={{ fontSize: "11px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>The Act of Devotion</span>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700, color: "#0F172A", marginTop: "4px", marginBottom: "12px" }}>Cooked and Served with Love</h3>
                <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.75 }}>
                  Each day, volunteers of the Science Divine Foundation cook and serve meals infused with devotion. The air fills with the aroma of fresh food and the warmth of selfless service. This act is the bedrock of Annapurna Sewa.
                </p>
              </div>

              <div>
                <span style={{ fontSize: "11px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Welcome Without Distinction</span>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700, color: "#0F172A", marginTop: "4px", marginBottom: "12px" }}>Universal Compassion</h3>
                <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.75 }}>
                  From seekers attending meditation shivirs to villagers passing by, from elders to children — everyone is welcomed without question or distinction. The service is universal, reflecting unconditional compassion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <section style={{ background: "linear-gradient(135deg, #1E1B4B, #312E81)", padding: "60px 0", textAlign: "center" }}>
        <div className="container-page" style={{ maxWidth: "700px" }}>
          <p style={{ color: "#E0E7FF", fontSize: "1.25rem", fontStyle: "italic", lineHeight: 1.6, marginBottom: "16px" }}>
            "Serving food is serving the Divine in its most humble form."
          </p>
          <p style={{ color: "#D4AF37", fontWeight: 700, fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>— Sadhguru Sakshi Shree</p>
        </div>
      </section>

      {/* Impact & Foundation */}
      <section className="section-pad" style={{ background: "#FAF9F6" }}>
        <div className="container-page">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px", alignItems: "center" }}>
            <div>
              <span style={{ fontSize: "11px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Affirmation of Humanity</span>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", fontWeight: 700, color: "#0F172A", marginTop: "4px", marginBottom: "16px" }}>Impact, Dignity, and Soul Nourishment 💖</h3>
              <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "20px" }}>
                Through Annapurna Sewa, hunger is not just cured — hearts are nourished, dignity is restored, and humanity is reaffirmed. It is a transformation that begins with a simple meal and extends to the soul.
              </p>
              <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.75 }}>
                This initiative runs entirely on love, faith, and the contributions of generous souls who believe that no act of kindness is too small when done with pure intention. Your support ensures the continuous, selfless service of this sacred mission.
              </p>
            </div>
            <div>
              <img src="https://sciencedivine.org/wp-content/uploads/2024/04/IMG-20200818-WA0055.jpg" alt="Feeding community" style={{ width: "100%", height: "auto", borderRadius: "24px", boxShadow: "0 15px 35px rgba(0,0,0,0.06)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Donation Cards */}
      <section className="section-pad" style={{ background: "#FFFFFF" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 48px" }}>
            <span style={{ fontSize: "11px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Join the Mission</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "#0F172A", marginTop: "4px" }}>Mission of Selfless Service</h2>
            <p style={{ color: "#64748B", fontSize: "0.95rem", marginTop: "8px" }}>Be a part of this profound act of compassion. Your contribution directly ensures that food is served freely, lovingly, and abundantly.</p>
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
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700, color: "#0F172A" }}>More about Sakshi Shree & Science Divine Initiatives</h3>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {[
              { title: "Dhyan Sewa", desc: "The core mission of illuminating minds through education and knowledge.", link: "/dhyan-sewa" },
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
