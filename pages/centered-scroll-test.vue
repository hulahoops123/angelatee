<template>
  <div class="min-h-screen bg-white py-8">
    <h1 class="text-2xl font-bold text-center mb-6">Center-Snapping Gallery Test (Embla)</h1>

    <div ref="viewport" class="overflow-hidden">
      <div ref="container" class="flex touch-pan-x gap-4">
<div
  v-for="(i, index) in slides"
  :key="i"
  :class="[
    'embla__slide w-[65vw] h-56 bg-pink-400 flex items-center justify-center rounded-lg text-2xl font-bold text-white snap-center',
    index === 0 ? 'ml-2' : '',
    index === slides.length - 1 ? 'mr-2' : ''
  ]"
>
  {{ i }}
</div>
      </div>
    </div>

    <p class="text-center text-sm text-gray-500 mt-6">Scroll horizontally to test infinite wraparound.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import EmblaCarousel from 'embla-carousel'

const viewport = ref(null)
const container = ref(null)
const slides = [1, 2, 3, 4, 5]

onMounted(() => {
  if (viewport.value && container.value) {
    EmblaCarousel(viewport.value, {
      loop: true,
      align: 'center',
      skipSnaps: false
    })
  }
})
</script>

<style>
.embla__slide {
  flex: 0 0 auto;
  scroll-snap-align: center;
}
</style>
