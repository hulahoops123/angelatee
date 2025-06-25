<template>
  <div>
    <!-- 🌌 Orb Animation Background Container -->
    <div class="orb-wrap" aria-hidden="true">
      <div class="wrap">
       <div
  v-for="n in 300"
  :key="n"
  class="c"
  :style="generateStyle(n)"
></div>

      </div>
    </div>

    <NavBar />
    <NuxtPage />
    <Footer />
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
function generateStyle(n) {
  const randomDeg = () => Math.floor(Math.random() * 360)
  const z = randomDeg()
  const y = randomDeg()
  const hue = ((40 / 300) * n + 180) % 360
  const transform = `rotateZ(-${z}deg) rotateY(${y}deg) translateX(100px) rotateZ(${z}deg)`
  const transformEnd = `rotateZ(-${z}deg) rotateY(${y}deg) translateX(300px) rotateZ(${z}deg)`
  return {
    '--i': n,
    '--transform': transform,
    '--transform-end': transformEnd,
    backgroundColor: `hsla(${hue}, 100%, 50%, 1)`,
    animation: `orbit 14s infinite`,
  }
}

</script>
