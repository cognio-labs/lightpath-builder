import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth.server";
import { EVENT_IMAGES_BUCKET, eventsDb } from "@/lib/events.server";

// POST multipart { file } → { url } of the image in the public event-images
// bucket. Used by the admin event form for the cover and gallery photos.

const MAX_BYTES = 8 * 1024 * 1024;
const TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

export async function POST(request: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Please sign in again." }, { status: 401 });

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "No image received." }, { status: 400 });
  const ext = TYPES[file.type];
  if (!ext) return NextResponse.json({ error: "Use a JPG, PNG, WebP or AVIF image." }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: "Image must be 8 MB or smaller." }, { status: 400 });

  const path = `${new Date().getFullYear()}/${crypto.randomUUID()}.${ext}`;
  const db = await eventsDb();
  const { error } = await db.storage
    .from(EVENT_IMAGES_BUCKET)
    .upload(path, Buffer.from(await file.arrayBuffer()), { contentType: file.type, cacheControl: "31536000" });
  if (error) {
    console.error("[events/upload]", error);
    return NextResponse.json(
      { error: "Upload failed. Make sure supabase/events.sql has been run (it creates the image bucket)." },
      { status: 500 },
    );
  }

  const { data } = db.storage.from(EVENT_IMAGES_BUCKET).getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl });
}
