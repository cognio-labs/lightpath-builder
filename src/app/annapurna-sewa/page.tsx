"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, BookOpen, Heart, MapPin, Megaphone, Soup, UsersRound, Wallet, Handshake } from "lucide-react";
import { DonationForm } from "@/components/donation/DonationForm";
import styles from "./annapurna.module.css";

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
  const goToDonation = () => document.getElementById("make-contribution")?.scrollIntoView({ behavior: "smooth", block: "center" });

  return <div className={`annapurna-redesign ${styles.page}`}>
    {/* ══════════════════════════════════════════════════════
        HERO SECTION — 1:1 Exact Match of Reference Design (Image 3)
        Authentic panoramic banner artwork with seamless gold swoop wave,
        lotus watermark, Hindi calligraphy, and interactive donate action
    ══════════════════════════════════════════════════════ */}
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-[#270407]"
      aria-label="Annapurna Sewa Banner"
    >
      {/* Hidden semantic accessibility and SEO headings */}
      <div className="sr-only">
        <h1>अन्नपूर्णा सेवा — ANNAPURNA SEWA</h1>
        <p>A MEAL TODAY, A BRIGHTER TOMORROW</p>
        <p>
          Let us come together to ensure that no child goes to bed hungry. Your support helps us
          provide nutritious meals to underprivileged children living in slums and underserved communities.
        </p>
      </div>

      {/* Main banner image container matching exact 3:1 reference layout */}
      <div className="relative w-full max-w-[1920px] mx-auto select-none">
        <picture>
          <source srcSet="/images/annapurna-sewa/annapurna-hero-2x.webp" type="image/webp" />
          <img
            src="/images/annapurna-sewa/annapurna-hero-2x.png"
            alt="Annapurna Sewa — A Meal Today, A Brighter Tomorrow. Nutritious meals for underprivileged children"
            className="w-full h-auto block object-cover"
            width={2048}
            height={682}
            loading="eager"
            fetchPriority="high"
          />
        </picture>

        {/* Interactive "DONATE NOW" button overlay positioned precisely over the graphic button */}
        <a
          href="#make-contribution"
          className="absolute rounded-full cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#F5C75A] focus:ring-offset-2 focus:ring-offset-[#270407] group"
          style={{
            left: "17.14%",
            top: "73.31%",
            width: "19.38%",
            height: "11.14%",
          }}
          aria-label="Donate Now to Annapurna Sewa"
          title="Donate Now to Annapurna Sewa"
        >
          {/* Hover highlight with gentle golden glow */}
          <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/20 transition-all duration-300 shadow-none group-hover:shadow-[0_0_24px_rgba(247,207,103,0.85)] group-active:scale-95" />
          {/* Expanded tap target for effortless touch on mobile/tablet */}
          <span className="absolute -inset-2 sm:-inset-1 pointer-events-auto rounded-full" />
        </a>
      </div>
    </section>

    <section className={styles.pillars} aria-label="Annapurna Sewa values">{pillars.map(({icon: Icon, title, body}) => <div className={styles.pillar} key={title}><Icon aria-hidden size={31}/><h3>{title}</h3><p>{body}</p></div>)}</section>

    <section className={styles.intro} id="why-annapurna">
      {/* Combined Card 1: Text + Photo together in Landscape format */}
      <article className={styles.whyAnnapurnaCard}>
        <div className={styles.introText}>
          <h2>WHY<br/>ANNAPURNA SEWA?</h2>
          <p>Every child deserves a nutritious meal. Through Annapurna Sewa, we provide wholesome and balanced food to children living in jhuggi jhopdi (slums) and other underserved communities.</p>
          <p>A simple meal brings health, happiness and the strength to study, learn and build a better future.</p>
          <blockquote>
            <span>“</span>
            <p>When a child is well nourished, their mind can learn, their heart can dream and their future can be brighter.</p>
            <cite>— Sadguru Sakshi Shree</cite>
          </blockquote>
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
      </article>

      {/* Card 2: Donation Form in the same section line */}
      <div className={styles.contribution}>
        <DonationForm
          id="make-contribution"
          title="Make a Contribution"
          subtitle="Help us serve nutritious meals to underprivileged children."
          purpose="Annapurna Sewa"
          trustMessage="Support a Child's Future"
        />
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
              <div className="p-4 sm:p-5 flex flex-col items-center text-center flex-1">
                <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#D47024] text-white flex items-center justify-center shrink-0 shadow-sm mb-3">
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
