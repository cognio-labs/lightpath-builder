import { createFileRoute } from "@tanstack/react-router";
import { Check, Star, Zap, Heart, Brain, Sun, Shield, Sparkles, Award, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/designyourdestiny")({
  head: () => ({
    meta: [
      { title: "Design Your Destiny - Transform Your Life with Sakshi Shree | Science Divine Foundation" },
      { name: "description", content: "Unlock your true potential with Design Your Destiny — a life-transforming program by Sakshi Shree. Ancient wisdom meets modern practices. Enroll today." },
      { property: "og:title", content: "Design Your Destiny - A Life-Transforming Program by Sakshi Shree" },
    ],
    links: [{ rel: "canonical", href: "/designyourdestiny" }],
  }),
  component: Page,
});

const PILLARS = [
  { img: "https://assets.cdn.filesafe.space/z3Nz1DGIjH8cQEHGGNs5/media/694a38c0e5a72e0de7c4e7d9.png", title: "Inner Calm", desc: "Master the science of peace in a chaotic world through proven techniques of stillness and mindfulness." },
  { img: "https://assets.cdn.filesafe.space/z3Nz1DGIjH8cQEHGGNs5/media/694a38c079fc96742beedbd1.png", title: "Life Design", desc: "Reconfigure your mindset to manifest the destiny you truly desire and create your ideal future." },
  { img: "https://assets.cdn.filesafe.space/z3Nz1DGIjH8cQEHGGNs5/media/694a38c079fc96f6ffeedbd2.png", title: "Mindful Living", desc: "Integrate ancient wisdom with modern practices for lasting fulfillment and conscious awareness." },
];

const TRANSFORMS = [
  { img: "https://assets.cdn.filesafe.space/z3Nz1DGIjH8cQEHGGNs5/media/694a363e59a0a64da3856966.png", title: "Physical Well-being", desc: "Rejuvenate your body and mind through conscious movement, rest, and holistic health practices." },
  { img: "https://assets.cdn.filesafe.space/z3Nz1DGIjH8cQEHGGNs5/media/694a363e59a0a6b553856967.png", title: "Stress Relief", desc: "Learn powerful techniques to dissolve anxiety and find peace even in the midst of chaos." },
  { img: "https://assets.cdn.filesafe.space/z3Nz1DGIjH8cQEHGGNs5/media/694a363e79fc9676deeea619.png", title: "Mental Clarity", desc: "Sharpen your focus and align your thoughts with your goals for unprecedented success." },
  { img: "https://assets.cdn.filesafe.space/z3Nz1DGIjH8cQEHGGNs5/media/694a363ee5a72e4508c4b454.png", title: "Emotional Intelligence", desc: "Master your emotions and respond with wisdom rather than reacting from old patterns." },
  { img: "https://assets.cdn.filesafe.space/z3Nz1DGIjH8cQEHGGNs5/media/694a363e79fc965612eea618.png", title: "Abundance Mindset", desc: "Shift your perspective to attract wealth, opportunities, and prosperity into your life." },
  { img: "https://assets.cdn.filesafe.space/z3Nz1DGIjH8cQEHGGNs5/media/694a363e7be49d4e1df9eeca.png", title: "Spiritual Growth", desc: "Deepen your connection with the divine essence of life and discover your true purpose." },
];

