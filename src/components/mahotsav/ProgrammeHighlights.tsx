import {
  Mic,
  Music2,
  Users,
  Utensils,
} from "lucide-react";
import { PROGRAMME_SCHEDULE, type ScheduleStep } from "@/lib/mahotsav/event";

function ScheduleIcon({ icon }: { icon: ScheduleStep["icon"] }) {
  const cls = "h-5 w-5 text-[#5E1216]";
  switch (icon) {
    case "users":
      return <Users className={cls} />;
    case "music":
      return <Music2 className={cls} />;
    case "mic":
      return <Mic className={cls} />;
    case "utensils":
      return <Utensils className={cls} />;
  }
}

export function ProgrammeHighlights() {
  return (
    <div className="relative mt-10">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PROGRAMME_SCHEDULE.map((item) => (
          <article
            key={item.step}
            className="rounded-2xl border border-[#F2C97D]/30 bg-[#FFFCF6] p-5 text-left shadow-[0_12px_30px_-20px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#E8D8BC] bg-[#FDF8EF]">
                <ScheduleIcon icon={item.icon} />
              </span>
            </div>
            <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#9A6213]">
              {item.timeOrTag}
            </p>
            <h3 className="mt-2 font-mahotsav-display text-lg font-bold leading-tight text-[#5E1216]">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#695347]">
              {item.description}
            </p>
          </article>
        ))}
      </div>

      <p className="mt-6 text-center text-sm italic text-[#F6ECDA]/75">
        The detailed program schedule will be shared with registered attendees closer to the event.
      </p>
    </div>
  );
}
