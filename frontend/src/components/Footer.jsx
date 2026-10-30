"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Sparkles, MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white/50 dark:bg-[#0c0610]/60 backdrop-blur-3xl border-t border-white/60 dark:border-white/10 pt-16 pb-20 md:pb-12 transition-colors">
      <div className="w-[90%] mx-auto px-2 sm:px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12"
        >
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-white/70 dark:border-white/20 shadow-xs shrink-0 bg-white/80 dark:bg-white/10 backdrop-blur-md">
                <img
                  src="/images/logo.png"
                  alt="Beauty & Blush Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-serif text-[#191416] dark:text-white font-medium transition-colors">
                Beauty & Blush
              </span>
            </Link>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              Authentic luxury cosmetics, clinical skincare, and verified designer fragrances. Guaranteed genuine with physical batch inspection.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#c94d64] shrink-0" />
                <span>Gulshan-1 & Banani, Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#c94d64] shrink-0" />
                <span>+880 1711-224466 (Concierge Support)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#c94d64] shrink-0" />
                <span>support@beautyandblush.com</span>
              </div>
            </div>
          </div>

          {/* Catalog Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#191416] dark:text-white mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li><Link href="/browse?category=Skincare" className="hover:text-[#c94d64] dark:hover:text-rose-400 transition-colors">Skincare & Serums</Link></li>
              <li><Link href="/browse?category=Makeup" className="hover:text-[#c94d64] dark:hover:text-rose-400 transition-colors">Luxury Makeup</Link></li>
              <li><Link href="/browse?category=Fragrance" className="hover:text-[#c94d64] dark:hover:text-rose-400 transition-colors">Designer Fragrances</Link></li>
              <li><Link href="/browse?category=Haircare" className="hover:text-[#c94d64] dark:hover:text-rose-400 transition-colors">Botanical Haircare</Link></li>
              <li><Link href="/browse?category=Accessories" className="hover:text-[#c94d64] dark:hover:text-rose-400 transition-colors">Makeup Brushes</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#191416] dark:text-white mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li><Link href="/browse" className="hover:text-[#c94d64] dark:hover:text-rose-400 transition-colors">Authenticity Promise</Link></li>
              <li><Link href="/browse" className="hover:text-[#c94d64] dark:hover:text-rose-400 transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/browse" className="hover:text-[#c94d64] dark:hover:text-rose-400 transition-colors">Batch Code Check</Link></li>
              <li><Link href="/wishlist" className="hover:text-[#c94d64] dark:hover:text-rose-400 transition-colors">Saved Wishlist</Link></li>
              <li><Link href="/browse" className="hover:text-[#c94d64] dark:hover:text-rose-400 transition-colors">Support Concierge</Link></li>
            </ul>
          </div>

          {/* Boutique */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#191416] dark:text-white mb-4">
              Boutiques
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li><Link href="/sell" className="hover:text-[#c94d64] dark:hover:text-rose-400 transition-colors">List a Product</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#c94d64] dark:hover:text-rose-400 transition-colors">Seller Dashboard</Link></li>
              <li><Link href="/auth/register" className="hover:text-[#c94d64] dark:hover:text-rose-400 transition-colors">MUA Verification</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#c94d64] dark:hover:text-rose-400 transition-colors">Boutique Analytics</Link></li>
            </ul>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/40 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Beauty and Blush. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
            <span>Curated with precision for authentic luxury lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
