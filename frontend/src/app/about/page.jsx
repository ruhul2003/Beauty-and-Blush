"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Truck, 
  Heart, 
  CheckCircle2, 
  ArrowRight, 
  MapPin, 
  Phone, 
  Mail, 
  Star,
  Clock,
  PackageCheck
} from 'lucide-react';

export default function AboutPage() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "Batch-Code Verified",
      subtitle: "Zero Tolerance For Clones",
      desc: "Every cosmetic, perfume flacon, and clinical serum undergoes rigorous manual batch verification against official manufacturer archives prior to entering our vault."
    },
    {
      icon: Sparkles,
      title: "Active Potency Guard",
      subtitle: "Climate-Controlled Storage",
      desc: "Delicate actives—such as pure Vitamin C, retinoids, and botanical extracts—are preserved in strictly climate-regulated facilities to ensure maximum shelf freshness."
    },
    {
      icon: Award,
      title: "Direct House Sourcing",
      subtitle: "Global Luxury Partners",
      desc: "We curate our inventory directly through authorized boutique channels and verified distributors across Paris, Seoul, London, Tokyo, and New York."
    },
    {
      icon: Truck,
      title: "Nationwide Concierge",
      subtitle: "Cash on Delivery",
      desc: "Carefully bubble-wrapped and delivered across all 64 districts of Bangladesh with prompt courier tracking and hassle-free Cash on Delivery."
    }
  ];

  const milestones = [
    { value: "25,000+", label: "Delivered Orders", sub: "Across Bangladesh" },
    { value: "100%", label: "Authentic Guarantee", sub: "Or 200% Refund" },
    { value: "60+", label: "Prestigious Brands", sub: "Paris, Seoul & NY" },
    { value: "24-48h", label: "Express Dispatch", sub: "Dhaka Metro Priority" }
  ];

  const departments = [
    {
      title: "Dewy Blushes & Rouge",
      desc: "Weightless botanical liquid blushes, silk powders, and multi-use lip flushes for a radiant bloom.",
      href: "/browse?category=Makeup",
      tag: "Trending"
    },
    {
      title: "Clinical Barrier Skincare",
      desc: "Hydrating hyaluronic serums, soothing cica balms, and peptides tailored for tropical weather.",
      href: "/browse?category=Skincare",
      tag: "Clinical"
    },
    {
      title: "Haute Parfumerie",
      desc: "French floral waters, rich oriental ouds, and delicate peony mists with long-lasting sillage.",
      href: "/browse?category=Fragrance",
      tag: "Luxury"
    },
    {
      title: "Artisan Leather & Sanctuary",
      desc: "Handcrafted designer ladies handbags and serene architectural ceramic decor for modern living.",
      href: "/browse?category=Accessories",
      tag: "Curated"
    }
  ];

  return (
    <div className="w-[95%] sm:w-[92%] max-w-[1500px] mx-auto px-2 sm:px-4 py-8 sm:py-12 space-y-12 sm:space-y-16">
      
      {/* Top Breadcrumb */}
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-[#e06d84] dark:hover:text-rose-300 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-[#181416] dark:text-slate-200 font-bold">About Our Boutique</span>
      </nav>

      {/* Hero Section */}
      <section className="glass-slab p-6 sm:p-12 lg:p-16 rounded-[36px] sm:rounded-[44px] relative overflow-hidden">
        <div className="max-w-3xl space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-bold text-[#e06d84] dark:text-rose-300 uppercase tracking-widest shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Heritage & Vision</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#181416] dark:text-white leading-[1.12] tracking-tight">
            Where Elegance Meets Absolute Authenticity.
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Founded with a passion for genuine beauty, <strong className="text-[#e06d84] dark:text-rose-300">Beauty & Blush</strong> was born out of a commitment to solve a vital need in Bangladesh: providing discerning beauty lovers with uncompromising access to 100% verified cosmetics, clinical skincare, and luxury fragrances.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/browse"
              className="bg-[#e06d84] hover:bg-[#d45d74] text-white px-6 sm:px-8 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 shadow-md shadow-[#e06d84]/25 hover:scale-[1.02] active:scale-98 transition-all"
            >
              <span>Explore The Boutique</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/track-order"
              className="glass-pill px-5 sm:px-7 py-2.5 rounded-full text-xs sm:text-sm font-bold text-slate-800 dark:text-white hover:text-[#e06d84] transition-all"
            >
              <span>Track An Order</span>
            </Link>
          </div>
        </div>

        {/* Decorative Light Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#e06d84]/10 dark:bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Brand Numbers & Milestones */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {milestones.map((m, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: idx * 0.08 }}
            className="glass-slab p-6 sm:p-8 text-center space-y-1.5 rounded-[28px]"
          >
            <span className="text-2xl sm:text-4xl font-serif font-black text-[#b84357] dark:text-rose-300 block">
              {m.value}
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#181416] dark:text-white block font-serif">
              {m.label}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
              {m.sub}
            </span>
          </motion.div>
        ))}
      </section>

      {/* 4 Pillars of Quality */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="glass-pill px-3.5 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#b84357] dark:text-rose-300 shadow-xs inline-block">
            Our Standard
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#181416] dark:text-white">
            The Four Pillars of Beauty & Blush
          </h2>
          <p className="text-xs text-slate-500">
            We hold ourselves to international standards of authenticity, packaging, and concierge customer care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="glass-slab p-6 sm:p-7 space-y-4 rounded-[28px] flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="glass-well w-12 h-12 rounded-2xl flex items-center justify-center text-[#b84357] dark:text-rose-300 shrink-0 shadow-xs">
                    <Icon className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-serif font-bold text-[#181416] dark:text-white">
                      {pillar.title}
                    </h3>
                    <span className="text-[11px] font-bold text-[#b84357] dark:text-rose-300 uppercase tracking-wider block mt-0.5">
                      {pillar.subtitle}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Curated Departments Section */}
      <section className="glass-slab p-6 sm:p-10 lg:p-12 rounded-[36px] sm:rounded-[40px] space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="glass-pill px-3.5 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#b84357] dark:text-rose-300 shadow-xs inline-block mb-2">
              Curated Departments
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#181416] dark:text-white">
              Signature Collections
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Thoughtfully selected for sensitive skin, long-wear performance, and sophisticated elegance.
            </p>
          </div>

          <Link
            href="/browse"
            className="text-xs font-bold text-[#b84357] dark:text-rose-300 hover:underline flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {departments.map((dept, idx) => (
            <Link
              key={idx}
              href={dept.href}
              className="glass-well p-5 rounded-2xl hover:border-[#b84357]/40 transition-all group block space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#b84357] dark:text-rose-300 glass-pill px-2.5 py-0.5">
                  {dept.tag}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#e06d84] group-hover:translate-x-1 transition-all" />
              </div>
              <h4 className="text-sm font-serif font-bold text-[#181416] dark:text-white group-hover:text-[#e06d84] dark:group-hover:text-rose-300 transition-colors">
                {dept.title}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {dept.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Founder Philosophy & Authenticity Pledge */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 glass-slab p-8 sm:p-10 rounded-[32px] sm:rounded-[36px] flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#181416] dark:text-white leading-snug">
              "We believe that real luxury is confidence. Knowing that the blush, foundation, or serum you apply to your skin is authentic, pure, and sourced with integrity."
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              In a market crowded with dubious replicas and expired batches, Beauty & Blush stands as an unyielding benchmark of authenticity. If a product doesn't pass our internal batch check, it never reaches our inventory. Period.
            </p>
          </div>

          <div className="pt-4 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-[#181416] dark:text-white font-serif">The Beauty & Blush Atelier</p>
              <p className="text-[11px] text-slate-500">Curators of Fine Beauty & Living</p>
            </div>
            <span className="glass-pill px-3 py-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Verified Atelier</span>
            </span>
          </div>
        </div>

        {/* Concierge & Contact Hub Card */}
        <div className="lg:col-span-5 glass-slab p-8 sm:p-10 rounded-[32px] sm:rounded-[36px] flex flex-col justify-between space-y-6">
          <div>
            <span className="glass-pill px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#e06d84] dark:text-rose-300 shadow-xs inline-block mb-3">
              Personal Concierge
            </span>
            <h3 className="text-xl font-serif font-bold text-[#181416] dark:text-white">
              Connect With Our Team
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Need assistance finding your exact shade or checking a product's formulation? Our beauty advisors are on standby.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-2xl glass-well flex items-center gap-3">
              <MapPin className="w-4 h-4 text-[#e06d84] shrink-0" />
              <span className="text-slate-700 dark:text-slate-300">Gulshan-1 & Banani, Dhaka, Bangladesh</span>
            </div>

            <div className="p-3 rounded-2xl glass-well flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#e06d84] shrink-0" />
              <span className="text-slate-700 dark:text-slate-300">+880 1711-224466 (Support & Orders)</span>
            </div>

            <div className="p-3 rounded-2xl glass-well flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#e06d84] shrink-0" />
              <span className="text-slate-700 dark:text-slate-300">concierge@beautyandblush.com</span>
            </div>
          </div>

          <a
            href="https://wa.me/8801711224466?text=Hello%2C%20I%20would%20like%20to%20consult%20with%20a%20Beauty%20%26%20Blush%20advisor."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-emerald-600/20"
          >
            <span>Chat via WhatsApp Concierge</span>
          </a>
        </div>
      </section>

    </div>
  );
}
