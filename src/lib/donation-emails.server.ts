// Server-only: donor emails for sewa donations (receipts and failures).
// Called from src/lib/donations.server.ts only when a payment's state actually
// changes, so a payment reported by both /verify and the webhook mails once.
import { sendEmail } from "@/lib/email.server";
import { SEWAS, formatInr, type SewaKey } from "@/lib/sewa";

const SITE_URL = (process.env.SITE_URL || "https://sciencedivine.org").replace(/\/$/, "");
const CONTACT_EMAIL = "info@sciencedivine.org";

type Donor = { name?: string | null; email?: string | null };

export type ReceiptKind = "one_time" | "monthly_first" | "monthly_renewal";

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const firstName = (name?: string | null) => (name?.trim().split(/\s+/)[0] || "Friend");

const istDate = (iso?: string | null) =>
  new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "long" }).format(
    iso ? new Date(iso) : new Date(),
  );

function layout(title: string, bodyHtml: string) {
  return `<!doctype html>
<html><body style="margin:0;background:#f7f3ec;font-family:Arial,Helvetica,sans-serif;color:#2c1810">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f3ec;padding:24px 12px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e8d6b5">
        <tr><td style="background:#521623;padding:22px 28px;color:#f3c761;font:bold 20px Georgia,serif">Science Divine Foundation</td></tr>
        <tr><td style="padding:28px">
          <h1 style="margin:0 0 16px;font:bold 22px Georgia,serif;color:#521623">${escapeHtml(title)}</h1>
          ${bodyHtml}
        </td></tr>
        <tr><td style="padding:18px 28px;background:#fffaf0;border-top:1px solid #eadbc2;font-size:12px;color:#7a6165">
          Questions? Write to <a href="mailto:${CONTACT_EMAIL}" style="color:#521623">${CONTACT_EMAIL}</a>.<br>
          <a href="${SITE_URL}" style="color:#521623">sciencedivine.org</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function detailsTable(rows: [string, string][]) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin:18px 0;border-collapse:collapse;font-size:14px">
    ${rows
      .map(
        ([label, value]) =>
          `<tr><td style="padding:8px 0;border-bottom:1px solid #f0e6d6;color:#7a6165">${escapeHtml(label)}</td><td style="padding:8px 0;border-bottom:1px solid #f0e6d6;text-align:right;font-weight:bold">${escapeHtml(value)}</td></tr>`,
      )
      .join("")}
  </table>`;
}

const button = (href: string, label: string) =>
  `<p style="margin:22px 0 0"><a href="${href}" style="display:inline-block;background:#521623;color:#ffffff;text-decoration:none;font-weight:bold;padding:12px 26px;border-radius:999px">${escapeHtml(label)}</a></p>`;

