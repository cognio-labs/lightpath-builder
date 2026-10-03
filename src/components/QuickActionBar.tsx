import Link from "next/link";
import { CalendarDays, BookOpen, Mail, MessageCircle } from "lucide-react";
import { QuickActionBookLink } from "@/components/QuickActionBookLink";

const actions = [
  { href: "/events", label: <>Attend<br />Live Event</>, icon: CalendarDays },
  { href: "/book-session", label: <>Book<br />Session</>, icon: BookOpen, opensBooking: true },
  { href: "/contact", label: <>Ask<br />Question</>, icon: Mail },
  { href: "https://wa.me/919315944774", label: <>WhatsApp<br />Connect</>, icon: MessageCircle, external: true },
];

export function QuickActionBar() {
  return (
    <nav className="site-quick-actions" aria-label="Quick actions">
      {actions.map(({ href, label, icon: Icon, external, opensBooking }) => {
        const content = (
          <>
            <Icon aria-hidden="true" />
            <span>{label}</span>
          </>
        );
        return opensBooking ? (
          <QuickActionBookLink key={href} href={href} className="site-quick-action">
            {content}
          </QuickActionBookLink>
        ) : (
          <Link
            key={href}
            href={href}
            className="site-quick-action"
            {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
          >
            {content}
          </Link>
        );
      })}
    </nav>
  );
}

export default QuickActionBar;
