"use client";

import React, { useState, useEffect } from 'react';
import { HeroBanner } from '@/components/HeroBanner';
import { TrustBadges } from '@/components/TrustBadges';
import { PromoGrid } from '@/components/PromoGrid';
import { CategoryShowcase } from '@/components/CategoryShowcase';
import { TrendingProducts } from '@/components/TrendingProducts';
import { CommunityStats } from '@/components/CommunityStats';
import { api } from '@/lib/api';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/products');
      setProducts(res.data || []);
    } catch (err) {
      console.error('Failed to load products', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Showcase Section */}
      <HeroBanner />

      {/* Trust & Authenticity Badges */}
      <TrustBadges />

      {/* Category Tiles Showcase */}
      <CategoryShowcase />

      {/* Seasonal Promo Deals Grid */}
      <PromoGrid />

      {/* Community Social Proof Bar */}
      <CommunityStats />

      {/* Trending Products with Category Filter Pills */}
      <TrendingProducts products={products} />
    </div>
  );
}
