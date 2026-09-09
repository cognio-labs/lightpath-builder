import { SOLUTIONS_LIST } from "@/data/solutionsData";
import SolutionPageTemplate from "@/components/SolutionPageTemplate";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mental Health & Emotional Wellbeing | Science Divine",
  description: "Cultivate emotional balance, mental clarity, and peace of mind through mindfulness.",
};

export default function MentalHealthPage() {
  const solution = SOLUTIONS_LIST.find((s) => s.slug === "mental-health");
  if (!solution) notFound();
  return <SolutionPageTemplate solution={solution} />;
}
