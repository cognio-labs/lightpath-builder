import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitForm } from "@/lib/admin.functions";
import { Sparkles, Compass, Heart, Check, X, ChevronDown, ArrowRight, Phone, Mail, MapPin, ShieldCheck, Video, Users, Calendar, Award } from "lucide-react";
import { LEADERS } from "@/data/content";

export const Route = createFileRoute("/personal-session")({
  head: () => ({
    meta: [
      { title: "Book Personal Session with Sakshi Shree | Science Divine Foundation" },
      { name: "description", content: "Unlock the life you truly desire. Sakshi Shree reads your past, present, and future like an open book and provides powerful remedies." },
      { property: "og:title", content: "Personal Session with Sakshi Shree" },
      { property: "og:url", content: "/personal-session" },
    ],
    links: [{ rel: "canonical", href: "/personal-session" }],
  }),
  component: Page,
});

const STATS = [
  { value: "40+ Yrs", label: "Spiritual Guidance" },
  { value: "5M+", label: "Lives Impacted" },
  { value: "1,000+", label: "Events Organized" },
  { value: "9/10", label: "Experience Peace" }
];

const OFFERS = [
  {
    num: "1",
    title: "Instant Life Reading",
    desc: "Discover the chapters of your life- revealed without saying a single word."
  },
  {
    num: "2",
    title: "Transformative Solutions",
    desc: "Powerful yet simple remedies to overcome life’s challenges and achieve your goals."
  },
  {
    num: "3",
    title: "Personalized Spiritual Guidance",
    desc: "Tailored guidance to connect with your higher self and awaken your fullest human potential."
  }
];

const FAQS = [
  {
    q: "Is the meeting online or offline?",
    a: "Both options are available. Once you’ve made the payment, our team will coordinate with you to determine which option suits you best."
  },
  {
    q: "How will my appointment be scheduled?",
    a: "After you make the payment, our team will contact you on call or WhatsApp to check your availability and fix your appointment at a convenient time."
  },
  {
    q: "Do I need to bring anything to the meeting?",
    a: "No, you don’t need to bring anything but we recommend you to keep details such as place, date and time of your birth handy for the meeting."
  },
  {
    q: "How long does a typical session with Guruji Sakshi Shree last?",
    a: "A typical session lasts approximately 30 minutes. However, Guruji ensures that each individual receives the insights and guidance they need for a transformative experience."
  },
  {
    q: "What can I expect during my session with Guruji Sakshi Shree?",
    a: "During your session, Guruji will provide personalized insights into your life’s challenges without you needing to speak. He’ll then offer tailored spiritual guidance, specific remedies, and practices suited to your unique journey."
  },
  {
    q: "How does Guruji Sakshi Shree provide insights without me speaking?",
    a: "Guruji has developed a unique ability through decades of spiritual practice to intuitively read a person’s energy and life circumstances."
  },
  {
    q: "Is there any preparation required before the meeting?",
    a: "No special preparation is required. We recommend coming with an open mind and heart. If the session is online, ensure you have a quiet, private space and stable internet connection."
  },
  {
    q: "Can I request guidance on specific areas of my life (e.g., career, relationships, health)?",
    a: "Yes, while Guruji provides comprehensive insights, you’re welcome to ask for guidance on specific areas of concern during your session."
  },
  {
    q: "What forms of payment do you accept?",
    a: "We accept all major debit cards, credit cards, UPI, and net banking options. All transactions are secure."
  }
];

const VIDEOS = [
  { id: "jEiClzy2ZhY", title: "Guruji Read my Mind & wrote in his Diary — Pulkit Jain" },
  { id: "4XbvVT7yK2U", title: "Bobby Mann Testimonial | Sakshi Shree" },
  { id: "XaOeGL4Mp2E", title: "IITian Dheeraj Madaan from IIT Roorkee sharing experience" },
  { id: "60_cJkCAc5I", title: "Magic of Meeting Sakshi Shree | Gaurav Pratap" }
];

const JHUGGI_IMAGES = [
  "https://sciencedivine.org/wp-content/uploads/2024/12/IMG_1312-scaled.webp",
  "https://sciencedivine.org/wp-content/uploads/2024/12/IMG_1335-scaled.jpg",
  "https://sciencedivine.org/wp-content/uploads/2024/12/IMG_1379-scaled.jpg",
  "https://sciencedivine.org/wp-content/uploads/2024/12/IMG_1317-scaled.webp"
];

