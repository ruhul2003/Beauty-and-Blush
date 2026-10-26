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
          <div className="relative rounded-xl overflow-hidden bg-[#faf8f7] dark:bg-[#141114] border border-[#eee7e6] dark:border-white/10 p-6 sm:p-8 flex flex-col justify-between min-h-[220px] sm:min-h-[250px] group shadow-none hover:shadow-sm transition-shadow">
            {/* Background Product Image */}
            <Link href="/browse?category=Skincare" className="absolute right-0 top-0 bottom-0 w-1/2 sm:w-1/2 lg:w-[48%] overflow-hidden opacity-90 group-hover:scale-103 transition-transform duration-700 block">
              <img
                src="/images/promo-skincare.jpg"
                alt="Skincare Special Offer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#faf8f7] via-[#faf8f7]/60 to-transparent dark:from-[#141114] dark:via-[#141114]/60" />
            </Link>

            {/* Left Content */}
            <div className="relative z-10 max-w-[260px] sm:max-w-[320px] lg:max-w-[360px] space-y-2.5">
              <Link href="/browse?category=Skincare" className="block">
                <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.22em] text-[#82757a]">
                  Curated Offer
                </span>

                <h3 className="text-xl sm:text-2xl font-serif font-normal text-[#191416] dark:text-white leading-tight transition-colors">
                  Up To 30% Off <br />
                  <span className="text-[#191416] dark:text-white">Skincare Essentials</span>
                </h3>
              </Link>

              <div className="pt-2">
                <Link
                  href="/browse?category=Skincare"
                  className="px-5 py-2 text-[11px] tracking-widest uppercase font-medium rounded-md bg-[#191416] hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-black inline-flex items-center gap-1.5 transition-all"
                >
                  <span>SHOP NOW</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: New Arrivals - Makeup */}
          <div className="relative rounded-xl overflow-hidden bg-[#faf8f7] dark:bg-[#141114] border border-[#eee7e6] dark:border-white/10 p-6 sm:p-8 flex flex-col justify-between min-h-[220px] sm:min-h-[250px] group shadow-none hover:shadow-sm transition-shadow">
            {/* Background Product Image */}
            <Link href="/browse?category=Makeup" className="absolute right-0 top-0 bottom-0 w-1/2 sm:w-1/2 lg:w-[48%] overflow-hidden opacity-90 group-hover:scale-103 transition-transform duration-700 block">
              <img
                src="/images/promo-makeup.jpg"
                alt="Makeup New Arrivals"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#faf8f7] via-[#faf8f7]/60 to-transparent dark:from-[#141114] dark:via-[#141114]/60" />
            </Link>

            {/* Left Content */}
            <div className="relative z-10 max-w-[260px] sm:max-w-[320px] lg:max-w-[360px] space-y-2.5">
              <Link href="/browse?category=Makeup" className="block">
                <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.22em] text-[#82757a]">
                  New Season
                </span>

                <h3 className="text-xl sm:text-2xl font-serif font-normal text-[#191416] dark:text-white leading-tight transition-colors">
                  Fresh & Trendy <br />
                  <span className="text-[#191416] dark:text-white">Makeup Edit</span>
                </h3>
              </Link>

              <div className="pt-2">
                <Link
                  href="/browse?category=Makeup"
                  className="px-5 py-2 text-[11px] tracking-widest uppercase font-medium rounded-md bg-[#191416] hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-black inline-flex items-center gap-1.5 transition-all"
                >
                  <span>DISCOVER</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
