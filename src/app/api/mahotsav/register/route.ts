import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { sendPassEmail } from "@/lib/mahotsav/email.server";
import { renderPass } from "@/lib/mahotsav/pass";
import { passImageUrl } from "@/lib/mahotsav/pass-link.server";
import { sendPassWhatsApp } from "@/lib/mahotsav/whatsapp.server";
import {
  insertRegistration,
  SupabaseError,
  updateRegistration,
  type RegistrationRow,
} from "@/lib/mahotsav/registrations.server";

export const maxDuration = 30;

interface RegistrationPayload {
  fullName?: unknown;
  email?: unknown;
  mobile?: unknown;
  city?: unknown;
  attendees?: unknown;
}

/** One pass covers at most this many people. */
const MAX_ATTENDEES = 5;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Row letters without I / O so seats aren't confused with 1 / 0.
const SEAT_ROWS = "ABCDEFGHJKLMNPQRSTUVWXYZ";

function randomSeat() {
  const row = SEAT_ROWS[crypto.randomInt(SEAT_ROWS.length)];
  const num = crypto.randomInt(1, 251);
  return `${row}-${String(num).padStart(3, "0")}`;
}

function randomReference() {
  return `SSSM-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
}

function str(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: RegistrationPayload;
  try {
    body = (await request.json()) as RegistrationPayload;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request." },
      { status: 400 }
    );
  }

  const fullName = str(body.fullName).replace(/\s+/g, " ");
  const email = str(body.email).toLowerCase();
  const mobile = str(body.mobile);
  const city = str(body.city);
  const attendees = Number(body.attendees);

  const errors: Record<string, string> = {};
  if (fullName.length < 2 || fullName.length > 80) {
    errors.fullName = "Please enter your full name (2–80 characters).";
  }
  if (!EMAIL_RE.test(email) || email.length > 254) {
    errors.email = "Please enter a valid email address — your pass is sent here.";
  }
  const digits = mobile.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) {
    errors.mobile = "Please enter a valid 10-digit mobile number.";
  }
  if (city.length < 2 || city.length > 100) {
    errors.city = "Please enter your city or town.";
  }
  if (!Number.isInteger(attendees) || attendees < 1 || attendees > MAX_ATTENDEES) {
    errors.attendees = "One pass can cover 1 to 5 people.";
  }
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { success: false, message: "Please review the highlighted fields.", errors },
      { status: 400 }
    );
  }

  // 1. Save registration — retry with a new seat/reference on a unique clash.
  let row: RegistrationRow | null = null;
  for (let attempt = 0; attempt < 6 && !row; attempt++) {
    try {
      row = await insertRegistration({
        reference_id: randomReference(),
        seat_number: randomSeat(),
        full_name: fullName,
        email,
        mobile,
        city,
        attendees,
      });
    } catch (error) {
      if (error instanceof SupabaseError && error.isUniqueViolation) continue;
      console.error("Registration insert failed:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Unable to save your registration right now. Please try again.",
        },
        { status: 500 }
      );
    }
  }
  if (!row) {
    return NextResponse.json(
      { success: false, message: "Could not allocate a seat. Please try again." },
      { status: 503 }
    );
  }

  // 2. Render the personalised pass and email it immediately.
  let passJpeg: Buffer | null = null;
  let emailSent = false;
  try {
    passJpeg = await renderPass(row.full_name, row.attendees);
    const emailId = await sendPassEmail({
      to: row.email,
      fullName: row.full_name,
      attendees: row.attendees,
      passJpeg,
    });
    emailSent = true;
    await updateRegistration(row.id, {
      pass_email_status: "sent",
      pass_email_id: emailId,
      pass_email_error: null,
      pass_sent_at: new Date().toISOString(),
    }).catch((e) => console.error("Could not mark pass as sent:", e));
  } catch (error) {
    console.error("Pass generation / email failed:", error);
    await updateRegistration(row.id, {
      pass_email_status: "failed",
      pass_email_error: String(error instanceof Error ? error.message : error).slice(0, 500),
    }).catch((e) => console.error("Could not mark pass as failed:", e));
  }

  // 3. Also send the pass on WhatsApp (AiSensy). Independent of the email: a failure
  //    here only gets logged and never affects the registration.
  let whatsappSent = false;
  let passUrl: string | null = null;
  try {
    passUrl = passImageUrl(row.id);
    whatsappSent = await sendPassWhatsApp({
      mobile: row.mobile,
      fullName: row.full_name,
      attendees: row.attendees,
      passUrl,
    });
  } catch (error) {
    console.error("WhatsApp pass failed:", error);
  }

  return NextResponse.json(
    {
      success: true,
      referenceId: row.reference_id,
      emailSent,
      whatsappSent,
      passUrl,
      passImage: passJpeg
        ? `data:image/jpeg;base64,${passJpeg.toString("base64")}`
        : null,
      registration: {
        fullName: row.full_name,
        email: row.email,
        mobile: row.mobile,
        city: row.city,
        attendees: row.attendees,
      },
    },
    { status: 201 }
  );
}
