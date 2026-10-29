"use client";

import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Flower2,
  GraduationCap,
  Landmark,
  MonitorPlay,
  Users,
  Globe2,
  MapPin,
  Download,
  Presentation,
} from "lucide-react";
import { DonationForm } from "@/components/donation/DonationForm";
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
    metrics: [["25,000+", "People Reached"], ["120+", "Cities & Villages"]],
  },
  {
    image: "/images/living-the-moment/books-resources.jpg",
    title: "BOOKS & LEARNING RESOURCES",
    text: "Creating and distributing books, study material and digital content in simple and practical formats.",
    metrics: [["1,00,000+", "Books Distributed"], ["500+", "Digital Resources"]],
  },
  {
    image: "/images/living-the-moment/youth-outreach.jpg",
    title: "YOUTH OUTREACH",
    text: "Special programs for students and young professionals to build a positive mindset and value-based living.",
    metrics: [["10,000+", "Students Engaged"], ["200+", "Workshops Conducted"]],
  },
  {
    image: "/images/living-the-moment/digital-reach.jpg",
    title: "DIGITAL REACH & COMMUNITY EVENTS",
    text: "Expanding our online content, community initiatives and awareness programs to reach every home.",
    metrics: [["5,00,000+", "Online Viewers"], ["300+", "Community Events"]],
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
    q: "Can I make a one-time contribution?",
    a: "Yes. Choose a preset or custom amount and complete your one-time contribution through secure Razorpay Checkout.",
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

export default function LivingTheGita() {
  return (
    <div className={`${styles.page} gita-page`}>
      {/* 1. HERO SECTION — Full Panoramic Banner matching reference design with audience & Guruji */}
      <section
        id="top"
        className="relative w-full overflow-hidden bg-[#240407]"
        aria-label="Living the Gita Movement Banner"
      >
        <div className="sr-only">
          <h1>HELP THE GITA REACH EVERY HOME</h1>
          <p>TIMELESS WISDOM | STRONGER SOCIETY | BRIGHTER TOMORROW</p>
          <p>
            Your contribution helps us take practical Gita wisdom, learning programs and community
            initiatives to millions of people across India and beyond.
          </p>
        </div>

        <div className={styles.heroArtwork}>
          <picture>
            <img
              src="/images/living-the-moment/living-the-gita-hero-clean.webp"
              alt="Help the Gita Reach Every Home — Living the Gita Movement with Sadguru Sakshi Shree addressing a massive audience"
              className={styles.heroBannerImage}
              width={2048}
              height={768}
              loading="eager"
              fetchPriority="high"
            />
          </picture>

          <div className={styles.mobileHeroCopy}>
            <span>Timeless wisdom · Brighter tomorrow</span>
            <h2>Help the Gita reach every home</h2>
            <p>Take practical Gita wisdom and learning programs to communities everywhere.</p>
          </div>

          {/* Interactive "DONATE NOW" button hotspot directly over the graphic button */}
          <a
            href="#gita-contribution"
            className={styles.heroDonateCta}
            aria-label="Donate Now to Living the Gita Movement"
            title="Donate Now to Living the Gita Movement"
          >
            <span>Donate now</span>
            <ArrowRight size={17} aria-hidden="true" />
          </a>
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

      <section className={styles.pillars} aria-labelledby="pillars-title">
        <div className={styles.container}>
          <div className={styles.pillarsHeading}>
            <span>THE 3 PILLARS OF</span>
            <h2 id="pillars-title">LIVING THE GITA MOVEMENT</h2>
            <p>FROM KNOWLEDGE <ArrowRight size={15} /> PRACTICE <ArrowRight size={15} /> COMMUNITY</p>
          </div>
          <div className={styles.pillarGrid}>
            {[
              ["/images/living-the-moment/pillar-knowledge-books.jpg?v=2", "01 · KNOWLEDGE", "LIFE-CHANGING MAHA MANTRAS", "Discover the timeless wisdom of the Gita and learn how to live it every day.", "#initiatives", BookOpen],
              ["/images/living-the-moment/pillar-practice-meditation.jpg?v=2", "02 · PRACTICE", "SAKSHI SADHANA", "Go beyond reading the Gita and experience its wisdom in life.", "#vision", Flower2],
              ["/images/living-the-moment/pillar-community-circle.jpg?v=2", "03 · COMMUNITY", "GITA CIRCLE", "Learn, discuss, practise and grow together with a community of like-minded seekers.", "#initiatives", Users],
            ].map(([image, label, title, text, href, Icon]) => {
              const PillarIcon = Icon as typeof BookOpen;
              return <article className={styles.pillarCard} key={String(label)}>
                <img src={String(image)} alt={String(title)} loading="lazy" />
                <div className={styles.pillarIcon}><PillarIcon size={25} /></div>
                <span>{String(label)}</span><h3>{String(title)}</h3><p>{String(text)}</p>
                <a href={String(href)}>EXPLORE <ArrowRight size={16} /></a>
              </article>;
            })}
          </div>
        </div>
      </section>

      {/* 3. YOUR SUPPORT CREATES REAL IMPACT + MAKE A DIFFERENCE TODAY */}
      <section className={styles.support} id="donate">
        <div className={styles.container}>
          <div className={styles.supportGrid}>
            {/* Left Column: Impact Card with Audience Background */}
            <article className={styles.supportImpactCard}>
              <div className={styles.supportImpactContent}>
                <span className={styles.supportEyebrow}>YOUR SUPPORT</span>
                <h2 className={styles.supportHeading}>
                  CREATES<br />REAL IMPACT
                </h2>
                <p className={styles.supportText}>
                  Your contribution helps us conduct Gita learning sessions, create educational resources, reach youth and communities, and take this timeless wisdom to every corner of society.
                </p>
                <div className={styles.supportQuoteCard}>
                  <span className={styles.supportQuoteMark}>“</span>
                  <blockquote>
                    When a child is well nourished, their mind can learn, their heart can dream and their future can be brighter.
                  </blockquote>
                  <cite>— Sadguru Sakshi Shree</cite>
                </div>
                <a
                  className={styles.supportDonateBtn}
                  href="#gita-contribution"
                >
                  DONATE NOW <ArrowRight size={18} />
                </a>
              </div>
            </article>

            <DonationForm
              id="gita-contribution"
              title="Make a Contribution"
              subtitle="Choose an amount and help take the practical wisdom of the Gita to every home."
              sewa="gita"
              trustMessage="Support Timeless Wisdom"
            />
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
            {initiatives.map((item, index) => (
              <article className={styles.initiativeCard} key={item.title}>
                <div className={styles.initiativeImage}>
                  <img src={item.image} alt={item.title} loading="lazy" />
                </div>
                <div className={styles.initiativeBody}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <div className={styles.initiativeMetrics}>
                    {item.metrics.map(([number, label], metricIndex) => (
                      <span key={label}>{metricIndex === 0 ? <Users size={20} /> : index === 0 ? <MapPin size={20} /> : index === 1 ? <Download size={20} /> : index === 2 ? <Presentation size={20} /> : <Globe2 size={20} />}<b>{number}</b><small>{label}</small></span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <a className={styles.initiativesDonate} href="#gita-contribution">DONATE NOW <ArrowRight size={19} /></a>
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
          <a className={styles.goldButton} href="#gita-contribution">
            MAKE YOUR CONTRIBUTION <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </div>
  );
}
