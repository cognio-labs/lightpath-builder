"use client";

import type { MouseEvent, ReactNode } from "react";
import { openBookingModal } from "./booking-events";
import { ButtonInner, goldButtonClass } from "./ui";

/** Hero CTA: opens the booking popup. Without JavaScript it links to the booking section. */
export default function BookSessionButton({ children, className }: { children: ReactNode; className?: string }) {
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openBookingModal(e.currentTarget);
  };

  return (
    <a href="#book" onClick={onClick} aria-haspopup="dialog" className={goldButtonClass("lg", className)}>
      <ButtonInner withArrow>{children}</ButtonInner>
    </a>
  );
}

/** Inline text link that opens the booking popup (used in the booking steps). */
export function BookSessionLink({ children, className }: { children: ReactNode; className?: string }) {
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openBookingModal(e.currentTarget);
  };

  return (
    <a href="#book" onClick={onClick} aria-haspopup="dialog" className={className}>
      {children}
    </a>
  );
}
