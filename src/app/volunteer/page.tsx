import type { Metadata } from "next";
import Volunteer from "./volunteer";
import "./volunteer.css";
export const metadata: Metadata = {
  title: "Join as a Volunteer | Science Divine",
  description:
    "Share your time, talent and compassion through seven Science Divine seva initiatives.",
  alternates: { canonical: "/volunteer" },
};
export default function Page() {
  return <Volunteer />;
}
