import { SOLUTIONS_LIST } from "@/data/solutionsData";
import SolutionPageTemplate from "@/components/SolutionPageTemplate";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mindful Weight Loss & Vitality | Science Divine",
  description: "Achieve healthy body balance through conscious living, movement, and self-awareness.",
};

export default function WeightLossPage() {
  const solution = SOLUTIONS_LIST.find((s) => s.slug === "weight-loss");
  if (!solution) notFound();
  return <SolutionPageTemplate solution={solution} />;
}
