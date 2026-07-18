import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, Clock, MapPin, Sparkles, Check, ChevronDown, Award, Star, Play, Users } from "lucide-react";

export const Route = createFileRoute("/sunday-event-1-february")({
  head: () => ({
    meta: [
      { title: "FREE Masterclass: Discover the Power of Meditation | Science Divine Foundation" },
      {
        name: "description",
        content:
          "Join Sakshi Shree for a free masterclass on 1 February 2026 to find peace, clarity and joy. Register now.",
      },
      { property: "og:title", content: "FREE Meditation Masterclass — Science Divine Foundation" },
      { property: "og:url", content: "/sunday-event-1-february" },
    ],
    links: [{ rel: "canonical", href: "/sunday-event-1-february" }],
  }),
  component: Page,
});

/* ─── Data ─── */
const STORIES = [
  {
    name: "Dheeraj Madaan",
    role: "IIT Roorkee, IIM Lucknow, Management Consultant",
    quote: "I cannot believe I didn't find this sooner. The clarity of life I found through Guruji's teachings and meditation techniques cannot be measured in terms of money. Highly recommend everyone to attend his meditation camp and experience it yourself.",
    img: "https://sciencedivine.org/wp-content/uploads/2024/12/Mask-group-7.png",
  },
  {
    name: "Nancy Thakur",
    role: "SRCC, ISB, Conversion Optimization Lead",
    quote: "Guruji's meditation kriyas are extremely simple to follow. Sanjeevani kriya helped me get rid of the stress & negativity that was stopping me from going deep into meditation and made me an extremely calm minded person. Truly the best investment of my life on myself!",
    img: "https://sciencedivine.org/wp-content/uploads/2024/12/Mask-group-6.png",
  },
  {
    name: "Dr. Vikram Sampath",
    role: "Top Indian Historian & Writer",
    quote: "Sakshi Shree's blessings and guidance have had a profound impact on my life, leading me towards growth and spiritual fulfillment. I am deeply grateful for Guruji's wisdom and presence in my journey.",
    img: "https://sciencedivine.org/wp-content/uploads/2025/01/Untitled-design-3-1.png",
  },
];

const LEARN_POINTS = [
  {
    title: "Strengthen Your Intuition",
    desc: "Your intuition is more than a feeling—it’s your inner compass. Learn how to connect with this powerful inner guide and gain clarity, and confidence in every decision you make.",
  },
  {
    title: "Say Goodbye to Stress in Minutes",
    desc: "In just 15 minutes, learn how to release negativity and experience immediate calm and balance.",
  },
  {
    title: "Boost Your Health and Energy Naturally",
    desc: "Feel recharged and rejuvenated with meditation’s physical benefits. Sleep better, reduce blood pressure, and energize your body to take on life with renewed vitality.",
  },
];

const LEADERS = [
  {
    name: "Hon'ble Shri Rajnath Singh",
    role: "Minister of Defence, Government of India",
    img: "https://sciencedivine.org/wp-content/uploads/2023/06/3-scaled.webp",
  },
  {
    name: "Dr. Vikram Sampat",
    role: "Famous Indian Historian and seeker",
    img: "https://sciencedivine.org/wp-content/uploads/2023/06/4-scaled.webp",
  },
  {
    name: "Shri Ajay Bhatt",
    role: "Ex-Union Minister of State for Defense & Tourism",
    img: "https://sciencedivine.org/wp-content/uploads/2023/06/1-scaled.webp",
  },
  {
    name: "Shri Anil Bachoo",
    role: "Minister of Health and Wellness of Mauritius",
    img: "https://sciencedivine.org/wp-content/uploads/2023/06/2-scaled.webp",
  },
];

const GALLERY = [
  "https://sciencedivine.org/wp-content/uploads/2024/12/WhatsApp-Image-2024-07-13-at-18.25.34_73815f1e-1-1.png",
  "https://sciencedivine.org/wp-content/uploads/2024/12/WhatsApp-Image-2024-07-26-at-11.39.06_81ab3a55-1.png",
  "https://sciencedivine.org/wp-content/uploads/2024/12/WhatsApp-Image-2024-07-26-at-12.20.57_e5bc8a98-1.png",
  "https://sciencedivine.org/wp-content/uploads/2024/12/WhatsApp-Image-2024-07-26-at-12.35.22_a5b77f0a-1.png",
  "https://sciencedivine.org/wp-content/uploads/2024/12/WhatsApp-Image-2024-07-26-at-12.35.24_2181c7cf-1.png",
];

