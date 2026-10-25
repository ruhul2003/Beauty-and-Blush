const express = require('express');
const router = express.Router();
const { coupons } = require('../store');

// GET /api/coupons - List all available discount coupons
router.get('/', (req, res) => {
  try {
    return res.json(coupons);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to retrieve coupons' });
  }
});

// POST /api/coupons/validate - Validate coupon against cart amount
router.post('/validate', (req, res) => {
  try {
    const { code, amount } = req.body;
    if (!code) {
      return res.status(400).json({ valid: false, message: 'Please provide a coupon code' });
    }

    const normalizedCode = code.trim().toUpperCase();
    const coupon = coupons.find(c => c.code.toUpperCase() === normalizedCode);

    if (!coupon) {
      return res.status(404).json({ valid: false, message: 'Invalid or expired coupon code' });
    }

    if (!coupon.isActive) {
      return res.status(400).json({ valid: false, message: 'This coupon is no longer active' });
    }

    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
      return res.status(400).json({ valid: false, message: 'This coupon code has expired' });
    }

    const subtotal = Number(amount) || 0;
    if (coupon.minPurchase && subtotal < coupon.minPurchase) {
      return res.status(400).json({ 
        valid: false, 
        message: `Minimum order of ৳${coupon.minPurchase} required for this coupon` 
      });
    }

    let discount = 0;
    if (coupon.discountType === 'percentage') {
      discount = Math.round((subtotal * coupon.discountValue) / 100);
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    } else if (coupon.discountType === 'fixed' || coupon.discountType === 'shipping') {
      discount = coupon.discountValue;
    }

    if (discount > subtotal) {
      discount = subtotal;
    }

    // Increment usage
    coupon.usageCount = (coupon.usageCount || 0) + 1;

    return res.json({
      valid: true,
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      discount,
      description: coupon.description,
      finalAmount: Math.max(0, subtotal - discount)
    });
  } catch (error) {
    console.error('Coupon validation error:', error);
    return res.status(500).json({ valid: false, message: 'Failed to validate coupon' });
  }
});

// POST /api/coupons - Admin create new coupon
router.post('/', (req, res) => {
  try {
    const { code, discountType, discountValue, minPurchase, maxDiscount, description } = req.body;
    if (!code || !discountValue) {
      return res.status(400).json({ message: 'Code and discount value are required' });
    }

    const normalizedCode = code.trim().toUpperCase();
    const existing = coupons.find(c => c.code.toUpperCase() === normalizedCode);
    if (existing) {
      return res.status(400).json({ message: 'Coupon code already exists' });
    }

    const newCoupon = {
      _id: 'cpn-' + Date.now(),
      code: normalizedCode,
      discountType: discountType || 'percentage',
      discountValue: Number(discountValue),
      minPurchase: Number(minPurchase || 0),
      maxDiscount: Number(maxDiscount || 1000),
      description: description || `${discountValue}% off beauty order`,
      isActive: true,
      usageCount: 0,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    };

    coupons.unshift(newCoupon);
    return res.status(201).json(newCoupon);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create coupon' });
  }
});

// DELETE /api/coupons/:id - Admin delete coupon
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const index = coupons.findIndex(c => c._id === id || c.code === id);
    if (index === -1) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    const deleted = coupons.splice(index, 1);
    return res.json({ message: 'Coupon removed successfully', coupon: deleted[0] });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete coupon' });
  }
});

// PUT /api/coupons/:id/toggle - Toggle coupon status
router.put('/:id/toggle', (req, res) => {
  try {
    const { id } = req.params;
    const coupon = coupons.find(c => c._id === id || c.code === id);
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    coupon.isActive = !coupon.isActive;
    return res.json(coupon);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to toggle coupon' });
  }
});

module.exports = router;
