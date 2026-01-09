<template>
  <div class="bg-transparent min-h-screen text-amber-100">
    <!-- ✅ Mobile Carousel for Product Images -->
    <div class="md:hidden overflow-hidden py-4">
      <ProductImageCarousel :images="product.images.edges.map(edge => edge.node)" />
    </div>

    <!-- ✅ Main Product Grid Layout -->
    <div class="max-w-5xl mx-auto px-4 md:py-8 grid md:grid-cols-2 gap-10 items-start">
      <!-- ✅ Desktop Image Stack -->
      <div class="hidden md:grid gap-4">
        <img
          v-for="(edge, index) in product.images.edges"
          :key="index"
          :src="edge.node.url"
          :alt="`${product.title} - Image ${index + 1}`"
          :loading="index === 0 ? 'eager' : 'lazy'"
          @click="openLightbox(index)"
          :class="[
            'w-full rounded-md border object-cover aspect-[4/5] shadow-md cursor-pointer hover:opacity-90 transition-opacity',
            index === 0 ? 'product-image' : ''
          ]" />
      </div>

      <!-- ✅ Product Info Section -->
      <div class="md:sticky md:top-20">
        <NuxtLink to="/#products"
          class="mb-4 inline-flex items-center text-sm text-amber-100 hover:text-amber-200 font-medium transition">
          ← Back to Shop
        </NuxtLink>

        <h1 class="text-4xl font-bold text-amber-50 mb-2">{{ product.title }}</h1>

        <!-- ✅ Price and Compare at Price -->
        <p class="text-2xl text-amber-100 font-medium mb-4">
          <span v-if="product.variants.edges[0].node.compareAtPrice">
            <span class="font-bold">
              {{ currencySymbols[product.variants.edges[0].node.price.currencyCode] ||
                product.variants.edges[0].node.price.currencyCode }}
              {{ parseFloat(product.variants.edges[0].node.price.amount).toFixed(2) }}
            </span>
            <span class="text-rose-600 line-through ml-2">
              {{ currencySymbols[product.variants.edges[0].node.compareAtPrice.currencyCode] ||
                product.variants.edges[0].node.compareAtPrice.currencyCode }}
              {{ parseFloat(product.variants.edges[0].node.compareAtPrice.amount).toFixed(2) }}
            </span>
          </span>
          <span v-else class="text-purple-800">
            {{ currencySymbols[product.variants.edges[0].node.price.currencyCode] ||
              product.variants.edges[0].node.price.currencyCode }}
            {{ parseFloat(product.variants.edges[0].node.price.amount).toFixed(2) }}
          </span>
        </p>

        <!-- ✅ Product Description -->
        <div class="prose prose-sm max-w-none text-amber-100 mb-8" v-html="product.descriptionHtml" />

        <!-- ✅ Variant (Size) Selection with Inline Message -->
        <div class="mb-6">
          <div class="flex items-center justify-between mb-2">
            <span class="text-amber-100 text-sm font-medium">Select Size</span>
            <button @click="showSizeChart = true"
              class="text-amber-100 text-sm hover:text-amber-200 underline underline-offset-2 transition">
              Size Guide
            </button>
          </div>
          <div class="flex gap-2">
            <div v-for="(variant, index) in sortedVariants" :key="index" class="relative">
              <button ref="sizeButtons" @click="handleSizeClick(variant.node, index, $event.currentTarget)" :class="[
                'px-4 py-2 border rounded-lg font-semibold transition',
                variant.node.availableForSale
                  ? (selectedVariant?.id === variant.node.id
                    ? 'bg-zinc-900 text-amber-50 border-zinc-300'
                    : 'bg-zinc-800 text-amber-100 border-zinc-900')
                  : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
              ]">
                {{ variant.node.title }}
              </button>
              <Transition name="fade">
                <div v-if="outOfStockIndex === index"
                  class="absolute bottom-full mb-1 text-xs text-red-500 bg-white border border-red-200 px-2 py-1 rounded-md shadow z-10 whitespace-nowrap">
                  Out of stock
                </div>
              </Transition>
            </div>
          </div>
        </div>

        <!-- ✅ Add to Cart Button -->
        <div class="w-full">
          <button @click="handleAddToCart" :disabled="buttonJustAdded" :class="[
            'block w-full py-3 rounded-lg text-lg font-semibold transition',
            buttonJustAdded
              ? 'text-zinc-900 bg-amber-50 opacity-80 cursor-not-allowed button-animate'
              : 'text-zinc-900 bg-amber-100 hover:opacity-90'
          ]">
            <span v-if="buttonJustAdded">✔ Added!</span>
            <span v-else-if="quantityInCart > 0">Add more: {{ quantityInCart }} in cart</span>
            <span v-else>Add to Cart</span>
          </button>
        </div>

        <!-- ✅ Global Toast Message -->
        <Transition enter-active-class="transition-opacity duration-500" enter-from-class="opacity-0"
          leave-active-class="transition-opacity duration-500" leave-from-class="opacity-100"
          leave-to-class="opacity-0">
          <div v-if="toastMessage"
            class="fixed top-4 left-1/2 transform -translate-x-1/2 bg-amber-700 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm">
            {{ toastMessage }}
          </div>
        </Transition>

        <!-- ✅ View Cart Shortcut -->
        <NuxtLink v-if="cartHasItems" to="/cart"
          class="block w-full text-center mt-4 py-3 rounded-lg text-amber-100 bg-zinc-900 font-medium border border-amber-700 hover:bg-amber-700 hover:text-white transition animate-fade-bounce-3">
          View Cart
        </NuxtLink>
      </div>
    </div>

    <!-- Size Chart Modal -->
    <SizeChartModal :isOpen="showSizeChart" @close="showSizeChart = false" />

    <!-- Simple Image Lightbox -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="lightboxOpen" @click="closeLightbox"
          class="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-12">
          <div @click.stop class="relative w-[70vw] max-w-md h-[70vh] bg-white/30 rounded-lg shadow-2xl p-8 flex items-center justify-center">
            <button @click="closeLightbox"
              aria-label="Close image"
              class="absolute top-4 right-4 text-gray-700 hover:text-gray-900 text-3xl z-10">
              ×
            </button>
            <img
              :src="product.images.edges[lightboxImageIndex].node.url"
              :alt="`${product.title} - Image ${lightboxImageIndex + 1}`"
              class="max-w-full max-h-full object-contain rounded-md"
            />
            <button v-if="lightboxImageIndex > 0" @click="prevImage"
              aria-label="Previous image"
              class="absolute left-8 top-1/2 -translate-y-1/2 -translate-x-1/2 text-white hover:text-amber-100 text-5xl">
              ‹
            </button>
            <button v-if="lightboxImageIndex < product.images.edges.length - 1" @click="nextImage"
              aria-label="Next image"
              class="absolute right-8 top-1/2 -translate-y-1/2 translate-x-1/2 text-white hover:text-amber-100 text-5xl">
              ›
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>


