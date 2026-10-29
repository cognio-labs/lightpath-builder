import Link from "next/link";

import { CheckCircle2 } from "lucide-react";
import { SEWAS, isSewaKey } from "@/lib/sewa";

// Also the "after payment" page: Razorpay Payment Pages and the on-site
// checkout redirect here with ?for=<sewa|session> (see src/lib/sewa.ts).
// Without ?for it thanks the visitor for a submitted form.

type Params = { for?: string; monthly?: string; payment_id?: string; razorpay_payment_id?: string };

function message({ for: paidFor, monthly }: Params) {
  if (!isSewaKey(paidFor)) {
    return {
      title: "Thank you",
      body: "Your message has been received. Our team reviews every entry personally and will reach out within 24 hours.",
      cta: { href: "/events", label: "Explore events" },
    };
  }
  const sewa = SEWAS[paidFor];
  if (sewa.kind === "booking") {
    return {
      title: "Your Personal Session is booked",
      body: "Thank you for your contribution. Our team will contact you within 24 hours on your phone or email to schedule your session with Sadguru Sakshi Shree. A confirmation has been sent to your email.",
      cta: { href: "/events", label: "Explore events" },
    };
  }
  return {
    title: `Thank you for supporting ${sewa.label}`,
    body:
      monthly === "1"
        ? "Your monthly auto-pay is now active and your first payment has been received. It will be charged automatically every month — a confirmation has been sent to your email."
        : "Your contribution has been received. A receipt has been sent to your email. Your generosity makes a real difference.",
    cta: { href: "/initiatives", label: "Explore initiatives" },
  };
}

export default async function Page({ searchParams }: { searchParams: Promise<Params> }) {
  const params = await searchParams;
  const { title, body, cta } = message(params);
  const paymentId = params.payment_id ?? params.razorpay_payment_id;

  return (
    <div className="min-h-[calc(100dvh-160px)] grid place-items-center px-4 py-20">
      <div className="glass-card rounded-3xl p-10 max-w-lg text-center">
        <div className="w-16 h-16 mx-auto rounded-full gradient-bg text-white grid place-items-center mb-4">
          <CheckCircle2 size={32} />
        </div>
        <h1 className="font-display text-3xl font-bold mb-2 gradient-text">{title}</h1>
        <p className="text-muted-foreground mb-6">{body}</p>
        {paymentId && <p className="-mt-3 mb-6 font-mono text-xs text-muted-foreground">Payment ID: {paymentId}</p>}
        <div className="flex gap-2 justify-center">
          <Link href="/" className="rounded-full border border-border px-5 py-2 text-sm">
            Back to home
          </Link>
          <Link href={cta.href as never} className="btn-gradient rounded-full px-5 py-2 text-sm font-semibold">
            {cta.label}
          </Link>
        </div>
      </div>
    </div>
  );
}
