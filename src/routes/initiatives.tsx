import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { GraduationCap, Brain, UtensilsCrossed, Building2 } from "lucide-react";

export const Route = createFileRoute("/initiatives")({
  head: () => ({
    meta: [
      { title: "Initiatives — Science Divine Foundation" },
      {
        name: "description",
        content:
          "SAVE HUMANITY — support Shiksha Sewa, Dhyan Sewa, Annapurna Sewa, Nirman Sewa. Every donation transforms lives.",
      },
      { property: "og:title", content: "Save Humanity — Science Divine Initiatives" },
      { property: "og:url", content: "/initiatives" },
    ],
    links: [{ rel: "canonical", href: "/initiatives" }],
  }),
  component: Page,
});

const INITIATIVES = [
  {
    icon: GraduationCap,
    title: "Shiksha Sewa",
    subtitle: "Education",
    achieved: 300000,
    goal: 1000000,
    image: "https://sciencedivine.org/wp-content/uploads/2025/03/image-10.webp",
    desc: "Free education, books, and mentorship for slum children — breaking the cycle of poverty through learning.",
    features: ["Free education", "Books & supplies", "Mentorship", "Confidence building"],
  },
  {
    icon: Brain,
    title: "Dhyan Sewa",
    subtitle: "Meditation",
    achieved: 500000,
    goal: 1000000,
    image: "https://sciencedivine.org/wp-content/uploads/2023/06/young-img1.jpg",
    desc: "Free meditation camps and stress-relief tools for communities that most need them.",
    features: ["Meditation camps", "Stress tools", "Self-realization", "Conscious society"],
  },
  {
    icon: UtensilsCrossed,
    title: "Annapurna Sewa",
    subtitle: "Food",
    achieved: 350000,
    goal: 1000000,
    image: "https://sciencedivine.org/wp-content/uploads/2024/04/gospelforasia-RT18-03070.jpeg",
    desc: "Nutritious meals delivered to the hungry — compassion in its most tangible form.",
    features: ["Daily meals", "Nutrition focus", "Compassion in action", "Restoring hope"],
  },
  {
    icon: Building2,
    title: "Nirman Sewa",
    subtitle: "Retreat Centers",
    achieved: 700000,
    goal: 1000000,
    image: "https://sciencedivine.org/wp-content/uploads/2024/03/Self-Conscious.jpeg",
    desc: "Building spiritual retreat centers so seekers everywhere have sanctuaries to deepen their practice.",
    features: ["Retreat centers", "Wellness programs", "Satsang halls", "Global reach"],
  },
];

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Save Humanity"
        title="Every donation transforms a life"
        subtitle="For Sound Body, Sound Mind, Self Realization — support the four pillars of the Science Divine movement."
      />

      <section className="section-pad">
        <div className="container-page grid md:grid-cols-2 gap-8">
          {INITIATIVES.map((init) => {
            const pct = Math.round((init.achieved / init.goal) * 100);
            return (
              <div key={init.title} className="glass-card rounded-3xl overflow-hidden hover-lift">
                <div className="aspect-[16/9] overflow-hidden relative">
                  <img
                    src={init.image}
                    alt={init.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 rounded-2xl gradient-bg text-white grid place-items-center">
                    <init.icon size={22} />
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs font-bold uppercase tracking-widest gradient-text mb-1">
                    {init.subtitle}
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-3">{init.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{init.desc}</p>
                  <ul className="grid grid-cols-2 gap-1.5 text-xs mb-5">
                    {init.features.map((f) => (
                      <li key={f} className="flex items-center gap-1.5">
                        • {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1.5 font-medium">
                      <span>₹{init.achieved.toLocaleString()} raised</span>
                      <span className="text-muted-foreground">
                        Goal ₹{init.goal.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div className="h-full gradient-bg" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 btn-gold rounded-full px-5 py-2.5 text-sm font-semibold">
                      Donate
                    </button>
                    <button className="flex-1 btn-outline-glow rounded-full px-5 py-2.5 text-sm font-semibold">
                      Know More
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
