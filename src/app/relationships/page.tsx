import { SOLUTIONS_LIST } from "@/data/solutionsData";
import SolutionPageTemplate from "@/components/SolutionPageTemplate";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Harmonious Relationships & Love | Science Divine",
  description: "Build compassionate bonds, resolve conflicts, and nurture unconditional love.",
};

export default function RelationshipsPage() {
  const solution = SOLUTIONS_LIST.find((s) => s.slug === "relationships");
  if (!solution) notFound();
  return <SolutionPageTemplate solution={solution} />;
}
