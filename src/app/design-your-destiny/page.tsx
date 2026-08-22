"use client";

import { CourseTemplate } from "@/components/CourseTemplate";
import { COURSES } from "@/data/content";





export default function Page() {
  return (
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
  );
}
