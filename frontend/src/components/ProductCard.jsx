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
      <motion.div 
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="bg-white/55 dark:bg-[#140c16]/65 backdrop-blur-2xl backdrop-saturate-180 rounded-2xl overflow-hidden group flex flex-col justify-between border border-white/70 dark:border-white/10 hover:border-[#b84357]/50 dark:hover:border-rose-400/40 transition-all duration-300 shadow-[0_8px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_14px_35px_rgba(184,67,87,0.12)]"
      >
        <div>
          {/* Top Image Showcase */}
          <div className="relative aspect-square overflow-hidden bg-white/40 dark:bg-white/5 backdrop-blur-md">
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
                <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-md bg-[#191416]/90 text-white backdrop-blur-md shadow-xs">
                  -{discount}%
                </span>
              ) : (
                <span className="px-2 py-0.5 text-[9px] font-semibold tracking-wide rounded-md bg-white/85 dark:bg-black/60 text-slate-800 dark:text-slate-200 backdrop-blur-md border border-white/60 dark:border-white/10">
                  {product.condition || 'New'}
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
              className="absolute inset-x-4 top-1/2 -translate-y-1/2 py-2 px-3 rounded-xl bg-white/90 dark:bg-[#141114]/90 text-[#191416] dark:text-white font-semibold text-xs shadow-md backdrop-blur-xl border border-white/80 dark:border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-1.5 hover:bg-[#b84357] hover:text-white dark:hover:bg-[#b84357] dark:hover:text-white z-20 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick View</span>
            </button>

            {/* Wishlist Button */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={toggleWishlist}
              className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-xl border border-white/70 dark:border-white/10 transition-all z-20 cursor-pointer ${
                isWishlisted
                  ? 'bg-[#b84357] text-white shadow-xs'
                  : 'bg-white/80 dark:bg-[#141114]/80 text-slate-600 dark:text-slate-300 hover:text-[#b84357]'
              }`}
              title="Save to wishlist"
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
            </motion.button>

            {/* Authenticity Verified Pill */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] text-white bg-black/55 backdrop-blur-md px-2.5 py-1 rounded-lg pointer-events-none border border-white/10">
              <div className="flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Verified</span>
              </div>
              <div className="flex items-center gap-1 text-amber-300 font-medium">
                <Star className="w-3 h-3 fill-current" />
                <span>{product.rating || 5}</span>
              </div>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-3.5">
            <div className="flex items-center justify-between text-xs mb-1">
              <Link
                href={`/browse?category=${encodeURIComponent(product.category || 'All')}`}
                className="text-[10px] font-semibold uppercase tracking-wider text-[#b84357] dark:text-rose-300 hover:underline"
              >
                {product.brand || product.category}
              </Link>
              <div className="flex items-center gap-1 text-[11px] text-[#8a7e84]">
                <MapPin className="w-3 h-3 text-[#b84357]" />
                <span>{product.location || 'Dhaka'}</span>
              </div>
            </div>

            <Link href={`/product/${product._id || product.id}`} className="block group-hover:text-[#b84357] transition-colors">
              <h3 className="font-semibold text-sm text-[#191416] dark:text-white line-clamp-1">
                {product.title}
              </h3>
            </Link>

            {product.shade && (
              <p className="text-[11px] text-[#73676c] dark:text-slate-400 mt-0.5 line-clamp-1">
                Shade: <span className="text-slate-800 dark:text-slate-200 font-medium">{product.shade}</span>
              </p>
            )}

            {/* Pricing */}
            <div className="mt-2 flex items-baseline gap-2">
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

        {/* Card Action Footer with Glass Buttons */}
        <div className="px-3.5 pb-3.5 pt-2 flex items-center gap-2 border-t border-rose-200/40 dark:border-white/5">
          <Link
            href={`/product/${product._id || product.id}`}
            className="flex-1 py-1.5 text-center text-xs font-semibold rounded-xl bg-white/60 dark:bg-white/5 hover:bg-[#b84357] hover:text-white text-[#191416] dark:text-white border border-white/70 dark:border-white/10 backdrop-blur-md active:scale-98 transition-all shadow-xs"
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
            className="p-2 rounded-xl bg-[#b84357] hover:bg-[#a13649] text-white active:scale-95 transition-all shadow-md shadow-[#b84357]/20 cursor-pointer"
            title="Add to Cart"
            aria-label={`Add ${product.title} to bag`}
          >
            <ShoppingBag className="w-4 h-4" />
          </motion.button>

          <motion.a
            whileTap={{ scale: 0.92 }}
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl border border-white/70 dark:border-white/10 bg-white/60 dark:bg-white/5 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 active:scale-95 transition-all shadow-xs backdrop-blur-md"
            title="WhatsApp inquiry"
          >
            <MessageCircle className="w-4 h-4" />
          </motion.a>
        </div>
      </motion.div>

      {quickViewOpen && (
        <QuickViewModal product={product} onClose={() => setQuickViewOpen(false)} />
      )}
    </>
  );
}
