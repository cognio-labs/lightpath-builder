"use client";
import { useState, type FormEvent } from "react";
import Image from "next/image";
import {
  Users,
  Heart,
  Star,
  BookOpen,
  Utensils,
  Building2,
  TreePine,
  Flower2,
  GraduationCap,
  Laptop,
  CalendarDays,
  HandHeart,
  Megaphone,
  Settings,
  ArrowRight,
  Send,
  CheckCircle2,
  ClipboardList,
  PhoneCall,
  Compass,
  Sparkles,
} from "lucide-react";

/* ─── WhatsApp SVG icon ─── */
const WaIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.862L.057 23.743a.5.5 0 0 0 .615.63l6.064-1.591A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 0 1-5.032-1.385l-.36-.214-3.733.979 1.004-3.624-.235-.375A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
  </svg>
);

/* ─── 7 Sevas Data with Photorealistic Images & Dedicated Leaders ─── */
const sevas = [
  {
    id: "shiksha",
    name: "Shiksha Seva",
    desc: "Bringing education, books, and holistic opportunities to underprivileged children.",
    leader: "Mr. Pankaj Gupta",
    phone: "+91 93159 44774",
    img: "/images/volunteer/shiksha-seva-hd.webp",
    leaderImg: "/images/volunteer/leader-rajesh.webp",
    icon: BookOpen,
  },
  {
    id: "swasthya",
    name: "Swasthya Seva",
    desc: "Providing medical aid, healthcare camps, and holistic wellness to those in need.",
    leader: "Dr. Amit",
    phone: "+91 93159 44774",
    img: "/images/volunteer/swasthya-seva-hd.webp",
    leaderImg: "/images/volunteer/leader-amit.webp",
    icon: Heart,
  },
  {
    id: "nirman",
    name: "Nirman Seva",
    desc: "Contributing towards building learning spaces, community centers, and welfare facilities.",
    leader: "Apoorv Jain",
    phone: "+91 93159 44774",
    img: "/images/volunteer/nirman-seva-hd.webp",
    leaderImg: "/images/volunteer/leader-rohan.webp",
    icon: Building2,
  },
  {
    id: "annapurna",
    name: "Annapurna Seva",
    desc: "Serving freshly cooked nutritious meals and spreading love and nourishment.",
    leader: "Mr. Manish Omar",
    phone: "+91 93159 44774",
    img: "/images/volunteer/annapurna-seva-hd.webp",
    leaderImg: "/images/volunteer/leader-rajesh.webp",
    icon: Utensils,
  },
  {
    id: "gau-paryavaran",
    name: "Gau aur Paryavaran Seva",
    desc: "Caring for cows with compassion and dedication, and protecting our green planet.",
    leader: "Mr. Pramod Tripathi",
    phone: "+91 93159 44774",
    img: "/images/volunteer/gau-paryavaran-seva-hd.webp",
    leaderImg: "/images/volunteer/leader-anand.webp",
    icon: TreePine,
  },
  {
    id: "living-the-gita",
    name: "Living the Gita Movement",
    desc: "Spreading Gita's timeless wisdom, self-realization, and purposeful living in daily life.",
    leader: "Mr. Mannu Vashishth",
    phone: "+91 93159 44774",
    img: "/images/volunteer/living-the-gita-hd.webp",
    leaderImg: "/images/volunteer/leader-amit.webp",
    icon: Flower2,
  },
  {
    id: "prachar-prasar",
    name: "Prachar Prasar Seva",
    desc: "Media outreach, communication, and spreading divine consciousness to every home.",
    leader: "Bharat Atal & Adv. Hemant Ji",
    phone: "+91 93159 44774",
    img: "/images/volunteer/prachar-prasar-seva-hd.webp",
    leaderImg: "/images/volunteer/leader-pooja.webp",
    icon: Megaphone,
  },
];

const skills = [
  { label: "Teaching &\nEducation", Icon: GraduationCap },
  { label: "Digital &\nSocial Media", Icon: Laptop },
  { label: "Event\nManagement", Icon: CalendarDays },
  { label: "On-Ground\nSeva", Icon: HandHeart },
  { label: "Communication\n& Outreach", Icon: Megaphone },
  { label: "Professional\nSkills", Icon: Settings },
];

const whatsapp = (name: string) =>
  `https://wa.me/919315944774?text=${encodeURIComponent(
    `Hello Science Divine, I would like to volunteer for ${name}. Please connect me with the seva leader.`
  )}`;

