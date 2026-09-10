import Link from "next/link";
import { CalendarDays, BookOpen, Mail, MessageCircle } from "lucide-react";

const actions = [
  { href: "/events", label: <>Attend<br />Live Event</>, icon: CalendarDays },
  { href: "/book-session", label: <>Book<br />Session</>, icon: BookOpen },
  { href: "/contact", label: <>Ask<br />Question</>, icon: Mail },
  { href: "https://wa.me/919315944774", label: <>WhatsApp<br />Connect</>, icon: MessageCircle, external: true },
];

export function QuickActionBar() {
  return (
    <nav className="site-quick-actions" aria-label="Quick actions">
      {actions.map(({ href, label, icon: Icon, external }) => (
        <Link
          key={href}
          href={href}
          className="site-quick-action"
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          <Icon aria-hidden="true" />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}

export default QuickActionBar;

