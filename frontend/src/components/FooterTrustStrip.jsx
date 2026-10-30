"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Rabbit, Leaf, Droplets, Headphones } from 'lucide-react';

export function FooterTrustStrip() {
  const assurances = [
    {
      icon: Rabbit,
      title: "CRUELTY FREE",
      desc: "We never test on animals"
    },
    {
      icon: Leaf,
      title: "NATURAL INGREDIENTS",
      desc: "Clean & safe for your skin"
    },
    {
      icon: Droplets,
      title: "DERMATOLOGICALLY TESTED",
      desc: "Gentle & safe formulas"
    },
    {
      icon: Headphones,
      title: "CUSTOMER SUPPORT",
      desc: "We're here to help you"
    }
  ];

  return (
    <div className="bg-white/40 dark:bg-[#0c0610]/40 backdrop-blur-xl border-y border-black/[0.05] dark:border-white/[0.08] py-6 transition-colors overflow-hidden">
      <div className="w-[90%] mx-auto px-2 sm:px-4">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {assurances.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -2 }}
                className="flex items-center gap-3 transition-transform"
              >
                <div className="w-9 h-9 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] backdrop-blur-md border border-black/[0.05] dark:border-white/[0.08] flex items-center justify-center text-[#b84357] dark:text-rose-300 shrink-0 shadow-xs">
                  <Icon className="w-4 h-4 stroke-[1.8]" />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#191416] dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
