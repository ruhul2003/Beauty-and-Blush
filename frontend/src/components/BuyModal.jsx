"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Truck, ShieldCheck, ShoppingBag, Tag, Check, Sparkles } from 'lucide-react';
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

  // Promo Coupon State
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponLoading, setCouponLoading] = useState(false);

  const deliveryFee = appliedCoupon && appliedCoupon.discountType === 'shipping'
    ? 0
    : (division === 'Dhaka' ? 60 : 120);

  const subtotal = product.price * quantity;
  
  const couponDiscount = appliedCoupon ? appliedCoupon.discount : 0;
  const totalAmount = Math.max(0, subtotal - couponDiscount + deliveryFee);

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    setCouponLoading(true);
    try {
      const code = couponInput.trim().toUpperCase();
      const res = await api.post('/coupons/validate', { code, amount: subtotal });
      if (res.data && res.data.valid) {
        setAppliedCoupon(res.data);
        showToast(`Promo ${code} applied! Saved ৳${res.data.discount}`, 'success');
      } else {
        showToast(res.data?.message || 'Invalid coupon code', 'error');
      }
    } catch (err) {
      // Local fallback for client-side demo if server route is cold
      const code = couponInput.trim().toUpperCase();
      if (code === 'BLUSH15') {
        const discount = Math.round(subtotal * 0.15);
        setAppliedCoupon({ code, discount, discountType: 'percentage', description: '15% Off Special Discount' });
        showToast('Promo BLUSH15 applied! 15% discount deducted', 'success');
      } else if (code === 'GLOW20') {
        const discount = Math.round(subtotal * 0.20);
        setAppliedCoupon({ code, discount, discountType: 'percentage', description: '20% Off Glow Discount' });
        showToast('Promo GLOW20 applied! 20% discount deducted', 'success');
      } else if (code === 'FREESHIP') {
        setAppliedCoupon({ code, discount: 0, discountType: 'shipping', description: 'Free Express Shipping' });
        showToast('Promo FREESHIP applied! Delivery fee waived', 'success');
      } else {
        showToast('Invalid or expired coupon code', 'error');
      }
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput('');
    showToast('Coupon removed', 'info');
  };

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
        paymentMethod,
        couponCode: appliedCoupon ? appliedCoupon.code : null,
        discountAmount: couponDiscount,
        totalAmount
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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white dark:bg-[#141114] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-[#eee7e6] dark:border-white/10 shadow-2xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-[#191416] dark:hover:text-white hover:bg-[#faf8f7] dark:hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </motion.button>

        {orderResult ? (
          /* Order Confirmation View */
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6 space-y-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-900/40">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h2 className="text-2xl font-serif font-normal text-slate-900 dark:text-white">
              Order Confirmed
            </h2>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Your order reference is <strong className="font-mono text-[#191416] dark:text-white font-semibold">{orderResult.orderNumber}</strong>. The boutique is preparing your item.
            </p>

            <div className="p-4 rounded-xl bg-[#faf8f7] dark:bg-white/5 text-left text-xs space-y-2 border border-[#eee7e6] dark:border-white/10">
              <div className="flex justify-between">
                <span className="text-slate-500">Item:</span>
                <span className="font-medium text-slate-900 dark:text-white">{orderResult.productTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Payable (COD):</span>
                <span className="font-semibold text-[#191416] dark:text-white">{formatPrice(orderResult.totalAmount)}</span>
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

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={onClose}
              className="w-full btn-rose-primary py-2.5 text-xs font-medium"
            >
              Done & Return
            </motion.button>
          </motion.div>
        ) : (
          /* Order Placement Form */
          <form onSubmit={handleSubmitOrder} className="space-y-5">
            <div>
              <span className="text-[10px] uppercase font-medium tracking-widest text-[#82757a]">
                Express Checkout
              </span>
              <h2 className="text-xl font-serif font-normal text-slate-900 dark:text-white">
                Complete Your Order
              </h2>
            </div>

            {/* Product Summary */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#faf8f7] dark:bg-white/5 border border-[#eee7e6] dark:border-white/10">
              <img
                src={product.images && product.images[0] ? product.images[0] : ''}
                alt={product.title}
                className="w-12 h-12 object-cover rounded-lg shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-medium text-slate-900 dark:text-white truncate">{product.title}</h4>
                <p className="text-[11px] text-slate-500">{product.shade || product.condition}</p>
                <p className="text-xs font-semibold text-[#191416] dark:text-white mt-0.5">{formatPrice(product.price)}</p>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-2">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 rounded-md border border-[#eee7e6] dark:border-white/10 text-xs font-medium flex items-center justify-center hover:bg-slate-50 dark:hover:bg-white/5"
                >
                  -
                </motion.button>
                <span className="text-xs font-medium">{quantity}</span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-7 rounded-md border border-[#eee7e6] dark:border-white/10 text-xs font-medium flex items-center justify-center hover:bg-slate-50 dark:hover:bg-white/5"
                >
                  +
                </motion.button>
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
                  className={`p-3 rounded-xl border text-left font-semibold transition-all ${
                    paymentMethod === 'Cash on Delivery (COD)'
                      ? 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 shadow-sm'
                      : 'border-rose-200 dark:border-rose-900/40'
                  }`}
                >
                  Cash on Delivery (COD)
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bKash / Nagad')}
                  className={`p-3 rounded-xl border text-left font-semibold transition-all ${
                    paymentMethod === 'bKash / Nagad'
                      ? 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 shadow-sm'
                      : 'border-rose-200 dark:border-rose-900/40'
                  }`}
                >
                  bKash / Nagad
                </button>
              </div>
            </div>

            {/* Promo Code Input */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Have a Promo Voucher?
              </label>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-xs">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <div>
                      <span className="font-bold text-emerald-700 dark:text-emerald-300 tracking-wide font-mono">
                        {appliedCoupon.code}
                      </span>
                      <p className="text-[10px] text-emerald-600/80 dark:text-emerald-400/80">
                        {appliedCoupon.description || 'Voucher applied successfully'}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    className="text-xs font-semibold text-rose-500 hover:text-rose-700 dark:hover:text-rose-400 px-2 py-1"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="Try BLUSH15 or GLOW20"
                      className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#120a14] uppercase font-mono tracking-wider"
                    />
                    <Tag className="w-3.5 h-3.5 text-rose-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.94 }}
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={couponLoading || !couponInput.trim()}
                    className="btn-rose-primary px-4 py-2 text-xs font-semibold shrink-0 disabled:opacity-50"
                  >
                    {couponLoading ? 'Checking...' : 'Apply'}
                  </motion.button>
                </div>
              )}
            </div>

            {/* Bill Summary */}
            <div className="p-3.5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Subtotal ({quantity} item{quantity > 1 ? 's' : ''}):</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {appliedCoupon && couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                  <span>Coupon Discount ({appliedCoupon.code}):</span>
                  <span>-{formatPrice(couponDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Nationwide Courier Fee ({division}):</span>
                <span>{appliedCoupon && appliedCoupon.discountType === 'shipping' ? <span className="text-emerald-600 font-semibold">FREE (Waived)</span> : formatPrice(deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 dark:text-white pt-1.5 border-t border-rose-200/60 dark:border-rose-900/40">
                <span>Total Amount:</span>
                <span className="text-rose-600 dark:text-rose-400">{formatPrice(totalAmount)}</span>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={submitting}
              className="w-full btn-rose-primary py-3.5 text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-[#b84357]/20"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{submitting ? 'Placing Order...' : 'Confirm Order with Cash on Delivery'}</span>
            </motion.button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}