"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Brain,
  Heart,
  Sparkles,
  Briefcase,
  Activity,
  Sun,
  Headphones,
  Flower2,
  Smile,
  Compass,
  Globe,
  BookOpen,
  Utensils,
  GraduationCap,
  Users,
  UserCheck,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import { LOGO_URL, SOLUTION_TOPICS } from "@/data/content";

const aboutLinks = [
  { href: "/about-movement", label: "About the Movement", desc: "Our origin, vision & global mission", icon: Users },
  { href: "/about-sakshi-shree", label: "About Sakshi Shree", desc: "Enlightened master & founder", icon: UserCheck },
];

const initiativeLinks = [
  { href: "/initiatives", label: "All Initiatives", desc: "Complete overview of our social impact", icon: Globe },
  { href: "/shiksha-sewa", label: "Shiksha Sewa", desc: "Free schooling for underprivileged children", icon: BookOpen },
  { href: "/annapurna-sewa", label: "Annapurna Sewa", desc: "Free daily nutritious meals for the needy", icon: Utensils },
  { href: "/dhyan-sewa", label: "Dhyan Sewa", desc: "Meditation and inner peace programs", icon: Sparkles },
  { href: "/har-ghar-shiksha", label: "Har Ghar Shiksha", desc: "Transforming homes through education", icon: GraduationCap },
];

const practiceLinks = [
  { href: "/meditation", label: "Meditation", icon: Headphones, desc: "Guided Sakshi Sadhna & silence" },
  { href: "/yoga", label: "Yoga", icon: Flower2, desc: "Asanas & physical alignment" },
  { href: "/mindfulness", label: "Mindfulness", icon: Sun, desc: "Present-moment awareness in action" },
  { href: "/gratitude", label: "Gratitude", icon: Heart, desc: "Heart opening and appreciation" },
  { href: "/manifestation", label: "Manifestation", icon: Sparkles, desc: "Aligning thoughts with reality" },
  { href: "/positive-thinking", label: "Positive Thinking", icon: Smile, desc: "Rewiring mind patterns for joy" },
  { href: "/finding-purpose", label: "Finding Purpose", icon: Compass, desc: "Discovering your divine path" },
];

