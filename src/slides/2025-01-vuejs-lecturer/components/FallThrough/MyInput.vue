<script setup>
defineProps({
  type: { type: String, default: 'text' },
  label: { type: String, required: true }
})
</script>
<template>
  <div class="flex flex-col gap-1">
    <label class="text-xs font-bold">{{ label }}</label>
    <input v-bind="$attrs" class="input input-sm"  />
  </div>
</template>
