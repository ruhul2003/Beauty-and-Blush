"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  PlusCircle, 
  LogOut, 
  Store,
  ChevronDown,
  ShieldCheck,
  Gift,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export function Navbar({ onOpenMobileMenu, isMobileMenuOpen, setIsMobileMenuOpen }) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [localMobileOpen, setLocalMobileOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);

  const mobileOpen = isMobileMenuOpen !== undefined ? isMobileMenuOpen : localMobileOpen;
  const setMobileOpen = setIsMobileMenuOpen || setLocalMobileOpen;

  useEffect(() => {
    const updateWishlist = () => {
      try {
        const saved = JSON.parse(localStorage.getItem('bnb_wishlist') || '[]');
        setWishlistCount(Array.isArray(saved) ? saved.length : 0);
      } catch (e) {
        setWishlistCount(0);
      }
    };
    updateWishlist();
    const timer = setInterval(updateWishlist, 2000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/browse?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchModalOpen(false);
      setMobileOpen(false);
    } else {
      router.push('/browse');
      setSearchModalOpen(false);
    }
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/browse' },
    { label: 'Skincare', href: '/browse?category=Skincare' },
    { label: 'Makeup', href: '/browse?category=Makeup' },
    { label: 'Haircare', href: '/browse?category=Haircare' },
    { label: 'Accessories', href: '/browse?category=Accessories' },
    { label: 'About Us', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0e080f]/95 backdrop-blur-md border-b border-[#fae1e5] dark:border-rose-950/40 transition-colors">
      {/* Top Banner Notice */}
      <Link
        href="/browse"
        className="bg-[#faeeeb] dark:bg-[#20121a] text-[#553b47] dark:text-[#f3d9e2] border-b border-[#fae1db] dark:border-rose-950/50 text-[11px] sm:text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 hover:bg-[#fae4df] dark:hover:bg-[#281722] transition-colors"
      >
        <Gift className="w-3.5 h-3.5 text-[#c94d64]" />
        <span>FREE SHIPPING on all orders over $50 | 30 Days Easy Returns</span>
      </Link>

      {/* Main Header Container (90% width) */}
      <div className="w-[90%] mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0 group">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-[#fae0e4] dark:border-rose-900/40 shadow-sm group-hover:scale-105 transition-transform duration-300 shrink-0 bg-white">
              <img
                src="/images/logo.png"
                alt="Beauty & Blush Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-serif tracking-normal text-[#23171e] dark:text-white font-medium group-hover:text-[#c94d64] transition-colors">
                Beauty & Blush
              </span>
              <span className="text-[9px] uppercase tracking-[0.22em] text-[#c94d64] font-semibold -mt-0.5 hidden sm:block">
                Luxury Cosmetics
              </span>
            </div>
          </Link>

          {/* Centered Desktop Menu Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium text-[#3b2933] dark:text-slate-200">
            {navLinks.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="hover:text-[#c94d64] dark:hover:text-[#f4728d] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#c94d64] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Icon / Trigger */}
            <button
              onClick={() => setSearchModalOpen(!searchModalOpen)}
              className="p-2 text-slate-700 dark:text-slate-200 hover:text-[#c94d64] transition-colors"
              title="Search products"
              aria-label="Search products"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* User / Account Icon */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center gap-1.5 p-1 rounded-full border border-[#f5d6dc] dark:border-rose-900/50 hover:border-[#c94d64] transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-[#c94d64] text-white flex items-center justify-center text-xs font-bold overflow-hidden">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      user.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdown && (
                  <div 
                    className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-[#1a0f1c] shadow-2xl border border-rose-100 dark:border-rose-900/40 py-2 z-50 text-xs"
                    onClick={() => setUserDropdown(false)}
                  >
                    <div className="px-4 py-2 border-b border-rose-100 dark:border-rose-950/60">
                      <p className="font-semibold text-slate-900 dark:text-white truncate">{user.name}</p>
                      <p className="text-slate-500 dark:text-slate-400 truncate text-[11px]">{user.email}</p>
                    </div>

                    <Link href="/dashboard" className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-700 dark:text-slate-200">
                      <Store className="w-4 h-4 text-[#c94d64]" />
                      <span>Seller Dashboard</span>
                    </Link>

                    <Link href="/sell" className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-700 dark:text-slate-200">
                      <PlusCircle className="w-4 h-4 text-[#c94d64]" />
                      <span>Post New Listing</span>
                    </Link>

                    <div className="border-t border-rose-100 dark:border-rose-950/60 mt-1 pt-1">
                      <button
                        onClick={logout}
                        className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-[#c94d64] font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="p-2 text-slate-700 dark:text-slate-200 hover:text-[#c94d64] transition-colors"
                title="Account"
                aria-label="Account"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            )}

            {/* Shopping Bag / Wishlist with Badge */}
            <Link
              href="/wishlist"
              className="p-2 text-slate-700 dark:text-slate-200 hover:text-[#c94d64] transition-colors relative"
              title="Cart / Wishlist"
              aria-label="Wishlist and Bag"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlistCount > 0 ? (
                <span className="absolute 0 top-1 right-0.5 bg-[#c94d64] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              ) : (
                <span className="absolute top-1 right-0.5 bg-[#c94d64] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  0
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-slate-700 dark:text-slate-200 hover:text-[#c94d64] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Search Modal / Bar */}
      {searchModalOpen && (
        <div className="border-t border-[#fae1e5] dark:border-rose-950/60 bg-white/95 dark:bg-[#150a17]/95 px-4 py-3 shadow-md animate-in fade-in slide-in-from-top-2 duration-200">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative flex items-center">
            <input
              type="text"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search serums, lipstick, brushes, perfume, night cream..."
              className="w-full pl-10 pr-24 py-2.5 text-sm rounded-full bg-[#fdf6f5] dark:bg-rose-950/20 border border-[#fae1e5] dark:border-rose-900/40 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#c94d64]/30 focus:border-[#c94d64]"
            />
            <Search className="w-4 h-4 text-[#c94d64] absolute left-3.5" />
            <button
              type="submit"
              className="absolute right-1.5 px-4 py-1.5 rounded-full bg-[#c94d64] text-white text-xs font-semibold hover:bg-[#b53e54] transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white/98 dark:bg-[#120a14]/98 border-b border-[#fae1e5] dark:border-rose-950/60 px-5 pt-4 pb-8 space-y-5 animate-in slide-in-from-top-4 duration-300 shadow-xl max-h-[85vh] overflow-y-auto">
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search beauty products & brands..."
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-[#fdf5f4] dark:bg-rose-950/30 border border-[#fae1e5] dark:border-rose-900/50"
            />
            <Search className="w-4 h-4 text-[#c94d64] absolute left-3 top-1/2 -translate-y-1/2" />
          </form>

          {/* Navigation Links Grid */}
          <div className="grid grid-cols-2 gap-2.5 text-xs font-medium">
            {navLinks.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="p-3 rounded-xl bg-[#fcf2f2]/70 dark:bg-rose-950/20 text-[#3a2832] dark:text-slate-200 hover:bg-[#fae6e9] active:scale-95 transition-all flex items-center justify-between"
              >
                <span>{item.label}</span>
                <ArrowRight className="w-3 h-3 text-[#c94d64]" />
              </Link>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="pt-2 border-t border-[#fae1e5] dark:border-rose-900/40 flex items-center justify-between">
            <Link
              href="/sell"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-1.5 text-xs text-[#c94d64] font-bold"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List Your Beauty Items</span>
            </Link>

            <div className="flex items-center gap-1 text-[11px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>100% Genuine</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
