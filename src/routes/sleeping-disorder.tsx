import { createFileRoute } from "@tanstack/react-router";
import { SolutionPageLayout } from "@/components/SolutionPageLayout";

export const Route = createFileRoute("/sleeping-disorder")({
  head: () => ({
    meta: [
      { title: "Sleeping Disorder | Science Divine Foundation" },
      {
        name: "description",
        content:
          "Overcome sleeping disorders with Sakshi Shree's meditation and mindfulness techniques for deep, restorative sleep.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SolutionPageLayout
      slug={"meditation" as any}
      title="Sleeping Disorder"
      tagline="Restore Deep, Restful Sleep Naturally"
      intro="Sleep is the body's greatest healer. Learn powerful meditation and relaxation techniques that naturally restore healthy sleep patterns without medication."
      heroImage="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=1400&q=90&auto=format&fit=crop"
    />
  );
}
