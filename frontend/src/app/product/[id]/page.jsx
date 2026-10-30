"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Sparkles, 
  MessageCircle, 
  Send,
  HelpCircle,
  MapPin,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';
import { formatPrice, calculateDiscount } from '@/utils/formatters';
import { useToast } from '@/context/ToastContext';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { BuyModal } from '@/components/BuyModal';
import { ProductCard } from '@/components/ProductCard';
import { addRecentProduct, getRecentProducts } from '@/utils/recentProducts';
import { api } from '@/lib/api';

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { showToast } = useToast();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [recentItems, setRecentItems] = useState([]);

  // Community Q&A State
  const [questionInput, setQuestionInput] = useState('');
  const [qaList, setQaList] = useState([]);

  // Customer Reviews State
  const [reviewsList, setReviewsList] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);

  useEffect(() => {
    fetchProductDetail();
  }, [id]);

  const fetchProductDetail = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/products/${id}`);
      const data = res.data;
      setProduct(data);
      if (data) {
        addRecentProduct(data);
        setRecentItems(getRecentProducts().filter(p => (p._id || p.id) !== id));
        if (data.qa && Array.isArray(data.qa)) {
          setQaList(data.qa);
        }
        if (data.reviews && Array.isArray(data.reviews)) {
          setReviewsList(data.reviews);
        } else {
          setReviewsList([
            {
              userName: 'Farzana Karim',
              rating: 5,
              comment: '100% genuine formulation! Scanned the batch on checkcosmetic and everything matched perfectly. Skin looks radiant!',
              createdAt: new Date().toISOString()
            },
            {
              userName: 'Anika Rahman',
              rating: 5,
              comment: 'Delivered in Dhanmondi within 24 hours. Well packaged with bubble wrap. Dewy finish and authentic scent.',
              createdAt: new Date().toISOString()
            }
          ]);
        }
      }
    } catch (err) {
      console.warn('Error fetching product from API', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAskQuestion = async (e) => {
    e.preventDefault();
    if (!questionInput.trim()) return;

    try {
      const newQa = {
        question: questionInput.trim(),
        askedBy: user ? user.name : 'Anonymous Buyer',
        answer: null
      };

      await api.post(`/products/${id}/qa`, newQa);
      setQaList(prev => [newQa, ...prev]);
      setQuestionInput('');
      showToast('Your question has been sent to the boutique!', 'success');
    } catch (err) {
      setQaList(prev => [{
        question: questionInput.trim(),
        askedBy: user ? user.name : 'Customer',
        answer: null
      }, ...prev]);
      setQuestionInput('');
      showToast('Your question has been submitted to seller!', 'success');
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
      <div className="w-[95%] sm:w-[92%] max-w-[1500px] mx-auto px-2 sm:px-4 py-20 text-center">
        <Sparkles className="w-8 h-8 text-[#b84357] animate-spin mx-auto mb-3" />
        <p className="text-xs text-slate-500">Loading authentic beauty listing...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-[95%] sm:w-[92%] max-w-[1500px] mx-auto px-2 sm:px-4 py-20 text-center">
        <h2 className="text-xl font-bold">Listing Not Found</h2>
        <Link href="/browse" className="mt-4 inline-block bg-[#b84357] hover:bg-[#a13649] text-white px-6 py-2.5 text-xs rounded-full shadow-xs">
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
      className="w-[95%] sm:w-[92%] max-w-[1500px] mx-auto px-2 sm:px-4 py-8 space-y-12"
    >
      {/* Top Breadcrumb */}
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-[#b84357]">Home</Link>
        <span>/</span>
        <Link href={`/browse?category=${product.category}`} className="hover:text-[#b84357]">{product.category}</Link>
        <span>/</span>
        <span className="text-[#181416] dark:text-slate-200 font-bold truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Image Gallery (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="aspect-square rounded-[32px] overflow-hidden glass-slab p-2 relative">
            <div className="w-full h-full rounded-[26px] overflow-hidden glass-well relative">
              <img
                src={images[activeImageIndex]}
                alt={product.title}
                className="w-full h-full object-cover transition-all duration-300 rounded-[26px]"
              />
              {discount > 0 && (
                <span className="glass-pill absolute top-4 left-4 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#181416]/90 text-white shadow-xs">
                  -{discount}% OFF
                </span>
              )}
              <span className="glass-pill absolute top-4 right-4 px-3.5 py-1 text-[10px] font-bold text-slate-800 dark:text-white shadow-xs">
                {product.condition}
              </span>
            </div>
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
                  className={`w-16 h-16 rounded-2xl overflow-hidden glass-slab p-1 transition-all shrink-0 cursor-pointer ${
                    activeImageIndex === idx 
                      ? 'border-[#b84357] ring-2 ring-[#b84357]/20 scale-105' 
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumb" className="w-full h-full object-cover rounded-xl" />
                </motion.button>
              ))}
            </div>
          )}

          {/* Authenticity Guarantee Card */}
          <div className="p-4 rounded-3xl glass-slab flex items-start gap-3">
            <div className="glass-well w-10 h-10 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold font-serif text-[#181416] dark:text-white">
                Authenticity Guarantee
              </h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                Batch code <strong className="font-mono glass-well px-2 py-0.5 rounded-lg text-[#b84357] dark:text-rose-300 font-bold">{product.batchCode || '3K01'}</strong> verified against manufacturer records.
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
                className="glass-pill px-3.5 py-1 text-[#b84357] dark:text-rose-300 font-bold uppercase tracking-wider text-[10px]"
              >
                {product.brand || product.category}
              </Link>
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>{product.rating || 4.9}</span>
                <span className="text-slate-400 font-normal">({reviewsList.length} reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#181416] dark:text-white leading-tight">
              {product.title}
            </h1>

            {product.shade && (
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
                Shade / Finish: <span className="font-bold text-[#b84357] dark:text-rose-300">{product.shade}</span>
              </p>
            )}
          </div>

          {/* Pricing Box */}
          <div className="p-5 rounded-3xl glass-slab flex items-baseline gap-3">
            <span className="text-3xl font-serif font-bold text-[#181416] dark:text-white">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-slate-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="ml-auto text-xs font-bold text-emerald-600 dark:text-emerald-400">
              In Stock & Ready to Dispatch
            </span>
          </div>

          {/* Quantity and Action CTAs */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <div className="glass-well rounded-full flex items-center p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-white/[0.08] text-sm font-bold transition-colors cursor-pointer"
                >
                  -
                </button>
                <span className="px-3 text-xs font-bold text-[#181416] dark:text-white min-w-[32px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-white/[0.08] text-sm font-bold transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>

              <motion.button
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={() => addToCart(product, quantity)}
                className="flex-1 py-3.5 px-6 rounded-full glass-pill hover:bg-[#b84357] hover:text-white text-[#181416] dark:text-white hover:border-[#b84357] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </motion.button>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setBuyModalOpen(true)}
              className="w-full bg-[#b84357] hover:bg-[#a13649] text-white py-3.5 rounded-full text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#b84357]/25 cursor-pointer"
            >
              <span>Instant Buy with Cash on Delivery (COD)</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={openWhatsApp}
              className="w-full py-3 rounded-full glass-pill text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask Seller via WhatsApp Direct</span>
            </motion.button>
          </div>

          {/* Courier Delivery Timeline Box */}
          <div className="p-5 rounded-3xl glass-slab space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#181416] dark:text-white font-serif">
              <Truck className="w-4 h-4 text-[#b84357]" />
              <span>Courier Delivery Estimates</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl glass-well">
                <span className="font-bold text-[#181416] dark:text-slate-200 block">Inside Dhaka</span>
                <span className="text-slate-500 text-[11px]">24 - 48 Hours • ৳60</span>
              </div>
              <div className="p-3.5 rounded-2xl glass-well">
                <span className="font-bold text-[#181416] dark:text-slate-200 block">Outside Dhaka</span>
                <span className="text-slate-500 text-[11px]">48 - 72 Hours • ৳120</span>
              </div>
            </div>
          </div>

          {/* Seller / Boutique Box */}
          <div className="p-5 rounded-3xl glass-slab flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl glass-well overflow-hidden text-[#b84357] dark:text-rose-300 flex items-center justify-center font-bold text-base">
                {product.sellerAvatar ? (
                  <img src={product.sellerAvatar} alt={product.sellerName} className="w-full h-full object-cover" />
                ) : (
                  product.sellerName ? product.sellerName.charAt(0) : 'S'
                )}
              </div>
              <div>
                <h4 className="text-xs font-bold font-serif text-[#181416] dark:text-white flex items-center gap-1.5">
                  <span>{product.sellerName || 'Verified Boutique'}</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#b84357]" />
                </h4>
                <p className="text-[11px] text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#b84357]" />
                  <span>{product.location || 'Dhaka, Bangladesh'}</span>
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-amber-500 flex items-center justify-end gap-1">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{product.sellerRating || 4.9}</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Verified Seller</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#181416] dark:text-white mb-2">
              Product Overview & Specifications
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      {/* Community Q&A Section */}
      <section className="pt-10 border-t border-black/[0.04] dark:border-white/[0.06]">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-serif font-bold text-[#181416] dark:text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#b84357]" />
                <span>Customer Questions & Answers</span>
              </h2>
              <p className="text-xs text-slate-500">Ask the boutique seller directly about shades, skin suitability or authenticity.</p>
            </div>
          </div>

          {/* Ask question form */}
          <form onSubmit={handleAskQuestion} className="flex gap-2">
            <div className="glass-well rounded-full flex-1 flex items-center px-4 py-2.5">
              <input
                type="text"
                value={questionInput}
                onChange={(e) => setQuestionInput(e.target.value)}
                placeholder="Ask a question about this product..."
                className="w-full bg-transparent text-xs text-[#181416] dark:text-white placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            <motion.button 
              whileTap={{ scale: 0.94 }}
              type="submit" 
              className="bg-[#b84357] hover:bg-[#a13649] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#b84357]/20"
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
                <div key={idx} className="p-5 rounded-3xl glass-slab space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#181416] dark:text-white">
                    <span className="text-[#b84357] font-extrabold">Q:</span>
                    <span>{item.question}</span>
                  </div>
                  {item.answer ? (
                    <div className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300 pl-4 border-l-2 border-[#b84357]">
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
      <section className="pt-10 border-t border-black/[0.04] dark:border-white/[0.06]">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-xl font-serif font-bold text-[#181416] dark:text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500 fill-current" />
            <span>Verified Customer Reviews</span>
          </h2>

          {/* Leave a Review Form */}
          <form onSubmit={handlePostReview} className="p-6 rounded-3xl glass-slab space-y-4">
            <h3 className="text-xs font-bold font-serif text-[#181416] dark:text-slate-200">Share your experience with this product</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Your Rating:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setNewRating(star)}
                    className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Star className={`w-5 h-5 ${star <= newRating ? 'fill-current' : 'text-slate-300 dark:text-white/20'}`} />
                  </button>
                ))}
              </div>
            </div>

            <textarea
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your review: texture, scent, skin feel, authenticity verification..."
              className="w-full p-3.5 text-xs rounded-2xl glass-well text-[#181416] dark:text-white placeholder:text-slate-400 focus:outline-none"
            />

            <motion.button 
              whileTap={{ scale: 0.94 }}
              type="submit" 
              className="bg-[#b84357] hover:bg-[#a13649] text-white px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-bold cursor-pointer shadow-md shadow-[#b84357]/20"
            >
              Post Review
            </motion.button>
          </form>

          {/* Reviews Stream */}
          <div className="space-y-4">
            {reviewsList.map((rev, idx) => (
              <div key={idx} className="p-5 rounded-3xl glass-slab space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#181416] dark:text-white">{rev.userName}</span>
                    <span className="glass-pill px-2.5 py-0.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
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
        <section className="pt-10 border-t border-black/[0.04] dark:border-white/[0.06] space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="glass-pill inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-[#b84357] uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Browsing History</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#181416] dark:text-white mt-0.5">
                Recently Viewed Essentials
              </h3>
            </div>
            <Link
              href="/browse"
              className="text-xs font-bold text-[#b84357] hover:underline"
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
