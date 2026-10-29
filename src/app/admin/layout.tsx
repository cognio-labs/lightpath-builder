import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donations Admin | Science Divine",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-dvh bg-[#F7F3EC] text-[#2C1810]">{children}</div>;
}
