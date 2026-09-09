import React from "react";
import { notFound } from "next/navigation";
import { SOLUTIONS_LIST } from "@/data/solutionsData";
import SolutionPageTemplate from "@/components/SolutionPageTemplate";
import { Metadata } from "next";

export async function generateStaticParams() {
  return SOLUTIONS_LIST.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = SOLUTIONS_LIST.find((s) => s.slug === slug);
  if (!solution) return {};

  return {
    title: `${solution.name} Solution | Science Divine Foundation`,
    description: solution.shortDesc,
  };
}

export default async function DynamicSolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = SOLUTIONS_LIST.find((s) => s.slug === slug);

  if (!solution) {
    notFound();
  }

  return <SolutionPageTemplate solution={solution} />;
}
