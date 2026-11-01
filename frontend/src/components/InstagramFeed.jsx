"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

function InstagramIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function InstagramFeed() {
  const posts = [
    { image: '/images/lipstick.jpg', likes: '1.4k', alt: 'Velvet Rouge Lipstick Swatch', href: '/browse?category=Makeup' },
    { image: '/images/brushes.jpg', likes: '2.8k', alt: '10-piece Rose Gold Brush Set', href: '/browse?category=Accessories' },
    { image: '/images/hero-model.jpg', likes: '5.2k', alt: 'Dewy Skin Routine & Peonies', href: '/browse?category=Skincare' },
    { image: '/images/cream.jpg', likes: '1.9k', alt: 'Collagen Night Cream Moisture Barrier', href: '/browse?category=Skincare' },
    { image: '/images/promo-skincare.jpg', likes: '3.1k', alt: 'Hydrating Essence & Toner Routine', href: '/browse?category=Skincare' },
    { image: '/images/perfume.jpg', likes: '4.6k', alt: 'Parisian Rose Perfume Flacon', href: '/browse?category=Fragrance' }
  ];

  return (
    <section className="py-12 sm:py-16 overflow-hidden">
      <div className="w-[95%] sm:w-[92%] max-w-[1500px] mx-auto px-2 sm:px-4">
        
        {/* Section Heading with Clay-Glass Pill Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10 flex flex-col items-center"
        >
          <span className="glass-pill px-4 py-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.24em] font-bold text-[#b84357] dark:text-rose-300 shadow-xs mb-3">
            Community & Journal
          </span>
          <Link href="/browse" className="group inline-block">
            <h2 className="text-xl sm:text-2xl font-serif text-[#181416] dark:text-white font-bold tracking-tight group-hover:text-[#b84357] dark:group-hover:text-rose-300 transition-colors">
              @beautyandblush
            </h2>
          </Link>
        </motion.div>

        {/* 6 Images Grid with Clay-Glass Frames */}
        <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 overflow-x-auto pb-4 pt-1 no-scrollbar snap-x snap-mandatory">
          {posts.map((post, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="w-36 sm:w-auto shrink-0 snap-item"
            >
              <Link
                href={post.href || '/browse'}
                className="glass-slab p-1.5 block group relative aspect-square w-full rounded-[24px] overflow-hidden"
                title={post.alt}
              >
                <div className="w-full h-full rounded-[18px] overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Hover Glassy Blur Dark Overlay with Instagram Heart */}
                  <div className="absolute inset-0 bg-black/45 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-2">
                    <InstagramIcon className="w-5 h-5 mb-1 text-white/90" />
                    <div className="px-3 py-1 rounded-full flex items-center gap-1.5 text-[11px] font-bold text-white bg-black/60 backdrop-blur-md border border-white/30 shadow-md">
                      <Heart className="w-3.5 h-3.5 fill-current text-rose-300" />
                      <span>{post.likes}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
