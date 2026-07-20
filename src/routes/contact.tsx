import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Linkedin, Twitter } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Science Divine Foundation" },
      {
        name: "description",
        content:
          "Get in touch with Science Divine Foundation. Contact us for podcasts, college events, or personal guidance from Sakshi Shree.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Page,
});

function Page() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title={
          <>
            Silence isn't{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #F59E0B, #D4AF37)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              empty, it's full.
            </span>
          </>
        }
        subtitle="Sakshi Shree is an enlightened mentor who believes in using scientifically proven techniques to help people. Reach out to us."
      />

      <section className="section-pad bg-white">
        <div className="container-page grid lg:grid-cols-5 gap-12">

          {/* Contact Form ,  3 cols */}
          <div className="lg:col-span-3">
            <div className="card-premium rounded-3xl p-8 md:p-10">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Send a Message</h2>
              <p className="text-sm text-gray-500 mb-8">We'll get back to you as soon as possible.</p>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Rajesh Kumar"
                      className="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      style={{ borderColor: "#E5E7EB" }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      style={{ borderColor: "#E5E7EB" }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    style={{ borderColor: "#E5E7EB" }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="How can we help you?"
                    className="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors resize-none"
                    style={{ borderColor: "#E5E7EB" }}
                  />
                </div>
                <button type="submit" className="btn-gold rounded-full px-10 py-3.5 text-sm font-semibold w-full">
                  Submit Now
                </button>
              </form>
            </div>
          </div>

          {/* Contact Details ,  2 cols */}
          <div className="lg:col-span-2 space-y-6">

            {/* Address */}
            <div className="card-premium rounded-2xl p-6">
              <h3 className="font-display font-bold text-gray-900 mb-4">Address</h3>
              <div className="flex gap-3 mb-4">
                <MapPin size={18} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">Siddh Sudarshan Sakshi Dham</p>
                  <p className="text-sm text-gray-600 leading-relaxed">8, Avantika Rd, Chiranjiv Vihar, Shastri Nagar, Ghaziabad, Uttar Pradesh 201001</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone size={18} className="text-amber-500 shrink-0 mt-0.5" />
                <a href="tel:09315944774" className="text-sm text-gray-600 hover:text-amber-700 transition-colors">09315944774</a>
              </div>
            </div>

            {/* Email */}
            <div className="card-premium rounded-2xl p-6">
              <div className="flex gap-3">
                <Mail size={18} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">Email</p>
                  <a href="mailto:info@sciencedivine.org" className="text-sm text-gray-600 hover:text-amber-700 transition-colors">info@sciencedivine.org</a>
                </div>
              </div>
            </div>

            {/* Podcast contact */}
            <div className="card-premium rounded-2xl p-6">
              <h3 className="font-display font-bold text-gray-900 mb-4 text-sm">Contact for Podcast</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div>
                  <p className="font-semibold text-gray-800">Arjun Lal</p>
                  <p>📞 9315944774 · 📧 info@sciencedivine.org</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Tushar Chaudhary</p>
                  <p>📞 9540072189 · 📧 info@sciencedivine.org</p>
                </div>
              </div>
            </div>

            {/* College events */}
            <div className="card-premium rounded-2xl p-6">
              <h3 className="font-display font-bold text-gray-900 mb-4 text-sm">Contact for College Events</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div>
                  <p className="font-semibold text-gray-800">Archana Nirali</p>
                  <p>📞 9899612838 · 📧 info@sciencedivine.org</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Tushar Chaudhary</p>
                  <p>📞 9540072189 · 📧 info@sciencedivine.org</p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="card-premium rounded-2xl p-6">
              <h3 className="font-display font-bold text-gray-900 mb-4 text-sm">Follow Us</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { href: "https://www.facebook.com/OfficialSakshishree/", Icon: Facebook, label: "Facebook" },
                  { href: "https://www.instagram.com/sakshishreeofficial/", Icon: Instagram, label: "Instagram" },
                  { href: "https://www.youtube.com/@SakshiShree", Icon: Youtube, label: "YouTube" },
                  { href: "https://twitter.com/gurusakshishree", Icon: Twitter, label: "Twitter" },
                  { href: "https://www.linkedin.com/in/sakshishree/", Icon: Linkedin, label: "LinkedIn" },
                ].map(({ href, Icon, label }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                    className="w-10 h-10 rounded-full grid place-items-center transition-colors"
                    style={{ background: "rgba(212,175,55,0.12)", color: "#92700A" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#D4AF37"; e.currentTarget.style.color = "#1a1000"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(212,175,55,0.12)"; e.currentTarget.style.color = "#92700A"; }}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
