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
      className="relative w-full min-h-screen h-[100dvh] overflow-hidden select-none touch-pan-y flex flex-col justify-between items-center"
    >
      {/* Full Width Cinematic Background Crossfade Slides (Edge to Edge) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
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

        {/* Light Pink Blush Glass Vignette & Gradient Overlays (Full Screen) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/70 z-[1] backdrop-blur-[0.5px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-rose-950/25 to-[#12070d]/90 z-[1]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-500/15 via-transparent to-black/50 pointer-events-none z-[1]" />
      </div>

      {/* Main Full Screen Content Wrapper */}
      <div className="w-full max-w-[1500px] mx-auto h-full flex flex-col justify-between items-center relative z-10 pt-24 sm:pt-28 pb-6 sm:pb-8 px-4 sm:px-8 md:px-12">

        {/* Main Centered Content: Dynamic Animated Titles, Badges & CTAs */}
        <div className="relative z-20 w-full max-w-3xl lg:max-w-4xl flex-1 flex flex-col items-center justify-center text-center space-y-5 sm:space-y-6 py-4 sm:py-6 my-auto">
          
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
                <span className="px-3.5 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] bg-white/[0.12] text-rose-100 border border-white/[0.2] backdrop-blur-xl shadow-xs">
                  {slide.tag}
                </span>
                <span className="px-3 sm:px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-medium tracking-wider bg-white/[0.08] text-white/90 border border-white/[0.15] backdrop-blur-xl">
                  {slide.badge}
                </span>
              </div>

              {/* Main Balanced Centered Title */}
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[68px] font-bold text-white leading-[1.12] sm:leading-[1.1] tracking-tight drop-shadow-2xl min-h-[80px] sm:min-h-[120px] md:min-h-[150px] flex flex-col justify-center font-serif">
                <span>{slide.titleLine1}</span>
                <span className="font-light text-slate-100">{slide.titleLine2}</span>
                <span className="text-[#f4728d] italic drop-shadow-lg mt-0.5">
                  {slide.titleAccent}
                </span>
              </h1>

              {/* Description */}
              <p className="text-xs sm:text-sm md:text-base text-slate-200/90 max-w-md sm:max-w-xl lg:max-w-2xl mx-auto leading-relaxed font-normal drop-shadow-md min-h-[36px] sm:min-h-[44px]">
                {slide.desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Call To Actions (Enhanced Full Screen CTAs) */}
          <motion.div 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-3"
          >
            <Link
              href="/browse"
              className="px-6 sm:px-8 py-2.5 sm:py-3 text-xs tracking-[0.16em] uppercase font-bold text-white bg-[#e06d84] hover:bg-[#d45d74] rounded-full flex items-center gap-2 shadow-lg shadow-[#e06d84]/35 hover:shadow-xl hover:shadow-[#e06d84]/45 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer border border-rose-200/40"
            >
              <span>EXPLORE COLLECTION</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            
            <Link
              href="/browse"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 text-xs font-bold uppercase tracking-wider text-white hover:text-rose-200 rounded-full border border-white/30 bg-white/[0.1] hover:bg-white/[0.2] backdrop-blur-xl group hover:scale-[1.02] active:scale-98 transition-all shadow-lg shadow-black/20 cursor-pointer"
            >
              <span>LADIES GLAMOUR</span>
              <Sparkles className="w-4 h-4 text-rose-300 group-hover:rotate-12 transition-transform" />
            </Link>
          </motion.div>

        </div>

        {/* Bottom Controls & Indicators */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center pt-2 gap-3">
          {/* Slide Indicator Pills with Glass Capsule */}
          <div className="flex items-center justify-center gap-2 sm:gap-2.5 px-4 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/20 shadow-md">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === idx 
                    ? 'w-8 sm:w-10 bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)]' 
                    : 'w-2.5 sm:w-3 bg-white/40 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Subtle Animated Scroll Hint */}
          <button
            type="button"
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight - 40,
                behavior: 'smooth'
              });
            }}
            className="flex items-center gap-2 text-[10px] sm:text-[11px] text-white/70 hover:text-white uppercase tracking-[0.25em] font-medium transition-colors cursor-pointer group mt-0.5"
            aria-label="Scroll down to explore products"
          >
            <div className="w-4 h-6 rounded-full border border-white/40 flex justify-center pt-1 group-hover:border-white transition-colors">
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-1.5 bg-rose-300 rounded-full"
              />
            </div>
            <span>Scroll to explore</span>
          </button>
        </div>

      </div>
    </section>
  );
}
