import { createFileRoute } from "@tanstack/react-router";
import { SolutionPageLayout } from "@/components/SolutionPageLayout";

export const Route = createFileRoute("/gratitude")({
  head: () => ({
    meta: [
      { title: "Gratitude — Science Divine Foundation" },
      {
        name: "description",
        content:
          "Finding Light in the Storm: The Transformative Power of Gratitude — articles, videos, and guided practices from Sakshi Shree.",
      },
      { property: "og:title", content: "Gratitude — Science Divine" },
      { property: "og:url", content: "/gratitude" },
    ],
    links: [{ rel: "canonical", href: "/gratitude" }],
  }),
  component: () => (
    <SolutionPageLayout
      slug="gratitude"
      title="Gratitude"
      tagline={`Finding Light in the Storm: The Transformative Power of Gratitude`}
      intro={`Gratitude rewires perception, shifting you from what's missing to what's miraculous.`}
    />
  ),
});
