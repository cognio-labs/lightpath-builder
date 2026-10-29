import Link from "next/link";
import { ArrowLeft, CalendarDays, ExternalLink, MapPin, Pencil, Plus } from "lucide-react";
import { requireAdmin } from "@/lib/admin-auth.server";
import { listAllEvents } from "@/lib/events.server";
import { eventStatus, formatEventDate, formatEventTime, type SiteEvent } from "@/lib/events";

export const dynamic = "force-dynamic";

export default async function AdminEventsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; deleted?: string }>;
}) {
  await requireAdmin();
  const { saved, deleted } = await searchParams;

  let events: SiteEvent[] = [];
  let loadError = "";
  try {
    events = await listAllEvents();
  } catch (err) {
    loadError = err instanceof Error ? err.message : String(err);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/admin" className="mb-1 inline-flex items-center gap-1 text-xs font-semibold text-[#7A6165] hover:text-[#521623]">
            <ArrowLeft size={13} /> Donations Admin
          </Link>
          <h1 className="font-serif text-3xl font-bold text-[#521623]">Events</h1>
          <p className="text-xs text-[#7A6165]">Events added here appear on the <a href="/events" target="_blank" className="underline">Events page</a>. Status switches to Completed automatically after the event.</p>
        </div>
        <Link href="/admin/events/new" className="flex items-center gap-1.5 rounded-full bg-[#521623] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#3B0910]">
          <Plus size={16} /> Add Event
        </Link>
      </header>

      {saved && <p className="mb-4 rounded-xl bg-green-50 px-4 py-2.5 text-sm font-medium text-green-800">Event saved — it is now live on the Events page.</p>}
      {deleted && <p className="mb-4 rounded-xl bg-amber-50 px-4 py-2.5 text-sm font-medium text-amber-800">Event deleted.</p>}

      {loadError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-800">
          <p className="font-bold">Could not load events.</p>
          <p className="mt-1">{loadError}</p>
          <p className="mt-2">If the table doesn&apos;t exist yet, run <code>supabase/events.sql</code> in the Supabase SQL Editor.</p>
        </div>
      ) : events.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#E0B95A] bg-white p-12 text-center">
          <p className="text-sm text-[#7A6165]">No events added yet.</p>
          <Link href="/admin/events/new" className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#521623] px-5 py-2.5 text-sm font-bold text-white">
            <Plus size={16} /> Add your first event
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((e) => {
            const status = eventStatus(e);
            return (
              <article key={e.id} className="overflow-hidden rounded-2xl border border-[#E8D6B5] bg-white shadow-sm">
                <div className="relative aspect-[16/10] bg-[#FFFAF0]">
                  <img src={e.image_url} alt="" className="h-full w-full object-cover" />
                  <span className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${status === "Completed" ? "bg-slate-900/85 text-slate-100" : "bg-amber-400/95 text-slate-950"}`}>
                    {status}
                  </span>
                  {!e.published && (
                    <span className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-bold uppercase text-red-700">Hidden</span>
                  )}
                </div>
                <div className="space-y-2 p-4">
                  <h2 className="font-serif text-lg font-bold leading-tight text-[#521623]">{e.title}</h2>
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-[#521623]">
                    <CalendarDays size={13} /> {formatEventDate(e.starts_at)} | {formatEventTime(e.starts_at)}
                  </p>
                  {e.location && (
                    <p className="flex items-start gap-1.5 text-xs text-[#7A6165]">
                      <MapPin size={13} className="mt-0.5 shrink-0" /> <span className="line-clamp-1">{e.location}</span>
                    </p>
                  )}
                  <div className="flex gap-2 pt-2">
                    <Link href={`/admin/events/${e.id}`} className="flex items-center gap-1 rounded-full bg-[#521623] px-4 py-1.5 text-xs font-bold text-white">
                      <Pencil size={12} /> Edit
                    </Link>
                    {e.published && (
                      <a href={`/events/${e.slug}`} target="_blank" className="flex items-center gap-1 rounded-full border border-[#E8D6B5] px-4 py-1.5 text-xs font-bold text-[#521623]">
                        <ExternalLink size={12} /> View
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
