import { BookOpen, Briefcase, Compass, Drama, RefreshCcw, Signpost, Sparkles } from "lucide-react";
import { claritySigns, type ClarityIconName } from "./content";
import Reveal from "./Reveal";
import { IconBadge, Lotus, SectionHeading } from "./ui";
import VideoCard from "./VideoCard";

const ICONS: Record<ClarityIconName, typeof Signpost> = {
  crossroads: Signpost,
  loop: RefreshCcw,
  career: Briefcase,
  mask: Drama,
  compass: Compass,
  chapter: BookOpen,
  change: Sparkles,
};

export default function ClaritySigns() {
  return (
    <section id="clarity" className="relative isolate overflow-hidden bg-cream-200 py-14 sm:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(70% 50% at 15% 0%, rgba(255,255,255,0.7) 0%, transparent 65%), radial-gradient(60% 60% at 95% 100%, rgba(207,143,34,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="sd-shell relative">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-12">
          <div>
            <SectionHeading className="max-w-lg text-[1.6rem] leading-snug sm:text-3xl">
              Maybe You&rsquo;re Not Looking for Advice.
              <br className="hidden sm:block" /> Maybe You Need <span className="sd-gold-text">Clarity.</span>
            </SectionHeading>

            <ul className="mt-9 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
              {claritySigns.map((sign, i) => {
                const Icon = ICONS[sign.icon];
                return (
                  <Reveal as="li" key={sign.label} delay={i * 70} className="group">
                    <IconBadge size="md" className="group-hover:border-gold-500/70 group-hover:bg-gold-50">
                      <Icon className="h-5 w-5" strokeWidth={1.3} />
                    </IconBadge>
                    <p className="mt-3 text-[12px] leading-[1.45] text-ink-700 transition-colors duration-300 group-hover:text-ink-900">
                      {sign.label}
                    </p>
                  </Reveal>
                );
              })}
            </ul>
          </div>

          <div className="lg:pt-1">
            <VideoCard />
          </div>
        </div>

        <div className="sd-hairline mt-10 flex items-center gap-3 rounded-xl bg-white/70 px-5 py-3.5">
          <Lotus className="h-5 w-7 shrink-0 text-gold-500" />
          <p className="text-[12px] leading-snug text-ink-700 sm:text-[13px]">
            If even one of these feels familiar, this <span className="font-semibold text-ink-900">Personal Session</span>{" "}
            may be for you.
          </p>
        </div>
      </div>
    </section>
  );
}
