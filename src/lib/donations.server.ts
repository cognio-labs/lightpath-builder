// Server-only: writes Razorpay payment state into the sewa donation tables
// (supabase/*.sql). Used by /api/razorpay/verify and the webhook, so
// every write here is idempotent — the same payment can arrive from both.
// Donor emails go out only when a write actually changes a payment's state.
import type { SupabaseClient } from "@supabase/supabase-js";
import { MONTHLY_SEWA_KEYS, SEWAS, SEWA_KEYS, isSewaKey, type SewaKey } from "@/lib/sewa";
import {
  fromUnix,
  paymentPageId,
  toRupees,
  type RazorpayPayment,
  type RazorpaySubscription,
} from "@/lib/razorpay.server";
import { sendDonationReceipt, sendPaymentFailed } from "@/lib/donation-emails.server";

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

  const paidAt = fromUnix(payment.created_at) ?? new Date().toISOString();
  // Only rows not yet paid change, so a repeat report doesn't re-send the receipt.
  const { data: changed, error } = await db
    .from(SEWAS[sewa].table)
    .update({
      status: "paid",
      razorpay_payment_id: payment.id,
      payment_method: payment.method ?? null,
      paid_at: paidAt,
      failure_reason: null,
    })
    .eq("razorpay_order_id", payment.order_id)
    .in("status", ["created", "failed"])
    .select("amount, donor_name, donor_email");
  if (error) throw new Error(error.message);

  const row = changed?.[0];
  if (row) {
    await sendDonationReceipt({
      sewa,
      donor: { name: row.donor_name, email: row.donor_email ?? payment.email },
      amount: Number(row.amount),
      kind: "one_time",
      paymentId: payment.id,
      paidAt,
      method: payment.method,
    });
  }
  return true;
}

/**
 * Which sewa a Razorpay Payment Page payment belongs to. Razorpay doesn't
 * document a page-id field on the payment, so the sewa is matched by its page
 * id (pl_…) appearing anywhere in the webhook payload, or by a "sewa" note.
 */
async function sewaForPaymentPage(payment: RazorpayPayment, rawPayload: string) {
  const noted = noteValue(payment.notes, "sewa");
  const pageIds = await Promise.all(SEWA_KEYS.map((key) => paymentPageId(SEWAS[key].paymentPageEnv)));
  return (
    SEWA_KEYS.find((_, i) => pageIds[i] !== null && rawPayload.includes(pageIds[i]!)) ??
    (isSewaKey(noted) ? noted : null)
  );
}

/** Donor details as entered on a Payment Page (prefilled from our card). */
function paymentPageDonor(payment: RazorpayPayment) {
  const note = (...keys: string[]) => keys.map((k) => noteValue(payment.notes, k)).find(Boolean) ?? null;
  return {
    donor_name: note("name", "full_name", "donor_name"),
    donor_email: payment.email ?? note("email"),
    donor_phone: payment.contact ?? note("phone", "contact"),
    donor_pan: note("pan", "pan_number", "pan_card"),
  };
}

/**
 * Payment made on a sewa's own Razorpay Payment Page (so no row of ours yet).
 * One row per Razorpay order. Returns the sewa it was recorded under, or null.
 */
export async function recordPaymentPagePayment(payment: RazorpayPayment, rawPayload: string) {
  const sewa = await sewaForPaymentPage(payment, rawPayload);
  if (!sewa) return null;

  const db = await donationsDb();
  const table = SEWAS[sewa].table;
  const orderId = payment.order_id ?? payment.id;
  const donor = paymentPageDonor(payment);
  const paidAt = fromUnix(payment.created_at) ?? new Date().toISOString();
  const fields = {
    amount: toRupees(payment.amount),
    currency: payment.currency,
    status: "paid",
    razorpay_payment_id: payment.id,
    payment_method: payment.method ?? null,
    failure_reason: null,
    ...donor,
    paid_at: paidAt,
    notes: payment.notes && !Array.isArray(payment.notes) ? payment.notes : {},
  };

  // An earlier failed attempt on the same order → mark it paid.
  const { data: updated, error: updateError } = await db
    .from(table)
    .update(fields)
    .eq("razorpay_order_id", orderId)
    .eq("status", "failed")
    .select("id");
  if (updateError) throw new Error(updateError.message);

  let newlyPaid = Boolean(updated?.length);
  if (!newlyPaid) {
    // First report of this order; a repeat webhook finds it already there and changes nothing.
    const { data: inserted, error } = await db
      .from(table)
      .upsert({ ...fields, razorpay_order_id: orderId }, { onConflict: "razorpay_order_id", ignoreDuplicates: true })
      .select("id");
    if (error) throw new Error(error.message);
    newlyPaid = Boolean(inserted?.length);
  }

  if (newlyPaid) {
    await sendDonationReceipt({
      sewa,
      donor: { name: donor.donor_name, email: donor.donor_email },
      amount: toRupees(payment.amount),
      kind: "one_time",
      paymentId: payment.id,
      paidAt,
      method: payment.method,
    });
  }
  return sewa;
}

