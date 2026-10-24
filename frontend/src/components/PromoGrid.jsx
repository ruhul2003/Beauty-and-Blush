"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function PromoGrid() {
  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Card 1: Special Offer - Skincare */}
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#faece9] dark:bg-[#1a0f19] border border-[#f7dade] dark:border-rose-950/60 p-6 sm:p-8 flex flex-col justify-between min-h-[220px] sm:min-h-[260px] group shadow-sm hover:shadow-md transition-shadow">
            {/* Background Product Image */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 sm:w-5/12 overflow-hidden pointer-events-none opacity-85 group-hover:scale-105 transition-transform duration-700">
              <img
                src="/images/promo-skincare.jpg"
                alt="Skincare Special Offer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#faece9] via-[#faece9]/50 to-transparent dark:from-[#1a0f19] dark:via-[#1a0f19]/50" />
            </div>

            {/* Left Content */}
            <div className="relative z-10 max-w-[240px] sm:max-w-[280px] space-y-3">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#c94d64] dark:text-[#f4728d]">
                SPECIAL OFFER
              </span>

              <h3 className="text-xl sm:text-2xl lg:text-[26px] font-serif font-normal text-[#23171e] dark:text-white leading-tight">
                Up To 30% Off <br />
                <span className="text-[#23171e] dark:text-white">On Skincare Products</span>
              </h3>

              <div className="pt-2">
                <Link
                  href="/browse?category=Skincare"
                  className="btn-berry-primary px-6 py-2.5 text-xs tracking-wider uppercase font-bold inline-flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                >
                  <span>SHOP NOW</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: New Arrivals - Makeup */}
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#faece9] dark:bg-[#1a0f19] border border-[#f7dade] dark:border-rose-950/60 p-6 sm:p-8 flex flex-col justify-between min-h-[220px] sm:min-h-[260px] group shadow-sm hover:shadow-md transition-shadow">
            {/* Background Product Image */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 sm:w-5/12 overflow-hidden pointer-events-none opacity-85 group-hover:scale-105 transition-transform duration-700">
              <img
                src="/images/promo-makeup.jpg"
                alt="Makeup New Arrivals"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#faece9] via-[#faece9]/50 to-transparent dark:from-[#1a0f19] dark:via-[#1a0f19]/50" />
            </div>

            {/* Left Content */}
            <div className="relative z-10 max-w-[240px] sm:max-w-[280px] space-y-3">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#c94d64] dark:text-[#f4728d]">
                NEW ARRIVALS
              </span>

              <h3 className="text-xl sm:text-2xl lg:text-[26px] font-serif font-normal text-[#23171e] dark:text-white leading-tight">
                Fresh & Trendy <br />
                <span className="text-[#23171e] dark:text-white">Makeup Collection</span>
              </h3>

              <div className="pt-2">
                <Link
                  href="/browse?category=Makeup"
                  className="btn-berry-primary px-6 py-2.5 text-xs tracking-wider uppercase font-bold inline-flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                >
                  <span>DISCOVER NOW</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
