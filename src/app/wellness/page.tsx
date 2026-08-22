"use client";

import { SolutionPageLayout } from "@/components/SolutionPageLayout";




export default function Page() {
  return (
    <SolutionPageLayout
      slug={"yoga" as any}
      title="Wellness"
      tagline="Your Path to Complete Holistic Wellness"
      intro="True wellness encompasses body, mind, and spirit. Discover ancient techniques made practical for modern life to achieve lasting health and vitality."
      heroImage="/premium-heroes/wellness-hero.png"
    />
  );
}
