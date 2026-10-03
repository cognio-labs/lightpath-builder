"use client";

import type { MouseEvent, ReactNode } from "react";
import { openBookingModal } from "./BookingModal";
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
