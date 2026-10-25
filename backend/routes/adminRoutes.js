const express = require('express');
const router = express.Router();
const { products, orders, coupons, reviews } = require('../store');
const { getIsConnected } = require('../config/db');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Review = require('../models/Review');

// GET /api/admin/analytics - Aggregated marketplace KPIs and statistics
router.get('/analytics', async (req, res) => {
  try {
    let orderList = orders;
    let prodList = products;
    let revList = reviews;

    if (getIsConnected()) {
      try {
        const [dbOrders, dbProds, dbRevs] = await Promise.all([
          Order.find().lean(),
          Product.find().lean(),
          Review.find().lean()
        ]);
        if (dbOrders && dbOrders.length > 0) orderList = dbOrders;
        if (dbProds && dbProds.length > 0) prodList = dbProds;
        if (dbRevs && dbRevs.length > 0) revList = dbRevs;
      } catch (e) {
        console.warn('DB aggregation fallback to in-memory store', e.message);
      }
    }

    const totalRevenue = orderList.reduce((acc, curr) => acc + (Number(curr.totalAmount) || 0), 0);
    const totalOrders = orderList.length;

    const statusCounts = {
      confirmed: orderList.filter(o => o.status === 'Confirmed').length,
      processing: orderList.filter(o => o.status === 'Processing').length,
      shipped: orderList.filter(o => o.status === 'Shipped').length,
      delivered: orderList.filter(o => o.status === 'Delivered').length,
      cancelled: orderList.filter(o => o.status === 'Cancelled').length
    };

    const totalProducts = prodList.length;
    const featuredProducts = prodList.filter(p => p.isFeatured).length;

    const totalCoupons = coupons.length;
    const activeCoupons = coupons.filter(c => c.isActive).length;

    const totalReviews = revList.length;
    const avgRating = totalReviews > 0
      ? (revList.reduce((sum, r) => sum + (Number(r.rating) || 5), 0) / totalReviews).toFixed(1)
      : '5.0';

    return res.json({
      revenue: {
        total: totalRevenue,
        currency: 'BDT'
      },
      orders: {
        total: totalOrders,
        breakdown: statusCounts
      },
      catalog: {
        total: totalProducts,
        featured: featuredProducts
      },
      promotions: {
        totalCoupons,
        activeCoupons
      },
      reviews: {
        total: totalReviews,
        averageRating: Number(avgRating)
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Analytics aggregation error:', error);
    return res.status(500).json({ message: 'Failed to aggregate admin analytics' });
  }
});

module.exports = router;
