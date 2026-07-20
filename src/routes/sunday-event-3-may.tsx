import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, Clock, MapPin, Leaf, ChevronDown, Star } from "lucide-react";

export const Route = createFileRoute("/sunday-event-3-may")({
  head: () => ({
    meta: [
      { title: "FREE Masterclass: Discover the Power of Meditation | Science Divine Foundation" },
      { name: "description", content: "Join Sakshi Shree for a free masterclass on 3 May 2026 to find peace, clarity and joy. Register now." },
      { property: "og:title", content: "FREE Meditation Masterclass - 3 May 2026 - Science Divine Foundation" },
      { property: "og:url", content: "/sunday-event-3-may" },
    ],
    links: [{ rel: "canonical", href: "/sunday-event-3-may" }],
  }),
  component: Page,
});

const STORIES = [
  { name: "Dheeraj Madaan", role: "IIT Roorkee, IIM Lucknow, Management Consultant", quote: "I cannot believe I didn't find this sooner. The clarity of life I found through Guruji's teachings and meditation techniques cannot be measured in terms of money. Highly recommend everyone to attend his meditation camp and experience it yourself.", img: "https://sciencedivine.org/wp-content/uploads/2024/12/Mask-group-7.png", stars: 5 },
  { name: "Nancy Thakur", role: "SRCC, ISB, Conversion Optimization Lead", quote: "Guruji's meditation kriyas are extremely simple to follow. Sanjeevani kriya helped me get rid of the stress and negativity that was stopping me from going deep into meditation and made me an extremely calm minded person. Truly the best investment of my life on myself!", img: "https://sciencedivine.org/wp-content/uploads/2024/12/Mask-group-6.png", stars: 5 },
  { name: "Dr. Vikram Sampath", role: "Top Indian Historian and Writer", quote: "Sakshi Shree's blessings and guidance have had a profound impact on my life, leading me towards growth and spiritual fulfillment. I am deeply grateful for Guruji's wisdom and presence in my journey.", img: "https://sciencedivine.org/wp-content/uploads/2025/01/Untitled-design-3-1.png", stars: 5 },
];

const LEARN_POINTS = [
  { icon: "🧭", title: "Strengthen Your Intuition", desc: "Your intuition is more than a feeling, it's your inner compass. Learn how to connect with this powerful inner guide and gain clarity, and confidence in every decision you make." },
  { icon: "🌿", title: "Say Goodbye to Stress in Minutes", desc: "In just 15 minutes, learn how to release negativity and experience immediate calm and balance." },
  { icon: "⚡", title: "Boost Your Health and Energy Naturally", desc: "Feel recharged and rejuvenated with meditation's physical benefits. Sleep better, reduce blood pressure, and energize your body to take on life with renewed vitality." },
];

const LEADERS = [
  { name: "Hon'ble Shri Rajnath Singh", role: "Minister of Defence, Government of India", img: "https://sciencedivine.org/wp-content/uploads/2023/06/3-scaled.webp" },
  { name: "Dr. Vikram Sampat", role: "Famous Indian Historian and seeker", img: "https://sciencedivine.org/wp-content/uploads/2023/06/4-scaled.webp" },
  { name: "Shri Ajay Bhatt", role: "Ex-Union Minister of State for Defense and Tourism", img: "https://sciencedivine.org/wp-content/uploads/2023/06/1-scaled.webp" },
  { name: "Shri Anil Bachoo", role: "Minister of Health and Wellness of Mauritius", img: "https://sciencedivine.org/wp-content/uploads/2023/06/2-scaled.webp" },
];

