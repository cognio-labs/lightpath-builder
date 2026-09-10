"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { EVENTS } from "@/data/content";
import { Calendar, MapPin, Clock, ArrowRight, Sparkles, Image as ImageIcon, X } from "lucide-react";

const GALLERY_IMAGES = [
  {
    src: "https://sciencedivine.org/wp-content/uploads/2025/02/mzlvjnkn-1-scaled.webp",
    title: "Shiksha Sewa Celebration",
    category: "Youth & Education",
  },
  {
    src: "/guruji-namaste-new.png",
    title: "Divine Satsang & Blessings",
    category: "Sakshi Shree Satsang",
  },
  {
    src: "https://sciencedivine.org/wp-content/uploads/2024/05/aboutsakshishree.jpg",
    title: "Sanjeevani Dhyan Retreat",
    category: "Meditation Camp",
  },
  {
    src: "https://sciencedivine.org/wp-content/uploads/2025/03/image-10.webp",
    title: "Global Sangha Gathering",
    category: "Community",
  },
  {
    src: "/guruji-meditation-hd.png",
    title: "Inner Transformation Session",
    category: "Deep Meditation",
  },
  {
    src: "https://sciencedivine.org/wp-content/uploads/2023/06/young-img1.jpg",
    title: "Youth Awakening Workshop",
    category: "Consciousness",
  },
  {
    src: "https://sciencedivine.org/wp-content/uploads/2024/04/gospelforasia-RT18-03070.jpeg",
    title: "Swastha Sewa Health Drive",
    category: "Social Service",
  },
  {
    src: "https://sciencedivine.org/wp-content/uploads/2024/03/Self-Conscious.jpeg",
    title: "Conscious Living Discourse",
    category: "Wisdom Talk",
  },
  {
    src: "/about-self-realization.jpg",
    title: "Self Realization Dhyan",
    category: "Sadhna",
  },
];

export default function Page() {
  const [selectedImg, setSelectedImg] = useState<{ src: string; title: string } | null>(null);

  return (
    <>
      <PageHero
        eyebrow="Find the Events for Conscious Awakening"
        title={
          <>
            Upcoming{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #F59E0B, #D4AF37)",
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
            {EVENTS.map((e, i) => (
              <div
                key={i}
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
                    <img
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
                      <div className="flex items-start gap-2 text-gray-500">
                        <MapPin size={14} className="text-[#8B6914] shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{e.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <Link
                    href={e.link}
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

      {/* Events Gallery Section */}
      <section className="section-pad relative overflow-hidden bg-[#FAF7F2] border-t border-amber-200/60">
        <div className="container-page relative z-10">
          <SectionHeading
            center
            eyebrow="Events Gallery"
            title="Moments from Past Gatherings"
            subtitle="Glance through sacred moments of meditation, satsang, volunteer seva, and community joy."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
            {GALLERY_IMAGES.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImg({ src: img.src, title: img.title })}
                className="group relative aspect-[4/3] rounded-3xl overflow-hidden shadow-md border border-amber-200/70 cursor-pointer bg-white"
              >
                <img
                  src={img.src}
                  alt={img.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 mb-1">
                    {img.category}
                  </span>
                  <h4 className="font-serif text-lg font-bold drop-shadow-sm flex items-center justify-between">
                    <span>{img.title}</span>
                    <ImageIcon size={18} className="text-amber-300" />
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Lightbox */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImg(null)}
        >
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-amber-400/40 shadow-2xl p-2 animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-rose-600 transition-colors"
            >
              <X size={20} />
            </button>
            <img src={selectedImg.src} alt={selectedImg.title} className="w-full h-auto max-h-[75vh] object-contain rounded-2xl" />
            <div className="p-4 text-center text-white">
              <h3 className="font-serif text-xl font-bold text-amber-300">{selectedImg.title}</h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
