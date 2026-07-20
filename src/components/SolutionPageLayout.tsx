import { Link } from "@tanstack/react-router";
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
    themeColor: "#15803D", // Green
    lightBgColor: "rgba(21, 128, 61, 0.08)",
    badgeText: "SOLUTIONS HUB",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1000&q=80",
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
    themeColor: "#BE123C", // Rose
    lightBgColor: "rgba(190, 18, 60, 0.08)",
    badgeText: "SOLUTIONS • WELLNESS",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1000&q=80",
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
    themeColor: "#B91C1C", // Crimson/Red
    lightBgColor: "rgba(185, 28, 28, 0.08)",
    badgeText: "SOLUTIONS • RELATIONSHIPS",
    image: "https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?w=1000&q=80",
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
                  borderColor: `${meta.themeColor}33`,
                  color: meta.themeColor,
                  background: `${meta.themeColor}15`,
                }}
              >
                <Flower2 size={14} />
                <span>{meta.badgeText}</span>
              </div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.15]">
                {tagline.split(":")[0]}
                {tagline.includes(":") && (
                  <>
                    : <span style={{ color: meta.themeColor }}>{tagline.split(":")[1]}</span>
                  </>
                )}
                {!tagline.includes(":") && (
                  <span style={{ color: meta.themeColor }}>{tagline}</span>
                )}
              </h1>

              <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-xl">{intro}</p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/book-session"
                  className="rounded-full px-8 py-3.5 text-sm font-semibold inline-flex items-center gap-2 shadow-lg hover:scale-105 transition-all text-white"
                  style={{
                    background: `linear-gradient(135deg, ${meta.themeColor}, #D4AF37)`,
                  }}
                >
                  Book Personal Session <ArrowRight size={15} />
                </Link>
                <Link
                  to="/courses"
                  className="rounded-full px-8 py-3.5 text-sm font-semibold border hover:bg-black/5 transition-all"
                  style={{
                    borderColor: `${meta.themeColor}55`,
                    color: meta.themeColor,
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
                <div key={idx} className="flex gap-4 items-start group">
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
                <article key={i} className="card-premium rounded-2xl p-6 group">
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
                <div key={i} className="card-premium rounded-2xl p-6">
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

export function SolutionHeroImage({
  src,
  alt,
  themeColor,
}: {
  src: string;
  alt: string;
  themeColor: string;
}) {
  return (
    <div className="lg:col-span-5 flex justify-center relative">
      <div className="relative w-full max-w-[520px] aspect-[1.16] min-h-[320px] overflow-hidden rounded-[34px] bg-white shadow-2xl shadow-amber-900/10 ring-1 ring-white/80">
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-white/10" />
        <svg
          className="absolute inset-0 h-full w-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M 0 0 H 17 C 8 11 7 25 15 36 C 26 50 25 64 13 77 C 5 86 2 94 5 100 H 0 Z"
            fill="#FFFBF0"
            opacity="0.95"
          />
          <path
            d="M 17 0 C 8 11 7 25 15 36 C 26 50 25 64 13 77 C 5 86 2 94 5 100"
            fill="none"
            stroke={themeColor}
            strokeWidth="0.75"
            opacity="0.9"
          />
          <path
            d="M 11 4 C 34 -2 63 9 100 -5"
            fill="none"
            stroke={themeColor}
            strokeWidth="0.45"
            opacity="0.55"
          />
          <path
            d="M 14 7 C 37 1 66 12 100 -1"
            fill="none"
            stroke={themeColor}
            strokeWidth="0.3"
            opacity="0.35"
          />
        </svg>
        <div className="absolute left-[42%] top-[12%] h-28 w-28 rounded-full border border-white/35 opacity-40" />
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
