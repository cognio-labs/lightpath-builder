"use client";

import { CourseTemplate } from "@/components/CourseTemplate";
import { COURSES } from "@/data/content";





export default function Page() {
  return (
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
  );
}
