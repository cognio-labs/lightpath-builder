import Image from "next/image";
import { brand, leaders } from "./content";
import Reveal from "./Reveal";
import { SectionHeading } from "./ui";

export default function Leaders() {
  return (
    <section id="leaders" className="sd-paper pb-14 sm:pb-16">
      <div className="sd-shell">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.24em] text-gold-600">In Company Of</p>
        <SectionHeading className="mt-2 text-center text-[1.55rem] sm:text-[2rem]">
          Trusted by <span className="sd-gold-text">World Leaders</span>
        </SectionHeading>

        <ul className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {leaders.map((l, i) => (
            <Reveal
              as="li"
              key={l.name}
              delay={i * 90}
              className="group relative overflow-hidden rounded-2xl border border-cream-300/70 bg-white shadow-ps-card hover:-translate-y-1 hover:border-gold-300/70 hover:shadow-[0_18px_40px_-18px_rgba(207,143,34,0.45)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-cream-200">
                <Image
                  src={l.image}
                  alt={`${l.name} with ${brand.shortName}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <span
                aria-hidden
                className="block h-0.5 origin-left scale-x-0 bg-gradient-to-r from-gold-300 to-gold-500 transition-transform duration-500 group-hover:scale-x-100"
              />
              <div className="px-4 py-3.5">
                <p className="font-display text-[15px] font-semibold leading-snug text-ink-900">{l.name}</p>
                <p className="mt-0.5 text-[12px] text-ink-500">{l.title}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
