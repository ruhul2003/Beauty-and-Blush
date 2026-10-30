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
    <section className="w-[95%] sm:w-[92%] max-w-[1500px] mx-auto my-6 sm:my-8 overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link 
                href={item.href}
                className="glass-slab glass-slab-interactive p-4 sm:p-5 flex items-center gap-3.5 h-full group"
              >
                {/* Recessed Concave Icon Well (Reference Image Style) */}
                <div className="glass-well w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 text-[#b84357] dark:text-rose-300 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold tracking-tight text-[#181416] dark:text-white uppercase font-serif">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
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
