import { Link } from "@tanstack/react-router";
import { Facebook, Youtube, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { LOGO_URL, SOCIALS, COURSES } from "@/data/content";

export function SiteFooter() {
  return (
    <footer className="ethereal-bg text-white mt-16">
      <div className="container-page py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src={LOGO_URL} alt="Science Divine" className="h-12 w-auto brightness-0 invert mb-4" />
          <p className="text-sm text-white/80 leading-relaxed">
            Science Divine Foundation — a global movement for Sound Body, Sound Mind, and Self Realization, guided by enlightened master Sakshi Shree.
          </p>
          <div className="flex gap-3 mt-5">
            <SocialIcon href={SOCIALS.facebook} icon={Facebook} />
            <SocialIcon href={SOCIALS.youtube} icon={Youtube} />
            <SocialIcon href={SOCIALS.instagram} icon={Instagram} />
            <SocialIcon href={SOCIALS.linkedin} icon={Linkedin} />
            <SocialIcon href={SOCIALS.twitter} icon={Twitter} />
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link to="/events" className="hover:text-white">Events</Link></li>
            <li><Link to="/courses" className="hover:text-white">Courses</Link></li>
            <li><Link to="/initiatives" className="hover:text-white">Donate</Link></li>
            <li><Link to="/har-ghar-shiksha" className="hover:text-white">Join Volunteer</Link></li>
            <li><Link to="/book-session" className="hover:text-white">Book Personal Session</Link></li>
            <li><Link to="/shop" className="hover:text-white">Shop</Link></li>
            <li><Link to="/testimonials" className="hover:text-white">Testimonials</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4">Courses</h4>
          <ul className="space-y-2 text-sm text-white/80">
            {COURSES.map(c => (
              <li key={c.slug}><Link to={`/${c.slug}` as string} className="hover:text-white">{c.title}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex gap-2"><MapPin size={16} className="shrink-0 mt-0.5" /><span>8, Avantika Rd, Chiranjiv Vihar, Ghaziabad, UP 201001</span></li>
            <li className="flex gap-2"><Phone size={16} className="shrink-0 mt-0.5" /><a href="tel:+919315944774">+91 93159 44774</a></li>
            <li className="flex gap-2"><Mail size={16} className="shrink-0 mt-0.5" /><a href="mailto:info@sciencedivine.org">info@sciencedivine.org</a></li>
          </ul>
          <form className="mt-5 flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email" className="flex-1 min-w-0 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm placeholder:text-white/50 focus:outline-none focus:border-white/40" />
            <button className="btn-gold rounded-full px-4 py-2 text-sm font-semibold text-black">Subscribe</button>
          </form>
          <a href={SOCIALS.playstore} target="_blank" rel="noreferrer" className="inline-block mt-5">
            <img src="https://sciencedivine.org/wp-content/uploads/2023/08/image-16.png" alt="Get it on Google Play" className="h-12" />
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <p>© 2025 Science Divine Foundation. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms-conditions" className="hover:text-white">Terms</Link>
            <Link to="/cancellation-policy" className="hover:text-white">Cancellation</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, icon: Icon }: { href: string; icon: React.ComponentType<{ size?: number }> }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full glass-dark grid place-items-center hover:bg-white/20 transition-colors">
      <Icon size={16} />
    </a>
  );
}
