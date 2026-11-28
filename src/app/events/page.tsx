import React from "react";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { EVENTS } from "@/data/content";
import { EVENT_CONFIG, PAGE_PATH } from "@/lib/mahotsav/event";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

type EventCard = {
  key: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  status: "Available Now" | "Completed";
  image: string;
  href: string;
};

// This page lists a single event: Shiksha Sewa Sankalp Mahotsav, which opens its
// own page. Date, time and venue come from that page so the two never disagree.
const mahotsav = EVENTS.find((e) => e.slug === "birthday-event")!;
const cards: EventCard[] = [
  {
    key: mahotsav.slug,
    title: EVENT_CONFIG.festivalName,
    description: mahotsav.description,
    date: EVENT_CONFIG.dateDisplay,
    time: EVENT_CONFIG.startTime,
    location: EVENT_CONFIG.venueLocation,
    status: "Available Now",
    image: mahotsav.image,
    href: PAGE_PATH,
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Find the Events for Conscious Awakening"
        title={
          <>
            Upcoming{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #521623, #D4AF37)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Events
            </span>
          </>
        }
        subtitle="Join us at enriching events, where we seamlessly blend learning with inspiration, to foster growth and build lasting connections."
      />

      {/* Events Grid Section */}
      <section className="section-pad bg-gradient-to-b from-[#FFFDF9] to-white">
        <div className="container-page">
          <div className="mb-10 text-center">
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#8B6914] block mb-1">
              DISCOVER OUR GATHERINGS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#521623]">
              Upcoming Events &amp; Retreats
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards.map((e) => (
              <div
                key={e.key}
                className="card-premium rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 group"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(212,175,55,0.3)",
                  boxShadow: "0 14px 36px rgba(82,22,35,0.06)",
                }}
              >
                <div>
                  {/* Event Thumbnail */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-amber-50">
                    <img loading="lazy" decoding="async"
                      src={e.image}
                      alt={e.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold tracking-wider shadow-sm uppercase ${
                          e.status === "Completed"
                            ? "bg-slate-900/85 text-slate-200 border border-slate-700"
                            : "bg-amber-400/90 text-slate-950 border border-amber-300"
                        }`}
                      >
                        {e.status}
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-6 space-y-3">
                    <h3 className="font-serif font-bold text-[#521623] text-xl leading-tight group-hover:text-[#B8860B] transition-colors">
                      {e.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
                      {e.description}
                    </p>

                    <div className="pt-3 space-y-2.5 text-xs font-medium text-gray-600 border-t border-amber-100">
                      <div className="flex items-center gap-2 text-[#521623] font-semibold">
                        <Calendar size={14} className="text-[#8B6914] shrink-0" />
                        <span>{e.date} &nbsp;|&nbsp; {e.time}</span>
                      </div>
                      {e.location && (
                        <div className="flex items-start gap-2 text-gray-500">
                          <MapPin size={14} className="text-[#8B6914] shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{e.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <Link
                    href={e.href}
                    className="w-full py-3 rounded-full border border-amber-300/80 bg-amber-50/80 hover:bg-[#521623] text-[#521623] hover:text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <span>{e.status === "Completed" ? "Event Recap" : "Learn More & Register"}</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
