import { createFileRoute } from "@tanstack/react-router";
import { CourseTemplate } from "@/components/CourseTemplate";
import { COURSES } from "@/data/content";

export const Route = createFileRoute("/mind-power-meditation")({
  head: () => ({
    meta: [
      { title: "Mind Power Meditation — Course by Sakshi Shree" },
      { name: "description", content: "Transformative course by Sakshi Shree. Mind Power Meditation — practical wisdom for real life." },
      { property: "og:title", content: "Mind Power Meditation" },
      { property: "og:image", content: "https://sciencedivine.org/wp-content/uploads/2024/04/pexels-felipe-borges-964530-2597205-1.png" },
      { property: "og:url", content: "/mind-power-meditation" },
    ],
    links: [{ rel: "canonical", href: "/mind-power-meditation" }],
  }),
  component: () => <CourseTemplate course={COURSES[2]} forWhom={["Students", "Professionals", "Entrepreneurs", "Goal Setters"]} modules={[{"title":"Meditation Fundamentals","desc":"Posture, breath, attention \u2014 done rightly."},{"title":"Mind Power Mechanics","desc":"How focused mind shapes outer results."},{"title":"Advanced Techniques","desc":"Third-eye meditation and beyond."},{"title":"Application","desc":"Bringing power into work, relationships, purpose."}]} />,
});
