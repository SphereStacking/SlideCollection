<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const count = ref(0);
const computedTimestamp = computed(() => {
  //1.リアクティブな依存はない
  return `Computed: ${Date.now()}`;
});
const methodTimestamp = () => {
  //2.リアクティブな依存はない
  return `Method: ${Date.now()}`;
};
const computedRefTimestamp = computed(() => {
  //3.リアクティブな依存がある
  return `Computed (${count.value}): ${Date.now()}`;
});
let timer;
onMounted(() => {
  timer = setInterval(() => {
    count.value++;
  }, 1000);
});
onUnmounted(() => {
  clearInterval(timer);
});
</script>

<template>
  <div class="card">
    <div class="counter">
      count: {{ count }}
    </div>
    <div class="timestamp">
      <!-- 1 -->
      <h3>1. computed</h3>
      <div>{{ computedTimestamp }}</div>
    </div>
    <div class="timestamp">
      <!-- 2 -->
      <h3>2. method</h3>
      <div>{{ methodTimestamp() }}</div>
    </div>
    <div class="timestamp">
      <!-- 3 -->
      <h3>3. ref computed</h3>
      <div>{{ computedRefTimestamp }}</div>
    </div>
  </div>
</template>

<style scoped>
.counter {
  font-size: 1em;
  color: #42b883;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #1a1a1a;
  gap: 0.5em;
}

.timestamp {
  text-align: left;
  padding: 0.5em;
  background-color: #2a2a2a;
  border-radius: 4px;
  color: white;
  font-size: 0.8em;
}

.timestamp h3 {
  color: #42b883;
  margin-top: 0;
  margin-bottom: 0;
}
</style>
