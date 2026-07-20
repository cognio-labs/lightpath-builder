import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { SolutionHeroImage } from "@/components/SolutionPageLayout";
import { YouTubeThumb } from "@/components/YouTubeEmbed";
import { useState } from "react";
import {
  BookOpen,
  Quote,
  PlayCircle,
  Mic,
  ArrowRight,
  Heart,
  Compass,
  Flower2,
  Sun,
  Moon,
} from "lucide-react";

export const Route = createFileRoute("/anxiety")({
  head: () => ({
    meta: [
      { title: "Overcome Anxiety | Science Divine Foundation" },
      {
        name: "description",
        content:
          "Beating Anxiety Together: Simple Steps to Calm with Sakshi Shree. Practical solutions and age-old wisdom to calm your mind.",
      },
    ],
  }),
  component: Page,
});

type Tab = "articles" | "quotes" | "videos" | "podcasts";

const ARTICLES = [
  {
    title: "7 Ways to Foster an Optimistic Mind",
    href: "https://sciencedivine.org/optimistic-mind/",
    desc: "Learn to shift focus to positive options and consciously reprogram negative thought patterns.",
  },
  {
    title: "How to Be Conscious: Wake Up Your Mind Every Day",
    href: "https://sciencedivine.org/conscious/",
    desc: "Cultivating presence to escape constant loops of anxiety and worry.",
  },
  {
    title: "How to Feel Calm: Easy Ways to Find Peace of Mind",
    href: "https://sciencedivine.org/what-is-peace-of-mind/",
    desc: "Simple somatic practices that immediately downregulate stress response in the body.",
  },
  {
    title: "Why Should You Prioritize Your Mental Health Every Day?",
    href: "https://sciencedivine.org/what-is-mental-health/",
    desc: "Understanding the balance between mental wellness, sleep, and physical breathing.",
  },
  {
    title: "Benefits of Yoga for Hypertension Management",
    href: "https://sciencedivine.org/yoga-for-hypertension/",
    desc: "How dynamic alignment helps manage heart rate variability and blood pressure.",
  },
  {
    title: "Yoga Nidra: Mastering the Art of Conscious Relaxation",
    href: "https://sciencedivine.org/yoga-nidra/",
    desc: "Restorative deep relaxation method to clear chronic fatigue and mental tension.",
  },
  {
    title: "Exploring the Symbiotic Connection Between Yoga and Mindfulness Meditation",
    href: "https://sciencedivine.org/unveiling-the-harmony/",
    desc: "Deep meditation and somatic stretching working together for balance.",
  },
  {
    title: "Meditation for Seniors: Embrace a Journey to Serenity and Healthy Aging",
    href: "https://sciencedivine.org/meditation-for-seniors/",
    desc: "Tailored meditation techniques suitable for senior practitioners.",
  },
  {
    title: "Harmonizing Mind and Body: The Transformative Power of Yoga and Meditation",
    href: "https://sciencedivine.org/harmonizing-mind-and-body/",
    desc: "A general guide to aligning biological energy paths.",
  },
];

const VIDEOS = [
  {
    id: "okTnWaUrrcc",
    title: "Anxiety (एंग्जायटी) कैसे ठीक करें? | How to cure anxiety? | Sakshi Shree",
  },
  { id: "rBEYkNe1wIo", title: "How to Fight Fear & Anxiety : Part 2" },
  { id: "UwitMvjhZWU", title: "Immediate freedom from anxiety, stress & fear" },
  {
    id: "WuexPS1a9DM",
    title: "एक बड़ी समस्या भय, चिंता और तनाव से तुरंत मुक्त होने का 1 सरल महासूत्र",
  },
  { id: "YsHfFDVjhgg", title: "जीवन की चिंताओं से मुक्ति पाने का उपाय by सदगुरु" },
  { id: "BPBGUq-7DwM", title: "How to Fight Fear & Anxiety : Part 1" },
  { id: "DJRJ8osnYd0", title: "युवाओं के लिए डिप्रेशन, तनाव, व चिंता से मुक्ति का उपाय" },
  { id: "paffCWKd720", title: "चिंता तनाव और भय से मुक्त होने की महत्वपूर्ण तकनीक" },
];

