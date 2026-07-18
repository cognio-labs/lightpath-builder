import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Heart, BookOpen, Brain, Users, Sprout, GraduationCap, Flower2, Palette, Mountain, Route as RouteIcon, TrendingUp, HandCoins, Target, Trophy } from "lucide-react";

export const Route = createFileRoute("/har-ghar-shiksha")({
  head: () => ({
    meta: [
      { title: "Har Ghar Shiksha, Har Ghar Dhyan — Science Divine Foundation" },
      {
        name: "description",
        content:
          "Education and Meditation in Every Home. A massive movement for education and meditation. A commitment to the birth of a new humanity.",
      },
      { property: "og:title", content: "Har Ghar Shiksha, Har Ghar Dhyan" },
      {
        property: "og:image",
        content: "https://sciencedivine.org/wp-content/uploads/2025/02/mzlvjnkn-1-scaled.webp",
      },
      { property: "og:url", content: "/har-ghar-shiksha" },
    ],
    links: [{ rel: "canonical", href: "/har-ghar-shiksha" }],
  }),
  component: Page,
});

/* ─── Data ─── */
const STATS = [
  {
    // Mass outdoor meditation — golden sunrise, hundreds of people
    img: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=900&q=90&fit=crop&crop=center",
    value: "50,000+",
    label: "Lives Changed Through Meditation",
    desc: "Thousands awakened worldwide",
  },
  {
    // Happy Indian children in classroom with teacher
    img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=900&q=90&fit=crop&crop=center",
    value: "12,000+",
    label: "Students Educated",
    desc: "Underprivileged children empowered",
  },
  {
    // Solitary person meditating on mountain at sunrise
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&q=90&fit=crop&crop=center",
    value: "100,000+",
    label: "Lives Enriched",
    desc: "Through meditation & education",
  },
  {
    // Hands nurturing a young plant in golden sunlight
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=90&fit=crop&crop=center",
    value: "20+",
    label: "Years in Operation",
    desc: "Decades of trusted service",
  },
  {
    // Young girls happily studying with books and smiling
    img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&q=90&fit=crop&crop=center",
    value: "45%",
    label: "Girls' Education",
    desc: "Empowering young women for a brighter future",
  },
];

const PURPOSE_CARDS = [
  {
    // Diverse smiling people celebrating, learning together — community & purpose
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=90&fit=crop&crop=center",
    title: "Our Goal",
    desc: "To create conscious individuals who live joyfully and meaningfully, breaking cycles of poverty through inner transformation.",
    icon: Heart,
    color: "#16A34A",
  },
  {
    // Person meditating peacefully toward a sunrise / peaceful landscape
    img: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&q=90&fit=crop&crop=center",
    title: "Our Vision",
    desc: "To provide quality education and meditation practices to those who need it most, awakening human potential worldwide.",
    icon: Flower2,
    color: "#0E9F6E",
  },
  {
    // Spiritual teacher guiding a meditation session / peaceful gathering
    img: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=800&q=90&fit=crop&crop=center",
    title: "Our Approach",
    desc: "Guided by the wisdom of Sakshi Shree, we blend ancient meditation wisdom with modern education to create positive change.",
    icon: Sprout,
    color: "#059669",
  },
];

const PROBLEMS = [
  {
    // Woman meditating in lush forest — spiritual growth, inner peace
    img: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=90&fit=crop&crop=center",
    title: "Spiritual Growth",
    desc: "Discover your inner divinity and connect with your true self through guided meditation practices.",
    icon: Flower2,
    color: "#16A34A",
  },
  {
    // Person journaling by sunny window with plants — mindfulness and clarity
    img: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&q=90&fit=crop&crop=center",
    title: "Mental Clarity",
    desc: "Achieve peace of mind and enhanced focus through regular meditation and mindfulness practices.",
    icon: Brain,
    color: "#0E9F6E",
  },
  {
    // Graduation — student with diploma, sunrise, mountain — knowledge & wisdom
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=90&fit=crop&crop=center",
    title: "Knowledge for All",
    desc: "Access spiritual wisdom and practical knowledge that transforms daily life.",
    icon: GraduationCap,
    color: "#059669",
  },
];

const HOW_WE_WORK = [
  {
    num: "01",
    title: "Community Outreach",
    desc: "Our volunteers bring meditation, awareness, and hope directly to communities, creating meaningful social transformation.",
    // Volunteer warmly interacting with happy children and families
    img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=90&fit=crop&crop=center",
    icon: Sprout,
    color: "#16A34A",
  },
  {
    num: "02",
    title: "Educational Access",
    desc: "Providing free education and learning opportunities for underprivileged children and adults to build brighter futures.",
    // Bright classroom: teacher helping happy students with books
    img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=90&fit=crop&crop=center",
    icon: GraduationCap,
    color: "#0E9F6E",
  },
  {
    num: "03",
    title: "Meditation For All",
    desc: "Accessible meditation sessions that promote inner peace, emotional balance, and well-being for everyone.",
    // Group meditation in nature during golden sunrise
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=90&fit=crop&crop=center",
    icon: Flower2,
    color: "#059669",
  },
  {
    num: "04",
    title: "Creative Growth",
    desc: "Creative learning experiences that nurture confidence, imagination, life skills, and personal growth.",
    // Children joyfully painting and creating art
    img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=90&fit=crop&crop=center",
    icon: Palette,
    color: "#10B981",
  },
];

