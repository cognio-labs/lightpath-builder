"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { LEADERS } from "@/data/content";
import { ArrowRight, ExternalLink } from "lucide-react";
import SplitText from "@/components/ui/SplitText";

const handleAnimationComplete = () => { };

const INITIATIVES_NUMBERED = [
  {
    num: "01",
    title: "Science Divine Foundation",
    desc: "Science Divine spreads the message of love and meditation the world over and creates a new humanity of self-realized souls with sound body and sound mind.",
    href: "/about-movement",
  },
  {
    num: "02",
    title: "Jhuggi Jhopadi Shiksha Sewa Missions",
    desc: "A registered non-profit NGO working since 2010 to alleviate living conditions of children living in slum clusters by providing them with modern education free of cost.",
    href: "http://jhuggijhopadi.org/",
    external: true,
  },
  {
    num: "03",
    title: "Young Mind Movement",
    desc: "Empowering young individuals with the tools and techniques necessary to navigate the challenges of modern life with ease and grace and to help them unleash their true potential.",
    href: "/initiatives",
  },
];

const BLOG_POSTS = [
  {
    date: "August 14, 2024",
    title: "The Deep Connection Between Meditation and the Soul",
    href: "https://sciencedivine.org/deep-connection-between-meditation-and-the-soul/",
  },
  {
    date: "August 13, 2024",
    title: "How Energy Flow Shapes Your Physical and Mental Well-Being",
    href: "https://sciencedivine.org/how-energy-flow-shapes-your-physical/",
  },
  {
    date: "August 13, 2024",
    title: "The Art of Observation",
    href: "https://sciencedivine.org/the-art-of-observation/",
  },
];

const easePower3Out = [0.215, 0.61, 0.355, 1] as const;

