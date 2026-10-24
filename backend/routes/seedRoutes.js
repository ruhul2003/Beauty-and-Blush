const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Shop = require('../models/Shop');
const { seedProducts, seedShops } = require('../store');
const { getIsConnected } = require('../config/db');

// POST /api/seed - Manually re-seed MongoDB database
router.post('/', async (req, res) => {
  try {
    if (!getIsConnected()) {
      return res.status(503).json({ message: 'MongoDB not currently connected' });
    }

    await Product.deleteMany({});
    const sanitizedProducts = seedProducts.map(({ _id, ...p }) => p);
    const insertedProds = await Product.insertMany(sanitizedProducts);

    await Shop.deleteMany({});
    const sanitizedShops = seedShops.map(({ _id, ...s }) => s);
    const insertedShops = await Shop.insertMany(sanitizedShops);

    return res.json({
      message: 'Database seeded successfully',
      productsCount: insertedProds.length,
      shopsCount: insertedShops.length
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ message: 'Seed failed', error: error.message });
  }
});

module.exports = router;
