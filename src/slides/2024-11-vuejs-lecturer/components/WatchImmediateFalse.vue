

<script setup>
import { ref, watch, onMounted, onUpdated, onUnmounted } from 'vue';

const count = ref(0);
const logs = ref([]);

const increment = () => {
  count.value++;
};

const clearLogs = () => {
  logs.value = [];
};

watch(count, (newValue, oldValue) => {
  logs.value.push(`watch: countが${oldValue}から${newValue}に変わりました`);
}, { immediate: false });

onMounted(() => {
  logs.value.push('onMounted: コンポーネントがマウントされました');
});
</script>

<template>
  <div>
    <div class="flex gap-2 items-center">
      <button class="bg-blue-500 text-white px-2 py-1 rounded" @click="increment">countを増やす</button>
      <button class="bg-red-500 text-white px-2 py-1 rounded" @click="clearLogs">ログをクリア</button>
      <div>count: {{ count }}</div>
    </div>
    <div>immediate: false</div>
    <div>
      <div v-for="log in logs" :key="log">{{ log }}</div>
    </div>
  </div>
</template>
