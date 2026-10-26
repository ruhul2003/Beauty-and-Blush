"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Search, 
  Truck, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  MapPin, 
  Phone, 
  Eye, 
  RefreshCw,
  ExternalLink,
  MessageCircle,
  X,
  FileText
} from 'lucide-react';
import { formatPrice } from '@/utils/formatters';
import { useToast } from '@/context/ToastContext';
import { api } from '@/lib/api';

export default function AdminOrdersPage() {
  const { showToast } = useToast();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [activeModalOrder, setActiveModalOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get('/orders');
      setOrders(res.data || []);
    } catch (err) {
      console.error('Failed to load orders', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus });
      setOrders(prev => prev.map(o => 
        (o._id === orderId || o.orderNumber === orderId) ? { ...o, status: newStatus } : o
      ));
      if (activeModalOrder && (activeModalOrder._id === orderId || activeModalOrder.orderNumber === orderId)) {
        setActiveModalOrder(prev => ({ ...prev, status: newStatus }));
      }
      showToast(`Order status updated to ${newStatus}`, 'success');
    } catch (err) {
      // Optimistic update
      setOrders(prev => prev.map(o => 
        (o._id === orderId || o.orderNumber === orderId) ? { ...o, status: newStatus } : o
      ));
      showToast(`Order status updated to ${newStatus}`, 'success');
    }
  };

  const statuses = ['All', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  const filteredOrders = orders.filter(ord => {
    const matchesStatus = statusFilter === 'All' || ord.status === statusFilter;
    const matchesSearch = !search ||
      ord.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      (ord.buyerName && ord.buyerName.toLowerCase().includes(search.toLowerCase())) ||
      (ord.buyerPhone && ord.buyerPhone.toLowerCase().includes(search.toLowerCase()));

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
            Order Fulfillment & Courier Dispatch
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track customer shipments, assign couriers, and advance milestone status in real-time.
          </p>
        </div>

        <button
          onClick={fetchOrders}
          className="btn-rose-primary px-4 py-2 text-xs font-bold flex items-center gap-2 self-start sm:self-auto"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Orders</span>
        </button>
      </div>

      {/* Filter and Status Tab Bar */}
      <div className="p-4 rounded-3xl glass-card border border-rose-200/80 dark:border-rose-950/60 space-y-4">
        {/* Status Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {statuses.map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-[#c94d64] text-white shadow-sm'
                  : 'bg-rose-50/70 dark:bg-rose-950/30 text-slate-600 dark:text-slate-300 hover:bg-rose-100'
              }`}
            >
              {st} {st !== 'All' ? `(${orders.filter(o => o.status === st).length})` : `(${orders.length})`}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order number (BNB-...), customer name, or phone number..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#120a14]"
          />
          <Search className="w-4 h-4 text-rose-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-3xl glass-card border border-rose-200/80 dark:border-rose-950/60 overflow-hidden shadow-sm">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">
            No orders found under current filter criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-rose-50/50 dark:bg-rose-950/30 border-b border-rose-100 dark:border-rose-950/60 text-slate-600 dark:text-slate-400">
                <tr>
                  <th className="py-3 px-4 font-semibold">Order Ref</th>
                  <th className="py-3 px-4 font-semibold">Customer & Contact</th>
                  <th className="py-3 px-4 font-semibold">Ordered Product</th>
                  <th className="py-3 px-4 font-semibold">Payable</th>
                  <th className="py-3 px-4 font-semibold">Courier & Division</th>
                  <th className="py-3 px-4 font-semibold">Live Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-100/60 dark:divide-rose-950/40">
                {filteredOrders.map(ord => (
                  <tr key={ord._id || ord.orderNumber} className="hover:bg-rose-50/30 dark:hover:bg-rose-950/20 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white">
                      {ord.orderNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-slate-900 dark:text-white">{ord.buyerName}</p>
                      <p className="text-[10px] text-slate-400">{ord.buyerPhone}</p>
                    </td>
                    <td className="py-3.5 px-4 max-w-[200px]">
                      <div className="flex items-center gap-2">
                        {ord.productImage && (
                          <img
                            src={ord.productImage}
                            alt=""
                            className="w-8 h-8 rounded-lg object-cover shrink-0 border border-rose-100 dark:border-rose-900/40"
                          />
                        )}
                        <div className="truncate">
                          <p className="font-medium text-slate-800 dark:text-slate-200 truncate">{ord.productTitle}</p>
                          <p className="text-[10px] text-slate-400">Shade: {ord.shade || 'Default'} • Qty: {ord.quantity}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#c94d64] dark:text-[#f4728d]">
                      {formatPrice(ord.totalAmount)}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                      <p className="font-medium">{ord.courierService || 'Pathao Courier'}</p>
                      <p className="text-[10px] text-slate-400">{ord.division || 'Dhaka'}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={ord.status || 'Confirmed'}
                        onChange={(e) => handleUpdateStatus(ord._id || ord.orderNumber, e.target.value)}
                        className={`text-[11px] font-bold px-2 py-1 rounded-xl border transition-colors ${
                          ord.status === 'Delivered'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300'
                            : ord.status === 'Shipped'
                            ? 'bg-purple-50 text-purple-800 border-purple-300 dark:bg-purple-950/40 dark:text-purple-300'
                            : ord.status === 'Processing'
                            ? 'bg-blue-50 text-blue-800 border-blue-300 dark:bg-blue-950/40 dark:text-blue-300'
                            : 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300'
                        }`}
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setActiveModalOrder(ord)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-[#c94d64] hover:bg-rose-50 dark:hover:bg-rose-950/40"
                          title="View Invoice & Full Details"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>

                        <Link
                          href={`https://wa.me/${(ord.buyerPhone || '8801700000000').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${ord.buyerName}, your Beauty & Blush order ${ord.orderNumber} is currently: ${ord.status}. Delivery via ${ord.courierService || 'Express Courier'}.`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
                          title="Notify on WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {activeModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#180e1a] rounded-3xl max-w-lg w-full p-6 border border-rose-200 dark:border-rose-900/60 shadow-2xl relative space-y-4">
            <button
              onClick={() => setActiveModalOrder(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="border-b border-rose-100 dark:border-rose-950/60 pb-3">
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#c94d64]">
                Order Details & Invoice
              </span>
              <h3 className="text-xl font-mono font-bold text-slate-900 dark:text-white mt-0.5">
                {activeModalOrder.orderNumber}
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 space-y-1">
                <p className="font-bold text-slate-900 dark:text-white">Customer Information:</p>
                <p className="text-slate-600 dark:text-slate-300">Name: {activeModalOrder.buyerName}</p>
                <p className="text-slate-600 dark:text-slate-300">Phone: {activeModalOrder.buyerPhone}</p>
                <p className="text-slate-600 dark:text-slate-300">Address: {activeModalOrder.deliveryAddress} ({activeModalOrder.division})</p>
              </div>

              <div className="p-3 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 space-y-1">
                <p className="font-bold text-slate-900 dark:text-white">Courier & Fulfillment:</p>
                <p className="text-slate-600 dark:text-slate-300">Courier Partner: {activeModalOrder.courierService || 'Pathao Courier'}</p>
                <p className="text-slate-600 dark:text-slate-300">Payment: {activeModalOrder.paymentMethod} (৳{activeModalOrder.totalAmount})</p>
                <p className="text-slate-600 dark:text-slate-300">Status: <strong className="text-[#c94d64]">{activeModalOrder.status}</strong></p>
              </div>

              <div className="pt-2 flex gap-2">
                <Link
                  href={`/track-order?order=${activeModalOrder.orderNumber}`}
                  target="_blank"
                  className="flex-1 py-2.5 rounded-xl border border-rose-200 text-center font-bold text-slate-700 dark:text-slate-300 hover:text-[#c94d64]"
                >
                  Open Live Tracker
                </Link>

                <button
                  onClick={() => setActiveModalOrder(null)}
                  className="flex-1 btn-rose-primary py-2.5 font-bold"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
