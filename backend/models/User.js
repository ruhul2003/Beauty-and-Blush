const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: '' },
  location: { type: String, default: 'Dhaka, Bangladesh' },
  phone: { type: String, default: '+880 1711-223344' },
  rating: { type: Number, default: 4.9 },
  reviewCount: { type: Number, default: 18 },
  verifiedSeller: { type: Boolean, default: true },
  hasShop: { type: Boolean, default: false },
  shopId: { type: String, default: null },
  skinType: { type: String, default: 'Combination' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
