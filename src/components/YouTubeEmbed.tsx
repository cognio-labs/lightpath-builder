"use client";

import Image from "next/image";
import { useState } from "react";

type PlayerProps = { id: string; title: string; className?: string };

function VideoPoster({ id, alt }: { id: string; alt: string }) {
  const [src, setSrc] = useState(`/images/video-posters/${id}.webp`);

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) 50vw, 420px"
      quality={85}
      loading="lazy"
      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      onError={() => {
        if (src.startsWith("/images/video-posters/")) {
          setSrc(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`);
        } else if (src.includes("maxresdefault")) {
          setSrc(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`);
        }
      }}
    />
  );
}

/** Loads YouTube only after an explicit play action. */
export function YouTubeEmbed({ id, title, className = "relative aspect-video rounded-xl shadow-lg" }: PlayerProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={`${className} overflow-hidden bg-[#170d10]`}>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 h-full w-full overflow-hidden bg-[#170d10] text-left"
        >
          <VideoPoster id={id} alt="" />
          <span className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
          <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-[#e2c068] bg-[#521623] text-white transition-transform group-hover:scale-110">
            <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-current" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="absolute inset-x-4 bottom-3 line-clamp-2 text-center text-sm font-semibold leading-snug text-white">{title}</span>
        </button>
      )}
    </div>
  );
}

export function YouTubeThumb({ id, title }: { id: string; title: string }) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${id}`}
      target="_blank"
      rel="noreferrer"
      className="group block relative aspect-video rounded-xl overflow-hidden bg-black shadow-lg hover-lift"
    >
      <VideoPoster id={id} alt={title} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-0 grid place-items-center">
        <div className="w-14 h-14 rounded-full bg-white/95 grid place-items-center group-hover:scale-110 transition-transform">
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-primary ml-1" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="text-white text-sm font-medium line-clamp-2">{title}</p>
      </div>
    </a>
  );
}

