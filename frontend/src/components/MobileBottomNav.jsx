"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Heart, User, ShoppingBag, Compass } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function MobileBottomNav({ onOpenCategories }) {
  const pathname = usePathname() || '';
  const { cartCount, openCart } = useCart();
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
    { label: 'Shop', href: '/browse', icon: Compass, isActive: isShop },
    { 
      label: 'Bag', 
      onClick: openCart,
      icon: ShoppingBag, 
      isActive: false,
      badge: cartCount > 0 ? cartCount : null 
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
    <div className="md:hidden fixed bottom-3 left-4 right-4 z-50 rounded-full glass-dock px-3 py-2 transition-all">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const content = (
            <motion.div 
              whileTap={{ scale: 0.88 }}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-full transition-all ${
                item.isActive 
                  ? 'text-[#b84357] dark:text-rose-300 font-bold glass-pill shadow-xs' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <div className="relative">
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${item.isActive ? 'stroke-[2.2]' : 'stroke-[1.6]'}`} />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2 bg-[#b84357] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight font-medium">{item.label}</span>
            </motion.div>
          );

          if (item.onClick) {
            return (
              <button key={idx} type="button" onClick={item.onClick} className="focus:outline-none cursor-pointer">
                {content}
              </button>
            );
          }

          return (
            <Link key={idx} href={item.href}>
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
