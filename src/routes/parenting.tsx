import { createFileRoute } from "@tanstack/react-router";
import { SolutionPageLayout } from "@/components/SolutionPageLayout";

export const Route = createFileRoute("/parenting")({
  head: () => ({
    meta: [
      { title: "Parenting — Science Divine Foundation" },
      { name: "description", content: "Sakshi Shree's Guide to Parenting Through the Ages — articles, videos, and guided practices from Sakshi Shree." },
      { property: "og:title", content: "Parenting — Science Divine" },
      { property: "og:url", content: "/parenting" },
    ],
    links: [{ rel: "canonical", href: "/parenting" }],
  }),
  component: () => <SolutionPageLayout slug="parenting" title="Parenting" tagline={`Sakshi Shree's Guide to Parenting Through the Ages`} intro={`Raise conscious, resilient children with wisdom rooted in ancient values and modern understanding.`} />,
});