const TESTIMONIALS = [
  { name: "Priya Sharma", role: "Entrepreneur, Mumbai", quote: "This program completely transformed my life. I finally found the peace and clarity I had been searching for. Sakshi Shree's teachings are profound yet practical.", stars: 5 },
  { name: "Rahul Mehta", role: "Software Engineer, Bangalore", quote: "I was skeptical at first, but the results speak for themselves. My relationships improved, my career took off, and I feel more aligned with my purpose than ever before.", stars: 5 },
  { name: "Anjali Desai", role: "Teacher, Delhi", quote: "The techniques I learned have become an integral part of my daily life. I'm calmer, more focused, and genuinely happy. This is the best investment I've made in myself.", stars: 5 },
];
const MODULES = [
  { num: "01", title: "The Foundation", desc: "Understanding the core principles of destiny design and consciousness transformation." },
  { num: "02", title: "The Blueprint", desc: "Mapping out your personal and spiritual path with clarity and intention." },
  { num: "03", title: "Inner Work", desc: "Techniques for deep subconscious reprogramming and healing past traumas." },
  { num: "04", title: "Mental Mastery", desc: "Harnessing the power of your thoughts to create your desired reality." },
  { num: "05", title: "Energy Alignment", desc: "Balancing your chakras and energetic frequencies for optimal well-being." },
  { num: "06", title: "Manifestation", desc: "Turning your desires into physical reality through proven manifestation techniques." },
  { num: "07", title: "Daily Rituals", desc: "Establishing practices that anchor your new life and maintain your transformation." },
  { num: "08", title: "Shadow Work", desc: "Addressing and healing your hidden traumas, fears, and limiting beliefs." },
  { num: "09", title: "Legacy Building", desc: "Creating a life that inspires and impacts generations to come." },
];

