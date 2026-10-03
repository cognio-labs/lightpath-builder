import { Globe, Lock, ShieldCheck, Users } from "lucide-react";
import { footerTrust } from "./content";

const ICONS = {
  lock: Lock,
  shield: ShieldCheck,
  slots: Users,
  globe: Globe,
} as const;

export default function TrustFooter() {
  return (
    <section aria-label="Why book with us" className="border-t border-gold-300/30 bg-cream-200 py-7">
      <ul className="sd-shell grid grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-4">
        {footerTrust.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <li key={item.title} className="flex items-start gap-3">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" strokeWidth={1.4} />
              <div className="min-w-0">
                <p className="text-[12.5px] font-semibold text-ink-900">{item.title}</p>
                <p className="mt-0.5 text-[11px] leading-snug text-ink-500">{item.body}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
