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
      <div className="p-6 sm:p-8 rounded-3xl bg-white/60 dark:bg-[#140b17]/65 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.04)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c94d64] uppercase tracking-widest mb-1">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Saved Beauty Vault</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
            My Beauty Wishlist
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {wishlist.length} item{wishlist.length === 1 ? '' : 's'} saved • Total Valuation: <strong className="text-[#c94d64] font-bold">{formatPrice(totalValuation)}</strong>
          </p>
        </div>

        {wishlist.length > 0 && (
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={clearWishlist}
            className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-[#c94d64] dark:text-rose-400 border border-rose-300/30 backdrop-blur-md text-xs font-bold flex items-center gap-1.5 transition-all self-start sm:self-center cursor-pointer shadow-xs"
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
          className="text-center py-20 bg-white/60 dark:bg-[#140b17]/65 backdrop-blur-2xl rounded-3xl border border-white/60 dark:border-white/10 shadow-sm space-y-3"
        >
          <div className="w-16 h-16 rounded-3xl bg-rose-500/10 dark:bg-rose-500/20 text-[#c94d64] mx-auto flex items-center justify-center border border-rose-300/30 backdrop-blur-md mb-2">
            <Heart className="w-8 h-8 text-[#c94d64]" />
          </div>
          <h2 className="text-base font-serif font-bold text-slate-800 dark:text-slate-200">Your wishlist is empty</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Explore authentic blushes, clinical serums and luxury perfumes to save your favorites.
          </p>
          <div className="pt-3">
            <Link 
              href="/browse" 
              className="btn-rose-primary px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold inline-flex items-center gap-2 shadow-md shadow-[#c94d64]/20"
            >
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
