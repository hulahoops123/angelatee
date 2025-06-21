import { ref, computed, watch, onMounted } from "vue";

const STORAGE_KEY = "angeltees_cart";

const cartItems = ref<any[]>([]);
const hydrated = ref(false);

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

watch(
  cartItems,
  (items) => {
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  },
  { deep: true }
);

const cartHasItems = computed(() => cartItems.value.length > 0);

const total = computed(() =>
  cartItems.value
    .reduce((sum, item) => sum + Number(item.price) * (item.quantity || 1), 0)
    .toFixed(2)
);

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
function incrementItemQuantity(id: string) {
  const item = cartItems.value.find(i => i.id === id)
  if (item) item.quantity += 1
}

function decrementItemQuantity(id: string) {
  const item = cartItems.value.find(i => i.id === id)
  if (item && item.quantity > 1) {
    item.quantity -= 1
  } else {
    // Optional: remove item entirely if qty hits 0
    cartItems.value = cartItems.value.filter(i => i.id !== id)
  }
}

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
    hydrated, // ✅ Add this
        incrementItemQuantity,
    decrementItemQuantity
  };
};
