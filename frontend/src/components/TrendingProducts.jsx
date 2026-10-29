"use client";

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Crown, ChevronLeft, ChevronRight, Star, Heart, ArrowRight } from 'lucide-react';
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
        
        {/* Section Heading with Framer Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12"
        >
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#82757a] font-medium mb-1">
            Iconic Formulations
          </p>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#191416] dark:text-white font-normal tracking-tight">
            Best Sellers
          </h2>
        </motion.div>

        {/* Carousel Container with Side Navigation Arrows */}
        <div className="relative group">
          
          {/* Left Arrow Button */}
          <button
            onClick={() => handleScroll('left')}
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white dark:bg-[#141114] shadow-sm border border-[#eee7e6] dark:border-white/10 items-center justify-center text-[#191416] dark:text-white hover:border-[#191416] active:scale-95 transition-all"
            aria-label="Previous products"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => handleScroll('right')}
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white dark:bg-[#141114] shadow-sm border border-[#eee7e6] dark:border-white/10 items-center justify-center text-[#191416] dark:text-white hover:border-[#191416] active:scale-95 transition-all"
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
                  className="snap-item w-[220px] sm:w-[240px] md:w-[260px] flex-shrink-0 bg-white dark:bg-[#141114] rounded-xl overflow-hidden border border-[#eee7e6] dark:border-white/10 p-3 sm:p-3.5 flex flex-col justify-between group/card hover:border-[#d6cecc] dark:hover:border-white/20 transition-all duration-300 shadow-none hover:shadow-md"
                >
                  <div>
                    {/* Product Image Frame */}
                    <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-[#faf8f7] dark:bg-white/5 mb-3">
                      <Link href={`/browse?category=${prod.category}`} className="block w-full h-full">
                        <img
                          src={prod.image}
                          alt={prod.title}
                          className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                        />
                      </Link>

                      {/* SALE Badge */}
                      {prod.isSale && (
                        <span className="absolute top-2.5 left-2.5 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider rounded bg-[#191416] text-white">
                          SALE
                        </span>
                      )}

                      {/* Wishlist Heart */}
                      <button
                        onClick={() => toggleWishlist(prod)}
                        className={`absolute top-2.5 right-2.5 p-1.5 rounded-full backdrop-blur-md transition-all ${
                          isSaved 
                            ? 'bg-[#c94d64] text-white' 
                            : 'bg-white/80 dark:bg-black/60 text-slate-600 dark:text-slate-300 hover:text-[#c94d64]'
                        }`}
                        title="Save to wishlist"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Product Info */}
                    <Link href={`/browse?category=${prod.category}`} className="block">
                      <h3 className="font-semibold text-xs sm:text-sm text-[#23171e] dark:text-white truncate group-hover/card:text-[#c94d64] transition-colors">
                        {prod.title}
                      </h3>
                    </Link>

                    {/* Price with Strike-through */}
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-bold text-[#23171e] dark:text-white">
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
                  <div className="mt-3 pt-2 border-t border-[#fae0e4]/60 dark:border-rose-950/40">
                    <Link
                      href={`/browse?category=${prod.category}`}
                      className="w-full py-1.5 text-center text-[11px] font-bold rounded-lg bg-[#fcf2f2] hover:bg-[#c94d64] text-[#c94d64] hover:text-white active:scale-95 transition-all block"
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
