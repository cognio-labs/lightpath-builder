"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import type { BookingModal as BookingModalType } from "@/components/personal-session/BookingModal";
import { BOOKING_OPEN_EVENT } from "@/components/personal-session/booking-events";

type ModalComponent = typeof BookingModalType;

/** Downloads the form and animation code only when the dialog is requested. */
export function DeferredBookingModalHost() {
  const pathname = usePathname();
  const [Modal, setModal] = useState<ModalComponent | null>(null);
  const [open, setOpen] = useState(false);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onOpen = async (event: Event) => {
      returnFocus.current =
        (event as CustomEvent<HTMLElement | null>).detail ??
        (document.activeElement instanceof HTMLElement ? document.activeElement : null);
      const module = await import("@/components/personal-session/BookingModal");
      setModal(() => module.BookingModal);
      setOpen(true);
    };
    window.addEventListener(BOOKING_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(BOOKING_OPEN_EVENT, onOpen);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    returnFocus.current?.focus();
  }, []);

  if (!Modal) return null;
  return createPortal(
    <Modal open={open} onClose={close} source={`Personal session request (booking popup) from ${pathname}`} />,
    document.body,
  );
}
