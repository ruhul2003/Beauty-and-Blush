"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, 
  RefreshCw, 
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
          className="bg-[#b84357] hover:bg-[#a13649] text-white px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-2 self-start sm:self-auto shadow-md shadow-[#b84357]/20 cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Orders</span>
        </button>
      </div>

      {/* Filter and Status Tab Bar */}
      <div className="p-4 rounded-3xl bg-white/60 dark:bg-[#140b17]/65 backdrop-blur-2xl border border-black/[0.05] dark:border-white/[0.08] space-y-4 shadow-xs">
        {/* Status Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {statuses.map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#b84357] text-white shadow-xs'
                  : 'bg-black/[0.03] dark:bg-white/[0.05] text-slate-600 dark:text-slate-300 hover:bg-black/[0.05]'
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
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.04] text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#b84357]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-3xl bg-white/60 dark:bg-[#140b17]/65 backdrop-blur-2xl border border-black/[0.05] dark:border-white/[0.08] overflow-hidden shadow-xs">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">
            No orders found under current filter criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-black/[0.015] dark:bg-white/[0.02] border-b border-black/[0.05] dark:border-white/[0.08] text-slate-600 dark:text-slate-400">
                <tr>
                  <th className="py-3 px-4 font-semibold font-serif">Order Ref</th>
                  <th className="py-3 px-4 font-semibold font-serif">Customer & Contact</th>
                  <th className="py-3 px-4 font-semibold font-serif">Ordered Product</th>
                  <th className="py-3 px-4 font-semibold font-serif">Payable</th>
                  <th className="py-3 px-4 font-semibold font-serif">Courier & Division</th>
                  <th className="py-3 px-4 font-semibold font-serif">Live Status</th>
                  <th className="py-3 px-4 font-semibold font-serif text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.05]">
                {filteredOrders.map(ord => (
                  <tr key={ord._id || ord.orderNumber} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors">
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
                            className="w-8 h-8 rounded-lg object-cover shrink-0 border border-black/[0.05] dark:border-white/[0.08]"
                          />
                        )}
                        <div className="truncate">
                          <p className="font-medium text-slate-800 dark:text-slate-200 truncate">{ord.productTitle}</p>
                          <p className="text-[10px] text-slate-400">Shade: {ord.shade || 'Default'} • Qty: {ord.quantity}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#b84357] dark:text-rose-300 font-serif">
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
                            ? 'bg-emerald-500/10 text-emerald-800 border-emerald-500/20 dark:bg-emerald-950/40 dark:text-emerald-300'
                            : ord.status === 'Shipped'
                            ? 'bg-purple-500/10 text-purple-800 border-purple-500/20 dark:bg-purple-950/40 dark:text-purple-300'
                            : ord.status === 'Processing'
                            ? 'bg-blue-500/10 text-blue-800 border-blue-500/20 dark:bg-blue-950/40 dark:text-blue-300'
                            : 'bg-amber-500/10 text-amber-800 border-amber-500/20 dark:bg-amber-950/40 dark:text-amber-300'
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
                          className="p-1.5 rounded-lg text-slate-500 hover:text-[#b84357] hover:bg-black/[0.04] transition-colors cursor-pointer"
                          title="View Invoice & Full Details"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>

                        <Link
                          href={`https://wa.me/${(ord.buyerPhone || '8801700000000').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${ord.buyerName}, your Beauty & Blush order ${ord.orderNumber} is currently: ${ord.status}. Delivery via ${ord.courierService || 'Express Courier'}.`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-500/10 transition-colors"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-fade-in">
          <div className="bg-white/85 dark:bg-[#140b17]/90 backdrop-blur-3xl rounded-3xl max-w-lg w-full p-6 border border-black/[0.06] dark:border-white/[0.08] shadow-[0_25px_60px_rgba(0,0,0,0.25)] relative space-y-4">
            <button
              onClick={() => setActiveModalOrder(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="border-b border-black/[0.05] dark:border-white/[0.08] pb-3">
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#b84357] dark:text-rose-300">
                Order Details & Invoice
              </span>
              <h3 className="text-xl font-mono font-bold text-slate-900 dark:text-white mt-0.5">
                {activeModalOrder.orderNumber}
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.08] space-y-1">
                <p className="font-bold text-slate-900 dark:text-white">Customer Information:</p>
                <p className="text-slate-600 dark:text-slate-300">Name: {activeModalOrder.buyerName}</p>
                <p className="text-slate-600 dark:text-slate-300">Phone: {activeModalOrder.buyerPhone}</p>
                <p className="text-slate-600 dark:text-slate-300">Address: {activeModalOrder.deliveryAddress} ({activeModalOrder.division})</p>
              </div>

              <div className="p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.08] space-y-1">
                <p className="font-bold text-slate-900 dark:text-white">Courier & Fulfillment:</p>
                <p className="text-slate-600 dark:text-slate-300">Courier Partner: {activeModalOrder.courierService || 'Pathao Courier'}</p>
                <p className="text-slate-600 dark:text-slate-300">Payment: {activeModalOrder.paymentMethod} (৳{activeModalOrder.totalAmount})</p>
                <p className="text-slate-600 dark:text-slate-300">Status: <strong className="text-[#b84357] dark:text-rose-300">{activeModalOrder.status}</strong></p>
              </div>

              <div className="pt-2 flex gap-2">
                <Link
                  href={`/track-order?order=${activeModalOrder.orderNumber}`}
                  target="_blank"
                  className="flex-1 py-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.1] text-center font-bold text-slate-700 dark:text-slate-300 hover:text-[#b84357]"
                >
                  Open Live Tracker
                </Link>

                <button
                  onClick={() => setActiveModalOrder(null)}
                  className="flex-1 bg-[#b84357] hover:bg-[#a13649] text-white py-2.5 rounded-xl font-bold cursor-pointer shadow-xs"
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
