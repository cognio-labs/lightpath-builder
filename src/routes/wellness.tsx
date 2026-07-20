import { createFileRoute } from "@tanstack/react-router";
import { SolutionPageLayout } from "@/components/SolutionPageLayout";

export const Route = createFileRoute("/wellness")({
  head: () => ({
    meta: [
      { title: "Wellness | Science Divine Foundation" },
      {
        name: "description",
        content:
          "Achieve holistic wellness through Sakshi Shree's scientifically proven techniques for sound body, sound mind, and self-realization.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SolutionPageLayout
      slug={"yoga" as any}
      title="Wellness"
      tagline="Your Path to Complete Holistic Wellness"
      intro="True wellness encompasses body, mind, and spirit. Discover ancient techniques made practical for modern life to achieve lasting health and vitality."
      heroImage="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1400&q=90&auto=format&fit=crop"
    />
  );
}
