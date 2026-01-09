<template>
  <div>
    <!-- Layer 1: Large particles (background) -->
    <div class="orb-layer-1" aria-hidden="true">
      <div class="wrap-option">
        <div v-for="n in 100" :key="`layer1-${n}`" class="c c-large" :style="generateCombined(n)"></div>
      </div>
    </div>

    <!-- Layer 2: Small particles (foreground) -->
    <div class="orb-layer-2" aria-hidden="true">
      <div class="wrap-option">
        <div v-for="n in 100" :key="`layer2-${n}`" class="c c-small" :style="generateCombined(n + 100)"></div>
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

const randomDeg = () => Math.floor(Math.random() * 360)

/**
 * Generate 3D transform for particle orbital motion
 * Creates random rotation angles for varied particle paths
 */
const getTransforms = (n) => {
  const z = randomDeg()
  const y = randomDeg()
  const transform = `rotateZ(-${z}deg) rotateY(${y}deg) translateX(300px) rotateZ(${z}deg)`
  const transformEnd = `rotateZ(-${z}deg) rotateY(${y}deg) translateX(900px) rotateZ(${z}deg)`
  return { transform, transformEnd }
}

/**
 * Generate particle styles with brand color gradient
 * Particles 0-150: Amber/Gold colors (hue 30-50°)
 * Particles 150-300: White/Silver (grayscale)
 * Creates a cohesive brand aesthetic
 */
function generateCombined(n) {
  const { transform, transformEnd } = getTransforms(n)

  // First half (0-150): Amber/Gold colors (hue 30-50)
  // Second half (150-300): White/Silver (grayscale)
  if (n <= 150) {
    const hue = (20 / 150) * n + 30 // 30-50 degrees
    return {
      '--i': n,
      '--transform': transform,
      '--transform-end': transformEnd,
      backgroundColor: `hsla(${hue}, 100%, 50%, 1)`,
      animation: `orbit 60s infinite`,
    }
  } else {
    const lightness = 70 + (30 / 150) * (n - 150) // 70% to 100% lightness
    return {
      '--i': n,
      '--transform': transform,
      '--transform-end': transformEnd,
      backgroundColor: `hsla(0, 0%, ${lightness}%, 1)`,
      animation: `orbit 60s infinite`,
    }
  }
}

</script>
