import { createFileRoute } from "@tanstack/react-router";
import { CourseTemplate } from "@/components/CourseTemplate";
import { COURSES } from "@/data/content";

export const Route = createFileRoute("/sanjeevni-kriya")({
  head: () => ({
    meta: [
      { title: "Sanjeevani Kriya — Course by Sakshi Shree" },
      {
        name: "description",
        content:
          "Transformative course by Sakshi Shree. Sanjeevani Kriya — practical wisdom for real life.",
      },
      { property: "og:title", content: "Sanjeevani Kriya" },
      {
        property: "og:image",
        content:
          "https://sciencedivine.org/wp-content/uploads/2024/04/pexels-min-an-1234035-1-1.png",
      },
      { property: "og:url", content: "/sanjeevni-kriya" },
    ],
    links: [{ rel: "canonical", href: "/sanjeevni-kriya" }],
  }),
  component: () => (
    <CourseTemplate
      course={COURSES[3]}
      forWhom={["Aspiring Souls", "Seekers", "Visionaries", "Dreamers"]}
      modules={[
        { title: "Understanding Kriya", desc: "Why this ancient technique still works." },
        { title: "Preparing the Body", desc: "Asana and pranayama prerequisites." },
        { title: "The Kriya Itself", desc: "Step by step, breath by breath." },
        { title: "Integration", desc: "Living the aliveness the kriya awakens." },
      ]}
    />
  ),
});
