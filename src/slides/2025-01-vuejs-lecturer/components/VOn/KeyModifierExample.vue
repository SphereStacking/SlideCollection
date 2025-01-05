<script setup>
import { ref } from 'vue'

const logs = ref([])
const inputValue = ref('')
const selectedModifier = ref('enter')

const addLog = (message) => {
  logs.value.unshift(`${new Date().toLocaleTimeString()}: ${message}`)
  if (logs.value.length > 4) logs.value.pop()
}

const keyModifiers = [
  { value: 'enter', label: 'Enter', description: 'Enterキーで送信' },
  { value: 'ctrl-enter', label: 'Ctrl + Enter', description: 'Ctrl+Enterで送信' },
  { value: 'esc', label: 'Esc', description: 'Escキーでクリア' },
  { value: 'arrow', label: '矢印キー', description: '↑↓←→キーでログ' }
]

const handleSubmit = () => {
  if (inputValue.value.trim()) {
    addLog(`${selectedModifier.value} : 「${inputValue.value}」を送信しました`)
    inputValue.value = ''
  }
}

const handleClear = () => {
  inputValue.value = ''
  addLog('入力をクリアしました')
}

const handleArrow = (direction) => {
  addLog(`${direction}キーが押されました`)
}
</script>

<template>
  <div class="card-example p-2 flex flex-col gap-2">
    <div class="flex gap-2 justify-between">
      <div>
        <select v-model="selectedModifier" class="select select-sm">
          <option 
            v-for="modifier in keyModifiers" 
            :key="modifier.value" 
            :value="modifier.value"
          >
            {{ modifier.label }}
          </option>
        </select>
      </div>


      <div class="flex gap-2">
        <div class="text-xs text-gray-600">
          {{ keyModifiers.find(m => m.value === selectedModifier)?.description }}
        </div>
        <input
          v-model="inputValue"
          type="text"
          class="input input-xs flex-1"
          placeholder="テキストを入力..."
          v-if="selectedModifier === 'enter'"
          @keyup.enter="handleSubmit"
        />
        <input
          v-model="inputValue"
          type="text"
          class="input input-xs flex-1"
          placeholder="Ctrl+Enterで送信..."
          v-else-if="selectedModifier === 'ctrl-enter'"
          @keyup.ctrl.enter="handleSubmit"
        />
        <input
          v-model="inputValue"
          type="text"
          class="input input-xs flex-1"
          placeholder="Escでクリア..."
          v-else-if="selectedModifier === 'esc'"
          @keyup.esc="handleClear"
        />
        <input
          v-model="inputValue"
          type="text"
          class="input input-xs flex-1"
          placeholder="矢印キーを押してください..."
          v-else-if="selectedModifier === 'arrow'"
          @keyup.up="() => handleArrow('↑')"
          @keyup.down="() => handleArrow('↓')"
          @keyup.left="() => handleArrow('←')"
          @keyup.right="() => handleArrow('→')"
        />
      </div>
    </div>

    <div class="p-1 text-xs">
      <ul>
        <li 
          v-for="(log, index) in logs" 
          :key="index"
        >
          {{ log }}
        </li>
      </ul>
    </div>
  </div>
</template>
