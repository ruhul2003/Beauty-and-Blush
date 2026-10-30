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
      desc: "On all orders over $50",
      href: "/browse"
    },
    {
      icon: Award,
      title: "HIGH QUALITY",
      desc: "Premium quality products",
      href: "/browse"
    },
    {
      icon: RotateCcw,
      title: "EASY RETURNS",
      desc: "30 days money back",
      href: "/browse"
    },
    {
      icon: ShieldCheck,
      title: "SECURE PAYMENT",
      desc: "100% secure checkout",
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
        className="rounded-2xl sm:rounded-3xl bg-white/45 dark:bg-[#140c16]/50 backdrop-blur-2xl backdrop-saturate-180 border border-white/60 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_12px_35px_rgba(0,0,0,0.5)] p-4 sm:p-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
      >
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Link 
                href={item.href}
                className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/40 dark:bg-white/5 hover:bg-white/75 dark:hover:bg-white/10 border border-white/50 dark:border-white/5 transition-all duration-200 group h-full shadow-xs backdrop-blur-md"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/60 dark:border-white/10 bg-white/70 dark:bg-white/10 flex items-center justify-center text-[#191416] dark:text-white shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                  <Icon className="w-4 h-4 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold tracking-wide text-[#191416] dark:text-white uppercase">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#73676c] dark:text-slate-400 mt-0.5">
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
