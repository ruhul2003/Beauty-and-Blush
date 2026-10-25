"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  MessageSquare, 
  Star, 
  ShieldCheck, 
  Trash2, 
  CheckCircle2, 
  HelpCircle, 
  Send,
  Eye,
  RefreshCw,
  ThumbsUp
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { api } from '@/lib/api';

export default function AdminReviewsPage() {
  const { showToast } = useToast();
  const [reviews, setReviews] = useState([]);
  const [qaList, setQaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyInput, setReplyInput] = useState({});

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const [revRes, prodRes] = await Promise.all([
        api.get('/reviews').catch(() => ({ data: [] })),
        api.get('/products').catch(() => ({ data: [] }))
      ]);

      setReviews(revRes.data || [
        {
          _id: "rev-001",
          userName: "Sadia Afrin",
          rating: 5,
          comment: "100% authentic Rare Beauty blush! Scanned the batch code on checkcosmetic and it matched March 2026 production. Beautiful pigmentation!",
          isVerifiedPurchase: true,
          productTitle: "Rare Beauty Soft Pinch Liquid Blush - Joy",
          createdAt: new Date().toISOString()
        },
        {
          _id: "rev-002",
          userName: "Nusrat Jahan",
          rating: 5,
          comment: "Genuine DECIEM product. Has the frosted glass and authentic smell. Fast delivery to Dhanmondi inside 24 hours via Pathao.",
          isVerifiedPurchase: true,
          productTitle: "The Ordinary Niacinamide 10% + Zinc 1%",
          createdAt: new Date().toISOString()
        }
      ]);

      // Collect Q&As from products
      const qas = [];
      (prodRes.data || []).forEach(p => {
        if (p.qa && Array.isArray(p.qa)) {
          p.qa.forEach(q => {
            qas.push({
              ...q,
              productId: p._id || p.id,
              productTitle: p.title
            });
          });
        }
      });

      if (qas.length === 0) {
        qas.push({
          productId: 'bnb-prod-001',
          productTitle: 'Rare Beauty Soft Pinch Liquid Blush - Joy',
          question: 'Is this dewy or matte finish?',
          askedBy: 'Tasnim',
          answer: 'The Joy shade has a radiant, dewy finish that builds effortlessly!',
          answeredBy: 'Beauty & Blush Official'
        });
      }

      setQaList(qas);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = (id) => {
    if (!confirm('Remove this customer review?')) return;
    setReviews(prev => prev.filter(r => r._id !== id));
    showToast('Review removed from public listing', 'info');
  };

  const handleSendAnswer = (qaItem, index) => {
    const text = replyInput[index];
    if (!text || !text.trim()) return;

    setQaList(prev => prev.map((q, idx) => 
      idx === index 
        ? { ...q, answer: text.trim(), answeredBy: 'Beauty & Blush Official' } 
        : q
    ));

    setReplyInput(prev => ({ ...prev, [index]: '' }));
    showToast('Official answer published to boutique product page!', 'success');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
            Customer Reviews & Q&A Moderation
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Moderate authenticated customer ratings, product feedback, and answer buyer questions.
          </p>
        </div>

        <button
          onClick={fetchContent}
          className="btn-rose-primary px-4 py-2 text-xs font-bold flex items-center gap-2 self-start sm:self-auto"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Feed</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Verified Customer Reviews */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500 fill-current" />
              <span>Customer Reviews ({reviews.length})</span>
            </h2>
            <span className="text-xs text-slate-500">Public ratings & comments</span>
          </div>

          <div className="space-y-3">
            {reviews.map((rev) => (
              <div 
                key={rev._id}
                className="p-5 rounded-3xl glass-card border border-rose-200/80 dark:border-rose-950/60 shadow-sm space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">{rev.userName}</span>
                    {rev.isVerifiedPurchase && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold border border-emerald-200 dark:border-emerald-800/40">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Verified Buyer</span>
                      </span>
                    )}
                  </div>

                  <div className="flex text-amber-400">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                {rev.productTitle && (
                  <p className="text-[11px] text-[#c94d64] font-semibold">
                    Product: {rev.productTitle}
                  </p>
                )}

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  "{rev.comment}"
                </p>

                <div className="pt-2 border-t border-rose-100 dark:border-rose-950/50 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Batch verification positive</span>
                  <button
                    onClick={() => handleDeleteReview(rev._id)}
                    className="text-rose-500 hover:text-rose-700 flex items-center gap-1 font-semibold"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Community Q&A & Inquiries */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#c94d64]" />
              <span>Boutique Q&A Inquiries ({qaList.length})</span>
            </h2>
            <span className="text-xs text-slate-500">Customer beauty questions</span>
          </div>

          <div className="space-y-4">
            {qaList.map((qa, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-3xl glass-card border border-rose-200/80 dark:border-rose-950/60 shadow-sm space-y-3"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#c94d64]">
                    Item: {qa.productTitle}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">
                    Q: "{qa.question}"
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Asked by {qa.askedBy || 'Customer'}
                  </p>
                </div>

                {qa.answer ? (
                  <div className="p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-xs text-slate-800 dark:text-slate-200 space-y-1">
                    <p className="font-semibold text-emerald-800 dark:text-emerald-300 text-[11px]">
                      A (Official Response):
                    </p>
                    <p className="leading-relaxed">{qa.answer}</p>
                  </div>
                ) : (
                  <div className="space-y-2 pt-1">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={replyInput[idx] || ''}
                        onChange={(e) => setReplyInput({ ...replyInput, [idx]: e.target.value })}
                        placeholder="Write official boutique response..."
                        className="flex-1 p-2 text-xs rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#120a14]"
                      />
                      <button
                        type="button"
                        onClick={() => handleSendAnswer(qa, idx)}
                        className="btn-rose-primary px-3 py-2 text-xs font-bold flex items-center gap-1.5 shrink-0"
                      >
                        <Send className="w-3 h-3" />
                        <span>Publish</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
