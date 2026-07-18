import { createFileRoute } from "@tanstack/react-router";
import { SolutionPageLayout } from "@/components/SolutionPageLayout";

export const Route = createFileRoute("/stress")({
  head: () => ({
    meta: [
      { title: "Stress — Science Divine Foundation" },
      {
        name: "description",
        content:
          "Boost Your Energy and Tackle Tasks Easily — articles, videos, and guided practices from Sakshi Shree.",
      },
      { property: "og:title", content: "Stress — Science Divine" },
      { property: "og:url", content: "/stress" },
    ],
    links: [{ rel: "canonical", href: "/stress" }],
  }),
  component: () => (
    <SolutionPageLayout
      slug="stress"
      title="Stress"
      tagline={`Boost Your Energy and Tackle Tasks Easily`}
      intro={`Stress is a natural response, but chronic stress drains your vitality. Learn ancient techniques adapted for modern life to release tension, restore energy, and meet each day with steadiness.`}
    />
  ),
});
