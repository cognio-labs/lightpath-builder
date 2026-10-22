"use client";

import { useEffect } from "react";

type ClarityFunction = ((...args: unknown[]) => void) & { q?: unknown[][] };

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: ClarityFunction;
  }
}

function appendScript(id: string, src: string) {
  const existing = document.getElementById(id);
  if (existing instanceof HTMLScriptElement) return existing;
  const script = document.createElement("script");
  script.id = id;
  script.src = src;
  script.async = true;
  document.head.appendChild(script);
  return script;
}

/** Keeps analytics from competing with the initial page render and LCP image. */
export function DeferredAnalytics() {
  useEffect(() => {
    let loaded = false;
    const load = () => {
      if (loaded) return;
      loaded = true;

      window.dataLayer ||= [];
      window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
      appendScript("google-analytics", "https://www.googletagmanager.com/gtag/js?id=G-SQT5YHQSLK");
      window.gtag("js", new Date());
      window.gtag("config", "G-SQT5YHQSLK");

      const datafast = appendScript("datafast", "https://datafa.st/js/script.js");
      datafast.dataset.websiteId = process.env.NEXT_PUBLIC_DATAFAST_WEBSITE_ID || "dfid_SM28U0HshmRfiuXSjfwKe";
      datafast.dataset.domain = process.env.NEXT_PUBLIC_DATAFAST_DOMAIN || "sciencedivine.org";
      datafast.dataset.allowLocalhost = process.env.NEXT_PUBLIC_DATAFAST_ALLOW_LOCALHOST || "true";

      if (!window.clarity) {
        const clarity: ClarityFunction = (...args: unknown[]) => {
          (clarity.q ||= []).push(args);
        };
        window.clarity = clarity;
      }
      appendScript("microsoft-clarity", "https://www.clarity.ms/tag/yregp2mxge");
    };

    const events: Array<keyof WindowEventMap> = ["pointerdown", "keydown", "scroll", "touchstart"];
    events.forEach((event) => window.addEventListener(event, load, { once: true, passive: true }));
    return () => events.forEach((event) => window.removeEventListener(event, load));
  }, []);

  return null;
}
