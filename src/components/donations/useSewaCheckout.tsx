"use client";

// Donate flow shared by the Shiksha / Annapurna / Nirman cards:
//   checkout.start({ sewa, amount, frequency })
//   → donor details popup → /api/razorpay/order|subscription
//   → Razorpay Checkout popup → /api/razorpay/verify → thank-you state.
// Render {checkout.modal} once anywhere in the page.

import { FormEvent, useEffect, useState } from "react";
import { CheckCircle2, Heart, LoaderCircle, LockKeyhole, X } from "lucide-react";
import { SEWAS, formatInr, type DonationFrequency, type SewaKey } from "@/lib/sewa";

type CheckoutRequest = { sewa: SewaKey; amount: number; frequency: DonationFrequency };
type Donor = { name: string; email: string; phone: string; pan: string };
type Stage =
  | { kind: "details"; error?: string }
  | { kind: "processing" }
  | { kind: "success"; paymentId?: string };

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
const DONOR_STORAGE_KEY = "sd-donor-details";

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
  const [request, setRequest] = useState<CheckoutRequest | null>(null);
  const [stage, setStage] = useState<Stage>({ kind: "details" });
  const [donor, setDonor] = useState<Donor>({ name: "", email: "", phone: "", pan: "" });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(DONOR_STORAGE_KEY);
      if (saved) setDonor((d) => ({ ...d, ...JSON.parse(saved) }));
    } catch {}
  }, []);

  const start = (next: CheckoutRequest) => {
    setRequest(next);
    setStage({ kind: "details" });
    loadCheckoutScript();
  };

  const close = () => {
    if (stage.kind !== "processing") setRequest(null);
  };

  const pay = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!request) return;
    setStage({ kind: "processing" });
    try {
      localStorage.setItem(DONOR_STORAGE_KEY, JSON.stringify({ name: donor.name, email: donor.email, phone: donor.phone }));
    } catch {}

    try {
      if (!(await loadCheckoutScript()) || !window.Razorpay) {
        throw new Error("Could not load the payment window. Check your connection and try again.");
      }
      const sewa = SEWAS[request.sewa];
      const monthly = request.frequency === "monthly";
      const payload = { sewa: request.sewa, amount: request.amount, donor };

      const created = monthly
        ? await postJson<{ keyId: string; subscriptionId: string }>("/api/razorpay/subscription", payload)
        : await postJson<{ keyId: string; orderId: string; amount: number; currency: string }>("/api/razorpay/order", payload);

      const rzp = new window.Razorpay({
        key: created.keyId,
        name: "Science Divine Foundation",
        description: `${sewa.label} – ${formatInr(request.amount)}${monthly ? " / month" : ""}`,
        image: "/favicon.ico",
        ...("subscriptionId" in created
          ? { subscription_id: created.subscriptionId }
          : { order_id: created.orderId, amount: created.amount, currency: created.currency }),
        prefill: { name: donor.name, email: donor.email, contact: donor.phone },
        notes: { sewa: request.sewa },
        theme: { color: "#521623" },
        handler: async (res: RazorpayResponse) => {
          setStage({ kind: "processing" });
          const verified = await postJson<{ paymentId?: string }>("/api/razorpay/verify", {
            kind: monthly ? "subscription" : "order",
            ...res,
          }).catch(() => ({ paymentId: res.razorpay_payment_id }));
          setStage({ kind: "success", paymentId: verified.paymentId ?? res.razorpay_payment_id });
        },
        modal: {
          ondismiss: () =>
            setStage((s) => (s.kind === "success" ? s : { kind: "details", error: "Payment was cancelled. You can try again." })),
        },
      });
      rzp.on("payment.failed", (res) =>
        setStage({ kind: "details", error: res.error?.description || "Payment failed. Please try again." }),
      );
      rzp.open();
    } catch (err) {
      setStage({ kind: "details", error: err instanceof Error ? err.message : "Something went wrong." });
    }
  };

  const modal = request ? (
    <DonorModal
      request={request}
      stage={stage}
      donor={donor}
      onDonorChange={setDonor}
      onSubmit={pay}
      onClose={close}
    />
  ) : null;

  return { start, modal };
}

