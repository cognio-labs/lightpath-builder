// Server-only Razorpay helpers: REST calls with the key secret and signature
// checks. Never import this from a "use client" file.
import crypto from "node:crypto";

const API_BASE = "https://api.razorpay.com/v1";

function credentials() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    throw new Error("Missing RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET environment variables.");
  }
  return { keyId, keySecret };
}

export function razorpayKeyId() {
  return credentials().keyId;
}

export async function razorpayRequest<T>(
  path: string,
  init: { method?: "GET" | "POST"; body?: unknown } = {},
): Promise<T> {
  const { keyId, keySecret } = credentials();
  const res = await fetch(`${API_BASE}${path}`, {
    method: init.method ?? "GET",
    headers: {
      Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
    cache: "no-store",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data?.error?.description || `Razorpay request failed (${res.status})`;
    throw new Error(message);
  }
  return data as T;
}

function hmacHex(payload: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

function safeEqualHex(a: string, b: string) {
  const left = Buffer.from(a, "utf8");
  const right = Buffer.from(b, "utf8");
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

/** Checkout signature for a one-time order payment. */
export function verifyOrderSignature(orderId: string, paymentId: string, signature: string) {
  return safeEqualHex(hmacHex(`${orderId}|${paymentId}`, credentials().keySecret), signature);
}

/** Checkout signature for a subscription (auto-pay mandate) authorisation. */
export function verifySubscriptionSignature(paymentId: string, subscriptionId: string, signature: string) {
  return safeEqualHex(hmacHex(`${paymentId}|${subscriptionId}`, credentials().keySecret), signature);
}

export function verifyWebhookSignature(rawBody: string, signature: string) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) throw new Error("Missing RAZORPAY_WEBHOOK_SECRET environment variable.");
  return safeEqualHex(hmacHex(rawBody, secret), signature);
}

export const toPaise = (rupees: number) => Math.round(rupees * 100);
export const toRupees = (paise: number) => paise / 100;
export const fromUnix = (seconds?: number | null) =>
  seconds ? new Date(seconds * 1000).toISOString() : null;

export type RazorpayPayment = {
  id: string;
  amount: number;
  currency: string;
  status: "created" | "authorized" | "captured" | "refunded" | "failed";
  order_id: string | null;
  invoice_id?: string | null;
  method?: string;
  email?: string;
  contact?: string;
  notes?: Record<string, string> | unknown[];
  error_description?: string | null;
  created_at: number;
};

export type RazorpaySubscription = {
  id: string;
  plan_id: string;
  customer_id?: string | null;
  status: string;
  paid_count: number;
  current_start?: number | null;
  current_end?: number | null;
  charge_at?: number | null;
  ended_at?: number | null;
  notes?: Record<string, string> | unknown[];
};

const resolvedPages = new Map<string, URL | null>();

/**
 * The sewa's Razorpay Payment Page from env, as its full
 * pages.razorpay.com/pl_…/view address. Short rzp.io links are followed once
 * (and cached) because their redirect drops ?amount= and hides the pl_ id.
 */
export async function paymentPageUrl(envName: string | undefined): Promise<URL | null> {
  const value = envName ? process.env[envName]?.trim().replace(/^"|"$/g, "") : undefined;
  if (!value) return null;
  if (!resolvedPages.has(value)) {
    let url: URL | null = null;
    try {
      url = new URL(value);
      if (url.protocol !== "https:") url = null;
      else if (!/pl_[A-Za-z0-9]+/.test(url.pathname)) {
        const res = await fetch(url, { redirect: "manual", cache: "no-store" });
        const location = res.headers.get("location");
        if (location) url = new URL(location, url);
      }
    } catch {
      url = null;
    }
    resolvedPages.set(value, url);
  }
  const url = resolvedPages.get(value);
  return url ? new URL(url) : null;
}

/** "pl_XXXX" id of the sewa's Payment Page, used to match its webhook payments. */
export async function paymentPageId(envName: string | undefined) {
  return (await paymentPageUrl(envName))?.pathname.match(/pl_[A-Za-z0-9]+/)?.[0] ?? null;
}