/** Failed attempt on a Payment Page → one "failed" row per order, and one email. */
export async function recordPaymentPageFailure(payment: RazorpayPayment, rawPayload: string) {
  const sewa = await sewaForPaymentPage(payment, rawPayload);
  if (!sewa) return null;

  const db = await donationsDb();
  const donor = paymentPageDonor(payment);
  const reason = payment.error_description ?? "Payment failed";
  const { data: inserted, error } = await db
    .from(SEWAS[sewa].table)
    .upsert(
      {
        amount: toRupees(payment.amount),
        currency: payment.currency,
        status: "failed",
        razorpay_order_id: payment.order_id ?? payment.id,
        failure_reason: reason,
        ...donor,
      },
      { onConflict: "razorpay_order_id", ignoreDuplicates: true },
    )
    .select("id");
  if (error) throw new Error(error.message);

  if (inserted?.length) {
    await sendPaymentFailed({
      sewa,
      donor: { name: donor.donor_name, email: donor.donor_email },
      amount: toRupees(payment.amount),
      monthly: false,
      reason,
    });
  }
  return sewa;
}

/** One-time payment failed → record why, unless a retry already succeeded. */
export async function markOrderFailed(payment: RazorpayPayment) {
  if (!payment.order_id) return false;
  const db = await donationsDb();
  const sewa = await findSewaForOrder(db, payment.order_id, noteValue(payment.notes, "sewa"));
  if (!sewa) return false;

  const reason = payment.error_description ?? "Payment failed";
  // Only the first failure on an order changes the row, so one email per order.
  const { data: changed, error } = await db
    .from(SEWAS[sewa].table)
    .update({ status: "failed", failure_reason: reason })
    .eq("razorpay_order_id", payment.order_id)
    .eq("status", "created")
    .select("amount, donor_name, donor_email");
  if (error) throw new Error(error.message);

  const row = changed?.[0];
  if (row) {
    await sendPaymentFailed({
      sewa,
      donor: { name: row.donor_name, email: row.donor_email ?? payment.email },
      amount: Number(row.amount),
      monthly: false,
      reason,
    });
  }
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

  const paidAt = fromUnix(payment.created_at) ?? new Date().toISOString();
  const { data: inserted, error } = await db.from(SEWAS[sewa].table).upsert(
    {
      frequency: "monthly",
      amount: toRupees(payment.amount),
      currency: payment.currency,
      status: "paid",
      razorpay_payment_id: payment.id,
      razorpay_subscription_id: subscription.id,
      payment_method: payment.method ?? null,
      donor_name: sub.donor_name,
      donor_email: sub.donor_email ?? payment.email ?? null,
      donor_phone: sub.donor_phone ?? payment.contact ?? null,
      donor_pan: sub.donor_pan,
      paid_at: paidAt,
    },
    // A charge already recorded (from /verify or a repeat webhook) is left alone.
    { onConflict: "razorpay_payment_id", ignoreDuplicates: true },
  ).select("id");
  if (error) throw new Error(error.message);

  // Monthly donors give email/phone in Razorpay Checkout, not on our site.
  if ((!sub.donor_email && payment.email) || (!sub.donor_phone && payment.contact)) {
    await db
      .from(SEWAS[sewa].subscriptionsTable!)
      .update({
        donor_email: sub.donor_email ?? payment.email ?? null,
        donor_phone: sub.donor_phone ?? payment.contact ?? null,
      })
      .eq("razorpay_subscription_id", subscription.id);
  }

  const paidCount = await refreshSubscriptionTotals(db, sewa, subscription.id);

  if (inserted?.length) {
    await sendDonationReceipt({
      sewa,
      donor: { name: sub.donor_name, email: sub.donor_email ?? payment.email },
      amount: toRupees(payment.amount),
      kind: paidCount <= 1 ? "monthly_first" : "monthly_renewal",
      paymentId: payment.id,
      paidAt,
      method: payment.method,
      nextChargeAt: fromUnix(subscription.charge_at),
    });
  }
}

/** Recomputes paid_count / total_paid; returns the number of paid charges. */
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
  return paid.length;
}

/** Mirrors Razorpay's subscription state (active / halted / cancelled …). */
export async function syncSubscription(subscription: RazorpaySubscription) {
  const db = await donationsDb();
  const sewa = await findSewaForSubscription(db, subscription.id, noteValue(subscription.notes, "sewa"));
  if (!sewa) return;

  const table = SEWAS[sewa].subscriptionsTable!;
  const { error } = await db
    .from(table)
    .update({
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

  // Status separately, so we can tell when it actually changes.
  const { data: changed, error: statusError } = await db
    .from(table)
    .update({ status: subscription.status })
    .eq("razorpay_subscription_id", subscription.id)
    .neq("status", subscription.status)
    .select("amount, donor_name, donor_email");
  if (statusError) throw new Error(statusError.message);

  // A monthly charge failed: "pending" = Razorpay is retrying, "halted" = retries used up.
  const row = changed?.[0];
  if (row && (subscription.status === "pending" || subscription.status === "halted")) {
    await sendPaymentFailed({
      sewa,
      donor: { name: row.donor_name, email: row.donor_email },
      amount: Number(row.amount),
      monthly: true,
      reason:
        subscription.status === "halted"
          ? "All retry attempts failed, so the auto-pay has been paused."
          : "The monthly charge failed. Razorpay will retry automatically.",
    });
  }
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
