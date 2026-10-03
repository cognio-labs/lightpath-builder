import { Eye, KeyRound, Route, UserRound } from "lucide-react";
import { sessionSteps } from "./content";
import Reveal from "./Reveal";
import { IconBadge, SectionHeading } from "./ui";

const ICONS = {
  present: UserRound,
  unlock: KeyRound,
  guidance: Eye,
  path: Route,
} as const;

export default function SessionFlow() {
  return (
    <section id="process" className="sd-paper pt-14 pb-4 sm:pt-16">
      <div className="sd-shell">
        <SectionHeading className="text-center text-[1.55rem] sm:text-[2rem]">
          What Happens in Your Personal Session?
        </SectionHeading>

        <ol className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sessionSteps.map((step, i) => {
            const Icon = ICONS[step.icon];
            return (
              <Reveal
                as="li"
                key={step.n}
                delay={i * 90}
                className="group relative overflow-hidden rounded-2xl border border-cream-300/70 bg-white p-5 shadow-ps-card hover:-translate-y-1 hover:border-gold-300/70 hover:shadow-[0_18px_40px_-18px_rgba(207,143,34,0.45)]"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-gold-300 to-gold-500 transition-transform duration-500 group-hover:scale-x-100"
                />
                <div className="flex items-start gap-3">
                  <IconBadge size="md" tone="gold-solid">
                    <Icon className="h-5 w-5" strokeWidth={1.4} />
                  </IconBadge>
                  <p className="pt-0.5">
                    <span className="block text-[11px] font-bold tracking-[0.14em] text-gold-500">
                      {step.n}
                    </span>
                    <span className="mt-1 block text-[15px] font-semibold leading-snug text-ink-900">
                      {step.title}
                    </span>
                  </p>
                </div>
                <p className="mt-4 text-[12.5px] leading-relaxed text-ink-500">
                  {step.body}
                </p>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
