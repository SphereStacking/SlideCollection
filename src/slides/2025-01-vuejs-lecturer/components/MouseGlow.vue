<script setup>
import { useMouse } from '@vueuse/core'
import { computed } from 'vue'
const { x, y } = useMouse()

const adjustedX = computed(() => x.value / 2)
const adjustedY = computed(() => y.value / 2)
</script>

<template>
  <div class="mouse-container">
    <!-- マウスの座標を表示 -->
    <div>
      X: {{ adjustedX }}, Y: {{ adjustedY }}
    </div>
    <!-- マウスに追従する光のエフェクト -->
     <div class="absolute bg-green-500/30 rounded-full size-40 -translate-x-1/2 -translate-y-1/2  blur-3xl" :style="{ left: `${adjustedX}px`, top: `${adjustedY}px` }"></div>
  </div>
</template>

<style scoped>
.mouse-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw; /* ビューポート全体の幅 */
    height: 100vh; /* ビューポート全体の高さ */
    overflow: hidden;
}

</style>
