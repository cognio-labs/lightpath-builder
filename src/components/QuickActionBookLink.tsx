"use client";

import type { MouseEvent, ReactNode } from "react";
import Link from "next/link";
import { openBookingModal } from "@/components/personal-session/BookingModal";

/** Opens the booking popup in place; modified clicks (new tab/window) still follow the link. */
export function QuickActionBookLink({ href, className, children }: { href: string; className: string; children: ReactNode }) {
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    openBookingModal(e.currentTarget);
  };

  return (
    <Link href={href} onClick={onClick} aria-haspopup="dialog" className={className}>
      {children}
    </Link>
  );
}
