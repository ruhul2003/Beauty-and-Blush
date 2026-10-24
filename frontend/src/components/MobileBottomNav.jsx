"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Heart, User, ShoppingBag, LayoutGrid } from 'lucide-react';

export function MobileBottomNav({ onOpenCategories }) {
  const pathname = usePathname() || '';
  const [user, setUser] = useState(null);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const updateState = () => {
      try {
        const savedWishlist = JSON.parse(localStorage.getItem('bnb_wishlist') || '[]');
        setWishlistCount(Array.isArray(savedWishlist) ? savedWishlist.length : 0);

        const savedUser = JSON.parse(localStorage.getItem('bnb_user') || 'null');
        setUser(savedUser);
      } catch (e) {
        setWishlistCount(0);
      }
    };

    updateState();
    window.addEventListener('storage', updateState);
    const interval = setInterval(updateState, 2000);

    return () => {
      window.removeEventListener('storage', updateState);
      clearInterval(interval);
    };
  }, []);

  const isHome = pathname === '/';
  const isShop = Boolean(pathname && pathname.startsWith('/browse'));
  const isWishlist = pathname === '/wishlist';
  const isAccount = Boolean(pathname && (pathname.startsWith('/dashboard') || pathname.startsWith('/auth')));

  const navItems = [
    { label: 'Home', href: '/', icon: Home, isActive: isHome },
    { label: 'Shop', href: '/browse', icon: ShoppingBag, isActive: isShop },
    { 
      label: 'Categories', 
      href: '/browse',
      icon: LayoutGrid, 
      isActive: false 
    },
    { 
      label: 'Wishlist', 
      href: '/wishlist', 
      icon: Heart, 
      isActive: isWishlist,
      badge: wishlistCount > 0 ? wishlistCount : null 
    },
    { 
      label: user ? 'Account' : 'Sign In', 
      href: user ? '/dashboard' : '/auth/login', 
      icon: User, 
      isActive: isAccount 
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#120a14]/95 backdrop-blur-lg border-t border-[#fae0e4] dark:border-rose-950/60 shadow-[0_-8px_25px_rgba(201,77,100,0.08)] px-2 py-1.5 transition-all">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Link key={idx} href={item.href} className="focus:outline-none">
              <div className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 active:scale-90 ${
                item.isActive 
                  ? 'text-[#c94d64] font-semibold' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
              }`}>
                <div className="relative">
                  <Icon className={`w-5 h-5 ${item.isActive ? 'stroke-[2.2]' : 'stroke-[1.8]'}`} />
                  {item.badge && (
                    <span className="absolute -top-1.5 -right-2.5 bg-[#c94d64] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
