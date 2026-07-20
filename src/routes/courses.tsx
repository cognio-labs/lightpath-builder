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
];function Page() {
  return (
    <div style={{ background: "#FFFFFF", color: "#1E293B", fontFamily: "'Inter', sans-serif", overflowX: "hidden" }}>
      {/* Hero Section */}
      <section style={{ background: "linear-gradient(135deg, #FAF8FF 0%, #FFFDF5 50%, #FAF8FF 100%)", paddingTop: "100px", paddingBottom: "50px", borderBottom: "1px solid #E2E8F0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div className="container-page" style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: "800px", paddingLeft: "16px", paddingRight: "16px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: "100px", padding: "6px 16px", marginBottom: "16px", maxWidth: "100%" }}>
            <Sparkles size={14} style={{ color: "#D4AF37", flexShrink: 0 }} />
            <span style={{ color: "#B45309", fontSize: "10px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>Transformative Growth Courses</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.65rem, 5.5vw, 3.8rem)", fontWeight: 800, color: "#0F172A", lineHeight: 1.2, marginBottom: "16px", wordBreak: "break-word", overflowWrap: "break-word" }}>
            Explore Our Courses for <br className="hidden sm:inline" />
            <span style={{ background: "linear-gradient(90deg, #F59E0B, #D4AF37)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", display: "inline-block" }}>
              Personal Growth & Wellness
            </span>
          </h1>
          <p style={{ fontSize: "1rem", color: "#64748B", lineHeight: 1.65, maxWidth: "600px", margin: "0 auto 24px", paddingLeft: "8px", paddingRight: "8px" }}>
            Discover a range of transformative courses designed to enhance personal growth, promote well-being, and empower you on your journey towards a fulfilling life.
          </p>
        </div>
      </section>

      {/* Courses Cards Grid */}
      <section className="section-pad" style={{ background: "#FAF9F6" }}>
        <style>{`
          .course-card {
            background: #FFFFFF;
            border-radius: 24px;
            overflow: hidden;
            border: 1px solid #E2E8F0;
            box-shadow: 0 4px 24px rgba(0,0,0,0.05);
            display: flex;
            flex-direction: column;
            transition: transform 0.3s cubic-bezier(.22,.61,.36,1), box-shadow 0.3s;
          }
          .course-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 50px rgba(212,175,55,0.16), 0 4px 16px rgba(0,0,0,0.07);
          }
          .course-card:hover .course-img {
            transform: scale(1.05);
          }
          .course-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center 20%;
            display: block;
            transition: transform 0.5s cubic-bezier(.22,.61,.36,1);
          }
          .course-start-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: 100%;
            background: linear-gradient(135deg, #F59E0B, #D4AF37);
            color: #1a0e00;
            padding: 13px 20px;
            border-radius: 14px;
            font-weight: 700;
            font-size: 0.92rem;
            text-decoration: none;
            letter-spacing: 0.02em;
            transition: background-position 0.3s, box-shadow 0.3s, transform 0.2s;
            box-shadow: 0 4px 16px rgba(212,175,55,0.3);
          }
          .course-start-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(212,175,55,0.45);
          }
          @media (max-width: 1024px) {
            .courses-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 640px) {
            .courses-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
        <div className="container-page" style={{ paddingLeft: "16px", paddingRight: "16px" }}>
          <div className="courses-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "24px" }}>
            {COURSES_DATA.map((c, i) => (
              <div key={i} className="course-card">
                {/* Image */}
                <div style={{ position: "relative", height: "220px", overflow: "hidden", flexShrink: 0 }}>
                  <img src={c.image} alt={c.title} className="course-img" />
                  {/* Level badge */}
                  <div style={{
                    position: "absolute", top: "14px", left: "14px",
                    background: "rgba(15,23,42,0.78)",
                    color: "#FFFFFF", padding: "5px 12px",
                    borderRadius: "100px", fontSize: "10px", fontWeight: 700,
                    backdropFilter: "blur(6px)", display: "flex", alignItems: "center", gap: "5px",
                  }}>
                    <ShieldCheck size={11} style={{ color: "#D4AF37" }} />
                    {c.level}
                  </div>
                  {/* Duration badge */}
                  <div style={{
                    position: "absolute", top: "14px", right: "14px",
                    background: "rgba(212,175,55,0.92)",
                    color: "#1a0e00", padding: "5px 10px",
                    borderRadius: "100px", fontSize: "10px", fontWeight: 700,
                    display: "flex", alignItems: "center", gap: "4px",
                  }}>
                    <Clock size={10} />
                    {c.duration}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "20px 18px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.2rem", fontWeight: 700,
                    color: "#0F172A", marginBottom: "5px", lineHeight: 1.3,
                  }}>{c.title}</h3>
                  <p style={{
                    color: "#D4AF37", fontSize: "0.82rem",
                    fontWeight: 600, fontStyle: "italic", marginBottom: "12px",
                  }}>{c.tagline}</p>
                  <p style={{
                    color: "#64748B", fontSize: "0.84rem",
                    lineHeight: 1.65, marginBottom: "16px", flex: 1,
                  }}>{c.desc}</p>

                  {/* Feature tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
                    {c.features.map((f, fi) => (
                      <span key={fi} style={{
                        background: "#FFF8ED", border: "1px solid #FDDFA0",
                        color: "#92580A", fontSize: "10px", fontWeight: 600,
                        padding: "3px 9px", borderRadius: "100px",
                      }}>{f}</span>
                    ))}
                  </div>

                  {/* Price row */}
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "14px" }}>
                    <span style={{ fontSize: "1.55rem", fontWeight: 900, color: "#B45309", lineHeight: 1 }}>
                      ₹{c.price}
                    </span>
                    <span style={{
                      textDecoration: "line-through", color: "#94A3B8",
                      fontSize: "0.88rem",
                    }}>₹{c.originalPrice}</span>
                    <span style={{
                      marginLeft: "auto", background: "#FEF3C7",
                      color: "#92400E", fontSize: "10px", fontWeight: 700,
                      padding: "3px 8px", borderRadius: "6px",
                    }}>
                      {Math.round((1 - c.price / c.originalPrice) * 100)}% OFF
                    </span>
                  </div>

                  {/* CTA button ,  full width, own row */}
                  <Link to={`/${c.slug}` as any} className="course-start-btn">
                    Start Course <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Testimonials */}
      <section className="section-pad" style={{ background: "#FFFFFF" }}>
        <div className="container-page" style={{ paddingLeft: "16px", paddingRight: "16px" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ fontSize: "12px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>Graduates speak</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 700, color: "#0F172A", marginTop: "8px" }}>10,000+ Lives Changed</h2>
            <p style={{ color: "#64748B", fontSize: "1rem", marginTop: "8px" }}>Real stories from real people whose lives shifted after taking a Science Divine course.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginTop: "30px" }}>
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


