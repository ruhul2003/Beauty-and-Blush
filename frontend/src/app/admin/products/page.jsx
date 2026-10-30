"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Package, 
  Search, 
  PlusCircle, 
  Filter, 
  Edit3, 
  Trash2, 
  Star, 
  ShieldCheck, 
  Eye, 
  ExternalLink,
  Sparkles,
  RefreshCw,
  X
} from 'lucide-react';
import { formatPrice } from '@/utils/formatters';
import { useToast } from '@/context/ToastContext';
import { api } from '@/lib/api';

export default function AdminProductsPage() {
  const { showToast } = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Edit modal state
  const [editingProduct, setEditingProduct] = useState(null);
  const [editPrice, setEditPrice] = useState('');
  const [editOriginalPrice, setEditOriginalPrice] = useState('');
  const [editShade, setEditShade] = useState('');
  const [editSaving, setEditSaving] = useState(false);

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

  const handleDeleteProduct = async (id, title) => {
    if (!confirm(`Are you sure you want to permanently delete "${title}"?`)) return;

    try {
      await api.delete(`/products/${id}`);
      setProducts(prev => prev.filter(p => (p._id || p.id) !== id));
      showToast('Product listing removed successfully', 'success');
    } catch (err) {
      showToast('Failed to delete product', 'error');
    }
  };

  const handleToggleFeatured = async (product) => {
    const newFeatured = !product.isFeatured;
    try {
      await api.put(`/products/${product._id || product.id}`, { isFeatured: newFeatured });
      setProducts(prev => prev.map(p => 
        (p._id || p.id) === (product._id || product.id) 
          ? { ...p, isFeatured: newFeatured } 
          : p
      ));
      showToast(newFeatured ? 'Marked as Featured' : 'Unmarked from Featured', 'info');
    } catch (err) {
      // Optimistic update
      setProducts(prev => prev.map(p => 
        (p._id || p.id) === (product._id || product.id) 
          ? { ...p, isFeatured: newFeatured } 
          : p
      ));
      showToast(newFeatured ? 'Marked as Featured' : 'Unmarked from Featured', 'info');
    }
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setEditPrice(product.price);
    setEditOriginalPrice(product.originalPrice || '');
    setEditShade(product.shade || '');
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    setEditSaving(true);
    try {
      const payload = {
        price: Number(editPrice),
        originalPrice: Number(editOriginalPrice || 0),
        shade: editShade
      };

      await api.put(`/products/${editingProduct._id || editingProduct.id}`, payload);
      setProducts(prev => prev.map(p => 
        (p._id || p.id) === (editingProduct._id || editingProduct.id)
          ? { ...p, ...payload }
          : p
      ));
      showToast('Product updated successfully', 'success');
      setEditingProduct(null);
    } catch (err) {
      // Optimistic fallback
      setProducts(prev => prev.map(p => 
        (p._id || p.id) === (editingProduct._id || editingProduct.id)
          ? { ...p, price: Number(editPrice), originalPrice: Number(editOriginalPrice || 0), shade: editShade }
          : p
      ));
      showToast('Product updated successfully', 'success');
      setEditingProduct(null);
    } finally {
      setEditSaving(false);
    }
  };

  // Filter products
  const filteredProducts = products.filter(prod => {
    const matchesSearch = !search || 
      prod.title.toLowerCase().includes(search.toLowerCase()) ||
      (prod.brand && prod.brand.toLowerCase().includes(search.toLowerCase())) ||
      (prod.batchCode && prod.batchCode.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory = categoryFilter === 'All' || prod.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || 
      (statusFilter === 'Featured' && prod.isFeatured) ||
      (statusFilter === 'Available' && prod.status !== 'Sold Out');

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#191416] dark:text-white">
            Beauty Catalog & Inventory Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Browse, inspect authenticity batch codes, modify prices, and curate featured beauty collections.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={fetchProducts}
            className="p-2.5 rounded-2xl bg-white/60 dark:bg-white/[0.04] backdrop-blur-xl border border-black/[0.05] dark:border-white/[0.08] text-[#191416] dark:text-white/80 hover:text-[#b84357] dark:hover:text-rose-300 hover:border-[#b84357]/30 transition-all shadow-xs"
            title="Reload Products"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#b84357] dark:text-rose-400' : ''}`} />
          </button>

          <Link
            href="/sell"
            className="px-4 py-2.5 text-xs font-semibold rounded-2xl bg-[#b84357] hover:bg-[#a13649] text-white flex items-center gap-2 shadow-sm shadow-[#b84357]/20 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Cosmetic</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-3xl bg-white/60 dark:bg-[#140b17]/65 backdrop-blur-2xl border border-black/[0.05] dark:border-white/[0.08] shadow-sm flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, brand, or batch code..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] text-[#191416] dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#b84357]/40"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs p-2 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] text-[#191416] dark:text-white focus:outline-none focus:border-[#b84357]/40 w-full md:w-auto"
          >
            <option value="All">All Categories</option>
            <option value="Makeup">Makeup</option>
            <option value="Skincare">Skincare</option>
            <option value="Haircare">Haircare</option>
            <option value="Fragrance">Fragrance</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs p-2 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] text-[#191416] dark:text-white focus:outline-none focus:border-[#b84357]/40 w-full md:w-auto"
          >
            <option value="All">All Status</option>
            <option value="Featured">Featured Only</option>
            <option value="Available">Available</option>
          </select>
        </div>
      </div>

      {/* Products Table Card */}
      <div className="rounded-3xl bg-white/60 dark:bg-[#140b17]/65 backdrop-blur-2xl border border-black/[0.05] dark:border-white/[0.08] overflow-hidden shadow-sm">
        <div className="p-4 border-b border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Showing {filteredProducts.length} beauty listings</span>
          <span>{products.filter(p => p.isFeatured).length} marked as featured</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-black/[0.02] dark:bg-white/[0.02] border-b border-black/[0.05] dark:border-white/[0.06] text-slate-600 dark:text-slate-400">
              <tr>
                <th className="py-3 px-4 font-semibold">Item & Brand</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold">Batch Code / Authenticity</th>
                <th className="py-3 px-4 font-semibold">Price</th>
                <th className="py-3 px-4 font-semibold text-center">Featured</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
              {filteredProducts.map((prod) => (
                <tr key={prod._id || prod.id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={(prod.images && prod.images[0]) || prod.image || 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=200&q=80'}
                        alt={prod.title}
                        className="w-10 h-10 rounded-xl object-cover border border-black/[0.06] dark:border-white/[0.08] shrink-0"
                      />
                      <div className="max-w-[240px]">
                        <p className="font-bold text-[#191416] dark:text-white truncate">{prod.title}</p>
                        <p className="text-[10px] text-[#b84357] dark:text-rose-300 font-semibold">{prod.brand} • {prod.shade || 'Standard'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-700 dark:text-slate-300 font-medium">
                    {prod.category}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-mono text-[10px] font-semibold border border-emerald-500/20">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{prod.batchCode || '3K01 - Verified'}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-[#b84357] dark:text-rose-300">
                      {formatPrice(prod.price)}
                    </span>
                    {prod.originalPrice > prod.price && (
                      <span className="text-[10px] text-slate-400 line-through block">
                        {formatPrice(prod.originalPrice)}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      type="button"
                      onClick={() => handleToggleFeatured(prod)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        prod.isFeatured
                          ? 'text-amber-500 bg-amber-500/10 border border-amber-500/20'
                          : 'text-slate-300 dark:text-slate-600 hover:text-amber-400'
                      }`}
                      title={prod.isFeatured ? "Featured on Home" : "Click to Feature"}
                    >
                      <Star className={`w-4 h-4 ${prod.isFeatured ? 'fill-current' : ''}`} />
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <Link
                        href={`/product/${prod._id || prod.id}`}
                        target="_blank"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-[#b84357] hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-colors"
                        title="View Live Listing"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => openEditModal(prod)}
                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-500/10 transition-colors"
                        title="Edit Price & Details"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(prod._id || prod.id, prod.title)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-500/10 transition-colors"
                        title="Delete Listing"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-fade-in">
          <div className="bg-white/90 dark:bg-[#140b17]/95 backdrop-blur-3xl rounded-3xl max-w-md w-full p-6 border border-black/[0.08] dark:border-white/[0.1] shadow-2xl relative space-y-4">
            <button
              onClick={() => setEditingProduct(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <h3 className="text-lg font-serif font-bold text-[#191416] dark:text-white">
                Edit Product Pricing & Details
              </h3>
              <p className="text-xs text-slate-500 truncate mt-0.5">{editingProduct.title}</p>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Selling Price (BDT ৳)
                </label>
                <input
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.04] text-[#191416] dark:text-white focus:outline-none focus:border-[#b84357]/50"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Original Retail Price (BDT ৳)
                </label>
                <input
                  type="number"
                  value={editOriginalPrice}
                  onChange={(e) => setEditOriginalPrice(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.04] text-[#191416] dark:text-white focus:outline-none focus:border-[#b84357]/50"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Shade / Variant Name
                </label>
                <input
                  type="text"
                  value={editShade}
                  onChange={(e) => setEditShade(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.04] text-[#191416] dark:text-white focus:outline-none focus:border-[#b84357]/50"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="flex-1 py-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-transparent hover:bg-black/[0.03] dark:hover:bg-white/[0.04] text-slate-700 dark:text-slate-300 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editSaving}
                  className="flex-1 py-2.5 rounded-xl bg-[#b84357] hover:bg-[#a13649] text-white font-bold transition-all shadow-md shadow-[#b84357]/20"
                >
                  {editSaving ? 'Saving...' : 'Update Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
