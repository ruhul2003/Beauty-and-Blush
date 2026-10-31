"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export function TrendingProducts({ products = [] }) {
  const { showToast } = useToast();
  const scrollRef = useRef(null);
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('bnb_wishlist') || '[]');
      const map = {};
      saved.forEach(item => {
        map[item._id || item.id] = true;
      });
      return map;
    } catch (e) {
      return {};
    }
  });

  const defaultBestSellers = [
    {
      id: "best-001",
      title: "Rare Beauty Soft Pinch Liquid Blush - Joy",
      price: "৳2,850",
      originalPrice: "৳3,400",
      category: "Makeup",
      rating: 5,
      reviewsCount: 142,
      isSale: true,
      image: "/images/hero-model.jpg"
    },
    {
      id: "best-002",
      title: "The Ordinary Niacinamide 10% + Zinc 1%",
      price: "৳1,650",
      originalPrice: "৳1,950",
      category: "Skincare",
      rating: 5,
      reviewsCount: 388,
      isSale: true,
      image: "/images/serum.jpg"
    },
    {
      id: "best-003",
      title: "COSRX Advanced Snail 96 Mucin Power Essence",
      price: "৳1,850",
      originalPrice: "৳2,200",
      category: "Skincare",
      rating: 5,
      reviewsCount: 219,
      isSale: false,
      image: "/images/promo-skincare.jpg"
    },
    {
      id: "best-004",
      title: "Dior Addict Lip Glow Color Awakening Balm",
      price: "৳4,800",
      originalPrice: "৳5,200",
      category: "Makeup",
      rating: 5,
      reviewsCount: 94,
      isSale: false,
      image: "/images/promo-makeup.jpg"
    },
    {
      id: "best-005",
      title: "Chanel Chance Eau Tendre Eau de Parfum 100ml",
      price: "৳18,500",
      originalPrice: "৳19,800",
      category: "Fragrance",
      rating: 5,
      reviewsCount: 47,
      isSale: true,
      image: "/images/perfume.jpg"
    },
    {
      id: "best-006",
      title: "Olaplex No. 3 Hair Perfector Repairing Treatment",
      price: "৳3,600",
      originalPrice: "৳4,100",
      category: "Haircare",
      rating: 5,
      reviewsCount: 165,
      isSale: false,
      image: "/images/haircare.jpg"
    }
  ];

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const toggleWishlist = (prod) => {
    try {
      const saved = JSON.parse(localStorage.getItem('bnb_wishlist') || '[]');
      const isSaved = !!wishlist[prod.id];
      const nextMap = { ...wishlist, [prod.id]: !isSaved };
      setWishlist(nextMap);

      if (!isSaved) {
        saved.push(prod);
        localStorage.setItem('bnb_wishlist', JSON.stringify(saved));
        showToast?.(`Added "${prod.title}" to wishlist!`, 'success');
      } else {
        const filtered = saved.filter(p => (p._id || p.id) !== prod.id);
        localStorage.setItem('bnb_wishlist', JSON.stringify(filtered));
        showToast?.(`Removed from wishlist`, 'info');
      }
    } catch (err) {}
  };

  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      <div className="w-[95%] sm:w-[92%] max-w-[1500px] mx-auto px-2 sm:px-4">
        
        {/* Section Heading with Clay-Glass Pill Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12 flex flex-col items-center"
        >
          <span className="glass-pill px-4 py-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.24em] font-bold text-[#b84357] dark:text-rose-300 shadow-xs mb-3">
            Iconic Formulations
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#181416] dark:text-white font-bold tracking-tight">
            Best Sellers
          </h2>
        </motion.div>

        {/* Carousel Container with Side Navigation Arrows */}
        <div className="relative group">
          
          {/* Left Arrow Button */}
          <button
            onClick={() => handleScroll('left')}
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full glass-pill items-center justify-center text-[#181416] dark:text-white hover:text-[#b84357] shadow-lg active:scale-95 transition-all cursor-pointer"
            aria-label="Previous products"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => handleScroll('right')}
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full glass-pill items-center justify-center text-[#181416] dark:text-white hover:text-[#b84357] shadow-lg active:scale-95 transition-all cursor-pointer"
            aria-label="Next products"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Horizontal Smooth Carousel with Snap on Mobile */}
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-2 px-1 sm:px-2 no-scrollbar snap-x snap-mandatory scroll-smooth"
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
                  className="snap-item w-[230px] sm:w-[250px] md:w-[270px] shrink-0 glass-slab glass-slab-interactive p-3.5 flex flex-col justify-between group/card"
                >
                  <div>
                    {/* Product Image Frame seated in a Recessed Well */}
                    <div className="relative aspect-square w-full rounded-[22px] overflow-hidden glass-well mb-3">
                      <Link href={`/browse?category=${prod.category}`} className="block w-full h-full">
                        <img
                          src={prod.image}
                          alt={prod.title}
                          className="w-full h-full object-cover group-hover/card:scale-108 transition-transform duration-500 rounded-[22px]"
                        />
                      </Link>

                      {/* SALE Badge */}
                      {prod.isSale && (
                        <span className="glass-pill absolute top-2.5 left-2.5 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white bg-[#181416]/90 shadow-xs">
                          SALE
                        </span>
                      )}

                      {/* Wishlist Heart */}
                      <button
                        onClick={() => toggleWishlist(prod)}
                        className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                          isSaved 
                            ? 'bg-[#b84357] text-white shadow-xs' 
                            : 'glass-pill text-slate-600 dark:text-slate-300 hover:text-[#b84357] dark:hover:text-rose-300'
                        }`}
                        title="Save to wishlist"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Product Info */}
                    <Link href={`/browse?category=${prod.category}`} className="block">
                      <h3 className="font-bold text-xs sm:text-sm text-[#181416] dark:text-white truncate group-hover/card:text-[#b84357] dark:group-hover/card:text-rose-300 transition-colors">
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
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        ({prod.reviewsCount})
                      </span>
                    </div>
                  </div>

                  {/* Add to Bag Button as tactile pill */}
                  <div className="mt-3 pt-3 border-t border-black/[0.04] dark:border-white/[0.06]">
                    <Link
                      href={`/browse?category=${prod.category}`}
                      className="w-full py-2 text-center text-xs font-bold rounded-full glass-pill hover:bg-[#b84357] text-[#181416] dark:text-white hover:text-white hover:border-[#b84357] active:scale-95 transition-all block"
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
