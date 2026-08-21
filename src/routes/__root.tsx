import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { MahaMantrasPopup } from "@/components/MahaMantrasPopup";
import { DivineAIChatWidget } from "@/components/DivineAIChatWidget";

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-white px-4">
      <div className="max-w-md text-center">
        <div className="text-8xl font-bold gradient-text mb-4">404</div>
        <h1 className="text-2xl font-display font-bold text-gray-900">Page not found</h1>
        <p className="mt-3 text-base text-gray-500">
          The path you're seeking isn't here. Return home and continue your journey.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full btn-gold px-8 py-3 text-sm font-semibold"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-white px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-display font-semibold text-gray-900">This page didn't load</h1>
        <p className="mt-2 text-sm text-gray-500">Something went wrong. Try refreshing.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full btn-gold px-6 py-2 text-sm font-semibold"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-full border border-gray-200 bg-white px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Science Divine Foundation | Sound Body, Sound Mind, Self Realization" },
      {
        name: "description",
        content:
          "Awaken your true potential with Science Divine Movement. Sound Body, Sound Mind, Self-Realization through meditation and spiritual guidance by Sakshi Shree.",
      },
      { name: "author", content: "Science Divine Foundation" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Science Divine Foundation" },
      {
        property: "og:title",
        content: "Science Divine Foundation | Sound Body, Sound Mind, Self Realization",
      },
      {
        property: "og:description",
        content:
          "Awaken your true potential with Science Divine Movement. Meditation and spiritual guidance by enlightened master Sakshi Shree.",
      },
      { property: "og:image", content: "https://sciencedivine.org/wp-content/uploads/2024/05/aboutsakshishree.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@gurusakshishree" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "https://sciencedivine.org/wp-content/uploads/2023/07/cropped-SD_logo.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;1,500;1,600;1,700&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600;1,700&family=Cinzel:wght@500;600;700;800&family=Inter:wght@400;500;600;700;800&family=Philosopher:ital,wght@0,400;0,700;1,400;1,700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-dvh flex-col bg-white">
        <SiteNav />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
        <MahaMantrasPopup />
        <DivineAIChatWidget />
      </div>
    </QueryClientProvider>
  );
}
