<script setup>
defineProps({
  leftWidth: {
    type: [String, Number],
    default: 'w-1/2'
  },
  rightWidth: {
    type: [String, Number],
    default: 'w-1/2'
  }
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <div v-if="$slots.header">
      <slot name="header" />
    </div>
    <div class="flex gap-4">
      <div v-if="$slots.left" :class="leftWidth">
        <slot name="left" />
      </div>
      <div v-if="$slots.right" :class="rightWidth">
        <slot name="right" />
      </div>
    </div>
    <div v-if="$slots.footer">
      <slot name="footer" />
    </div>
  </div>
</template>


