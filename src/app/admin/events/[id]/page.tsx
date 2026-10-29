import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { requireAdmin } from "@/lib/admin-auth.server";
import { getEventById } from "@/lib/events.server";
import { deleteEvent } from "../actions";
import { DeleteEventButton, EventForm } from "../EventForm";

export const dynamic = "force-dynamic";

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const event = /^[0-9a-f-]{36}$/i.test(id) ? await getEventById(id) : null;
  if (!event) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Link href="/admin/events" className="mb-1 inline-flex items-center gap-1 text-xs font-semibold text-[#7A6165] hover:text-[#521623]">
        <ArrowLeft size={13} /> All events
      </Link>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-3xl font-bold text-[#521623]">Edit Event</h1>
        <div className="flex items-center gap-2">
          {event.published && (
            <a href={`/events/${event.slug}`} target="_blank" className="flex items-center gap-1.5 rounded-full border border-[#E8D6B5] bg-white px-4 py-2 text-xs font-bold text-[#521623]">
              <ExternalLink size={13} /> View on site
            </a>
          )}
          <form action={deleteEvent}>
            <input type="hidden" name="id" value={event.id} />
            <DeleteEventButton />
          </form>
        </div>
      </div>
      <EventForm event={event} />
    </div>
  );
}
