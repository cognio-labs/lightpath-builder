"use client";
import Link from "next/link";

import { SectionHeading } from "@/components/PageHero";
import { ArrowRight, Heart, Star, Users, Globe, BookOpen, Sparkles } from "lucide-react";




const TIMELINE = [
  {
    date: "Dec 1999",
    year: "1999",
    title: "The Movement is Born",
    desc: "The Science Divine Movement was born, heralding a new era of spiritual exploration and personal transformation, dedicated to guiding individuals towards inner wisdom, empowerment, and enlightenment.",
    icon: <Sparkles size={20} />,
    color: "#D4AF37",
  },
  {
    date: "Feb 2004",
    year: "2004",
    title: "Jhuggi Jhopadi Shiksha Sewa Mission",
    desc: "Marked a pivotal moment as we established the Jhuggi Jhopadi Shiksha Sewa Mission, a school for underprivileged children, embodying our core values of compassion, education, and social responsibility.",
    icon: <BookOpen size={20} />,
    color: "#3B82F6",
  },
  {
    date: "Aug 2017",
    year: "2017",
    title: "Sakshi Dham International, Vrindavan",
    desc: "The monumental event of August 2017 witnessed the laying of the foundation stone for Sakshi Dham International in Vrindavan ,  a sacred sanctuary to inspire spiritual seekers and promote unity, peace, and harmony.",
    icon: <Globe size={20} />,
    color: "#8B5CF6",
  },
  {
    date: "Jan 2024",
    year: "2024",
    title: "Teach and Learn Movement",
    desc: "A significant milestone with the launch of the Teach and Learn movement. This transformative initiative brings together Science Divine volunteers to teach underprivileged children essential skills, empowering them for a future of success.",
    icon: <Users size={20} />,
    color: "#10B981",
  },
];

const STATS = [
  { number: "25+", label: "Years of Service", icon: <Star size={20} /> },
  { number: "1.5M+", label: "Lives Touched", icon: <Heart size={20} /> },
  { number: "50+", label: "Countries Reached", icon: <Globe size={20} /> },
  { number: "1000+", label: "Volunteers Worldwide", icon: <Users size={20} /> },
];

const PILLARS = [
  {
    title: "Meditation & Mindfulness",
    desc: "Ancient techniques adapted for modern life to cultivate stillness, awareness, and inner peace in today's fast-paced world.",
    icon: "🧘",
    color: "rgba(212,175,55,0.08)",
    border: "rgba(212,175,55,0.3)",
    accent: "#D4AF37",
  },
  {
    title: "Education & Youth Empowerment",
    desc: "Transforming the next generation through free quality education, mentoring, and skill-building for underprivileged children.",
    icon: "📚",
    color: "rgba(59,130,246,0.08)",
    border: "rgba(59,130,246,0.3)",
    accent: "#3B82F6",
  },
  {
    title: "Service & Community",
    desc: "From Annapurna Sewa to Shiksha Sewa, our volunteers embody selfless service as the highest form of spiritual practice.",
    icon: "🤲",
    color: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.3)",
    accent: "#10B981",
  },
  {
    title: "Spiritual Transformation",
    desc: "Guiding individuals toward self-realization and conscious living without renouncing the material comforts of modern life.",
    icon: "✨",
    color: "rgba(139,92,246,0.08)",
    border: "rgba(139,92,246,0.3)",
    accent: "#8B5CF6",
  },
];

