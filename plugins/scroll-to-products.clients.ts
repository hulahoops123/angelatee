/**
 * Auto-scroll to #products section after page load
 * Adds a small delay to wait for hydration and DOM rendering
 */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:finish', async () => {
    if (window.location.hash === '#products') {
      // Wait for hydration + DOM
      await new Promise(resolve => setTimeout(resolve, 50))

      const el = document.getElementById('products')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  })
})
