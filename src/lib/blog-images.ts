import { load } from "cheerio";

const TYPEFLO_HOSTS = new Set(["cdn.typeflo.io", "auth.typeflo.io"]);
const ARTICLE_WIDTHS = [640, 1080, 1600, 2048];

export function unwrapTypefloImageUrl(value: string): string {
  try {
    const url = new URL(value);
    if (url.hostname === "cdn.typeflo.io" && url.pathname === "/_next/image") {
      return url.searchParams.get("url") || value;
    }
  } catch {
    // Local paths and malformed legacy URLs are returned unchanged.
  }
  return value;
}

function isTypefloImage(value: string): boolean {
  try {
    return TYPEFLO_HOSTS.has(new URL(value).hostname);
  } catch {
    return false;
  }
}

function optimizedUrl(source: string, width: number): string {
  return `/_next/image?url=${encodeURIComponent(source)}&w=${width}&q=85`;
}

/**
 * Typeflo article bodies arrive as trusted HTML rather than React image nodes.
 * Route those remote images through the local optimizer so hotlink protection
 * cannot leave blank content and each viewport receives an appropriate width.
 */
export function optimizeTypefloArticleImages(html: string): string {
  const $ = load(html, {}, false);

  $("img").each((_, element) => {
    const rawSource = $(element).attr("src");
    if (!rawSource) return;
    const source = unwrapTypefloImageUrl(rawSource);
    if (!isTypefloImage(source)) return;

    $(element).attr({
      src: optimizedUrl(source, 1080),
      srcset: ARTICLE_WIDTHS.map((width) => `${optimizedUrl(source, width)} ${width}w`).join(", "),
      sizes: "(max-width: 960px) calc(100vw - 32px), 896px",
      loading: "lazy",
      decoding: "async",
    });
  });

  return $.html();
}
