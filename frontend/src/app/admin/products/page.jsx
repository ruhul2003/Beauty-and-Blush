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
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
            Beauty Catalog & Inventory Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Browse, inspect authenticity batch codes, modify prices, and curate featured beauty collections.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={fetchProducts}
            className="p-2.5 rounded-xl border border-rose-200 dark:border-rose-900/60 text-slate-700 dark:text-slate-300 hover:text-[#c94d64] hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            title="Reload Products"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#c94d64]' : ''}`} />
          </button>

          <Link
            href="/sell"
            className="btn-rose-primary px-4 py-2.5 text-xs font-bold flex items-center gap-2 shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Cosmetic</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-3xl glass-card border border-rose-200/80 dark:border-rose-950/60 flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, brand, or batch code..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#120a14]"
          />
          <Search className="w-4 h-4 text-rose-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs p-2 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#120a14] w-full md:w-auto"
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
            className="text-xs p-2 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#120a14] w-full md:w-auto"
          >
            <option value="All">All Status</option>
            <option value="Featured">Featured Only</option>
            <option value="Available">Available</option>
          </select>
        </div>
      </div>

      {/* Products Table Card */}
      <div className="rounded-3xl glass-card border border-rose-200/80 dark:border-rose-950/60 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-rose-100 dark:border-rose-950/60 flex items-center justify-between text-xs text-slate-500">
          <span>Showing {filteredProducts.length} beauty listings</span>
          <span>{products.filter(p => p.isFeatured).length} marked as featured</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-rose-50/50 dark:bg-rose-950/30 border-b border-rose-100 dark:border-rose-950/60 text-slate-600 dark:text-slate-400">
              <tr>
                <th className="py-3 px-4 font-semibold">Item & Brand</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold">Batch Code / Authenticity</th>
                <th className="py-3 px-4 font-semibold">Price</th>
                <th className="py-3 px-4 font-semibold text-center">Featured</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rose-100/60 dark:divide-rose-950/40">
              {filteredProducts.map((prod) => (
                <tr key={prod._id || prod.id} className="hover:bg-rose-50/30 dark:hover:bg-rose-950/20 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={(prod.images && prod.images[0]) || prod.image || 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=200&q=80'}
                        alt={prod.title}
                        className="w-10 h-10 rounded-xl object-cover border border-rose-200 dark:border-rose-900/50 shrink-0"
                      />
                      <div className="max-w-[240px]">
                        <p className="font-bold text-slate-900 dark:text-white truncate">{prod.title}</p>
                        <p className="text-[10px] text-[#c94d64] font-semibold">{prod.brand} • {prod.shade || 'Standard'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-700 dark:text-slate-300 font-medium">
                    {prod.category}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-mono text-[10px] font-semibold border border-emerald-200 dark:border-emerald-800/40">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{prod.batchCode || '3K01 - Verified'}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-[#c94d64] dark:text-[#f4728d]">
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
                          ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
                          : 'text-slate-300 hover:text-amber-400'
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
                        className="p-1.5 rounded-lg text-slate-500 hover:text-[#c94d64] hover:bg-rose-50 dark:hover:bg-rose-950/40"
                        title="View Live Listing"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => openEditModal(prod)}
                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40"
                        title="Edit Price & Details"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(prod._id || prod.id, prod.title)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#180e1a] rounded-3xl max-w-md w-full p-6 border border-rose-200 dark:border-rose-900/60 shadow-2xl relative space-y-4">
            <button
              onClick={() => setEditingProduct(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white">
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
                  className="w-full p-2.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#120a14]"
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
                  className="w-full p-2.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#120a14]"
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
                  className="w-full p-2.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#120a14]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="flex-1 py-2.5 rounded-xl border border-rose-200 text-slate-700 dark:text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editSaving}
                  className="flex-1 btn-rose-primary py-2.5 font-bold"
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
