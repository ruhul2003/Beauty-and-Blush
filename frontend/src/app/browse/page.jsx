"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, SlidersHorizontal, Sparkles, X } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { api } from '@/lib/api';

function BrowseContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [condition, setCondition] = useState('All');
  const [skinType, setSkinType] = useState('All');
  const [sort, setSort] = useState('newest');
  const [maxPrice, setMaxPrice] = useState('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    fetchFilteredProducts();
  }, [category, condition, skinType, sort, maxPrice]);

  const fetchFilteredProducts = async () => {
    setLoading(true);
    try {
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (category !== 'All') params.category = category;
      if (condition !== 'All') params.condition = condition;
      if (skinType !== 'All') params.skinType = skinType;
      if (sort) params.sort = sort;
      if (maxPrice) params.maxPrice = maxPrice;

      const res = await api.get('/products', { params });
      setProducts(res.data || []);
    } catch (err) {
      console.error('Failed to filter products', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchFilteredProducts();
  };

  const resetFilters = () => {
    setCategory('All');
    setCondition('All');
    setSkinType('All');
    setMaxPrice('');
    setSort('newest');
    setSearchTerm('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 dark:text-white">
            Cosmetics & Fragrance Catalog
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Showing {products.length} authenticated beauty listings with batch code guarantee
          </p>
        </div>

        {/* Search input in page */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2 max-w-md w-full">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by brand, shade, product..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#1a0f1c]"
            />
            <Search className="w-4 h-4 text-rose-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <button type="submit" className="btn-rose-primary px-4 py-2 text-xs font-semibold">
            Search
          </button>
          <button
            type="button"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden p-2 rounded-xl border border-rose-200 dark:border-rose-900/50 text-slate-700 dark:text-slate-200"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden md:block space-y-6">
          <div className="glass-panel p-5 rounded-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-rose-100 dark:border-rose-950/40">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-rose-500" />
                <span>Filters</span>
              </span>
              <button
                onClick={resetFilters}
                className="text-[11px] text-rose-600 dark:text-rose-400 hover:underline"
              >
                Reset All
              </button>
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-2">Category</label>
              <div className="space-y-1.5 text-xs">
                {['All', 'Skincare', 'Makeup', 'Haircare', 'Fragrance', 'Bath & Body', 'Tools & Brushes'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors ${
                      category === cat
                        ? 'bg-rose-500 text-white font-semibold'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-950/30'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Condition Filter */}
            <div>
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-2">Condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full text-xs p-2 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#1a0f1c]"
              >
                <option value="All">All Conditions</option>
                <option value="Brand New & Boxed">Brand New & Boxed</option>
                <option value="Sealed">Sealed</option>
                <option value="Swatched Once">Swatched Once</option>
                <option value="Authentic Pre-loved">Authentic Pre-loved</option>
              </select>
            </div>

            {/* Skin Type Filter */}
            <div>
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-2">Skin Type</label>
              <select
                value={skinType}
                onChange={(e) => setSkinType(e.target.value)}
                className="w-full text-xs p-2 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#1a0f1c]"
              >
                <option value="All">All Skin Types</option>
                <option value="Oily">Oily / Combination</option>
                <option value="Dry">Dry / Sensitive</option>
                <option value="Normal">Normal</option>
              </select>
            </div>

            {/* Max Price Filter */}
            <div>
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-2">
                Max Budget: {maxPrice ? `৳${maxPrice}` : 'Any'}
              </label>
              <input
                type="range"
                min="1000"
                max="25000"
                step="500"
                value={maxPrice || 25000}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full accent-rose-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>৳1,000</span>
                <span>৳25,000+</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="md:col-span-3 space-y-6">
          {/* Top Sort Bar */}
          <div className="flex items-center justify-between text-xs pb-3 border-b border-rose-100 dark:border-rose-950/40">
            <span className="text-slate-500">
              {products.length} products found
            </span>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Sort by:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-xs p-1.5 rounded-lg border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#1a0f1c]"
              >
                <option value="newest">Newest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(n => (
                <div key={n} className="animate-pulse glass-card rounded-2xl h-80 p-4 bg-rose-50/20" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 bg-white/40 dark:bg-rose-950/10 rounded-3xl border border-rose-100 dark:border-rose-900/30">
              <Sparkles className="w-8 h-8 text-rose-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No matching cosmetics found</h3>
              <p className="text-xs text-slate-500 mt-1">Try resetting your filters or adjusting your search keywords.</p>
              <button onClick={resetFilters} className="mt-4 btn-rose-primary px-4 py-2 text-xs">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading beauty catalog...</div>}>
      <BrowseContent />
    </Suspense>
  );
}
