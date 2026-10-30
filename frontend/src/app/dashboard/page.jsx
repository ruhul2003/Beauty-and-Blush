"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Store, 
  ShoppingBag, 
  PlusCircle, 
  Trash2, 
  Sparkles, 
  Star 
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
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-[90%] mx-auto px-2 sm:px-4 py-10 space-y-8"
    >
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/60 dark:bg-[#140b17]/65 backdrop-blur-2xl border border-black/[0.05] dark:border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#b84357] uppercase tracking-widest mb-1">
            <Store className="w-3.5 h-3.5" />
            <span>Merchant Overview</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
            {user ? `${user.name}'s Boutique Dashboard` : 'Seller Boutique Dashboard'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">Manage your active beauty inventory, customer orders, and store profile.</p>
        </div>

        <Link
          href="/sell"
          className="bg-[#b84357] hover:bg-[#a13649] text-white px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center gap-2 self-start sm:self-center shadow-md shadow-[#b84357]/20 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white/60 dark:bg-[#140b17]/65 backdrop-blur-2xl border border-black/[0.05] dark:border-white/[0.08] shadow-xs space-y-2">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Active Listings</span>
          <div className="text-3xl font-bold font-serif text-slate-900 dark:text-white flex items-center justify-between">
            <span>{myProducts.length}</span>
            <div className="w-10 h-10 rounded-2xl bg-black/[0.03] dark:bg-white/[0.06] text-[#b84357] dark:text-rose-300 flex items-center justify-center border border-black/[0.06] dark:border-white/[0.08]">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white/60 dark:bg-[#140b17]/65 backdrop-blur-2xl border border-black/[0.05] dark:border-white/[0.08] shadow-xs space-y-2">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Customer Orders</span>
          <div className="text-3xl font-bold font-serif text-slate-900 dark:text-white flex items-center justify-between">
            <span>{myOrders.length}</span>
            <div className="w-10 h-10 rounded-2xl bg-black/[0.03] dark:bg-white/[0.06] text-amber-500 flex items-center justify-center border border-black/[0.06] dark:border-white/[0.08]">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white/60 dark:bg-[#140b17]/65 backdrop-blur-2xl border border-black/[0.05] dark:border-white/[0.08] shadow-xs space-y-2">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Store Reputation</span>
          <div className="text-3xl font-bold font-serif text-slate-900 dark:text-white flex items-center justify-between">
            <span>4.95 / 5.0</span>
            <div className="w-10 h-10 rounded-2xl bg-black/[0.03] dark:bg-white/[0.06] text-amber-400 flex items-center justify-center border border-black/[0.06] dark:border-white/[0.08]">
              <Star className="w-5 h-5 fill-current" />
            </div>
          </div>
        </div>
      </div>

      {/* Product Listings Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/60 dark:bg-[#140b17]/65 backdrop-blur-2xl border border-black/[0.05] dark:border-white/[0.08] shadow-xs space-y-4">
        <h2 className="text-lg font-serif font-bold text-slate-900 dark:text-white">
          Your Beauty Catalog Listings
        </h2>

        {myProducts.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs">
            <p>You have not listed any cosmetics or perfumes yet.</p>
            <Link href="/sell" className="mt-3 inline-block text-[#b84357] font-bold hover:underline">
              Publish your first listing →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-black/[0.05] dark:border-white/[0.08] text-slate-400">
                <tr>
                  <th className="pb-3 font-semibold font-serif">Product</th>
                  <th className="pb-3 font-semibold font-serif">Category</th>
                  <th className="pb-3 font-semibold font-serif">Condition</th>
                  <th className="pb-3 font-semibold font-serif">Price</th>
                  <th className="pb-3 font-semibold font-serif">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.05]">
                {myProducts.map(p => (
                  <tr key={p._id || p.id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors">
                    <td className="py-3.5 flex items-center gap-3">
                      <img
                        src={p.images && p.images[0] ? p.images[0] : ''}
                        alt={p.title}
                        className="w-11 h-11 object-cover rounded-xl shrink-0 border border-black/[0.05] dark:border-white/[0.08]"
                      />
                      <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-xs">{p.title}</span>
                    </td>
                    <td className="py-3.5 text-slate-600 dark:text-slate-400">{p.category}</td>
                    <td className="py-3.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-black/[0.03] dark:bg-white/[0.05] text-[#b84357] dark:text-rose-300 text-[10px] font-bold border border-black/[0.06] dark:border-white/[0.08]">
                        {p.condition}
                      </span>
                    </td>
                    <td className="py-3.5 font-bold text-slate-900 dark:text-white font-serif">{formatPrice(p.price)}</td>
                    <td className="py-3.5">
                      <button
                        onClick={() => handleDeleteProduct(p._id)}
                        className="p-1.5 rounded-xl text-slate-400 hover:text-[#b84357] hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
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
    </motion.div>
  );
}
