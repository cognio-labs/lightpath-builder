import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { YouTubeThumb } from "@/components/YouTubeEmbed";
import { Counter } from "@/lib/useCounter";
import { COURSES, EVENTS, TESTIMONIALS, TESTIMONIAL_VIDEOS, SOCIALS } from "@/data/content";
import { Sparkles, Brain, Sunrise, Calendar, MapPin, Clock, ArrowRight, Smartphone } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Science Divine Foundation — Sound Body, Sound Mind, Self Realization" },
      { name: "description", content: "Silence isn't empty, it's full of answers. Discover the science of joyful living with enlightened master Sakshi Shree." },
      { property: "og:title", content: "Science Divine Foundation" },
      { property: "og:description", content: "Discover the science of joyful living with Sakshi Shree." },
      { property: "og:url", content: "/" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <PageHero
        eyebrow="Sound Body · Sound Mind · Self Realization"
        title={<>Silence isn't empty,<br /><span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, oklch(0.85 0.16 75), oklch(0.95 0.12 75))" }}>it's full of answers.</span></>}
        subtitle="Discover the science of joyful living with Sakshi Shree — a 40-year journey shared with 5 million+ seekers worldwide."
      >
        <Link to="/courses" className="btn-gold rounded-full px-7 py-3 font-semibold text-sm">Explore Courses</Link>
        <Link to="/book-session" className="glass-dark rounded-full px-7 py-3 font-semibold text-sm text-white border border-white/20">Book a Session</Link>
      </PageHero>

      {/* Mission */}
      <section className="section-pad">
        <div className="container-page">
          <SectionHeading center eyebrow="Our Mission" title="Three pillars, one awakening" subtitle="Ancient wisdom made practical for the modern seeker." />
          <div className="grid md:grid-cols-3 gap-6">
            <MissionCard icon={Sunrise} title="Sound Body" desc="Physical vitality through yoga, breath, and conscious movement. Your body is the temple of transformation." accent="oklch(0.78 0.16 75)" />
            <MissionCard icon={Brain} title="Sound Mind" desc="Mental clarity through meditation and mindfulness. Rise above the noise; find the signal within." accent="oklch(0.72 0.13 190)" />
            <MissionCard icon={Sparkles} title="Self Realization" desc="Spiritual awakening under Sakshi Shree's direct guidance. Not belief — direct knowing." accent="oklch(0.62 0.22 300)" />
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="section-pad bg-secondary/40">
        <div className="container-page">
          <SectionHeading eyebrow="Featured Courses" title="Transformative journeys, curated." subtitle="Four foundational programs that thousands have used to reshape their inner life." />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COURSES.map(c => (
              <Link key={c.slug} to={`/${c.slug}` as string} className="glass-card rounded-2xl overflow-hidden hover-lift group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={c.image} alt={c.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <div className="text-[10px] font-bold uppercase tracking-widest gradient-text mb-2">{c.level} · {c.duration}</div>
                  <h3 className="font-display font-bold text-lg mb-2">{c.title}</h3>
                  <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{c.description}</p>
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="font-display text-2xl font-bold text-primary">₹{c.price}</span>
                      <span className="text-xs text-muted-foreground line-through ml-2">₹{c.originalPrice.toLocaleString()}</span>
                    </div>
                    <ArrowRight size={18} className="text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section-pad">
        <div className="container-page">
          <SectionHeading eyebrow="Coming Up" title="Upcoming events & retreats" subtitle="Gather in person or online. Every event is designed to shift something." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EVENTS.slice(0, 6).map((e, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 hover-lift">
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-3">{e.status}</div>
                <h3 className="font-display font-bold text-lg mb-3 leading-tight">{e.title}</h3>
                <div className="space-y-1.5 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2"><Calendar size={14} /> {e.date}</div>
                  <div className="flex items-center gap-2"><Clock size={14} /> {e.time}</div>
                  <div className="flex items-center gap-2"><MapPin size={14} /> {e.location}</div>
                </div>
                <Link to="/events" className="text-sm font-semibold text-primary hover:underline">Register →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-pad ethereal-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ background: "var(--gradient-radial-glow)" }} />
        <div className="container-page relative">
          <SectionHeading center eyebrow="Impact" title={<span className="text-white">A movement, measured.</span>} />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <StatCard value={<Counter to={5000000} suffix="+" />} label="Lives Impacted" />
            <StatCard value={<Counter to={1000} suffix="+" />} label="Meditation Events" />
            <StatCard value={<Counter to={10000} suffix="+" />} label="Students Educated" />
            <StatCard value="9/10" label="Experience Inner Peace" />
            <StatCard value={<Counter to={40} suffix="+" />} label="Years of Guidance" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-pad">
        <div className="container-page">
          <SectionHeading eyebrow="Voices" title="Real people. Real shifts." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {TESTIMONIALS.slice(0, 3).map(t => (
              <div key={t.name} className="glass-card rounded-2xl p-6">
                <p className="font-display text-lg italic leading-snug mb-4">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TESTIMONIAL_VIDEOS.slice(0, 4).map(v => <YouTubeThumb key={v.id} id={v.id} title={v.title} />)}
          </div>
          <div className="text-center mt-8">
            <Link to="/testimonials" className="btn-outline-glow rounded-full px-6 py-3 font-semibold text-sm inline-flex items-center gap-2">See All Testimonials <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* App CTA */}
      <section className="section-pad">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl ethereal-bg text-white p-10 md:p-16">
            <div className="absolute -top-10 -right-10 w-80 h-80 rounded-full bg-gold/20 blur-3xl" />
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 glass-dark rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-4">
                  <Smartphone size={14} /> Available on Play Store
                </div>
                <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-4">Carry your practice, everywhere.</h2>
                <p className="text-white/85 mb-6">Guided meditations, live events, courses, and a global community — in your pocket.</p>
                <a href={SOCIALS.playstore} target="_blank" rel="noreferrer" className="inline-block">
                  <img src="https://sciencedivine.org/wp-content/uploads/2023/08/image-16.png" alt="Get it on Google Play" className="h-14" />
                </a>
              </div>
              <ul className="space-y-3 text-sm">
                {["Global sadhak community", "Live event streaming", "Full course library", "Daily guided meditations"].map(f => (
                  <li key={f} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-white/20 grid place-items-center text-xs">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function MissionCard({ icon: Icon, title, desc, accent }: { icon: React.ComponentType<{ size?: number }>; title: string; desc: string; accent: string }) {
  return (
    <div className="glass-card rounded-2xl p-8 hover-lift relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-30" style={{ background: accent }} />
      <div className="relative">
        <div className="w-14 h-14 rounded-2xl grid place-items-center mb-5 text-white" style={{ background: accent }}>
          <Icon size={24} />
        </div>
        <h3 className="font-display text-2xl font-bold mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function StatCard({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-3xl md:text-5xl font-bold mb-2 gradient-text">{value}</div>
      <div className="text-xs md:text-sm text-white/80 uppercase tracking-wider">{label}</div>
    </div>
  );
}
