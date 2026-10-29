"use client";

import { useEffect, useId, useState } from "react";
import { ArrowRight, Check, CreditCard, Heart, LockKeyhole, ShieldCheck } from "lucide-react";
import { cleanDonor, donorError, useSewaCheckout, type Donor } from "@/components/donations/useSewaCheckout";
import { MIN_MONTHLY_DONATION, SEWAS, type DonationFrequency, type SewaKey } from "@/lib/sewa";
import styles from "./DonationForm.module.css";

const PRESET_AMOUNTS = [500, 1100, 2100, 3100, 11000, 21000] as const;

export type DonationFormProps = {
  /** Which sewa's table the payment is recorded in (see src/lib/sewa.ts). */
  sewa: SewaKey;
  id?: string;
  title?: string;
  subtitle?: string;
  trustMessage?: string;
  className?: string;
};

export function DonationForm({
  sewa,
  id,
  title = "Make a Contribution",
  subtitle = "Be a part of this sacred initiative and help create a lasting legacy.",
  trustMessage = "Support a Lasting Legacy",
  className = "",
}: DonationFormProps) {
  const inputId = useId();
  const checkout = useSewaCheckout();
  const offersMonthly = Boolean(SEWAS[sewa].subscriptionsTable);
  const [frequency, setFrequency] = useState<DonationFrequency>("one_time");
  // Presets write into the amount box, so the donor can also type any amount.
  const [amountInput, setAmountInput] = useState("1100");
  const [error, setError] = useState("");
  const [opening, setOpening] = useState(false);
  const [donor, setDonor] = useState<Donor>({ name: "", email: "", phone: "" });
  const amount = Number(amountInput);
  const monthly = frequency === "monthly";
  const formattedAmount = amount > 0 ? amount.toLocaleString("en-IN") : "—";

  // Coming back from the Razorpay page via Back restores this page from cache.
  useEffect(() => {
    const reset = () => setOpening(false);
    window.addEventListener("pageshow", reset);
    return () => window.removeEventListener("pageshow", reset);
  }, []);

  const choosePreset = (value: number) => {
    setAmountInput(String(value));
    setError("");
  };

  const startCheckout = async () => {
    const minimum = monthly ? MIN_MONTHLY_DONATION : 1;
    if (!Number.isSafeInteger(amount) || amount < minimum) {
      setError(`Enter a valid contribution amount of at least ₹${minimum}.`);
      return;
    }
    const detailsError = donorError(donor);
    if (detailsError) {
      setError(detailsError);
      return;
    }
    setError("");
    const details = cleanDonor(donor);

    // Sewas with their own Razorpay Payment Page open it with the amount
    // prefilled; the webhook records the payment. Otherwise pay on-site.
    if (!monthly && SEWAS[sewa].paymentPageEnv) {
      setOpening(true);
      try {
        const query = new URLSearchParams({ sewa, amount: String(amount), ...details });
        const res = await fetch(`/api/razorpay/payment-page?${query}`);
        const { url } = (await res.json()) as { url: string | null };
        if (url) {
          window.location.assign(url);
          return;
        }
      } catch {
        // Fall through to on-site checkout.
      }
      setOpening(false);
    }
    checkout.start({ sewa, amount, frequency, donor: details });
  };

  return (
    <section id={id} className={`${styles.shell} ${className}`} aria-labelledby={`${inputId}-title`}>
      <div className={styles.cornerLotus} aria-hidden="true">✦</div>
      <header className={styles.header}>
        <span>Make a difference</span>
        <h2 id={`${inputId}-title`}>{title}</h2>
        <p>{subtitle}</p>
      </header>

      {offersMonthly && (
        <div className={styles.typeToggle} role="group" aria-label="Contribution type">
          {([
            ["one_time", "One-time"],
            ["monthly", "Monthly Auto-pay"],
          ] as const).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={frequency === value}
              className={frequency === value ? styles.typeActive : ""}
              onClick={() => {
                setFrequency(value);
                setError("");
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <fieldset className={styles.amountFieldset}>
        <legend>Select or enter contribution amount (₹)</legend>
        <div className={styles.amountGrid}>
          {PRESET_AMOUNTS.map((value) => {
            const active = amount === value;
            return (
              <button key={value} type="button" className={`${styles.amountButton} ${active ? styles.active : ""}`} aria-pressed={active} onClick={() => choosePreset(value)}>
                <span className={styles.miniLotus} aria-hidden="true">♧</span>
                <strong>₹{value.toLocaleString("en-IN")}</strong>
                {active && <Check className={styles.check} size={15} aria-hidden="true" />}
              </button>
            );
          })}
        </div>
        <label className={`${styles.customField} ${!PRESET_AMOUNTS.includes(amount as never) ? styles.customActive : ""}`} htmlFor={inputId}>
          <span aria-hidden="true">₹</span>
          <input
            id={inputId}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={amountInput}
            onChange={(event) => {
              setAmountInput(event.target.value.replace(/[^0-9]/g, ""));
              setError("");
            }}
            placeholder="Enter amount of your choice"
            aria-describedby={`${inputId}-selection ${inputId}-error`}
          />
        </label>
      </fieldset>

      <div className={styles.donorFields}>
        {([
          ["name", "Full name *", "text", "name"],
          ["email", "Email *", "email", "email"],
          ["phone", "Mobile number *", "tel", "tel"],
        ] as const).map(([key, placeholder, type, autoComplete]) => (
          <input
            key={key}
            type={type}
            inputMode={key === "phone" ? "tel" : undefined}
            autoComplete={autoComplete}
            placeholder={placeholder}
            aria-label={placeholder.replace(" *", "")}
            value={donor[key]}
            onChange={(event) => {
              setDonor({ ...donor, [key]: event.target.value });
              setError("");
            }}
          />
        ))}
      </div>
      <p id={`${inputId}-selection`} className={styles.selection} aria-live="polite">
        Selected contribution: <strong>₹{formattedAmount}{monthly ? " / month" : ""}</strong>
        {monthly && <><br />Charged automatically every month via UPI Autopay or card. Cancel anytime.</>}
      </p>
      <p id={`${inputId}-error`} className={styles.error} role="alert">{error}</p>
      <button type="button" className={styles.donateButton} onClick={startCheckout} disabled={opening}>
        <LockKeyhole size={18} aria-hidden="true" />
        <span>
          {opening
            ? "Opening secure payment page…"
            : monthly
              ? `Start ₹${formattedAmount} / month auto-pay`
              : "Donate securely"}
        </span>
        <ArrowRight size={19} aria-hidden="true" />
      </button>
      <div className={styles.trustGrid} aria-label="Payment assurances">
        <span><ShieldCheck aria-hidden="true" /><b>Secure Payments</b></span>
        <span><CreditCard aria-hidden="true" /><b>Instant Confirmation</b></span>
        <span><Heart aria-hidden="true" /><b>{trustMessage}</b></span>
      </div>
      {checkout.modal}
    </section>
  );
}
