import type { Metadata } from "next";
import "./globals.css";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { MahaMantrasPopup } from "@/components/MahaMantrasPopup";
import { QuickActionBar } from "@/components/QuickActionBar";
import { DeferredBookingModalHost } from "@/components/DeferredBookingModalHost";
import { DeferredAnalytics } from "@/components/DeferredAnalytics";

const BASE_URL = "https://sciencedivine.org";

// Organization + WebSite JSON-LD (Yoast parity)
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Science Divine Foundation",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/favicon.ico`,
        width: 500,
        height: 500,
      },
      sameAs: [
        "https://www.facebook.com/sciencedivine",
        "https://www.youtube.com/@sciencedivine",
        "https://www.instagram.com/sciencedivine",
        "https://www.linkedin.com/company/sciencedivine",
        "https://twitter.com/gurusakshishree",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-93159-44774",
        contactType: "customer support",
        email: "info@sciencedivine.org",
        availableLanguage: ["English", "Hindi"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Science Divine Foundation",
      publisher: { "@id": `${BASE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/blog?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export const metadata: Metadata = {
  // metadataBase ensures all relative URLs (canonical, OG url) are resolved
  // to the production domain, fixing the relative canonical P0 blocker.
  metadataBase: new URL(BASE_URL),
  title: "Science Divine Foundation | Sound Body, Sound Mind, Self Realization",
  description:
    "Awaken your true potential with Science Divine Movement. Sound Body, Sound Mind, Self-Realization through meditation and spiritual guidance by Sakshi Shree.",
  authors: [{ name: "Science Divine Foundation" }],
  alternates: {
    // Self-referencing canonical for the root layout (child pages override this)
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Science Divine Foundation",
    url: "/",
    title: "Science Divine Foundation | Sound Body, Sound Mind, Self Realization",
    description:
      "Awaken your true potential with Science Divine Movement. Meditation and spiritual guidance by enlightened master Sakshi Shree.",
    images: [
      {
        url: "/images/science-divine-og.png",
        width: 1200,
        height: 630,
        alt: "Science Divine logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@gurusakshishree",
    images: ["/images/science-divine-og.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  // Google Search Console ownership verification
  verification: {
    google: "K4Vp--hDmRpUDL-H8DiiGUM1qxyPyfnEmmmXqD-px2c",
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
        {/* Organization + WebSite structured data — global across all pages */}
        <script
          key="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
          suppressHydrationWarning
        />
      </head>
      <body className="bg-white">
        <div className="flex min-h-dvh flex-col bg-white">
          <SiteNav />
          <main className="flex-1 w-full bg-white pb-6 lg:pb-0">{children}</main>
          <QuickActionBar />
          <SiteFooter />
          <MahaMantrasPopup />
          <DeferredBookingModalHost />
          <DeferredAnalytics />
        </div>
      </body>
    </html>
  );
}
