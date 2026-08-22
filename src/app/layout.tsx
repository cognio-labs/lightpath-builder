import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { MahaMantrasPopup } from "@/components/MahaMantrasPopup";
import { DivineAIChatWidget } from "@/components/DivineAIChatWidget";

export const metadata: Metadata = {
  title: "Science Divine Foundation | Sound Body, Sound Mind, Self Realization",
  description:
    "Awaken your true potential with Science Divine Movement. Sound Body, Sound Mind, Self-Realization through meditation and spiritual guidance by Sakshi Shree.",
  authors: [{ name: "Science Divine Foundation" }],
  openGraph: {
    type: "website",
    siteName: "Science Divine Foundation",
    title: "Science Divine Foundation | Sound Body, Sound Mind, Self Realization",
    description:
      "Awaken your true potential with Science Divine Movement. Meditation and spiritual guidance by enlightened master Sakshi Shree.",
    images: [
      "https://sciencedivine.org/wp-content/uploads/2024/05/aboutsakshishree.jpg",
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@gurusakshishree",
  },
  icons: {
    icon: "https://sciencedivine.org/wp-content/uploads/2023/07/cropped-SD_logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;1,500;1,600;1,700&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600;1,700&family=Cinzel:wght@500;600;700;800&family=Inter:wght@400;500;600;700;800&family=Philosopher:ital,wght@0,400;0,700;1,400;1,700&display=swap"
        />
      </head>
      <body>
        <Providers>
          <div className="flex min-h-dvh flex-col bg-white">
            <SiteNav />
            <main className="flex-1">{children}</main>
            <SiteFooter />
            <MahaMantrasPopup />
            <DivineAIChatWidget />
          </div>
        </Providers>
      </body>
    </html>
  );
}
