import type { Metadata } from "next";
import SewaLanding from "@/components/initiatives/SewaLanding";

export const metadata: Metadata = {
  title: "Swasthya Seva | Science Divine Foundation",
  description: "Help bring basic health check-ups, health awareness and care guidance closer to communities.",
  alternates: { canonical: "/swasthya-seva" },
  openGraph: { title: "Swasthya Seva | Science Divine Foundation", url: "/swasthya-seva", images: ["/images/swasthya-seva/hero.webp"] },
};

export default function Page() { return <SewaLanding initiative="health" />; }
