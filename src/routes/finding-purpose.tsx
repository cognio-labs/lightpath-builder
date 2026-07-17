import { createFileRoute } from "@tanstack/react-router";
import { SolutionPageLayout } from "@/components/SolutionPageLayout";

export const Route = createFileRoute("/finding-purpose")({
  head: () => ({
    meta: [
      { title: "Finding Purpose — Science Divine Foundation" },
      { name: "description", content: "Finding Your Purpose: A Journey to Self-Discovery — articles, videos, and guided practices from Sakshi Shree." },
      { property: "og:title", content: "Finding Purpose — Science Divine" },
      { property: "og:url", content: "/finding-purpose" },
    ],
    links: [{ rel: "canonical", href: "/finding-purpose" }],
  }),
  component: () => <SolutionPageLayout slug="finding-purpose" title="Finding Purpose" tagline={`Finding Your Purpose: A Journey to Self-Discovery`} intro={`Purpose is discovered, not decided. Turn inward and let your true calling emerge.`} />,
});
