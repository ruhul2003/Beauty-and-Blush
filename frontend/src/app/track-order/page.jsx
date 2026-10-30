"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
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
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-[90%] max-w-4xl mx-auto px-2 sm:px-4 py-10 space-y-8"
    >
      {/* Header */}
      <div className="text-center max-w-lg mx-auto space-y-2">
        <span className="text-[10px] uppercase font-bold tracking-[0.22em] text-[#c94d64]">
          Live Logistics Tracking
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
          Track Your Beauty Order
        </h1>
        <p className="text-xs text-slate-500">
          Enter your order reference number (e.g. BNB-123456) to view live courier milestones.
        </p>
      </div>

      {/* Search Input Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white/60 dark:bg-[#140b17]/65 backdrop-blur-2xl max-w-xl mx-auto border border-white/60 dark:border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.04)]">
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
              className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-white/60 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md text-slate-900 dark:text-white uppercase tracking-wider font-mono font-medium focus:outline-none focus:ring-1 focus:ring-[#c94d64] shadow-xs"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-xl bg-[#c94d64] hover:bg-[#b03e54] text-white text-xs font-bold uppercase tracking-wider shrink-0 disabled:opacity-50 transition-all cursor-pointer shadow-md shadow-[#c94d64]/20"
          >
            {loading ? 'Searching...' : 'Track'}
          </motion.button>
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
            className="text-[#c94d64] hover:underline font-mono font-bold cursor-pointer"
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
            className="text-[#c94d64] hover:underline font-mono font-bold cursor-pointer"
          >
            BNB-910243
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 rounded-2xl bg-rose-500/10 backdrop-blur-md border border-rose-300/40 max-w-xl mx-auto flex items-center gap-3 text-xs text-[#c94d64]"
        >
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </motion.div>
      )}

      {/* Order Tracking Timeline & Details */}
      <AnimatePresence>
        {order && (
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 max-w-2xl mx-auto"
          >
            {/* Tracking Status Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white/60 dark:bg-[#140b17]/65 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/40 dark:border-white/10 pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#c94d64] font-bold">
                    Order Reference
                  </span>
                  <h3 className="text-xl font-mono font-bold text-slate-900 dark:text-white">
                    {order.orderNumber}
                  </h3>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-300/30 backdrop-blur-md self-start sm:self-auto">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Status: {order.status}</span>
                </div>
              </div>

              {/* Stepper Timeline */}
              <div className="py-2">
                <div className="grid grid-cols-4 gap-2 relative">
                  {/* Connecting Line */}
                  <div className="absolute top-4 left-6 right-6 h-0.5 bg-rose-200/50 dark:bg-rose-950/60 -z-0" />
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
                            : 'bg-white/70 dark:bg-white/10 backdrop-blur-md border border-white/60 dark:border-white/10 text-slate-400'
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
              <div className="p-5 rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 space-y-3 text-xs shadow-xs">
                <div className="flex items-center gap-3">
                  {order.productImage && (
                    <img
                      src={order.productImage}
                      alt={order.productTitle}
                      className="w-14 h-14 rounded-xl object-cover border border-white/60 dark:border-white/10"
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

                <div className="border-t border-white/40 dark:border-white/10 pt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-slate-300">
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
                <motion.a
                  whileTap={{ scale: 0.98 }}
                  href={`https://wa.me/8801711224466?text=${encodeURIComponent(`Hi Beauty & Blush, I am inquiring about order ${order.orderNumber}.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-500/10 backdrop-blur-md text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Contact Courier Support on WhatsApp</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-500">Loading Order Tracker...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
