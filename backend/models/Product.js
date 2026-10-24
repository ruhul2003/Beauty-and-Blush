const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  brand: { type: String, default: 'Luxury Beauty' },
  category: { 
    type: String, 
    required: true,
    enum: ['Skincare', 'Makeup', 'Haircare', 'Fragrance', 'Bath & Body', 'Tools & Brushes']
  },
  subcategory: { type: String, default: 'General' },
  condition: { 
    type: String, 
    required: true,
    enum: ['Brand New & Boxed', 'Sealed', 'Swatched Once', 'Authentic Pre-loved']
  },
  skinType: { type: String, default: 'All Skin Types' },
  shade: { type: String, default: 'Universal' },
  batchCode: { type: String, default: 'AUTHENTIC-BATCH' },
  price: { type: Number, required: true },
  originalPrice: { type: Number, default: 0 },
  description: { type: String, required: true },
  images: [{ type: String }],
  location: { type: String, required: true, default: 'Dhaka' },
  sellerId: { type: String, required: true },
  sellerName: { type: String, default: 'Beauty Consultant' },
  sellerRating: { type: Number, default: 4.9 },
  sellerAvatar: { type: String, default: '' },
  sellerPhone: { type: String, default: '+880 1712-345678' },
  status: { type: String, enum: ['Available', 'Pending', 'Sold'], default: 'Available' },
  isFeatured: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  rating: { type: Number, default: 4.9 },
  reviewsCount: { type: Number, default: 12 },
  qa: [
    {
      question: String,
      askedBy: String,
      askedAt: { type: Date, default: Date.now },
      answer: String,
      answeredBy: String,
      answeredAt: Date
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema, 'products');
