"use client";

import React, { useState } from 'react';
import Link from 'next/link';
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

  if (!isCartOpen) return null;

  const freeShippingThreshold = 3000;
  const progressPercent = Math.min(100, Math.round((cartTotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <div 
          onClick={closeCart}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in"
        />

        {/* Slide-over panel */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <div className="w-screen max-w-md bg-white dark:bg-[#140e16] text-slate-900 dark:text-white shadow-2xl flex flex-col border-l border-rose-100 dark:border-rose-950/60 animate-slide-left">
            
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
                className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
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
                      className="px-6 py-2.5 rounded-xl bg-[#c94d64] hover:bg-[#b03e54] text-white text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-all"
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
                    <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-rose-50 dark:bg-white/5 shrink-0 border border-rose-100/60 dark:border-white/5">
                      <img 
                        src={item.image || '/images/serum.jpg'} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0 pr-4">
                      <span className="text-[10px] uppercase font-bold text-[#c94d64] tracking-wider block">
                        {item.category || 'Beauty'}
                      </span>
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white line-clamp-1">
                        {item.title}
                      </h4>
                      {item.shade && (
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Shade: {item.shade}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between mt-2.5">
                        <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                          {formatPrice(item.price)}
                        </span>

                        <div className="flex items-center border border-rose-200 dark:border-rose-900/60 rounded-lg overflow-hidden">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.shade, item.quantity - 1)}
                            className="p-1 text-slate-600 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-slate-800 dark:text-white min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.shade, item.quantity + 1)}
                            className="p-1 text-slate-600 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id, item.shade)}
                      className="absolute top-2.5 right-2.5 p-1 text-slate-400 hover:text-rose-500 transition-colors"
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cartItems.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-rose-100 dark:border-rose-950/60 bg-white dark:bg-[#140e16] space-y-3">
                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
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
                    const firstItem = cartItems[0];
                    if (firstItem) {
                      setCheckoutProduct(firstItem);
                    }
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#c94d64] hover:bg-[#b03e54] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#c94d64]/20 active:scale-98 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Proceed to Checkout (COD)</span>
                </button>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <button
                    type="button"
                    onClick={clearCart}
                    className="hover:text-rose-600 transition-colors"
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

          </div>
        </div>
      </div>

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
