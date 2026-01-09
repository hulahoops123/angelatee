<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" @click="close"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div @click.stop class="bg-amber-50 rounded-lg border-2 border-amber-200 max-w-lg w-full p-4 sm:p-6 shadow-2xl">
          <!-- Header -->
          <div class="flex justify-between items-center mb-4 sm:mb-6">
            <h2 class="text-xl sm:text-2xl font-bold text-amber-900">Size Guide (cm)</h2>
            <button @click="close"
              aria-label="Close size guide"
              class="text-amber-900 hover:text-amber-700 transition text-2xl leading-none">
              ×
            </button>
          </div>

          <!-- Size Chart Table -->
          <div class="overflow-hidden">
            <table class="w-full border-collapse text-xs sm:text-sm">
              <thead>
                <tr class="bg-amber-100 border-b-2 border-amber-200">
                  <th class="text-left py-2 px-2 sm:py-3 sm:px-4 text-amber-900 font-semibold">Size</th>
                  <th class="text-center py-2 px-1 sm:py-3 sm:px-4 text-amber-900 font-semibold">S</th>
                  <th class="text-center py-2 px-1 sm:py-3 sm:px-4 text-amber-900 font-semibold">M</th>
                  <th class="text-center py-2 px-1 sm:py-3 sm:px-4 text-amber-900 font-semibold">L</th>
                  <th class="text-center py-2 px-1 sm:py-3 sm:px-4 text-amber-900 font-semibold">XL</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-amber-200">
                  <td class="py-2 px-2 sm:py-3 sm:px-4 text-amber-900 font-medium">Shoulder</td>
                  <td class="text-center py-2 px-1 sm:py-3 sm:px-4 text-amber-900">42</td>
                  <td class="text-center py-2 px-1 sm:py-3 sm:px-4 text-amber-900">46</td>
                  <td class="text-center py-2 px-1 sm:py-3 sm:px-4 text-amber-900">48</td>
                  <td class="text-center py-2 px-1 sm:py-3 sm:px-4 text-amber-900">51</td>
                </tr>
                <tr class="border-b border-amber-200">
                  <td class="py-2 px-2 sm:py-3 sm:px-4 text-amber-900 font-medium">Chest</td>
                  <td class="text-center py-2 px-1 sm:py-3 sm:px-4 text-amber-900">47</td>
                  <td class="text-center py-2 px-1 sm:py-3 sm:px-4 text-amber-900">50</td>
                  <td class="text-center py-2 px-1 sm:py-3 sm:px-4 text-amber-900">51</td>
                  <td class="text-center py-2 px-1 sm:py-3 sm:px-4 text-amber-900">57</td>
                </tr>
                <tr>
                  <td class="py-2 px-2 sm:py-3 sm:px-4 text-amber-900 font-medium">Length</td>
                  <td class="text-center py-2 px-1 sm:py-3 sm:px-4 text-amber-900">63</td>
                  <td class="text-center py-2 px-1 sm:py-3 sm:px-4 text-amber-900">67</td>
                  <td class="text-center py-2 px-1 sm:py-3 sm:px-4 text-amber-900">72</td>
                  <td class="text-center py-2 px-1 sm:py-3 sm:px-4 text-amber-900">73</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

const close = () => {
  emit('close')
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active > div,
.modal-leave-active > div {
  transition: transform 0.3s ease;
}

.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.9);
}
</style>
