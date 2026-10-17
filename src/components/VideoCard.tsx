"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { Play, RotateCcw, Sparkles } from "lucide-react";

export interface VideoCardProps {
  id: string;
  title: string;
  category?: string;
  subtitle?: string;
  index: number;
  isPriority?: boolean;
  onOpenModal?: (id: string, title: string) => void;
}

export default function VideoCard({
  id,
  title,
  category = "Teachings",
  subtitle,
  index,
  isPriority = false,
  onOpenModal,
}: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [imgSrc, setImgSrc] = useState(`/images/video-posters/${id}.webp`);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(isPriority || index < 3);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Lazy loading observer for below-the-fold cards
  useEffect(() => {
    if (isPriority || index < 3) return; // Top row loads immediately

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "300px 0px" } // Pre-fetch slightly before entering viewport
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index, isPriority]);

  // Pause video if scrolled far out of view
  useEffect(() => {
    if (!isPlaying) return;

    const pauseObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && isPlaying) {
            setIsPlaying(false); // Pause and reclaim resources when scrolled away
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      pauseObserver.observe(cardRef.current);
    }

    return () => pauseObserver.disconnect();
  }, [isPlaying]);

  // Fallback chain if local poster fails
  const handleImageError = () => {
    if (imgSrc.startsWith("/images/video-posters/")) {
      setImgSrc(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`);
    } else if (imgSrc.includes("maxresdefault")) {
      setImgSrc(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`);
    } else {
      setHasError(true);
    }
  };

  // Preconnect to YouTube on hover for instant playback
  const handleMouseEnter = useCallback(() => {
    if (typeof document !== "undefined") {
      const link1 = document.createElement("link");
      link1.rel = "preconnect";
      link1.href = "https://www.youtube-nocookie.com";
      document.head.appendChild(link1);

      const link2 = document.createElement("link");
      link2.rel = "preconnect";
      link2.href = "https://www.google.com";
      document.head.appendChild(link2);
    }
  }, []);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onOpenModal) {
      onOpenModal(id, title);
    } else {
      setIsPlaying(true);
    }
  };

  return (
    <div
      ref={cardRef}
      className="vc-card group"
      onMouseEnter={handleMouseEnter}
      tabIndex={0}
      aria-label={`Video: ${title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsPlaying(true);
        }
      }}
    >
      <style>{`
        .vc-card {
          background: #FFFFFF;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          border: 1px solid #EAE5DE;
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          display: flex;
          flex-direction: column;
          height: 100%;
          outline: none;
        }
        .vc-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(82, 22, 35, 0.12), 0 0 0 1px rgba(212, 175, 55, 0.3);
        }
        .vc-card:focus-visible {
          outline: 2px solid #D4AF37;
          outline-offset: 3px;
        }

        /* 16:9 Aspect Ratio Media Container */
        .vc-media-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #1A120E;
          overflow: hidden;
        }

        /* Skeleton Shimmer Background (prevents white flash) */
        .vc-skeleton-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(110deg, #1A120E 8%, #2A1D16 18%, #1A120E 33%);
          background-size: 200% 100%;
          animation: vcShimmer 1.8s linear infinite;
        }
        @keyframes vcShimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Poster Image */
        .vc-poster-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease;
          opacity: 0;
        }
        .vc-poster-img.loaded {
          opacity: 1;
        }
        .vc-card:hover .vc-poster-img {
          transform: scale(1.04);
        }

        /* Vignette Overlays */
        .vc-vignette {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.15) 0%,
            transparent 40%,
            rgba(18, 10, 8, 0.72) 100%
          );
          pointer-events: none;
        }

        /* Luxury Play Button */
        .vc-play-btn {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #521623 0%, #350A12 100%);
          border: 2px solid rgba(212, 175, 55, 0.7);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45), 0 0 0 4px rgba(212, 175, 55, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          cursor: pointer;
          transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.25s ease,
                      background 0.25s ease;
          z-index: 3;
        }
        .vc-card:hover .vc-play-btn {
          transform: translate(-50%, -50%) scale(1.12);
          border-color: #E2C068;
          box-shadow: 0 12px 32px rgba(82, 22, 35, 0.5), 0 0 20px rgba(212, 175, 55, 0.5);
        }

        .vc-play-icon {
          margin-left: 3px;
          color: #F8D98C;
        }

        /* Top-right "Watch" badge */
        .vc-watch-pill {
          position: absolute;
          top: 14px;
          right: 14px;
          background: rgba(18, 10, 8, 0.75);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(212, 175, 55, 0.35);
          color: #F5E5C0;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 100px;
          display: flex;
          align-items: center;
          gap: 5px;
          z-index: 2;
        }

        /* Active Video Iframe */
        .vc-iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
          z-index: 5;
        }

        /* Reset Video Button */
        .vc-stop-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(0, 0, 0, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #FFF;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 6;
          transition: background 0.2s, transform 0.2s;
        }
        .vc-stop-btn:hover {
          background: rgba(82, 22, 35, 0.9);
          transform: scale(1.1);
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .vc-card, .vc-poster-img, .vc-play-btn {
            transition: none !important;
            transform: none !important;
          }
          .vc-skeleton-bg {
            animation: none !important;
          }
        }
      `}</style>

      {/* ── 16:9 Media Container ── */}
      <div className="vc-media-wrap">
        {/* Warm shimmer background (never empty white) */}
        {!imgLoaded && !isPlaying && <div className="vc-skeleton-bg" />}

        {/* Video Player or Poster */}
        {isPlaying ? (
          <>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="vc-iframe"
            />
            <button
              className="vc-stop-btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsPlaying(false);
              }}
              title="Close video preview"
              aria-label="Close video player"
            >
              <RotateCcw size={14} />
            </button>
          </>
        ) : (
          isVisible && (
            <>
              {/* Poster Image */}
              <img
                src={imgSrc}
                alt={title}
                loading={isPriority || index < 3 ? "eager" : "lazy"}
                fetchPriority={isPriority || index === 0 ? "high" : "auto"}
                className={`vc-poster-img ${imgLoaded ? "loaded" : ""}`}
                onLoad={() => setImgLoaded(true)}
                onError={handleImageError}
              />

              {/* Vignette Overlay */}
              <div className="vc-vignette" />

              {/* Badge */}
              <div className="vc-watch-pill">
                <Sparkles size={10} color="#D4AF37" />
                {category}
              </div>

              {/* Click-to-Play Trigger */}
              <button
                className="vc-play-btn"
                onClick={handlePlay}
                aria-label={`Play video: ${title}`}
                title="Play Video"
              >
                <Play size={22} fill="currentColor" className="vc-play-icon" />
              </button>
            </>
          )
        )}
      </div>

      {/* ── Card Content ── */}
      <div style={{ padding: "20px 22px 24px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <span
            style={{
              background: "rgba(212, 175, 55, 0.12)",
              color: "#521623",
              fontSize: "11px",
              fontWeight: 700,
              padding: "3px 10px",
              borderRadius: "100px",
              display: "inline-block",
              marginBottom: "10px",
              letterSpacing: "0.04em",
              border: "1px solid rgba(212, 175, 55, 0.25)",
            }}
          >
            {category}
          </span>
          <h3
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1rem",
              fontWeight: 700,
              color: "#1A130E",
              lineHeight: 1.5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </h3>
          {subtitle && (
            <p style={{ color: "#6B7280", fontSize: "0.85rem", marginTop: "8px", lineHeight: 1.6 }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Footer info: Sakshi Shree brand credential */}
        <div
          style={{
            marginTop: "16px",
            paddingTop: "12px",
            borderTop: "1px solid #F3EFEA",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#8C6E38",
            }}
          >
            Sakshi Shree
          </span>
          <span
            style={{
              fontSize: "11px",
              color: "#9CA3AF",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <Play size={10} fill="#B8860B" color="#B8860B" /> Click to watch
          </span>
        </div>
      </div>
    </div>
  );
}
