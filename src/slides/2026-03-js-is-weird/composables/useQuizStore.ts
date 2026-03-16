import { reactive, computed } from 'vue'

export interface QuizAnswer {
  selected: string | null
  isCorrect: boolean | null
}

const TOTAL_QUESTIONS = 12

const state = reactive({
  answers: Object.fromEntries(
    Array.from({ length: TOTAL_QUESTIONS }, (_, i) => [
      i + 1,
      { selected: null, isCorrect: null } as QuizAnswer,
    ]),
  ) as Record<number, QuizAnswer>,
})

export function useQuizStore() {
  function answer(questionNumber: number, choice: string, correctAnswer: string) {
    const entry = state.answers[questionNumber]
    if (entry.selected !== null) return
    entry.selected = choice
    entry.isCorrect = choice === correctAnswer
  }

  function isLocked(questionNumber: number): boolean {
    return state.answers[questionNumber].selected !== null
  }

  function getAnswer(questionNumber: number): QuizAnswer {
    return state.answers[questionNumber]
  }

  const correctCount = computed(() =>
    Object.values(state.answers).filter((a) => a.isCorrect === true).length,
  )

  const answeredCount = computed(() =>
    Object.values(state.answers).filter((a) => a.selected !== null).length,
  )

  function reset() {
    for (const key of Object.keys(state.answers)) {
      state.answers[+key] = { selected: null, isCorrect: null }
    }
  }

  return {
    answer,
    isLocked,
    getAnswer,
    correctCount,
    answeredCount,
    totalQuestions: TOTAL_QUESTIONS,
    reset,
  }
}
