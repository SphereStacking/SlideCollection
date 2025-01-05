<template>
  <div class="card-example p-2 flex flex-row gap-2 items-center">
    <h4>View A</h4>
    <div class="flex flex-row gap-2 items-center">
      <div>フォーム入力: </div>
      <input v-model="text" class="input input-xs" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const text = ref('')
</script>
  