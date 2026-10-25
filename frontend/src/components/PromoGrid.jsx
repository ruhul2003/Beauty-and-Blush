"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function PromoGrid() {
  return (
    <section className="py-8 sm:py-12">
      <div className="w-[90%] mx-auto px-2 sm:px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Card 1: Special Offer - Skincare */}
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#faece9] dark:bg-[#1a0f19] border border-[#f7dade] dark:border-rose-950/60 p-6 sm:p-8 flex flex-col justify-between min-h-[240px] sm:min-h-[270px] group shadow-sm hover:shadow-md transition-shadow">
            {/* Background Product Image */}
            <Link href="/browse?category=Skincare" className="absolute right-0 top-0 bottom-0 w-1/2 sm:w-1/2 lg:w-[48%] overflow-hidden opacity-85 group-hover:scale-105 transition-transform duration-700 block">
              <img
                src="/images/promo-skincare.jpg"
                alt="Skincare Special Offer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#faece9] via-[#faece9]/50 to-transparent dark:from-[#1a0f19] dark:via-[#1a0f19]/50" />
            </Link>

            {/* Left Content */}
            <div className="relative z-10 max-w-[260px] sm:max-w-[320px] lg:max-w-[360px] space-y-3">
              <Link href="/browse?category=Skincare" className="block">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#c94d64] dark:text-[#f4728d]">
                  SPECIAL OFFER
                </span>

                <h3 className="text-xl sm:text-2xl lg:text-[26px] font-serif font-normal text-[#23171e] dark:text-white leading-tight hover:text-[#c94d64] transition-colors">
                  Up To 30% Off <br />
                  <span className="text-[#23171e] dark:text-white">On Skincare Products</span>
                </h3>
              </Link>

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
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#faece9] dark:bg-[#1a0f19] border border-[#f7dade] dark:border-rose-950/60 p-6 sm:p-8 flex flex-col justify-between min-h-[240px] sm:min-h-[270px] group shadow-sm hover:shadow-md transition-shadow">
            {/* Background Product Image */}
            <Link href="/browse?category=Makeup" className="absolute right-0 top-0 bottom-0 w-1/2 sm:w-1/2 lg:w-[48%] overflow-hidden opacity-85 group-hover:scale-105 transition-transform duration-700 block">
              <img
                src="/images/promo-makeup.jpg"
                alt="Makeup New Arrivals"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#faece9] via-[#faece9]/50 to-transparent dark:from-[#1a0f19] dark:via-[#1a0f19]/50" />
            </Link>

            {/* Left Content */}
            <div className="relative z-10 max-w-[260px] sm:max-w-[320px] lg:max-w-[360px] space-y-3">
              <Link href="/browse?category=Makeup" className="block">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#c94d64] dark:text-[#f4728d]">
                  NEW ARRIVALS
                </span>

                <h3 className="text-xl sm:text-2xl lg:text-[26px] font-serif font-normal text-[#23171e] dark:text-white leading-tight hover:text-[#c94d64] transition-colors">
                  Fresh & Trendy <br />
                  <span className="text-[#23171e] dark:text-white">Makeup Collection</span>
                </h3>
              </Link>

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
