import { createFileRoute } from "@tanstack/react-router";
import { SolutionPageLayout } from "@/components/SolutionPageLayout";

export const Route = createFileRoute("/yoga")({
  head: () => ({
    meta: [
      { title: "Yoga — Science Divine Foundation" },
      {
        name: "description",
        content:
          "Easy Yoga for Everyday Peace — articles, videos, and guided practices from Sakshi Shree.",
      },
      { property: "og:title", content: "Yoga — Science Divine" },
      { property: "og:url", content: "/yoga" },
    ],
    links: [{ rel: "canonical", href: "/yoga" }],
  }),
  component: () => (
    <SolutionPageLayout
      slug="yoga"
      title="Yoga"
      tagline={`Easy Yoga for Everyday Peace`}
      intro={`Yoga is union — of body, breath, and being. Simple daily practice transforms life.`}
    />
  ),
});
