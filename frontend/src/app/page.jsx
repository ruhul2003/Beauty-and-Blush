"use client";

import React from 'react';
import { HeroBanner } from '@/components/HeroBanner';
import { TrustBadges } from '@/components/TrustBadges';
import { CategoryShowcase } from '@/components/CategoryShowcase';
import { PromoGrid } from '@/components/PromoGrid';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* 1. Hero Showcase Section */}
      <HeroBanner />

      {/* 2. Value Proposition Strip (4 items) */}
      <TrustBadges />

      {/* 3. Circular Shop by Category Showcase */}
      <CategoryShowcase />

      {/* 4. Dual Promo Banners (Skincare & Makeup) */}
      <PromoGrid />
    </div>
  );
}
