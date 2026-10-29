import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { MAX_DONATION, MIN_DONATION, SEWAS, SEWA_KEYS } from "@/lib/sewa";
import { razorpayKeyId, razorpayRequest, toPaise } from "@/lib/razorpay.server";
import { donationsDb } from "@/lib/donations.server";
import { donorSchema } from "../donor-schema";

// Creates a one-time Razorpay order for any sewa and stores it as "created".

const orderSchema = z.object({
  sewa: z.enum(SEWA_KEYS as [string, ...string[]]),
  amount: z.number().min(MIN_DONATION).max(MAX_DONATION),
  donor: donorSchema,
});

export async function POST(request: NextRequest) {
  const parsed = orderSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the amount and your details." }, { status: 400 });
  }
  const { sewa, donor } = parsed.data;
  const amount = Math.round(parsed.data.amount * 100) / 100;
  const config = SEWAS[sewa as keyof typeof SEWAS];

  try {
    const order = await razorpayRequest<{ id: string; amount: number; currency: string }>("/orders", {
      method: "POST",
      body: {
        amount: toPaise(amount),
        currency: "INR",
        receipt: `${sewa}-${Date.now()}`,
        notes: { sewa, donor_name: donor.name, donor_email: donor.email },
      },
    });

    const db = await donationsDb();
    const { error } = await db.from(config.table).insert({
      amount,
      status: "created",
      razorpay_order_id: order.id,
      donor_name: donor.name,
      donor_email: donor.email,
      donor_phone: donor.phone,
      donor_pan: donor.pan ?? null,
    });
    if (error) throw new Error(error.message);

    return NextResponse.json({
      keyId: razorpayKeyId(),
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error("[razorpay/order]", err);
    return NextResponse.json({ error: "Could not start the payment. Please try again." }, { status: 500 });
  }
}
