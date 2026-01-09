/**
 * Shopping Cart Management Composable
 *
 * Manages cart state with localStorage persistence.
 * Cart data persists across browser sessions until cleared.
 *
 * Features:
 * - Add/remove items
 * - Quantity management
 * - Automatic total calculation
 * - localStorage sync
 * - Hydration tracking (prevents SSR mismatches)
 */
import { ref, computed, watch, onMounted } from "vue";

const STORAGE_KEY = "angeltees_cart";

// Global cart state (shared across all component instances)
const cartItems = ref<any[]>([]);
const hydrated = ref(false);

// Initialize cart from localStorage (client-side only)
if (import.meta.client) {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      cartItems.value = JSON.parse(stored);
    } catch {
      cartItems.value = [];
    }
  }
  hydrated.value = true;
}

// Auto-save cart to localStorage whenever it changes
watch(
  cartItems,
  (items) => {
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  },
  { deep: true }
);

// Computed: Check if cart has any items
const cartHasItems = computed(() => cartItems.value.length > 0);

// Computed: Calculate cart total (price × quantity for all items)
const total = computed(() =>
  cartItems.value
    .reduce((sum, item) => sum + Number(item.price) * (item.quantity || 1), 0)
    .toFixed(2)
);

/**
 * Add item to cart or increment quantity if already exists
 * @param item - Product variant to add
 */
function addToCart(item: {
  id: string;
  title: string;
  variantTitle: string;
  price: number;
  image: string;
}) {
  const existing = cartItems.value.find((i) => i.id === item.id);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cartItems.value.push({ ...item, quantity: 1 });
  }
}

/**
 * Increase item quantity by 1
 * @param id - Shopify variant ID
 */
function incrementItemQuantity(id: string) {
  const item = cartItems.value.find(i => i.id === id)
  if (item) item.quantity += 1
}

/**
 * Decrease item quantity by 1, or remove if quantity reaches 0
 * @param id - Shopify variant ID
 */
function decrementItemQuantity(id: string) {
  const item = cartItems.value.find(i => i.id === id)
  if (item && item.quantity > 1) {
    item.quantity -= 1
  } else {
    // Remove item entirely when quantity reaches 0
    cartItems.value = cartItems.value.filter(i => i.id !== id)
  }
}

/**
 * Clear all items from cart
 * Called automatically when user returns from Shopify checkout
 */
function clearCart() {
  cartItems.value = [];
}

export const useCart = () => {
  return {
    cartItems,
    cartHasItems,
    total,
    addToCart,
    clearCart,
    hydrated, // Indicates if cart data has loaded from localStorage
    incrementItemQuantity,
    decrementItemQuantity
  };
};
