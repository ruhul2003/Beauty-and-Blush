# 🌸 Beauty and Blush — Luxury Cosmetics, Skincare & Fragrance Marketplace

**Beauty and Blush** is a verified luxury beauty marketplace for Bangladesh built with a state-of-the-art tech stack (Next.js 16, React 19, Tailwind CSS v4, Express.js, MongoDB Atlas & Mongoose).

---

## ✨ Features & Architecture Highlights

### 👑 Comprehensive Admin Control Portal (`/admin`)
- **Executive Analytics Dashboard (`/admin`)**: Real-time gross revenue, order volume milestones, conversion metrics, catalog capacity, and live status breakdowns.
- **Product & Inventory Manager (`/admin/products`)**: Filter by category and status, quick inline price/shade editing modal, feature curation, and deletion management.
- **Order Fulfillment & Courier Dispatch (`/admin/orders`)**: Live status advancement (`Confirmed` ➔ `Processing` ➔ `Shipped` ➔ `Delivered` ➔ `Cancelled`), customer courier assignment (Pathao, Steadfast, RedX), and WhatsApp dispatch alerts.
- **Promotional Coupons & Voucher Engine (`/admin/coupons`)**: Create, toggle, and manage percentage discounts, flat cash off, and nationwide free shipping codes (`BLUSH15`, `GLOW20`, `FREESHIP`).
- **Customer Reviews & Q&A Moderation (`/admin/reviews`)**: Moderate verified buyer ratings, review authenticity batch confirmations, and publish official boutique responses to community questions.
- **Store Configuration & Settings (`/admin/settings`)**: Configure district courier delivery fees (Dhaka ৳60 / Outside Dhaka ৳120), announcement banner text, support contact numbers, and authenticity check URLs.

### 🛍️ Client Experience & E-Commerce Features
- **Real-Time Order Tracking Timeline (`/track-order`)**: Look up parcel progress with BNB order reference codes through 5 live fulfillment steps.
- **Interactive Quick View Modal**: Preview shade swatches, batch codes, pricing, and place instant orders directly from product cards without page reloading.
- **Promo Coupon Support at Checkout**: Apply promotional vouchers in `BuyModal` with immediate discount calculation and invoice transparency.
- **Recently Viewed Beauty Essentials**: Automatic client-side tracking of recently viewed cosmetics displayed on product detail pages.
- **Advanced Catalog Filters (`/browse`)**: Brand filter chips (Rare Beauty, The Ordinary, Charlotte Tilbury, Dior, Fenty, CeraVe), condition filters, price range slider, and in-stock toggles.
- **Physical Batch Code Verification**: 100% genuine promise with anti-counterfeit batch verification.
- **Saved Wishlist with Valuation**: BDT valuation, local persistence, and instant checkout.
- **AI Beauty Advisor Concierge**: Instant smart suggestions for skin types, blush shade matching, and clinical routine recommendations.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 16 App Router (Turbopack, React 19, Tailwind CSS v4, Lucide React, Framer Motion, Axios, JSX)
- **Backend**: Node.js, Express.js, Mongoose, JWT, CORS
- **Database**: MongoDB Atlas (`mongodb+srv://...`) with in-memory resilient fallback store
- **Deployment**: Vercel Serverless Architecture

---

## 🚀 Getting Started

### 1. Backend Setup
```bash
cd backend
npm install
npm run dev
# Running on http://localhost:5000
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
# Running on http://localhost:3000
```

### 3. Portal Navigation Routes
- **Storefront Home**: `http://localhost:3000/`
- **Cosmetics Catalog**: `http://localhost:3000/browse`
- **Order Tracker**: `http://localhost:3000/track-order`
- **Admin Control Panel**: `http://localhost:3000/admin`
