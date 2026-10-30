"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const categories = [
  {
    name: 'SKINCARE',
    slug: 'Skincare',
    image: '/images/serum.jpg',
    desc: 'Hydrating serums & creams'
  },
  {
    name: 'MAKEUP',
    slug: 'Makeup',
    image: '/images/promo-makeup.jpg',
    desc: 'Lipsticks, palettes & blushes'
  },
  {
    name: 'HAIRCARE',
    slug: 'Haircare',
    image: '/images/haircare.jpg',
    desc: 'Botanical oils & masks'
  },
  {
    name: 'ACCESSORIES',
    slug: 'Accessories',
    image: '/images/brushes.jpg',
    desc: 'Pro rose gold brush sets'
  },
  {
    name: 'FRAGRANCE',
    slug: 'Fragrance',
    image: '/images/perfume.jpg',
    desc: 'Designer Eau de Parfum'
  }
];

export function CategoryShowcase() {
  return (
    <section className="py-12 md:py-16 overflow-hidden">
      <div className="w-[95%] sm:w-[92%] max-w-[1500px] mx-auto px-2 sm:px-4">
        
        {/* Section Heading with Clay-Glass Pill */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12 flex flex-col items-center"
        >
          <span className="glass-pill px-4 py-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.24em] font-bold text-[#b84357] dark:text-rose-300 shadow-xs mb-3">
            Curated Collections
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#181416] dark:text-white font-bold tracking-tight">
            Shop by Category
          </h2>
        </motion.div>

        {/* Circular Liquid Glass Pods */}
        <div className="flex sm:grid sm:grid-cols-5 gap-6 sm:gap-8 overflow-x-auto pb-4 pt-1 px-2 no-scrollbar snap-x snap-mandatory justify-start sm:justify-items-center">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.96 }}
              className="shrink-0 snap-item w-32 sm:w-auto"
            >
              <Link
                href={`/browse?category=${cat.slug}`}
                className="group flex flex-col items-center text-center w-full"
              >
                {/* Circular Liquid Glass Pod with pronounced 3D Depth */}
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full p-2 bg-white/90 dark:bg-white/[0.1] backdrop-blur-2xl border-2 border-white dark:border-white/25 shadow-[0_18px_40px_-5px_rgba(0,0,0,0.14),0_6px_16px_-2px_rgba(0,0,0,0.08),inset_0_3px_2px_rgba(255,255,255,1),inset_0_-3px_3px_rgba(0,0,0,0.06)] group-hover:shadow-[0_26px_55px_-5px_rgba(184,67,87,0.35),0_10px_20px_-2px_rgba(184,67,87,0.22),inset_0_3px_2px_rgba(255,255,255,1)] group-hover:border-[#b84357]/40 transition-all duration-300">
                  <div className="w-full h-full rounded-full overflow-hidden shadow-inner">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Title & Link */}
                <div className="mt-3.5 space-y-1">
                  <h3 className="text-xs sm:text-[13px] font-bold tracking-wider text-[#181416] dark:text-white uppercase group-hover:text-[#b84357] dark:group-hover:text-rose-300 transition-colors font-serif">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {cat.desc}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
