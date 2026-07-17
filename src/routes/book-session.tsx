import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { YouTubeThumb } from "@/components/YouTubeEmbed";
import { LEADERS, TESTIMONIAL_VIDEOS } from "@/data/content";
import { Sparkles, Compass, HeartHandshake, Check, X, ChevronDown } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/book-session")({
  head: () => ({
    meta: [
      { title: "Book Personal Session with Sakshi Shree" },
      { name: "description", content: "Unlock the life you truly desire. ₹6,100 donation. Sakshi Shree reads your past, present, and future like an open book." },
      { property: "og:title", content: "Book Personal Session — Sakshi Shree" },
      { property: "og:image", content: "https://sciencedivine.org/wp-content/uploads/2024/12/AAP_0178-1-1-1.webp" },
      { property: "og:url", content: "/book-session" },
    ],
    links: [{ rel: "canonical", href: "/book-session" }],
  }),
  component: Page,
});

const FAQS = [
  { q: "Is the session online or offline?", a: "Both options are available. You choose what works for you." },
  { q: "How is the session scheduled?", a: "Our team contacts you within 24 hours after payment to schedule." },
  { q: "What should I bring?", a: "Just your birth details (date, time, place) and an open mind." },
  { q: "How long is the session?", a: "Approximately 30 minutes of focused personal time with Sakshi Shree." },
  { q: "What can I expect?", a: "Personalized insights delivered without you needing to speak — the reading comes through energy." },
  { q: "How without me speaking?", a: "Sakshi Shree reads energy directly. Your presence is enough." },
  { q: "How should I prepare?", a: "A quiet space, an open mind, and any specific questions you'd like guidance on." },
  { q: "Can I ask about specific areas?", a: "Yes — career, relationships, health, spirituality, life direction — you're welcome to ask." },
  { q: "What payment methods?", a: "Cards, UPI, and net banking are all accepted." },
];

function Page() {
  return (
    <>
      <PageHero eyebrow="Personal Session · ₹6,100 Donation" title="Unlock the life you truly desire" subtitle="Sakshi Shree reads your past, present, and future like an open book. Your contribution supports the Jhuggi Jhopdi Shiksha Sewa Mission — free education for slum children.">
        <a href="#book" className="btn-gold rounded-full px-8 py-3 font-semibold">Reserve Your Session</a>
      </PageHero>

      <section className="section-pad">
        <div className="container-page grid md:grid-cols-3 gap-6">
          {[
            { icon: Sparkles, title: "Instant Life Reading & Clarity", desc: "See where you are and where you're going — with unprecedented precision." },
            { icon: Compass, title: "Transformative Solutions", desc: "Specific remedies for specific patterns. Not generic advice." },
            { icon: HeartHandshake, title: "Personalized Spiritual Guidance", desc: "A tailored practice you can actually maintain and that actually works." },
          ].map(f => (
            <div key={f.title} className="glass-card rounded-2xl p-6 text-center hover-lift">
              <div className="w-14 h-14 mx-auto rounded-2xl gradient-bg text-white grid place-items-center mb-4"><f.icon /></div>
              <h3 className="font-display font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad bg-secondary/40">
        <div className="container-page grid md:grid-cols-2 gap-12 items-center">
          <img src="https://sciencedivine.org/wp-content/uploads/2024/12/AAP_0044-1.webp.bv_resized_desktop.webp.bv_.webp" alt="Sakshi Shree" className="rounded-3xl shadow-2xl w-full" loading="lazy" />
          <div>
            <SectionHeading eyebrow="Why Sakshi Shree" title="The Sakshi Shree difference" />
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-3"></th>
                  <th className="py-3 gradient-text font-bold">Sakshi Shree</th>
                  <th className="py-3 text-muted-foreground">Generic Astrology</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  ["Experience", "40 years of sadhana", "Limited knowledge"],
                  ["Reading", "Personalized, direct", "General horoscopes"],
                  ["Remedies", "Specific, actionable", "Vague advice"],
                  ["Practice", "Tailored to you", "One-size-fits-all"],
                  ["Support", "Ongoing guidance", "No follow-up"],
                ].map(([k, a, b]) => (
                  <tr key={k}>
                    <td className="py-3 font-medium">{k}</td>
                    <td className="py-3"><Check size={16} className="inline text-primary mr-1" />{a}</td>
                    <td className="py-3 text-muted-foreground"><X size={16} className="inline mr-1" />{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <SectionHeading center eyebrow="In Company Of" title="Trusted by world leaders" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LEADERS.map(l => (
              <div key={l.name} className="glass-card rounded-2xl overflow-hidden hover-lift">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={l.image} alt={l.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-4"><h3 className="font-display font-bold text-sm">{l.name}</h3><p className="text-xs text-muted-foreground">{l.title}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-secondary/40" id="book">
        <div className="container-page">
          <SectionHeading center eyebrow="How to Book" title="Three simple steps" />
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { n: 1, title: "Confirm Participation", desc: "₹6,100 donation to Jhuggi Jhopdi Shiksha Sewa Mission (80G tax-exempt)." },
              { n: 2, title: "Schedule the Meeting", desc: "Our team contacts you to arrange online or face-to-face session." },
              { n: 3, title: "Begin Transformation", desc: "Meet Sakshi Shree. Receive your reading. Return home changed." },
            ].map(s => (
              <div key={s.n} className="glass-card rounded-2xl p-6">
                <div className="w-14 h-14 rounded-full gradient-bg text-white grid place-items-center font-display text-2xl font-bold mb-4">{s.n}</div>
                <h3 className="font-display font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-6">Note: All donations qualify for tax exemption under Section 80G.</p>
        </div>
      </section>

      <section className="ethereal-bg text-white section-pad">
        <div className="container-page">
          <SectionHeading center eyebrow="Voices" title={<span className="text-white">Video testimonials</span>} />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TESTIMONIAL_VIDEOS.slice(0, 8).map(v => <YouTubeThumb key={v.id} id={v.id} title={v.title} />)}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page max-w-3xl mx-auto">
          <SectionHeading center eyebrow="FAQ" title="Common questions" />
          <div className="space-y-3">
            {FAQS.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      <section className="section-pad bg-secondary/40">
        <div className="container-page grid md:grid-cols-2 gap-10 items-start max-w-4xl mx-auto">
          <div>
            <SectionHeading eyebrow="Not sure yet?" title="Request a callback" subtitle="Our team will reach out with details and answer questions." />
            <div className="text-sm text-muted-foreground space-y-1">
              <div>📧 info@sciencedivine.org</div>
              <div>📞 +91 93159 44774</div>
            </div>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); alert("Thank you — we'll call soon."); }} className="glass-card rounded-2xl p-6 space-y-3">
            <input required placeholder="Name" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm" />
            <input required type="email" placeholder="Email" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm" />
            <input required placeholder="Phone" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm" />
            <button className="btn-gradient rounded-full px-6 py-3 font-semibold text-sm w-full">Request Callback</button>
          </form>
        </div>
      </section>
    </>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left font-semibold">
        <span>{q}</span>
        <ChevronDown className={`transition-transform shrink-0 ${open ? "rotate-180" : ""}`} size={18} />
      </button>
      {open && <div className="px-5 pb-5 text-sm text-muted-foreground">{a}</div>}
    </div>
  );
}
