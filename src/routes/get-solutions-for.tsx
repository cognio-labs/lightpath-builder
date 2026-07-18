import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { SOLUTION_HUB_CARDS } from "@/data/content";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/get-solutions-for")({
  head: () => ({
    meta: [
      { title: "Solutions Hub — Find Your Path | Science Divine" },
      {
        name: "description",
        content:
          "Discover targeted spiritual and mental wellness solutions — stress, anxiety, depression, parenting, addictions, and more.",
      },
      { property: "og:title", content: "Solutions Hub — Science Divine" },
      { property: "og:url", content: "/get-solutions-for" },
    ],
    links: [{ rel: "canonical", href: "/get-solutions-for" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Solutions Hub"
        title="Find your path forward"
        subtitle="Whatever you're working through, ancient wisdom has a doorway. Choose your challenge — we'll meet you there."
      />

      <section className="section-pad">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="Choose Your Challenge"
            title="What can we help you with?"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SOLUTION_HUB_CARDS.map((card) => (
              <Link
                key={card.title}
                to={`/${card.slug}` as string}
                className="group glass-card rounded-2xl overflow-hidden hover-lift"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex items-center justify-between">
                  <h3 className="font-display font-bold text-xl">{card.title}</h3>
                  <ArrowRight className="text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
