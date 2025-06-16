<template>
  <div ref="mainContainerElement"
    class="flex flex-col w-full mx-auto h-screen bg-neutral-200 overflow-scroll gap-8 p-2 text-amber-950 max-w-6xl">

    <!-- TOP SECTION: Logo and Headline -->
    <div class="w-full flex flex-col gap-4 pt-2 rounded-sm">
      <div class="flex justify-center gap-2 md:gap-4 lg:gap-6 py-2 rounded-lg animate-spin-fast">
        <img src="~/assets/logo_amber900.png" alt="Logo"
          class="h-10 w-10 rounded-full md:h-14 md:w-14 lg:w-20 lg:h-20" />
        <div
          class="font-clickerscript text-center text-4xl font-semibold underline underline-offset-4 md:text-5xl lg:text-7xl lg:underline-offset-8">
          {{ word1AfterRandomise }}
        </div>
      </div>

      <!-- Hero Image + WhatsApp CTA -->

      <div class="relative mx-0 flex flex-col">
        <img src="~/assets/whatsappbutton.png" alt="Contact via WhatsApp" @click="ctaClicked" :class="[
          'animate-spin',
          isScrolling
            ? (directions.bottom ? 'animation-running animation-normal' : 'animation-running animation-reverse')
            : 'animation-paused',
        ]"
          class="w-10 h-10 rounded-full bg-white/50 fixed right-4 top-1/2 md:right-8 md:h-16 md:w-16 lg:right-16 lg:w-20 lg:h-20" />
      </div>


      <!-- Subheading + Description -->
      <div class="flex flex-col md:gap-4 lg:gap-6 mt-4 p-2 bg-yellow-500/10 rounded-lg">
        <p class="font-moondance text-3xl md:text-4xl lg:text-5xl font-semibold">
          Authentic Pet Portraits
        </p>
        <p class="font-moondance text-2xl md:text-3xl lg:text-4xl">
          For hand-painted oil portraits that bring your pet's unique
          personality to life. Perfect for a cherished keepsake, a heartfelt
          memorial, or a meaningful gift for someone special.
        </p>
      </div>
    </div>

    <!-- IMAGE GALLERY SECTION (Masonry + Lightbox) -->
    <section :id="props.galleryID" class="p-2">
      <div class="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        <a v-for="(image, key) in caroimages2FullData" :key="key" :href="image.largeURL" :data-pswp-width="image.width"
          :data-pswp-height="image.height" rel="noreferrer"
          class="block overflow-hidden rounded-lg hover:opacity-80 transition shadow-lg">
          <img :src="image.thumbnailURL" alt="Gallery Image" class="w-full h-auto object-cover rounded-lg"
            loading="lazy" />
        </a>
      </div>
    </section>

    <!-- FAQ SECTION -->
    <div>
      <p class="mb-4 font-moondance text-3xl font-bold underline underline-offset-2 md:text-4xl lg:text-5xl">
        Frequently Asked Questions
      </p>
      <div v-for="(faq, index) in faqs" :key="index" class="border-b border-gray-300">
        <button @click="toggle(index)"
          class="w-full text-left py-2 font-moondance text-2xl font-semibold focus:outline-none md:text-3xl lg:text-4xl">
          {{ faq.question }}
        </button>
        <transition name="fade">
          <p v-if="openIndex === index" class="py-2 font-moondance text-2xl md:text-3xl lg:text-4xl mb-4">
            {{ faq.answer }}
          </p>
        </transition>
      </div>
    </div>

    <!-- FOOTER -->
    <p class="font-moondance text-xs font-extralight mt-40 text-slate-500 text-center">
      <span class="text-[6px]">©️ </span> Faithful Friend Portraits - 2025 all rights reserved
    </p>
  </div>
</template>
<script setup>
useHead({
  title: 'Custom Hand-Painted Pet Portraits | Faithful Friend Portraits South Africa',
  meta: [
    {
      name: 'description',
      content: 'Capture your pet\'s unique personality with custom hand-painted oil portraits. Perfect as a heartfelt gift or cherished keepsake. Order yours today!',
    },
    {
      name: 'google-site-verification',
      content: '6y2ab6hk_xcIMj77YedgAgMp31DaKVDHyG9z1fvLxFo'
    }
  ]
})
// 🖼 Import composable for loading gallery images
import { useCarouselImages } from '~/composables/useCarouselImages.js';

// Photoswipe
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

const props = defineProps({
  galleryID: {
    type: String,
    default: 'gallery'  // ✅ fallback ID
  }
});

const caroimages2FullData = ref([]);
let lightbox;

onMounted(async () => {
  caroimages2FullData.value = await useCarouselImages();

  lightbox = new PhotoSwipeLightbox({
    gallery: '#' + props.galleryID,
    children: 'a',
    pswpModule: () => import('photoswipe'),
    showHideAnimationType: 'fade',
    bgOpacity: 0.9,
    padding: { top: 30, bottom: 30, left: 30, right: 30 },
    wheelToZoom: true,
    clickToCloseNonZoomable: true,
  });

  lightbox.init();
});

onBeforeUnmount(() => {
  if (lightbox) {
    lightbox.destroy();
    lightbox = null;
  }
});

// 🎯 Scroll monitoring
const mainContainerElement = ref(null);
const { isScrolling, directions } = useScroll(mainContainerElement);

// ❓ FAQs section
const openIndex = ref(null);
const faqs = [
  {
    question: 'How do I commission a portrait?',
    answer:
      'Simply reach out to me to discuss your portrait. Once we’ve chosen the right size and details, I’ll guide you through the process of providing reference photos and finalizing your booking.'
  },
  {
    question: 'What reference photos do you need?',
    answer:
      'Clear, high-quality photos with good lighting work best. The more detail, the better! If you\'re unsure, I’m happy to help you choose the perfect reference.'
  },
  {
    question: 'How long does it take?',
    answer:
      'Each portrait is hand-painted with care and typically takes 2–3 weeks to complete.'
  },
  {
    question: 'How much does a portrait cost?',
    answer:
      'An A3 canvas portrait is R5000 (framing and delivery not included).'
  },
  {
    question: 'Can I request a custom size?',
    answer:
      'Yes! I offer a range of sizes to suit your space. Let me know what you\'re looking for, and I’ll be happy to accommodate.'
  },
  {
    question: 'Do you paint other subjects? Do you sell paintings or prints?',
    answer:
      'Yes! I also create artwork beyond pet portraits. Feel free to reach out for access to my private gallery or to discuss something special.'
  },
  {
    question: 'Do you ship internationally?',
    answer:
      'Yes, I can arrange international shipping. Costs and delivery times vary based on location—contact me for a quote.'
  }
];

const toggle = (index) => {
  openIndex.value = openIndex.value === index ? null : index;
};

// 🟢 WhatsApp button logic
const ctaClicked = () => {
  const url =
    navigator.maxTouchPoints > 0
      ? 'https://api.whatsapp.com/send?phone=27739858738&text=FFPortraits+web+query:'
      : 'https://web.whatsapp.com/send/?phone=27739858738&text=FFPortraits+web+query:';
  window.open(url);
};

// 🔡 Animated headline effect
const finalWord1 = 'Faithful Friend Portraits';
const word1AfterRandomise = ref('');
const iterations = ref(0);

function typeOutWord() {
  const { pause } = useIntervalFn(() => {
    iterations.value += 1;
    word1AfterRandomise.value = finalWord1.slice(0, iterations.value);

    if (iterations.value >= finalWord1.length) {
      pause();
    }
  }, 100);
}
typeOutWord();
</script>




<style></style>
