import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { CreditCard } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Science Divine" },
      { name: "description", content: "Checkout." },
      { property: "og:url", content: "/checkout" },
    ],
    links: [{ rel: "canonical", href: "/checkout" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Checkout" title="Checkout" />
      <section className="section-pad">
        <div className="container-page max-w-md mx-auto text-center">
          <CreditCard size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-lg text-muted-foreground mb-6">Your cart is empty. Add products before checking out.</p>
          <Link to="/shop" className="btn-gradient rounded-full px-7 py-3 font-semibold text-sm inline-block">Return to Shop</Link>
        </div>
      </section>
    </>
  ),
});
