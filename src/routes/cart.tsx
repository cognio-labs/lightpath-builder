import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cart — Science Divine" },
      { name: "description", content: "Your shopping cart." },
      { property: "og:url", content: "/cart" },
    ],
    links: [{ rel: "canonical", href: "/cart" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Cart" title="Your cart" />
      <section className="section-pad">
        <div className="container-page max-w-md mx-auto text-center">
          <ShoppingBag size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-lg text-muted-foreground mb-6">Your cart is currently empty.</p>
          <Link to="/shop" className="btn-gradient rounded-full px-7 py-3 font-semibold text-sm inline-block">Return to Shop</Link>
        </div>
      </section>
    </>
  ),
});
