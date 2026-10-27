import { api } from '@/lib/api';

/**
 * Tracks product additions to cart and synchronizes with backend analytics
 */
export async function trackCartAddition(eventData) {
  try {
    let sessionId = '';
    if (typeof window !== 'undefined') {
      sessionId = localStorage.getItem('bnb_cart_session');
      if (!sessionId) {
        sessionId = 'sess_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
        localStorage.setItem('bnb_cart_session', sessionId);
      }
    }

    const payload = {
      ...eventData,
      sessionId,
      timestamp: new Date().toISOString()
    };

    // Send async beacon or API call to record event for admin
    await api.post('/cart/track', payload).catch(() => {
      // Local fallback in case backend is offline or running standalone
      try {
        const localEvents = JSON.parse(localStorage.getItem('bnb_admin_cart_events') || '[]');
        localEvents.unshift({
          _id: 'evt_' + Date.now(),
          ...payload,
          createdAt: new Date().toISOString()
        });
        localStorage.setItem('bnb_admin_cart_events', JSON.stringify(localEvents.slice(0, 100)));
      } catch (err) {}
    });
  } catch (error) {
    console.debug('Cart tracking background notice:', error?.message);
  }
}
