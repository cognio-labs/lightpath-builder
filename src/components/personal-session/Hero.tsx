import Image from "next/image";
import { HandHeart } from "lucide-react";
import { brand, cta, donation, heroTrust, images, leaders } from "./content";
import BookSessionButton from "./BookSessionButton";
import { TrustPill } from "./ui";

export default function Hero() {
  return (
    <section className="sd-dawn relative isolate flex flex-col overflow-hidden lg:min-h-[calc(100svh-5.75rem)]">
      {/* Varanasi Ghats at sunset */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <Image
          src={images.heroBackdrop}
          alt="Varanasi Ganga Ghat at sunset"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[60%_center] lg:object-[64%_center]"
        />
        {/* Soft readable gradient for heading, donation card & buttons on the left */}
        <div className="absolute inset-y-0 left-0 w-full max-w-xl lg:max-w-3xl bg-gradient-to-r from-cream-100 via-cream-100/85 to-transparent" />
        {/* Soft bottom edge transition to next section */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cream-200 via-cream-200/40 to-transparent" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-6%] top-[10%] -z-10 h-[560px] w-[560px] rounded-full bg-gold-400/20 blur-[120px]"
      />

      <div className="sd-shell flex flex-1 flex-col pt-6 pb-0 sm:pt-8">
        {/* Social proof */}
        <header className="relative z-20 flex justify-end">
          <div className="sd-hairline flex w-full items-center justify-center gap-2.5 rounded-xl bg-white/75 px-3 py-2 shadow-ps-card backdrop-blur-sm sm:w-auto sm:gap-4 sm:px-4">
            <p className="text-[9.5px] font-medium tracking-wide text-ink-700 sm:text-[11px]">
              Trusted by World Leaders &amp; Thousands of Seekers
            </p>
            <ul className="flex -space-x-2.5">
              {leaders.map((l, i) => (
                <li key={l.name} className="relative">
                  <Image
                    src={l.image}
                    alt={l.name}
                    title={l.name}
                    width={64}
                    height={64}
                    className="h-7 w-7 rounded-full object-cover ring-2 ring-white sm:h-8 sm:w-8"
                  />
                  {i === leaders.length - 1 && (
                    <span className="absolute -bottom-0.5 -right-1 grid h-4 w-4 place-items-center rounded-full bg-gold-400 text-[8px] font-bold text-maroon-900 ring-2 ring-white">
                      9+
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </header>

        <div className="grid flex-1 gap-8 pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-4 lg:pt-6">
          {/* Copy column */}
          <div className="sd-rise relative z-10 flex flex-col justify-center pb-12 lg:pb-20 xl:pb-24">
            <h1 className="font-display tracking-[-0.015em] text-ink-900">
              <span className="block text-[1.5rem] leading-[1.2] sm:text-[1.9rem] lg:text-[2.3rem] 2xl:text-[2.7rem]">
                When Life Feels Confusing,
              </span>
              <span className="mt-1.5 block text-[2.9rem] leading-[1.02] sm:text-[3.5rem] lg:text-[4.3rem] 2xl:text-[5rem]">
                Get <span className="sd-gold-text">Clarity.</span>
              </span>
            </h1>

            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-700 2xl:max-w-lg 2xl:text-[17px]">
              A Personal Session with <strong className="font-semibold text-ink-900">{brand.teacher}</strong> to
              understand the deeper patterns behind your life and discover the right direction forward.
            </p>

            {/* Donation card */}
            <div className="sd-hairline mt-8 flex max-w-sm items-center gap-4 rounded-2xl bg-white/80 p-4 shadow-ps-card backdrop-blur-sm">
              <div className="min-w-0">
                <p className="font-display text-2xl text-ink-900">
                  {donation.amount} <span className="text-base font-normal text-gold-600">{donation.word}</span>
                </p>
                <p className="mt-1.5 text-[11px] leading-snug text-ink-500">
                  {donation.note}
                  <br />
                  <span className="text-ink-700">{brand.mission}</span>
                </p>
              </div>
              <HandHeart className="ml-auto h-9 w-9 shrink-0 text-gold-500" strokeWidth={1.2} />
            </div>

            <BookSessionButton className="mt-7 w-full sm:w-auto sm:self-start">{cta.label}</BookSessionButton>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
              {heroTrust.map((t) => (
                <TrustPill key={t} label={t} />
              ))}
            </div>
          </div>

          {/* Portrait: head to lap, the armchair bleeding off the right edge */}
          <div className="relative -mr-5 h-[84vw] overflow-hidden sm:-mr-5 sm:h-[500px] lg:absolute lg:bottom-0 lg:right-0 lg:top-[5.5rem] lg:mr-0 lg:h-auto lg:w-[58%] lg:overflow-visible">
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-0 right-0 h-[70%] w-[85%] rounded-full bg-gold-400/15 blur-3xl"
            />
            <Image
              src={images.heroPortrait}
              alt={brand.teacher}
              width={900}
              height={1600}
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 640px, 60vw"
              className={[
                "absolute right-[-2vw] top-0 h-auto w-[92vw] max-w-none object-contain object-center drop-shadow-[0_24px_45px_rgba(82,22,35,0.22)]",
                "sm:right-0 sm:w-[540px]",
                "lg:right-[3%] lg:top-[5%] lg:h-[138%] lg:w-auto lg:max-w-[50vw] xl:top-[1%]",
              ].join(" ")}
            />
          </div>
        </div>
      </div>

      {/* Fold fade: melts the portrait's crop line into the next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-28 bg-gradient-to-t from-cream-200 via-cream-200/60 to-transparent sm:h-32 lg:h-36 xl:h-40"
      />
    </section>
  );
}
