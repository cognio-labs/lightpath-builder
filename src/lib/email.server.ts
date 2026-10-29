// Server-only: sends email through Resend's REST API (RESEND_API_KEY).
// Never throws — a mail problem must not fail a payment or a webhook.

const DEFAULT_FROM = "Science Divine Foundation <donations@sciencedivine.org>";

type Email = { to: string; subject: string; html: string; text: string };

export async function sendEmail({ to, subject, html, text }: Email) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !to) return false;

  // Optional: a team inbox that gets a copy of every donor email.
  const bcc = process.env.DONATION_NOTIFY_EMAIL?.trim();

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_FROM,
        to: [to],
        ...(bcc ? { bcc: [bcc] } : {}),
        ...(process.env.RESEND_REPLY_TO?.trim() ? { reply_to: process.env.RESEND_REPLY_TO.trim() } : {}),
        subject,
        html,
        text,
      }),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("[email] Resend rejected the email:", res.status, await res.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (err) {
    console.error("[email] Could not reach Resend:", err);
    return false;
  }
}
