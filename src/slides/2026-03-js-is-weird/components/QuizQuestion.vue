<script setup lang="ts">
import { computed } from 'vue'
import { useQuizStore } from '../composables/useQuizStore'

const props = defineProps<{
  question: number
  correct: string
  options: string
}>()

const labels = ['A', 'B', 'C', 'D'] as const
const store = useQuizStore()

const parsedOptions = computed(() => props.options.split('|').map((s) => s.trim()))
const currentAnswer = computed(() => store.getAnswer(props.question))
const locked = computed(() => store.isLocked(props.question))

function select(label: string) {
  store.answer(props.question, label, props.correct)
}

function optionClass(label: string) {
  if (!locked.value) {
    return 'hover:bg-white/10 cursor-pointer border-white/20'
  }
  if (label === props.correct) {
    return 'bg-green-900/50 border-green-400 text-green-200'
  }
  if (label === currentAnswer.value.selected && !currentAnswer.value.isCorrect) {
    return 'bg-red-900/50 border-red-400 text-red-200'
  }
  return 'opacity-40 border-white/10'
}
</script>

<template>
  <div class="grid grid-cols-4 gap-2 mt-3 max-w-3xl mx-auto">
    <button
      v-for="(option, index) in parsedOptions"
      :key="labels[index]"
      :disabled="locked"
      class="px-3 py-2 rounded-lg border-2 text-left transition-all duration-300 text-sm disabled:cursor-default whitespace-nowrap"
      :class="optionClass(labels[index])"
      @click="select(labels[index])"
    >
      <span class="font-bold mr-1">{{ labels[index] }}.</span>
      <code>{{ option }}</code>
      <span v-if="locked && labels[index] === correct" class="ml-1">✅</span>
      <span
        v-if="locked && labels[index] === currentAnswer.selected && !currentAnswer.isCorrect"
        class="ml-1"
        >❌</span
      >
    </button>
  </div>

  <Transition
    enter-active-class="transition-all duration-500 ease-out"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
  >
    <div
      v-if="locked"
      class="mt-3 p-3 rounded-lg text-sm max-w-3xl mx-auto"
      :class="currentAnswer.isCorrect ? 'bg-green-900/40' : 'bg-red-900/30'"
    >
      <div class="text-base font-bold mb-1">
        {{ currentAnswer.isCorrect ? '🎉 正解！' : '😱 不正解...' }}
        答え: {{ correct }}
      </div>
      <slot />
    </div>
  </Transition>
</template>
