import { NextRequest, NextResponse } from "next/server";
import { MAX_DONATION, SEWAS, isSewaKey } from "@/lib/sewa";
import { paymentPageUrl } from "@/lib/razorpay.server";

// GET /api/razorpay/payment-page?sewa=nirman&amount=1100&name=…&email=…&phone=…
// → { url } for that sewa's Razorpay Payment Page with amount and donor details
//   prefilled (Razorpay reads ?amount= in rupees, and email / phone / name
//   fields by their lowercase label), or { url: null } when no page is set,
//   in which case the donate form falls back to the on-site checkout.
// Page links live in env (paymentPageEnv in src/lib/sewa.ts).

export async function GET(request: NextRequest) {
  const sewa = request.nextUrl.searchParams.get("sewa");
  if (!isSewaKey(sewa)) return NextResponse.json({ url: null }, { status: 400 });

  const page = await paymentPageUrl(SEWAS[sewa].paymentPageEnv);
  if (!page) return NextResponse.json({ url: null });

  const amount = SEWAS[sewa].fixedAmount ?? Number(request.nextUrl.searchParams.get("amount"));
  if (Number.isSafeInteger(amount) && amount >= 1 && amount <= MAX_DONATION) {
    page.searchParams.set("amount", String(amount));
  }
  // Prefilled fields come back in the payment, so the webhook can save the donor.
  const name = request.nextUrl.searchParams.get("name")?.trim().slice(0, 120);
  const email = request.nextUrl.searchParams.get("email")?.trim().slice(0, 255);
  const phone = request.nextUrl.searchParams.get("phone")?.replace(/[^0-9+]/g, "").slice(0, 15);
  if (name) {
    page.searchParams.set("name", name);
    page.searchParams.set("full_name", name);
  }
  if (email) page.searchParams.set("email", email);
  if (phone) page.searchParams.set("phone", phone);
  return NextResponse.json({ url: page.toString() });
}
