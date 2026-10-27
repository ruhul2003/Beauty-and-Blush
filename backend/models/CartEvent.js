const mongoose = require('mongoose');

const cartEventSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productTitle: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productImage: { type: String, default: '' },
  shade: { type: String, default: 'Default' },
  quantity: { type: Number, default: 1 },
  category: { type: String, default: 'Beauty' },
  sessionId: { type: String, default: '' },
  userId: { type: String, default: 'guest' },
  userEmail: { type: String, default: '' },
  status: { type: String, enum: ['active', 'converted', 'abandoned'], default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.CartEvent || mongoose.model('CartEvent', cartEventSchema);
