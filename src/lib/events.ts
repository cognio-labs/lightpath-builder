// Shared helpers for admin-managed events (site_events, supabase/events.sql).
// Dates are stored as UTC timestamps; the admin enters and visitors see IST.

export type SiteEvent = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string;
  starts_at: string;
  ends_at: string | null;
  location: string | null;
  image_url: string;
  gallery: string[];
  register_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type EventStatus = "Available Now" | "Completed";

const IST = "Asia/Kolkata";
const IST_OFFSET = "+05:30";

/** Completed once it has ended — at ends_at, or else at the end of its day (IST). */
export function eventStatus(event: Pick<SiteEvent, "starts_at" | "ends_at">, now = new Date()): EventStatus {
  const end = event.ends_at
    ? new Date(event.ends_at)
    : new Date(`${istDateInput(event.starts_at)}T23:59:59${IST_OFFSET}`);
  return now > end ? "Completed" : "Available Now";
}

const ordinal = (day: number) => {
  const tens = day % 100;
  if (tens >= 11 && tens <= 13) return `${day}th`;
  return `${day}${({ 1: "st", 2: "nd", 3: "rd" } as Record<number, string>)[day % 10] ?? "th"}`;
};

function istParts(iso: string) {
  const parts = new Intl.DateTimeFormat("en-IN", {
    timeZone: IST,
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(new Date(iso));
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return { year: get("year"), month: get("month"), day: Number(get("day")), hour: get("hour"), minute: get("minute"), period: get("dayPeriod").toUpperCase() };
}

/** "14th December 2025" — same style as the existing event cards. */
export function formatEventDate(iso: string) {
  const p = istParts(iso);
  return `${ordinal(p.day)} ${p.month} ${p.year}`;
}

/** "10:00 AM" (IST). */
export function formatEventTime(iso: string) {
  const p = istParts(iso);
  return `${p.hour}:${p.minute} ${p.period}`;
}

/** "2026-11-08" in IST, for <input type="date"> and day-end checks. */
export function istDateInput(iso: string) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: IST, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(iso));
}

/** "10:00" in IST (24h), for <input type="time">. */
export function istTimeInput(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { timeZone: IST, hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date(iso));
}

/** Admin form date + time (IST) → stored timestamp. */
export function istToIso(date: string, time: string) {
  return new Date(`${date}T${time || "00:00"}:00${IST_OFFSET}`).toISOString();
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .slice(0, 70)
    .replace(/-+$/g, "");
}
