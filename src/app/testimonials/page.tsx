"use client";

import { PageHero } from "@/components/PageHero";
import { YouTubeThumb } from "@/components/YouTubeEmbed";
import { TESTIMONIAL_VIDEOS } from "@/data/content";
import MarqueeTestimonials from "@/components/ui/marquee-card";

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Voices"
        title={
          <>
            Transformative{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #F59E0B, #D4AF37)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Experiences
            </span>
          </>
        }
        subtitle="Real people. Real transformations. In their own words."
      />
      <section className="py-12 bg-[#FAF7F2] border-b border-amber-200/60 overflow-hidden">
        <MarqueeTestimonials />
      </section>

      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIAL_VIDEOS.map((v) => (
              <YouTubeThumb key={v.id} id={v.id} title={v.title} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

