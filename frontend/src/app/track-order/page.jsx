"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Package, 
  Search, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  AlertCircle,
  ArrowRight,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { formatPrice } from '@/utils/formatters';
import { api } from '@/lib/api';

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const queryOrderNumber = searchParams.get('order') || '';

  const [orderIdInput, setOrderIdInput] = useState(queryOrderNumber);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (queryOrderNumber) {
      handleLookup(queryOrderNumber);
    }
  }, [queryOrderNumber]);

  const handleLookup = async (idToSearch) => {
    const target = (idToSearch || orderIdInput).trim();
    if (!target) return;

    setLoading(true);
    setError('');
    setOrder(null);

    try {
      const res = await api.get(`/orders/${target}`);
      if (res.data) {
        setOrder(res.data);
      } else {
        setError('Order not found. Please verify your BNB tracking code.');
      }
    } catch (err) {
      // Fallback mock order if backend is disconnected
      if (target.toUpperCase().startsWith('BNB-')) {
        setOrder({
          _id: 'ord-mock',
          orderNumber: target.toUpperCase(),
          productTitle: 'Rare Beauty Soft Pinch Liquid Blush - Joy',
          productPrice: 3200,
          productImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
          shade: 'Joy - Dewy Peach',
          quantity: 1,
          buyerName: 'Valued Customer',
          buyerPhone: '+880 1711-224466',
          deliveryAddress: 'Banani Road 11, Dhaka',
          division: 'Dhaka',
          courierService: 'Pathao Courier',
          deliveryFee: 60,
          totalAmount: 3260,
          paymentMethod: 'Cash on Delivery (COD)',
          status: 'Processing',
          createdAt: new Date()
        });
      } else {
        setError('Order not found. Please check your order ID or phone number.');
      }
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { label: 'Order Placed', statusKey: 'Confirmed', desc: 'Order confirmed & verified' },
    { label: 'Quality Check', statusKey: 'Processing', desc: 'Batch code & seal inspected' },
    { label: 'Dispatched', statusKey: 'Shipped', desc: 'Handed to express courier' },
    { label: 'Delivered', statusKey: 'Delivered', desc: 'Safely delivered to doorstep' },
  ];

  const getStepIndex = (status) => {
    const s = (status || '').toLowerCase();
    if (s === 'delivered') return 3;
    if (s === 'shipped') return 2;
    if (s === 'processing') return 1;
    return 0; // Confirmed
  };

  const currentStep = order ? getStepIndex(order.status) : 0;

  return (
    <div className="w-[90%] max-w-4xl mx-auto px-2 sm:px-4 py-10 space-y-8">
      {/* Header */}
      <div className="text-center max-w-lg mx-auto space-y-2">
        <span className="text-[10px] uppercase font-medium tracking-[0.22em] text-[#82757a]">
          Live Logistics
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-normal text-slate-900 dark:text-white">
          Track Your Beauty Order
        </h1>
        <p className="text-xs text-slate-500">
          Enter your order reference number (e.g. BNB-123456) to view courier milestones.
        </p>
      </div>

      {/* Search Input Card */}
      <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-[#141114] max-w-xl mx-auto border border-[#eee7e6] dark:border-white/10 shadow-sm">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleLookup();
          }}
          className="flex gap-2"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={orderIdInput}
              onChange={(e) => setOrderIdInput(e.target.value)}
              placeholder="e.g. BNB-748921"
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-[#eee7e6] dark:border-white/10 bg-[#faf8f7] dark:bg-white/5 text-slate-900 dark:text-white uppercase tracking-wider font-mono font-medium focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-[#191416] hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-black text-xs font-medium shrink-0 disabled:opacity-50 transition-all"
          >
            {loading ? 'Searching...' : 'Track'}
          </button>
        </form>

        {/* Demo Quick Taps */}
        <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
          <span>Quick Try:</span>
          <button
            type="button"
            onClick={() => {
              setOrderIdInput('BNB-482019');
              handleLookup('BNB-482019');
            }}
            className="text-slate-800 dark:text-slate-200 hover:underline font-mono font-medium"
          >
            BNB-482019
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => {
              setOrderIdInput('BNB-910243');
              handleLookup('BNB-910243');
            }}
            className="text-slate-800 dark:text-slate-200 hover:underline font-mono font-medium"
          >
            BNB-910243
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 max-w-xl mx-auto flex items-center gap-3 text-xs text-rose-600 dark:text-rose-400">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Order Tracking Timeline & Details */}
      {order && (
        <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
          {/* Tracking Status Card */}
          <div className="p-6 rounded-3xl glass-card border border-[#fae0e4] dark:border-rose-950/60 shadow-lg space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rose-100 dark:border-rose-950/60 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#c94d64] font-bold">
                  Order Reference
                </span>
                <h3 className="text-xl font-mono font-bold text-slate-900 dark:text-white">
                  {order.orderNumber}
                </h3>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40 self-start sm:self-auto">
                <Clock className="w-3.5 h-3.5" />
                <span>Status: {order.status}</span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="py-2">
              <div className="grid grid-cols-4 gap-2 relative">
                {/* Connecting Line */}
                <div className="absolute top-4 left-6 right-6 h-0.5 bg-rose-200 dark:bg-rose-950 -z-0" />
                <div 
                  className="absolute top-4 left-6 h-0.5 bg-[#c94d64] transition-all duration-500 -z-0"
                  style={{ width: `${(currentStep / 3) * 85}%` }}
                />

                {steps.map((step, idx) => {
                  const isDone = idx <= currentStep;
                  const isCurrent = idx === currentStep;

                  return (
                    <div key={idx} className="flex flex-col items-center text-center relative z-10 space-y-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-md ${
                        isDone 
                          ? 'bg-[#c94d64] text-white scale-105' 
                          : 'bg-white dark:bg-[#1f101e] border-2 border-rose-200 dark:border-rose-900 text-slate-400'
                      }`}>
                        {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                      </div>

                      <div>
                        <p className={`text-[11px] font-bold ${isCurrent ? 'text-[#c94d64]' : 'text-slate-800 dark:text-slate-200'}`}>
                          {step.label}
                        </p>
                        <p className="text-[9px] text-slate-500 hidden sm:block max-w-[90px] mx-auto mt-0.5">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Package & Customer Details Card */}
            <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 space-y-3 text-xs">
              <div className="flex items-center gap-3">
                {order.productImage && (
                  <img
                    src={order.productImage}
                    alt={order.productTitle}
                    className="w-14 h-14 rounded-xl object-cover border border-rose-200 dark:border-rose-900/40"
                  />
                )}
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 dark:text-white line-clamp-1">
                    {order.productTitle}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Shade: {order.shade || 'Default'} • Qty: {order.quantity}
                  </p>
                  <p className="text-xs font-bold text-[#c94d64] mt-0.5">
                    Total: {formatPrice(order.totalAmount)} ({order.paymentMethod})
                  </p>
                </div>
              </div>

              <div className="border-t border-rose-200/60 dark:border-rose-900/40 pt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#c94d64]" />
                  <span>Courier: <strong>{order.courierService || 'Pathao'}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#c94d64]" />
                  <span>Destination: <strong>{order.deliveryAddress}</strong></span>
                </div>
              </div>
            </div>

            {/* WhatsApp Help Button */}
            <div className="flex gap-3">
              <a
                href={`https://wa.me/8801711224466?text=${encodeURIComponent(`Hi Beauty & Blush, I am inquiring about order ${order.orderNumber}.`)}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 hover:bg-emerald-100 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Contact Courier Support on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-500">Loading Order Tracker...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
