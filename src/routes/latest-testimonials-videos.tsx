import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";

export const Route = createFileRoute("/latest-testimonials-videos")({
  head: () => ({
    meta: [
      { title: "All Testimonials & Seeker Videos | Science Divine Foundation" },
      { name: "description", content: "Watch the latest video testimonials and transformational stories from seekers of Science Divine Foundation." },
      { property: "og:title", content: "All Testimonials — Science Divine" },
      { property: "og:url", content: "/latest-testimonials-videos" },
    ],
    links: [{ rel: "canonical", href: "/latest-testimonials-videos" }],
  }),
  component: Page,
});

const TESTIMONIALS = [
  { id: "QLmL230dApk", title: "Swaparna Testimonial" },
  { id: "EiFMTSo8Yws", title: "Helen Testimonial" },
  { id: "6bkJdkmAt20", title: "Pooja Pagaddinnimath Testimonial" },
  { id: "5KmsxqJXACM", title: "Patty Testimonial" },
  { id: "LiILI9iLK0U", title: "Magic of Meeting Sakshi Shree" },
  { id: "FERuXT0Z8JE", title: "Rishabh | Magic of Meeting Sakshi Shree | Testimonials" },
  { id: "wjPponfjB_g", title: "Dr. M D Ojha attending Sakshi Sadhana Shivir Rishikesh" },
  { id: "LV74UV9AUNE", title: "Shweta Singh shared her experience of attending Sakshi Sadhana Shivir Rishikesh" },
  { id: "60_cJkCAc5I", title: "Magic of Meeting Sakshi Shree | Gaurav Pratap Singh | Testimonial" },
  { id: "jEiClzy2ZhY", title: "Guruji Read my Mind & wrote in his Diary, Pulkit Jain After Meeting Sakshi Shree" },
  { id: "4XbvVT7yK2U", title: "साक्षी श्री से मुलाकात के बाद बॉबी मान ने अपना अनुभव साझा किया || Sakshi Shree" },
  { id: "FmQlrZ5XVmY", title: "Ashish Agarwal | Magic of Meeting Sakshi Shree | Testimonials" },
  { id: "6PiX_XQcPFE", title: "Sunil Yadav, Vice President Delhi BJP | Magic of Meeting Sakshi Shree | Testimonials" },
  { id: "XaOeGL4Mp2E", title: "Tremendous Experience of an IITian Dheeraj Madaan from IIT Roorkee" },
  { id: "6c3XtzTbu80", title: "Sunil Khajoriya | Magic of Meeting With Sakshi Shree | Testimonials" },
  { id: "zYBYARtrr94", title: "Rajiv Gupta attending Sakshi Sadhana Shivir Rishikesh" },
  { id: "W3bfSZkEaDg", title: "Experience of Ranjana sharma attending Sakshi Sadhana Shivir Rishikesh" },
  { id: "XSkmVjlvXd4", title: "Watch How Sanjeevani Kriya Changed Preeti's Life || Sakshi Shree" },
  { id: "2P6i7tnydMI", title: "Experience of Sakshi Hema attending Sakshi Sadhana Shivir Rishikesh" },
  { id: "7AMCDdnCjuI", title: "Watch Piyush's Transformation Story || Sakshi Shree" },
  { id: "PSwaCSEjPLM", title: "Shiv Kumar attending Sakshi Sadhana Shivir Rishikesh" }
];

function Page() {
  return (
    <div style={{ background: "#FFFFFF", color: "#1E293B", fontFamily: "'Inter', sans-serif" }}>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)", paddingTop: "140px", paddingBottom: "70px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div className="container-page" style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: "800px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: "100px", padding: "6px 16px", marginBottom: "20px" }}>
            <span style={{ color: "#D4AF37", fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>Voices of Transformation</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 5vw, 3.8rem)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.15, marginBottom: "16px" }}>
            All Testimonials
          </h1>
          <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>
            Discover how Sakshi Shree's teachings on meditation, self-realization, and design your destiny have changed lives around the globe.
          </p>
        </div>
      </section>

      {/* Grid of video embeds */}
      <section className="section-pad" style={{ background: "#FAF9F6" }}>
        <div className="container-page">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px" }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "20px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.02)", display: "flex", flexDirection: "column", transition: "transform 0.25s, box-shadow 0.25s" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-6px)"; el.style.boxShadow = "0 16px 40px rgba(212,175,55,0.12)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 10px 30px rgba(0,0,0,0.02)"; }}
              >
                <div style={{ position: "relative", paddingTop: "56.25%", background: "#0F172A" }}>
                  <iframe src={`https://www.youtube.com/embed/${t.id}`} title={t.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }} />
                </div>
                <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", gap: "3px", marginBottom: "8px" }}>
                      {Array.from({ length: 5 }).map((_, si) => <Star key={si} size={14} fill="#F59E0B" style={{ color: "#F59E0B" }} />)}
                    </div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700, color: "#0F172A", lineHeight: 1.45 }}>{t.title}</h3>
                  </div>
                  <span style={{ fontSize: "11px", color: "#94A3B8", fontWeight: 600, marginTop: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Verified Seeker Testimony</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
