"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Heart, ShoppingBag, ShieldCheck, ArrowRight, Check } from 'lucide-react';
import { formatPrice, calculateDiscount } from '@/utils/formatters';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { BuyModal } from './BuyModal';

export function QuickViewModal({ product, onClose }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('bnb_wishlist') || '[]');
      return saved.some(p => (p._id || p.id) === (product._id || product.id));
    } catch (e) {
      return false;
    }
  });

  if (!product) return null;

  const images = product.images && product.images.length > 0
    ? product.images
    : (product.image ? [product.image] : ['/images/serum.jpg']);

  const discount = calculateDiscount(product.price, product.originalPrice);

  const toggleWishlist = (e) => {
    e.preventDefault();
    const nextState = !isWishlisted;
    setIsWishlisted(nextState);

    try {
      const saved = JSON.parse(localStorage.getItem('bnb_wishlist') || '[]');
      if (nextState) {
        if (!saved.some(p => (p._id || p.id) === (product._id || product.id))) {
          saved.push(product);
          localStorage.setItem('bnb_wishlist', JSON.stringify(saved));
        }
        showToast?.('Added to wishlist', 'success');
      } else {
        const filtered = saved.filter(p => (p._id || p.id) !== (product._id || product.id));
        localStorage.setItem('bnb_wishlist', JSON.stringify(filtered));
        showToast?.('Removed from wishlist', 'info');
      }
    } catch (err) {}
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.94, opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-2xl w-full glass-slab p-6 sm:p-8 rounded-[36px] shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 right-4 glass-pill w-9 h-9 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer z-10"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </motion.button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Preview Side */}
            <div className="space-y-3">
              <div className="relative aspect-square rounded-[24px] overflow-hidden glass-well">
                <img
                  src={images[activeImageIdx]}
                  alt={product.title}
                  className="w-full h-full object-cover transition-all duration-300 rounded-[24px]"
                />
                {discount > 0 && (
                  <span className="glass-pill absolute top-3 left-3 bg-[#181416]/90 text-white text-[10px] font-bold px-2.5 py-0.5 shadow-xs">
                    SAVE {discount}%
                  </span>
                )}
              </div>

              {/* Thumbnail Strip */}
              {images.length > 1 && (
                <div className="flex gap-2">
                  {images.map((img, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`relative w-12 h-12 rounded-xl overflow-hidden glass-slab p-0.5 transition-all cursor-pointer ${
                        activeImageIdx === idx 
                          ? 'border-[#b84357] ring-2 ring-[#b84357]/20' 
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover rounded-lg" />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Side */}
            <div className="flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="glass-pill px-3 py-0.5 text-[10px] uppercase tracking-wider font-bold text-[#b84357] dark:text-rose-300">
                    {product.brand || 'Luxury Cosmetic'}
                  </span>
                  <div className="glass-well flex items-center gap-1 text-xs text-amber-500 font-bold px-2.5 py-1 rounded-full">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{product.rating || '4.9'}</span>
                  </div>
                </div>

                <h3 className="text-xl font-serif font-bold text-[#181416] dark:text-white mt-2">
                  {product.title}
                </h3>

                {/* Batch Code Authenticity Pill */}
                {product.batchCode && (
                  <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold border border-emerald-500/20">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Batch Code: {product.batchCode}</span>
                  </div>
                )}

                {/* Shade / Variation */}
                {product.shade && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5">
                    <span className="text-slate-400">Shade / Variant: </span>
                    <strong className="text-slate-800 dark:text-white font-bold">{product.shade}</strong>
                  </p>
                )}

                {/* Price Display */}
                <div className="flex items-baseline gap-2 mt-3">
                  <span className="text-2xl font-bold font-serif text-[#b84357] dark:text-rose-300">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm line-through text-slate-400 font-medium">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Description Snippet */}
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 mt-3 leading-relaxed">
                  {product.description || 'Authentic luxury beauty product with guaranteed provenance and secure nationwide courier delivery.'}
                </p>
              </div>

              {/* Action Buttons with Pill Styling */}
              <div className="space-y-2 pt-2">
                <div className="flex gap-2">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      addToCart(product);
                      onClose();
                    }}
                    className="flex-1 py-3 text-xs font-bold rounded-full glass-pill hover:bg-[#b84357] hover:text-white text-[#181416] dark:text-white hover:border-[#b84357] flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setBuyModalOpen(true)}
                    className="flex-1 bg-[#b84357] hover:bg-[#a13649] text-white py-3 text-xs font-bold rounded-full flex items-center justify-center gap-2 shadow-md shadow-[#b84357]/20 cursor-pointer"
                  >
                    <span>Instant Order</span>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.92 }}
                    onClick={toggleWishlist}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                      isWishlisted 
                        ? 'bg-[#b84357] text-white shadow-xs' 
                        : 'glass-pill text-slate-600 dark:text-slate-300 hover:text-[#b84357] dark:hover:text-rose-300'
                    }`}
                    title={isWishlisted ? "In Wishlist" : "Save to Wishlist"}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </motion.button>
                </div>

                <Link
                  href={`/product/${product._id || product.id}`}
                  onClick={onClose}
                  className="w-full py-2.5 rounded-full glass-pill text-xs font-bold text-center text-slate-700 dark:text-slate-300 hover:text-[#b84357] dark:hover:text-rose-300 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>View Complete Details & Reviews</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {buyModalOpen && (
        <BuyModal product={product} onClose={() => setBuyModalOpen(false)} />
      )}
    </>
  );
}
