"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";
import { brand, images, video } from "./content";

export default function VideoCard() {
  const [playing, setPlaying] = useState(false);
  const embed = video.embedUrl;

  const thumb = (
    <>
      {/* object-top keeps the name printed on the bottom of this photo out of frame */}
      <Image
        src={images.videoThumb}
        alt={embed ? "" : brand.teacher}
        width={900}
        height={900}
        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-maroon-950/35 via-transparent to-transparent" />
    </>
  );

  return (
    <div className="sd-hairline overflow-hidden rounded-2xl bg-white shadow-ps-card">
      <p className="border-b border-gold-300/40 px-5 py-3 text-center text-[13px] font-semibold tracking-wide text-ink-900">
        Before You Book, Hear From {brand.shortName}
      </p>

      <div className="p-3.5">
        <div className="group relative aspect-video overflow-hidden rounded-xl bg-cream-200">
          {playing && embed ? (
            <iframe
              src={`${embed}${embed.includes("?") ? "&" : "?"}autoplay=1`}
              title={`A message from ${brand.teacher}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : embed ? (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play the message from ${brand.teacher}`}
              className="absolute inset-0 h-full w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
            >
              {thumb}
              <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center">
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-gold-300/50"
                  style={{ animation: "sd-pulse-ring 2.4s ease-out infinite" }}
                />
                <span className="sd-gold-btn relative grid h-14 w-14 place-items-center rounded-full transition-transform duration-300 group-hover:scale-110">
                  <Play className="ml-0.5 h-5 w-5 fill-[#2a1a06] text-[#2a1a06]" strokeWidth={2} />
                </span>
              </span>
            </button>
          ) : (
            thumb
          )}
        </div>

        <p className="px-2 pt-4 pb-1 text-center text-[12px] leading-relaxed text-ink-500">
          A short message from {brand.teacher} about{" "}
          <strong className="font-semibold text-ink-900">Personal Sessions</strong> and how they can help you.
        </p>
      </div>
    </div>
  );
}
