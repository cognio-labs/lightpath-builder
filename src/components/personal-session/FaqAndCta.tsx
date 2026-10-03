"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { faqs } from "./content";
import { SectionHeading, cn } from "./ui";

export default function FaqAndCta() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="sd-paper pb-14 sm:pb-16">
      <div className="sd-shell">
        <div className="rounded-2xl border border-cream-300/70 bg-white p-6 shadow-ps-card">
          <SectionHeading as="h3" className="text-xl sm:text-2xl">
            Frequently Asked Questions
          </SectionHeading>

          <dl className="mt-4 divide-y divide-cream-300/80">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q}>
                  <dt>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 py-3.5 text-left transition-colors duration-200 hover:text-gold-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
                    >
                      <span className="text-[13px] font-medium text-ink-900">{f.q}</span>
                      <Plus
                        className={cn("h-4 w-4 shrink-0 text-gold-500 transition-transform duration-300", isOpen && "rotate-45")}
                        strokeWidth={2}
                      />
                    </button>
                  </dt>
                  <dd
                    className={cn(
                      "grid overflow-hidden transition-all duration-400 ease-out",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="min-h-0">
                      <p className="pb-4 pr-8 text-[12.5px] leading-relaxed text-ink-500">{f.a}</p>
                    </div>
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>

      </div>
    </section>
  );
}
