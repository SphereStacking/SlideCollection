<script setup lang="ts">
import { computed } from 'vue'
import { useQuizStore } from '../composables/useQuizStore'

const store = useQuizStore()

const percentage = computed(() =>
  Math.round((store.correctCount.value / store.totalQuestions) * 100),
)

const rank = computed(() => {
  const p = percentage.value
  if (p === 100) return { label: 'JS Master 🧙', color: 'text-yellow-400' }
  if (p >= 80) return { label: 'JS Expert 🔥', color: 'text-green-400' }
  if (p >= 60) return { label: 'JS Intermediate 👍', color: 'text-blue-400' }
  if (p >= 40) return { label: 'JS Beginner 🌱', color: 'text-cyan-400' }
  return { label: 'JS Victim 💀', color: 'text-red-400' }
})
</script>

<template>
  <div class="text-center">
    <div class="text-6xl font-bold" :class="rank.color">
      {{ store.correctCount.value }} / {{ store.totalQuestions }}
    </div>
    <div class="text-2xl mt-2" :class="rank.color">
      {{ rank.label }}
    </div>
    <div class="mt-2 text-gray-400">
      ({{ percentage }}% 正解)
    </div>

    <div class="grid grid-cols-4 gap-2 mt-8 max-w-xs mx-auto">
      <div
        v-for="q in store.totalQuestions"
        :key="q"
        class="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold border"
        :class="
          store.getAnswer(q).selected === null
            ? 'border-white/20 text-gray-500'
            : store.getAnswer(q).isCorrect
              ? 'bg-green-900/60 border-green-400 text-green-200'
              : 'bg-red-900/60 border-red-400 text-red-200'
        "
      >
        Q{{ q }}
      </div>
    </div>

    <button
      class="mt-6 px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors border border-white/20"
      @click="store.reset()"
    >
      🔄 リセット
    </button>
  </div>
</template>
