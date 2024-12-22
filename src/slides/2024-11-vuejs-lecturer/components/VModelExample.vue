<template>
  <div class="flex flex-col justify-center items-center border border-gray-300 rounded-md p-4">
    <input v-model="message" placeholder="example" class="border border-gray-300 rounded-md p-1 w-full" />
    <p>入力されたメッセージ: {{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const message = ref('');
</script>

<style scoped>
</style>