function Page() {
  const H = "#1A0533"; const H2 = "#2E0A5C";
  const G = "#D4AF37"; const Gd = "rgba(212,175,55,0.12)"; const Gb = "rgba(212,175,55,0.25)";
  const V = "#7C3AED"; const Vd = "rgba(124,58,237,0.12)"; const Vb = "rgba(124,58,237,0.25)";
  const T = "#1E0533"; const TL = "#64748B"; const W = "#FFFFFF";
  const BG = "#F5F0FF"; const BrV = "#DDD6FE";

  return (
    <div style={{ background: W, color: T, fontFamily: "'Inter', sans-serif" }}>

      {/* HERO */}
      <section style={{ background: `linear-gradient(135deg, ${H} 0%, ${H2} 55%, #3B0F82 100%)`, paddingTop: "135px", paddingBottom: "90px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-80px", right: "-60px", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "5%", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(212,175,55,0.10) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "20%", left: "5%", fontSize: "8rem", opacity: 0.03, pointerEvents: "none", userSelect: "none" }}>⭐</div>
        <div className="container-page" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "56px", alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: Vd, border: `1px solid ${Vb}`, borderRadius: "100px", padding: "6px 18px", marginBottom: "20px" }}>
                <Sparkles size={13} style={{ color: "#A78BFA" }} />
                <span style={{ color: "#A78BFA", fontSize: "11px", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.07em" }}>Life-Transforming Program</span>
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)", fontWeight: 900, color: W, lineHeight: 1.10, marginBottom: "16px" }}>
                Design Your<br /><span style={{ background: `linear-gradient(135deg, ${G}, #F59E0B)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Destiny</span>
              </h1>
              <p style={{ fontSize: "1.1rem", fontWeight: 600, color: "rgba(255,255,255,0.70)", marginBottom: "12px" }}>A Life-Transforming Program by Sakshi Shree</p>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "36px" }}>
                Unlock your true potential and create a life you love. Discover the power within you to transform your reality and step into your highest self through ancient wisdom and modern practices.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center" }}>
                <a href="https://sciencedivine.graphy.com/courses/Design-Your-Destiny" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: `linear-gradient(135deg, ${G}, #F59E0B)`, color: H, padding: "16px 38px", borderRadius: "100px", fontWeight: 800, fontSize: "1rem", textDecoration: "none", boxShadow: "0 8px 30px rgba(212,175,55,0.35)" }}>
                  <Zap size={16} />
                  ENROLL NOW
                </a>
                <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "100px", padding: "10px 20px" }}>
                  <span style={{ color: W, fontWeight: 700, fontSize: "0.9rem" }}>₹1,999 </span>
                  <span style={{ color: "rgba(255,255,255,0.45)", textDecoration: "line-through", fontSize: "0.8rem", marginLeft: "4px" }}>₹5,000</span>
                  <span style={{ color: "#4ADE80", fontSize: "0.8rem", fontWeight: 700, marginLeft: "8px" }}>Save 60%!</span>
                </div>
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", inset: "-10px", background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(212,175,55,0.15))", borderRadius: "30px", filter: "blur(16px)" }} />
              <img src="https://sciencedivine.org/wp-content/uploads/2024/12/AAP_0044-1.webp.bv_resized_desktop.webp.bv_.webp" alt="Sakshi Shree - Design Your Destiny" style={{ width: "100%", height: "auto", borderRadius: "24px", boxShadow: "0 24px 60px rgba(0,0,0,0.5)", position: "relative", zIndex: 1, mixBlendMode: "multiply" as const }} />
              <div style={{ position: "absolute", bottom: "24px", right: "-16px", background: "linear-gradient(135deg, #7C3AED, #4C1D95)", borderRadius: "16px", padding: "16px 20px", boxShadow: "0 8px 24px rgba(124,58,237,0.4)", zIndex: 2 }}>
                <div style={{ color: W, fontWeight: 800, fontSize: "1rem" }}>15+ Years</div>
                <div style={{ color: "#C4B5FD", fontSize: "10px", fontWeight: 600 }}>of Guidance</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS OF TRANSFORMATION */}
      <section className="section-pad" style={{ background: BG }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <span style={{ fontSize: "11px", color: V, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>The Foundation</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: T, marginTop: "6px" }}>The Pillars of Transformation</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px" }}>
            {PILLARS.map((p, i) => (
              <div key={i} style={{ background: W, border: `1px solid ${BrV}`, borderRadius: "24px", padding: "32px 24px", textAlign: "center", boxShadow: "0 6px 20px rgba(124,58,237,0.03)" }}>
                <img src={p.img} alt={p.title} style={{ height: "64px", width: "auto", margin: "0 auto 20px auto", display: "block" }} />
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", fontWeight: 700, color: T, marginBottom: "12px" }}>{p.title}</h3>
                <p style={{ color: TL, fontSize: "0.875rem", lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSFORM EVERY AREA */}
      <section className="section-pad" style={{ background: W }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <span style={{ fontSize: "11px", color: V, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>Holistic Growth</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: T, marginTop: "6px" }}>Transform Every Area of Your Life</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "28px" }}>
            {TRANSFORMS.map((t, i) => (
              <div key={i} style={{ display: "flex", gap: "20px", alignItems: "flex-start", background: BG, border: `1px solid ${BrV}`, borderRadius: "20px", padding: "24px" }}>
                <img src={t.img} alt={t.title} style={{ width: "48px", height: "48px", objectFit: "contain", flexShrink: 0 }} />
                <div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: T, marginBottom: "8px" }}>{t.title}</h3>
                  <p style={{ color: TL, fontSize: "0.825rem", lineHeight: 1.5 }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEET YOUR GUIDE */}
      <section className="section-pad" style={{ background: BG }}>
        <div className="container-page">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "56px", alignItems: "center" }}>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", inset: "-6px", background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(212,175,55,0.15))", borderRadius: "30px", filter: "blur(12px)" }} />
              <img src="https://sciencedivine.org/wp-content/uploads/2024/12/AAP_0044-1.webp.bv_resized_desktop.webp.bv_.webp" alt="Sakshi Shree Guide" style={{ width: "100%", maxWidth: "380px", height: "auto", borderRadius: "24px", margin: "0 auto", display: "block", position: "relative", zIndex: 1, mixBlendMode: "multiply" as const }} />
            </div>
            <div>
              <span style={{ fontSize: "11px", color: V, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>The Guide</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: T, marginTop: "6px" }}>Meet Your Guide</h2>
              <h3 style={{ color: "#7C3AED", fontSize: "1.1rem", fontWeight: 700, margin: "6px 0 20px 0" }}>Sakshi Shree · Spiritual Teacher & Life Transformation Expert</h3>
              <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "20px" }}>
                With over 15 years of experience in spiritual guidance and personal transformation, Sakshi Shree has helped thousands of individuals worldwide unlock their true potential and design their destiny.
              </p>
              <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "20px" }}>
                His unique approach combines ancient Eastern wisdom with modern psychology, creating a powerful framework for lasting change. Through his teachings, students learn to transcend limiting beliefs, access their inner wisdom, and create lives of purpose and fulfillment.
              </p>
              <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.7 }}>
                Sakshi Shree is the founder of Science Divine Foundation and has been featured in numerous publications for his groundbreaking work in consciousness and human potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT STUDENTS SAY */}
      <section className="section-pad" style={{ background: W }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <span style={{ fontSize: "11px", color: V, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>Student Feedback</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: T, marginTop: "6px" }}>What Our Students Say</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "28px" }}>
            {TESTIMONIALS.map((s, i) => (
              <div key={i} style={{ background: BG, border: `1px solid ${BrV}`, borderRadius: "20px", padding: "28px", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", gap: "2px" }}>{Array.from({ length: s.stars }).map((_, j) => <Star key={j} size={14} style={{ color: "#F59E0B", fill: "#F59E0B" }} />)}</div>
                <p style={{ color: "#475569", fontSize: "0.875rem", lineHeight: 1.7, fontStyle: "italic", flex: 1 }}>"{s.quote}"</p>
                <div style={{ display: "flex", flexDirection: "column", borderTop: `1px solid ${BrV}`, paddingTop: "16px" }}>
                  <div style={{ fontWeight: 800, color: T, fontSize: "0.85rem" }}>{s.name}</div>
                  <div style={{ fontSize: "0.7rem", color: TL, marginTop: "2px" }}>{s.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSE STRUCTURE */}
      <section className="section-pad" style={{ background: BG }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <span style={{ fontSize: "11px", color: V, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>The Syllabus</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: T, marginTop: "6px" }}>Course Structure</h2>
            <p style={{ color: TL, marginTop: "10px", fontSize: "0.95rem" }}>This comprehensive journey is broken down into specific modules designed to systematically reprogram your consciousness.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {MODULES.map((m, i) => (
              <div key={i} style={{ background: W, border: `1px solid ${BrV}`, borderRadius: "20px", padding: "28px 24px" }}>
                <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#DDD6FE", fontFamily: "'Playfair Display', serif", marginBottom: "8px" }}>{m.num}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: T, marginBottom: "8px" }}>{m.title}</h3>
                <p style={{ color: TL, fontSize: "0.8rem", lineHeight: 1.5 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIAL LAUNCH OFFER */}
      <section className="section-pad" style={{ background: `linear-gradient(135deg, ${H} 0%, ${H2} 60%, #3B0F82 100%)`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div className="container-page" style={{ maxWidth: "800px", position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ display: "inline-block", background: "rgba(212,175,55,0.15)", border: `1px solid ${Gb}`, borderRadius: "100px", padding: "6px 18px", marginBottom: "20px" }}>
            <span style={{ color: G, fontSize: "11px", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>Special Launch Offer</span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, color: W, marginBottom: "16px" }}>Ready to Design Your Destiny?</h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "40px", maxWidth: "600px", margin: "0 auto 40px auto" }}>
            Get lifetime access to the complete consciousness reprogramming framework. Start your journey toward ultimate manifestation today.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px", alignItems: "center", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "24px", padding: "40px", textAlign: "left", maxWidth: "700px", margin: "0 auto" }}>
            <div>
              <div style={{ fontSize: "11px", color: G, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: "8px" }}>Limited Time Price</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "4px" }}>
                <span style={{ fontSize: "2.6rem", fontWeight: 900, color: W }}>₹1,999</span>
                <span style={{ fontSize: "1.3rem", color: "rgba(255,255,255,0.4)", textDecoration: "line-through" }}>₹5,000</span>
              </div>
              <p style={{ color: "#4ADE80", fontSize: "0.85rem", fontWeight: 700, marginBottom: "24px" }}>Save 60% Today!</p>
              <a href="https://sciencedivine.graphy.com/courses/Design-Your-Destiny" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", background: `linear-gradient(135deg, ${G}, #F59E0B)`, color: H, padding: "16px", borderRadius: "100px", fontWeight: 800, fontSize: "1rem", textDecoration: "none", boxShadow: "0 6px 20px rgba(212,175,55,0.3)" }}>
                GET STARTED TODAY
                <ArrowRight size={16} />
              </a>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                "Lifetime Access to All Course Materials",
                "Exclusive Bonus Meditation Sessions",
                "Private Community Access",
                "Downloadable Workbooks & Guides",
                "Certificate of Completion",
              ].map((benefit, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "rgba(74,222,128,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Check size={12} style={{ color: "#4ADE80" }} />
                  </div>
                  <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.875rem" }}>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
