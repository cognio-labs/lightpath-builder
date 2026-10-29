import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  razorpayRequest,
  verifyOrderSignature,
  verifySubscriptionSignature,
  type RazorpayPayment,
  type RazorpaySubscription,
} from "@/lib/razorpay.server";
import { markOrderPaid, recordSubscriptionCharge, syncSubscription } from "@/lib/donations.server";

// Called by the browser right after Razorpay Checkout succeeds. Confirms the
// signature, then records the payment immediately so the donor sees success
// without waiting for the webhook (which repeats the same idempotent writes).

const verifySchema = z.union([
  z.object({
    kind: z.literal("order"),
    razorpay_order_id: z.string().min(1),
    razorpay_payment_id: z.string().min(1),
    razorpay_signature: z.string().min(1),
  }),
  z.object({
    kind: z.literal("subscription"),
    razorpay_subscription_id: z.string().min(1),
    razorpay_payment_id: z.string().min(1),
    razorpay_signature: z.string().min(1),
  }),
]);

export async function POST(request: NextRequest) {
  const parsed = verifySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  const body = parsed.data;

  try {
    if (body.kind === "order") {
      if (!verifyOrderSignature(body.razorpay_order_id, body.razorpay_payment_id, body.razorpay_signature)) {
        return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });
      }
      const payment = await razorpayRequest<RazorpayPayment>(`/payments/${body.razorpay_payment_id}`);
      if (payment.status === "captured" || payment.status === "authorized") {
        await markOrderPaid({ ...payment, order_id: body.razorpay_order_id });
      }
      return NextResponse.json({ ok: true, paymentId: payment.id });
    }

    if (
      !verifySubscriptionSignature(
        body.razorpay_payment_id,
        body.razorpay_subscription_id,
        body.razorpay_signature,
      )
    ) {
      return NextResponse.json({ error: "Auto-pay verification failed." }, { status: 400 });
    }
    const [subscription, payment] = await Promise.all([
      razorpayRequest<RazorpaySubscription>(`/subscriptions/${body.razorpay_subscription_id}`),
      razorpayRequest<RazorpayPayment>(`/payments/${body.razorpay_payment_id}`),
    ]);
    await syncSubscription(subscription);
    await recordSubscriptionCharge(subscription, payment);
    return NextResponse.json({ ok: true, paymentId: payment.id });
  } catch (err) {
    console.error("[razorpay/verify]", err);
    // The payment itself went through on Razorpay; the webhook will still record it.
    return NextResponse.json({ ok: true, pending: true });
  }
}
