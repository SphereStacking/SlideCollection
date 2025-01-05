<template>
  <div class="card-example p-2">
    <Suspense>
      <template #default>
        <!-- ロードに時間がかかるコンポーネントを読み込んでいる想定 -->
        <AsyncComponent />
      </template>
      <template #fallback>
        <div>Loading... しばらくお待ちください</div>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

/*
  defineAsyncComponentで非同期コンポーネントを定義。
  例として、2秒後に MyComponent が読み込まれる。
*/
const AsyncComponent = defineAsyncComponent(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(import('./ComponentSuspenseExample2.vue'))
    }, 2000)
  })
})
</script>
