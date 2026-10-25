"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Crown } from 'lucide-react';

const categories = [
  {
    name: 'SKINCARE',
    slug: 'Skincare',
    image: '/images/serum.jpg',
    desc: 'Hydrating serums & creams'
  },
  {
    name: 'MAKEUP',
    slug: 'Makeup',
    image: '/images/promo-makeup.jpg',
    desc: 'Lipsticks, palettes & blushes'
  },
  {
    name: 'HAIRCARE',
    slug: 'Haircare',
    image: '/images/haircare.jpg',
    desc: 'Botanical oils & masks'
  },
  {
    name: 'ACCESSORIES',
    slug: 'Accessories',
    image: '/images/brushes.jpg',
    desc: 'Pro rose gold brush sets'
  },
  {
    name: 'FRAGRANCE',
    slug: 'Fragrance',
    image: '/images/perfume.jpg',
    desc: 'Designer Eau de Parfum'
  }
];

export function CategoryShowcase() {
  return (
    <section className="py-12 md:py-16">
      <div className="w-[90%] mx-auto px-2 sm:px-4">
        
        {/* Section Heading with Crown Motif */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="flex items-center justify-center mb-1.5">
            <Crown className="w-4 h-4 text-[#c94d64]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif tracking-[0.1em] uppercase text-[#23171e] dark:text-white font-normal">
            SHOP BY CATEGORY
          </h2>
          <div className="w-12 h-0.5 bg-[#f0cdd4] mx-auto mt-2" />
        </div>

        {/* Circular Categories: Smooth touch-swipeable on mobile, 5-col on desktop */}
        <div className="flex sm:grid sm:grid-cols-5 gap-6 sm:gap-8 overflow-x-auto pb-4 pt-1 px-2 no-scrollbar snap-x snap-mandatory justify-start sm:justify-items-center">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              href={`/browse?category=${cat.slug}`}
              className="group flex flex-col items-center text-center shrink-0 snap-item w-32 sm:w-auto"
            >
              {/* Circular Thumbnail Frame */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden p-1 border-2 border-[#fae0e4] group-hover:border-[#c94d64] bg-[#fcf2f2]/60 dark:bg-rose-950/20 transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-[#c94d64]/15">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Title & Link */}
              <div className="mt-3.5 space-y-1">
                <h3 className="text-xs sm:text-sm font-bold tracking-wider text-[#23171e] dark:text-white uppercase group-hover:text-[#c94d64] transition-colors">
                  {cat.name}
                </h3>
                <span className="inline-flex items-center gap-1 text-[11px] text-[#7d646f] dark:text-slate-400 group-hover:text-[#c94d64] transition-colors">
                  <span>Shop Now</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
