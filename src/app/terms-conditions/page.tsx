"use client";

import { PageHero } from "@/components/PageHero";





export default function Page() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms & Conditions" subtitle="Last updated: 03/03/2024" />
      <section className="section-pad bg-white">
        <article className="container-page max-w-3xl mx-auto space-y-6 text-base leading-relaxed text-gray-600">
          <p>
            By accessing or using Science Divine services, you agree to be bound by these Terms.
          </p>
          <h2 className="font-display text-xl font-bold text-gray-900 pt-4" style={{ borderBottom: "1px solid rgba(212,175,55,0.2)", paddingBottom: "0.5rem" }}>Use of Service</h2>
          <p>
            You agree to use our services only for lawful purposes and in accordance with these
            Terms.
          </p>
          <h2 className="font-display text-xl font-bold text-gray-900 pt-4" style={{ borderBottom: "1px solid rgba(212,175,55,0.2)", paddingBottom: "0.5rem" }}>Accounts</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials.
          </p>
          <h2 className="font-display text-xl font-bold text-gray-900 pt-4" style={{ borderBottom: "1px solid rgba(212,175,55,0.2)", paddingBottom: "0.5rem" }}>
            Intellectual Property
          </h2>
          <p>
            All content on Science Divine platforms ,  text, video, audio, images ,  is the property
            of Rama Intellectual and Research Pvt Ltd and its licensors.
          </p>
          <h2 className="font-display text-xl font-bold text-gray-900 pt-4" style={{ borderBottom: "1px solid rgba(212,175,55,0.2)", paddingBottom: "0.5rem" }}>Links</h2>
          <p>
            Our services may contain links to third-party sites. We are not responsible for their
            content.
          </p>
          <h2 className="font-display text-xl font-bold text-gray-900 pt-4" style={{ borderBottom: "1px solid rgba(212,175,55,0.2)", paddingBottom: "0.5rem" }}>Termination</h2>
          <p>
            We reserve the right to suspend or terminate access at any time for violations of these
            Terms.
          </p>
          <h2 className="font-display text-xl font-bold text-gray-900 pt-4" style={{ borderBottom: "1px solid rgba(212,175,55,0.2)", paddingBottom: "0.5rem" }}>Governing Law</h2>
          <p>These Terms are governed by the laws of Uttar Pradesh, India.</p>
          <h2 className="font-display text-xl font-bold text-gray-900 pt-4" style={{ borderBottom: "1px solid rgba(212,175,55,0.2)", paddingBottom: "0.5rem" }}>Contact</h2>
          <p>Email: info@sciencedivine.org · Phone: +91-9315944774</p>
        </article>
      </section>
    </>
  );
}
