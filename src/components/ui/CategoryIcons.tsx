"use client";

import React from "react";

export interface CategoryIconProps {
  className?: string;
  size?: number;
}

// 1. PARENTING: Pedestal stand held by hands with top heart/globe emblem (Exact match to Image 1)
export function ParentingIcon({ className = "", size = 32 }: CategoryIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      {/* Top heart emblem */}
      <path d="M12 4.2c-1.1-1.1-2.9-1.1-4 0-1.1 1.1-1.1 2.9 0 4L12 12.2l4-4c1.1-1.1 1.1-2.9 0-4-1.1-1.1-2.9-1.1-4 0z" />
      {/* Supporting hands pedestal */}
      <path d="M7 13.5c1.5 2 3.5 3 5 3s3.5-1 5-3v2c-1.5 2.5-3.5 3.5-5 3.5s-3.5-1-5-3.5v-2z" />
      {/* Base stand */}
      <rect x="9" y="19" width="6" height="2.5" rx="1" />
    </svg>
  );
}

// 2. BACK PAIN: Central spine stem with symmetrical horizontal vertebrae/rib nodes (Exact match to Image 1)
export function BackPainIcon({ className = "", size = 32 }: CategoryIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      {/* Spine vertical stem */}
      <rect x="11.25" y="2" width="1.5" height="20" rx="0.75" />
      {/* Vertebrae ribs */}
      <rect x="8" y="4" width="8" height="1.8" rx="0.9" />
      <rect x="7" y="7.5" width="10" height="1.8" rx="0.9" />
      <rect x="6" y="11" width="12" height="1.8" rx="0.9" />
      <rect x="7" y="14.5" width="10" height="1.8" rx="0.9" />
      <rect x="8" y="18" width="8" height="1.8" rx="0.9" />
    </svg>
  );
}

// 3. FATIGUE: Clean sharp lightning bolt symbol (Exact match to Image 1)
export function FatigueIcon({ className = "", size = 32 }: CategoryIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M13 2L4 13.5h7L9.5 22 20 10.5h-7L13 2z" />
    </svg>
  );
}

// 4. IMMUNITY: Shield outline with central plus sign (Exact match to Image 1)
export function ImmunityIcon({ className = "", size = 32 }: CategoryIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 2L4 5v6.5c0 5.25 3.4 10.15 8 11.5 4.6-1.35 8-6.25 8-11.5V5l-8-3zm0 2.2l6 2.25v5.55c0 4.2-2.7 8.1-6 9.3-3.3-1.2-6-5.1-6-9.3V6.45l6-2.25z" />
      <rect x="11" y="8" width="2" height="7" rx="0.5" />
      <rect x="8.5" y="10.5" width="7" height="2" rx="0.5" />
    </svg>
  );
}

// 5. ANXIETY: Warning siren beacon with top radiation flare rays (Exact match to Image 1)
export function AnxietyIcon({ className = "", size = 32 }: CategoryIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      {/* Radiation rays above */}
      <rect x="11.25" y="1" width="1.5" height="3" rx="0.75" />
      <rect x="5.5" y="3.5" width="1.5" height="3" rx="0.75" transform="rotate(-35 6.25 5)" />
      <rect x="17" y="3.5" width="1.5" height="3" rx="0.75" transform="rotate(35 17.75 5)" />
      {/* Siren beacon dome */}
      <path d="M7 13c0-2.8 2.2-5 5-5s5 2.2 5 5v5H7v-5z" />
      {/* Base platform */}
      <rect x="5" y="18.5" width="14" height="2.5" rx="1" />
    </svg>
  );
}

// 6. SLEEPING DISORDER: Sitting figure at desk with clock overhead (Exact match to Image 1)
export function SleepingDisorderIcon({ className = "", size = 32 }: CategoryIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      {/* Clock on top right */}
      <circle cx="16.5" cy="5" r="2.8" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M16.5 3.8v1.4l1 1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      {/* Sitting person head */}
      <circle cx="9" cy="8.5" r="2.2" />
      {/* Person torso */}
      <path d="M6 13c0-1.6 1.3-2.8 3-2.8s3 1.2 3 2.8v2H6v-2z" />
      {/* Desk surface */}
      <rect x="4" y="15" width="16" height="2" rx="1" />
      {/* Desk legs */}
      <rect x="5.5" y="17" width="1.5" height="4" rx="0.5" />
      <rect x="17" y="17" width="1.5" height="4" rx="0.5" />
    </svg>
  );
}

// 7. OVERTHINKING: Atomic / mushroom cloud explosion icon (Exact match to Image 1)
export function OverthinkingIcon({ className = "", size = 32 }: CategoryIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      {/* Fluffy cloud top */}
      <path d="M12 3c-2.5 0-4.6 1.5-5.5 3.6C5.4 6.8 4 8.2 4 10c0 2.2 1.8 4 4 4h8c2.2 0 4-1.8 4-4 0-1.8-1.4-3.2-2.5-3.4C16.6 4.5 14.5 3 12 3z" />
      {/* Mushroom stem */}
      <path d="M9.5 13.5h5l-1 5.5h-3l-1-5.5z" />
      {/* Base bar */}
      <rect x="8.5" y="19" width="7" height="2" rx="1" />
    </svg>
  );
}

