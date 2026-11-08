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
    <section className="w-[95%] sm:w-[92%] max-w-[1500px] mx-auto my-8 sm:my-14 py-2 relative">
      {/* Ambient Glow for Dark Mode */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#b84357]/5 dark:bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="glass-slab p-6 sm:p-10 md:p-12 rounded-[36px] sm:rounded-[44px] space-y-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-black/[0.04] dark:border-white/[0.06]">
          <div className="space-y-2 max-w-xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="glass-pill px-3.5 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#b84357] dark:text-rose-300 shadow-xs inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Curated Vault</span>
              </span>
              <span className="glass-pill px-3 py-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                100% Genuine Verified
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#181416] dark:text-white leading-tight">
              Featured Cosmetics & Fragrances
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Explore authentic luxury formulations, dermatologist-vetted serums, and artisanal scents verified with physical batch codes.
            </p>
          </div>

          <Link
            href="/browse"
            className="group inline-flex items-center gap-2 px-5 py-2 rounded-full glass-pill hover:bg-[#e06d84] text-[#181416] dark:text-white hover:text-white font-bold text-xs uppercase tracking-wider transition-all self-start md:self-auto shadow-xs"
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
                className={`px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#e06d84] text-white shadow-md shadow-[#e06d84]/25 scale-[1.02]'
                    : 'glass-pill text-slate-700 dark:text-slate-300 hover:text-[#e06d84] dark:hover:text-rose-300 hover:border-[#e06d84]/30 hover:shadow-xs'
                }`}
              >
                {cat === 'All' ? 'All Highlights' : cat}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid with Responsive Layout */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className="glass-slab h-72 sm:h-80 rounded-[28px] animate-pulse flex flex-col justify-between p-4"
              >
                <div className="w-full h-40 sm:h-48 rounded-2xl glass-well" />
                <div className="space-y-2 mt-3">
                  <div className="h-3 w-1/3 rounded-full bg-slate-200 dark:bg-white/10" />
                  <div className="h-4 w-3/4 rounded-full bg-slate-200 dark:bg-white/10" />
                  <div className="h-4 w-1/2 rounded-full bg-rose-200/50 dark:bg-rose-500/20" />
                </div>
              </div>
            ))}
          </div>
        ) : displayedProducts.length === 0 ? (
          <div className="text-center py-12 sm:py-16 glass-well rounded-[32px] space-y-3">
            <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
              No products found in this category
            </p>
            <p className="text-[11px] text-slate-500">
              Try switching back to all highlights or exploring the full catalogue.
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory('All')}
              className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#e06d84] hover:bg-[#d45d74] text-white cursor-pointer shadow-sm mt-2 transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6"
            >
              {displayedProducts.map((product) => (
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Bottom Centered Explore Catalog Button */}
        <div className="pt-4 flex flex-col items-center justify-center text-center space-y-2">
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#e06d84] hover:bg-[#d45d74] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-[#e06d84]/25 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer"
          >
            <span>View All Curated Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <span className="text-[11px] text-slate-500">
            Over 50+ luxury items available with 100% genuine batch code inspection
          </span>
        </div>

      </div>
    </section>
  );
}
