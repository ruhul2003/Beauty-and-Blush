const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const { getIsConnected } = require('../config/db');
const { orders } = require('../store');

// GET /api/orders - Get user orders or seller orders
router.get('/', async (req, res) => {
  try {
    const { buyerId, sellerId } = req.query;
    let query = {};
    if (buyerId) query.buyerId = buyerId;
    if (sellerId) query.sellerId = sellerId;

    if (getIsConnected()) {
      const list = await Order.find(query).sort({ createdAt: -1 });
      return res.json(list);
    } else {
      let filtered = [...orders];
      if (buyerId) filtered = filtered.filter(o => o.buyerId === buyerId);
      if (sellerId) filtered = filtered.filter(o => o.sellerId === sellerId);
      return res.json(filtered);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving orders' });
  }
});

// GET /api/orders/:id - Single order and tracking
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (getIsConnected()) {
      const order = await Order.findById(id);
      if (!order) return res.status(404).json({ message: 'Order not found' });
      return res.json(order);
    } else {
      const order = orders.find(o => o._id === id || o.orderNumber === id);
      if (!order) return res.status(404).json({ message: 'Order not found' });
      return res.json(order);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error finding order' });
  }
});

// POST /api/orders - Place beauty order
router.post('/', async (req, res) => {
  try {
    const {
      productId,
      productTitle,
      productPrice,
      productImage,
      shade,
      quantity,
      buyerId,
      buyerName,
      buyerEmail,
      buyerPhone,
      sellerId,
      sellerName,
      deliveryAddress,
      division,
      courierService,
      paymentMethod
    } = req.body;

    const qty = Number(quantity || 1);
    const price = Number(productPrice);
    const deliveryFee = division && division.toLowerCase() === 'dhaka' ? 60 : 120;
    const totalAmount = price * qty + deliveryFee;

    const newOrderData = {
      orderNumber: 'BNB-' + Math.floor(100000 + Math.random() * 900000),
      productId,
      productTitle,
      productPrice: price,
      productImage: productImage || '',
      shade: shade || 'Default',
      quantity: qty,
      buyerId: buyerId || 'guest-' + Date.now(),
      buyerName: buyerName || 'Beauty Customer',
      buyerEmail: buyerEmail || '',
      buyerPhone: buyerPhone || '+880 1700-000000',
      sellerId: sellerId || 'seller-admin',
      sellerName: sellerName || 'Beauty and Blush Verified',
      deliveryAddress: deliveryAddress || 'Dhaka, Bangladesh',
      division: division || 'Dhaka',
      courierService: courierService || 'Pathao Courier',
      deliveryFee,
      totalAmount,
      paymentMethod: paymentMethod || 'Cash on Delivery (COD)',
      status: 'Confirmed',
      createdAt: new Date()
    };

    if (getIsConnected()) {
      const created = await Order.create(newOrderData);
      return res.status(201).json(created);
    } else {
      const created = { _id: 'ord-' + Date.now(), ...newOrderData };
      orders.unshift(created);
      return res.status(201).json(created);
    }
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ message: 'Failed to place order' });
  }
});

// PUT /api/orders/:id/status - Update tracking status
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (getIsConnected()) {
      const updated = await Order.findByIdAndUpdate(id, { status }, { new: true });
      return res.json(updated);
    } else {
      const o = orders.find(item => item._id === id || item.orderNumber === id);
      if (o) {
        o.status = status;
        return res.json(o);
      }
      return res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order status' });
  }
});

module.exports = router;