const inputClass =
  "w-full rounded-xl border border-[#E8D6B5] bg-white px-4 py-2.5 text-sm text-[#2C1810] placeholder:text-[#A08A7E] focus:border-[#521623] focus:outline-none focus:ring-2 focus:ring-[#521623]/15";

function DonorModal({
  request,
  stage,
  donor,
  onDonorChange,
  onSubmit,
  onClose,
}: {
  request: CheckoutRequest;
  stage: Stage;
  donor: Donor;
  onDonorChange: (d: Donor) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}) {
  const monthly = request.frequency === "monthly";
  const sewa = SEWAS[request.sewa];
  const busy = stage.kind === "processing";
  const field = (key: keyof Donor) => ({
    value: donor[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onDonorChange({ ...donor, [key]: e.target.value }),
    disabled: busy,
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/55 px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="donor-modal-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative max-h-full w-full max-w-md overflow-y-auto rounded-3xl bg-[#FFFDF9] p-6 text-[#2C1810] shadow-2xl sm:p-8">
        {!busy && (
          <button type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 rounded-full p-1.5 text-[#7A6165] hover:bg-[#F3E7D3]">
            <X size={18} />
          </button>
        )}

        {stage.kind === "success" ? (
          <div className="py-4 text-center">
            <CheckCircle2 className="mx-auto mb-4 text-green-600" size={52} />
            <h2 id="donor-modal-title" className="font-serif text-2xl font-bold text-[#521623]">Thank you, {donor.name.split(" ")[0]}!</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#5A4448]">
              {monthly
                ? `Your monthly auto-pay of ${formatInr(request.amount)} for ${sewa.label} is set up. It will be charged automatically every month — you can cancel anytime by writing to us.`
                : `Your contribution of ${formatInr(request.amount)} to ${sewa.label} has been received.`}
            </p>
            <p className="mt-2 text-xs text-[#7A6165]">A receipt has been sent to {donor.email}.</p>
            {stage.paymentId && <p className="mt-3 font-mono text-xs text-[#7A6165]">Payment ID: {stage.paymentId}</p>}
            <button type="button" onClick={onClose} className="mt-6 rounded-full bg-[#521623] px-8 py-2.5 text-sm font-bold text-white hover:bg-[#3B0910]">
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-3.5">
            <div className="text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B8860B]">{sewa.label}</p>
              <h2 id="donor-modal-title" className="mt-1 font-serif text-2xl font-bold text-[#521623]">
                {formatInr(request.amount)}
                {monthly && <span className="text-base font-semibold"> / month</span>}
              </h2>
              <p className="mt-1 text-xs text-[#7A6165]">
                {monthly ? "Monthly auto-pay via UPI Autopay or card mandate" : "One-time contribution"}
              </p>
            </div>

            <input {...field("name")} className={inputClass} placeholder="Full name *" autoComplete="name" required minLength={2} />
            <input {...field("email")} className={inputClass} placeholder="Email *" type="email" autoComplete="email" required />
            <input {...field("phone")} className={inputClass} placeholder="Mobile number *" type="tel" inputMode="tel" autoComplete="tel" required pattern="[0-9+ ]{10,15}" title="10-digit Indian mobile number" />
            <input {...field("pan")} className={`${inputClass} uppercase`} placeholder="PAN (optional, for 80G receipt)" maxLength={10} pattern="[A-Za-z]{5}[0-9]{4}[A-Za-z]" title="PAN format: ABCDE1234F" />

            {stage.kind === "details" && stage.error && (
              <p role="alert" className="rounded-xl bg-red-50 px-3 py-2 text-xs font-medium text-red-700">{stage.error}</p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#5E1522] to-[#7B1E2E] py-3 text-sm font-bold tracking-wide text-white shadow-lg transition hover:from-[#4A0E17] hover:to-[#5E1522] disabled:opacity-70"
            >
              {busy ? <LoaderCircle className="animate-spin" size={17} /> : <LockKeyhole size={16} />}
              {busy ? "PLEASE WAIT…" : monthly ? "SET UP MONTHLY AUTO-PAY" : "PROCEED TO PAY"}
            </button>
            <p className="flex items-center justify-center gap-1.5 text-[11px] text-[#7A6165]">
              <Heart size={12} className="text-[#B8860B]" /> Secured by Razorpay · 80G tax benefit available
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
