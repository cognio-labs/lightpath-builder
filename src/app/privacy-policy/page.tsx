"use client";

import { PageHero } from "@/components/PageHero";





export default function Page() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" subtitle="Last updated: 03/03/2024" />
      <section className="section-pad">
        <article className="container-page prose max-w-3xl mx-auto space-y-5 text-sm leading-relaxed text-muted-foreground">
          <p>
            Rama Intellectual and Research Pvt Ltd ("Science Divine", "we", "us") respects your
            privacy and is committed to protecting your personal information.
          </p>
          <h2 className="font-display text-xl font-bold text-foreground pt-4">Collection & Use</h2>
          <p>
            We collect information you provide directly (name, email, phone) when you register for
            courses, book sessions, or donate. This information is used to deliver services and
            communicate with you.
          </p>
          <h2 className="font-display text-xl font-bold text-foreground pt-4">
            Personal Information
          </h2>
          <p>
            We do not sell, trade, or otherwise transfer your personally identifiable information to
            outside parties without your consent, except as required by law.
          </p>
          <h2 className="font-display text-xl font-bold text-foreground pt-4">Usage Information</h2>
          <p>
            We may collect anonymous usage data (page views, click paths) to improve our services.
          </p>
          <h2 className="font-display text-xl font-bold text-foreground pt-4">
            Your Privacy Rights
          </h2>
          <p>
            You may request access to, correction of, or deletion of your personal information at
            any time by contacting us.
          </p>
          <h2 className="font-display text-xl font-bold text-foreground pt-4">Contact</h2>
          <p>
            Rama Intellectual and Research Pvt Ltd
            <br />
            C-117, Shastri Nagar, Ghaziabad, U.P. 201002
            <br />
            Email: info@sciencedivine.org
            <br />
            Phone: +91-9315944774
          </p>
        </article>
      </section>
    </>
  );
}
