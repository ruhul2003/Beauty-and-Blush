"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, SlidersHorizontal } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';

export function ProductShowcase({ products = [], loading = false }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Skincare', 'Makeup', 'Fragrance', 'Accessories'];

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => (p.category || '').toLowerCase() === activeCategory.toLowerCase());

  const displayedProducts = filteredProducts.slice(0, 8);

  return (
    <section className="w-[95%] sm:w-[92%] max-w-[1500px] mx-auto my-8 sm:my-14 py-2">
      <div className="glass-slab p-6 sm:p-10 md:p-12 rounded-[36px] sm:rounded-[44px] space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-black/[0.04] dark:border-white/[0.06]">
          <div className="space-y-2 max-w-xl">
            <span className="glass-pill px-3.5 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#b84357] dark:text-rose-300 shadow-xs inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Vault</span>
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#181416] dark:text-white leading-tight">
              Featured Cosmetics & Fragrances
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Explore authentic luxury formulations, dermatologist-vetted serums, and artisanal scents verified with physical batch codes.
            </p>
          </div>

          <Link
            href="/browse"
            className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full glass-pill hover:bg-[#b84357] text-[#181416] dark:text-white hover:text-white font-bold text-xs uppercase tracking-wider transition-all self-start md:self-auto shadow-xs"
          >
            <span>Explore All Products</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#b84357] text-white shadow-md shadow-[#b84357]/25'
                    : 'glass-pill text-slate-700 dark:text-slate-300 hover:text-[#b84357] dark:hover:text-rose-300'
                }`}
              >
                {cat === 'All' ? 'All Highlights' : cat}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}
