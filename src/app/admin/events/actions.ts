"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin-auth.server";
import { eventsDb } from "@/lib/events.server";
import { istToIso, slugify } from "@/lib/events";

export type SaveEventState = { error?: string };

const optionalText = z
  .string()
  .trim()
  .transform((v) => v || null);

const eventSchema = z.object({
  id: z.string().uuid().optional().or(z.literal("").transform(() => undefined)),
  title: z.string().trim().min(3, "Please enter a heading (at least 3 characters).").max(160),
  subtitle: optionalText.pipe(z.string().max(240).nullable()),
  description: z.string().trim().max(20000),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose the event date."),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Please choose the start time."),
  end_date: z.string().optional(),
  end_time: z.string().optional(),
  location: optionalText.pipe(z.string().max(300).nullable()),
  image_url: z.string().url("Please upload a cover image."),
  gallery: z.array(z.string().url()).max(40),
  register_url: optionalText.pipe(z.string().url("The registration link must start with https://").nullable()),
  published: z.boolean(),
});

async function uniqueSlug(base: string, ignoreId?: string) {
  const db = await eventsDb();
  let slug = base || "event";
  for (let n = 2; n < 50; n++) {
    const { data } = await db.from("site_events").select("id").eq("slug", slug).maybeSingle();
    if (!data || data.id === ignoreId) return slug;
    slug = `${base}-${n}`;
  }
  return `${base}-${Date.now()}`;
}

export async function saveEvent(_prev: SaveEventState, formData: FormData): Promise<SaveEventState> {
  await requireAdmin();

  let gallery: unknown = [];
  try {
    gallery = JSON.parse(String(formData.get("gallery") || "[]"));
  } catch {}

  const parsed = eventSchema.safeParse({
    id: formData.get("id") ?? undefined,
    title: formData.get("title") ?? "",
    subtitle: formData.get("subtitle") ?? "",
    description: formData.get("description") ?? "",
    date: formData.get("date") ?? "",
    time: formData.get("time") ?? "",
    end_date: formData.get("end_date") || undefined,
    end_time: formData.get("end_time") || undefined,
    location: formData.get("location") ?? "",
    image_url: formData.get("image_url") ?? "",
    gallery,
    register_url: formData.get("register_url") ?? "",
    published: formData.get("published") === "on",
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Please check the form." };
  const e = parsed.data;

  const startsAt = istToIso(e.date, e.time);
  const endsAt = e.end_date ? istToIso(e.end_date, e.end_time || "23:59") : null;
  if (endsAt && new Date(endsAt) < new Date(startsAt)) return { error: "The end time must be after the start." };

  const row = {
    title: e.title,
    subtitle: e.subtitle,
    description: e.description,
    starts_at: startsAt,
    ends_at: endsAt,
    location: e.location,
    image_url: e.image_url,
    gallery: e.gallery,
    register_url: e.register_url,
    published: e.published,
  };

  const db = await eventsDb();
  let slug: string;
  if (e.id) {
    // Keep the existing slug so shared links keep working.
    const { data, error } = await db.from("site_events").update(row).eq("id", e.id).select("slug").single();
    if (error) return { error: error.message };
    slug = data.slug;
  } else {
    slug = await uniqueSlug(slugify(`${e.title} ${e.date}`));
    const { error } = await db.from("site_events").insert({ ...row, slug });
    if (error) return { error: error.message };
  }

  revalidatePath("/events");
  revalidatePath(`/events/${slug}`);
  redirect("/admin/events?saved=1");
}

export async function deleteEvent(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const db = await eventsDb();
  const { data } = await db.from("site_events").delete().eq("id", id).select("slug").maybeSingle();
  revalidatePath("/events");
  if (data?.slug) revalidatePath(`/events/${data.slug}`);
  redirect("/admin/events?deleted=1");
}
