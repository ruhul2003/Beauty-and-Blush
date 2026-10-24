"use client";

import React, { useState, useEffect } from 'react';
import { HeroBanner } from '@/components/HeroBanner';
import { TrustBadges } from '@/components/TrustBadges';
import { CategoryShowcase } from '@/components/CategoryShowcase';
import { TrendingProducts } from '@/components/TrendingProducts';
import { PromoGrid } from '@/components/PromoGrid';
import { InstagramFeed } from '@/components/InstagramFeed';
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
      console.warn('Using local curated catalog', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* 1. Hero Showcase Section */}
      <HeroBanner />

      {/* 2. Value Proposition Strip (4 items) */}
      <TrustBadges />

      {/* 3. Circular Shop by Category Showcase */}
      <CategoryShowcase />

      {/* 4. Best Sellers Products Carousel / Grid */}
      <TrendingProducts products={products} />

      {/* 5. Dual Promo Banners (Skincare & Makeup) */}
      <PromoGrid />

      {/* 6. Instagram Social Proof Gallery */}
      <InstagramFeed />
    </div>
  );
}
