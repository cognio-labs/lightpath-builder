import { createFileRoute } from "@tanstack/react-router";
import { SolutionPageLayout } from "@/components/SolutionPageLayout";

export const Route = createFileRoute("/overthinking")({
  head: () => ({
    meta: [
      { title: "Overthinking — Science Divine Foundation" },
      {
        name: "description",
        content:
          "Overthinking No More: Techniques for Clarity — articles, videos, and guided practices from Sakshi Shree.",
      },
      { property: "og:title", content: "Overthinking — Science Divine" },
      { property: "og:url", content: "/overthinking" },
    ],
    links: [{ rel: "canonical", href: "/overthinking" }],
  }),
  component: () => (
    <SolutionPageLayout
      slug="overthinking"
      title="Overthinking"
      tagline={`Overthinking No More: Techniques for Clarity`}
      intro={`The mind loops when it lacks direction. Learn to witness thoughts and reclaim mental space.`}
    />
  ),
});
