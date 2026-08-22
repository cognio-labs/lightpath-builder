"use client";

import { PageHero } from "@/components/PageHero";





export default function Page() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Cancellation & Refund Policy" />
      <section className="section-pad bg-white">
        <article className="container-page max-w-3xl mx-auto space-y-6 text-base leading-relaxed text-gray-600">
          <h2 className="font-display text-xl font-bold text-gray-900" style={{ borderBottom: "1px solid rgba(212,175,55,0.2)", paddingBottom: "0.5rem" }}>Cancellations</h2>
          <p>
            Course cancellations must be requested within 7 days of purchase and before accessing
            any course content.
          </p>
          <h2 className="font-display text-xl font-bold text-gray-900 pt-4" style={{ borderBottom: "1px solid rgba(212,175,55,0.2)", paddingBottom: "0.5rem" }}>Refunds</h2>
          <p>
            Approved refunds are processed within 7–10 business days to the original payment method.
          </p>
          <h2 className="font-display text-xl font-bold text-gray-900 pt-4" style={{ borderBottom: "1px solid rgba(212,175,55,0.2)", paddingBottom: "0.5rem" }}>Personal Sessions</h2>
          <p>
            Personal session bookings may be rescheduled once at no charge with 48 hours notice.
            Refunds for cancelled sessions are subject to review.
          </p>
          <h2 className="font-display text-xl font-bold text-gray-900 pt-4" style={{ borderBottom: "1px solid rgba(212,175,55,0.2)", paddingBottom: "0.5rem" }}>Donations</h2>
          <p>
            Donations to our initiatives are non-refundable. Tax exemption certificates (80G) are
            issued upon request.
          </p>
          <h2 className="font-display text-xl font-bold text-gray-900 pt-4" style={{ borderBottom: "1px solid rgba(212,175,55,0.2)", paddingBottom: "0.5rem" }}>Contact</h2>
          <p>For refund requests: info@sciencedivine.org · +91-9315944774</p>
        </article>
      </section>
    </>
  );
}
