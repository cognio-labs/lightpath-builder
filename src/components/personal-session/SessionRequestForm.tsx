"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { submitForm } from "@/lib/admin.functions";
import { GoldSubmitButton } from "./ui";

const inputClass =
  "w-full rounded-xl border border-cream-300 bg-cream-50 px-4 py-3 text-[13px] text-ink-900 placeholder:text-ink-500/70 transition-colors focus:border-gold-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold-300/30";

/** Name / email / mobile fields that file a "book_session" request and go to /thank-you. */
export default function SessionRequestForm({
  source,
  submitLabel,
  autoFocus = false,
}: {
  source: string;
  submitLabel: string;
  autoFocus?: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    const fd = new FormData(e.currentTarget);
    try {
      await submitForm({
        type: "book_session",
        name: String(fd.get("name") ?? ""),
        email: String(fd.get("email") ?? ""),
        phone: String(fd.get("phone") ?? ""),
        message: source,
      });
      router.push("/thank-you");
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
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
        {busy ? "Sending…" : submitLabel}
      </GoldSubmitButton>
    </form>
  );
}
