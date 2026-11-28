import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth.server";
import { renderPass } from "@/lib/mahotsav/pass";
import { getRegistration } from "@/lib/mahotsav/registrations.server";

export const maxDuration = 30;

// Admin-only: regenerates one attendee's Entry Pass (name + number of persons)
// and downloads it as a JPEG.

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: { "Cache-Control": "no-store" } });
  }

  const { id } = await params;
  if (!UUID_RE.test(id)) {
    return NextResponse.json({ error: "Invalid registration id." }, { status: 400 });
  }

  try {
    const row = await getRegistration(id);
    if (!row) return NextResponse.json({ error: "Registration not found." }, { status: 404 });

    const jpeg = await renderPass(row.full_name, row.attendees);
    const safeName = row.full_name.replace(/[^A-Za-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "Guest";
    return new Response(new Uint8Array(jpeg), {
      headers: {
        "Content-Type": "image/jpeg",
        "Content-Disposition": `attachment; filename="Entry-Pass-${safeName}.jpg"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Mahotsav pass download failed:", error);
    return NextResponse.json({ error: "Could not generate the pass." }, { status: 500 });
  }
}
