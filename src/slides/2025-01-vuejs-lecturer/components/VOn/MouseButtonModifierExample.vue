<script setup>
import { ref } from 'vue'

const logs = ref([])
const selectedModifier = ref('left')

const addLog = (message) => {
  logs.value.unshift(`${new Date().toLocaleTimeString()}: ${message}`)
  if (logs.value.length > 5) logs.value.pop()
}

const mouseModifiers = [
  { 
    value: 'left', 
    label: '左クリック', 
    description: 'マウスの左ボタンでのクリックのみを検知' 
  },
  { 
    value: 'right', 
    label: '右クリック', 
    description: 'マウスの右ボタンでのクリックのみを検知' 
  },
  { 
    value: 'middle', 
    label: '中クリック', 
    description: 'マウスのホイールボタンでのクリックのみを検知' 
  }
]

const handleClick = (buttonType) => {
  addLog(`${buttonType}が検知されました`)
}
</script>

<template>
  <div class="card-example p-2 flex flex-col gap-2">
    <div class="flex gap-2 items-center">
        <select v-model="selectedModifier" class="select select-xs">
            <option 
                v-for="modifier in mouseModifiers" 
                :key="modifier.value" 
                :value="modifier.value"
            >
                {{ modifier.label }}
            </option>
        </select>
        <div class="text-xs text-gray-600">
            {{ mouseModifiers.find(m => m.value === selectedModifier)?.description }}
        </div>
        <div class="flex justify-center">
            <button 
                v-if="selectedModifier === 'left'"
                @click.left="handleClick('左クリック')"
                @click.right.prevent
                class="btn btn-primary btn-xs"
            >
                左クリックしてください
            </button>

            <button 
                v-else-if="selectedModifier === 'right'"
                @click.right.prevent="handleClick('右クリック')"
                @click.left.prevent
                class="btn btn-primary btn-xs"
            >
                右クリックしてください
            </button>

            <button 
                v-else
                @click.middle.prevent="handleClick('中クリック')"
                @click.left.prevent
                @click.right.prevent
                class="btn btn-primary btn-xs"
            >
                ホイールクリックしてください
            </button>
        </div>
    </div>

    <!-- ログ表示 -->
    <div class="p-1 text-xs">
      <ul>
        <li v-for="(log, index) in logs" :key="index" >
          {{ log }}
        </li>
      </ul>
    </div>
  </div>
</template>
