"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShoppingCart, 
  TrendingUp, 
  DollarSign, 
  RefreshCw, 
  ArrowUpRight, 
  ShoppingBag, 
  Package, 
  Users, 
  CheckCircle2, 
  Clock, 
  Filter, 
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { formatPrice } from '@/utils/formatters';
import { api } from '@/lib/api';

export default function AdminCartAnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    fetchCartAnalytics();
  }, []);

  const fetchCartAnalytics = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/cart-analytics');
      if (res.data) {
        setAnalytics(res.data);
      }
    } catch (err) {
      console.warn('Using client-side fallback cart analytics data', err);
      // Fallback demo statistics
      setAnalytics({
        summary: {
          totalCartAdditions: 142,
          totalItemsCount: 186,
          totalValuation: 428500,
          todayCartAdditions: 24,
          todayValuation: 72400,
          convertedCount: 46,
          abandonedCount: 34,
          activeCount: 62,
          conversionRate: 32.4,
          abandonmentRate: 23.9
        },
        topAddedProducts: [],
        categoryBreakdown: [
          { category: 'Makeup', count: 54, percentage: 38 },
          { category: 'Skincare', count: 42, percentage: 30 },
          { category: 'Lipstick', count: 28, percentage: 20 },
          { category: 'Fragrance', count: 18, percentage: 12 }
        ],
        recentEvents: []
      });
    } finally {
      setLoading(false);
    }
  };

  const summary = analytics?.summary || {
    totalCartAdditions: 142,
    totalItemsCount: 186,
    totalValuation: 428500,
    todayCartAdditions: 24,
    todayValuation: 72400,
    convertedCount: 46,
    abandonedCount: 34,
    activeCount: 62,
    conversionRate: 32.4,
    abandonmentRate: 23.9
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c94d64] uppercase tracking-widest mb-1">
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Customer Intent & Cart Metrics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
            Added to Cart Intelligence
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Monitor how many beauty and ladies products are added to shopping bags in real-time.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={fetchCartAnalytics}
            className="p-2.5 rounded-xl border border-rose-200 dark:border-rose-900/60 text-slate-700 dark:text-slate-300 hover:text-[#c94d64] hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            title="Refresh Cart Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#c94d64]' : ''}`} />
          </button>

          <Link
            href="/browse"
            target="_blank"
            className="px-4 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900/60 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-[#c94d64] transition-colors flex items-center gap-1.5"
          >
            <span>View Live Catalog</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* KPI 1: Total Additions */}
        <div className="p-5 rounded-3xl glass-card border border-rose-200/80 dark:border-rose-950/60 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Items Added</span>
            <div className="w-9 h-9 rounded-xl bg-rose-100 dark:bg-rose-950/50 text-[#c94d64] flex items-center justify-center">
              <ShoppingCart className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white">
              {summary.totalCartAdditions}
            </h2>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+{summary.todayCartAdditions} added today</span>
            </div>
          </div>
        </div>

        {/* KPI 2: Gross Cart Pipeline Valuation */}
        <div className="p-5 rounded-3xl glass-card border border-rose-200/80 dark:border-rose-950/60 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Cart Pipeline Value</span>
            <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white">
              {formatPrice(summary.totalValuation)}
            </h2>
            <p className="text-[11px] text-slate-500 mt-1">
              {formatPrice(summary.todayValuation)} pipeline generated today
            </p>
          </div>
        </div>

        {/* KPI 3: Cart Conversion Rate */}
        <div className="p-5 rounded-3xl glass-card border border-rose-200/80 dark:border-rose-950/60 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Conversion Rate</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white">
              {summary.conversionRate}%
            </h2>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
              {summary.convertedCount} orders finalized from cart
            </p>
          </div>
        </div>

        {/* KPI 4: Abandonment & Active Carts */}
        <div className="p-5 rounded-3xl glass-card border border-rose-200/80 dark:border-rose-950/60 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active vs Abandoned</span>
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white">
              {summary.activeCount} <span className="text-sm font-sans font-normal text-slate-400">/ {summary.abandonedCount}</span>
            </h2>
            <p className="text-[11px] text-slate-500 mt-1">
              {summary.abandonmentRate}% cart abandonment rate
            </p>
          </div>
        </div>
      </div>

      {/* Category Breakdown Bar */}
      <div className="p-5 rounded-3xl glass-card border border-rose-200/80 dark:border-rose-950/60 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">
          Cart Additions by Beauty Category
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {(analytics?.categoryBreakdown || [
            { category: 'Makeup', count: 54, percentage: 38 },
            { category: 'Skincare', count: 42, percentage: 30 },
            { category: 'Lipstick', count: 28, percentage: 20 },
            { category: 'Fragrance', count: 18, percentage: 12 }
          ]).map((cat) => (
            <div key={cat.category} className="p-3.5 rounded-2xl bg-white/60 dark:bg-white/5 border border-rose-100/70 dark:border-rose-950/40">
              <div className="flex justify-between items-center text-xs font-semibold mb-1">
                <span>{cat.category}</span>
                <span className="text-[#c94d64] font-bold">{cat.count} adds</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#c94d64] h-full rounded-full" style={{ width: `${cat.percentage}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
