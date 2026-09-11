"use client";
import Link from "next/link";
import { Clock, ShieldCheck, Sparkles, Star, ArrowRight } from "lucide-react";

const COURSES_DATA = [
  {
    slug: "design-your-destiny-2",
    title: "Design Your Destiny",
    category: "Mastery Course",
    tagline: "Manifest your dreams & unlock your full potential",
    desc: "Embark on a profound journey of self-discovery and empowerment with 'Design Your Destiny'. This transformative course empowers you to manifest your dreams, unlock your full potential, and create a life of success, fulfilment, and lasting happiness through powerful teachings and practical strategies.",
    level: "Beginner Level",
    duration: "2 hours",
    price: 499,
    originalPrice: 5100,
    image: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=1000&q=90&fit=crop",
    features: ["Manifest Dreams", "Emotional Balance", "Unlock Potential", "Daily Habits"],
  },
  {
    slug: "science-of-joyful-living-march",
    title: "Science of Joyful Living",
    category: "Life Transformation",
    tagline: "Discover tools for joy, purpose, and well-being",
    desc: "Experience the transformative impact of the 'Science of Joyful Living course'. Discover tools for joy, purpose, and well-being, empowering you to live a fulfilling, balanced, and deeply meaningful life.",
    level: "Beginner Level",
    duration: "2 hours",
    price: 459,
    originalPrice: 5100,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1000&q=90&fit=crop",
    features: ["Emotion Regulation", "Positive Mindset", "Lasting Happiness", "Self-Discovery"],
  },
  {
    slug: "mind-power-meditation",
    title: "Mind Power Meditation",
    category: "Inner Awakening",
    tagline: "Harness the untapped potential of your mind",
    desc: "Mind Power Meditation is a transformative practice that harnesses the untapped potential of the mind to unlock inner strength, supreme clarity, emotional stability, and conscious manifestation abilities.",
    level: "Beginner Level",
    duration: "2 hours",
    price: 499,
    originalPrice: 5100,
    image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=1000&q=90&fit=crop",
    features: ["Manifest Your Reality", "Thought Science", "Blissful Living", "Inner Cleansing"],
  },
  {
    slug: "sanjeevni-kriya-2",
    title: "Sanjeevani Kriya",
    category: "Sacred Breath & Energy",
    tagline: "Revitalize your body, mind, and spirit",
    desc: "Sanjeevani Kriya holds the key to a transformative journey towards love and divinity. This practice brings profound inner peace, soundness of body and mind, and facilitates realizing one’s true self.",
    level: "Beginner Level",
    duration: "2 hours",
    price: 459,
    originalPrice: 5100,
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1000&q=90&fit=crop",
    features: ["Inner Peace & Clarity", "Balance Energy Centers", "Self-Realization", "Heart Chakra Activation"],
  },
];

const TESTIMONIALS = [
  { id: "QLmL230dApk", name: "Swaparna Testimonial" },
  { id: "EiFMTSo8Yws", name: "Helen Testimonial" },
  { id: "6bkJdkmAt20", name: "Pooja Pagaddinnimath Testimonial" },
  { id: "5KmsxqJXACM", name: "Patty Testimonial" },
];

