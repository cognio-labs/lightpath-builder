import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { MahaMantrasPopup } from "@/components/MahaMantrasPopup";
import { QuickActionBar } from "@/components/QuickActionBar";

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
        url: "/images/guruji-meditation-hd.webp",
        width: 1200,
        height: 630,
        alt: "Science Divine Foundation — Sakshi Shree",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@gurusakshishree",
    images: ["/images/guruji-meditation-hd.webp"],
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
        {/* Organization + WebSite structured data — global across all pages */}
        <Script
          id="schema-org-global"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
          strategy="beforeInteractive"
        />
        {/* Google tag (gtag.js) — GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SQT5YHQSLK"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-SQT5YHQSLK');`}
        </Script>
        {/* DataFast analytics */}
        <Script
          id="datafast"
          src="https://datafa.st/js/script.js"
          data-website-id="dfid_SM28U0HshmRfiuXSjfwKe"
          data-domain="sciencedivine.org"
          strategy="afterInteractive"
        />
        {/* Microsoft Clarity */}
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "yregp2mxge");`}
        </Script>
      </head>
      <body>
        <Providers>
          <div className="flex min-h-dvh flex-col bg-white">
            <SiteNav />
            <main className="flex-1 pb-6 lg:pb-0">{children}</main>
            <QuickActionBar />
            <SiteFooter />
            <MahaMantrasPopup />
          </div>
        </Providers>
      </body>
    </html>
  );
}
