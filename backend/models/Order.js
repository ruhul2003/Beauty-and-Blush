const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, default: () => 'BNB-' + Math.floor(100000 + Math.random() * 900000) },
  productId: { type: String, required: true },
  productTitle: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productImage: { type: String, default: '' },
  shade: { type: String, default: 'Default' },
  quantity: { type: Number, default: 1 },
  buyerId: { type: String, required: true },
  buyerName: { type: String, default: 'Beauty Customer' },
  buyerEmail: { type: String, default: '' },
  buyerPhone: { type: String, default: '+880 1700-000000' },
  sellerId: { type: String, required: true },
  sellerName: { type: String, default: 'Verified Boutique' },
  deliveryAddress: { type: String, default: 'Gulshan, Dhaka, Bangladesh' },
  division: { type: String, default: 'Dhaka' },
  courierService: { type: String, default: 'Pathao Courier' },
  deliveryFee: { type: Number, default: 60 },
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, default: 'Cash on Delivery (COD)' },
  status: { type: String, enum: ['Processing', 'Confirmed', 'Dispatched', 'Delivered', 'Cancelled'], default: 'Confirmed' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);
