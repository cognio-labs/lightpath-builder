"use client";

import { useId, useState } from "react";
import { ArrowRight, Check, CreditCard, Heart, LockKeyhole, ShieldCheck } from "lucide-react";
import styles from "./DonationForm.module.css";

const PRESET_AMOUNTS = [500, 1100, 2100, 3100, 11000, 21000] as const;

type RazorpaySuccess = { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string };
type RazorpayFailure = { error?: { description?: string } };
type RazorpayInstance = {
  open: () => void;
  on: (event: "payment.failed", callback: (response: RazorpayFailure) => void) => void;
};

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => RazorpayInstance;
  }
}

export type DonationFormProps = {
  id?: string;
  title?: string;
  subtitle?: string;
  purpose?: string;
  trustMessage?: string;
  className?: string;
};

let razorpayScriptPromise: Promise<void> | null = null;

function loadRazorpay() {
  if (typeof window === "undefined") return Promise.reject(new Error("Checkout is unavailable."));
  if (window.Razorpay) return Promise.resolve();
  if (razorpayScriptPromise) return razorpayScriptPromise;
  razorpayScriptPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Secure checkout could not be loaded. Please try again."));
    document.head.appendChild(script);
  });
  return razorpayScriptPromise;
}

export function DonationForm({
  id,
  title = "Make a Contribution",
  subtitle = "Be a part of this sacred initiative and help create a lasting legacy.",
  purpose = "Science Divine initiatives",
  trustMessage = "Support a Lasting Legacy",
  className = "",
}: DonationFormProps) {
  const inputId = useId();
  const [selected, setSelected] = useState<number | "custom">(1100);
  const [customAmount, setCustomAmount] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const amount = selected === "custom" ? Number(customAmount) : selected;
  const formattedAmount = Number.isFinite(amount) && amount > 0 ? amount.toLocaleString("en-IN") : "—";

  const choosePreset = (value: number) => {
    setSelected(value);
    setCustomAmount("");
    setError("");
    setStatus("idle");
  };

  const handleCustomAmount = (value: string) => {
    setSelected("custom");
    setCustomAmount(value.replace(/[^0-9]/g, ""));
    setError("");
    setStatus("idle");
  };

  const startCheckout = async () => {
    if (status === "loading") return;
    if (!Number.isSafeInteger(amount) || amount < 1) {
      setError("Enter a valid contribution amount of at least ₹1.");
      return;
    }
    setError("");
    setStatus("loading");
    try {
      const orderResponse = await fetch("/api/razorpay/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, purpose }),
      });
      const order = await orderResponse.json() as {
        error?: string; keyId?: string; orderId?: string; amount?: number; currency?: string;
      };
      if (!orderResponse.ok || !order.keyId || !order.orderId || !order.amount) {
        throw new Error(order.error || "Unable to start secure checkout.");
      }

      await loadRazorpay();
      if (!window.Razorpay) throw new Error("Secure checkout is unavailable.");
      const checkout = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency || "INR",
        name: "Science Divine Foundation",
        description: purpose,
        order_id: order.orderId,
        theme: { color: "#651522" },
        modal: { ondismiss: () => setStatus("idle"), confirm_close: true },
        handler: async (payment: RazorpaySuccess) => {
          try {
            const verifyResponse = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payment),
            });
            const result = await verifyResponse.json() as { verified?: boolean; error?: string };
            if (!verifyResponse.ok || !result.verified) throw new Error(result.error || "Payment verification failed.");
            setStatus("success");
          } catch (verificationError) {
            setStatus("idle");
            setError(verificationError instanceof Error ? verificationError.message : "Payment verification failed. Contact us with your payment ID.");
          }
        },
      });
      checkout.on("payment.failed", (response) => {
        setStatus("idle");
        setError(response.error?.description || "The payment was not completed. Please try again.");
      });
      checkout.open();
    } catch (checkoutError) {
      setStatus("idle");
      setError(checkoutError instanceof Error ? checkoutError.message : "Unable to start secure checkout.");
    }
  };

  return (
    <section id={id} className={`${styles.shell} ${className}`} aria-labelledby={`${inputId}-title`}>
      <div className={styles.cornerLotus} aria-hidden="true">✦</div>
      <header className={styles.header}>
        <span>Make a difference</span>
        <h2 id={`${inputId}-title`}>{title}</h2>
        <p>{subtitle}</p>
      </header>

      <fieldset className={styles.amountFieldset}>
        <legend>Select or enter contribution amount (₹)</legend>
        <div className={styles.amountGrid}>
          {PRESET_AMOUNTS.map((value) => {
            const active = selected === value;
            return (
              <button key={value} type="button" className={`${styles.amountButton} ${active ? styles.active : ""}`} aria-pressed={active} onClick={() => choosePreset(value)}>
                <span className={styles.miniLotus} aria-hidden="true">♧</span>
                <strong>₹{value.toLocaleString("en-IN")}</strong>
                {active && <Check className={styles.check} size={15} aria-hidden="true" />}
              </button>
            );
          })}
        </div>
        <label className={`${styles.customField} ${selected === "custom" ? styles.customActive : ""}`} htmlFor={inputId}>
          <span aria-hidden="true">₹</span>
          <input id={inputId} type="text" inputMode="numeric" autoComplete="off" value={customAmount} onFocus={() => setSelected("custom")} onChange={(event) => handleCustomAmount(event.target.value)} placeholder="Enter amount of your choice" aria-describedby={`${inputId}-selection ${inputId}-error`} />
        </label>
      </fieldset>
      <p id={`${inputId}-selection`} className={styles.selection} aria-live="polite">Selected contribution: <strong>₹{formattedAmount}</strong></p>
      <p id={`${inputId}-error`} className={styles.error} role="alert">{error}</p>
      <button type="button" className={styles.donateButton} onClick={startCheckout} disabled={status === "loading"}>
        <LockKeyhole size={18} aria-hidden="true" />
        <span>{status === "loading" ? "Opening secure checkout…" : status === "success" ? "Payment verified" : "Donate securely"}</span>
        {status === "success" ? <Check size={19} aria-hidden="true" /> : <ArrowRight size={19} aria-hidden="true" />}
      </button>
      <div className={styles.trustGrid} aria-label="Payment assurances">
        <span><ShieldCheck aria-hidden="true" /><b>Secure Payments</b></span>
        <span><CreditCard aria-hidden="true" /><b>Instant Confirmation</b></span>
        <span><Heart aria-hidden="true" /><b>{trustMessage}</b></span>
      </div>
    </section>
  );
}
