import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { ShoppingCart, Star } from "lucide-react";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Science Divine" },
      {
        name: "description",
        content: "Science Divine Diamond Diary — a sacred journal for your spiritual practice.",
      },
      { property: "og:title", content: "Shop — Science Divine" },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Shop"
        title="Sacred tools for daily practice"
        subtitle="Curated products to support your journey."
      />
      <section className="section-pad">
        <div className="container-page">
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-muted-foreground">Showing 1 product</p>
            <select className="rounded-full border border-input bg-background px-4 py-2 text-sm">
              <option>Default sorting</option>
              <option>Popularity</option>
              <option>Latest</option>
              <option>Price: low to high</option>
              <option>Price: high to low</option>
            </select>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-card rounded-2xl overflow-hidden hover-lift">
              <div className="aspect-square overflow-hidden bg-secondary/40">
                <img
                  src="https://sciencedivine.org/wp-content/uploads/2023/09/Daimond-Dairy-New-Cover-300x300.jpg"
                  alt="Diamond Diary"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <div className="flex gap-0.5 text-gold mb-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <h3 className="font-display font-bold text-lg mb-2">
                  Science Divine Diamond Diary
                </h3>
                <div className="font-display text-2xl font-bold gradient-text mb-4">₹350.00</div>
                <div className="flex gap-2">
                  <Link
                    to="/cart"
                    className="flex-1 btn-outline-glow rounded-full px-4 py-2 text-sm font-semibold text-center inline-flex items-center justify-center gap-1"
                  >
                    <ShoppingCart size={14} /> Add
                  </Link>
                  <Link
                    to="/checkout"
                    className="flex-1 btn-gradient rounded-full px-4 py-2 text-sm font-semibold text-center"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
