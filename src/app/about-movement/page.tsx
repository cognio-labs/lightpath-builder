"use client";
import Link from "next/link";

import { PageHero, SectionHeading } from "@/components/PageHero";
import { ArrowRight } from "lucide-react";




const TIMELINE = [
  {
    date: "Dec 1999",
    title: "Movement Born",
    desc: "Science Divine Movement is founded to bring ancient wisdom to modern seekers.",
  },
  {
    date: "Feb 2004",
    title: "Jhuggi Jhopdi Shiksha Sewa Mission",
    desc: "Free education initiative for slum children begins its transformative work.",
  },
  {
    date: "Aug 2017",
    title: "Sakshi Dham International, Vrindavan",
    desc: "Foundation stone laid for the international retreat center.",
  },
  {
    date: "Jan 2024",
    title: "Teach and Learn Movement",
    desc: "Global expansion of meditation and education programs.",
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title={
          <>
            Science Divine{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #F59E0B, #D4AF37)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Movement
            </span>
          </>
        }
        subtitle="Sound Body · Sound Mind · Self Realization"
      />

      <section className="section-pad bg-white">
        <div className="container-page grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading
              eyebrow="Our Mission"
              title="A movement, not a moment."
              subtitle="For twenty-five years we have carried a single conviction: that inner transformation is the root of every outer change worth making. Through meditation, education, and service, we walk alongside millions on the journey home to themselves."
            />
            <Link
              href="/book-session"
              className="btn-gold rounded-full px-7 py-3.5 text-sm font-semibold inline-flex items-center gap-2"
            >
              Meet Sakshi Shree <ArrowRight size={15} />
            </Link>
          </div>
          <img
            src="https://sciencedivine.org/wp-content/uploads/2024/05/aboutsakshishree.jpg"
            alt="Sakshi Shree"
            className="rounded-3xl shadow-xl w-full object-cover"
            loading="lazy"
          />
        </div>
      </section>

      <section className="section-pad" style={{ background: "#FAFAFA" }}>
        <div className="container-page grid md:grid-cols-2 gap-12 items-center">
          <img
            src="https://sciencedivine.org/wp-content/uploads/2024/06/DJI_0169-scaled.jpg"
            alt="Vision"
            className="rounded-3xl shadow-xl w-full object-cover order-2 md:order-1"
            loading="lazy"
          />
          <div className="order-1 md:order-2">
            <SectionHeading
              eyebrow="Our Vision"
              title="A conscious humanity."
              subtitle="A world where every home has education, every heart has meditation, and every life knows its purpose. This is not utopia ,  it is a decision, made daily, by ordinary people committed to their own awakening and the awakening of others."
            />
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page">
          <SectionHeading center eyebrow="Our Journey" title="A 25-year timeline" />
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5" style={{ background: "linear-gradient(180deg, #F59E0B, #D4AF37)" }} />
            {TIMELINE.map((t, i) => (
              <div
                key={i}
                className={`relative mb-10 md:grid md:grid-cols-2 md:gap-8 ${i % 2 ? "md:text-left" : "md:text-right"}`}
              >
                <div className={`pl-12 md:pl-0 ${i % 2 ? "md:col-start-2" : ""}`}>
                  <div className="card-premium rounded-2xl p-6 inline-block max-w-md bg-white">
                    <div className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-1">
                      {t.date}
                    </div>
                    <h3 className="font-display text-xl font-bold text-gray-900 mb-2">{t.title}</h3>
                    <p className="text-sm text-gray-500">{t.desc}</p>
                  </div>
                </div>
                <div className="absolute left-2 md:left-1/2 top-4 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white shadow" style={{ background: "#D4AF37" }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
