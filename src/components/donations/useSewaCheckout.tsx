"use client";

// On-site donate flow (Shiksha Sewa, and any sewa without a Payment Page):
//   checkout.start({ sewa, amount, frequency, donor })
//   → /api/razorpay/order|subscription (saves the donor) → Razorpay Checkout
//   with amount, email and phone prefilled → /api/razorpay/verify → /thank-you.
// Render {checkout.modal} once anywhere in the page.

import { useEffect, useState } from "react";
import { LoaderCircle, X, XCircle } from "lucide-react";
import { SEWAS, formatInr, type DonationFrequency, type SewaKey } from "@/lib/sewa";

export type Donor = { name: string; email: string; phone: string };

/** Returns an error message, or "" when the donor details are usable. */
export function donorError({ name, email, phone }: Donor) {
  if (name.trim().length < 2) return "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return "Please enter a valid email address.";
  if (!/^(\+?91)?[6-9]\d{9}$/.test(phone.replace(/[\s-]/g, ""))) return "Please enter a valid 10-digit mobile number.";
  return "";
}

export const cleanDonor = ({ name, email, phone }: Donor): Donor => ({
  name: name.trim(),
  email: email.trim(),
  phone: phone.replace(/[\s-]/g, ""),
});
type CheckoutRequest = { sewa: SewaKey; amount: number; frequency: DonationFrequency; donor: Donor };
type Stage =
  | { kind: "idle" }
  | { kind: "processing" }
  | { kind: "error"; message: string };

type RazorpayResponse = {
  razorpay_payment_id: string;
  razorpay_signature: string;
  razorpay_order_id?: string;
  razorpay_subscription_id?: string;
};

type RazorpayInstance = { open: () => void; on: (event: string, cb: (res: { error?: { description?: string } }) => void) => void };
declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => RazorpayInstance;
  }
}

const CHECKOUT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

function loadCheckoutScript(): Promise<boolean> {
  if (window.Razorpay) return Promise.resolve(true);
  return new Promise((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${CHECKOUT_SRC}"]`);
    const script = existing ?? document.createElement("script");
    script.addEventListener("load", () => resolve(true));
    script.addEventListener("error", () => resolve(false));
    if (!existing) {
      script.src = CHECKOUT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
  });
}

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
  return data as T;
}

export function useSewaCheckout() {
  const [stage, setStage] = useState<Stage>({ kind: "idle" });

  const start = async (next: CheckoutRequest) => {
    setStage({ kind: "processing" });
    try {
      const [loaded, created] = await Promise.all([
        loadCheckoutScript(),
        next.frequency === "monthly"
          ? postJson<{ keyId: string; subscriptionId: string }>("/api/razorpay/subscription", next)
          : postJson<{ keyId: string; orderId: string; amount: number; currency: string }>("/api/razorpay/order", next),
      ]);
      if (!loaded || !window.Razorpay) {
        throw new Error("Could not load the payment window. Check your connection and try again.");
      }
      const monthly = next.frequency === "monthly";

      const rzp = new window.Razorpay({
        key: created.keyId,
        name: "Science Divine Foundation",
        description: `${SEWAS[next.sewa].label} – ${formatInr(next.amount)}${monthly ? " / month" : ""}`,
        image: "/favicon.ico",
        ...("subscriptionId" in created
          ? { subscription_id: created.subscriptionId }
          : { order_id: created.orderId, amount: created.amount, currency: created.currency }),
        prefill: { name: next.donor.name, email: next.donor.email, contact: next.donor.phone },
        notes: { sewa: next.sewa },
        theme: { color: "#521623" },
        handler: async (res: RazorpayResponse) => {
          setStage({ kind: "processing" });
          await postJson("/api/razorpay/verify", { kind: monthly ? "subscription" : "order", ...res }).catch(
            () => {}, // The webhook records the payment even if this call fails.
          );
          // Same after-payment page the Razorpay Payment Pages redirect to.
          const thankYou = new URLSearchParams({ for: next.sewa, payment_id: res.razorpay_payment_id });
          if (monthly) thankYou.set("monthly", "1");
          window.location.assign(`/thank-you?${thankYou}`);
        },
        modal: {
          // Closing Razorpay without paying just returns to the form.
          ondismiss: () => setStage((s) => (s.kind === "processing" ? s : { kind: "idle" })),
        },
      });
      rzp.on("payment.failed", (res) =>
        setStage({ kind: "error", message: res.error?.description || "Payment failed. Please try again." }),
      );
      setStage({ kind: "idle" });
      rzp.open();
    } catch (err) {
      setStage({ kind: "error", message: err instanceof Error ? err.message : "Something went wrong." });
    }
  };

  const close = () => setStage({ kind: "idle" });

  const modal = stage.kind !== "idle" ? <StatusModal stage={stage} onClose={close} /> : null;

  return { start, modal };
}

/** "Please wait" while opening Razorpay or confirming, and payment errors. */
function StatusModal({ stage, onClose }: { stage: Exclude<Stage, { kind: "idle" }>; onClose: () => void }) {
  const busy = stage.kind === "processing";

  useEffect(() => {
    if (busy) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [busy, onClose]);

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/55 px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="donation-status-title"
      onClick={(e) => !busy && e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-md rounded-3xl bg-[#FFFDF9] p-6 text-center text-[#2C1810] shadow-2xl sm:p-8">
        {!busy && (
          <button type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 rounded-full p-1.5 text-[#7A6165] hover:bg-[#F3E7D3]">
            <X size={18} />
          </button>
        )}

        {stage.kind === "processing" && (
          <div className="py-6">
            <LoaderCircle className="mx-auto mb-4 animate-spin text-[#521623]" size={40} />
            <p id="donation-status-title" className="text-sm font-semibold text-[#521623]">Please wait…</p>
          </div>
        )}

        {stage.kind === "error" && (
          <div className="py-4">
            <XCircle className="mx-auto mb-4 text-red-600" size={48} />
            <h2 id="donation-status-title" className="font-serif text-xl font-bold text-[#521623]">Payment not completed</h2>
            <p role="alert" className="mt-3 text-sm leading-relaxed text-[#5A4448]">{stage.message}</p>
            <button type="button" onClick={onClose} className="mt-6 rounded-full bg-[#521623] px-8 py-2.5 text-sm font-bold text-white hover:bg-[#3B0910]">
              Try again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
