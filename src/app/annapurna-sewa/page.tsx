"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, BookOpen, Heart, LockKeyhole, MapPin, Megaphone, ShieldCheck, Soup, UsersRound, Wallet, Handshake } from "lucide-react";
import { RAZORPAY_DONATION_LINK } from "@/lib/payment-links";
import styles from "./annapurna.module.css";

const amounts = [
  { value: 501, meals: "10 Meals" }, { value: 1100, meals: "25 Meals" },
  { value: 5100, meals: "125 Meals" }, { value: 11000, meals: "300 Meals" },
];
const pillars = [
  { icon: Soup, title: "Nutritious Meals", body: "for underprivileged children" },
  { icon: UsersRound, title: "Support Slum Communities", body: "in cities and villages" },
  { icon: Heart, title: "Better Health & Learning", body: "through proper nutrition" },
  { icon: BookOpen, title: "Inspired by Gita Values", body: "of compassion and selfless service" },
];
const support = [
  {
    icon: Soup,
    titleEn: "Nutritious Meals",
    titleHi: "पौष्टिक भोजन",
    body: "Fresh, wholesome and nutritious meals for underprivileged children, helping them grow healthier and stronger every day.",
    img: "/images/annapurna-sewa/support-card-1.png",
  },
  {
    icon: UsersRound,
    titleEn: "No Child Goes Hungry",
    titleHi: "कोई बच्चा भूखा न रहे",
    body: "Bringing warm meals and hope to children living in jhuggi-jhopdi and underserved communities.",
    img: "/images/annapurna-sewa/support-card-2.png",
  },
  {
    icon: BookOpen,
    titleEn: "Better Health & Learning",
    titleHi: "बेहतर स्वास्थ्य और शिक्षा",
    body: "Proper nutrition supports children's health, concentration and ability to participate actively in school.",
    img: "/images/annapurna-sewa/support-card-3.png",
  },
  {
    icon: Heart,
    titleEn: "A Brighter Tomorrow",
    titleHi: "उज्ज्वल भविष्य",
    body: "Every meal is an act of care that gives children more strength, dignity and hope for a brighter future.",
    img: "/images/annapurna-sewa/support-card-4.png",
  },
];
const stats = [
  { icon: Soup, target: 500000, number: "5,00,000+", label: "Meals Served" },
  { icon: UsersRound, target: 10000, number: "10,000+", label: "Children Benefited" },
  { icon: MapPin, target: 50, number: "50+", label: "Locations" },
  { icon: Heart, target: 100, number: "100+", label: "Dedicated Volunteers" },
];

