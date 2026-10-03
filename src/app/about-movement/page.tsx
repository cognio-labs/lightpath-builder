"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, BookOpen, ChevronLeft, ChevronRight, CookingPot, House, Landmark, School } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

// Not the global .font-quote class: it forces italic and a slate color over Tailwind utilities.
const SERIF = { fontFamily: "'Cormorant Garamond', Georgia, serif" };

// The global `main img { height: auto }` rule beats Tailwind's h-full, so fill heights inline.
const FILL = { height: "100%" };

function LotusIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M24 9c-4 5-6 10-6 15s2 9 6 12c4-3 6-7 6-12s-2-10-6-15Z" />
      <path d="M24 36c-6 0-11-3-13-8 0-3 1-6 3-8 3 2 6 6 7 10" />
      <path d="M24 36c6 0 11-3 13-8 0-3-1-6-3-8-3 2-6 6-7 10" />
      <path d="M24 36c-8 1-15-1-19-6 1-2 3-3 5-3" />
      <path d="M24 36c8 1 15-1 19-6-1-2-3-3-5-3" />
      <path d="M12 40h24" />
    </svg>
  );
}

function Mandala({ className = "" }: { className?: string }) {
  const petals = Array.from({ length: 24 }, (_, i) => i * 15);
  return (
    <svg viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth={0.8} className={className} aria-hidden="true">
      {[190, 160, 128, 96, 64, 34].map((r) => (
        <circle key={r} cx="200" cy="200" r={r} />
      ))}
      {petals.map((deg) => (
        <g key={deg} transform={`rotate(${deg} 200 200)`}>
          <path d="M200 40c14 26 14 56 0 88-14-32-14-62 0-88Z" />
          <path d="M200 136c8 14 8 30 0 46-8-16-8-32 0-46Z" />
        </g>
      ))}
    </svg>
  );
}

function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, light = false, center = false }: { children: ReactNode; light?: boolean; center?: boolean }) {
  const color = light ? "#E9B949" : "#C79A2E";
  return (
    <div className={`flex items-center gap-4 ${center ? "justify-center" : ""}`}>
      <span className="h-px w-10" style={{ background: color }} />
      <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.28em]" style={{ color }}>
        {children}
      </span>
    </div>
  );
}

