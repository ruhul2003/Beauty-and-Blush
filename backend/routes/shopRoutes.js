const express = require('express');
const router = express.Router();
const Shop = require('../models/Shop');
const Product = require('../models/Product');
const { getIsConnected } = require('../config/db');
const { shops, products } = require('../store');

// GET /api/shops - List all boutiques
router.get('/', async (req, res) => {
  try {
    if (getIsConnected()) {
      const all = await Shop.find().sort({ rating: -1 });
      return res.json(all);
    } else {
      return res.json(shops);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving shops' });
  }
});

// GET /api/shops/:slug - Single boutique profile with listings
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    if (getIsConnected()) {
      const shop = await Shop.findOne({ slug });
      if (!shop) return res.status(404).json({ message: 'Boutique not found' });
      const shopProducts = await Product.find({ sellerId: shop.ownerId });
      return res.json({ shop, products: shopProducts });
    } else {
      const shop = shops.find(s => s.slug === slug || s._id === slug);
      if (!shop) return res.status(404).json({ message: 'Boutique not found' });
      const shopProducts = products.filter(p => p.sellerId === shop.ownerId);
      return res.json({ shop, products: shopProducts });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving boutique' });
  }
});

// POST /api/shops - Create boutique
router.post('/', async (req, res) => {
  try {
    const { name, ownerId, ownerName, description, logo, banner, phone, email, address, city, category } = req.body;
    if (!name || !ownerId) {
      return res.status(400).json({ message: 'Boutique name and owner ID are required' });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.floor(Math.random() * 1000);
    const newShopData = {
      name,
      slug,
      ownerId,
      ownerName: ownerName || 'Boutique Creator',
      description: description || 'Authentic beauty & cosmetics store.',
      logo: logo || '',
      banner: banner || '',
      phone: phone || '+880 1700-000000',
      email: email || '',
      address: address || 'Dhaka, Bangladesh',
      city: city || 'Dhaka',
      category: category || 'Luxury Cosmetics & Skincare',
      rating: 5.0,
      reviewCount: 0,
      followersCount: 1,
      isVerified: true,
      authenticityGuarantee: true,
      createdAt: new Date()
    };

    if (getIsConnected()) {
      const created = await Shop.create(newShopData);
      return res.status(201).json(created);
    } else {
      const created = { _id: 'shop-' + Date.now(), ...newShopData };
      shops.push(created);
      return res.status(201).json(created);
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to create boutique' });
  }
});

module.exports = router;
