import { createFileRoute } from "@tanstack/react-router";
import { SolutionPageLayout } from "@/components/SolutionPageLayout";

export const Route = createFileRoute("/addictions")({
  head: () => ({
    meta: [
      { title: "Addictions — Science Divine Foundation" },
      {
        name: "description",
        content:
          "Find Your Freedom: Overcoming Addiction — articles, videos, and guided practices from Sakshi Shree.",
      },
      { property: "og:title", content: "Addictions — Science Divine" },
      { property: "og:url", content: "/addictions" },
    ],
    links: [{ rel: "canonical", href: "/addictions" }],
  }),
  component: () => (
    <SolutionPageLayout
      slug="addictions"
      title="Addictions"
      tagline={`Find Your Freedom: Overcoming Addiction`}
      intro={`Addictions are patterns the mind runs on autopilot. Meditation restores choice.`}
    />
  ),
});
