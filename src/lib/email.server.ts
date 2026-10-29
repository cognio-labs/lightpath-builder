// Server-only: sends email through Resend's REST API (RESEND_API_KEY).
// Never throws — a mail problem must not fail a payment or a webhook.

// Fixed sender: must be on the domain verified in Resend (science-divine.org).
const FROM = "Science Divine Foundation <donations@science-divine.org>";

type Email = {
  /** One address, or several separated by commas. */
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string | null;
  /** Internal team emails skip the DONATION_NOTIFY_EMAIL copy. */
  internal?: boolean;
};

export async function sendEmail({ to, subject, html, text, replyTo, internal = false }: Email) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipients = to.split(",").map((a) => a.trim()).filter(Boolean);
  if (!apiKey || !recipients.length) return false;

  // Optional: a team inbox that gets a copy of every donor email.
  const bcc = internal ? undefined : process.env.DONATION_NOTIFY_EMAIL?.trim();
  const reply = replyTo?.trim() || process.env.RESEND_REPLY_TO?.trim();

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to: recipients,
        ...(bcc ? { bcc: [bcc] } : {}),
        ...(reply ? { reply_to: reply } : {}),
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
