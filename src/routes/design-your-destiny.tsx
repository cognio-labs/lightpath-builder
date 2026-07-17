import { createFileRoute } from "@tanstack/react-router";
import { CourseTemplate } from "@/components/CourseTemplate";
import { COURSES } from "@/data/content";

export const Route = createFileRoute("/design-your-destiny")({
  head: () => ({
    meta: [
      { title: "Design Your Destiny — Course by Sakshi Shree" },
      { name: "description", content: "Transformative course by Sakshi Shree. Design Your Destiny — practical wisdom for real life." },
      { property: "og:title", content: "Design Your Destiny" },
      { property: "og:image", content: "https://sciencedivine.org/wp-content/uploads/2024/04/pexels-chetanvlad-2923157-1.png" },
      { property: "og:url", content: "/design-your-destiny" },
    ],
    links: [{ rel: "canonical", href: "/design-your-destiny" }],
  }),
  component: () => <CourseTemplate course={COURSES[0]} forWhom={["Students", "Professionals", "Home Makers", "Seekers"]} modules={[{"title":"Manifest Your Reality","desc":"How thought, emotion, and action combine to shape circumstance."},{"title":"Science of Thoughtfulness","desc":"Reclaiming attention from the drift of the modern mind."},{"title":"Secret of Blissful Living","desc":"Bliss as a skill, not a happening."},{"title":"Art of Inner Cleansing","desc":"Daily practices that clear energetic residue."}]} />,
});
