"use client";

import { useState, type FormEvent } from "react";
import {
  CheckCircle2,
  Download,
  MessageCircle,
  Sparkles,
  Loader2,
  Minus,
  Plus,
  Users,
} from "lucide-react";
import { EVENT_CONFIG } from "@/lib/mahotsav/event";
import { normaliseWhatsAppNumber } from "@/lib/mahotsav/phone";

/** One pass covers at most this many people. */
const MAX_ATTENDEES = 5;

interface RegistrationSuccess {
  referenceId: string;
  emailSent: boolean;
  whatsappSent: boolean;
  passUrl: string | null;
  passImage: string | null;
  fullName: string;
  email: string;
  mobile: string;
  city: string;
  attendees: number;
}

const inputCls =
  "mt-2 w-full rounded-xl border border-[#E8D8BC] bg-[#FDF8EF] px-4 py-3 text-sm text-[#261812] placeholder:text-[#9C8677] focus:border-[#5E1216] focus:bg-[#FFFCF6] focus:outline-none focus:ring-2 focus:ring-[#D49635]/30";
const labelCls =
  "block text-xs font-bold uppercase tracking-[0.12em] text-[#5E1216]";

export function RegistrationForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [attendees, setAttendees] = useState(2);

  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<RegistrationSuccess | null>(
    null
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldErrors({});
    setServerError(null);

    const localErrors: Record<string, string> = {};
    if (fullName.trim().length < 2) {
      localErrors.fullName = "Please enter your full name.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      localErrors.email = "Please enter a valid email address.";
    }
    const digits = mobile.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) {
      localErrors.mobile = "Please enter a valid 10-digit mobile number.";
    }
    if (city.trim().length < 2) {
      localErrors.city = "Please enter your city.";
    }
    if (attendees < 1 || attendees > MAX_ATTENDEES) {
      localErrors.attendees = `One pass can cover 1 to ${MAX_ATTENDEES} people.`;
    }

    if (Object.keys(localErrors).length > 0) {
      setFieldErrors(localErrors);
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/mahotsav/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          mobile: mobile.trim(),
          city: city.trim(),
          attendees,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        if (data.errors) setFieldErrors(data.errors);
        setServerError(
          data.message || "Could not complete registration. Please check your details."
        );
        return;
      }

      setConfirmation({
        referenceId: data.referenceId,
        emailSent: Boolean(data.emailSent),
        whatsappSent: Boolean(data.whatsappSent),
        passUrl: typeof data.passUrl === "string" ? data.passUrl : null,
        passImage: data.passImage ?? null,
        ...data.registration,
      });
    } catch {
      setServerError(
        "Network error while submitting. Please check your connection and try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  /**
   * Free WhatsApp delivery: on phones this opens the share sheet with the pass
   * image attached; elsewhere it opens WhatsApp with a ready message (and the
   * pass link) addressed to the visitor's own number.
   */
  async function sendToWhatsApp() {
    if (!confirmation) return;
    const text = [
      `Jai Gurudev ${confirmation.fullName} 🙏`,
      `Your Entry Pass for ${EVENT_CONFIG.festivalName} (${confirmation.attendees} ${confirmation.attendees === 1 ? "person" : "persons"}).`,
      `📅 ${EVENT_CONFIG.dateDisplay}, ${EVENT_CONFIG.startTime} onwards`,
      `📍 ${EVENT_CONFIG.venueLocation}`,
      `Directions: ${EVENT_CONFIG.googleMapsUrl}`,
      confirmation.passUrl ? `Your pass: ${confirmation.passUrl}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      if (confirmation.passImage && typeof navigator.canShare === "function") {
        const blob = await (await fetch(confirmation.passImage)).blob();
        const safeName =
          confirmation.fullName.replace(/[^A-Za-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "Guest";
        const file = new File([blob], `Entry-Pass-${safeName}.jpg`, { type: "image/jpeg" });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], text });
          return;
        }
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return; // visitor cancelled
    }

    const number = normaliseWhatsAppNumber(confirmation.mobile);
    window.open(
      `https://wa.me/${number ?? ""}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  if (confirmation) {
    return (
      <div
        data-success
        className="relative flex flex-col items-center overflow-hidden px-5 pb-7 pt-10 sm:px-8 sm:pb-8"
        style={{
          backgroundColor: "#F6ECDA",
          backgroundImage: [
            "radial-gradient(ellipse 90% 45% at 50% 0%, rgba(242,201,125,0.75), transparent 70%)",
            "radial-gradient(circle at 0% 100%, rgba(212,150,53,0.28), transparent 45%)",
            "radial-gradient(circle at 100% 100%, rgba(122,27,31,0.14), transparent 45%)",
            "radial-gradient(rgba(154,98,19,0.16) 1.1px, transparent 1.6px)",
          ].join(", "),
          backgroundSize: "auto, auto, auto, 18px 18px",
        }}
      >
        {/* Decorative gold rings behind the greeting */}
        <div
          className="pointer-events-none absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full border border-[#D49635]/30"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full border border-[#D49635]/20"
          aria-hidden="true"
        />
        <div className="relative flex flex-col items-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#5E1216] text-[#F2C97D] shadow-md">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#F6ECDA] px-3.5 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#5E1216]">
          <Sparkles className="h-3.5 w-3.5 text-[#9A6213]" />
          Registration Confirmed
        </span>
        <h3 className="mt-3 text-center font-mahotsav-display text-3xl font-bold text-[#5E1216] sm:text-4xl">
          Jai Gurudev, {confirmation.fullName.split(" ")[0]}!
        </h3>
        <p className="mt-2 max-w-md text-center text-sm leading-relaxed text-[#4A362A] sm:text-base">
          Your Entry Pass for {EVENT_CONFIG.festivalName} is ready. We look
          forward to celebrating with you on {EVENT_CONFIG.dateDisplay}.
          {confirmation.whatsappSent && " We have also sent it to your WhatsApp."}
        </p>

        {confirmation.passImage ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={confirmation.passImage}
              alt={`Entry Pass for ${confirmation.fullName}`}
              className="mt-6 w-full max-w-[340px] rounded-2xl border border-[#E8D8BC] shadow-xl"
            />
            <a
              href={confirmation.passImage}
              download={`Entry-Pass-${confirmation.fullName.replace(/[^A-Za-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "Guest"}.jpg`}
              className="mt-6 inline-flex w-full max-w-[340px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#5E1216] via-[#7A1B1F] to-[#5E1216] px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#FDF8EF] shadow-md transition-all hover:shadow-lg hover:brightness-110"
            >
              <Download className="h-4 w-4" />
              Download Pass
            </a>
            <button
              type="button"
              onClick={sendToWhatsApp}
              className="mt-3 inline-flex w-full max-w-[340px] items-center justify-center gap-2 rounded-full border border-[#D49635] bg-[#FFFCF6] px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#5E1216] transition-colors hover:bg-[#F6ECDA]"
            >
              <MessageCircle className="h-4 w-4" />
              Send to my WhatsApp
            </button>
          </>
        ) : (
          <p className="py-10 text-center text-sm text-[#4A362A]">
            Your registration is confirmed. Your pass will be sent to{" "}
            {confirmation.email}.
          </p>
        )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-10">
      <div className="text-center">
        <span className="inline-block rounded-full bg-[#F6ECDA] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#9A6213]">
          Free Entry Pass
        </span>
        <h3
          id="registration-title"
          className="mt-3 font-mahotsav-display text-3xl font-bold text-[#5E1216] sm:text-4xl"
        >
          Reserve Your Presence
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-[#695347]">
          Register for {EVENT_CONFIG.festivalName} • {EVENT_CONFIG.dateDisplay}.
          Your personalised entry pass is emailed instantly.
        </p>
      </div>

      {serverError && (
        <div
          role="alert"
          className="mt-6 rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-900"
        >
          {serverError}
        </div>
      )}

      <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="fullName" className={labelCls}>
            Full Name <span className="text-[#9A6213]">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            maxLength={80}
            autoComplete="name"
            placeholder="Name to print on your pass"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            aria-invalid={Boolean(fieldErrors.fullName)}
            className={inputCls}
          />
          {fieldErrors.fullName && (
            <p className="mt-1.5 text-xs text-red-700">{fieldErrors.fullName}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="email" className={labelCls}>
            Email Address <span className="text-[#9A6213]">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            placeholder="Your pass will be sent here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(fieldErrors.email)}
            className={inputCls}
          />
          {fieldErrors.email && (
            <p className="mt-1.5 text-xs text-red-700">{fieldErrors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="mobile" className={labelCls}>
            Mobile Number <span className="text-[#9A6213]">*</span>
          </label>
          <input
            id="mobile"
            name="mobile"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            placeholder="e.g. 9876543210"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            aria-invalid={Boolean(fieldErrors.mobile)}
            className={inputCls}
          />
          {fieldErrors.mobile && (
            <p className="mt-1.5 text-xs text-red-700">{fieldErrors.mobile}</p>
          )}
        </div>

        <div>
          <label htmlFor="city" className={labelCls}>
            City <span className="text-[#9A6213]">*</span>
          </label>
          <input
            id="city"
            name="city"
            type="text"
            required
            autoComplete="address-level2"
            placeholder="e.g. Ghaziabad / Delhi"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            aria-invalid={Boolean(fieldErrors.city)}
            className={inputCls}
          />
          {fieldErrors.city && (
            <p className="mt-1.5 text-xs text-red-700">{fieldErrors.city}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="attendees" className={labelCls}>
            Number of Attendees <span className="text-[#9A6213]">*</span>
            <span className="ml-1.5 text-[10px] font-semibold normal-case tracking-normal text-[#9C8677]">
              (max {MAX_ATTENDEES} per pass)
            </span>
          </label>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#E8D8BC] bg-[#FDF8EF] p-2.5">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAttendees((n) => Math.max(1, n - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E8D8BC] bg-[#FFFCF6] text-[#5E1216] transition-colors hover:bg-[#F6ECDA]"
                aria-label="Decrease number of attendees"
              >
                <Minus className="h-4 w-4" />
              </button>
              <input
                id="attendees"
                name="attendees"
                type="number"
                min={1}
                max={MAX_ATTENDEES}
                value={attendees}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  setAttendees(Number.isNaN(val) ? 1 : Math.min(MAX_ATTENDEES, Math.max(1, val)));
                }}
                className="w-14 bg-transparent text-center text-base font-bold text-[#5E1216] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setAttendees((n) => Math.min(MAX_ATTENDEES, n + 1))}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E8D8BC] bg-[#FFFCF6] text-[#5E1216] transition-colors hover:bg-[#F6ECDA]"
                aria-label="Increase number of attendees"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <Users className="mr-1 h-4 w-4 text-[#9A6213]" aria-hidden="true" />
              {[1, 2, 3, 4, 5].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAttendees(preset)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                    attendees === preset
                      ? "bg-[#5E1216] text-[#FDF8EF]"
                      : "border border-[#E8D8BC] bg-[#FFFCF6] text-[#4A362A] hover:border-[#D49635]"
                  }`}
                >
                  {preset === 1 ? "Just Me" : `${preset}`}
                </button>
              ))}
            </div>
          </div>
          {fieldErrors.attendees && (
            <p className="mt-1.5 text-xs text-red-700">{fieldErrors.attendees}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#5E1216] via-[#7A1B1F] to-[#5E1216] px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#FDF8EF] shadow-md transition-all hover:shadow-lg hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Generating Your Pass...
          </>
        ) : (
          "Register & Get My Pass"
        )}
      </button>

      <p className="mt-4 text-center text-xs text-[#695347]">
        Free entry for all registered devotees and families • Prasad will be served
      </p>
    </form>
  );
}
