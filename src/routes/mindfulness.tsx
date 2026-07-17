import { createFileRoute } from "@tanstack/react-router";
import { SolutionPageLayout } from "@/components/SolutionPageLayout";

export const Route = createFileRoute("/mindfulness")({
  head: () => ({
    meta: [
      { title: "Mindfulness — Science Divine Foundation" },
      { name: "description", content: "Unlock the Mind's True Potential — articles, videos, and guided practices from Sakshi Shree." },
      { property: "og:title", content: "Mindfulness — Science Divine" },
      { property: "og:url", content: "/mindfulness" },
    ],
    links: [{ rel: "canonical", href: "/mindfulness" }],
  }),
  component: () => <SolutionPageLayout slug="mindfulness" title="Mindfulness" tagline={`Unlock the Mind's True Potential`} intro={`Mindfulness is presence — the art of being fully here.`} />,
});
