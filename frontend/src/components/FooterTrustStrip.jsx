"use client";

import React from 'react';
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
    <div className="bg-[#faeeeb] dark:bg-[#180e17] border-y border-[#fae0e4] dark:border-rose-950/60 py-6 transition-colors">
      <div className="w-[90%] mx-auto px-2 sm:px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {assurances.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white dark:bg-rose-950/40 border border-[#f5c6cf] dark:border-rose-900/40 flex items-center justify-center text-[#c94d64] shrink-0">
                  <Icon className="w-4 h-4 stroke-[1.8]" />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#23171e] dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-[#7d646f] dark:text-slate-400 mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
