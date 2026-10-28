import Image from "next/image";
import { RAZORPAY_DONATION_LINK } from "@/lib/payment-links";
import { DonationForm } from "@/components/donation/DonationForm";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Flower2,
  Heart,
  HeartHandshake,
  Landmark,
  Leaf,
  Medal,
  Sparkles,
  Star,
  UsersRound,
} from "lucide-react";
import styles from "./nirman-sewa.module.css";



const FACILITIES = [
  {
    image: "/images/nirman-sewa/apartment.jpg",
    title: "Fully Furnished Apartments",
    desc: "Premium furnished apartments with modern amenities for a comfortable spiritual stay.",
  },
  {
    image: "/images/nirman-sewa/auditorium.jpg",
    title: "Auditorium and Satsang Hall",
    desc: "Spacious halls for large gatherings, satsangs, and meditation programs.",
  },
  {
    image: "/images/nirman-sewa/wellness.jpg",
    title: "Wellness and Fitness Centre",
    desc: "State-of-the-art wellness facilities for holistic physical and mental well-being.",
  },
  {
    image: "/images/nirman-sewa/restaurant.jpg",
    title: "Multi-cuisine Restaurant",
    desc: "Sattvic and multi-cuisine dining options for nourishment of body and soul.",
  },
  {
    image: "/images/nirman-sewa/utilities.jpg",
    title: "Power Backup and 24Hr Water",
    desc: "Uninterrupted power backup and round-the-clock water supply for your comfort.",
  },
  {
    image: "/images/nirman-sewa/security.jpg",
    title: "Round The Clock Security",
    desc: "24/7 security ensuring a safe and protected sanctuary for all members.",
  },
];

const MEMBERSHIPS = [
  { level: "Founder Member", amount: "₹11,00,000", color: "#D4AF37", bg: "linear-gradient(135deg, #D4AF37, #B8860B)", text: "#1A0A00", privileges: ["1 Deluxe Apartment provided", "65 days stay per calendar year on priority", "Member of Working Committee"], popular: true },
  { level: "Co-Founder Member", amount: "₹5,00,000", color: "#D4AF37", bg: "linear-gradient(135deg, #551628, #3D0E1B)", text: "#FFFFFF", privileges: ["Krishna Apartment provided", "45 days stay per calendar year", "Free lodging/boarding on priority basis"], popular: false },
  { level: "Diamond Member", amount: "₹2,00,000", color: "#D4AF37", bg: "linear-gradient(135deg, #6B1730, #4A1020)", text: "#FFFFFF", privileges: ["11 days stay per calendar year", "Member of Working Committee"], popular: false },
  { level: "Life Member", amount: "₹1,00,000", color: "#D4AF37", bg: "linear-gradient(135deg, #5A162B, #3A0C1A)", text: "#FFFFFF", privileges: ["5-day residential stay in a year", "Receive personal guidance and blessings"], popular: false },
  { level: "Special Member", amount: "₹51,00,000", color: "#D4AF37", bg: "linear-gradient(135deg, #701D35, #4F1223)", text: "#FFFFFF", privileges: ["Receive personal guidance and blessings", "Free lodging and boarding in Shivirs"], popular: false },
];

const GALLERY = [
  "https://assets.cdn.filesafe.space/z3Nz1DGIjH8cQEHGGNs5/media/6931718de0f0925ecc8ae233.jpg",
  "https://assets.cdn.filesafe.space/z3Nz1DGIjH8cQEHGGNs5/media/693171dbe0f09249538aebc5.jpg",
  "https://assets.cdn.filesafe.space/z3Nz1DGIjH8cQEHGGNs5/media/693172390b0f9d727a8ba4b4.jpg",
  "https://assets.cdn.filesafe.space/z3Nz1DGIjH8cQEHGGNs5/media/693176d7f3fe2a69ab6e64fa.jpg",
];

