"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
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
  ArrowRight, 
  Truck, 
  LayoutDashboard 
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { ThemeToggle } from './ThemeToggle';

export function Navbar({ onOpenMobileMenu, isMobileMenuOpen, setIsMobileMenuOpen }) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { cartCount, openCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [localMobileOpen, setLocalMobileOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);

  const hoverTimeoutRef = useRef(null);

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

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const handleCategoryEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setCategoryDropdown(true);
  };

  const handleCategoryLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setCategoryDropdown(false);
    }, 180);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/browse?search=${encodeURIComponent(searchTerm.trim())}`);
      setMobileOpen(false);
    } else {
      router.push('/browse');
    }
  };

  const categories = [
    {
      name: 'Skincare',
      href: '/browse?category=Skincare',
      desc: 'Hydrating serums, creams & cleansers',
      tag: 'Clinical'
    },
    {
      name: 'Makeup',
      href: '/browse?category=Makeup',
      desc: 'Soft blushes, lipsticks & palettes',
      tag: 'Trending'
    },
    {
      name: 'Fragrance',
      href: '/browse?category=Fragrance',
      desc: 'French parfumerie & floral mists',
      tag: 'Luxury'
    },
    {
      name: 'Haircare',
      href: '/browse?category=Haircare',
      desc: 'Botanical oils, masks & shampoos',
      tag: 'Botanical'
    },
    {
      name: 'Ladies Bags',
      href: '/browse?category=Bags',
      desc: 'Artisan leather & designer handbags',
      tag: 'New'
    },
    {
      name: 'Home Decor',
      href: '/browse?category=Home+Decor',
      desc: 'Aesthetic ceramic vases & scents',
      tag: 'Sanctuary'
    },
    {
      name: 'Accessories',
      href: '/browse?category=Accessories',
      desc: 'Pro rose gold brushes & blenders',
      tag: 'Pro'
    }
  ];

  const mainNavLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/browse' },
    { label: 'Track Order', href: '/track-order' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <header className="fixed top-2.5 sm:top-4 inset-x-0 mx-auto z-40 w-[95%] sm:w-[92%] max-w-[1500px] glass-dock rounded-[28px] sm:rounded-full transition-all duration-300">
      
      {/* Main Header Container */}
      <div className="w-full px-3.5 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-3 sm:gap-4">
          
          {/* Brand Logo with Liquid Glass Avatar */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0 group">
            <motion.div 
              whileHover={{ scale: 1.06, rotate: 2 }}
              whileTap={{ scale: 0.94 }}
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden shadow-sm shrink-0 bg-white/90 dark:bg-white/10 backdrop-blur-md border border-white/80 dark:border-white/20 p-0.5"
            >
              <img
                src="/images/logo.png"
                alt="Beauty & Blush Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-serif tracking-tight text-[#181416] dark:text-white font-bold transition-colors">
                Beauty & Blush
              </span>
              <span className="text-[9px] uppercase tracking-[0.24em] text-[#b84357] dark:text-rose-300 font-bold -mt-0.5 hidden sm:block">
                Luxury Cosmetics
              </span>
            </div>
          </Link>

          {/* Centered Desktop Menu Links (Clay-Glass Capsule Buttons) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-xs font-bold">
            <Link
              href="/"
              className="px-4 py-2 rounded-full border border-transparent hover:border-white/80 dark:hover:border-white/15 hover:bg-white/80 dark:hover:bg-white/[0.08] text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:shadow-xs transition-all"
            >
              Home
            </Link>

            <Link
              href="/browse"
              className="px-4 py-2 rounded-full border border-transparent hover:border-white/80 dark:hover:border-white/15 hover:bg-white/80 dark:hover:bg-white/[0.08] text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:shadow-xs transition-all"
            >
              Shop
            </Link>

            {/* Hover Categories Dropdown Button */}
            <div 
              className="relative py-1"
              onMouseEnter={handleCategoryEnter}
              onMouseLeave={handleCategoryLeave}
            >
              <button
                type="button"
                className={`px-4 py-2 rounded-full border transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  categoryDropdown
                    ? 'bg-white/90 dark:bg-white/[0.12] text-[#b84357] dark:text-rose-300 border-white/90 dark:border-white/20 shadow-xs'
                    : 'border-transparent hover:border-white/80 dark:hover:border-white/15 hover:bg-white/80 dark:hover:bg-white/[0.08] text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white'
                }`}
                aria-expanded={categoryDropdown}
              >
                <span>Categories</span>
                <ChevronDown 
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    categoryDropdown ? 'rotate-180 text-[#b84357]' : 'text-slate-400'
                  }`} 
                />
              </button>

              {/* Clay-Glass Category Dropdown Menu */}
              <AnimatePresence>
                {categoryDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[500px] z-50 pointer-events-auto"
                    onMouseEnter={handleCategoryEnter}
                    onMouseLeave={handleCategoryLeave}
                  >
                    <div className="glass-slab p-5 space-y-3.5 shadow-2xl">
                      
                      <div className="flex items-center justify-between px-2 pt-0.5 pb-2 border-b border-black/[0.04] dark:border-white/[0.06]">
                        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#b84357] dark:text-rose-300">
                          Boutique Collections
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                          7 Curated Departments
                        </span>
                      </div>

                      {/* 2-Column Grid of Categories */}
                      <div className="grid grid-cols-2 gap-2">
                        {categories.map((cat, idx) => (
                          <Link
                            key={idx}
                            href={cat.href}
                            onClick={() => setCategoryDropdown(false)}
                            className="p-3 rounded-2xl border border-white/60 dark:border-white/[0.06] bg-white/50 dark:bg-white/[0.03] hover:bg-white/90 dark:hover:bg-white/[0.08] hover:shadow-xs transition-all flex flex-col group/cat"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover/cat:text-[#b84357] dark:group-hover/cat:text-rose-300 transition-colors">
                                {cat.name}
                              </span>
                              <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded-full bg-black/[0.03] dark:bg-white/[0.08] text-slate-600 dark:text-slate-300 group-hover/cat:text-[#b84357]">
                                {cat.tag}
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                              {cat.desc}
                            </span>
                          </Link>
                        ))}
                      </div>

                      {/* Bottom Footer Strip */}
                      <div className="pt-2 border-t border-black/[0.04] dark:border-white/[0.06] px-2 flex items-center justify-between">
                        <Link
                          href="/browse"
                          onClick={() => setCategoryDropdown(false)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#b84357] dark:text-rose-300 hover:underline"
                        >
                          <span>Explore Full Catalogue</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                          <span>100% Genuine</span>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/track-order"
              className="px-4 py-2 rounded-full border border-transparent hover:border-white/80 dark:hover:border-white/15 hover:bg-white/80 dark:hover:bg-white/[0.08] text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:shadow-xs transition-all"
            >
              Track Order
            </Link>

            <Link
              href="/#about"
              className="px-4 py-2 rounded-full border border-transparent hover:border-white/80 dark:hover:border-white/15 hover:bg-white/80 dark:hover:bg-white/[0.08] text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:shadow-xs transition-all"
            >
              About
            </Link>
          </nav>

          {/* Right Section: Concave Pill Search Bar & Circular Floating Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Desktop Debossed Concave Search Capsule (Direct from Reference Image) */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
              <div className="glass-well rounded-full flex items-center px-3.5 py-1.5 w-44 lg:w-56 transition-all duration-200 focus-within:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search beauty..."
                  className="w-full bg-transparent text-xs text-[#181416] dark:text-white placeholder:text-slate-400 focus:outline-none"
                />
              </div>
            </form>

            {/* Mobile Search Button */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden glass-pill w-9.5 h-9.5 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-[#b84357] shadow-xs cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </motion.button>

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="glass-pill w-9.5 h-9.5 sm:w-10 sm:h-10 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-[#b84357] shadow-xs relative cursor-pointer"
              title="Saved Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#b84357] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Bag Trigger */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              type="button"
              onClick={openCart}
              className="glass-pill w-9.5 h-9.5 sm:w-10 sm:h-10 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-[#b84357] shadow-xs relative cursor-pointer"
              title="Shopping Bag"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 bg-[#b84357] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            </motion.button>

            {/* 3D Glass Light/Dark Mode Theme Toggle */}
            <ThemeToggle />

            {/* User Account / Profile */}
            {user ? (
              <div className="relative">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="glass-pill flex items-center gap-1.5 p-1 pr-2 shadow-xs cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-[#b84357] text-white flex items-center justify-center text-xs font-bold overflow-hidden shadow-xs">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      user.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </motion.button>

                {/* Glass User Dropdown */}
                <AnimatePresence>
                  {userDropdown && (
                    <motion.div 
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 mt-2.5 w-56 rounded-3xl glass-slab shadow-2xl py-2.5 z-50 text-xs"
                      onClick={() => setUserDropdown(false)}
                    >
                      <div className="px-4 py-2 border-b border-black/[0.04] dark:border-white/[0.06]">
                        <p className="font-bold text-[#181416] dark:text-white truncate">{user.name}</p>
                        <p className="text-slate-500 dark:text-slate-400 truncate text-[11px]">{user.email}</p>
                      </div>

                      <Link href="/dashboard" className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-white/80 dark:hover:bg-white/[0.05] text-slate-700 dark:text-slate-200">
                        <Store className="w-4 h-4 text-[#b84357]" />
                        <span>Seller Dashboard</span>
                      </Link>

                      <Link href="/sell" className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-white/80 dark:hover:bg-white/[0.05] text-slate-700 dark:text-slate-200">
                        <PlusCircle className="w-4 h-4 text-[#b84357]" />
                        <span>Post New Listing</span>
                      </Link>

                      <Link href="/track-order" className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-white/80 dark:hover:bg-white/[0.05] text-slate-700 dark:text-slate-200">
                        <Truck className="w-4 h-4 text-[#b84357]" />
                        <span>Track Order</span>
                      </Link>

                      <Link href="/admin" className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-white/80 dark:hover:bg-white/[0.05] text-rose-700 dark:text-rose-400 font-bold border-t border-black/[0.04] dark:border-white/[0.06] mt-1">
                        <LayoutDashboard className="w-4 h-4 text-[#b84357]" />
                        <span>Admin Control Panel</span>
                      </Link>

                      <div className="border-t border-black/[0.04] dark:border-white/[0.06] mt-1 pt-1">
                        <button
                          onClick={logout}
                          className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 hover:bg-white/80 dark:hover:bg-white/[0.05] text-[#b84357] font-bold"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="glass-pill w-9.5 h-9.5 sm:w-10 sm:h-10 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-[#b84357] shadow-xs cursor-pointer"
                title="Account"
                aria-label="Account"
              >
                <User className="w-4 h-4" />
              </Link>
            )}

            {/* Mobile Hamburger Menu Button */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden glass-pill w-9.5 h-9.5 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-slate-950 shadow-xs cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Clay-Glass Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden rounded-b-[28px] border-t border-black/[0.04] dark:border-white/[0.06] bg-white/92 dark:bg-[#120a15]/95 backdrop-blur-3xl px-5 pt-4 pb-8 space-y-5 shadow-2xl max-h-[82vh] overflow-y-auto"
          >
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative">
              <div className="glass-well rounded-full flex items-center px-4 py-2.5">
                <Search className="w-4 h-4 text-[#b84357] mr-2 shrink-0" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search beauty products & brands..."
                  className="w-full bg-transparent text-xs text-[#181416] dark:text-white placeholder:text-slate-400 focus:outline-none"
                />
              </div>
            </form>

            {/* Categories Quick Showcase */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                Shop by Category
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {categories.map((cat, idx) => (
                  <Link
                    key={idx}
                    href={cat.href}
                    onClick={() => setMobileOpen(false)}
                    className="p-3 rounded-2xl border border-white/60 dark:border-white/[0.05] bg-white/60 dark:bg-white/[0.03] hover:bg-white transition-colors flex items-center justify-between"
                  >
                    <span className="font-bold text-slate-800 dark:text-slate-200">{cat.name}</span>
                    <span className="text-[9px] text-[#b84357] font-bold">{cat.tag}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Navigation Links Grid */}
            <div className="pt-2 border-t border-black/[0.04] dark:border-white/[0.06]">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-2">
                Quick Navigation
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                {mainNavLinks.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="p-3 rounded-2xl border border-white/60 dark:border-white/[0.05] bg-white/60 dark:bg-white/[0.03] text-slate-800 dark:text-slate-100 hover:bg-white active:scale-95 transition-all flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Theme Toggle & Quick Actions */}
            <div className="pt-3 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ThemeToggle compact />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Switch Theme</span>
              </div>

              <Link
                href="/sell"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-1.5 text-xs text-[#b84357] font-bold"
              >
                <PlusCircle className="w-4 h-4" />
                <span>List Your Items</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
