"use client";
import Link from "next/link";
import { SectionHeading } from "@/components/PageHero";
import { YouTubeThumb } from "@/components/YouTubeEmbed";
import { ARTICLES_BY_TOPIC, VIDEOS_BY_TOPIC, type SolutionSlug } from "@/data/content";
import { useState } from "react";
import {
  BookOpen,
  Quote,
  PlayCircle,
  Mic,
  ArrowRight,
  Heart,
  Moon,
  Compass,
  Flower2,
  Sun,
  Flame,
  Users,
  LucideIcon,
} from "lucide-react";

type Tab = "articles" | "quotes" | "videos" | "podcasts";

const SOLUTION_METAS: Record<
  string,
  {
    themeColor: string;
    lightBgColor: string;
    badgeText: string;
    image: string;
    bottomText: string;
    cards: {
      title: string;
      desc: string;
      icon: LucideIcon;
    }[];
  }
> = {
  "Sleeping Disorder": {
    themeColor: "#D4AF37", // Brand gold
    lightBgColor: "rgba(21, 128, 61, 0.08)",
    badgeText: "SOLUTIONS HUB",
    image: "/premium-heroes/sleeping-disorder-hero.png",
    bottomText: "A calm mind leads to a peaceful sleep and a beautiful life.",
    cards: [
      {
        title: "Better Sleep",
        desc: "Fall asleep faster and experience deeper, undisturbed sleep.",
        icon: Moon,
      },
      {
        title: "Relax & Unwind",
        desc: "Release stress and calm your mind before bedtime.",
        icon: Compass,
      },
      {
        title: "Natural Healing",
        desc: "Support your body's natural rhythm for restorative sleep.",
        icon: Flower2,
      },
      {
        title: "Wake Refreshed",
        desc: "Wake up energized, refreshed and ready for a new day.",
        icon: Sun,
      },
    ],
  },
  Wellness: {
    themeColor: "#D4AF37", // Brand gold
    lightBgColor: "rgba(190, 18, 60, 0.08)",
    badgeText: "SOLUTIONS • WELLNESS",
    image: "/premium-heroes/wellness-hero.png",
    bottomText: "Harmonizing Body, Mind, and Spirit",
    cards: [
      {
        title: "Vital Body",
        desc: "Nurture physical health through aligned movements and nutrition.",
        icon: Flame,
      },
      {
        title: "Sound Mind",
        desc: "Quiet mental stress to unlock your body's natural healing power.",
        icon: Heart,
      },
      {
        title: "Energy Balance",
        desc: "Align your biological energy paths for daily vitality.",
        icon: Compass,
      },
      {
        title: "Self-Realization",
        desc: "Discover the peace that comes from knowing your true nature.",
        icon: Sun,
      },
    ],
  },
  Relationships: {
    themeColor: "#D4AF37", // Brand gold
    lightBgColor: "rgba(185, 28, 28, 0.08)",
    badgeText: "SOLUTIONS • RELATIONSHIPS",
    image: "/premium-heroes/relationships-hero.png",
    bottomText: "Conscious Hearts, Sacred Connections",
    cards: [
      {
        title: "Empathic Listening",
        desc: "Understand others deeply by listening with full presence.",
        icon: Users,
      },
      {
        title: "Heart Connection",
        desc: "Resolve conflicts from a space of love and mutual respect.",
        icon: Heart,
      },
      {
        title: "Conscious Loving",
        desc: "Release expectations and love with freedom and acceptance.",
        icon: Flower2,
      },
      {
        title: "Mirror Principle",
        desc: "Understand how your relationships mirror your inner state.",
        icon: Compass,
      },
    ],
  },
};

