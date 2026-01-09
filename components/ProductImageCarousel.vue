<template>
  <div class="bg-amber-100 py-4 rounded-sm shadow-inner">
    <!-- Always use Embla, even for 1 image -->
    <div ref="viewport" class="overflow-hidden">
      <div
        ref="container"
        class="flex touch-pan-x"
        :style="slideStyles"
      >
        <div
          v-for="(img, index) in displayedImages"
          :key="index"
          class="snap-center flex-shrink-0 w-[55vw] aspect-[2/3] rounded-md overflow-hidden shadow-md border border-amber-200 bg-white"
        >
          <img
            :src="img.url"
            :alt="`Product image ${index + 1}`"
            loading="lazy"
            class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import emblaCarousel from 'embla-carousel'

const props = defineProps({
  images: {
    type: Array,
    required: true
  }
})

/**
 * Duplicate images for smooth infinite looping with Embla carousel
 * - 1 image: triplicate to enable loop effect
 * - 2 images: duplicate twice to create seamless loop (ABAB pattern)
 * - 3+ images: use as-is, Embla handles looping natively
 */
const displayedImages = computed(() => {
  if (props.images.length === 1) {
    return [props.images[0], props.images[0], props.images[0]]
  }
  if (props.images.length === 2) {
    return [props.images[0], props.images[1], props.images[0], props.images[1]]
  }
  return props.images
})

const viewport = ref(null)
const container = ref(null)
const slideStyles = {
  gap: '1rem',
  paddingLeft: '1rem',
  paddingRight: '1rem'
}

// Initialize carousel on mount (mobile only via parent component visibility)
onMounted(() => {
  if (viewport.value) {
    emblaCarousel(viewport.value, {
      loop: true,
      align: 'center',
      skipSnaps: false
    })
  }
})
</script>