<script setup lang="ts">
const buttonJustAdded = ref(false)
const showSizeChart = ref(false)
const lightboxOpen = ref(false)
const lightboxImageIndex = ref(0)

const toastMessage = ref('')
const outOfStockIndex = ref<number | null>(null)
const route = useRoute()
const { fetchShopify } = useShopify() as any

const currencySymbols: Record<string, string> = {
  ZAR: 'R', USD: '$', EUR: '€', GBP: '£',
}

const productQuery = `
  query Product($handle: String!) {
    productByHandle(handle: $handle) {
      title
      descriptionHtml
      images(first: 10) { edges { node { url } } }
      variants(first: 10) {
        edges {
          node {
            id title availableForSale quantityAvailable
            price { amount currencyCode }
            compareAtPrice { amount currencyCode }
          }
        }
      }
    }
  }
`

const data = await fetchShopify(productQuery, { handle: route.params.handle })
const product = data?.data?.productByHandle
const selectedVariant = ref(null)

const { cartHasItems, cartItems, addToCart } = useCart()

const cartItemForVariant = computed(() =>
  cartItems.value.find(item => item.id === selectedVariant.value?.id)
)
const quantityInCart = computed(() => cartItemForVariant.value?.quantity || 0)

// Define size order for consistent sorting (XS to XXXL)
const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

