import { Link } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { YouTubeThumb } from "@/components/YouTubeEmbed";
import { ARTICLES_BY_TOPIC, VIDEOS_BY_TOPIC, type SolutionSlug } from "@/data/content";
import { useState } from "react";
import { BookOpen, Quote, PlayCircle, Mic } from "lucide-react";

type Tab = "articles" | "quotes" | "videos" | "podcasts";

export function SolutionPageLayout({
  slug,
  title,
  tagline,
  intro,
}: {
  slug: SolutionSlug;
  title: string;
  tagline: string;
  intro: string;
}) {
  const [tab, setTab] = useState<Tab>("articles");
  const articles = ARTICLES_BY_TOPIC[slug];
  const videos = VIDEOS_BY_TOPIC[slug];

  const quoteImages = Array.from(
    { length: 9 },
    (_, i) => `https://sciencedivine.org/wp-content/uploads/2024/04/Anxiety-Quote-${i + 1}.jpg`,
  );

  return (
    <>
      <PageHero eyebrow="Solutions Hub" title={tagline} subtitle={intro}>
        <Link
          to="/book-session"
          className="btn-gradient rounded-full px-6 py-3 text-sm font-semibold"
        >
          Book Personal Session
        </Link>
        <Link
          to="/courses"
          className="glass-dark rounded-full px-6 py-3 text-sm font-semibold text-white border border-white/20"
        >
          Explore Courses
        </Link>
      </PageHero>

      <section className="section-pad">
        <div className="container-page">
          <div className="flex flex-wrap gap-2 justify-center mb-10 glass-card rounded-full p-1.5 w-fit mx-auto">
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
            <TabButton active={tab === "videos"} onClick={() => setTab("videos")} icon={PlayCircle}>
              Videos
            </TabButton>
            <TabButton active={tab === "podcasts"} onClick={() => setTab("podcasts")} icon={Mic}>
              Podcasts
            </TabButton>
          </div>

          {tab === "articles" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {articles.map((a, i) => (
                <article key={i} className="glass-card rounded-2xl p-6 hover-lift">
                  <div className="text-xs font-semibold uppercase tracking-wider gradient-text mb-2">
                    {title}
                  </div>
                  <h3 className="font-display text-lg font-bold mb-3 leading-snug">{a.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{a.excerpt}</p>
                  <button className="text-sm font-semibold text-primary hover:underline">
                    Read More →
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
                <div key={i} className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl gradient-bg grid place-items-center text-white">
                      <Mic size={22} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider gradient-text">
                        Podcast Episode {i}
                      </div>
                      <h3 className="font-display font-bold">Sakshi Shree on {title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Deep-dive conversation exploring {title.toLowerCase()} — its roots, its
                    patterns, and the path through.
                  </p>
                  <button className="text-sm font-semibold text-primary hover:underline">
                    Listen →
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section-pad bg-secondary/40">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="Take the Next Step"
            title="Ready for personal guidance?"
            subtitle="Book a personal session with Sakshi Shree — one hour that can change everything."
          />
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/book-session" className="btn-gradient rounded-full px-8 py-3 font-semibold">
              Book Personal Session
            </Link>
            <Link
              to="/get-solutions-for"
              className="btn-outline-glow rounded-full px-8 py-3 font-semibold"
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
      className={`inline-flex items-center gap-2 rounded-full px-4 md:px-5 py-2 text-sm font-semibold transition-all ${
        active ? "btn-gradient" : "hover:bg-secondary"
      }`}
    >
      <Icon size={16} /> {children}
    </button>
  );
}
