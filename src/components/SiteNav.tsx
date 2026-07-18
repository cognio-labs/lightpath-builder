import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, Shield } from "lucide-react";
import { LOGO_URL, SOLUTION_TOPICS } from "@/data/content";
import { supabase } from "@/integrations/supabase/client";

const aboutLinks = [
  { to: "/about-movement", label: "About the Movement" },
  { to: "/about-sakshi-shree", label: "About Sakshi Shree" },
];

const initiativeLinks = [
  { to: "/initiatives", label: "All Initiatives" },
  { to: "/shiksha-sewa", label: "Shiksha Sewa" },
  { to: "/annapurna-sewa", label: "Annapurna Sewa" },
  { to: "/dhyan-sewa", label: "Dhyan Sewa" },
  { to: "/har-ghar-shiksha", label: "Har Ghar Shiksha" },
];

const practiceLinks = [
  { to: "/meditation", label: "Meditation" },
  { to: "/yoga", label: "Yoga" },
  { to: "/mindfulness", label: "Mindfulness" },
  { to: "/gratitude", label: "Gratitude" },
  { to: "/manifestation", label: "Manifestation" },
  { to: "/positive-thinking", label: "Positive Thinking" },
  { to: "/finding-purpose", label: "Finding Purpose" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [solOpen, setSolOpen] = useState(false);
  const [practOpen, setPractOpen] = useState(false);
  const [initOpen, setInitOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSignedIn(!!data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSignedIn(!!s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm"
          : "bg-white/90 backdrop-blur-sm border-b border-transparent"
      }`}
      style={{ height: "72px" }}
    >
      <div className="container-page flex items-center justify-between h-full">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={LOGO_URL} alt="Science Divine Foundation" className="h-11 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          <NavLink to="/">Home</NavLink>

          <Dropdown label="About" open={aboutOpen} setOpen={setAboutOpen}>
            <div className="min-w-[220px] p-1">
              {aboutLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setAboutOpen(false)}
                  className="block px-4 py-2.5 text-sm text-gray-700 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </Dropdown>

          <Dropdown label="Solutions" open={solOpen} setOpen={setSolOpen} wide>
            <div className="min-w-[480px] p-2">
              <Link
                to="/get-solutions-for"
                onClick={() => setSolOpen(false)}
                className="block px-4 py-2 text-sm font-semibold gradient-text hover:bg-amber-50 rounded-lg mb-1 transition-colors"
              >
                All Solutions →
              </Link>
              <div className="grid grid-cols-2 gap-0.5">
                {SOLUTION_TOPICS.map((t) => (
                  <Link
                    key={t.slug}
                    to={`/${t.slug}` as string}
                    onClick={() => setSolOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                  >
                    {t.title}
                  </Link>
                ))}
              </div>
            </div>
          </Dropdown>

          <Dropdown label="Practices" open={practOpen} setOpen={setPractOpen}>
            <div className="min-w-[200px] p-1">
              {practiceLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setPractOpen(false)}
                  className="block px-4 py-2.5 text-sm text-gray-700 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </Dropdown>

          <NavLink to="/courses">Courses</NavLink>
          <NavLink to="/events">Events</NavLink>

          <Dropdown label="Initiatives" open={initOpen} setOpen={setInitOpen}>
            <div className="min-w-[200px] p-1">
              {initiativeLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setInitOpen(false)}
                  className="block px-4 py-2.5 text-sm text-gray-700 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </Dropdown>

          <NavLink to="/contact">Contact</NavLink>
        </nav>

        {/* Right CTA buttons */}
        <div className="flex items-center gap-2">
          <Link
            to="/initiatives"
            className="hidden md:inline-flex btn-gold rounded-full px-5 py-2 text-sm font-semibold"
          >
            Donate
          </Link>
          <Link
            to="/book-session"
            className="hidden md:inline-flex btn-outline-gold rounded-full px-5 py-2 text-sm font-semibold"
          >
            Book Session
          </Link>
          {signedIn && (
            <Link
              to="/admin"
              className="hidden md:inline-flex items-center gap-1 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50"
            >
              <Shield size={14} /> Admin
            </Link>
          )}
          <button
            className="lg:hidden rounded-full p-2 hover:bg-gray-100 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} className="text-gray-700" /> : <Menu size={22} className="text-gray-700" />}
          </button>
        </div>
      </div>

      {/* Mobile Full-Screen Menu */}
      {open && (
        <div className="lg:hidden fixed inset-0 top-[72px] bg-white z-40 overflow-y-auto animate-fade-in">
          <div className="container-page py-6 flex flex-col gap-1">
            <MobileLink to="/" onClick={() => setOpen(false)}>Home</MobileLink>

            <MobileGroup label="About">
              {aboutLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 text-sm text-gray-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg"
                >
                  {l.label}
                </Link>
              ))}
            </MobileGroup>

            <MobileGroup label="Solutions">
              <Link to="/get-solutions-for" onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm font-semibold gradient-text">
                All Solutions →
              </Link>
              {SOLUTION_TOPICS.map((t) => (
                <Link
                  key={t.slug}
                  to={`/${t.slug}` as string}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg"
                >
                  {t.title}
                </Link>
              ))}
            </MobileGroup>

            <MobileGroup label="Practices">
              {practiceLinks.map((l) => (
                <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm text-gray-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg">{l.label}</Link>
              ))}
            </MobileGroup>

            <MobileLink to="/courses" onClick={() => setOpen(false)}>Courses</MobileLink>
            <MobileLink to="/events" onClick={() => setOpen(false)}>Events</MobileLink>

            <MobileGroup label="Initiatives">
              {initiativeLinks.map((l) => (
                <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm text-gray-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg">{l.label}</Link>
              ))}
            </MobileGroup>

            <MobileLink to="/contact" onClick={() => setOpen(false)}>Contact</MobileLink>

            <div className="flex gap-3 pt-4 border-t border-gray-100 mt-2">
              <Link
                to="/initiatives"
                onClick={() => setOpen(false)}
                className="flex-1 btn-gold rounded-full px-4 py-2.5 text-sm font-semibold text-center"
              >
                Donate
              </Link>
              <Link
                to="/book-session"
                onClick={() => setOpen(false)}
                className="flex-1 btn-outline-gold rounded-full px-4 py-2.5 text-sm font-semibold text-center"
              >
                Book Session
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-amber-700 transition-colors rounded-lg hover:bg-amber-50"
      activeProps={{ className: "text-amber-700 bg-amber-50" }}
    >
      {children}
    </Link>
  );
}

function Dropdown({
  label,
  open,
  setOpen,
  wide,
  children,
}: {
  label: string;
  open: boolean;
  setOpen: (v: boolean) => void;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-amber-700 transition-colors rounded-lg hover:bg-amber-50">
        {label}{" "}
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className={`absolute top-full left-0 pt-2 ${wide ? "" : "min-w-[200px]"} z-50`}>
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileLink({ to, onClick, children }: { to: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block px-3 py-3 rounded-xl text-sm font-medium text-gray-800 hover:bg-amber-50 hover:text-amber-700 transition-colors"
    >
      {children}
    </Link>
  );
}

function MobileGroup({ label, children }: { label: string; children: React.ReactNode }) {
  const [o, setO] = useState(false);
  return (
    <div className="rounded-xl overflow-hidden">
      <button
        onClick={() => setO(!o)}
        className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium text-gray-800 hover:bg-amber-50 hover:text-amber-700 transition-colors"
      >
        {label}
        <ChevronDown size={14} className={`transition-transform ${o ? "rotate-180" : ""}`} />
      </button>
      {o && <div className="pl-2 pb-1">{children}</div>}
    </div>
  );
}
