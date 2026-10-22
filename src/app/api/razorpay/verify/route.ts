import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json() as Record<string, unknown>;
    if (typeof razorpay_order_id !== "string" || typeof razorpay_payment_id !== "string" || typeof razorpay_signature !== "string") {
      return NextResponse.json({ verified: false, error: "Incomplete payment verification data." }, { status: 400 });
    }
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) return NextResponse.json({ verified: false, error: "Payment verification is not configured." }, { status: 503 });
    const expected = createHmac("sha256", keySecret).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest("hex");
    const expectedBuffer = Buffer.from(expected, "utf8");
    const receivedBuffer = Buffer.from(razorpay_signature, "utf8");
    const verified = expectedBuffer.length === receivedBuffer.length && timingSafeEqual(expectedBuffer, receivedBuffer);
    if (!verified) return NextResponse.json({ verified: false, error: "Payment signature verification failed." }, { status: 400 });
    return NextResponse.json({ verified: true, paymentId: razorpay_payment_id });
  } catch {
    return NextResponse.json({ verified: false, error: "Unable to verify the payment." }, { status: 400 });
  }
}
