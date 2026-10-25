"use client";

import React from 'react';
import Link from 'next/link';
import { Heart, Sparkles, MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-[#0c070d] border-t border-[#fae0e4] dark:border-rose-950/60 pt-16 pb-20 md:pb-12 transition-colors">
      <div className="w-[90%] mx-auto px-2 sm:px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-[#fae0e4] dark:border-rose-900/40 shadow-sm group-hover:scale-105 transition-transform shrink-0 bg-white">
                <img
                  src="/images/logo.png"
                  alt="Beauty & Blush Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-2xl font-serif text-[#23171e] dark:text-white font-medium group-hover:text-[#c94d64] transition-colors">
                Beauty & Blush
              </span>
            </Link>

            <p className="text-xs text-[#7d646f] dark:text-slate-400 leading-relaxed max-w-sm">
              Discover authentic luxury cosmetics, clinical skincare, and verified designer perfumes. 100% genuine guaranteed with physical batch-code inspection.
            </p>

            <div className="pt-2 space-y-2 text-xs text-[#7d646f] dark:text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#c94d64] shrink-0" />
                <span>Gulshan-1 & Banani, Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#c94d64] shrink-0" />
                <span>+880 1711-224466 (Concierge Support)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#c94d64] shrink-0" />
                <span>support@beautyandblush.com</span>
              </div>
            </div>
          </div>

          {/* Catalog Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#23171e] dark:text-white mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#7d646f] dark:text-slate-400">
              <li><Link href="/browse?category=Skincare" className="hover:text-[#c94d64] transition-colors">Skincare & Serums</Link></li>
              <li><Link href="/browse?category=Makeup" className="hover:text-[#c94d64] transition-colors">Luxury Makeup</Link></li>
              <li><Link href="/browse?category=Fragrance" className="hover:text-[#c94d64] transition-colors">Designer Fragrances</Link></li>
              <li><Link href="/browse?category=Haircare" className="hover:text-[#c94d64] transition-colors">Botanical Haircare</Link></li>
              <li><Link href="/browse?category=Accessories" className="hover:text-[#c94d64] transition-colors">Makeup Brushes & Tools</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#23171e] dark:text-white mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#7d646f] dark:text-slate-400">
              <li><Link href="/browse" className="hover:text-[#c94d64] transition-colors">Authenticity Promise</Link></li>
              <li><Link href="/browse" className="hover:text-[#c94d64] transition-colors">Shipping & Easy Returns</Link></li>
              <li><Link href="/browse" className="hover:text-[#c94d64] transition-colors">Batch Code Verification</Link></li>
              <li><Link href="/wishlist" className="hover:text-[#c94d64] transition-colors">Saved Wishlist</Link></li>
              <li><Link href="/browse" className="hover:text-[#c94d64] transition-colors">FAQ & Support</Link></li>
            </ul>
          </div>

          {/* Boutique */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#23171e] dark:text-white mb-4">
              Boutiques
            </h4>
            <ul className="space-y-2.5 text-xs text-[#7d646f] dark:text-slate-400">
              <li><Link href="/sell" className="hover:text-[#c94d64] transition-colors">List a Product</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#c94d64] transition-colors">Seller Dashboard</Link></li>
              <li><Link href="/auth/register" className="hover:text-[#c94d64] transition-colors">MUA Verification</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#c94d64] transition-colors">Boutique Analytics</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#fae0e4] dark:border-rose-950/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7d646f] dark:text-slate-500">
          <p>© {new Date().getFullYear()} Beauty and Blush. All rights reserved.</p>
          <div className="flex items-center gap-1 text-[#c94d64]">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>for authentic beauty lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
