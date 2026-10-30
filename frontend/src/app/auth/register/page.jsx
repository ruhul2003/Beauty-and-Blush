"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Lock, User, Phone, Store, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Dhaka, Bangladesh');
  const [hasShop, setHasShop] = useState(false);
  const [shopName, setShopName] = useState('');
  const [skinType, setSkinType] = useState('Combination');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register({
        name,
        email,
        password,
        phone,
        location,
        hasShop,
        shopName: hasShop ? shopName : '',
        skinType
      });
      showToast('Registration successful! Welcome to Beauty & Blush.', 'success');
      router.push('/');
    } catch (err) {
      showToast(err.response?.data?.message || 'Registration failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-lg w-full glass-slab p-8 sm:p-10 rounded-[36px] shadow-2xl space-y-6"
      >
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full glass-well text-[#b84357] dark:text-rose-300 flex items-center justify-center mx-auto shadow-xs">
            <Sparkles className="w-6 h-6 text-[#b84357] dark:text-rose-300" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-[#181416] dark:text-white">
            Create Your Account
          </h1>
          <p className="text-xs text-slate-500">
            Join thousands of authentic beauty lovers and verified cosmetic sellers.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-[#181416] dark:text-slate-300 block mb-1">Full Name</label>
            <div className="glass-well rounded-full flex items-center px-4 py-2.5">
              <User className="w-4 h-4 text-[#b84357] dark:text-rose-300 mr-2 shrink-0" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sadia Islam"
                className="w-full bg-transparent text-xs text-[#181416] dark:text-white placeholder:text-slate-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#181416] dark:text-slate-300 block mb-1">Email</label>
              <div className="glass-well rounded-full flex items-center px-4 py-2.5">
                <Mail className="w-4 h-4 text-[#b84357] dark:text-rose-300 mr-2 shrink-0" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sadia@gmail.com"
                  className="w-full bg-transparent text-xs text-[#181416] dark:text-white placeholder:text-slate-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#181416] dark:text-slate-300 block mb-1">Phone</label>
              <div className="glass-well rounded-full flex items-center px-4 py-2.5">
                <Phone className="w-4 h-4 text-[#b84357] dark:text-rose-300 mr-2 shrink-0" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01711-223344"
                  className="w-full bg-transparent text-xs text-[#181416] dark:text-white placeholder:text-slate-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#181416] dark:text-slate-300 block mb-1">Password</label>
            <div className="glass-well rounded-full flex items-center px-4 py-2.5">
              <Lock className="w-4 h-4 text-[#b84357] dark:text-rose-300 mr-2 shrink-0" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Choose a strong password"
                className="w-full bg-transparent text-xs text-[#181416] dark:text-white placeholder:text-slate-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#181416] dark:text-slate-300 block mb-1">City / Location</label>
              <div className="glass-well rounded-2xl p-1">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-2 bg-transparent text-xs text-[#181416] dark:text-white focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-[#181416] dark:text-slate-300 block mb-1">Skin Type</label>
              <div className="glass-well rounded-2xl p-1">
                <select
                  value={skinType}
                  onChange={(e) => setSkinType(e.target.value)}
                  className="w-full p-2 bg-transparent text-xs text-[#181416] dark:text-white focus:outline-none"
                >
                  <option value="Combination" className="bg-white dark:bg-[#140b17]">Combination</option>
                  <option value="Oily" className="bg-white dark:bg-[#140b17]">Oily</option>
                  <option value="Dry" className="bg-white dark:bg-[#140b17]">Dry</option>
                  <option value="Sensitive" className="bg-white dark:bg-[#140b17]">Sensitive</option>
                  <option value="Normal" className="bg-white dark:bg-[#140b17]">Normal</option>
                </select>
              </div>
            </div>
          </div>

          {/* Seller / Boutique Registration Toggle */}
          <div className="p-4 rounded-2xl glass-well space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={hasShop}
                onChange={(e) => setHasShop(e.target.checked)}
                className="rounded text-[#b84357] focus:ring-[#b84357] w-4 h-4 accent-[#b84357]"
              />
              <span className="text-xs font-bold text-[#181416] dark:text-slate-200 flex items-center gap-1.5 font-serif">
                <Store className="w-4 h-4 text-[#b84357]" />
                <span>I want to open a verified Beauty Boutique / Store</span>
              </span>
            </label>

            {hasShop && (
              <div className="pt-2">
                <label className="text-[11px] font-bold text-[#181416] dark:text-slate-300 block mb-1">Boutique / Salon Name</label>
                <input
                  type="text"
                  required={hasShop}
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  placeholder="e.g. GlowVogue Cosmetics"
                  className="w-full p-2.5 text-xs rounded-xl glass-well text-[#181416] dark:text-white focus:outline-none"
                />
              </div>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-[#b84357] hover:bg-[#a13649] text-white py-3.5 rounded-full text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#b84357]/25 cursor-pointer"
          >
            <span>{loading ? 'Creating Account...' : 'Complete Registration'}</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-3 border-t border-black/[0.04] dark:border-white/[0.06]">
          <span>Already registered? </span>
          <Link href="/auth/login" className="font-bold text-[#b84357] dark:text-rose-400 hover:underline">
            Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
