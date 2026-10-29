import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nirman Sewa | Build Sakshi Dham International",
  description:
    "Support the creation of Sakshi Dham International, a spiritual learning, meditation, and community campus in Vrindavan.",
  alternates: { canonical: "/nirman-sewa" },
};

export default function NirmanSewaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
