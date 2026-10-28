"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';
import { trackCartAddition } from '@/utils/cartTracker';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const { showToast } = useToast?.() || {};

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('bnb_cart');
      if (stored) {
        setCartItems(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Error reading bnb_cart from localStorage', e);
    } finally {
      setHasLoaded(true);
    }
  }, []);

  // Save cart to localStorage on changes
  useEffect(() => {
    if (!hasLoaded) return;
    try {
      localStorage.setItem('bnb_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Error persisting bnb_cart to localStorage', e);
    }
  }, [cartItems, hasLoaded]);

  // Listen to external cart update events (e.g. across tabs)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key && e.key !== 'bnb_cart') return;
      try {
        const stored = localStorage.getItem('bnb_cart');
        const parsed = stored ? JSON.parse(stored) : [];
        setCartItems(prev => {
          if (JSON.stringify(prev) === JSON.stringify(parsed)) {
            return prev;
          }
          return parsed;
        });
      } catch (err) {}
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const addToCart = (product, quantity = 1, customShade = null) => {
    const prodId = product._id || product.id || String(Date.now());
    const shade = customShade || product.shade || 'Standard';
    const primaryImage = product.images?.[0] || product.image || '/images/serum.jpg';

    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.id === prodId && item.shade === shade);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            id: prodId,
            _id: prodId,
            title: product.title || 'Beauty Product',
            price: Number(product.price) || 0,
            originalPrice: Number(product.originalPrice) || Number(product.price) || 0,
            image: primaryImage,
            images: product.images || [primaryImage],
            shade,
            quantity,
            category: product.category || 'Beauty',
            brand: product.brand || 'Beauty & Blush',
            addedAt: new Date().toISOString()
          }
        ];
      }
    });

    if (showToast) {
      showToast(`Added "${product.title}" to your bag!`, 'success');
    }

    // Send tracking event to backend for admin analytics
    try {
      trackCartAddition({
        productId: prodId,
        productTitle: product.title,
        productPrice: Number(product.price) || 0,
        productImage: primaryImage,
        shade,
        quantity,
        category: product.category || 'Beauty'
      });
    } catch (err) {
      console.warn('Cart tracking error:', err);
    }
  };

  const removeFromCart = (productId, shade) => {
    setCartItems(prev => prev.filter(item => !(item.id === productId && item.shade === shade)));
    if (showToast) {
      showToast('Item removed from cart', 'info');
    }
  };

  const updateQuantity = (productId, shade, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId, shade);
      return;
    }
    setCartItems(prev => prev.map(item => {
      if (item.id === productId && item.shade === shade) {
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCartItems([]);
    try {
      localStorage.removeItem('bnb_cart');
    } catch (e) {}
  };

  const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false)
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    return {
      cartItems: [],
      cartCount: 0,
      cartTotal: 0,
      addToCart: () => {},
      removeFromCart: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
      isCartOpen: false,
      setIsCartOpen: () => {},
      openCart: () => {},
      closeCart: () => {}
    };
  }
  return context;
}
