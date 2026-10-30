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
    <div className="min-h-screen text-slate-900 dark:text-slate-100 pb-16">
      {/* Top Admin Header Bar */}
      <div className="bg-white/70 dark:bg-[#130a16]/75 border-b border-white/60 dark:border-white/10 sticky top-16 sm:top-20 z-30 backdrop-blur-3xl shadow-xs">
        <div className="w-[90%] mx-auto px-2 sm:px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl border border-white/60 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md text-slate-600 dark:text-slate-300 hover:text-[#c94d64] hover:border-[#c94d64] transition-colors shadow-xs"
              title="Return to Store"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-serif font-bold text-slate-900 dark:text-white">
                  Beauty & Blush Control Portal
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#c94d64] text-white tracking-widest uppercase shadow-xs">
                  ADMIN
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Manage luxury cosmetics catalog, nationwide orders, vouchers & operations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/20 backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>System Operational</span>
            </div>

            <Link
              href="/browse"
              target="_blank"
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-[#c94d64] hover:bg-rose-500/10 backdrop-blur-md transition-colors"
            >
              <Store className="w-3.5 h-3.5" />
              <span>View Storefront</span>
            </Link>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="w-[90%] mx-auto px-2 sm:px-4 overflow-x-auto no-scrollbar">
          <nav className="flex items-center gap-1 sm:gap-2 border-t border-white/40 dark:border-white/10 pt-1 pb-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact 
                ? pathname === item.href 
                : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#c94d64] text-white shadow-md shadow-[#c94d64]/20'
                      : 'text-slate-600 dark:text-slate-400 hover:text-[#c94d64] hover:bg-white/60 dark:hover:bg-white/10 backdrop-blur-sm'
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
