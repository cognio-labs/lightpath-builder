"use client";

import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  CreditCard,
  Flower2,
  GraduationCap,
  Heart,
  Landmark,
  LockKeyhole,
  MonitorPlay,
  ShieldCheck,
  Users,
  Globe2,
} from "lucide-react";
import { RAZORPAY_DONATION_LINK } from "@/lib/payment-links";
import styles from "./living-the-gita.module.css";

const vision = [
  {
    icon: BookOpen,
    title: "Gita Learning for All",
    text: "Practical and value-based learning programs for all age groups.",
  },
  {
    icon: Users,
    title: "Youth & Community Programs",
    text: "Empowering the next generation with timeless wisdom and positive values.",
  },
  {
    icon: MonitorPlay,
    title: "Digital Reach Every Home",
    text: "Bringing Gita knowledge to every home through online content, courses and community initiatives.",
  },
  {
    icon: Landmark,
    title: "Stronger Society",
    text: "Building a more compassionate, conscious and harmonious world.",
  },
];

const initiatives = [
  {
    image: "/images/living-the-moment/learning-sessions.jpg",
    title: "GITA LEARNING SESSIONS",
    text: "Conducting sessions, workshops and study circles for all age groups across cities and villages.",
  },
  {
    image: "/images/living-the-moment/books-resources.jpg",
    title: "BOOKS & LEARNING RESOURCES",
    text: "Creating and distributing books, study material and digital content in simple and practical formats.",
  },
  {
    image: "/images/living-the-moment/youth-outreach.jpg",
    title: "YOUTH OUTREACH",
    text: "Special programs for students and young professionals to build a positive mindset and value-based living.",
  },
  {
    image: "/images/living-the-moment/digital-reach.jpg",
    title: "DIGITAL REACH & COMMUNITY EVENTS",
    text: "Expanding our online content, community initiatives and awareness programs to reach every home.",
  },
];

const impact = [
  { icon: Users, number: "1,00,000+", label: "People Reached", detail: "through sessions and events" },
  { icon: BookOpen, number: "500+", label: "Learning Sessions", detail: "across India" },
  { icon: GraduationCap, number: "50,000+", label: "Youth Impacted", detail: "through special programs" },
  { icon: Globe2, number: "100+", label: "Cities & Communities", detail: "with ongoing initiatives" },
];

const stories = [
  {
    image: "/images/uploads/2025/09/sneha.webp",
    quote: "The Gita sessions have given me clarity and practical guidance for everyday life. I feel more calm and positive in facing challenges.",
    name: "A Community Member",
  },
  {
    image: "/images/uploads/2025/09/akhilesh.webp",
    quote: "The teachings have helped me stay focused and build a positive mindset. It's relevant and very practical for today's generation.",
    name: "A Young Learner",
  },
  {
    image: "/images/uploads/2025/09/guruji-1.webp",
    quote: "This movement is creating a real change in society. More people are discovering the practical wisdom of the Gita and living better lives.",
    name: "A Supporter",
  },
];

const faqs = [
  {
    q: "How will my donation be used?",
    a: "Your contribution supports Gita learning sessions, educational resources, youth outreach, digital content and community initiatives.",
  },
  {
    q: "Can I contribute monthly?",
    a: "Yes. Select Monthly Contribution to express your preference. Please check the available recurring payment options on the secure payment page.",
  },
  {
    q: "Will I receive a receipt?",
    a: "Payment confirmation is provided through the payment page. For a formal donation receipt, contact the team with your payment details.",
  },
  {
    q: "Is my donation eligible for tax benefits?",
    a: "Please check the payment page or contact the team for the current tax benefit details before contributing.",
  },
  {
    q: "Is my payment information secure?",
    a: "The contribution button takes you to our Razorpay payment page, where payment details are handled by Razorpay.",
  },
  {
    q: "Can I choose a specific initiative to support?",
    a: "Please contact the movement team if you would like to discuss support for a particular initiative.",
  },
  {
    q: "Will I get updates on the impact?",
    a: "You can follow the movement through its community channels and contact the team for updates about supported initiatives.",
  },
  {
    q: "How can I support in other ways?",
    a: "Share the movement, attend a learning session, volunteer or help bring these programs to your community.",
  },
];

const amounts = [
  { value: 501, label: "₹501", description: "Supports one learning session" },
  { value: 1100, label: "₹1,100", description: "Helps create learning resources" },
  { value: 5100, label: "₹5,100", description: "Supports youth and community programs" },
  { value: 11000, label: "₹11,000", description: "Helps reach more cities and villages" },
];

