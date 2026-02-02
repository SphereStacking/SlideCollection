<script setup lang="ts">
withDefaults(defineProps<{
  path?: string
  command?: string
  cursor?: boolean
}>(), {
  path: '~',
  cursor: false
})
</script>

<template>
  <div>
    <span class="text-green-400">sphere@dev</span>:<span class="text-cyan-400">{{ path }}</span><span class="text-gray-500">$ {{ command }}</span><span v-if="cursor" class="animate-pulse">▋</span><slot />
  </div>
</template>