const INCLUDED = [
  {
    title: "Science of Mind Power",
    prob: "Struggling with negativity while trying to stay positive and manifest your dreams? Quick motivational boosts often fade when reality hits.",
    sol: "Mind power meditation. This proven practice rewires your mind into a positivity powerhouse.",
    benefit: "From glowing skin to dream careers or finding love, unlock your potential and make your goals a reality.",
  },
  {
    title: "Science of No Mind",
    prob: "Can’t calm your mind? Mental chatter and burnout leave no room for peace, even during sleep.",
    sol: "Sanjeevani Kriya, a 30-minute meditation, resets your overworked brain.",
    benefit: "Instantly reduce stress, sleep deeply, and recharge your energy.",
  },
  {
    title: "Science of Joyful Living",
    prob: "Happiness tied to life events leaves us vulnerable to life’s chaos.",
    sol: "Inner cleansing meditation teaches unconditional joy as a Sakshi—an observer of life.",
    benefit: "Flush out negativity, nurture inner peace, and find happiness that never leaves you.",
  },
  {
    title: "Exclusive network to connect, and build friendships",
    prob: "Many people feel isolated and disconnected in their journey of self-discovery and personal growth.",
    sol: "Our in-person meditation masterclass provides an exclusive network where you can connect with like-minded individuals who share your passion for personal growth.",
    benefit: "Build lifelong friendships, gain support, and accelerate your personal growth while finding joy and purpose through a transformative community experience.",
  },
];

const FAQS = [
  {
    q: "How is this workshop different from other meditation programs?",
    a: "This workshop is designed to make meditation accessible and affordable for everyone. Unlike typical programs, it offers a blend of online and in-person sessions along with personalized guidance —all designed to create lasting transformation.",
  },
  {
    q: "Do I need any prior experience with meditation before I take these sessions?",
    a: "No, these sessions are designed for everyone—beginners and experienced meditators alike.",
  },
  {
    q: "I've tried meditation before and it didn't work, is this workshop for me?",
    a: "Absolutely! Many participants who struggled with meditation before have found profound success through these sessions. Give it a try—you may be surprised at the transformation!",
  },
  {
    q: "How soon can I expect results after joining the workshop?",
    a: "9/10 participants notice a sense of calm, clarity, and reduced stress after just one session. With consistent practice for 21 days, deeper transformations in mental, emotional, and physical well-being follow.",
  },
  {
    q: "How do I join the workshops after registering?",
    a: "Once you register, you can join the whatsapp group, the link for which will be shown after you submit your registration. The whatsapp group will have all the information for the session. Additionally, you will also get an email, with link to the session.",
  },
  {
    q: "What if I miss a workshop? Will there be recordings available?",
    a: "Yes, we will provide the recording link in the whatsapp group. You can join the whatsapp group through the link provided after you submit your registration.",
  },
];

const VIDEOS = [
  { id: "jEiClzy2ZhY", title: "Guruji Read my Mind & wrote in his Diary — Pulkit Jain" },
  { id: "4XbvVT7yK2U", title: "Bobby Mann Testimonial | Sakshi Shree" },
  { id: "XaOeGL4Mp2E", title: "IITian Dheeraj Madaan from IIT Roorkee sharing experience" },
  { id: "60_cJkCAc5I", title: "Magic of Meeting Sakshi Shree | Gaurav Pratap" },
];

