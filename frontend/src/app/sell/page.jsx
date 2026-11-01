"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, PlusCircle, ShieldCheck } from 'lucide-react';
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
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-[90%] max-w-4xl mx-auto px-2 sm:px-4 py-10"
    >
      <div className="glass-slab p-6 sm:p-10 rounded-[36px] space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass-pill text-xs font-bold text-[#b84357] uppercase tracking-widest mb-2 shadow-xs">
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
              className="w-full p-3 text-xs rounded-2xl glass-well border border-white/80 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#b84357]/30 transition-all"
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
                className="w-full p-3 text-xs rounded-2xl glass-well border border-white/80 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#b84357]/30 transition-all"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 text-xs rounded-2xl glass-well border border-white/80 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#b84357]/30 cursor-pointer"
              >
                <option value="Makeup" className="bg-white dark:bg-[#140b17]">Makeup</option>
                <option value="Skincare" className="bg-white dark:bg-[#140b17]">Skincare</option>
                <option value="Fragrance" className="bg-white dark:bg-[#140b17]">Fragrance</option>
                <option value="Haircare" className="bg-white dark:bg-[#140b17]">Haircare</option>
                <option value="Bath & Body" className="bg-white dark:bg-[#140b17]">Bath & Body</option>
                <option value="Tools & Brushes" className="bg-white dark:bg-[#140b17]">Tools & Brushes</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full p-3 text-xs rounded-2xl glass-well border border-white/80 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#b84357]/30 cursor-pointer"
              >
                <option value="Brand New & Boxed" className="bg-white dark:bg-[#140b17]">Brand New & Boxed</option>
                <option value="Sealed" className="bg-white dark:bg-[#140b17]">Sealed</option>
                <option value="Swatched Once" className="bg-white dark:bg-[#140b17]">Swatched Once</option>
                <option value="Authentic Pre-loved" className="bg-white dark:bg-[#140b17]">Authentic Pre-loved</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Shade / Variant</label>
              <input
                type="text"
                value={shade}
                onChange={(e) => setShade(e.target.value)}
                placeholder="e.g. Joy - Dewy Peach"
                className="w-full p-3 text-xs rounded-2xl glass-well border border-white/80 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#b84357]/30 transition-all"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Batch Code</label>
              <input
                type="text"
                value={batchCode}
                onChange={(e) => setBatchCode(e.target.value)}
                placeholder="e.g. 3K01 (On bottle base)"
                className="w-full p-3 text-xs rounded-2xl glass-well border border-white/80 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#b84357]/30 transition-all"
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
                className="w-full p-3 text-xs rounded-2xl glass-well border border-white/80 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#b84357]/30 transition-all"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Original Retail Price (৳)</label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="3800"
                className="w-full p-3 text-xs rounded-2xl glass-well border border-white/80 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#b84357]/30 transition-all"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Location / District</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Gulshan, Dhaka"
                className="w-full p-3 text-xs rounded-2xl glass-well border border-white/80 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#b84357]/30 transition-all"
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
              className="w-full p-3 text-xs rounded-2xl glass-well border border-white/80 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#b84357]/30 transition-all"
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
              className="w-full p-3 text-xs rounded-2xl glass-well border border-white/80 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#b84357]/30 transition-all"
            />
          </div>

          <div className="p-4 rounded-2xl glass-well border border-emerald-500/20 flex items-center gap-2 text-emerald-800 dark:text-emerald-300 shadow-xs">
            <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span className="text-[11px] font-medium">
              By posting, you certify this cosmetic or fragrance is 100% genuine and not a clone/replica.
            </span>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-[#b84357] hover:bg-[#a13649] text-white py-4 rounded-full text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#b84357]/25 cursor-pointer transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{loading ? 'Publishing...' : 'Publish Listing to Marketplace'}</span>
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
