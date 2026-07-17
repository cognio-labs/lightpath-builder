import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/cancellation-policy")({
  head: () => ({
    meta: [
      { title: "Cancellation & Refund Policy — Science Divine" },
      { name: "description", content: "Cancellation and refund policy for Science Divine courses, events, and products." },
      { property: "og:url", content: "/cancellation-policy" },
    ],
    links: [{ rel: "canonical", href: "/cancellation-policy" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Legal" title="Cancellation & Refund Policy" />
      <section className="section-pad">
        <article className="container-page max-w-3xl mx-auto space-y-5 text-sm leading-relaxed text-muted-foreground">
          <h2 className="font-display text-xl font-bold text-foreground">Cancellations</h2>
          <p>Course cancellations must be requested within 7 days of purchase and before accessing any course content.</p>
          <h2 className="font-display text-xl font-bold text-foreground pt-4">Refunds</h2>
          <p>Approved refunds are processed within 7–10 business days to the original payment method.</p>
          <h2 className="font-display text-xl font-bold text-foreground pt-4">Personal Sessions</h2>
          <p>Personal session bookings may be rescheduled once at no charge with 48 hours notice. Refunds for cancelled sessions are subject to review.</p>
          <h2 className="font-display text-xl font-bold text-foreground pt-4">Donations</h2>
          <p>Donations to our initiatives are non-refundable. Tax exemption certificates (80G) are issued upon request.</p>
          <h2 className="font-display text-xl font-bold text-foreground pt-4">Contact</h2>
          <p>For refund requests: info@sciencedivine.org · +91-9315944774</p>
        </article>
      </section>
    </>
  ),
});
