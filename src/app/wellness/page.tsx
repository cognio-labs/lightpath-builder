import { SOLUTIONS_LIST } from "@/data/solutionsData";
import SolutionPageTemplate from "@/components/SolutionPageTemplate";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Holistic Wellness & Mind-Body Balance | Science Divine",
  description: "Harmonize physical vitality, mental clarity, and spiritual enlightenment.",
};

export default function WellnessPage() {
  const solution = SOLUTIONS_LIST.find((s) => s.slug === "wellness");
  if (!solution) notFound();
  return <SolutionPageTemplate solution={solution} />;
}
