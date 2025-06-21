<template>
  <div class="p-6">
    <HeroSection />

    <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="product in products"
        :key="product.node.handle"
        class="border p-4 rounded hover:shadow"
      >
        <NuxtLink :to="`/products/${product.node.handle}`">
          <img
            :src="product.node.images?.edges[0]?.node?.url || ''"
            alt="product"
            class="w-full aspect-[4/5] object-cover mb-2"
          />
          <p class="font-semibold">{{ product.node.title }}</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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

</script>
