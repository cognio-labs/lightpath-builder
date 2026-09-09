import { SOLUTIONS_LIST } from "@/data/solutionsData";
import SolutionPageTemplate from "@/components/SolutionPageTemplate";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Overcome Fatigue & Revitalize Energy | Science Divine",
  description: "Recharge your physical and mental stamina with ancient prana techniques.",
};

export default function FatiguePage() {
  const solution = SOLUTIONS_LIST.find((s) => s.slug === "fatigue");
  if (!solution) notFound();
  return <SolutionPageTemplate solution={solution} />;
}
