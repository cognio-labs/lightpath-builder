"use client";

﻿



const FACILITIES = [
  { icon: "🏠", title: "Fully Furnished Apartments", desc: "Premium furnished apartments with modern amenities for a comfortable spiritual stay." },
  { icon: "🎭", title: "Auditorium and Satsang Hall", desc: "Spacious halls for large gatherings, satsangs, and meditation programs." },
  { icon: "🌿", title: "Wellness and Fitness Centre", desc: "State-of-the-art wellness facilities for holistic physical and mental well-being." },
  { icon: "🍽️", title: "Multi-cuisine Restaurant", desc: "Sattvic and multi-cuisine dining options for nourishment of body and soul." },
  { icon: "⚡", title: "Power Backup and 24Hr Water", desc: "Uninterrupted power backup and round-the-clock water supply for your comfort." },
  { icon: "🛡️", title: "Round The Clock Security", desc: "24/7 security ensuring a safe and protected sanctuary for all members." },
];

const MEMBERSHIPS = [
  { level: "Founder Member", amount: "₹11,00,000", color: "#D4AF37", bg: "linear-gradient(135deg, #D4AF37, #B8860B)", text: "#1A0A00", privileges: ["1 Deluxe Apartment provided", "65 days stay per calendar year on priority", "Member of Working Committee"], popular: true },
  { level: "Co-Founder Member", amount: "₹5,00,000", color: "#60A5FA", bg: "linear-gradient(135deg, #3B82F6, #1D4ED8)", text: "#FFFFFF", privileges: ["Krishna Apartment provided", "45 days stay per calendar year", "Free lodging/boarding on priority basis"], popular: false },
  { level: "Diamond Member", amount: "₹2,00,000", color: "#A78BFA", bg: "linear-gradient(135deg, #7C3AED, #4C1D95)", text: "#FFFFFF", privileges: ["11 days stay per calendar year", "Member of Working Committee"], popular: false },
  { level: "Life Member", amount: "₹1,00,000", color: "#34D399", bg: "linear-gradient(135deg, #059669, #065F46)", text: "#FFFFFF", privileges: ["5-day residential stay in a year", "Receive personal guidance and blessings"], popular: false },
  { level: "Special Member", amount: "₹51,000", color: "#FB923C", bg: "linear-gradient(135deg, #EA580C, #9A3412)", text: "#FFFFFF", privileges: ["Receive personal guidance and blessings", "Free lodging and boarding in Shivirs"], popular: false },
];

const GALLERY = [
  "https://assets.cdn.filesafe.space/z3Nz1DGIjH8cQEHGGNs5/media/6931718de0f0925ecc8ae233.jpg",
  "https://assets.cdn.filesafe.space/z3Nz1DGIjH8cQEHGGNs5/media/693171dbe0f09249538aebc5.jpg",
  "https://assets.cdn.filesafe.space/z3Nz1DGIjH8cQEHGGNs5/media/693172390b0f9d727a8ba4b4.jpg",
  "https://assets.cdn.filesafe.space/z3Nz1DGIjH8cQEHGGNs5/media/693176d7f3fe2a69ab6e64fa.jpg",
];

