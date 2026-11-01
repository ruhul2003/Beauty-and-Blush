"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  MapPin, 
  Eye, 
  ShieldCheck, 
  MessageCircle 
} from 'lucide-react';
import { formatPrice, calculateDiscount } from '@/utils/formatters';
import { useToast } from '@/context/ToastContext';
import { useCart } from '@/context/CartContext';
import { QuickViewModal } from './QuickViewModal';

export function ProductCard({ product }) {
  const { showToast } = useToast();
  const { addToCart } = useCart();
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('bnb_wishlist') || '[]');
      return saved.some(p => (p._id || p.id) === (product._id || product.id));
    } catch (e) {
      return false;
    }
  });

  if (!product) return null;

  const primaryImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : (product.image || 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80');

  const discount = calculateDiscount(product.price, product.originalPrice);

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const nextState = !isWishlisted;
    setIsWishlisted(nextState);

    if (nextState) {
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

  const whatsappPhone = (product.sellerPhone || '+8801711224466').replace(/[^0-9]/g, '');
  const whatsappMsg = encodeURIComponent(`Hi, I'm interested in "${product.title}" priced at ${formatPrice(product.price)} on Beauty & Blush. Is this available for delivery?`);
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${whatsappMsg}`;

  return (
    <>
      <div className="glass-slab glass-slab-interactive p-3 sm:p-3.5 flex flex-col justify-between group">
        <div>
          {/* Top Image Showcase seated in a smooth Recessed Well */}
          <div className="relative aspect-square overflow-hidden rounded-[22px] glass-well mb-3">
            <Link href={`/product/${product._id || product.id}`} className="block w-full h-full">
              <img
                src={primaryImage}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 rounded-[22px]"
              />
            </Link>

            {/* Condition & Discount Badges */}
            <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
              {discount > 0 ? (
                <span className="glass-pill px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white bg-[#181416]/90 shadow-xs">
                  -{discount}%
                </span>
              ) : (
                <span className="glass-pill px-2.5 py-0.5 text-[9px] font-bold tracking-wide text-slate-800 dark:text-slate-200">
                  {product.condition || 'New'}
                </span>
              )}
            </div>

            {/* Quick View Button overlay as floating clay capsule */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setQuickViewOpen(true);
              }}
              className="absolute inset-x-4 top-1/2 -translate-y-1/2 py-2 px-3 rounded-full glass-pill text-[#181416] dark:text-white font-bold text-xs shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-1.5 hover:bg-[#b84357] hover:text-white dark:hover:bg-[#b84357] dark:hover:text-white z-20 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick View</span>
            </button>

            {/* Wishlist Button */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={toggleWishlist}
              className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all z-20 cursor-pointer ${
                isWishlisted
                  ? 'bg-[#b84357] text-white shadow-sm'
                  : 'glass-pill text-slate-600 dark:text-slate-300 hover:text-[#b84357]'
              }`}
              title="Save to wishlist"
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
            </motion.button>

            {/* Authenticity Verified Pill */}
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full pointer-events-none border border-white/10">
              <div className="flex items-center gap-1 font-semibold">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Verified</span>
              </div>
              <div className="flex items-center gap-1 text-amber-300 font-bold">
                <Star className="w-3 h-3 fill-current" />
                <span>{product.rating || 5}</span>
              </div>
            </div>
          </div>

          {/* Content Body */}
          <div className="px-1 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <Link
                href={`/browse?category=${encodeURIComponent(product.category || 'All')}`}
                className="text-[10px] font-bold uppercase tracking-wider text-[#b84357] dark:text-rose-300 hover:underline"
              >
                {product.brand || product.category}
              </Link>
              <div className="flex items-center gap-1 text-[11px] text-slate-400">
                <MapPin className="w-3 h-3 text-[#b84357]" />
                <span>{product.location || 'Dhaka'}</span>
              </div>
            </div>

            <Link href={`/product/${product._id || product.id}`} className="block">
              <h3 className="font-bold text-sm text-[#181416] dark:text-white group-hover:text-[#b84357] dark:group-hover:text-rose-300 line-clamp-1 transition-colors">
                {product.title}
              </h3>
            </Link>

            {product.shade && (
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                Shade: <span className="text-slate-800 dark:text-slate-200 font-medium">{product.shade}</span>
              </p>
            )}

            {/* Pricing */}
            <div className="pt-1 flex items-baseline gap-2">
              <span className="text-base font-bold text-[#b84357] dark:text-rose-300">
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

        {/* Card Action Footer with Tactile Pill Buttons */}
        <div className="pt-3 mt-3 flex items-center gap-2 border-t border-black/[0.04] dark:border-white/[0.06]">
          <Link
            href={`/product/${product._id || product.id}`}
            className="flex-1 py-2 text-center text-xs font-bold rounded-full glass-pill hover:bg-[#b84357] hover:text-white text-[#181416] dark:text-white hover:border-[#b84357] active:scale-98 transition-all"
          >
            View Details
          </Link>

          <motion.button
            whileTap={{ scale: 0.92 }}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
            className="w-8.5 h-8.5 rounded-full bg-[#b84357] hover:bg-[#a13649] text-white flex items-center justify-center active:scale-95 transition-all shadow-md shadow-[#b84357]/20 cursor-pointer"
            title="Add to Cart"
            aria-label={`Add ${product.title} to bag`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </motion.button>

          <motion.a
            whileTap={{ scale: 0.92 }}
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="w-8.5 h-8.5 rounded-full glass-pill text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 flex items-center justify-center active:scale-95 transition-all cursor-pointer"
            title="WhatsApp inquiry"
          >
            <MessageCircle className="w-3.5 h-3.5" />
          </motion.a>
        </div>
      </div>

      {quickViewOpen && (
        <QuickViewModal product={product} onClose={() => setQuickViewOpen(false)} />
      )}
    </>
  );
}
