import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, Moon, Sun, Shield } from "lucide-react";
import { LOGO_URL, SOLUTION_TOPICS } from "@/data/content";
import { supabase } from "@/integrations/supabase/client";

const aboutLinks = [
  { to: "/about-movement", label: "About Movement" },
  { to: "/about-sakshi-shree", label: "About Sakshi Shree" },
  { to: "/har-ghar-shiksha", label: "Har Ghar Shiksha, Har Ghar Dhyan" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [solOpen, setSolOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("sd-theme", next ? "dark" : "light");
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "glass-card border-b" : "bg-transparent"
      }`}
    >
      <div className="container-page flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={LOGO_URL} alt="Science Divine" className="h-10 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          <NavLink to="/">Home</NavLink>
          <Dropdown label="About" open={aboutOpen} setOpen={setAboutOpen}>
            {aboutLinks.map(l => (
              <Link key={l.to} to={l.to} className="block px-4 py-2 text-sm hover:bg-secondary rounded-md">{l.label}</Link>
            ))}
          </Dropdown>
          <Dropdown label="Solutions" open={solOpen} setOpen={setSolOpen} wide>
            <div className="grid grid-cols-2 gap-1 min-w-[420px]">
              <Link to="/get-solutions-for" className="col-span-2 block px-4 py-2 text-sm font-semibold gradient-text hover:bg-secondary rounded-md">All Solutions →</Link>
              {SOLUTION_TOPICS.map(t => (
                <Link key={t.slug} to={`/${t.slug}` as string} className="block px-4 py-2 text-sm hover:bg-secondary rounded-md">{t.title}</Link>
              ))}
            </div>
          </Dropdown>
          <NavLink to="/courses">Courses</NavLink>
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/initiatives">Initiatives</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleDark}
            aria-label="Toggle theme"
            className="rounded-full p-2 hover:bg-secondary transition-colors"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link to="/initiatives" className="hidden md:inline-flex btn-gold rounded-full px-5 py-2 text-sm font-semibold">Donate</Link>
          <Link to="/book-session" className="hidden md:inline-flex btn-gradient rounded-full px-5 py-2 text-sm font-semibold">Book Session</Link>
          <button className="lg:hidden rounded-full p-2 hover:bg-secondary" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t glass-card animate-fade-in">
          <div className="container-page py-4 flex flex-col gap-1">
            <MobileLink to="/" onClick={() => setOpen(false)}>Home</MobileLink>
            <MobileGroup label="About">
              {aboutLinks.map(l => (
                <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block px-4 py-2 text-sm hover:bg-secondary rounded-md">{l.label}</Link>
              ))}
            </MobileGroup>
            <MobileGroup label="Solutions">
              <Link to="/get-solutions-for" onClick={() => setOpen(false)} className="block px-4 py-2 text-sm font-semibold gradient-text">All Solutions →</Link>
              {SOLUTION_TOPICS.map(t => (
                <Link key={t.slug} to={`/${t.slug}` as string} onClick={() => setOpen(false)} className="block px-4 py-2 text-sm hover:bg-secondary rounded-md">{t.title}</Link>
              ))}
            </MobileGroup>
            <MobileLink to="/courses" onClick={() => setOpen(false)}>Courses</MobileLink>
            <MobileLink to="/events" onClick={() => setOpen(false)}>Events</MobileLink>
            <MobileLink to="/initiatives" onClick={() => setOpen(false)}>Initiatives</MobileLink>
            <MobileLink to="/contact" onClick={() => setOpen(false)}>Contact</MobileLink>
            <div className="flex gap-2 pt-2">
              <Link to="/initiatives" onClick={() => setOpen(false)} className="flex-1 btn-gold rounded-full px-4 py-2 text-sm font-semibold text-center">Donate</Link>
              <Link to="/book-session" onClick={() => setOpen(false)} className="flex-1 btn-gradient rounded-full px-4 py-2 text-sm font-semibold text-center">Book Session</Link>
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
      className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
      activeProps={{ className: "text-primary" }}
    >
      {children}
    </Link>
  );
}

function Dropdown({ label, open, setOpen, wide, children }: { label: string; open: boolean; setOpen: (v: boolean) => void; wide?: boolean; children: React.ReactNode }) {
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium hover:text-primary transition-colors">
        {label} <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className={`absolute top-full left-0 pt-2 ${wide ? "" : "min-w-[220px]"}`}>
          <div className="glass-card rounded-xl p-2 shadow-lg">{children}</div>
        </div>
      )}
    </div>
  );
}

function MobileLink({ to, onClick, children }: { to: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link to={to} onClick={onClick} className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary">
      {children}
    </Link>
  );
}

function MobileGroup({ label, children }: { label: string; children: React.ReactNode }) {
  const [o, setO] = useState(false);
  return (
    <div>
      <button onClick={() => setO(!o)} className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary">
        {label} <ChevronDown size={14} className={`transition-transform ${o ? "rotate-180" : ""}`} />
      </button>
      {o && <div className="pl-3">{children}</div>}
    </div>
  );
}
