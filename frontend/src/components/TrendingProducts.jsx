"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Flame, ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';

export function TrendingProducts({ products = [] }) {
  const [activeTab, setActiveTab] = useState('all');

  const filterTabs = [
    { id: 'all', label: 'All Featured' },
    { id: 'Skincare', label: 'Skincare' },
    { id: 'Makeup', label: 'Makeup' },
    { id: 'Fragrance', label: 'Fragrance' },
    { id: 'under3000', label: 'Under ৳3,000' }
  ];

  const filteredProducts = products.filter(p => {
    if (activeTab === 'all') return true;
    if (activeTab === 'under3000') return p.price <= 3000;
    return p.category === activeTab;
  });

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-500 uppercase tracking-widest mb-1">
              <Flame className="w-4 h-4 text-rose-500" />
              <span>Most Desired Right Now</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
              Trending Beauty & Swatches
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            {filterTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25'
                    : 'bg-rose-50 text-slate-700 hover:bg-rose-100 dark:bg-rose-950/30 dark:text-slate-300 dark:hover:bg-rose-900/40 border border-rose-200/80 dark:border-rose-900/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white/40 dark:bg-rose-950/10 rounded-3xl border border-rose-100 dark:border-rose-900/30">
            <p className="text-sm text-slate-500">No listings found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.slice(0, 8).map(prod => (
              <ProductCard key={prod._id || prod.id} product={prod} />
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 btn-rose-outline px-6 py-2.5 text-xs font-semibold"
          >
            <span>Explore All {products.length}+ Verified Listings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
