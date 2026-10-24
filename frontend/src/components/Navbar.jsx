"use client";

import React, { useState } from 'react';
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
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/browse?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push('/browse');
    }
  };

  const navCategories = [
    { label: 'All Catalog', href: '/browse' },
    { label: 'Skincare', href: '/browse?category=Skincare' },
    { label: 'Makeup', href: '/browse?category=Makeup' },
    { label: 'Haircare', href: '/browse?category=Haircare' },
    { label: 'Fragrance', href: '/browse?category=Fragrance' },
    { label: 'Bath & Body', href: '/browse?category=Bath%20%26%20Body' },
    { label: 'Tools & Brushes', href: '/browse?category=Tools%20%26%20Brushes' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-[#0f0910]/90 backdrop-blur-md border-b border-rose-100 dark:border-rose-950/40 transition-colors">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 text-white text-[12px] sm:text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        <span>100% Authenticity Guaranteed: Every Cosmetic & Fragrance Batch Code Verified</span>
        <span className="hidden md:inline">• Nationwide Courier Delivery with Cash on Delivery</span>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-600 to-rose-400 flex items-center justify-center text-white shadow-md shadow-rose-500/25 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                Beauty <span className="text-rose-600 font-sans">&</span> Blush
              </span>
              <span className="hidden sm:block text-[10px] uppercase tracking-widest text-rose-500 font-semibold -mt-1">
                Luxury Marketplace
              </span>
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search blush, serums, Rare Beauty, Dior, lipsticks..."
              className="w-full pl-10 pr-4 py-2 text-sm rounded-full bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/40 text-slate-900 dark:text-white placeholder:text-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all"
            />
            <Search className="w-4 h-4 text-rose-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </form>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link
              href="/sell"
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 dark:hover:bg-rose-900/40 border border-rose-200 dark:border-rose-900/50 transition-colors"
            >
              <PlusCircle className="w-4 h-4 text-rose-500" />
              <span>List Product</span>
            </Link>

            <Link
              href="/wishlist"
              className="p-2 text-slate-600 hover:text-rose-600 dark:text-slate-300 dark:hover:text-rose-400 transition-colors relative"
              title="Saved items"
            >
              <Heart className="w-5 h-5" />
            </Link>

            {/* User Dropdown / Login */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center gap-2 p-1 pl-2 rounded-full border border-rose-200 dark:border-rose-900/50 hover:border-rose-400 transition-colors"
                >
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-200 hidden sm:inline max-w-[100px] truncate">
                    {user.name}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs font-bold overflow-hidden">
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
                      <Store className="w-4 h-4 text-rose-500" />
                      <span>Seller Dashboard</span>
                    </Link>

                    <Link href="/sell" className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-700 dark:text-slate-200">
                      <PlusCircle className="w-4 h-4 text-rose-500" />
                      <span>Post New Listing</span>
                    </Link>

                    <div className="border-t border-rose-100 dark:border-rose-950/60 mt-1 pt-1">
                      <button
                        onClick={logout}
                        className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-full text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-950/30 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/auth/register"
                  className="btn-rose-primary px-3.5 py-1.5 text-xs"
                >
                  Join
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <nav className="hidden md:flex items-center gap-6 py-2 border-t border-rose-100/60 dark:border-rose-950/30 overflow-x-auto scrollbar-none text-xs font-medium text-slate-600 dark:text-slate-300">
          {navCategories.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="hover:text-rose-600 dark:hover:text-rose-400 whitespace-nowrap transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#120a14] border-b border-rose-100 dark:border-rose-950/60 px-4 pt-3 pb-6 space-y-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search cosmetics & perfumes..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50"
            />
            <Search className="w-4 h-4 text-rose-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </form>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {navCategories.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 text-slate-700 dark:text-slate-200 hover:bg-rose-100"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-rose-100 dark:border-rose-900/40 flex justify-between items-center text-xs">
            <Link
              href="/sell"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-1.5 text-rose-600 font-semibold"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List your cosmetics</span>
            </Link>
            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-rose-500" />
              <span>Verified Authenticity</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
