import { createFileRoute } from "@tanstack/react-router";
import { SolutionPageLayout } from "@/components/SolutionPageLayout";

export const Route = createFileRoute("/manifestation")({
  head: () => ({
    meta: [
      { title: "Manifestation — Science Divine Foundation" },
      { name: "description", content: "Manifest Your Success: Unleash Your Potential — articles, videos, and guided practices from Sakshi Shree." },
      { property: "og:title", content: "Manifestation — Science Divine" },
      { property: "og:url", content: "/manifestation" },
    ],
    links: [{ rel: "canonical", href: "/manifestation" }],
  }),
  component: () => <SolutionPageLayout slug="manifestation" title="Manifestation" tagline={`Manifest Your Success: Unleash Your Potential`} intro={`When intention, emotion, and action align, the universe conspires to deliver.`} />,
});
