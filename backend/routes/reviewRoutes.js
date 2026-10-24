const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Product = require('../models/Product');
const { getIsConnected } = require('../config/db');
const { reviews } = require('../store');

// GET /api/reviews?productId=...
router.get('/', async (req, res) => {
  try {
    const { productId } = req.query;
    if (getIsConnected()) {
      const list = await Review.find(productId ? { productId } : {}).sort({ createdAt: -1 });
      return res.json(list);
    } else {
      let filtered = [...reviews];
      if (productId) filtered = filtered.filter(r => r.productId === productId);
      return res.json(filtered);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving reviews' });
  }
});

// POST /api/reviews
router.post('/', async (req, res) => {
  try {
    const { productId, userId, userName, userAvatar, rating, comment, skinType, shadePurchased } = req.body;

    if (!productId || !comment || !rating) {
      return res.status(400).json({ message: 'Product ID, rating and comment are required' });
    }

    const newRev = {
      productId,
      userId: userId || 'user-' + Date.now(),
      userName: userName || 'Beauty Customer',
      userAvatar: userAvatar || '',
      rating: Number(rating),
      comment,
      skinType: skinType || 'Combination',
      shadePurchased: shadePurchased || '',
      helpfulCount: 0,
      isVerifiedPurchase: true,
      createdAt: new Date()
    };

    if (getIsConnected()) {
      const saved = await Review.create(newRev);

      // Re-calculate product rating
      const allProductReviews = await Review.find({ productId });
      const avg = allProductReviews.reduce((sum, r) => sum + r.rating, 0) / allProductReviews.length;
      await Product.findByIdAndUpdate(productId, {
        rating: Number(avg.toFixed(1)),
        reviewsCount: allProductReviews.length
      });

      return res.status(201).json(saved);
    } else {
      const saved = { _id: 'rev-' + Date.now(), ...newRev };
      reviews.unshift(saved);
      return res.status(201).json(saved);
    }
  } catch (error) {
    console.error('Review submit error:', error);
    res.status(500).json({ message: 'Failed to post review' });
  }
});

module.exports = router;
