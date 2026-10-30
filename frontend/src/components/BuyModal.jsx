"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ShoppingBag, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  User, 
  Truck, 
  Sparkles,
  Tag
} from 'lucide-react';
import { formatPrice } from '@/utils/formatters';
import { useToast } from '@/context/ToastContext';
import { api } from '@/lib/api';

export function BuyModal({ product, onClose }) {
  const { showToast } = useToast();

  const [quantity, setQuantity] = useState(product?.quantity || 1);
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerAddress, setBuyerAddress] = useState('');
  const [division, setDivision] = useState('Dhaka');
  const [courier, setCourier] = useState('Pathao Courier');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery (COD)');
  
  // Promo code state
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponLoading, setCouponLoading] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [orderResult, setOrderResult] = useState(null);

  if (!product) return null;

  const basePrice = Number(product.price) || 0;
  const subtotal = basePrice * quantity;
  const deliveryFee = division === 'Dhaka' ? 60 : 120;

  // Calculate discount from coupon
  let couponDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      couponDiscount = Math.round((subtotal * appliedCoupon.discountValue) / 100);
      if (appliedCoupon.maxDiscount && couponDiscount > appliedCoupon.maxDiscount) {
        couponDiscount = appliedCoupon.maxDiscount;
      }
    } else if (appliedCoupon.discountType === 'fixed') {
      couponDiscount = appliedCoupon.discountValue;
    } else if (appliedCoupon.discountType === 'shipping') {
      couponDiscount = deliveryFee;
    }
  }

  const effectiveDelivery = appliedCoupon && appliedCoupon.discountType === 'shipping' ? 0 : deliveryFee;
  const totalAmount = Math.max(0, subtotal - (appliedCoupon && appliedCoupon.discountType !== 'shipping' ? couponDiscount : 0) + effectiveDelivery);

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setCouponLoading(true);

    try {
      const res = await api.post('/coupons/validate', {
        code: couponInput.trim(),
        cartTotal: subtotal
      });

      if (res.data && res.data.valid) {
        setAppliedCoupon(res.data.coupon);
        showToast(res.data.message || 'Coupon applied successfully!', 'success');
      } else {
        showToast(res.data.message || 'Invalid coupon code', 'error');
      }
    } catch (err) {
      // Local fallback coupons for demonstration
      const upper = couponInput.trim().toUpperCase();
      if (upper === 'BLUSH15') {
        setAppliedCoupon({
          code: 'BLUSH15',
          discountType: 'percentage',
          discountValue: 15,
          description: '15% Off Exclusive'
        });
        showToast('15% discount applied!', 'success');
      } else if (upper === 'FREESHIP') {
        setAppliedCoupon({
          code: 'FREESHIP',
          discountType: 'shipping',
          discountValue: deliveryFee,
          description: 'Free Courier Delivery'
        });
        showToast('Free delivery coupon applied!', 'success');
      } else {
        showToast('Invalid or expired voucher code', 'error');
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
      showToast('Please fill in all delivery details', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const orderPayload = {
        productId: product._id || product.id,
        productTitle: product.title,
        productImage: product.images && product.images[0] ? product.images[0] : (product.image || ''),
        price: product.price,
        quantity,
        shade: product.shade || 'Standard',
        buyerName,
        buyerPhone,
        deliveryAddress: buyerAddress,
        division,
        courierService: courier,
        paymentMethod,
        appliedCoupon: appliedCoupon ? appliedCoupon.code : null,
        discountAmount: couponDiscount,
        deliveryFee: effectiveDelivery,
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="glass-slab rounded-[36px] max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-5 right-5 glass-pill w-9 h-9 flex items-center justify-center text-slate-400 hover:text-[#181416] dark:hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </motion.button>

        {orderResult ? (
          /* Order Confirmation View */
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6 space-y-4"
          >
            <div className="w-14 h-14 rounded-full glass-well text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h2 className="text-2xl font-serif font-bold text-[#181416] dark:text-white">
              Order Confirmed
            </h2>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Your order reference is <strong className="font-mono text-[#b84357] dark:text-rose-300 font-bold">{orderResult.orderNumber}</strong>. The boutique is preparing your item.
            </p>

            <div className="p-4 rounded-2xl glass-well text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Item:</span>
                <span className="font-bold text-[#181416] dark:text-white">{orderResult.productTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Total Payable (COD):</span>
                <span className="font-bold text-[#b84357] dark:text-rose-300">{formatPrice(orderResult.totalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Courier:</span>
                <span className="font-medium text-[#181416] dark:text-white">{orderResult.courierService} ({orderResult.division})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Deliver To:</span>
                <span className="truncate max-w-[200px] font-medium text-[#181416] dark:text-white">{orderResult.deliveryAddress}</span>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={onClose}
              className="w-full bg-[#b84357] hover:bg-[#a13649] text-white py-3.5 text-xs font-bold rounded-full shadow-lg shadow-[#b84357]/25 cursor-pointer"
            >
              Done & Return
            </motion.button>
          </motion.div>
        ) : (
          /* Order Placement Form */
          <form onSubmit={handleSubmitOrder} className="space-y-5">
            <div>
              <span className="glass-pill px-3 py-0.5 text-[10px] uppercase font-bold tracking-widest text-[#b84357] dark:text-rose-300 inline-block mb-1">
                Express Checkout
              </span>
              <h2 className="text-xl font-serif font-bold text-[#181416] dark:text-white">
                Complete Your Order
              </h2>
            </div>

            {/* Product Summary */}
            <div className="flex items-center gap-3 p-3.5 rounded-2xl glass-well">
              <img
                src={product.images && product.images[0] ? product.images[0] : (product.image || '')}
                alt={product.title}
                className="w-12 h-12 object-cover rounded-xl shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-[#181416] dark:text-white truncate">{product.title}</h4>
                <p className="text-[11px] text-slate-500">{product.shade || product.condition}</p>
                <p className="text-xs font-bold text-[#b84357] dark:text-rose-300 mt-0.5">{formatPrice(product.price)}</p>
              </div>

              {/* Quantity Selector */}
              <div className="glass-well rounded-full flex items-center p-0.5">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white text-xs font-bold cursor-pointer"
                >
                  -
                </motion.button>
                <span className="px-2 text-xs font-bold min-w-[20px] text-center">{quantity}</span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white text-xs font-bold cursor-pointer"
                >
                  +
                </motion.button>
              </div>
            </div>

            {/* Recipient Information */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[#181416] dark:text-slate-300 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="e.g. Nusrat Jahan"
                  className="w-full text-xs p-3 rounded-2xl glass-well text-[#181416] dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#181416] dark:text-slate-300 block mb-1">Phone Number (For Courier Call)</label>
                <input
                  type="tel"
                  required
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  placeholder="e.g. 01700-112233"
                  className="w-full text-xs p-3 rounded-2xl glass-well text-[#181416] dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#181416] dark:text-slate-300 block mb-1">Delivery Address</label>
                <textarea
                  rows={2}
                  required
                  value={buyerAddress}
                  onChange={(e) => setBuyerAddress(e.target.value)}
                  placeholder="House, Road, Area (e.g. House 14, Road 7, Banani, Dhaka)"
                  className="w-full text-xs p-3 rounded-2xl glass-well text-[#181416] dark:text-white focus:outline-none"
                />
              </div>

              {/* Division & Courier */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#181416] dark:text-slate-300 block mb-1">Division</label>
                  <div className="glass-well rounded-2xl p-1">
                    <select
                      value={division}
                      onChange={(e) => setDivision(e.target.value)}
                      className="w-full text-xs p-2 bg-transparent text-[#181416] dark:text-white focus:outline-none"
                    >
                      <option value="Dhaka" className="bg-white dark:bg-[#140b17]">Dhaka (৳60)</option>
                      <option value="Chittagong" className="bg-white dark:bg-[#140b17]">Chittagong (৳120)</option>
                      <option value="Sylhet" className="bg-white dark:bg-[#140b17]">Sylhet (৳120)</option>
                      <option value="Rajshahi" className="bg-white dark:bg-[#140b17]">Rajshahi (৳120)</option>
                      <option value="Khulna" className="bg-white dark:bg-[#140b17]">Khulna (৳120)</option>
                      <option value="Barisal" className="bg-white dark:bg-[#140b17]">Barisal (৳120)</option>
                      <option value="Rangpur" className="bg-white dark:bg-[#140b17]">Rangpur (৳120)</option>
                      <option value="Mymensingh" className="bg-white dark:bg-[#140b17]">Mymensingh (৳120)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#181416] dark:text-slate-300 block mb-1">Courier Service</label>
                  <div className="glass-well rounded-2xl p-1">
                    <select
                      value={courier}
                      onChange={(e) => setCourier(e.target.value)}
                      className="w-full text-xs p-2 bg-transparent text-[#181416] dark:text-white focus:outline-none"
                    >
                      <option value="Pathao Courier" className="bg-white dark:bg-[#140b17]">Pathao Courier</option>
                      <option value="Steadfast Courier" className="bg-white dark:bg-[#140b17]">Steadfast Courier</option>
                      <option value="RedX" className="bg-white dark:bg-[#140b17]">RedX Express</option>
                      <option value="Sundarban Courier" className="bg-white dark:bg-[#140b17]">Sundarban Courier</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div>
              <label className="text-xs font-bold text-[#181416] dark:text-slate-300 block mb-1">Payment Method</label>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Cash on Delivery (COD)')}
                  className={`p-3 rounded-2xl font-bold transition-all cursor-pointer ${
                    paymentMethod === 'Cash on Delivery (COD)'
                      ? 'bg-[#b84357] text-white shadow-sm'
                      : 'glass-well text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Cash on Delivery (COD)
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bKash / Nagad')}
                  className={`p-3 rounded-2xl font-bold transition-all cursor-pointer ${
                    paymentMethod === 'bKash / Nagad'
                      ? 'bg-[#b84357] text-white shadow-sm'
                      : 'glass-well text-slate-700 dark:text-slate-300'
                  }`}
                >
                  bKash / Nagad
                </button>
              </div>
            </div>

            {/* Promo Code Input */}
            <div>
              <label className="text-xs font-bold text-[#181416] dark:text-slate-300 block mb-1">
                Have a Promo Voucher?
              </label>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
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
                    className="text-xs font-bold text-[#b84357] hover:text-[#a13649] px-2 py-1 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <div className="glass-well rounded-2xl flex items-center px-3.5 py-2">
                      <Tag className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        placeholder="Try BLUSH15 or FREESHIP"
                        className="w-full bg-transparent text-xs text-[#181416] dark:text-white uppercase font-mono tracking-wider focus:outline-none"
                      />
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.94 }}
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={couponLoading || !couponInput.trim()}
                    className="bg-[#b84357] hover:bg-[#a13649] text-white px-5 py-2 text-xs font-bold rounded-2xl shrink-0 disabled:opacity-50 cursor-pointer shadow-sm"
                  >
                    {couponLoading ? 'Checking...' : 'Apply'}
                  </motion.button>
                </div>
              )}
            </div>

            {/* Bill Summary */}
            <div className="p-4 rounded-2xl glass-well space-y-2 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Subtotal ({quantity} item{quantity > 1 ? 's' : ''}):</span>
                <span className="font-bold text-[#181416] dark:text-white">{formatPrice(subtotal)}</span>
              </div>
              {appliedCoupon && couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                  <span>Coupon Discount ({appliedCoupon.code}):</span>
                  <span>-{formatPrice(couponDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Nationwide Courier Fee ({division}):</span>
                <span className="font-bold text-[#181416] dark:text-white">{appliedCoupon && appliedCoupon.discountType === 'shipping' ? <span className="text-emerald-600 font-bold">FREE (Waived)</span> : formatPrice(deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#181416] dark:text-white pt-2 border-t border-black/[0.04] dark:border-white/[0.06]">
                <span>Total Amount:</span>
                <span className="text-[#b84357] dark:text-rose-300 text-base">{formatPrice(totalAmount)}</span>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={submitting}
              className="w-full bg-[#b84357] hover:bg-[#a13649] text-white py-3.5 text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#b84357]/25 cursor-pointer rounded-full"
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
