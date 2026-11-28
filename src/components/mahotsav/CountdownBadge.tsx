"use client";

import { useEffect, useState } from "react";
import { EVENT_CONFIG } from "@/lib/mahotsav/event";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  isLiveOrPast: boolean;
}

function computeTimeLeft(targetIso: string): TimeLeft {
  const diff = new Date(targetIso).getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, isLiveOrPast: true };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  return { days, hours, minutes, isLiveOrPast: false };
}

export function CountdownBadge() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const update = () => setTimeLeft(computeTimeLeft(EVENT_CONFIG.isoStartDate));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-[#D49635]/40 bg-[#FFFCF6] px-4 py-1.5 text-xs font-semibold text-[#7A1B1F]">
        <span className="h-2 w-2 rounded-full bg-[#D49635]" />
        <span>{EVENT_CONFIG.dateDisplay} • Starting at {EVENT_CONFIG.startTime}</span>
      </div>
    );
  }

  if (timeLeft.isLiveOrPast) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-[#D49635]/50 bg-[#5E1216] px-4 py-1.5 text-xs font-semibold text-[#FDF8EF]">
        <span className="h-2 w-2 rounded-full bg-[#F2C97D] animate-pulse" />
        <span>Celebration Day • {EVENT_CONFIG.dateDisplay}</span>
      </div>
    );
  }

  return (
    <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-[#D49635]/45 bg-[#FFFCF6]/95 px-4 py-1.5 text-xs font-semibold text-[#5E1216] shadow-xs">
      <span className="h-2 w-2 rounded-full bg-[#D49635] animate-pulse" />
      <span>
        {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m until celebration
      </span>
    </div>
  );
}
