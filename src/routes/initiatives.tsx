import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, Brain, UtensilsCrossed, Building2, Sparkles, Heart } from "lucide-react";

export const Route = createFileRoute("/initiatives")({
  head: () => ({
    meta: [
      { title: "Initiatives — Science Divine Foundation" },
      {
        name: "description",
        content:
          "SAVE HUMANITY — support Shiksha Sewa, Dhyan Sewa, Annapurna Sewa, Nirman Sewa. Every donation transforms lives.",
      },
      { property: "og:title", content: "Save Humanity — Science Divine Initiatives" },
      { property: "og:url", content: "/initiatives" },
    ],
    links: [{ rel: "canonical", href: "/initiatives" }],
  }),
  component: Page,
});

const INITIATIVES = [
  {
    icon: GraduationCap,
    title: "Shiksha Sewa",
    subtitle: "Empowering futures through education",
    achieved: 300000,
    goal: 1000000,
    donateUrl: "https://pages.razorpay.com/pl_RdFnZzHa9b4WmZ/view",
    knowMoreSlug: "education-sewa",
    image: "https://sciencedivine.org/wp-content/uploads/2025/03/image-10.webp",
    desc: "Every child deserves the light of knowledge. Through Shiksha Sewa, we nurture young minds and shape brighter futures.",
    bulletPoints: [
      "Free education and books for underprivileged children",
      "Breaking the cycle of poverty through learning",
      "Guiding children towards confidence and growth",
      "Building a foundation for a better tomorrow"
    ]
  },
  {
    icon: Brain,
    title: "Dhyan Sewa",
    subtitle: "Spreading the Gift of Meditation",
    achieved: 500000,
    goal: 1000000,
    donateUrl: "https://rzp.io/rzp/gAfqVkYJ",
    knowMoreSlug: "dhyan-sewa",
    image: "https://sciencedivine.org/wp-content/uploads/2023/06/young-img1.jpg",
    desc: "Meditation is the path to inner peace and harmony. Dhyan Sewa helps seekers reconnect with their true self.",
    bulletPoints: [
      "Organizing meditation camps and awareness programs",
      "Practical tools to overcome stress and anxiety",
      "Guidance for self-realization and inner bliss",
      "Creating a more conscious and peaceful society"
    ]
  },
  {
    icon: UtensilsCrossed,
    title: "Annapurna Sewa",
    subtitle: "Feeding hearts, one meal at a time",
    achieved: 350000,
    goal: 1000000,
    donateUrl: "https://rzp.io/rzp/QQTFn4O",
    knowMoreSlug: "annapurna-sewa",
    image: "https://sciencedivine.org/wp-content/uploads/2024/04/gospelforasia-RT18-03070.jpeg",
    desc: "No one should sleep hungry. Annapurna Sewa ensures that meals reach those in need with dignity and care.",
    bulletPoints: [
      "Nutritious meals for the hungry and needy",
      "Extending compassion through every plate served",
      "Restoring hope and smiles with each meal",
      "Serving humanity as service to the Divine"
    ]
  },
  {
    icon: Building2,
    title: "Nirman Sewa",
    subtitle: "Spiritual Retreat & Wellness Center",
    achieved: 700000,
    goal: 1000000,
    donateUrl: "https://rzp.io/rzp/RnUeuKZ1",
    knowMoreSlug: "nirman-sewa",
    image: "https://sciencedivine.org/wp-content/uploads/2024/03/Self-Conscious.jpeg",
    desc: "Nirman Sewa is dedicated to building serene spiritual spaces where seekers can heal, meditate, and transform their lives. Your support helps us create retreat centres and wellness spaces.",
    bulletPoints: [
      "Building and maintaining spiritual retreat centres",
      "Meditation, wellness, and healing programs",
      "Spiritual workshops & satsangs",
      "Accessible spaces for inner growth and transformation"
    ]
  }
];

const GALLERY = [
  "https://sciencedivine.org/wp-content/uploads/2025/03/AAP_0044-1-1.webp",
  "https://sciencedivine.org/wp-content/uploads/2025/02/3-1.png",
  "https://sciencedivine.org/wp-content/uploads/2025/04/WhatsApp-Image-2025-04-04-at-1.02.45-PM.jpeg",
  "https://sciencedivine.org/wp-content/uploads/2025/02/3.webp",
  "https://sciencedivine.org/wp-content/uploads/2025/02/4-1.png"
];

