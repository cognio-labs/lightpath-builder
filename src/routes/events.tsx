import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { EVENTS } from "@/data/content";
import { Calendar, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Science Divine Foundation" },
      {
        name: "description",
        content:
          "Upcoming events, retreats, and gatherings with Sakshi Shree. Meditation shivirs, satsangs, and mahotsavs.",
      },
      { property: "og:title", content: "Events with Sakshi Shree" },
      { property: "og:url", content: "/events" },
    ],
    links: [{ rel: "canonical", href: "/events" }],
  }),
  component: Page,
});

const GALLERY = [
  "https://sciencedivine.org/wp-content/uploads/2025/02/mzlvjnkn-1-scaled.webp",
  "https://sciencedivine.org/wp-content/uploads/2024/05/aboutsakshishree.jpg",
  "https://sciencedivine.org/wp-content/uploads/2025/03/image-10.webp",
  "https://sciencedivine.org/wp-content/uploads/2023/06/young-img1.jpg",
  "https://sciencedivine.org/wp-content/uploads/2024/04/gospelforasia-RT18-03070.jpeg",
  "https://sciencedivine.org/wp-content/uploads/2024/03/Self-Conscious.jpeg",
];

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Gather Together"
        title="Find the events for conscious awakening"
        subtitle="From intimate satsangs to mahotsavs — join the sangha in person or online."
      />

      <section className="section-pad">
        <div className="container-page">
          <SectionHeading eyebrow="Upcoming" title="What's coming up" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EVENTS.map((e, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 hover-lift">
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-4">
                  {e.status}
                </div>
                <h3 className="font-display font-bold text-lg mb-3 leading-tight">{e.title}</h3>
                <div className="space-y-1.5 text-sm text-muted-foreground mb-5">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} /> {e.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} /> {e.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} /> {e.location}
                  </div>
                </div>
                <button className="btn-gradient rounded-full px-5 py-2 text-sm font-semibold">
                  Register
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-secondary/40">
        <div className="container-page">
          <SectionHeading center eyebrow="Gallery" title="Moments from past gatherings" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY.map((src) => (
              <div key={src} className="aspect-[4/3] rounded-2xl overflow-hidden hover-lift">
                <img
                  src={src}
                  alt="Event moment"
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
