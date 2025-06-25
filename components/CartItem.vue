<template>
  <div class="relative">
    <!-- Styled Cart Item Block -->
    <div :class="[
      'flex flex-wrap items-center justify-between gap-4 py-4 border-b border-amber-200 bg-amber-50 rounded-lg px-4 shadow-sm transition-all duration-300',
      showConfirm ? 'blur-[2px]' : ''
    ]">
      <!-- Image -->
      <img :src="item.image" alt="Product image" class="w-16 h-20 object-cover rounded-md border border-amber-200 shadow" />

      <!-- Title + Size -->
      <div class="flex-1 min-w-[140px]">
        <p class="font-medium text-base text-amber-900">{{ item.title }}</p>
        <p class="text-sm text-amber-700">Size: {{ item.variantTitle }}</p>
        <div v-if="item.quantity > 1">
          <span class="text-sm italic text-amber-600 mr-1">
              {{ currencySymbol }}{{ parseFloat(item.price).toFixed(2) }} each
          </span>
        </div>
      </div>

      <!-- Price + Quantity Controls -->
      <div class="flex flex-col items-end justify-between min-w-[120px] gap-2">
        <div class="text-right text-base font-semibold text-amber-900">
          <span>{{ currencySymbol }}{{ (item.price * item.quantity).toFixed(2) }}</span>
        </div>
        <div class="flex items-center justify-end gap-2">
          <button @click="handleDecrement" class="px-2 py-1 bg-amber-100 border border-amber-300 rounded text-sm font-semibold text-amber-900 hover:bg-amber-200">
            –
          </button>
          <span class="w-6 text-center text-sm text-amber-900">{{ item.quantity }}</span>
          <button @click="incrementItemQuantity(item.id)" class="px-2 py-1 bg-amber-100 border border-amber-300 rounded text-sm font-semibold text-amber-900 hover:bg-amber-200">
            +
          </button>
        </div>
      </div>
    </div>

    <!-- Inline Confirmation Overlay -->
    <div v-if="showConfirm"
      class="absolute inset-0 flex flex-col items-center justify-center bg-amber-50/90 border border-amber-200 rounded-lg shadow-lg p-4 z-10">
      <p class="text-center font-medium text-amber-900 mb-3">Remove this item from your cart?</p>
      <div class="flex gap-3">
        <button @click="confirmDelete" class="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700">Yes</button>
        <button @click="cancelDelete" class="border border-amber-300 px-4 py-1 rounded hover:bg-amber-100">Cancel</button>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
const {
  item,
  currencySymbol,
  incrementItemQuantity,
  decrementItemQuantity
} = defineProps<{
  item: {
    id: string
    title: string
    variantTitle: string
    price: number
    image: string
    quantity: number
  }
  currencySymbol: string
  incrementItemQuantity: (id: string) => void
  decrementItemQuantity: (id: string) => void
}>()

const emit = defineEmits<{
  (e: 'confirming', val: boolean): void
}>()

const showConfirm = ref(false)
watch(showConfirm, (val) => {
  emit('confirming', val)
})
function handleDecrement() {
  if (item.quantity <= 1) {
    showConfirm.value = true
  } else {
    decrementItemQuantity(item.id)
  }
}

function confirmDelete() {
  // Let cart.vue handle actual deletion through prop method
  decrementItemQuantity(item.id)
  showConfirm.value = false
}

function cancelDelete() {
  item.quantity = 1
  showConfirm.value = false
}
onBeforeUnmount(() => {
  emit('confirming', false)
})


</script>
