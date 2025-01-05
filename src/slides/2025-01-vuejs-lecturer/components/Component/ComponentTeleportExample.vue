<template>
  <div class="card-example p-2">
    <div>
      <div id="modal-target"></div>
    </div>
      <div id="modal-target"></div>
      <button @click="showModal = true">モーダル表示</button>

    <teleport to="#modal-target">
      <!-- モーダルを別のDOMツリーに"テレポート" -->
      <div v-if="showModal" class="modal-backdrop" @click.self="closeModal">
        <div class="modal-content">
          <h3>Teleport で描画中</h3>
          <p>これはルート要素外に描画されています。</p>
          <button @click="closeModal">閉じる</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showModal = ref(false)

function closeModal() {
  showModal.value = false
}
</script>

<style scoped>
/* 簡易的なモーダルCSS */
.modal-backdrop {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: #fff;
  padding: 16px;
  border-radius: 8px;
}
</style>
