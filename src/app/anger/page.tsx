import { SOLUTIONS_LIST } from "@/data/solutionsData";
import SolutionPageTemplate from "@/components/SolutionPageTemplate";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Master Anger & Emotional Harmony | Science Divine",
  description: "Channel intense emotions into creative energy and deep inner composure.",
};

export default function AngerPage() {
  const solution = SOLUTIONS_LIST.find((s) => s.slug === "anger");
  if (!solution) notFound();
  return <SolutionPageTemplate solution={solution} />;
}
