"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Star, ShieldCheck, MapPin, MessageCircle, Eye, ShoppingBag } from 'lucide-react';
import { formatPrice, calculateDiscount } from '@/utils/formatters';
import { useToast } from '@/context/ToastContext';
import { useCart } from '@/context/CartContext';
import { QuickViewModal } from './QuickViewModal';

export function ProductCard({ product }) {
  const { showToast } = useToast();
  const { addToCart } = useCart();
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

  const whatsappPhone = (product.sellerPhone || '+8801711224466').replace(/[^0-9]/g, '');
  const whatsappMsg = encodeURIComponent(`Hi, I'm interested in "${product.title}" priced at ${formatPrice(product.price)} on Beauty & Blush. Is this available for delivery?`);
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${whatsappMsg}`;

  return (
    <>
      <div className="bg-white dark:bg-[#141114] rounded-xl overflow-hidden group flex flex-col justify-between border border-[#eee7e6] dark:border-white/10 hover:border-[#d6cecc] dark:hover:border-white/20 transition-all duration-300 hover:shadow-sm">
        <div>
          {/* Top Image Showcase */}
          <div className="relative aspect-square overflow-hidden bg-[#f7f5f4] dark:bg-white/5">
            <Link href={`/product/${product._id || product.id}`} className="block w-full h-full">
              <img
                src={primaryImage}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
            </Link>

            {/* Condition & Discount Badges */}
            <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
              {discount > 0 ? (
                <span className="px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider rounded bg-[#191416] text-white shadow-none">
                  -{discount}%
                </span>
              ) : (
                <span className="px-2 py-0.5 text-[9px] font-medium tracking-wide rounded bg-white/90 dark:bg-[#141114]/90 text-slate-800 dark:text-slate-200 backdrop-blur-md border border-[#eee7e6] dark:border-white/10">
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
              className="absolute inset-x-4 top-1/2 -translate-y-1/2 py-2 px-3 rounded-lg bg-white/95 dark:bg-[#141114]/95 text-[#191416] dark:text-white font-medium text-xs shadow-sm backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-1.5 hover:bg-[#191416] hover:text-white dark:hover:bg-white dark:hover:text-black z-20 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick View</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={toggleWishlist}
              className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md shadow-none border border-[#eee7e6] dark:border-white/10 active:scale-95 transition-all z-20 ${
                isWishlisted
                  ? 'bg-[#b84357] text-white'
                  : 'bg-white/90 dark:bg-[#141114]/90 text-slate-600 dark:text-slate-300 hover:text-[#b84357]'
              }`}
              title="Save to wishlist"
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>

            {/* Authenticity Verified Pill */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] text-white bg-black/50 backdrop-blur-md px-2 py-0.5 rounded pointer-events-none">
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
                className="text-[10px] font-medium uppercase tracking-wider text-[#73676c] hover:text-[#191416] dark:hover:text-white"
              >
                {product.brand || product.category}
              </Link>
              <div className="flex items-center gap-1 text-[11px] text-[#8a7e84]">
                <MapPin className="w-3 h-3 text-[#8a7e84]" />
                <span>{product.location || 'Dhaka'}</span>
              </div>
            </div>

            <Link href={`/product/${product._id || product.id}`} className="block group-hover:text-[#b84357] transition-colors">
              <h3 className="font-medium text-sm text-[#191416] dark:text-white line-clamp-1">
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
              <span className="text-base font-semibold text-[#191416] dark:text-white">
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
        <div className="px-3.5 pb-3.5 pt-1 flex items-center gap-2 border-t border-[#eee7e6]/60 dark:border-white/5">
          <Link
            href={`/product/${product._id || product.id}`}
            className="flex-1 py-1.5 text-center text-xs font-medium rounded-md bg-[#f7f4f3] dark:bg-white/5 hover:bg-[#191416] hover:text-white dark:hover:bg-white dark:hover:text-black text-[#191416] dark:text-white active:scale-98 transition-all"
          >
            View Details
          </Link>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
            className="p-1.5 rounded-md bg-[#b84357] hover:bg-[#a13346] text-white active:scale-95 transition-all shadow-sm"
            title="Add to Cart"
            aria-label={`Add ${product.title} to bag`}
          >
            <ShoppingBag className="w-4 h-4" />
          </button>

          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded-md border border-[#eee7e6] dark:border-white/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 active:scale-95 transition-all"
            title="WhatsApp inquiry"
          >
            <MessageCircle className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {quickViewOpen && (
        <QuickViewModal product={product} onClose={() => setQuickViewOpen(false)} />
      )}
    </>
  );
}

