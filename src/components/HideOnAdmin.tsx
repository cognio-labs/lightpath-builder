"use client";

import { usePathname } from "next/navigation";

/** Hides public site chrome (nav, footer, popups) on /admin pages. */
export function HideOnAdmin({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return pathname?.startsWith("/admin") ? null : <>{children}</>;
}
