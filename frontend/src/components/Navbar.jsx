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
  Gift,
  ArrowRight,
  Truck,
  LayoutDashboard,
  Layers,
  Sparkle
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

export function Navbar({ onOpenMobileMenu, isMobileMenuOpen, setIsMobileMenuOpen }) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { cartCount, openCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [localMobileOpen, setLocalMobileOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
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
      setSearchModalOpen(false);
      setMobileOpen(false);
    } else {
      router.push('/browse');
      setSearchModalOpen(false);
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
      tag: 'New Arrival'
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
      tag: 'Essential'
    }
  ];

  const mainNavLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/browse' },
    // Category dropdown item sits here
    { label: 'Track Order', href: '/track-order' },
    { label: 'About Us', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/70 dark:bg-[#0d0910]/75 backdrop-blur-xl border-b border-white/40 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.35)] transition-all">
      {/* Top Banner Notice (Glassy translucent strip) */}
      <Link
        href="/browse"
        className="bg-white/35 dark:bg-black/30 backdrop-blur-md text-[#554a50] dark:text-[#d4ccd0] border-b border-white/20 dark:border-white/5 text-[11px] sm:text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 hover:bg-white/50 dark:hover:bg-white/10 transition-colors"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#b84357]" />
        <span>Complimentary nationwide delivery on orders over ৳2,000 | 100% Genuine Authentic Guarantee</span>
      </Link>

      {/* Main Header Container (90% width) */}
      <div className="w-[90%] mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0 group">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-white/60 dark:border-white/10 shadow-sm shrink-0 bg-white/90 backdrop-blur-sm"
            >
              <img
                src="/images/logo.png"
                alt="Beauty & Blush Logo"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-serif tracking-normal text-[#191416] dark:text-white font-medium transition-colors">
                Beauty & Blush
              </span>
              <span className="text-[9px] uppercase tracking-[0.24em] text-[#82757a] font-medium -mt-0.5 hidden sm:block">
                Luxury Cosmetics
              </span>
            </div>
          </Link>

          {/* Centered Desktop Menu Links (Clean, Uncluttered, Glass Dropdown) */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] font-medium text-[#4f4449] dark:text-slate-300">
            <Link
              href="/"
              className="hover:text-[#191416] dark:hover:text-white transition-colors relative py-1 hover:underline underline-offset-4 decoration-[#b84357]"
            >
              Home
            </Link>

            <Link
              href="/browse"
              className="hover:text-[#191416] dark:hover:text-white transition-colors relative py-1 hover:underline underline-offset-4 decoration-[#b84357]"
            >
              Shop
            </Link>

            {/* Hover Categories Dropdown */}
            <div 
              className="relative py-2"
              onMouseEnter={handleCategoryEnter}
              onMouseLeave={handleCategoryLeave}
            >
              <button
                type="button"
                className="flex items-center gap-1.5 hover:text-[#191416] dark:hover:text-white transition-colors cursor-pointer py-1 font-medium group"
                aria-expanded={categoryDropdown}
              >
                <span>Categories</span>
                <ChevronDown 
                  className={`w-3.5 h-3.5 transition-transform duration-200 text-slate-400 group-hover:text-[#b84357] ${
                    categoryDropdown ? 'rotate-180 text-[#b84357]' : ''
                  }`} 
                />
              </button>

              {/* Glass Dropdown Menu */}
              <AnimatePresence>
                {categoryDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[480px] z-50 pointer-events-auto"
                    onMouseEnter={handleCategoryEnter}
                    onMouseLeave={handleCategoryLeave}
                  >
                    <div className="bg-white/80 dark:bg-[#130b15]/85 backdrop-blur-2xl rounded-2xl border border-white/60 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.14)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.55)] p-3.5 space-y-2.5">
                      
                      <div className="flex items-center justify-between px-2 pt-1 pb-1 border-b border-rose-200/40 dark:border-white/10">
                        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#b84357] dark:text-rose-300">
                          Shop by Boutique Category
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                          7 Curated Collections
                        </span>
                      </div>

                      {/* 2-Column Grid of Categories */}
                      <div className="grid grid-cols-2 gap-1.5">
                        {categories.map((cat, idx) => (
                          <Link
                            key={idx}
                            href={cat.href}
                            onClick={() => setCategoryDropdown(false)}
                            className="p-2.5 rounded-xl hover:bg-rose-500/10 dark:hover:bg-rose-500/15 border border-transparent hover:border-rose-300/40 dark:hover:border-rose-500/30 transition-all flex flex-col group/cat"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 group-hover/cat:text-[#b84357] dark:group-hover/cat:text-rose-300 transition-colors">
                                {cat.name}
                              </span>
                              <span className="text-[9px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded-md bg-rose-100/70 dark:bg-rose-950/70 text-[#b84357] dark:text-rose-300 border border-rose-200/50 dark:border-rose-900/40">
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
                      <div className="pt-2 border-t border-rose-200/40 dark:border-white/10 px-2 flex items-center justify-between">
                        <Link
                          href="/browse"
                          onClick={() => setCategoryDropdown(false)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#b84357] dark:text-rose-300 hover:underline"
                        >
                          <span>Explore Full Catalogue</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
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
              className="hover:text-[#191416] dark:hover:text-white transition-colors relative py-1 hover:underline underline-offset-4 decoration-[#b84357]"
            >
              Track Order
            </Link>

            <Link
              href="/#about"
              className="hover:text-[#191416] dark:hover:text-white transition-colors relative py-1 hover:underline underline-offset-4 decoration-[#b84357]"
            >
              About Us
            </Link>

            <Link
              href="/#contact"
              className="hover:text-[#191416] dark:hover:text-white transition-colors relative py-1 hover:underline underline-offset-4 decoration-[#b84357]"
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Icon / Trigger */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setSearchModalOpen(!searchModalOpen)}
              className="p-2 text-slate-700 dark:text-slate-200 hover:text-[#c94d64] transition-colors cursor-pointer"
              title="Search products"
              aria-label="Search products"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>

            {/* User / Account Icon */}
            {user ? (
              <div className="relative">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center gap-1.5 p-1 rounded-full border border-white/60 dark:border-rose-900/50 hover:border-[#c94d64] bg-white/40 dark:bg-white/5 backdrop-blur-sm transition-colors cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-[#c94d64] text-white flex items-center justify-center text-xs font-bold overflow-hidden">
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
                      className="absolute right-0 mt-2 w-56 rounded-2xl bg-white/80 dark:bg-[#150d18]/85 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.55)] border border-white/60 dark:border-white/10 py-2 z-50 text-xs"
                      onClick={() => setUserDropdown(false)}
                    >
                      <div className="px-4 py-2 border-b border-rose-100/60 dark:border-white/10">
                        <p className="font-semibold text-slate-900 dark:text-white truncate">{user.name}</p>
                        <p className="text-slate-500 dark:text-slate-400 truncate text-[11px]">{user.email}</p>
                      </div>

                      <Link href="/dashboard" className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-rose-500/10 dark:hover:bg-rose-500/20 text-slate-700 dark:text-slate-200">
                        <Store className="w-4 h-4 text-[#c94d64]" />
                        <span>Seller Dashboard</span>
                      </Link>

                      <Link href="/sell" className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-rose-500/10 dark:hover:bg-rose-500/20 text-slate-700 dark:text-slate-200">
                        <PlusCircle className="w-4 h-4 text-[#c94d64]" />
                        <span>Post New Listing</span>
                      </Link>

                      <Link href="/track-order" className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-rose-500/10 dark:hover:bg-rose-500/20 text-slate-700 dark:text-slate-200">
                        <Truck className="w-4 h-4 text-[#c94d64]" />
                        <span>Track Order</span>
                      </Link>

                      <Link href="/admin" className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-rose-500/10 dark:hover:bg-rose-500/20 text-rose-700 dark:text-rose-400 font-bold border-t border-rose-100/60 dark:border-white/10 mt-1">
                        <LayoutDashboard className="w-4 h-4 text-[#c94d64]" />
                        <span>Admin Control Panel</span>
                      </Link>

                      <div className="border-t border-rose-100/60 dark:border-white/10 mt-1 pt-1">
                        <button
                          onClick={logout}
                          className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 hover:bg-rose-500/10 dark:hover:bg-rose-500/20 text-[#c94d64] font-medium"
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
                className="p-2 text-slate-700 dark:text-slate-200 hover:text-[#c94d64] transition-colors"
                title="Account"
                aria-label="Account"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            )}

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="p-2 text-slate-700 dark:text-slate-200 hover:text-[#c94d64] transition-colors relative"
              title="Saved Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-0.5 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Bag / Cart Drawer Trigger */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={openCart}
              className="p-2 text-slate-700 dark:text-slate-200 hover:text-[#c94d64] transition-colors relative cursor-pointer"
              title="Shopping Bag"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute top-1 right-0.5 bg-[#c94d64] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-slate-700 dark:text-slate-200 hover:text-[#c94d64] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Expandable Glass Search Modal / Bar */}
      <AnimatePresence>
        {searchModalOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-white/40 dark:border-white/10 bg-white/80 dark:bg-[#0c070d]/85 backdrop-blur-2xl px-4 py-3.5 shadow-md overflow-hidden"
          >
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative flex items-center">
              <input
                type="text"
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search serums, lipstick, brushes, perfume, night cream, handbags..."
                className="w-full pl-10 pr-24 py-2.5 text-sm rounded-xl bg-white/70 dark:bg-white/5 border border-white/60 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#b84357]"
              />
              <Search className="w-4 h-4 text-[#73676c] absolute left-3.5" />
              <motion.button
                whileTap={{ scale: 0.94 }}
                type="submit"
                className="absolute right-1.5 px-4 py-1.5 rounded-lg bg-[#b84357] hover:bg-[#a13346] text-white text-xs font-semibold shadow-sm transition-opacity cursor-pointer"
              >
                Search
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Glass Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-white/85 dark:bg-[#120a14]/90 backdrop-blur-2xl border-b border-white/40 dark:border-white/10 px-5 pt-4 pb-8 space-y-5 shadow-2xl max-h-[85vh] overflow-y-auto"
          >
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search beauty products & brands..."
                className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-white/60 dark:bg-white/5 border border-rose-200/60 dark:border-white/10"
              />
              <Search className="w-4 h-4 text-[#c94d64] absolute left-3 top-1/2 -translate-y-1/2" />
            </form>

            {/* Categories Quick Showcase */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#b84357] dark:text-rose-300">
                Shop by Category
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {categories.map((cat, idx) => (
                  <Link
                    key={idx}
                    href={cat.href}
                    onClick={() => setMobileOpen(false)}
                    className="p-2.5 rounded-xl bg-white/50 dark:bg-white/5 border border-rose-100/60 dark:border-white/10 hover:border-rose-300 transition-colors flex items-center justify-between"
                  >
                    <span className="font-medium text-slate-800 dark:text-slate-200">{cat.name}</span>
                    <span className="text-[9px] text-[#b84357] font-semibold">{cat.tag}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Navigation Links Grid */}
            <div className="pt-2 border-t border-rose-200/40 dark:border-white/10">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-2">
                Quick Navigation
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                {mainNavLinks.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="p-2.5 rounded-xl bg-white/40 dark:bg-white/5 text-[#3a2832] dark:text-slate-200 hover:bg-rose-50/50 active:scale-95 transition-all flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-3 h-3 text-[#c94d64]" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-3 border-t border-rose-200/40 dark:border-white/10 flex items-center justify-between">
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}