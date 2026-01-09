<template>
  <nav class="sticky top-0 z-50 bg-zinc-900/60 backdrop-blur-3xl border-b border-zinc-100 shadow-sm px-6 py-4 flex justify-between items-center font-raleway">
    <NuxtLink to="/" class="text-xl  tracking-tight text-amber-100 font-raleway">
      Aligned Apparel
    </NuxtLink>

    <div class="space-x-6 text-amber-200 text-sm font-medium">
      <NuxtLink to="/#products" class="hover:text-amber-100 transition-colors duration-200">Shop</NuxtLink>
      <NuxtLink to="/contact" class="hover:underline hover:text-amber-100 transition-colors duration-200">Contact</NuxtLink>
      <NuxtLink
        to="/cart"
        id="cart-icon"
        :aria-label="cartHasItems ? 'View cart (has items)' : 'View cart'"
        class="relative inline-block hover:text-amber-100 transition-colors duration-200">
        <span class="text-2xl" aria-hidden="true">🛒</span>
        <span
          v-if="cartHasItems"
          class="absolute top-0 right-0 block w-2.5 h-2.5 bg-rose-200 rounded-full ring-2 ring-zinc-900 animate-pulse-once"
          aria-hidden="true"
        />
      </NuxtLink>
    </div>
  </nav>
</template>


<script setup>
const { cartHasItems } = useCart()

</script>