// Helper icon mapping for solutions mega menu
const getSolutionIcon = (slug: string) => {
  switch (slug) {
    case "stress":
      return Activity;
    case "anxiety":
      return ShieldAlert;
    case "depression":
      return Sun;
    case "parenting":
      return Users;
    case "addictions":
      return Brain;
    case "overthinking":
      return Brain;
    case "meditation":
      return Headphones;
    case "manifestation":
      return Sparkles;
    case "finding-purpose":
      return Compass;
    default:
      return Heart;
  }
};

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  // Monitor scroll for compact animated navbar transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on Escape key or route change
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setActiveDropdown(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    setOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-[100] w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-amber-200/70 shadow-[0_10px_30px_rgba(82,22,35,0.08)] py-2"
          : "bg-white border-b border-amber-100/90 py-3"
      }`}
    >
      <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center shrink-0 group py-1 mr-4 lg:mr-6 xl:mr-10">
          <motion.img
            src={LOGO_URL}
            alt="Science Divine Foundation"
            className={`w-auto object-contain transition-all ${
              scrolled ? "h-11 sm:h-12 lg:h-13" : "h-12 sm:h-14 lg:h-15"
            }`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden lg:flex items-center gap-1 xl:gap-2.5 2xl:gap-3.5 relative"
          onMouseLeave={() => {
            setHoveredNav(null);
            setActiveDropdown(null);
          }}
        >
          {/* Home Link */}
          <NavItem href="/" label="Home" pathname={pathname} hoveredNav={hoveredNav} setHoveredNav={setHoveredNav} />

          {/* About Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => {
              setActiveDropdown("about");
              setHoveredNav("about");
            }}
          >
            <button
              className={`flex items-center gap-1.5 px-3 xl:px-3.5 py-2 text-xs xl:text-sm font-semibold rounded-full transition-all cursor-pointer relative z-10 whitespace-nowrap ${
                pathname.startsWith("/about") ? "text-[#521623] font-bold" : "text-[#521623] hover:text-[#B8860B]"
              }`}
              aria-expanded={activeDropdown === "about"}
            >
              <span>About</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 text-[#8B6914] ${
                  activeDropdown === "about" ? "rotate-180" : ""
                }`}
              />
              {hoveredNav === "about" && (
                <motion.div
                  layoutId="nav-hover-pill"
                  className="absolute inset-0 bg-amber-100/60 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            <AnimatePresence>
              {activeDropdown === "about" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full left-0 pt-2 z-50 w-72"
                >
                  <div className="bg-white/98 backdrop-blur-xl rounded-2xl shadow-2xl border border-amber-200/90 p-2 space-y-1">
                    {aboutLinks.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-amber-50/80 transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-amber-100/70 text-[#8B6914] flex items-center justify-center shrink-0 group-hover:bg-[#521623] group-hover:text-white transition-colors">
                            <Icon size={16} />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-[#521623] group-hover:text-[#8B6914]">
                              {item.label}
                            </div>
                            <div className="text-[11px] text-gray-500 font-medium leading-snug">
                              {item.desc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Solutions Mega Menu */}
          <div
            className="relative"
            onMouseEnter={() => {
              setActiveDropdown("solutions");
              setHoveredNav("solutions");
            }}
          >
            <button
              className={`flex items-center gap-1.5 px-3 xl:px-3.5 py-2 text-xs xl:text-sm font-semibold rounded-full transition-all cursor-pointer relative z-10 whitespace-nowrap ${
                pathname.startsWith("/get-solutions-for") ? "text-[#521623] font-bold" : "text-[#521623] hover:text-[#B8860B]"
              }`}
              aria-expanded={activeDropdown === "solutions"}
            >
              <span>Solutions</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 text-[#8B6914] ${
                  activeDropdown === "solutions" ? "rotate-180" : ""
                }`}
              />
              {hoveredNav === "solutions" && (
                <motion.div
                  layoutId="nav-hover-pill"
                  className="absolute inset-0 bg-amber-100/60 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            <AnimatePresence>
              {activeDropdown === "solutions" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full -left-20 pt-2 z-50 w-[580px]"
                >
                  <div className="bg-white/98 backdrop-blur-xl rounded-2xl shadow-2xl border border-amber-200/90 p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-amber-100 pb-3">
                      <div>
                        <h4 className="font-serif font-bold text-base text-[#521623]">
                          Spiritual &amp; Wellness Solutions
                        </h4>
                        <p className="text-xs text-gray-500">
                          Tailored guidance for mind, body &amp; life challenges
                        </p>
                      </div>
                      <Link
                        href="/get-solutions-for"
                        onClick={() => setActiveDropdown(null)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-100/80 text-[#8B6914] text-xs font-bold hover:bg-[#521623] hover:text-white transition-colors"
                      >
                        <span>All Solutions</span>
                        <ArrowRight size={13} />
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {SOLUTION_TOPICS.map((topic) => {
                        const IconComponent = getSolutionIcon(topic.slug);
                        return (
                          <Link
                            key={topic.slug}
                            href={`/${topic.slug}`}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-amber-50/80 border border-transparent hover:border-amber-200/60 transition-all group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-amber-100/60 text-[#8B6914] flex items-center justify-center shrink-0 group-hover:bg-[#521623] group-hover:text-white transition-colors">
                              <IconComponent size={15} />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs sm:text-sm font-bold text-[#521623] group-hover:text-[#8B6914] truncate">
                                {topic.title}
                              </div>
                              <div className="text-[11px] text-gray-500 font-medium truncate leading-tight">
                                {topic.tagline || "Guided wisdom & practices"}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Practices Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => {
              setActiveDropdown("practices");
              setHoveredNav("practices");
            }}
          >
            <button
              className={`flex items-center gap-1.5 px-3 xl:px-3.5 py-2 text-xs xl:text-sm font-semibold rounded-full transition-all cursor-pointer relative z-10 whitespace-nowrap ${
                activeDropdown === "practices" ? "text-[#521623] font-bold" : "text-[#521623] hover:text-[#B8860B]"
              }`}
              aria-expanded={activeDropdown === "practices"}
            >
              <span>Practices</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 text-[#8B6914] ${
                  activeDropdown === "practices" ? "rotate-180" : ""
                }`}
              />
              {hoveredNav === "practices" && (
                <motion.div
                  layoutId="nav-hover-pill"
                  className="absolute inset-0 bg-amber-100/60 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            <AnimatePresence>
              {activeDropdown === "practices" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full left-0 pt-2 z-50 w-72"
                >
                  <div className="bg-white/98 backdrop-blur-xl rounded-2xl shadow-2xl border border-amber-200/90 p-2 space-y-0.5">
                    {practiceLinks.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-amber-50/80 transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-md bg-amber-100/70 text-[#8B6914] flex items-center justify-center shrink-0 group-hover:bg-[#521623] group-hover:text-white transition-colors">
                            <Icon size={14} />
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm font-bold text-[#521623] group-hover:text-[#8B6914]">
                              {item.label}
                            </div>
                            <div className="text-[10px] text-gray-500 font-medium leading-none">
                              {item.desc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Direct Nav Links */}
          <NavItem href="/courses" label="Courses" pathname={pathname} hoveredNav={hoveredNav} setHoveredNav={setHoveredNav} />
          <NavItem href="/events" label="Events" pathname={pathname} hoveredNav={hoveredNav} setHoveredNav={setHoveredNav} />

          {/* Initiatives Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => {
              setActiveDropdown("initiatives");
              setHoveredNav("initiatives");
            }}
          >
            <button
              className={`flex items-center gap-1.5 px-3 xl:px-3.5 py-2 text-xs xl:text-sm font-semibold rounded-full transition-all cursor-pointer relative z-10 whitespace-nowrap ${
                pathname.startsWith("/initiatives") ? "text-[#521623] font-bold" : "text-[#521623] hover:text-[#B8860B]"
              }`}
              aria-expanded={activeDropdown === "initiatives"}
            >
              <span>Initiatives</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 text-[#8B6914] ${
                  activeDropdown === "initiatives" ? "rotate-180" : ""
                }`}
              />
              {hoveredNav === "initiatives" && (
                <motion.div
                  layoutId="nav-hover-pill"
                  className="absolute inset-0 bg-amber-100/60 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            <AnimatePresence>
              {activeDropdown === "initiatives" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full left-0 pt-2 z-50 w-72"
                >
                  <div className="bg-white/98 backdrop-blur-xl rounded-2xl shadow-2xl border border-amber-200/90 p-2 space-y-1">
                    {initiativeLinks.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-amber-50/80 transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-amber-100/70 text-[#8B6914] flex items-center justify-center shrink-0 group-hover:bg-[#521623] group-hover:text-white transition-colors">
                            <Icon size={16} />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-[#521623] group-hover:text-[#8B6914]">
                              {item.label}
                            </div>
                            <div className="text-[11px] text-gray-500 font-medium leading-snug">
                              {item.desc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavItem href="/contact" label="Contact" pathname={pathname} hoveredNav={hoveredNav} setHoveredNav={setHoveredNav} />
        </nav>

        {/* Right CTA Action Buttons */}
        <div className="flex items-center gap-2.5 xl:gap-3.5 shrink-0 ml-4 lg:ml-6 xl:ml-10">
          {/* Donate Button */}
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Link
              href="/initiatives"
              className="hidden md:inline-flex items-center justify-center bg-[#521623] hover:bg-[#3B0F19] text-white border border-amber-400/40 rounded-full px-5 xl:px-6 py-2.5 text-xs xl:text-sm font-bold transition-all shadow-md hover:shadow-xl cursor-pointer whitespace-nowrap"
            >
              Donate
            </Link>
          </motion.div>

          {/* Book Session Button */}
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Link
              href="/book-session"
              className="hidden md:inline-flex items-center justify-center border-2 border-[#521623] text-[#521623] hover:bg-[#521623] hover:text-white rounded-full px-5 xl:px-6 py-2.5 text-xs xl:text-sm font-bold transition-all shadow-xs hover:shadow-md cursor-pointer whitespace-nowrap"
            >
              Book Session
            </Link>
          </motion.div>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            className="lg:hidden rounded-full w-11 h-11 flex items-center justify-center bg-amber-50 hover:bg-amber-100 text-[#521623] border border-amber-200 shadow-xs transition-colors cursor-pointer"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="lg:hidden fixed left-0 right-0 top-[76px] bottom-0 z-[9999] bg-white/98 backdrop-blur-2xl overflow-y-auto border-t border-amber-200/80 shadow-2xl"
          >
            <div className="container-page py-6 px-4 flex flex-col gap-3 pb-24">
              
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-2xl bg-amber-50/70 font-bold text-base text-[#521623]"
              >
                Home
              </Link>

              {/* Mobile Accordions */}
              <MobileGroup label="About Movement & Master">
                {aboutLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-amber-800 hover:bg-amber-50 rounded-xl"
                  >
                    {l.label}
                  </Link>
                ))}
              </MobileGroup>

              <MobileGroup label="Solutions & Guidance">
                <Link
                  href="/get-solutions-for"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 text-sm font-bold text-amber-700 hover:underline"
                >
                  All Solutions Overview →
                </Link>
                {SOLUTION_TOPICS.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/${t.slug}`}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2 text-xs sm:text-sm font-semibold text-gray-700 hover:text-amber-800 hover:bg-amber-50 rounded-xl"
                  >
                    {t.title}
                  </Link>
                ))}
              </MobileGroup>

              <MobileGroup label="Spiritual Practices">
                {practiceLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-amber-800 hover:bg-amber-50 rounded-xl"
                  >
                    {l.label}
                  </Link>
                ))}
              </MobileGroup>

              <Link
                href="/courses"
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-2xl bg-amber-50/70 font-bold text-base text-[#521623]"
              >
                Courses
              </Link>

              <Link
                href="/events"
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-2xl bg-amber-50/70 font-bold text-base text-[#521623]"
              >
                Events
              </Link>

              <MobileGroup label="Seva Initiatives">
                {initiativeLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-amber-800 hover:bg-amber-50 rounded-xl"
                  >
                    {l.label}
                  </Link>
                ))}
              </MobileGroup>

              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-2xl bg-amber-50/70 font-bold text-base text-[#521623]"
              >
                Contact Us
              </Link>

              {/* Mobile CTA Buttons */}
              <div className="flex flex-col gap-3 pt-4 border-t border-amber-200/80 mt-2">
                <Link
                  href="/initiatives"
                  onClick={() => setOpen(false)}
                  className="w-full bg-[#521623] text-white rounded-full py-3.5 text-center font-bold text-base shadow-md"
                >
                  Donate Now
                </Link>
                <Link
                  href="/book-session"
                  onClick={() => setOpen(false)}
                  className="w-full border-2 border-[#521623] text-[#521623] rounded-full py-3.5 text-center font-bold text-base"
                >
                  Book Personal Session
                </Link>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavItem({
  href,
  label,
  pathname,
  hoveredNav,
  setHoveredNav,
}: {
  href: string;
  label: string;
  pathname: string;
  hoveredNav: string | null;
  setHoveredNav: (v: string | null) => void;
}) {
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      onMouseEnter={() => setHoveredNav(href)}
      className={`px-3 xl:px-3.5 py-2 text-xs xl:text-sm font-semibold rounded-full transition-all relative z-10 whitespace-nowrap ${
        isActive ? "text-[#521623] font-bold" : "text-[#521623] hover:text-[#B8860B]"
      }`}
    >
      <span>{label}</span>
      {hoveredNav === href && (
        <motion.div
          layoutId="nav-hover-pill"
          className="absolute inset-0 bg-amber-100/60 rounded-full -z-10"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
}

function MobileGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [openGroup, setOpenGroup] = useState(false);
  return (
    <div className="rounded-2xl bg-amber-50/50 border border-amber-200/60 overflow-hidden">
      <button
        onClick={() => setOpenGroup(!openGroup)}
        className="w-full flex items-center justify-between px-4 py-3 text-base font-bold text-[#521623]"
      >
        <span>{label}</span>
        <ChevronDown
          size={18}
          className={`transition-transform duration-200 text-[#8B6914] ${
            openGroup ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {openGroup && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="px-2 pb-3 flex flex-col gap-1 border-t border-amber-200/60 pt-2"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SiteNav;
