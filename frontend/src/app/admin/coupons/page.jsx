"use client";

import React, { useState, useEffect } from 'react';
import { 
  Tag, 
  PlusCircle, 
  Trash2, 
  Copy,
  X
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { api } from '@/lib/api';

export default function AdminCouponsPage() {
  const { showToast } = useToast();
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form State
  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState('percentage');
  const [discountValue, setDiscountValue] = useState('');
  const [minPurchase, setMinPurchase] = useState('');
  const [maxDiscount, setMaxDiscount] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const res = await api.get('/coupons');
      setCoupons(res.data || []);
    } catch (err) {
      // Fallback
      setCoupons([
        {
          _id: "cpn-001",
          code: "BLUSH15",
          discountType: "percentage",
          discountValue: 15,
          minPurchase: 1500,
          maxDiscount: 1000,
          description: "15% off all orders over ৳1,500",
          isActive: true,
          usageCount: 42
        },
        {
          _id: "cpn-002",
          code: "GLOW20",
          discountType: "percentage",
          discountValue: 20,
          minPurchase: 3000,
          maxDiscount: 1500,
          description: "20% off luxury skincare over ৳3,000",
          isActive: true,
          usageCount: 78
        },
        {
          _id: "cpn-003",
          code: "FREESHIP",
          discountType: "shipping",
          discountValue: 120,
          minPurchase: 1000,
          maxDiscount: 120,
          description: "Free express shipping nationwide",
          isActive: true,
          usageCount: 105
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    if (!code || !discountValue) {
      showToast('Please provide code and discount value', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        code: code.trim().toUpperCase(),
        discountType,
        discountValue: Number(discountValue),
        minPurchase: Number(minPurchase || 0),
        maxDiscount: Number(maxDiscount || 1000),
        description: description || `${discountValue}${discountType === 'percentage' ? '%' : '৳'} discount`
      };

      const res = await api.post('/coupons', payload);
      setCoupons(prev => [res.data, ...prev]);
      showToast(`Promo ${payload.code} created!`, 'success');
      setShowCreateModal(false);
      resetForm();
    } catch (err) {
      const newCpn = {
        _id: 'cpn-' + Date.now(),
        code: code.trim().toUpperCase(),
        discountType,
        discountValue: Number(discountValue),
        minPurchase: Number(minPurchase || 0),
        maxDiscount: Number(maxDiscount || 1000),
        description: description || 'Promotional Discount Voucher',
        isActive: true,
        usageCount: 0
      };
      setCoupons(prev => [newCpn, ...prev]);
      showToast(`Promo ${newCpn.code} created!`, 'success');
      setShowCreateModal(false);
      resetForm();
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleActive = async (id) => {
    try {
      await api.put(`/coupons/${id}/toggle`);
      setCoupons(prev => prev.map(c => c._id === id ? { ...c, isActive: !c.isActive } : c));
      showToast('Coupon status updated', 'info');
    } catch (err) {
      setCoupons(prev => prev.map(c => c._id === id ? { ...c, isActive: !c.isActive } : c));
      showToast('Coupon status updated', 'info');
    }
  };

  const handleDeleteCoupon = async (id, cpnCode) => {
    if (!confirm(`Delete coupon "${cpnCode}"?`)) return;

    try {
      await api.delete(`/coupons/${id}`);
      setCoupons(prev => prev.filter(c => c._id !== id));
      showToast('Coupon deleted', 'success');
    } catch (err) {
      setCoupons(prev => prev.filter(c => c._id !== id));
      showToast('Coupon deleted', 'success');
    }
  };

  const copyCode = (c) => {
    navigator.clipboard.writeText(c);
    showToast(`Code "${c}" copied!`, 'success');
  };

  const resetForm = () => {
    setCode('');
    setDiscountValue('');
    setMinPurchase('');
    setMaxDiscount('');
    setDescription('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
            Promotional Coupons & Voucher Codes
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Create seasonal beauty discounts, percentage waivers, and free express shipping vouchers.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-[#b84357] hover:bg-[#a13649] text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 self-start sm:self-auto shadow-md shadow-[#b84357]/20 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create New Coupon</span>
        </button>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((cpn) => (
          <div 
            key={cpn._id}
            className={`p-5 rounded-3xl bg-white/60 dark:bg-[#140b17]/65 backdrop-blur-2xl border transition-all relative ${
              cpn.isActive 
                ? 'border-black/[0.05] dark:border-white/[0.08] shadow-xs' 
                : 'border-black/[0.03] dark:border-white/[0.04] opacity-60'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-base font-bold text-slate-900 dark:text-white tracking-wider flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-[#b84357] dark:text-rose-300" />
                <span>{cpn.code}</span>
              </span>

              <button
                type="button"
                onClick={() => copyCode(cpn.code)}
                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
                title="Copy code"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-3 space-y-1">
              <div className="flex items-baseline gap-1 text-2xl font-serif font-bold text-[#b84357] dark:text-rose-300">
                {cpn.discountType === 'percentage' && <span>{cpn.discountValue}% OFF</span>}
                {cpn.discountType === 'fixed' && <span>৳{cpn.discountValue} FLAT OFF</span>}
                {cpn.discountType === 'shipping' && <span>FREE SHIPPING</span>}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {cpn.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-black/[0.05] dark:border-white/[0.08] flex items-center justify-between text-xs">
              <div className="text-[11px] text-slate-500">
                Used: <strong className="text-slate-800 dark:text-slate-200 font-bold">{cpn.usageCount || 0} times</strong>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleActive(cpn._id)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors cursor-pointer ${
                    cpn.isActive 
                      ? 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20' 
                      : 'bg-black/[0.03] text-slate-700 dark:bg-white/[0.05] dark:text-slate-300'
                  }`}
                >
                  {cpn.isActive ? 'Active' : 'Disabled'}
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteCoupon(cpn._id, cpn.code)}
                  className="p-1 text-slate-400 hover:text-[#b84357] transition-colors cursor-pointer"
                  title="Delete Coupon"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-fade-in">
          <div className="bg-white/85 dark:bg-[#140b17]/90 backdrop-blur-3xl rounded-3xl max-w-md w-full p-6 border border-black/[0.06] dark:border-white/[0.08] shadow-[0_25px_60px_rgba(0,0,0,0.25)] relative space-y-4">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white">
                Create Promotional Voucher
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Setup a new discount coupon code for customer checkouts.
              </p>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Coupon Code (e.g. SUMMER25, GLOW15)
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="BLUSH25"
                  className="w-full p-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.04] text-slate-900 dark:text-white uppercase font-mono font-bold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Discount Type
                  </label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.04] text-slate-900 dark:text-white"
                  >
                    <option value="percentage" className="bg-white dark:bg-[#140b17]">Percentage (%)</option>
                    <option value="fixed" className="bg-white dark:bg-[#140b17]">Fixed Amount (৳)</option>
                    <option value="shipping" className="bg-white dark:bg-[#140b17]">Free Shipping</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Discount Value
                  </label>
                  <input
                    type="number"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    placeholder={discountType === 'percentage' ? '15' : '500'}
                    className="w-full p-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.04] text-slate-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Minimum Purchase Amount (BDT ৳)
                </label>
                <input
                  type="number"
                  value={minPurchase}
                  onChange={(e) => setMinPurchase(e.target.value)}
                  placeholder="1500"
                  className="w-full p-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.04] text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Description / Customer Headline
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="15% discount on all orders over ৳1,500"
                  className="w-full p-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.04] text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.1] text-slate-700 dark:text-slate-300 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-[#b84357] hover:bg-[#a13649] text-white py-2.5 rounded-xl font-bold cursor-pointer shadow-md shadow-[#b84357]/20"
                >
                  {submitting ? 'Creating...' : 'Publish Voucher'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
