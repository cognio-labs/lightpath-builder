"use client";

import { PageHero, SectionHeading } from "@/components/PageHero";
import { useState } from "react";
import { Check } from "lucide-react";




export default function Page() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <>
      <PageHero
        eyebrow="Join Us"
        title="Become a Volunteer"
        subtitle="Be the change you want to see. Join our global force of volunteers for Har Ghar Shiksha, Har Ghar Dhyan."
      />
      <section className="section-pad bg-white">
        <div className="container-page max-w-2xl mx-auto">
          {submitted ? (
            <div className="card-premium p-8 rounded-3xl text-center space-y-4">
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <Check size={32} />
              </div>
              <h2 className="font-display text-2xl font-bold text-gray-900">Application Submitted!</h2>
              <p className="text-gray-600">Thank you for your willingness to serve. Our volunteer coordinator will connect with you soon.</p>
            </div>
          ) : (
            <div className="card-premium p-8 rounded-3xl">
              <SectionHeading eyebrow="Service" title="Volunteer Registration Form" />
              <form className="space-y-4 mt-6" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name</label>
                    <input required type="text" className="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:border-amber-400" style={{ borderColor: "#E5E7EB" }} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address</label>
                    <input required type="email" className="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:border-amber-400" style={{ borderColor: "#E5E7EB" }} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Phone Number</label>
                  <input required type="tel" className="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:border-amber-400" style={{ borderColor: "#E5E7EB" }} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Areas of Interest</label>
                  <select required className="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:border-amber-400 bg-white" style={{ borderColor: "#E5E7EB" }}>
                    <option value="education">Teaching Children (Shiksha)</option>
                    <option value="annapurna">Food Distribution (Annapurna)</option>
                    <option value="meditation">Meditation Events Assistance (Dhyan)</option>
                    <option value="digital">Digital & Social Media</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Why do you want to join us?</label>
                  <textarea rows={4} className="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:border-amber-400 resize-none" style={{ borderColor: "#E5E7EB" }} />
                </div>
                <button type="submit" className="btn-gold rounded-full px-8 py-3.5 text-sm font-semibold w-full">
                  Submit Volunteer Request
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
