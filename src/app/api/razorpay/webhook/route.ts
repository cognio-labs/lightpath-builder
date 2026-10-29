import { NextRequest, NextResponse } from "next/server";
import {
  verifyWebhookSignature,
  type RazorpayPayment,
  type RazorpaySubscription,
} from "@/lib/razorpay.server";
import {
  donationsDb,
  markOrderFailed,
  markOrderPaid,
  markPaymentRefunded,
  recordPaymentPageFailure,
  recordPaymentPagePayment,
  recordSubscriptionCharge,
  syncSubscription,
} from "@/lib/donations.server";

// Razorpay → https://sciencedivine.org/api/razorpay/webhook
// Every event is logged in razorpay_webhook_events; Razorpay retries on
// non-2xx, so an event that was already processed is acknowledged and skipped.

type WebhookEvent = {
  event: string;
  payload: {
    payment?: { entity: RazorpayPayment };
    subscription?: { entity: RazorpaySubscription };
    refund?: { entity: { payment_id: string } };
  };
};

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature") ?? "";

  try {
    if (!verifyWebhookSignature(rawBody, signature)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
  } catch (err) {
    console.error("[razorpay/webhook]", err);
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const event = JSON.parse(rawBody) as WebhookEvent;
  const eventId = request.headers.get("x-razorpay-event-id") ?? `${event.event}-${Date.now()}`;
  const payment = event.payload.payment?.entity;
  const subscription = event.payload.subscription?.entity;
  const notes = (payment?.notes ?? subscription?.notes) as Record<string, string> | undefined;

  const db = await donationsDb();
  const { data: seen } = await db
    .from("razorpay_webhook_events")
    .select("processed_at")
    .eq("event_id", eventId)
    .maybeSingle();
  if (seen?.processed_at) return NextResponse.json({ ok: true, duplicate: true });

  await db.from("razorpay_webhook_events").upsert({
    event_id: eventId,
    event_type: event.event,
    sewa: notes && !Array.isArray(notes) ? (notes.sewa ?? null) : null,
    payload: event,
  });

  try {
    switch (event.event) {
      case "payment.captured":
      case "order.paid":
        // Subscription charges also fire payment.captured; they carry an
        // invoice_id and are recorded by subscription.charged instead.
        if (payment && !payment.invoice_id) {
          // Our own checkout created an order row; otherwise it came from a
          // sewa's Razorpay Payment Page.
          if (!(await markOrderPaid(payment))) {
            const sewa = await recordPaymentPagePayment(payment, rawBody);
            if (sewa) await db.from("razorpay_webhook_events").update({ sewa }).eq("event_id", eventId);
          }
        }
        break;
      case "payment.failed":
        if (payment && !payment.invoice_id && !(await markOrderFailed(payment))) {
          const sewa = await recordPaymentPageFailure(payment, rawBody);
          if (sewa) await db.from("razorpay_webhook_events").update({ sewa }).eq("event_id", eventId);
        }
        break;
      case "subscription.authenticated":
      case "subscription.activated":
      case "subscription.pending":
      case "subscription.halted":
      case "subscription.paused":
      case "subscription.resumed":
      case "subscription.cancelled":
      case "subscription.completed":
        if (subscription) await syncSubscription(subscription);
        break;
      case "subscription.charged":
        if (subscription) await syncSubscription(subscription);
        if (subscription && payment) await recordSubscriptionCharge(subscription, payment);
        break;
      case "refund.processed":
        if (event.payload.refund) await markPaymentRefunded(event.payload.refund.entity.payment_id);
        break;
    }

    await db
      .from("razorpay_webhook_events")
      .update({ processed_at: new Date().toISOString(), error: null })
      .eq("event_id", eventId);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[razorpay/webhook]", event.event, message);
    await db.from("razorpay_webhook_events").update({ error: message }).eq("event_id", eventId);
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
}
