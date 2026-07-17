import { createFileRoute } from "@tanstack/react-router";
import { SolutionPageLayout } from "@/components/SolutionPageLayout";

export const Route = createFileRoute("/meditation")({
  head: () => ({
    meta: [
      { title: "Meditation — Science Divine Foundation" },
      { name: "description", content: "Start Meditating Today: A Guide to Health and Happiness — articles, videos, and guided practices from Sakshi Shree." },
      { property: "og:title", content: "Meditation — Science Divine" },
      { property: "og:url", content: "/meditation" },
    ],
    links: [{ rel: "canonical", href: "/meditation" }],
  }),
  component: () => <SolutionPageLayout slug="meditation" title="Meditation" tagline={`Start Meditating Today: A Guide to Health and Happiness`} intro={`Meditation is not escape — it is the direct path to knowing yourself.`} />,
});
