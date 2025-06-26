<template>
  <div class="relative min-h-screen overflow-hidden bg-transparent text-amber-100">

    <!-- 🌌 Matrix Canvas Background -->

    <!-- 🦸 Main Content -->
    <HeroSection />

    <p id="products"
      class="text-3xl font-semibold z-0 tracking-tight py-4 scroll-mt-12 px-4 text-center bg-transparent backdrop-blur-sm font-raleway">
      Divinely Selected
    </p>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8 px-4 sm:px-0 pb-8">
      <div v-for="product in products" :key="product.node.handle"
        class="rounded-xl border border-amber-100 bg-amber-50 p-4 hover:shadow-lg hover:shadow-amber-200/60 hover:scale-[1.02] transition-all duration-300">
        <NuxtLink :to="`/products/${product.node.handle}`">
          <img :src="product.node.images?.edges[0]?.node?.url || ''" alt="product"
            class="w-full aspect-[4/5] object-cover mb-3 rounded-md" />
          <p class="text-amber-900 font-semibold text-base mb-1">
            {{ product.node.title }}
          </p>
          <p class="text-sm">
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
console.log('RAW response from Shopify:', data)
const products = data?.data?.products?.edges || []
console.log('Shopify products:', products)
onMounted(() => {
  const referrer = document.referrer
  console.log('Referrer:', referrer)

  if (referrer.includes('myshopify.com')) {
    console.log('Cart clear triggered')
    useCart().clearCart()
  }
})

</script>
