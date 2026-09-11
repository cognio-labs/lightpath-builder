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
  { href: "/initiatives", label: "All Initiatives", desc: "Complete overview of our social impact", icon: Globe, image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=240&q=80&auto=format&fit=crop" },
  { href: "/shiksha-sewa", label: "Shiksha Sewa", desc: "Free schooling for underprivileged children", icon: BookOpen, image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=240&q=80&auto=format&fit=crop" },
  { href: "/annapurna-sewa", label: "Annapurna Sewa", desc: "Free daily nutritious meals for the needy", icon: Utensils, image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=240&q=80&auto=format&fit=crop" },
  { href: "/dhyan-sewa", label: "Dhyan Sewa", desc: "Meditation and inner peace programs", icon: Sparkles, image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=240&q=80&auto=format&fit=crop" },
];

const practiceLinks = [
  { href: "/meditation", label: "Meditation", icon: Headphones, image: "https://images.unsplash.com/photo-1474418397713-7ede21d49118?w=240&q=80&auto=format&fit=crop", desc: "Guided Sakshi Sadhna & silence" },
  { href: "/yoga", label: "Yoga", icon: Flower2, image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=240&q=80&auto=format&fit=crop", desc: "Asanas & physical alignment" },
  { href: "/mindfulness", label: "Mindfulness", icon: Sun, image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=240&q=80&auto=format&fit=crop", desc: "Present-moment awareness in action" },
  { href: "/gratitude", label: "Gratitude", icon: Heart, image: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=240&q=80&auto=format&fit=crop", desc: "Heart opening and appreciation" },
  { href: "/manifestation", label: "Manifestation", icon: Sparkles, image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=240&q=80&auto=format&fit=crop", desc: "Aligning thoughts with reality" },
  { href: "/positive-thinking", label: "Positive Thinking", icon: Smile, image: "https://images.unsplash.com/photo-1499364615650-ec38552f4f34?w=240&q=80&auto=format&fit=crop", desc: "Rewiring mind patterns for joy" },
  { href: "/finding-purpose", label: "Finding Purpose", icon: Compass, image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=240&q=80&auto=format&fit=crop", desc: "Discovering your divine path" },
];

const solutionImages: Record<string, string> = {
  stress: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=240&q=80&auto=format&fit=crop",
  anxiety: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=240&q=80&auto=format&fit=crop",
  depression: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=240&q=80&auto=format&fit=crop",
  parenting: "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=240&q=80&auto=format&fit=crop",
  addictions: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=240&q=80&auto=format&fit=crop",
  overthinking: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=240&q=80&auto=format&fit=crop",
};
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
      className={`sticky top-0 z-[100] w-full transition-colors duration-300 py-3 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-amber-200/70 shadow-[0_10px_30px_rgba(82,22,35,0.08)]"
          : "bg-white border-b border-amber-100/90"
      }`}
    >
      <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center shrink-0 group py-1 mr-4 lg:mr-6 xl:mr-10">
          <img
            src={LOGO_URL}
            alt="Science Divine Foundation"
            className="w-auto h-12 sm:h-13 lg:h-14 object-contain transition-transform duration-200 group-hover:scale-102"
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
          <NavItem href="/" label="Home" pathname={pathname} />

          {/* About Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => {
              setActiveDropdown("about");
              setHoveredNav("about");
            }}
          >
            <button
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs xl:text-sm font-semibold rounded-full transition-colors cursor-pointer relative z-10 whitespace-nowrap ${
                pathname.startsWith("/about") || activeDropdown === "about"
                  ? "text-[#521623] bg-amber-100/70"
                  : "text-[#521623] hover:text-[#B8860B] hover:bg-amber-100/50"
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
            </button>

            <AnimatePresence>
              {activeDropdown === "about" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute top-full left-0 pt-2 z-50 w-72"
                >
                  <div className="bg-[#FFF8E8] rounded-2xl shadow-[0_20px_50px_-10px_rgba(82,22,35,0.18),0_0_20px_rgba(212,175,55,0.12)] border border-amber-300/40 p-2 space-y-1">
                    {aboutLinks.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-amber-100/70 hover:to-amber-50/40 border border-transparent hover:border-amber-300/50 transition-all duration-200 group transform hover:-translate-y-0.5"
                        >
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FFF4D0] to-[#FFE395] border border-amber-400/40 text-[#521623] flex items-center justify-center shrink-0 shadow-[0_3px_10px_rgba(212,175,55,0.25)] group-hover:from-[#521623] group-hover:to-[#3B0F19] group-hover:text-[#FFF8E8] group-hover:border-amber-500/50 transition-all duration-200">
                            <Icon size={17} />
                          </div>
                          <div>
                            <div className="text-sm font-serif font-bold text-[#521623] group-hover:text-[#B8860B] transition-colors">
                              {item.label}
                            </div>
                            <div className="text-[11px] text-amber-950/70 font-medium leading-snug mt-0.5">
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
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs xl:text-sm font-semibold rounded-full transition-colors cursor-pointer relative z-10 whitespace-nowrap ${
                pathname.startsWith("/get-solutions-for") || activeDropdown === "solutions"
                  ? "text-[#521623] bg-amber-100/70"
                  : "text-[#521623] hover:text-[#B8860B] hover:bg-amber-100/50"
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
            </button>

            <AnimatePresence>
              {activeDropdown === "solutions" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute top-full -left-20 pt-2 z-50 w-[580px]"
                >
                  <div className="bg-[#FFF8E8] rounded-2xl shadow-[0_24px_60px_-12px_rgba(82,22,35,0.22),0_0_25px_rgba(212,175,55,0.15)] border border-amber-300/40 p-5 space-y-4 relative overflow-hidden">
                    <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-amber-400/15 blur-2xl pointer-events-none" />

                    <div className="flex items-center justify-between border-b border-amber-200/70 pb-3.5 relative z-10">
                      <div>
                        <h4 className="font-serif font-bold text-base text-[#521623] tracking-wide flex items-center gap-2">
                          <Sparkles size={16} className="text-[#B8860B]" />
                          Spiritual &amp; Wellness Solutions
                        </h4>
                        <p className="text-xs text-amber-950/70 font-medium">
                          Tailored guidance for mind, body &amp; life challenges
                        </p>
                      </div>
                      <Link
                        href="/get-solutions-for"
                        onClick={() => setActiveDropdown(null)}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#551628] text-[#FFF8E8] text-xs font-bold shadow-[0_6px_16px_rgba(85,22,40,0.28)] hover:scale-105 hover:brightness-110 active:scale-95 transition-all"
                      >
                        <span>All Solutions</span>
                        <ArrowRight size={13} />
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 relative z-10">
                      {SOLUTION_TOPICS.map((topic) => {
                        const IconComponent = getSolutionIcon(topic.slug);
                        return (
                          <Link
                            key={topic.slug}
                            href={`/${topic.slug}`}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-start gap-3 p-3 rounded-xl bg-white/60 hover:bg-gradient-to-r hover:from-amber-100/80 hover:to-amber-50/60 border border-amber-200/50 hover:border-amber-300/80 shadow-xs hover:shadow-md transition-all duration-200 group transform hover:-translate-y-0.5"
                          >
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FFF4D0] to-[#FFE395] border border-amber-400/40 text-[#521623] flex items-center justify-center shrink-0 shadow-[0_3px_10px_rgba(212,175,55,0.22)] group-hover:from-[#521623] group-hover:to-[#3B0F19] group-hover:text-[#FFF8E8] group-hover:border-amber-500/50 transition-all duration-200">
                              <IconComponent size={16} />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs sm:text-sm font-serif font-bold text-[#521623] group-hover:text-[#B8860B] transition-colors truncate">
                                {topic.title}
                              </div>
                              <div className="text-[11px] text-amber-950/70 font-medium truncate leading-snug mt-0.5">
                                {topic.tagline || "Guided wisdom & practices"}
                              </div>
                            </div>
                            <img
                              src={solutionImages[topic.slug]}
                              alt=""
                              aria-hidden="true"
                              className="w-12 h-11 rounded-lg object-cover shrink-0 border border-amber-200/70 shadow-sm"
                            />
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
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs xl:text-sm font-semibold rounded-full transition-colors cursor-pointer relative z-10 whitespace-nowrap ${
                activeDropdown === "practices"
                  ? "text-[#521623] bg-amber-100/70"
                  : "text-[#521623] hover:text-[#B8860B] hover:bg-amber-100/50"
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
            </button>

            <AnimatePresence>
              {activeDropdown === "practices" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute top-full left-0 pt-2 z-50 w-72"
                >
                  <div className="bg-[#FFF8E8] rounded-2xl shadow-[0_20px_50px_-10px_rgba(82,22,35,0.18),0_0_20px_rgba(212,175,55,0.12)] border border-amber-300/40 p-2.5 space-y-1">
                    {practiceLinks.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-amber-100/70 hover:to-amber-50/40 border border-transparent hover:border-amber-300/50 transition-all duration-200 group transform hover:-translate-y-0.5"
                        >
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FFF4D0] to-[#FFE395] border border-amber-400/40 text-[#521623] flex items-center justify-center shrink-0 shadow-[0_3px_8px_rgba(212,175,55,0.22)] group-hover:from-[#521623] group-hover:to-[#3B0F19] group-hover:text-[#FFF8E8] transition-all duration-200">
                            <Icon size={15} />
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm font-serif font-bold text-[#521623] group-hover:text-[#B8860B] transition-colors">
                              {item.label}
                            </div>
                            <div className="text-[10px] text-amber-950/70 font-medium leading-none mt-0.5">
                              {item.desc}
                            </div>
                          </div>
                          <img src={item.image} alt="" aria-hidden="true" className="w-11 h-10 rounded-lg object-cover shrink-0 border border-amber-200/70 shadow-sm" />
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Direct Nav Links */}
          <NavItem href="/courses" label="Courses" pathname={pathname} />
          <NavItem href="/events" label="Events" pathname={pathname} />

          {/* Initiatives Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => {
              setActiveDropdown("initiatives");
              setHoveredNav("initiatives");
            }}
          >
            <button
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs xl:text-sm font-semibold rounded-full transition-colors cursor-pointer relative z-10 whitespace-nowrap ${
                pathname.startsWith("/initiatives") || activeDropdown === "initiatives"
                  ? "text-[#521623] bg-amber-100/70"
                  : "text-[#521623] hover:text-[#B8860B] hover:bg-amber-100/50"
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
            </button>

            <AnimatePresence>
              {activeDropdown === "initiatives" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute top-full left-0 pt-2 z-50 w-72"
                >
                  <div className="bg-[#FFF8E8] rounded-2xl shadow-[0_20px_50px_-10px_rgba(82,22,35,0.18),0_0_20px_rgba(212,175,55,0.12)] border border-amber-300/40 p-2 space-y-1">
                    {initiativeLinks.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-amber-100/70 hover:to-amber-50/40 border border-transparent hover:border-amber-300/50 transition-all duration-200 group transform hover:-translate-y-0.5"
                        >
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FFF4D0] to-[#FFE395] border border-amber-400/40 text-[#521623] flex items-center justify-center shrink-0 shadow-[0_3px_10px_rgba(212,175,55,0.25)] group-hover:from-[#521623] group-hover:to-[#3B0F19] group-hover:text-[#FFF8E8] group-hover:border-amber-500/50 transition-all duration-200">
                            <Icon size={17} />
                          </div>
                          <div>
                            <div className="text-sm font-serif font-bold text-[#521623] group-hover:text-[#B8860B] transition-colors">
                              {item.label}
                            </div>
                            <div className="text-[11px] text-amber-950/70 font-medium leading-snug mt-0.5">
                              {item.desc}
                            </div>
                          </div>
                          <img src={item.image} alt="" aria-hidden="true" className="w-11 h-11 rounded-lg object-cover shrink-0 border border-amber-200/70 shadow-sm" />
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavItem href="/contact" label="Contact" pathname={pathname} />
        </nav>

        {/* Right CTA Action Buttons */}
        <div className="flex items-center gap-2.5 xl:gap-3.5 shrink-0 ml-4 lg:ml-6 xl:ml-10">
          {/* Donate Button */}
          <Link
            href="/initiatives"
            className="hidden md:inline-flex items-center justify-center bg-gradient-to-r from-[#521623] to-[#3B0F19] hover:from-[#3B0F19] hover:to-[#2A0A12] text-[#FFFDF5] border border-amber-400/40 rounded-full px-5 xl:px-6 py-2.5 text-xs xl:text-sm font-bold transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
          >
            Donate
          </Link>

          {/* Book Session Button */}
          <Link
            href="/book-session"
            className="hidden md:inline-flex items-center justify-center bg-[#551628] border border-[#551628] text-[#FFF8E8] hover:bg-[#3B0F19] hover:border-[#3B0F19] rounded-full px-5 xl:px-6 py-2.5 text-xs xl:text-sm font-bold transition-all shadow-[0_6px_16px_rgba(85,22,40,0.2)] hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
          >
            Book Session
          </Link>

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
}: {
  href: string;
  label: string;
  pathname: string;
}) {
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`px-3.5 py-2 text-xs xl:text-sm font-semibold rounded-full transition-colors relative z-10 whitespace-nowrap ${
        isActive
          ? "text-[#521623] bg-amber-100/70 font-bold"
          : "text-[#521623] hover:text-[#B8860B] hover:bg-amber-100/50"
      }`}
    >
      <span>{label}</span>
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
