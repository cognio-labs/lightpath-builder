import { permanentRedirect } from "next/navigation";
import { getAllPostSummaries, getCategories } from "@/lib/blog.server";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Old WordPress category archives (/category/meditation/) now live on the blog
// listing, filtered by category, so there is one up-to-date list of posts.
export default async function CategoryArchivePage({ params }: PageProps) {
  const { slug } = await params;
  const categories = getCategories(await getAllPostSummaries());
  const match = categories.find((c) => c.slug === slug);
  permanentRedirect(match ? `/blog?category=${encodeURIComponent(match.slug)}` : "/blog");
}
