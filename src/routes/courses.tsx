import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Award, Star, Check, Sparkles, BookOpen, Compass, ArrowRight, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Transformative Growth Courses | Science Divine Foundation" },
      { name: "description", content: "Explore Our Transformative Courses for Personal Growth and Wellness. Join Design Your Destiny, Science of Joyful Living, Mind Power Meditation, and Sanjeevani Kriya." },
      { property: "og:title", content: "Explore Our Transformative Courses" },
      { property: "og:url", content: "/courses" },
    ],
    links: [{ rel: "canonical", href: "/courses" }],
  }),
  component: Page,
});

const COURSES_DATA = [
  {
    slug: "design-your-destiny-2",
    title: "Design Your Destiny",
    tagline: "Manifest your dreams & unlock your full potential",
    desc: "Embark on a profound journey of self-discovery and empowerment with 'Design Your Destiny'. This transformative course empowers you to manifest your dreams, unlock your full potential, and create a life of success, fulfilment, and lasting happiness through powerful teachings and practical strategies.",
    level: "Beginner",
    duration: "2 hours",
    price: 499,
    originalPrice: 5100,
    image: "https://sciencedivine.org/wp-content/uploads/2024/04/pexels-chetanvlad-2923157-1.png",
    features: ["Manifest Dreams", "Emotional Balance", "Unlock Potential", "Daily Habits"]
  },
  {
    slug: "science-of-joyful-living-march",
    title: "Science of Joyful Living",
    tagline: "Discover tools for joy, purpose, and well-being",
    desc: "Experience the transformative impact of the 'Science of Joyful Living course'. Discover tools for joy, purpose, and well-being, empowering you to live a fulfilling and meaningful life.",
    level: "Beginner Level",
    duration: "2 hours",
    price: 459,
    originalPrice: 5100,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&q=90&fit=crop&crop=center",
    features: ["Emotion Regulation", "Positive Mindset", "Lasting Happiness", "Self-Discovery"]
  },
  {
    slug: "mind-power-meditation",
    title: "Mind Power Meditation",
    tagline: "Harness the untapped potential of your mind",
    desc: "Mind Power Meditation is a transformative practice that harnesses the untapped potential of the mind to unlock inner strength, clarity, and manifestation abilities.",
    level: "Beginner",
    duration: "2 hours",
    price: 499,
    originalPrice: 5100,
    image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=900&q=90&fit=crop&crop=center",
    features: ["Manifest Your Reality", "Thought Science", "Blissful Living", "Inner Cleansing"]
  },
  {
    slug: "sanjeevni-kriya-2",
    title: "Sanjeevani Kriya",
    tagline: "Revitalize your body, mind, and spirit",
    desc: "Sanjeevani Kriya holds the key to a transformative journey towards love and divinity. This practice not only brings inner peace, soundness of body and mind, but also helps in realizing one’s true self.",
    level: "Beginner Level",
    duration: "2 hours",
    price: 459,
    originalPrice: 5100,
    image: "https://sciencedivine.org/wp-content/uploads/2024/04/pexels-min-an-1234035-1-1.png",
    features: ["Inner Peace & Clarity", "Balance Energy Centers", "Self-Realization", "Heart Chakra Activation"]
  }
];

const TESTIMONIALS = [
  { id: "QLmL230dApk", name: "Swaparna Testimonial" },
  { id: "EiFMTSo8Yws", name: "Helen Testimonial" },
  { id: "6bkJdkmAt20", name: "Pooja Pagaddinnimath Testimonial" },
  { id: "5KmsxqJXACM", name: "Patty Testimonial" },
];

