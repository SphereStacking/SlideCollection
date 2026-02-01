<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  size?: 'sm' | 'md' | 'lg'
}>(), {
  title: '~',
  size: 'md'
})
</script>

<template>
  <div class="terminal-window">
    <!-- ターミナルヘッダー -->
    <div class="flex items-center gap-2 px-4 bg-gray-800 rounded-t-lg"
         :class="size === 'lg' ? 'py-3 border-b border-gray-700' : 'py-2'">
      <div :class="size === 'lg' ? 'flex gap-2' : 'flex gap-1.5'">
        <div class="rounded-full bg-red-500" :class="size === 'lg' ? 'w-3 h-3' : 'w-2.5 h-2.5'"></div>
        <div class="rounded-full bg-yellow-500" :class="size === 'lg' ? 'w-3 h-3' : 'w-2.5 h-2.5'"></div>
        <div class="rounded-full bg-green-500" :class="size === 'lg' ? 'w-3 h-3' : 'w-2.5 h-2.5'"></div>
      </div>
      <div class="flex-1 text-center text-gray-500 font-mono"
           :class="size === 'lg' ? 'text-sm' : 'text-xs'">{{ title }}</div>
    </div>
    <!-- ターミナル本体 -->
    <div class="bg-gray-950 rounded-b-lg font-mono border-x border-b border-gray-800"
         :class="size === 'sm' ? 'p-5 text-sm' : 'p-6'">
      <slot />
    </div>
  </div>
</template>
