"use client";

import React from 'react';
import Link from 'next/link';
import { Sparkles, Heart, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-[#0d070e] border-t border-rose-100 dark:border-rose-950/60 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-rose-600 to-rose-400 flex items-center justify-center text-white shadow-md shadow-rose-500/25">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-2xl font-serif font-bold tracking-tight text-slate-900 dark:text-white">
                Beauty <span className="text-rose-600 font-sans">&</span> Blush
              </span>
            </Link>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              Bangladesh's verified peer-to-peer and salon boutique cosmetics marketplace. Bringing authentic international skincare, luxury makeup, and rare designer fragrances with 100% genuine batch code verification.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Gulshan-1 & Banani, Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-rose-500 shrink-0" />
                <span>+880 1711-224466 (Support & Inquiries)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-rose-500 shrink-0" />
                <span>concierge@beautyandblush.com</span>
              </div>
            </div>
          </div>

          {/* Catalog Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Explore Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li><Link href="/browse?category=Skincare" className="hover:text-rose-600 transition-colors">Clinical Skincare</Link></li>
              <li><Link href="/browse?category=Makeup" className="hover:text-rose-600 transition-colors">Luxury Makeup</Link></li>
              <li><Link href="/browse?category=Fragrance" className="hover:text-rose-600 transition-colors">Designer Fragrances</Link></li>
              <li><Link href="/browse?category=Haircare" className="hover:text-rose-600 transition-colors">Bond Repair & Haircare</Link></li>
              <li><Link href="/browse?category=Bath%20%26%20Body" className="hover:text-rose-600 transition-colors">Bath & Body Creams</Link></li>
              <li><Link href="/browse?category=Tools%20%26%20Brushes" className="hover:text-rose-600 transition-colors">Professional Brushes</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li><Link href="/browse" className="hover:text-rose-600 transition-colors">Authenticity Promise</Link></li>
              <li><Link href="/browse" className="hover:text-rose-600 transition-colors">Courier Delivery & COD</Link></li>
              <li><Link href="/browse" className="hover:text-rose-600 transition-colors">Batch Code Verification</Link></li>
              <li><Link href="/browse" className="hover:text-rose-600 transition-colors">Anti-Counterfeit Policy</Link></li>
              <li><Link href="/wishlist" className="hover:text-rose-600 transition-colors">Saved Wishlist</Link></li>
              <li><Link href="/browse" className="hover:text-rose-600 transition-colors">FAQ & Support</Link></li>
            </ul>
          </div>

          {/* Seller Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Seller Boutiques
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li><Link href="/sell" className="hover:text-rose-600 transition-colors">List a Cosmetic</Link></li>
              <li><Link href="/dashboard" className="hover:text-rose-600 transition-colors">Boutique Dashboard</Link></li>
              <li><Link href="/auth/register" className="hover:text-rose-600 transition-colors">MUA Verification</Link></li>
              <li><Link href="/dashboard" className="hover:text-rose-600 transition-colors">Store Analytics</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-rose-100 dark:border-rose-950/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
          <p>© {new Date().getFullYear()} Beauty and Blush Marketplace. All rights reserved.</p>
          <div className="flex items-center gap-1 text-rose-500">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>for authentic beauty lovers in Bangladesh</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
