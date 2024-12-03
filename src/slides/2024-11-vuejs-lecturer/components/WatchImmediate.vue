

<script setup>
import { ref, watch, onMounted, onUpdated, onUnmounted } from 'vue';

const immediate = ref(true);
</script>

<template>
  <div class="flex flex-col gap-2 border border-gray-300 rounded-md p-4">
    <button class="bg-green-500 text-white px-2 py-1 rounded" @click="immediate = !immediate">
      [ immediate: {{ !immediate }} ]に切り替え
    </button>
    <div class="flex flex-row gap-2">
      <WatchImmediateFalse v-if="!immediate" />
      <WatchImmediateTrue v-if="immediate" />
    </div>
  </div>
</template>
