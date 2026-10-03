import type { Metadata } from "next";
import PersonalSession from "@/components/personal-session";

export const metadata: Metadata = {
  title: "Personal Session with Sadguru Sakshi Shree | Science Divine Foundation",
  description:
    "When life feels confusing, get clarity. A Personal Session with Sadguru Sakshi Shree to understand the deeper patterns behind your life and discover the right direction forward.",
  alternates: { canonical: "/book-session" },
};

export default function Page() {
  return <PersonalSession />;
}
