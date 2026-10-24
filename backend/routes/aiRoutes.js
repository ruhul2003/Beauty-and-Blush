const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { getIsConnected } = require('../config/db');
const { products } = require('../store');

// Knowledge base for beauty routine recommendations
const BEAUTY_TIPS = {
  oily: "For oily skin, look for Niacinamide, Salicylic Acid, oil-free gel creams, and matte liquid blushes like Rare Beauty.",
  dry: "For dry or flaky skin, prioritize Snail Mucin, Hyaluronic Acid, ceramides, and dewy hydrating finishes.",
  combination: "For combination skin, balance with lightweight hydration on the cheeks and oil control on the T-zone.",
  acne: "For acne-prone skin, ensure all products are non-comedogenic and contain anti-inflammatory ingredients like Centella or Zinc.",
  fragrance: "Apply perfume on warm pulse points (wrists, neck, inner elbows) immediately after moisturizing for 8+ hour longevity."
};

// POST /api/ai/chat - AI Beauty Advisor
router.post('/chat', async (req, res) => {
  try {
    const { message, skinType, budget } = req.body;

    if (!message) {
      return res.status(400).json({ reply: 'Please provide a beauty question or skin concern.' });
    }

    const msg = message.toLowerCase();
    let reply = "";
    let recommendedProducts = [];

    // Fetch catalog
    let catalog = [];
    if (getIsConnected()) {
      catalog = await Product.find().limit(12);
    } else {
      catalog = [...products];
    }

    if (msg.includes('routine') || msg.includes('skin') || msg.includes('acne') || msg.includes('serum')) {
      reply = `✨ **Your Personalized Skincare Advice**:
Based on your skin profile, I recommend double cleansing followed by **The Ordinary Niacinamide 10% + Zinc 1%** to control sebum and minimize pores, paired with **COSRX Advanced Snail 96 Mucin** to deeply hydrate and repair the skin barrier without clogging pores.`;
      recommendedProducts = catalog.filter(p => p.category === 'Skincare').slice(0, 2);
    } else if (msg.includes('blush') || msg.includes('shade') || msg.includes('makeup') || msg.includes('rare beauty')) {
      reply = `💖 **Shade & Formula Recommendation**:
For a radiant, lit-from-within glow, the **Rare Beauty Soft Pinch Liquid Blush** in shade *Joy (Dewy Peach)* or *Happy (Dewy Pink)* complements warm, medium, and South Asian skin tones seamlessly. Set lightly with **Charlotte Tilbury Airbrush Flawless Finish Powder** for a long-lasting, poreless finish!`;
      recommendedProducts = catalog.filter(p => p.category === 'Makeup').slice(0, 2);
    } else if (msg.includes('perfume') || msg.includes('scent') || msg.includes('fragrance') || msg.includes('dior') || msg.includes('ysl')) {
      reply = `🌸 **Fragrance Consultation**:
Looking for a signature scent?
- For bold, confident, captivating elegance: **Yves Saint Laurent Libre EDP** (Lavender & Moroccan Orange Blossom).
- For fresh, magnetic, universally adored freshness: **Dior Sauvage EDP** (Calabrian Bergamot & Warm Vanilla). Both are 100% authentic with intact batch codes!`;
      recommendedProducts = catalog.filter(p => p.category === 'Fragrance').slice(0, 2);
    } else if (msg.includes('hair') || msg.includes('dry hair') || msg.includes('damage')) {
      reply = `✨ **Hair Restoration Advice**:
For color-treated or heat-damaged hair, **Olaplex No. 3 Hair Perfector** re-links broken disulfide bonds at a molecular level. Use once weekly on damp hair before shampooing.`;
      recommendedProducts = catalog.filter(p => p.category === 'Haircare').slice(0, 1);
    } else {
      reply = `✨ Welcome to **Beauty & Blush Advisor**! I can help you find:
1. Skincare routines tailored for your skin type (Oily, Dry, Sensitive, Combination)
2. Perfect blush & foundation shade matches
3. Authentic designer perfume suggestions
4. Batch code verification guidelines

What would you love to explore today?`;
      recommendedProducts = catalog.slice(0, 2);
    }

    return res.json({
      reply,
      products: recommendedProducts,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('AI chat error:', error);
    res.status(500).json({ reply: 'Sorry, our beauty advisor is currently assisting other guests. Please try again in a moment.' });
  }
});

module.exports = router;