function Page() {
  return (
    <div style={{ background: "#FFFFFF", color: "#1E293B", fontFamily: "'Inter', sans-serif" }}>
      {/* Hero Header */}
      <section style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)", paddingTop: "140px", paddingBottom: "80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div className="container-page" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px", alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: "100px", padding: "6px 16px", marginBottom: "24px" }}>
                <Sparkles size={14} style={{ color: "#D4AF37" }} />
                <span style={{ color: "#D4AF37", fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>One-on-One Session</span>
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 5vw, 3.8rem)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.15, marginBottom: "16px" }}>
                Unlock the Life <br />
                <span style={{ background: "linear-gradient(90deg, #F59E0B, #D4AF37)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                  You Truly Desire
                </span>
              </h1>
              <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.7, marginBottom: "32px" }}>
                Feeling stuck or facing challenges? Sakshi Shree reads your past, present, and future like an open book. Without you saying a single word, he writes down the main problems in your life and provides powerful, effective remedies.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
                <a href="#payment" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg, #F59E0B, #D4AF37)", color: "#0F172A", padding: "16px 36px", borderRadius: "100px", fontWeight: 700, fontSize: "1rem", textDecoration: "none", boxShadow: "0 8px 30px rgba(212,175,55,0.3)" }}>
                  Book Your Slot <ArrowRight size={16} />
                </a>
                <a href="#consultation" style={{ color: "#FFFFFF", fontSize: "0.95rem", fontWeight: 600, textDecoration: "underline" }}>
                  Get a call back
                </a>
              </div>
            </div>
            <div style={{ position: "relative", textAlign: "center" }}>
              <img src="https://sciencedivine.org/wp-content/uploads/2024/12/AAP_0044-1.webp.bv_resized_desktop.webp.bv_.webp" alt="Guru Ji Portrait" style={{ width: "100%", maxWidth: "380px", height: "auto", margin: "0 auto", display: "block", borderRadius: "24px" }} />
              <div style={{ position: "absolute", bottom: "-20px", left: "50%", transform: "translateX(-50%)", background: "rgba(15,23,42,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "100px", padding: "8px 24px", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "8px" }}>
                <ShieldCheck size={16} style={{ color: "#D4AF37" }} />
                <span style={{ color: "#FFFFFF", fontSize: "12px", fontWeight: 700 }}>100% Privacy Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Metrics Bar */}
      <section style={{ background: "#FAF9F6", borderBottom: "1px solid #E2E8F0", padding: "40px 0" }}>
        <div className="container-page">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "28px", textAlign: "center" }}>
            {STATS.map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 800, color: "#B45309" }}>{s.value}</div>
                <div style={{ fontSize: "12px", color: "#64748B", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginTop: "4px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offer Cards */}
      <section className="section-pad" style={{ background: "#FFFFFF" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 50px" }}>
            <span style={{ fontSize: "12px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>Session Overview</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "#0F172A", marginTop: "8px" }}>What This Meeting Offers</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "28px" }}>
            {OFFERS.map((o, i) => (
              <div key={i} style={{ background: "#FFFDF9", border: "1px solid #F1F5F9", borderRadius: "20px", padding: "32px", position: "relative" }}>
                <div style={{ position: "absolute", top: "20px", right: "20px", fontSize: "3rem", fontWeight: 900, color: "rgba(212,175,55,0.08)" }}>{o.num}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", fontWeight: 700, color: "#0F172A", marginBottom: "12px" }}>{o.title}</h3>
                <p style={{ color: "#64748B", fontSize: "0.9rem", lineHeight: 1.65 }}>{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Guru Ji */}
      <section className="section-pad" style={{ background: "#FAF9F6" }}>
        <div className="container-page">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px", alignItems: "center" }}>
            <div>
              <span style={{ fontSize: "12px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>The Guide</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "#0F172A", marginTop: "8px", marginBottom: "20px" }}>Meet Sakshi Shree</h2>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#B45309", marginBottom: "16px" }}>Enlightened Spiritual Master</h3>
              <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "16px" }}>
                Sakshi Shree is a world-renowned mystic and an enlightened spiritual master with over 40 years of intense research and experience personally guiding seekers on the path of designing their destiny.
              </p>
              <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.7 }}>
                A former Indian civil servant who founded the Science Divine Foundation to touch millions of lives, his spiritual retreats attract thousands globally. He blends ancient wisdom with modern values, showing that one can achieve both material success and spiritual peace.
              </p>
            </div>
            <div style={{ position: "relative", textAlign: "center" }}>
              <img src="https://sciencedivine.org/wp-content/uploads/2023/06/IMG_3580-1-scaled.webp" alt="Guru Ji teaching" style={{ width: "100%", height: "auto", borderRadius: "24px", boxShadow: "0 15px 35px rgba(0,0,0,0.06)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* The Difference Table */}
      <section className="section-pad" style={{ background: "#FFFFFF" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 50px" }}>
            <span style={{ fontSize: "12px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>Our Unique Path</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "#0F172A", marginTop: "8px" }}>The Sakshi Shree Difference</h2>
            <p style={{ color: "#64748B", fontSize: "1rem", marginTop: "8px" }}>Decades of wisdom, personalized for you.</p>
          </div>

          <div style={{ maxWidth: "800px", margin: "0 auto", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "500px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #E2E8F0" }}>
                  <th style={{ padding: "16px", textAlign: "left", color: "#0F172A" }}>Feature</th>
                  <th style={{ padding: "16px", textAlign: "left", color: "#B45309", fontWeight: 800 }}>Sakshi Shree's Approach</th>
                  <th style={{ padding: "16px", textAlign: "left", color: "#94A3B8" }}>Generic Astrology / Palmistry</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { f: "Experience", s: "40 years of intense spiritual sadhana and research", g: "Limited knowledge; Information from secondary sources" },
                  { f: "Reading", s: "Personalized life reading (past, present, future)", g: "General horoscopes" },
                  { f: "Remedies", s: "Specific remedies for your life challenges", g: "Vague, universal advice" },
                  { f: "Practice", s: "Tailored spiritual practices", g: "One size fits all meditation techniques" },
                  { f: "Support", s: "Ongoing in-person spiritual guidance", g: "One time consultation, no support" }
                ].map((row, index) => (
                  <tr key={index} style={{ borderBottom: "1px solid #F1F5F9" }}>
                    <td style={{ padding: "16px", fontWeight: 700, fontSize: "0.9rem", color: "#0F172A" }}>{row.f}</td>
                    <td style={{ padding: "16px", fontSize: "0.875rem", color: "#475569" }}>
                      <Check size={16} style={{ color: "#10B981", display: "inline", marginRight: "6px" }} />
                      {row.s}
                    </td>
                    <td style={{ padding: "16px", fontSize: "0.875rem", color: "#94A3B8" }}>
                      <X size={16} style={{ color: "#EF4444", display: "inline", marginRight: "6px" }} />
                      {row.g}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* World Leaders */}
      <section className="section-pad" style={{ background: "#FAF9F6" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ fontSize: "12px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>In Company Of Leaders</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#0F172A", marginTop: "8px" }}>With World Leaders and Media</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
            {LEADERS.map((l, i) => (
              <div key={i} style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 15px rgba(0,0,0,0.02)" }}>
                <img src={l.image} alt={l.name} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                <div style={{ padding: "20px" }}>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0F172A" }}>{l.name}</h4>
                  <p style={{ color: "#64748B", fontSize: "0.75rem", marginTop: "4px" }}>{l.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jhuggi Kids Mission */}
      <section className="section-pad" style={{ background: "#FFFFFF" }}>
        <div className="container-page">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px", alignItems: "center" }}>
            <div>
              <span style={{ fontSize: "12px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>Social Mission</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#0F172A", marginTop: "8px", marginBottom: "20px" }}>Supports Jhuggi Kids' Education</h2>
              <p style={{ color: "#475569", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "24px" }}>
                Your transformative session with Sakshi Shree does more than change your life – it helps change the lives of underprivileged children. All contributions directly fund the Jhuggi Jhopdi Shiksha Sewa Mission.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {[
                  { t: "Free Education", d: "Classes from Nursery to VI" },
                  { t: "Nourishment", d: "Daily nutritious meals provided" },
                  { t: "Complete Care", d: "Uniforms, books, and materials supplied" },
                  { t: "Skill Development", d: "Vocational training opportunities" }
                ].map((item, i) => (
                  <div key={i} style={{ background: "#FFFDF9", border: "1px solid #F1E9D2", borderRadius: "12px", padding: "16px" }}>
                    <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#B45309", marginBottom: "4px" }}>{item.t}</div>
                    <div style={{ fontSize: "0.75rem", color: "#64748B" }}>{item.d}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              {/* Photo grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {JHUGGI_IMAGES.map((img, i) => (
                  <img key={i} src={img} alt={`Slum education detail ${i + 1}`} style={{ width: "100%", height: "140px", objectFit: "cover", borderRadius: "16px", boxShadow: "0 4px 10px rgba(0,0,0,0.04)" }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Booking slot Widget */}
      <section id="payment" style={{ background: "linear-gradient(135deg, #FFFDF9 0%, #FFF9EC 100%)", padding: "80px 0", borderTop: "1px solid #F1E9D2", borderBottom: "1px solid #F1E9D2" }}>
        <div className="container-page" style={{ maxWidth: "640px", textAlign: "center" }}>
          <span style={{ fontSize: "12px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>Reserve Slot</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#0F172A", marginTop: "8px", marginBottom: "28px" }}>To Book the session</h2>
          <div style={{ background: "#FFFFFF", border: "2px dashed #D4AF37", borderRadius: "24px", padding: "40px", boxShadow: "0 10px 30px rgba(212,175,55,0.06)" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: 900, color: "#B45309", marginBottom: "8px" }}>₹ 6,100</div>
            <p style={{ color: "#64748B", fontSize: "0.85rem", fontWeight: 600, marginBottom: "24px" }}>
              Contribution for Jhuggi Jhopdi Shiksha Sewa Mission <br />
              <span style={{ color: "#10B981" }}>*Tax Exemption is applicable for all donations under Section 80G</span>
            </p>
            <a href="https://pages.razorpay.com/pl_PTV1eNFrJvhJGF/view" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "linear-gradient(135deg, #F59E0B, #D4AF37)", color: "#0F172A", padding: "16px 48px", borderRadius: "100px", fontWeight: 800, fontSize: "1rem", textDecoration: "none", boxShadow: "0 8px 25px rgba(212,175,55,0.3)" }}>
              Book Your Slot
            </a>
          </div>
        </div>
      </section>

      {/* How to Book Steps */}
      <section className="section-pad" style={{ background: "#FFFFFF" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 50px" }}>
            <span style={{ fontSize: "12px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>Process</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "#0F172A", marginTop: "8px" }}>How to Book Meeting</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "28px" }}>
            {[
              {
                step: "Step 1",
                img: "https://sciencedivine.org/wp-content/uploads/2024/12/Step-01-1.webp",
                title: "Confirm Your Participation",
                desc: "Lock in your session by making a Contribution of ₹ 6100 for underprivileged kids' education. It's your first step towards transformation!"
              },
              {
                step: "Step 2",
                img: "https://sciencedivine.org/wp-content/uploads/2024/12/Step-02-1.webp",
                title: "Schedule your meeting",
                desc: "Our team will reach out to discuss your meeting preferences (online or face-to-face) and check your availability to find the perfect slot."
              },
              {
                step: "Step 3",
                img: "https://sciencedivine.org/wp-content/uploads/2024/12/Step-03-Copy-1.webp",
                title: "Begin Your Transformation",
                desc: "The big day is here! For in-person meetings, arrive 30 mins early. For online sessions, we'll ensure everything is set for a seamless experience."
              }
            ].map((s, i) => (
              <div key={i} style={{ background: "#FAF9F6", borderRadius: "20px", overflow: "hidden", border: "1px solid #E2E8F0" }}>
                <div style={{ position: "relative", paddingTop: "56.25%" }}>
                  <img src={s.img} alt={s.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: "12px", left: "12px", background: "#D4AF37", color: "#0F172A", padding: "4px 12px", borderRadius: "100px", fontWeight: 800, fontSize: "11px" }}>{s.step}</div>
                </div>
                <div style={{ padding: "24px" }}>
                  <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", marginBottom: "8px" }}>{s.title}</h4>
                  <p style={{ color: "#64748B", fontSize: "0.85rem", lineHeight: 1.5 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Videos slider/testimonials */}
      <section className="section-pad" style={{ background: "#FAF9F6" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ fontSize: "12px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>Voices of Transformation</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#0F172A", marginTop: "8px" }}>Seeker Success Stories</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
            {VIDEOS.map((v, i) => (
              <div key={i} style={{ background: "#FFFFFF", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.03)", border: "1px solid #E2E8F0" }}>
                <div style={{ position: "relative", paddingTop: "56.25%" }}>
                  <iframe src={`https://www.youtube.com/embed/${v.id}`} title={v.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }} />
                </div>
                <div style={{ padding: "16px" }}>
                  <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0F172A", lineHeight: 1.4 }}>{v.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-pad" style={{ background: "#FFFFFF" }}>
        <div className="container-page" style={{ maxWidth: "800px" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ fontSize: "12px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>Answers</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#0F172A", marginTop: "8px" }}>FAQs</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {FAQS.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Callback / Contact Form */}
      <section id="consultation" className="section-pad" style={{ background: "#FAF9F6" }}>
        <div className="container-page" style={{ maxWidth: "900px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px" }}>
            <div>
              <span style={{ fontSize: "12px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>Get in Touch</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#0F172A", marginTop: "8px", marginBottom: "24px" }}>Get A Call Back</h2>
              <p style={{ color: "#64748B", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "28px" }}>
                Contact us by filling out this form and our experts will contact you immediately. We’re here to help you on your journey of personal transformation.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "100px", background: "rgba(212,175,55,0.1)", display: "grid", placeItems: "center", color: "#B45309" }}><Mail size={16} /></div>
                  <span style={{ fontSize: "0.9rem", color: "#475569", fontWeight: 600 }}>info@sciencedivine.org</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "100px", background: "rgba(212,175,55,0.1)", display: "grid", placeItems: "center", color: "#B45309" }}><Phone size={16} /></div>
                  <span style={{ fontSize: "0.9rem", color: "#475569", fontWeight: 600 }}>+91 93159 44774</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "100px", background: "rgba(212,175,55,0.1)", display: "grid", placeItems: "center", color: "#B45309" }}><MapPin size={16} /></div>
                  <span style={{ fontSize: "0.85rem", color: "#475569", fontWeight: 600, lineHeight: 1.4 }}>
                    Siddha Sudarshan Sakshi Dhaam, 8, Avantika, Chiranjeev Vihar, Ghaziabad
                  </span>
                </div>
              </div>
            </div>
            <div>
              <CallbackForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", overflow: "hidden" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", border: "none", background: "none", padding: "20px", textAlign: "left", fontSize: "0.95rem", fontWeight: 700, color: "#0F172A", cursor: "pointer" }}>
        <span>{q}</span>
        <ChevronDown size={16} style={{ color: "#94A3B8", transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
      </button>
      {open && (
        <div style={{ padding: "0 20px 20px 20px", fontSize: "0.875rem", color: "#64748B", lineHeight: 1.6, borderTop: "1px solid #F1F5F9", paddingTop: "12px" }}>
          {a}
        </div>
      )}
    </div>
  );
}

function CallbackForm() {
  const navigate = useNavigate();
  const submit = useServerFn(submitForm);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    const fd = new FormData(e.currentTarget);
    try {
      await submit({
        data: {
          type: "book_session",
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          message: "Callback request from Personal Session page",
        },
      });
      navigate({ to: "/thank-you" });
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Failed to submit form. Please check network connection.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "24px", padding: "32px", display: "flex", flexDirection: "column", gap: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.02)" }}>
      <div>
        <label htmlFor="name" style={{ fontSize: "12px", fontWeight: 700, color: "#475569", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Name</label>
        <input required id="name" name="name" placeholder="John Doe" style={{ width: "100%", background: "#FAF9F6", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "12px 16px", fontSize: "0.9rem", outline: "none" }} />
      </div>
      <div>
        <label htmlFor="email" style={{ fontSize: "12px", fontWeight: 700, color: "#475569", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Email</label>
        <input required id="email" name="email" type="email" placeholder="john@example.com" style={{ width: "100%", background: "#FAF9F6", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "12px 16px", fontSize: "0.9rem", outline: "none" }} />
      </div>
      <div>
        <label htmlFor="phone" style={{ fontSize: "12px", fontWeight: 700, color: "#475569", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Phone Number</label>
        <input required id="phone" name="phone" placeholder="+91 99999 99999" style={{ width: "100%", background: "#FAF9F6", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "12px 16px", fontSize: "0.9rem", outline: "none" }} />
      </div>
      {err && <p style={{ color: "#EF4444", fontSize: "0.85rem" }}>{err}</p>}
      <button type="submit" disabled={busy} style={{ background: "linear-gradient(135deg, #F59E0B, #D4AF37)", color: "#0F172A", border: "none", borderRadius: "100px", padding: "14px 28px", fontWeight: 800, fontSize: "0.95rem", cursor: "pointer", transition: "opacity 0.2s" }}>
        {busy ? "Sending Request..." : "Submit"}
      </button>
    </form>
  );
}
