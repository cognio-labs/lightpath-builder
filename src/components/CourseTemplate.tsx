import { PageHero, SectionHeading } from "@/components/PageHero";
import { YouTubeThumb } from "@/components/YouTubeEmbed";
import { TESTIMONIAL_VIDEOS, type COURSES } from "@/data/content";
import { Check, Clock, Users } from "lucide-react";

type Course = typeof COURSES[number];

export function CourseTemplate({ course, forWhom, modules }: { course: Course; forWhom: string[]; modules: { title: string; desc: string }[] }) {
  return (
    <>
      <PageHero eyebrow={`Course · ${course.level} · ${course.duration}`} title={course.title} subtitle={course.tagline}>
        <a href="#enroll" className="btn-gold rounded-full px-7 py-3 font-semibold text-sm">Buy Now — ₹{course.price}</a>
      </PageHero>

      <section className="section-pad">
        <div className="container-page grid lg:grid-cols-2 gap-12 items-center">
          <img src={course.image} alt={course.title} className="rounded-3xl shadow-2xl w-full object-cover" loading="lazy" />
          <div>
            <SectionHeading eyebrow="Overview" title={course.title} subtitle={course.description} />
            <div className="grid grid-cols-2 gap-3 mb-8">
              {course.features.map(f => (
                <div key={f} className="glass-card rounded-xl p-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full gradient-bg grid place-items-center text-white shrink-0"><Check size={16} /></span>
                  <span className="text-sm font-medium">{f}</span>
                </div>
              ))}
            </div>
            <div id="enroll" className="glass-card rounded-2xl p-6 flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest gradient-text mb-1">Limited Offer</div>
                <div className="font-display text-4xl font-bold">₹{course.price} <span className="text-base text-muted-foreground line-through ml-1">₹{course.originalPrice.toLocaleString()}</span></div>
              </div>
              <button className="btn-gradient rounded-full px-7 py-3 font-semibold text-sm">Enroll Now</button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-secondary/40">
        <div className="container-page">
          <SectionHeading center eyebrow="Who It's For" title="Perfect for" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {forWhom.map(w => (
              <div key={w} className="glass-card rounded-2xl p-5 text-center">
                <Users className="mx-auto text-primary mb-2" />
                <div className="font-semibold text-sm">{w}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <SectionHeading center eyebrow="Course Structure" title="What you'll learn" />
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {modules.map((m, i) => (
              <div key={i} className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-10 h-10 rounded-full gradient-bg text-white grid place-items-center font-bold">{i + 1}</span>
                  <h3 className="font-display font-bold text-lg">{m.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{m.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-8">
            <Clock size={14} /> {course.duration} total
          </div>
        </div>
      </section>

      <section className="ethereal-bg text-white section-pad">
        <div className="container-page">
          <SectionHeading center eyebrow="Testimonials" title={<span className="text-white">Graduates speak</span>} />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TESTIMONIAL_VIDEOS.slice(8, 12).map(v => <YouTubeThumb key={v.id} id={v.id} title={v.title} />)}
          </div>
        </div>
      </section>
    </>
  );
}
