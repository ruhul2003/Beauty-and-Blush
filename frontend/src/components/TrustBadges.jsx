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
    <section className="w-[90%] mx-auto my-6 sm:my-8 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
        className="rounded-2xl sm:rounded-3xl bg-white/60 dark:bg-[#120a15]/65 backdrop-blur-2xl border border-black/[0.05] dark:border-white/[0.08] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.7)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] p-4 sm:p-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
      >
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Link 
                href={item.href}
                className="flex items-center gap-3.5 p-3 rounded-2xl bg-black/[0.015] dark:bg-white/[0.02] hover:bg-black/[0.035] dark:hover:bg-white/[0.05] border border-black/[0.03] dark:border-white/[0.05] transition-all duration-200 group h-full"
              >
                <div className="w-10 h-10 rounded-2xl border border-black/[0.05] dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.06] text-[#b84357] dark:text-rose-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                  <Icon className="w-4 h-4 stroke-[1.8]" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold tracking-wide text-slate-900 dark:text-white uppercase font-serif">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
