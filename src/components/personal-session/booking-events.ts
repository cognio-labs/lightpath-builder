export const BOOKING_OPEN_EVENT = "sd:open-booking";

export function openBookingModal(trigger?: HTMLElement | null) {
  window.dispatchEvent(
    new CustomEvent<HTMLElement | null>(BOOKING_OPEN_EVENT, { detail: trigger ?? null }),
  );
}
