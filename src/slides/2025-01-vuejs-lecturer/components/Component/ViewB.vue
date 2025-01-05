<template>
  <div class="card-example p-2 flex flex-row gap-2 items-center">
    <h4>View B</h4>
    <div class="flex flex-row gap-2 justify-between items-center">
      <div>カウンター: {{ count }}</div>
      <button @click="count++" class="btn btn-xs btn-primary">+1</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>