// 8. RELATIONSHIPS: Twin figures under cloud/heart (Exact match to Image 1)
export function RelationshipsIcon({ className = "", size = 32 }: CategoryIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      {/* Cloud/Heart overhead */}
      <path d="M8 6.5c-.5 0-1 .2-1.4.6C6.1 7.5 6 8 6 8.5c0 1.5 2 3 6 5 4-2 6-3.5 6-5 0-.5-.1-1-.6-1.4-.4-.4-.9-.6-1.4-.6-1.2 0-2 .8-2 1.5C10 7.3 9.2 6.5 8 6.5z" />
      {/* Two heads */}
      <circle cx="8.5" cy="13.5" r="1.8" />
      <circle cx="15.5" cy="13.5" r="1.8" />
      {/* Torsos */}
      <path d="M5.5 20.5v-2c0-1.4 1.1-2.5 2.5-2.5h1c.6 0 1.2.2 1.6.6.4-.4 1-.6 1.6-.6h1c1.4 0 2.5 1.1 2.5 2.5v2h-10.2z" />
    </svg>
  );
}

// 9. DEPRESSION: Huddled figure sitting with vertical rain lines
export function DepressionIcon({ className = "", size = 32 }: CategoryIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <rect x="7" y="1" width="1.5" height="5" rx="0.75" />
      <rect x="12" y="0" width="1.5" height="6" rx="0.75" />
      <rect x="17" y="1" width="1.5" height="5" rx="0.75" />
      <circle cx="14.5" cy="11" r="3" />
      <path d="M14.5 15c-2.2 0-4 1.3-4.8 3-.8.2-1.8.1-2.4-.6-1-1.2-1.3-3.2-.5-4.8 1-2 3.2-3 5.4-2.8 1.8.2 3.3 1.3 3.8 3 .5 1.8 0 3.8-1.3 4.8l1.3 3.2h-2.5l-1.3-3.2z" />
    </svg>
  );
}

// 10. WELLNESS: Meditating lotus posture silhouette with sparkle stars
export function WellnessIcon({ className = "", size = 32 }: CategoryIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M5 6l.5 1 1 .5-1 .5-.5 1-.5-1-1-.5 1-.5zM19 5l.5 1 1 .5-1 .5-.5 1-.5-1-1-.5 1-.5z" />
      <circle cx="12" cy="8.5" r="2.5" />
      <path d="M12 12c-2 0-4.5 1.2-5.5 3-.5 1 0 2.5 1 2.5h9c1 0 1.5-1.5 1-2.5-1-1.8-3.5-3-5.5-3z" />
    </svg>
  );
}

// 11. STRESS: Pulse line into wave
export function StressIcon({ className = "", size = 32 }: CategoryIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      <path d="M7 12h2.5l1.5-3 2 6 1.5-3H17" />
    </svg>
  );
}

// 12. MENTAL HEALTH: Mindful head profile
export function MentalHealthIcon({ className = "", size = 32 }: CategoryIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2a5 5 0 0 0-5 5c0 1.9.9 3.6 2.3 4.6A8.01 8.01 0 0 0 4 19a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1 8.01 8.01 0 0 0-5.3-7.4A5 5 0 0 0 12 2z" />
      <circle cx="12" cy="7" r="2.5" />
    </svg>
  );
}

// 13. WEIGHT LOSS: Posture figure
export function WeightLossIcon({ className = "", size = 32 }: CategoryIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="4" r="2.2" />
      <path d="M12 6.2v7" />
      <path d="M12 8.5l-4.5 3" />
      <path d="M12 8.5l4.5 3" />
      <path d="M12 13.2l-3.5 7.8" />
      <path d="M12 13.2l3.5 7.8" />
    </svg>
  );
}

// 14. ANGER: Inner flame
export function AngerIcon({ className = "", size = 32 }: CategoryIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3.5z" />
    </svg>
  );
}

// 15. SLEEP: Crescent moon with star
export function SleepIcon({ className = "", size = 32 }: CategoryIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export const CATEGORY_ICON_MAP: Record<string, React.ComponentType<CategoryIconProps>> = {
  parenting: ParentingIcon,
  "back-pain": BackPainIcon,
  fatigue: FatigueIcon,
  immunity: ImmunityIcon,
  anxiety: AnxietyIcon,
  "sleeping-disorder": SleepingDisorderIcon,
  overthinking: OverthinkingIcon,
  relationships: RelationshipsIcon,
  relationship: RelationshipsIcon,
  depression: DepressionIcon,
  wellness: WellnessIcon,
  stress: StressIcon,
  "mental-health": MentalHealthIcon,
  "weight-loss": WeightLossIcon,
  anger: AngerIcon,
  sleep: SleepIcon,
};

