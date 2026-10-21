import { Heart, Shield, Sparkles, Sun } from "lucide-react";

export type SolutionBenefit = {
  title: string;
  desc: string;
  image: string;
  icon: "shield" | "sparkles" | "heart" | "sun";
};

const icons = {
  shield: Shield,
  sparkles: Sparkles,
  heart: Heart,
  sun: Sun,
};

/** Shared four-card wellbeing section used by the individual solution pages. */
export default function SolutionBenefits({ topic, cards }: { topic: string; cards: SolutionBenefit[] }) {
  return (
    <section className="w-full bg-white section-pad px-4 sm:px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12 space-y-3">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C79A2E]">Transformative benefits</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#111827]">How {topic} Helps You</h2>
          <p className="text-slate-600 text-sm md:text-base font-medium">Simple, compassionate guidance for greater clarity, balance, and inner wellbeing.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {cards.map((card) => {
            const Icon = icons[card.icon];
            return (
              <article key={card.title} className="group min-h-full rounded-3xl bg-white border border-[#E5E7EB] hover:border-[#D4AF37] shadow-sm hover:shadow-[0_16px_40px_rgba(212,175,55,0.15)] hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
                <div className="h-44 sm:h-48 overflow-hidden bg-amber-50">
                  <img src={card.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-5 sm:p-6 flex-1">
                  <div className="w-12 h-12 rounded-2xl bg-[rgba(212,175,55,0.12)] border border-[rgba(212,175,55,0.3)] flex items-center justify-center mb-4 text-[#D4AF37] group-hover:bg-[#521623] transition-colors"><Icon size={26} /></div>
                  <h3 className="font-serif text-xl font-bold text-[#111827] mb-2">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600 font-medium">{card.desc}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
