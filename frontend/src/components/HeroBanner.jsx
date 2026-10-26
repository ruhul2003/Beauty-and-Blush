"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      tag: "ENHANCE YOUR NATURAL BEAUTY",
      titleLine1: "Glow Up With",
      titleLine2: "Premium Beauty",
      titleAccent: "Products",
      desc: "Discover high-quality makeup & skincare that makes you shine every day.",
      image: "/images/hero-model.jpg",
      highlight: "Dewy Silk Serum & Radiance Cream",
      price: "$24.99",
      oldPrice: "$34.00"
    },
    {
      tag: "CLINICAL SKINCARE FORMULAS",
      titleLine1: "Pure & Potent",
      titleLine2: "Hydrating Barrier",
      titleAccent: "Serums",
      desc: "Formulated with pure hyaluronic acid, niacinamide & rosewater for long-lasting dewy skin.",
      image: "/images/promo-skincare.jpg",
      highlight: "Hyaluronic Acid Glow Drops",
      price: "$24.99",
      oldPrice: "$32.00"
    },
    {
      tag: "TRENDY VELVET FINISHES",
      titleLine1: "Sculpt & Shine",
      titleLine2: "Luxury Velvet",
      titleAccent: "Lipsticks",
      desc: "Rich pigment, long-wearing comfort and weightless matte texture crafted for effortless glam.",
      image: "/images/promo-makeup.jpg",
      highlight: "Velvet Matte Lipstick Rouge",
      price: "$14.99",
      oldPrice: "$19.99"
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
    <section className="relative overflow-hidden bg-[#faf8f7] dark:bg-[#0c0a0c] border-b border-[#eee7e6] dark:border-white/5 pt-6 pb-12 md:py-16 transition-colors">
      <div className="w-[90%] mx-auto px-2 sm:px-4 lg:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-5 space-y-5 text-center lg:text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2">
              <span className="text-[#82757a] dark:text-[#a89da2] text-[11px] font-medium uppercase tracking-[0.22em]">
                {slide.tag}
              </span>
            </div>

            {/* Main Luxury Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-[54px] font-serif font-normal text-[#191416] dark:text-white leading-[1.14] tracking-tight">
              {slide.titleLine1} <br className="hidden sm:inline" />
              {slide.titleLine2} <br />
              <span className="text-[#b84357] dark:text-[#e0677f] font-serif italic">
                {slide.titleAccent}
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#685c62] dark:text-slate-300 max-w-lg mx-auto lg:mx-0 leading-relaxed font-normal">
              {slide.desc}
            </p>

            {/* Call To Actions */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/browse"
                className="btn-berry-primary px-7 py-3 text-xs tracking-widest uppercase font-semibold flex items-center gap-2 shadow-none hover:shadow-sm transition-all"
              >
                <span>EXPLORE SHOP</span>
              </Link>
              
              <Link
                href="/browse"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#191416] dark:text-white hover:text-[#b84357] transition-colors py-3 px-2 group"
              >
                <span>COLLECTIONS</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#b84357]" />
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

          {/* Right Column: Hero Visual Showcase (Wider banner) */}
          <div className="lg:col-span-7 relative">
            <div className="relative mx-auto w-full">
              
              {/* Luxury Frame Container */}
              <div className="relative rounded-2xl overflow-hidden border border-[#eee7e6] dark:border-white/10 bg-white/40 dark:bg-white/5 group shadow-sm">
                <Link href="/browse" className="block relative w-full overflow-hidden" title="Explore Collection">
                  <img
                    src={slide.image}
                    alt={slide.highlight}
                    className="w-full h-80 sm:h-[460px] md:h-[500px] lg:h-[520px] xl:h-[560px] object-cover transition-all duration-700 group-hover:scale-102"
                  />
                </Link>

                {/* Authenticity Floating Badge */}
                <Link href="/browse" className="absolute top-4 right-4 bg-white/95 dark:bg-[#141114]/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#eee7e6] dark:border-white/10 flex items-center gap-2 hover:border-[#191416] dark:hover:border-white transition-colors">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <div>
                    <p className="text-[11px] font-medium text-slate-900 dark:text-white leading-tight">Authentic</p>
                  </div>
                </Link>

                {/* Bottom Highlight Preview Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-[#141114]/95 backdrop-blur-md p-3.5 rounded-xl border border-[#eee7e6] dark:border-white/10 flex items-center justify-between">
                  <Link href="/browse" className="block flex-1 min-w-0 pr-3">
                    <span className="text-[10px] uppercase font-medium text-[#82757a] tracking-wider">
                      Featured
                    </span>
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate max-w-[220px] sm:max-w-xs md:max-w-md hover:text-[#b84357] transition-colors">
                      {slide.highlight}
                    </h3>
                    <p className="text-xs text-[#191416] dark:text-white font-semibold mt-0.5">
                      {slide.price} <span className="line-through text-slate-400 text-[10px] font-normal ml-1">{slide.oldPrice}</span>
                    </p>
                  </Link>

                  <Link
                    href="/browse"
                    className="p-2 rounded-lg bg-[#191416] hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-black transition-all shrink-0"
                    title="View item"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
