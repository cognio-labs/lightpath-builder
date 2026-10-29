// Server-only: writes Razorpay payment state into the sewa donation tables
// (supabase/*.sql). Used by /api/razorpay/verify and the webhook, so
// every write here is idempotent — the same payment can arrive from both.
import type { SupabaseClient } from "@supabase/supabase-js";
import { MONTHLY_SEWA_KEYS, SEWAS, SEWA_KEYS, isSewaKey, type SewaKey } from "@/lib/sewa";
import {
  fromUnix,
  paymentPageId,
  toRupees,
  type RazorpayPayment,
  type RazorpaySubscription,
} from "@/lib/razorpay.server";

// The generated Database type doesn't include the donation tables, so they are
// queried through an untyped view of the shared service-role client.
export async function donationsDb(): Promise<SupabaseClient> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin as unknown as SupabaseClient;
}

function noteValue(notes: RazorpayPayment["notes"], key: string) {
  return notes && !Array.isArray(notes) ? notes[key] : undefined;
}

/** Finds which sewa table holds a given order. */
async function findSewaForOrder(db: SupabaseClient, orderId: string, hint?: string) {
  const candidates = hint && hint in SEWAS ? [hint as SewaKey] : SEWA_KEYS;
  for (const sewa of candidates) {
    const { data } = await db
      .from(SEWAS[sewa].table)
      .select("id")
      .eq("razorpay_order_id", orderId)
      .maybeSingle();
    if (data) return sewa;
  }
  return null;
}

/** One-time payment captured → mark its order row paid. */
export async function markOrderPaid(payment: RazorpayPayment) {
  if (!payment.order_id) return false;
  const db = await donationsDb();
  const sewa = await findSewaForOrder(db, payment.order_id, noteValue(payment.notes, "sewa"));
  if (!sewa) return false;

  const { error } = await db
    .from(SEWAS[sewa].table)
    .update({
      status: "paid",
      razorpay_payment_id: payment.id,
      payment_method: payment.method ?? null,
      paid_at: fromUnix(payment.created_at) ?? new Date().toISOString(),
      failure_reason: null,
    })
    .eq("razorpay_order_id", payment.order_id)
    .neq("status", "refunded");
  if (error) throw new Error(error.message);
  return true;
}

/**
 * Payment made on a sewa's own Razorpay Payment Page (so no order row of ours).
 * Razorpay doesn't document a page-id field on the payment, so the sewa is
 * matched by its page id (pl_…) appearing anywhere in the webhook payload, or
 * by a "sewa" note. Returns the sewa it was recorded under, or null.
 */
export async function recordPaymentPagePayment(payment: RazorpayPayment, rawPayload: string) {
  const noted = noteValue(payment.notes, "sewa");
  const pageIds = await Promise.all(SEWA_KEYS.map((key) => paymentPageId(SEWAS[key].paymentPageEnv)));
  const sewa =
    SEWA_KEYS.find((_, i) => pageIds[i] !== null && rawPayload.includes(pageIds[i]!)) ??
    (isSewaKey(noted) ? noted : null);
  if (!sewa) return null;

  const note = (...keys: string[]) => keys.map((k) => noteValue(payment.notes, k)).find(Boolean) ?? null;
  const db = await donationsDb();
  const { error } = await db.from(SEWAS[sewa].table).upsert(
    {
      amount: toRupees(payment.amount),
      currency: payment.currency,
      status: "paid",
      razorpay_order_id: payment.order_id ?? payment.id,
      razorpay_payment_id: payment.id,
      payment_method: payment.method ?? null,
      donor_name: note("name", "full_name", "donor_name"),
      donor_email: payment.email ?? note("email"),
      donor_phone: payment.contact ?? note("phone", "contact"),
      donor_pan: note("pan", "pan_number", "pan_card"),
      paid_at: fromUnix(payment.created_at) ?? new Date().toISOString(),
      notes: payment.notes && !Array.isArray(payment.notes) ? payment.notes : {},
    },
    { onConflict: "razorpay_payment_id" },
  );
  if (error) throw new Error(error.message);
  return sewa;
}

/** One-time payment failed → record why, unless a retry already succeeded. */
export async function markOrderFailed(payment: RazorpayPayment) {
  if (!payment.order_id) return false;
  const db = await donationsDb();
  const sewa = await findSewaForOrder(db, payment.order_id, noteValue(payment.notes, "sewa"));
  if (!sewa) return false;

  const { error } = await db
    .from(SEWAS[sewa].table)
    .update({ status: "failed", failure_reason: payment.error_description ?? "Payment failed" })
    .eq("razorpay_order_id", payment.order_id)
    .eq("status", "created");
  if (error) throw new Error(error.message);
  return true;
}