/* ─── Component ─── */
function Page() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [sent, setSent] = useState(false);

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div style={{ background: "#FFFFFF", color: "#1E293B", fontFamily: "'Inter', sans-serif" }}>

      {/* ═══ HERO ═══ */}
      <section style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)", paddingTop: "140px", paddingBottom: "80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div className="container-page" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px", alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: "100px", padding: "6px 16px", marginBottom: "20px" }}>
                <Sparkles size={14} style={{ color: "#D4AF37" }} />
                <span style={{ color: "#D4AF37", fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>FREE Masterclass</span>
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.15, marginBottom: "16px" }}>
                Discover the Power of Meditation to Find Peace, Clarity and Joy
              </h1>
              <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.6, marginBottom: "24px" }}>
                Join Sakshi Shree, an enlightened spiritual master and mystic with 40 years of experience, as he helps you unlock the calm and clarity already within you.
              </p>

              {/* Event quick details */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", color: "rgba(255,255,255,0.75)", fontSize: "0.9rem", marginBottom: "32px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><Calendar size={16} style={{ color: "#D4AF37" }} /> <span>1 February 2026</span></div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><Clock size={16} style={{ color: "#D4AF37" }} /> <span>10 AM onwards</span></div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}><MapPin size={16} style={{ color: "#D4AF37", flexShrink: 0, marginTop: "2px" }} /> <span>Siddha Sudarshan Sakshi Dham 9, Avanthika Rd, Chiranjiv Vihar, Shastri Nagar, Ghaziabad, UP 201002</span></div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
                <a href="#register" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg, #F59E0B, #D4AF37)", color: "#0F172A", padding: "16px 36px", borderRadius: "100px", fontWeight: 800, fontSize: "1rem", textDecoration: "none", boxShadow: "0 8px 30px rgba(212,175,55,0.3)" }}>
                  Join Now for FREE <span style={{ textDecoration: "line-through", color: "rgba(15,23,42,0.6)", fontSize: "0.85rem", marginLeft: "4px" }}>₹199</span>
                </a>
              </div>
            </div>
            <div>
              <img src="https://sciencedivine.org/wp-content/uploads/2025/03/Untitled-design-2-1.webp" alt="Meditation Class" style={{ width: "100%", height: "auto", borderRadius: "24px", boxShadow: "0 20px 50px rgba(0,0,0,0.3)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ background: "#FAF9F6", padding: "40px 0", borderBottom: "1px solid #E2E8F0" }}>
        <div className="container-page">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "28px", textAlign: "center" }}>
            {[
              { val: "10M+", label: "Students Impacted" },
              { val: "85+", label: "Events Organized Globally" },
              { val: "9/10", label: "Feel inner peace and clarity" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 800, color: "#B45309" }}>{s.val}</div>
                <div style={{ fontSize: "11px", color: "#64748B", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "4px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Anchor Form */}
      <section id="register" className="section-pad" style={{ background: "#FFFFFF" }}>
        <div className="container-page" style={{ maxWidth: "600px" }}>
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <span style={{ fontSize: "11px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Limited Time Offer</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: "#0F172A", marginTop: "4px" }}>Submit this form to book your spot</h2>
          </div>

          {sent ? (
            <div style={{ background: "#F0FDF4", border: "1px solid #DCFCE7", borderRadius: "24px", padding: "40px", textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>🎉</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "#0F172A" }}>Spot Reserved Successfully!</h3>
              <p style={{ color: "#64748B", marginTop: "8px", fontSize: "0.95rem" }}>
                We've sent the details and WhatsApp group invite link to your email. See you at the event!
              </p>
            </div>
          ) : (
            <form onSubmit={handleRegister} style={{ background: "#FFFDF9", border: "1px solid #F1E9D2", borderRadius: "24px", padding: "40px", display: "flex", flexDirection: "column", gap: "16px", boxShadow: "0 10px 30px rgba(212,175,55,0.03)" }}>
              {[
                { key: "name", label: "Name", type: "text", placeholder: "Your Name" },
                { key: "phone", label: "Phone Number", type: "tel", placeholder: "Phone Number" },
                { key: "email", label: "Email", type: "email", placeholder: "Email Address" },
              ].map((f) => (
                <div key={f.key}>
                  <label htmlFor={f.key} style={{ fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>{f.label}</label>
                  <input required id={f.key} type={f.type} placeholder={f.placeholder} value={(formData as Record<string, string>)[f.key]} onChange={(e) => setFormData((p) => ({ ...p, [f.key]: e.target.value }))} style={{ width: "100%", background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "12px 16px", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" }} />
                </div>
              ))}
              <p style={{ fontSize: "10px", color: "#64748B", lineHeight: 1.5, marginTop: "8px" }}>
                By registering for the above, you confirm that you agree to the Terms of Use & the Privacy Policy as well as receiving notification for future events. You can withdraw your consent at any time by unsubscribing.
              </p>
              <button type="submit" style={{ background: "linear-gradient(135deg, #F59E0B, #D4AF37)", color: "#0F172A", border: "none", borderRadius: "100px", padding: "14px", fontWeight: 800, fontSize: "0.95rem", cursor: "pointer", transition: "opacity 0.2s" }}>
                Reserve My Spot Now
              </button>
            </form>
          )}
        </div>
      </section>

      {/* What you'll learn */}
      <section className="section-pad" style={{ background: "#FAF9F6" }}>
        <div className="container-page">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px", alignItems: "center" }}>
            <div>
              <span style={{ fontSize: "11px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Masterclass Agenda</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "#0F172A", marginTop: "4px", marginBottom: "20px" }}>What you’ll learn</h2>
              <p style={{ color: "#64748B", fontSize: "1rem", lineHeight: 1.7, marginBottom: "28px" }}>
                What if your mind held the key to creating the life you’ve always wanted? Learn how to transform every area of your life—health, wealth, love, and happiness.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {LEARN_POINTS.map((lp, i) => (
                  <div key={i} style={{ display: "flex", gap: "12px" }}>
                    <div style={{ width: "24px", height: "24px", borderRadius: "100px", background: "rgba(212,175,55,0.15)", display: "grid", placeItems: "center", color: "#B45309", flexShrink: 0 }}><Check size={14} /></div>
                    <div>
                      <h4 style={{ fontWeight: 800, color: "#0F172A", fontSize: "0.95rem" }}>{lp.title}</h4>
                      <p style={{ color: "#64748B", fontSize: "0.825rem", lineHeight: 1.5, marginTop: "4px" }}>{lp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img src="https://sciencedivine.org/wp-content/uploads/2025/01/group-five-yogi-females-sitting-sukhasana-683x1024.webp" alt="Yogi group" style={{ width: "100%", height: "auto", borderRadius: "24px", boxShadow: "0 10px 30px rgba(0,0,0,0.06)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Meet Sakshi Shree */}
      <section className="section-pad" style={{ background: "#FFFFFF" }}>
        <div className="container-page">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px", alignItems: "center" }}>
            <div>
              <img src="https://sciencedivine.org/wp-content/uploads/2025/01/dhyan-with-happy-face-copy-1-1-896x1024.webp" alt="Sakshi Shree Ji" style={{ width: "100%", maxWidth: "380px", height: "auto", borderRadius: "24px", margin: "0 auto", display: "block" }} />
            </div>
            <div>
              <span style={{ fontSize: "11px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>The Guide</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "#0F172A", marginTop: "4px", marginBottom: "20px" }}>Meet Sakshi Shree</h2>
              <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "24px" }}>
                Sakshi Shree is a world-renowned mystic and enlightened spiritual master with over 40 years of intense research and experience guiding people to harness the power of spirituality and meditation for profound self-discovery, and a life of purpose.
              </p>
              <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "32px" }}>
                As the founder of the Science Divine Foundation, Sakshi Shree’s transformative techniques are uniquely designed to empower each person to tap into their innate, limitless potential, achieving both material success and spiritual heights. Sakshi Shree’s impact is truly global – he has transformed millions of lives across the world.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {[
                  { t: "40+ Years of Expertise", d: "A seasoned guide in spirituality & meditation." },
                  { t: "Science Divine Founder", d: "Spreading conscious living globally." },
                  { t: "Societal Welfare", d: "Science Divine Vidyapeeth offering free slum school." },
                  { t: "Former Civil Servant", d: "Served as esteemed RTO officer before mission." }
                ].map((item, i) => (
                  <div key={i} style={{ background: "#FAF9F6", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "16px" }}>
                    <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#B45309", marginBottom: "4px" }}>{item.t}</div>
                    <div style={{ fontSize: "0.75rem", color: "#64748B" }}>{item.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video intro block */}
      <section style={{ background: "linear-gradient(135deg, #0F172A, #1E293B)", padding: "80px 0", textAlign: "center" }}>
        <div className="container-page" style={{ maxWidth: "800px" }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", color: "#FFFFFF", marginBottom: "24px" }}>Watch Guruji's Message</h3>
          <div style={{ position: "relative", paddingTop: "56.25%", background: "#000", borderRadius: "24px", overflow: "hidden", boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}>
            <iframe src="https://www.youtube.com/embed/BWb67JoBpTg" title="Guruji Video Message" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }} />
          </div>
        </div>
      </section>

      {/* Recognition */}
      <section className="section-pad" style={{ background: "#FAF9F6" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ fontSize: "11px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Recognition</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#0F172A", marginTop: "4px" }}>Recognized by Top Leaders & Media</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px", marginBottom: "48px" }}>
            {LEADERS.map((l, i) => (
              <div key={i} style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", overflow: "hidden" }}>
                <img src={l.img} alt={l.name} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                <div style={{ padding: "16px" }}>
                  <div style={{ fontWeight: 800, color: "#0F172A", fontSize: "0.9rem" }}>{l.name}</div>
                  <p style={{ color: "#64748B", fontSize: "0.75rem", marginTop: "4px" }}>{l.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "16px", overflowX: "auto", paddingBottom: "10px" }}>
            {GALLERY.map((g, i) => (
              <img key={i} src={g} alt={`Gallery ${i + 1}`} style={{ height: "180px", width: "auto", borderRadius: "16px", objectFit: "cover" }} />
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="section-pad" style={{ background: "#FFFFFF" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={{ fontSize: "11px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Curriculum Details</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "#0F172A", marginTop: "4px" }}>What's Included</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "28px" }}>
            {INCLUDED.map((inc, i) => (
              <div key={i} style={{ background: "#FFFDF9", border: "1px solid #F1E9D2", borderRadius: "20px", padding: "32px 24px" }}>
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", fontWeight: 700, color: "#0F172A", marginBottom: "16px" }}>{inc.title}</h4>
                <div style={{ marginBottom: "12px" }}>
                  <span style={{ fontSize: "10px", fontWeight: 800, color: "#EF4444", textTransform: "uppercase" }}>Problem</span>
                  <p style={{ color: "#64748B", fontSize: "0.8rem", marginTop: "2px" }}>{inc.prob}</p>
                </div>
                <div style={{ marginBottom: "12px" }}>
                  <span style={{ fontSize: "10px", fontWeight: 800, color: "#22C55E", textTransform: "uppercase" }}>Solution</span>
                  <p style={{ color: "#64748B", fontSize: "0.8rem", marginTop: "2px" }}>{inc.sol}</p>
                </div>
                <div>
                  <span style={{ fontSize: "10px", fontWeight: 800, color: "#D4AF37", textTransform: "uppercase" }}>Benefit</span>
                  <p style={{ color: "#64748B", fontSize: "0.8rem", marginTop: "2px" }}>{inc.benefit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voice of Transformation Slider */}
      <section className="section-pad" style={{ background: "#FAF9F6" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ fontSize: "11px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Seeker Experiences</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#0F172A", marginTop: "4px" }}>Voice of Transformation</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
            {VIDEOS.map((v, i) => (
              <div key={i} style={{ background: "#FFFFFF", borderRadius: "16px", overflow: "hidden", border: "1px solid #E2E8F0" }}>
                <div style={{ position: "relative", paddingTop: "56.25%" }}>
                  <iframe src={`https://www.youtube.com/embed/${v.id}`} title={v.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }} />
                </div>
                <div style={{ padding: "16px" }}>
                  <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0F172A" }}>{v.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seeker success stories */}
      <section className="section-pad" style={{ background: "#FFFFFF" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={{ fontSize: "11px", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Seeker success stories</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "#0F172A", marginTop: "4px" }}>What seekers say after meeting Sakshi Shree</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "28px" }}>
            {STORIES.map((s, i) => (
              <div key={i} style={{ background: "#FAF9F6", border: "1px solid #E2E8F0", borderRadius: "20px", padding: "28px" }}>
                <p style={{ color: "#475569", fontSize: "0.875rem", lineHeight: 1.6, fontStyle: "italic", marginBottom: "20px" }}>"{s.quote}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <img src={s.img} alt={s.name} style={{ width: "44px", height: "44px", borderRadius: "100px", objectFit: "cover" }} />
                  <div>
                    <div style={{ fontWeight: 800, color: "#0F172A", fontSize: "0.85rem" }}>{s.name}</div>
                    <div style={{ fontSize: "0.7rem", color: "#64748B" }}>{s.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-pad" style={{ background: "#FAF9F6" }}>
        <div className="container-page" style={{ maxWidth: "800px" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#0F172A" }}>FAQs</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {FAQS.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
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
