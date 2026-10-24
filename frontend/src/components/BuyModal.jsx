"use client";

import React, { useState } from 'react';
import { X, CheckCircle2, Truck, ShieldCheck, ShoppingBag } from 'lucide-react';
import { formatPrice } from '@/utils/formatters';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { api } from '@/lib/api';

export function BuyModal({ product, onClose }) {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [quantity, setQuantity] = useState(1);
  const [buyerName, setBuyerName] = useState(user ? user.name : '');
  const [buyerPhone, setBuyerPhone] = useState(user ? user.phone : '');
  const [buyerAddress, setBuyerAddress] = useState(user ? user.location : '');
  const [division, setDivision] = useState('Dhaka');
  const [courier, setCourier] = useState('Pathao Courier');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery (COD)');
  const [submitting, setSubmitting] = useState(false);
  const [orderResult, setOrderResult] = useState(null);

  const deliveryFee = division === 'Dhaka' ? 60 : 120;
  const subtotal = product.price * quantity;
  const totalAmount = subtotal + deliveryFee;

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!buyerName || !buyerPhone || !buyerAddress) {
      showToast('Please complete all contact and address fields', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const orderPayload = {
        productId: product._id || product.id,
        productTitle: product.title,
        productPrice: product.price,
        productImage: product.images && product.images[0] ? product.images[0] : '',
        shade: product.shade || 'Default',
        quantity,
        buyerId: user ? user.id : 'guest-' + Date.now(),
        buyerName,
        buyerEmail: user ? user.email : '',
        buyerPhone,
        sellerId: product.sellerId || 'seller-admin',
        sellerName: product.sellerName || 'Beauty Boutique',
        deliveryAddress: buyerAddress,
        division,
        courierService: courier,
        paymentMethod
      };

      const res = await api.post('/orders', orderPayload);
      setOrderResult(res.data);
      showToast('Order confirmed successfully!', 'success');
    } catch (err) {
      console.error('Order submission failed', err);
      showToast('Failed to place order. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-[#1a0f1c] rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-rose-200 dark:border-rose-900/60 shadow-2xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {orderResult ? (
          /* Order Confirmation View */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">
              Order Confirmed!
            </h2>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Your order reference is <strong className="font-mono text-rose-600 dark:text-rose-400 font-bold">{orderResult.orderNumber}</strong>. The boutique is preparing your authentic cosmetic item.
            </p>

            <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 text-left text-xs space-y-2 border border-rose-100 dark:border-rose-900/40">
              <div className="flex justify-between">
                <span className="text-slate-500">Item:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{orderResult.productTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Payable (COD):</span>
                <span className="font-bold text-rose-600 dark:text-rose-400">{formatPrice(orderResult.totalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Courier:</span>
                <span>{orderResult.courierService} ({orderResult.division})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Deliver To:</span>
                <span className="truncate max-w-[200px]">{orderResult.deliveryAddress}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full btn-rose-primary py-3 text-xs font-semibold"
            >
              Done & Return
            </button>
          </div>
        ) : (
          /* Order Placement Form */
          <form onSubmit={handleSubmitOrder} className="space-y-5">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-rose-500">
                Express Checkout
              </span>
              <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white">
                Purchase Authentic Cosmetic
              </h2>
            </div>

            {/* Product Summary */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40">
              <img
                src={product.images && product.images[0] ? product.images[0] : ''}
                alt={product.title}
                className="w-14 h-14 object-cover rounded-xl shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{product.title}</h4>
                <p className="text-[11px] text-slate-500">{product.shade || product.condition}</p>
                <p className="text-xs font-bold text-rose-600 dark:text-rose-400 mt-0.5">{formatPrice(product.price)}</p>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 rounded-lg border border-rose-200 dark:border-rose-900/50 text-xs font-bold"
                >
                  -
                </button>
                <span className="text-xs font-bold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-7 rounded-lg border border-rose-200 dark:border-rose-900/50 text-xs font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Recipient Information */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="e.g. Nusrat Jahan"
                  className="w-full text-xs p-2.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#120a14]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Phone Number (For Courier Call)</label>
                <input
                  type="tel"
                  required
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  placeholder="e.g. 01700-112233"
                  className="w-full text-xs p-2.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#120a14]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Delivery Address</label>
                <textarea
                  rows={2}
                  required
                  value={buyerAddress}
                  onChange={(e) => setBuyerAddress(e.target.value)}
                  placeholder="House, Road, Area (e.g. House 14, Road 7, Banani, Dhaka)"
                  className="w-full text-xs p-2.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#120a14]"
                />
              </div>

              {/* Division & Courier */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Division</label>
                  <select
                    value={division}
                    onChange={(e) => setDivision(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#120a14]"
                  >
                    <option value="Dhaka">Dhaka (৳60)</option>
                    <option value="Chittagong">Chittagong (৳120)</option>
                    <option value="Sylhet">Sylhet (৳120)</option>
                    <option value="Rajshahi">Rajshahi (৳120)</option>
                    <option value="Khulna">Khulna (৳120)</option>
                    <option value="Barisal">Barisal (৳120)</option>
                    <option value="Rangpur">Rangpur (৳120)</option>
                    <option value="Mymensingh">Mymensingh (৳120)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Courier Service</label>
                  <select
                    value={courier}
                    onChange={(e) => setCourier(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#120a14]"
                  >
                    <option value="Pathao Courier">Pathao Courier</option>
                    <option value="Steadfast Courier">Steadfast Courier</option>
                    <option value="RedX">RedX Express</option>
                    <option value="Sundarban Courier">Sundarban Courier</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Payment Method</label>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Cash on Delivery (COD)')}
                  className={`p-3 rounded-xl border text-left font-semibold ${
                    paymentMethod === 'Cash on Delivery (COD)'
                      ? 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                      : 'border-rose-200 dark:border-rose-900/40'
                  }`}
                >
                  Cash on Delivery (COD)
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bKash / Nagad')}
                  className={`p-3 rounded-xl border text-left font-semibold ${
                    paymentMethod === 'bKash / Nagad'
                      ? 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                      : 'border-rose-200 dark:border-rose-900/40'
                  }`}
                >
                  bKash / Nagad
                </button>
              </div>
            </div>

            {/* Bill Summary */}
            <div className="p-3.5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Subtotal ({quantity} item{quantity > 1 ? 's' : ''}):</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Nationwide Courier Fee ({division}):</span>
                <span>{formatPrice(deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 dark:text-white pt-1.5 border-t border-rose-200/60 dark:border-rose-900/40">
                <span>Total Amount:</span>
                <span className="text-rose-600 dark:text-rose-400">{formatPrice(totalAmount)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full btn-rose-primary py-3.5 text-xs font-bold flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{submitting ? 'Placing Order...' : 'Confirm Order with Cash on Delivery'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
