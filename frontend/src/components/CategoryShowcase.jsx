"use client";

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

const categories = [
  {
    name: 'Skincare',
    count: '340+ Verified',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    slug: 'Skincare',
    description: 'Serums, toners, snail mucin & barrier creams'
  },
  {
    name: 'Makeup',
    count: '510+ Verified',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80',
    slug: 'Makeup',
    description: 'Dewy blushes, lip oils, velvet powders'
  },
  {
    name: 'Fragrance',
    count: '180+ Verified',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
    slug: 'Fragrance',
    description: 'Designer EDPs, niche French extraits'
  },
  {
    name: 'Haircare',
    count: '120+ Verified',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80',
    slug: 'Haircare',
    description: 'Bond-repair treatments, scalp serums'
  },
  {
    name: 'Bath & Body',
    count: '95+ Verified',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    slug: 'Bath%20%26%20Body',
    description: 'Hydrating body butters, glowing mists'
  },
  {
    name: 'Tools & Brushes',
    count: '80+ Verified',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    slug: 'Tools%20%26%20Brushes',
    description: 'Artisan brush sets, beauty blenders'
  }
];

export function CategoryShowcase() {
  return (
    <section className="py-12 md:py-16 bg-white/50 dark:bg-[#120a14]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-500 uppercase tracking-widest mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Collections</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
              Shop by Beauty Category
            </h2>
          </div>
          <Link
            href="/browse"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400 group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((cat, i) => (
            <Link
              key={i}
              href={`/browse?category=${cat.slug}`}
              className="group relative rounded-2xl overflow-hidden glass-card p-3 flex flex-col text-center"
            >
              <div className="w-full aspect-square rounded-xl overflow-hidden bg-rose-50 dark:bg-rose-950/20 mb-3 relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <h3 className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                {cat.name}
              </h3>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                {cat.count}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
