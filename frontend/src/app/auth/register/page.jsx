"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
      <div className="max-w-lg w-full glass-panel p-8 rounded-3xl shadow-xl border border-rose-100 dark:border-rose-950/40 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-rose-400 text-white flex items-center justify-center mx-auto shadow-md">
            <Sparkles className="w-6 h-6" />
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
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#120a14]"
              />
              <User className="w-4 h-4 text-rose-400 absolute left-3 top-1/2 -translate-y-1/2" />
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
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#120a14]"
                />
                <Mail className="w-4 h-4 text-rose-400 absolute left-3 top-1/2 -translate-y-1/2" />
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
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#120a14]"
                />
                <Phone className="w-4 h-4 text-rose-400 absolute left-3 top-1/2 -translate-y-1/2" />
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
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#120a14]"
              />
              <Lock className="w-4 h-4 text-rose-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">City / Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#120a14]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Skin Type</label>
              <select
                value={skinType}
                onChange={(e) => setSkinType(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#120a14]"
              >
                <option value="Combination">Combination</option>
                <option value="Oily">Oily</option>
                <option value="Dry">Dry</option>
                <option value="Sensitive">Sensitive</option>
                <option value="Normal">Normal</option>
              </select>
            </div>
          </div>

          {/* Seller / Boutique Registration Toggle */}
          <div className="p-3.5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40 space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={hasShop}
                onChange={(e) => setHasShop(e.target.checked)}
                className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
              />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Store className="w-4 h-4 text-rose-500" />
                <span>I want to open a verified Beauty Boutique / Store</span>
              </span>
            </label>

            {hasShop && (
              <div className="pt-2">
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">Boutique / Salon Name</label>
                <input
                  type="text"
                  required={hasShop}
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  placeholder="e.g. GlowVogue Cosmetics"
                  className="w-full p-2 text-xs rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#120a14]"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-rose-primary py-3 text-xs font-bold flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Creating Account...' : 'Complete Registration'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-rose-100 dark:border-rose-950/40">
          <span>Already registered? </span>
          <Link href="/auth/login" className="font-bold text-rose-600 dark:text-rose-400 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
