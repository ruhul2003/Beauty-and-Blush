"use client";

import React, { useState } from 'react';

export function TopSellingProducts() {
  return (
    <section className="py-12 sm:py-16 overflow-hidden">
      <div className="w-[95%] sm:w-[92%] max-w-[1500px] mx-auto px-2 sm:px-4">
        {/* Top Selling Products Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-[#181416] dark:text-white">
            TOP SELLING PRODUCTS
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto font-normal">
            Explore our most celebrated luxury bags, iconic cosmetics and radiant essentials
          </p>
        </div>
      </div>
    </section>
  );
}
