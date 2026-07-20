import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, Clock, MapPin, Gift, Star, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/birthday-event")({
  head: () => ({
    meta: [
      { title: "Shiksha Sewa Mahotsav - Guruji Birthday Celebration | Science Divine Foundation" },
      { name: "description", content: "Celebrating Sakshi Shree Guruji's Birthday with a special Meditation, Pravachan and Blessings program on 14th December 2025. Entry is free - registration mandatory." },
      { property: "og:title", content: "Shiksha Sewa Mahotsav - Birthday Blessings Event" },
    ],
    links: [{ rel: "canonical", href: "/birthday-event" }],
  }),
  component: Page,
});

const AGENDA = [
  { time: "10:00 AM - 10:30 AM", title: "Arrival & Welcome", desc: "Seating, introduction, and opening musical invocation to set a peaceful tone.", icon: "🙏" },
  { time: "10:30 AM - 11:30 AM", title: "Guided Meditation", desc: "Experiencing 'The Silence That Speaks' – a powerful hour of guided inner transformation.", icon: "🧘" },
  { time: "11:30 AM - 12:30 PM", title: "Divine Pravachan", desc: "Guruji's discourse on selfless service, education, and inner peace (Shiksha Sewa).", icon: "📿" },
  { time: "12:30 PM - 01:00 PM", title: "Birthday Blessings", desc: "A special opportunity for individual and collective blessings from Sakshi Shree Guruji.", icon: "✨" },
  { time: "01:00 PM onwards", title: "Mahaprasad & Conclusion", desc: "Distribution of blessed food (Prasad) and departure.", icon: "🌸" },
];

const GALLERY = [
  "https://sciencedivine.org/wp-content/uploads/2025/12/image-4.jpg",
  "https://sciencedivine.org/wp-content/uploads/2025/12/image-3.jpg",
  "https://sciencedivine.org/wp-content/uploads/2025/12/image-2.jpg",
  "https://sciencedivine.org/wp-content/uploads/2025/12/image-1.jpg",
];

