"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Trash2, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { formatPrice } from '@/utils/formatters';
import { ProductCard } from '@/components/ProductCard';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('bnb_wishlist') || '[]');
      setWishlist(saved);
    } catch (err) {}
  }, []);

  const clearWishlist = () => {
    localStorage.removeItem('bnb_wishlist');
    setWishlist([]);
  };

  const totalValuation = wishlist.reduce((sum, item) => sum + (Number(item.price) || 0), 0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-[90%] mx-auto px-2 sm:px-4 py-10 space-y-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-500 uppercase tracking-widest mb-1">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Saved Beauty Items</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
            My Beauty Wishlist
          </h1>
          <p className="text-xs text-slate-500">
            {wishlist.length} item{wishlist.length === 1 ? '' : 's'} saved • Total Valuation: <strong className="text-rose-600 font-bold">{formatPrice(totalValuation)}</strong>
          </p>
        </div>

        {wishlist.length > 0 && (
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={clearWishlist}
            className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 hover:underline self-start cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Wishlist</span>
          </motion.button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 bg-white/40 dark:bg-rose-950/10 rounded-3xl border border-rose-100 dark:border-rose-900/30 space-y-3"
        >
          <Heart className="w-10 h-10 text-rose-300 mx-auto" />
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-200">Your wishlist is empty</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Explore authentic blushes, clinical serums and luxury perfumes to save your favorites.
          </p>
          <div className="pt-2">
            <Link href="/browse" className="btn-rose-primary px-5 py-2 text-xs font-semibold inline-flex items-center gap-2">
              <span>Browse Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map(product => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      )}
    </motion.div>
  );
}