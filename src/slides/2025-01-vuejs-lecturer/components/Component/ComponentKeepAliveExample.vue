<template>
  <div class="card-example p-2 flex flex-col gap-0.5">
    <div class="flex gap-2 justify-between items-center">
      <h3>keep-aliveでラップした場合</h3>
      <div class="flex flex-row gap-2">
        <button @click="currentView = 'ViewA'" class="btn btn-xs btn-primary">View A</button>
        <button @click="currentView = 'ViewB'" class="btn btn-xs btn-primary">View B</button>
      </div>
    </div>

    <!-- KeepAlive でラップすることでコンポーネントの状態をキャッシュ -->
    <keep-alive>
      <component :is="views[currentView]"></component>
    </keep-alive>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ViewA from './ViewA.vue'
import ViewB from './ViewB.vue'

const currentView = ref('ViewA')

/*
  切り替え先のコンポーネントを登録。
  ここではViewA.vueとViewB.vueを同階層に用意している想定
*/
const views = {
  ViewA,
  ViewB,
}
</script>
