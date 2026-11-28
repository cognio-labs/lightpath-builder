import "server-only";

import { EVENT_CONFIG } from "@/lib/mahotsav/event";

/**
 * Sends the Entry Pass on WhatsApp through AiSensy's campaign API.
 *
 * Needs in the server environment:
 *   AISENSY_API_KEY         – AiSensy dashboard → Manage → API key
 *   AISENSY_CAMPAIGN_NAME   – a LIVE "API campaign" whose template has an IMAGE header
 *   AISENSY_TEMPLATE_PARAMS – optional, comma-separated values for the template's
 *                             body variables, in order. Allowed: name, persons, date,
 *                             time, venue, address, maps (Google Maps link), festival. Default: "name".
 *
 * Never throws: a WhatsApp problem must not fail a registration.
 */

const ENDPOINT = "https://backend.aisensy.com/campaign/t1/api/v2";

/** Digits only, with country code. A bare 10-digit number is treated as Indian (+91). */
export function normaliseWhatsAppNumber(raw: string): string | null {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  if (digits.length === 10) digits = `91${digits}`;
  return digits.length >= 11 && digits.length <= 15 ? digits : null;
}

interface WhatsAppPassInput {
  mobile: string;
  fullName: string;
  attendees: number;
  passUrl: string;
}

export async function sendPassWhatsApp(input: WhatsAppPassInput): Promise<boolean> {
  const apiKey = process.env.AISENSY_API_KEY;
  const campaignName = process.env.AISENSY_CAMPAIGN_NAME;
  if (!apiKey || !campaignName) {
    console.warn("[whatsapp] AISENSY_API_KEY / AISENSY_CAMPAIGN_NAME not set — skipping WhatsApp pass.");
    return false;
  }

  const destination = normaliseWhatsAppNumber(input.mobile);
  if (!destination) {
    console.warn("[whatsapp] Mobile number is not a valid WhatsApp number — skipping.");
    return false;
  }

  const values: Record<string, string> = {
    name: input.fullName,
    persons: String(input.attendees),
    date: EVENT_CONFIG.dateDisplay,
    time: `${EVENT_CONFIG.startTime} onwards`,
    venue: EVENT_CONFIG.venueLocation,
    address: EVENT_CONFIG.venueAddress,
    maps: EVENT_CONFIG.googleMapsUrl,
    festival: EVENT_CONFIG.festivalName,
  };
  const templateParams = (process.env.AISENSY_TEMPLATE_PARAMS || "name")
    .split(",")
    .map((token) => token.trim().toLowerCase())
    .filter(Boolean)
    .map((token) => values[token] ?? "");

  const safeName = input.fullName.replace(/[^A-Za-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "Guest";

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiKey,
        campaignName,
        destination,
        userName: input.fullName,
        templateParams,
        source: "shiksha-sewa-sankalp-mahotsav",
        media: { url: input.passUrl, filename: `Entry-Pass-${safeName}.jpg` },
        buttons: [],
        carouselCards: [],
        location: {},
        attributes: {},
        paramsFallbackValue: { FirstName: input.fullName.split(" ")[0] || "Guest" },
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) {
      console.error("[whatsapp] AiSensy rejected the message:", res.status, await res.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (error) {
    console.error("[whatsapp] Could not reach AiSensy:", error);
    return false;
  }
}