const EVENTS_ROW1 = [
  "https://sciencedivine.org/wp-content/uploads/2025/02/2.webp",
  "https://sciencedivine.org/wp-content/uploads/2025/02/5.png",
  "https://sciencedivine.org/wp-content/uploads/2025/02/1.webp",
];
const EVENTS_ROW2 = [
  "https://sciencedivine.org/wp-content/uploads/2025/02/1-1.png",
  "https://sciencedivine.org/wp-content/uploads/2025/02/2.png",
  "https://sciencedivine.org/wp-content/uploads/2025/02/3-1.png",
];
const EVENTS_ROW3 = [
  "https://sciencedivine.org/wp-content/uploads/2025/02/4-1.png",
  "https://sciencedivine.org/wp-content/uploads/2025/02/3.webp",
  "https://sciencedivine.org/wp-content/uploads/2025/02/6.png",
];

const VOLUNTEERS = [
  {
    name: "Ranjana Sharma",
    role: "Volunteer",
    img: "https://sciencedivine.org/wp-content/uploads/2025/02/oreso8osvo2c0seqonq9.webp",
  },
  {
    name: "Archana Nirali",
    role: "Volunteer",
    img: "https://sciencedivine.org/wp-content/uploads/2025/02/hnxycgntcsjbttrxbo7q.webp",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Growing up in Dehradun, I searched for spiritual truth in ashrams and books, but something essential was always missing. The day I met Guruji, that missing piece was revealed—not through words but through presence. In meditation, I experienced unconditional divine love not as a concept but as a living reality within me.",
    name: "Piyush Pasbola",
    img: "https://sciencedivine.org/wp-content/uploads/2025/02/oreso8osvo2c0seqonq9.webp",
  },
  {
    quote:
      "After practicing Sanjeevani Kriya taught by Gurudev, I experienced feelings that are difficult to put into words. I felt an incredible sense of calm and a profound connection with my inner self. This beautiful practice has opened a doorway to deeper self-understanding. The peace I discovered within myself was truly transformative.",
    name: "Tulika Sharma",
    img: "https://sciencedivine.org/wp-content/uploads/2025/02/hnxycgntcsjbttrxbo7q.webp",
  },
  {
    quote:
      "After working in finance for years, I was looking for something meaningful. Thanks to my sister, I discovered Sakshi Shree and Gurudev's Sanjeevani Kriya. This meditation practice is remarkably easy to learn and quick to do, yet it offers deep benefits. I'm so thankful to Gurudev for this simple but life-changing practice.",
    name: "Preeti Kimothi",
    img: "https://sciencedivine.org/wp-content/uploads/2025/02/v2vc4kpupfnzyblbghdh.webp",
  },
];

/* Premium text ticker phrases */
const TICKER_PHRASES = [
  "Sound Body",
  "Sound Mind",
  "Self Realization",
  "Meditation For All",
  "Education For Every Child",
  "Inner Transformation",
  "Conscious Living",
  "Har Ghar Shiksha",
  "Har Ghar Dhyan",
  "Awaken Your Potential",
];

/* ─── Shared photo-card CSS injected once ─── */
const PHOTO_CARD_CSS = `
  @keyframes pcFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes pcShimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
  @keyframes pcCount { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }

  .pc-card {
    background:#fff;
    border:1px solid #ECECEC;
    border-radius:28px;
    overflow:hidden;
    transition:transform 400ms cubic-bezier(.22,.61,.36,1), box-shadow 400ms cubic-bezier(.22,.61,.36,1);
    cursor:pointer;
    position:relative;
    display:flex;
    flex-direction:column;
  }
  .pc-card:hover { transform:translateY(-10px) scale(1.01); box-shadow:0 28px 70px rgba(22,163,74,.16),0 6px 24px rgba(0,0,0,.09); }
  .pc-card:hover .pc-img { transform:scale(1.06); }
  .pc-card:hover .pc-badge { transform:scale(1.1); box-shadow:0 12px 32px rgba(22,163,74,.35); }
  .pc-card:hover .pc-glow { opacity:1; animation:pcShimmer 2s linear infinite; }

  .pc-img-wrap { overflow:hidden; border-radius:28px 28px 0 0; position:relative; flex-shrink:0; }
  .pc-img { width:100%; object-fit:cover; display:block; transition:transform 600ms cubic-bezier(.22,.61,.36,1); }

  /* Badge sits inside image — bottom-right corner — never overlaps text */
  .pc-badge {
    position:absolute;
    bottom:14px;
    right:14px;
    width:58px; height:58px;
    border-radius:50%;
    background:rgba(255,255,255,.92);
    backdrop-filter:blur(16px);
    -webkit-backdrop-filter:blur(16px);
    border:1.5px solid rgba(255,255,255,1);
    display:flex; align-items:center; justify-content:center;
    box-shadow:0 6px 20px rgba(0,0,0,.15);
    transition:transform 350ms ease, box-shadow 350ms ease;
    z-index:3;
    animation:pcFloat 3.5s ease-in-out infinite;
  }

  .pc-content { padding:24px 28px 36px; text-align:center; flex:1; }

  .pc-glow {
    position:absolute; bottom:0; left:0; right:0; height:3px;
    background:linear-gradient(90deg,#16A34A,#22C55E,#86EFAC,#22C55E,#16A34A);
    background-size:200% auto;
    opacity:0; transition:opacity 400ms ease;
    border-radius:0 0 28px 28px;
  }

  .stat-card {
    position:relative; border-radius:20px; overflow:hidden;
    height:270px;
    transition:transform 300ms cubic-bezier(.22,.61,.36,1), box-shadow 300ms;
    cursor:pointer;
  }
  .stat-card:hover { transform:scale(1.03) translateY(-6px); box-shadow:0 24px 64px rgba(0,0,0,.35); }
  .stat-card:hover .stat-img { transform:scale(1.07); }
  .stat-num { animation:pcCount .6s ease both; }
`;

