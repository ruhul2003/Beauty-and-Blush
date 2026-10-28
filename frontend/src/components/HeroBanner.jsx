"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Sparkles
} from 'lucide-react';

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

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

  // Auto-advance slides smoothly every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <section className="relative w-full overflow-hidden bg-[#140c16] min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex items-center border-b border-[#eee7e6]/40 dark:border-white/10">
      
      {/* Full Width Cinematic Background Crossfade Slides */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {slides.map((s, idx) => (
          <div
            key={s.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              currentSlide === idx ? 'opacity-100 z-0' : 'opacity-0 -z-10'
            }`}
          >
            <img
              src={s.image}
              alt={s.titleAccent}
              className={`w-full h-full object-cover object-center transition-transform duration-[6000ms] ease-out ${
                currentSlide === idx ? 'scale-105' : 'scale-100'
              }`}
            />
          </div>
        ))}
        {/* Soft Vignette Overlay to spotlight center content */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/85 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/75 z-[1]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
        <div className="relative flex items-center justify-center min-h-[460px]">

          {/* ================= CENTER COLUMN: TITLE & CTAs ================= */}
          <div className="relative z-20 w-full max-w-2xl lg:max-w-3xl flex flex-col items-center text-center space-y-6">
            
            {/* Tagline & Curated Badge */}
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <span className="px-3.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.22em] bg-white/10 text-rose-200 border border-white/15 backdrop-blur-md shadow-sm">
                {slide.tag}
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-medium tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30 backdrop-blur-md">
                {slide.badge}
              </span>
            </div>

            {/* Main Luxury Centered Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-[62px] font-serif font-normal text-white leading-[1.12] tracking-tight drop-shadow-xl min-h-[140px] sm:min-h-[170px] flex flex-col justify-center">
              <span>{slide.titleLine1}</span>
              <span className="font-light text-slate-100">{slide.titleLine2}</span>
              <span className="text-[#f4728d] font-serif italic drop-shadow-lg">
                {slide.titleAccent}
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-200 max-w-lg mx-auto leading-relaxed font-normal drop-shadow min-h-[48px]">
              {slide.desc}
            </p>

            {/* Call To Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
              <Link
                href="/browse"
                className="px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-bold text-white bg-[#b84357] hover:bg-[#a13346] rounded-xl flex items-center gap-2.5 shadow-lg shadow-[#b84357]/30 hover:shadow-xl hover:shadow-[#b84357]/40 active:scale-98 transition-all"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link
                href="/browse"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white hover:text-rose-300 transition-colors py-3.5 px-5 rounded-xl border border-white/20 hover:border-rose-400/50 bg-white/5 backdrop-blur-md group"
              >
                <span>LADIES GLAMOUR</span>
                <Sparkles className="w-3.5 h-3.5 text-rose-300 group-hover:rotate-12 transition-transform" />
              </Link>
            </div>

            {/* Automatic Slide Indicator Pills (No next/previous buttons, no slide numbers) */}
            <div className="flex items-center justify-center gap-2 pt-4">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                    currentSlide === idx 
                      ? 'w-8 bg-rose-400 shadow-md shadow-rose-500/50' 
                      : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
