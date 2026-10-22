import { NextResponse } from "next/server";

export const runtime = "nodejs";
const MAX_DONATION_RUPEES = 10_000_000;

export async function POST(request: Request) {
  try {
    const { amount, purpose } = await request.json() as { amount?: unknown; purpose?: unknown };
    if (!Number.isSafeInteger(amount) || Number(amount) < 1 || Number(amount) > MAX_DONATION_RUPEES) {
      return NextResponse.json({ error: "Enter a valid contribution amount." }, { status: 400 });
    }
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) {
      return NextResponse.json({ error: "Secure donations are being configured. Please contact Science Divine to contribute." }, { status: 503 });
    }
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: { Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: Number(amount) * 100,
        currency: "INR",
        receipt: `sd_${Date.now().toString(36)}_${crypto.randomUUID().slice(0, 8)}`,
        notes: { purpose: typeof purpose === "string" ? purpose.slice(0, 240) : "Science Divine donation" },
      }),
      cache: "no-store",
    });
    const order = await response.json() as { id?: string; amount?: number; currency?: string; error?: { description?: string } };
    if (!response.ok || !order.id) return NextResponse.json({ error: order.error?.description || "Razorpay could not create the order." }, { status: 502 });
    return NextResponse.json({ keyId, orderId: order.id, amount: order.amount, currency: order.currency });
  } catch {
    return NextResponse.json({ error: "Unable to create the donation order." }, { status: 400 });
  }
}
