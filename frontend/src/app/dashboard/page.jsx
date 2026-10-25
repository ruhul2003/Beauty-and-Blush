"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Store, 
  ShoppingBag, 
  DollarSign, 
  PlusCircle, 
  Trash2, 
  Sparkles, 
  Star, 
  Truck, 
  MapPin, 
  ShieldCheck 
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { formatPrice } from '@/utils/formatters';
import { api } from '@/lib/api';

export default function DashboardPage() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [myProducts, setMyProducts] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const sellerId = user ? user.id : 'seller-selena-01';
      const [prodRes, ordRes] = await Promise.all([
        api.get(`/products?sellerId=${sellerId}`).catch(() => ({ data: [] })),
        api.get(`/orders?sellerId=${sellerId}`).catch(() => ({ data: [] }))
      ]);

      setMyProducts(prodRes.data || []);
      setMyOrders(ordRes.data || []);
    } catch (err) {
      console.error('Failed to load dashboard', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm('Are you sure you want to remove this cosmetic listing?')) return;
    try {
      await api.delete(`/products/${id}`);
      setMyProducts(prev => prev.filter(p => p._id !== id));
      showToast('Listing removed successfully', 'success');
    } catch (err) {
      showToast('Failed to delete listing', 'error');
    }
  };

  return (
    <div className="w-[90%] mx-auto px-2 sm:px-4 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-500 uppercase tracking-widest mb-1">
            <Store className="w-3.5 h-3.5" />
            <span>Merchant Overview</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
            {user ? `${user.name}'s Boutique Dashboard` : 'Seller Boutique Dashboard'}
          </h1>
          <p className="text-xs text-slate-500">Manage your active beauty inventory, customer orders, and store profile.</p>
        </div>

        <Link
          href="/sell"
          className="btn-rose-primary px-5 py-2.5 text-xs font-semibold flex items-center gap-2 self-start"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl glass-card space-y-1">
          <span className="text-xs text-slate-500 font-medium">Active Listings</span>
          <div className="text-2xl font-bold font-serif text-slate-900 dark:text-white flex items-center justify-between">
            <span>{myProducts.length}</span>
            <Sparkles className="w-5 h-5 text-rose-500" />
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-card space-y-1">
          <span className="text-xs text-slate-500 font-medium">Customer Orders</span>
          <div className="text-2xl font-bold font-serif text-slate-900 dark:text-white flex items-center justify-between">
            <span>{myOrders.length}</span>
            <ShoppingBag className="w-5 h-5 text-amber-500" />
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-card space-y-1">
          <span className="text-xs text-slate-500 font-medium">Store Reputation</span>
          <div className="text-2xl font-bold font-serif text-slate-900 dark:text-white flex items-center justify-between">
            <span>4.95 / 5.0</span>
            <Star className="w-5 h-5 text-amber-400 fill-current" />
          </div>
        </div>
      </div>

      {/* Product Listings Table */}
      <div className="glass-panel p-6 rounded-3xl space-y-4">
        <h2 className="text-lg font-serif font-bold text-slate-900 dark:text-white">
          Your Beauty Catalog Listings
        </h2>

        {myProducts.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs">
            <p>You have not listed any cosmetics or perfumes yet.</p>
            <Link href="/sell" className="mt-3 inline-block text-rose-600 font-bold hover:underline">
              Publish your first listing →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-rose-100 dark:border-rose-950/60 text-slate-400">
                <tr>
                  <th className="pb-3 font-semibold">Product</th>
                  <th className="pb-3 font-semibold">Category</th>
                  <th className="pb-3 font-semibold">Condition</th>
                  <th className="pb-3 font-semibold">Price</th>
                  <th className="pb-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-50 dark:divide-rose-950/30">
                {myProducts.map(p => (
                  <tr key={p._id || p.id} className="hover:bg-rose-50/30 dark:hover:bg-rose-950/20">
                    <td className="py-3 flex items-center gap-3">
                      <img
                        src={p.images && p.images[0] ? p.images[0] : ''}
                        alt={p.title}
                        className="w-10 h-10 object-cover rounded-xl shrink-0"
                      />
                      <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-xs">{p.title}</span>
                    </td>
                    <td className="py-3 text-slate-600 dark:text-slate-400">{p.category}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 text-[10px] font-bold">
                        {p.condition}
                      </span>
                    </td>
                    <td className="py-3 font-bold text-slate-900 dark:text-white">{formatPrice(p.price)}</td>
                    <td className="py-3">
                      <button
                        onClick={() => handleDeleteProduct(p._id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-950/50"
                        title="Delete listing"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
