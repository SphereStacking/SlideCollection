<script setup>
import { ref } from 'vue'

const logs = ref([])
const selectedModifier = ref('ctrl')

const addLog = (message) => {
  logs.value.unshift(`${new Date().toLocaleTimeString()}: ${message}`)
  if (logs.value.length > 5) logs.value.pop()
}

const systemModifiers = [
  { 
    value: 'ctrl', 
    label: 'Ctrl + Click', 
    description: 'Ctrlキーを押しながらクリック'
  },
  { 
    value: 'alt', 
    label: 'Alt + Click', 
    description: 'Altキーを押しながらクリック'
  },
  { 
    value: 'shift', 
    label: 'Shift + Click', 
    description: 'Shiftキーを押しながらクリック'
  },
  { 
    value: 'meta', 
    label: 'Meta + Click', 
    description: 'MetaキーまたはWindowsキーを押しながらクリック'
  },
  { 
    value: 'combination', 
    label: 'Ctrl + Alt + Click', 
    description: 'CtrlキーとAltキーを押しながらクリック'
  }
]

const handleClick = (modifierName) => {
  addLog(`${modifierName}が実行されました`)
}

const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
</script>

<template>
  <div class="card-example p-2 flex flex-col gap-2">
    <!-- 修飾子選択 -->
    <div class="flex gap-2 items-center">
      <select v-model="selectedModifier" class="select select-xs">
        <option 
          v-for="modifier in systemModifiers" 
          :key="modifier.value" 
          :value="modifier.value"
        >
          {{ modifier.label }}
        </option>
      </select>
      <div class="text-xs text-gray-600">
        {{ systemModifiers.find(m => m.value === selectedModifier)?.description }}
        <template v-if="selectedModifier === 'meta'">
          ({{ isMac ? 'Command' : 'Windows' }}キー)
        </template>
      </div>
      <button 
        v-if="selectedModifier === 'ctrl'"
        @click.ctrl="handleClick('Ctrl + Click')"
        class="btn btn-primary btn-xs"
      >
        Ctrl + Click
      </button>
      <button 
        v-else-if="selectedModifier === 'alt'"
        @click.alt="handleClick('Alt + Click')"
        class="btn btn-primary btn-xs"
      >
        Alt + Click
      </button>
      <button 
        v-else-if="selectedModifier === 'shift'"
        @click.shift="handleClick('Shift + Click')"
        class="btn btn-primary btn-xs"
      >
        Shift + Click
      </button>
      <button 
        v-else-if="selectedModifier === 'meta'"
        @click.meta="handleClick(`${isMac ? 'Command' : 'Windows'} + Click`)"
        class="btn btn-primary btn-xs"
      >
        {{ isMac ? 'Command' : 'Windows' }} + Click
      </button>

      <button 
        v-else
        @click.ctrl.alt="handleClick('Ctrl + Alt + Click')"
        class="btn btn-primary btn-xs"
      >
        Ctrl + Alt + Click
      </button>
    </div>


    <div class="p-1 rounded text-xs">
      <ul>
        <li v-for="(log, index) in logs" :key="index" >
          {{ log }}
        </li>
      </ul>
    </div>
  </div>
</template>
