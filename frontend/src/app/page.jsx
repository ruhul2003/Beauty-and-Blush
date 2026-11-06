"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { HeroBanner } from '@/components/HeroBanner';
import { TrustBadges } from '@/components/TrustBadges';
import { CategoryShowcase } from '@/components/CategoryShowcase';
import { NewArrivals } from '@/components/NewArrivals';
import { TopSellingProducts } from '@/components/TopSellingProducts';
import { ProductShowcase } from '@/components/ProductShowcase';
import { PromoGrid } from '@/components/PromoGrid';
import { api } from '@/lib/api';

const FALLBACK_PRODUCTS = [
  {
    _id: "prod-hero-1",
    id: "prod-hero-1",
    title: "Rare Beauty Soft Pinch Liquid Blush",
    brand: "Rare Beauty",
    category: "Makeup",
    shade: "Joy (Radiant Peach)",
    price: 2850,
    originalPrice: 3200,
    rating: 4.9,
    images: ["https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80"],
    condition: "Brand New & Boxed",
    batchCode: "3K01",
    location: "Gulshan, Dhaka"
  },
  {
    _id: "prod-hero-2",
    id: "prod-hero-2",
    title: "The Ordinary Hyaluronic Acid 2% + B5",
    brand: "The Ordinary",
    category: "Skincare",
    shade: "Hydrating Serum 30ml",
    price: 1350,
    originalPrice: 1650,
    rating: 4.8,
    images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80"],
    condition: "Sealed",
    batchCode: "HA-921",
    location: "Banani, Dhaka"
  },
  {
    _id: "prod-hero-3",
    id: "prod-hero-3",
    title: "Dior Addict Lip Glow Color Revival",
    brand: "Dior",
    category: "Makeup",
    shade: "001 Pink Glow",
    price: 4950,
    originalPrice: 5500,
    rating: 5.0,
    images: ["https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80"],
    condition: "Brand New & Boxed",
    batchCode: "D-4182",
    location: "Dhanmondi, Dhaka"
  },
  {
    _id: "prod-hero-4",
    id: "prod-hero-4",
    title: "Chanel Chance Eau Tendre Hair & Body Mist",
    brand: "Chanel",
    category: "Fragrance",
    shade: "Eau Tendre 100ml",
    price: 8900,
    originalPrice: 9800,
    rating: 4.9,
    images: ["https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80"],
    condition: "Sealed Box",
    batchCode: "CH-5502",
    location: "Uttara, Dhaka"
  },
  {
    _id: "prod-hero-5",
    id: "prod-hero-5",
    title: "COSRX Advanced Snail 96 Mucin Power Essence",
    brand: "COSRX",
    category: "Skincare",
    shade: "Essence 100ml",
    price: 1750,
    originalPrice: 2100,
    rating: 4.9,
    images: ["https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"],
    condition: "Sealed",
    batchCode: "CX-8812",
    location: "Mirpur, Dhaka"
  },
  {
    _id: "prod-hero-6",
    id: "prod-hero-6",
    title: "Charlotte Tilbury Pillow Talk Lip Cheat",
    brand: "Charlotte Tilbury",
    category: "Makeup",
    shade: "Pillow Talk Original",
    price: 3150,
    originalPrice: 3500,
    rating: 4.8,
    images: ["https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80"],
    condition: "Brand New & Boxed",
    batchCode: "CT-319",
    location: "Gulshan-2, Dhaka"
  },
  {
    _id: "prod-hero-7",
    id: "prod-hero-7",
    title: "Fenty Beauty Gloss Bomb Universal Lip Luminizer",
    brand: "Fenty Beauty",
    category: "Makeup",
    shade: "Fenty Glow (Rose Nude)",
    price: 2950,
    originalPrice: 3400,
    rating: 4.9,
    images: ["https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&w=800&q=80"],
    condition: "Brand New & Boxed",
    batchCode: "FB-0128",
    location: "Baridhara, Dhaka"
  },
  {
    _id: "prod-hero-8",
    id: "prod-hero-8",
    title: "Rose Gold Professional 10-Piece Brush Set",
    brand: "Beauty & Blush Atelier",
    category: "Accessories",
    shade: "Metallic Rose Gold & Velvet Pouch",
    price: 2450,
    originalPrice: 2900,
    rating: 4.9,
    images: ["https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"],
    condition: "Atelier Edition",
    batchCode: "BBA-77",
    location: "Gulshan, Dhaka"
  }
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/products');
      if (res.data && res.data.length > 0) {
        setProducts(res.data);
      } else {
        setProducts(FALLBACK_PRODUCTS);
      }
    } catch (err) {
      console.warn('API cold start, loaded curated boutique items', err?.message);
      setProducts(FALLBACK_PRODUCTS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="min-h-screen">
      {/* 1. Hero Showcase Section */}
      <HeroBanner />

      {/* 2. Value Proposition Strip (4 items) */}
      <TrustBadges />

      {/* 3. Circular Shop by Category Showcase */}
      <CategoryShowcase />

      {/* 4. New Arrivals Showcase (Inspired by reference) */}
      <NewArrivals />

      {/* 5. Curated Products Showcase */}
      <ProductShowcase products={products} loading={loading} />

      {/* 6. Dual Promo Banners (Skincare & Makeup) */}
      <PromoGrid />
    </div>
  );
}
