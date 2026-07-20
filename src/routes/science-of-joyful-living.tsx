import { createFileRoute } from "@tanstack/react-router";
import { CourseTemplate } from "@/components/CourseTemplate";
import { COURSES } from "@/data/content";

export const Route = createFileRoute("/science-of-joyful-living")({
  head: () => ({
    meta: [
      { title: "Science of Joyful Living ,  Course by Sakshi Shree" },
      {
        name: "description",
        content:
          "Transformative course by Sakshi Shree. Science of Joyful Living ,  practical wisdom for real life.",
      },
      { property: "og:title", content: "Science of Joyful Living" },
      {
        property: "og:image",
        content:
          "https://sciencedivine.org/wp-content/uploads/2024/04/pexels-chetanvlad-2923157-1.png",
      },
      { property: "og:url", content: "/science-of-joyful-living" },
    ],
    links: [{ rel: "canonical", href: "/science-of-joyful-living" }],
  }),
  component: () => (
    <CourseTemplate
      course={COURSES[1]}
      forWhom={["Students", "Professionals", "Home Makers", "Seekers"]}
      modules={[
        { title: "Foundations of Joy", desc: "Why joy is your baseline, not your goal." },
        { title: "Emotion as Signal", desc: "Reading feelings without being ruled by them." },
        { title: "The Daily Practice", desc: "A ritual you can actually maintain." },
        { title: "Sustaining the Shift", desc: "Integration for the long haul." },
      ]}
    />
  ),
});
