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
    <div className="py-8 my-4">
      <div className="w-[95%] sm:w-[92%] max-w-[1500px] mx-auto px-2 sm:px-4">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch"
        >
          {assurances.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={idx}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="glass-slab py-5 sm:py-6 px-5 sm:px-6 min-h-[94px] sm:min-h-[102px] flex items-center gap-4 rounded-[24px] sm:rounded-[26px] h-full"
              >
                <div className="glass-well w-12 h-12 rounded-2xl flex items-center justify-center text-[#b84357] dark:text-rose-300 shrink-0 shadow-xs">
                  <Icon className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div className="flex flex-col justify-center min-w-0 flex-1">
                  <h4 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#181416] dark:text-white leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
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
