import { Link } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { YouTubeThumb } from "@/components/YouTubeEmbed";
import { ARTICLES_BY_TOPIC, VIDEOS_BY_TOPIC, type SolutionSlug } from "@/data/content";
import { useState } from "react";
import { BookOpen, Quote, PlayCircle, Mic, ArrowRight } from "lucide-react";

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
        <Link to="/book-session" className="btn-gold rounded-full px-7 py-3.5 text-sm font-semibold inline-flex items-center gap-2">
          Book Personal Session <ArrowRight size={15} />
        </Link>
        <Link to="/courses" className="btn-outline-gold rounded-full px-7 py-3.5 text-sm font-semibold">
          Explore Courses
        </Link>
      </PageHero>

      <section className="section-pad bg-white">
        <div className="container-page">
          {/* Tab bar */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            <div className="flex flex-wrap gap-1 p-1.5 rounded-full bg-gray-100 shadow-inner">
              <TabButton active={tab === "articles"} onClick={() => setTab("articles")} icon={BookOpen}>
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
          </div>

          {tab === "articles" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {articles.map((a, i) => (
                <article key={i} className="card-premium rounded-2xl p-6 group">
                  <div className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-3">
                    {title}
                  </div>
                  <div className="w-8 h-0.5 mb-4 transition-all group-hover:w-14"
                    style={{ background: "linear-gradient(90deg, #F59E0B, #D4AF37)" }} />
                  <h3 className="font-display text-lg font-bold text-gray-900 mb-3 leading-snug">{a.title}</h3>
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
                <a key={i} href={src} target="_blank" rel="noreferrer"
                  className="rounded-2xl overflow-hidden hover-lift block">
                  <img src={src} alt={`${title} quote ${i + 1}`} loading="lazy"
                    className="w-full h-full object-cover aspect-square" />
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
                    <div className="w-14 h-14 rounded-xl grid place-items-center text-white flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #F59E0B, #D4AF37)" }}>
                      <Mic size={22} />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-1">
                        Podcast Episode {i}
                      </div>
                      <h3 className="font-display font-bold text-gray-900">Sakshi Shree on {title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                    Deep-dive conversation exploring {title.toLowerCase()} — its roots, its patterns, and the path through.
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
      <section className="section-pad" style={{ background: "linear-gradient(135deg, #FFFBF0, #FFF3D0)" }}>
        <div className="container-page text-center">
          <SectionHeading
            center
            eyebrow="Take the Next Step"
            title="Ready for personal guidance?"
            subtitle="Book a personal session with Sakshi Shree — one hour that can change everything."
          />
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/book-session" className="btn-gold rounded-full px-8 py-3.5 font-semibold text-sm">
              Book Personal Session
            </Link>
            <Link to="/get-solutions-for" className="btn-outline-gold rounded-full px-8 py-3.5 font-semibold text-sm">
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
      style={active
        ? { background: "linear-gradient(135deg, #F59E0B, #D4AF37)", color: "#1a1000", boxShadow: "0 4px 12px rgba(212,175,55,0.35)" }
        : { color: "#6B7280", background: "transparent" }
      }
    >
      <Icon size={15} /> {children}
    </button>
  );
}
