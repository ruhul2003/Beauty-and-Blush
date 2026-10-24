# 🌸 Beauty and Blush - Deployment & Architecture Guide

This guide details deploying the **Beauty & Blush Luxury Cosmetics Marketplace** (Next.js frontend + Express serverless REST API backend) to Vercel and MongoDB Atlas.

---

## 🏗️ Architecture Overview

The repository is organized as a clean monorepo:
- **`frontend/`**: Next.js App Router (React 19, Tailwind CSS v4, Lucide React, Framer Motion, Axios, JSX)
- **`backend/`**: Express.js REST API with MongoDB & Mongoose (Serverless Node.js entry via `api/index.js` & `vercel.json`)

---

## 🍃 MongoDB Atlas Configuration

- **Database Connection String**:
  `mongodb+srv://beauty-and-blush:beautyandblush@tilux-server.cltfmst.mongodb.net/beauty_and_blush?retryWrites=true&w=majority`
- **Network Access**: Ensure `0.0.0.0/0` (Allow access from anywhere) is active in MongoDB Atlas Network Security for serverless dynamic IPs.

---

## ⚡ Step 1: Deploy Backend to Vercel

1. Go to [Vercel](https://vercel.com/) and click **Add New... > Project**.
2. Select your `Beauty-and-Blush` GitHub repository.
3. Configure settings:
   - **Project Name**: `beauty-and-blush-backend`
   - **Framework Preset**: **Other**
   - **Root Directory**: **`backend`**
4. Set Environment Variables:
   - `MONGODB_URI`: `mongodb+srv://beauty-and-blush:beautyandblush@tilux-server.cltfmst.mongodb.net/beauty_and_blush?retryWrites=true&w=majority`
   - `JWT_SECRET`: `beauty_and_blush_jwt_secret_key_2026_luxury_token`
   - `NODE_ENV`: `production`
5. Click **Deploy**. Copy your backend URL (e.g., `https://beauty-and-blush-backend.vercel.app`).
   - Check health endpoint: `/api/health` -> `{"status":"OK"}`.

---

## 🌐 Step 2: Deploy Frontend to Vercel

1. In Vercel, click **Add New... > Project**.
2. Select the **same** `Beauty-and-Blush` repository.
3. Configure settings:
   - **Project Name**: `beauty-and-blush`
   - **Framework Preset**: **Next.js**
   - **Root Directory**: **`frontend`**
4. Set Environment Variables:
   - `NEXT_PUBLIC_API_URL`: `https://beauty-and-blush-backend.vercel.app/api`
   - `NEXT_PUBLIC_APP_URL`: `https://beauty-and-blush.vercel.app`
5. Click **Deploy**.

---

## 🌟 Marketplace Capabilities

1. **Physical Batch Code Authentication**: Verifiable codes on all luxury cosmetics, perfumes & skincare.
2. **Interactive AI Beauty Advisor**: Real-time consultation for skin types, shades, and perfumes.
3. **Nationwide Courier Delivery Calculator**: Division-based cost breakdown covering Pathao, Steadfast, RedX with Cash on Delivery (COD).
4. **WhatsApp 1-Click Seller Inquiries**: Direct connection with verified boutique owners.
5. **Community Q&A and Verified Reviews**: Social proof and community trust.
6. **Seller Boutique Dashboard**: Inventory management, order tracking, and metrics.
