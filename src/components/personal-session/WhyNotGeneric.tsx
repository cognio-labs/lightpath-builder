import { Compass, Eye, Sparkles, UserRound, X } from "lucide-react";
import { notThis, quote, whySakshiShree } from "./content";
import { IconBadge, Lotus, SectionHeading } from "./ui";

const ICONS = {
  sadhana: Sparkles,
  personal: UserRound,
  insight: Eye,
  direction: Compass,
} as const;

export default function WhyNotGeneric() {
  return (
    <section id="why" className="sd-paper pt-8 pb-14 sm:pb-16">
      <div className="sd-shell grid gap-4 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.1fr)_minmax(0,0.95fr)]">
        <div className="flex flex-col rounded-2xl border border-cream-300/70 bg-white p-6 shadow-ps-card">
          <SectionHeading as="h3" className="text-xl leading-snug">
            This Is Not a Generic Consultation.
          </SectionHeading>

          <ul className="mt-5 space-y-3.5">
            {notThis.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#d64545] text-white">
                  <X className="h-3 w-3" strokeWidth={3} />
                </span>
                <span className="text-[13px] text-ink-700">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex items-start gap-3 border-t border-cream-300/70 pt-5">
            <Lotus className="mt-0.5 h-6 w-8 shrink-0 text-gold-500" />
            <p className="text-[14px] font-semibold leading-snug text-ink-900">
              It is a <span className="text-gold-600">Personal Encounter</span>
              <br />
              with Your Life.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-cream-300/70 bg-white p-6 shadow-ps-card">
          <SectionHeading as="h3" className="text-xl">
            Why Sakshi Shree?
          </SectionHeading>

          <ul className="mt-5 space-y-4">
            {whySakshiShree.map((item) => {
              const Icon = ICONS[item.icon];
              return (
                <li key={item.title} className="group flex gap-3.5">
                  <IconBadge size="sm" tone="gold-soft" className="mt-0.5 group-hover:border-gold-500/60 group-hover:bg-gold-100">
                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                  </IconBadge>
                  <div className="min-w-0">
                    <p className="text-[13.5px] font-semibold leading-snug text-ink-900">{item.title}</p>
                    <p className="mt-1 text-[12px] leading-relaxed text-ink-500">{item.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <figure className="sd-maroon relative isolate flex flex-col justify-center overflow-hidden rounded-2xl p-7 shadow-ps-card">
          <span
            aria-hidden
            className="pointer-events-none absolute -right-6 -bottom-10 select-none font-display text-[11rem] leading-none text-gold-400/10"
          >
            &rdquo;
          </span>
          <span aria-hidden className="font-display text-6xl leading-none text-gold-400">
            &ldquo;
          </span>
          <blockquote className="mt-2 font-display text-[1.35rem] leading-[1.42] text-cream-50 text-balance">{quote.text}</blockquote>
          <figcaption className="mt-5 text-sm italic text-gold-300">{quote.author}</figcaption>
        </figure>
      </div>
    </section>
  );
}
