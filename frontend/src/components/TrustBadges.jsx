"use client";

import React from 'react';
import { ShieldCheck, Truck, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export function TrustBadges() {
  const badges = [
    {
      icon: ShieldCheck,
      title: "100% Genuine Guaranteed",
      desc: "Batch code verification & receipt check on all listings",
      color: "text-rose-500",
      bg: "bg-rose-50 dark:bg-rose-950/30"
    },
    {
      icon: Truck,
      title: "Nationwide Courier COD",
      desc: "Fast delivery via Pathao & Steadfast with open-box check",
      color: "text-amber-500",
      bg: "bg-amber-50 dark:bg-amber-950/30"
    },
    {
      icon: Award,
      title: "Verified Boutiques & MUAs",
      desc: "Trusted Dhaka & Chittagong beauty salons and distributors",
      color: "text-purple-500",
      bg: "bg-purple-50 dark:bg-purple-950/30"
    },
    {
      icon: Sparkles,
      title: "Anti-Counterfeit Protection",
      desc: "Zero fake tolerance with full buyer money-back assurance",
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-950/30"
    }
  ];

  return (
    <div className="py-8 border-y border-rose-100 dark:border-rose-950/40 bg-white/40 dark:bg-[#120a14]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div key={idx} className="flex items-start gap-3.5 p-3 rounded-2xl hover:bg-rose-50/50 dark:hover:bg-rose-950/20 transition-colors">
                <div className={`p-3 rounded-2xl ${b.bg} ${b.color} shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                    {b.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                    {b.desc}
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
