// Beauty & Blush - Recently Viewed Products Tracker

const STORAGE_KEY = 'bnb_recent_viewed';
const MAX_RECENT = 6;

export function saveRecentProduct(product) {
  if (typeof window === 'undefined' || !product) return;
  try {
    const prodId = product._id || product.id;
    if (!prodId) return;

    let items = getRecentProducts();
    // Filter out if already in list so it moves to front
    items = items.filter(item => (item._id || item.id) !== prodId);
    
    // Add current product to front
    items.unshift({
      _id: prodId,
      id: prodId,
      title: product.title,
      price: product.price,
      originalPrice: product.originalPrice,
      images: product.images,
      image: product.image || (product.images && product.images[0]),
      brand: product.brand,
      category: product.category,
      shade: product.shade,
      rating: product.rating,
      batchCode: product.batchCode,
      location: product.location
    });

    if (items.length > MAX_RECENT) {
      items = items.slice(0, MAX_RECENT);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('bnb_recent_updated'));
  } catch (err) {
    console.error('Error saving recent product', err);
  }
}

export function getRecentProducts() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}