function PrimaryButton({ href, children, variant = "maroon" }: { href: string; children: ReactNode; variant?: "maroon" | "gold" }) {
  const base =
    variant === "gold"
      ? "bg-[#E2B04A] text-[#3B0F19] shadow-[0_10px_26px_rgba(0,0,0,0.25)]"
      : "bg-[#5A1525] text-white shadow-[0_10px_26px_rgba(82,22,35,0.28)]";
  const sweep = variant === "gold" ? "bg-[#F2C94C]" : "bg-[#7A1F33]";
  return (
    <Link href={href} className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5 ${base}`}>
      <span aria-hidden="true" className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 ${sweep}`} />
      <span className="relative">{children}</span>
      <ArrowRight size={16} className="relative transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

/* ─────────────────────────── HERO ─────────────────────────── */

function Hero() {
  const reduce = useReducedMotion();
  const enter = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE, delay },
  });

  return (
    <section className="relative overflow-hidden bg-[#FCF8F1]">
      <motion.div
        aria-hidden="true"
        className="hidden lg:block absolute right-[20%] top-1/2 -translate-y-1/2 w-[640px] h-[640px] text-[#D4AF37]/10 pointer-events-none"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
      >
        <Mandala className="w-full h-full" />
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute -left-32 -top-32 w-[460px] h-[460px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(226,176,74,0.14) 0%, transparent 70%)" }}
      />

      <div className="container-page relative grid lg:grid-cols-12 gap-10 lg:gap-8 items-center py-10 sm:py-12 lg:py-7">
        <div className="lg:col-span-7">
          <motion.div {...enter(0)}>
            <Eyebrow>Our Mission</Eyebrow>
          </motion.div>

          <h1 style={SERIF} className="mt-5 font-semibold leading-[0.95] tracking-[-0.015em] text-[clamp(3.25rem,8vw,7.5rem)]">
            {[
              { text: "A movement,", cls: "text-[#521623]" },
              { text: "not a moment.", cls: "italic text-[#B8860B]" },
            ].map((line, i) => (
              <span key={line.text} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className={`block ${line.cls}`}
                  initial={reduce ? false : { y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.95, ease: EASE, delay: 0.15 + i * 0.15 }}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p {...enter(0.55)} style={{ maxWidth: "36rem" }} className="mt-6 text-base sm:text-lg leading-relaxed text-[#3F3532]">
            For twenty-five years we have carried a single conviction: that inner transformation is the root of every outer
            change worth making. Through meditation, education, and service, we walk alongside millions on the journey home
            to themselves.
          </motion.p>

          <motion.div {...enter(0.7)} className="mt-8">
            <PrimaryButton href="/about-sakshi-shree">Meet Sakshi Shree</PrimaryButton>
          </motion.div>
        </div>

        <div className="lg:col-span-5">
          <motion.figure
            initial={reduce ? false : { opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 0.3 }}
            style={{ aspectRatio: "4 / 5", borderRadius: "1.6rem", background: "#EAF1F5" }}
            className="relative mx-auto w-full max-w-md lg:max-w-none overflow-hidden border border-[#EADFC9] shadow-[0_30px_70px_rgba(82,22,35,0.16)]"
          >
            {/* Scaled so the frame ends above the name printed on the bottom of this photo. */}
            <img
              src="/images/uploads/2024/05/aboutsakshishree.webp"
              alt="Sakshi Shree"
              decoding="async"
              fetchPriority="high"
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                height: "143%",
                width: "auto",
                maxWidth: "none",
                transform: "translateX(-44%)",
              }}
            />
            <figcaption
              style={{ background: "rgba(247,241,230,0.93)", backdropFilter: "blur(6px)" }}
              className="absolute inset-x-0 bottom-0 px-4 py-3.5 text-center"
            >
              <div style={SERIF} className="text-xl sm:text-2xl font-semibold tracking-[0.06em] text-[#521623]">
                SAKSHI SHREE
              </div>
              <div className="text-sm text-[#5D4B47]">Founder, Science Divine Foundation</div>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── VISION ─────────────────────────── */

function Vision() {
  const reduce = useReducedMotion();
  return (
    <section className="bg-[#FCF8F1] pt-16 sm:pt-20 lg:pt-24 pb-6">
      <div className="container-page grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="lg:col-span-6"
        >
          <div
            style={{ aspectRatio: "4 / 3", borderRadius: "1.6rem" }}
            className="group relative overflow-hidden bg-amber-50 shadow-[0_30px_70px_rgba(82,22,35,0.16)]"
          >
            <img
              src="/images/uploads/2024/06/DJI_0169-scaled.webp"
              alt="Sakshi Shree at a Science Divine sadhana shivir"
              loading="lazy"
              decoding="async"
              style={FILL}
              className="w-full object-cover transition-[scale] duration-700 group-hover:scale-105"
            />
          </div>
        </motion.div>

        <div className="lg:col-span-6">
          <Reveal>
            <Eyebrow>Our Vision</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 style={SERIF} className="mt-5 font-medium leading-[1.02] text-[#521623] text-[clamp(2.6rem,5vw,4rem)]">
              A conscious <span className="italic text-[#B8860B]">humanity.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-base sm:text-lg leading-[1.75] text-[#4A403E]">
              A world where every home has education, every heart has meditation, and every life knows its purpose. This is
              not utopia — it is a decision, made daily, by ordinary people committed to their own awakening and the
              awakening of others.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── SERVICE INITIATIVES ─────────────────────────── */

const SERVICES = [
  {
    title: "Shiksha Sewa",
    desc: "Education for children and communities in need.",
    href: "/shiksha-sewa",
    image: "/images/about-movement/har-ghar-shiksha.jpg",
    contain: false,
    icon: <School size={22} strokeWidth={1.6} />,
  },
  {
    title: "Annapurna Sewa",
    desc: "Feeding hearts, one meal at a time.",
    href: "/annapurna-sewa",
    image: "/images/about-movement/annapurna-sewa.jpg",
    contain: false,
    icon: <CookingPot size={22} strokeWidth={1.6} />,
  },
  {
    title: "Eint Daan Sewa",
    desc: "Building a better Vrindavan.",
    href: "/nirman-sewa",
    image: "/images/about-movement/eint-daan.jpg",
    contain: false,
    icon: <Landmark size={22} strokeWidth={1.6} />,
  },
  {
    title: "Living the Gita Movement",
    desc: "From knowing the wisdom to living it.",
    href: "/courses",
    // Transparent book cutout: show it whole instead of cropping.
    image: "/images/about-movement/maha-mantras-book.png",
    contain: true,
    icon: <BookOpen size={22} strokeWidth={1.6} />,
  },
];

const CARD_WIDTH = "snap-start shrink-0 w-[78%] sm:w-[calc((100%-1rem)/2)] md:w-[calc((100%-2rem)/3)] lg:w-auto";

function ServiceInitiatives() {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [updateArrows]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.offsetWidth + 16), behavior: reduce ? "auto" : "smooth" });
  };

  const cardEnter = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.7, ease: EASE, delay: i * 0.1 },
  });

  const arrow =
    "lg:hidden absolute top-[26%] z-20 flex w-10 h-10 items-center justify-center rounded-full bg-white/95 border border-[#D4AF37]/50 text-[#521623] shadow-md transition-opacity disabled:opacity-0 disabled:pointer-events-none";

  return (
    <section className="bg-[#FCF8F1] pt-14 sm:pt-16 pb-16 sm:pb-20 lg:pb-24">
      <div className="container-page">
        <Reveal>
          <Eyebrow>Our Service Initiatives</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 style={SERIF} className="mt-5 font-medium leading-[1.05] text-[#521623] text-[clamp(2.25rem,4.6vw,3.6rem)]">
            Consciousness Must Become Compassion
          </h2>
        </Reveal>

        <div className="relative mt-2 lg:mt-12">
          <button type="button" aria-label="Previous initiatives" onClick={() => scrollByCard(-1)} disabled={!canPrev} className={`${arrow} -left-2`}>
            <ChevronLeft size={18} />
          </button>
          <button type="button" aria-label="Next initiatives" onClick={() => scrollByCard(1)} disabled={!canNext} className={`${arrow} -right-2`}>
            <ChevronRight size={18} />
          </button>

          <div
            ref={trackRef}
            onScroll={updateArrows}
            className="no-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory pt-8 pb-4 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pt-0 lg:pb-0"
          >
            {SERVICES.map((s, i) => (
              <motion.div key={s.title} {...cardEnter(i)} className={CARD_WIDTH}>
                <Link
                  href={s.href}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#EADFC9] bg-white shadow-[0_10px_26px_rgba(82,22,35,0.06)] transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-[#D4AF37]/70 hover:shadow-[0_22px_45px_rgba(184,134,11,0.16)]"
                >
                  {s.contain ? (
                    // Fills the slot's height and dips into the space beside the icon badge, staying inside the card.
                    <div className="relative z-10 aspect-[5/4]">
                      <img
                        src={s.image}
                        alt={s.title}
                        loading="lazy"
                        decoding="async"
                        style={{
                          position: "absolute",
                          top: 12,
                          left: "63%",
                          height: "calc(100% + 12px)",
                          width: "auto",
                          maxWidth: "none",
                          transform: "translateX(-50%)",
                          transformOrigin: "bottom center",
                          filter: "drop-shadow(0 12px 16px rgba(82,22,35,0.22))",
                        }}
                        className="transition-[scale] duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[5/4] overflow-hidden rounded-t-xl bg-[#FFFBEB]">
                      <img
                        src={s.image}
                        alt={s.title}
                        loading="lazy"
                        decoding="async"
                        style={FILL}
                        className="w-full object-cover transition-[scale] duration-700 group-hover:scale-110"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col px-4 pb-6">
                    <div className="-mt-6 mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[#E2C98A] bg-[#FFFBF2] text-[#B8860B] shadow-[0_4px_12px_rgba(184,134,11,0.18)] transition-[rotate,background-color,color] duration-500 group-hover:rotate-[10deg] group-hover:bg-[#5A1525] group-hover:text-[#E2B04A]">
                      {s.icon}
                    </div>
                    <h3 style={SERIF} className="text-[1.45rem] font-medium leading-tight text-[#521623] transition-colors group-hover:text-[#B8860B]">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5D4B47]">{s.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}

            <motion.div {...cardEnter(SERVICES.length)} className={CARD_WIDTH}>
              <div className="relative flex h-full flex-col justify-center gap-7 overflow-hidden rounded-xl border border-[#EADFC9] bg-[#FFFCF6] p-5 shadow-[0_10px_26px_rgba(82,22,35,0.06)]">
                <Mandala className="absolute -right-10 -top-10 w-36 h-36 text-[#D4AF37]/15" />
                <Mandala className="absolute -left-10 -bottom-10 w-36 h-36 text-[#D4AF37]/15" />
                <div className="relative flex items-center gap-3">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#E2C98A] bg-white text-[#B8860B] shadow-[0_4px_12px_rgba(184,134,11,0.18)]">
                    <House size={28} strokeWidth={1.4} />
                  </div>
                  <div>
                    <div className="text-xs text-[#5D4B47]">Run by</div>
                    <div style={SERIF} className="text-lg font-semibold leading-tight text-[#521623]">
                      Jhuggi Jhopadi Shiksha Sewa Samiti
                    </div>
                  </div>
                </div>
                <Link
                  href="/initiatives"
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#5A1525] px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(82,22,35,0.25)]"
                >
                  <span aria-hidden="true" className="absolute inset-0 origin-left scale-x-0 bg-[#7A1F33] transition-transform duration-500 ease-out group-hover:scale-x-100" />
                  <span className="relative">Explore Our Initiatives</span>
                  <ArrowRight size={15} className="relative transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── JOURNEY TIMELINE ─────────────────────────── */

const TIMELINE = [
  {
    date: "Dec 1999",
    title: "Movement Born",
    desc: "Science Divine Movement is founded to bring ancient wisdom to modern seekers.",
  },
  {
    date: "Feb 2004",
    title: "Jhuggi Jhopdi Shiksha Sewa Mission",
    desc: "Free education initiative for slum children begins its transformative work.",
  },
  {
    date: "Aug 2017",
    title: "Sakshi Dham International, Vrindavan",
    desc: "Foundation stone laid for the international retreat center.",
  },
  {
    date: "Jan 2024",
    title: "Teach and Learn Movement",
    desc: "Global expansion of meditation and education programs.",
  },
  {
    date: "Oct 2026",
    title: "Living the Gita Movement",
    desc: "Gita ko sirf padhna nahi, ab Gita ko jeena hai.",
  },
];

const STEP_WIDTH = "snap-start shrink-0 w-[78%] sm:w-[46%] lg:w-auto lg:flex-1";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function JourneyTimeline() {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLOListElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const geoRef = useRef<{ xs: number[]; y: number } | null>(null);
  const activeRef = useRef(-1);
  const startedRef = useRef(false);
  const [geo, setGeo] = useState<{ xs: number[]; y: number } | null>(null);
  const [active, setActive] = useState(-1);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const last = TIMELINE.length - 1;

  const pointerX = useMotionValue(0);
  const startX = useMotionValue(0);
  const fillWidth = useTransform([pointerX, startX], ([p, s]: number[]) => Math.max(0, p - s));
  const inView = useInView(trackRef, { once: true, amount: 0.5 });

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  // Dot centres relative to the track's scrollable content, so the marker can travel between them.
  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const t = track.getBoundingClientRect();
    const xs = dotRefs.current.map((d) => {
      const r = d?.getBoundingClientRect();
      return r ? r.left + r.width / 2 - t.left + track.scrollLeft : 0;
    });
    const first = dotRefs.current[0]?.getBoundingClientRect();
    const next = { xs, y: first ? first.top + first.height / 2 - t.top : 0 };
    geoRef.current = next;
    startX.set(xs[0]);
    if (activeRef.current <= 0 || activeRef.current === last) pointerX.set(xs[Math.max(0, activeRef.current)]);
    setGeo(next);
  }, [last, pointerX, startX]);

  useEffect(() => {
    updateArrows();
    measure();
    const onResize = () => {
      updateArrows();
      measure();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [updateArrows, measure]);

  const reach = useCallback((i: number) => {
    activeRef.current = i;
    setActive(i);
  }, []);

  const hasGeo = geo !== null;
  useEffect(() => {
    if (!inView || !hasGeo || startedRef.current) return;
    startedRef.current = true;
    const g = geoRef.current!;
    if (reduce) {
      pointerX.set(g.xs[last]);
      reach(last);
      return;
    }
    let alive = true;
    (async () => {
      pointerX.set(g.xs[0]);
      reach(0);
      for (let i = 1; i <= last; i++) {
        await wait(500);
        if (!alive) return;
        await animate(pointerX, geoRef.current!.xs[i], { duration: 1.1, ease: "easeInOut" });
        if (!alive) return;
        reach(i);
      }
    })();
    return () => {
      alive = false;
    };
  }, [inView, hasGeo, reduce, last, pointerX, reach]);

  // On phones the track scrolls sideways; keep the milestone the marker just reached in view.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || active < 1 || track.scrollWidth <= track.clientWidth + 4) return;
    const li = track.children[active] as HTMLElement | undefined;
    if (li) track.scrollTo({ left: li.offsetLeft - 8, behavior: reduce ? "auto" : "smooth" });
  }, [active, reduce]);

  const scrollByStep = (dir: 1 | -1) => {
    const el = trackRef.current;
    const step = el?.firstElementChild as HTMLElement | null;
    if (!el || !step) return;
    el.scrollBy({ left: dir * step.offsetWidth, behavior: reduce ? "auto" : "smooth" });
  };

  const arrow =
    "lg:hidden absolute top-0 z-30 flex w-10 h-10 items-center justify-center rounded-full bg-white/95 border border-[#D4AF37]/50 text-[#521623] shadow-md transition-opacity disabled:opacity-0 disabled:pointer-events-none";

  return (
    <section className="relative overflow-hidden bg-[#FBF4E8] py-16 sm:py-20">
      <img
        src="/images/about-movement/eint-daan.jpg"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        style={{
          ...FILL,
          opacity: 0.32,
          maskImage: "linear-gradient(to left, black 25%, transparent 95%)",
          WebkitMaskImage: "linear-gradient(to left, black 25%, transparent 95%)",
        }}
        className="absolute right-0 top-0 w-[60%] lg:w-[42%] object-cover pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, rgba(251,244,232,0.55) 0%, rgba(251,244,232,0) 35%, rgba(251,244,232,0) 70%, rgba(251,244,232,0.6) 100%)" }}
      />

      <div className="container-page relative">
        <Reveal>
          <Eyebrow>The Science Divine Journey</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 style={SERIF} className="mt-5 font-medium leading-[1.05] text-[#521623] text-[clamp(2.25rem,4.6vw,3.6rem)]">
            From a Vision to a Global Movement
          </h2>
        </Reveal>

        <div className="relative mt-10">
          <button type="button" aria-label="Earlier milestones" onClick={() => scrollByStep(-1)} disabled={!canPrev} className={`${arrow} -left-2`}>
            <ChevronLeft size={18} />
          </button>
          <button type="button" aria-label="Later milestones" onClick={() => scrollByStep(1)} disabled={!canNext} className={`${arrow} -right-2`}>
            <ChevronRight size={18} />
          </button>

          <ol
            ref={trackRef}
            onScroll={updateArrows}
            className="no-scrollbar relative flex overflow-x-auto snap-x snap-mandatory pt-5 lg:overflow-visible"
          >
            {TIMELINE.map((t, i) => {
              const isLast = i === last;
              const reached = active >= i;
              return (
                <li key={t.date} className={`group ${STEP_WIDTH}`}>
                  {i === 0 && geo && (
                    <>
                      <motion.span
                        aria-hidden="true"
                        className="pointer-events-none absolute z-[5] h-[2px] rounded-full"
                        style={{ left: geo.xs[0], top: geo.y - 1, width: fillWidth, background: "linear-gradient(90deg, #E2B04A, #B8860B)" }}
                      />
                      <motion.span
                        aria-hidden="true"
                        className="pointer-events-none absolute z-20 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#B8860B] bg-white transition-opacity duration-500"
                        style={{
                          left: 0,
                          top: geo.y - 12,
                          marginLeft: -12,
                          x: pointerX,
                          opacity: active >= 0 ? 1 : 0,
                          boxShadow: "0 0 0 6px rgba(226,176,74,0.22), 0 6px 16px rgba(184,134,11,0.35)",
                        }}
                      >
                        <span className="h-2 w-2 rounded-full bg-[#B8860B]" />
                        {!reduce && (
                          <motion.span
                            className="absolute inset-0 rounded-full border border-[#E2B04A]"
                            animate={{ scale: [1, 2], opacity: [0.7, 0] }}
                            transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                          />
                        )}
                      </motion.span>
                    </>
                  )}

                  <div className="flex items-center">
                    {i > 0 && <span aria-hidden="true" className="h-px w-6 lg:w-8 shrink-0" style={{ background: "rgba(184,134,11,0.3)" }} />}
                    <motion.span
                      ref={(el) => {
                        dotRefs.current[i] = el;
                      }}
                      aria-hidden="true"
                      className="relative z-10 h-4 w-4 shrink-0 rounded-full"
                      initial={false}
                      animate={
                        reached
                          ? { backgroundColor: "#B8860B", scale: 1, boxShadow: "0 0 0 5px rgba(212,175,55,0.25)" }
                          : { backgroundColor: "#E6D3A8", scale: 0.8, boxShadow: "0 0 0 5px rgba(212,175,55,0)" }
                      }
                      transition={{ duration: 0.45, ease: EASE }}
                    />
                    <span
                      aria-hidden="true"
                      className="h-px flex-1"
                      style={{
                        background: isLast
                          ? "linear-gradient(90deg, rgba(184,134,11,0.3), rgba(184,134,11,0))"
                          : "rgba(184,134,11,0.3)",
                      }}
                    />
                  </div>

                  <motion.div
                    initial={false}
                    animate={reached ? { opacity: 1, y: 0 } : { opacity: 0.35, y: 6 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className={`mt-6 pr-6 lg:pr-8 ${i > 0 ? "border-l border-[#D9C08A]/60 pl-6 lg:pl-8" : ""}`}
                  >
                    <div
                      style={SERIF}
                      className={`text-[2rem] font-semibold leading-none transition-colors duration-500 group-hover:text-[#B8860B] ${
                        i === active ? "text-[#B8860B]" : "text-[#521623]"
                      }`}
                    >
                      {t.date}
                    </div>
                    <div className="mt-2 text-sm font-bold leading-snug text-[#3B2A26]">{t.title}</div>
                    <p className="mt-2 text-sm leading-relaxed text-[#6B5B57]">{t.desc}</p>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── LIVING THE GITA ─────────────────────────── */

function LivingTheGita() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.7], reduce ? [1, 1] : [1.12, 1]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#5A0F1F]">
      <motion.img
        src="/images/about-movement/gita-bg.jpg"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        style={{ ...FILL, scale }}
        className="absolute inset-0 w-full object-cover object-[78%_center]"
      />
      <div className="absolute inset-0 bg-[#4A0C1A]/70 lg:bg-gradient-to-r lg:from-[#4A0C1A]/60 lg:via-transparent lg:to-transparent" />

      <div className="container-page relative py-20 sm:py-24 lg:py-28">
        <div style={{ maxWidth: "44rem" }}>
          <Reveal>
            <Eyebrow light>Living the Gita Movement</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 style={SERIF} className="mt-5 font-medium leading-[1.05] text-[#FBF3E4] text-[clamp(2.4rem,5vw,3.9rem)]">
              From knowing the wisdom
              <br />
              <span className="italic text-[#E9B949]">to living it.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ maxWidth: "26rem" }} className="mt-5 text-base sm:text-lg leading-relaxed text-[#F3E6D2]">
              Discover timeless Gita wisdom for a more aware, purposeful everyday life.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8">
              <PrimaryButton href="/courses" variant="gold">
                Discover the Movement
              </PrimaryButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── CLOSING CTA ─────────────────────────── */

function JourneyCta() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-[#FCF8F1] pt-16 sm:pt-20 pb-20 sm:pb-24 text-center">
      <LotusIcon className="absolute left-1/2 -bottom-6 w-40 h-40 -translate-x-1/2 text-[#D4AF37]/15" />
      <div className="container-page relative">
        <motion.span
          aria-hidden="true"
          className="mx-auto block h-px w-12 bg-[#C79A2E]"
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
        />
        <Reveal delay={0.1}>
          <h2 style={SERIF} className="mt-6 font-medium leading-[1.05] text-[#521623] text-[clamp(2.4rem,5vw,3.75rem)]">
            Begin your journey <span className="italic text-[#B8860B]">within.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-4 text-base sm:text-lg text-[#4A403E]">Explore our programs and become part of the movement.</p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-8 flex justify-center">
            <PrimaryButton href="/courses">Join the Movement</PrimaryButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <>
      <Hero />
      <Vision />
      <ServiceInitiatives />
      <JourneyTimeline />
      <LivingTheGita />
      <JourneyCta />
    </>
  );
}
