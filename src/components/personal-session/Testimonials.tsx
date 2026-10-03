import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TestimonialMarquee } from "@/components/marquee";
import { YouTubeThumb } from "@/components/YouTubeEmbed";
import { MARQUEE_TESTIMONIALS, TESTIMONIAL_VIDEOS } from "@/data/content";
import { SectionHeading } from "./ui";

/**
 * Same testimonial marquee + video grid as the homepage. Rendered outside `.ps-root`
 * (see ./index.tsx) so the shared components look exactly as they do there.
 */
export default function Testimonials() {
  return (
    <section
      id="stories"
      className="relative overflow-hidden py-14 sm:py-16"
      style={{ background: "linear-gradient(135deg, #FFFDF9 0%, #FFF4E0 45%, #FFFBF2 100%)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -right-16 h-[300px] w-[300px] rounded-full sm:h-[420px] sm:w-[420px] lg:h-[550px] lg:w-[550px]"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.22) 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -left-16 h-[300px] w-[300px] rounded-full sm:h-[420px] sm:w-[420px] lg:h-[550px] lg:w-[550px]"
        style={{ background: "radial-gradient(circle, rgba(245,158,11,0.18) 0%, transparent 70%)" }}
      />

      <div className="container-page relative z-10">
        <SectionHeading className="mb-10 text-center text-[1.5rem] sm:text-[1.9rem]">
          What People Say After Their <span className="sd-gold-text">Personal Session</span>
        </SectionHeading>

        <div className="mb-14">
          <TestimonialMarquee testimonials={MARQUEE_TESTIMONIALS} />
        </div>

        <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {TESTIMONIAL_VIDEOS.slice(0, 6).map((v) => (
            <div
              key={v.id}
              className="overflow-hidden rounded-2xl border border-white/80 shadow-lg transition-transform duration-300 hover:-translate-y-1.5"
            >
              <YouTubeThumb id={v.id} title={v.title} />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/testimonials"
            className="btn-outline-gold inline-flex items-center gap-2 rounded-full bg-white/80 px-7 py-3 text-sm font-semibold shadow-md backdrop-blur-sm"
          >
            See All Testimonials <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
