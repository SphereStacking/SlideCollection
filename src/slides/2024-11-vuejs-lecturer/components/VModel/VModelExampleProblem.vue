<template>
  <div class="card-example flex flex-col p-2 gap-1">
    <input type="checkbox" v-model="checked">
    <p>チェックボックスは {{ checked ? 'オン' : 'オフ' }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const checked = ref('false');
</script>
