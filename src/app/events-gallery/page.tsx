"use client";
import Link from "next/link";

import { PageHero, SectionHeading } from "@/components/PageHero";
import { ArrowLeft } from "lucide-react";




const GALLERY = [
  "https://sciencedivine.org/wp-content/uploads/2025/02/mzlvjnkn-1-scaled.webp",
  "https://sciencedivine.org/wp-content/uploads/2024/05/aboutsakshishree.jpg",
  "https://sciencedivine.org/wp-content/uploads/2025/03/image-10.webp",
  "https://sciencedivine.org/wp-content/uploads/2023/06/young-img1.jpg",
  "https://sciencedivine.org/wp-content/uploads/2024/04/gospelforasia-RT18-03070.jpeg",
  "https://sciencedivine.org/wp-content/uploads/2024/03/Self-Conscious.jpeg",
  "https://sciencedivine.org/wp-content/uploads/2023/06/3-scaled.webp",
  "https://sciencedivine.org/wp-content/uploads/2023/06/4-scaled.webp",
  "https://sciencedivine.org/wp-content/uploads/2023/06/1-scaled.webp",
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Moments"
        title="Events Gallery"
        subtitle="Explore the energy, joy, and peace captured during our meditation shivirs, youth festivals, and retreats."
      />

      <section className="section-pad bg-white">
        <div className="container-page">
          <Link href="/events" className="text-sm font-semibold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1 mb-8">
            <ArrowLeft size={14} /> Back to Events
          </Link>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {GALLERY.map((src, i) => (
              <div key={i} className="aspect-[4/3] rounded-2xl overflow-hidden shadow-sm card-premium">
                <img
                  src={src}
                  alt={`Gallery moment ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