export default function Page() {
  return (
    <div className="bg-[#FFFDF9] text-[#521623] min-h-screen">
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden pt-28 pb-16 px-4 sm:px-6 md:px-12 bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#FFFDF9] border-b border-[#E8C969]/40">
        {/* Soft Ambient Radial Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none rounded-full blur-[130px] opacity-35"
          style={{
            background: "radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, rgba(255, 244, 207, 0.6) 60%, transparent 80%)",
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF4CF] border border-[#D4AF37]/50 shadow-xs">
            <Sparkles size={14} className="text-[#B8860B]" />
            <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-[#521623]">
              Transformative Growth Courses
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#521623] tracking-tight leading-[1.12]">
            Explore Our Courses for{" "}
            <span className="bg-gradient-to-r from-[#D7A316] via-[#B8860B] to-[#D7A316] bg-clip-text text-transparent block sm:inline">
              Personal Growth &amp; Wellness
            </span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Discover life-changing courses designed to enhance personal growth, promote physical vitality, dissolve stress, and empower you on your journey towards an enlightened and blissful life.
          </p>
        </div>
      </section>

      {/* ── Courses Cards Grid Section ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-12 bg-[#FAF8F5]">
        <div className="max-w-[1380px] mx-auto">
          {/* Section Subtitle */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#E8C969]/30">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8860B] block mb-1">
                Curated Transformational Programs
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#521623]">
                Available Courses ({COURSES_DATA.length})
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Lifetime Access &bull; 100% Practical &bull; Guided by Sakshi Shree
            </p>
          </div>

          {/* 2-Column Landscape Cards Grid */}
          <div className="grid lg:grid-cols-2 gap-8 xl:gap-10">
            {COURSES_DATA.map((c, i) => {
              const discountPercent = Math.round((1 - c.price / c.originalPrice) * 100);

              return (
                <div
                  key={i}
                  className="group rounded-3xl bg-[#FFFDF9] border-2 border-[#E8C969]/40 hover:border-[#D4AF37] shadow-[0_10px_30px_rgba(82,22,35,0.06)] hover:shadow-[0_20px_45px_rgba(212,175,55,0.18)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col sm:flex-row h-full"
                >
                  {/* Left Column: Landscape Image filling 100% height */}
                  <div className="relative w-full sm:w-[42%] aspect-[16/10] sm:aspect-auto min-h-[220px] sm:min-h-full flex-shrink-0 self-stretch overflow-hidden bg-amber-50">
                    <img
                      src={c.image}
                      alt={c.title}
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      loading="eager"
                    />

                    {/* Level Badge (Top Left) */}
                    <div className="absolute top-3.5 left-3.5 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#521623]/85 text-amber-100 text-[11px] font-bold tracking-wide backdrop-blur-md border border-[#E8C969]/30 shadow-md">
                      <ShieldCheck size={12} className="text-[#D7A316]" />
                      <span>{c.level}</span>
                    </div>

                    {/* Duration Badge (Top Right) */}
                    <div className="absolute top-3.5 right-3.5 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D7A316] text-[#521623] text-[11px] font-extrabold shadow-md">
                      <Clock size={12} />
                      <span>{c.duration}</span>
                    </div>
                  </div>

                  {/* Right Column: Course Details */}
                  <div className="w-full sm:w-[56%] p-6 sm:p-7 flex flex-col justify-between">
                    <div>
                      {/* Category Label */}
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#B8860B] block mb-1">
                        {c.category}
                      </span>

                      {/* Course Title */}
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#521623] group-hover:text-[#B8860B] transition-colors leading-snug mb-1">
                        {c.title}
                      </h3>

                      {/* Tagline */}
                      <p className="text-xs sm:text-sm font-semibold italic text-[#B8860B] mb-2.5">
                        {c.tagline}
                      </p>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed line-clamp-3 mb-4">
                        {c.desc}
                      </p>

                      {/* Feature Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {c.features.map((feat, fi) => (
                          <span
                            key={fi}
                            className="inline-block px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#FFF8E7] text-[#8B6914] border border-[#E8C969]/60 shadow-2xs"
                          >
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Pricing & CTA Row */}
                    <div className="pt-3 border-t border-amber-100/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      {/* Price Section */}
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl sm:text-3xl font-extrabold text-[#521623] leading-none">
                          ₹{c.price}
                        </span>
                        <span className="text-xs sm:text-sm text-slate-400 line-through">
                          ₹{c.originalPrice}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-amber-100 text-[#8B6914] border border-amber-200">
                          {discountPercent}% OFF
                        </span>
                      </div>

                      {/* Start Course Button */}
                      <Link
                        href={`/${c.slug}` as any}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D7A316] to-[#C48F0A] hover:from-[#C48F0A] hover:to-[#B8860B] text-[#521623] font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95"
                      >
                        Start Course <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Testimonials Section ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-12 bg-[#FFFDF9] border-t border-[#E8C969]/30">
        <div className="max-w-[1380px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8860B] block">
              Graduates Speak
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#521623]">
              10,000+ Lives Transformed
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              Real stories from real seekers whose life, mindset, and health shifted after taking a Science Divine course.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="bg-[#FFFDF9] rounded-2xl overflow-hidden border-2 border-[#E8C969]/35 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative pt-[56.25%] bg-slate-900">
                  <iframe
                    src={`https://www.youtube.com/embed/${t.id}`}
                    title={t.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="absolute inset-0 w-full h-full border-0"
                  />
                </div>
                <div className="p-4 space-y-1.5">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star key={si} size={13} fill="#D7A316" className="text-[#D7A316]" />
                    ))}
                  </div>
                  <h3 className="font-serif font-bold text-[#521623] text-sm leading-tight">
                    {t.name}
                  </h3>
                  <p className="text-slate-500 text-xs font-medium">
                    Science Divine Seeker
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://sciencedivine.org/latest-testimonials-videos/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D7A316] to-[#C48F0A] hover:from-[#C48F0A] hover:to-[#B8860B] text-[#521623] font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all transform hover:scale-105 active:scale-95"
            >
              Watch All Video Testimonials <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