function Page() {
  return (
    <div style={{ background: "#FFFFFF", color: "#1E293B", fontFamily: "'Inter', sans-serif" }}>
      {/* Hero Section */}
      <section style={{ background: "linear-gradient(135deg, #FAF8FF 0%, #FFFDF5 50%, #FAF8FF 100%)", paddingTop: "140px", paddingBottom: "80px", borderBottom: "1px solid #E2E8F0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div className="container-page" style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: "800px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: "100px", padding: "6px 16px", marginBottom: "20px" }}>
            <Sparkles size={14} style={{ color: "#D4AF37" }} />
            <span style={{ color: "#B45309", fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>Transformative Growth Courses</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.3rem, 5vw, 3.8rem)", fontWeight: 800, color: "#0F172A", lineHeight: 1.15, marginBottom: "16px" }}>
            Explore Our Courses for <br />
            <span style={{ background: "linear-gradient(90deg, #F59E0B, #D4AF37)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              Personal Growth & Wellness
            </span>
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#64748B", lineHeight: 1.7, maxWidth: "600px", margin: "0 auto 32px" }}>
            Discover a range of transformative courses designed to enhance personal growth, promote well-being, and empower you on your journey towards a fulfilling life.
          </p>
        </div>
      </section>

      {/* Courses Cards Grid */}
      <section className="section-pad" style={{ background: "#FAF9F6" }}>
        <div className="container-page">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "22px" }}>
            {COURSES_DATA.map((c, i) => (
              <div key={i} style={{ background: "#FFFFFF", borderRadius: "20px", overflow: "hidden", border: "1px solid #E2E8F0", boxShadow: "0 10px 30px rgba(0,0,0,0.02)", display: "flex", flexDirection: "column", transition: "transform 0.25s, box-shadow 0.25s" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-6px)"; el.style.boxShadow = "0 20px 45px rgba(212,175,55,0.12)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 10px 30px rgba(0,0,0,0.02)"; }}
              >
                <div style={{ position: "relative", height: "210px", overflow: "hidden" }}>
                  <img src={c.image} alt={c.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", top: "16px", left: "16px", background: "rgba(15,23,42,0.75)", color: "#FFFFFF", padding: "6px 12px", borderRadius: "100px", fontSize: "11px", fontWeight: 700, backdropFilter: "blur(4px)", display: "flex", alignItems: "center", gap: "6px" }}>
                    <ShieldCheck size={12} style={{ color: "#D4AF37" }} />
                    {c.level}
                  </div>
                </div>
                <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", textTransform: "uppercase", fontSize: "11px", fontWeight: 700, color: "#94A3B8", marginBottom: "8px" }}>
                      <Clock size={12} /> {c.duration} Duration
                    </div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.28rem", fontWeight: 700, color: "#0F172A", marginBottom: "4px" }}>{c.title}</h3>
                    <p style={{ color: "#D4AF37", fontSize: "0.85rem", fontWeight: 600, fontStyle: "italic", marginBottom: "16px" }}>{c.tagline}</p>
                    <p style={{ color: "#64748B", fontSize: "0.84rem", lineHeight: 1.6, marginBottom: "20px" }}>{c.desc}</p>
                  </div>
                  <div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
                      {c.features.map((f, fi) => (
                        <span key={fi} style={{ background: "#FAF9F6", border: "1px solid #E2E8F0", color: "#475569", fontSize: "11px", fontWeight: 600, padding: "4px 10px", borderRadius: "100px" }}>{f}</span>
                      ))}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <span style={{ fontSize: "1.5rem", fontWeight: 900, color: "#B45309" }}>₹{c.price}</span>
                        <span style={{ textDecoration: "line-through", color: "#94A3B8", fontSize: "0.9rem", marginLeft: "6px" }}>₹{c.originalPrice}</span>
                      </div>
                      <Link to={`/${c.slug}` as any} style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "linear-gradient(135deg, #F59E0B, #D4AF37)", color: "#0F172A", padding: "10px 18px", borderRadius: "100px", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none" }}>
                        Start Course <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
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
            <span style={{ fontSize: "12px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>Graduates speak</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "#0F172A", marginTop: "8px" }}>10,000+ Lives Changed</h2>
            <p style={{ color: "#64748B", fontSize: "1rem", marginTop: "8px" }}>Real stories from real people whose lives shifted after taking a Science Divine course.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "28px", marginTop: "40px" }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ background: "#FFFFFF", borderRadius: "20px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #E5E7EB", transition: "transform 0.25s, box-shadow 0.25s" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-6px)"; el.style.boxShadow = "0 20px 50px rgba(212,175,55,0.12)"; }}
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
    </div>
  );
}


