import Image from "next/image";
import { ArrowRight, BookOpen, Building2, Flower2, HeartHandshake, Landmark, Leaf, Medal, Sparkles, Star, UsersRound } from "lucide-react";
import { DonationForm } from "@/components/donation/DonationForm";
import styles from "./nirman-sewa.module.css";

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
const heroImage = "/images/nirman-sewa/sakshi-dham-hero-hd.webp";
const transformationImage = "/images/nirman-sewa/sakshi-dham-transformation-hd.webp";
const donationImage = "/images/nirman-sewa/sakshi-dham-donate-hd.webp";

function SectionIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return <div className={styles.centerHeading}><p className={styles.kicker}>{eyebrow}</p><h2>{title}</h2>{children && <p>{children}</p>}</div>;
}

export default function NirmanSewaPage() {
  return <div className={`${styles.page} sakshi-dham-page`}>
    <section className={styles.referenceHero} aria-labelledby="nirman-title">
      <Image src={heroImage} alt="Sakshi Dham International at sunset" fill priority sizes="100vw" className={styles.heroImage} />
      <div className={styles.heroShade} />
      <div className={styles.heroTextOverlay}><p className={styles.heroEyebrow}>A DIVINE ABODE FOR A BRIGHTER TOMORROW</p><h1 id="nirman-title" className={styles.heroMainTitle}>SAKSHI DHAM<br />INTERNATIONAL</h1><p className={styles.heroSubtitle}>A Spiritual Center in Vrindavan for Inner Transformation and a More Conscious World.</p><a className={styles.heroCtaButton} href="#contribute">DONATE NOW <ArrowRight size={17} aria-hidden="true" /></a></div>
    </section>

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
        sewa="nirman"
      />
    </div>
    </section>

    <section className={styles.support}><SectionIntro eyebrow="THE CAMPUS" title="What your support will help create">Your contribution will help us build and develop this divine ashram with essential facilities for spiritual learning, meditation, retreats, and community living.</SectionIntro><div className={styles.facilityGrid}>{plannedFacilities.map(({ title, description, image, icon: Icon }) => <article className={styles.facilityCard} key={title}><div className={styles.facilityImage}><Image src={image} alt={`${title} proposed design`} fill sizes="(max-width: 680px) 100vw, (max-width: 1100px) 50vw, 25vw" /></div><div className={styles.facilityBody}><Icon aria-hidden="true" /><h3>{title}</h3><p>{description}</p></div></article>)}</div></section>
    <section className={styles.membership}><SectionIntro eyebrow="JOIN THE COMMUNITY" title="Membership details">Become a valued member and support the creation of Sakshi Dham International. Membership is available at the following contribution amounts.</SectionIntro><div className={styles.membershipGrid}>{membershipPlans.map(({ title, amount, icon: Icon }, index) => <article key={title} className={index === 0 ? styles.featuredMember : undefined}><Icon aria-hidden="true" /><div><h3>{title}</h3><strong>{amount}</strong></div></article>)}</div></section>
    <section className={styles.highlights}><SectionIntro eyebrow="THE PROMISE" title="A campus designed for conscious living" /><div className={styles.highlightGrid}>{projectHighlights.map(({ label, icon: Icon }) => <article key={label}><Icon aria-hidden="true" /><p>{label}</p></article>)}</div></section>
    <div className={styles.bottomCardsSection}><section className={styles.referenceVisual} aria-label="A place for inner transformation"><Image src={transformationImage} alt="A place for inner transformation at Sakshi Dham International" fill sizes="(max-width: 760px) 100vw, 1280px" /><div className={styles.artworkCleanPanel} /><div className={styles.artworkCopy}><h2>A PLACE FOR<br />INNER<br />TRANSFORMATION</h2></div><a className={styles.artworkCta} href="#contribute" aria-label="Donate now to Sakshi Dham International">DONATE NOW <span aria-hidden="true">→</span></a></section><section className={styles.referenceVisualSecond} aria-label="Let's build a sacred space for a more conscious world"><Image src={donationImage} alt="Let's build a sacred space for a more conscious world at Sakshi Dham International" fill sizes="(max-width: 760px) 100vw, 1280px" /><div className={styles.artworkCleanPanel} /><div className={`${styles.artworkCopy} ${styles.artworkCopySecond}`}><h2>LET&apos;S BUILD A SACRED SPACE<br />FOR A MORE CONSCIOUS WORLD</h2><p>Your contribution will help develop Sakshi Dham International in Vrindavan — a spiritual center dedicated to wisdom, inner transformation, and compassionate living.</p></div><a className={`${styles.artworkCta} ${styles.artworkCtaSecond}`} href="#contribute" aria-label="Donate now to Sakshi Dham International">DONATE NOW <span aria-hidden="true">→</span></a></section></div>
  </div>;
}
