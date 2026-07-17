export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden ethereal-bg text-white">
      <div className="absolute inset-0 opacity-40" style={{ background: "var(--gradient-radial-glow)" }} />
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gold/20 blur-3xl animate-glow-pulse" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-primary/40 blur-3xl animate-glow-pulse" />
      <div className="container-page relative py-20 md:py-28 text-center max-w-4xl mx-auto">
        {eyebrow && <div className="inline-block px-4 py-1.5 rounded-full glass-dark text-xs font-semibold uppercase tracking-wider mb-5 animate-fade-in">{eyebrow}</div>}
        <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.1] animate-fade-in">{title}</h1>
        {subtitle && <p className="mt-6 text-base md:text-xl text-white/85 max-w-2xl mx-auto animate-fade-in">{subtitle}</p>}
        {children && <div className="mt-8 flex flex-wrap justify-center gap-3 animate-fade-in">{children}</div>}
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, subtitle, center }: { eyebrow?: string; title: React.ReactNode; subtitle?: React.ReactNode; center?: boolean }) {
  return (
    <div className={`mb-10 md:mb-14 ${center ? "text-center max-w-3xl mx-auto" : ""}`}>
      {eyebrow && <div className="text-xs font-bold uppercase tracking-widest gradient-text mb-3">{eyebrow}</div>}
      <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">{title}</h2>
      {subtitle && <p className="mt-4 text-base md:text-lg text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
