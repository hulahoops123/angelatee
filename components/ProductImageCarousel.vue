<template>
  <div>
    <!-- Always use Embla, even for 1 image -->
    <div ref="viewport" class="overflow-hidden">
      <div ref="container" class="flex touch-pan-x" :style="slideStyles">
        <div
          v-for="(img, index) in displayedImages"
          :key="index"
          class="snap-center flex-shrink-0 w-[65vw] h-56 px-2"
        >
          <img :src="img.url" class="w-full h-full object-cover rounded-lg border" />
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