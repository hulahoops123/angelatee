<template>
  <div class="max-w-xl mx-auto py-12 px-4 relative">
    <h1 class="text-3xl font-bold mb-6">Contact Us</h1>

    <div class="relative">
      <form @submit.prevent="handleSubmit" class="space-y-4 bg-white p-4 rounded shadow relative">

        <!-- Blurred form content only -->
        <div :class="{ 'blur-sm pointer-events-none': submitted }">
          <div>
            <label class="block text-sm font-medium">Name</label>
            <input v-model="form.name" name="name" required class="w-full border rounded p-2" />
          </div>
          <div>
            <label class="block text-sm font-medium">Email</label>
            <input v-model="form.email" name="email" type="email" required class="w-full border rounded p-2" />
          </div>
          <div>
            <label class="block text-sm font-medium">Phone</label>
            <input v-model="form.phone" name="phone" class="w-full border rounded p-2" />
          </div>
          <div>
            <label class="block text-sm font-medium">Message</label>
            <textarea v-model="form.message" name="message" required class="w-full border rounded p-2"></textarea>
          </div>
        </div>

        <!-- Always visible button -->
        <button :type="submitted ? 'button' : 'submit'" @click="submitted ? resetForm() : null" :disabled="isProcessing"
          class="bg-black text-white px-4 py-2 rounded w-full transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed">
          <span v-if="isProcessing">Sending...</span>
          <span v-else>{{ submitted ? 'Send another message' : 'Send' }}</span>
        </button>


      </form>

      <!-- Success message on top -->
      <p v-if="submitted"
        class="absolute inset-0 flex items-center justify-center text-green-600 font-semibold pointer-events-none">
        Thanks for reaching out! We'll be in touch.
      </p>
    </div>

    <!-- Error message below form -->
    <p v-if="errorMessage" class="mt-4 text-red-600 font-medium text-center">
      {{ errorMessage }}
    </p>
  </div>
</template>


<script setup>
const submitted = ref(false)
const isProcessing = ref(false)
const errorMessage = ref('')

const form = reactive({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const resetForm = () => {
  submitted.value = false
  errorMessage.value = ''
  form.name = ''
  form.email = ''
  form.phone = ''
  form.message = ''
}

const handleSubmit = async () => {
  if (submitted.value) return

  isProcessing.value = true
  errorMessage.value = '' // Clear any previous errors

  try {
    const res = await fetch('https://formspree.io/f/mblyzjyy', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: JSON.stringify({ ...form })
    })

    if (res.ok) {
      submitted.value = true
      // Clear form only on success
      form.name = ''
      form.email = ''
      form.phone = ''
      form.message = ''
    } else {
      errorMessage.value = 'Failed to send message. Please try again.'
    }
  } catch (err) {
    console.error('Form error', err)
    errorMessage.value = 'Network error. Please check your connection and try again.'
  } finally {
    isProcessing.value = false
  }
}
</script>