const GALLERY = [
  "https://sciencedivine.org/wp-content/uploads/2024/12/WhatsApp-Image-2024-07-13-at-18.25.34_73815f1e-1-1.png",
  "https://sciencedivine.org/wp-content/uploads/2024/12/WhatsApp-Image-2024-07-26-at-11.39.06_81ab3a55-1.png",
  "https://sciencedivine.org/wp-content/uploads/2024/12/WhatsApp-Image-2024-07-26-at-12.20.57_e5bc8a98-1.png",
  "https://sciencedivine.org/wp-content/uploads/2024/12/WhatsApp-Image-2024-07-26-at-12.35.22_a5b77f0a-1.png",
  "https://sciencedivine.org/wp-content/uploads/2024/12/WhatsApp-Image-2024-07-26-at-12.35.24_2181c7cf-1.png",
];

const INCLUDED = [
  { title: "Science of Mind Power", emoji: "🧠", prob: "Struggling with negativity while trying to stay positive and manifest your dreams? Quick motivational boosts often fade when reality hits.", sol: "Mind power meditation. This proven practice rewires your mind into a positivity powerhouse.", benefit: "From glowing skin to dream careers or finding love, unlock your potential and make your goals a reality." },
  { title: "Science of No Mind", emoji: "🌌", prob: "Can't calm your mind? Mental chatter and burnout leave no room for peace, even during sleep.", sol: "Sanjeevani Kriya, a 30-minute meditation, resets your overworked brain.", benefit: "Instantly reduce stress, sleep deeply, and recharge your energy." },
  { title: "Science of Joyful Living", emoji: "☀️", prob: "Happiness tied to life events leaves us vulnerable to life's chaos.", sol: "Inner cleansing meditation teaches unconditional joy as a Sakshi, an observer of life.", benefit: "Flush out negativity, nurture inner peace, and find happiness that never leaves you." },
  { title: "Exclusive Community Network", emoji: "🤝", prob: "Many people feel isolated and disconnected in their journey of self-discovery and personal growth.", sol: "Our in-person masterclass provides an exclusive network to connect with like-minded individuals.", benefit: "Build lifelong friendships, gain support, and accelerate your personal growth." },
];

const FAQS = [
  { q: "How is this workshop different from other meditation programs?", a: "This workshop is designed to make meditation accessible and affordable for everyone. Unlike typical programs, it offers a blend of online and in-person sessions along with personalized guidance, all designed to create lasting transformation." },
  { q: "Do I need any prior experience with meditation before I take these sessions?", a: "No, these sessions are designed for everyone, beginners and experienced meditators alike." },
  { q: "I've tried meditation before and it didn't work, is this workshop for me?", a: "Absolutely! Many participants who struggled with meditation before have found profound success through these sessions. Give it a try, you may be surprised at the transformation!" },
  { q: "How soon can I expect results after joining the workshop?", a: "9/10 participants notice a sense of calm, clarity, and reduced stress after just one session. With consistent practice for 21 days, deeper transformations follow." },
  { q: "How do I join the workshops after registering?", a: "Once you register, you can join the WhatsApp group, the link for which will be shown after you submit your registration. The WhatsApp group will have all the information for the session." },
  { q: "What if I miss a workshop? Will there be recordings available?", a: "Yes, we will provide the recording link in the WhatsApp group. You can join the group through the link provided after you submit your registration." },
];

const VIDEOS = [
  { id: "jEiClzy2ZhY", title: "Guruji Read my Mind and wrote in his Diary ,  Pulkit Jain" },
  { id: "4XbvVT7yK2U", title: "Bobby Mann Testimonial | Sakshi Shree" },
  { id: "XaOeGL4Mp2E", title: "IITian Dheeraj Madaan from IIT Roorkee sharing experience" },
  { id: "60_cJkCAc5I", title: "Magic of Meeting Sakshi Shree | Gaurav Pratap" },
];

