<template>
  <!-- .trim の例 -->
  <div class="card-example flex flex-col p-2 gap-1">
    <input v-model.trim="trimInput" placeholder="前後の空白を削除" class="input input-xs w-full" />
    <div class="grid grid-cols-2 gap-1">
      <span>値: "{{ trimInput }}"</span>
      <span>長さ: {{ trimInput.length }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const trimInput = ref('')
</script>

<style scoped>
</style>
