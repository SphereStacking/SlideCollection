<script setup lang="ts">
import { ref, nextTick } from 'vue'

const content = ref('初期コンテンツ')
const height = ref(0)
const boxRef = ref<HTMLDivElement | null>(null)

const initialContent = '初期コンテンツ'
const initialHeight = 0

async function measureHeight() {
  content.value = 'こちらは\n何度計測しても\n同じ結果になります'
  await nextTick()
  if (boxRef.value) {
    height.value = boxRef.value.offsetHeight
  }
}

function resetMeasurement() {
  content.value = initialContent
  height.value = initialHeight
}
</script>

<template>
  <div class="card-example p-4 flex flex-row gap-2">
    <div 
      class="flex-grow"
    >
      <div 
        ref="boxRef" 
        class=" border border-gray-300 p-2 whitespace-pre-line ">
        {{ content }}
      </div>
    </div>
    <div class="flex flex-col gap-1">
      <div class="text-red-500">Height: {{ height }}px</div>
      <button @click="measureHeight" class="btn btn-sm btn-primary">
        高さ計測
      </button>
      <button @click="resetMeasurement" class="btn btn-sm btn-secondary">
        リセット
      </button>
    </div>

  </div>
</template>
