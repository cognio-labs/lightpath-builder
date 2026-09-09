import { SOLUTIONS_LIST } from "@/data/solutionsData";
import SolutionPageTemplate from "@/components/SolutionPageTemplate";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Strengthen Natural Immunity & Defense | Science Divine",
  description: "Boost your body's innate disease resistance through stress-reduction and Sakshi Sadhna.",
};

export default function ImmunityPage() {
  const solution = SOLUTIONS_LIST.find((s) => s.slug === "immunity");
  if (!solution) notFound();
  return <SolutionPageTemplate solution={solution} />;
}
