<template>
  <div class="card-example flex flex-col p-2 gap-1">
    <input v-model.lazy="lazyInput" placeholder="フォーカスを外すと更新" class="input input-xs w-full" />
    <div>値: {{ lazyInput }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const lazyInput = ref('')
</script>

<style scoped>
</style>