export default function Page() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(135deg, #FFFFFF 0%, #FDFCF8 60%, #FFF9EC 100%)",
          paddingTop: "120px",
          paddingBottom: "80px",
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid #F0EDE4",
        }}
      >
        {/* Decorative circle top-right */}
        <div
          style={{
            position: "absolute",
            top: "-150px",
            right: "-100px",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 65%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "10%",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 65%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />

        <div className="container-page" style={{ position: "relative", zIndex: 1 }}>
          {/* Eyebrow */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(212,175,55,0.1)",
              border: "1px solid rgba(212,175,55,0.3)",
              borderRadius: "100px",
              padding: "6px 18px",
              marginBottom: "28px",
            }}
          >
            <Sparkles size={14} style={{ color: "#D4AF37" }} />
            <span style={{ color: "#B45309", fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Our Story Since 1999
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "60px", alignItems: "center" }}>
            <div>
              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  fontWeight: 700,
                  color: "#0F172A",
                  lineHeight: 1.15,
                  marginBottom: "20px",
                }}
              >
                Science Divine{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #F59E0B, #D4AF37)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Movement
                </span>
              </h1>

              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.5rem",
                  fontStyle: "italic",
                  color: "#6B7280",
                  marginBottom: "24px",
                  lineHeight: 1.6,
                }}
              >
                Sound Body · Sound Mind · Self Realisation
              </p>

              <p
                style={{
                  fontSize: "1.05rem",
                  color: "#4B5563",
                  lineHeight: 1.85,
                  maxWidth: "600px",
                  marginBottom: "40px",
                }}
              >
                Conceptualized by the enlightened master and divine messenger Sakshi Shree, the Science Divine Movement takes the message of love, awareness, and meditation to the world. Inspired by his rendezvous with spirituality, Sakshi Shree guides the movement ,  allowing the commoner to experience spirituality and self-realization without renouncing the material comforts of life.
              </p>

              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <Link
                  href="/about-sakshi-shree"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "linear-gradient(135deg, #F59E0B, #D4AF37)",
                    color: "#0F172A",
                    padding: "14px 28px",
                    borderRadius: "100px",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    boxShadow: "0 4px 20px rgba(212,175,55,0.35)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(212,175,55,0.5)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(212,175,55,0.35)";
                  }}
                >
                  Meet Sakshi Shree <ArrowRight size={16} />
                </Link>
                <Link
                  href="/book-session"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "transparent",
                    border: "2px solid rgba(212,175,55,0.5)",
                    color: "#B45309",
                    padding: "14px 28px",
                    borderRadius: "100px",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    transition: "border-color 0.2s, color 0.2s",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#D4AF37";
                    (e.currentTarget as HTMLElement).style.color = "#D4AF37";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,175,55,0.5)";
                    (e.currentTarget as HTMLElement).style.color = "#B45309";
                  }}
                >
                  Join the Movement
                </Link>
              </div>
            </div>

            {/* Hero image */}
            <div
              style={{
                width: "340px",
                flexShrink: 0,
                display: "none",
              }}
              className="md:block"
            />
          </div>
        </div>
      </section>

      {/* ─── Stats Strip ──────────────────────────────────────── */}
      <section style={{ background: "linear-gradient(135deg, #F59E0B 0%, #D4AF37 100%)", padding: "48px 0" }}>
        <div className="container-page">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "24px",
            }}
          >
            {STATS.map((s, i) => (
              <div
                key={i}
                style={{
                  textAlign: "center",
                  padding: "16px",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "48px",
                    height: "48px",
                    background: "rgba(255,255,255,0.2)",
                    borderRadius: "12px",
                    color: "#0F172A",
                    marginBottom: "12px",
                  }}
                >
                  {s.icon}
                </div>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "2.25rem",
                    fontWeight: 800,
                    color: "#0F172A",
                    lineHeight: 1,
                  }}
                >
                  {s.number}
                </div>
                <div
                  style={{
                    color: "rgba(15,23,42,0.75)",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    marginTop: "6px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Mission ──────────────────────────────────────────── */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "72px",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(212,175,55,0.1)",
                  border: "1px solid rgba(212,175,55,0.25)",
                  borderRadius: "100px",
                  padding: "5px 14px",
                  marginBottom: "20px",
                }}
              >
                <span style={{ color: "#B45309", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Our Mission
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  fontWeight: 700,
                  color: "#0F172A",
                  lineHeight: 1.25,
                  marginBottom: "24px",
                }}
              >
                Igniting a{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #F59E0B, #D4AF37)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Transformative Journey
                </span>
              </h2>
              <p style={{ color: "#4B5563", lineHeight: 1.85, marginBottom: "20px", fontSize: "1rem" }}>
                Our mission at the Science Divine Movement is to ignite a transformative journey for individuals seeking spiritual growth and personal fulfillment. Through accessible teachings and holistic practices, we empower our community to awaken their inner potential, cultivate a deeper understanding of themselves, and embrace a path of conscious living.
              </p>
              <p style={{ color: "#4B5563", lineHeight: 1.85, marginBottom: "32px", fontSize: "1rem" }}>
                We believe in fostering a supportive and inclusive environment where individuals can explore their spiritual journey, connect with like-minded souls, and contribute positively to the collective consciousness. At the core of our mission is the belief that every individual has the power to create positive change within themselves and the world around them.
              </p>
              <Link
                href="/book-session"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "linear-gradient(135deg, #F59E0B, #D4AF37)",
                  color: "#0F172A",
                  padding: "14px 28px",
                  borderRadius: "100px",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  boxShadow: "0 4px 20px rgba(212,175,55,0.3)",
                }}
              >
                Start Your Journey <ArrowRight size={16} />
              </Link>
            </div>
            <div style={{ position: "relative" }}>
              <img
                src="https://sciencedivine.org/wp-content/uploads/2024/05/aboutsakshishree.jpg"
                alt="Sakshi Shree ,  Mission"
                loading="lazy"
                style={{
                  width: "100%",
                  borderRadius: "24px",
                  boxShadow: "0 24px 80px rgba(0,0,0,0.12)",
                  display: "block",
                }}
              />
              {/* Gold accent frame */}
              <div
                style={{
                  position: "absolute",
                  inset: "-12px",
                  border: "2px solid rgba(212,175,55,0.25)",
                  borderRadius: "28px",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Vision ───────────────────────────────────────────── */}
      <section className="section-pad" style={{ background: "#FAFAF8" }}>
        <div className="container-page">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "72px",
              alignItems: "center",
            }}
          >
            <div style={{ position: "relative" }}>
              <img
                src="https://sciencedivine.org/wp-content/uploads/2025/03/digital-composite-image-businessman-writing-vision-text-office-1-scaled.webp"
                alt="Our Vision"
                loading="lazy"
                style={{
                  width: "100%",
                  borderRadius: "24px",
                  boxShadow: "0 24px 80px rgba(0,0,0,0.1)",
                  display: "block",
                }}
              />
              {/* Floating quote card */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-24px",
                  right: "-24px",
                  background: "linear-gradient(135deg, #F59E0B, #D4AF37)",
                  borderRadius: "20px",
                  padding: "20px 24px",
                  maxWidth: "220px",
                  boxShadow: "0 16px 40px rgba(212,175,55,0.35)",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "0.95rem",
                    fontStyle: "italic",
                    color: "#0F172A",
                    lineHeight: 1.5,
                    marginBottom: "8px",
                  }}
                >
                  "Every individual possesses a unique spark of divinity."
                </p>
                <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "rgba(15,23,42,0.7)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  ,  Sakshi Shree
                </p>
              </div>
            </div>

            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(212,175,55,0.1)",
                  border: "1px solid rgba(212,175,55,0.25)",
                  borderRadius: "100px",
                  padding: "5px 14px",
                  marginBottom: "20px",
                }}
              >
                <span style={{ color: "#B45309", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Our Vision
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  fontWeight: 700,
                  color: "#0F172A",
                  lineHeight: 1.25,
                  marginBottom: "24px",
                }}
              >
                A{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #F59E0B, #D4AF37)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Conscious Humanity
                </span>
              </h2>
              <p style={{ color: "#4B5563", lineHeight: 1.85, marginBottom: "20px" }}>
                Our vision at the Science Divine Movement is rooted in the belief that every individual possesses a unique spark of divinity and potential for profound personal transformation. We envision a world where spiritual wisdom and holistic practices are accessible to all, guiding individuals on a transformative journey of inner awakening and empowerment.
              </p>
              <p style={{ color: "#4B5563", lineHeight: 1.85, marginBottom: "32px" }}>
                We envision a global community where individuals are empowered to live authentically, manifest their dreams, and contribute positively to the collective consciousness. Our vision is to ignite a movement of spiritual growth, compassion, and unity, creating a brighter and more enlightened future for generations to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Four Pillars ─────────────────────────────────────── */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="What We Stand For"
            title="Our Four Pillars"
            subtitle="The foundational principles that guide every initiative, course, and service within the Science Divine Movement."
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "24px",
              marginTop: "48px",
            }}
          >
            {PILLARS.map((p, i) => (
              <div
                key={i}
                style={{
                  background: p.color,
                  border: `1px solid ${p.border}`,
                  borderRadius: "24px",
                  padding: "32px 28px",
                  transition: "transform 0.25s, box-shadow 0.25s",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-8px)";
                  el.style.boxShadow = `0 20px 50px ${p.border}`;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    fontSize: "2.5rem",
                    marginBottom: "20px",
                    lineHeight: 1,
                  }}
                >
                  {p.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "#0F172A",
                    marginBottom: "12px",
                  }}
                >
                  {p.title}
                </h3>
                <p style={{ color: "#4B5563", fontSize: "0.9rem", lineHeight: 1.75 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Timeline ─────────────────────────────────────────── */}
      <section className="section-pad" style={{ background: "#FAFAF8" }}>
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="Our Journey"
            title="25 Years of Transformation"
            subtitle="From a single seed of intention in 1999 to a global movement touching millions of lives ,  this is our story."
          />

          <div
            style={{
              position: "relative",
              maxWidth: "900px",
              margin: "64px auto 0",
            }}
          >
            {/* Center line */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                bottom: 0,
                width: "2px",
                background: "linear-gradient(180deg, #F59E0B 0%, #D4AF37 50%, rgba(212,175,55,0.2) 100%)",
                transform: "translateX(-50%)",
              }}
            />

            {TIMELINE.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "48px",
                  marginBottom: "48px",
                  position: "relative",
                }}
              >
                {/* Center dot */}
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "32px",
                    transform: "translate(-50%, -50%)",
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: "#FFFFFF",
                    border: `3px solid ${item.color}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: item.color,
                    zIndex: 2,
                    boxShadow: `0 0 0 6px rgba(255,255,255,0.8), 0 4px 16px ${item.color}33`,
                  }}
                >
                  {item.icon}
                </div>

                {/* Left content (even items) or right (odd items) */}
                {i % 2 === 0 ? (
                  <>
                    <div style={{ textAlign: "right", paddingRight: "40px" }}>
                      <div
                        style={{
                          display: "inline-block",
                          background: `${item.color}15`,
                          border: `1px solid ${item.color}40`,
                          borderRadius: "100px",
                          padding: "4px 14px",
                          fontSize: "12px",
                          fontWeight: 800,
                          color: item.color,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          marginBottom: "12px",
                        }}
                      >
                        {item.date}
                      </div>
                      <div
                        style={{
                          background: "#FFFFFF",
                          borderRadius: "20px",
                          padding: "24px 28px",
                          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                          border: "1px solid #E5E7EB",
                          textAlign: "left",
                        }}
                      >
                        <h3
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "1.15rem",
                            fontWeight: 700,
                            color: "#0F172A",
                            marginBottom: "10px",
                          }}
                        >
                          {item.title}
                        </h3>
                        <p style={{ color: "#6B7280", fontSize: "0.875rem", lineHeight: 1.75 }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <div />
                  </>
                ) : (
                  <>
                    <div />
                    <div style={{ paddingLeft: "40px" }}>
                      <div
                        style={{
                          display: "inline-block",
                          background: `${item.color}15`,
                          border: `1px solid ${item.color}40`,
                          borderRadius: "100px",
                          padding: "4px 14px",
                          fontSize: "12px",
                          fontWeight: 800,
                          color: item.color,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          marginBottom: "12px",
                        }}
                      >
                        {item.date}
                      </div>
                      <div
                        style={{
                          background: "#FFFFFF",
                          borderRadius: "20px",
                          padding: "24px 28px",
                          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                          border: "1px solid #E5E7EB",
                        }}
                      >
                        <h3
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "1.15rem",
                            fontWeight: 700,
                            color: "#0F172A",
                            marginBottom: "10px",
                          }}
                        >
                          {item.title}
                        </h3>
                        <p style={{ color: "#6B7280", fontSize: "0.875rem", lineHeight: 1.75 }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ───────────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
          padding: "100px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "800px",
            height: "800px",
            background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
        <div className="container-page" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(212,175,55,0.12)",
              border: "1px solid rgba(212,175,55,0.3)",
              borderRadius: "100px",
              padding: "6px 18px",
              marginBottom: "28px",
            }}
          >
            <Sparkles size={14} style={{ color: "#D4AF37" }} />
            <span style={{ color: "#D4AF37", fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Be Part of the Movement
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 700,
              color: "#FFFFFF",
              marginBottom: "20px",
              lineHeight: 1.2,
            }}
          >
            Begin Your Journey of{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #F59E0B, #D4AF37)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Inner Awakening
            </span>
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: "1.1rem",
              maxWidth: "580px",
              margin: "0 auto 44px",
              lineHeight: 1.8,
            }}
          >
            Join millions who have transformed their lives through Sakshi Shree's teachings. Your path to inner peace, purpose, and fulfillment begins here.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/book-session"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "linear-gradient(135deg, #F59E0B, #D4AF37)",
                color: "#0F172A",
                padding: "16px 36px",
                borderRadius: "100px",
                fontWeight: 700,
                fontSize: "1rem",
                textDecoration: "none",
                boxShadow: "0 8px 30px rgba(212,175,55,0.4)",
              }}
            >
              Book Personal Session <ArrowRight size={16} />
            </Link>
            <Link
              href="/initiatives"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#FFFFFF",
                padding: "16px 36px",
                borderRadius: "100px",
                fontWeight: 600,
                fontSize: "1rem",
                textDecoration: "none",
              }}
            >
              Explore Initiatives <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
