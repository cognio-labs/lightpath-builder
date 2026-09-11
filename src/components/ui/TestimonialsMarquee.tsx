"use client";

import React from "react";

const CARDS = [
  {
    name: "Sanaya Aggarwal",
    role: "Student & Practitioner",
    content:
      "Sakshi Shree's guidance changed how I see my anxiety. I finally feel completely free, grounded, and focused in life.",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Dr. Rajesh Verma",
    role: "Senior Cardiologist",
    content:
      "The scientific approach of Sakshi Sadhna transformed both my high-stress medical profession and my inner well-being.",
    avatar:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Priya Sharma",
    role: "Enterprise Architect",
    content:
      "Total participation in worldly life with complete inner peace — Sakshi Shree's teachings are pure gold for modern seekers.",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Amit Sharma",
    role: "Technology Consultant",
    content:
      "Every teaching of Sakshi Shree has a scientific basis. I use these practices daily to lead my team with calm and clarity.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Neha Kapoor",
    role: "Wellness Practitioner",
    content:
      "The Inner Cleansing Kriya revitalized my energy and brought lasting emotional healing into my everyday routine.",
    avatar:
      "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Arjun Mehta",
    role: "Business Professional",
    content:
      "Meditation techniques here provide unmatched mental poise and calm even during the most intense professional challenges.",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Riya Malhotra",
    role: "Creative Director",
    content:
      "Spiritual grounding cleared my mental clutter completely. My creativity now flows effortlessly and abundantly every day.",
    avatar:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Vivek Singh",
    role: "Senior Manager",
    content:
      "Practicing Mind Power Meditation helped me overcome burnout and discover the clarity I needed in both work and personal life.",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
  },
];

function Card({ card }: { card: (typeof CARDS)[0] }) {
  return (
    <div
      style={{
        width: "390px",
        flex: "0 0 auto",
        background: "linear-gradient(135deg,#ffffff 0%,#fffdf5 100%)",
        border: "1.5px solid rgba(212,175,55,0.38)",
        borderRadius: "24px",
        padding: "26px 24px",
        boxShadow: "0 8px 28px rgba(82,22,35,0.07)",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        minHeight: "220px",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img
            src={card.avatar}
            alt={card.name}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2.5px solid #D4AF37",
              flexShrink: 0,
            }}
          />
          <div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "15px",
                color: "#521623",
                lineHeight: 1.2,
              }}
            >
              {card.name}
            </div>
            <div style={{ fontSize: "12px", color: "#8B6914", fontWeight: 500, marginTop: "3px" }}>
              {card.role}
            </div>
          </div>
        </div>
        {/* Quote icon */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, opacity: 0.4 }}>
          <path
            d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"
            fill="#D4AF37"
          />
          <path
            d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
            fill="#D4AF37"
          />
        </svg>
      </div>

      {/* Quote */}
      <p
        style={{
          fontSize: "14px",
          color: "#374151",
          lineHeight: 1.7,
          fontStyle: "italic",
          fontFamily: "'Playfair Display', serif",
          flexGrow: 1,
          margin: 0,
        }}
      >
        &ldquo;{card.content}&rdquo;
      </p>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "12px",
          borderTop: "1px solid rgba(212,175,55,0.28)",
        }}
      >
        <div style={{ display: "flex", gap: "3px" }}>
          {[1, 2, 3, 4, 5].map((s) => (
            <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
        <span
          style={{
            fontSize: "10px",
            fontWeight: 700,
            color: "#92400E",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Verified Seeker
        </span>
      </div>
    </div>
  );
}

/**
 * TRUE INFINITE MARQUEE — Two-group structure.
 *
 *  Viewport  (overflow:hidden)
 *   └── Track (display:flex, width:max-content)  ← animates from 0 → -50%
 *        ├── Group A  (flex-shrink:0) — 8 cards
 *        └── Group B  (flex-shrink:0) — identical 8 cards  [aria-hidden]
 *
 * When Group A fully exits the left edge, Group B is already in
 * the exact starting position of Group A → seamless, zero-jump loop.
 */
export default function TestimonialsMarquee() {
  return (
    <div
      className="testimonials-marquee-viewport"
      style={{
        width: "100%",
        overflow: "hidden",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
      }}
    >
      {/* ── Keyframes injected once ── */}
      <style>{`
        @keyframes tmq-scroll {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        .tmq-track {
          display: flex;
          flex-wrap: nowrap;
          width: max-content;
          animation-name: tmq-scroll;
          animation-duration: 38s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-play-state: running;
        }
        .tmq-group {
          display: flex;
          flex-shrink: 0;
          gap: 24px;
          padding-right: 24px;
        }
      `}</style>

      {/* ── Track ── */}
      <div className="tmq-track">
        {/* Group A */}
        <div className="tmq-group">
          {CARDS.map((card, i) => (
            <Card key={`a-${i}`} card={card} />
          ))}
        </div>

        {/* Group B — exact duplicate for seamless loop */}
        <div className="tmq-group" aria-hidden="true">
          {CARDS.map((card, i) => (
            <Card key={`b-${i}`} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
}
