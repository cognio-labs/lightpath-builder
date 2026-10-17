import type { Metadata } from "next";
import LivingTheGita from "./LivingTheGita";
import "./chrome.css";

export const metadata: Metadata = {
  title: "Living the Gita Movement | Help the Gita Reach Every Home",
  description: "Support Gita learning, youth programs, and community initiatives across India through the Living the Gita Movement.",
  alternates: { canonical: "/living-the-gita" },
};

export default function Page() {
  return <LivingTheGita />;
}