const QUOTES = Array.from(
  { length: 9 },
  (_, i) => `https://sciencedivine.org/wp-content/uploads/2024/04/Anxiety-Quote-${i + 1}.jpg`,
);

const PODCASTS = [
  {
    name: "Swaparna Testimonial",
    id: "QLmL230dApk",
    desc: "A student sharing how she completely overcame study-related panic attacks.",
  },
  {
    name: "Helen Testimonial",
    id: "EiFMTSo8Yws",
    desc: "How mindfulness and breathwork cured years of chronic anxious loops.",
  },
  {
    name: "Pooja Testimonial",
    id: "6bkJdkmAt20",
    desc: "Reclaiming control over a fast-paced corporate life through meditation.",
  },
  {
    name: "Patty Testimonial",
    id: "5KmsxqJXACM",
    desc: "Finding peace and emotional balance after experiencing major life changes.",
  },
];

function Page() {
  const [tab, setTab] = useState<Tab>("articles");
  return (
    <>
      <section
        className="relative overflow-hidden pt-28 pb-16"
        style={{ background: "linear-gradient(135deg, #FFFBF0 0%, #FFF8E7 60%, #FFFFFF 100%)" }}
      >
        {/* Decorative gold orbs */}
        <div
          className="absolute -top-16 -right-16 w-80 h-80 rounded-full opacity-10 animate-glow-pulse"
          style={{ background: "radial-gradient(circle, #D4AF37, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-10 animate-glow-pulse"
          style={{ background: "radial-gradient(circle, #F59E0B, transparent 70%)" }}
        />

        <div className="container-page relative z-10">
          {/* Top Row: Content & Image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-7 space-y-6">
              {/* Eyebrow badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border"
                style={{
                  borderColor: "rgba(3, 105, 161, 0.2)",
                  color: "#0369A1",
                  background: "rgba(3, 105, 161, 0.08)",
                }}
              >
                <Heart size={14} />
                <span>SOLUTIONS · ANXIETY</span>
              </div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.15]">
                Calming the Mind: <span style={{ color: "#0369A1" }}>Overcoming Anxiety</span>
              </h1>

              <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-xl">
                If feeling anxious about what lies ahead or overwhelmed by constant worry makes you
                feel lonely, then know that you are not alone. Under Sakshi Shree's guidance,
                explore practical solutions and age-old wisdom to help calm your mind and ease your
                worries.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/book-session"
                  className="rounded-full px-8 py-3.5 text-sm font-semibold inline-flex items-center gap-2 shadow-lg hover:scale-105 transition-all text-white"
                  style={{
                    background: "linear-gradient(135deg, #0369A1, #D4AF37)",
                  }}
                >
                  Book Personal Session <ArrowRight size={15} />
                </Link>
                <a
                  href="#explore"
                  className="rounded-full px-8 py-3.5 text-sm font-semibold border hover:bg-black/5 transition-all inline-flex items-center"
                  style={{
                    borderColor: "rgba(3, 105, 161, 0.3)",
                    color: "#0369A1",
                  }}
                >
                  Explore Resources
                </a>
              </div>
            </div>
            {/* Right side image */}
            <SolutionHeroImage
              src="/premium-heroes/anxiety-hero.png"
              alt="Overcoming anxiety"
              themeColor="#0369A1"
            />
          </div>

          {/* Second Row: Grid of 4 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8 rounded-3xl bg-white border border-gray-100/80 shadow-xl shadow-amber-900/5 mb-8">
            {[
              {
                title: "Mindful Breathing",
                desc: "Somatic practices to immediately regulate your nervous system.",
                icon: Heart,
              },
              {
                title: "Cognitive Calm",
                desc: "Break free from the loops of worry and future-oriented fear.",
                icon: Compass,
              },
              {
                title: "Present Awareness",
                desc: "Anchor yourself in the now to quiet anxious thoughts.",
                icon: Flower2,
              },
              {
                title: "Emotional Release",
                desc: "Safe guidance to process and release stored physical tension.",
                icon: Sun,
              },
            ].map((card, idx) => {
              const CardIcon = card.icon;
              return (
                <div key={idx} className="flex gap-4 items-start group">
                  <div
                    className="p-3 rounded-2xl flex-shrink-0 transition-transform group-hover:scale-110"
                    style={{
                      background: "rgba(3, 105, 161, 0.08)",
                      color: "#0369A1",
                    }}
                  >
                    <CardIcon size={20} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                      {card.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Third Row: Bottom Quote */}
          <div className="flex items-center justify-center gap-2 py-4">
            <Flower2 size={16} style={{ color: "#D4AF37" }} />
            <span className="font-display text-sm md:text-base italic text-amber-800/80 font-medium text-center">
              Breathe In Peace, Breathe Out Worry
            </span>
            <Flower2 size={16} style={{ color: "#D4AF37" }} />
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page">
          {/* Navigation Tab Bar */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            <div className="flex flex-wrap gap-1 p-1.5 rounded-full bg-gray-100 shadow-inner">
              <TabButton
                active={tab === "articles"}
                onClick={() => setTab("articles")}
                icon={BookOpen}
              >
                Articles
              </TabButton>
              <TabButton active={tab === "quotes"} onClick={() => setTab("quotes")} icon={Quote}>
                Quotes
              </TabButton>
              <TabButton
                active={tab === "videos"}
                onClick={() => setTab("videos")}
                icon={PlayCircle}
              >
                Videos
              </TabButton>
              <TabButton active={tab === "podcasts"} onClick={() => setTab("podcasts")} icon={Mic}>
                Testimonial Videos
              </TabButton>
            </div>
          </div>

          {/* Articles */}
          {tab === "articles" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {ARTICLES.map((a, i) => (
                <a
                  key={i}
                  href={a.href}
                  target="_blank"
                  rel="noreferrer"
                  className="card-premium rounded-2xl p-6 group block"
                >
                  <div className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-3">
                    Anxiety Solutions
                  </div>
                  <div
                    className="w-8 h-0.5 mb-4 transition-all group-hover:w-14"
                    style={{ background: "linear-gradient(90deg, #F59E0B, #D4AF37)" }}
                  />
                  <h3 className="font-display text-lg font-bold text-gray-900 mb-3 leading-snug group-hover:text-amber-700 transition-colors">
                    {a.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">{a.desc}</p>
                  <span className="text-sm font-semibold text-amber-600 inline-flex items-center gap-1">
                    Read Article <ArrowRight size={12} />
                  </span>
                </a>
              ))}
            </div>
          )}

          {/* Quotes */}
          {tab === "quotes" && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-fade-in">
              {QUOTES.map((src, i) => (
                <a
                  key={i}
                  href={src}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl overflow-hidden hover-lift block"
                >
                  <img
                    src={src}
                    alt={`Anxiety quote ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover aspect-square"
                  />
                </a>
              ))}
            </div>
          )}

          {/* Videos */}
          {tab === "videos" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {VIDEOS.map((v) => (
                <YouTubeThumb key={v.id} id={v.id} title={v.title} />
              ))}
            </div>
          )}

          {/* Podcasts / Video Testimonials */}
          {tab === "podcasts" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
              {PODCASTS.map((p) => (
                <YouTubeThumb key={p.id} id={p.id} title={p.name} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section
        className="section-pad"
        style={{ background: "linear-gradient(135deg, #FFFBF0, #FFF3D0)" }}
      >
        <div className="container-page text-center">
          <SectionHeading
            center
            eyebrow="Take the Next Step"
            title="Overcome anxiety & find peace"
            subtitle="Book a personal session with Sakshi Shree ,  one hour that can change everything."
          />
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/book-session"
              className="btn-gold rounded-full px-8 py-3.5 font-semibold text-sm"
            >
              Book Personal Session
            </Link>
            <Link
              to="/get-solutions-for"
              className="btn-outline-gold rounded-full px-8 py-3.5 font-semibold text-sm"
            >
              Explore Other Solutions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ size?: number }>;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full px-4 md:px-5 py-2 text-sm font-semibold transition-all"
      style={
        active
          ? {
              background: "linear-gradient(135deg, #F59E0B, #D4AF37)",
              color: "#1a1000",
              boxShadow: "0 4px 12px rgba(212,175,55,0.35)",
            }
          : { color: "#6B7280", background: "transparent" }
      }
    >
      <Icon size={15} /> {children}
    </button>
  );
}
