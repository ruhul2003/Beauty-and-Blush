"use client";

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, Flame } from 'lucide-react';

export function PromoGrid() {
  const cards = [
    {
      tag: "Korean Skincare Edit",
      title: "Glass-Skin Essentials & Barrier Repair",
      desc: "Authentic COSRX, Laneige, Beauty of Joseon directly imported with intact Korean seals.",
      link: "/browse?category=Skincare",
      gradient: "from-rose-500/90 to-pink-600/90",
      image: "https://images.unsplash.com/photo-1608248597359-0028a394ec56?auto=format&fit=crop&w=600&q=80"
    },
    {
      tag: "French & Arabian Scents",
      title: "Prestige Designer & Niche Perfumes",
      desc: "Dior, YSL, Tom Ford & Lattafa flacons. Verifiable batch code engraving guaranteed.",
      link: "/browse?category=Fragrance",
      gradient: "from-amber-600/90 to-rose-700/90",
      image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80"
    },
    {
      tag: "Makeup Artist Vault",
      title: "Dewy Blushes, Powders & Lip Oils",
      desc: "Rare Beauty, Charlotte Tilbury, Fenty and MAC. Brand new & sealed boxes.",
      link: "/browse?category=Makeup",
      gradient: "from-purple-600/90 to-rose-600/90",
      image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="relative rounded-3xl overflow-hidden shadow-lg border border-rose-200/60 dark:border-rose-900/40 group min-h-[260px] flex flex-col justify-end p-6"
            >
              {/* Background Image with Overlay */}
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${card.gradient} opacity-85 group-hover:opacity-90 transition-opacity`} />

              {/* Card Content */}
              <div className="relative z-10 text-white space-y-2">
                <span className="inline-block px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-widest bg-white/20 backdrop-blur-md rounded-full">
                  {card.tag}
                </span>

                <h3 className="text-xl font-serif font-bold leading-tight">
                  {card.title}
                </h3>

                <p className="text-xs text-white/90 line-clamp-2 font-normal">
                  {card.desc}
                </p>

                <div className="pt-2">
                  <Link
                    href={card.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-amber-200 transition-colors"
                  >
                    <span>Shop Curated Deals</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
