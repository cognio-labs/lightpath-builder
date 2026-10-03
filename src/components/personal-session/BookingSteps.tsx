import { Clock, UserRound, Wallet } from "lucide-react";
import { RAZORPAY_PERSONAL_SESSION_LINK } from "@/lib/payment-links";
import { bookingSteps, donation, taxNote } from "./content";
import { SectionHeading } from "./ui";

const ICONS = {
  session: Wallet,
  time: Clock,
  meet: UserRound,
} as const;

export default function BookingSteps() {
  return (
    <section id="book" className="sd-paper scroll-mt-28 pb-14 sm:pb-16">
      <div className="sd-shell">
        <SectionHeading className="text-center text-[1.55rem] sm:text-[2rem]">Book in 3 Simple Steps</SectionHeading>

        <ol className="mt-9 grid gap-4 sm:grid-cols-3">
          {bookingSteps.map((s) => {
            const Icon = ICONS[s.icon];
            return (
              <li
                key={s.n}
                className="group relative rounded-2xl border border-cream-300/70 bg-white p-5 pt-6 shadow-ps-card transition-all duration-300 hover:-translate-y-1 hover:border-gold-300/70"
              >
                <span className="sd-gold-btn absolute -top-3 left-5 grid h-7 w-7 place-items-center rounded-full text-[12px] font-bold">
                  {s.n}
                </span>
                <Icon className="h-6 w-6 text-gold-500 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.3} />
                <p className="mt-3 text-[14px] font-semibold leading-snug text-ink-900">{s.title}</p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-ink-500">{s.body}</p>
                {s.icon === "session" && (
                  <a
                    href={RAZORPAY_PERSONAL_SESSION_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-gold-600 underline decoration-gold-300 underline-offset-4 hover:text-ink-900"
                  >
                    Contribute {donation.amount} →
                  </a>
                )}
              </li>
            );
          })}
        </ol>
        <p className="mt-4 text-center text-[11.5px] text-ink-500">{taxNote}</p>
      </div>
    </section>
  );
}
