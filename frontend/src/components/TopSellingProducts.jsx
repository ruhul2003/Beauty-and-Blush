"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const TOP_SELLERS = [
  {
    id: "top-seller-1",
    tag: "HANDCRAFTED BAG • ATELIER",
    title: "Artisan Leather Tote & Shoulder Bag",
    price: "৳4,850",
    bgClass: "bg-[#fde7e7] dark:bg-[#2b1820]",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
    alt: "Handcrafted artisan leather bag",
    href: "/browse?category=Accessories",
    buttonText: "SHOP NOW"
  },
  {
    id: "top-seller-2",
    tag: "ICONIC BLUSH • BEST SELLER",
    title: "Rare Soft Pinch Dewy Liquid Blush",
    price: "৳2,850",
    bgClass: "bg-[#f3e8fa] dark:bg-[#25172d]",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=85",
    alt: "Dewy soft pinch blush cosmetic",
    href: "/browse?category=Makeup",
    buttonText: "SHOP NOW"
  },
  {
    id: "top-seller-3",
    tag: "DESIGNER BAG • TRENDING",
    title: "Chic Quilted Mini Leather Crossbody",
    price: "৳3,950",
    bgClass: "bg-[#e2f0fb] dark:bg-[#152331]",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85",
    alt: "Quilted leather luxury handbag",
    href: "/browse?category=Accessories",
    buttonText: "SHOP NOW"
  },
  {
    id: "top-seller-4",
    tag: "HAUTE COSMETICS • DIOR",
    title: "Color Revival Hydrating Lip Glow",
    price: "৳4,950",
    bgClass: "bg-[#e5f5ec] dark:bg-[#162920]",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=85",
    alt: "Luxury hydrating lipstick",
    href: "/browse?category=Makeup",
    buttonText: "SHOP NOW"
  },
  {
    id: "top-seller-5",
    tag: "HAUTE PARFUM • PARIS",
    title: "Eau Tendre Peony & Rose Flacon",
    price: "৳8,900",
    bgClass: "bg-[#faf0e1] dark:bg-[#2c2215]",
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=900&q=85",
    alt: "Designer perfume mist flacon",
    href: "/browse?category=Fragrance",
    buttonText: "SHOP NOW"
  },
  {
    id: "top-seller-6",
    tag: "CLINICAL SKINCARE • DERMA",
    title: "Pure Hyaluronic Barrier Elixir",
    price: "৳1,850",
    bgClass: "bg-[#f5eef8] dark:bg-[#22162b]",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=85",
    alt: "Clinical hydrating serum cosmetic",
    href: "/browse?category=Skincare",
    buttonText: "SHOP NOW"
  },
  {
    id: "top-seller-7",
    tag: "COSMETIC CLUTCH • VAULT",
    title: "Monogram Velvet Cosmetic Pouch & Bag",
    price: "৳2,450",
    bgClass: "bg-[#fef2f2] dark:bg-[#2b1717]",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=85",
    alt: "Luxury cosmetic travel pouch bag",
    href: "/browse?category=Accessories",
    buttonText: "SHOP NOW"
  }
];

export function TopSellingProducts() {
  const [startIndex, setStartIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const maxIndex = TOP_SELLERS.length - 3;

  const handlePrev = () => {
    setStartIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const jumpToSlide = (idx) => {
    setStartIndex(Math.max(0, Math.min(idx, maxIndex)));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
  };

  return (
    <section aria-label="Top Selling Products" className="py-12 sm:py-16 overflow-hidden">
      <div className="w-[95%] sm:w-[92%] max-w-[1500px] mx-auto px-2 sm:px-4 space-y-8 sm:space-y-10">
        {/* Top Selling Products Header */}
        <div className="text-center space-y-2.5">
          <span className="glass-pill inline-block px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-[#e06d84] dark:text-rose-300 shadow-xs">
            Boutique Vault • Curated Highlights
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-[#181416] dark:text-white">
            TOP SELLING PRODUCTS
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto font-normal">
            Explore our most celebrated luxury bags, iconic cosmetics and radiant essentials
          </p>
        </div>

        {/* Carousel Container with Side Navigation Arrows */}
        <div 
          className="relative px-2 sm:px-6"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous top sellers"
            title="View previous luxury collection"
            className="absolute left-0 sm:left-1 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/90 dark:bg-[#181416]/90 backdrop-blur-md shadow-lg border border-black/5 dark:border-white/15 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-[#e06d84] dark:hover:text-rose-300 hover:border-[#e06d84]/35 hover:shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next top sellers"
            title="View next luxury collection"
            className="absolute right-0 sm:right-1 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/90 dark:bg-[#181416]/90 backdrop-blur-md shadow-lg border border-black/5 dark:border-white/15 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-[#e06d84] dark:hover:text-rose-300 hover:border-[#e06d84]/35 hover:shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer group"
          >
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* 3-Card Grid Showcase with Pastel Themes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {TOP_SELLERS.slice(startIndex, startIndex + 3).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className={`relative rounded-[28px] sm:rounded-[36px] overflow-hidden ${item.bgClass} border border-black/[0.04] dark:border-white/[0.08] min-h-[450px] sm:min-h-[490px] lg:min-h-[520px] flex flex-col justify-end shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group`}
              >
                {/* Product Photograph */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                    loading="lazy"
                  />
                  {/* Subtle Inner Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/25 pointer-events-none" />
                </div>

                {/* Floating Frosted Glass Bottom Overlay Card */}
                <div className="relative z-10 mx-3 sm:mx-4 mb-3 sm:mb-4 p-4 sm:p-5 rounded-2xl bg-white/85 dark:bg-black/70 backdrop-blur-md border border-white/75 dark:border-white/20 shadow-lg text-center space-y-2">
                  <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-bold">
                    <span className="uppercase tracking-[0.22em] text-[10px] text-slate-600 dark:text-slate-300 font-semibold">
                      {item.tag}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 dark:bg-amber-400/15 border border-amber-500/20 text-amber-600 dark:text-amber-400 font-bold">
                      <Star className="w-3 h-3 fill-current" />
                      <span>4.9</span>
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-[#181416] dark:text-white leading-snug line-clamp-1">
                    {item.title}
                  </h3>

                  <div className="pt-1 flex items-center justify-center gap-3">
                    {item.price && (
                      <span className="text-xs sm:text-sm font-bold text-[#e06d84] dark:text-rose-300">
                        {item.price}
                      </span>
                    )}
                    <Link
                      href={item.href}
                      className="inline-flex items-center justify-center px-5 sm:px-6 py-1.5 sm:py-2 rounded-lg bg-[#edd59e] hover:bg-[#e4ca8c] text-[#181416] font-bold text-[10px] sm:text-xs uppercase tracking-wider shadow-xs hover:shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <span>{item.buttonText}</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 pt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => jumpToSlide(idx)}
                aria-label={`Jump to top selling slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  startIndex === idx
                    ? 'w-7 bg-[#181416] dark:bg-white'
                    : 'w-2 bg-slate-300 dark:bg-white/30 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
