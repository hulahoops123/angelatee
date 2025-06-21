<template>
  <nav class="sticky top-0 z-50 bg-white border-b shadow-sm px-6 py-4 flex justify-between items-center">
    <NuxtLink to="/" class="text-xl font-bold tracking-tight text-gray-800">
      Angel Tees
    </NuxtLink>

    <div class="space-x-6 text-gray-600 text-sm font-medium">
      <NuxtLink to="/" class="hover:text-black">Home</NuxtLink>
      <a href="/#products" class="hover:text-black">Shop</a>
<NuxtLink to="/cart" class="relative inline-block hover:text-black">
  <span class="text-2xl">🛒</span>
  <span
    v-if="cartHasItems"
    class="absolute top-0 right-0 block w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white animate-pulse-once"
  />
</NuxtLink>
    </div>
  </nav>
</template>
<script setup>
const { cartHasItems } = useCart()

</script>