export default function LivingTheGita() {
  const [type, setType] = useState<"once" | "monthly">("once");
  const [amount, setAmount] = useState<number | "other">(1100);
  const [customAmount, setCustomAmount] = useState("");

  const selectedAmount = amount === "other" ? Number(customAmount) : amount;
  const donationReady = amount !== "other" || selectedAmount > 0;

  return (
    <div className={`${styles.page} gita-page`}>
      {/* 1. HERO SECTION */}
      <section className={styles.hero} id="top">
        <div className={styles.heroContainer}>
          {/* Left: Headings & Content */}
          <div className={styles.heroCopy}>
            <p className={styles.heroEyebrow}>
              TIMELESS WISDOM <span>|</span> STRONGER SOCIETY <span>|</span> BRIGHTER TOMORROW
            </p>
            <h1>
              HELP THE GITA<br />
              <span className={styles.goldTitle}>REACH EVERY HOME</span>
            </h1>
            <p className={styles.heroIntro}>
              Your contribution helps us take practical Gita wisdom, learning programs and community initiatives to millions of people across India and beyond.
            </p>

            <div className={styles.heroActions}>
              <a className={styles.goldButton} href="#donate">
                CONTRIBUTE TODAY <ArrowRight size={17} />
              </a>
              <a className={styles.outlineButton} href="#vision">
                BE A PART OF THE MOVEMENT
              </a>
            </div>

            <div className={styles.benefits}>
              <span>
                <Users size={18} /> More<br />People
              </span>
              <span>
                <BookOpen size={18} /> More<br />Learning
              </span>
              <span>
                <Flower2 size={18} /> More<br />Positive Change
              </span>
            </div>
          </div>

          {/* Right: The Book */}
          <div className={styles.heroBookWrap}>
            <div className={styles.heroBookGlow} />
            <img
              className={styles.heroBook}
              src="/images/living-the-moment/book-living-the-gita.webp"
              alt="Life-Changing Maha Mantras: The Art of Living the Gita by Sakshi Shree"
            />
            <div className={styles.heroBookBadge}>
              <span>The Art of Living the Gita</span>
              <strong>By Sadguru Sakshi Shree</strong>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR VISION */}
      <section className={styles.vision} id="vision">
        <div className={styles.container}>
          <div className={styles.visionGrid}>
            <div className={styles.visionIntro}>
              <span className={styles.eyebrow}>OUR VISION</span>
              <h2>
                A MOVEMENT FOR<br />A BRIGHTER TOMORROW
              </h2>
              <p>
                The Living the Gita Movement is dedicated to making the wisdom of the Gita practical, accessible and relevant for every individual, family and community. Through learning sessions, educational resources, youth programs and digital initiatives, we aim to create a more conscious, compassionate and value-driven society.
              </p>
              <a className={styles.smallOutline} href="#initiatives">
                LEARN MORE <ArrowRight size={15} />
              </a>
            </div>

            <div className={styles.visionCards}>
              {vision.map(({ icon: Icon, title, text }) => (
                <article className={styles.visionCard} key={title}>
                  <div className={styles.visionIconWrap}>
                    <Icon aria-hidden="true" size={26} />
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. YOUR SUPPORT CREATES REAL IMPACT + MAKE A DIFFERENCE TODAY */}
      <section className={styles.support} id="donate">
        <div className={styles.container}>
          <div className={styles.supportGrid}>
            {/* Left Column: Impact Story & Photo */}
            <div className={styles.supportStory}>
              <span className={styles.eyebrow}>YOUR SUPPORT</span>
              <h2>CREATES REAL IMPACT</h2>
              <p>
                Your contribution helps us conduct Gita learning sessions, create educational resources, reach youth and communities, and take this timeless wisdom to every corner of society.
              </p>
              <div
                className={styles.supportPhoto}
                style={{ backgroundImage: `url('/images/living-the-moment/real-impact-community.jpg')` }}
              >
                <div className={styles.supportQuoteCard}>
                  <span className={styles.supportQuoteMark}>“</span>
                  <blockquote>
                    When a child is well nourished, their mind can learn, their heart can dream and their future can be brighter.
                  </blockquote>
                  <cite>— Sadguru Sakshi Shree</cite>
                </div>
                <span className={styles.supportOverlayText}>
                  Real People.<br />
                  Real Learning.<br />
                  A Better Tomorrow
                </span>
              </div>
            </div>

            {/* Right Column: Donation Card */}
            <div className={styles.donationCard}>
              <h2>MAKE A DIFFERENCE TODAY</h2>
              <p className={styles.donationSub}>
                Choose an amount and be a part of this noble movement.
              </p>

              <div className={styles.typeToggle} role="group" aria-label="Contribution type">
                <button
                  type="button"
                  className={type === "once" ? styles.selected : ""}
                  onClick={() => setType("once")}
                >
                  One-time Contribution
                </button>
                <button
                  type="button"
                  className={type === "monthly" ? styles.selected : ""}
                  onClick={() => setType("monthly")}
                >
                  Monthly Contribution
                </button>
              </div>

              <div className={styles.amountGrid}>
                {amounts.map(({ value, label, description }) => (
                  <button
                    key={value}
                    type="button"
                    className={`${styles.amountCard} ${amount === value ? styles.amountSelected : ""}`}
                    onClick={() => setAmount(value)}
                    aria-pressed={amount === value}
                  >
                    {amount === value && <Check className={styles.amountCheck} size={16} />}
                    <strong>{label}</strong>
                    <span>{description}</span>
                  </button>
                ))}

                <label
                  className={`${styles.amountCard} ${styles.otherAmount} ${amount === "other" ? styles.amountSelected : ""}`}
                >
                  <input
                    type="radio"
                    name="gita-amount"
                    checked={amount === "other"}
                    onChange={() => setAmount("other")}
                  />
                  <strong>₹ Other Amount</strong>
                  <span>Enter amount of your choice</span>
                  <input
                    className={styles.customInput}
                    type="number"
                    min="1"
                    placeholder="Enter amount in ₹"
                    value={customAmount}
                    onFocus={() => setAmount("other")}
                    onChange={(event) => {
                      setAmount("other");
                      setCustomAmount(event.target.value);
                    }}
                    aria-label="Other donation amount in rupees"
                  />
                </label>
              </div>

              <a
                className={`${styles.donateButton} ${!donationReady ? styles.donateDisabled : ""}`}
                href={donationReady ? RAZORPAY_DONATION_LINK : undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!donationReady}
                onClick={(event) => {
                  if (!donationReady) event.preventDefault();
                }}
              >
                <LockKeyhole size={17} /> DONATE SECURELY <ArrowRight size={19} />
              </a>

              <div className={styles.paymentBenefits}>
                <span>
                  <ShieldCheck size={20} />
                  100% Secure<br />Payments
                </span>
                <span>
                  <CreditCard size={20} />
                  Instant<br />Confirmation
                </span>
                <span>
                  <Heart size={20} />
                  Support a Larger<br />Social Purpose
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHERE YOUR DONATION GOES */}
      <section className={styles.initiatives} id="initiatives">
        <div className={styles.container}>
          <div className={styles.sectionTitle}>
            <h2>WHERE YOUR DONATION GOES</h2>
            <p>Your support enables multiple initiatives that take Gita wisdom to individuals and communities.</p>
          </div>
          <div className={styles.initiativeGrid}>
            {initiatives.map((item) => (
              <article className={styles.initiativeCard} key={item.title}>
                <div className={styles.initiativeImage}>
                  <img src={item.image} alt={item.title} loading="lazy" />
                </div>
                <div className={styles.initiativeBody}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. OUR IMPACT SO FAR */}
      <section className={styles.impact} id="impact">
        <div className={styles.container}>
          <div className={styles.sectionTitle}>
            <h2>OUR IMPACT SO FAR</h2>
            <p>With the support of thousands of well-wishers, the Living the Gita Movement has already touched many lives.</p>
          </div>
          <div className={styles.impactCardWrap}>
            <div className={styles.impactGrid}>
              {impact.map(({ icon: Icon, number, label, detail }) => (
                <article className={styles.impactCard} key={label}>
                  <Icon aria-hidden="true" size={36} />
                  <div>
                    <strong>{number}</strong>
                    <span>{label}</span>
                    <small>{detail}</small>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. HEARTFELT STORIES */}
      <section className={styles.stories} id="stories">
        <div className={styles.container}>
          <div className={styles.sectionTitle}>
            <h2>HEARTFELT STORIES</h2>
            <p>Real experiences from people whose lives have been touched by the movement.</p>
          </div>
          <div className={styles.storyGrid}>
            {stories.map((story) => (
              <article className={styles.storyCard} key={story.name}>
                <img src={story.image} alt={story.name} loading="lazy" />
                <div>
                  <span className={styles.quoteMark}>“</span>
                  <blockquote>{story.quote}</blockquote>
                  <cite>— {story.name}</cite>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className={styles.faq} id="faqs">
        <div className={styles.container}>
          <div className={styles.sectionTitle}>
            <h2>FREQUENTLY ASKED QUESTIONS</h2>
            <p>Find quick answers to common questions about donations.</p>
          </div>
          <div className={styles.faqGrid}>
            <div className={styles.faqCol}>
              {faqs.slice(0, 4).map(({ q, a }) => (
                <details key={q}>
                  <summary>
                    {q}
                    <span>+</span>
                  </summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
            <div className={styles.faqCol}>
              {faqs.slice(4, 8).map(({ q, a }) => (
                <details key={q}>
                  <summary>
                    {q}
                    <span>+</span>
                  </summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. FINAL CALL-TO-ACTION BANNER */}
      <section className={styles.finalCta}>
        <div className={styles.container}>
          <h2>BE A PART OF A WISER, MORE AWARE WORLD</h2>
          <p>
            Your support helps spread the timeless wisdom of the Gita to more people,<br />
            more communities and every home.
          </p>
          <a className={styles.goldButton} href="#donate">
            MAKE YOUR CONTRIBUTION <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </div>
  );
}
