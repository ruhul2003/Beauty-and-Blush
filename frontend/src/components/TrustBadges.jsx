"use client";

import React from 'react';
import { Truck, Award, RotateCcw, ShieldCheck } from 'lucide-react';

export function TrustBadges() {
  const items = [
    {
      icon: Truck,
      title: "FREE SHIPPING",
      desc: "On all orders over $50"
    },
    {
      icon: Award,
      title: "HIGH QUALITY",
      desc: "Premium quality products"
    },
    {
      icon: RotateCcw,
      title: "EASY RETURNS",
      desc: "30 days money back"
    },
    {
      icon: ShieldCheck,
      title: "SECURE PAYMENT",
      desc: "100% secure checkout"
    }
  ];

  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-[#fcf2f2]/90 dark:bg-[#1a0f19]/90 border border-[#fae0e4] dark:border-rose-950/60 rounded-2xl p-4 sm:p-6 shadow-sm">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-xl hover:bg-white/60 dark:hover:bg-rose-950/20 transition-all duration-200"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#f5c6cf] dark:border-rose-900/40 bg-white/80 dark:bg-rose-950/40 flex items-center justify-center text-[#c94d64] shrink-0 shadow-sm">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-[#23171e] dark:text-white truncate">
                    {item.title}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-[#7d646f] dark:text-slate-400 mt-0.5 truncate">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
