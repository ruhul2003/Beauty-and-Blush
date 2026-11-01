"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Trash2, ArrowRight } from 'lucide-react';
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
      className="w-[95%] sm:w-[92%] max-w-[1500px] mx-auto px-2 sm:px-4 py-10 space-y-8"
    >
      <div className="glass-slab p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="glass-pill inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-bold text-[#b84357] uppercase tracking-widest mb-2 shadow-xs">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Saved Beauty Vault</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#181416] dark:text-white">
            My Beauty Wishlist
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {wishlist.length} item{wishlist.length === 1 ? '' : 's'} saved • Total Valuation: <strong className="text-[#b84357] font-bold">{formatPrice(totalValuation)}</strong>
          </p>
        </div>

        {wishlist.length > 0 && (
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={clearWishlist}
            className="glass-pill px-5 py-2.5 text-[#b84357] dark:text-rose-300 text-xs font-bold flex items-center gap-1.5 self-start sm:self-center cursor-pointer shadow-xs"
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
          className="text-center py-20 glass-slab space-y-3"
        >
          <div className="w-16 h-16 rounded-3xl glass-well text-[#b84357] dark:text-rose-300 mx-auto flex items-center justify-center mb-2">
            <Heart className="w-8 h-8 text-[#b84357]" />
          </div>
          <h2 className="text-base font-serif font-bold text-[#181416] dark:text-slate-200">Your wishlist is empty</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Explore authentic blushes, clinical serums and luxury perfumes to save your favorites.
          </p>
          <div className="pt-3">
            <Link 
              href="/browse" 
              className="bg-[#b84357] hover:bg-[#a13649] text-white px-8 py-3 rounded-full text-xs uppercase tracking-wider font-bold inline-flex items-center gap-2 shadow-lg shadow-[#b84357]/20"
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
