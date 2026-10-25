"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, PlusCircle, ShieldCheck, Image, MapPin, DollarSign } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { api } from '@/lib/api';

export default function SellPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('Makeup');
  const [subcategory, setSubcategory] = useState('Blush');
  const [condition, setCondition] = useState('Brand New & Boxed');
  const [skinType, setSkinType] = useState('All Skin Types');
  const [shade, setShade] = useState('');
  const [batchCode, setBatchCode] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(user?.location || 'Dhaka');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !price || !description) {
      showToast('Please complete title, price and description', 'error');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        title,
        brand: brand || 'Luxury Beauty',
        category,
        subcategory,
        condition,
        skinType,
        shade: shade || 'Universal',
        batchCode: batchCode || 'BATCH-VERIFIED',
        price: Number(price),
        originalPrice: Number(originalPrice || 0),
        images: imageUrl ? [imageUrl] : ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80'],
        description,
        location,
        sellerId: user ? user.id : 'seller-guest',
        sellerName: user ? user.name : 'Verified Boutique',
        sellerPhone: user ? user.phone : '+880 1711-224466'
      };

      const res = await api.post('/products', payload);
      showToast('Listing published successfully!', 'success');
      router.push(`/product/${res.data._id}`);
    } catch (err) {
      console.error('Failed to create listing', err);
      showToast('Failed to post listing. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[90%] max-w-4xl mx-auto px-2 sm:px-4 py-10">
      <div className="glass-panel p-6 sm:p-10 rounded-3xl space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-500 uppercase tracking-widest mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Seller Boutique Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
            List an Authentic Cosmetic or Fragrance
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Fill in the authentic details. Verified listings get up to 3x higher buyer inquiries.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Listing Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Rare Beauty Soft Pinch Liquid Blush - Joy (7.5ml)"
              className="w-full p-2.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#120a14]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Brand Name</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Rare Beauty, Dior, The Ordinary"
                className="w-full p-2.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#120a14]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#120a14]"
              >
                <option value="Makeup">Makeup</option>
                <option value="Skincare">Skincare</option>
                <option value="Fragrance">Fragrance</option>
                <option value="Haircare">Haircare</option>
                <option value="Bath & Body">Bath & Body</option>
                <option value="Tools & Brushes">Tools & Brushes</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#120a14]"
              >
                <option value="Brand New & Boxed">Brand New & Boxed</option>
                <option value="Sealed">Sealed</option>
                <option value="Swatched Once">Swatched Once</option>
                <option value="Authentic Pre-loved">Authentic Pre-loved</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Shade / Variant</label>
              <input
                type="text"
                value={shade}
                onChange={(e) => setShade(e.target.value)}
                placeholder="e.g. Joy - Dewy Peach"
                className="w-full p-2.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#120a14]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Batch Code</label>
              <input
                type="text"
                value={batchCode}
                onChange={(e) => setBatchCode(e.target.value)}
                placeholder="e.g. 3K01 (On bottle base)"
                className="w-full p-2.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#120a14]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Selling Price (৳ BDT)</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="3200"
                className="w-full p-2.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#120a14]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Original Retail Price (৳)</label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="3800"
                className="w-full p-2.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#120a14]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Location / District</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Gulshan, Dhaka"
                className="w-full p-2.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#120a14]"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Image URL (Unsplash or hosted)</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full p-2.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#120a14]"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Description & Authenticity Details</label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe purchase origin, batch verification, formula finish, reason for selling..."
              className="w-full p-2.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#120a14]"
            />
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
            <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-600" />
            <span className="text-[11px]">
              By posting, you certify this cosmetic or fragrance is 100% genuine and not a clone/replica.
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-rose-primary py-3.5 text-xs font-bold flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{loading ? 'Publishing...' : 'Publish Listing to Marketplace'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
