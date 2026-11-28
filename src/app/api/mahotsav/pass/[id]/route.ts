import { NextResponse } from "next/server";
import { renderPass } from "@/lib/mahotsav/pass";
import { isValidPassSignature } from "@/lib/mahotsav/pass-link.server";
import { getRegistration } from "@/lib/mahotsav/registrations.server";

export const maxDuration = 30;

// Public, signed link to one Entry Pass image. This is the URL AiSensy hands to
// WhatsApp; it only works with the signature issued at registration time.

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sig = new URL(request.url).searchParams.get("sig") ?? "";

  if (!UUID_RE.test(id) || !isValidPassSignature(id, sig)) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  try {
    const row = await getRegistration(id);
    if (!row) return NextResponse.json({ error: "Not found." }, { status: 404 });

    const jpeg = await renderPass(row.full_name, row.attendees);
    const safeName = row.full_name.replace(/[^A-Za-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "Guest";
    return new Response(new Uint8Array(jpeg), {
      headers: {
        "Content-Type": "image/jpeg",
        "Content-Disposition": `inline; filename="Entry-Pass-${safeName}.jpg"`,
        "Cache-Control": "private, max-age=3600",
        "X-Robots-Tag": "noindex",
      },
    });
  } catch (error) {
    console.error("Mahotsav pass link failed:", error);
    return NextResponse.json({ error: "Could not generate the pass." }, { status: 500 });
  }
}
