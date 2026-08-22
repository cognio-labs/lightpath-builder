import { KnowledgeItem } from "./types";
import { scienceDivineLinks } from "../navigation/science-divine-links";
import { EVENTS } from "@/data/content";

function getEventStatus(dateLabel: string): string {
  const parsedDate = Date.parse(dateLabel);
  if (Number.isNaN(parsedDate)) return "Availability must be confirmed on the official Events page";
  return parsedDate < Date.now()
    ? "Completed"
    : "Upcoming, subject to confirmation on the official Events page";
}

export const eventsKnowledge: KnowledgeItem[] = [
  {
    id: "events-overview",
    title: "Science Divine Events, Retreats & Satsangs",
    category: "EVENTS",
    content: `Science Divine regularly hosts spiritual gatherings, meditation retreats, seasonal mahotsavs (Vasant Mahotsav, Navvarsh Dhyan Mahotsav, Holi Milan Samaroh), and Satsangs with Sakshi Shree.
Events are hosted at Siddha Sudarshan Sakshi Dhaam (Ghaziabad / Vrindavan) and virtually worldwide.
Check the Events page for upcoming dates, venue addresses, and entry registration details.`,
    sourceUrl: scienceDivineLinks.events,
    keywords: [
      "events",
      "satsang",
      "retreats",
      "camps",
      "mahotsav",
      "upcoming events",
      "program schedule",
      "कार्यक्रम",
      "सत्संग",
      "महोत्सव",
    ],
    suggestedQuestions: [
      "Agla event kab hai?",
      "Event location kahan hai?",
      "Event mein kaise register karein?",
    ],
  },
  ...EVENTS.map((ev, index): KnowledgeItem => ({
    id: `event-${index}`,
    title: ev.title,
    category: "EVENTS",
    content: `${ev.title}:
Date: ${ev.date} | Time: ${ev.time}
Location: ${ev.location}
Status: ${getEventStatus(ev.date)}
Join Sakshi Shree for guided meditation, problem resolution, and spiritual discourse. Check the Events section to reserve your seat.`,
    sourceUrl: scienceDivineLinks.events,
    keywords: [
      ev.title.toLowerCase(),
      ev.location.toLowerCase(),
      ev.date.toLowerCase(),
      "event",
    ],
    suggestedQuestions: [
      `${ev.title} kab hai?`,
      `${ev.title} kahan hoga?`,
    ],
  })),
];
