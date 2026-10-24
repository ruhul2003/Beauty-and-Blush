// Utility functions for formatting prices, dates and discounts

export const formatPrice = (amount) => {
  if (typeof amount === 'string' && (amount.startsWith('$') || amount.startsWith('৳') || amount.startsWith('€') || amount.startsWith('£'))) {
    return amount;
  }
  if (typeof amount !== 'number') {
    amount = Number(amount) || 0;
  }
  return '৳' + amount.toLocaleString('en-IN');
};

export const calculateDiscount = (original, current) => {
  if (!original || !current) return 0;
  const numOrig = typeof original === 'string' ? parseFloat(original.replace(/[^0-9.]/g, '')) : original;
  const numCurr = typeof current === 'string' ? parseFloat(current.replace(/[^0-9.]/g, '')) : current;
  if (!numOrig || !numCurr || numOrig <= numCurr) return 0;
  return Math.round(((numOrig - numCurr) / numOrig) * 100);
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const d = new Date(dateString);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const timeAgo = (dateString) => {
  if (!dateString) return '';
  const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + 'y ago';
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + 'mo ago';
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + 'd ago';
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + 'h ago';
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + 'm ago';
  return 'Just now';
};
