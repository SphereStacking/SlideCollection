<script setup lang="ts">
import { ref, nextTick } from 'vue'

const isInputVisible = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)

async function showAndFocusInput() {
  isInputVisible.value = true
  await nextTick()
  inputRef.value?.focus()
}

function hideInput() {
  isInputVisible.value = false
}
</script>

<template>
  <div class="card-example p-4">
    <div class="flex gap-2 items-center">
      <button 
        @click="isInputVisible ? hideInput() : showAndFocusInput()"
        class="btn btn-sm btn-primary"
        :class="{ 'btn-danger': isInputVisible, 'btn-primary': !isInputVisible }"
      >
        {{ isInputVisible ? 'Hide Input' : 'Show Input' }}
      </button>
      <input
      v-if="isInputVisible"
        ref="inputRef"
        type="text"
        placeholder="フォーカスされます"
        class="input input-sm"
      >
      <div v-if="isInputVisible">
        🤗 
      </div>
    </div>
  </div>
</template>

