import { SOLUTIONS_LIST } from "@/data/solutionsData";
import SolutionPageTemplate from "@/components/SolutionPageTemplate";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Back Pain Relief & Spine Health | Science Divine",
  description: "Ease bodily tension, posture misalignment, and physical stress naturally.",
};

export default function BackPainPage() {
  const solution = SOLUTIONS_LIST.find((s) => s.slug === "back-pain");
  if (!solution) notFound();
  return <SolutionPageTemplate solution={solution} />;
}
