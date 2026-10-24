const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  userId: { type: String, required: true },
  userName: { type: String, default: 'Beauty Enthusiast' },
  userAvatar: { type: String, default: '' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  skinType: { type: String, default: 'Combination' },
  shadePurchased: { type: String, default: '' },
  helpfulCount: { type: Number, default: 0 },
  isVerifiedPurchase: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Review || mongoose.model('Review', reviewSchema);
