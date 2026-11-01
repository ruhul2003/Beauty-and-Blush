"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      id: "hero-slide-makeup",
      tag: "AUTHENTIC SOFT BLUSH & GLOW",
      badge: "Best Seller • 100% Genuine",
      titleLine1: "Radiant Flush With",
      titleLine2: "Dewy Silk Liquid",
      titleAccent: "Blushes & Rouge",
      desc: "Weightless buildable formula infused with botanical lotus and gardenia extract. Crafted for ladies' natural glass skin and all-day youthful radiance.",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1920&q=85",
      category: "Makeup"
    },
    {
      id: "hero-slide-skincare",
      tag: "CLINICAL SKINCARE FORMULAS",
      badge: "Dermatologist Approved • 72H Dew",
      titleLine1: "Pure & Potent",
      titleLine2: "Hydrating Barrier",
      titleAccent: "Dewy Serums & Creams",
      desc: "Clinical hyaluronic acid, pure niacinamide 10% and soothing rosewater that visibly minimize pores, balance sebum, and lock in all-day radiance.",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1920&q=85",
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
      image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=1920&q=85",
      category: "Fragrance"
    },
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
      image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1920&q=85",
      category: "Home Decor"
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
      className="relative w-full pt-3 sm:pt-5 pb-8 sm:pb-12 overflow-hidden select-none touch-pan-y"
    >
      {/* Outer Squircle Glass Window with smooth border and glassy blur effect */}
      <div className="w-[95%] sm:w-[92%] max-w-[1500px] mx-auto glass-window rounded-[36px] sm:rounded-[44px] min-h-[76vh] sm:min-h-[82vh] relative overflow-hidden flex flex-col justify-between items-center p-6 sm:p-10 md:p-12 shadow-2xl">
        
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

          {/* Light Pink Blush Glass Vignette & Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2a131b]/80 via-[#3a1b26]/50 to-[#2a131b]/80 z-[1] backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#220d15]/60 via-pink-500/10 to-[#1e0a12]/85 z-[1]" />
          <div className="absolute inset-0 bg-radial from-pink-400/15 via-transparent to-transparent pointer-events-none z-[1]" />
        </div>

        {/* Outer Top Bar Window Controls & Verification Badge */}
        <div className="relative z-10 w-full flex items-center justify-between pb-4 sm:pb-6 border-b border-white/15">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400/90 shadow-xs" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/90 shadow-xs" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/90 shadow-xs" />
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/80 ml-2 hidden sm:inline-block">
              Beauty & Blush • Luxury Atelier Edition
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="glass-pill px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-800 dark:text-white border border-white/60 dark:border-white/20 shadow-xs flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>100% Genuine Guaranteed</span>
            </span>
          </div>
        </div>

        {/* Main Centered Content: Dynamic Animated Titles, Badges & CTAs */}
        <div className="relative z-20 w-full max-w-3xl lg:max-w-4xl flex flex-col items-center text-center space-y-5 sm:space-y-6 my-auto py-8 sm:py-12">
          
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
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                <span className="px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-[0.22em] bg-white/[0.14] text-rose-100 border border-white/[0.25] backdrop-blur-xl shadow-xs">
                  {slide.tag}
                </span>
                <span className="px-4 sm:px-4.5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wider bg-white/[0.1] text-white border border-white/[0.2] backdrop-blur-xl">
                  {slide.badge}
                </span>
              </div>

              {/* Main Balanced Centered Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[76px] font-bold text-white leading-[1.08] tracking-tight drop-shadow-xl min-h-[110px] sm:min-h-[145px] md:min-h-[180px] flex flex-col justify-center font-serif">
                <span>{slide.titleLine1}</span>
                <span className="font-light text-slate-100">{slide.titleLine2}</span>
                <span className="text-[#f4728d] italic drop-shadow-lg mt-0.5">
                  {slide.titleAccent}
                </span>
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-100/95 max-w-md sm:max-w-xl lg:max-w-2xl mx-auto leading-relaxed font-normal drop-shadow-md min-h-[44px] sm:min-h-[52px]">
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
              className="px-8 sm:px-10 py-4 sm:py-4.5 text-sm sm:text-base tracking-[0.16em] uppercase font-bold text-white bg-[#b84357] hover:bg-[#a13649] rounded-full flex items-center gap-2 sm:gap-2.5 shadow-xl shadow-[#b84357]/35 hover:scale-[1.02] active:scale-98 transition-all"
            >
              <span>EXPLORE COLLECTION</span>
              <ArrowRight className="w-4.5 h-4.5" />
            </Link>
            
            <Link
              href="/browse"
              className="inline-flex items-center gap-2 px-7 sm:px-9 py-4 sm:py-4.5 text-sm sm:text-base font-semibold uppercase tracking-wider text-white hover:text-rose-200 rounded-full border border-white/20 bg-white/[0.08] hover:bg-white/[0.18] backdrop-blur-xl group hover:scale-[1.02] active:scale-98 transition-all shadow-md"
            >
              <span>LADIES GLAMOUR</span>
              <Sparkles className="w-4.5 h-4.5 text-rose-300 group-hover:rotate-12 transition-transform" />
            </Link>
          </motion.div>

        </div>

        {/* Bottom Controls & Indicators */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center pt-2 gap-3">
          {/* Slide Indicator Pills */}
          <div className="flex items-center justify-center gap-2 sm:gap-2.5">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 sm:h-2.5 rounded-full transition-all duration-400 cursor-pointer ${
                  currentSlide === idx 
                    ? 'w-8 sm:w-10 bg-white shadow-md' 
                    : 'w-2.5 sm:w-3 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Subtle Scroll Hint */}
          <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-white/60 uppercase tracking-[0.25em] font-medium">
            <span>Scroll to explore</span>
          </div>
        </div>

      </div>
    </section>
  );
}
