const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  ownerId: { type: String, required: true },
  ownerName: { type: String, default: 'Boutique Owner' },
  description: { type: String, default: 'Curated luxury makeup, skincare and authentic fragrances.' },
  logo: { type: String, default: '' },
  banner: { type: String, default: '' },
  category: { type: String, default: 'Luxury Cosmetics & Skincare' },
  phone: { type: String, default: '+880 1711-889900' },
  email: { type: String, default: '' },
  address: { type: String, default: 'Banani Road 11, Dhaka' },
  city: { type: String, default: 'Dhaka' },
  rating: { type: Number, default: 4.9 },
  reviewCount: { type: Number, default: 45 },
  followersCount: { type: Number, default: 320 },
  isVerified: { type: Boolean, default: true },
  authenticityGuarantee: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Shop || mongoose.model('Shop', shopSchema, 'shops');
