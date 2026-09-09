import { SOLUTIONS_LIST } from "@/data/solutionsData";
import SolutionPageTemplate from "@/components/SolutionPageTemplate";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conscious & Mindful Parenting | Science Divine",
  description: "Guide your children with wisdom, patience, and unconditional emotional connection.",
};

export default function ParentingPage() {
  const solution = SOLUTIONS_LIST.find((s) => s.slug === "parenting");
  if (!solution) notFound();
  return <SolutionPageTemplate solution={solution} />;
}
