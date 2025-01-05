<template>
  <div class="card-example p-2 gap-1 flex flex-col">
    <div class="flex gap-2">
      <button @click="addRandomItem" class="btn btn-success btn-sm">ランダムで追加</button>
      <button @click="removeRandomItem" class="btn btn-danger btn-sm">ランダムで削除</button>
    </div>

    <transition-group name="list" tag="ul" class="w-full grid grid-cols-2 gap-1 grid-flow-row">
      <div
        v-for="item in items"
        :key="item.id"
        class="flex items-center rounded gap-1"
      >
        <button 
          @click="removeItem(item.id)" 
          class="btn btn-danger btn-xs p-0 size-8"
        >
          <MdiDeleteForeverOutline />
        </button>
        <span class="text-sm">{{ item.text }}</span>
      </div>
      </transition-group>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([])

// サンプルテキストの配列
const sampleTexts = [
  'Vue.js', 'TS', 'JS', 'Docker', 'AWS', 'Git', 'GitHub', 'GitLab'
]

// クリックされたアイテムを削除
function removeItem(id) {
  items.value = items.value.filter(i => i.id !== id)
}

// ランダムなアイテムを追加
function addRandomItem() {
  items.value.push({
    id: crypto.randomUUID(),
    text: sampleTexts[Math.floor(Math.random() * sampleTexts.length)]
  })
}

// ランダムなアイテムを削除
function removeRandomItem() {
  items.value.splice(Math.floor(Math.random() * items.value.length), 1)
}
</script>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