const journeySteps = [
  {
    title: "Register Yourself",
    text: "Fill out the volunteer registration form.",
    Icon: ClipboardList,
  },
  {
    title: "Connect With Our Team",
    text: "Our team will reach out to understand your interests and availability.",
    Icon: PhoneCall,
  },
  {
    title: "Choose Your Seva",
    text: "Get connected with the relevant Seva Leader.",
    Icon: Compass,
  },
  {
    title: "Start Making a Difference",
    text: "Become an active part of the Science Divine Seva Mission.",
    Icon: Sparkles,
  },
];

const benefitsList = [
  { icon: Heart, text: "An opportunity to do something meaningful." },
  { icon: Star, text: "Use your talent and skills for a greater cause." },
  { icon: Users, text: "Connect with like-minded people." },
  { icon: GraduationCap, text: "Learn new skills and develop leadership." },
  { icon: Flower2, text: "Experience spirituality through service." },
];

/* ═══════════════════════════════════════════════════════════════ */
export default function Volunteer() {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const preferred = data.getAll("seva");
    if (!preferred.length) {
      setStatus("Please select at least one seva.");
      return;
    }
    setBusy(true);
    setStatus("");
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
          message: data.get("message"),
          meta: {
            source: "volunteer_page",
            city: data.get("city"),
            sevas: preferred,
            contribution: data.get("contribution"),
            mode: data.get("mode"),
            availability: data.get("availability"),
          },
        }),
      });
      if (!response.ok) throw new Error("Registration could not be saved. Please try again.");
      setDone(true);
      setStatus("Thank you for registering! Our team will contact you to begin your seva journey.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="vp">
      {/* ══════════════════════════════════════════════════════
          HERO SECTION (Clean Two-Column Layout)
      ══════════════════════════════════════════════════════ */}
      <section className="vp-hero">
        {/* Two-Column Hero Content */}
        <div className="vp-hero-body">
          <div className="vp-wrap vp-hero-grid">
            {/* Left Column – Content */}
            <div className="vp-hero-copy">
              <p className="vp-eyebrow">SCIENCE DIVINE | VOLUNTEER WITH PURPOSE</p>
              <h1 className="vp-hero-h1">Be the Reason Someone&rsquo;s World Changes.</h1>
              <h2 className="vp-hero-sub">Join as a Volunteer</h2>
              <p className="vp-hero-desc">
                Your time, talent and compassion can create meaningful change. Join Science Divine
                and become part of a mission that transforms lives through service.
              </p>
              <div className="vp-actions">
                <a className="vp-btn vp-btn--dark" href="#register">
                  <Users size={18} />
                  Join as a Volunteer <ArrowRight size={16} />
                </a>
                <a className="vp-btn vp-btn--gold" href="#sevas">
                  <Star size={17} />
                  Explore 7 Sevas
                </a>
              </div>
            </div>

            {/* Right Column – Hero Visual */}
            <div className="vp-hero-visual">
              <div className="vp-hero-photo-frame">
                <Image
                  src="/images/volunteer/volunteer-hero.webp"
                  alt="Science Divine volunteer helping Indian schoolchildren learn outdoors"
                  width={1280}
                  height={955}
                  priority
                  sizes="(max-width: 900px) 100vw, 48vw"
                  className="vp-hero-photo"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          WHY JOIN SCIENCE DIVINE
      ══════════════════════════════ */}
      <section className="vp-why">
        <div className="vp-wrap vp-why-inner">
          {/* Arched Meditation Art – Boy Meditation Image (Straight Forward Pose) */}
          <div className="vp-meditation-box">
            <Image
              src="/images/volunteer/meditation-boy.webp"
              alt="Indian boy meditating peacefully in Sukhasana straight forward pose - Science Divine"
              width={600}
              height={750}
              className="vp-meditation-img"
            />
          </div>

          {/* Text Content */}
          <div className="vp-why-text">
            <h2 className="vp-section-title">Why Join Science Divine?</h2>
            <p className="vp-why-tagline">
              Service is not just for others,<br />
              but also a path to your own growth.
            </p>
            <p className="vp-why-body">
              Our belief is that service is about developing compassion, love and dedication within
              ourselves. With Science Divine, you can create a positive change in society and find a
              new purpose in life.
            </p>
          </div>

          {/* Benefits List */}
          <div className="vp-benefits">
            <h3 className="vp-benefits-title">Here&rsquo;s What You&rsquo;ll Gain:</h3>
            {benefitsList.map(({ icon: Icon, text }) => (
              <div className="vp-benefit-row" key={text}>
                <span className="vp-benefit-icon"><Icon size={16} /></span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          7 SEVA CARDS (Real Photos + Leaders)
      ══════════════════════════════ */}
      <section id="sevas" className="vp-sevas">
        <div className="vp-wrap">
          <h2 className="vp-section-title vp-center">
            Your Interest, Your Ability – Countless Seva Opportunities!
          </h2>
          <p className="vp-sevas-sub">
            Explore 7 Special Seva Initiatives of Science Divine and choose the one that inspires you.
          </p>

          <div className="vp-cards">
            {sevas.map((s) => {
              const Icon = s.icon;
              return (
                <article className="vp-card" key={s.id}>
                  {/* Clean Real Seva Photo */}
                  <div className="vp-card-photo-wrap">
                    <Image
                      src={s.img}
                      alt={s.name}
                      width={960}
                      height={535}
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 300px"
                      className="vp-card-photo"
                    />
                  </div>
                  <div className="vp-card-body">
                    <div className="vp-card-icon"><Icon size={24} /></div>
                    <h3 className="vp-card-name">{s.name}</h3>
                    <p className="vp-card-desc">{s.desc}</p>
                    <div className="vp-leader">
                      <Image
                        src={s.leaderImg}
                        alt={s.leader}
                        width={84}
                        height={84}
                        className="vp-leader-avatar-img"
                      />
                      <div className="vp-leader-info">
                        <span className="vp-leader-label">
                          {s.leader.includes("&") ? "SEVA LEADERS" : "SEVA LEADER"}
                        </span>
                        <span className="vp-leader-name">{s.leader}</span>
                      </div>
                    </div>
                    <a
                      href={whatsapp(s.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="vp-wa-btn"
                      aria-label={`WhatsApp for ${s.name}`}
                    >
                      <WaIcon size={18} />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          WHAT CAN YOU CONTRIBUTE
      ══════════════════════════════ */}
      <section className="vp-contribute">
        <div className="vp-wrap">
          <div className="vp-contribute-head">
            <div>
              <h2 className="vp-section-title">What Can You Contribute?</h2>
              <p className="vp-contribute-sub">Your skills can make a difference!</p>
            </div>
            <p className="vp-together">Together for a Better World</p>
          </div>

          <div className="vp-skills-row">
            {skills.map(({ label, Icon }) => (
              <a href="#register" className="vp-skill-card" key={label}>
                <span className="vp-skill-icon"><Icon size={26} /></span>
                <strong className="vp-skill-label">{label.replace("\n", " ")}</strong>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          VOLUNTEER REGISTRATION FORM
      ══════════════════════════════ */}
      <section id="register" className="vp-register-wrap">
        <div className="vp-wrap">
          <div className="vp-register">
            <header className="vp-register-header">
              <Users size={20} />
              <h2>Become a Volunteer – Today!</h2>
              <p>Your seva journey starts here. Fill out the form below and be a part of our mission.</p>
            </header>

            {done ? (
              <div className="vp-success">
                <CheckCircle2 size={48} />
                <h3>Registration Successful!</h3>
                <p>{status}</p>
              </div>
            ) : (
              <form onSubmit={submit} className="vp-form">
                <div className="vp-form-grid">
                  {/* LEFT COLUMN: 1. Personal Details, 2. Preferred Mode, 3. Time Contribution */}
                  <div className="vp-form-col">
                    {/* 1. Personal Details */}
                    <fieldset className="vp-fieldset vp-form-card">
                      <legend>1. Personal Details</legend>
                      <div className="vp-personal-grid">
                        {[
                          { name: "name", label: "Full Name", type: "text", required: true, auto: "name" },
                          { name: "phone", label: "Mobile Number", type: "tel", required: true, auto: "tel" },
                          { name: "email", label: "Email Address", type: "email", required: false, auto: "email" },
                          { name: "city", label: "City / Location", type: "text", required: true, auto: "address-level2" },
                        ].map(({ name, label, type, required, auto }) => (
                          <label className="vp-field" key={name}>
                            <span>{label}{required ? " *" : ""}</span>
                            <input
                              name={name}
                              type={type}
                              required={required}
                              autoComplete={auto}
                              pattern={name === "phone" ? "[+0-9 ()\\-]{7,20}" : undefined}
                              maxLength={name === "email" ? 255 : 120}
                            />
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    {/* 2. Preferred Mode */}
                    <fieldset className="vp-fieldset vp-form-card">
                      <legend>2. Preferred Mode</legend>
                      <div className="vp-radios-row">
                        {["Online", "Offline", "Both Online & Offline"].map((s) => (
                          <label className="vp-radio-label" key={s}>
                            <input type="radio" name="mode" value={s} required />
                            <span>{s}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    {/* 3. Time Contribution */}
                    <fieldset className="vp-fieldset vp-form-card">
                      <legend>3. Time Contribution</legend>
                      <div className="vp-radios-grid">
                        {[
                          "2–4 Hours / Week",
                          "5–10 Hours / Week",
                          "10+ Hours / Week",
                          "As Per Availability",
                        ].map((s) => (
                          <label className="vp-radio-label" key={s}>
                            <input type="radio" name="availability" value={s} required />
                            <span>{s}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  </div>

                  {/* RIGHT COLUMN: 4. Preferred Seva, 5. How Would You Like to Contribute?, 6. Anything Else */}
                  <div className="vp-form-col">
                    {/* 4. Select Your Preferred Seva */}
                    <fieldset className="vp-fieldset vp-form-card">
                      <legend>4. Select Your Preferred Seva <small>(Multiple Select)</small></legend>
                      <div className="vp-checks">
                        {[...sevas.map((s) => s.name), "Open to Any Seva"].map((s) => (
                          <label className="vp-check-label" key={s}>
                            <input type="checkbox" name="seva" value={s} />
                            <span>{s}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    {/* 5. How Would You Like to Contribute? */}
                    <div className="vp-form-card">
                      <label className="vp-field vp-field-select">
                        <strong>5. How Would You Like to Contribute?</strong>
                        <select name="contribution" required defaultValue="">
                          <option value="" disabled>Select Option</option>
                          {[
                            "Teaching & Education",
                            "Social Media & Marketing",
                            "Graphic Design & Video Editing",
                            "Event Management",
                            "Calling & Coordination",
                            "Fundraising & Outreach",
                            "Ground-Level Activities",
                            "Technical & Professional Skills",
                            "Other",
                          ].map((s) => <option key={s}>{s}</option>)}
                        </select>
                      </label>

                      {/* 6. Anything Else You Would Like to Share? */}
                      <label className="vp-field vp-field-textarea">
                        <strong>6. Anything Else You Would Like to Share?</strong>
                        <textarea
                          name="message"
                          maxLength={4000}
                          placeholder="Share your interests, skills, or questions…"
                          rows={3}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {status && !done && <p className="vp-status">{status}</p>}

                {/* Clearly Visible Register Now Button (Inside Form Container) */}
                <div className="vp-submit-wrap">
                  <button type="submit" disabled={busy} className="vp-submit-btn">
                    <Send size={18} />
                    <span>{busy ? "Registering…" : "Register Now →"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          SEVA JOURNEY STEPS
      ══════════════════════════════ */}
      <section className="vp-journey">
        <div className="vp-wrap">
          <h2 className="vp-section-title vp-center">Your Journey of Seva Starts Here!</h2>
          <div className="vp-steps">
            {journeySteps.map(({ title, text, Icon }, i) => (
              <article className="vp-step" key={title}>
                <div className="vp-step-badge">
                  <span className="vp-step-num">{i + 1}</span>
                </div>
                <div className="vp-step-card">
                  <span className="vp-step-icon"><Icon size={20} /></span>
                  <h3 className="vp-step-title">{title}</h3>
                  <p className="vp-step-text">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          FINAL CTA BANNER
      ══════════════════════════════ */}
      <section className="vp-final">
        <div className="vp-final-left">
          <p className="vp-final-script">Let&rsquo;s Take a Small Step</p>
          <p className="vp-final-script">for a Big Change!</p>
        </div>
        <div className="vp-final-center">
          <h2 className="vp-final-h2">
            Join the Science Divine Volunteer Community and be a part of this journey of positive change.
          </h2>
          <a
            className="vp-btn vp-btn--gold vp-final-cta"
            href={whatsapp("the Volunteer Community")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Users size={20} />
            JOIN OUR VOLUNTEER COMMUNITY <ArrowRight size={18} />
          </a>
        </div>
        <div className="vp-final-logo" aria-label="Science Divine">
          <span>Science Divine</span>
          <small>Awakening Hearts, Transforming Lives</small>
        </div>
      </section>
    </div>
  );
}
