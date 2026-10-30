"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export function PromoGrid() {
  return (
    <section className="py-8 sm:py-12 overflow-hidden">
      <div className="w-[90%] mx-auto px-2 sm:px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Card 1: Special Offer - Skincare */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -4 }}
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white/50 dark:bg-[#140c16]/55 backdrop-blur-2xl backdrop-saturate-180 border border-white/70 dark:border-white/10 p-6 sm:p-8 flex flex-col justify-between min-h-[230px] sm:min-h-[260px] group shadow-[0_10px_35px_rgba(0,0,0,0.04)] hover:shadow-[0_18px_45px_rgba(184,67,87,0.12)] hover:border-[#b84357]/40 transition-all"
          >
            {/* Background Product Image */}
            <Link href="/browse?category=Skincare" className="absolute right-0 top-0 bottom-0 w-1/2 sm:w-1/2 lg:w-[48%] overflow-hidden opacity-90 group-hover:scale-105 transition-transform duration-700 block">
              <img
                src="/images/promo-skincare.jpg"
                alt="Skincare Special Offer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent dark:from-[#140c16]/95 dark:via-[#140c16]/60" />
            </Link>

            {/* Left Content */}
            <div className="relative z-10 max-w-[260px] sm:max-w-[320px] lg:max-w-[360px] space-y-3">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-[#b84357] dark:text-rose-300 bg-white/60 dark:bg-white/10 backdrop-blur-md border border-white/70 dark:border-white/10 shadow-xs">
                Curated Offer
              </span>

              <Link href="/browse?category=Skincare" className="block">
                <h3 className="text-xl sm:text-2xl font-serif font-normal text-[#191416] dark:text-white leading-tight transition-colors">
                  Up To 30% Off <br />
                  <span className="font-semibold text-[#b84357] dark:text-rose-300">Skincare Essentials</span>
                </h3>
              </Link>

              <div className="pt-2">
                <Link
                  href="/browse?category=Skincare"
                  className="px-5 py-2.5 text-xs tracking-wider uppercase font-bold rounded-xl bg-[#b84357] hover:bg-[#a13649] text-white inline-flex items-center gap-2 shadow-md shadow-[#b84357]/25 active:scale-95 transition-all"
                >
                  <span>SHOP NOW</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Card 2: New Arrivals - Makeup */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white/50 dark:bg-[#140c16]/55 backdrop-blur-2xl backdrop-saturate-180 border border-white/70 dark:border-white/10 p-6 sm:p-8 flex flex-col justify-between min-h-[230px] sm:min-h-[260px] group shadow-[0_10px_35px_rgba(0,0,0,0.04)] hover:shadow-[0_18px_45px_rgba(184,67,87,0.12)] hover:border-[#b84357]/40 transition-all"
          >
            {/* Background Product Image */}
            <Link href="/browse?category=Makeup" className="absolute right-0 top-0 bottom-0 w-1/2 sm:w-1/2 lg:w-[48%] overflow-hidden opacity-90 group-hover:scale-105 transition-transform duration-700 block">
              <img
                src="/images/promo-makeup.jpg"
                alt="Makeup New Arrivals"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent dark:from-[#140c16]/95 dark:via-[#140c16]/60" />
            </Link>

            {/* Left Content */}
            <div className="relative z-10 max-w-[260px] sm:max-w-[320px] lg:max-w-[360px] space-y-3">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-[#b84357] dark:text-rose-300 bg-white/60 dark:bg-white/10 backdrop-blur-md border border-white/70 dark:border-white/10 shadow-xs">
                New Arrivals
              </span>

              <Link href="/browse?category=Makeup" className="block">
                <h3 className="text-xl sm:text-2xl font-serif font-normal text-[#191416] dark:text-white leading-tight transition-colors">
                  Radiant Glow <br />
                  <span className="font-semibold text-[#b84357] dark:text-rose-300">Makeup Palette</span>
                </h3>
              </Link>

              <div className="pt-2">
                <Link
                  href="/browse?category=Makeup"
                  className="px-5 py-2.5 text-xs tracking-wider uppercase font-bold rounded-xl bg-[#b84357] hover:bg-[#a13649] text-white inline-flex items-center gap-2 shadow-md shadow-[#b84357]/25 active:scale-95 transition-all"
                >
                  <span>SHOP NOW</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