/* ─── PurposeSection ─── */
function PurposeSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [visible, setVisible] = useState<boolean[]>([false, false, false]);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs: IntersectionObserver[] = [];
    refs.current.forEach((el, i) => {
      if (!el) return;
      const o = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setVisible(p => { const n=[...p]; n[i]=true; return n; }), i * 130);
          o.disconnect();
        }
      }, { threshold: 0.15 });
      o.observe(el); obs.push(o);
    });
    return () => obs.forEach(o => o.disconnect());
  }, []);

  return (
    <section id="about" style={{ background: "#FFFFFF", padding: "100px 0 110px" }}>
      <style>{PHOTO_CARD_CSS}</style>
      <div className="container-page">
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 72px" }}>
          <span style={{ color: "#2E8B57", fontSize: "11px", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.25em", display: "block", marginBottom: "14px" }}>Our Vision</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px,5vw,60px)", fontWeight: 700, color: "#081A36", lineHeight: 1.12, margin: "0 0 20px" }}>Our Purpose</h2>
          <p style={{ color: "#5C677D", fontSize: "1.05rem", lineHeight: 1.75, margin: 0 }}>
            We awaken human potential through meditation and education. Our goal is to create conscious individuals who live joyfully and break cycles of poverty.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginTop: "20px" }}>
            <div style={{ flex: 1, maxWidth: "70px", height: "1px", background: "linear-gradient(to right, transparent, #2E8B57)" }} />
            <span style={{ fontSize: "1.3rem" }}>🌿</span>
            <div style={{ flex: 1, maxWidth: "70px", height: "1px", background: "linear-gradient(to left, transparent, #2E8B57)" }} />
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: "36px" }}>
          {PURPOSE_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                ref={el => { refs.current[i] = el; }}
                className="pc-card"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  opacity: visible[i] ? 1 : 0,
                  transform: visible[i] ? (hovered === i ? "translateY(-10px) scale(1.01)" : "translateY(0)") : "translateY(36px) scale(0.97)",
                  transition: visible[i] ? "opacity 600ms ease, transform 400ms cubic-bezier(.22,.61,.36,1), box-shadow 400ms" : "none",
                  boxShadow: hovered === i ? "0 28px 70px rgba(22,163,74,.16),0 6px 24px rgba(0,0,0,.09)" : "0 4px 20px rgba(0,0,0,.06)",
                }}
              >
                <div className="pc-img-wrap">
                  <img src={card.img} alt={card.title} className="pc-img" style={{ height: "210px" }} />
                  <div className="pc-badge"><Icon size={26} color={card.color} strokeWidth={1.6} /></div>
                </div>
                <div className="pc-content">
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "#081A36", margin: "0 0 12px" }}>{card.title}</h3>
                  <p style={{ color: "#5C677D", fontSize: "1rem", lineHeight: 1.8, margin: 0 }}>{card.desc}</p>
                </div>
                <div className="pc-glow" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── StatsSection ─── */
function StatsSection() {
  const [visible, setVisible] = useState<boolean[]>(STATS.map(() => false));
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs: IntersectionObserver[] = [];
    refs.current.forEach((el, i) => {
      if (!el) return;
      const o = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setVisible(p => { const n=[...p]; n[i]=true; return n; }), i * 100);
          o.disconnect();
        }
      }, { threshold: 0.1 });
      o.observe(el); obs.push(o);
    });
    return () => obs.forEach(o => o.disconnect());
  }, []);

  return (
    <section style={{ background: "#F8F9FA", padding: "100px 0 110px" }}>
      <div className="container-page">
        <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 64px" }}>
          <span style={{ color: "#2E8B57", fontSize: "11px", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.25em", display: "block", marginBottom: "14px" }}>Science Divine Foundation</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px,4vw,52px)", fontWeight: 700, color: "#081A36", lineHeight: 1.15, margin: 0 }}>Guiding Light in Meditation &amp; Education</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: "18px" }}>
          {STATS.map((s, i) => (
            <div
              key={i}
              ref={el => { refs.current[i] = el; }}
              className="stat-card"
              style={{
                opacity: visible[i] ? 1 : 0,
                transform: visible[i] ? "translateY(0)" : "translateY(36px) scale(0.96)",
                transition: "opacity 700ms ease, transform 500ms cubic-bezier(.22,.61,.36,1)",
              }}
            >
              {/* Background photo */}
              <img src={s.img} alt={s.label} className="stat-img" style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                objectFit: "cover", display: "block",
                transition: "transform 600ms cubic-bezier(.22,.61,.36,1)",
              }} />
              {/* Gradient overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,.82) 0%, rgba(0,0,0,.35) 55%, rgba(0,0,0,.08) 100%)",
                borderRadius: "20px",
              }} />
              {/* Text */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                padding: "24px 20px",
              }}>
                {visible[i] && (
                  <div className="stat-num" style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(2.35rem,3.7vw,3.7rem)",
                    fontWeight: 800,
                    color: "#D4AF37",
                    lineHeight: 1,
                    marginBottom: "8px",
                  }}>{s.value}</div>
                )}
                <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#FFFFFF", marginBottom: "6px", lineHeight: 1.25 }}>{s.label}</div>
                <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,.78)", lineHeight: 1.45 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TransformSection ─── */
function TransformSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [visible, setVisible] = useState<boolean[]>([false, false, false]);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs: IntersectionObserver[] = [];
    refs.current.forEach((el, i) => {
      if (!el) return;
      const o = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setVisible(p => { const n=[...p]; n[i]=true; return n; }), i * 130);
          o.disconnect();
        }
      }, { threshold: 0.15 });
      o.observe(el); obs.push(o);
    });
    return () => obs.forEach(o => o.disconnect());
  }, []);

  return (
    <section style={{ background: "#FFFFFF", padding: "100px 0 110px" }}>
      <div className="container-page">
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 72px" }}>
          <span style={{ color: "#2E8B57", fontSize: "11px", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.25em", display: "block", marginBottom: "14px" }}>Personal Growth</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px,5vw,72px)", fontWeight: 700, color: "#081A36", lineHeight: 1.1, margin: "0 0 20px" }}>Transform Your Life</h2>
          <div style={{ width: "48px", height: "3px", background: "linear-gradient(90deg,#16A34A,#22C55E)", borderRadius: "2px", margin: "0 auto" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: "40px" }}>
          {PROBLEMS.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                ref={el => { refs.current[i] = el; }}
                className="pc-card"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  opacity: visible[i] ? 1 : 0,
                  transform: visible[i] ? (hovered === i ? "translateY(-10px) scale(1.01)" : "translateY(0)") : "translateY(36px) scale(0.97)",
                  transition: visible[i] ? "opacity 600ms ease, transform 400ms cubic-bezier(.22,.61,.36,1), box-shadow 400ms" : "none",
                  boxShadow: hovered === i ? "0 28px 70px rgba(22,163,74,.16),0 6px 24px rgba(0,0,0,.09)" : "0 4px 20px rgba(0,0,0,.06)",
                }}
              >
                <div className="pc-img-wrap">
                  <img src={p.img} alt={p.title} className="pc-img" style={{ height: "320px" }} />
                  <div className="pc-badge"><Icon size={26} color={p.color} strokeWidth={1.6} /></div>
                </div>
                <div className="pc-content">
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "#081A36", margin: "0 0 12px" }}>{p.title}</h3>
                  <p style={{ color: "#5C677D", fontSize: "1rem", lineHeight: 1.8, margin: 0 }}>{p.desc}</p>
                </div>
                <div className="pc-glow" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── How We Work Premium Component ─── */
function HowWeWorkSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [visible, setVisible] = useState<boolean[]>([false, false, false, false]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    cardRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisible((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * 120);
            observer.disconnect();
          }
        },
        { threshold: 0.12 }
      );
      observer.observe(ref);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section style={{ background: "#FFFFFF", padding: "100px 0 120px", overflow: "hidden" }}>
      <style>{`
        @keyframes howFloatBadge {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes howShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .how-card {
          background: #FFFFFF;
          border: 1px solid #ECECEC;
          border-radius: 28px;
          overflow: hidden;
          transition: transform 450ms cubic-bezier(.22,1,.36,1), box-shadow 450ms cubic-bezier(.22,1,.36,1);
          cursor: pointer;
          position: relative;
        }
        .how-card:hover {
          transform: translateY(-14px) scale(1.01);
          box-shadow: 0 32px 80px rgba(22,163,74,0.18), 0 8px 32px rgba(0,0,0,0.10);
        }
        .how-card:hover .how-img {
          transform: scale(1.08);
        }
        .how-card:hover .how-step-badge {
          transform: scale(1.12);
        }
        .how-card:hover .how-icon-badge {
          box-shadow: 0 12px 36px rgba(22,163,74,0.25);
        }
        .how-img {
          width: 100%;
          height: 300px;
          object-fit: cover;
          display: block;
          transition: transform 650ms cubic-bezier(.22,1,.36,1);
        }
        .how-step-badge {
          position: absolute;
          top: 18px;
          left: 18px;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, #16A34A, #22C55E);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 1.15rem;
          font-weight: 800;
          font-family: 'Inter', sans-serif;
          letter-spacing: -0.02em;
          box-shadow: 0 6px 20px rgba(22,163,74,0.4);
          transition: transform 450ms cubic-bezier(.22,1,.36,1);
          z-index: 2;
        }
        .how-icon-badge {
          position: absolute;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 28px rgba(0,0,0,0.12);
          transition: box-shadow 450ms ease;
          z-index: 3;
          animation: howFloatBadge 3s ease-in-out infinite;
        }
        .how-glow {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #16A34A, #22C55E, #86EFAC, #22C55E, #16A34A);
          background-size: 200% auto;
          opacity: 0;
          transition: opacity 450ms ease;
          border-radius: 0 0 28px 28px;
        }
        .how-card:hover .how-glow {
          opacity: 1;
          animation: howShimmer 2s linear infinite;
        }
      `}</style>

      <div className="container-page">
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 72px" }}>
          <span style={{
            color: "#2E8B57",
            fontSize: "11px",
            fontWeight: 700,
            textTransform: "uppercase" as const,
            letterSpacing: "0.3em",
            display: "block",
            marginBottom: "16px",
          }}>How We Work</span>

          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(38px, 5vw, 72px)",
            fontWeight: 700,
            color: "#081A36",
            lineHeight: 1.12,
            margin: "0 0 28px",
          }}>Our Process,<br />Your Transformation</h2>

          {/* Lotus divider */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
            <div style={{ flex: 1, maxWidth: "80px", height: "1px", background: "linear-gradient(to right, transparent, #2E8B57)" }} />
            <span style={{ fontSize: "1.5rem", lineHeight: 1 }}>🪷</span>
            <div style={{ flex: 1, maxWidth: "80px", height: "1px", background: "linear-gradient(to left, transparent, #2E8B57)" }} />
          </div>
        </div>

        {/* Cards Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "32px",
        }}>
          {HOW_WE_WORK.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="how-card"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  opacity: visible[i] ? 1 : 0,
                  transform: visible[i]
                    ? hovered === i ? "translateY(-14px) scale(1.01)" : "translateY(0) scale(1)"
                    : "translateY(40px) scale(0.97)",
                  transition: visible[i]
                    ? "opacity 600ms ease, transform 450ms cubic-bezier(.22,1,.36,1), box-shadow 450ms cubic-bezier(.22,1,.36,1)"
                    : "none",
                  boxShadow: hovered === i
                    ? `0 32px 80px rgba(22,163,74,0.18), 0 8px 32px rgba(0,0,0,0.10)`
                    : "0 4px 24px rgba(0,0,0,0.06)",
                }}
              >
                {/* Image area */}
                <div style={{ position: "relative", overflow: "hidden", borderRadius: "28px 28px 0 0" }}>
                  <img
                    src={step.img}
                    alt={step.title}
                    className="how-img"
                  />
                  {/* Step badge */}
                  <div className="how-step-badge">{step.num}</div>
                  {/* Soft overlay */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(8,26,54,0.30) 0%, transparent 55%)",
                    pointerEvents: "none"
                  }} />
                </div>

                {/* Floating icon badge - sits between image and content */}
                <div style={{ position: "relative", height: "56px" }}>
                  <div className="how-icon-badge">
                    <Icon size={28} color={step.color} strokeWidth={1.5} />
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "10px 28px 36px", textAlign: "center" }}>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.45rem",
                    fontWeight: 700,
                    color: "#081A36",
                    margin: "0 0 14px",
                    lineHeight: 1.25,
                  }}>{step.title}</h3>
                  <p style={{
                    color: "#5C677D",
                    fontSize: "1rem",
                    lineHeight: 1.8,
                    margin: 0,
                  }}>{step.desc}</p>
                </div>

                {/* Bottom glow on hover */}
                <div className="how-glow" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Component ─── */