/** Successful payment: one-time, first monthly charge, or a later monthly charge. */
export async function sendDonationReceipt(args: {
  sewa: SewaKey;
  donor: Donor;
  amount: number;
  kind: ReceiptKind;
  paymentId: string;
  paidAt?: string | null;
  method?: string | null;
  nextChargeAt?: string | null;
}) {
  const { sewa, donor, amount, kind, paymentId } = args;
  if (!donor.email) return;
  const label = SEWAS[sewa].label;
  const name = escapeHtml(firstName(donor.name));

  const title =
    kind === "monthly_first"
      ? `Your monthly support for ${label} has begun`
      : kind === "monthly_renewal"
        ? `Your monthly donation to ${label} was received`
        : `Thank you for supporting ${label}`;

  const intro =
    kind === "monthly_first"
      ? `Dear ${name},<br><br>Thank you for becoming a monthly supporter of <strong>${escapeHtml(label)}</strong>. Your auto-pay of <strong>${formatInr(amount)} every month</strong> is now active, and your first payment has been received.`
      : kind === "monthly_renewal"
        ? `Dear ${name},<br><br>Your monthly auto-pay donation of <strong>${formatInr(amount)}</strong> to <strong>${escapeHtml(label)}</strong> was received. Thank you for your continued support.`
        : `Dear ${name},<br><br>We have received your contribution of <strong>${formatInr(amount)}</strong> to <strong>${escapeHtml(label)}</strong>. Your generosity makes a real difference.`;

  const rows: [string, string][] = [
    ["Sewa", label],
    ["Amount", `${formatInr(amount)}${kind === "one_time" ? "" : " / month"}`],
    ["Date", istDate(args.paidAt)],
    ["Payment ID", paymentId],
  ];
  if (args.method) rows.push(["Paid via", args.method.toUpperCase()]);
  if (kind !== "one_time" && args.nextChargeAt) rows.push(["Next payment", istDate(args.nextChargeAt)]);

  const monthlyNote =
    kind === "one_time"
      ? ""
      : `<p style="font-size:13px;color:#5a4448;line-height:1.6">This amount is charged automatically every month through your UPI Autopay or card mandate. You can pause or cancel it anytime from your UPI app or bank, or by writing to us.</p>`;

  const html = layout(
    title,
    `<p style="font-size:15px;line-height:1.6;margin:0">${intro}</p>
     ${detailsTable(rows)}
     ${monthlyNote}
     <p style="font-size:13px;color:#5a4448;line-height:1.6">Donations are eligible for tax benefit under Section 80G. To receive your 80G receipt, reply to this email with your PAN.</p>`,
  );

  const text = [
    `Dear ${firstName(donor.name)},`,
    "",
    title,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    kind === "one_time" ? "" : "This amount is charged automatically every month. You can cancel anytime from your UPI app or bank, or by writing to us.",
    "For your 80G receipt, reply to this email with your PAN.",
    "",
    `Science Divine Foundation — ${CONTACT_EMAIL}`,
  ].join("\n");

  await sendEmail({ to: donor.email, subject: title, html, text });
}

/** Failed payment: a one-time attempt, or a monthly auto-pay charge. */
export async function sendPaymentFailed(args: {
  sewa: SewaKey;
  donor: Donor;
  amount: number;
  monthly: boolean;
  reason?: string | null;
}) {
  const { sewa, donor, amount, monthly } = args;
  if (!donor.email) return;
  const label = SEWAS[sewa].label;
  const name = escapeHtml(firstName(donor.name));
  const retryUrl = `${SITE_URL}${SEWAS[sewa].donatePath}`;

  const title = monthly
    ? `Your monthly donation to ${label} could not be charged`
    : `Your donation to ${label} did not go through`;

  const intro = monthly
    ? `Dear ${name},<br><br>We tried to collect your monthly auto-pay donation of <strong>${formatInr(amount)}</strong> to <strong>${escapeHtml(label)}</strong>, but the payment did not go through. Razorpay will retry automatically. If it keeps failing, please check your UPI Autopay or card mandate, or set up your monthly donation again.`
    : `Dear ${name},<br><br>Your payment of <strong>${formatInr(amount)}</strong> to <strong>${escapeHtml(label)}</strong> could not be completed. <strong>No money has been taken</strong> — if any amount was debited, it will be refunded automatically by your bank.`;

  const rows: [string, string][] = [
    ["Sewa", label],
    ["Amount", `${formatInr(amount)}${monthly ? " / month" : ""}`],
  ];
  if (args.reason) rows.push(["Reason", args.reason]);

  const html = layout(
    title,
    `<p style="font-size:15px;line-height:1.6;margin:0">${intro}</p>
     ${detailsTable(rows)}
     ${monthly ? "" : `<p style="font-size:13px;color:#5a4448;line-height:1.6">If you retried and your payment went through, you will receive a separate receipt — you can ignore this email.</p>`}
     ${button(retryUrl, monthly ? "Set up monthly donation again" : "Try again")}`,
  );

  const text = [
    `Dear ${firstName(donor.name)},`,
    "",
    title,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    monthly
      ? "Razorpay will retry automatically."
      : "No money has been taken. If you retried and your payment went through, you will receive a separate receipt.",
    `Try again: ${retryUrl}`,
    "",
    `Science Divine Foundation — ${CONTACT_EMAIL}`,
  ].join("\n");

  await sendEmail({ to: donor.email, subject: title, html, text });
}