export function SolutionPageLayout({
  slug,
  title,
  tagline,
  intro,
  heroImage,
}: {
  slug: SolutionSlug;
  title: string;
  tagline: string;
  intro: string;
  heroImage?: string;
}) {
  const [tab, setTab] = useState<Tab>("articles");
  const articles = ARTICLES_BY_TOPIC[slug];
  const videos = VIDEOS_BY_TOPIC[slug];

  const quoteImages = Array.from(
    { length: 9 },
    (_, i) => `https://sciencedivine.org/wp-content/uploads/2024/04/Anxiety-Quote-${i + 1}.jpg`,
  );

  const meta = SOLUTION_METAS[title] || SOLUTION_METAS["Wellness"];
  const cardImages = ["/feature-cards/sound-body.png", "/feature-cards/sound-mind.png", "/feature-cards/self-realization.png", "/wellbeing-practices-ai.png"];

  return (
    <>
      <section
        className="relative overflow-hidden pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 text-white"
        style={{ background: "linear-gradient(135deg, #1A0A2E 0%, #2D1B4E 50%, #1A0A2E 100%)" }}
      >
        {/* Decorative gold orbs */}
        <div
          className="absolute -top-16 -right-16 w-80 h-80 rounded-full opacity-20 animate-glow-pulse"
          style={{ background: "radial-gradient(circle, #D4AF37, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-20 animate-glow-pulse"
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
                  borderColor: "rgba(212,175,55,0.3)",
                  color: "#D4AF37",
                  background: "rgba(212,175,55,0.15)",
                }}
              >
                <Flower2 size={14} />
                <span>{meta.badgeText}</span>
              </div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15]">
                {tagline.split(":")[0]}
                {tagline.includes(":") && (
                  <>
                    : <span className="bg-gradient-to-r from-[#F59E0B] to-[#D4AF37] bg-clip-text text-transparent">{tagline.split(":")[1]}</span>
                  </>
                )}
                {!tagline.includes(":") && (
                  <span className="bg-gradient-to-r from-[#F59E0B] to-[#D4AF37] bg-clip-text text-transparent">{tagline}</span>
                )}
              </h1>

              <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-xl">{intro}</p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/book-session"
                  className="rounded-full px-8 py-3.5 text-sm font-semibold inline-flex items-center gap-2 shadow-lg hover:scale-105 transition-all text-[#0F172A]"
                  style={{
                    background: "linear-gradient(135deg, #F59E0B, #D4AF37)",
                  }}
                >
                  Book Personal Session <ArrowRight size={15} />
                </Link>
                <Link
                  href="/courses"
                  className="rounded-full px-8 py-3.5 text-sm font-semibold border hover:bg-white/20 transition-all text-white backdrop-blur-md"
                  style={{
                    borderColor: "rgba(255,255,255,0.2)",
                    background: "rgba(255,255,255,0.08)",
                  }}
                >
                  Explore Courses
                </Link>
              </div>
            </div>
            {/* Right side image */}
            <SolutionHeroImage
              src={heroImage || meta.image}
              alt={title}
              themeColor={meta.themeColor}
            />
          </div>

          {/* Second Row: Grid of 4 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8 rounded-3xl bg-white border border-gray-100/80 shadow-xl shadow-amber-900/5 mb-8">
            {meta.cards.map((card, idx) => {
              const CardIcon = card.icon;
              return (
                <div key={idx} className="flex flex-col gap-3 items-start group">
                  <img src={cardImages[idx]} alt="" className="h-28 w-full rounded-2xl object-cover object-top" loading="lazy" />
                  <div
                    className="p-3 rounded-2xl flex-shrink-0 transition-transform group-hover:scale-110"
                    style={{
                      background: `${meta.themeColor}15`,
                      color: meta.themeColor,
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
              {meta.bottomText}
            </span>
            <Flower2 size={16} style={{ color: "#D4AF37" }} />
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page">
          {/* Tab bar */}
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
                Podcasts
              </TabButton>
            </div>
          </div>

          {tab === "articles" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {articles.map((a, i) => (
                <article key={i} className="card-premium rounded-2xl p-6 group overflow-hidden">
                  <img src={cardImages[i % cardImages.length]} alt="" className="-mx-6 -mt-6 mb-5 h-36 w-[calc(100%+3rem)] object-cover" loading="lazy" />
                  <div className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-3">
                    {title}
                  </div>
                  <div
                    className="w-8 h-0.5 mb-4 transition-all group-hover:w-14"
                    style={{ background: "linear-gradient(90deg, #F59E0B, #D4AF37)" }}
                  />
                  <h3 className="font-display text-lg font-bold text-gray-900 mb-3 leading-snug">
                    {a.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">{a.excerpt}</p>
                  <button className="text-sm font-semibold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1">
                    Read More <ArrowRight size={12} />
                  </button>
                </article>
              ))}
            </div>
          )}

          {tab === "quotes" && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-fade-in">
              {quoteImages.map((src, i) => (
                <a
                  key={i}
                  href={src}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl overflow-hidden hover-lift block"
                >
                  <img
                    src={src}
                    alt={`${title} quote ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover aspect-square"
                  />
                </a>
              ))}
            </div>
          )}

          {tab === "videos" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {videos.map((v) => (
                <YouTubeThumb key={v.id} id={v.id} title={v.title} />
              ))}
            </div>
          )}

          {tab === "podcasts" && (
            <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="card-premium rounded-2xl p-6 overflow-hidden">
                  <img src={cardImages[(i + 1) % cardImages.length]} alt="" className="-mx-6 -mt-6 mb-5 h-32 w-[calc(100%+3rem)] object-cover" loading="lazy" />
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-14 h-14 rounded-xl grid place-items-center text-white flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #F59E0B, #D4AF37)" }}
                    >
                      <Mic size={22} />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-1">
                        Podcast Episode {i}
                      </div>
                      <h3 className="font-display font-bold text-gray-900">
                        Sakshi Shree on {title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                    Deep-dive conversation exploring {title.toLowerCase()}, its roots, its patterns,
                    and the path through.
                  </p>
                  <button className="text-sm font-semibold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1">
                    Listen <ArrowRight size={12} />
                  </button>
                </div>
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
            title="Ready for personal guidance?"
            subtitle="Book a personal session with Sakshi Shree, one hour that can change everything."
          />
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/book-session"
              className="btn-gold rounded-full px-8 py-3.5 font-semibold text-sm"
            >
              Book Personal Session
            </Link>
            <Link
              href="/get-solutions-for"
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

export function SolutionHeroImage({
  src,
  alt,
  themeColor,
}: {
  src: string;
  alt: string;
  themeColor?: string;
  integrated?: boolean;
}) {
  return (
    <div className="lg:col-span-5 flex justify-center relative">
      <div className="relative w-full max-w-[480px] aspect-[4/3] sm:aspect-[1.15] overflow-hidden rounded-3xl shadow-2xl border-4 border-[#D4AF37]/40">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
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
