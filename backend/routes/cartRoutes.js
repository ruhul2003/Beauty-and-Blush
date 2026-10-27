const express = require('express');
const router = express.Router();
const { cartEvents } = require('../store');
const { getIsConnected } = require('../config/db');
const CartEvent = require('../models/CartEvent');

// POST /api/cart/track - Record a product added to cart
router.post('/track', async (req, res) => {
  try {
    const {
      productId,
      productTitle,
      productPrice,
      productImage,
      shade,
      quantity = 1,
      category = 'Beauty',
      sessionId,
      userId = 'guest',
      userEmail = ''
    } = req.body;

    if (!productId || !productTitle) {
      return res.status(400).json({ message: 'Product ID and Title are required' });
    }

    const newEvent = {
      _id: 'cart-evt-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      productId,
      productTitle,
      productPrice: Number(productPrice) || 0,
      productImage: productImage || '',
      shade: shade || 'Standard',
      quantity: Number(quantity) || 1,
      category: category || 'Beauty',
      sessionId: sessionId || 'sess_' + Date.now(),
      userId: userId || 'guest',
      userEmail: userEmail || '',
      status: 'active',
      createdAt: new Date()
    };

    // Store in in-memory list
    cartEvents.unshift(newEvent);

    // Persist to MongoDB if connected
    if (getIsConnected()) {
      try {
        await CartEvent.create(newEvent);
      } catch (dbErr) {
        console.warn('CartEvent MongoDB persistence warning:', dbErr.message);
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Cart addition event recorded successfully',
      event: newEvent,
      totalTracked: cartEvents.length
    });
  } catch (error) {
    console.error('Track cart error:', error);
    return res.status(500).json({ message: 'Internal server error tracking cart' });
  }
});

// GET /api/cart/events - List recorded cart events
router.get('/events', async (req, res) => {
  try {
    let list = cartEvents;
    if (getIsConnected()) {
      try {
        const dbList = await CartEvent.find().sort({ createdAt: -1 }).limit(100).lean();
        if (dbList && dbList.length > 0) list = dbList;
      } catch (e) {
        console.warn('Fallback to in-memory cart events', e.message);
      }
    }
    return res.json({
      total: list.length,
      events: list
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving cart events' });
  }
});

module.exports = router;