function LegacyNirmanSewaPage() {
  const H = "#551628"; const H2 = "#3D0E1B";
  const G = "#D4AF37"; const Gd = "rgba(212,175,55,0.15)"; const Gb = "rgba(212,175,55,0.35)";
  const T = "#1E293B"; const TL = "#64748B"; const W = "#FFFFFF";
  const BG = "#FFFDF9"; const BrB = "#F1E5D8";

  return (
    <div style={{ background: W, color: T, fontFamily: "'Inter', sans-serif" }}>

      {/* HERO */}
      <section style={{ background: `linear-gradient(145deg, ${H} 0%, ${H2} 60%, #551628 100%)`, paddingTop: "130px", paddingBottom: "80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-100px", right: "-80px", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div className="container-page" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "56px", alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-block", background: Gd, border: `1px solid ${Gb}`, borderRadius: "100px", padding: "5px 16px", marginBottom: "16px" }}>
                <span style={{ color: G, fontSize: "10px", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>Spiritual Retreat & Wellness Center</span>
              </div>
              <p style={{ color: "rgba(212,175,55,0.9)", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.12em", marginBottom: "8px" }}>Sakshidham International Vrindavan</p>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4.5vw, 3.2rem)", fontWeight: 900, color: W, lineHeight: 1.15, marginBottom: "16px" }}>
                A Sacred Space for<br /><span style={{ color: G }}>Transformation</span>
              </h1>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "32px" }}>
                The Spiritual Retreat and Wellness Center, established to help you achieve personal guidance, grace, and blessings for a <strong style={{ color: G }}>stress-free, successful, and happy life.</strong>
              </p>
              <a href="#membership" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: `linear-gradient(135deg, ${G}, #B8860B)`, color: "#1A0A00", padding: "16px 38px", borderRadius: "100px", fontWeight: 800, fontSize: "1rem", textDecoration: "none", boxShadow: "0 8px 30px rgba(212,175,55,0.35)" }}>
                Explore Membership
              </a>
            </div>
            <div>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", inset: "-8px", background: "linear-gradient(135deg, rgba(212,175,55,0.25), rgba(85,22,40,0.35))", borderRadius: "28px", filter: "blur(14px)" }} />
                <img loading="lazy" decoding="async" src="https://assets.cdn.filesafe.space/z3Nz1DGIjH8cQEHGGNs5/media/693168430b0f9d1b2d8a1231.jpg" alt="Sakshidham International" style={{ width: "100%", height: "auto", borderRadius: "24px", boxShadow: "0 24px 60px rgba(0,0,0,0.5)", position: "relative", zIndex: 1 }} />
              </div>
            </div>
          </div>

          {/* Guruji quote card */}
          <div style={{ marginTop: "56px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px", alignItems: "center", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "24px", padding: "36px" }}>
            <img loading="lazy" decoding="async" src="https://assets.cdn.filesafe.space/z3Nz1DGIjH8cQEHGGNs5/media/68e1283030a9a9921940f4d6.png" alt="Sadguru Sakshi Shree Ji" style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", border: `3px solid ${G}`, margin: "0 auto", display: "block" }} />
            <div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: "rgba(255,255,255,0.9)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "10px" }}>
                "The institution provides definite scientific techniques and spiritual practices that will be offered to the members for sound enlightenment, and for the sincere members, it will serve as a center for spiritual upliftment and enlightenment."
              </p>
              <div style={{ color: G, fontWeight: 700, fontSize: "0.85rem" }}>,  Sadguru Sakshi Shree</div>
            </div>
          </div>
        </div>
      </section>

      {/* NIRMAN SEWA FEATURED IMAGE */}
      <section style={{ background: BG, padding: "60px 0 0" }}>
        <div className="container-page">
          <div style={{ position: "relative", borderRadius: "28px", overflow: "hidden", boxShadow: "0 24px 60px rgba(85,22,40,0.18)" }}>
            <img
              loading="lazy"
              decoding="async"
              src="/images/nirman-sewa/vrindavan-ashram-building.webp"
              alt="Nirman Sewa - Sakshi Dham spiritual campus in Vrindavan"
              style={{ width: "100%", height: "clamp(220px, 45vw, 520px)", objectFit: "cover", display: "block" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(85,22,40,0.72) 0%, rgba(85,22,40,0.1) 60%, transparent 100%)" }} />
            <div style={{ position: "absolute", bottom: "36px", left: "40px", right: "40px" }}>
              <span style={{ display: "inline-block", background: "rgba(212,175,55,0.2)", border: "1px solid rgba(212,175,55,0.5)", borderRadius: "100px", padding: "4px 14px", color: "#D4AF37", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>
                Spiritual Infrastructure
              </span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#FFFFFF", fontSize: "clamp(1.3rem, 3vw, 2.2rem)", fontWeight: 800, margin: 0, textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
                Sakshidham — A Sacred Space in Vrindavan
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* FACILITIES */}
      <section className="section-pad" style={{ background: BG }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <span style={{ fontSize: "11px", color: G, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>World-Class Amenities</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: T, marginTop: "6px" }}>World-Class Facilities for Holistic Living</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "28px" }}>
            {FACILITIES.map((f, i) => (
              <div
                key={i}
                style={{
                  background: W,
                  border: `1px solid ${BrB}`,
                  borderRadius: "20px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                }}
              >
                <div style={{ position: "relative", width: "100%", height: "210px", overflow: "hidden" }}>
                  <img
                    loading="lazy"
                    decoding="async"
                    src={f.image}
                    alt={f.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 40%)",
                      pointerEvents: "none",
                    }}
                  />
                </div>
                <div style={{ padding: "24px 22px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      color: "#551628",
                      marginBottom: "10px",
                    }}
                  >
                    {f.title}
                  </h3>
                  <p style={{ color: TL, fontSize: "0.875rem", lineHeight: 1.65, margin: 0 }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP */}
      <section id="membership" className="section-pad" style={{ background: W }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <span style={{ fontSize: "11px", color: G, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>Become a Member</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: T, marginTop: "6px" }}>Spiritual Membership Details</h2>
            <p style={{ color: TL, marginTop: "10px", fontSize: "0.95rem" }}>*Terms and conditions apply for all facilities and privileges as specified in the official brochure.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
            {MEMBERSHIPS.map((m, i) => (
              <div key={i} style={{ borderRadius: "24px", overflow: "hidden", position: "relative", border: m.popular ? `2px solid ${G}` : "1px solid #E8E2D9", boxShadow: m.popular ? "0 12px 40px rgba(212,175,55,0.2)" : "0 4px 16px rgba(0,0,0,0.04)" }}>
                {m.popular && <div style={{ background: `linear-gradient(135deg, ${G}, #B8860B)`, color: "#1A0A00", textAlign: "center", padding: "6px", fontSize: "10px", fontWeight: 800, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>Most Prestigious</div>}
                <div style={{ background: m.bg, padding: "28px 24px" }}>
                  <div style={{ color: m.text === "#1A0A00" ? "rgba(26,10,0,0.7)" : "rgba(255,255,255,0.75)", fontSize: "11px", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: "8px" }}>Membership Level</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 800, color: m.text === "#1A0A00" ? "#1A0A00" : W, marginBottom: "8px" }}>{m.level}</h3>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 900, color: m.text === "#1A0A00" ? "#1A0A00" : W }}>{m.amount}</div>
                </div>
                <div style={{ background: BG, padding: "24px" }}>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "10px", listStyle: "none", padding: 0, margin: "0 0 20px 0" }}>
                    {m.privileges.map((pr, j) => (
                      <li key={j} style={{ display: "flex", gap: "10px", fontSize: "0.825rem", color: T, alignItems: "flex-start" }}>
                        <span style={{ color: "#551628", fontWeight: 800, flexShrink: 0 }}>✓</span> {pr}
                      </li>
                    ))}
                  </ul>
                  <a href={RAZORPAY_DONATION_LINK} target="_blank" rel="noopener noreferrer" style={{ display: "block", textAlign: "center", background: m.bg, color: m.text === "#1A0A00" ? "#1A0A00" : W, padding: "12px", borderRadius: "100px", fontWeight: 800, fontSize: "0.9rem", textDecoration: "none", boxShadow: "0 4px 16px rgba(85,22,40,0.2)" }}>
                    Contribute {m.amount}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BANK DETAILS */}
      <section id="donate" className="section-pad" style={{ background: BG }}>
        <div className="container-page" style={{ maxWidth: "800px" }}>
          <div style={{ textAlign: "center", marginBottom: "44px" }}>
            <span style={{ fontSize: "11px", color: G, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>Tax Benefits Available</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: T, marginTop: "6px" }}>Support Our Mission</h2>
            <div style={{ marginTop: "16px", background: "#FFF8F0", border: "1px solid #F3E5D8", borderRadius: "12px", padding: "16px 24px", display: "inline-block" }}>
              <p style={{ color: "#551628", fontSize: "0.875rem", fontWeight: 600, margin: 0 }}>
                TAX EXEMPTION: All Donations made in favour of "Siddhadatri Charitable Trust" are exempt from Income Tax u/s 80(G) of Income Tax Act 1961.
              </p>
            </div>
          </div>
          <div style={{ background: `linear-gradient(135deg, ${H}, ${H2})`, borderRadius: "24px", padding: "40px", color: W }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, color: G, marginBottom: "24px" }}>Bank Details for Contribution (NEFT/RTGS)</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
              {[
                { l: "Bank Name", v: "Bank of India" },
                { l: "Branch", v: "Harsoan, Ghaziabad" },
                { l: "A/c Name", v: "SIDDHADATRI CHARITABLE TRUST" },
                { l: "A/c Type", v: "Current" },
                { l: "A/c No.", v: "711120110000140" },
                { l: "IFSC Code", v: "BKID0007111" },
              ].map((b, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.07)", borderRadius: "12px", padding: "16px 20px" }}>
                  <div style={{ fontSize: "10px", fontWeight: 700, color: G, textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: "4px" }}>{b.l}</div>
                  <div style={{ fontWeight: 700, color: W, fontSize: "0.95rem" }}>{b.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section-pad" style={{ background: W }}>
        <div className="container-page" style={{ maxWidth: "1200px" }}>
          <div style={{ textAlign: "center", marginBottom: "44px" }}>
            <span style={{ fontSize: "11px", color: G, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>The Sacred Space</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: T, marginTop: "6px" }}>Photo Gallery of Sakshidham</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
            {GALLERY.map((g, i) => (
              <div key={i} style={{ borderRadius: "20px", overflow: "hidden", boxShadow: "0 6px 24px rgba(0,0,0,0.08)", position: "relative" }}>
                <img loading="lazy" decoding="async" src={g} alt={`Sakshidham Gallery ${i + 1}`} style={{ width: "100%", height: "220px", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(85,22,40,0.6), transparent)` }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const heroReferenceImage = "/images/nirman-sewa/sakshi-dham-hero-clean.png";
const transformationReferenceImage = "/images/nirman-sewa/sakshi-dham-transformation-responsive.webp";
const donateReferenceImage = "/images/nirman-sewa/sakshi-dham-donate-responsive.webp";

const plannedFacilities = [
  { title: "Temple & Prayer Halls", description: "A serene space for meditation, reflection, spiritual learning, and gatherings.", image: "/images/nirman-sewa/facility-temple-human.webp", icon: Landmark },
  { title: "Accommodation", description: "Comfortable accommodation facilities for seekers, volunteers, and retreat participants.", image: "/images/nirman-sewa/facility-accommodation-human.webp", icon: Building2 },
  { title: "Learning & Retreat Spaces", description: "Dedicated spaces for Gita classes, meditation sessions, workshops, and retreats.", image: "/images/nirman-sewa/facility-learning-human.webp", icon: BookOpen },
  { title: "Sustainable & Green Campus", description: "A peaceful, eco-friendly environment designed for conscious living and connection with nature.", image: "/images/nirman-sewa/facility-campus-human.webp", icon: Leaf },
  { title: "Community Facilities", description: "Essential shared spaces for ashram activities, dining, gatherings, and community living.", image: "/images/nirman-sewa/facility-community-human.webp", icon: UsersRound },
];

const membershipPlans = [
  { title: "Founder Member", amount: "₹ 11,00,000/-", icon: Flower2 }, { title: "Co-Founder Member", amount: "₹ 5,00,000/-", icon: UsersRound }, { title: "Diamond Member", amount: "₹ 2,00,000/-", icon: Sparkles }, { title: "Life Member", amount: "₹ 1,00,000/-", icon: Star }, { title: "Special Member", amount: "₹ 51,000/-", icon: Medal }, { title: "General Member", amount: "₹ 21,000/-", icon: UsersRound },
];

const projectHighlights = [
  { label: "Spiritual Campus in Vrindavan", icon: Landmark }, { label: "Eco-Friendly & Sustainable Design", icon: Leaf }, { label: "Community & Spiritual Learning", icon: UsersRound }, { label: "Gita Wisdom & Meditation Programs", icon: BookOpen }, { label: "Open to Diverse Communities", icon: HeartHandshake },
];

export default function NirmanSewaPage() {
  return <div className={`${styles.page} sakshi-dham-page`}>
    <section className={styles.referenceHero} aria-labelledby="nirman-title">
      <Image src={heroReferenceImage} alt="Sakshi Dham International at sunset" width={1600} height={596} sizes="100vw" preload />
      <div className={styles.heroTextOverlay}>
        <p className={styles.heroEyebrow}>A DIVINE ABODE FOR A BRIGHTER TOMORROW</p>
        <h1 id="nirman-title" className={styles.heroMainTitle}>SAKSHI DHAM INTERNATIONAL</h1>
        <p className={styles.heroSubtitle}>A Spiritual Center in Vrindavan for Inner Transformation and a More Conscious World.</p>
      </div>
      <a className={styles.heroCtaButton} href="#contribute" aria-label="Donate now to Sakshi Dham International">
        DONATE NOW <ArrowRight size={18} aria-hidden="true" />
      </a>
    </section>
    {/* ── OUR VISION: A Global Spiritual Center (Large Showcase Card) ── */}
    <section className={styles.visionContribution} aria-labelledby="vision-title">
      <div className={styles.visionLargeCard}>
        <div className={styles.visionCardBody}>
          <div>
            <p className={styles.sectionLabel}>OUR VISION</p>
            <h2 id="vision-title" className={styles.visionMainHeading}>
              A GLOBAL SPIRITUAL CENTER<br className={styles.desktopBr} /> IN THE HEART OF VRINDAVAN
            </h2>
            <p className={styles.visionParagraph}>
              Sakshi Dham International is being developed as a sacred ashram in Vrindavan to offer a peaceful space for meditation, dhyan, Gita wisdom, retreats, and community living.
            </p>
            <p className={styles.visionParagraph}>
              It will welcome seekers from all walks of life to experience inner transformation and contribute to a more conscious, compassionate and harmonious world.
            </p>
          </div>
          <blockquote className={styles.visionQuote}>
            <p>
              Sakshi Dham will be a living example of how spiritual wisdom can create a better individual, a better family and a better society.
            </p>
            <cite>— Sadguru Sakshi Shree</cite>
          </blockquote>
        </div>
        <div className={styles.visionMedia}>
          <Image
            src="/images/nirman-sewa/vrindavan-ashram-building.webp"
            alt="Sakshi Dham International Vrindavan ashram building"
            className={styles.visionCardImage}
            sizes="(max-width: 760px) calc(100vw - 64px), (max-width: 1024px) 44vw, 38vw"
            width={1080}
            height={960}
          />
        </div>
      </div>

    {/* ── MAKE A CONTRIBUTION (Centered Donation Card) ── */}
    <div className={styles.donationInline}>
      <DonationForm
        id="contribute"
        title="Make a Contribution"
        subtitle="Be a part of this sacred initiative and help create a lasting legacy."
        purpose="Sakshi Dham International"
      />
    </div>
    </section>
    <section className={styles.support}><div className={styles.centerHeading}><h2>WHAT YOUR SUPPORT WILL HELP CREATE</h2><p>Your contribution will help us build and develop this divine ashram with essential facilities for spiritual learning, meditation, retreats, and community living.</p></div><div className={styles.facilityGrid}>{plannedFacilities.map(({ title, description, image, icon: Icon }) => <article className={styles.facilityCard} key={title}><Image src={image} alt={`${title} proposed design`} width={720} height={538} sizes="(max-width: 680px) 46vw, (max-width: 1100px) 30vw, 20vw" /><div><Icon aria-hidden="true" /><h3>{title}</h3><p>{description}</p></div></article>)}</div></section>
    <section className={styles.membership}><div className={styles.centerHeading}><h2>MEMBERSHIP DETAILS</h2><p>Become a valued member and support the creation of Sakshi Dham International.<br />Membership is available at the following contribution amounts:</p></div><div className={styles.membershipGrid}>{membershipPlans.map(({ title, amount: membershipAmount, icon: Icon }) => <article key={title}><Icon aria-hidden="true" /><div><h3>{title}</h3><strong>{membershipAmount}</strong></div></article>)}</div></section>
    <section className={styles.highlights}><div className={styles.centerHeading}><h2>PROJECT HIGHLIGHTS</h2></div><div>{projectHighlights.map(({ label, icon: Icon }) => <article key={label}><Icon aria-hidden="true" /><p>{label}</p></article>)}</div></section>
    <div className={styles.bottomCardsSection}>
      <section className={styles.referenceVisual} aria-labelledby="transformation-title">
        <Image src={transformationReferenceImage} alt="Sakshi Dham International, a place for inner transformation" width={1280} height={484} sizes="(max-width: 1400px) calc(100vw - 32px), 1280px" />
        <div className={styles.visualTextOverlay}>
          <h2 id="transformation-title" className={styles.visualTitleSelectable}>A PLACE FOR INNER TRANSFORMATION</h2>
        </div>
        <a className={styles.transformationCta} href="#contribute" aria-label="Donate now to Sakshi Dham">
          DONATE NOW <ArrowRight size={15} />
        </a>
      </section>

      <section className={styles.referenceVisualSecond} aria-labelledby="build-title">
        <Image src={donateReferenceImage} alt="Support Sakshi Dham International and help build a sacred space" width={1280} height={480} sizes="(max-width: 1400px) calc(100vw - 32px), 1280px" />
        <div className={styles.visualTextOverlaySecond}>
          <h2 id="build-title" className={styles.visualTitleSelectable}>LET&apos;S BUILD A SACRED SPACE FOR A MORE CONSCIOUS WORLD</h2>
        </div>
        <a className={styles.finalCtaButton} href="#contribute" aria-label="Donate now to Sakshi Dham">
          DONATE NOW <ArrowRight size={15} />
        </a>
      </section>
    </div>
  </div>;
}
