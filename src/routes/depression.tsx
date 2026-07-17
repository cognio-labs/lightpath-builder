import { createFileRoute } from "@tanstack/react-router";
import { SolutionPageLayout } from "@/components/SolutionPageLayout";

export const Route = createFileRoute("/depression")({
  head: () => ({
    meta: [
      { title: "Depression — Science Divine Foundation" },
      { name: "description", content: "Step by Step: Beating Depression — articles, videos, and guided practices from Sakshi Shree." },
      { property: "og:title", content: "Depression — Science Divine" },
      { property: "og:url", content: "/depression" },
    ],
    links: [{ rel: "canonical", href: "/depression" }],
  }),
  component: () => <SolutionPageLayout slug="depression" title="Depression" tagline={`Step by Step: Beating Depression`} intro={`Depression is not a life sentence. Through consistent practice, guided wisdom, and community, light returns.`} />,
});