function Page() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div style={{ background: "#FFFFFF", color: "#1E293B", fontFamily: "'Inter', sans-serif" }}>

      {/* ═══ HERO ═══ */}
      <section style={{
        background: "#FCF8F1",
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}>
        <style>{`
          @keyframes heroFadeUp { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
          @keyframes heroFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
          @keyframes mandalaRotate { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
          @keyframes particleFloat {
            0%{transform:translateY(0) translateX(0);opacity:0}
            30%{opacity:.7}
            70%{opacity:.4}
            100%{transform:translateY(-120px) translateX(20px);opacity:0}
          }
          @keyframes heroPulse { 0%,100%{opacity:.35} 50%{opacity:.55} }
          @keyframes typewriter { from{opacity:0;letter-spacing:.3em} to{opacity:1;letter-spacing:-.02em} }
          .hero-line-1{animation:heroFadeUp .8s .1s both}
          .hero-line-2{animation:typewriter 1.2s .4s both}
          .hero-line-3{animation:heroFadeUp .8s .7s both}
          .hero-sub{animation:heroFadeUp .8s .9s both}
          .hero-btns{animation:heroFadeUp .8s 1.1s both}
          .hero-stats{animation:heroFadeUp .8s 1.3s both}
          .hero-img-wrap{animation:heroFadeUp 1s .3s both}
          .hero-btn-primary{
            display:inline-flex;align-items:center;gap:10px;
            background:linear-gradient(135deg,#C9910B,#D4AF37,#E6C84A,#C9910B);
            background-size:200% auto;
            color:#fff;padding:16px 36px;border-radius:100px;
            font-weight:700;font-size:1rem;text-decoration:none;
            box-shadow:0 10px 32px rgba(212,175,55,.40);
            transition:background-position .4s,box-shadow .4s,transform .2s;
          }
          .hero-btn-primary:hover{background-position:right center;box-shadow:0 14px 40px rgba(212,175,55,.55);transform:translateY(-2px)}
          .hero-btn-primary:hover .hero-arrow{transform:translateX(4px)}
          .hero-arrow{transition:transform .3s}
          .hero-btn-secondary{
            display:inline-flex;align-items:center;gap:10px;
            background:rgba(255,255,255,.7);
            border:1.5px solid rgba(212,175,55,.5);
            color:#081A36;padding:16px 36px;border-radius:100px;
            font-weight:600;font-size:1rem;text-decoration:none;
            backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
            transition:background .4s,border-color .4s,transform .2s;
          }
          .hero-btn-secondary:hover{background:rgba(212,175,55,.1);border-color:#D4AF37;transform:translateY(-2px)}
          .hero-stat-sep{width:1px;height:40px;background:rgba(8,26,54,.15)}
          .particle{
            position:absolute;
            border-radius:50%;
            background:radial-gradient(circle,#D4AF37,rgba(212,175,55,0));
            animation:particleFloat linear infinite;
            pointer-events:none;
          }
        `}</style>

        {/* ── Ambient golden radial glow top-left ── */}
        <div style={{
          position:"absolute",top:"-10%",left:"-5%",
          width:"600px",height:"600px",
          background:"radial-gradient(circle,rgba(212,175,55,.13) 0%,transparent 70%)",
          borderRadius:"50%",pointerEvents:"none",
        }}/>
        {/* ── Ambient glow bottom-right ── */}
        <div style={{
          position:"absolute",bottom:"-10%",right:"45%",
          width:"500px",height:"500px",
          background:"radial-gradient(circle,rgba(46,139,87,.09) 0%,transparent 70%)",
          borderRadius:"50%",pointerEvents:"none",
        }}/>

        {/* ── Floating particles ── */}
        {[{s:8,l:"15%",b:"20%",d:"6s",del:"0s"},{s:6,l:"20%",b:"40%",d:"8s",del:"1s"},{s:10,l:"8%",b:"60%",d:"7s",del:"2s"},{s:5,l:"30%",b:"15%",d:"9s",del:"3s"}].map((p,i)=>(
          <div key={i} className="particle" style={{width:`${p.s}px`,height:`${p.s}px`,left:p.l,bottom:p.b,animationDuration:p.d,animationDelay:p.del,opacity:.6}}/>
        ))}

        <div className="container-page" style={{ position:"relative",zIndex:1,width:"100%",padding:"120px 24px 80px" }}>
          <div style={{
            display:"grid",
            gridTemplateColumns:"1fr 1fr",
            gap:"64px",
            alignItems:"center",
            maxWidth:"1400px",
            margin:"0 auto",
          }}>

            {/* ── LEFT: Content ── */}
            <div>
              {/* Pill badge */}
              <div className="hero-line-1" style={{
                display:"inline-flex",alignItems:"center",gap:"10px",
                background:"rgba(255,255,255,.80)",
                border:"1.5px solid rgba(212,175,55,.5)",
                borderRadius:"100px",padding:"8px 20px",
                marginBottom:"32px",
                backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",
              }}>
                <span style={{fontSize:"1rem"}}>🪷</span>
                <span style={{color:"#8B6914",fontSize:"11px",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase" as const}}>
                  Sound Body &bull; Sound Mind &bull; Self Realization
                </span>
              </div>

              {/* Headline */}
              <h1 style={{fontFamily:"'Playfair Display',serif",lineHeight:1.06,fontWeight:700,margin:"0 0 20px"}}>
                <span className="hero-line-1" style={{display:"block",fontSize:"clamp(42px,5.5vw,82px)",color:"#081A36"}}>Awaken Your</span>
                <span className="hero-line-2" style={{
                  display:"block",
                  fontSize:"clamp(42px,5.5vw,82px)",
                  fontStyle:"italic",
                  background:"linear-gradient(135deg,#B8860B 0%,#D4AF37 40%,#E6C84A 60%,#C9910B 100%)",
                  WebkitBackgroundClip:"text",backgroundClip:"text",color:"transparent",
                }}>True Potential</span>
                <span className="hero-line-3" style={{display:"block",fontSize:"clamp(42px,5.5vw,82px)",color:"#081A36"}}>with Science Divine</span>
                <span className="hero-line-3" style={{display:"block",fontSize:"clamp(42px,5.5vw,82px)",color:"#081A36"}}>Movement</span>
              </h1>

              {/* Lotus divider */}
              <div className="hero-sub" style={{display:"flex",alignItems:"center",gap:"12px",margin:"0 0 24px"}}>
                <div style={{flex:1,maxWidth:"80px",height:"1px",background:"linear-gradient(to right,transparent,#D4AF37)"}}/>
                <span style={{fontSize:"1.1rem"}}>🪷</span>
                <div style={{flex:1,maxWidth:"80px",height:"1px",background:"linear-gradient(to left,transparent,#D4AF37)"}}/>
              </div>

              {/* Subtitle */}
              <p className="hero-sub" style={{fontSize:"1.1rem",color:"#5C677D",lineHeight:1.8,maxWidth:"580px",margin:"0 0 40px"}}>
                Journey towards conscious living through Sound Body, Sound Mind, and Self-Realization — guided by enlightened master{" "}
                <strong style={{color:"#D4AF37",fontWeight:700}}>Sakshi Shree</strong>.
              </p>

              {/* Buttons */}
              <div className="hero-btns" style={{display:"flex",flexWrap:"wrap" as const,gap:"16px",marginBottom:"52px"}}>
                <a href="/about" className="hero-btn-primary">
                  Meet Sakshi Shree <ArrowRight size={18} className="hero-arrow" />
                </a>
                <a href="/programs" className="hero-btn-secondary">
                  Explore Programs
                </a>
              </div>

              {/* Stats */}
              <div className="hero-stats" style={{display:"flex",alignItems:"center",gap:"32px",flexWrap:"wrap" as const}}>
                {[
                  {num:"5M+",label:"Lives Impacted"},
                  {num:"40+",label:"Years of Wisdom"},
                  {num:"1000+",label:"Meditation Programs"},
                ].map((s,i)=>(
                  <>
                    {i>0 && <div key={`sep-${i}`} className="hero-stat-sep"/>}
                    <div key={i} style={{textAlign:"center"}}>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.8rem",fontWeight:800,color:"#D4AF37",lineHeight:1}}>{s.num}</div>
                      <div style={{fontSize:"0.78rem",color:"#5C677D",marginTop:"4px",fontWeight:500,letterSpacing:"0.06em",textTransform:"uppercase" as const}}>{s.label}</div>
                    </div>
                  </>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Guru Portrait with golden mandala ── */}
            <div className="hero-img-wrap" style={{position:"relative",display:"flex",alignItems:"center",justifyContent:"center"}}>
              {/* Outer golden glow ring — slow rotate */}
              <div style={{
                position:"absolute",
                width:"90%",aspectRatio:"1",
                borderRadius:"50%",
                background:"radial-gradient(circle,rgba(212,175,55,.30) 0%,rgba(212,175,55,.12) 40%,transparent 70%)",
                animation:"heroPulse 4s ease-in-out infinite",
                pointerEvents:"none",
              }}/>
              {/* Mandala ring */}
              <div style={{
                position:"absolute",
                width:"75%",aspectRatio:"1",
                borderRadius:"50%",
                border:"1.5px solid rgba(212,175,55,.25)",
                boxShadow:"0 0 60px rgba(212,175,55,.20), inset 0 0 60px rgba(212,175,55,.08)",
                animation:"heroPulse 5s 1s ease-in-out infinite",
                pointerEvents:"none",
              }}/>
              {/* Inner halo */}
              <div style={{
                position:"absolute",
                width:"55%",aspectRatio:"1",
                borderRadius:"50%",
                background:"radial-gradient(circle,rgba(255,240,180,.55) 0%,rgba(252,248,241,.0) 70%)",
                pointerEvents:"none",
              }}/>
              {/* Guru image — floating */}
              <img
                src="https://sciencedivine.org/wp-content/uploads/2025/02/7.webp"
                alt="Guru Sakshi Shree"
                style={{
                  position:"relative",zIndex:2,
                  width:"100%",maxWidth:"560px",
                  height:"auto",
                  objectFit:"contain",
                  filter:"drop-shadow(0 30px 60px rgba(0,0,0,.18))",
                  animation:"heroFloat 6s ease-in-out infinite",
                }}
              />
              {/* Floating particles around portrait */}
              {[{t:"15%",r:"8%",s:10,d:"5s",del:"0s"},{t:"55%",r:"3%",s:7,d:"7s",del:"1.5s"},{t:"80%",r:"12%",s:5,d:"6s",del:"3s"},{t:"25%",l:"5%",s:8,d:"8s",del:"2s"}].map((p,i)=>(
                <div key={i} className="particle" style={{
                  width:`${p.s}px`,height:`${p.s}px`,
                  top:p.t,
                  ...('right' in p ? {right:p.r} : {}),
                  ...('left' in p ? {left:p.l} : {}),
                  animationDuration:p.d,animationDelay:p.del,opacity:.7,zIndex:3,
                }}/>
              ))}
            </div>
          </div>
        </div>

        {/* Responsive override */}
        <style>{`
          @media (max-width:900px){
            .hero-grid{grid-template-columns:1fr!important}
            .hero-img-wrap{margin-top:40px}
          }
        `}</style>
      </section>

      {/* ═══ COMMITMENT ═══ */}
      <section style={{ background: "#FFFDF9", padding: "80px 0" }}>
        <div className="container-page">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px", alignItems: "center" }}>
            <div style={{ textAlign: "center", position: "relative" }}>
              <img src="https://sciencedivine.org/wp-content/uploads/2025/02/6.png" alt="Sakshi Shree commitment" style={{ width: "100%", maxWidth: "400px", height: "auto", margin: "0 auto", display: "block" }} />
            </div>
            <div>
              <span style={{ color: "#22C55E", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>Sakshi Shree's Commitment</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#0F172A", marginTop: "8px", marginBottom: "20px" }}>
                To create a new human being flourishing on earth, which is only possible through education and meditation.
              </h2>
              <p style={{ color: "#64748B", fontSize: "1rem", lineHeight: 1.7 }}>
                A visionary movement by Guru Sakshi Shree and the Science Divine Foundation, Har Ghar Shiksha, Har Ghar Dhyan brings together ancient wisdom and modern science to transform lives across communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ANIMATED TEXT TICKER ═══ */}
      <div style={{
        background:"linear-gradient(90deg,#FCF8F1,#FFF9EE,#FCF8F1)",
        padding:"22px 0",overflow:"hidden",
        borderTop:"1px solid rgba(212,175,55,.2)",
        borderBottom:"1px solid rgba(212,175,55,.2)",
      }}>
        <div style={{display:"flex",gap:"0",animation:"ticker 30s linear infinite",width:"max-content",alignItems:"center"}}>
          {[...TICKER_PHRASES,...TICKER_PHRASES,...TICKER_PHRASES].map((phrase,i)=>(
            <>
              <span
                key={`phrase-${i}`}
                style={{
                  display:"inline-block",
                  fontFamily:"'Playfair Display',serif",
                  fontSize:"0.95rem",
                  fontWeight:600,
                  color:"#4A3506",
                  letterSpacing:"0.04em",
                  padding:"0 24px",
                  whiteSpace:"nowrap" as const,
                }}
              >{phrase}</span>
              <span key={`dot-${i}`} style={{color:"#D4AF37",fontSize:"1.1rem",flexShrink:0}}>🪷</span>
            </>
          ))}
        </div>
        <style>{`@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-33.33%); } }`}</style>
      </div>

      {/* ═══ OUR PURPOSE ═══ */}
      <PurposeSection />

      {/* ═══ STATS ═══ */}
      <StatsSection />

      {/* ═══ SOLVE REAL PROBLEMS ═══ */}
      <TransformSection />

      {/* ═══ HOW WE WORK ═══ */}
      <HowWeWorkSection />

      {/* ═══ EVENTS GALLERY ═══ */}
      <section style={{ background: "#FFFFFF", padding: "80px 0" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ color: "#22C55E", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>Our</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "#0F172A", marginTop: "4px" }}>Events</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", overflow: "hidden" }}>
            {[EVENTS_ROW1, EVENTS_ROW2, EVENTS_ROW3].map((row, ri) => (
              <div key={ri} style={{ display: "flex", gap: "16px", overflowX: "auto", paddingBottom: "8px" }}>
                {[...row, ...row].map((img, i) => (
                  <img key={i} src={img} alt={`Event ${ri}-${i}`} style={{ height: "180px", width: "auto", minWidth: "260px", objectFit: "cover", borderRadius: "16px", flexShrink: 0 }} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VOLUNTEERS ═══ */}
      <section style={{ background: "#F0FDF4", padding: "80px 0" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#0F172A" }}>Our Dedicated Volunteers</h2>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "32px", flexWrap: "wrap" }}>
            {VOLUNTEERS.map((v, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <img src={v.img} alt={v.name} style={{ width: "120px", height: "120px", borderRadius: "100px", objectFit: "cover", margin: "0 auto 12px", display: "block", border: "3px solid #22C55E" }} />
                <div style={{ fontWeight: 700, color: "#0F172A" }}>{v.name}</div>
                <div style={{ fontSize: "0.8rem", color: "#64748B" }}>{v.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ JOIN CTA ═══ */}
      <section style={{ background: "linear-gradient(135deg, #1E3A2A, #0F172A)", padding: "80px 0", textAlign: "center" }}>
        <div className="container-page" style={{ maxWidth: "700px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "16px" }}>Join the Divine Movement</h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "32px" }}>
            Together, we can bring the light of education to every underprivileged child and the peace of meditation to every troubled mind.
          </p>
          <a href="#donate" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg, #22C55E, #16A34A)", color: "#FFFFFF", padding: "16px 40px", borderRadius: "100px", fontWeight: 700, fontSize: "1rem", textDecoration: "none", boxShadow: "0 8px 30px rgba(34,197,94,0.3)" }}>
            Join Us Now <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section style={{ background: "#FFFFFF", padding: "80px 0" }}>
        <div className="container-page" style={{ maxWidth: "800px" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={{ color: "#22C55E", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>They Believe In Us</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "#0F172A", marginTop: "8px" }}>Transformative Experiences</h2>
          </div>

          <div style={{ background: "#F0FDF4", border: "1px solid #DCFCE7", borderRadius: "20px", padding: "40px", marginBottom: "24px" }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "#1E293B", lineHeight: 1.75, marginBottom: "24px", fontStyle: "italic" }}>
              "{TESTIMONIALS[activeTestimonial].quote}"
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <img src={TESTIMONIALS[activeTestimonial].img} alt={TESTIMONIALS[activeTestimonial].name} style={{ width: "48px", height: "48px", borderRadius: "100px", objectFit: "cover" }} />
              <div>
                <div style={{ fontWeight: 700, color: "#0F172A" }}>— {TESTIMONIALS[activeTestimonial].name}</div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} style={{ width: i === activeTestimonial ? "28px" : "8px", height: "8px", borderRadius: "100px", background: i === activeTestimonial ? "#22C55E" : "#CBD5E1", border: "none", cursor: "pointer", transition: "all 0.3s" }} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT / DONATE FORM ═══ */}
      <section id="donate" style={{ background: "#FAF9F6", padding: "80px 0" }}>
        <div className="container-page" style={{ maxWidth: "640px" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: "#0F172A", marginBottom: "8px" }}>Donate to make a child's future brighter!</h2>
            <p style={{ color: "#64748B", fontSize: "0.95rem" }}>Drop us a line and keep in touch</p>
          </div>

          {sent ? (
            <div style={{ background: "#F0FDF4", border: "1px solid #DCFCE7", borderRadius: "20px", padding: "40px", textAlign: "center" }}>
              <div style={{ fontSize: "2rem", marginBottom: "12px" }}>🌿</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, color: "#0F172A" }}>Thank you for reaching out!</h3>
              <p style={{ color: "#64748B", marginTop: "8px" }}>We will get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "20px", padding: "40px", display: "flex", flexDirection: "column", gap: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.02)" }}>
              {[
                { key: "name", label: "Name", placeholder: "Your Name", type: "text" },
                { key: "phone", label: "Phone Number", placeholder: "+91 99999 99999", type: "tel" },
                { key: "email", label: "Email", placeholder: "you@example.com", type: "email" },
              ].map((field) => (
                <div key={field.key}>
                  <label htmlFor={field.key} style={{ fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>{field.label}</label>
                  <input required id={field.key} type={field.type} placeholder={field.placeholder} value={(formData as Record<string, string>)[field.key]} onChange={(e) => setFormData((p) => ({ ...p, [field.key]: e.target.value }))} style={{ width: "100%", background: "#FAF9F6", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "12px 16px", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" }} />
                </div>
              ))}
              <div>
                <label htmlFor="message" style={{ fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Message</label>
                <textarea id="message" rows={4} placeholder="Your message..." value={formData.message} onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))} style={{ width: "100%", background: "#FAF9F6", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "12px 16px", fontSize: "0.9rem", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
              </div>
              <button type="submit" style={{ background: "linear-gradient(135deg, #22C55E, #16A34A)", color: "#FFFFFF", border: "none", borderRadius: "100px", padding: "14px 28px", fontWeight: 800, fontSize: "0.95rem", cursor: "pointer" }}>
                Send
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}





