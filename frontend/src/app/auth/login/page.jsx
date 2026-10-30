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
        className="max-w-md w-full glass-slab p-8 sm:p-10 rounded-[36px] shadow-2xl space-y-6"
      >
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full glass-well text-[#b84357] dark:text-rose-300 flex items-center justify-center mx-auto shadow-xs">
            <Sparkles className="w-6 h-6 text-[#b84357] dark:text-rose-300" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-[#181416] dark:text-white">
            Welcome Back
          </h1>
          <p className="text-xs text-slate-500">
            Sign in to access your saved wishlist, verified orders and boutique manager.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-[#181416] dark:text-slate-300 block mb-1">Email Address</label>
            <div className="glass-well rounded-full flex items-center px-4 py-2.5">
              <Mail className="w-4 h-4 text-[#b84357] dark:text-rose-300 mr-2 shrink-0" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full bg-transparent text-xs text-[#181416] dark:text-white placeholder:text-slate-400 focus:outline-none"
              />
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
                placeholder="••••••••"
                className="w-full bg-transparent text-xs text-[#181416] dark:text-white placeholder:text-slate-400 focus:outline-none"
              />
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-[#b84357] hover:bg-[#a13649] text-white py-3.5 rounded-full text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#b84357]/25 cursor-pointer"
          >
            <span>{loading ? 'Signing in...' : 'Sign In to Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-3 border-t border-black/[0.04] dark:border-white/[0.06]">
          <span>Don't have an account yet? </span>
          <Link href="/auth/register" className="font-bold text-[#b84357] dark:text-rose-400 hover:underline">
            Join Beauty & Blush
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
