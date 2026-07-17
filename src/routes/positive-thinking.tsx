import { createFileRoute } from "@tanstack/react-router";
import { SolutionPageLayout } from "@/components/SolutionPageLayout";

export const Route = createFileRoute("/positive-thinking")({
  head: () => ({
    meta: [
      { title: "Positive Thinking — Science Divine Foundation" },
      { name: "description", content: "The Power of Positive Thinking — articles, videos, and guided practices from Sakshi Shree." },
      { property: "og:title", content: "Positive Thinking — Science Divine" },
      { property: "og:url", content: "/positive-thinking" },
    ],
    links: [{ rel: "canonical", href: "/positive-thinking" }],
  }),
  component: () => <SolutionPageLayout slug="positive-thinking" title="Positive Thinking" tagline={`The Power of Positive Thinking`} intro={`The disciplined choice to focus on what serves your highest good.`} />,
});
