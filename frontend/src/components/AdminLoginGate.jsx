"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, User, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
import { adminApi } from '@/lib/api';
import { useToast } from '@/context/ToastContext';

export function AdminLoginGate({ onSuccess }) {
  const { showToast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const cleanUsername = username.trim();
    if (!cleanUsername || !password) {
      setError('Please enter both admin username and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await adminApi.login(cleanUsername, password);
      if (res.data && res.data.token) {
        localStorage.setItem('bnb_admin_token', res.data.token);
        localStorage.setItem('bnb_admin_user', JSON.stringify(res.data.admin));
        showToast?.('Welcome to the Admin Control Portal', 'success');
        onSuccess?.(res.data.admin);
      } else {
        setError('Unexpected response from authentication server.');
      }
    } catch (err) {
      // If backend responded with an explicit HTTP error (e.g. 401), reject login
      if (err.response) {
        const msg = err.response.data?.message || 'Invalid admin username or password.';
        setError(msg);
        showToast?.(msg, 'error');
      } else {
        // Offline / serverless unreachable fallback validation
        if (cleanUsername === 'admin' && password === 'ruhuls12') {
          const fallbackAdmin = {
            username: 'admin',
            name: 'Beauty & Blush Admin',
            role: 'admin'
          };
          localStorage.setItem('bnb_admin_token', `bnb_admin_local_${Date.now()}`);
          localStorage.setItem('bnb_admin_user', JSON.stringify(fallbackAdmin));
          showToast?.('Signed in to Admin Control Portal', 'success');
          onSuccess?.(fallbackAdmin);
        } else {
          const msg = 'Invalid admin username or password.';
          setError(msg);
          showToast?.(msg, 'error');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[82vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full glass-slab p-8 sm:p-10 rounded-[36px] shadow-2xl space-y-6 relative overflow-hidden"
      >
        {/* Top Ambient Highlight */}
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-[#e06d84]/15 blur-3xl pointer-events-none" />

        <div className="text-center space-y-2.5 relative z-10">
          <div className="w-14 h-14 rounded-2xl glass-well text-[#e06d84] dark:text-rose-300 flex items-center justify-center mx-auto shadow-xs border border-[#e06d84]/20">
            <ShieldCheck className="w-7 h-7" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full glass-pill text-[10px] font-bold uppercase tracking-widest text-[#e06d84] dark:text-rose-300">
            <span>Restricted Access</span>
          </div>

          <h1 className="text-2xl sm:text-[26px] font-serif font-bold text-[#181416] dark:text-white tracking-tight">
            Admin Control Portal
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Sign in with your administrator credentials to manage products, customer orders, vouchers, and analytics.
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/25 text-rose-700 dark:text-rose-300 text-xs font-medium flex items-center gap-2.5"
          >
            <AlertCircle className="w-4 h-4 shrink-0 text-[#e06d84]" />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div>
            <label
              htmlFor="admin-username"
              className="text-xs font-bold text-[#181416] dark:text-slate-300 block mb-1.5 ml-1"
            >
              Admin Username
            </label>
            <div className="glass-well rounded-full flex items-center px-4 py-2.5 border border-transparent focus-within:border-[#e06d84]/40 focus-within:ring-2 focus-within:ring-[#e06d84]/20 transition-all">
              <User className="w-4 h-4 text-[#e06d84] dark:text-rose-300 mr-2.5 shrink-0" />
              <input
                id="admin-username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="w-full bg-transparent text-xs text-[#181416] dark:text-white placeholder:text-slate-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="text-xs font-bold text-[#181416] dark:text-slate-300 block mb-1.5 ml-1"
            >
              Password
            </label>
            <div className="glass-well rounded-full flex items-center px-4 py-2.5 border border-transparent focus-within:border-[#e06d84]/40 focus-within:ring-2 focus-within:ring-[#e06d84]/20 transition-all">
              <Lock className="w-4 h-4 text-[#e06d84] dark:text-rose-300 mr-2.5 shrink-0" />
              <input
                id="admin-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent text-xs text-[#181416] dark:text-white placeholder:text-slate-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-[#e06d84] transition-colors ml-2 cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-[#e06d84] hover:bg-[#d45d74] disabled:opacity-70 text-white py-3 rounded-full text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#e06d84]/25 hover:shadow-xl hover:shadow-[#e06d84]/35 transition-all cursor-pointer mt-2"
          >
            <span>{loading ? 'Verifying Session...' : 'Unlock Admin Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </form>

        <div className="pt-3 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#e06d84] dark:text-slate-400 dark:hover:text-rose-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Beauty & Blush Store</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
