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
    <div className="py-8 my-4 overflow-hidden">
      <div className="w-[95%] sm:w-[92%] max-w-[1500px] mx-auto px-2 sm:px-4">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {assurances.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={idx}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="glass-slab p-4 sm:p-5 flex items-center gap-3.5"
              >
                <div className="glass-well w-10 h-10 rounded-2xl flex items-center justify-center text-[#b84357] dark:text-rose-300 shrink-0">
                  <Icon className="w-4.5 h-4.5 stroke-[1.8]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#181416] dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
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
