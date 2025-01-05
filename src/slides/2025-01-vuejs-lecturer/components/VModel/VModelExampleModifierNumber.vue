<template>
  <div class="card-example flex flex-col p-2 gap-1">
    <input v-model.number="numberInput" type="number" placeholder="数値のみ" class="input input-xs w-full" />
    <div class="grid grid-cols-2 gap-1">
      <span>値: {{ numberInput }}</span>
      <span>型: {{ typeof numberInput }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const numberInput = ref(0)
</script>

<style scoped>
</style>
