const mongoose = require('mongoose');

let isConnected = false;
let cachedPromise = null;

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    isConnected = true;
    return mongoose.connection;
  }

  if (cachedPromise) {
    try {
      await cachedPromise;
      return mongoose.connection;
    } catch (e) {
      cachedPromise = null;
    }
  }

  const connUri = process.env.MONGODB_URI || 'mongodb+srv://beauty-and-blush:beautyandblush@tilux-server.cltfmst.mongodb.net/beauty_and_blush?retryWrites=true&w=majority';

  cachedPromise = (async () => {
    try {
      const conn = await mongoose.connect(connUri, {
        serverSelectionTimeoutMS: 8000,
        bufferCommands: false,
      });
      isConnected = true;
      console.log(`✨ Beauty & Blush MongoDB Connected: ${conn.connection.host} / DB: ${conn.connection.db.databaseName}`);

      // Auto-seed initial beauty catalog if empty
      try {
        const Product = require('../models/Product');
        const count = await Product.countDocuments();
        if (count === 0) {
          const { seedProducts } = require('../store');
          if (seedProducts && seedProducts.length > 0) {
            const sanitized = seedProducts.map(({ _id, ...p }) => p);
            await Product.insertMany(sanitized);
            console.log(`Seeded ${sanitized.length} initial beauty products into ${conn.connection.db.databaseName}.products`);
          }
        }

        const Shop = require('../models/Shop');
        const shopCount = await Shop.countDocuments();
        if (shopCount === 0) {
          const { seedShops } = require('../store');
          if (seedShops && seedShops.length > 0) {
            const sanitizedShops = seedShops.map(({ _id, ...s }) => s);
            await Shop.insertMany(sanitizedShops);
            console.log(`Seeded ${sanitizedShops.length} beauty boutiques into ${conn.connection.db.databaseName}.shops`);
          }
        }
      } catch (seedErr) {
        console.warn('DB seeding note:', seedErr.message);
      }

      return conn;
    } catch (error) {
      cachedPromise = null;
      isConnected = false;
      console.warn(`MongoDB Connection Warning: ${error.message}. Running with fallback memory store.`);
      return null;
    }
  })();

  await cachedPromise;
  return mongoose.connection;
};

const getIsConnected = () => isConnected || mongoose.connection.readyState >= 1;

module.exports = { connectDB, getIsConnected };
