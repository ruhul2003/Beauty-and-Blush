"use client";

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Heart } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export function TrendingProducts({ products = [] }) {
  const { showToast } = useToast();
  const scrollRef = useRef(null);
  const [wishlist, setWishlist] = useState({});

  // 5 Signature Best Sellers matching the design reference
  const defaultBestSellers = [
    {
      id: 'bnb-best-01',
      title: 'Hyaluronic Acid Serum',
      price: '$24.99',
      originalPrice: null,
      rating: 5,
      reviewsCount: 123,
      isSale: false,
      image: '/images/serum.jpg',
      category: 'Skincare'
    },
    {
      id: 'bnb-best-02',
      title: 'Makeup Brush Set (10pcs)',
      price: '$29.99',
      originalPrice: null,
      rating: 5,
      reviewsCount: 123,
      isSale: false,
      image: '/images/brushes.jpg',
      category: 'Accessories'
    },
    {
      id: 'bnb-best-03',
      title: 'Collagen Night Cream',
      price: '$19.99',
      originalPrice: null,
      rating: 5,
      reviewsCount: 123,
      isSale: false,
      image: '/images/cream.jpg',
      category: 'Skincare'
    },
    {
      id: 'bnb-best-04',
      title: 'Matte Lipstick',
      price: '$14.99',
      originalPrice: '$19.99',
      rating: 5,
      reviewsCount: 123,
      isSale: true,
      image: '/images/lipstick.jpg',
      category: 'Makeup'
    },
    {
      id: 'bnb-best-05',
      title: 'Soft Pinch Liquid Blush',
      price: '$22.00',
      originalPrice: null,
      rating: 5,
      reviewsCount: 142,
      isSale: false,
      image: '/images/hero-model.jpg',
      category: 'Makeup'
    }
  ];

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const toggleWishlist = (item) => {
    const isSaved = !!wishlist[item.id];
    const nextState = !isSaved;
    setWishlist(prev => ({ ...prev, [item.id]: nextState }));

    try {
      const current = JSON.parse(localStorage.getItem('bnb_wishlist') || '[]');
      if (nextState) {
        if (!current.some(p => p.id === item.id || p._id === item.id)) {
          current.push(item);
          localStorage.setItem('bnb_wishlist', JSON.stringify(current));
        }
        showToast?.(`Added "${item.title}" to wishlist!`, 'success');
      } else {
        const filtered = current.filter(p => (p.id || p._id) !== item.id);
        localStorage.setItem('bnb_wishlist', JSON.stringify(filtered));
        showToast?.(`Removed from wishlist`, 'info');
      }
    } catch (err) {}
  };

  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      <div className="w-[90%] mx-auto px-2 sm:px-4">
        
        {/* Section Heading with Minimal Glass Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12 flex flex-col items-center"
        >
          <span className="px-3.5 py-1 rounded-full text-[10px] sm:text-[11px] uppercase tracking-[0.24em] font-semibold text-[#b84357] dark:text-rose-300 bg-black/[0.02] dark:bg-white/[0.04] backdrop-blur-xl border border-black/[0.05] dark:border-white/[0.08] shadow-xs mb-2.5">
            Iconic Formulations
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#191416] dark:text-white font-normal tracking-tight">
            Best Sellers
          </h2>
        </motion.div>

        {/* Carousel Container with Side Navigation Arrows */}
        <div className="relative group">
          
          {/* Left Arrow Button */}
          <button
            onClick={() => handleScroll('left')}
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 dark:bg-[#140b17]/85 backdrop-blur-xl shadow-xs border border-black/[0.06] dark:border-white/[0.08] items-center justify-center text-[#191416] dark:text-white hover:border-[#b84357] active:scale-95 transition-all cursor-pointer"
            aria-label="Previous products"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => handleScroll('right')}
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 dark:bg-[#140b17]/85 backdrop-blur-xl shadow-xs border border-black/[0.06] dark:border-white/[0.08] items-center justify-center text-[#191416] dark:text-white hover:border-[#b84357] active:scale-95 transition-all cursor-pointer"
            aria-label="Next products"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Horizontal Smooth Carousel with Snap on Mobile */}
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 px-1 sm:px-2 no-scrollbar snap-x snap-mandatory scroll-smooth"
          >
            {defaultBestSellers.map((prod, idx) => {
              const isSaved = !!wishlist[prod.id];
              return (
                <motion.div
                  key={prod.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="snap-item w-[220px] sm:w-[240px] md:w-[260px] flex-shrink-0 bg-white/60 dark:bg-[#140b16]/65 backdrop-blur-2xl rounded-2xl overflow-hidden border border-black/[0.05] dark:border-white/[0.08] p-3 sm:p-3.5 flex flex-col justify-between group/card hover:border-black/15 dark:hover:border-white/20 transition-all duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.07)]"
                >
                  <div>
                    {/* Product Image Frame */}
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-black/[0.02] dark:bg-white/[0.03] backdrop-blur-md border border-black/[0.04] dark:border-white/[0.06] mb-3">
                      <Link href={`/browse?category=${prod.category}`} className="block w-full h-full">
                        <img
                          src={prod.image}
                          alt={prod.title}
                          className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                        />
                      </Link>

                      {/* SALE Badge */}
                      {prod.isSale && (
                        <span className="absolute top-2.5 left-2.5 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider rounded-md bg-[#191416]/90 dark:bg-white/90 text-white dark:text-[#191416] backdrop-blur-md">
                          SALE
                        </span>
                      )}

                      {/* Wishlist Heart */}
                      <button
                        onClick={() => toggleWishlist(prod)}
                        className={`absolute top-2.5 right-2.5 p-1.5 rounded-full backdrop-blur-md border border-black/[0.06] dark:border-white/[0.08] transition-all cursor-pointer ${
                          isSaved 
                            ? 'bg-[#b84357] text-white shadow-xs' 
                            : 'bg-white/80 dark:bg-black/60 text-slate-600 dark:text-slate-300 hover:text-[#b84357]'
                        }`}
                        title="Save to wishlist"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Product Info */}
                    <Link href={`/browse?category=${prod.category}`} className="block">
                      <h3 className="font-semibold text-xs sm:text-sm text-[#23171e] dark:text-white truncate group-hover/card:text-[#b84357] transition-colors">
                        {prod.title}
                      </h3>
                    </Link>

                    {/* Price with Strike-through */}
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-bold text-[#b84357] dark:text-rose-300">
                        {prod.price}
                      </span>
                      {prod.originalPrice && (
                        <span className="text-[11px] text-slate-400 line-through">
                          {prod.originalPrice}
                        </span>
                      )}
                    </div>

                    {/* Star Rating with Count */}
                    <div className="mt-1.5 flex items-center gap-1.5 text-amber-500">
                      <div className="flex items-center">
                        {[...Array(prod.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        ({prod.reviewsCount})
                      </span>
                    </div>
                  </div>

                  {/* Add to Bag Button */}
                  <div className="mt-3 pt-2.5 border-t border-black/[0.05] dark:border-white/[0.08]">
                    <Link
                      href={`/browse?category=${prod.category}`}
                      className="w-full py-2 text-center text-xs font-semibold rounded-xl bg-black/[0.02] dark:bg-white/[0.04] hover:bg-[#b84357] text-[#191416] dark:text-white hover:text-white border border-black/[0.06] dark:border-white/[0.08] hover:border-[#b84357] backdrop-blur-md active:scale-95 transition-all block shadow-xs"
                    >
                      View Product
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
