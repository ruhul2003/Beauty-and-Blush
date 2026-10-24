const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Shop = require('../models/Shop');
const { getIsConnected } = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'beauty_and_blush_jwt_secret_key_2026_luxury_token';

// In-memory fallback users
let inMemoryUsers = [
  {
    _id: 'user-demo-01',
    name: 'Ruhul Amin',
    email: 'ruhul@beautyandblush.com',
    password: '', // hashed below
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    location: 'Gulshan, Dhaka',
    phone: '+880 1711-224466',
    rating: 4.9,
    reviewCount: 24,
    verifiedSeller: true,
    hasShop: true,
    shopId: 'shop-001',
    skinType: 'Combination',
    createdAt: new Date()
  }
];

// Helper to sign JWT
const signToken = (user) => {
  return jwt.sign(
    { id: user._id || user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: '30d' }
  );
};

// Helper middleware for auth
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No authorization token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, location, phone, hasShop, shopName, skinType } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (getIsConnected()) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists with this email' });
      }

      let shopId = null;
      if (hasShop && shopName) {
        const slug = shopName.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.floor(Math.random() * 1000);
        const newShop = await Shop.create({
          name: shopName,
          slug,
          ownerId: 'temp',
          ownerName: name,
          phone: phone || '+880 1700-000000',
          address: location || 'Dhaka, Bangladesh',
          category: 'Beauty Boutique'
        });
        shopId = newShop._id.toString();
      }

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        location: location || 'Dhaka, Bangladesh',
        phone: phone || '+880 1700-000000',
        hasShop: Boolean(hasShop),
        shopId,
        skinType: skinType || 'Combination'
      });

      if (shopId) {
        await Shop.findByIdAndUpdate(shopId, { ownerId: user._id.toString() });
      }

      const token = signToken(user);
      return res.status(201).json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          location: user.location,
          phone: user.phone,
          hasShop: user.hasShop,
          shopId: user.shopId,
          skinType: user.skinType
        },
        token
      });
    } else {
      // Memory fallback
      const existing = inMemoryUsers.find(u => u.email === email);
      if (existing) {
        return res.status(400).json({ message: 'User already exists' });
      }
      const newUser = {
        _id: 'user-' + Date.now(),
        name,
        email,
        password: hashedPassword,
        avatar: '',
        location: location || 'Dhaka',
        phone: phone || '+880 1700-000000',
        rating: 5.0,
        reviewCount: 0,
        verifiedSeller: true,
        hasShop: Boolean(hasShop),
        shopId: hasShop ? 'shop-' + Date.now() : null,
        skinType: skinType || 'Combination',
        createdAt: new Date()
      };
      inMemoryUsers.push(newUser);
      const token = signToken(newUser);
      return res.status(201).json({ user: newUser, token });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    if (getIsConnected()) {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const token = signToken(user);
      return res.json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          location: user.location,
          phone: user.phone,
          rating: user.rating,
          reviewCount: user.reviewCount,
          verifiedSeller: user.verifiedSeller,
          hasShop: user.hasShop,
          shopId: user.shopId,
          skinType: user.skinType
        },
        token
      });
    } else {
      let user = inMemoryUsers.find(u => u.email === email);
      if (!user) {
        // Create demo session for testing
        user = {
          _id: 'user-' + Date.now(),
          name: email.split('@')[0],
          email,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          location: 'Dhaka, Bangladesh',
          phone: '+880 1700-000000',
          rating: 4.9,
          reviewCount: 5,
          verifiedSeller: true,
          hasShop: false,
          shopId: null,
          skinType: 'Combination'
        };
      }
      const token = signToken(user);
      return res.json({ user, token });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// GET /api/auth/me
router.get('/me', verifyToken, async (req, res) => {
  try {
    if (getIsConnected()) {
      const user = await User.findById(req.user.id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.json(user);
    } else {
      const user = inMemoryUsers.find(u => u._id === req.user.id) || {
        _id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        rating: 4.9,
        verifiedSeller: true
      };
      return res.json(user);
    }
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ message: 'Failed to retrieve profile' });
  }
});

module.exports = router;
module.exports.verifyToken = verifyToken;
