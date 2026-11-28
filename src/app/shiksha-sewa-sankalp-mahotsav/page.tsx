import type { Metadata } from "next";
import Image from "next/image";
import "@/components/mahotsav/mahotsav.css";
import { plusJakarta } from "@/components/mahotsav/fonts";
import {
  ArrowRight,
  Calendar,
  Clock,
  ExternalLink,
  MapPin,
  Music2,
  Phone,
  Sparkles,
} from "lucide-react";
import heroPortrait from "../../../public/mahotsav/images/sadguru-hero-cutout.png";
import invitationPortrait from "../../../public/mahotsav/images/sadguru-invitation-cutout.png";
import bhajanClubbingPoster from "../../../public/mahotsav/images/bhajan-clubbing.jpg";
import { CountdownBadge } from "@/components/mahotsav/CountdownBadge";
import { FaqSection } from "@/components/mahotsav/FaqSection";
import { GallerySection } from "@/components/mahotsav/GallerySection";
import { SacredDivider } from "@/components/mahotsav/LotusOrnament";
import { MobileRegisterBar } from "@/components/mahotsav/MobileRegisterBar";
import { RegistrationModal } from "@/components/mahotsav/RegistrationModal";
import { ProgrammeHighlights } from "@/components/mahotsav/ProgrammeHighlights";
import { StageCurtain } from "@/components/mahotsav/StageCurtain";
import { Toran } from "@/components/mahotsav/Toran";
import {
  ABOUT_PILLARS,
  EVENT_CONFIG,
  GALLERY_ITEMS,
  LOVE_AND_JOY_PARAGRAPHS,
  PAGE_PATH,
  SITE_URL,
} from "@/lib/mahotsav/event";

