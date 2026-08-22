"use client";

import { PageHero } from "@/components/PageHero";
import { ShoppingCart, Zap, Star } from "lucide-react";




const PRODUCTS = [
  {
    id: 4848,
    title: "Science Divine Diamond Diary",
    price: 350,
    originalPrice: 600,
    image: "https://sciencedivine.org/wp-content/uploads/2023/09/Daimond-Dairy-New-Cover-300x300.jpg",
    badge: "Bestseller",
    description: "A premium guided diary for conscious reflection, goal-setting, and spiritual alignment. Crafted with wisdom by Sakshi Shree.",
    rating: 5,
    reviews: 124,
    cartUrl: "https://sciencedivine.org/shop/?add-to-cart=4848",
    buyUrl: "https://sciencedivine.org/checkout/?wc-quick-buy-now=4848&quantity=1",
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Science Divine Store"
        title={
          <>
            Shop{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #F59E0B, #D4AF37)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Sacred Tools
            </span>{" "}
            for Conscious Living
          </>
        }
        subtitle="Handpicked products designed to support your spiritual journey and conscious lifestyle."
      />

      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="card-premium rounded-2xl overflow-hidden group">
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
                      style={{ background: "linear-gradient(135deg, #F59E0B, #D4AF37)", color: "#1a1000" }}>
                      {product.badge}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-5">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: product.rating }).map((_, i) => (
                      <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                  </div>

                  <h3 className="font-display font-bold text-gray-900 mb-2 leading-tight">{product.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4">{product.description}</p>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-display text-2xl font-bold" style={{ color: "#D4AF37" }}>₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                    )}
                    {product.originalPrice && (
                      <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                      </span>
                    )}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col gap-2">
                    <a
                      href={product.buyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-gold rounded-xl py-2.5 text-sm font-semibold text-center flex items-center justify-center gap-2"
                    >
                      <Zap size={14} /> Buy Now
                    </a>
                    <a
                      href={product.cartUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-outline-gold rounded-xl py-2.5 text-sm font-semibold text-center flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={14} /> Add to Cart
                    </a>
                  </div>
                </div>
              </div>
            ))}

            {/* Coming soon card */}
            <div className="card-premium rounded-2xl overflow-hidden flex items-center justify-center"
              style={{ minHeight: "400px", background: "linear-gradient(135deg, #FFFBF0, #FFF3D0)", border: "2px dashed rgba(212,175,55,0.3)" }}>
              <div className="text-center p-8">
                <div className="text-4xl mb-3">🛍️</div>
                <h3 className="font-display font-bold text-gray-800 mb-2">More Coming Soon</h3>
                <p className="text-sm text-gray-500">New spiritual products & books will be available soon.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Maha Mantras Book */}
      <section className="section-pad" style={{ background: "#FAFAFA" }}>
        <div className="container-page">
          <div className="card-premium rounded-3xl overflow-hidden grid md:grid-cols-2">
            <div className="p-10 md:p-14 flex flex-col justify-center">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
                style={{ background: "rgba(212,175,55,0.15)", color: "#92700A" }}>
                New Book
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Transform Your Life With{" "}
                <span style={{ background: "linear-gradient(90deg, #F59E0B, #D4AF37)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                  Ancient Wisdom
                </span>
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Be among the first to experience Maha Mantras by Sakshi Shree.
                Unlock timeless wisdom + special pre-order discount.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://amzn.in/d/0cR0rBnu" target="_blank" rel="noreferrer"
                  className="btn-gold rounded-full px-7 py-3 text-sm font-semibold">
                  🛒 Book Now
                </a>
                <a href="https://www.penguin.co.in/book/life-changing-maha-mantras/" target="_blank" rel="noreferrer"
                  className="btn-outline-gold rounded-full px-7 py-3 text-sm font-semibold">
                  Know More
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center p-10 bg-gradient-to-br from-amber-50 to-yellow-50">
              <img
                src="https://gitamahamantras.com/assets/maha-mantras-hero-ClQXnKFp.png"
                alt="Maha Mantras Book by Sakshi Shree"
                className="w-full max-w-xs object-contain drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* App CTA */}
      <section className="py-14 bg-white">
        <div className="container-page text-center">
          <p className="text-sm text-gray-500 mb-3">Download the app to get exclusive access</p>
          <a
            href="https://play.google.com/store/apps/details?id=com.sakshishree.learners&pcampaignid=web_share"
            target="_blank" rel="noreferrer"
            className="inline-block"
          >
            <img
              src="https://sciencedivine.org/wp-content/uploads/2023/08/image-16.png"
              alt="Get it on Google Play"
              className="h-14 mx-auto"
            />
          </a>
          <p className="text-xs text-gray-400 mt-3">to get exclusive access to community, Events and Courses.</p>
        </div>
      </section>
    </>
  );
}
