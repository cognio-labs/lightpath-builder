import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/get-started-with")({
  head: () => ({
    meta: [
      { title: "Get Started | Science Divine Foundation" },
      { name: "description", content: "Start your journey with Science Divine Foundation. Discover the right path for you." },
    ],
  }),
  component: Page,
});

const PATHS = [
  { title: "Book a Personal Session", desc: "One-on-one guidance directly from Sakshi Shree.", href: "/book-session", cta: "Book Now" },
  { title: "Explore Our Courses", desc: "Structured programs for deep transformation.", href: "/courses", cta: "View Courses" },
  { title: "Find a Solution", desc: "Targeted guidance for your specific challenge.", href: "/get-solutions-for", cta: "Find Solution" },
  { title: "Attend an Event", desc: "Join Sakshi Shree in person or online.", href: "/events", cta: "See Events" },
  { title: "Support Our Initiatives", desc: "Be part of our social mission.", href: "/initiatives", cta: "Learn More" },
  { title: "Contact Us", desc: "Have questions? We're here to help.", href: "/contact", cta: "Get in Touch" },
];

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Your Journey Begins Here"
        title="Get Started with Science Divine"
        subtitle="Choose the path that resonates with you. Every journey towards awakening is unique — find yours."
      />
      <section className="section-pad bg-white">
        <div className="container-page grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PATHS.map((p) => (
            <Link key={p.title} to={p.href} className="card-premium rounded-2xl p-6 group">
              <div className="w-8 h-0.5 mb-4 transition-all group-hover:w-14"
                style={{ background: "linear-gradient(90deg, #F59E0B, #D4AF37)" }} />
              <h3 className="font-display font-bold text-gray-900 text-lg mb-2">{p.title}</h3>
              <p className="text-sm text-gray-500 mb-5 leading-relaxed">{p.desc}</p>
              <span className="text-sm font-semibold text-amber-600 inline-flex items-center gap-1">
                {p.cta} <ArrowRight size={13} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
