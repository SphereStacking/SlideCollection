<template>
  <div class="flex flex-col gap-2">
    <div v-if="$slots.header">
      <slot name="header" />
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div v-if="$slots.left">
        <slot name="left" />
      </div>
      <div >
        <slot name="right" />
      </div>
    </div>
    <div v-if="$slots.footer">
      <slot name="footer" />
    </div>
  </div>
</template>
