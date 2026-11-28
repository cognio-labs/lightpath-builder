import "server-only";

import { EVENT_CONFIG } from "@/lib/mahotsav/event";

interface PassEmailInput {
  to: string;
  fullName: string;
  attendees: number;
  passJpeg: Buffer;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Sends the VIP pass via the Resend HTTP API. Returns the Resend email id. */
export async function sendPassEmail(input: PassEmailInput): Promise<string> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured.");

  const from = "Science Divine <passes@science-divine.org>";
  const name = escapeHtml(input.fullName);
  const festival = EVENT_CONFIG.festivalName;
  const when = `${EVENT_CONFIG.dateDisplay} • ${EVENT_CONFIG.startTime} onwards`;

  const html = `<!doctype html>
<html><body style="margin:0;background:#FDF8EF;font-family:Georgia,'Times New Roman',serif;color:#261812">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FDF8EF;padding:24px 12px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#FFFCF6;border:1px solid #E8D8BC;border-radius:16px;overflow:hidden">
        <tr><td style="background:#5E1216;color:#F2C97D;padding:20px 24px;text-align:center">
          <div style="font-size:12px;letter-spacing:3px;text-transform:uppercase">Your Entry Pass</div>
          <div style="font-size:24px;font-weight:bold;color:#FDF8EF;margin-top:6px">${festival}</div>
        </td></tr>
        <tr><td style="padding:24px">
          <p style="font-size:17px;margin:0 0 12px">Jai Gurudev, ${name} 🙏</p>
          <p style="font-size:15px;line-height:1.6;margin:0 0 16px">
            Thank you for registering for ${festival} — celebrating the birthday of ${EVENT_CONFIG.honoree}.
            Your personal Entry Pass is below and attached to this email. Please show it at the entry.
          </p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;background:#F6ECDA;border-radius:10px;padding:12px 16px;margin-bottom:18px">
            <tr><td style="padding:4px 0;color:#9A6213">Name</td><td style="padding:4px 0;text-align:right;font-weight:bold;color:#5E1216">${name}</td></tr>
            <tr><td style="padding:4px 0;color:#9A6213">Number of persons</td><td style="padding:4px 0;text-align:right;font-weight:bold">${input.attendees}</td></tr>
            <tr><td style="padding:4px 0;color:#9A6213">When</td><td style="padding:4px 0;text-align:right">${when}</td></tr>
            <tr><td style="padding:4px 0;color:#9A6213">Venue</td><td style="padding:4px 0;text-align:right">${EVENT_CONFIG.venueLocation}</td></tr>
          </table>
          <img src="cid:vip-pass" alt="Entry Pass for ${name}" width="512" style="display:block;width:100%;max-width:512px;height:auto;margin:0 auto;border-radius:12px" />
          <p style="font-size:13px;color:#695347;margin:18px 0 0;text-align:center">
            ${EVENT_CONFIG.venueAddress}<br/>
            <a href="${EVENT_CONFIG.googleMapsUrl}" style="color:#5E1216">Get directions</a> · ${EVENT_CONFIG.contactPhone}
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  const text = [
    `Jai Gurudev, ${input.fullName}!`,
    ``,
    `Your Entry Pass for ${festival} is attached.`,
    `Name: ${input.fullName}`,
    `Number of persons: ${input.attendees}`,
    `When: ${when}`,
    `Venue: ${EVENT_CONFIG.venueLocation}, ${EVENT_CONFIG.venueAddress}`,
    `Directions: ${EVENT_CONFIG.googleMapsUrl}`,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [input.to],
      subject: `Your Entry Pass — ${festival}`,
      html,
      text,
      attachments: [
        {
          filename: `Entry-Pass-${input.fullName.replace(/[^A-Za-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "Guest"}.jpg`,
          content: input.passJpeg.toString("base64"),
          content_type: "image/jpeg",
          content_id: "vip-pass",
        },
      ],
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  });

  const json = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(json?.message || `Resend request failed (${res.status})`);
  }
  return json?.id as string;
}
