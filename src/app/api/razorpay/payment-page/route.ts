import { NextRequest, NextResponse } from "next/server";
import { MAX_DONATION, SEWAS, isSewaKey } from "@/lib/sewa";
import { paymentPageUrl } from "@/lib/razorpay.server";

// GET /api/razorpay/payment-page?sewa=nirman&amount=1100
// → { url } for that sewa's Razorpay Payment Page with the amount prefilled
//   (Razorpay reads ?amount= in rupees), or { url: null } when no page is set,
//   in which case the donate form falls back to the on-site checkout.
// Page links live in env (paymentPageEnv in src/lib/sewa.ts).

export async function GET(request: NextRequest) {
  const sewa = request.nextUrl.searchParams.get("sewa");
  if (!isSewaKey(sewa)) return NextResponse.json({ url: null }, { status: 400 });

  const page = await paymentPageUrl(SEWAS[sewa].paymentPageEnv);
  if (!page) return NextResponse.json({ url: null });

  const amount = Number(request.nextUrl.searchParams.get("amount"));
  if (Number.isSafeInteger(amount) && amount >= 1 && amount <= MAX_DONATION) {
    page.searchParams.set("amount", String(amount));
  }
  return NextResponse.json({ url: page.toString() });
}
