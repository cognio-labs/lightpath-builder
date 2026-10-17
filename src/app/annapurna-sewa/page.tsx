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
  { icon: Soup, title: "NUTRITIOUS MEALS", body: "Fresh, wholesome and balanced food for children every day.", position: "54% 50%" },
  { icon: UsersRound, title: "SUPPORT SLUM CHILDREN", body: "Reaching children in jhuggi jhopdi and underserved areas.", position: "28% 48%" },
  { icon: BookOpen, title: "BETTER HEALTH & LEARNING", body: "Good nutrition helps children stay healthy, attend school and focus on their future.", position: "74% 50%" },
  { icon: Heart, title: "A BRIGHTER TOMORROW", body: "Your support empowers children to dream, learn and build a better life.", position: "91% 50%" },
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
  { quote: "The meals help me stay healthy and give me energy to study. I want to become a teacher one day.", by: "A Young Beneficiary", position: "54% 50%" },
  { quote: "Earlier I used to skip meals often. Now I get good food and can focus on my studies. Thank you for supporting us.", by: "A Student from Slum Community", position: "30% 50%" },
  { quote: "These meals not only fill our stomachs but also give us hope for a better future.", by: "A Young Beneficiary", position: "86% 50%" },
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
    <section className={styles.hero} aria-labelledby="annapurna-title">
      <div className={styles.heroShade}/><div className={styles.heroCopy}>
        <span className={styles.eyebrow}>LIVING THE GITA MOVEMENT</span>
        <div className={styles.hindi}>अन्नपूर्णा सेवा</div><h1 id="annapurna-title">ANNAPURNA SEWA</h1>
        <h2>A MEAL TODAY, A BRIGHTER TOMORROW</h2>
        <p>Let us come together to ensure that no child goes to bed hungry. Your support helps us provide nutritious meals to underprivileged children living in slums and underserved communities.</p>
        <button className={styles.goldButton} onClick={goToDonation}>DONATE NOW <ArrowRight size={18}/></button>
      </div><p className={styles.heroTagline}>Positively<br/>Nourishing<br/>Brighter<br/>Futures <span>♡</span></p>
    </section>

    <section className={styles.pillars} aria-label="Annapurna Sewa values">{pillars.map(({icon: Icon, title, body}) => <div className={styles.pillar} key={title}><Icon aria-hidden size={31}/><h3>{title}</h3><p>{body}</p></div>)}</section>

    <section className={styles.intro} id="why-annapurna">
      <div className={styles.introText}><h2>WHY<br/>ANNAPURNA SEWA?</h2>
        <p>Every child deserves a nutritious meal. Through Annapurna Sewa, we provide wholesome and balanced food to children living in jhuggi jhopdi (slums) and other underserved communities.</p>
        <p>A simple meal brings health, happiness and the strength to study, learn and build a better future.</p>
        <blockquote><span>“</span><p>When a child is well nourished, their mind can learn, their heart can dream and their future can be brighter.</p><cite>— Sadguru Sakshi Shree</cite></blockquote>
      </div>
      <div className={styles.introPhoto} role="img" aria-label="Children enjoying nourishing meals together"/>
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

    <section className={styles.supportSection} id="what-we-provide"><div className={styles.sectionHeading}><h2>WHAT YOUR SUPPORT PROVIDES</h2><p>Your contribution helps us provide daily nutritious meals to children in jhuggi jhopdi and underserved communities.</p></div>
      <div className={styles.supportGrid}>{support.map(({icon: Icon, title, body, position}) => <article className={styles.supportCard} key={title}><div className={styles.supportPhoto} style={{backgroundPosition: position}}/><div className={styles.supportCardBody}><span className={styles.roundIcon}><Icon size={24}/></span><div><h3>{title}</h3><p>{body}</p></div></div></article>)}</div>
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
    <section className={styles.stories} id="stories"><div className={styles.sectionHeading}><h2>STORIES OF HOPE</h2><p>Real children. Real smiles. Real change.</p></div><div className={styles.storyGrid}>{stories.map(({quote, by, position}, index) => <blockquote className={styles.story} key={index}><div className={styles.storyPhoto} style={{backgroundPosition: position}} role="img" aria-label="Smiling child"/><div><span className={styles.quoteMark}>“</span><p>“{quote}”</p><cite>— {by}</cite></div></blockquote>)}</div></section>
    <section className={styles.help} id="how-to-help"><div className={styles.sectionHeading}><h2>HOW YOU CAN HELP</h2><p>There are many ways to be a part of Annapurna Sewa.</p></div><div className={styles.helpGrid}>{help.map(({icon: Icon, title, body, href}) => <a className={styles.helpCard} href={href} key={title}><Icon size={34}/><h3>{title}</h3><p>{body}</p></a>)}</div></section>
    <section className={styles.finalCta}><div className={styles.finalText}><h2>LET’S FILL PLATES. LET’S FILL FUTURES.</h2><p>Your support to Annapurna Sewa can bring nutrition, hope and opportunities to thousands of children living in jhuggi jhopdi communities.</p><button className={styles.goldButton} onClick={goToDonation}>DONATE NOW <ArrowRight size={18}/></button></div><p className={styles.finalTagline}>A<br/>Hunger-Free<br/>Tomorrow<br/>is Possible ♡</p></section>
  </div>;
}
