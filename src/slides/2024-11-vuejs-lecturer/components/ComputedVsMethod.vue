<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const count = ref(0);

const computedTimestamp = computed(() => {
  return `Computed: ${Date.now()}`;
});

const methodTimestamp = () => {
  return `Method: ${Date.now()}`;
};

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
    <div class="counter">カウンター: {{ count }}</div>
    <div class="timestamp">
      <h3>算出プロパティ (computed)</h3>
      <div>{{ computedTimestamp }}</div>
    </div>

    <div class="timestamp">
      <h3>メソッド (method)</h3>
      <div>{{ methodTimestamp() }}</div>
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
  gap: 0.5em;
  justify-content: center;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 1em;
  background-color: #1a1a1a;
  flex-direction: column;
}

.timestamp {
  text-align: left;
  padding: 0.5em;
  background-color: #2a2a2a;
  border-radius: 4px;
  min-width: 300px;
  color: white;
}

.timestamp h3 {
  color: #42b883;
  font-size: 1em;
  margin-top: 0;
}
</style>
