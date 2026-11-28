import "server-only";

import crypto from "node:crypto";

/**
 * Public, signed link to one attendee's Entry Pass image.
 *
 * WhatsApp (via AiSensy) needs a publicly reachable image URL, and the pass is
 * generated on demand, so each link carries an HMAC signature of the
 * registration id: only links we issued work, and ids can't be guessed.
 */

function secret() {
  return (
    process.env.MAHOTSAV_PASS_SECRET ||
    process.env.ADMIN_SESSION_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    ""
  );
}

export function signPassId(id: string): string {
  const key = secret();
  if (!key) throw new Error("No secret available to sign pass links.");
  return crypto.createHmac("sha256", key).update(`mahotsav-pass|${id}`).digest("base64url");
}

export function isValidPassSignature(id: string, signature: string): boolean {
  try {
    const expected = Buffer.from(signPassId(id));
    const given = Buffer.from(signature);
    return expected.length === given.length && crypto.timingSafeEqual(expected, given);
  } catch {
    return false;
  }
}

/** Base URL WhatsApp's servers can reach (override with MAHOTSAV_PUBLIC_BASE_URL). */
function publicBaseUrl() {
  return (process.env.MAHOTSAV_PUBLIC_BASE_URL || "https://sciencedivine.org").replace(/\/$/, "");
}

export function passImageUrl(id: string): string {
  return `${publicBaseUrl()}/api/mahotsav/pass/${id}?sig=${signPassId(id)}`;
}