/** Finds which sewa a subscription belongs to (notes first, then lookup). */
async function findSewaForSubscription(db: SupabaseClient, subscriptionId: string, hint?: string) {
  const candidates =
    hint && isSewaKey(hint) && SEWAS[hint].subscriptionsTable ? [hint] : MONTHLY_SEWA_KEYS;
  for (const sewa of candidates) {
    const { data } = await db
      .from(SEWAS[sewa].subscriptionsTable!)
      .select("id")
      .eq("razorpay_subscription_id", subscriptionId)
      .maybeSingle();
    if (data) return sewa;
  }
  return null;
}

/** Monthly auto-pay charge → one paid row in that sewa's donations table. */
export async function recordSubscriptionCharge(
  subscription: RazorpaySubscription,
  payment: RazorpayPayment,
) {
  if (payment.status !== "captured" || payment.amount <= 0) return;
  const db = await donationsDb();
  const sewa = await findSewaForSubscription(db, subscription.id, noteValue(subscription.notes, "sewa"));
  if (!sewa) return;

  const { data: sub } = await db
    .from(SEWAS[sewa].subscriptionsTable!)
    .select("donor_name, donor_email, donor_phone, donor_pan")
    .eq("razorpay_subscription_id", subscription.id)
    .maybeSingle();
  if (!sub) return;

  const { error } = await db.from(SEWAS[sewa].table).upsert(
    {
      frequency: "monthly",
      amount: toRupees(payment.amount),
      currency: payment.currency,
      status: "paid",
      razorpay_payment_id: payment.id,
      razorpay_subscription_id: subscription.id,
      payment_method: payment.method ?? null,
      donor_name: sub.donor_name,
      donor_email: sub.donor_email,
      donor_phone: sub.donor_phone,
      donor_pan: sub.donor_pan,
      paid_at: fromUnix(payment.created_at) ?? new Date().toISOString(),
    },
    { onConflict: "razorpay_payment_id" },
  );
  if (error) throw new Error(error.message);

  await refreshSubscriptionTotals(db, sewa, subscription.id);
}

async function refreshSubscriptionTotals(db: SupabaseClient, sewa: SewaKey, subscriptionId: string) {
  const { data: rows } = await db
    .from(SEWAS[sewa].table)
    .select("amount")
    .eq("razorpay_subscription_id", subscriptionId)
    .eq("status", "paid");
  const paid = rows ?? [];
  await db
    .from(SEWAS[sewa].subscriptionsTable!)
    .update({
      paid_count: paid.length,
      total_paid: paid.reduce((sum, row) => sum + Number(row.amount), 0),
    })
    .eq("razorpay_subscription_id", subscriptionId);
}

/** Mirrors Razorpay's subscription state (active / halted / cancelled …). */
export async function syncSubscription(subscription: RazorpaySubscription) {
  const db = await donationsDb();
  const sewa = await findSewaForSubscription(db, subscription.id, noteValue(subscription.notes, "sewa"));
  if (!sewa) return;

  const { error } = await db
    .from(SEWAS[sewa].subscriptionsTable!)
    .update({
      status: subscription.status,
      razorpay_customer_id: subscription.customer_id ?? null,
      current_start: fromUnix(subscription.current_start),
      current_end: fromUnix(subscription.current_end),
      next_charge_at: fromUnix(subscription.charge_at),
      ...(subscription.status === "cancelled"
        ? { cancelled_at: fromUnix(subscription.ended_at) ?? new Date().toISOString() }
        : {}),
    })
    .eq("razorpay_subscription_id", subscription.id);
  if (error) throw new Error(error.message);
}

/** Refund processed → flag the payment in whichever sewa table has it. */
export async function markPaymentRefunded(paymentId: string) {
  const db = await donationsDb();
  for (const sewa of SEWA_KEYS) {
    const hasSubscriptions = Boolean(SEWAS[sewa].subscriptionsTable);
    const { data, error } = await db
      .from(SEWAS[sewa].table)
      .update({ status: "refunded" })
      .eq("razorpay_payment_id", paymentId)
      .select(hasSubscriptions ? "razorpay_subscription_id" : "id");
    if (error) throw new Error(error.message);
    if (data?.length) {
      const subscriptionId = (data[0] as { razorpay_subscription_id?: string | null })
        .razorpay_subscription_id;
      if (subscriptionId) await refreshSubscriptionTotals(db, sewa, subscriptionId);
      return;
    }
  }
}
