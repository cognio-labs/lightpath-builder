import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.30"],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sciencedivine.org",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
  // Allow requests to external media
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // 301 Permanent Redirects for legacy and placeholder slugs
      {
        source: "/blog/how-to-reduce-stress-7-powerful-lessons-from-lord-ganesha",
        destination: "/blog/how-to-reduce-stress-lord-ganesha-lessons",
        permanent: true,
      },
      {
        source: "/blog/how-to-stop-overthinking-7-bhagavad-gita-lessons-for-a-calm-mind",
        destination: "/blog/how-to-stop-overthinking-bhagavad-gita",
        permanent: true,
      },
      {
        source: "/blog/vishwakarma-puja-mantra-powerful-chants",
        destination: "/blog/vishwakarma-puja-mantra",
        permanent: true,
      },
      {
        source: "/blog/hartalika-teej-vrat-katha-and-puja-vidhi",
        destination: "/blog/hartalika-teej-story-parvati-tapasya-shiva",
        permanent: true,
      },
      {
        source: "/blog/durva-grass-offering-to-lord-ganesha-spiritual-meaning",
        destination: "/blog/why-durva-is-offered-to-ganesha",
        permanent: true,
      },
      {
        source: "/blog/why-modak-is-lord-ganeshas-favorite-sweet",
        destination: "/blog/why-modak-is-ganeshas-favourite-sweet",
        permanent: true,
      },
      {
        source: "/blog/14-knots-anant-sutra-significance-on-anant-chaturdashi",
        destination: "/blog/why-14-knots-tied-anant-sutra-anant-chaturdashi",
        permanent: true,
      },
      {
        source: "/blog/can-women-perform-shraddha-in-pitru-paksha",
        destination: "/blog/can-women-perform-shraddha-pitru-paksha",
        permanent: true,
      },
      {
        source: "/blog/108-sacred-names-of-lord-ganesha-and-their-meanings",
        destination: "/blog/108-names-of-lord-ganesha-with-meaning",
        permanent: true,
      },
      {
        source: "/blog/parsva-ekadashi-vrat-katha-and-spiritual-benefits",
        destination: "/blog/parsva-ekadashi-2026-vrat-katha-puja-vidhi",
        permanent: true,
      },
      {
        source: "/blog/radha-krishna-eternal-love-story-and-spiritual-secrets",
        destination: "/blog/radha-krishna-love-story-spiritual-meaning-eternal-love",
        permanent: true,
      },
      {
        source: "/blog/pitru-paksha-spiritual-significance-and-gratitude",
        destination: "/blog/pitru-paksha-2026-meaning-significance-science-of-gratitude",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