export default function Page() {
  const H = "#0C1A3A"; const H2 = "#0F2147";
  const G = "#D4AF37"; const Gd = "rgba(212,175,55,0.12)"; const Gb = "rgba(212,175,55,0.25)";
  const T = "#1E293B"; const TL = "#64748B"; const W = "#FFFFFF";
  const BG = "#F0F4FF"; const BrB = "#C7D2FE";

  return (
    <div style={{ background: W, color: T, fontFamily: "'Inter', sans-serif" }}>

      {/* HERO */}
      <section style={{ background: `linear-gradient(135deg, ${H} 0%, ${H2} 60%, #132860 100%)`, paddingTop: "130px", paddingBottom: "80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-100px", right: "-80px", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(212,175,55,0.10) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "10%", fontSize: "10rem", opacity: 0.03, pointerEvents: "none", userSelect: "none" }}>🕌</div>
        <div className="container-page" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "56px", alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-block", background: Gd, border: `1px solid ${Gb}`, borderRadius: "100px", padding: "5px 16px", marginBottom: "16px" }}>
                <span style={{ color: G, fontSize: "10px", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>Spiritual Retreat & Wellness Center</span>
              </div>
              <p style={{ color: "rgba(212,175,55,0.8)", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.12em", marginBottom: "8px" }}>Sakshidham International Vrindavan</p>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4.5vw, 3.2rem)", fontWeight: 900, color: W, lineHeight: 1.15, marginBottom: "16px" }}>
                A Sacred Space for<br /><span style={{ color: G }}>Transformation</span>
              </h1>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "32px" }}>
                The Spiritual Retreat and Wellness Center, established to help you achieve personal guidance, grace, and blessings for a <strong style={{ color: G }}>stress-free, successful, and happy life.</strong>
              </p>
              <a href="#membership" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: `linear-gradient(135deg, ${G}, #B8860B)`, color: H, padding: "16px 38px", borderRadius: "100px", fontWeight: 800, fontSize: "1rem", textDecoration: "none", boxShadow: "0 8px 30px rgba(212,175,55,0.35)" }}>
                Explore Membership
              </a>
            </div>
            <div>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", inset: "-8px", background: "linear-gradient(135deg, rgba(212,175,55,0.2), rgba(59,130,246,0.15))", borderRadius: "28px", filter: "blur(14px)" }} />
                <img src="https://assets.cdn.filesafe.space/z3Nz1DGIjH8cQEHGGNs5/media/693168430b0f9d1b2d8a1231.jpg" alt="Sakshidham International" style={{ width: "100%", height: "auto", borderRadius: "24px", boxShadow: "0 24px 60px rgba(0,0,0,0.5)", position: "relative", zIndex: 1 }} />
              </div>
            </div>
          </div>

          {/* Guruji quote card */}
          <div style={{ marginTop: "56px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px", alignItems: "center", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "24px", padding: "36px" }}>
            <img src="https://assets.cdn.filesafe.space/z3Nz1DGIjH8cQEHGGNs5/media/68e1283030a9a9921940f4d6.png" alt="Sadguru Sakshi Shree Ji" style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", border: `3px solid ${G}`, margin: "0 auto", display: "block" }} />
            <div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: "rgba(255,255,255,0.85)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "10px" }}>
                "The institution provides definite scientific techniques and spiritual practices that will be offered to the members for sound enlightenment, and for the sincere members, it will serve as a center for spiritual upliftment and enlightenment."
              </p>
              <div style={{ color: G, fontWeight: 700, fontSize: "0.85rem" }}>,  Sadguru Sakshi Shree</div>
            </div>
          </div>
        </div>
      </section>

      {/* FACILITIES */}
      <section className="section-pad" style={{ background: BG }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <span style={{ fontSize: "11px", color: "#3B82F6", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>World-Class Amenities</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: T, marginTop: "6px" }}>World-Class Facilities for Holistic Living</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {FACILITIES.map((f, i) => (
              <div key={i} style={{ background: W, border: `1px solid ${BrB}`, borderRadius: "20px", padding: "28px 24px", transition: "transform 0.2s, box-shadow 0.2s" }}>
                <div style={{ fontSize: "2.4rem", marginBottom: "14px" }}>{f.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: T, marginBottom: "10px" }}>{f.title}</h3>
                <p style={{ color: TL, fontSize: "0.85rem", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP */}
      <section id="membership" className="section-pad" style={{ background: W }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <span style={{ fontSize: "11px", color: "#3B82F6", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>Become a Member</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: T, marginTop: "6px" }}>Spiritual Membership Details</h2>
            <p style={{ color: TL, marginTop: "10px", fontSize: "0.95rem" }}>*Terms and conditions apply for all facilities and privileges as specified in the official brochure.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
            {MEMBERSHIPS.map((m, i) => (
              <div key={i} style={{ borderRadius: "24px", overflow: "hidden", position: "relative", border: m.popular ? `2px solid ${G}` : "1px solid #E2E8F0", boxShadow: m.popular ? "0 12px 40px rgba(212,175,55,0.2)" : "0 4px 16px rgba(0,0,0,0.04)" }}>
                {m.popular && <div style={{ background: `linear-gradient(135deg, ${G}, #B8860B)`, color: "#1A0A00", textAlign: "center", padding: "6px", fontSize: "10px", fontWeight: 800, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>Most Prestigious</div>}
                <div style={{ background: m.bg, padding: "28px 24px" }}>
                  <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: "8px" }}>Membership Level</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 800, color: m.text === "#1A0A00" ? "#1A0A00" : W, marginBottom: "8px" }}>{m.level}</h3>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 900, color: m.text === "#1A0A00" ? "#1A0A00" : W }}>{m.amount}</div>
                </div>
                <div style={{ background: BG, padding: "24px" }}>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "10px", listStyle: "none", padding: 0, margin: "0 0 20px 0" }}>
                    {m.privileges.map((pr, j) => (
                      <li key={j} style={{ display: "flex", gap: "10px", fontSize: "0.825rem", color: T, alignItems: "flex-start" }}>
                        <span style={{ color: "#3B82F6", fontWeight: 800, flexShrink: 0 }}>✓</span> {pr}
                      </li>
                    ))}
                  </ul>
                  <a href="#donate" style={{ display: "block", textAlign: "center", background: m.bg, color: m.text === "#1A0A00" ? "#1A0A00" : W, padding: "12px", borderRadius: "100px", fontWeight: 800, fontSize: "0.9rem", textDecoration: "none" }}>
                    Contribute Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BANK DETAILS */}
      <section id="donate" className="section-pad" style={{ background: BG }}>
        <div className="container-page" style={{ maxWidth: "800px" }}>
          <div style={{ textAlign: "center", marginBottom: "44px" }}>
            <span style={{ fontSize: "11px", color: "#3B82F6", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>Tax Benefits Available</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: T, marginTop: "6px" }}>Support Our Mission</h2>
            <div style={{ marginTop: "16px", background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: "12px", padding: "16px 24px", display: "inline-block" }}>
              <p style={{ color: "#1D4ED8", fontSize: "0.875rem", fontWeight: 600, margin: 0 }}>
                TAX EXEMPTION: All Donations made in favour of "Siddhadatri Charitable Trust" are exempt from Income Tax u/s 80(G) of Income Tax Act 1961.
              </p>
            </div>
          </div>
          <div style={{ background: `linear-gradient(135deg, ${H}, ${H2})`, borderRadius: "24px", padding: "40px", color: W }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, color: G, marginBottom: "24px" }}>Bank Details for Contribution (NEFT/RTGS)</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
              {[
                { l: "Bank Name", v: "Bank of India" },
                { l: "Branch", v: "Harsoan, Ghaziabad" },
                { l: "A/c Name", v: "SIDDHADATRI CHARITABLE TRUST" },
                { l: "A/c Type", v: "Current" },
                { l: "A/c No.", v: "711120110000140" },
                { l: "IFSC Code", v: "BKID0007111" },
              ].map((b, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.07)", borderRadius: "12px", padding: "16px 20px" }}>
                  <div style={{ fontSize: "10px", fontWeight: 700, color: G, textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: "4px" }}>{b.l}</div>
                  <div style={{ fontWeight: 700, color: W, fontSize: "0.95rem" }}>{b.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section-pad" style={{ background: W }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "44px" }}>
            <span style={{ fontSize: "11px", color: "#3B82F6", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>The Sacred Space</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: T, marginTop: "6px" }}>Photo Gallery of Sakshidham</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
            {GALLERY.map((g, i) => (
              <div key={i} style={{ borderRadius: "20px", overflow: "hidden", boxShadow: "0 6px 24px rgba(0,0,0,0.08)", position: "relative" }}>
                <img src={g} alt={`Sakshidham Gallery ${i + 1}`} style={{ width: "100%", height: "220px", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(12,26,58,0.5), transparent)` }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
