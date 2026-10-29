import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { MAX_DONATION, MIN_DONATION, SEWAS, SEWA_KEYS, type SewaKey } from "@/lib/sewa";
import { paymentPageUrl } from "@/lib/razorpay.server";
import { donationsDb } from "@/lib/donations.server";
import { donorSchema } from "../donor-schema";

// POST { sewa, amount, name, email, phone }
// → { url } for that sewa's Razorpay Payment Page with amount and donor details
//   prefilled, or { url: null } when no page is set (the form then falls back
//   to the on-site checkout). Page links live in env (paymentPageEnv in src/lib/sewa.ts).
//
// Razorpay's Payment Page webhooks don't say which page was paid, so before
// redirecting we save a "created" row (razorpay_order_id = "intent_…") in the
// sewa's table. The webhook matches the payment to it by email/phone + amount
// (recordPaymentPagePayment in src/lib/donations.server.ts).

const schema = z.object({
  sewa: z.enum(SEWA_KEYS as [string, ...string[]]),
  amount: z.number().min(MIN_DONATION).max(MAX_DONATION).optional(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
});

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ url: null }, { status: 400 });
  const sewa = parsed.data.sewa as SewaKey;
  const config = SEWAS[sewa];

  const page = await paymentPageUrl(config.paymentPageEnv);
  if (!page) return NextResponse.json({ url: null });

  const amount = config.fixedAmount ?? Math.round(parsed.data.amount ?? 0);
  const donor = donorSchema.safeParse({ name: parsed.data.name, email: parsed.data.email, phone: parsed.data.phone });
  if (!donor.success || !Number.isSafeInteger(amount) || amount < MIN_DONATION) {
    return NextResponse.json({ error: "Please check the amount and your details." }, { status: 400 });
  }

  try {
    const db = await donationsDb();
    const { error } = await db.from(config.table).insert({
      amount,
      status: "created",
      razorpay_order_id: `intent_${crypto.randomUUID()}`,
      donor_name: donor.data.name,
      donor_email: donor.data.email,
      donor_phone: donor.data.phone,
    });
    if (error) throw new Error(error.message);
  } catch (err) {
    // Still let them pay; the webhook logs the payment even if it can't be matched.
    console.error("[razorpay/payment-page] Could not save the donation intent:", err);
  }

  // Razorpay reads ?amount= in rupees, and email / phone / name fields by their lowercase label.
  page.searchParams.set("amount", String(amount));
  page.searchParams.set("name", donor.data.name);
  page.searchParams.set("full_name", donor.data.name);
  page.searchParams.set("email", donor.data.email);
  page.searchParams.set("phone", donor.data.phone);
  return NextResponse.json({ url: page.toString() });
}
