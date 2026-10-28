"use client";

import { useState } from "react";
import { Star } from "lucide-react";

export function FastVideoCard({
  id,
  title,
  lang,
  langBg = "rgba(75,16,27,0.1)",
  langColor = "#4B101B",
}: {
  id: string;
  title: string;
  lang?: string;
  langBg?: string;
  langColor?: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        border: "1px solid #E5E7EB",
        transition: "transform 0.25s, box-shadow 0.25s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-6px)";
        el.style.boxShadow = "0 20px 50px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
      }}
    >
      <div style={{ position: "relative", paddingTop: "56.25%", background: "#111827", overflow: "hidden" }}>
        {isPlaying ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            aria-label={`Play video: ${title}`}
            style={{
              position: "absolute",
              inset: 0,
              cursor: "pointer",
              border: 0,
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
              srcSet={`https://i.ytimg.com/vi/${id}/hqdefault.jpg 480w, https://i.ytimg.com/vi/${id}/maxresdefault.jpg 1280w`}
              sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) 50vw, 420px"
              alt={title}
              loading="lazy"
              decoding="async"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transition: "transform 0.4s ease",
              }}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.srcset = "";
                event.currentTarget.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1.04)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
                pointerEvents: "none",
              }}
            />
            {/* Play Button */}
            <div
              style={{
                position: "absolute",
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #4B101B 0%, #721C2C 100%)",
                border: "2px solid #D4AF37",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                transition: "transform 0.2s ease",
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderTop: "9px solid transparent",
                  borderBottom: "9px solid transparent",
                  borderLeft: "15px solid #FFFFFF",
                  marginLeft: "3px",
                }}
              />
            </div>
          </button>
        )}
      </div>
      <div style={{ padding: "20px" }}>
        {lang && (
          <span
            style={{
              background: langBg,
              color: langColor,
              fontSize: "11px",
              fontWeight: 700,
              padding: "3px 10px",
              borderRadius: "100px",
              display: "inline-block",
              marginBottom: "8px",
            }}
          >
            {lang}
          </span>
        )}
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "0.95rem",
            fontWeight: 700,
            color: "#4B101B",
            lineHeight: 1.5,
          }}
        >
          {title}
        </h3>
      </div>
    </div>
  );
}

export function FastTestimonialCard({
  id,
  name,
  role = "Science Divine Community Member",
}: {
  id: string;
  name: string;
  role?: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        border: "1px solid #E5E7EB",
        transition: "transform 0.25s, box-shadow 0.25s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-6px)";
        el.style.boxShadow = "0 20px 50px rgba(75,16,27,0.12)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
      }}
    >
      <div style={{ position: "relative", paddingTop: "56.25%", background: "#111827", overflow: "hidden" }}>
        {isPlaying ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
            title={name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            aria-label={`Play testimonial: ${name}`}
            style={{
              position: "absolute",
              inset: 0,
              cursor: "pointer",
              border: 0,
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
              srcSet={`https://i.ytimg.com/vi/${id}/hqdefault.jpg 480w, https://i.ytimg.com/vi/${id}/maxresdefault.jpg 1280w`}
              sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) 50vw, 420px"
              alt={name}
              loading="lazy"
              decoding="async"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transition: "transform 0.4s ease",
              }}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.srcset = "";
                event.currentTarget.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1.04)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
                pointerEvents: "none",
              }}
            />
            {/* Play Button */}
            <div
              style={{
                position: "absolute",
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #4B101B 0%, #721C2C 100%)",
                border: "2px solid #D4AF37",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                transition: "transform 0.2s ease",
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderTop: "9px solid transparent",
                  borderBottom: "9px solid transparent",
                  borderLeft: "15px solid #FFFFFF",
                  marginLeft: "3px",
                }}
              />
            </div>
          </button>
        )}
      </div>
      <div style={{ padding: "20px" }}>
        <div style={{ display: "flex", gap: "3px", marginBottom: "8px" }}>
          {Array.from({ length: 5 }).map((_, si) => (
            <Star key={si} size={14} fill="#D4AF37" style={{ color: "#D4AF37" }} />
          ))}
        </div>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700, color: "#4B101B" }}>
          {name}
        </h3>
        <p style={{ color: "#9CA3AF", fontSize: "0.8rem", marginTop: "4px" }}>{role}</p>
      </div>
    </div>
  );
}
