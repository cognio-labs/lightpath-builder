"use client";

import { PageHero } from "@/components/PageHero";
import { YouTubeThumb } from "@/components/YouTubeEmbed";
import { TESTIMONIAL_VIDEOS } from "@/data/content";





export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Voices"
        title={
          <>
            Seeker{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #F59E0B, #D4AF37)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Testimonials
            </span>
          </>
        }
        subtitle="Real people. Real transformations. In their own words."
      />
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
