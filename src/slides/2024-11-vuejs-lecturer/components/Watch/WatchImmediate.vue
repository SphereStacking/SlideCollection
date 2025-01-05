

<script setup>
import { ref, watch, onMounted, onUpdated, onUnmounted } from 'vue';

const immediate = ref(true);
</script>

<template>
  <div class="card-example flex flex-col p-2 gap-1">
    <button class="btn btn-xs btn-success" @click="immediate = !immediate">
      [ immediate: {{ !immediate }} ]に切り替え
    </button>
    <div class="flex flex-row gap-2">
      <WatchImmediateFalse v-if="!immediate" />
      <WatchImmediateTrue v-if="immediate" />
    </div>
  </div>
</template>