function AnimatedCountUp({ target, fallback }: { target: number; fallback: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let startTime: number | null = null;
    let frameId: number;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startTime = null;
          const duration = 2200;
          const step = (ts: number) => {
            if (!startTime) startTime = ts;
            const progress = Math.min((ts - startTime) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(ease * target));
            if (progress < 1) {
              frameId = requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };
          frameId = requestAnimationFrame(step);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [target]);

  return (
    <span ref={ref}>
      {count > 0 ? `${count.toLocaleString("en-IN")}+` : fallback}
    </span>
  );
}
const stories = [
  {
    quote: "The meals help me stay healthy and give me energy to study. I want to become a teacher one day.",
    by: "A Young Beneficiary",
    img: "/images/annapurna-sewa/story-child-1.jpg",
  },
  {
    quote: "Earlier I used to skip meals often. Now I get good food and can focus on my studies. Thank you for supporting us.",
    by: "A Student from Slum Community",
    img: "/images/annapurna-sewa/story-child-2.jpg",
  },
  {
    quote: "These meals not only fill our stomachs but also give us hope for a better future.",
    by: "A Young Beneficiary",
    img: "/images/annapurna-sewa/story-child-3.jpg",
  },
];
const help = [
  { icon: Wallet, title: "Make a Donation", body: "Contribute to serve more meals.", href: "#make-contribution" },
  { icon: UsersRound, title: "Sponsor a Meal Program", body: "Support regular food distribution for children in slums.", href: "#make-contribution" },
  { icon: Handshake, title: "Volunteer with Us", body: "Offer your time and service.", href: "/contact" },
  { icon: Megaphone, title: "Spread the Word", body: "Help us reach more children and supporters.", href: "/contact" },
];

export default function AnnapurnaSewaPage() {
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [amount, setAmount] = useState<number | "custom">(1100);
  const [customAmount, setCustomAmount] = useState("");
  const customInvalid = amount === "custom" && (!Number.isFinite(Number(customAmount)) || Number(customAmount) < 1);
  const goToDonation = () => document.getElementById("make-contribution")?.scrollIntoView({ behavior: "smooth", block: "center" });

  return <div className={`annapurna-redesign ${styles.page}`}>
    {/* ══════════════════════════════════════════════════════
        HERO SECTION — Real Working Component (Full Bleed Right Image, Copyable Headings, Real Button)
    ══════════════════════════════════════════════════════ */}
    <section
      id="hero"
      className="relative overflow-hidden w-full text-white"
      style={{
        background: "linear-gradient(110deg, #270407 0%, #36070C 35%, #460C14 65%, #36070C 100%)",
      }}
      aria-labelledby="annapurna-title"
    >
      {/* Desktop Full-Bleed Right-Side Photo: Stretches 100% all the way to the right screen edge */}
      <div className="hidden md:block absolute top-0 right-0 h-full w-[52%] lg:w-[56%] xl:w-[58%] 2xl:w-[60%] z-0 overflow-hidden">
        <img
          src="/images/annapurna-sewa/hero-girl-serving.png"
          alt="अन्नपूर्णा सेवा - Annapurna Sewa - Children receiving nutritious meals"
          className="w-full h-full object-cover object-right md:object-center select-auto block"
          loading="eager"
          fetchPriority="high"
        />
        {/* Smooth seamless blend on the left edge into the maroon background */}
        <div
          className="absolute inset-y-0 left-0 w-28 sm:w-36 lg:w-48 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, #36070C 0%, rgba(54,7,12,0.85) 30%, rgba(54,7,12,0.2) 65%, transparent 100%)",
          }}
        />
      </div>

      {/* Top-left subtle botanical leaves watermark */}
      <div className="absolute top-0 left-0 w-40 sm:w-56 h-40 sm:h-56 pointer-events-none opacity-20 -translate-x-4 -translate-y-4">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-[#DF9E38]">
          <path d="M20,20 Q60,10 90,40 T140,90 Q120,130 90,140 T40,90 Q10,60 20,20 Z" stroke="#F5C75A" strokeWidth="1.5" />
          <path d="M30,30 Q80,20 110,60 T160,120" stroke="#F5C75A" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      </div>

      {/* Bottom-left Gold Design: Lotus Mandala Watermark + Curved Gold Swoop Ribbon matching Image 1 */}
      <div className="absolute bottom-0 left-0 w-full sm:w-[90%] md:w-[70%] lg:w-[62%] h-28 sm:h-36 md:h-44 pointer-events-none z-10 overflow-hidden">
        <svg
          viewBox="0 0 650 200"
          fill="none"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Lotus Flower Line-Art Watermark in Bottom-Left Corner */}
          <g transform="translate(48, 165) scale(1.15)" stroke="#F5C75A" strokeWidth="1.6" opacity="0.45" fill="none">
            {/* Central Petal */}
            <path d="M0 0 C -12 -28, -8 -58, 0 -78 C 8 -58, 12 -28, 0 0 Z" />
            <path d="M0 0 C -5 -22, -3 -45, 0 -62 C 3 -45, 5 -22, 0 0 Z" />
            {/* Inner Petals */}
            <path d="M0 0 C -22 -22, -32 -46, -22 -66 C -8 -50, 0 -26, 0 0 Z" />
            <path d="M0 0 C 22 -22, 32 -46, 22 -66 C 8 -50, 0 -26, 0 0 Z" />
            {/* Outer Petals */}
            <path d="M0 0 C -40 -14, -54 -32, -45 -50 C -26 -38, -12 -22, 0 0 Z" />
            <path d="M0 0 C 40 -14, 54 -32, 45 -50 C 26 -38, 12 -22, 0 0 Z" />
            {/* Base Foundation Arc */}
            <path d="M-55 0 C -35 -10, 35 -10, 55 0" />
            <circle cx="0" cy="-30" r="2.5" fill="#F5C75A" />
          </g>

          {/* Golden Swoop Body matching Image 1 */}
          <path
            d="M-20 200 L -20 80 C 80 120, 220 168, 480 180 C 540 183, 595 190, 660 200 Z"
            fill="url(#goldSwoopFill)"
            opacity="0.95"
          />

          {/* Golden Swoop Glowing Upper Edge matching Image 1 */}
          <path
            d="M-20 80 C 80 120, 220 168, 480 180 C 540 183, 595 190, 660 200"
            stroke="url(#goldSwoopEdge)"
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Subtle Secondary Golden Under-Ribbon for rich depth */}
          <path
            d="M-20 105 C 90 142, 230 178, 510 188 L 660 200 L -20 200 Z"
            fill="url(#goldSwoopSubtle)"
            opacity="0.5"
          />

          <defs>
            <linearGradient id="goldSwoopFill" x1="0%" y1="0%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#DF9E38" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#F5C75A" stopOpacity="0.98" />
              <stop offset="70%" stopColor="#D48B25" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#9C5914" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="goldSwoopEdge" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFECA8" />
              <stop offset="30%" stopColor="#FFD875" />
              <stop offset="70%" stopColor="#F5C75A" />
              <stop offset="100%" stopColor="#FFE896" />
            </linearGradient>
            <linearGradient id="goldSwoopSubtle" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B36B15" />
              <stop offset="50%" stopColor="#DF9E38" />
              <stop offset="100%" stopColor="#FAD877" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16 z-10 flex flex-col md:flex-row items-center justify-between min-h-[380px] sm:min-h-[420px] lg:min-h-[460px]">
        {/* Left Column: Centered Elements matching Image 2 */}
        <div className="w-full md:max-w-[48%] lg:max-w-[46%] z-20 flex flex-col justify-center items-center text-center mx-auto md:mx-0">
          {/* Steaming Food Bowl Icon in Rich Warm Gold — Centered */}
          <div className="flex justify-center mb-1.5">
            <img
              src="/images/annapurna-sewa/annapurna-bowl-clean.png"
              alt="अन्नपूर्णा सेवा"
              className="w-14 sm:w-16 h-auto block drop-shadow-[0_2px_10px_rgba(247,207,103,0.35)]"
            />
          </div>

          {/* Hindi Heading — Centered with rich golden styling */}
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold text-center text-[#F7CF67] tracking-wide leading-tight select-text drop-shadow-[0_2px_12px_rgba(247,207,103,0.3)]">
            अन्नपूर्णा सेवा
          </h2>

          {/* Delicate Lotus Divider between Hindi and English titles matching Image 2 */}
          <div className="flex items-center justify-center gap-2.5 my-1.5 w-full max-w-[260px] mx-auto opacity-85">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#F7CF67]" />
            <svg width="18" height="13" viewBox="0 0 24 16" fill="none" className="text-[#F7CF67] shrink-0">
              <path d="M12 1C10 5 7 10 3 12C6 13 10 12 12 15C14 12 18 13 21 12C17 10 14 5 12 1Z" fill="#F7CF67" />
              <path d="M12 6C11 9 9 12 6 13C8 14 11 13 12 15C13 13 16 14 18 13C15 12 13 9 12 6Z" fill="#FFEAA8" />
            </svg>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#F7CF67]" />
          </div>

          {/* English Heading — Centered crisp white */}
          <h1 id="annapurna-title" className="font-serif text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-center text-white tracking-[0.14em] uppercase leading-tight select-text">
            ANNAPURNA SEWA
          </h1>

          {/* Subtitle — Centered warm gold */}
          <p className="font-sans text-[10.5px] sm:text-xs lg:text-[12.5px] font-semibold text-center tracking-[0.24em] text-[#E6BB6B] uppercase mt-1 select-text">
            A MEAL TODAY, A BRIGHTER TOMORROW
          </p>

          {/* Paragraph — Centered */}
          <p className="text-xs sm:text-[13.5px] lg:text-[14.5px] text-[#F5EBE6] text-center leading-relaxed font-sans max-w-lg mx-auto mt-3.5 sm:mt-4 select-text">
            Let us come together to ensure that{" "}
            <strong className="text-[#F7CF67] font-semibold">no child goes to bed hungry</strong>.
            <br className="hidden sm:inline" />
            {" "}Your support helps us provide nutritious meals to underprivileged children living in slums and underserved communities.
          </p>

          {/* Real Interactive DONATE NOW Button — Centered */}
          <div className="pt-5 sm:pt-6 flex justify-center">
            <a
              href={RAZORPAY_DONATION_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 sm:gap-3 px-8 sm:px-10 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#F7CF67] via-[#F4B944] to-[#DF9727] text-[#36080D] font-serif font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-[0_4px_22px_rgba(244,185,68,0.45)] hover:shadow-[0_8px_32px_rgba(244,185,68,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer"
              aria-label="Donate Now to Annapurna Sewa"
            >
              <Heart className="w-4 h-4 sm:w-[18px] sm:h-[18px] fill-[#36080D] text-[#36080D] transition-transform duration-300 group-hover:scale-110" />
              <span className="font-bold">DONATE NOW</span>
              <ArrowRight className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#36080D] transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Mobile-only Image (full width, edge to edge) */}
        <div className="md:hidden relative w-full aspect-[16/10] overflow-hidden mt-6 rounded-xl shadow-lg">
          <img
            src="/images/annapurna-sewa/hero-girl-serving.png"
            alt="अन्नपूर्णा सेवा - Annapurna Sewa - Children receiving nutritious meals"
            className="w-full h-full object-cover object-center select-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#270407] via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </section>

    <section className={styles.pillars} aria-label="Annapurna Sewa values">{pillars.map(({icon: Icon, title, body}) => <div className={styles.pillar} key={title}><Icon aria-hidden size={31}/><h3>{title}</h3><p>{body}</p></div>)}</section>

    <section className={styles.intro} id="why-annapurna">
      <div className={styles.introText}><h2>WHY<br/>ANNAPURNA SEWA?</h2>
        <p>Every child deserves a nutritious meal. Through Annapurna Sewa, we provide wholesome and balanced food to children living in jhuggi jhopdi (slums) and other underserved communities.</p>
        <p>A simple meal brings health, happiness and the strength to study, learn and build a better future.</p>
        <blockquote><span>“</span><p>When a child is well nourished, their mind can learn, their heart can dream and their future can be brighter.</p><cite>— Sadguru Sakshi Shree</cite></blockquote>
      </div>
      <div
        className={styles.introPhoto}
        style={{
          backgroundImage: "url('/images/initiatives/annapurna-sewa-serving.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 25%",
        }}
        role="img"
        aria-label="Children enjoying nourishing meals together"
      />
      <div className={styles.contribution} id="make-contribution"><h2>MAKE A CONTRIBUTION</h2><p>Help us serve nutritious meals to underprivileged children.</p>
        <div className={styles.donationPanel}>
          <div className={styles.frequency} role="group" aria-label="Donation type">
            <button type="button" aria-pressed={frequency === "one-time"} className={frequency === "one-time" ? styles.active : ""} onClick={() => setFrequency("one-time")}>One-time Donation</button>
            <button type="button" aria-pressed={frequency === "monthly"} className={frequency === "monthly" ? styles.active : ""} onClick={() => setFrequency("monthly")}>Monthly Donation</button>
          </div>
          <div className={styles.amountGrid} role="group" aria-label="Donation amount">
            {amounts.map(tier => <button key={tier.value} type="button" aria-pressed={amount === tier.value} className={amount === tier.value ? styles.selected : ""} onClick={() => setAmount(tier.value)}><strong>₹{tier.value.toLocaleString("en-IN")}</strong><span>{tier.meals}</span></button>)}
            <label className={`${styles.customAmount} ${amount === "custom" ? styles.selected : ""}`}><span>₹ &nbsp;Other Amount</span><input type="number" min="1" inputMode="numeric" placeholder="Enter amount of your choice" value={customAmount} onFocus={() => setAmount("custom")} onChange={(event) => {setCustomAmount(event.target.value); setAmount("custom");}} aria-label="Other donation amount in rupees"/></label>
          </div>
          {customInvalid && <p className={styles.validation}>Enter an amount of at least ₹1 to continue.</p>}
          <a className={`${styles.secureButton} ${customInvalid ? styles.disabled : ""}`} href={customInvalid ? undefined : RAZORPAY_DONATION_LINK} target="_blank" rel="noopener noreferrer" aria-disabled={customInvalid} onClick={customInvalid ? (event) => event.preventDefault() : undefined}><LockKeyhole size={16}/> DONATE SECURELY <ArrowRight size={18}/></a>
          <div className={styles.paymentBenefits}><span><ShieldCheck/>100% Secure<br/>Payments</span><span><Wallet/>Instant<br/>Confirmation</span><span><Heart/>Support a Child&apos;s<br/>Future</span></div>
        </div>
      </div>
    </section>

    {/* ══════════════════════════════════════════════════════
        WHAT YOUR SUPPORT PROVIDES — Exact 1:1 Replicate of User's Image 2
    ══════════════════════════════════════════════════════ */}
    <section className="py-14 sm:py-18 px-4 sm:px-6 lg:px-8 bg-[#FFF9EE]" id="what-we-provide">
      <div className="max-w-[1340px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#741E23] tracking-wide uppercase">
            WHAT YOUR SUPPORT PROVIDES
          </h2>
          <p className="text-xs sm:text-sm md:text-[15px] text-[#66554E] font-serif leading-relaxed">
            Your contribution helps us provide daily nutritious meals to children in jhuggi jhopdi and underserved communities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {support.map(({ icon: Icon, titleEn, titleHi, body, img }) => (
            <article
              key={titleEn}
              className="bg-white rounded-2xl overflow-hidden border border-[#EBDCC5] shadow-[0_4px_16px_rgba(110,42,20,0.06)] hover:shadow-[0_8px_24px_rgba(110,42,20,0.12)] transition-all duration-300 flex flex-col group"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#FFF5E6] relative">
                <img
                  src={img}
                  alt={`${titleEn} - ${titleHi}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-4 sm:p-5 flex items-start gap-3.5 flex-1">
                <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#D47024] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <Icon size={20} strokeWidth={2.2} className="text-white" />
                </span>
                <div className="space-y-1.5 flex-1 min-w-0">
                  <h3 className="font-serif font-bold text-sm sm:text-[15px] text-[#741E23] leading-snug">
                    {titleEn} <span className="text-[#8A252B] font-semibold">| {titleHi}</span>
                  </h3>
                  <p className="text-xs sm:text-[12.5px] text-[#5A4842] leading-relaxed font-sans font-normal">
                    {body}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
    <section className={styles.impact} id="our-impact">
      <div className={styles.sectionHeading}>
        <h2>OUR IMPACT SO FAR</h2>
        <p>With your support, we are bringing nutrition, smiles and hope to thousands of children.</p>
      </div>
      <div className={styles.stats}>
        {stats.map(({ icon: Icon, target, number, label }) => (
          <div className={styles.stat} key={label}>
            <Icon size={37} />
            <strong>
              <AnimatedCountUp target={target} fallback={number} />
            </strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
    <section className={styles.stories} id="stories">
      <div className={styles.sectionHeading}>
        <h2>STORIES OF HOPE</h2>
        <p>Real children. Real smiles. Real change.</p>
      </div>
      <div className={styles.storyGrid}>
        {stories.map(({ quote, by, img }, index) => (
          <blockquote className={styles.story} key={index}>
            <div
              className={styles.storyPhoto}
              style={{
                backgroundImage: `url('${img}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              role="img"
              aria-label={`Smiling child - ${by}`}
            />
            <div>
              <span className={styles.quoteMark}>“</span>
              <p>“{quote}”</p>
              <cite>— {by}</cite>
            </div>
          </blockquote>
        ))}
      </div>
    </section>
    <section className={styles.help} id="how-to-help"><div className={styles.sectionHeading}><h2>HOW YOU CAN HELP</h2><p>There are many ways to be a part of Annapurna Sewa.</p></div><div className={styles.helpGrid}>{help.map(({icon: Icon, title, body, href}) => <a className={styles.helpCard} href={href} key={title}><Icon size={34}/><h3>{title}</h3><p>{body}</p></a>)}</div></section>
    <section className={styles.finalCta} style={{ backgroundImage: "linear-gradient(90deg, #2b080ad9, #360b10eb 45%, #370d11a6), url('/images/initiatives/annapurna-sewa-serving.jpg')", backgroundSize: "cover", backgroundPosition: "center 30%" }}><div className={styles.finalText}><h2>LET’S FILL PLATES. LET’S FILL FUTURES.</h2><p>Your support to Annapurna Sewa can bring nutrition, hope and opportunities to thousands of children living in jhuggi jhopdi communities.</p><button className={styles.goldButton} onClick={goToDonation}>DONATE NOW <ArrowRight size={18}/></button></div></section>
  </div>;
}
