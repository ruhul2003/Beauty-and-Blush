"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export function PromoGrid() {
  return (
    <section className="py-8 sm:py-12 overflow-hidden">
      <div className="w-[95%] sm:w-[92%] max-w-[1500px] mx-auto px-2 sm:px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Card 1: Electric Blue-Violet Frosted Glass Card (Signature Reference Style) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -6 }}
            className="glass-gradient-vivid relative p-7 sm:p-9 min-h-[260px] sm:min-h-[290px] flex flex-col justify-between overflow-hidden group shadow-2xl"
          >
            {/* Background Product Image with Gradient Mask */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 sm:w-[48%] overflow-hidden opacity-40 group-hover:opacity-50 group-hover:scale-108 transition-all duration-700 pointer-events-none">
              <img
                src="/images/promo-skincare.jpg"
                alt="Skincare Special Offer"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Glowing Refraction Orb */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/20 rounded-full blur-2xl pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 max-w-[280px] sm:max-w-[340px] space-y-3">
              <span className="glass-pill inline-block px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-900 bg-white/90 shadow-xs">
                Clinical Formulations
              </span>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
                Up To 30% Off <br />
                <span className="text-cyan-200">Dewy Barrier Serums</span>
              </h3>

              <p className="text-xs text-white/85 leading-relaxed">
                Hyaluronic acid & 10% pure niacinamide for luminous glass skin.
              </p>
            </div>

            <div className="pt-4 relative z-10">
              <Link
                href="/browse?category=Skincare"
                className="px-6 py-3.5 text-xs tracking-wider uppercase font-bold rounded-full bg-white text-indigo-700 hover:bg-slate-100 inline-flex items-center gap-2 shadow-[0_12px_24px_-4px_rgba(0,0,0,0.22),0_4px_10px_rgba(0,0,0,0.12),inset_0_2px_1px_#ffffff,inset_0_-2.5px_2px_rgba(0,0,0,0.1)] hover:scale-105 active:scale-95 transition-all"
              >
                <span>EXPLORE SKINCARE</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Card 2: Iridescent Rose-Lilac-Cyan Frosted Glass Card (Signature Reference Style) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -6 }}
            className="glass-gradient-iridescent relative p-7 sm:p-9 min-h-[260px] sm:min-h-[290px] flex flex-col justify-between overflow-hidden group shadow-2xl"
          >
            {/* Floating Accent Dots from Reference Image */}
            <div className="absolute top-4 right-4 w-3.5 h-3.5 rounded-full bg-amber-300 border border-white shadow-md z-20" />
            
            {/* Background Product Image with Gradient Mask */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 sm:w-[48%] overflow-hidden opacity-40 group-hover:opacity-50 group-hover:scale-108 transition-all duration-700 pointer-events-none">
              <img
                src="/images/promo-makeup.jpg"
                alt="Makeup New Arrivals"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Diagonal Ribbon Highlight */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-white/30 to-transparent opacity-60 pointer-events-none transform -skew-y-6" />

            {/* Content */}
            <div className="relative z-10 max-w-[280px] sm:max-w-[340px] space-y-3">
              <span className="glass-pill inline-block px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-rose-900 bg-white/90 shadow-xs">
                Trending Rouge
              </span>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
                Radiant Velvet <br />
                <span className="text-pink-100">Blushes & Palettes</span>
              </h3>

              <p className="text-xs text-white/85 leading-relaxed">
                Rare Beauty Soft Pinch, Dior Addict & designer cosmetic palettes.
              </p>
            </div>

            <div className="pt-4 relative z-10">
              <Link
                href="/browse?category=Makeup"
                className="px-6 py-3.5 text-xs tracking-wider uppercase font-bold rounded-full bg-white text-rose-700 hover:bg-slate-100 inline-flex items-center gap-2 shadow-[0_12px_24px_-4px_rgba(0,0,0,0.22),0_4px_10px_rgba(0,0,0,0.12),inset_0_2px_1px_#ffffff,inset_0_-2.5px_2px_rgba(0,0,0,0.1)] hover:scale-105 active:scale-95 transition-all"
              >
                <span>SHOP MAKEUP</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
