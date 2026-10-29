"use client";

import { useEffect, useState, type FormEvent } from "react";
import { submitForm } from "@/lib/admin.functions";
import { cleanDonor, donorError, useSewaCheckout } from "@/components/donations/useSewaCheckout";
import { SEWAS } from "@/lib/sewa";
import { GoldSubmitButton } from "./ui";

const inputClass =
  "w-full rounded-xl border border-cream-300 bg-cream-50 px-4 py-3 text-[13px] text-ink-900 placeholder:text-ink-500/70 transition-colors focus:border-gold-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold-300/30";

const SESSION_AMOUNT = SEWAS.session.fixedAmount!;

/**
 * Name / email / mobile → pay ₹6,100 for a Personal Session.
 * Opens the RAZORPAY_SESSION Payment Page with these details prefilled (falls
 * back to on-site checkout if it isn't set); the paid booking lands in
 * personal_session_bookings via the webhook, and the donor gets a confirmation email.
 */
export default function SessionRequestForm({
  source,
  submitLabel,
  autoFocus = false,
}: {
  source: string;
  submitLabel: string;
  autoFocus?: boolean;
}) {
  const checkout = useSewaCheckout();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // Coming back from the Razorpay page via Back restores this page from cache.
  useEffect(() => {
    const reset = () => setBusy(false);
    window.addEventListener("pageshow", reset);
    return () => window.removeEventListener("pageshow", reset);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const donor = cleanDonor({
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
    });
    const invalid = donorError(donor);
    if (invalid) {
      setErr(invalid);
      return;
    }
    setBusy(true);
    setErr(null);

    // Keep the enquiry too, so the team can follow up even if payment isn't completed.
    await submitForm({ type: "book_session", ...donor, message: source }).catch(() => {});

    try {
      const res = await fetch("/api/razorpay/payment-page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sewa: "session", ...donor }),
      });
      const { url } = (await res.json()) as { url: string | null };
      if (url) {
        window.location.assign(url);
        return;
      }
    } catch {
      // Fall through to on-site checkout.
    }
    setBusy(false);
    checkout.start({ sewa: "session", amount: SESSION_AMOUNT, frequency: "one_time", donor });
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="space-y-2.5">
        <input
          required
          name="name"
          autoComplete="name"
          placeholder="Your name"
          aria-label="Your name"
          autoFocus={autoFocus}
          className={inputClass}
        />
        <input required name="email" type="email" autoComplete="email" placeholder="Email" aria-label="Email" className={inputClass} />
        <input
          required
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="Mobile number"
          aria-label="Mobile number"
          className={inputClass}
        />
      </div>

      {err && (
        <p role="alert" className="mt-3 text-[12px] text-[#b42318]">
          {err}
        </p>
      )}

      <GoldSubmitButton size="md" withArrow={false} disabled={busy} className="mt-4 w-full">
        {busy ? "Opening secure payment…" : submitLabel}
      </GoldSubmitButton>

      {checkout.modal}
    </form>
  );
}
