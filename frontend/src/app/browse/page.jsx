"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, SlidersHorizontal, Sparkles } from 'lucide-react';
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
  const [brand, setBrand] = useState('All');
  const [condition, setCondition] = useState('All');
  const [skinType, setSkinType] = useState('All');
  const [sort, setSort] = useState('newest');
  const [maxPrice, setMaxPrice] = useState('');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const popularBrands = [
    'All',
    'Rare Beauty',
    'The Ordinary',
    'Charlotte Tilbury',
    'Dior',
    'Fenty Beauty',
    'CeraVe',
    'Laneige',
    'Huda Beauty'
  ];

  // Sync category and search when navigating via Next Link
  useEffect(() => {
    const urlCategory = searchParams.get('category') || 'All';
    const urlSearch = searchParams.get('search') || '';
    setCategory(urlCategory);
    setSearchTerm(urlSearch);
  }, [searchParams]);

  useEffect(() => {
    fetchFilteredProducts();
  }, [category, brand, condition, skinType, sort, maxPrice, onlyInStock]);

  const fetchFilteredProducts = async () => {
    setLoading(true);
    try {
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (category !== 'All') params.category = category;
      if (brand !== 'All') params.brand = brand;
      if (condition !== 'All') params.condition = condition;
      if (skinType !== 'All') params.skinType = skinType;
      if (sort) params.sort = sort;
      if (maxPrice) params.maxPrice = maxPrice;

      const res = await api.get('/products', { params });
      let list = res.data || [];
      if (onlyInStock) {
        list = list.filter(p => p.status !== 'Sold Out');
      }
      setProducts(list);
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
    setBrand('All');
    setCondition('All');
    setSkinType('All');
    setMaxPrice('');
    setOnlyInStock(false);
    setSort('newest');
    setSearchTerm('');
  };

  return (
    <div className="w-[90%] mx-auto px-2 sm:px-4 py-8">
      {/* Header & Search */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/60 dark:bg-[#140b17]/65 backdrop-blur-2xl border border-black/[0.05] dark:border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <span className="text-[11px] font-bold tracking-widest text-[#b84357] dark:text-rose-300 uppercase inline-block mb-1">
            Curated Beauty Vault
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
            Catalog & Collections
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
              className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.04] backdrop-blur-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#b84357] shadow-xs"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <button 
            type="submit" 
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl bg-[#b84357] hover:bg-[#a13649] text-white shadow-md shadow-[#b84357]/20 transition-all cursor-pointer"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden p-2.5 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.04] backdrop-blur-md text-slate-700 dark:text-slate-200 cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden md:block space-y-6">
          <div className="bg-white/60 dark:bg-[#140c17]/65 backdrop-blur-2xl p-5 rounded-3xl border border-black/[0.05] dark:border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.03)] space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.05] dark:border-white/[0.08]">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5 font-serif">
                <Filter className="w-3.5 h-3.5 text-[#b84357]" />
                <span>Filters</span>
              </span>
              <button
                type="button"
                onClick={resetFilters}
                className="text-[11px] font-medium text-slate-500 hover:text-[#b84357] dark:hover:text-rose-400 transition-colors cursor-pointer"
              >
                Reset All
              </button>
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-2 font-serif">Category</label>
              <div className="space-y-1 text-xs">
                {['All', 'Skincare', 'Makeup', 'Haircare', 'Fragrance', 'Bath & Body', 'Tools & Brushes'].map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setCategory(cat);
                      setMobileFilterOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                      category === cat
                        ? 'bg-[#b84357] text-white font-semibold shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-black/[0.03] dark:hover:bg-white/[0.05]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-2 font-serif">Brand</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.04] backdrop-blur-md text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#b84357]"
              >
                {popularBrands.map(b => (
                  <option key={b} value={b} className="bg-white dark:bg-[#140c17] text-slate-900 dark:text-white">{b === 'All' ? 'All Brands' : b}</option>
                ))}
              </select>
            </div>

            {/* Condition Filter */}
            <div>
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-2 font-serif">Condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.04] backdrop-blur-md text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#b84357]"
              >
                <option value="All" className="bg-white dark:bg-[#140c17] text-slate-900 dark:text-white">All Conditions</option>
                <option value="Brand New & Boxed" className="bg-white dark:bg-[#140c17] text-slate-900 dark:text-white">Brand New & Boxed</option>
                <option value="Sealed" className="bg-white dark:bg-[#140c17] text-slate-900 dark:text-white">Sealed</option>
                <option value="Swatched Once" className="bg-white dark:bg-[#140c17] text-slate-900 dark:text-white">Swatched Once</option>
                <option value="Authentic Pre-loved" className="bg-white dark:bg-[#140c17] text-slate-900 dark:text-white">Authentic Pre-loved</option>
              </select>
            </div>

            {/* Skin Type Filter */}
            <div>
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-2 font-serif">Skin Type</label>
              <select
                value={skinType}
                onChange={(e) => setSkinType(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.04] backdrop-blur-md text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#b84357]"
              >
                <option value="All" className="bg-white dark:bg-[#140c17] text-slate-900 dark:text-white">All Skin Types</option>
                <option value="Oily" className="bg-white dark:bg-[#140c17] text-slate-900 dark:text-white">Oily / Combination</option>
                <option value="Dry" className="bg-white dark:bg-[#140c17] text-slate-900 dark:text-white">Dry / Sensitive</option>
                <option value="Normal" className="bg-white dark:bg-[#140c17] text-slate-900 dark:text-white">Normal</option>
              </select>
            </div>

            {/* In-Stock Toggle */}
            <div className="pt-3 border-t border-black/[0.05] dark:border-white/[0.08]">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-200">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded text-[#b84357] focus:ring-[#b84357] accent-[#b84357]"
                />
                <span>In-Stock Only</span>
              </label>
            </div>

            {/* Max Price Filter */}
            <div>
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-2 font-serif">
                Max Budget: <span className="text-[#b84357] dark:text-rose-300">{maxPrice ? `৳${maxPrice}` : 'Any'}</span>
              </label>
              <input
                type="range"
                min="1000"
                max="25000"
                step="500"
                value={maxPrice || 25000}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full accent-[#b84357] cursor-pointer"
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
          <div className="flex items-center justify-between text-xs p-3.5 rounded-2xl bg-white/50 dark:bg-white/[0.03] backdrop-blur-xl border border-black/[0.05] dark:border-white/[0.08] shadow-xs">
            <span className="text-slate-600 dark:text-slate-300 font-medium">
              <strong className="text-slate-900 dark:text-white">{products.length}</strong> products found
            </span>
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">Sort by:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-xs p-1.5 px-3 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-[#140c17] backdrop-blur-md text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#b84357]"
              >
                <option value="newest" className="bg-white dark:bg-[#140c17]">Newest First</option>
                <option value="price_asc" className="bg-white dark:bg-[#140c17]">Price: Low to High</option>
                <option value="price_desc" className="bg-white dark:bg-[#140c17]">Price: High to Low</option>
                <option value="rating" className="bg-white dark:bg-[#140c17]">Highest Rated</option>
                <option value="popular" className="bg-white dark:bg-[#140c17]">Most Popular</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(n => (
                <div key={n} className="animate-pulse rounded-3xl h-80 p-4 bg-white/40 dark:bg-white/[0.03] backdrop-blur-xl border border-black/[0.05] dark:border-white/[0.08]" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 bg-white/60 dark:bg-[#140c17]/65 backdrop-blur-2xl rounded-3xl border border-black/[0.05] dark:border-white/[0.08] shadow-xs">
              <Sparkles className="w-8 h-8 text-[#b84357] mx-auto mb-3" />
              <h3 className="text-base font-serif font-bold text-slate-800 dark:text-slate-200">No matching cosmetics found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">Try resetting your filters or adjusting your search keywords to browse our collection.</p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 px-6 py-2.5 rounded-xl bg-[#b84357] hover:bg-[#a13649] text-white text-xs font-bold uppercase tracking-wider inline-block shadow-md shadow-[#b84357]/20 transition-all cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
