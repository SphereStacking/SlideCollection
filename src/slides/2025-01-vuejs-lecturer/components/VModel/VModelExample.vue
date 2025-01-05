<template>
  <div class="card-example flex flex-col p-2 gap-1">
    <input v-model="message" class="input input-xs w-full" />
    <p>入力されたメッセージ: {{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const message = ref('example');
</script>

<style scoped>
</style>
