"use client";

import Image from "next/image";
import { useState } from "react";
import { loadRazorpay, type RazorpaySuccess } from "@/lib/razorpay-client";
import { sewaContent } from "./sewa-content";
import styles from "./sewa.module.css";

const amounts = [500, 1100, 2100, 5100, 11000, 21000];
const money = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;

export default function SewaLanding({ initiative }: { initiative: keyof typeof sewaContent }) {
  const data = sewaContent[initiative];
  const [selected, setSelected] = useState(1100);
  const [custom, setCustom] = useState("");
  const [shareStatus, setShareStatus] = useState("");
  const [shareFallback, setShareFallback] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "loading" | "success">("idle");
  const amount = custom ? Number(custom) : selected;
  const valid = Number.isSafeInteger(amount) && amount >= 1 && amount <= 10_000_000;
  const assets = `/images/${data.slug}`;
  const email = (subject: string, body: string) => `mailto:info@sciencedivine.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const volunteer = email(`Volunteering for ${data.name}`, `Hello Science Divine Foundation,\n\nI would like to volunteer for ${data.name}. Please share the available opportunities and how I can get involved.\n\nThank you.`);

  async function startCheckout() {
    if (paymentStatus === "loading") return;
    if (!valid) {
      setPaymentError("Enter a valid contribution amount between ₹1 and ₹1,00,00,000.");
      return;
    }

    setPaymentError("");
    setPaymentStatus("loading");
    try {
      const orderResponse = await fetch("/api/razorpay/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, purpose: `${data.name} contribution` }),
      });
      const order = await orderResponse.json() as {
        error?: string;
        keyId?: string;
        orderId?: string;
        amount?: number;
        currency?: string;
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
        description: `${data.name} contribution`,
        order_id: order.orderId,
        theme: { color: "#651522" },
        modal: { ondismiss: () => setPaymentStatus("idle"), confirm_close: true },
        handler: async (payment: RazorpaySuccess) => {
          try {
            const verifyResponse = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payment),
            });
            const result = await verifyResponse.json() as { verified?: boolean; error?: string };
            if (!verifyResponse.ok || !result.verified) throw new Error(result.error || "Payment verification failed.");
            setPaymentStatus("success");
          } catch (verificationError) {
            setPaymentStatus("idle");
            setPaymentError(verificationError instanceof Error ? verificationError.message : "Payment verification failed. Contact us with your payment ID.");
          }
        },
      });
      checkout.on("payment.failed", (response) => {
        setPaymentStatus("idle");
        setPaymentError(response.error?.description || "The payment was not completed. Please try again.");
      });
      checkout.open();
    } catch (checkoutError) {
      setPaymentStatus("idle");
      setPaymentError(checkoutError instanceof Error ? checkoutError.message : "Unable to start secure checkout.");
    }
  }

  async function share() {
    const url = `${window.location.origin}/${data.slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setShareStatus("Page link copied!");
      setShareFallback("");
    } catch {
      setShareStatus("Copy this link to share the initiative.");
      setShareFallback(url);
    }
  }

  return <div className={`${styles.page} sewa-page`}>
    <section className={styles.hero} style={{ backgroundImage: `url('${assets}/hero.webp')` }}>
      <div className={styles.heroInner}>
        <p className={styles.eyebrow}>A SCIENCE DIVINE FOUNDATION INITIATIVE</p>
        <h1><span lang="hi" className={styles.hindi}>{data.hindi}</span><span>{data.name}</span></h1>
        <p className={styles.tagline}>{data.tagline}</p>
        <p className={styles.intro}>{data.intro}</p>
        <a className={styles.goldButton} href="#contribution">Donate Now</a>
      </div>
    </section>

    <div className={styles.pillars}>{data.pillars.map(pillar => <span key={pillar}>{pillar}</span>)}</div>

    <section className={styles.visionSection} aria-label="Our vision and contribution">
      <div className={styles.visionCard}>
        <div className={styles.visionCopy}><p className={styles.eyebrow}>OUR VISION</p><h2>{data.visionTitle}</h2><p>{data.vision}</p><a href="#support">See what your support can provide</a></div>
        <div className={styles.visionImage}><Image src={`${assets}/vision.webp`} alt={data.visionAlt} fill sizes="(max-width: 650px) 100vw, 30vw" /></div>
      </div>
      <form id="contribution" className={styles.contribution} onSubmit={event => { event.preventDefault(); void startCheckout(); }}>
        <p className={styles.eyebrow}>SUPPORT {data.name.toUpperCase()}</p>
        <h2>Make a Contribution</h2><p>Choose an amount or enter your own.</p>
        <fieldset><legend>Contribution amount (₹)</legend><div className={styles.amounts}>{amounts.map(value => <button key={value} type="button" aria-pressed={!custom && selected === value} onClick={() => { setSelected(value); setCustom(""); setPaymentError(""); setPaymentStatus("idle"); }}>{money(value)}</button>)}</div></fieldset>
        <label className={styles.srOnly} htmlFor="custom-amount">Enter a custom amount in rupees</label>
        <input id="custom-amount" type="number" inputMode="numeric" min="1" step="1" placeholder="Enter a custom amount" value={custom} onChange={event => { setCustom(event.target.value); setPaymentError(""); setPaymentStatus("idle"); }} aria-describedby="selected-amount" />
        <p id="selected-amount" className={styles.selected} aria-live="polite">{valid ? `Selected contribution ${money(amount)}` : "Enter a whole rupee amount between ₹1 and ₹1,00,00,000."}</p>
        {paymentError && <p className={styles.paymentError} role="alert">{paymentError}</p>}
        <button className={styles.enquire} type="submit" disabled={!valid || paymentStatus === "loading"}>{paymentStatus === "loading" ? "Opening Secure Checkout…" : paymentStatus === "success" ? "Payment Verified" : "Donate Securely"}</button>
        <p className={styles.note}>{data.note}</p>
      </form>
    </section>

    <section id="support" className={styles.support}>
      <div className={styles.container}><p className={styles.eyebrow}>WHERE YOUR SUPPORT GOES</p><h2>What your contribution can provide</h2>
        <div className={styles.cards}>{data.support.map((card, index) => <article key={card.title} className={styles.supportCard}>
          <Image src={`${assets}/support-${index + 1}.webp`} width={467} height={238} alt={card.alt} sizes="(max-width: 650px) 100vw, 33vw" />
          <div><h3>{card.title}</h3><p>{card.text}</p></div>
        </article>)}</div>
      </div>
    </section>

    <section className={styles.involved}><div className={styles.container}><p className={styles.eyebrow}>GET INVOLVED</p><h2>Three ways to support {data.name}</h2>
      <div className={styles.cards}>
        <a className={styles.actionCard} href="#contribution"><h3>Make a Contribution</h3><p>{data.contribution}</p></a>
        <a className={styles.actionCard} href={volunteer}><h3>Volunteer Your Time</h3><p>Ask the Foundation about volunteering opportunities.</p></a>
        <button type="button" className={styles.actionCard} onClick={share}><h3>Share the Initiative</h3><p>{data.share}</p></button>
      </div>
      <p role="status" className={styles.shareStatus}>{shareStatus}</p>
      {shareFallback && <input className={styles.shareLink} aria-label="Page link to copy" readOnly value={shareFallback} onFocus={event => event.target.select()} />}
    </div></section>

    <section className={styles.faq}><div className={styles.container}><h2>Frequently Asked Questions</h2><div className={styles.faqGrid}>
      {[
        [`What is ${data.name}?`, data.faqIntro],
        ["Can I choose my contribution amount?", "Yes. Select a suggested amount or enter a custom amount, then send an enquiry to the Foundation for donation instructions."],
        [data.faqQuestion, data.faqAnswer],
        ["How can I volunteer?", "Use the volunteer link above to contact the Foundation and ask about available opportunities."],
      ].map(([question, answer]) => <article key={question}><h3>{question}</h3><p>{answer}</p></article>)}
    </div></div></section>

    <section className={styles.closing} style={{ backgroundImage: `url('${assets}/footer.webp')` }}><h2>{data.closing}</h2><a className={styles.goldButton} href="#contribution">Support {data.name}</a></section>
  </div>;
}
