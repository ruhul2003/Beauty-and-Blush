"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
      <div className="max-w-md w-full glass-panel p-8 rounded-3xl shadow-xl border border-rose-100 dark:border-rose-950/40 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center mx-auto shadow-md shadow-rose-500/25">
            <Sparkles className="w-6 h-6" />
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
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#120a14]"
              />
              <Mail className="w-4 h-4 text-rose-400 absolute left-3 top-1/2 -translate-y-1/2" />
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
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#120a14]"
              />
              <Lock className="w-4 h-4 text-rose-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-rose-primary py-3 text-xs font-bold flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Signing in...' : 'Sign In to Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-rose-100 dark:border-rose-950/40">
          <span>Don't have an account yet? </span>
          <Link href="/auth/register" className="font-bold text-rose-600 dark:text-rose-400 hover:underline">
            Join Beauty & Blush
          </Link>
        </div>
      </div>
    </div>
  );
}
