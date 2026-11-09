"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  LogOut
} from 'lucide-react';
import { AdminLoginGate } from '@/components/AdminLoginGate';
import { adminApi } from '@/lib/api';
import { useToast } from '@/context/ToastContext';

export default function AdminLayout({ children }) {
  const pathname = usePathname() || '';
  const router = useRouter();
  const { showToast } = useToast();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const verifySession = async () => {
      try {
        const token = localStorage.getItem('bnb_admin_token');
        const cachedRaw = localStorage.getItem('bnb_admin_user');
        const cachedUser = cachedRaw ? JSON.parse(cachedRaw) : null;

        if (!token) {
          if (isMounted) {
            setIsAuthenticated(false);
            setCheckingAuth(false);
          }
          return;
        }

        if (token.startsWith('bnb_admin_local_') && cachedUser?.role === 'admin') {
          if (isMounted) {
            setAdminUser(cachedUser);
            setIsAuthenticated(true);
            setCheckingAuth(false);
          }
          return;
        }

        try {
          const res = await adminApi.verify();
          if (res.data?.valid && isMounted) {
            setAdminUser(res.data.admin);
            setIsAuthenticated(true);
          }
        } catch (err) {
          if (err.response && (err.response.status === 401 || err.response.status === 403)) {
            localStorage.removeItem('bnb_admin_token');
            localStorage.removeItem('bnb_admin_user');
            if (isMounted) setIsAuthenticated(false);
          } else if (cachedUser?.role === 'admin' && isMounted) {
            setAdminUser(cachedUser);
            setIsAuthenticated(true);
          }
        }
      } catch (e) {
        if (isMounted) setIsAuthenticated(false);
      } finally {
        if (isMounted) setCheckingAuth(false);
      }
    };

    verifySession();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    if (!checkingAuth && isAuthenticated && pathname === '/admin/login') {
      router.replace('/admin');
    }
  }, [checkingAuth, isAuthenticated, pathname, router]);

  const handleLoginSuccess = (admin) => {
    setAdminUser(admin);
    setIsAuthenticated(true);
    if (pathname === '/admin/login') {
      router.replace('/admin');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('bnb_admin_token');
    localStorage.removeItem('bnb_admin_user');
    setAdminUser(null);
    setIsAuthenticated(false);
    showToast?.('Signed out from Admin Portal', 'info');
  };

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard, exact: true },
    { label: 'Products', href: '/admin/products', icon: Package },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { label: 'Cart Analytics', href: '/admin/cart', icon: ShoppingCart },
    { label: 'Coupons', href: '/admin/coupons', icon: Tag },
    { label: 'Reviews & Q&A', href: '/admin/reviews', icon: MessageSquare },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  if (checkingAuth) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-[#e06d84]/30 border-t-[#e06d84] animate-spin" />
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          Verifying admin credentials...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLoginGate onSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100 pb-16">
      {/* Top Admin Header Bar */}
      <div className="sticky top-16 sm:top-20 z-30 pt-3 pb-2 px-2 sm:px-4">
        <div className="w-[90%] mx-auto glass-slab rounded-[28px] sm:rounded-[36px] p-3 sm:p-4 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/60 dark:border-white/10">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="w-9 h-9 rounded-full glass-pill flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-[#e06d84] transition-colors shadow-xs"
                title="Return to Store"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base font-serif font-bold text-slate-900 dark:text-white">
                    Beauty & Blush Control Portal
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#e06d84] text-white tracking-widest uppercase shadow-xs">
                    {adminUser?.username || 'ADMIN'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Manage luxury cosmetics catalog, nationwide orders, vouchers & operations
                </p>
              </div>
            </div>

            <div className="flex items-center flex-wrap gap-2 self-start sm:self-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>System Operational</span>
              </div>

              <Link
                href="/browse"
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-pill text-xs font-bold text-[#e06d84] dark:text-rose-300 hover:scale-[1.02] transition-transform shadow-xs"
              >
                <Store className="w-3.5 h-3.5" />
                <span>View Storefront</span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-pill text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-[#e06d84] hover:text-white transition-all shadow-xs cursor-pointer"
                title="Sign out of Admin Portal"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
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
                        ? 'bg-[#e06d84] text-white shadow-md shadow-[#e06d84]/25 border border-white/40'
                        : 'glass-pill text-slate-600 dark:text-slate-300 hover:text-[#e06d84]'
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
