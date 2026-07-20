import { createFileRoute } from "@tanstack/react-router";
import { CourseTemplate } from "@/components/CourseTemplate";
import { COURSES } from "@/data/content";

export const Route = createFileRoute("/design-your-destiny-2")({
  head: () => ({
    meta: [
      { title: "Design Your Destiny | Science Divine Foundation" },
      { name: "description", content: "Transformative course by Sakshi Shree. Design Your Destiny ,  practical wisdom for real life." },
    ],
  }),
  component: () => (
    <CourseTemplate
      course={COURSES[0]}
      forWhom={["Students", "Professionals", "Home Makers", "Seekers"]}
      modules={[
        {
          title: "Manifest Your Reality",
          desc: "How thought, emotion, and action combine to shape circumstance.",
        },
        {
          title: "Science of Thoughtfulness",
          desc: "Reclaiming attention from the drift of the modern mind.",
        },
        { title: "Secret of Blissful Living", desc: "Bliss as a skill, not a happening." },
        { title: "Art of Inner Cleansing", desc: "Daily practices that clear energetic residue." },
      ]}
    />
  ),
});
