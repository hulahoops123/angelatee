<template>
  <section class="relative inset-0 top-0 w-full min-h-[100vh] flex items-end justify-center bg-cover bg-center z-0"
    style="background-image: url('/images/cover.png');">
    <!-- Text Container Wrapper (full width, controls overlay) -->
    <div class="relative z-10 w-full px-4 pb-20 sm:pb-32">
      <!-- Blur Background (now spans full width of viewport) -->
      <div
        class="absolute inset-0 w-full h-full bg-gradient-to-t from-zinc-900/95 to-transparent backdrop-blur-sm pointer-events-none z-[-1]">
      </div>

      <!-- Text Content -->
      <div class="text-amber-50 text-center max-w-2xl mx-auto pb-16">
        <h1 class="text-4xl md:text-6xl font-bold leading-tight font-staatliches">
          Clothes with Cosmic Meaning
        </h1>
        <p class="text-lg md:text-xl mt-4 font-raleway">
          Inspired by the vibrations of angel numbers. Made to resonate with your heart, not just your eyes.
        </p>
        <button @click="scrollToProducts"
          class="inline-block mt-6 px-6 py-3 bg-zinc-50 text-amber-900 font-semibold rounded-lg hover:bg-zinc-100 transition font-raleway">
          Wear Your Message
        </button>
      </div>
    </div>
  </section>
</template>



<script setup>
// Optional smooth scroll if you want to trigger it manually later
const scrollToProducts = () => {
  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
}
</script>