export default function Page() {
  return (
    <>
      {/* Hero */}
      <PageHero
        eyebrow="Guru Profile"
        title={
          <div className="flex flex-col items-center justify-center text-center w-full max-w-4xl mx-auto">
            <span className="block font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Sakshi Shree
            </span>
            <span
              className="block font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-2 sm:mt-3 leading-tight"
              style={{
                background: "linear-gradient(90deg, #521623 0%, #B8860B 50%, #521623 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              A Spiritual Master and Mystic
            </span>
          </div>
        }
        subtitle="In the supermarket of spirituality, Sakshi Shree guides with specific spiritual processes and meditations best suited to your unique intrinsic nature, because your stories, struggles and scars are very personal."
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.25, ease: easePower3Out }}
        >
          <Link
            href="/book-session"
            className="btn-gold rounded-full px-7 py-3.5 text-sm font-semibold inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
          >
            Meet Sakshi Shree <ArrowRight size={15} />
          </Link>
        </motion.div>
      </PageHero>

      {/* Bio Section */}
      <section className="section-pad bg-white">
        <div className="container-page grid md:grid-cols-5 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.25, ease: easePower3Out }}
            className="md:col-span-2 space-y-4"
          >
            <img
              src="/images/about-sakshi-shree-new.webp"
              alt="Sakshi Shree"
              className="rounded-3xl shadow-xl w-full object-cover"
              loading="lazy"
            />
          </motion.div>
          <div className="md:col-span-3 space-y-6">
            <SectionHeading
              eyebrow="Biography"
              title={
                <SplitText
                  text="Discover Inner Serenity, Embrace Outer Reality"
                  className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#521623]"
                  delay={30}
                  duration={1.25}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-50px"
                  textAlign="left"
                  onLetterAnimationComplete={handleAnimationComplete}
                  showCallback
                />
              }
            />
            <p className="text-gray-600 leading-relaxed">
              Sakshi Shree is a Spiritual Master, a Mystic, and the founder of the Young Mind Movement for unleashing
              the limitless powers of the young minds across the world.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Ever since he was endowed with divine powers by his own guru Swami Sudarshanacharya Ji Maharaj,
              he left the comforts and powers that he enjoyed as one of top-most bureaucrats in India and devoted
              his life to rescuing people from their drudgeries through meditation and spirituality.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Sakshi Shree walked two worlds ,  the corridors of Indian civil service and the silent chambers
              of deep meditation. Under his guidance, more than 5 million people across India and the world
              have discovered peace, purpose, and self-knowledge.
            </p>
            <blockquote
              className="border-l-4 pl-5 font-quote text-xl text-gray-700 italic"
              style={{ borderColor: "#D4AF37" }}
            >
              "Do not believe unless you experience it yourself."
            </blockquote>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1.25, ease: easePower3Out }}
            >
              <Link
                href="/book-session"
                className="btn-gold rounded-full px-7 py-3.5 text-sm font-semibold inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                Book a Personal Session <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leaders in company */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="In Company Of"
            title={
              <SplitText
                text="Meetings with World Leaders"
                className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#521623]"
                delay={35}
                duration={1.25}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-50px"
                textAlign="center"
                onLetterAnimationComplete={handleAnimationComplete}
                showCallback
              />
            }
            subtitle="Sakshi Shree has shared his wisdom with heads of state, ministers, scholars, and public servants across continents."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LEADERS.map((l, index) => (
              <motion.div
                key={l.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 1.25, delay: index * 0.1, ease: easePower3Out }}
                className="card-premium rounded-2xl overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <motion.img
                    src={l.image}
                    alt={l.name}
                    loading="lazy"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 1.25, ease: easePower3Out }}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 border-t" style={{ borderColor: "rgba(212,175,55,0.2)" }}>
                  <h3 className="font-display font-bold text-gray-900 text-sm leading-tight mb-1">{l.name}</h3>
                  <p className="text-xs text-gray-500">{l.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives */}
      <section className="section-pad" style={{ background: "#FAFAFA" }}>
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="Legacy"
            title={
              <SplitText
                text="Initiatives by Sakshi Shree"
                className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#521623]"
                delay={35}
                duration={1.25}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-50px"
                textAlign="center"
                onLetterAnimationComplete={handleAnimationComplete}
                showCallback
              />
            }
          />
          <div className="grid md:grid-cols-3 gap-8">
            {INITIATIVES_NUMBERED.map((item, index) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 1.25, delay: index * 0.1, ease: easePower3Out }}
                className="card-premium rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between"
              >
                <div
                  className="text-7xl font-display font-bold opacity-5 absolute -top-3 -right-2 pointer-events-none"
                  style={{ color: "#D4AF37" }}
                >
                  {item.num}
                </div>
                <div className="relative">
                  <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#D4AF37" }}>
                    {item.num}
                  </div>
                  <h3 className="font-display font-bold text-gray-900 text-lg mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">{item.desc}</p>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 1.25, ease: easePower3Out }}
                >
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-semibold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1 group"
                    >
                      Know More <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-sm font-semibold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1 group"
                    >
                      Know More <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="py-20" style={{ background: "linear-gradient(135deg, #FFFBF0, #FFF3D0)" }}>
        <div className="container-page text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <SplitText
              text="Join the Community"
              className="font-display text-3xl md:text-4xl font-bold text-gray-900"
              delay={40}
              duration={1.25}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-50px"
              textAlign="center"
              onLetterAnimationComplete={handleAnimationComplete}
              showCallback
            />
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            Get access to exclusive audios, videos, blogs, newsletters, and more!
          </p>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.25, ease: easePower3Out }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/book-session"
              className="btn-gold rounded-full px-8 py-3.5 text-sm font-semibold shadow-md hover:shadow-lg transition-all"
            >
              Book Personal Session
            </Link>
            <Link
              href="/courses"
              className="btn-outline-gold rounded-full px-8 py-3.5 text-sm font-semibold shadow-sm hover:shadow-md transition-all"
            >
              Explore Courses
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
