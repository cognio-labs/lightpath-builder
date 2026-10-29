import type { Metadata } from "next";
import LivingTheGita from "../living-the-gita/LivingTheGita";
import "../living-the-gita/chrome.css";

export const metadata: Metadata = {
  title: "Living the Moment | Science Divine Movement",
  description: "Experience present-moment awareness, conscious living, and timeless Gita wisdom with Science Divine.",
  alternates: { canonical: "/living-the-moment" },
};

export default function Page() {
  return <LivingTheGita />;
}
