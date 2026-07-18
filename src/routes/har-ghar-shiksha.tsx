import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { Counter } from "@/lib/useCounter";
import { Users, GraduationCap, Heart, Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/har-ghar-shiksha")({
  head: () => ({
    meta: [
      { title: "#Har Ghar Shiksha, Har Ghar Dhyan — Science Divine" },
      {
        name: "description",
        content:
          "Education and Meditation in every home. Sponsor a child, join the movement, transform a generation.",
      },
      { property: "og:title", content: "Har Ghar Shiksha, Har Ghar Dhyan" },
      {
        property: "og:image",
        content: "https://sciencedivine.org/wp-content/uploads/2025/02/mzlvjnkn-1-scaled.webp",
      },
      { property: "og:url", content: "/har-ghar-shiksha" },
    ],
    links: [{ rel: "canonical", href: "/har-ghar-shiksha" }],
  }),
  component: Page,
});

const STORIES = [
  { name: "Sneha Kumari", quote: "I learned to sit still. Everything changed after that." },
  { name: "Khushi Rajput", quote: "The teachers here believe in me. Now I believe in me too." },
  { name: "Akhilesh", quote: "Meditation helped me focus on studies. My marks doubled." },
];

const VOLS = [
  { name: "Ranjana Sharma", role: "Senior Volunteer" },
  { name: "Archana Nirali", role: "Program Coordinator" },
];

function Page() {
  return (
    <>
      <PageHero
        eyebrow="A National Movement"
        title="#Har Ghar Shiksha, Har Ghar Dhyan"
        subtitle="Education and Meditation in Every Home. Education without meditation is incomplete; meditation without purpose is unfulfilled."
      >
        <button className="btn-gold rounded-full px-7 py-3 font-semibold text-sm">
          Sponsor a Child
        </button>
        <button className="glass-dark rounded-full px-7 py-3 font-semibold text-sm text-white border border-white/20">
          Join the Movement
        </button>
      </PageHero>

      <section className="section-pad">
        <div className="container-page grid md:grid-cols-2 gap-12 items-center">
          <img
            src="https://sciencedivine.org/wp-content/uploads/2024/05/aboutsakshishree.jpg"
            alt="Sakshi Shree"
            className="rounded-3xl shadow-2xl w-full"
            loading="lazy"
          />
          <div>
            <SectionHeading
              eyebrow="The Vision"
              title="Two gifts every child deserves"
              subtitle="Education opens doors. Meditation opens the mind. Together they open a life. Our mission: bring both, to every home."
            />
          </div>
        </div>
      </section>

      <section className="ethereal-bg text-white section-pad">
        <div className="container-page grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <Stat val={<Counter to={50000} suffix="+" />} label="Lives Changed" />
          <Stat val={<Counter to={12000} suffix="+" />} label="Students Educated" />
          <Stat val={<Counter to={20} suffix="+" />} label="Years in Operation" />
          <Stat val="45%" label="Female Students" />
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <SectionHeading center eyebrow="How We Work" title="A four-step model" />
          <div className="grid md:grid-cols-4 gap-4">
            {[
              {
                icon: Users,
                title: "Community Outreach",
                desc: "We go where the need is deepest.",
              },
              {
                icon: Sparkles,
                title: "Meditation For All",
                desc: "Teachers, students, parents — all learn together.",
              },
              {
                icon: GraduationCap,
                title: "Educational Access",
                desc: "Free schooling, books, uniforms.",
              },
              {
                icon: Heart,
                title: "Creative Growth",
                desc: "Art, music, and expression — the whole child.",
              },
            ].map((s, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 text-center hover-lift">
                <div className="w-14 h-14 mx-auto rounded-2xl gradient-bg text-white grid place-items-center mb-4">
                  <s.icon size={22} />
                </div>
                <h3 className="font-display font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-secondary/40">
        <div className="container-page">
          <SectionHeading center eyebrow="Volunteers" title="The hands that carry this work" />
          <div className="grid sm:grid-cols-2 max-w-2xl mx-auto gap-6">
            {VOLS.map((v) => (
              <div key={v.name} className="glass-card rounded-2xl p-6 text-center">
                <div className="w-16 h-16 mx-auto rounded-full gradient-bg text-white text-2xl font-bold grid place-items-center mb-3">
                  {v.name[0]}
                </div>
                <div className="font-display font-bold">{v.name}</div>
                <div className="text-xs text-muted-foreground">{v.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <SectionHeading center eyebrow="Student Stories" title="In their own words" />
          <div className="grid md:grid-cols-3 gap-6">
            {STORIES.map((s) => (
              <div key={s.name} className="glass-card rounded-2xl p-6">
                <p className="font-display text-lg italic mb-4">"{s.quote}"</p>
                <div className="font-semibold text-sm">— {s.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad ethereal-bg text-white">
        <div className="container-page text-center max-w-2xl mx-auto">
          <SectionHeading
            center
            eyebrow="Take Action"
            title={<span className="text-white">Sponsor a child today</span>}
            subtitle="Every ₹1,000 provides a month of schooling. Every ₹10,000 provides a full year."
          />
          <button className="btn-gold rounded-full px-8 py-3 font-semibold inline-flex items-center gap-2">
            Donate Now <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </>
  );
}

function Stat({ val, label }: { val: React.ReactNode; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl md:text-5xl font-bold gradient-text mb-1">{val}</div>
      <div className="text-xs uppercase tracking-wider text-white/80">{label}</div>
    </div>
  );
}
