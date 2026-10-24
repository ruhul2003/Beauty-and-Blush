"use client";

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Award, CheckCircle } from 'lucide-react';

export function HeroBanner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-rose-100/60 via-rose-50/30 to-transparent dark:from-[#1a0c1a] dark:via-[#120a14] dark:to-transparent py-12 md:py-20">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-300/20 dark:bg-rose-900/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-amber-200/20 dark:bg-amber-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/80 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>Bangladesh's #1 Luxury Cosmetics Marketplace</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-slate-900 dark:text-white leading-[1.15] tracking-tight">
              Where True Beauty Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600">Uncompromising Authenticity</span>.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Buy and sell sealed & gently swatched luxury makeup, clinical skincare, and authentic designer fragrances. Every listing verified with physical batch-code inspection.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/browse"
                className="btn-rose-primary px-7 py-3 text-sm font-semibold flex items-center gap-2"
              >
                <span>Shop Verified Deals</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/sell"
                className="btn-rose-outline px-6 py-3 text-sm font-semibold flex items-center gap-2"
              >
                <span>Open Your Boutique</span>
              </Link>
            </div>

            {/* Micro Trust Pills */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>100% Genuine Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-rose-500" />
                <span>Batch Code Checked</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Cash on Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              {/* Luxury Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-rose-200/80 dark:border-rose-900/40 bg-white dark:bg-[#1a0f1c] p-2">
                <img
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80"
                  alt="Rare Beauty Liquid Blush Collection"
                  className="w-full h-80 sm:h-96 object-cover rounded-2xl"
                />

                {/* Floating Authentic Stamp */}
                <div className="absolute top-6 right-6 bg-white/95 dark:bg-[#120a14]/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-xl border border-rose-100 dark:border-rose-900/40 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">Batch Code Verified</p>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">100% Genuine</p>
                  </div>
                </div>

                {/* Bottom Highlight Pill */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-[#120a14]/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-rose-100 dark:border-rose-900/40 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-rose-500">Trending Now</span>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">Rare Beauty Soft Pinch Blush</h3>
                    <p className="text-xs text-rose-600 dark:text-rose-400 font-bold">৳3,200 <span className="line-through text-slate-400 text-[10px]">৳3,800</span></p>
                  </div>
                  <Link
                    href="/product/bnb-prod-001"
                    className="p-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
