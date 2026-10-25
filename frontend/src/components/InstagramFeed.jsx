import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';

function InstagramIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function InstagramFeed() {
  const posts = [
    { image: '/images/lipstick.jpg', likes: '1.4k', alt: 'Velvet Rouge Lipstick Swatch', href: '/browse?category=Makeup' },
    { image: '/images/brushes.jpg', likes: '2.8k', alt: '10-piece Rose Gold Brush Set', href: '/browse?category=Accessories' },
    { image: '/images/hero-model.jpg', likes: '5.2k', alt: 'Dewy Skin Routine & Peonies', href: '/browse?category=Skincare' },
    { image: '/images/cream.jpg', likes: '1.9k', alt: 'Collagen Night Cream Moisture Barrier', href: '/browse?category=Skincare' },
    { image: '/images/promo-skincare.jpg', likes: '3.1k', alt: 'Hydrating Essence & Toner Routine', href: '/browse?category=Skincare' },
    { image: '/images/perfume.jpg', likes: '4.6k', alt: 'Parisian Rose Perfume Flacon', href: '/browse?category=Fragrance' }
  ];

  return (
    <section className="py-12 sm:py-16">
      <div className="w-[90%] mx-auto px-2 sm:px-4">
        
        {/* Section Heading */}
        <div className="text-center mb-8 sm:mb-10">
          <Link href="/browse" className="group inline-block">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#23171e] dark:text-white group-hover:text-[#c94d64] transition-colors">
              FOLLOW US ON INSTAGRAM <span className="text-[#c94d64]">@BEAUTYANDBLUSH</span>
            </h2>
          </Link>
          <div className="w-12 h-0.5 bg-[#f0cdd4] mx-auto mt-2" />
        </div>

        {/* 6 Images Grid: Smooth touch scroll on mobile, 6-col on desktop */}
        <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 overflow-x-auto pb-4 pt-1 no-scrollbar snap-x snap-mandatory">
          {posts.map((post, idx) => (
            <Link
              key={idx}
              href={post.href || '/browse'}
              className="group relative aspect-square w-36 sm:w-auto shrink-0 snap-item rounded-xl sm:rounded-2xl overflow-hidden bg-[#fdf5f4] dark:bg-rose-950/20 border border-[#fae0e4] dark:border-rose-950/50 shadow-sm block"
              title={post.alt}
            >
              <img
                src={post.image}
                alt={post.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Hover Dark Overlay with Instagram Heart */}
              <div className="absolute inset-0 bg-[#23171e]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-2">
                <InstagramIcon className="w-6 h-6 mb-1.5 text-rose-300" />
                <div className="flex items-center gap-1 text-xs font-bold">
                  <Heart className="w-3.5 h-3.5 fill-current text-[#c94d64]" />
                  <span>{post.likes}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
