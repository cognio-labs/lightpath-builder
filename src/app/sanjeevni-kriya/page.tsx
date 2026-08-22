"use client";

import { CourseTemplate } from "@/components/CourseTemplate";
import { COURSES } from "@/data/content";





export default function Page() {
  return (
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
  );
}
