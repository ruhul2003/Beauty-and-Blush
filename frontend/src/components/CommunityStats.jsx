"use client";

import React from 'react';
import { Sparkles, Users, MapPin, Award } from 'lucide-react';

export function CommunityStats() {
  const stats = [
    { label: "Verified Authentications", value: "12,850+", icon: Sparkles },
    { label: "Active Beauty Members", value: "8,400+", icon: Users },
    { label: "Districts Covered", value: "64 Districts", icon: MapPin },
    { label: "Seller Trust Score", value: "4.95 / 5.0", icon: Award }
  ];

  return (
    <div className="py-6 bg-gradient-to-r from-rose-900 via-rose-950 to-slate-950 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-auto max-w-7xl my-8 px-6 shadow-2xl border border-rose-800/40">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-rose-400">
                <Icon className="w-4 h-4" />
                <span className="text-xl sm:text-2xl font-bold font-serif text-white">{s.value}</span>
              </div>
              <p className="text-[11px] text-rose-200/80 font-medium tracking-wide uppercase">{s.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
