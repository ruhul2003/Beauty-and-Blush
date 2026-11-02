"use client";

import React, { useState, useEffect } from 'react';
import { HeroBanner } from '@/components/HeroBanner';
import { TrustBadges } from '@/components/TrustBadges';
import { CategoryShowcase } from '@/components/CategoryShowcase';
import { ProductShowcase } from '@/components/ProductShowcase';
import { PromoGrid } from '@/components/PromoGrid';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen">
      {/* 1. Hero Showcase Section */}
      <HeroBanner />

      {/* 2. Value Proposition Strip (4 items) */}
      <TrustBadges />

      {/* 3. Circular Shop by Category Showcase */}
      <CategoryShowcase />

      {/* 4. Curated Products Showcase */}
      <ProductShowcase products={products} loading={loading} />

      {/* 5. Dual Promo Banners (Skincare & Makeup) */}
      <PromoGrid />
    </div>
  );
}
