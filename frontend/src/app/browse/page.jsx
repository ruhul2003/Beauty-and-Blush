"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  Search, 
  SlidersHorizontal, 
  ArrowUpDown, 
  X, 
  Sparkles,
  ShoppingBag,
  Heart,
  ShieldCheck
} from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { api } from '@/lib/api';

function BrowsePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [brand, setBrand] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [condition, setCondition] = useState('All');
  const [skinType, setSkinType] = useState('All');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [maxPrice, setMaxPrice] = useState('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setCategory(cat);
    const q = searchParams.get('search');
    if (q) setSearchTerm(q);
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [category, brand, sortBy, condition, skinType, onlyInStock, maxPrice]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {};
      if (category && category !== 'All') params.category = category;
      if (brand && brand !== 'All') params.brand = brand;
      if (condition && condition !== 'All') params.condition = condition;
      if (skinType && skinType !== 'All') params.skinType = skinType;
      if (onlyInStock) params.onlyInStock = true;
      if (maxPrice) params.maxPrice = maxPrice;
      if (searchTerm) params.search = searchTerm;
      if (sortBy) params.sort = sortBy;

      const res = await api.get('/products', { params });
      setProducts(res.data || []);
    } catch (err) {
      console.warn('Failed to load products from API, checking local fallback', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const popularBrands = [
    'All',
    'Rare Beauty',
    'The Ordinary',
    'Dior',
    'Chanel',
    'COSRX',
    'Fenty Beauty',
    'Charlotte Tilbury',
    'Laneige',
    'CeraVe',
    'Olaplex'
  ];

  const resetFilters = () => {
    setCategory('All');
    setBrand('All');
    setCondition('All');
    setSkinType('All');
    setOnlyInStock(false);
    setMaxPrice('');
    setSearchTerm('');
  };

  return (
    <div className="w-[95%] sm:w-[92%] max-w-[1500px] mx-auto px-2 sm:px-4 py-8">
      {/* Header & Search Hero Slab */}
      <div className="glass-slab p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <span className="glass-pill inline-block px-3 py-1 text-[10px] font-bold tracking-widest text-[#b84357] dark:text-rose-300 uppercase mb-2">
            Curated Beauty Vault
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#181416] dark:text-white">
            Catalog & Collections
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Showing {products.length} authenticated beauty listings with batch code guarantee
          </p>
        </div>

        {/* Search input in page */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2 max-w-md w-full">
          <div className="relative flex-1">
            <div className="glass-well rounded-full flex items-center px-4 py-2.5">
              <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by brand, shade, product..."
                className="w-full bg-transparent text-xs text-[#181416] dark:text-white placeholder:text-slate-400 focus:outline-none"
              />
            </div>
          </div>
          <button 
            type="submit" 
            className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full bg-[#181416] hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-[#181416] shadow-md transition-all cursor-pointer"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden glass-pill w-10 h-10 flex items-center justify-center text-slate-700 dark:text-slate-200 cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden md:block space-y-6">
          <div className="glass-slab p-5 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.04] dark:border-white/[0.06]">
              <span className="font-bold text-xs uppercase tracking-wider text-[#181416] dark:text-white flex items-center gap-1.5 font-serif">
                <Filter className="w-3.5 h-3.5 text-[#b84357]" />
                <span>Filters</span>
              </span>
              <button
                type="button"
                onClick={resetFilters}
                className="text-[11px] font-bold text-slate-500 hover:text-[#b84357] dark:hover:text-rose-400 transition-colors cursor-pointer"
              >
                Reset All
              </button>
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-xs font-bold text-[#181416] dark:text-slate-200 block mb-2 font-serif">Category</label>
              <div className="space-y-1 text-xs">
                {['All', 'Skincare', 'Makeup', 'Haircare', 'Fragrance', 'Bath & Body', 'Tools & Brushes'].map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setCategory(cat);
                      setMobileFilterOpen(false);
                    }}
                    className={`block w-full text-left px-3.5 py-2 rounded-full transition-all cursor-pointer ${
                      category === cat
                        ? 'bg-[#b84357] text-white font-bold shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-white/[0.06]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <label className="text-xs font-bold text-[#181416] dark:text-slate-200 block mb-2 font-serif">Brand</label>
              <div className="glass-well rounded-2xl p-1">
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full text-xs p-2 bg-transparent text-[#181416] dark:text-white focus:outline-none"
                >
                  {popularBrands.map(b => (
                    <option key={b} value={b} className="bg-white dark:bg-[#140c17] text-[#181416] dark:text-white">{b === 'All' ? 'All Brands' : b}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Condition Filter */}
            <div>
              <label className="text-xs font-bold text-[#181416] dark:text-slate-200 block mb-2 font-serif">Condition</label>
              <div className="glass-well rounded-2xl p-1">
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full text-xs p-2 bg-transparent text-[#181416] dark:text-white focus:outline-none"
                >
                  <option value="All" className="bg-white dark:bg-[#140c17] text-[#181416] dark:text-white">All Conditions</option>
                  <option value="Brand New & Boxed" className="bg-white dark:bg-[#140c17] text-[#181416] dark:text-white">Brand New & Boxed</option>
                  <option value="Sealed" className="bg-white dark:bg-[#140c17] text-[#181416] dark:text-white">Sealed</option>
                  <option value="Swatched Once" className="bg-white dark:bg-[#140c17] text-[#181416] dark:text-white">Swatched Once</option>
                  <option value="Authentic Pre-loved" className="bg-white dark:bg-[#140c17] text-[#181416] dark:text-white">Authentic Pre-loved</option>
                </select>
              </div>
            </div>

            {/* Skin Type Filter */}
            <div>
              <label className="text-xs font-bold text-[#181416] dark:text-slate-200 block mb-2 font-serif">Skin Type</label>
              <div className="glass-well rounded-2xl p-1">
                <select
                  value={skinType}
                  onChange={(e) => setSkinType(e.target.value)}
                  className="w-full text-xs p-2 bg-transparent text-[#181416] dark:text-white focus:outline-none"
                >
                  <option value="All" className="bg-white dark:bg-[#140c17] text-[#181416] dark:text-white">All Skin Types</option>
                  <option value="Oily" className="bg-white dark:bg-[#140c17] text-[#181416] dark:text-white">Oily / Combination</option>
                  <option value="Dry" className="bg-white dark:bg-[#140c17] text-[#181416] dark:text-white">Dry / Sensitive</option>
                  <option value="Normal" className="bg-white dark:bg-[#140c17] text-[#181416] dark:text-white">Normal</option>
                </select>
              </div>
            </div>

            {/* In-Stock Toggle */}
            <div className="pt-3 border-t border-black/[0.04] dark:border-white/[0.06]">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-[#181416] dark:text-slate-200">
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
              <label className="text-xs font-bold text-[#181416] dark:text-slate-200 block mb-2 font-serif">
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
          <div className="glass-slab px-5 py-3 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">
              Showing <strong className="text-[#181416] dark:text-white font-bold">{products.length}</strong> items
            </span>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-bold hidden sm:inline">Sort:</span>
              <div className="glass-well rounded-full px-3 py-1">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs text-[#181416] dark:text-white focus:outline-none cursor-pointer"
                >
                  <option value="newest" className="bg-white dark:bg-[#140c17] text-[#181416] dark:text-white">Newest First</option>
                  <option value="price_low" className="bg-white dark:bg-[#140c17] text-[#181416] dark:text-white">Price: Low to High</option>
                  <option value="price_high" className="bg-white dark:bg-[#140c17] text-[#181416] dark:text-white">Price: High to Low</option>
                  <option value="rating" className="bg-white dark:bg-[#140c17] text-[#181416] dark:text-white">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Items Grid */}
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glass-slab h-80 animate-pulse" />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="glass-slab p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full glass-well mx-auto flex items-center justify-center text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#181416] dark:text-white">
                No matching cosmetics found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try loosening your filters or searching for another beauty category.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 text-xs font-bold rounded-full bg-[#b84357] text-white hover:bg-[#a13649] transition-all"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense fallback={
      <div className="w-[90%] mx-auto py-24 text-center text-xs text-slate-400 font-medium">
        Loading luxury beauty catalog...
      </div>
    }>
      <BrowsePageContent />
    </Suspense>
  );
}
