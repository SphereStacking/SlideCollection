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
    <span class="text-green-400">sphere@dev</span>:<span class="text-blue-400">{{ path }}</span>$ {{ command }}<span v-if="cursor" class="animate-pulse">▋</span><slot />
  </div>
</template>
