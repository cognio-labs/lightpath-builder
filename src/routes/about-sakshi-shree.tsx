import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { LEADERS } from "@/data/content";

export const Route = createFileRoute("/about-sakshi-shree")({
  head: () => ({
    meta: [
      { title: "About Sakshi Shree — Enlightened Spiritual Master" },
      {
        name: "description",
        content:
          "Sakshi Shree — enlightened master, former civil servant, founder of Science Divine Foundation, with 40+ years of experience.",
      },
      { property: "og:title", content: "About Sakshi Shree" },
      {
        property: "og:image",
        content: "https://sciencedivine.org/wp-content/uploads/2024/05/aboutsakshishree.jpg",
      },
      { property: "og:url", content: "/about-sakshi-shree" },
    ],
    links: [{ rel: "canonical", href: "/about-sakshi-shree" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Guru Profile"
        title="Sakshi Shree"
        subtitle="Enlightened master. Former civil servant. Founder of Science Divine Foundation. 40+ years of guiding seekers home."
      />

      <section className="section-pad">
        <div className="container-page grid md:grid-cols-5 gap-10 items-start">
          <img
            src="https://sciencedivine.org/wp-content/uploads/2024/05/aboutsakshishree.jpg"
            alt="Sakshi Shree"
            className="rounded-3xl shadow-2xl md:col-span-2 w-full object-cover"
            loading="lazy"
          />
          <div className="md:col-span-3 space-y-5">
            <SectionHeading eyebrow="Biography" title="A life given to service." />
            <p className="text-muted-foreground leading-relaxed">
              Sakshi Shree walked two worlds — the corridors of Indian civil service and the silent
              chambers of deep meditation. He resigned public office to give his life fully to the
              awakening of others. Under his guidance, more than 5 million people across India and
              the world have discovered peace, purpose, and self-knowledge.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              His teaching is a rare synthesis: the precision of ancient Vedic wisdom fused with the
              practical demands of modern life. Whether guiding a slum child through her first
              meditation or a head of state through a moment of decision, his method is the same —
              direct, wordless, transformative.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Through Science Divine Vidhyapeeth School he ensures free education for children whose
              families cannot afford it — because for him, awakening and service are inseparable.
            </p>
            <Link
              to="/book-session"
              className="btn-gradient rounded-full px-7 py-3 font-semibold text-sm inline-block"
            >
              Book a Personal Session
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad bg-secondary/40">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="In Company Of"
            title="Meetings with world leaders"
            subtitle="Sakshi Shree has shared his wisdom with heads of state, ministers, scholars, and public servants across continents."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LEADERS.map((l) => (
              <div key={l.name} className="glass-card rounded-2xl overflow-hidden hover-lift">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={l.image}
                    alt={l.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-base leading-tight mb-1">{l.name}</h3>
                  <p className="text-xs text-muted-foreground">{l.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
