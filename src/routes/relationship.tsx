import { createFileRoute } from "@tanstack/react-router";
import { SolutionPageLayout } from "@/components/SolutionPageLayout";

export const Route = createFileRoute("/relationship")({
  head: () => ({
    meta: [
      { title: "Relationships | Science Divine Foundation" },
      { name: "description", content: "Find guidance and healing for relationship challenges through Sakshi Shree's teachings on conscious relationships." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SolutionPageLayout
      slug={"meditation" as any}
      title="Relationships"
      tagline="Heal & Strengthen Your Relationships"
      intro="Relationships mirror our inner world. Learn how conscious presence, empathy, and spiritual wisdom can transform every relationship in your life."
    />
  );
}
