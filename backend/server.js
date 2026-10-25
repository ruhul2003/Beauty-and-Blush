const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Ensure DB is connected before processing requests (critical for serverless cold starts)
app.use(async (req, res, next) => {
  try {
    await connectDB();
  } catch (err) {
    console.warn('DB connect check in request middleware:', err.message);
  }
  next();
});

// REST API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/shops', require('./routes/shopRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/coupons', require('./routes/couponRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/seed', require('./routes/seedRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    name: 'Beauty and Blush Marketplace API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Root fallback endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Beauty and Blush Marketplace API. Access /api/health for status.',
    version: '1.0.0'
  });
});

// Export the Express app for Vercel serverless function
module.exports = app;

// Only listen directly when running standalone (not in Vercel serverless)
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🌸 Beauty and Blush Express Backend running on http://localhost:${PORT}`);
  });
}
