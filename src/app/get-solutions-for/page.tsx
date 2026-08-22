"use client";
import Link from "next/link";

import { ArrowRight } from "lucide-react";




const SOLUTIONS = [
  {
    title: "Overthinking",
    subtitle: "Overthinking No More: Techniques for Clarity and Calm by Sakshi Shree",
    img: "/premium-heroes/overthinking-hero.png",
    slug: "overthinking",
  },
  {
    title: "Addictions",
    subtitle: "Find Your Freedom: Overcoming Addiction with Help and Hope",
    img: "https://sciencedivine.org/wp-content/uploads/2024/03/Addictions-1024x512.jpg",
    slug: "addictions",
  },
  {
    title: "Parenting",
    subtitle: "Sakshi Shree's Guide to Parenting Through the Ages",
    img: "/premium-heroes/parenting-hero.png",
    slug: "parenting",
  },
  {
    title: "Sleeping Disorder",
    subtitle: "Sleep Better Every Night: Simple Steps to Beat Sleep Problems with Sakshi Shree",
    img: "/premium-heroes/sleeping-disorder-hero.png",
    slug: "sleeping-disorder",
  },
  {
    title: "Wellness",
    subtitle: "Living Well: Mind, Body, and Soul with Sakshi Shree",
    img: "/premium-heroes/wellness-hero.png",
    slug: "wellness",
  },
  {
    title: "Anxiety",
    subtitle: "Beating Anxiety Together: Simple Steps to Calm with Sakshi Shree",
    img: "/premium-heroes/anxiety-hero.png",
    slug: "anxiety",
  },
  {
    title: "Depression",
    subtitle: "Step by Step: Beating Depression with Sakshi Shree",
    img: "/premium-heroes/depression-hero.png",
    slug: "depression",
  },
  {
    title: "Relationships",
    subtitle: "Conscious Hearts, Sacred Connections",
    img: "/premium-heroes/relationships-hero.png",
    slug: "relationship",
  },
];

export default function Page() {
  return (
    <div style={{ background: "#FFFFFF", color: "#1E293B", fontFamily: "'Inter', sans-serif" }}>

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 60%, #0F172A 100%)", paddingTop: "130px", paddingBottom: "70px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div className="container-page" style={{ position: "relative", zIndex: 1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.25)", borderRadius: "100px", padding: "6px 16px", marginBottom: "20px" }}>
                <span style={{ color: "#D4AF37", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Solutions Hub</span>
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.15, marginBottom: "16px" }}>
                Get Solutions For Your Challenges
              </h1>
              <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.7, maxWidth: "600px" }}>
                Whatever you're working through, Sakshi Shree's ancient wisdom has a doorway. Choose your challenge — we'll meet you there.
              </p>
            </div>

            {/* Right side topic image */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative w-full max-w-[480px] aspect-[4/3] sm:aspect-[1.15] overflow-hidden rounded-3xl shadow-2xl border-4 border-white/20">
                <img
                  src="https://sciencedivine.org/wp-content/uploads/2025/01/dhyan-with-happy-face-copy-1-1-896x1024.webp"
                  alt="Get Solutions For Your Challenges"
                  className="w-full h-full object-cover object-top transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="section-pad" style={{ background: "#FAF9F6" }}>
        <div className="container-page">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "32px" }}>
            {SOLUTIONS.map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}` as string}
                style={{ textDecoration: "none", display: "block" }}
              >
                <div
                  style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "24px", overflow: "hidden", boxShadow: "0 8px 24px rgba(0,0,0,0.02)", transition: "transform 0.25s, box-shadow 0.25s", cursor: "pointer" }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-6px)"; el.style.boxShadow = "0 20px 45px rgba(212,175,55,0.1)"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 8px 24px rgba(0,0,0,0.02)"; }}
                >
                  {/* Image */}
                  <div style={{ position: "relative", paddingTop: "60%", overflow: "hidden" }}>
                    <img
                      src={s.img}
                      alt={s.title}
                      loading="lazy"
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
                    />
                  </div>

                  {/* Content */}
                  <div style={{ padding: "24px 28px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 700, color: "#0F172A", marginBottom: "6px" }}>{s.title}</h3>
                      <p style={{ color: "#64748B", fontSize: "0.85rem", lineHeight: 1.5 }}>{s.subtitle}</p>
                    </div>
                    <div style={{ width: "36px", height: "36px", background: "linear-gradient(135deg, #F59E0B, #D4AF37)", borderRadius: "100px", display: "grid", placeItems: "center", flexShrink: 0, marginLeft: "12px" }}>
                      <ArrowRight size={16} style={{ color: "#0F172A" }} />
                    </div>
                  </div>

                  {/* Know More link */}
                  <div style={{ padding: "0 28px 20px" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: "#B45309", fontWeight: 700, fontSize: "0.85rem" }}>
                      Know More <ArrowRight size={13} />
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
          <Link href="/personal-session" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg, #F59E0B, #D4AF37)", color: "#0F172A", padding: "16px 36px", borderRadius: "100px", fontWeight: 700, fontSize: "1rem", textDecoration: "none", boxShadow: "0 8px 30px rgba(212,175,55,0.3)" }}>
            Book Personal Session <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
