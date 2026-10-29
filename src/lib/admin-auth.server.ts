// Server-only: single admin login for /admin, credentials from env
// (ADMIN_USERNAME / ADMIN_PASSWORD). The session is a signed, expiring cookie;
// changing either credential signs everyone out.
import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const ADMIN_COOKIE = "sd_admin_session";
const SESSION_HOURS = 12;

function signingKey() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  if (!username || !password) return null;
  return crypto
    .createHash("sha256")
    .update(`${username}\u0000${password}\u0000${process.env.ADMIN_SESSION_SECRET ?? process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""}`)
    .digest();
}

function sameText(a: string, b: string) {
  // Hash first so the comparison is constant-time regardless of length.
  const ha = crypto.createHash("sha256").update(a).digest();
  const hb = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
}

export function adminConfigured() {
  return signingKey() !== null;
}

export function credentialsMatch(username: string, password: string) {
  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedPass = process.env.ADMIN_PASSWORD;
  if (!expectedUser || !expectedPass) return false;
  // Evaluate both so timing doesn't reveal which one was wrong.
  const userOk = sameText(username, expectedUser);
  const passOk = sameText(password, expectedPass);
  return userOk && passOk;
}

function sign(payload: string) {
  const key = signingKey();
  if (!key) return null;
  return crypto.createHmac("sha256", key).update(payload).digest("base64url");
}

export function createSessionToken() {
  const expires = Date.now() + SESSION_HOURS * 60 * 60 * 1000;
  const signature = sign(String(expires));
  return signature ? { token: `${expires}.${signature}`, expires: new Date(expires) } : null;
}

function validToken(token: string | undefined) {
  if (!token) return false;
  const [expires, signature] = token.split(".");
  const expected = sign(expires ?? "");
  if (!expected || !signature || !sameText(signature, expected)) return false;
  return Number(expires) > Date.now();
}

export async function isAdmin() {
  const store = await cookies();
  return validToken(store.get(ADMIN_COOKIE)?.value);
}

/** Use at the top of every admin page / route. */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
