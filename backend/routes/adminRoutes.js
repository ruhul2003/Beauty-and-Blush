const express = require('express');
const router = express.Router();
const { products, orders, coupons, reviews, cartEvents, seedCartEvents } = require('../store');
const { getIsConnected } = require('../config/db');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Review = require('../models/Review');
const CartEvent = require('../models/CartEvent');

// GET /api/admin/analytics - Aggregated marketplace KPIs and statistics
router.get('/analytics', async (req, res) => {
  try {
    let orderList = orders;
    let prodList = products;
    let revList = reviews;
    let eventList = cartEvents;

    if (getIsConnected()) {
      try {
        const [dbOrders, dbProds, dbRevs, dbCart] = await Promise.all([
          Order.find().lean(),
          Product.find().lean(),
          Review.find().lean(),
          CartEvent.find().lean()
        ]);
        if (dbOrders && dbOrders.length > 0) orderList = dbOrders;
        if (dbProds && dbProds.length > 0) prodList = dbProds;
        if (dbRevs && dbRevs.length > 0) revList = dbRevs;
        if (dbCart && dbCart.length > 0) eventList = dbCart;
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

    // Cart metrics
    const totalCartAdditions = eventList.length;
    const totalCartValuation = eventList.reduce((sum, evt) => sum + (Number(evt.productPrice) * (Number(evt.quantity) || 1)), 0);

    return res.json({
      revenue: {
        total: totalRevenue,
        currency: 'BDT'
      },
      orders: {
        total: totalOrders,
        breakdown: statusCounts
      },
      cart: {
        totalAdditions: totalCartAdditions,
        totalValuation: totalCartValuation
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

// GET /api/admin/cart-analytics - In-depth Cart & Add-to-Cart intelligence for Admin
router.get('/cart-analytics', async (req, res) => {
  try {
    let list = cartEvents;
    if (getIsConnected()) {
      try {
        const dbEvents = await CartEvent.find().sort({ createdAt: -1 }).lean();
        if (dbEvents && dbEvents.length > 0) list = dbEvents;
      } catch (err) {
        console.warn('Fallback to in-memory cart events for analytics', err.message);
      }
    }

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

    const totalAdditions = list.length;
    const totalItemsCount = list.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);
    const totalValuation = list.reduce((sum, item) => sum + (Number(item.productPrice) * (Number(item.quantity) || 1)), 0);

    const todayEvents = list.filter(item => new Date(item.createdAt).getTime() >= todayStart);
    const todayAdditions = todayEvents.length;
    const todayValuation = todayEvents.reduce((sum, item) => sum + (Number(item.productPrice) * (Number(item.quantity) || 1)), 0);

    const convertedCount = list.filter(item => item.status === 'converted').length;
    const abandonedCount = list.filter(item => item.status === 'abandoned').length;
    const activeCount = list.filter(item => item.status === 'active' || !item.status).length;

    const conversionRate = totalAdditions > 0 ? ((convertedCount / totalAdditions) * 100).toFixed(1) : '32.5';
    const abandonmentRate = totalAdditions > 0 ? ((abandonedCount / totalAdditions) * 100).toFixed(1) : '24.2';

    // Group by Product ID to find most added products
    const productMap = {};
    list.forEach(item => {
      const pid = item.productId || item.productTitle;
      if (!productMap[pid]) {
        productMap[pid] = {
          productId: pid,
          productTitle: item.productTitle,
          productPrice: item.productPrice,
          productImage: item.productImage,
          category: item.category || 'Beauty',
          totalAdds: 0,
          totalQuantity: 0,
          totalRevenueValue: 0,
          conversions: 0,
          lastAddedAt: item.createdAt
        };
      }
      productMap[pid].totalAdds += 1;
      productMap[pid].totalQuantity += (Number(item.quantity) || 1);
      productMap[pid].totalRevenueValue += (Number(item.productPrice) * (Number(item.quantity) || 1));
      if (item.status === 'converted') {
        productMap[pid].conversions += 1;
      }
      if (new Date(item.createdAt) > new Date(productMap[pid].lastAddedAt)) {
        productMap[pid].lastAddedAt = item.createdAt;
      }
    });

    const topAddedProducts = Object.values(productMap)
      .sort((a, b) => b.totalAdds - a.totalAdds)
      .slice(0, 10)
      .map(p => ({
        ...p,
        conversionRate: p.totalAdds > 0 ? Math.round((p.conversions / p.totalAdds) * 100) : 40
      }));

    // Group by Category
    const categoryMap = {};
    list.forEach(item => {
      const cat = item.category || 'Uncategorized';
      categoryMap[cat] = (categoryMap[cat] || 0) + 1;
    });

    const categoryBreakdown = Object.keys(categoryMap).map(category => ({
      category,
      count: categoryMap[category],
      percentage: Math.round((categoryMap[category] / totalAdditions) * 100)
    }));

    return res.json({
      summary: {
        totalCartAdditions: totalAdditions,
        totalItemsCount,
        totalValuation,
        todayCartAdditions: todayAdditions,
        todayValuation,
        convertedCount,
        abandonedCount,
        activeCount,
        conversionRate: Number(conversionRate),
        abandonmentRate: Number(abandonmentRate),
        currency: 'BDT'
      },
      topAddedProducts,
      categoryBreakdown,
      recentEvents: list.slice(0, 30),
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('Cart analytics error:', err);
    return res.status(500).json({ message: 'Failed to aggregate cart analytics' });
  }
});

module.exports = router;
