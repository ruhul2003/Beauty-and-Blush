"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Lock, User, Phone, MapPin, Store, ArrowRight } from 'lucide-react';
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
        className="max-w-lg w-full bg-white/70 dark:bg-[#140b17]/75 backdrop-blur-3xl p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-white/60 dark:border-white/15 space-y-6"
      >
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/15 dark:bg-rose-500/25 border border-rose-300/30 backdrop-blur-md text-[#c94d64] flex items-center justify-center mx-auto shadow-xs">
            <Sparkles className="w-6 h-6 text-[#c94d64]" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">
            Create Your Account
          </h1>
          <p className="text-xs text-slate-500">
            Join thousands of authentic beauty lovers and verified cosmetic sellers.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Full Name</label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sadia Islam"
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-white/60 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#c94d64] shadow-xs"
              />
              <User className="w-4 h-4 text-[#c94d64] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Email</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sadia@gmail.com"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-white/60 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#c94d64] shadow-xs"
                />
                <Mail className="w-4 h-4 text-[#c94d64] absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Phone</label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01711-223344"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-white/60 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#c94d64] shadow-xs"
                />
                <Phone className="w-4 h-4 text-[#c94d64] absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Choose a strong password"
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-white/60 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#c94d64] shadow-xs"
              />
              <Lock className="w-4 h-4 text-[#c94d64] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">City / Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-white/60 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#c94d64]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Skin Type</label>
              <select
                value={skinType}
                onChange={(e) => setSkinType(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-white/60 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#c94d64]"
              >
                <option value="Combination" className="bg-white dark:bg-[#140b17]">Combination</option>
                <option value="Oily" className="bg-white dark:bg-[#140b17]">Oily</option>
                <option value="Dry" className="bg-white dark:bg-[#140b17]">Dry</option>
                <option value="Sensitive" className="bg-white dark:bg-[#140b17]">Sensitive</option>
                <option value="Normal" className="bg-white dark:bg-[#140b17]">Normal</option>
              </select>
            </div>
          </div>

          {/* Seller / Boutique Registration Toggle */}
          <div className="p-4 rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 space-y-2 shadow-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={hasShop}
                onChange={(e) => setHasShop(e.target.checked)}
                className="rounded text-[#c94d64] focus:ring-rose-500 w-4 h-4 accent-[#c94d64]"
              />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 font-serif">
                <Store className="w-4 h-4 text-[#c94d64]" />
                <span>I want to open a verified Beauty Boutique / Store</span>
              </span>
            </label>

            {hasShop && (
              <div className="pt-2">
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">Boutique / Salon Name</label>
                <input
                  type="text"
                  required={hasShop}
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  placeholder="e.g. GlowVogue Cosmetics"
                  className="w-full p-2.5 text-xs rounded-xl border border-white/60 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#c94d64]"
                />
              </div>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full btn-rose-primary py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#c94d64]/20 cursor-pointer"
          >
            <span>{loading ? 'Creating Account...' : 'Complete Registration'}</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-3 border-t border-white/40 dark:border-white/10">
          <span>Already registered? </span>
          <Link href="/auth/login" className="font-bold text-[#c94d64] dark:text-rose-400 hover:underline">
            Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
