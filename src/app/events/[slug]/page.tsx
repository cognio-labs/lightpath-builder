import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import { getPublishedEvent } from "@/lib/events.server";
import { eventStatus, formatEventDate, formatEventTime } from "@/lib/events";

// Detail page for events added in /admin/events. Built-in events keep their own pages.
export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getPublishedEvent(slug);
  if (!event) return { title: "Event not found | Science Divine Foundation" };
  const description = (event.subtitle || event.description).slice(0, 160);
  return {
    title: `${event.title} | Science Divine Foundation`,
    description,
    alternates: { canonical: `/events/${event.slug}` },
    openGraph: { title: event.title, description, images: [{ url: event.image_url }] },
  };
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const event = await getPublishedEvent(slug);
  if (!event) notFound();

  const status = eventStatus(event);
  const upcoming = status !== "Completed";
  const endsOnAnotherDay = event.ends_at && formatEventDate(event.ends_at) !== formatEventDate(event.starts_at);

  return (
    <div className="bg-gradient-to-b from-[#FFFDF9] to-white">
      <section className="container-page pt-28 pb-12 sm:pt-32">
        <Link href="/events" className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#8B6914] hover:text-[#521623]">
          <ArrowLeft size={15} /> All events
        </Link>

        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="overflow-hidden rounded-3xl border border-[rgba(212,175,55,0.3)] shadow-[0_14px_36px_rgba(82,22,35,0.08)]">
            <img src={event.image_url} alt={event.title} className="aspect-[16/10] w-full object-cover" />
          </div>

          <div className="space-y-5">
            <span
              className={`inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
                upcoming ? "border border-amber-300 bg-amber-400/90 text-slate-950" : "border border-slate-700 bg-slate-900/85 text-slate-200"
              }`}
            >
              {status}
            </span>
            <div>
              <h1 className="font-serif text-3xl font-bold leading-tight text-[#521623] sm:text-4xl">{event.title}</h1>
              {event.subtitle && <p className="mt-2 text-lg text-[#8B6914]">{event.subtitle}</p>}
            </div>

            <div className="space-y-3 rounded-2xl border border-amber-100 bg-white p-5 text-sm">
              <p className="flex items-center gap-2.5 font-semibold text-[#521623]">
                <Calendar size={16} className="shrink-0 text-[#8B6914]" />
                {formatEventDate(event.starts_at)}
                {endsOnAnotherDay && <> – {formatEventDate(event.ends_at!)}</>}
              </p>
              <p className="flex items-center gap-2.5 font-semibold text-[#521623]">
                <Clock size={16} className="shrink-0 text-[#8B6914]" />
                {formatEventTime(event.starts_at)}
                {event.ends_at && <> – {formatEventTime(event.ends_at)}</>} IST
              </p>
              {event.location && (
                <p className="flex items-start gap-2.5 text-gray-600">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-[#8B6914]" />
                  {event.location}
                </p>
              )}
            </div>

            {upcoming && event.register_url ? (
              <a
                href={event.register_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#521623] px-7 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#3B0910]"
              >
                Register Now <ArrowRight size={16} />
              </a>
            ) : upcoming ? (
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-7 py-3.5 text-sm font-bold text-[#521623] transition hover:bg-[#521623] hover:text-white"
              >
                Contact us to join <ArrowRight size={16} />
              </Link>
            ) : (
              <p className="text-sm font-medium text-gray-500">This event has been completed. Thank you to everyone who joined us.</p>
            )}
          </div>
        </div>
      </section>

      {event.description && (
        <section className="container-page pb-12">
          <div className="max-w-3xl">
            <h2 className="mb-4 font-serif text-2xl font-bold text-[#521623]">About this event</h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-gray-700">
              {event.description.split(/\n{2,}/).map((para, i) => (
                <p key={i} className="whitespace-pre-line">{para}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {event.gallery.length > 0 && (
        <section className="container-page pb-16">
          <h2 className="mb-5 font-serif text-2xl font-bold text-[#521623]">{upcoming ? "Glimpses" : "Event Recap"}</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {event.gallery.map((url) => (
              <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="group overflow-hidden rounded-2xl border border-amber-100">
                <img src={url} alt="" loading="lazy" className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