// Sort product variants by size order instead of Shopify's default order
const sortedVariants = computed(() =>
  [...product.variants.edges].sort((a, b) => {
    const aIndex = sizeOrder.indexOf(a.node.title)
    const bIndex = sizeOrder.indexOf(b.node.title)
    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex)
  })
)


const sizeButtons = ref<(HTMLElement | null)[]>([])
const selectedButtonEl = ref<HTMLElement | null>(null)
const selectedVariantIndex = computed(() =>
  sortedVariants.value.findIndex(v => v.node.id === selectedVariant.value?.id)
)

watch(
  () => [selectedVariant.value, sizeButtons.value.length],
  async ([variant, length]) => {
    if (!variant && sortedVariants.value.length) {
      selectedVariant.value = sortedVariants.value[0].node
      return
    }

    if (variant && length > 0) {
      await nextTick()
      const idx = sortedVariants.value.findIndex(v => v.node.id === variant?.id)
      selectedButtonEl.value = sizeButtons.value[idx] ?? null
    }
  },
  { immediate: true }
)


const handleSizeClick = (variant: any, index: number, el: HTMLElement) => {
  if (variant.availableForSale) {
    selectedVariant.value = variant
    selectedButtonEl.value = el
  } else {
    outOfStockIndex.value = index
    setTimeout(() => { outOfStockIndex.value = null }, 2000)
  }
}

/**
 * Animate selected size button flying to cart icon
 * Creates visual feedback when item is added to cart
 * - Clones the size button element
 * - Animates it from button position to cart icon
 * - Fades out and shrinks during animation
 * - Removes clone after animation completes
 */
const animateToCart = async () => {
  await nextTick()
  const cartIcon = document.getElementById('cart-icon') as HTMLElement
  const buttonEl = selectedButtonEl.value
  if (!buttonEl || !cartIcon) return

  // Get positions of source (button) and destination (cart icon)
  const btnRect = buttonEl.getBoundingClientRect()
  const cartRect = cartIcon.getBoundingClientRect()

  // Clone button and position it exactly over the original
  const clone = buttonEl.cloneNode(true) as HTMLElement
  clone.style.position = 'fixed'
  clone.style.left = `${btnRect.left + window.scrollX}px`
  clone.style.top = `${btnRect.top + window.scrollY}px`
  clone.style.width = `${btnRect.width}px`
  clone.style.height = `${btnRect.height}px`
  clone.style.transition = 'all 0.8s ease-in-out'
  clone.style.zIndex = '9999'
  clone.style.pointerEvents = 'none'
  document.body.appendChild(clone)

  // Trigger animation on next frame
  requestAnimationFrame(() => {
    clone.style.left = `${cartRect.left + cartRect.width / 2 - btnRect.width / 2}px`
    clone.style.top = `${cartRect.top + cartRect.height / 2 - btnRect.height / 2}px`
    clone.style.opacity = '0'
    clone.style.transform = 'scale(0.4)'
  })

  // Clean up clone after animation
  setTimeout(() => clone.remove(), 1000)
}


const handleAddToCart = async () => {
  if (!selectedVariant.value || !selectedVariant.value.availableForSale) return

  addToCart({
    id: selectedVariant.value.id,
    title: product.title,
    variantTitle: selectedVariant.value.title,
    price: selectedVariant.value.price.amount,
    image: product.images.edges[0]?.node.url || '',
  })

  await animateToCart()

  buttonJustAdded.value = true
  toastMessage.value = 'Added to cart!'

  setTimeout(() => {
    buttonJustAdded.value = false
    toastMessage.value = ''
  }, 2000)
}

/**
 * Simple lightbox - just show the clicked image larger
 */
const openLightbox = (index: number) => {
  lightboxImageIndex.value = index
  lightboxOpen.value = true
}

const closeLightbox = () => {
  lightboxOpen.value = false
}

const nextImage = () => {
  if (lightboxImageIndex.value < product.images.edges.length - 1) {
    lightboxImageIndex.value++
  }
}

const prevImage = () => {
  if (lightboxImageIndex.value > 0) {
    lightboxImageIndex.value--
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.button-animate {
  animation: scaleFade 0.4s ease;
}

@keyframes scaleFade {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
}
</style>