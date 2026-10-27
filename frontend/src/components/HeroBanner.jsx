"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Sparkles, CheckCircle2, ShoppingBag, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addToCart } = useCart();

  const slides = [
    {
      id: "hero-prod-01",
      tag: "AUTHENTIC SOFT BLUSH & GLOW",
      badge: "Best Seller • 100% Genuine",
      titleLine1: "Radiant Flush With",
      titleLine2: "Dewy Silk Liquid",
      titleAccent: "Blushes",
      desc: "Weightless buildable formula infused with botanical lotus and gardenia extract. Crafted for ladies' natural glass skin and all-day youthful radiance.",
      image: "/images/hero-model.jpg",
      highlight: "Rare Beauty Soft Pinch Liquid Blush - Joy",
      shade: "Joy - Dewy Peach",
      price: "৳3,200",
      rawPrice: 3200,
      oldPrice: "৳3,800",
      rating: 4.9,
      reviews: "1.4k+",
      category: "Blush"
    },
    {
      id: "hero-prod-02",
      tag: "LUXURY LADIES LIP CARE",
      badge: "Trending • Haute Glamour",
      titleLine1: "Sculpt & Shine With",
      titleLine2: "Ultra Hydrating",
      titleAccent: "Lip Glaze & Rouge",
      desc: "Rich cherry botanical oil, nourishing vitamins, and velvety mirror-like shine designed for effortless ladies' daytime and evening glamour.",
      image: "/images/lipstick.jpg",
      highlight: "Dior Addict Lip Glow Oil - 015 Cherry",
      shade: "015 Cherry Glaze",
      price: "৳4,800",
      rawPrice: 4800,
      oldPrice: "৳5,400",
      rating: 5.0,
      reviews: "980+",
      category: "Lipstick"
    },
    {
      id: "hero-prod-03",
      tag: "CLINICAL SKINCARE FORMULAS",
      badge: "Dermatologist Approved",
      titleLine1: "Pure & Potent",
      titleLine2: "Hydrating Barrier",
      titleAccent: "Dewy Serums",
      desc: "Clinical hyaluronic acid, pure niacinamide 10% and soothing rosewater that visibly minimize pores, balance sebum, and lock in 72-hour moisture.",
      image: "/images/promo-skincare.jpg",
      highlight: "The Ordinary Niacinamide 10% + Zinc 1%",
      shade: "60ml Concentrated Serum",
      price: "৳1,850",
      rawPrice: 1850,
      oldPrice: "৳2,200",
      rating: 4.8,
      reviews: "2.8k+",
      category: "Skincare"
    },
    {
      id: "hero-prod-04",
      tag: "HAUTE PARFUMERIE POUR FEMME",
      badge: "Iconic Signature Scent",
      titleLine1: "Sensual Floral",
      titleLine2: "French Jasmine &",
      titleAccent: "Pink Peony Mist",
      desc: "A romantic constellation of delicate floral notes, sparkling grapefruit, sweet quince and soft white musk crafted exclusively for women.",
      image: "/images/perfume.jpg",
      highlight: "Chanel Chance Eau Tendre Eau de Parfum",
      shade: "100ml Floral Vaporisateur",
      price: "৳16,800",
      rawPrice: 16800,
      oldPrice: "৳18,500",
      rating: 5.0,
      reviews: "540+",
      category: "Fragrance"
    },
    {
      id: "hero-prod-05",
      tag: "FLAWLESS COMPLEXION PRO",
      badge: "Red Carpet Choice",
      titleLine1: "Airbrushed Velvet",
      titleLine2: "Longwear Setting &",
      titleAccent: "Complexion Glow",
      desc: "Micro-fine smoothing formula and pore-blurring radiance mist that sets makeup flawless for up to 24 hours without creasing or shine.",
      image: "/images/promo-makeup.jpg",
      highlight: "Charlotte Tilbury Airbrush Setting Spray",
      shade: "Original 100ml Dewy",
      price: "৳4,200",
      rawPrice: 4200,
      oldPrice: "৳4,900",
      rating: 4.9,
      reviews: "1.1k+",
      category: "Makeup"
    }
  ];

  // Auto-advance slides smoothly every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <section className="relative w-full overflow-hidden bg-[#140c16] min-h-[560px] sm:min-h-[620px] lg:min-h-[680px] flex items-center border-b border-[#eee7e6]/40 dark:border-white/10">
      {/* Full Width Panoramic Background Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <img
          src={slide.image}
          alt={slide.highlight}
          className="w-full h-full object-cover object-center scale-105 transition-all duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/35" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tagline & Curated Badge */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.2em] bg-white/10 text-rose-200 border border-white/15 backdrop-blur-md">
                {slide.tag}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30 backdrop-blur-md">
                {slide.badge}
              </span>
            </div>

            {/* Main Luxury Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[62px] font-serif font-normal text-white leading-[1.12] tracking-tight drop-shadow-sm">
              {slide.titleLine1} <br className="hidden sm:inline" />
              <span className="font-light text-slate-100">{slide.titleLine2}</span> <br />
              <span className="text-[#f4728d] font-serif italic drop-shadow-md">
                {slide.titleAccent}
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-200 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal drop-shadow">
              {slide.desc}
            </p>

            {/* Call To Actions */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3">
              <Link
                href="/browse"
                className="px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-bold text-white bg-[#b84357] hover:bg-[#a13346] rounded-xl flex items-center gap-2.5 shadow-lg shadow-[#b84357]/30 hover:shadow-xl hover:shadow-[#b84357]/40 active:scale-98 transition-all"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link
                href="/browse?category=Makeup"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white hover:text-rose-300 transition-colors py-3 px-4 rounded-xl border border-white/20 hover:border-rose-400/50 bg-white/5 backdrop-blur-md group"
              >
                <span>LADIES GLAMOUR</span>
                <Sparkles className="w-3.5 h-3.5 text-rose-300 group-hover:rotate-12 transition-transform" />
              </Link>
            </div>

            {/* Slide Pagination Indicator Dots */}
            <div className="flex items-center justify-center lg:justify-start gap-2 pt-4">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentSlide === idx 
                      ? 'w-6 bg-[#191416] dark:bg-white' 
                      : 'w-2 bg-[#dcd5d4] dark:bg-white/20 hover:bg-[#b84357]'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Floating Quick-Shop Ladies Beauty Spotlight Card */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="w-full max-w-sm rounded-3xl p-5 sm:p-6 bg-black/45 backdrop-blur-xl border border-white/20 shadow-2xl space-y-4 text-white">
              
              {/* Card Header & Authenticity */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-rose-500/25 text-rose-300 border border-rose-500/35">
                  Spotlight Item
                </span>
                <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                  <span>{slide.rating}</span>
                  <span className="text-white/60 text-[11px]">({slide.reviews})</span>
                </div>
              </div>

              {/* Product Media Box */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/5 border border-white/10 group">
                <img
                  src={slide.image}
                  alt={slide.highlight}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-white/15">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[10px] font-semibold text-white">100% Genuine</span>
                </div>
                <div className="absolute bottom-2.5 left-2.5 bg-rose-950/80 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-rose-500/30 text-[10px] text-rose-200 font-medium">
                  {slide.category}
                </div>
              </div>

              {/* Product Details */}
              <div>
                <p className="text-[11px] font-medium text-rose-200 tracking-wider uppercase">
                  {slide.shade}
                </p>
                <h3 className="font-serif text-base sm:text-lg font-bold text-white line-clamp-1 mt-0.5">
                  {slide.highlight}
                </h3>
                <div className="flex items-baseline gap-2.5 mt-2">
                  <span className="text-2xl font-bold text-white">{slide.price}</span>
                  <span className="text-xs text-slate-400 line-through">{slide.oldPrice}</span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/25">
                    Save Discount
                  </span>
                </div>
              </div>

              {/* Direct Add to Cart & Explore Actions */}
              <div className="pt-1 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => addToCart({
                    id: slide.id,
                    _id: slide.id,
                    title: slide.highlight,
                    price: slide.rawPrice,
                    image: slide.image,
                    shade: slide.shade,
                    category: slide.category
                  })}
                  className="flex-1 py-3 px-4 rounded-xl bg-white hover:bg-rose-50 text-slate-900 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-98 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#b84357]" />
                  <span>Add to Bag</span>
                </button>

                <Link
                  href="/browse"
                  className="p-3 rounded-xl border border-white/20 hover:border-white/50 text-white hover:bg-white/10 active:scale-95 transition-all"
                  title="View collection"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
