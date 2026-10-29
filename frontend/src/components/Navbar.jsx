"use client";

import React, { useState, useEffect } from 'react';
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
  LayoutDashboard
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
    { label: 'Track Order', href: '/track-order' },
    { label: 'About Us', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-[#0c0a0c]/90 backdrop-blur-md border-b border-[#eee7e6] dark:border-white/10 transition-colors">
      {/* Top Banner Notice */}
      <Link
        href="/browse"
        className="bg-[#f7f4f3] dark:bg-[#141113] text-[#63575c] dark:text-[#d4ccd0] border-b border-[#eee7e6] dark:border-white/5 text-[11px] sm:text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 hover:bg-[#efeae8] dark:hover:bg-[#1c181b] transition-colors"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#b84357]" />
        <span>Complimentary delivery on orders over $50 | 30 Days Easy Returns</span>
      </Link>

      {/* Main Header Container (90% width) */}
      <div className="w-[90%] mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0 group">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-[#eee7e6] dark:border-white/10 shadow-none shrink-0 bg-white"
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

          {/* Centered Desktop Menu Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium text-[#4f4449] dark:text-slate-300">
            {navLinks.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="hover:text-[#191416] dark:hover:text-white transition-colors relative py-1 hover:underline underline-offset-4 decoration-[#b84357]"
              >
                {item.label}
              </Link>
            ))}
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
                  className="flex items-center gap-1.5 p-1 rounded-full border border-[#f5d6dc] dark:border-rose-900/50 hover:border-[#c94d64] transition-colors cursor-pointer"
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

                <AnimatePresence>
                  {userDropdown && (
                    <motion.div 
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.18 }}
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

                      <Link href="/track-order" className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-700 dark:text-slate-200">
                        <Truck className="w-4 h-4 text-[#c94d64]" />
                        <span>Track Order</span>
                      </Link>

                      <Link href="/admin" className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-700 dark:text-rose-400 font-bold border-t border-rose-100/60 dark:border-rose-950/40 mt-1">
                        <LayoutDashboard className="w-4 h-4 text-[#c94d64]" />
                        <span>Admin Control Panel</span>
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

      {/* Expandable Search Modal / Bar */}
      <AnimatePresence>
        {searchModalOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-[#eee7e6] dark:border-white/10 bg-white/95 dark:bg-[#0c0a0c]/95 px-4 py-3 shadow-sm overflow-hidden"
          >
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative flex items-center">
              <input
                type="text"
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search serums, lipstick, brushes, perfume, night cream..."
                className="w-full pl-10 pr-24 py-2.5 text-sm rounded-lg bg-[#f7f4f3] dark:bg-white/5 border border-[#eee7e6] dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
              />
              <Search className="w-4 h-4 text-[#73676c] absolute left-3.5" />
              <motion.button
                whileTap={{ scale: 0.94 }}
                type="submit"
                className="absolute right-1.5 px-4 py-1.5 rounded-md bg-[#191416] dark:bg-white text-white dark:text-black text-xs font-medium hover:opacity-90 transition-opacity cursor-pointer"
              >
                Search
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-white/98 dark:bg-[#120a14]/98 border-b border-[#fae1e5] dark:border-rose-950/60 px-5 pt-4 pb-8 space-y-5 shadow-xl max-h-[85vh] overflow-y-auto"
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}