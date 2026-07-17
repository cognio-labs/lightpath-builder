import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { COURSES, TESTIMONIAL_VIDEOS } from "@/data/content";
import { YouTubeThumb } from "@/components/YouTubeEmbed";
import { Clock, Award, Check } from "lucide-react";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Courses — Science Divine Foundation" },
      { name: "description", content: "Transformative courses by Sakshi Shree — Design Your Destiny, Mind Power Meditation, Science of Joyful Living, Sanjeevani Kriya." },
      { property: "og:title", content: "Courses by Sakshi Shree" },
      { property: "og:url", content: "/courses" },
    ],
    links: [{ rel: "canonical", href: "/courses" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Learn With Us" title="Explore our transformative courses" subtitle="Four foundational programs. Thousands of graduates. One shared journey — toward yourself." />

      <section className="section-pad">
        <div className="container-page grid md:grid-cols-2 gap-8">
          {COURSES.map(c => (
            <div key={c.slug} className="glass-card rounded-3xl overflow-hidden hover-lift">
              <div className="aspect-[16/9] overflow-hidden">
                <img src={c.image} alt={c.title} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest mb-3">
                  <span className="gradient-text">{c.level}</span>
                  <span className="text-muted-foreground flex items-center gap-1"><Clock size={12} /> {c.duration}</span>
                </div>
                <h3 className="font-display text-2xl font-bold mb-2">{c.title}</h3>
                <p className="text-sm italic text-muted-foreground mb-4">{c.tagline}</p>
                <p className="text-sm text-muted-foreground mb-5">{c.description}</p>
                <ul className="grid grid-cols-2 gap-2 mb-6 text-xs">
                  {c.features.map(f => <li key={f} className="flex items-center gap-2"><Check size={14} className="text-primary" /> {f}</li>)}
                </ul>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-display text-3xl font-bold gradient-text">₹{c.price}</span>
                    <span className="text-sm text-muted-foreground line-through ml-2">₹{c.originalPrice.toLocaleString()}</span>
                  </div>
                  <Link to={`/${c.slug}` as string} className="btn-gradient rounded-full px-6 py-2.5 font-semibold text-sm">Start Course</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="ethereal-bg text-white section-pad">
        <div className="container-page text-center">
          <div className="inline-flex items-center gap-2 glass-dark rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest mb-5">
            <Award size={14} /> 10,000+ Lives Changed
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Hear from our graduates</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-10">Real stories from real people whose lives shifted after taking a Science Divine course.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TESTIMONIAL_VIDEOS.slice(4, 8).map(v => <YouTubeThumb key={v.id} id={v.id} title={v.title} />)}
          </div>
        </div>
      </section>
    </>
  );
}
