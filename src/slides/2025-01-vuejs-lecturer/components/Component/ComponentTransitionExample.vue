<template>
  <div class="card-example p-2">
    <button @click="show = !show" class="btn btn-primary btn-sm">
      {{ show ? 'Hide' : 'Show' }} メッセージ
    </button>

    <!-- name="fade" で付与されるクラスを利用してアニメーションを定義 -->
    <transition name="fade">
      <p v-if="show">
        こんにちは、Transition でアニメーション中です！
      </p>
    </transition>
  </div>
</template>

<script setup>
// Composition API
import { ref } from 'vue'

const show = ref(false)
</script>

<style scoped>
/* fade-enter-active, fade-leave-active: アニメーション時間 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
/* fade-enter, fade-leave-to: 実際の変化量 */
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
