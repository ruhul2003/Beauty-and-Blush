"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ShieldCheck, 
  Star, 
  ShoppingBag, 
  Heart, 
  ArrowRight, 
  Sparkles,
  Check
} from 'lucide-react';
import { formatPrice, calculateDiscount } from '@/utils/formatters';
import { useToast } from '@/context/ToastContext';
import { useCart } from '@/context/CartContext';
import { BuyModal } from './BuyModal';

export function QuickViewModal({ product, onClose }) {
  const { showToast } = useToast();
  const { addToCart } = useCart();
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('bnb_wishlist') || '[]');
      return saved.some(item => (item._id || item.id) === (product._id || product.id));
    } catch (e) {
      return false;
    }
  });

  if (!product) return null;

  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.image || 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80'];

  const discount = calculateDiscount(product.price, product.originalPrice);

  const toggleWishlist = (e) => {
    e.stopPropagation();
    try {
      let list = JSON.parse(localStorage.getItem('bnb_wishlist') || '[]');
      const prodId = product._id || product.id;
      const exists = list.some(i => (i._id || i.id) !== prodId);

      if (exists) {
        list = list.filter(i => (i._id || i.id) !== prodId);
        setIsWishlisted(false);
        showToast('Removed from wishlist', 'info');
      } else {
        list.push(product);
        setIsWishlisted(true);
        showToast('Added to wishlist', 'success');
      }
      localStorage.setItem('bnb_wishlist', JSON.stringify(list));
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white/75 dark:bg-[#140b17]/85 backdrop-blur-3xl backdrop-saturate-190 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/70 dark:border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.7)] p-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-[#191416] dark:hover:text-white bg-white/40 dark:bg-white/5 hover:bg-white/70 backdrop-blur-md border border-white/60 dark:border-white/10 transition-colors z-10 cursor-pointer shadow-xs"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </motion.button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Preview Side */}
            <div className="space-y-3">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 shadow-xs">
                <img
                  src={images[activeImageIdx]}
                  alt={product.title}
                  className="w-full h-full object-cover transition-all duration-300"
                />
                {discount > 0 && (
                  <span className="absolute top-3 left-3 bg-[#191416]/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-md">
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
                      className={`relative w-12 h-12 rounded-xl overflow-hidden border transition-all cursor-pointer ${
                        activeImageIdx === idx 
                          ? 'border-[#b84357] dark:border-rose-400 ring-2 ring-[#b84357]/30' 
                          : 'border-white/60 dark:border-white/10 opacity-70 hover:opacity-100 bg-white/40 dark:bg-white/5 backdrop-blur-sm'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Side */}
            <div className="flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#b84357] dark:text-rose-300">
                    {product.brand || 'Luxury Cosmetic'}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 backdrop-blur-sm">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{product.rating || '4.9'}</span>
                  </div>
                </div>

                <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white mt-1.5">
                  {product.title}
                </h3>

                {/* Batch Code Authenticity Pill */}
                {product.batchCode && (
                  <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-xl bg-emerald-500/10 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-[11px] font-medium border border-emerald-500/30 backdrop-blur-md">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Batch Code: {product.batchCode}</span>
                  </div>
                )}

                {/* Shade / Variation */}
                {product.shade && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5">
                    <span className="text-slate-400">Shade / Variant: </span>
                    <strong className="text-slate-800 dark:text-white font-semibold">{product.shade}</strong>
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

              {/* Action Buttons with Glass Stying */}
              <div className="space-y-2 pt-2">
                <div className="flex gap-2">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      addToCart(product);
                      onClose();
                    }}
                    className="flex-1 py-3 text-xs font-bold rounded-xl bg-white/70 dark:bg-white/10 hover:bg-rose-50 dark:hover:bg-white/20 text-[#b84357] dark:text-rose-300 border border-rose-300/60 dark:border-rose-800/60 flex items-center justify-center gap-2 transition-all shadow-xs backdrop-blur-md cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setBuyModalOpen(true)}
                    className="flex-1 btn-rose-primary py-3 text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-[#b84357]/25 cursor-pointer"
                  >
                    <span>Instant Order</span>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.92 }}
                    onClick={toggleWishlist}
                    className={`p-3 rounded-xl border backdrop-blur-md transition-colors cursor-pointer ${
                      isWishlisted 
                        ? 'bg-rose-50/80 border-rose-400 text-rose-600 dark:bg-rose-950/50 dark:border-rose-700' 
                        : 'border-white/70 dark:border-white/10 bg-white/40 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:text-rose-500'
                    }`}
                    title={isWishlisted ? "In Wishlist" : "Save to Wishlist"}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </motion.button>
                </div>

                <Link
                  href={`/product/${product._id || product.id}`}
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl border border-white/70 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md text-xs font-semibold text-center text-slate-700 dark:text-slate-300 hover:text-[#b84357] hover:border-rose-300/60 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
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
