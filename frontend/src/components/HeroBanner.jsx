"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Sparkles, 
  Sparkle
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

          {/* ================= LEFT PREMIUM COLOR OBSTACLES ================= */}
          <div className="hidden lg:flex absolute left-0 xl:-left-4 2xl:-left-10 top-1/2 -translate-y-1/2 items-center justify-center pointer-events-none select-none z-10">
            <div className="relative w-72 xl:w-80 h-96 flex items-center justify-center">
              
              {/* Deep Ambient Chromatic Glow */}
              <div 
                className="absolute w-60 h-60 rounded-full bg-gradient-to-tr from-[#e11d48]/35 via-[#f4728d]/25 to-transparent blur-3xl animate-pulse" 
                style={{ animationDuration: '4.5s' }} 
              />

              {/* Secondary Layer: Concentric Radiant Glass Ring / Halo */}
              <div className="absolute w-48 xl:w-56 h-48 xl:h-56 rounded-full border border-rose-300/30 bg-gradient-to-br from-rose-500/20 via-pink-400/5 to-transparent backdrop-blur-md shadow-[0_0_40px_rgba(244,114,142,0.3)] -translate-x-6 translate-y-8 rotate-12">
                <div className="absolute inset-3 rounded-full border border-white/20 border-dashed" />
                <div className="absolute top-2 right-4 w-2.5 h-2.5 rounded-full bg-rose-200 shadow-[0_0_12px_#f4728d]" />
              </div>

              {/* Primary Obstacle: Tilted Frosted Glass Prism Sculpture */}
              <div className="relative w-40 xl:w-48 h-64 xl:h-76 -rotate-[14deg] rounded-[2.5rem] bg-gradient-to-b from-white/20 via-rose-500/15 to-[#4c0519]/50 backdrop-blur-2xl border border-white/30 shadow-[0_25px_60px_rgba(190,24,93,0.35),inset_0_1px_2px_rgba(255,255,255,0.5),inset_0_-1px_2px_rgba(255,255,255,0.15)] overflow-hidden transition-all duration-700">
                {/* Specular Diagonal Light Flare */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-80" />
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-rose-200/25 to-transparent" />
                <div className="absolute -top-10 -bottom-10 left-3 w-[1px] bg-gradient-to-b from-transparent via-white/50 to-transparent rotate-6" />
                
                {/* Delicate Atelier Micro Accent */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-rose-200/75">
                  <Sparkle className="w-4 h-4 fill-current text-rose-300 drop-shadow" />
                  <span className="text-[10px] font-mono tracking-[0.28em] uppercase font-bold text-rose-100/90">
                    Rose Aura
                  </span>
                </div>
              </div>

              {/* Floating Chromatic Pearls */}
              <div className="absolute -top-3 left-8 w-9 h-9 rounded-full bg-gradient-to-br from-rose-200/50 via-rose-500/30 to-rose-900/40 border border-white/40 backdrop-blur-md shadow-[0_4px_20px_rgba(244,114,142,0.4)]" />
              <div className="absolute bottom-4 right-2 w-6 h-6 rounded-full bg-gradient-to-br from-pink-200/50 to-rose-600/30 border border-white/30 backdrop-blur-md shadow-md" />

            </div>
          </div>

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

          {/* ================= RIGHT PREMIUM COLOR OBSTACLES ================= */}
          <div className="hidden lg:flex absolute right-0 xl:-right-4 2xl:-right-10 top-1/2 -translate-y-1/2 items-center justify-center pointer-events-none select-none z-10">
            <div className="relative w-72 xl:w-80 h-96 flex items-center justify-center">
              
              {/* Deep Ambient Warm Amber & Rose Glow */}
              <div 
                className="absolute w-60 h-60 rounded-full bg-gradient-to-tl from-[#f59e0b]/30 via-[#fb7185]/25 to-transparent blur-3xl animate-pulse" 
                style={{ animationDuration: '5.5s' }} 
              />

              {/* Secondary Layer: Concentric Elliptical Orbit Ring / Halo */}
              <div className="absolute w-52 xl:w-60 h-40 xl:h-48 rounded-[50%] border border-amber-300/30 bg-gradient-to-bl from-amber-400/20 via-rose-400/5 to-transparent backdrop-blur-md shadow-[0_0_40px_rgba(251,191,36,0.25)] translate-x-6 -translate-y-8 rotate-12">
                <div className="absolute inset-3 rounded-[50%] border border-white/20 border-dashed" />
                <div className="absolute bottom-3 left-4 w-2.5 h-2.5 rounded-full bg-amber-200 shadow-[0_0_12px_#fbbf24]" />
              </div>

              {/* Primary Obstacle: Tilted Frosted Glass Prism Sculpture */}
              <div className="relative w-40 xl:w-48 h-64 xl:h-76 rotate-[14deg] rounded-[2.5rem] bg-gradient-to-b from-white/20 via-amber-500/15 to-[#3b0764]/50 backdrop-blur-2xl border border-white/30 shadow-[0_25px_60px_rgba(217,119,6,0.3),inset_0_1px_2px_rgba(255,255,255,0.5),inset_0_-1px_2px_rgba(255,255,255,0.15)] overflow-hidden transition-all duration-700">
                {/* Specular Diagonal Light Flare */}
                <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/20 to-transparent opacity-80" />
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-amber-200/25 to-transparent" />
                <div className="absolute -top-10 -bottom-10 right-3 w-[1px] bg-gradient-to-b from-transparent via-white/50 to-transparent -rotate-6" />
                
                {/* Delicate Atelier Micro Accent */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-amber-200/75">
                  <span className="text-[10px] font-mono tracking-[0.28em] uppercase font-bold text-amber-100/90">
                    Solar Eclat
                  </span>
                  <Sparkles className="w-4 h-4 text-amber-300 drop-shadow" />
                </div>
              </div>

              {/* Floating Chromatic Pearls */}
              <div className="absolute -top-3 right-8 w-10 h-10 rounded-full bg-gradient-to-bl from-amber-200/50 via-amber-400/30 to-amber-700/40 border border-white/40 backdrop-blur-md shadow-[0_4px_20px_rgba(245,158,11,0.4)]" />
              <div className="absolute bottom-5 left-2 w-6 h-6 rounded-full bg-gradient-to-br from-rose-300/50 to-amber-500/30 border border-white/30 backdrop-blur-md shadow-md" />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
