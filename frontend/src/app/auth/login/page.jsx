"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      showToast('Welcome back to Beauty & Blush!', 'success');
      router.push('/');
    } catch (err) {
      showToast(err.response?.data?.message || 'Login failed. Please verify credentials.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full bg-white/75 dark:bg-[#140b17]/85 backdrop-blur-3xl p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-black/[0.06] dark:border-white/[0.08] space-y-6"
      >
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-black/[0.03] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] backdrop-blur-md text-[#b84357] dark:text-rose-300 flex items-center justify-center mx-auto shadow-xs">
            <Sparkles className="w-6 h-6 text-[#b84357] dark:text-rose-300" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">
            Welcome Back
          </h1>
          <p className="text-xs text-slate-500">
            Sign in to access your saved wishlist, verified orders and boutique manager.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.04] backdrop-blur-md text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#b84357] shadow-xs"
              />
              <Mail className="w-4 h-4 text-[#b84357] dark:text-rose-300 absolute left-3 top-1/2 -translate-y-1/2" />
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
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.04] backdrop-blur-md text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#b84357] shadow-xs"
              />
              <Lock className="w-4 h-4 text-[#b84357] dark:text-rose-300 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-[#b84357] hover:bg-[#a13649] text-white py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-md shadow-[#b84357]/20 cursor-pointer"
          >
            <span>{loading ? 'Signing in...' : 'Sign In to Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-3 border-t border-black/[0.05] dark:border-white/[0.08]">
          <span>Don't have an account yet? </span>
          <Link href="/auth/register" className="font-bold text-[#b84357] dark:text-rose-400 hover:underline">
            Join Beauty & Blush
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
