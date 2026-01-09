<template>
  <div class="max-w-3xl mx-auto px-4 pt-6 bg-transparent text-amber-100 min-h-screen">
    <h1 class="text-3xl font-bold mb-6 font-raleway text-center">Vibrational Basket</h1>

    <div v-if="hydrated">
      <div v-if="cartItems.length" class="backdrop-blur-none">

        <!-- 🛒 Cart Items -->
        <div v-for="(item, index) in cartItems" :key="index" class="mb-4">
          <CartItem :item="item" :currency-symbol="currencySymbol" :increment-item-quantity="incrementItemQuantity"
            :decrement-item-quantity="decrementItemQuantity" @confirming="val => hasPendingConfirmation = val" />
        </div>

        <!-- 💸 Subtotal -->
        <div class="mt-10 pt-6 border-t border-amber-200 flex justify-between items-center">
          <p class="text-lg font-semibold">Subtotal:</p>
          <Transition mode="out-in" enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100"
            leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95">
            <span :key="total" class="text-lg font-semibold">
              {{ currencySymbol }}{{ total }}
            </span>
          </Transition>
        </div>

        <!-- 📦 Shipping note -->
        <p class="text-sm text-amber-200 mt-4">Shipping calculated at checkout.</p>

        <!-- ✅ Checkout Button -->
        <button @click="goToShopifyCheckout" :disabled="hasPendingConfirmation"
          class="mt-6 w-full bg-amber-50 text-zinc-900 py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 animate-subtle-celebrate">
          Proceed to Checkout
        </button>
      </div>

      <!-- 🕊️ Empty Cart State -->
      <div v-else class="text-center text-amber-700 mt-12">
        <p class="text-lg">Your cart is feeling a little empty.</p>
        <NuxtLink to="/#products"
          class="mt-6 inline-block px-5 py-2 bg-white border border-amber-300 text-amber-900 rounded-lg font-medium hover:bg-amber-100 transition">
          ← Return to Selection
        </NuxtLink>
      </div>
    </div>

    <!-- 🔄 Hydration Loading -->
    <div v-else class="text-amber-400 text-sm text-center">Loading cart...</div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import { useCart } from '@/composables/useCart'

const {
  cartItems,
  total,
  hydrated,
  incrementItemQuantity,
  decrementItemQuantity
} = useCart()

const currencySymbol = 'R'
const hasPendingConfirmation = ref(false)

const config = useRuntimeConfig()

// Redirect to Shopify-hosted checkout with cart items
const goToShopifyCheckout = () => {
  // Extract variant IDs from full Shopify GIDs (format: gid://shopify/ProductVariant/123)
  const lineItems = cartItems.value.map(item => {
    const parts = item.id.split('/')
    const variantId = parts[parts.length - 1]
    return `${variantId}:${item.quantity}`
  }).join(',')

  // Build Shopify cart permalink: /cart/:variantId1:quantity1,:variantId2:quantity2
  const checkoutUrl = `https://${config.public.shopifyDomain}/cart/${lineItems}`

  window.location.href = checkoutUrl
}

</script>
