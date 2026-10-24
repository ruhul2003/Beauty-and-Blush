"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Star, ShieldCheck, MapPin, Sparkles, MessageCircle } from 'lucide-react';
import { formatPrice, calculateDiscount } from '@/utils/formatters';
import { useToast } from '@/context/ToastContext';

export function ProductCard({ product }) {
  const { showToast } = useToast();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discount = calculateDiscount(product.originalPrice, product.price);
  const primaryImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80';

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    if (!isWishlisted) {
      showToast(`Added "${product.title}" to wishlist!`, 'success');
      // Save to localStorage
      try {
        const saved = JSON.parse(localStorage.getItem('bnb_wishlist') || '[]');
        if (!saved.some(p => p._id === product._id)) {
          saved.push(product);
          localStorage.setItem('bnb_wishlist', JSON.stringify(saved));
        }
      } catch (err) {}
    } else {
      showToast(`Removed from wishlist`, 'info');
      try {
        const saved = JSON.parse(localStorage.getItem('bnb_wishlist') || '[]');
        const updated = saved.filter(p => p._id !== product._id);
        localStorage.setItem('bnb_wishlist', JSON.stringify(updated));
      } catch (err) {}
    }
  };

  const openWhatsApp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const phone = product.sellerPhone || '+8801711224466';
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(`Hi, I'm interested in "${product.title}" priced at ${formatPrice(product.price)} on Beauty & Blush. Is this available for delivery?`);
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden group flex flex-col justify-between border border-rose-100 dark:border-rose-950/60 transition-all duration-300">
      <div>
        {/* Top Image Showcase */}
        <Link href={`/product/${product._id || product.id}`} className="block relative aspect-square overflow-hidden bg-rose-50/40 dark:bg-rose-950/20">
          <img
            src={primaryImage}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Condition & Discount Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
            <span className="px-2 py-0.5 text-[10px] font-bold tracking-wide rounded-md bg-white/90 dark:bg-[#120a14]/90 text-slate-800 dark:text-rose-200 backdrop-blur-md border border-rose-100 dark:border-rose-900/50 shadow-sm">
              {product.condition}
            </span>
            {discount > 0 && (
              <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-rose-500 text-white shadow-sm">
                -{discount}% OFF
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={toggleWishlist}
            className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md shadow-md transition-all ${
              isWishlisted
                ? 'bg-rose-500 text-white'
                : 'bg-white/90 dark:bg-[#120a14]/90 text-slate-600 dark:text-slate-300 hover:text-rose-500'
            }`}
            title="Save to wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>

          {/* Authenticity Verified Pill */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] text-white bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-lg">
            <div className="flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Authentic {product.batchCode ? `• ${product.batchCode.split(' ')[0]}` : ''}</span>
            </div>
            <div className="flex items-center gap-1 text-amber-300 font-bold">
              <Star className="w-3 h-3 fill-current" />
              <span>{product.rating || 4.9}</span>
            </div>
          </div>
        </Link>

        {/* Content Body */}
        <div className="p-4">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-500">
              {product.brand || product.category}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              <MapPin className="w-3 h-3" />
              <span>{product.location || 'Dhaka'}</span>
            </div>
          </div>

          <Link href={`/product/${product._id || product.id}`} className="block group-hover:text-rose-600 transition-colors">
            <h3 className="font-semibold text-sm text-slate-900 dark:text-white line-clamp-1">
              {product.title}
            </h3>
          </Link>

          {product.shade && (
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
              Shade: <span className="text-slate-700 dark:text-slate-300 font-medium">{product.shade}</span>
            </p>
          )}

          {/* Pricing */}
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-base font-bold text-slate-900 dark:text-white">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-4 pb-4 pt-1 flex items-center gap-2 border-t border-rose-50 dark:border-rose-950/40">
        <Link
          href={`/product/${product._id || product.id}`}
          className="flex-1 py-2 text-center text-xs font-semibold rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/30 dark:text-rose-300 dark:hover:bg-rose-900/40 transition-colors"
        >
          View Details
        </Link>

        <button
          onClick={openWhatsApp}
          className="p-2 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-300 transition-colors"
          title="WhatsApp seller"
        >
          <MessageCircle className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
