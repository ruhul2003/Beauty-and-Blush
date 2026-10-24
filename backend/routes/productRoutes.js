const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { getIsConnected } = require('../config/db');
const { products } = require('../store');

// GET /api/products - Filter, search and query beauty catalog
router.get('/', async (req, res) => {
  try {
    const { 
      search, 
      category, 
      subcategory,
      condition, 
      brand, 
      skinType, 
      minPrice, 
      maxPrice, 
      sort, 
      featured, 
      sellerId,
      location 
    } = req.query;

    if (getIsConnected()) {
      let query = {};

      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { brand: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { shade: { $regex: search, $options: 'i' } }
        ];
      }

      if (category && category !== 'All') {
        query.category = category;
      }

      if (subcategory && subcategory !== 'All') {
        query.subcategory = subcategory;
      }

      if (condition && condition !== 'All') {
        query.condition = condition;
      }

      if (brand && brand !== 'All') {
        query.brand = { $regex: brand, $options: 'i' };
      }

      if (skinType && skinType !== 'All') {
        query.skinType = { $regex: skinType, $options: 'i' };
      }

      if (location && location !== 'All') {
        query.location = { $regex: location, $options: 'i' };
      }

      if (sellerId) {
        query.sellerId = sellerId;
      }

      if (featured === 'true') {
        query.isFeatured = true;
      }

      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
      }

      let sortOption = { createdAt: -1 };
      if (sort === 'price_asc') sortOption = { price: 1 };
      if (sort === 'price_desc') sortOption = { price: -1 };
      if (sort === 'rating') sortOption = { rating: -1 };
      if (sort === 'popular') sortOption = { views: -1 };

      const items = await Product.find(query).sort(sortOption);
      return res.json(items);
    } else {
      // Memory fallback
      let filtered = [...products];

      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(p => 
          p.title.toLowerCase().includes(s) || 
          p.brand.toLowerCase().includes(s) || 
          p.description.toLowerCase().includes(s) ||
          (p.shade && p.shade.toLowerCase().includes(s))
        );
      }

      if (category && category !== 'All') {
        filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
      }

      if (condition && condition !== 'All') {
        filtered = filtered.filter(p => p.condition.toLowerCase() === condition.toLowerCase());
      }

      if (brand && brand !== 'All') {
        filtered = filtered.filter(p => p.brand.toLowerCase().includes(brand.toLowerCase()));
      }

      if (skinType && skinType !== 'All') {
        filtered = filtered.filter(p => p.skinType.toLowerCase().includes(skinType.toLowerCase()));
      }

      if (sellerId) {
        filtered = filtered.filter(p => p.sellerId === sellerId);
      }

      if (featured === 'true') {
        filtered = filtered.filter(p => p.isFeatured);
      }

      if (minPrice) {
        filtered = filtered.filter(p => p.price >= Number(minPrice));
      }

      if (maxPrice) {
        filtered = filtered.filter(p => p.price <= Number(maxPrice));
      }

      if (sort === 'price_asc') filtered.sort((a, b) => a.price - b.price);
      else if (sort === 'price_desc') filtered.sort((a, b) => b.price - a.price);
      else if (sort === 'rating') filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      else if (sort === 'popular') filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
      else filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      return res.json(filtered);
    }
  } catch (error) {
    console.error('Fetch products error:', error);
    res.status(500).json({ message: 'Error retrieving products' });
  }
});

// GET /api/products/:id - Single product details
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      let product = null;
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        product = await Product.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true });
      }
      if (!product) {
        product = await Product.findOne({ _id: id });
      }
      if (!product) {
        // Check in-memory store
        product = products.find(p => p._id === id);
      }
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.json(product);
    } else {
      const product = products.find(p => p._id === id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      product.views = (product.views || 0) + 1;
      return res.json(product);
    }
  } catch (error) {
    console.error('Single product fetch error:', error);
    res.status(500).json({ message: 'Error retrieving product details' });
  }
});

// POST /api/products - Create listing
router.post('/', async (req, res) => {
  try {
    const {
      title,
      brand,
      category,
      subcategory,
      condition,
      skinType,
      shade,
      batchCode,
      price,
      originalPrice,
      description,
      images,
      location,
      sellerId,
      sellerName,
      sellerPhone,
      sellerAvatar
    } = req.body;

    if (!title || !category || !condition || !price) {
      return res.status(400).json({ message: 'Title, category, condition and price are required' });
    }

    const newProdData = {
      title,
      brand: brand || 'Boutique Beauty',
      category,
      subcategory: subcategory || 'General',
      condition,
      skinType: skinType || 'All Skin Types',
      shade: shade || 'Universal',
      batchCode: batchCode || 'VERIFIED-ORIGINAL',
      price: Number(price),
      originalPrice: Number(originalPrice || 0),
      description: description || 'Authentic beauty product.',
      images: images && images.length ? images : ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80'],
      location: location || 'Dhaka',
      sellerId: sellerId || 'seller-guest',
      sellerName: sellerName || 'Beauty Seller',
      sellerPhone: sellerPhone || '+880 1711-000000',
      sellerAvatar: sellerAvatar || '',
      status: 'Available',
      isFeatured: false,
      views: 0,
      rating: 5.0,
      reviewsCount: 0,
      qa: [],
      createdAt: new Date()
    };

    if (getIsConnected()) {
      const saved = await Product.create(newProdData);
      return res.status(201).json(saved);
    } else {
      const saved = { _id: 'bnb-prod-' + Date.now(), ...newProdData };
      products.unshift(saved);
      return res.status(201).json(saved);
    }
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Failed to create product listing' });
  }
});

// PUT /api/products/:id - Update listing
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (getIsConnected()) {
      const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
      if (!updated) return res.status(404).json({ message: 'Product not found' });
      return res.json(updated);
    } else {
      const idx = products.findIndex(p => p._id === id);
      if (idx === -1) return res.status(404).json({ message: 'Product not found' });
      products[idx] = { ...products[idx], ...req.body };
      return res.json(products[idx]);
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product' });
  }
});

// DELETE /api/products/:id - Delete listing
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (getIsConnected()) {
      await Product.findByIdAndDelete(id);
      return res.json({ message: 'Product deleted successfully' });
    } else {
      const idx = products.findIndex(p => p._id === id);
      if (idx !== -1) products.splice(idx, 1);
      return res.json({ message: 'Product deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product' });
  }
});

// POST /api/products/:id/qa - Ask community question
router.post('/:id/qa', async (req, res) => {
  try {
    const { id } = req.params;
    const { question, askedBy } = req.body;

    const newQa = {
      question,
      askedBy: askedBy || 'Beauty Enthusiast',
      askedAt: new Date()
    };

    if (getIsConnected()) {
      const prod = await Product.findByIdAndUpdate(
        id,
        { $push: { qa: newQa } },
        { new: true }
      );
      return res.json(prod ? prod.qa : []);
    } else {
      const p = products.find(item => item._id === id);
      if (p) {
        if (!p.qa) p.qa = [];
        p.qa.push(newQa);
        return res.json(p.qa);
      }
      return res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to post question' });
  }
});

module.exports = router;
