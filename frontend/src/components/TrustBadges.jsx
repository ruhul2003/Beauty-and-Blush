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
    <section className="py-8 w-[90%] mx-auto border-y border-[#eee7e6] dark:border-white/10 my-4 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
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
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#faf8f7] dark:hover:bg-white/5 transition-colors duration-200 group h-full"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#eee7e6] dark:border-white/10 bg-[#f7f4f3] dark:bg-white/5 flex items-center justify-center text-[#191416] dark:text-white shrink-0 group-hover:scale-105 transition-transform">
                  <Icon className="w-4 h-4 stroke-[1.5]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[11px] font-semibold tracking-wider uppercase text-[#191416] dark:text-white truncate">
                    {item.title}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-[#73676c] dark:text-slate-400 mt-0.5 truncate">
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
