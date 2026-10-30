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
  ShieldCheck
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
      <div className="sticky top-16 sm:top-20 z-30 pt-3 pb-2 px-2 sm:px-4">
        <div className="w-[90%] mx-auto glass-slab rounded-[28px] sm:rounded-[36px] p-3 sm:p-4 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/60 dark:border-white/10">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="w-9 h-9 rounded-full glass-pill flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-[#b84357] transition-colors shadow-xs"
                title="Return to Store"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base font-serif font-bold text-slate-900 dark:text-white">
                    Beauty & Blush Control Portal
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#b84357] text-white tracking-widest uppercase shadow-xs">
                    ADMIN
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Manage luxury cosmetics catalog, nationwide orders, vouchers & operations
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>System Operational</span>
              </div>

              <Link
                href="/browse"
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-pill text-xs font-bold text-[#b84357] dark:text-rose-300 hover:scale-[1.02] transition-transform shadow-xs"
              >
                <Store className="w-3.5 h-3.5" />
                <span>View Storefront</span>
              </Link>
            </div>
          </div>

          {/* Tab Navigation Menu */}
          <div className="overflow-x-auto no-scrollbar pt-2.5">
            <nav className="flex items-center gap-1.5 sm:gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.exact 
                  ? pathname === item.href 
                  : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-[#b84357] text-white shadow-md shadow-[#b84357]/25 border border-white/40'
                        : 'glass-pill text-slate-600 dark:text-slate-300 hover:text-[#b84357]'
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
      </div>

      {/* Admin Content Area */}
      <main className="w-[90%] mx-auto px-2 sm:px-4 py-8">
        {children}
      </main>
    </div>
  );
}
