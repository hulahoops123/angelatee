// export default defineNuxtPlugin((nuxtApp) => {
//   nuxtApp.hook('page:finish', () => {
//     if (window.location.hash === '#products') {
//       const el = document.getElementById('products')
//       if (el) {
//         el.scrollIntoView({ behavior: 'smooth' })
//       }
//     }
//   })
// })


// export default defineNuxtPlugin((nuxtApp) => {
//   nuxtApp.hook('page:finish', () => {
//     console.log('✅ page:finish triggered', window.location.hash)

//     if (window.location.hash === '#products') {
//       const el = document.getElementById('products')
//       console.log('Found products element?', !!el)
//       if (el) {
//         el.scrollIntoView({ behavior: 'smooth' })
//       }
//     }
//   })
// })
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
