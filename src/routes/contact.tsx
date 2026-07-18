import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { Mail, Phone, MapPin } from "lucide-react";
import { submitForm } from "@/lib/admin.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Science Divine Foundation" },
      { name: "description", content: "Reach Science Divine Foundation. Ghaziabad HQ, Vrindavan retreat, podcast bookings, and volunteer inquiries." },
      { property: "og:title", content: "Contact Science Divine" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Get in Touch" title="We'd love to hear from you" subtitle="Questions, collaboration, volunteering, or booking Sakshi Shree — start here." />

      <section className="section-pad">
        <div className="container-page grid lg:grid-cols-2 gap-10">
          <form onSubmit={(e) => { e.preventDefault(); alert("Thank you — we'll be in touch."); }} className="glass-card rounded-3xl p-8 space-y-4">
            <SectionHeading eyebrow="Send Message" title="Contact Form" />
            <input required placeholder="Full Name" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <input required type="email" placeholder="Email Address" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <input placeholder="Phone" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <textarea required placeholder="Your message" rows={5} className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <button className="btn-gradient rounded-full px-6 py-3 font-semibold text-sm w-full">Submit</button>
          </form>

          <div className="space-y-6">
            <InfoCard title="Head Office" body={<><MapPin className="inline mr-2" size={16} />Siddh Sudarshan Sakshi Dham, 8 Avantika Rd, Chiranjiv Vihar, Ghaziabad, UP 201001</>} />
            <InfoCard title="Vrindavan Retreat" body={<><MapPin className="inline mr-2" size={16} />Sakshi Dham International, Omaxe Eternity, Chhatikara Road, Vrindavan, UP 281121</>} />
            <InfoCard title="Email & Phone" body={<div className="space-y-2"><div><Mail className="inline mr-2" size={16} /><a href="mailto:info@sciencedivine.org">info@sciencedivine.org</a></div><div><Phone className="inline mr-2" size={16} /><a href="tel:+919315944774">+91 93159 44774</a></div></div>} />
            <div className="grid sm:grid-cols-2 gap-4">
              <InfoCard title="Podcast Contact" body={<div className="text-sm space-y-1"><div>Arjun Lal — 9315944774</div><div>Tushar Chaudhary — 9540072189</div></div>} />
              <InfoCard title="College Events" body={<div className="text-sm">Archana Nirali — 9899612838</div>} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function InfoCard({ title, body }: { title: string; body: React.ReactNode }) {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="font-display font-bold text-lg mb-2 gradient-text">{title}</h3>
      <div className="text-sm text-muted-foreground">{body}</div>
    </div>
  );
}
