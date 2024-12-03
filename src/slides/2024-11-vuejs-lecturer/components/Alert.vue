<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'note',
    validator(value) {
      return ['note', 'tip', 'important', 'warning', 'caution'].includes(value.toLowerCase());
    },
  },
});
</script>

<template>
  <div :class="['alert', `alert--${props.type.toLowerCase()}`]">
    <slot />
  </div>
</template>

<style scoped>
.alert {
  border-left: 4px solid;
  padding: 8px;
  border-radius: 4px;
  font-size: 14px;
}

.alert--note {
  border-color: #0070f3;
  background-color: rgba(0, 112, 243, 0.1);
}

.alert--tip {
  border-color: rgb(0, 255, 98);
  background-color: rgba(0, 255, 98, 0.1);
}

.alert--important {
  border-color: rgb(151, 47, 211);
  background-color: rgba(151, 47, 211, 0.1);
}

.alert--warning {
  border-color: rgb(255, 187, 0);
  background-color: rgba(255, 187, 0, 0.1);
}

.alert--caution {
  border-color: rgb(210, 34, 55);
  background-color: rgba(210, 34, 55, 0.1);
}
</style>