function Page() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [sent, setSent] = useState(false);
  function handleRegister(e: React.FormEvent) { e.preventDefault(); setSent(true); }

  const H = "#052912"; const H2 = "#0A3D1F";
  const G = "#4ADE80"; const Gd = "rgba(74,222,128,0.12)"; const Gb = "rgba(74,222,128,0.25)";
  const Au = "#D4AF37"; const T = "#1E293B"; const TL = "#64748B";
  const W = "#FFFFFF"; const BG = "#F0FDF4"; const CG = "#F7FEFA"; const BrG = "#D1FAE5";

  return (
    <div style={{ background: W, color: T, fontFamily: "'Inter', sans-serif" }}>

      {/* HERO */}
      <section style={{ background: `linear-gradient(135deg, ${H} 0%, ${H2} 60%, #073D1A 100%)`, paddingTop: "140px", paddingBottom: "80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-120px", right: "-80px", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(74,222,128,0.10) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-80px", left: "-60px", width: "350px", height: "350px", background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div className="container-page" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "56px", alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: Gd, border: `1px solid ${Gb}`, borderRadius: "100px", padding: "6px 18px", marginBottom: "24px" }}>
                <Leaf size={14} style={{ color: G }} />
                <span style={{ color: G, fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" as const }}>FREE Masterclass · 3 May 2026</span>
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.4rem)", fontWeight: 800, color: W, lineHeight: 1.15, marginBottom: "20px" }}>
                Discover the Power of <span style={{ color: G }}>Meditation</span> to Find Peace, Clarity and Joy
              </h1>
              <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.80)", lineHeight: 1.7, marginBottom: "28px" }}>
                Join Sakshi Shree, an enlightened spiritual master and mystic with 40 years of experience, as he helps you unlock the calm and clarity already within you.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", color: "rgba(255,255,255,0.70)", fontSize: "0.9rem", marginBottom: "36px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}><Calendar size={16} style={{ color: G }} /><span>3 May 2026</span></div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}><Clock size={16} style={{ color: G }} /><span>10 AM onwards</span></div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}><MapPin size={16} style={{ color: G, flexShrink: 0, marginTop: "2px" }} /><span>Siddha Sudarshan Sakshi Dham 9, Avanthika Rd, Chiranjiv Vihar, Shastri Nagar, Ghaziabad, UP 201002</span></div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center" }}>
                <a href="#register" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg, #22C55E, #16A34A)", color: W, padding: "16px 38px", borderRadius: "100px", fontWeight: 800, fontSize: "1rem", textDecoration: "none", boxShadow: "0 8px 30px rgba(34,197,94,0.35)" }}>
                  Join Now for FREE <span style={{ textDecoration: "line-through", color: "rgba(255,255,255,0.55)", fontSize: "0.85rem", marginLeft: "4px" }}>&#8377;199</span>
                </a>
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>Registration is limited</span>
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", inset: "-8px", background: "linear-gradient(135deg, rgba(74,222,128,0.2), rgba(212,175,55,0.15))", borderRadius: "32px", filter: "blur(16px)" }} />
              <img src="https://sciencedivine.org/wp-content/uploads/2025/01/group-five-yogi-females-sitting-sukhasana-683x1024.webp" alt="Meditation May 2026" style={{ width: "100%", height: "auto", borderRadius: "24px", boxShadow: "0 24px 60px rgba(0,0,0,0.4)", position: "relative", zIndex: 1 }} />
              <div style={{ position: "absolute", bottom: "24px", left: "-20px", background: "rgba(255,255,255,0.95)", backdropFilter: "blur(16px)", borderRadius: "16px", padding: "16px 24px", boxShadow: "0 8px 30px rgba(0,0,0,0.12)", zIndex: 2 }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 800, color: "#16A34A" }}>130+</div>
                <div style={{ fontSize: "11px", color: TL, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>Events Organized</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: BG, padding: "44px 0", borderBottom: `1px solid ${BrG}` }}>
        <div className="container-page">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "32px", textAlign: "center" }}>
            {[{ val: "10M+", label: "Students Impacted Worldwide", icon: "🌍" }, { val: "130+", label: "Events Organized Globally", icon: "🗓️" }, { val: "9/10", label: "Feel inner peace and clarity", icon: "☮️" }].map((s, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                <div style={{ fontSize: "1.4rem", marginBottom: "4px" }}>{s.icon}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 800, color: "#16A34A" }}>{s.val}</div>
                <div style={{ fontSize: "11px", color: TL, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REGISTRATION */}
      <section id="register" className="section-pad" style={{ background: W }}>
        <div className="container-page" style={{ maxWidth: "640px" }}>
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <span style={{ fontSize: "11px", color: "#16A34A", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>Limited Time Offer</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.9rem", fontWeight: 700, color: T, marginTop: "6px" }}>Submit this form to book your spot</h2>
          </div>
          {sent ? (
            <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: "24px", padding: "48px", textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🎉</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700, color: T }}>Spot Reserved Successfully!</h3>
              <p style={{ color: TL, marginTop: "12px", fontSize: "0.95rem", lineHeight: 1.6 }}>We have sent the details and WhatsApp group invite link to your email. See you at the May 3rd event!</p>
            </div>
          ) : (
            <form onSubmit={handleRegister} style={{ background: CG, border: `1px solid ${BrG}`, borderRadius: "24px", padding: "44px", display: "flex", flexDirection: "column", gap: "18px", boxShadow: "0 10px 40px rgba(74,222,128,0.06)" }}>
              {[{ key: "name", label: "Name", type: "text", placeholder: "Your Full Name" }, { key: "phone", label: "Phone Number", type: "tel", placeholder: "Your Phone Number" }, { key: "email", label: "Email", type: "email", placeholder: "Your Email Address" }].map((f) => (
                <div key={f.key}>
                  <label htmlFor={`may1-${f.key}`} style={{ fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase" as const, letterSpacing: "0.05em", display: "block", marginBottom: "6px" }}>{f.label}</label>
                  <input required id={`may1-${f.key}`} type={f.type} placeholder={f.placeholder} value={(formData as Record<string, string>)[f.key]} onChange={(e) => setFormData((p) => ({ ...p, [f.key]: e.target.value }))} style={{ width: "100%", background: W, border: `1px solid ${BrG}`, borderRadius: "12px", padding: "13px 16px", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" as const }} />
                </div>
              ))}
              <p style={{ fontSize: "10px", color: TL, lineHeight: 1.6, marginTop: "4px" }}>By registering, you confirm that you agree to the Terms of Use and the Privacy Policy as well as receiving notification for future events.</p>
              <button type="submit" style={{ background: "linear-gradient(135deg, #22C55E, #16A34A)", color: W, border: "none", borderRadius: "100px", padding: "16px", fontWeight: 800, fontSize: "1rem", cursor: "pointer", boxShadow: "0 6px 20px rgba(22,163,74,0.3)" }}>Reserve My Spot Now</button>
            </form>
          )}
        </div>
      </section>

      {/* STORIES */}
      <section className="section-pad" style={{ background: BG }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={{ fontSize: "11px", color: "#16A34A", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>Seeker Success Stories</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: T, marginTop: "6px" }}>What seekers say after meeting Sakshi Shree</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "28px" }}>
            {STORIES.map((s, i) => (
              <div key={i} style={{ background: W, border: `1px solid ${BrG}`, borderRadius: "20px", padding: "28px", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", gap: "2px" }}>{Array.from({ length: s.stars }).map((_, j) => <Star key={j} size={14} style={{ color: "#F59E0B", fill: "#F59E0B" }} />)}</div>
                <p style={{ color: "#475569", fontSize: "0.875rem", lineHeight: 1.7, fontStyle: "italic", flex: 1 }}>"{s.quote}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", borderTop: `1px solid ${BrG}`, paddingTop: "16px" }}>
                  <img src={s.img} alt={s.name} style={{ width: "44px", height: "44px", borderRadius: "100px", objectFit: "cover", border: `2px solid ${BrG}` }} />
                  <div>
                    <div style={{ fontWeight: 800, color: T, fontSize: "0.85rem" }}>{s.name}</div>
                    <div style={{ fontSize: "0.7rem", color: TL }}>{s.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU LEARN */}
      <section className="section-pad" style={{ background: W }}>
        <div className="container-page">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "56px", alignItems: "center" }}>
            <div>
              <span style={{ fontSize: "11px", color: "#16A34A", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>Masterclass Agenda</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: T, marginTop: "6px", marginBottom: "20px" }}>What you will learn</h2>
              <p style={{ color: TL, fontSize: "1rem", lineHeight: 1.7, marginBottom: "32px" }}>What if your mind held the key to creating the life you have always wanted? Learn how to transform every area of your life, health, wealth, love, and happiness.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {LEARN_POINTS.map((lp, i) => (
                  <div key={i} style={{ display: "flex", gap: "16px", background: BG, border: `1px solid ${BrG}`, borderRadius: "16px", padding: "20px" }}>
                    <div style={{ fontSize: "1.5rem", flexShrink: 0 }}>{lp.icon}</div>
                    <div>
                      <h4 style={{ fontWeight: 800, color: T, fontSize: "0.95rem", marginBottom: "6px" }}>{lp.title}</h4>
                      <p style={{ color: TL, fontSize: "0.825rem", lineHeight: 1.6 }}>{lp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "32px" }}>
                <a href="#register" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg, #22C55E, #16A34A)", color: W, padding: "14px 32px", borderRadius: "100px", fontWeight: 800, fontSize: "0.95rem", textDecoration: "none" }}>
                  Join Now for FREE <span style={{ textDecoration: "line-through", color: "rgba(255,255,255,0.6)", marginLeft: "4px" }}>&#8377;199</span>
                </a>
              </div>
            </div>
            <div style={{ background: `linear-gradient(135deg, ${H}, ${H2})`, borderRadius: "24px", padding: "36px", color: W }}>
              <div style={{ fontSize: "11px", color: G, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: "12px" }}>Join us for a live session on</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700, marginBottom: "24px" }}>3 May 2026</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "0.9rem", color: "rgba(255,255,255,0.75)", marginBottom: "28px" }}>
                <div style={{ display: "flex", gap: "10px" }}><Clock size={16} style={{ color: G, flexShrink: 0, marginTop: "1px" }} /><span>10 AM onwards</span></div>
                <div style={{ display: "flex", gap: "10px" }}><MapPin size={16} style={{ color: G, flexShrink: 0, marginTop: "1px" }} /><span>Siddha Sudarshan Sakshi Dham 9, Avanthika Rd, Chiranjiv Vihar, Shastri Nagar, Ghaziabad, UP 201002</span></div>
              </div>
              <div style={{ position: "relative", paddingTop: "56.25%", background: "#000", borderRadius: "16px", overflow: "hidden" }}>
                <iframe src="https://www.youtube.com/embed/BWb67JoBpTg" title="Guruji Video Message" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEET SAKSHI SHREE */}
      <section className="section-pad" style={{ background: BG }}>
        <div className="container-page">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "56px", alignItems: "center" }}>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", inset: "-6px", background: "linear-gradient(135deg, rgba(74,222,128,0.2), rgba(212,175,55,0.15))", borderRadius: "30px", filter: "blur(12px)" }} />
              <img src="https://sciencedivine.org/wp-content/uploads/2025/01/dhyan-with-happy-face-copy-1-1-896x1024.webp" alt="Sakshi Shree Ji" style={{ width: "100%", maxWidth: "380px", height: "auto", borderRadius: "24px", margin: "0 auto", display: "block", position: "relative", zIndex: 1, mixBlendMode: "multiply" as const }} />
            </div>
            <div>
              <span style={{ fontSize: "11px", color: "#16A34A", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>Your Guide</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: T, marginTop: "6px", marginBottom: "20px" }}>Meet Sakshi Shree</h2>
              <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "20px" }}>Sakshi Shree is a world-renowned mystic and enlightened spiritual master with over 40 years of intense research and experience guiding people to harness the power of spirituality and meditation for profound self-discovery, and a life of purpose.</p>
              <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "32px" }}>As the founder of the Science Divine Foundation, Sakshi Shree's transformative techniques are uniquely designed to empower each person to tap into their innate, limitless potential, achieving both material success and spiritual heights.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                {[{ t: "40+ Years of Expertise", d: "A seasoned guide in spirituality and meditation.", emoji: "🧘" }, { t: "Science Divine Founder", d: "Spreading conscious living globally.", emoji: "🌍" }, { t: "Societal Welfare", d: "Free school for underprivileged children.", emoji: "🏫" }, { t: "Former Civil Servant", d: "Served as RTO officer before his mission.", emoji: "🏛️" }].map((item, i) => (
                  <div key={i} style={{ background: W, border: `1px solid ${BrG}`, borderRadius: "14px", padding: "16px" }}>
                    <div style={{ fontSize: "1.2rem", marginBottom: "6px" }}>{item.emoji}</div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#16A34A", marginBottom: "4px" }}>{item.t}</div>
                    <div style={{ fontSize: "0.75rem", color: TL, lineHeight: 1.4 }}>{item.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RECOGNITION */}
      <section className="section-pad" style={{ background: W }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "44px" }}>
            <span style={{ fontSize: "11px", color: "#16A34A", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>Recognition</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: T, marginTop: "6px" }}>Recognized by Top Leaders and Media</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px", marginBottom: "48px" }}>
            {LEADERS.map((l, i) => (
              <div key={i} style={{ background: BG, border: `1px solid ${BrG}`, borderRadius: "20px", overflow: "hidden" }}>
                <img src={l.img} alt={l.name} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                <div style={{ padding: "18px" }}>
                  <div style={{ fontWeight: 800, color: T, fontSize: "0.9rem" }}>{l.name}</div>
                  <p style={{ color: TL, fontSize: "0.75rem", marginTop: "4px", lineHeight: 1.4 }}>{l.role}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: "16px", overflowX: "auto", paddingBottom: "10px" }}>
            {GALLERY.map((g, i) => <img key={i} src={g} alt={`Gallery ${i + 1}`} style={{ height: "180px", width: "auto", borderRadius: "16px", objectFit: "cover", flexShrink: 0 }} />)}
          </div>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="section-pad" style={{ background: BG }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={{ fontSize: "11px", color: "#16A34A", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>Curriculum Details</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: T, marginTop: "6px" }}>What's Included</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {INCLUDED.map((inc, i) => (
              <div key={i} style={{ background: W, border: `1px solid ${BrG}`, borderRadius: "20px", padding: "28px 24px" }}>
                <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{inc.emoji}</div>
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: T, marginBottom: "16px" }}>{inc.title}</h4>
                <div style={{ marginBottom: "12px" }}><span style={{ fontSize: "10px", fontWeight: 800, color: "#EF4444", textTransform: "uppercase" as const }}>Problem</span><p style={{ color: TL, fontSize: "0.8rem", marginTop: "4px", lineHeight: 1.5 }}>{inc.prob}</p></div>
                <div style={{ marginBottom: "12px" }}><span style={{ fontSize: "10px", fontWeight: 800, color: "#16A34A", textTransform: "uppercase" as const }}>Solution</span><p style={{ color: TL, fontSize: "0.8rem", marginTop: "4px", lineHeight: 1.5 }}>{inc.sol}</p></div>
                <div><span style={{ fontSize: "10px", fontWeight: 800, color: Au, textTransform: "uppercase" as const }}>Benefit</span><p style={{ color: TL, fontSize: "0.8rem", marginTop: "4px", lineHeight: 1.5 }}>{inc.benefit}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEOS */}
      <section className="section-pad" style={{ background: W }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "44px" }}>
            <span style={{ fontSize: "11px", color: "#16A34A", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>Seeker Experiences</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: T, marginTop: "6px" }}>Voice of Transformation</h2>
            <p style={{ color: TL, marginTop: "10px", fontSize: "0.95rem" }}>See what people are saying after meeting Sakshi Shree</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
            {VIDEOS.map((v, i) => (
              <div key={i} style={{ background: BG, borderRadius: "16px", overflow: "hidden", border: `1px solid ${BrG}` }}>
                <div style={{ position: "relative", paddingTop: "56.25%" }}>
                  <iframe src={`https://www.youtube.com/embed/${v.id}`} title={v.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }} />
                </div>
                <div style={{ padding: "16px" }}><h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: T, lineHeight: 1.4 }}>{v.title}</h4></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="section-pad" style={{ background: BG }}>
        <div className="container-page" style={{ maxWidth: "800px" }}>
          <div style={{ textAlign: "center", marginBottom: "44px" }}>
            <span style={{ fontSize: "11px", color: "#16A34A", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>Have Questions?</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: T, marginTop: "6px" }}>FAQs</h2>
            <p style={{ color: TL, marginTop: "8px" }}>Have a specific question? Check out our Support Center</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {FAQS.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
          </div>
        </div>
      </section>

      {/* SECOND CTA */}
      <section className="section-pad" style={{ background: `linear-gradient(135deg, ${H}, ${H2})`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(74,222,128,0.12) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div className="container-page" style={{ maxWidth: "640px", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <span style={{ fontSize: "11px", color: G, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>Limited Time Offer</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.9rem", fontWeight: 700, color: W, marginTop: "6px" }}>Submit this form to book your spot</h2>
          </div>
          {sent ? (
            <div style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "24px", padding: "48px", textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🎉</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: W }}>Spot Reserved!</h3>
              <p style={{ color: "rgba(255,255,255,0.7)", marginTop: "8px" }}>Check your email for event details and WhatsApp group link.</p>
            </div>
          ) : (
            <form onSubmit={handleRegister} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "24px", padding: "40px", display: "flex", flexDirection: "column", gap: "16px" }}>
              {[{ key: "n2", label: "Name", type: "text", placeholder: "Your Full Name" }, { key: "p2", label: "Phone Number", type: "tel", placeholder: "Your Phone Number" }, { key: "e2", label: "Email", type: "email", placeholder: "Your Email Address" }].map((f) => (
                <div key={f.key}>
                  <label htmlFor={`may2-${f.key}`} style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.7)", textTransform: "uppercase" as const, display: "block", marginBottom: "6px" }}>{f.label}</label>
                  <input required id={`may2-${f.key}`} type={f.type} placeholder={f.placeholder} style={{ width: "100%", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "12px", padding: "12px 16px", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" as const, color: W }} />
                </div>
              ))}
              <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>By registering, you confirm that you agree to the Terms of Use and the Privacy Policy and consent to receiving notifications for future events.</p>
              <button type="submit" style={{ background: "linear-gradient(135deg, #22C55E, #16A34A)", color: W, border: "none", borderRadius: "100px", padding: "16px", fontWeight: 800, fontSize: "1rem", cursor: "pointer", boxShadow: "0 8px 24px rgba(22,163,74,0.4)" }}>Reserve My Spot Now</button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #D1FAE5", borderRadius: "16px", overflow: "hidden" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", border: "none", background: "none", padding: "20px", textAlign: "left", fontSize: "0.95rem", fontWeight: 700, color: "#1E293B", cursor: "pointer" }}>
        <span>{q}</span>
        <ChevronDown size={16} style={{ color: "#94A3B8", transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s", flexShrink: 0, marginLeft: "12px" }} />
      </button>
      {open && <div style={{ padding: "0 20px 20px 20px", fontSize: "0.875rem", color: "#64748B", lineHeight: 1.7, borderTop: "1px solid #F0FDF4", paddingTop: "14px" }}>{a}</div>}
    </div>
  );
}
