<script setup>
import { ref } from 'vue'

const logs = ref([])
const selectedModifier = ref('normal')

const addLog = (message) => {
  logs.value.push(`${new Date().toLocaleTimeString()}: ${message}`)
  if (logs.value.length > 4) logs.value.shift()
}

const handleParentClick = () => addLog('親要素のクリックイベント発火')
const handleChildClick = () => addLog('子要素のクリックイベント発火')
const handleSubmit = () => addLog('フォーム送信イベント発火')

const modifiers = [
  { value: 'normal', label: '通常のイベント伝搬', description: '子要素のイベントが親要素に伝搬します。' },
  { value: 'stop', label: '.stop (伝搬停止)', description: 'イベントの伝搬が停止します。' },
  { value: 'prevent', label: '.prevent (デフォルト動作防止)', description: 'フォームのデフォルト送信動作を防ぎます。' },
]
</script>

<template>
  <div class="card-example p-2 flex flex-col gap-1">
    <div class="flex flex-row gap-2">
      <div class="flex flex-col gap-2 w-3/4">
        <select v-model="selectedModifier">
          <option 
            v-for="modifier in modifiers" 
            :key="modifier.value" 
            :value="modifier.value"
          >
            {{ modifier.label }}
          </option>
        </select>
        <div class="text-xs">
          {{ modifiers.find(m => m.value === selectedModifier).description }}
        </div>
        <ul class="space-y-0.5 text-xs">
          <li v-for="(log, index) in logs" :key="index">
            {{ log }}
          </li>
        </ul>
      </div>

      <div class=" w-1/4">
        <div class="card-example p-1" v-if="['normal', 'stop'].includes(selectedModifier)">
          <div 
            class="cursor-pointer flex flex-col gap-2" 
            @click="handleParentClick"
            :class="{ 'border-2 border-blue-500': selectedModifier === 'self' }"
          >
            親要素
            <button 
              class="btn btn-primary btn-xs"
              @click.stop="handleChildClick"
              v-if="selectedModifier === 'stop'"
            >
              クリック
            </button>
            <button 
              class="btn btn-primary btn-xs"
              @click="handleChildClick"
              v-else
            >
              クリック
            </button>
          </div>
        </div>

        <div class="card-example p-1" v-if="selectedModifier === 'prevent'">
          <form @submit.prevent="handleSubmit">
            <input 
              type="text" 
              placeholder="テキスト"
              class="input input-xs w-full"
            >
            <button 
              type="submit"
              class="btn btn-primary btn-xs"
            >
              送信
            </button>
          </form>
        </div>
      </div>
    </div>

  </div>
</template>
