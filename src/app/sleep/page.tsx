import { SOLUTIONS_LIST } from "@/data/solutionsData";
import SolutionPageTemplate from "@/components/SolutionPageTemplate";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restorative Sleep & Bedtime Peace | Science Divine",
  description: "Unwind your nervous system for deep, effortless, and rejuvenating night sleep.",
};

export default function SleepPage() {
  const solution = SOLUTIONS_LIST.find((s) => s.slug === "sleep");
  if (!solution) notFound();
  return <SolutionPageTemplate solution={solution} />;
}
