<template>
<section
  class="relative inset-0 top-0 w-full min-h-[100vh] flex items-end justify-center bg-cover bg-center z-0"
  style="background-image: url('/images/hero_optimized.webp');"
>
    <!-- Text Container Wrapper (full width, controls overlay) -->
    <div class="relative z-10 w-full px-4 pb-20 sm:pb-32">
      <!-- Text Content -->
      <div class="text-amber-50 text-center max-w-2xl mx-auto pb-16">
        <h1 class="text-4xl md:text-6xl font-bold leading-tight font-staatliches text-shadow-sm">
          HIGH VIBE DRIP. WEAR YOUR TRUTH
        </h1>

        <p class="text-lg font-bold md:text-xl mt-8 font-raleway text-white text-shadow-[0_0_2px_rgba(0,0,0,1),0_0_4px_rgba(0,0,0,1),0_2px_8px_rgba(0,0,0,0.8)]">
          For those bold enough to Talk it, Walk it & Wear it.
        </p>
        <button @click="scrollToProducts"
          class="inline-block mt-6 px-6 py-3 bg-zinc-50 text-amber-900 font-semibold rounded-lg hover:bg-zinc-100 transition font-raleway">
          Shop Now
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
