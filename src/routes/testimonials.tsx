import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { YouTubeThumb } from "@/components/YouTubeEmbed";
import { TESTIMONIAL_VIDEOS } from "@/data/content";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — Science Divine" },
      { name: "description", content: "Video testimonials from seekers who met Sakshi Shree and transformed their lives." },
      { property: "og:title", content: "Testimonials" },
      { property: "og:url", content: "/testimonials" },
    ],
    links: [{ rel: "canonical", href: "/testimonials" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Voices" title="Testimonials" subtitle="Real people. Real transformations. In their own words." />
      <section className="section-pad">
        <div className="container-page">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIAL_VIDEOS.map(v => <YouTubeThumb key={v.id} id={v.id} title={v.title} />)}
          </div>
        </div>
      </section>
    </>
  ),
});
