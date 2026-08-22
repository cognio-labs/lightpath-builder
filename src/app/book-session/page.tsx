"use client";
import { useRouter } from "next/navigation";

import { PageHero, SectionHeading } from "@/components/PageHero";
import { YouTubeThumb } from "@/components/YouTubeEmbed";
import { LEADERS, TESTIMONIAL_VIDEOS } from "@/data/content";
import { Sparkles, Compass, HeartHandshake, Check, X, ChevronDown, ArrowRight } from "lucide-react";
import { useState } from "react";
import { submitForm } from "@/lib/admin.functions";




const FAQS = [
  {
    q: "Is the session online or offline?",
    a: "Both online (video call) and offline (in-person at Sakshi Dham) options are available. You choose what works for you.",
  },
  {
    q: "How is the session scheduled?",
    a: "Our team contacts you within 24 hours after donation to schedule your slot.",
  },
  { q: "What details do I need to share?", a: "Just your birth details (date, time, place) and any specific questions you want guidance on." },
  {
    q: "How long is the session?",
    a: "Approximately 30 minutes of focused personal one-on-one time with Sakshi Shree.",
  },
  {
    q: "What can I expect?",
    a: "Personalized insights delivered without you needing to speak ,  the reading comes through direct energy sensing.",
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Personal Session · ₹6,100 Donation"
        title="Unlock the Life You Truly Desire"
        subtitle="Sakshi Shree reads your energy like an open book. Your contribution supports the Jhuggi Jhopdi Shiksha Sewa Mission ,  free education for slum children."
      >
        <a href="#book" className="btn-gold rounded-full px-8 py-3.5 text-sm font-semibold">
          Reserve Your Session
        </a>
      </PageHero>

      <section className="section-pad bg-white">
        <div className="container-page grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Sparkles,
              title: "Instant Life Reading & Clarity",
              desc: "See where you are and where you're going ,  with unprecedented precision.",
            },
            {
              icon: Compass,
              title: "Transformative Solutions",
              desc: "Specific remedies for specific patterns. Not generic advice.",
            },
            {
              icon: HeartHandshake,
              title: "Personalized Spiritual Guidance",
              desc: "A tailored practice you can actually maintain and that actually works.",
            },
          ].map((f) => (
            <div key={f.title} className="card-premium rounded-2xl p-6 text-center">
              <div className="w-14 h-14 mx-auto rounded-2xl text-white grid place-items-center mb-4"
                style={{ background: "linear-gradient(135deg, #F59E0B, #D4AF37)" }}>
                <f.icon />
              </div>
              <h3 className="font-display font-bold text-gray-900 text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad" style={{ background: "#FAFAFA" }}>
        <div className="container-page grid md:grid-cols-2 gap-12 items-center">
          <img
            src="https://sciencedivine.org/wp-content/uploads/2024/05/aboutsakshishree.jpg"
            alt="Sakshi Shree"
            className="rounded-3xl shadow-xl w-full"
            loading="lazy"
          />
          <div>
            <SectionHeading eyebrow="Why Sakshi Shree" title="The Sakshi Shree Difference" />
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-3"></th>
                  <th className="py-3 font-bold text-amber-700">Sakshi Shree</th>
                  <th className="py-3 text-gray-400">Generic Astrology</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  ["Experience", "40 years of sadhana", "Limited knowledge"],
                  ["Reading", "Personalized, direct energy", "General horoscopes"],
                  ["Remedies", "Specific, actionable", "Vague advice"],
                  ["Practice", "Tailored to you", "One-size-fits-all"],
                ].map(([k, a, b]) => (
                  <tr key={k}>
                    <td className="py-3 font-medium text-gray-800">{k}</td>
                    <td className="py-3 text-amber-800">
                      <Check size={16} className="inline mr-1 text-green-600" />
                      {a}
                    </td>
                    <td className="py-3 text-gray-400">
                      <X size={16} className="inline mr-1 text-red-500" />
                      {b}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page">
          <SectionHeading center eyebrow="In Company Of" title="Trusted by World Leaders" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LEADERS.map((l) => (
              <div key={l.name} className="card-premium rounded-2xl overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={l.image}
                    alt={l.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 border-t">
                  <h3 className="font-display font-bold text-sm text-gray-900">{l.name}</h3>
                  <p className="text-xs text-gray-500">{l.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad animate-fade-in" style={{ background: "#FAFAFA" }} id="book">
        <div className="container-page">
          <SectionHeading center eyebrow="How to Book" title="Three Simple Steps" />
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
            {[
              {
                n: 1,
                title: "Confirm Participation",
                desc: "₹6,100 donation to Jhuggi Jhopdi Shiksha Sewa Mission (80G tax-exempt).",
              },
              {
                n: 2,
                title: "Schedule the Meeting",
                desc: "Our team contacts you to arrange online or face-to-face session.",
              },
              {
                n: 3,
                title: "Begin Transformation",
                desc: "Meet Sakshi Shree. Receive your reading. Return home changed.",
              },
            ].map((s) => (
              <div key={s.n} className="card-premium rounded-2xl p-6 bg-white">
                <div className="w-14 h-14 rounded-full text-white grid place-items-center font-display text-2xl font-bold mb-4"
                  style={{ background: "linear-gradient(135deg, #F59E0B, #D4AF37)" }}>
                  {s.n}
                </div>
                <h3 className="font-display font-bold text-gray-900 text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-500">
            Note: All donations qualify for tax exemption under Section 80G.
          </p>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page max-w-3xl mx-auto">
          <SectionHeading center eyebrow="FAQ" title="Common questions" />
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <FAQItem key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: "#FAFAFA" }}>
        <div className="container-page grid md:grid-cols-2 gap-10 items-start max-w-4xl mx-auto">
          <div>
            <SectionHeading
              eyebrow="Not sure yet?"
              title="Request a Callback"
              subtitle="Our team will reach out with details and answer questions."
            />
            <div className="text-sm text-gray-600 space-y-2 mt-4">
              <div>📧 info@sciencedivine.org</div>
              <div>📞 +91 93159 44774</div>
            </div>
          </div>
          <CallbackForm />
        </div>
      </section>
    </>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card-premium rounded-2xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left font-semibold text-gray-900"
      >
        <span>{q}</span>
        <ChevronDown
          className={`transition-transform shrink-0 ${open ? "rotate-180" : ""}`}
          size={18}
        />
      </button>
      {open && <div className="px-5 pb-5 text-sm text-gray-500 leading-relaxed border-t pt-3 mt-1">{a}</div>}
    </div>
  );
}

function CallbackForm() {
  const router = useRouter();
  const submit = async (p: any) => submitForm(p?.data || p);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    const fd = new FormData(e.currentTarget);
    try {
      await submit({
        data: {
          type: "book_session",
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          message: "Callback request from Book Session page",
        },
      });
      router.push("/thank-you");
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Failed");
      setBusy(false);
    }
  }
  return (
    <form onSubmit={onSubmit} className="card-premium rounded-2xl p-6 space-y-3 bg-white">
      <input
        required
        name="name"
        placeholder="Name"
        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-amber-400"
      />
      <input
        required
        name="email"
        type="email"
        placeholder="Email"
        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-amber-400"
      />
      <input
        required
        name="phone"
        placeholder="Phone"
        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-amber-400"
      />
      {err && <p className="text-sm text-destructive">{err}</p>}
      <button
        disabled={busy}
        className="btn-gold rounded-full px-6 py-3 font-semibold text-sm w-full disabled:opacity-60"
      >
        {busy ? "Sending…" : "Request Callback"}
      </button>
    </form>
  );
}
