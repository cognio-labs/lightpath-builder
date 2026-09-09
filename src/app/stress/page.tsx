import { SOLUTIONS_LIST } from "@/data/solutionsData";
import SolutionPageTemplate from "@/components/SolutionPageTemplate";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stress Solution & Relief | Science Divine",
  description: "Transform stress into profound inner peace with scientific breathwork and Sakshi Bhav.",
};

export default function StressPage() {
  const solution = SOLUTIONS_LIST.find((s) => s.slug === "stress");
  if (!solution) notFound();
  return <SolutionPageTemplate solution={solution} />;
}
