"use client";
import Link from "next/link";

import { ArrowRight } from "lucide-react";




const SOLUTIONS = [
  {
    title: "Stress",
    subtitle: "Find Your Calm: Transform Mental Pressure with Sakshi Shree",
    img: "/images/premium-heroes/stress.jpeg",
    slug: "stress",
  },
  {
    title: "Anxiety",
    subtitle: "Beating Anxiety Together: Simple Steps to Calm with Sakshi Shree",
    img: "/images/premium-heroes/anxiety.jpeg",
    slug: "anxiety",
  },
  {
    title: "Depression",
    subtitle: "Step by Step: Beating Depression with Sakshi Shree",
    img: "/images/premium-heroes/depression.jpeg",
    slug: "depression",
  },
  {
    title: "Parenting",
    subtitle: "Sakshi Shree's Guide to Parenting Through the Ages",
    img: "/images/premium-heroes/parenting.jpeg",
    slug: "parenting",
  },
  {
    title: "Addictions",
    subtitle: "Find Your Freedom: Overcoming Addiction with Help and Hope",
    img: "/images/premium-heroes/addictions.jpeg",
    slug: "addictions",
  },
  {
    title: "Overthinking",
    subtitle: "Overthinking No More: Techniques for Clarity and Calm by Sakshi Shree",
    img: "/images/premium-heroes/overthinking.jpeg",
    slug: "overthinking",
  },
];

export default function Page() {
  return (
    <div style={{ background: "#FFFFFF", color: "#1E293B", fontFamily: "'Inter', sans-serif" }}>

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #FFFBF0 0%, #FFF8E7 60%, #FFFFFF 100%)", paddingTop: "140px", paddingBottom: "90px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "360px", height: "360px", background: "radial-gradient(circle, rgba(212,175,55,0.14) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "-40px", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(82,22,35,0.08) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div className="container-page" style={{ position: "relative", zIndex: 1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(75, 16, 27, 0.08)", border: "1px solid rgba(212, 175, 55, 0.4)", borderRadius: "100px", padding: "6px 16px", marginBottom: "20px" }}>
                <span style={{ color: "#D4AF37", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Solutions Hub</span>
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)", fontWeight: 800, color: "#111827", lineHeight: 1.15, marginBottom: "16px" }}>
                Get Solutions For Your{" "}
                <span style={{ color: "#4B101B" }}>Challenges</span>
              </h1>
              <p style={{ fontSize: "1.05rem", color: "#4B5563", lineHeight: 1.7, maxWidth: "600px" }}>
                Whatever you&apos;re working through, Sakshi Shree&apos;s ancient wisdom has a doorway. Choose your challenge — we&apos;ll meet you there.
              </p>
            </div>

            {/* Right side topic image */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative w-full max-w-[480px] aspect-[4/3] sm:aspect-[1.15] overflow-hidden rounded-3xl shadow-2xl border-4 border-[#D4AF37]/40 hover:scale-105 transition-transform duration-700">
                <img loading="lazy" decoding="async"
                  src="/images/uploads/2025/01/dhyan-with-happy-face-copy-1-1-896x1024.webp"
                  alt="Get Solutions For Your Challenges"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="section-pad" style={{ background: "#FFFFFF" }}>
        <div className="container-page">
          <h2 className="sr-only">Explore solutions</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "32px" }}>
            {SOLUTIONS.map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}` as string}
                style={{ textDecoration: "none", display: "block" }}
              >
                <div
                  style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "24px", overflow: "hidden", boxShadow: "0 8px 24px rgba(0,0,0,0.04)", transition: "transform 0.25s, box-shadow 0.25s", cursor: "pointer" }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-6px)"; el.style.boxShadow = "0 20px 45px rgba(212,175,55,0.12)"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 8px 24px rgba(0,0,0,0.04)"; }}
                >
                  {/* Image: 1:1 Aspect Ratio so 100% of the square image is shown without cutting */}
                  <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1", overflow: "hidden", background: "#FAF8F5" }}>
                    <img
                      src={s.img}
                      alt={s.title}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", transition: "transform 0.5s ease" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
                    />
                  </div>

                  {/* Content */}
                  <div style={{ padding: "24px 28px 16px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.35rem", fontWeight: 700, color: "#111827", marginBottom: "6px" }}>{s.title}</h3>
                      <p style={{ color: "#64748B", fontSize: "0.875rem", lineHeight: 1.55 }}>{s.subtitle}</p>
                    </div>
                    <div style={{ width: "38px", height: "38px", background: "#521623", borderRadius: "100px", display: "grid", placeItems: "center", flexShrink: 0, marginLeft: "12px", boxShadow: "0 4px 14px rgba(82,22,35,0.3)" }}>
                      <ArrowRight size={16} style={{ color: "#FFFFFF" }} />
                    </div>
                  </div>

                  {/* Know More link */}
                  <div style={{ padding: "0 28px 24px" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#521623", fontWeight: 700, fontSize: "0.875rem" }}>
                      Know More <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section style={{ background: "linear-gradient(135deg, #0F172A, #1E293B)", padding: "70px 0", textAlign: "center" }}>
        <div className="container-page" style={{ maxWidth: "700px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "12px" }}>Not Sure Where to Start?</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "28px" }}>
            Book a personal session with Sakshi Shree for a customized one-on-one reading that uncovers your unique challenges and path to healing.
          </p>
          <Link
            href="/personal-session"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#521623",
              color: "#FFFFFF",
              padding: "16px 36px",
              borderRadius: "100px",
              fontWeight: 700,
              fontSize: "1rem",
              textDecoration: "none",
              boxShadow: "0 8px 30px rgba(82,22,35,0.5)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#6B1727";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 12px 35px rgba(82,22,35,0.7)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#521623";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(82,22,35,0.5)";
            }}
          >
            Book Personal Session <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
