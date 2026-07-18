import { Link } from "@tanstack/react-router";
import { Facebook, Youtube, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { LOGO_URL, SOCIALS, COURSES } from "@/data/content";

export function SiteFooter() {
  return (
    <footer style={{ background: "#0F172A" }} className="text-white mt-0">
      {/* Main grid */}
      <div className="container-page py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">

        {/* Column 1: Brand + Socials */}
        <div>
          <p className="text-sm text-white/70 leading-relaxed mb-6">
            Conceptualized by the enlightened master and divine messenger Sakshi Shree,
            The Science Divine Movement takes the message of love, awareness, and meditation to the world.
          </p>
          <div className="flex gap-3 flex-wrap">
            <SocialIcon href={SOCIALS.facebook} icon={Facebook} label="Facebook" bg="#1877F2" />
            <SocialIcon href={SOCIALS.youtube} icon={Youtube} label="YouTube" bg="#FF0000" />
            <SocialIcon href={SOCIALS.instagram} icon={Instagram} label="Instagram" bg="linear-gradient(45deg, #F09433 0%, #E6683C 25%, #DC2743 50%, #CC2366 75%, #BC1888 100%)" />
            <SocialIcon href={SOCIALS.linkedin} icon={Linkedin} label="LinkedIn" bg="#0A66C2" />
            <SocialIcon href="https://twitter.com/gurusakshishree" icon={Twitter} label="Twitter" bg="#000000" />
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="font-display font-semibold text-white mb-5 text-base">Quick Links</h4>
          <ul className="space-y-2.5 text-sm text-white/70">
            {[
              { to: "/about-movement", label: "About Us" },
              { to: "/about-sakshi-shree", label: "About Sakshi Shree" },
              { to: "/contact", label: "Contact" },
              { to: "/har-ghar-shiksha", label: "Young Mind Movement" },
              { to: "/shiksha-sewa", label: "Project Shiksha Sewa" },
              { to: "/events", label: "Events" },
              { to: "/courses", label: "Courses" },
              { to: "/initiatives", label: "Donate" },
              { to: "/book-session", label: "Book Personal Session" },
              { to: "/shop", label: "Shop" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-amber-400 transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Courses */}
        <div>
          <h4 className="font-display font-semibold text-white mb-5 text-base">Courses</h4>
          <ul className="space-y-2.5 text-sm text-white/70">
            {COURSES.map((c) => (
              <li key={c.slug}>
                <Link to={`/${c.slug}` as string} className="hover:text-amber-400 transition-colors">
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>

          <h4 className="font-display font-semibold text-white mt-8 mb-5 text-base">Solutions</h4>
          <ul className="space-y-2 text-sm text-white/70">
            {[
              { to: "/stress", label: "Stress" },
              { to: "/anxiety", label: "Anxiety" },
              { to: "/depression", label: "Depression" },
              { to: "/meditation", label: "Meditation" },
              { to: "/yoga", label: "Yoga" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-amber-400 transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div>
          <h4 className="font-display font-semibold text-white mb-5 text-base">Contact</h4>
          <ul className="space-y-4 text-sm text-white/70">
            <li>
              <p className="text-white/90 font-semibold text-xs uppercase tracking-wider mb-1">Siddh Sudarshan Sakshi Dham</p>
              <div className="flex gap-2">
                <MapPin size={14} className="shrink-0 mt-0.5 text-amber-400" />
                <span>8, Avantika Road, Chiranjiv Vihar, Shastri Nagar, Ghaziabad, Uttar Pradesh 201001</span>
              </div>
            </li>
            <li>
              <p className="text-white/90 font-semibold text-xs uppercase tracking-wider mb-1">Sakshi Dham International</p>
              <div className="flex gap-2">
                <MapPin size={14} className="shrink-0 mt-0.5 text-amber-400" />
                <span>Omaxe Eternity, Chhatikara Road, Vrindavan, Uttar Pradesh 281121</span>
              </div>
            </li>
            <li className="flex gap-2">
              <Phone size={14} className="shrink-0 mt-0.5 text-amber-400" />
              <a href="tel:+919315944774" className="hover:text-amber-400 transition-colors">+91 93159 44774</a>
            </li>
            <li className="flex gap-2">
              <Mail size={14} className="shrink-0 mt-0.5 text-amber-400" />
              <a href="mailto:info@sciencedivine.org" className="hover:text-amber-400 transition-colors">info@sciencedivine.org</a>
            </li>
          </ul>

          {/* Newsletter mini-form */}
          <div className="mt-7">
            <p className="text-xs text-white/50 uppercase tracking-widest mb-3">Subscribe to newsletter</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 min-w-0 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm placeholder:text-white/40 focus:outline-none focus:border-amber-400 text-white"
              />
              <button
                type="submit"
                className="btn-gold rounded-full px-4 py-2 text-sm font-semibold text-black shrink-0"
              >
                Go
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="container-page py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© 2025 Science Divine Foundation. All Rights Reserved.</p>
          <div className="flex gap-5">
            <Link to="/cancellation-policy" className="hover:text-white transition-colors">
              Cancellation and Refund Policy
            </Link>
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-conditions" className="hover:text-white transition-colors">
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  icon: Icon,
  label,
  bg,
}: {
  href: string;
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  bg: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-full grid place-items-center transition-all duration-300 hover:scale-110 hover:brightness-110 shadow-md"
      style={{ background: bg, color: "#FFFFFF" }}
    >
      <Icon size={15} />
    </a>
  );
}
