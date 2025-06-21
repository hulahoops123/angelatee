<template>
    <div class="max-w-3xl mx-auto px-4 py-12">
        <h1 class="text-3xl font-bold mb-6">Your Cart</h1>

        <!-- Show only when cart is hydrated -->
        <div v-if="hydrated">
            <div v-if="cartItems.length">
                <div v-for="(item, index) in cartItems" :key="index"
                    class="flex flex-wrap items-center justify-between gap-4 py-4 border-b">
                    <!-- Image -->
                    <img :src="item.image" alt="Product image" class="w-16 h-16 object-cover rounded border" />

                    <!-- Title + Size -->
                    <div class="flex-1">
                        <p class="font-medium text-base">{{ item.title }}</p>
                        <p class="text-sm text-gray-600">Size: {{ item.variantTitle }}</p>
                        <Transition enter-active-class="transition duration-300 ease-out"
                            enter-from-class="opacity-0 -translate-y-1" enter-to-class="opacity-100 translate-y-0"
                            leave-active-class="transition duration-200 ease-in"
                            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-1">
                            <div v-if="item.quantity > 1">
                                <span class="text-sm italic text-gray-500 mr-1">
                                    {{ currencySymbol }}{{ item.price }} each
                                </span>
                            </div>
                        </Transition>
                    </div>

                    <!-- Price + Quantity Controls -->
                    <div class="flex flex-col items-end justify-between min-w-[120px] gap-2">
                        <Transition mode="out-in" enter-active-class="transition duration-300 ease-out"
                            enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0"
                            leave-active-class="transition duration-200 ease-in"
                            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-1">
                            <span :key="item.price * item.quantity" class="font-semibold">
                                {{ currencySymbol }}{{ (item.price * item.quantity).toFixed(2) }}
                            </span>
                        </Transition>
                        <div class="flex items-center justify-end gap-2">
                            <button @click="decrementItemQuantity(item.id)"
                                class="px-2 py-1 bg-gray-200 rounded text-sm font-semibold">
                                –
                            </button>
                            <Transition mode="out-in" enter-active-class="transition duration-200 ease-out"
                                enter-from-class="opacity-0 -translate-y-1" enter-to-class="opacity-100 translate-y-0"
                                leave-active-class="transition duration-150 ease-in"
                                leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
                                <span :key="item.quantity" class="w-6 text-center text-sm">
                                    {{ item.quantity }}
                                </span>
                            </Transition>
                            <button @click="incrementItemQuantity(item.id)"
                                class="px-2 py-1 bg-gray-200 rounded text-sm font-semibold">
                                +
                            </button>
                        </div>
                    </div>
                </div>

                <div class="mt-6 flex justify-between items-center">
                    <p class="text-lg font-semibold">Total:</p>
                    <Transition mode="out-in" enter-active-class="transition duration-300 ease-out"
                        enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100"
                        leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100 scale-100"
                        leave-to-class="opacity-0 scale-95">
                        <span :key="total" class="text-lg font-semibold">
                            {{ currencySymbol }}{{ total }}
                        </span>
                    </Transition>
                </div>
                <button @click="clearCart()" class="text-sm text-red-500 mt-4 ring-2">Clear Cart (Dev Only)</button>

                <button
                    class="mt-6 w-full bg-black text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
                    @click="goToShopifyCheckout">
                    Proceed to Checkout
                </button>
            </div>
            <p v-else class="text-gray-600">Your cart is empty.</p>
        </div>

        <div v-else class="text-gray-400 text-sm">Loading cart...</div>
    </div>
</template>

<script setup lang="ts">

const {
    cartItems,
    total,
    hydrated,
    clearCart,
    incrementItemQuantity,
    decrementItemQuantity
} = useCart()

const currencySymbol = 'R'
const goToShopifyCheckout = () => {
    const lineItems = cartItems.value
        .map(item => `${item.id}:1`)
        .join(',')

    const checkoutUrl = `https://nv09tq-2g.myshopify.com/cart/${lineItems}`
    window.location.href = checkoutUrl
}
</script>
