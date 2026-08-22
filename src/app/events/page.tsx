"use client";

import { PageHero, SectionHeading } from "@/components/PageHero";
import { EVENTS } from "@/data/content";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";




const GALLERY = [
  "https://sciencedivine.org/wp-content/uploads/2025/02/mzlvjnkn-1-scaled.webp",
  "https://sciencedivine.org/wp-content/uploads/2024/05/aboutsakshishree.jpg",
  "https://sciencedivine.org/wp-content/uploads/2025/03/image-10.webp",
  "https://sciencedivine.org/wp-content/uploads/2023/06/young-img1.jpg",
  "https://sciencedivine.org/wp-content/uploads/2024/04/gospelforasia-RT18-03070.jpeg",
  "https://sciencedivine.org/wp-content/uploads/2024/03/Self-Conscious.jpeg",
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Gather Together"
        title={
          <>
            Find the Events for{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #F59E0B, #D4AF37)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Conscious Awakening
            </span>
          </>
        }
        subtitle="From intimate satsangs to mahotsavs ,  join the sangha in person or online."
      />

      <section className="section-pad bg-white">
        <div className="container-page">
          <SectionHeading eyebrow="Upcoming" title="What's coming up" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EVENTS.map((e, i) => (
              <div key={i} className="card-premium rounded-2xl p-6">
                <div className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4"
                  style={{
                    background: (e.status as string) === "Completed" ? "#F3F4F6" : "rgba(212,175,55,0.15)",
                    color: (e.status as string) === "Completed" ? "#6B7280" : "#92700A"
                  }}>
                  {e.status}
                </div>
                <h3 className="font-display font-bold text-gray-900 text-lg mb-3 leading-tight">{e.title}</h3>
                <div className="space-y-2 text-sm text-gray-500 mb-5">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-amber-500" /> {e.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-amber-500" /> {e.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-amber-500" /> {e.location}
                  </div>
                </div>
                <button className="btn-gold rounded-full px-6 py-2 text-sm font-semibold inline-flex items-center gap-1">
                  Register <ArrowRight size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: "#FAFAFA" }}>
        <div className="container-page">
          <SectionHeading center eyebrow="Gallery" title="Moments from past gatherings" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY.map((src) => (
              <div key={src} className="aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
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
