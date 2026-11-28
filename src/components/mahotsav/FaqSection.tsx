"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/mahotsav/event";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto mt-10 max-w-3xl space-y-3">
      {FAQ_ITEMS.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={item.question}
            className="overflow-hidden rounded-2xl border border-[#E8D8BC] bg-[#FFFCF6] transition-shadow hover:shadow-sm"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left sm:gap-4 sm:px-6 sm:py-4"
            >
              <span className="font-mahotsav-display text-lg font-bold leading-snug text-[#5E1216] sm:text-xl">
                {item.question}
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-[#9A6213] transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="border-t border-[#E8D8BC]/60 px-4 pb-4 pt-3 sm:px-6 sm:pb-5 text-sm leading-relaxed text-[#4A362A]">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
