"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Truck, Award, RotateCcw, ShieldCheck } from 'lucide-react';

export function TrustBadges() {
  const items = [
    {
      icon: Truck,
      title: "FREE SHIPPING",
      desc: "On all orders over ৳2,000",
      href: "/browse"
    },
    {
      icon: Award,
      title: "HIGH QUALITY",
      desc: "100% genuine verified cosmetics",
      href: "/browse"
    },
    {
      icon: RotateCcw,
      title: "EASY RETURNS",
      desc: "Hassle-free guarantee",
      href: "/browse"
    },
    {
      icon: ShieldCheck,
      title: "SECURE PAYMENT",
      desc: "Cash on delivery nationwide",
      href: "/browse"
    }
  ];

  return (
    <section className="w-[95%] sm:w-[92%] max-w-[1500px] mx-auto my-6 sm:my-8 py-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-stretch">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="h-full flex flex-col"
            >
              <Link 
                href={item.href}
                className="glass-slab glass-slab-interactive py-5 sm:py-6 px-5 sm:px-6 min-h-[94px] sm:min-h-[102px] flex items-center gap-4 h-full rounded-[24px] sm:rounded-[26px] group"
              >
                {/* Recessed Concave Icon Well (Reference Image Style) */}
                <div className="glass-well w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-[#b84357] dark:text-rose-300 group-hover:scale-108 transition-transform shadow-xs">
                  <Icon className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div className="flex flex-col justify-center min-w-0 flex-1">
                  <h3 className="text-xs sm:text-[13px] font-bold tracking-wider text-[#181416] dark:text-white uppercase font-serif leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                    {item.desc}
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
