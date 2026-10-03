import Image from "next/image";
import { GraduationCap, HandHeart, Heart, MoveRight, Sprout } from "lucide-react";
import { brand, images, impactFlow } from "./content";
import { IconBadge, SectionHeading } from "./ui";

const ICONS = {
  growth: Sprout,
  contribution: HandHeart,
  education: GraduationCap,
} as const;

export default function ChildFuture() {
  return (
    <section id="impact" className="sd-paper py-14 sm:py-16">
      <div className="sd-shell grid items-stretch gap-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.35fr)_minmax(0,0.68fr)]">
        <div className="relative min-h-[220px] overflow-hidden rounded-2xl shadow-ps-card">
          <Image
            src={images.childEducation}
            alt={`Children learning through the ${brand.mission}`}
            fill
            sizes="(max-width: 1024px) 100vw, 320px"
            className="object-cover"
          />
          <span aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-gold-500/20" />
        </div>

        <div className="flex flex-col justify-center px-1 py-2 lg:px-4">
          <SectionHeading className="text-[1.5rem] leading-snug sm:text-[1.75rem]">
            Your Clarity Can Also
            <br />
            Create a Child&rsquo;s Future.
          </SectionHeading>

          <p className="mt-3.5 max-w-lg text-[13px] leading-relaxed text-ink-500">
            Your session doesn&rsquo;t just open the door to your Personal Session&mdash;it also supports the education of
            children through the <strong className="font-semibold text-ink-900">{brand.mission}</strong>.
          </p>

          <ol className="mt-7 flex flex-wrap items-start gap-x-2 gap-y-5 sm:gap-x-4">
            {impactFlow.map((s, i) => {
              const Icon = ICONS[s.icon];
              return (
                <li key={s.label} className="flex items-center gap-2 sm:gap-4">
                  <div className="w-24 text-center sm:w-28">
                    <IconBadge size="lg" className="mx-auto">
                      <Icon className="h-6 w-6" strokeWidth={1.2} />
                    </IconBadge>
                    <p className="mt-2.5 text-[11.5px] font-medium leading-snug text-ink-700">{s.label}</p>
                  </div>
                  {i < impactFlow.length - 1 && (
                    <MoveRight className="mt-[-1.4rem] h-5 w-5 shrink-0 text-gold-500" strokeWidth={1.4} aria-hidden />
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        <div className="sd-maroon relative isolate flex flex-col justify-center overflow-hidden rounded-2xl p-6 shadow-ps-card">
          <p className="font-display text-[1.3rem] leading-[1.35] text-cream-50">
            Together,
            <br />
            we create
            <br />
            transformation
            <br />
            within and
            <br />
            around.
          </p>
          <Heart className="mt-6 h-7 w-7 self-end text-gold-400/85" strokeWidth={1.2} aria-hidden />
        </div>
      </div>
    </section>
  );
}
