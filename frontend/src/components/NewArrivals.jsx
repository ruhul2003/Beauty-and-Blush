"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ARRIVALS = [
  {
    id: "arrival-1",
    tag: "FALL COLLECTION",
    title: "Oversized Streetwear Hoodie & Beige Set",
    price: "৳3,650",
    bgClass: "bg-[#fde7e7] dark:bg-[#2b1820]",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=900&q=85",
    alt: "Streetwear hoodie style",
    href: "/browse?category=Makeup",
    buttonText: "SHOP NOW"
  },
  {
    id: "arrival-2",
    tag: "FALL COLLECTION",
    title: "Minimalist Crisp Cotton Top & Gold Chain",
    price: "৳2,250",
    bgClass: "bg-[#f3e8fa] dark:bg-[#25172d]",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85",
    alt: "Minimalist luxury white top",
    href: "/browse?category=Skincare",
    buttonText: "SHOP NOW"
  },
  {
    id: "arrival-3",
    tag: "FALL COLLECTION",
    title: "Classic Striped Breton Tee & Selvedge Denim",
    price: "৳1,950",
    bgClass: "bg-[#e2f0fb] dark:bg-[#152331]",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=85",
    alt: "Striped casual elegance",
    href: "/browse?category=Fragrance",
    buttonText: "SHOP NOW"
  },
  {
    id: "arrival-4",
    tag: "FALL COLLECTION",
    title: "Editorial Haute Velvet Trench & Slip Dress",
    price: "৳4,800",
    bgClass: "bg-[#e5f5ec] dark:bg-[#162920]",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
    alt: "High-fashion model apparel",
    href: "/browse?category=Makeup",
    buttonText: "SHOP NOW"
  },
  {
    id: "arrival-5",
    tag: "FALL COLLECTION",
    title: "Chunky Ribbed Knitwear & Cashmere Flannel",
    price: "৳3,400",
    bgClass: "bg-[#faf0e1] dark:bg-[#2c2215]",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=85",
    alt: "Atelier collection knitwear",
    href: "/browse?category=Accessories",
    buttonText: "SHOP NOW"
  }
];

export function NewArrivals() {
  const [startIndex, setStartIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Maximum start index so 3 cards are visible on desktop
  const maxIndex = ARRIVALS.length - 3;

  const handlePrev = () => {
    setStartIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const jumpToSlide = (idx) => {
    setStartIndex(Math.max(0, Math.min(idx, maxIndex)));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
  };

  return (
    <section className="py-12 sm:py-16 overflow-hidden">
      <div className="w-[95%] sm:w-[92%] max-w-[1500px] mx-auto px-2 sm:px-4 space-y-8 sm:space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-[#181416] dark:text-white">
            NEW ARRIVALS
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto font-normal">
            Check out our latest collection designed for comfort and elegance
          </p>
        </div>

        {/* Carousel Container with Side Navigation Arrows */}
        <div 
          className="relative px-2 sm:px-6"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous arrivals"
            className="absolute left-0 sm:left-1 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/85 dark:bg-[#181416]/85 backdrop-blur-md shadow-lg border border-black/5 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:scale-110 active:scale-95 transition-all cursor-pointer group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next arrivals"
            className="absolute right-0 sm:right-1 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/85 dark:bg-[#181416]/85 backdrop-blur-md shadow-lg border border-black/5 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:scale-110 active:scale-95 transition-all cursor-pointer group"
          >
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Cards Display Grid / Slider */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {ARRIVALS.slice(startIndex, startIndex + 3).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className={`relative rounded-[32px] sm:rounded-[36px] overflow-hidden ${item.bgClass} min-h-[460px] sm:min-h-[500px] lg:min-h-[520px] flex flex-col justify-end shadow-md group transition-all`}
              >
                {/* Model / Product Photograph */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                    loading="lazy"
                  />
                  {/* Subtle Top & Inner Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/25 pointer-events-none" />
                </div>

                {/* Floating Frosted Glass Bottom Overlay Card */}
                <div className="relative z-10 mx-3 sm:mx-4 mb-3 sm:mb-4 p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-black/65 backdrop-blur-md border border-white/60 dark:border-white/15 shadow-lg text-center space-y-2">
                  <span className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-slate-600 dark:text-slate-300">
                    {item.tag}
                  </span>

                  <h3 className="text-sm sm:text-base font-bold text-[#181416] dark:text-white leading-snug line-clamp-1">
                    {item.title}
                  </h3>

                  <div className="pt-1 flex items-center justify-center gap-3">
                    {item.price && (
                      <span className="text-xs sm:text-sm font-bold text-[#e06d84] dark:text-rose-300">
                        {item.price}
                      </span>
                    )}
                    <Link
                      href={item.href}
                      className="inline-flex items-center justify-center px-5 sm:px-6 py-1.5 sm:py-2 rounded-lg bg-[#edd59e] hover:bg-[#e4ca8c] text-[#181416] font-bold text-[10px] sm:text-xs uppercase tracking-wider shadow-xs hover:shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <span>{item.buttonText}</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 pt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => jumpToSlide(idx)}
                aria-label={`Jump to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  startIndex === idx
                    ? 'w-7 bg-[#181416] dark:bg-white'
                    : 'w-2 bg-slate-300 dark:bg-white/30 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
