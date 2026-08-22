"use client";
import Link from "next/link";

import { PageHero } from "@/components/PageHero";
import { CreditCard } from "lucide-react";





export default function Page() {
  return (
    <>
      <PageHero eyebrow="Checkout" title="Checkout" />
      <section className="section-pad">
        <div className="container-page max-w-md mx-auto text-center">
          <CreditCard size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-lg text-muted-foreground mb-6">
            Your cart is empty. Add products before checking out.
          </p>
          <Link
            href="/shop"
            className="btn-gradient rounded-full px-7 py-3 font-semibold text-sm inline-block"
          >
            Return to Shop
          </Link>
        </div>
      </section>
    </>
  );
}