export const metadata: Metadata = {
  title: `${EVENT_CONFIG.honoree} — ${EVENT_CONFIG.title} | ${EVENT_CONFIG.organiser}`,
  description:
    "Join Science Divine Foundation on 13 December 2026 from 9:30 AM at Siddha Sudarshan Sakshi Dham, Ghaziabad for the Birthday Celebration of Sadguru Sakshi Shree — Morning Aarti, Cultural Performances, Live Bhajan Clubbing, Spiritual Discourses, Blessings & Prasad.",
  keywords: [
    "Sadguru Sakshi Shree",
    "Birthday Celebration 2026",
    "Science Divine Foundation",
    "Bhajan Clubbing",
    "Arjun Bhowmick",
    "Siddha Sudarshan Sakshi Dham",
    "Ghaziabad",
    "13 December 2026",
    "Shiksha Sewa Sankalp Mahotsav",
  ],
  alternates: {
    canonical: PAGE_PATH,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: EVENT_CONFIG.organiser,
    title: `${EVENT_CONFIG.honoree} — ${EVENT_CONFIG.title}`,
    description: `${EVENT_CONFIG.subtitle} • ${EVENT_CONFIG.dateDisplay} at ${EVENT_CONFIG.startTime} • ${EVENT_CONFIG.venueLocation}`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${EVENT_CONFIG.honoree} — ${EVENT_CONFIG.title}`,
    description: `${EVENT_CONFIG.subtitle} • ${EVENT_CONFIG.dateDisplay} starting at ${EVENT_CONFIG.startTime}. Reserve your presence today.`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const LOTUS_TILE = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><g fill="none" stroke="#C8923A" stroke-opacity="0.28" stroke-width="1"><path d="M32 20c4.5 5 4.5 9 0 12c-4.5-3-4.5-7 0-12z"/><path d="M32 44c4.5-5 4.5-9 0-12c-4.5 3-4.5 7 0 12z"/><path d="M20 32c5-4.5 9-4.5 12 0c-3 4.5-7 4.5-12 0z"/><path d="M44 32c-5-4.5-9-4.5-12 0c3 4.5 7 4.5 12 0z"/></g><g fill="#C8923A" fill-opacity="0.3"><circle cx="0" cy="0" r="1.6"/><circle cx="64" cy="0" r="1.6"/><circle cx="0" cy="64" r="1.6"/><circle cx="64" cy="64" r="1.6"/></g></svg>`;
const LOTUS_PATTERN = `url("data:image/svg+xml,${encodeURIComponent(LOTUS_TILE)}")`;

// Jaali (temple lattice) for the dark schedule section
const JAALI_TILE = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><g fill="none" stroke="#F2C97D" stroke-opacity="0.13" stroke-width="1"><path d="M24 0L48 24L24 48L0 24Z"/><path d="M24 10L38 24L24 38L10 24Z"/></g><circle cx="24" cy="24" r="2.2" fill="#F2C97D" fill-opacity="0.22"/><g fill="#F2C97D" fill-opacity="0.16"><circle cx="0" cy="0" r="1.4"/><circle cx="48" cy="0" r="1.4"/><circle cx="0" cy="48" r="1.4"/><circle cx="48" cy="48" r="1.4"/></g></svg>`;
const JAALI_PATTERN = `url("data:image/svg+xml,${encodeURIComponent(JAALI_TILE)}")`;

// Rangoli flower motif for the Glimpses section
const RANGOLI_TILE = `<svg xmlns="http://www.w3.org/2000/svg" width="88" height="88" viewBox="0 0 88 88"><g fill="none" stroke="#C8923A" stroke-opacity="0.26" stroke-width="1"><ellipse cx="44" cy="36" rx="2.8" ry="6.5" transform="rotate(0 44 44)"/><ellipse cx="44" cy="36" rx="2.8" ry="6.5" transform="rotate(45 44 44)"/><ellipse cx="44" cy="36" rx="2.8" ry="6.5" transform="rotate(90 44 44)"/><ellipse cx="44" cy="36" rx="2.8" ry="6.5" transform="rotate(135 44 44)"/><ellipse cx="44" cy="36" rx="2.8" ry="6.5" transform="rotate(180 44 44)"/><ellipse cx="44" cy="36" rx="2.8" ry="6.5" transform="rotate(225 44 44)"/><ellipse cx="44" cy="36" rx="2.8" ry="6.5" transform="rotate(270 44 44)"/><ellipse cx="44" cy="36" rx="2.8" ry="6.5" transform="rotate(315 44 44)"/><circle cx="44" cy="44" r="2" fill="#D49635" fill-opacity="0.35" stroke="none"/><ellipse cx="0" cy="-8" rx="2.8" ry="6.5" transform="rotate(0 0 0)"/><ellipse cx="0" cy="-8" rx="2.8" ry="6.5" transform="rotate(45 0 0)"/><ellipse cx="0" cy="-8" rx="2.8" ry="6.5" transform="rotate(90 0 0)"/><ellipse cx="0" cy="-8" rx="2.8" ry="6.5" transform="rotate(135 0 0)"/><ellipse cx="0" cy="-8" rx="2.8" ry="6.5" transform="rotate(180 0 0)"/><ellipse cx="0" cy="-8" rx="2.8" ry="6.5" transform="rotate(225 0 0)"/><ellipse cx="0" cy="-8" rx="2.8" ry="6.5" transform="rotate(270 0 0)"/><ellipse cx="0" cy="-8" rx="2.8" ry="6.5" transform="rotate(315 0 0)"/><circle cx="0" cy="0" r="2" fill="#D49635" fill-opacity="0.35" stroke="none"/><ellipse cx="88" cy="-8" rx="2.8" ry="6.5" transform="rotate(0 88 0)"/><ellipse cx="88" cy="-8" rx="2.8" ry="6.5" transform="rotate(45 88 0)"/><ellipse cx="88" cy="-8" rx="2.8" ry="6.5" transform="rotate(90 88 0)"/><ellipse cx="88" cy="-8" rx="2.8" ry="6.5" transform="rotate(135 88 0)"/><ellipse cx="88" cy="-8" rx="2.8" ry="6.5" transform="rotate(180 88 0)"/><ellipse cx="88" cy="-8" rx="2.8" ry="6.5" transform="rotate(225 88 0)"/><ellipse cx="88" cy="-8" rx="2.8" ry="6.5" transform="rotate(270 88 0)"/><ellipse cx="88" cy="-8" rx="2.8" ry="6.5" transform="rotate(315 88 0)"/><circle cx="88" cy="0" r="2" fill="#D49635" fill-opacity="0.35" stroke="none"/><ellipse cx="0" cy="80" rx="2.8" ry="6.5" transform="rotate(0 0 88)"/><ellipse cx="0" cy="80" rx="2.8" ry="6.5" transform="rotate(45 0 88)"/><ellipse cx="0" cy="80" rx="2.8" ry="6.5" transform="rotate(90 0 88)"/><ellipse cx="0" cy="80" rx="2.8" ry="6.5" transform="rotate(135 0 88)"/><ellipse cx="0" cy="80" rx="2.8" ry="6.5" transform="rotate(180 0 88)"/><ellipse cx="0" cy="80" rx="2.8" ry="6.5" transform="rotate(225 0 88)"/><ellipse cx="0" cy="80" rx="2.8" ry="6.5" transform="rotate(270 0 88)"/><ellipse cx="0" cy="80" rx="2.8" ry="6.5" transform="rotate(315 0 88)"/><circle cx="0" cy="88" r="2" fill="#D49635" fill-opacity="0.35" stroke="none"/><ellipse cx="88" cy="80" rx="2.8" ry="6.5" transform="rotate(0 88 88)"/><ellipse cx="88" cy="80" rx="2.8" ry="6.5" transform="rotate(45 88 88)"/><ellipse cx="88" cy="80" rx="2.8" ry="6.5" transform="rotate(90 88 88)"/><ellipse cx="88" cy="80" rx="2.8" ry="6.5" transform="rotate(135 88 88)"/><ellipse cx="88" cy="80" rx="2.8" ry="6.5" transform="rotate(180 88 88)"/><ellipse cx="88" cy="80" rx="2.8" ry="6.5" transform="rotate(225 88 88)"/><ellipse cx="88" cy="80" rx="2.8" ry="6.5" transform="rotate(270 88 88)"/><ellipse cx="88" cy="80" rx="2.8" ry="6.5" transform="rotate(315 88 88)"/><circle cx="88" cy="88" r="2" fill="#D49635" fill-opacity="0.35" stroke="none"/></g><g fill="#B5741D" fill-opacity="0.22"><circle cx="44" cy="0" r="1.3"/><circle cx="44" cy="88" r="1.3"/><circle cx="0" cy="44" r="1.3"/><circle cx="88" cy="44" r="1.3"/></g></svg>`;
const RANGOLI_PATTERN = `url("data:image/svg+xml,${encodeURIComponent(RANGOLI_TILE)}")`;

// Music notes & sparkles for the Bhajan Clubbing section
const NOTES_TILE = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><g fill="#F2C97D" fill-opacity="0.13"><ellipse cx="20" cy="62" rx="5" ry="3.6" transform="rotate(-20 20 62)"/><rect x="23.6" y="38" width="1.6" height="24"/><path d="M25.2 38c7 2.5 9 6 7 12c-1-4-3.5-6-7-7z"/><ellipse cx="60" cy="30" rx="4.6" ry="3.3" transform="rotate(-20 60 30)"/><ellipse cx="76" cy="26" rx="4.6" ry="3.3" transform="rotate(-20 76 26)"/><rect x="63.4" y="12" width="1.5" height="18"/><rect x="79.4" y="8" width="1.5" height="18"/><path d="M63.4 12L80.9 8v3.6L63.4 15.6z"/><path d="M70 70l1.6 4.4L76 76l-4.4 1.6L70 82l-1.6-4.4L64 76l4.4-1.6z"/><circle cx="44" cy="86" r="1.4"/><circle cx="88" cy="56" r="1.2"/><circle cx="8" cy="20" r="1.2"/></g></svg>`;
const NOTES_PATTERN = `url("data:image/svg+xml,${encodeURIComponent(NOTES_TILE)}")`;

// Small mandala rings for the About section
const MANDALA_TILE = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><g fill="none" stroke="#C8923A" stroke-opacity="0.2" stroke-width="1"><circle cx="40" cy="40" r="12" stroke-dasharray="2 3"/><circle cx="40" cy="40" r="7"/><path d="M40 30v20M30 40h20" stroke-opacity="0.14"/></g><circle cx="40" cy="40" r="1.8" fill="#C8923A" fill-opacity="0.25"/><g fill="#C8923A" fill-opacity="0.18"><circle cx="0" cy="0" r="1.4"/><circle cx="80" cy="0" r="1.4"/><circle cx="0" cy="80" r="1.4"/><circle cx="80" cy="80" r="1.4"/></g></svg>`;
const MANDALA_PATTERN = `url("data:image/svg+xml,${encodeURIComponent(MANDALA_TILE)}")`;
// Fine gold dot grid for the Venue section
const DOT_PATTERN = "radial-gradient(rgba(154,98,19,0.16) 1.1px, transparent 1.6px)";

// Temple-arch (ogee) lattice for the FAQ section
const ARCH_TILE = `<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72"><g fill="none" stroke="#C8923A" stroke-opacity="0.30" stroke-width="1"><path d="M0 72V46C0 30 18 24 36 6C54 24 72 30 72 46V72"/><path d="M10 72V50C10 38 24 33 36 20C48 33 62 38 62 50V72" stroke-opacity="0.18"/></g><circle cx="36" cy="6" r="1.8" fill="#C8923A" fill-opacity="0.4"/><circle cx="36" cy="30" r="1.2" fill="#C8923A" fill-opacity="0.28"/></svg>`;
const ARCH_PATTERN = `url("data:image/svg+xml,${encodeURIComponent(ARCH_TILE)}")`;

const CELEBRATION_MOMENTS = [
  "Morning Aarti",
  "Cultural Performances",
  "Bhajan Clubbing",
  "Spiritual Discourses",
  "Gurudev's Blessings",
  "Prasad",
];

export default function HomePage() {

  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${EVENT_CONFIG.festivalName} — ${EVENT_CONFIG.honoree} Birthday Celebration`,
    description: EVENT_CONFIG.heroDescription,
    startDate: EVENT_CONFIG.isoStartDate,
    endDate: EVENT_CONFIG.isoEndDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    url: SITE_URL,
    isAccessibleForFree: true,
    location: {
      "@type": "Place",
      name: EVENT_CONFIG.venueName,
      address: {
        "@type": "PostalAddress",
        streetAddress: "8/9, Avantika Road, Chiranjiv Vihar, Shastri Nagar",
        addressLocality: "Ghaziabad",
        addressRegion: "UP",
        postalCode: "201002",
        addressCountry: "IN",
      },
    },
    organizer: {
      "@type": "Organization",
      name: EVENT_CONFIG.organiser,
      url: EVENT_CONFIG.mainWebsiteUrl,
    },
  };

  return (
    // -mb-6 cancels the site layout's mobile bottom padding so the footer sits flush.
    <div
      className={`${plusJakarta.variable} mahotsav-root -mb-6 flex flex-col antialiased selection:bg-[#5E1216] selection:text-[#FDF8EF] lg:mb-0`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />

      <RegistrationModal />
      <MobileRegisterBar />

      <div className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden">
          {/* Soft warm glows */}
          <div
            className="pointer-events-none absolute -top-24 left-1/3 h-80 w-[44rem] -translate-x-1/2 rounded-full bg-[#F2C97D]/25 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -right-24 top-1/4 h-[34rem] w-[34rem] rounded-full bg-[#F2C97D]/35 blur-[110px]"
            aria-hidden="true"
          />

          <div className="mh-hero-grid relative mx-auto grid max-w-6xl grid-cols-1 items-end gap-4 px-4 pt-6 sm:px-6 sm:pt-8 lg:min-h-[calc(100svh-73px)] lg:grid-cols-12 lg:items-center lg:gap-8 lg:pt-0">
            {/* Left Copy */}
            <div className="relative z-10 pb-2 lg:col-span-7 lg:self-center lg:max-w-[40rem] lg:pb-16 lg:pt-12 xl:pb-20 xl:pt-14">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#5E1216] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#F2C97D]">
                  <Sparkles className="h-3.5 w-3.5" />
                  {EVENT_CONFIG.organiser}
                </span>
                <CountdownBadge />
              </div>

              <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#9A6213] sm:mt-5 sm:text-sm sm:tracking-[0.26em]">
                {EVENT_CONFIG.title}
              </p>

              <h1 className="mt-2 font-mahotsav-display text-[2.35rem] font-bold uppercase leading-[1.03] min-[400px]:text-[2.6rem] tracking-tight text-[#5E1216] sm:text-5xl lg:text-[3.25rem] xl:text-[3.6rem]">
                {EVENT_CONFIG.festivalName}
              </h1>

              <p className="mt-2 font-mahotsav-display text-[1.4rem] font-semibold italic text-[#7A1B1F] sm:mt-3 sm:text-3xl lg:mt-2 lg:text-[1.75rem]">
                {EVENT_CONFIG.subtitle}
              </p>

              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#4A362A] sm:mt-4 sm:text-lg lg:mt-3 lg:text-base">
                {EVENT_CONFIG.heroDescription}
              </p>

              {/* Key Date, Time, Venue Cards */}
              <div className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-7 sm:grid-cols-3 sm:gap-3 lg:mt-5">
                <div className="rounded-2xl border border-[#E8D8BC] bg-[#FFFCF6]/95 p-3.5 shadow-xs">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#9A6213]">
                    <Calendar className="h-3.5 w-3.5" />
                    Date
                  </div>
                  <p className="mt-1 font-mahotsav-display text-base font-bold text-[#5E1216] sm:text-lg">
                    {EVENT_CONFIG.dateDisplay}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#E8D8BC] bg-[#FFFCF6]/95 p-3.5 shadow-xs">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#9A6213]">
                    <Clock className="h-3.5 w-3.5" />
                    Starting Time
                  </div>
                  <p className="mt-1 font-mahotsav-display text-base font-bold text-[#5E1216] sm:text-lg">
                    {EVENT_CONFIG.startTime} Onwards
                  </p>
                </div>

                <div className="col-span-2 rounded-2xl border border-[#E8D8BC] bg-[#FFFCF6]/95 p-3.5 shadow-xs sm:col-span-1">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#9A6213]">
                    <MapPin className="h-3.5 w-3.5" />
                    Venue
                  </div>
                  <p className="mt-1 text-xs font-bold leading-snug text-[#5E1216] sm:text-sm">
                    {EVENT_CONFIG.venueLocation}
                  </p>
                </div>
              </div>

              {/* Hero CTAs */}
              <div className="mt-6 flex flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4 lg:mt-6">
                <a
                  href="#register"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#5E1216] via-[#7A1B1F] to-[#5E1216] px-7 py-4 text-xs font-bold uppercase tracking-[0.16em] text-[#FDF8EF] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl sm:w-auto"
                >
                  Register Now
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#schedule"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#D49635] bg-[#FFFCF6] px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-[#5E1216] transition-colors hover:bg-[#F6ECDA] sm:w-auto"
                >
                  Explore Program
                </a>
              </div>
              <p className="mt-3 text-xs font-medium text-[#695347]">
                Celebrate This Special Day With Us • {EVENT_CONFIG.entryNote}
              </p>
            </div>

            {/* Right: cut-out portrait, no frame, standing on the section edge */}
            {/* Mobile / tablet: in-flow below the copy */}
            <div className="relative mx-auto mt-2 w-full max-w-[21rem] sm:max-w-md lg:hidden">
              <Image
                src={heroPortrait}
                alt="Sadguru Sakshi Shree"
                priority
                sizes="90vw"
                className="h-auto w-full"
              />
            </div>

            {/* Desktop: sized from the hero height so the figure fills it top to bottom */}
            <div className="pointer-events-none absolute bottom-0 right-[-3rem] top-3 hidden w-[60%] lg:block xl:right-[-4rem] mh-hero-portrait">
              <Image
                src={heroPortrait}
                alt="Sadguru Sakshi Shree"
                priority
                fill
                sizes="680px"
                className="object-contain object-right-bottom"
              />
            </div>
          </div>
          {/* Sits above the portrait: fades the hero (and the robe) into the toran colour below so they meet without a seam */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0"
            style={{ zIndex: 5, height: "7rem", backgroundImage: "linear-gradient(180deg, rgba(251,242,227,0) 0%, #FBF2E3 100%)" }}
            aria-hidden="true"
          />
        </section>

        {/* LIVE BHAJAN CLUBBING SPOTLIGHT (incorporates user's 2nd uploaded image) */}
        <section
          className="relative overflow-hidden py-10 text-[#FDF8EF] sm:py-12"
          style={{
            backgroundColor: "#2B0A0C",
            backgroundImage: `radial-gradient(ellipse 40% 60% at 28% 50%, rgba(212,150,53,0.22), rgba(43,10,12,0) 70%), radial-gradient(ellipse 45% 55% at 78% 45%, rgba(122,27,31,0.55), rgba(43,10,12,0) 70%), ${NOTES_PATTERN}, linear-gradient(180deg, #2B0A0C 0%, #430A0D 50%, #2B0A0C 100%)`,
            backgroundSize: "auto, auto, 96px 96px, auto",
          }}
        >
          <Toran scallop="#FBF2E3" />
          <StageCurtain />
          {/* Soft stage-light beams */}
          <div
            className="pointer-events-none absolute -top-10 left-[8%] h-[120%] w-[22rem] -rotate-12 bg-gradient-to-b from-[#F2C97D]/14 via-[#F2C97D]/5 to-transparent blur-md"
            style={{ clipPath: "polygon(46% 0, 54% 0, 100% 100%, 0 100%)" }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -top-10 right-[6%] h-[120%] w-[22rem] rotate-12 bg-gradient-to-b from-[#F2C97D]/10 via-[#F2C97D]/4 to-transparent blur-md"
            style={{ clipPath: "polygon(46% 0, 54% 0, 100% 100%, 0 100%)" }}
            aria-hidden="true"
          />
          <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-7 px-4 sm:gap-10 sm:px-6 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              {/* Wider than the poster's natural ratio at the same height as before:
                  a thin strip of the top/bottom is cropped instead of stretching. */}
              <div className="relative mx-auto aspect-[448/615] w-full max-w-[24rem] overflow-hidden rounded-2xl sm:max-w-[26rem] lg:mx-0 lg:max-w-[28rem]">
                <Image
                  src={bhajanClubbingPoster}
                  alt="Live Bhajan Clubbing with Arjun Bhowmick & Band presented by Science Divine Foundation"
                  placeholder="blur"
                  fill
                  sizes="(max-width: 1024px) 416px, 448px"
                  className="object-cover object-[50%_80%]"
                />
              </div>
            </div>

            <div className="lg:col-span-6 lg:w-full lg:max-w-[34rem] lg:justify-self-end">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#F2C97D]/40 bg-[#FDF8EF]/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#F2C97D]">
                <Music2 className="h-3.5 w-3.5" />
                Special Musical Highlight
              </span>
              <h2 className="mt-4 font-mahotsav-display text-[2rem] font-bold leading-tight text-[#FDF8EF] sm:text-5xl lg:text-[2.75rem]">
                Live Bhajan Clubbing with{" "}
                <span className="text-[#F2C97D]">{EVENT_CONFIG.bhajanArtist}</span>
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[#F6ECDA]/90 sm:mt-4 sm:text-lg">
                Experience the joy of devotional music in a vibrant and uplifting
                atmosphere. Celebrate through melodies, rhythm and the collective
                energy of everyone coming together — a soul-stirring musical
                offering as part of Sadguru Sakshi Shree&apos;s Birthday Celebration
                on <strong className="text-[#F2C97D]">{EVENT_CONFIG.dateDisplay}</strong>.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-7 sm:grid-cols-2 sm:gap-4">
                <div className="rounded-2xl border border-[#F2C97D]/25 bg-[#FDF8EF]/5 p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#F2C97D]">
                    Entry &amp; Seating
                  </p>
                  <p className="mt-1 font-mahotsav-display text-xl font-bold text-[#FDF8EF]">
                    Free Entry • Limited Passes
                  </p>
                </div>
                <div className="rounded-2xl border border-[#F2C97D]/25 bg-[#FDF8EF]/5 p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#F2C97D]">
                    Seat Reservations
                  </p>
                  <a
                    href={EVENT_CONFIG.contactPhoneHref}
                    className="mt-1 inline-flex items-center gap-2 font-mahotsav-display text-xl font-bold text-[#FDF8EF] hover:text-[#F2C97D]"
                  >
                    <Phone className="h-4 w-4 text-[#F2C97D]" />
                    {EVENT_CONFIG.contactPhone}
                  </a>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <a
                  href="#register"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F2C97D] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[#261812] shadow-md transition-all hover:bg-[#FDF8EF]"
                >
                  Reserve Your Free Pass
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={EVENT_CONFIG.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#F2C97D]/50 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[#FDF8EF] transition-colors hover:bg-[#FDF8EF]/10"
                >
                  WhatsApp Enquiry
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* A CELEBRATION FILLED WITH LOVE & JOY */}
        <section
          className="mh-invite-section relative overflow-hidden py-14 sm:py-20 lg:py-24"
          style={{
            backgroundColor: "#F8EEDC",
            backgroundImage: `radial-gradient(ellipse 60% 55% at 50% 50%, rgba(253,248,239,0.92), rgba(253,248,239,0) 75%), ${LOTUS_PATTERN}`,
            backgroundSize: "auto, 64px 64px",
          }}
        >
          <Toran scallop="#2B0A0C" />
          {/* Decorative mandala rings */}
          <div className="pointer-events-none absolute -left-40 -top-40 h-[26rem] w-[26rem] rounded-full border border-[#D49635]/25" aria-hidden="true" />
          <div className="pointer-events-none absolute -left-28 -top-28 h-[20rem] w-[20rem] rounded-full border border-dashed border-[#D49635]/30" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-48 -right-40 h-[30rem] w-[30rem] rounded-full border border-[#D49635]/25" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-36 -right-28 h-[22rem] w-[22rem] rounded-full border border-dashed border-[#D49635]/30" aria-hidden="true" />

          <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14">
            {/* Left: heading + opening quote */}
            <div className="text-center lg:col-span-5 lg:text-left">
              <div className="mh-invite-img relative mx-auto h-[360px] w-full max-w-[360px] sm:h-[400px] sm:max-w-[400px] lg:mx-0 lg:h-[440px] lg:max-w-[420px]">
                {/* Soft golden glow, centred on the head of the portrait */}
                <div
                  className="pointer-events-none absolute rounded-full"
                  style={{
                    left: "49.6%",
                    top: "12.4%",
                    width: "min(80%, 22rem)",
                    aspectRatio: "1 / 1",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "rgba(242,201,125,0.34)",
                    filter: "blur(10px)",
                  }}
                  aria-hidden="true"
                />
                <Image
                  src={invitationPortrait}
                  alt="Sadguru Sakshi Shree in meditation"
                  fill
                  sizes="(max-width: 640px) 360px, (max-width: 1024px) 400px, 420px"
                  className="object-contain object-bottom"
                  priority
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="mb-7 text-center lg:text-left">
  <span className="inline-flex items-center gap-2 rounded-full border border-[#D49635]/40 bg-[#FFFCF6]/80 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#9A6213]">
                  <Sparkles className="h-3.5 w-3.5" />
                  Heartfelt Invitation
                </span>
                <h2 className="mt-4 font-mahotsav-display text-[1.8rem] font-bold leading-[1.1] text-[#5E1216] sm:text-4xl lg:text-[2.9rem]">
                  A Celebration Filled With{" "}
                  <span className="bg-gradient-to-r from-[#B5741D] via-[#D49635] to-[#9A6213] bg-clip-text italic text-transparent">
                   Meditation,  Love &amp; Joy
                  </span>
                </h2>
                <div className="mx-auto mt-5 h-[3px] w-20 rounded-full bg-gradient-to-r from-[#5E1216] to-[#D49635] lg:mx-0" aria-hidden="true" />
              </div>
              <div className="relative rounded-[1.75rem] border border-[#D49635]/35 bg-[#FFFCF6]/85 p-6 shadow-[0_20px_50px_-20px_rgba(94,18,22,0.25)] backdrop-blur-sm sm:p-9">
                {/* gold corner accents */}
                <span className="pointer-events-none absolute left-4 top-4 h-6 w-6 rounded-tl-lg border-l-2 border-t-2 border-[#D49635]/60" aria-hidden="true" />
                <span className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 rounded-br-lg border-b-2 border-r-2 border-[#D49635]/60" aria-hidden="true" />

                <div className="space-y-4 text-[15px] leading-relaxed text-[#4A362A] sm:text-base">
                  <p>{LOVE_AND_JOY_PARAGRAPHS[0]}</p>
                  <p>{LOVE_AND_JOY_PARAGRAPHS[1]}</p>
                </div>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {CELEBRATION_MOMENTS.map((moment) => (
                    <li
                      key={moment}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#E8D8BC] bg-[#F6ECDA]/70 px-3 py-1.5 text-xs font-semibold text-[#5E1216]"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#D49635]" aria-hidden="true" />
                      {moment}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-col items-center gap-4 rounded-2xl bg-gradient-to-r from-[#5E1216] via-[#7A1B1F] to-[#5E1216] px-5 py-5 text-center sm:flex-row sm:justify-between sm:text-left">
                  <p className="font-mahotsav-display text-xl font-bold leading-snug text-[#FDF8EF] sm:text-[1.4rem]">
                    {LOVE_AND_JOY_PARAGRAPHS[2]}
                  </p>
                  <a
                    href="#register"
                    className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#F2C97D] px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#261812] shadow-md transition-colors hover:bg-[#FDF8EF]"
                  >
                    Register Now
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CELEBRATION SCHEDULE */}
        <section
          id="schedule"
          className="relative scroll-mt-20 overflow-hidden py-14 text-[#FDF8EF] sm:py-20 lg:py-24"
          style={{
            backgroundColor: "#2B0A0C",
            backgroundImage: `radial-gradient(ellipse 70% 60% at 50% 0%, rgba(122,27,31,0.9), rgba(43,10,12,0) 70%), radial-gradient(ellipse 50% 40% at 50% 100%, rgba(212,150,53,0.18), rgba(43,10,12,0) 70%), ${JAALI_PATTERN}`,
            backgroundSize: "auto, auto, 48px 48px",
          }}
        >
          <Toran scallop="#F8EEDC" />
          {/* Decorative mandala rings */}
          <div className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full border border-[#F2C97D]/15" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-28 -top-28 h-[21rem] w-[21rem] rounded-full border border-dashed border-[#F2C97D]/20" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-44 -left-40 h-[28rem] w-[28rem] rounded-full border border-[#F2C97D]/15" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-32 -left-28 h-[21rem] w-[21rem] rounded-full border border-dashed border-[#F2C97D]/20" aria-hidden="true" />

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#F2C97D]/40 bg-[#FDF8EF]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#F2C97D]">
                <Sparkles className="h-3.5 w-3.5" />
                Program Flow
              </span>
              <h2 className="mt-4 font-mahotsav-display text-[2.1rem] font-bold leading-tight text-[#FDF8EF] sm:text-5xl lg:text-[3.4rem]">
                Program{" "}
                <span className="bg-gradient-to-r from-[#F2C97D] via-[#FFE3A8] to-[#D49635] bg-clip-text italic text-transparent">
                  Highlights
                </span>
              </h2>
              <div className="mx-auto mt-4 h-[3px] w-20 rounded-full bg-gradient-to-r from-[#D49635] to-[#F2C97D]" aria-hidden="true" />
              <p className="mt-4 text-[15px] text-[#F6ECDA]/80 sm:text-base">
                Beginning at{" "}
                <strong className="font-semibold text-[#F2C97D]">
                  {EVENT_CONFIG.startTime}
                </strong>{" "}
                on{" "}
                <strong className="font-semibold text-[#F2C97D]">
                  {EVENT_CONFIG.dateDisplay}
                </strong>{" "}
                — an inspiring sequence of devotion, music, wisdom, and community
                grace.
              </p>
            </div>

            <ProgrammeHighlights />
          </div>
        </section>

        {/* PREVIOUS EVENT GLIMPSES (GALLERY SECTION) */}
        <section
          id="glimpses"
          className="relative scroll-mt-20 overflow-hidden pb-12 pt-14 sm:pb-16 sm:pt-20"
          style={{
            backgroundColor: "#FBF3E4",
            backgroundImage: `radial-gradient(ellipse 65% 50% at 50% 38%, rgba(255,252,246,0.95), rgba(255,252,246,0) 72%), linear-gradient(180deg, rgba(246,231,204,0.0) 0%, rgba(242,201,125,0.22) 100%), ${RANGOLI_PATTERN}`,
            backgroundSize: "auto, auto, 88px 88px",
          }}
        >
          <Toran scallop="#2B0A0C" />

          {/* Soft corner glows */}
          <div className="pointer-events-none absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-[#F2C97D]/30 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-[#7A1B1F]/10 blur-3xl" aria-hidden="true" />

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D49635]/40 bg-[#FFFCF6]/80 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#9A6213]">
                <Sparkles className="h-3.5 w-3.5" />
                Memories &amp; Moments
              </span>
              <h2 className="mt-4 font-mahotsav-display text-[2.1rem] font-bold leading-tight text-[#5E1216] sm:text-5xl lg:text-[3.4rem]">
                Previous Event{" "}
                <span className="bg-gradient-to-r from-[#B5741D] via-[#D49635] to-[#9A6213] bg-clip-text italic text-transparent">
                  Glimpses
                </span>
              </h2>
              <div className="mx-auto mt-4 h-[3px] w-20 rounded-full bg-gradient-to-r from-[#5E1216] to-[#D49635]" aria-hidden="true" />
              <p className="mt-4 text-[15px] text-[#695347] sm:text-base">
                Cherished moments of devotion, cultural brilliance, Bhajan
                Clubbing, and community seva from Science Divine Foundation
                celebrations.
              </p>
            </div>

            <GallerySection items={GALLERY_ITEMS} />
          </div>
        </section>

        {/* ABOUT SADGURU SAKSHI SHREE & SCIENCE DIVINE FOUNDATION */}
        <section
          id="about"
          className="relative scroll-mt-20 bg-[#F6ECDA]/45 py-12 sm:py-24"
          style={{ backgroundImage: MANDALA_PATTERN, backgroundSize: "80px 80px" }}
        >
          <Toran scallop="#EBD3A6" />
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <span className="inline-block rounded-full bg-[#5E1216] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#F2C97D]">
                  Spiritual Vision
                </span>
                <h2 className="mt-4 font-mahotsav-display text-3xl font-bold text-[#5E1216] sm:text-5xl">
                  About Sadguru Sakshi Shree
                </h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-[#4A362A]">
                  <p>
                    Sadguru Sakshi Shree shares a message of awareness,
                    self-understanding, love and conscious living.
                  </p>
                  <p>
                    Through{" "}
                    <strong className="font-semibold text-[#5E1216]">
                      Science Divine Foundation
                    </strong>
                    , various initiatives — including{" "}
                    <em>Har Ghar Shiksha, Har Ghar Dhyan</em> and{" "}
                    <em>Annapurna Sewa</em> — are undertaken to promote
                    education, meditation and a deeper understanding of life.
                  </p>
                  <p>
                    This birthday celebration is a special opportunity to come
                    together in his presence, celebrate with joy and receive
                    inspiration through his teachings.
                  </p>
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <a
                    href={EVENT_CONFIG.mainWebsiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[#5E1216] bg-[#FFFCF6] px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#5E1216] transition-colors hover:bg-[#5E1216] hover:text-[#FDF8EF]"
                  >
                    Visit sciencedivine.org
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:col-span-6">
                {ABOUT_PILLARS.map((pillar, idx) => (
                  <div
                    key={pillar.title}
                    className="flex gap-4 rounded-2xl border border-[#E8D8BC] bg-[#FFFCF6] p-5 shadow-xs"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#5E1216] font-mahotsav-display text-xl font-bold text-[#F2C97D]">
                      0{idx + 1}
                    </div>
                    <div>
                      <h3 className="font-mahotsav-display text-2xl font-bold text-[#5E1216]">
                        {pillar.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#4A362A]">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CELEBRATE WITH FAMILY + EVENT DETAILS */}
        <section
          id="venue"
          className="relative scroll-mt-20 py-12 sm:py-24"
          style={{ backgroundImage: DOT_PATTERN, backgroundSize: "22px 22px" }}
        >
          <Toran scallop="#EBD3A6" />
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-12">
            <div className="flex flex-col justify-center rounded-3xl border border-[#E8D8BC] bg-[#FFFCF6] p-6 shadow-xs sm:p-10 lg:col-span-6">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#9A6213]">
                Family Invitation
              </span>
              <h2 className="mt-2 font-mahotsav-display text-3xl font-bold text-[#5E1216] sm:text-4xl">
                Celebrate Together With Your Family
              </h2>
              <div className="mt-4 space-y-3.5 text-sm leading-relaxed text-[#4A362A] sm:text-base">
                <p>
                  A celebration becomes even more beautiful when shared with the
                  people we love.
                </p>
                <p>
                  Bring your parents, children, siblings and friends to
                  experience a day filled with music, cultural performances,
                  spiritual wisdom and joyful moments.
                </p>
                <p>
                  Whether you come for the Aarti, the cultural program, Bhajan
                  Clubbing or the blessings of Gurudev, we look forward to
                  welcoming you and your family.
                </p>
                <p className="font-mahotsav-display text-xl font-bold text-[#7A1B1F]">
                  Your presence will make this celebration even more special.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border-2 border-[#D49635]/50 bg-gradient-to-br from-[#5E1216] to-[#430A0D] p-6 text-[#FDF8EF] shadow-xl sm:p-10 lg:col-span-6">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#F2C97D]">
                Plan Your Visit
              </span>
              <h2 className="mt-2 font-mahotsav-display text-3xl font-bold text-[#FDF8EF] sm:text-4xl">
                Event Details
              </h2>

              <dl className="mt-5 space-y-3.5 text-sm sm:mt-6 sm:space-y-4 sm:text-base">
                <div className="flex flex-col border-b border-[#F2C97D]/20 pb-3 sm:flex-row sm:justify-between sm:gap-4">
                  <dt className="font-semibold text-[#F2C97D]">Event</dt>
                  <dd className="mt-0.5 font-medium text-[#FDF8EF] sm:mt-0 sm:text-right">
                    Birthday Celebration of {EVENT_CONFIG.honoree}
                  </dd>
                </div>
                <div className="flex flex-col border-b border-[#F2C97D]/20 pb-3 sm:flex-row sm:justify-between sm:gap-4">
                  <dt className="font-semibold text-[#F2C97D]">Date</dt>
                  <dd className="mt-0.5 font-medium text-[#FDF8EF] sm:mt-0 sm:text-right">
                    {EVENT_CONFIG.dateDisplay}
                  </dd>
                </div>
                <div className="flex flex-col border-b border-[#F2C97D]/20 pb-3 sm:flex-row sm:justify-between sm:gap-4">
                  <dt className="font-semibold text-[#F2C97D]">Starting Time</dt>
                  <dd className="mt-0.5 font-medium text-[#FDF8EF] sm:mt-0 sm:text-right">
                    {EVENT_CONFIG.startTime}
                  </dd>
                </div>
                <div className="flex flex-col border-b border-[#F2C97D]/20 pb-3 sm:flex-row sm:justify-between sm:gap-4">
                  <dt className="font-semibold text-[#F2C97D]">Venue</dt>
                  <dd className="mt-0.5 font-medium text-[#FDF8EF] sm:mt-0 sm:text-right">
                    {EVENT_CONFIG.venueName}
                  </dd>
                </div>
                <div className="flex flex-col border-b border-[#F2C97D]/20 pb-3 sm:flex-row sm:justify-between sm:gap-4">
                  <dt className="shrink-0 font-semibold text-[#F2C97D]">
                    Address
                  </dt>
                  <dd className="mt-0.5 text-[#F6ECDA] sm:mt-0 sm:text-right">
                    {EVENT_CONFIG.venueAddress}
                  </dd>
                </div>
                <div className="flex flex-col pb-1 sm:flex-row sm:justify-between sm:gap-4">
                  <dt className="font-semibold text-[#F2C97D]">Organised By</dt>
                  <dd className="mt-0.5 font-medium text-[#FDF8EF] sm:mt-0 sm:text-right">
                    {EVENT_CONFIG.organiser}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap">
                <a
                  href={EVENT_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F2C97D] px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#261812] shadow-md transition-colors hover:bg-[#FDF8EF]"
                >
                  <MapPin className="h-4 w-4" />
                  Get Directions
                </a>
                <a
                  href={EVENT_CONFIG.contactPhoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#F2C97D]/45 px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#FDF8EF] transition-colors hover:bg-[#FDF8EF]/10"
                >
                  <Phone className="h-4 w-4 text-[#F2C97D]" />
                  {EVENT_CONFIG.contactPhone}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* MID-PAGE INVITATION BANNER */}
        <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
          <div className="relative overflow-hidden rounded-[2rem] border border-[#D49635]/60 bg-gradient-to-r from-[#F6ECDA] via-[#FDF8EF] to-[#F6ECDA] px-5 py-10 text-center shadow-sm sm:px-12 sm:py-12">
            <SacredDivider label="One Day • One Celebration" />
            <h2 className="font-mahotsav-display text-3xl font-bold text-[#5E1216] sm:text-5xl">
              Be a Part of This Special Celebration
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-[15px] text-[#4A362A] sm:text-base">
              Join us for a memorable day filled with love, music, wisdom,
              blessings and togetherness. Celebrate the birthday of Sadguru
              Sakshi Shree with your family and friends.
            </p>
            <p className="mt-3 font-mahotsav-display text-xl font-bold italic text-[#9A6213] sm:text-2xl">
              One Day. One Celebration. Countless Beautiful Memories.
            </p>
            <div className="mt-6">
              <a
                href="#register"
                className="inline-flex items-center gap-2 rounded-full bg-[#5E1216] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[#FDF8EF] shadow-md transition-all hover:bg-[#7A1B1F]"
              >
                Register Now
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section
          id="faq"
          className="relative scroll-mt-20 overflow-hidden py-12 sm:py-24"
          style={{
            backgroundColor: "#FBF3E4",
            backgroundImage:
              "radial-gradient(ellipse 70% 45% at 50% 0%, rgba(242,201,125,0.45), rgba(242,201,125,0) 70%), radial-gradient(ellipse 60% 40% at 50% 100%, rgba(212,150,53,0.16), rgba(212,150,53,0) 70%), linear-gradient(180deg, #FBF3E4 0%, #F6ECDA 100%)",
          }}
        >
          <Toran scallop="#EBD3A6" />
          {/* Temple-arch lattice, fading out towards the edges */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: ARCH_PATTERN,
              backgroundSize: "72px 72px",
              WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 45%, transparent 28%, #000 85%)",
              maskImage: "radial-gradient(ellipse 80% 70% at 50% 45%, transparent 28%, #000 85%)",
            }}
            aria-hidden="true"
          />
          {/* Decorative mandala rings */}
          <div className="pointer-events-none absolute -left-40 bottom-0 h-[26rem] w-[26rem] rounded-full border border-[#D49635]/25" aria-hidden="true" />
          <div className="pointer-events-none absolute -left-28 bottom-12 h-[20rem] w-[20rem] rounded-full border border-dashed border-[#D49635]/30" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-40 top-24 h-[26rem] w-[26rem] rounded-full border border-[#D49635]/25" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-28 top-36 h-[20rem] w-[20rem] rounded-full border border-dashed border-[#D49635]/30" aria-hidden="true" />
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
            <div className="text-center">
              <SacredDivider label="Helpful Information" />
              <h2 className="font-mahotsav-display text-3xl font-bold text-[#5E1216] sm:text-5xl">
                Frequently Asked Questions
              </h2>
            </div>

            <FaqSection />
          </div>
        </section>
      </div>

    </div>
  );
}
