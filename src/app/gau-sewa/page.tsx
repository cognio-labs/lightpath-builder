import type { Metadata } from "next";
import SewaLanding from "@/components/initiatives/SewaLanding";

export const metadata: Metadata = {
  title: "Gau Sewa | Science Divine Foundation",
  description: "Help provide nourishing fodder, veterinary care and a safe place to rest for cows in need.",
  alternates: { canonical: "/gau-sewa" },
  openGraph: { title: "Gau Sewa | Science Divine Foundation", url: "/gau-sewa", images: ["/images/gau-sewa/hero.webp"] },
};

export default function Page() { return <SewaLanding initiative="gau" />; }
