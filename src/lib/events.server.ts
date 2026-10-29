// Server-only: reads/writes admin-managed events (site_events).
import type { SupabaseClient } from "@supabase/supabase-js";
import type { SiteEvent } from "@/lib/events";

export const EVENT_IMAGES_BUCKET = "event-images";

// The generated Database type doesn't include site_events, so it is queried
// through an untyped view of the shared service-role client.
export async function eventsDb(): Promise<SupabaseClient> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin as unknown as SupabaseClient;
}

const normalize = (row: Record<string, unknown>) =>
  ({ ...row, gallery: Array.isArray(row.gallery) ? row.gallery : [] }) as SiteEvent;

/** Published events for the public site. Never throws — the page still renders without them. */
export async function listPublishedEvents(): Promise<SiteEvent[]> {
  try {
    const db = await eventsDb();
    const { data, error } = await db
      .from("site_events")
      .select("*")
      .eq("published", true)
      .order("starts_at", { ascending: true });
    if (error) throw new Error(error.message);
    return (data ?? []).map(normalize);
  } catch (err) {
    console.error("[events] Could not load events:", err);
    return [];
  }
}

export async function getPublishedEvent(slug: string): Promise<SiteEvent | null> {
  try {
    const db = await eventsDb();
    const { data } = await db.from("site_events").select("*").eq("slug", slug).eq("published", true).maybeSingle();
    return data ? normalize(data) : null;
  } catch (err) {
    console.error("[events] Could not load event:", err);
    return null;
  }
}

/** Every event, newest first, for the admin list. */
export async function listAllEvents(): Promise<SiteEvent[]> {
  const db = await eventsDb();
  const { data, error } = await db.from("site_events").select("*").order("starts_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []).map(normalize);
}

export async function getEventById(id: string): Promise<SiteEvent | null> {
  const db = await eventsDb();
  const { data, error } = await db.from("site_events").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(error.message);
  return data ? normalize(data) : null;
}
