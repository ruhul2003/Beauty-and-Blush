"use client";

import React, { useState } from 'react';

const TOP_SELLERS = [
  {
    id: "top-seller-1",
    tag: "BEST SELLING BAG",
    title: "Artisan Leather Tote & Shoulder Bag",
    bgClass: "bg-[#fde7e7] dark:bg-[#2b1820]",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
    alt: "Handcrafted artisan leather bag",
    href: "/browse?category=Accessories",
    buttonText: "SHOP NOW"
  },
  {
    id: "top-seller-2",
    tag: "ICONIC BLUSH COSMETIC",
    title: "Soft Pinch Velvet Liquid Rouge",
    bgClass: "bg-[#f3e8fa] dark:bg-[#25172d]",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=85",
    alt: "Dewy soft pinch blush cosmetic",
    href: "/browse?category=Makeup",
    buttonText: "SHOP NOW"
  },
  {
    id: "top-seller-3",
    tag: "LUXURY CROSSBODY",
    title: "Chic Quilted Mini Chain Bag",
    bgClass: "bg-[#e2f0fb] dark:bg-[#152331]",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85",
    alt: "Quilted leather luxury handbag",
    href: "/browse?category=Accessories",
    buttonText: "SHOP NOW"
  },
  {
    id: "top-seller-4",
    tag: "HAUTE COSMETICS",
    title: "Color Revival Hydrating Lip Glow",
    bgClass: "bg-[#e5f5ec] dark:bg-[#162920]",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=85",
    alt: "Luxury hydrating lipstick",
    href: "/browse?category=Makeup",
    buttonText: "SHOP NOW"
  },
  {
    id: "top-seller-5",
    tag: "SIGNATURE FRAGRANCE",
    title: "Eau Tendre Peony & Rose Flacon",
    bgClass: "bg-[#faf0e1] dark:bg-[#2c2215]",
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=900&q=85",
    alt: "Designer perfume mist flacon",
    href: "/browse?category=Fragrance",
    buttonText: "SHOP NOW"
  },
  {
    id: "top-seller-6",
    tag: "CLINICAL SKINCARE",
    title: "Pure Hyaluronic Barrier Elixir",
    bgClass: "bg-[#f5eef8] dark:bg-[#22162b]",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=85",
    alt: "Clinical hydrating serum cosmetic",
    href: "/browse?category=Skincare",
    buttonText: "SHOP NOW"
  }
];

export function TopSellingProducts() {
  return (
    <section className="py-12 sm:py-16 overflow-hidden">
      <div className="w-[95%] sm:w-[92%] max-w-[1500px] mx-auto px-2 sm:px-4">
        {/* Top Selling Products Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-[#181416] dark:text-white">
            TOP SELLING PRODUCTS
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto font-normal">
            Explore our most celebrated luxury bags, iconic cosmetics and radiant essentials
          </p>
        </div>
      </div>
    </section>
  );
}
