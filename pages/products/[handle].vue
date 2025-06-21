<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- ✅ Mobile Embla Carousel -->
    <div class="md:hidden overflow-hidden py-4">
      <ProductImageCarousel :images="product.images.edges.map(edge => edge.node)" />
    </div>

    <!-- ✅ Main Grid Content -->
    <div class="max-w-5xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10 items-start overflow-x-hidden">
      <!-- 🖥️ Desktop image stack -->
      <div class="hidden md:grid gap-4">
        <img v-for="(edge, index) in product.images.edges" :key="index" :src="edge.node.url"
          class="w-full rounded-lg border object-cover aspect-[4/5]" alt="Product image" />
      </div>

      <!-- 🛍 Product Info -->
      <div>
        <NuxtLink to="/" class="text-gray-500 hover:text-black text-xl mb-6 inline-block">←</NuxtLink>

        <h1 class="text-4xl font-bold text-gray-900 mb-2">{{ product.title }}</h1>

        <p class="text-2xl text-gray-700 font-medium mb-4">
          {{ currencySymbols[product.variants.edges[0].node.price.currencyCode] ||
            product.variants.edges[0].node.price.currencyCode }}{{ product.variants.edges[0].node.price.amount }}
        </p>

        <div class="prose prose-sm max-w-none text-gray-700 mb-8" v-html="product.descriptionHtml" />

        <!-- ✅ Variant Selection -->
        <div class="mb-6">
          <label class="block text-gray-700 mb-2">Select Size:</label>
          <div class="flex gap-2">
            <button v-for="(variant, index) in product.variants.edges" :key="index"
              @click="() => { if (variant.node.availableForSale) selectedVariant = variant.node }"
              :disabled="!variant.node.availableForSale" :class="[
                'px-4 py-2 border rounded-lg font-semibold',
                variant.node.availableForSale
                  ? (selectedVariant.id === variant.node.id
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-gray-300')
                  : 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'
              ]">
              {{ variant.node.title }}
            </button>
          </div>
        </div>

        <!-- ✅ Add to Cart Button -->
        <button @click="handleAddToCart"
          class="block w-full bg-black text-white py-3 rounded-lg text-lg font-semibold hover:opacity-90 transition">
          Add to Cart
        </button>
        <Transition enter-active-class="transition-opacity duration-500" enter-from-class="opacity-0"
          enter-to-class="opacity-100" leave-active-class="transition-opacity duration-500"
          leave-from-class="opacity-100" leave-to-class="opacity-0">
          <div v-if="toastMessage"
            class="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded shadow-lg z-50 text-sm">
            {{ toastMessage }}
          </div>
        </Transition>

        <!-- ✅ View Cart Button (conditional) -->
        <NuxtLink v-if="cartHasItems" to="/cart"
          class="block w-full text-center mt-4 py-3 rounded-lg text-black font-medium border border-black hover:bg-black hover:text-white transition animate-fade-bounce-3">
          View Cart
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const toastMessage = ref('')

const route = useRoute()
// @ts-ignore
const { fetchShopify } = useShopify()

const currencySymbols: Record<string, string> = {
  ZAR: 'R',
  USD: '$',
  EUR: '€',
  GBP: '£',
}

const productQuery = `
  query Product($handle: String!) {
    productByHandle(handle: $handle) {
      title
      descriptionHtml
      images(first: 10) {
        edges {
          node {
            url
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            availableForSale
            quantityAvailable
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`

// @ts-ignore
const data = await fetchShopify(productQuery, {
  handle: route.params.handle,
})

const product = data?.data?.productByHandle
const selectedVariant = ref(null)
const { cartHasItems, cartItems, addToCart } = useCart()


watchEffect(() => {
  if (!selectedVariant.value && product?.variants?.edges?.length) {
    selectedVariant.value = product.variants.edges[0].node
  }
})


const handleAddToCart = () => {
  if (!selectedVariant.value) return

  // ✅ Add to local cart state via composable
addToCart({
  id: selectedVariant.value.id,
  title: product.title,
  variantTitle: selectedVariant.value.title,
  price: selectedVariant.value.price.amount,
  image: product.images.edges[0]?.node.url || '', // ✅ corrected path
})


  // ✅ Trigger toast notification
  toastMessage.value = 'Added to cart!'
  setTimeout(() => {
    toastMessage.value = ''
  }, 3000)
}

</script>
