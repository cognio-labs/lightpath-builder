"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import type { GalleryItem } from "@/lib/mahotsav/event";

const PAGE_SIZE = 2;

export function GallerySection({ items }: { items: GalleryItem[] }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;
  const isOddLast = (index: number) =>
    index === items.length - 1 && items.length % 2 === 1;

  const step = useCallback(
    (dir: 1 | -1) =>
      setLightboxIndex((i) =>
        i === null ? i : (i + dir + items.length) % items.length
      ),
    [items.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex, step]);

  const active = lightboxIndex === null ? null : items[lightboxIndex];

  return (
    <div>
      {/* Framed photo grid — every card the same size */}
      <div className="mx-auto mt-9 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2">
        {visibleItems.map((item, index) => (
          <article
            key={item.id}
            className={`group rounded-[1.75rem] bg-gradient-to-br from-[#F2C97D] via-[#D49635] to-[#7A1B1F] p-[3px] shadow-[0_18px_40px_-18px_rgba(94,18,22,0.45)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_50px_-18px_rgba(94,18,22,0.55)] ${
              isOddLast(index)
                ? "sm:col-span-2 sm:mx-auto sm:w-[calc(50%-0.75rem)]"
                : ""
            }`}
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.5rem] bg-[#261812]">
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, 502px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F0E0A]/90 via-[#1F0E0A]/20 to-transparent" />

              <button
                type="button"
                onClick={() => setLightboxIndex(index)}
                className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#261812]/60 text-[#FDF8EF] backdrop-blur-sm transition-colors hover:bg-[#5E1216]"
                aria-label={`View ${item.title} larger`}
              >
                <Expand className="h-4 w-4" />
              </button>

              <div className="absolute inset-x-0 bottom-0 p-5 text-[#FDF8EF]">
                <span className="mb-2 block h-[2px] w-10 rounded-full bg-[#F2C97D]" aria-hidden="true" />
                <h3 className="font-mahotsav-display text-xl font-bold leading-tight sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs text-[#F6ECDA]/90 sm:text-sm">
                  {item.caption}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {hasMore && (
        <div className="mt-9 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
            className="inline-flex items-center gap-2 rounded-full border border-[#D49635] bg-[#FFFCF6] px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#5E1216] shadow-sm transition-all hover:bg-[#5E1216] hover:text-[#FDF8EF]"
          >
            Load More
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A0E0A]/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-3xl border border-[#D49635]/40 bg-[#261812] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#261812]/80 text-[#FDF8EF] hover:bg-[#5E1216]"
              aria-label="Close preview"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative aspect-[3/2] w-full bg-[#1A0E0A]">
              <Image
                src={active.src}
                alt={active.title}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-contain"
              />
              <button
                type="button"
                onClick={() => step(-1)}
                className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#261812]/70 text-[#FDF8EF] backdrop-blur-sm hover:bg-[#5E1216]"
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#261812]/70 text-[#FDF8EF] backdrop-blur-sm hover:bg-[#5E1216]"
                aria-label="Next photo"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="border-t border-[#D49635]/20 bg-[#261812] p-5 text-[#FDF8EF]">
              <h3 className="font-mahotsav-display text-2xl font-bold">{active.title}</h3>
              <p className="mt-1 text-sm text-[#E8D8BC]">{active.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