function Page() {
  return (
    <div style={{ background: "#FFFFFF", color: "#1E293B", fontFamily: "'Inter', sans-serif" }}>
      {/* Hero Header */}
      <section style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)", paddingTop: "140px", paddingBottom: "80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div className="container-page" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: "100px", padding: "6px 16px", marginBottom: "20px" }}>
            <Heart size={14} style={{ color: "#D4AF37" }} />
            <span style={{ color: "#D4AF37", fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>Save Humanity</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 5vw, 3.8rem)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.15, marginBottom: "16px" }}>
            SAVE HUMANITY <br />
            <span style={{ background: "linear-gradient(90deg, #F59E0B, #D4AF37)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              By Spreading Science Divine Movement
            </span>
          </h1>
          <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.8)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "32px" }}>
            For <span style={{ color: "#D4AF37" }}>Sound Body</span> • <span style={{ color: "#D4AF37" }}>Sound Mind</span> • <span style={{ color: "#D4AF37" }}>Self Realization</span>
          </p>
        </div>
      </section>

      {/* Intro Context */}
      <section className="section-pad" style={{ background: "#FFFDF9" }}>
        <div className="container-page">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px", alignItems: "center" }}>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", top: "-10px", left: "-10px", width: "100%", height: "100%", border: "2px solid #D4AF37", borderRadius: "24px", opacity: 0.15 }} />
              <img src="https://sciencedivine.org/wp-content/uploads/2025/03/AAP_0044-1-1.webp" alt="Sakshi Shree Ji guidance" style={{ width: "100%", height: "auto", borderRadius: "24px", boxShadow: "0 20px 40px rgba(0,0,0,0.08)", display: "block" }} />
            </div>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.85rem", fontWeight: 700, color: "#0F172A", marginBottom: "20px" }}>Have you experienced the guidance of Sakshi Shree?</h2>
              <p style={{ color: "#475569", fontSize: "1.05rem", lineHeight: 1.75, marginBottom: "20px" }}>
                Do you wish his divine wisdom to touch millions and billions of hearts around the world?
              </p>
              <p style={{ color: "#475569", fontSize: "1.05rem", lineHeight: 1.75 }}>
                He walks this path for you. The blessings, the teachings, the light—they reach you because of his unwavering efforts. Now, this mission can only grow with your support. Your contribution ensures that Sakshi Shree’s voice spreads further, changing lives everywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section style={{ padding: "40px 0", background: "#FFFFFF", borderTop: "1px solid #F3E8FF", borderBottom: "1px solid #F3E8FF" }}>
        <div className="container-page" style={{ overflowX: "auto" }}>
          <div style={{ display: "flex", gap: "20px", paddingBottom: "12px" }}>
            {GALLERY.map((g, i) => (
              <img key={i} src={g} alt={`Initiative Gallery ${i + 1}`} style={{ height: "200px", width: "auto", borderRadius: "16px", objectFit: "cover", flexShrink: 0, boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }} />
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives Cards Grid */}
      <section className="section-pad" style={{ background: "#FAF9F6" }}>
        <div className="container-page">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "36px" }}>
            {INITIATIVES.map((init, idx) => {
              const percent = Math.min(100, Math.round((init.achieved / init.goal) * 100));
              return (
                <div key={idx} style={{ background: "#FFFFFF", borderRadius: "24px", overflow: "hidden", border: "1px solid #E2E8F0", boxShadow: "0 10px 30px rgba(0,0,0,0.02)", display: "flex", flexDirection: "column", transition: "transform 0.25s, box-shadow 0.25s" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-6px)"; el.style.boxShadow = "0 20px 45px rgba(212,175,55,0.12)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 10px 30px rgba(0,0,0,0.02)"; }}
                >
                  <div style={{ position: "relative", paddingTop: "56.25%", overflow: "hidden" }}>
                    <img src={init.image} alt={init.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", top: "16px", left: "16px", background: "#D4AF37", color: "#0F172A", width: "36px", height: "36px", borderRadius: "100px", display: "grid", placeItems: "center" }}>
                      <init.icon size={18} />
                    </div>
                  </div>

                  <div style={{ padding: "32px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <span style={{ color: "#D4AF37", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>{init.subtitle}</span>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.65rem", fontWeight: 700, color: "#0F172A", marginTop: "4px", marginBottom: "12px" }}>{init.title}</h3>
                      <p style={{ color: "#64748B", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "20px" }}>{init.desc}</p>
                      
                      <ul style={{ padding: 0, margin: "0 0 24px 0", listStyle: "none" }}>
                        {init.bulletPoints.map((bp, bpi) => (
                          <li key={bpi} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "0.85rem", color: "#475569", marginBottom: "8px" }}>
                            <span style={{ color: "#D4AF37", fontWeight: 900 }}>✓</span>
                            <span>{bp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      {/* Progress Bar */}
                      <div style={{ marginBottom: "24px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "6px" }}>
                          <span>Achieved: ₹{init.achieved.toLocaleString()}</span>
                          <span>To Be Raised: ₹{init.goal.toLocaleString()}</span>
                        </div>
                        <div style={{ height: "6px", background: "#E2E8F0", borderRadius: "10px", overflow: "hidden", position: "relative" }}>
                          <div style={{ width: `${percent}%`, height: "100%", background: "linear-gradient(90deg, #F59E0B, #D4AF37)", borderRadius: "10px" }} />
                        </div>
                        <div style={{ textAlign: "right", fontSize: "11px", color: "#D4AF37", fontWeight: 700, marginTop: "4px" }}>
                          {percent}%
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: "12px" }}>
                        <a href={init.donateUrl} target="_blank" rel="noopener noreferrer" style={{ flex: 1, textAlign: "center", background: "linear-gradient(135deg, #F59E0B, #D4AF37)", color: "#0F172A", padding: "12px", borderRadius: "100px", fontWeight: 800, fontSize: "0.85rem", textDecoration: "none", boxShadow: "0 4px 15px rgba(212,175,55,0.2)" }}>
                          Donate Now
                        </a>
                        <Link to={`/${init.knowMoreSlug}` as any} style={{ flex: 1, textAlign: "center", background: "#FAF9F6", border: "1px solid #D2D6DC", color: "#0F172A", padding: "12px", borderRadius: "100px", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none" }}>
                          Know More
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