function Page() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [sent, setSent] = useState(false);
  function handleReg(e: React.FormEvent) { e.preventDefault(); setSent(true); }

  const HF = "#2D0A1E"; const HT = "#4A0E2A";
  const G = "#D4AF37"; const Gd = "rgba(212,175,55,0.14)"; const Gb = "rgba(212,175,55,0.28)";
  const T = "#1E0A14"; const TL = "#64748B"; const W = "#FFFFFF";
  const BG = "#FDF5F8"; const BrP = "#F3D9E3"; const BrG = "#E8C9D4";

  return (
    <div style={{ background: W, color: T, fontFamily: "'Inter', sans-serif" }}>

      {/* HERO */}
      <section style={{ background: `linear-gradient(135deg, ${HF} 0%, ${HT} 50%, #3D1228 100%)`, paddingTop: "130px", paddingBottom: "80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-100px", right: "-80px", width: "480px", height: "480px", background: "radial-gradient(circle, rgba(212,175,55,0.13) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "5%", fontSize: "8rem", opacity: 0.04, pointerEvents: "none", userSelect: "none" }}>🎂</div>
        <div className="container-page" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "56px", alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: Gd, border: `1px solid ${Gb}`, borderRadius: "100px", padding: "6px 18px", marginBottom: "16px" }}>
                <Star size={14} style={{ color: G, fill: G }} />
                <span style={{ color: G, fontSize: "11px", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.07em" }}>Special Celebration Event</span>
              </div>
              <p style={{ color: "rgba(212,175,55,0.85)", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: "10px" }}>Experience the Silence That Speaks</p>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.4rem)", fontWeight: 900, color: W, lineHeight: 1.12, marginBottom: "12px" }}>
                Celebrating Sakshi Shree<br />
                <span style={{ color: G }}>Guruji's Birthday</span>
              </h1>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.1rem, 3vw, 1.6rem)", fontWeight: 600, color: "rgba(255,255,255,0.75)", marginBottom: "10px" }}>Shiksha Sewa Mahotsav</h2>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "28px" }}>A special Meditation, Pravachan and Blessings program</p>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", color: "rgba(255,255,255,0.75)", fontSize: "0.875rem", marginBottom: "32px" }}>
                <div style={{ display: "flex", gap: "10px" }}><Calendar size={15} style={{ color: G, flexShrink: 0, marginTop: "1px" }} /><span>14th December, 2025 at 10:00 AM</span></div>
                <div style={{ display: "flex", gap: "10px" }}><MapPin size={15} style={{ color: G, flexShrink: 0, marginTop: "1px" }} /><span>Siddha Sudarshan Sakshi Dham 9, Avanthika Rd, Chiranjiv Vihar, Shastri Nagar, Ghaziabad, UP 201002</span></div>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}><Gift size={15} style={{ color: G, flexShrink: 0 }} /><span style={{ color: "#4ADE80", fontWeight: 700 }}>FREE Entry (Registration Mandatory)</span></div>
              </div>

              <a href="#register" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: `linear-gradient(135deg, ${G}, #B8860B)`, color: HF, padding: "16px 38px", borderRadius: "100px", fontWeight: 800, fontSize: "1rem", textDecoration: "none", boxShadow: `0 8px 30px rgba(212,175,55,0.35)` }}>
                <Gift size={16} />
                Book Your Seat Before It's Gone!
              </a>
            </div>

            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", inset: "-10px", background: `linear-gradient(135deg, ${Gd}, rgba(212,175,55,0.08))`, borderRadius: "30px", filter: "blur(14px)" }} />
              <img
                src="https://sciencedivine.org/wp-content/uploads/2025/03/Untitled-design-2-1.webp"
                alt="Shiksha Sewa Mahotsav"
                style={{ width: "100%", height: "auto", borderRadius: "24px", boxShadow: "0 24px 60px rgba(0,0,0,0.4)", position: "relative", zIndex: 1 }}
              />
              {/* Gold badge */}
              <div style={{ position: "absolute", top: "20px", right: "-16px", background: `linear-gradient(135deg, ${G}, #B8860B)`, borderRadius: "16px", padding: "14px 18px", boxShadow: "0 8px 24px rgba(212,175,55,0.4)", zIndex: 2, textAlign: "center" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 800, color: HF }}>14 Dec</div>
                <div style={{ fontSize: "10px", fontWeight: 700, color: HF, opacity: 0.8 }}>2025</div>
              </div>
            </div>
          </div>

          {/* Guruji quote */}
          <div style={{ marginTop: "56px", background: "rgba(212,175,55,0.08)", border: `1px solid ${Gb}`, borderRadius: "20px", padding: "32px 40px", maxWidth: "720px" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", fontStyle: "italic", color: "rgba(255,255,255,0.85)", lineHeight: 1.7, marginBottom: "12px" }}>
              "The deepest joy lies not in what you receive, but in the peace you discover when you choose to give."
            </div>
            <div style={{ color: G, fontSize: "0.8rem", fontWeight: 700 }}>,  A Message from Guruji</div>
          </div>
        </div>
      </section>

      {/* AGENDA */}
      <section className="section-pad" style={{ background: BG }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <span style={{ fontSize: "11px", color: G, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>Programme Schedule</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: T, marginTop: "6px" }}>The Day's Agenda</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {AGENDA.map((ag, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "56px 1fr", gap: "24px", paddingBottom: "36px", position: "relative" }}>
                {/* Timeline connector */}
                {i < AGENDA.length - 1 && <div style={{ position: "absolute", left: "27px", top: "56px", bottom: 0, width: "2px", background: `linear-gradient(to bottom, ${G}, rgba(212,175,55,0.1))` }} />}
                {/* Step number */}
                <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: `linear-gradient(135deg, ${G}, #B8860B)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 16px rgba(212,175,55,0.3)", fontSize: "1.3rem" }}>
                  {ag.icon}
                </div>
                <div style={{ background: W, border: `1px solid ${BrG}`, borderRadius: "20px", padding: "24px 28px" }}>
                  <div style={{ fontSize: "11px", color: "#9F1239", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: "4px" }}>{ag.time}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, color: T, marginBottom: "8px" }}>{ag.title}</h3>
                  <p style={{ color: TL, fontSize: "0.875rem", lineHeight: 1.6 }}>{ag.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section-pad" style={{ background: W }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "44px" }}>
            <span style={{ fontSize: "11px", color: G, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>Moments of Grace</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: T, marginTop: "6px" }}>Glimpses of Sewa and Blessings</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
            {GALLERY.map((g, i) => (
              <div key={i} style={{ borderRadius: "20px", overflow: "hidden", boxShadow: "0 6px 24px rgba(0,0,0,0.08)", transition: "transform 0.2s" }}>
                <img src={g} alt={`Sewa Glimpse ${i + 1}`} style={{ width: "100%", height: "220px", objectFit: "cover", display: "block" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REGISTRATION */}
      <section id="register" className="section-pad" style={{ background: BG }}>
        <div className="container-page">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "56px", alignItems: "center" }}>
            <div>
              <span style={{ fontSize: "11px", color: "#9F1239", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>Limited Seats</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: T, marginTop: "6px", marginBottom: "16px" }}>Secure Your Seat Now</h2>
              <p style={{ color: TL, fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "28px" }}>Limited Seats Available. Don't Miss This Opportunity to receive Guruji's blessings on this auspicious day.</p>

              {/* Details card */}
              <div style={{ background: W, border: `1px solid ${BrG}`, borderRadius: "20px", padding: "24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {[
                    { icon: "📅", label: "Date & Time", val: "14th December, 2025 | 10:00 AM" },
                    { icon: "📍", label: "Location", val: "Siddha Sudarshan Sakshi Dham 9, Avanthika Rd, Chiranjiv Vihar, Shastri Nagar, Ghaziabad, UP 201002" },
                    { icon: "🎫", label: "Entry Fee", val: "Free (Registration Mandatory)" },
                  ].map((d, i) => (
                    <div key={i} style={{ display: "flex", gap: "14px" }}>
                      <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>{d.icon}</span>
                      <div>
                        <div style={{ fontSize: "10px", fontWeight: 700, color: "#9F1239", textTransform: "uppercase" as const, letterSpacing: "0.05em", marginBottom: "3px" }}>{d.label}</div>
                        <div style={{ fontSize: "0.875rem", color: T, fontWeight: 600 }}>{d.val}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              {sent ? (
                <div style={{ background: "#FFF7ED", border: "1px solid #FDE68A", borderRadius: "24px", padding: "48px", textAlign: "center" }}>
                  <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🙏</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700, color: T }}>Seat Confirmed!</h3>
                  <p style={{ color: TL, marginTop: "12px", lineHeight: 1.6 }}>Guruji's blessings await you. We'll send the details to your email shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleReg} style={{ background: W, border: `1px solid ${BrG}`, borderRadius: "24px", padding: "40px", display: "flex", flexDirection: "column", gap: "18px", boxShadow: "0 10px 40px rgba(212,175,55,0.06)" }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 700, color: T, marginBottom: "4px" }}>Confirm My Registration</h3>
                  {[{ k: "name", l: "Full Name", t: "text", p: "Your Full Name" }, { k: "phone", l: "Phone Number", t: "tel", p: "Your Phone Number" }, { k: "email", l: "Email Address", t: "email", p: "Your Email Address" }].map((f) => (
                    <div key={f.k}>
                      <label htmlFor={`bd-${f.k}`} style={{ fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase" as const, display: "block", marginBottom: "6px" }}>{f.l}</label>
                      <input required id={`bd-${f.k}`} type={f.t} placeholder={f.p} value={(formData as Record<string,string>)[f.k]} onChange={(e) => setFormData(p => ({ ...p, [f.k]: e.target.value }))} style={{ width: "100%", background: BG, border: `1px solid ${BrG}`, borderRadius: "12px", padding: "12px 16px", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" as const }} />
                    </div>
                  ))}
                  <button type="submit" style={{ background: `linear-gradient(135deg, ${G}, #B8860B)`, color: HF, border: "none", borderRadius: "100px", padding: "15px", fontWeight: 800, fontSize: "1rem", cursor: "pointer", boxShadow: "0 6px 20px rgba(212,175,55,0.3)" }}>
                    Confirm My Registration
                  </button>
                  <p style={{ fontSize: "10px", color: TL, textAlign: "center" }}>Your details are secure and will not be shared.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SIGNIFICANCE */}
      <section className="section-pad" style={{ background: W }}>
        <div className="container-page">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "56px", alignItems: "center" }}>
            <div>
              <span style={{ fontSize: "11px", color: "#9F1239", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>Why This Day Matters</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: T, marginTop: "6px", marginBottom: "20px" }}>The Significance of Shiksha Sewa</h2>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#9F1239", marginBottom: "16px" }}>A Celebration of Service</h3>
              <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "20px" }}>
                This Mahotsav is dedicated to the philosophy of selfless service ('Sewa'), particularly in the realm of education ('Shiksha'). It embodies Guruji's vision of empowering communities through knowledge and upliftment.
              </p>
              <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.7 }}>
                Join us in honoring this legacy of profound contribution to society.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <img src="https://sciencedivine.org/wp-content/uploads/2025/02/1-1024x542.webp" alt="Sewa Activity" style={{ width: "100%", borderRadius: "20px", boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }} />
              <img src="https://sciencedivine.org/wp-content/uploads/2025/02/2-1024x542.webp" alt="Education Initiative" style={{ width: "100%", borderRadius: "20px", boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }} />
            </div>
          </div>

          {/* Birthday offering */}
          <div style={{ marginTop: "60px", background: `linear-gradient(135deg, ${HF}, ${HT})`, borderRadius: "24px", padding: "48px", color: W, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "200px", height: "200px", background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)", borderRadius: "50%" }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "40px", alignItems: "center", position: "relative", zIndex: 1 }}>
              <div>
                <div style={{ color: G, fontSize: "11px", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: "12px" }}>Guruji's Birthday Offering</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: W, marginBottom: "16px" }}>A Gift of Education and Love</h3>
                <p style={{ color: "rgba(255,255,255,0.80)", fontSize: "0.95rem", lineHeight: 1.7 }}>
                  Sakshi Shree Guruji's birthday is marked not just by personal celebration, but by intensifying our commitment to charitable and educational initiatives. Your participation directly supports ongoing projects that provide free schooling, vocational training, and mentorship to those in need.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {["Free schooling for underprivileged children", "Vocational training programmes", "Mentorship and career guidance", "Meals and nutrition support"].map((it, i) => (
                  <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: G, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#2D0A1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.875rem" }}>{it}</span>
                  </div>
                ))}
                <a href="#register" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", background: `linear-gradient(135deg, ${G}, #B8860B)`, color: HF, padding: "14px 28px", borderRadius: "100px", fontWeight: 800, fontSize: "0.95rem", textDecoration: "none", marginTop: "8px" }}>
                  Join This Sacred Celebration
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
