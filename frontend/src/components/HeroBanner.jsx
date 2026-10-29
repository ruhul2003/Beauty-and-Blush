"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles
} from 'lucide-react';

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      id: "hero-slide-bags",
      tag: "HAUTE MAROQUINERIE & ACCESSORIES",
      badge: "Artisan Leather • Ladies Bags",
      titleLine1: "Crafted Elegance With",
      titleLine2: "Luxury Designer",
      titleAccent: "Ladies Handbags",
      desc: "Sculptural silhouettes, Italian craftsmanship, and premium top-grain leather designed for effortless everyday sophistication and evening allure.",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1920&q=80",
      category: "Bags"
    },
    {
      id: "hero-slide-decor",
      tag: "ARTISANAL LIVING & SANCTUARY",
      badge: "Modern Sanctuary • Home Accents",
      titleLine1: "Sculptural Vases &",
      titleLine2: "Serene Minimalist",
      titleAccent: "Aesthetic Home Decor",
      desc: "Handcrafted ceramics, soothing botanical scents, and timeless architectural accents that transform living spaces into an oasis of warmth.",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1920&q=80",
      category: "Home Decor"
    },
    {
      id: "hero-slide-skincare",
      tag: "CLINICAL SKINCARE FORMULAS",
      badge: "Dermatologist Approved • 72H Dew",
      titleLine1: "Pure & Potent",
      titleLine2: "Hydrating Barrier",
      titleAccent: "Dewy Serums & Creams",
      desc: "Clinical hyaluronic acid, pure niacinamide 10% and soothing rosewater that visibly minimize pores, balance sebum, and lock in all-day radiance.",
      image: "/images/promo-skincare.jpg",
      category: "Skincare"
    },
    {
      id: "hero-slide-fragrance",
      tag: "HAUTE PARFUMERIE POUR FEMME",
      badge: "Iconic Signature Scent • Long-lasting",
      titleLine1: "Sensual Floral",
      titleLine2: "French Jasmine &",
      titleAccent: "Pink Peony Mist",
      desc: "A romantic constellation of delicate floral notes, sparkling grapefruit, sweet quince and soft white musk crafted exclusively for women.",
      image: "/images/perfume.jpg",
      category: "Fragrance"
    },
    {
      id: "hero-slide-makeup",
      tag: "AUTHENTIC SOFT BLUSH & GLOW",
      badge: "Best Seller • 100% Genuine",
      titleLine1: "Radiant Flush With",
      titleLine2: "Dewy Silk Liquid",
      titleAccent: "Blushes & Rouge",
      desc: "Weightless buildable formula infused with botanical lotus and gardenia extract. Crafted for ladies' natural glass skin and all-day youthful radiance.",
      image: "/images/hero-model.jpg",
      category: "Makeup"
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Auto-advance slides smoothly every 5.5 seconds, pausing on hover/touch
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 5500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Mobile Touch Gestures for smooth swipe transitions
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 45;
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
  };

  const slide = slides[currentSlide];

  return (
    <section 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full overflow-hidden bg-[#140c16] min-h-[520px] sm:min-h-[580px] lg:min-h-[660px] flex items-center border-b border-[#eee7e6]/40 dark:border-white/10 select-none touch-pan-y"
    >
      {/* Full Width Cinematic Background Crossfade Slides */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {slides.map((s, idx) => (
          <div
            key={s.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out will-change-[opacity] ${
              currentSlide === idx ? 'opacity-100 z-0' : 'opacity-0 -z-10'
            }`}
          >
            <img
              src={s.image}
              alt={s.titleAccent}
              className={`w-full h-full object-cover object-center transition-transform duration-[6000ms] ease-out will-change-transform ${
                currentSlide === idx ? 'scale-105' : 'scale-100'
              }`}
            />
          </div>
        ))}
        {/* Soft Vignette Overlay to spotlight center content */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/85 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/80 z-[1]" />
      </div>

      <div className="relative z-10 w-[92%] sm:w-[90%] max-w-[1500px] mx-auto px-2 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
        <div className="relative flex items-center justify-center min-h-[380px] sm:min-h-[420px]">

          {/* ================= CENTER COLUMN: TITLE & CTAs WITH FRAMER MOTION ================= */}
          <div className="relative z-20 w-full max-w-3xl lg:max-w-4xl flex flex-col items-center text-center space-y-5 sm:space-y-6">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex flex-col items-center text-center space-y-4 sm:space-y-5"
              >
                {/* Tagline & Curated Badge */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
                  <span className="px-3 sm:px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] bg-white/10 text-rose-200 border border-white/20 backdrop-blur-md shadow-sm">
                    {slide.tag}
                  </span>
                  <span className="px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium tracking-wider bg-rose-500/20 text-rose-200 border border-rose-500/30 backdrop-blur-md">
                    {slide.badge}
                  </span>
                </div>

                {/* Main Balanced Centered Title */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[66px] font-bold text-white leading-[1.12] sm:leading-[1.1] tracking-tight drop-shadow-xl min-h-[100px] sm:min-h-[130px] md:min-h-[160px] flex flex-col justify-center">
                  <span>{slide.titleLine1}</span>
                  <span className="font-light text-slate-100">{slide.titleLine2}</span>
                  <span className="text-[#f4728d] italic drop-shadow-lg mt-0.5">
                    {slide.titleAccent}
                  </span>
                </h1>

                {/* Description */}
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-200/90 max-w-md sm:max-w-xl lg:max-w-2xl mx-auto leading-relaxed font-normal drop-shadow-md min-h-[40px] sm:min-h-[48px]">
                  {slide.desc}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Call To Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-1 sm:pt-2"
            >
              <Link
                href="/browse"
                className="px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm tracking-[0.18em] uppercase font-bold text-white bg-[#b84357] hover:bg-[#a13346] rounded-xl sm:rounded-2xl flex items-center gap-2 sm:gap-2.5 shadow-lg shadow-[#b84357]/30 hover:shadow-xl hover:shadow-[#b84357]/40 active:scale-98 transition-all"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link
                href="/browse"
                className="inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white hover:text-rose-300 transition-colors rounded-xl sm:rounded-2xl border border-white/20 hover:border-rose-400/50 bg-white/10 backdrop-blur-md group active:scale-98"
              >
                <span>LADIES GLAMOUR</span>
                <Sparkles className="w-4 h-4 text-rose-300 group-hover:rotate-12 transition-transform" />
              </Link>
            </motion.div>

            {/* Smooth Indicator Pills */}
            <div className="flex items-center justify-center gap-2 sm:gap-2.5 pt-3 sm:pt-4">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-400 cursor-pointer ${
                    currentSlide === idx 
                      ? 'w-8 sm:w-10 bg-rose-400 shadow-md shadow-rose-500/50' 
                      : 'w-2 sm:w-2.5 bg-white/35 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
