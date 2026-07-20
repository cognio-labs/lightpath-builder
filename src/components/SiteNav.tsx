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
      className={`sticky top-0 z-[100] w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 shadow-sm"
          : "bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-transparent"
      }`}
      style={{ height: "72px" }}
    >
      <div className="container-page flex items-center justify-between h-full">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={LOGO_URL} alt="Science Divine Foundation" className="h-10 md:h-12 w-auto object-contain" />
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
            className="lg:hidden rounded-full p-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 transition-colors border border-amber-200"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} className="text-amber-900" /> : <Menu size={24} className="text-amber-900" />}
          </button>
        </div>
      </div>

      {/* Mobile Full-Screen Menu Overlay */}
      {open && (
        <div
          className="lg:hidden fixed left-0 right-0 bottom-0 z-[9999] overflow-y-auto bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-2xl animate-fade-in"
          style={{ top: "72px" }}
        >
          <div className="container-page py-6 px-4 flex flex-col gap-2 pb-24">
            <MobileLink to="/" onClick={() => setOpen(false)}>Home</MobileLink>

            <MobileGroup label="About Movement & Master">
              {aboutLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-slate-800 transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </MobileGroup>

            <MobileGroup label="Solutions & Guidance">
              <Link to="/get-solutions-for" onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm font-bold text-amber-600 dark:text-amber-400">
                All Solutions Overview →
              </Link>
              {SOLUTION_TOPICS.map((t) => (
                <Link
                  key={t.slug}
                  to={`/${t.slug}` as string}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-slate-800 transition-colors"
                >
                  {t.title}
                </Link>
              ))}
            </MobileGroup>

            <MobileGroup label="Spiritual Practices">
              {practiceLinks.map((l) => (
                <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-slate-800 transition-colors">{l.label}</Link>
              ))}
            </MobileGroup>

            <MobileLink to="/courses" onClick={() => setOpen(false)}>Courses</MobileLink>
            <MobileLink to="/events" onClick={() => setOpen(false)}>Events</MobileLink>

            <MobileGroup label="Seva Initiatives">
              {initiativeLinks.map((l) => (
                <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-slate-800 transition-colors">{l.label}</Link>
              ))}
            </MobileGroup>

            <MobileLink to="/contact" onClick={() => setOpen(false)}>Contact Us</MobileLink>

            <div className="flex flex-col gap-3 pt-6 mt-4 border-t border-slate-200 dark:border-slate-800">
              <Link
                to="/initiatives"
                onClick={() => setOpen(false)}
                className="w-full btn-gold rounded-full py-3.5 text-base font-bold text-center shadow-lg"
              >
                Donate Now
              </Link>
              <Link
                to="/book-session"
                onClick={() => setOpen(false)}
                className="w-full btn-outline-gold rounded-full py-3.5 text-base font-bold text-center"
              >
                Book Personal Session
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
      className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-amber-700 dark:hover:text-amber-500 transition-colors rounded-lg hover:bg-amber-50 dark:hover:bg-slate-800"
      activeProps={{ className: "text-amber-700 bg-amber-50 dark:bg-slate-800" }}
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
      <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-amber-700 dark:hover:text-amber-500 transition-colors rounded-lg hover:bg-amber-50 dark:hover:bg-slate-800">
        {label}{" "}
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className={`absolute top-full left-0 pt-2 ${wide ? "" : "min-w-[200px]"} z-50`}>
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden">
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
      className="block px-4 py-3 rounded-xl text-base font-bold text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-50 dark:hover:bg-slate-800 transition-colors"
    >
      {children}
    </Link>
  );
}

function MobileGroup({ label, children }: { label: string; children: React.ReactNode }) {
  const [o, setO] = useState(true);
  return (
    <div className="rounded-xl overflow-hidden bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
      <button
        onClick={() => setO(!o)}
        className="w-full flex items-center justify-between px-4 py-3 text-base font-bold text-slate-900 dark:text-slate-100 hover:bg-amber-50 dark:hover:bg-slate-800 transition-colors"
      >
        <span>{label}</span>
        <ChevronDown size={16} className={`transition-transform duration-200 text-amber-600 ${o ? "rotate-180" : ""}`} />
      </button>
      {o && <div className="px-2 pb-2 flex flex-col gap-1 border-t border-slate-100 dark:border-slate-800/80 pt-1">{children}</div>}
    </div>
  );
}
