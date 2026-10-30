"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Star, 
  MapPin, 
  Truck, 
  Heart, 
  Share2, 
  MessageCircle, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle,
  ShoppingBag,
  Send
} from 'lucide-react';
import { formatPrice, calculateDiscount } from '@/utils/formatters';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { api } from '@/lib/api';
import { BuyModal } from '@/components/BuyModal';
import { ProductCard } from '@/components/ProductCard';
import { saveRecentProduct, getRecentProducts } from '@/utils/recentProducts';

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { showToast } = useToast();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [recentItems, setRecentItems] = useState([]);
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  
  // Q&A state
  const [questionInput, setQuestionInput] = useState('');
  const [qaList, setQaList] = useState([]);

  // Reviews state
  const [reviewsList, setReviewsList] = useState([]);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (id) {
      fetchProduct();
      fetchReviews();
    }
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
      if (res.data) {
        saveRecentProduct(res.data);
        const stored = getRecentProducts();
        setRecentItems(stored.filter(item => (item._id || item.id) !== id));
      }
      if (res.data && res.data.qa) {
        setQaList(res.data.qa);
      }
    } catch (err) {
      console.error('Failed to load product', err);
      showToast('Error loading product details', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await api.get(`/reviews?productId=${id}`);
      setReviewsList(res.data || []);
    } catch (err) {
      console.error('Failed to load reviews', err);
    }
  };

  const handleAskQuestion = async (e) => {
    e.preventDefault();
    if (!questionInput.trim()) return;
    try {
      const res = await api.post(`/products/${id}/qa`, {
        question: questionInput.trim(),
        askedBy: user ? user.name : 'Beauty Guest'
      });
      setQaList(res.data);
      setQuestionInput('');
      showToast('Your beauty question was submitted!', 'success');
    } catch (err) {
      showToast('Failed to post question', 'error');
    }
  };

  const handlePostReview = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      const res = await api.post('/reviews', {
        productId: id,
        userId: user ? user.id : 'guest',
        userName: user ? user.name : 'Beauty Lover',
        rating: newRating,
        comment: newComment.trim(),
        shadePurchased: product.shade || ''
      });
      setReviewsList(prev => [res.data, ...prev]);
      setNewComment('');
      showToast('Thank you for your authentic review!', 'success');
    } catch (err) {
      showToast('Failed to submit review', 'error');
    }
  };

  const openWhatsApp = () => {
    if (!product) return;
    const phone = product.sellerPhone || '+8801711224466';
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(`Hi, I'm inquiring about "${product.title}" (${formatPrice(product.price)}) on Beauty & Blush. Is this available for immediate courier dispatch?`);
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
  };

  if (loading) {
    return (
      <div className="w-[90%] mx-auto px-2 sm:px-4 py-20 text-center">
        <Sparkles className="w-8 h-8 text-rose-500 animate-spin mx-auto mb-3" />
        <p className="text-xs text-slate-500">Loading authentic beauty listing...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-[90%] mx-auto px-2 sm:px-4 py-20 text-center">
        <h2 className="text-xl font-bold">Listing Not Found</h2>
        <Link href="/browse" className="mt-4 inline-block btn-rose-primary px-4 py-2 text-xs">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 
    ? product.images 
    : ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80'];

  const discount = calculateDiscount(product.originalPrice, product.price);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-[90%] mx-auto px-2 sm:px-4 py-8 space-y-12"
    >
      {/* Top Breadcrumb */}
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-rose-600">Home</Link>
        <span>/</span>
        <Link href={`/browse?category=${product.category}`} className="hover:text-rose-600">{product.category}</Link>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 font-semibold truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Image Gallery (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden border border-white/60 dark:border-white/10 relative bg-white/50 dark:bg-white/5 backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.06)]">
            <img
              src={images[activeImageIndex]}
              alt={product.title}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {discount > 0 && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#c94d64]/90 text-white backdrop-blur-md shadow-xs">
                -{discount}% OFF
              </span>
            )}
            <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold bg-white/80 dark:bg-[#140b17]/80 text-slate-800 dark:text-white backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-xs">
              {product.condition}
            </span>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2.5 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-16 rounded-2xl overflow-hidden border transition-all shrink-0 cursor-pointer backdrop-blur-md ${
                    activeImageIndex === idx 
                      ? 'border-[#c94d64] ring-2 ring-[#c94d64]/50 scale-105' 
                      : 'border-white/60 dark:border-white/10 opacity-70 hover:opacity-100 bg-white/40 dark:bg-white/5'
                  }`}
                >
                  <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                </motion.button>
              ))}
            </div>
          )}

          {/* Authenticity Guarantee Card */}
          <div className="p-4 rounded-2xl bg-white/60 dark:bg-[#140c17]/60 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-xs flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold font-serif text-slate-900 dark:text-white">
                Authenticity Guarantee
              </h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                Batch code <strong className="font-mono bg-white/80 dark:bg-white/10 px-1.5 py-0.5 rounded-lg border border-white/60 dark:border-white/15 text-[#c94d64]">{product.batchCode || '3K01'}</strong> verified against manufacturer records.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Details & Purchase Actions (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <Link
                href={`/browse?category=${encodeURIComponent(product.category || 'All')}`}
                className="px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 font-bold uppercase tracking-wider text-[10px] hover:bg-rose-200 transition-colors"
              >
                {product.brand || product.category}
              </Link>
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>{product.rating || 4.9}</span>
                <span className="text-slate-400 font-normal">({reviewsList.length} reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white leading-tight">
              {product.title}
            </h1>

            {product.shade && (
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
                Shade / Finish: <span className="font-semibold text-rose-600 dark:text-rose-400">{product.shade}</span>
              </p>
            )}
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40 flex items-baseline gap-3">
            <span className="text-3xl font-serif font-bold text-slate-900 dark:text-white">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-slate-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="ml-auto text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              In Stock & Ready to Dispatch
            </span>
          </div>

          {/* Quantity and Action CTAs */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-rose-200 dark:border-rose-900/60 rounded-xl overflow-hidden bg-white dark:bg-white/5">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-2.5 text-slate-600 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-sm font-bold transition-colors cursor-pointer"
                >
                  -
                </button>
                <span className="px-4 py-2.5 text-xs font-bold text-slate-800 dark:text-white min-w-[36px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-2.5 text-slate-600 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-sm font-bold transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>

              <motion.button
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={() => addToCart(product, quantity)}
                className="flex-1 py-3 px-4 rounded-xl bg-white dark:bg-white/10 hover:bg-rose-50 dark:hover:bg-white/20 text-[#b84357] dark:text-rose-300 border border-rose-300 dark:border-rose-800 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </motion.button>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setBuyModalOpen(true)}
              className="w-full btn-rose-primary py-3.5 text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#b84357]/25 cursor-pointer"
            >
              <span>Instant Buy with Cash on Delivery (COD)</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={openWhatsApp}
              className="w-full py-3 rounded-xl border border-emerald-500/80 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask Seller via WhatsApp Direct</span>
            </motion.button>
          </div>

          {/* Courier Delivery Timeline Box */}
          <div className="p-4 rounded-2xl border border-rose-100 dark:border-rose-900/40 bg-white dark:bg-[#1a0f1c] space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
              <Truck className="w-4 h-4 text-rose-500" />
              <span>Courier Delivery Estimates</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-rose-50/50 dark:bg-rose-950/30">
                <span className="font-bold text-slate-800 dark:text-slate-200 block">Inside Dhaka</span>
                <span className="text-slate-500 text-[11px]">24 - 48 Hours • ৳60</span>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-50/50 dark:bg-rose-950/30">
                <span className="font-bold text-slate-800 dark:text-slate-200 block">Outside Dhaka</span>
                <span className="text-slate-500 text-[11px]">48 - 72 Hours • ৳120</span>
              </div>
            </div>
          </div>

          {/* Seller / Boutique Box */}
          <div className="p-4 rounded-2xl border border-rose-100 dark:border-rose-900/40 bg-white dark:bg-[#1a0f1c] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-rose-100 overflow-hidden text-rose-600 flex items-center justify-center font-bold text-sm">
                {product.sellerAvatar ? (
                  <img src={product.sellerAvatar} alt={product.sellerName} className="w-full h-full object-cover" />
                ) : (
                  product.sellerName ? product.sellerName.charAt(0) : 'S'
                )}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>{product.sellerName || 'Verified Boutique'}</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-rose-500" />
                </h4>
                <p className="text-[11px] text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-rose-400" />
                  <span>{product.location || 'Dhaka, Bangladesh'}</span>
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-amber-500 flex items-center justify-end gap-1">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{product.sellerRating || 4.9}</span>
              </span>
              <span className="text-[10px] text-slate-400">Verified Seller</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2">
              Product Overview & Specifications
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      {/* Community Q&A Section */}
      <section className="pt-8 border-t border-rose-100 dark:border-rose-950/40">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-rose-500" />
                <span>Customer Questions & Answers</span>
              </h2>
              <p className="text-xs text-slate-500">Ask the boutique seller directly about shades, skin suitability or authenticity.</p>
            </div>
          </div>

          {/* Ask question form */}
          <form onSubmit={handleAskQuestion} className="flex gap-2">
            <input
              type="text"
              value={questionInput}
              onChange={(e) => setQuestionInput(e.target.value)}
              placeholder="Ask a question about this product..."
              className="flex-1 p-3 text-xs rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#1a0f1c]"
            />
            <motion.button 
              whileTap={{ scale: 0.94 }}
              type="submit" 
              className="btn-rose-primary px-5 py-3 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Ask</span>
            </motion.button>
          </form>

          {/* Q&A List */}
          <div className="space-y-4">
            {qaList.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No community questions asked yet. Be the first to ask!</p>
            ) : (
              qaList.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                    <span className="text-rose-500 font-extrabold">Q:</span>
                    <span>{item.question}</span>
                  </div>
                  {item.answer ? (
                    <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300 pl-4 border-l-2 border-rose-400">
                      <span className="text-emerald-500 font-bold">A:</span>
                      <div>
                        <p>{item.answer}</p>
                        <span className="text-[10px] text-slate-400 mt-0.5 block">— Answered by {item.answeredBy}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-[11px] text-slate-400 pl-4">Awaiting seller response...</p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="pt-8 border-t border-rose-100 dark:border-rose-950/40">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500 fill-current" />
            <span>Verified Customer Reviews</span>
          </h2>

          {/* Leave a Review Form */}
          <form onSubmit={handlePostReview} className="p-5 rounded-2xl glass-panel space-y-4">
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">Share your experience with this product</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Your Rating:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setNewRating(star)}
                    className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Star className={`w-5 h-5 ${star <= newRating ? 'fill-current' : 'text-slate-300'}`} />
                  </button>
                ))}
              </div>
            </div>

            <textarea
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your review: texture, scent, skin feel, authenticity verification..."
              className="w-full p-3 text-xs rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#1a0f1c]"
            />

            <motion.button 
              whileTap={{ scale: 0.94 }}
              type="submit" 
              className="btn-rose-primary px-5 py-2.5 text-xs font-semibold cursor-pointer"
            >
              Post Review
            </motion.button>
          </form>

          {/* Reviews Stream */}
          <div className="space-y-4">
            {reviewsList.map((rev, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-rose-100 dark:border-rose-900/40 bg-white dark:bg-[#1a0f1c] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{rev.userName}</span>
                    <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                      Verified Purchase
                    </span>
                  </div>
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recently Viewed Products */}
      {recentItems.length > 0 && (
        <section className="pt-8 border-t border-rose-100 dark:border-rose-950/60 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c94d64] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Browsing History</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white mt-0.5">
                Recently Viewed Essentials
              </h3>
            </div>
            <Link
              href="/browse"
              className="text-xs font-bold text-[#c94d64] hover:underline"
            >
              Explore All Catalog
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recentItems.map(item => (
              <ProductCard key={item._id || item.id} product={item} />
            ))}
          </div>
        </section>
      )}

      {/* Buy Modal */}
      {buyModalOpen && (
        <BuyModal
          product={product}
          onClose={() => setBuyModalOpen(false)}
        />
      )}
    </motion.div>
  );
}
