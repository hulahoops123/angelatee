<template>
  <div class="relative min-h-screen overflow-hidden bg-transparent text-amber-100">

    <!-- 🌌 Matrix Canvas Background -->

    <!-- 🦸 Main Content -->
    <HeroSection />

    <p id="products"
      class="text-3xl font-semibold z-0 tracking-tight py-4 scroll-mt-12 px-4 text-center bg-transparent backdrop-blur-sm font-raleway">
      Divinely Selected
    </p>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8 px-4 sm:px-0 md:px-8 lg:px-12 pb-8">
      <div v-for="product in products" :key="product.node.handle"
        class="rounded-xl border border-amber-100 bg-amber-50 p-4 hover:shadow-lg hover:shadow-amber-200/60 hover:scale-[1.02] transition-all duration-300">
        <NuxtLink :to="`/products/${product.node.handle}`">
          <img
            :src="product.node.images?.edges[0]?.node?.url || ''"
            :alt="`${product.node.title} product image`"
            loading="lazy"
            class="w-full aspect-[4/5] object-cover mb-3 rounded-md" />
          <p class="text-amber-900 font-semibold text-base md:text-lg lg:text-xl mb-1">
            {{ product.node.title }}
          </p>
          <p class="text-sm md:text-base lg:text-lg">
            <span v-if="product.node.variants.edges[0].node.compareAtPrice?.amount" class="text-zinc-500 font-semibold">
              R{{ Math.round(product.node.variants.edges[0].node.price.amount) }}
            </span>
            <span v-if="product.node.variants.edges[0].node.compareAtPrice?.amount"
              class="text-rose-400 line-through ml-2">
              R{{ Math.round(product.node.variants.edges[0].node.compareAtPrice.amount) }}
            </span>
            <span v-else class="text-purple-700 font-semibold">
              R{{ Math.round(product.node.variants.edges[0].node.price.amount) }}
            </span>
          </p>
        </NuxtLink>
      </div>
    </div>

  </div>
</template>


<script setup lang="ts">
import { onMounted } from 'vue'
import { useCart } from '@/composables/useCart'

// @ts-ignore
const { fetchShopify } = useShopify()

/**
 * GraphQL query to fetch products for homepage grid
 * Fetches: first 10 products with their first image and first variant
 * compareAtPrice enables sale price display (shows "was" price)
 */
const productQuery = `
  {
    products(first: 10) {
      edges {
        node {
          id
          title
          handle
          images(first: 1) {
            edges {
              node {
                url
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                }
              }
            }
          }
        }
      }
    }
  }
`

// @ts-ignore
const data = await fetchShopify(productQuery)
const products = data?.data?.products?.edges || []

// Auto-clear cart when customer returns from Shopify checkout
onMounted(() => {
  const referrer = document.referrer

  // If user came from Shopify checkout, clear the local cart
  // (assumes they completed purchase or abandoned checkout)
  if (referrer.includes('myshopify.com')) {
    useCart().clearCart()
  }
})

</script>
