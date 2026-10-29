"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck, Sparkles, Plus, Minus } from 'lucide-react';
import { formatPrice } from '@/utils/formatters';
import { useCart } from '@/context/CartContext';
import { BuyModal } from './BuyModal';

export function CartDrawer() {
  const { 
    cartItems, 
    cartCount, 
    cartTotal, 
    isCartOpen, 
    closeCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart 
  } = useCart();

  const [checkoutProduct, setCheckoutProduct] = useState(null);

  const freeShippingThreshold = 3000;
  const progressPercent = Math.min(100, Math.round((cartTotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeCart}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />

            {/* Slide-over panel */}
            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 pointer-events-none">
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                className="w-screen max-w-md bg-white dark:bg-[#140e16] text-slate-900 dark:text-white shadow-2xl flex flex-col border-l border-rose-100 dark:border-rose-950/60 pointer-events-auto"
              >
                {/* Drawer Header */}
                <div className="p-4 sm:p-5 border-b border-rose-100 dark:border-rose-950/60 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-[#c94d64] flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-serif font-bold text-slate-900 dark:text-white">
                        Your Beauty Bag
                      </h2>
                      <p className="text-[11px] text-slate-500">
                        {cartCount} item{cartCount === 1 ? '' : 's'} selected
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={closeCart}
                    className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                    aria-label="Close cart"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Free Delivery Incentive Progress Bar */}
                <div className="bg-rose-50/70 dark:bg-rose-950/30 px-5 py-3 border-b border-rose-100/70 dark:border-rose-950/40">
                  <div className="flex items-center justify-between text-[11px] mb-1.5 font-medium">
                    {remainingForFreeShipping > 0 ? (
                      <span className="text-slate-700 dark:text-slate-300">
                        Add <strong className="text-[#c94d64]">{formatPrice(remainingForFreeShipping)}</strong> for <strong>Free Express Shipping</strong>
                      </span>
                    ) : (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Unlocked Free Express Shipping Nationwide!</span>
                      </span>
                    )}
                    <span className="text-[10px] text-slate-400">{progressPercent}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-rose-200/50 dark:bg-rose-950 overflow-hidden">
                    <div 
                      className="h-full bg-[#c94d64] rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-16 space-y-3">
                      <div className="w-16 h-16 rounded-3xl bg-rose-50 dark:bg-rose-950/40 text-rose-300 mx-auto flex items-center justify-center">
                        <ShoppingBag className="w-8 h-8" />
                      </div>
                      <h3 className="text-base font-serif font-bold text-slate-800 dark:text-slate-200">
                        Your bag is empty
                      </h3>
                      <p className="text-xs text-slate-500 max-w-xs mx-auto">
                        Explore authentic lipsticks, clinical serums and luxury fragrances to fill your beauty bag.
                      </p>
                      <div className="pt-2">
                        <Link
                          href="/browse"
                          onClick={closeCart}
                          className="px-6 py-2.5 rounded-xl bg-[#c94d64] hover:bg-[#b03e54] text-white text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-all cursor-pointer"
                        >
                          <span>Explore Catalog</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ) : (
                    cartItems.map((item) => (
                      <div 
                        key={`${item.id}-${item.shade}`}
                        className="flex gap-3.5 p-3 rounded-2xl border border-rose-100/80 dark:border-rose-950/50 bg-white/70 dark:bg-white/5 relative group"
                      >
                        {/* Thumbnail */}
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-rose-50 dark:bg-white/5 shrink-0 border border-rose-100/50 dark:border-white/10">
                          <img
                            src={item.image || '/images/serum.jpg'}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0 pr-6">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-[#c94d64] font-medium mt-0.5">
                            {item.shade}
                          </p>
                          <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">
                            {formatPrice(item.price)}
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center rounded-lg border border-rose-200 dark:border-rose-900/40 bg-rose-50/50 dark:bg-white/5 overflow-hidden">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.shade, (item.quantity || 1) - 1)}
                                className="p-1 hover:bg-rose-100 dark:hover:bg-rose-900/40 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 text-xs font-bold min-w-[20px] text-center">
                                {item.quantity || 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.shade, (item.quantity || 1) + 1)}
                                className="p-1 hover:bg-rose-100 dark:hover:bg-rose-900/40 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="text-[11px] text-slate-400">
                              Total: <strong className="text-slate-700 dark:text-slate-300">{formatPrice(item.price * (item.quantity || 1))}</strong>
                            </span>
                          </div>
                        </div>

                        {/* Remove item button */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id, item.shade)}
                          className="absolute top-3 right-3 text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                          title="Remove item"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer Subtotal & Checkout */}
                {cartItems.length > 0 && (
                  <div className="p-4 sm:p-5 border-t border-rose-100 dark:border-rose-950/60 bg-rose-50/30 dark:bg-white/[0.02] space-y-3">
                    <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                      <div className="flex justify-between">
                        <span>Items Subtotal</span>
                        <span className="font-semibold text-slate-900 dark:text-white">{formatPrice(cartTotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Estimated Shipping</span>
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {cartTotal >= freeShippingThreshold ? (
                            <span className="text-emerald-600 font-bold">Free</span>
                          ) : (
                            formatPrice(60)
                          )}
                        </span>
                      </div>
                      <div className="border-t border-rose-100 dark:border-rose-950/60 pt-2 flex justify-between text-sm font-bold text-slate-900 dark:text-white">
                        <span>Estimated Total</span>
                        <span className="text-[#c94d64] text-base">
                          {formatPrice(cartTotal + (cartTotal >= freeShippingThreshold ? 0 : 60))}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (cartItems.length === 1) {
                          setCheckoutProduct(cartItems[0]);
                        } else if (cartItems.length > 1) {
                          setCheckoutProduct({
                            id: 'bundle-' + Date.now(),
                            _id: 'bundle-' + Date.now(),
                            title: `Beauty Bag (${cartCount} Luxury Items: ${cartItems.map(i => i.title.split(' - ')[0]).join(', ')})`,
                            price: cartTotal,
                            originalPrice: cartTotal,
                            shade: `Assorted Package (${cartItems.length} styles)`,
                            images: [cartItems[0].image || '/images/hero-model.jpg'],
                            sellerPhone: '+880 1711-224466',
                            quantity: 1
                          });
                        }
                      }}
                      className="w-full py-3.5 px-4 rounded-xl bg-[#c94d64] hover:bg-[#b03e54] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#c94d64]/20 active:scale-98 transition-all cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Proceed to Checkout (COD)</span>
                    </button>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                      <button
                        type="button"
                        onClick={clearCart}
                        className="hover:text-rose-600 transition-colors cursor-pointer"
                      >
                        Clear All Items
                      </button>
                      <div className="flex items-center gap-1 text-emerald-600 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Safe & Verified Checkout</span>
                      </div>
                    </div>
                  </div>
                )}

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {checkoutProduct && (
        <BuyModal 
          product={checkoutProduct} 
          onClose={() => {
            setCheckoutProduct(null);
            closeCart();
          }} 
        />
      )}
    </>
  );
}
