export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  image,
  imageSide = "right",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
  image?: string;
  imageSide?: "left" | "right";
}) {
  if (image) {
    // Split hero with image
    return (
      <section className="relative overflow-hidden bg-white">
        {/* Gold gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(135deg, #FFFBF0 0%, #FFF8E7 40%, #FFFFFF 100%)" }}
        />
        <div
          className="absolute top-0 right-0 w-2/3 h-full pointer-events-none opacity-30"
          style={{ background: "radial-gradient(ellipse at top right, rgba(212,175,55,0.25), transparent 70%)" }}
        />
        <div className="container-page relative py-10 md:py-14">
          <div className={`grid md:grid-cols-2 gap-8 items-center ${imageSide === "left" ? "md:grid-flow-row" : ""}`}>
            <div className={`space-y-4 ${imageSide === "left" ? "md:order-2" : "md:order-1"}`}>
              {eyebrow && (
                <div className="inline-flex items-center gap-2">
                  <div className="w-8 h-0.5" style={{ background: "linear-gradient(90deg, #F59E0B, #D4AF37)" }} />
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-700">{eyebrow}</span>
                </div>
              )}
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1]">
                {title}
              </h1>
              {subtitle && (
                <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-xl">{subtitle}</p>
              )}
              {children && (
                <div className="flex flex-wrap gap-3 pt-2">{children}</div>
              )}
            </div>
            <div className={`${imageSide === "left" ? "md:order-1" : "md:order-2"} flex justify-center`}>
              <img
                src={image}
                alt="Sakshi Shree"
                className="w-full max-w-md object-contain drop-shadow-2xl"
                style={{ mixBlendMode: "multiply", maxHeight: "420px" }}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Standard centered hero (for inner pages)
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundImage: "url('/clean-golden-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{ background: "radial-gradient(ellipse at top, rgba(212,175,55,0.15), transparent 65%)" }}
      />
      {/* Decorative gold orbs */}
      <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full opacity-10 animate-glow-pulse"
        style={{ background: "radial-gradient(circle, #D4AF37, transparent 70%)" }} />
      <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-10 animate-glow-pulse"
        style={{ background: "radial-gradient(circle, #F59E0B, transparent 70%)" }} />

      <div className="container-page relative py-10 md:py-14 text-center max-w-4xl mx-auto">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 mb-3 animate-fade-in">
            <div className="w-6 h-0.5" style={{ background: "linear-gradient(90deg, #F59E0B, #D4AF37)" }} />
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700">{eyebrow}</span>
            <div className="w-6 h-0.5" style={{ background: "linear-gradient(90deg, #D4AF37, #F59E0B)" }} />
          </div>
        )}
        <h1 className="font-display text-3xl md:text-5xl font-bold text-gray-900 leading-[1.1] animate-fade-in">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-sm md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed animate-fade-in">
            {subtitle}
          </p>
        )}
        {children && (
          <div className="mt-6 flex flex-wrap justify-center gap-3 animate-fade-in">{children}</div>
        )}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`mb-6 md:mb-8 ${center ? "text-center max-w-3xl mx-auto" : ""}`}>
      {eyebrow && (
        <div className={`flex items-center gap-2 mb-2 ${center ? "justify-center" : ""}`}>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700">{eyebrow}</span>
        </div>
      )}
      <h2 className="font-display text-2xl md:text-4xl font-bold text-gray-900 leading-tight">{title}</h2>
      {subtitle && <p className="mt-2 text-sm md:text-base text-gray-500 leading-relaxed">{subtitle}</p>}
    </div>
  );
}

export function GoldDivider() {
  return null;
}
