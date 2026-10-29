import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireAdmin } from "@/lib/admin-auth.server";
import { EventForm } from "../EventForm";

export default async function NewEventPage() {
  await requireAdmin();
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Link href="/admin/events" className="mb-1 inline-flex items-center gap-1 text-xs font-semibold text-[#7A6165] hover:text-[#521623]">
        <ArrowLeft size={13} /> All events
      </Link>
      <h1 className="mb-6 font-serif text-3xl font-bold text-[#521623]">Add Event</h1>
      <EventForm />
    </div>
  );
}
