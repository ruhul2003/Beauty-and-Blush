"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Star, ShieldCheck, MapPin, MessageCircle, Eye } from 'lucide-react';
import { formatPrice, calculateDiscount } from '@/utils/formatters';
import { useToast } from '@/context/ToastContext';
import { QuickViewModal } from './QuickViewModal';

export function ProductCard({ product }) {
  const { showToast } = useToast();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const discount = calculateDiscount(product.originalPrice, product.price);
  const primaryImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : '/images/serum.jpg';

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    if (!isWishlisted) {
      showToast?.(`Added "${product.title}" to wishlist!`, 'success');
      try {
        const saved = JSON.parse(localStorage.getItem('bnb_wishlist') || '[]');
        if (!saved.some(p => (p._id || p.id) === (product._id || product.id))) {
          saved.push(product);
          localStorage.setItem('bnb_wishlist', JSON.stringify(saved));
        }
      } catch (err) {}
    } else {
      showToast?.(`Removed from wishlist`, 'info');
      try {
        const saved = JSON.parse(localStorage.getItem('bnb_wishlist') || '[]');
        const updated = saved.filter(p => (p._id || p.id) !== (product._id || product.id));
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
    <>
      <div className="bg-white dark:bg-[#180f1b] rounded-2xl overflow-hidden group flex flex-col justify-between border border-[#fae0e4] dark:border-rose-950/60 hover:border-[#c94d64] transition-all duration-300 hover:shadow-xl hover:shadow-[#c94d64]/10">
        <div>
          {/* Top Image Showcase */}
          <div className="relative aspect-square overflow-hidden bg-[#fdf5f4] dark:bg-rose-950/20">
            <Link href={`/product/${product._id || product.id}`} className="block w-full h-full">
              <img
                src={primaryImage}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </Link>

            {/* Condition & Discount Badges */}
            <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
              {discount > 0 ? (
                <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded bg-[#c94d64] text-white shadow-sm">
                  SALE -{discount}%
                </span>
              ) : (
                <span className="px-2 py-0.5 text-[10px] font-bold tracking-wide rounded bg-white/90 dark:bg-[#120a14]/90 text-slate-800 dark:text-rose-200 backdrop-blur-md border border-[#fae0e4] shadow-sm">
                  {product.condition || 'New & Sealed'}
                </span>
              )}
            </div>

            {/* Quick View Button overlay */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setQuickViewOpen(true);
              }}
              className="absolute inset-x-4 top-1/2 -translate-y-1/2 py-2 px-3 rounded-xl bg-white/95 dark:bg-[#180e1a]/95 text-[#c94d64] dark:text-[#f4728d] font-bold text-xs shadow-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-1.5 hover:bg-[#c94d64] hover:text-white dark:hover:bg-[#c94d64] dark:hover:text-white z-20 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick View</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={toggleWishlist}
              className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md shadow-md active:scale-90 transition-all z-20 ${
                isWishlisted
                  ? 'bg-[#c94d64] text-white'
                  : 'bg-white/90 dark:bg-[#120a14]/90 text-slate-600 dark:text-slate-300 hover:text-[#c94d64]'
              }`}
              title="Save to wishlist"
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>

            {/* Authenticity Verified Pill */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg pointer-events-none">
              <div className="flex items-center gap-1 font-semibold">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Authentic {product.batchCode ? `• ${product.batchCode.split(' ')[0]}` : ''}</span>
              </div>
              <div className="flex items-center gap-1 text-amber-300 font-bold">
                <Star className="w-3 h-3 fill-current" />
                <span>{product.rating || 5}</span>
              </div>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-4">
            <div className="flex items-center justify-between text-xs mb-1">
              <Link
                href={`/browse?category=${encodeURIComponent(product.category || 'All')}`}
                className="text-[10px] font-bold uppercase tracking-wider text-[#c94d64] hover:underline"
              >
                {product.brand || product.category}
              </Link>
              <div className="flex items-center gap-1 text-[11px] text-[#7d646f]">
                <MapPin className="w-3 h-3 text-[#c94d64]" />
                <span>{product.location || 'Dhaka'}</span>
              </div>
            </div>

            <Link href={`/product/${product._id || product.id}`} className="block group-hover:text-[#c94d64] transition-colors">
              <h3 className="font-semibold text-sm text-[#23171e] dark:text-white line-clamp-1">
                {product.title}
              </h3>
            </Link>

            {product.shade && (
              <p className="text-[11px] text-[#7d646f] dark:text-slate-400 mt-0.5 line-clamp-1">
                Shade: <span className="text-slate-800 dark:text-slate-200 font-medium">{product.shade}</span>
              </p>
            )}

            {/* Pricing */}
            <div className="mt-2.5 flex items-baseline gap-2">
              <span className="text-base font-bold text-[#23171e] dark:text-white">
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
        <div className="px-4 pb-4 pt-1 flex items-center gap-2 border-t border-[#fae0e4]/60 dark:border-rose-950/40">
          <Link
            href={`/product/${product._id || product.id}`}
            className="flex-1 py-2 text-center text-xs font-bold rounded-lg bg-[#fcf2f2] hover:bg-[#c94d64] text-[#c94d64] hover:text-white active:scale-95 transition-all"
          >
            View Details
          </Link>

          <button
            onClick={openWhatsApp}
            className="p-2 rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-300 active:scale-95 transition-all"
            title="WhatsApp inquiry"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {quickViewOpen && (
        <QuickViewModal product={product} onClose={() => setQuickViewOpen(false)} />
      )}
    </>
  );
}

