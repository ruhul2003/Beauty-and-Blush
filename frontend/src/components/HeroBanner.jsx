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
    <section className="relative overflow-hidden bg-gradient-to-br from-[#fdf6f4] via-[#faeaeb] to-[#fbf4f2] dark:from-[#180d16] dark:via-[#140a12] dark:to-[#1b0e19] pt-6 pb-12 md:py-16 transition-colors">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-200/30 dark:bg-rose-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#fae0e4]/40 dark:bg-rose-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-[90%] mx-auto px-2 sm:px-4 lg:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-5 space-y-5 text-center lg:text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2">
              <span className="text-[#c94d64] dark:text-[#f4728d] text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em]">
                {slide.tag}
              </span>
            </div>

            {/* Main Luxury Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-[58px] font-serif font-normal text-[#1e1319] dark:text-white leading-[1.12] tracking-tight">
              {slide.titleLine1} <br className="hidden sm:inline" />
              {slide.titleLine2} <br />
              <span className="text-[#c94d64] dark:text-[#f4728d] font-serif italic">
                {slide.titleAccent}
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#6d5761] dark:text-slate-300 max-w-lg mx-auto lg:mx-0 leading-relaxed font-normal">
              {slide.desc}
            </p>

            {/* Call To Actions */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/browse"
                className="btn-berry-primary px-8 py-3 text-xs tracking-wider uppercase font-bold flex items-center gap-2 shadow-lg hover:shadow-xl active:scale-95 transition-all"
              >
                <span>SHOP NOW</span>
              </Link>
              
              <Link
                href="/browse"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#24171e] dark:text-white hover:text-[#c94d64] dark:hover:text-[#f4728d] transition-colors py-3 px-2 group"
              >
                <span>BROWSE COLLECTIONS</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#c94d64]" />
              </Link>
            </div>

            {/* Slide Pagination Indicator Dots */}
            <div className="flex items-center justify-center lg:justify-start gap-2 pt-4">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentSlide === idx 
                      ? 'w-7 bg-[#c94d64]' 
                      : 'w-2.5 bg-[#f0cdd4] hover:bg-[#c94d64]/60'
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
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 dark:border-rose-950/40 bg-white/40 dark:bg-rose-950/10 group">
                <Link href="/browse" className="block relative w-full overflow-hidden" title="Explore Collection">
                  <img
                    src={slide.image}
                    alt={slide.highlight}
                    className="w-full h-80 sm:h-[460px] md:h-[500px] lg:h-[530px] xl:h-[580px] object-cover transition-all duration-700 group-hover:scale-105"
                  />
                </Link>

                {/* Authenticity Floating Badge */}
                <Link href="/browse" className="absolute top-4 right-4 bg-white/95 dark:bg-[#150a16]/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-[#fae0e4] dark:border-rose-900/40 flex items-center gap-2.5 hover:border-[#c94d64] transition-colors">
                  <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">100% Authentic</p>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Batch Code Checked</p>
                  </div>
                </Link>

                {/* Bottom Highlight Preview Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-[#150a16]/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-[#fae0e4] dark:border-rose-900/40 flex items-center justify-between">
                  <Link href="/browse" className="block flex-1 min-w-0 pr-3">
                    <span className="text-[10px] uppercase font-bold text-[#c94d64] tracking-wider">
                      Featured Pick
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate max-w-[220px] sm:max-w-xs md:max-w-md hover:text-[#c94d64] transition-colors">
                      {slide.highlight}
                    </h3>
                    <p className="text-xs text-[#c94d64] font-bold mt-0.5">
                      {slide.price} <span className="line-through text-slate-400 text-[10px] font-normal">{slide.oldPrice}</span>
                    </p>
                  </Link>

                  <Link
                    href="/browse"
                    className="p-2.5 rounded-xl bg-[#c94d64] hover:bg-[#b53e54] text-white active:scale-95 transition-all shadow-md shrink-0"
                    title="View item"
                  >
                    <ArrowRight className="w-4 h-4" />
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
