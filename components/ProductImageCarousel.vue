<template>
  <div class="bg-amber-100 py-4 rounded-xl shadow-inner">
    <!-- Always use Embla, even for 1 image -->
    <div ref="viewport" class="overflow-hidden px-4">
      <div
        ref="container"
        class="flex touch-pan-x gap-4"
        :style="slideStyles"
      >
        <div
          v-for="(img, index) in displayedImages"
          :key="index"
          class="snap-center flex-shrink-0 w-[65vw] h-60 rounded-lg overflow-hidden shadow-md border border-amber-200 bg-white"
        >
          <img
            :src="img.url"
            alt="Product Image"
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
  gap: '1rem'
}

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