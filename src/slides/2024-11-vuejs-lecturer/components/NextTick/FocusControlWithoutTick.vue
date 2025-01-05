<script setup lang="ts">
import { ref } from 'vue'

const isInputVisible = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)

function showAndFocusInput() {
  isInputVisible.value = true
  // nextTickを待たないため要素が存在せずfocusが失敗する
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
        class="btn btn-sm"
        :class="{ 'btn-danger': isInputVisible, 'btn-primary': !isInputVisible }"
      >
        {{ isInputVisible ? 'Hide Input' : 'Show Input' }}
      </button>
      <input
      v-if="isInputVisible"
        ref="inputRef"
        type="text"
        placeholder="フォーカスされません"
        class="input input-sm"
      >
      <div v-if="isInputVisible">
        🫥
      </div>
    </div>

  </div>
</template>
