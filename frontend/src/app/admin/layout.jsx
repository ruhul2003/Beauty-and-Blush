"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  ShoppingCart,
  Tag, 
  MessageSquare, 
  Settings, 
  Store, 
  ArrowLeft,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const pathname = usePathname() || '';

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard, exact: true },
    { label: 'Products', href: '/admin/products', icon: Package },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { label: 'Cart Analytics', href: '/admin/cart', icon: ShoppingCart },
    { label: 'Coupons', href: '/admin/coupons', icon: Tag },
    { label: 'Reviews & Q&A', href: '/admin/reviews', icon: MessageSquare },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#faf4f4] dark:bg-[#0c060d] text-slate-900 dark:text-slate-100 pb-16">
      {/* Top Admin Header Bar */}
      <div className="bg-white/95 dark:bg-[#140b17]/95 border-b border-rose-200/80 dark:border-rose-950/70 sticky top-16 sm:top-20 z-30 backdrop-blur-md">
        <div className="w-[90%] mx-auto px-2 sm:px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-1.5 rounded-lg border border-rose-200 dark:border-rose-900/60 text-slate-600 dark:text-slate-300 hover:text-[#c94d64] hover:border-[#c94d64] transition-colors"
              title="Return to Store"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-serif font-bold text-slate-900 dark:text-white">
                  Beauty & Blush Control Portal
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#c94d64] text-white tracking-widest uppercase">
                  ADMIN
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Manage luxury cosmetics catalog, nationwide orders, vouchers & operations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-semibold border border-emerald-200 dark:border-emerald-800/40">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>System Operational</span>
            </div>

            <Link
              href="/browse"
              target="_blank"
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-[#c94d64] dark:text-[#f4728d] hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            >
              <Store className="w-3.5 h-3.5" />
              <span>View Storefront</span>
            </Link>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="w-[90%] mx-auto px-2 sm:px-4 overflow-x-auto no-scrollbar">
          <nav className="flex items-center gap-1 sm:gap-2 border-t border-rose-100 dark:border-rose-950/40 pt-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact 
                ? pathname === item.href 
                : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#c94d64] text-white shadow-md shadow-[#c94d64]/20'
                      : 'text-slate-600 dark:text-slate-400 hover:text-[#c94d64] hover:bg-rose-50 dark:hover:bg-rose-950/30'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.2]' : 'stroke-[1.8]'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Admin Content Area */}
      <main className="w-[90%] mx-auto px-2 sm:px-4 py-8">
        {children}
      </main>
    </div>
  );
}
