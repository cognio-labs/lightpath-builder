import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { MAX_DONATION, MIN_MONTHLY_DONATION, MONTHLY_SEWA_KEYS, SEWAS, type SewaKey } from "@/lib/sewa";
import { razorpayKeyId, razorpayRequest, toPaise } from "@/lib/razorpay.server";
import { donationsDb } from "@/lib/donations.server";
import { donorSchema } from "../donor-schema";

// Creates a monthly auto-pay subscription for sewas that offer it (Shiksha
// Sewa, Living the Gita). Razorpay bills a Plan, so one Plan per sewa + amount
// is created on first use and reused after.

const SUBSCRIPTION_MONTHS = 120; // runs 10 years unless the donor cancels

const subscriptionSchema = z.object({
  sewa: z.enum(MONTHLY_SEWA_KEYS as [string, ...string[]]),
  amount: z.number().int().min(MIN_MONTHLY_DONATION).max(MAX_DONATION),
  donor: donorSchema,
});

async function planIdFor(sewa: SewaKey, amount: number) {
  const db = await donationsDb();
  const { data: existing } = await db
    .from("razorpay_plans")
    .select("razorpay_plan_id")
    .eq("sewa", sewa)
    .eq("amount", amount)
    .maybeSingle();
  if (existing) {
    // A saved plan may belong to the other mode (test vs live keys share this
    // table) or have been deleted in Razorpay — only reuse it if it exists here.
    try {
      await razorpayRequest(`/plans/${existing.razorpay_plan_id}`);
      return existing.razorpay_plan_id as string;
    } catch {
      // Fall through and create a plan for the current keys.
    }
  }

  const plan = await razorpayRequest<{ id: string }>("/plans", {
    method: "POST",
    body: {
      period: "monthly",
      interval: 1,
      item: {
        name: `${SEWAS[sewa].label} – ₹${amount.toLocaleString("en-IN")} / month`,
        amount: toPaise(amount),
        currency: "INR",
      },
      notes: { sewa },
    },
  });
  // Replace any unusable saved plan with this one.
  await db.from("razorpay_plans").upsert({ sewa, amount, razorpay_plan_id: plan.id }, { onConflict: "sewa,amount" });
  return plan.id;
}

export async function POST(request: NextRequest) {
  const parsed = subscriptionSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: `Please check the amount (whole rupees, minimum ₹${MIN_MONTHLY_DONATION}) and your details.` },
      { status: 400 },
    );
  }
  const { amount, donor } = parsed.data;
  const sewa = parsed.data.sewa as SewaKey;

  try {
    const planId = await planIdFor(sewa, amount);
    const subscription = await razorpayRequest<{ id: string }>("/subscriptions", {
      method: "POST",
      body: {
        plan_id: planId,
        total_count: SUBSCRIPTION_MONTHS,
        customer_notify: 1,
        notes: { sewa, donor_name: donor.name, donor_email: donor.email },
      },
    });

    const db = await donationsDb();
    const { error } = await db.from(SEWAS[sewa].subscriptionsTable!).insert({
      razorpay_subscription_id: subscription.id,
      razorpay_plan_id: planId,
      amount,
      status: "created",
      donor_name: donor.name,
      donor_email: donor.email,
      donor_phone: donor.phone,
      donor_pan: donor.pan ?? null,
    });
    if (error) throw new Error(error.message);

    return NextResponse.json({ keyId: razorpayKeyId(), subscriptionId: subscription.id });
  } catch (err) {
    console.error("[razorpay/subscription]", err);
    return NextResponse.json(
      { error: "Could not set up monthly auto-pay. Please try again." },
      { status: 500 },
    );
  }
}
