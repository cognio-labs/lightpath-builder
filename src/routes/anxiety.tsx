import { createFileRoute } from "@tanstack/react-router";
import { SolutionPageLayout } from "@/components/SolutionPageLayout";

export const Route = createFileRoute("/anxiety")({
  head: () => ({
    meta: [
      { title: "Anxiety — Science Divine Foundation" },
      { name: "description", content: "Beating Anxiety Together: Simple Steps to Calm — articles, videos, and guided practices from Sakshi Shree." },
      { property: "og:title", content: "Anxiety — Science Divine" },
      { property: "og:url", content: "/anxiety" },
    ],
    links: [{ rel: "canonical", href: "/anxiety" }],
  }),
  component: () => <SolutionPageLayout slug="anxiety" title="Anxiety" tagline={`Beating Anxiety Together: Simple Steps to Calm`} intro={`Anxiety clouds clarity and steals presence. Discover breath, meditation, and mindset practices to soothe the nervous system and return to calm.`} />,
});
