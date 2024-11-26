<template>
  <div class="flex flex-col gap-2">
    <div>
      <slot name="header" />
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <slot name="left" />
      </div>
      <div>
        <slot name="right" />
      </div>
    </div>
    <div>
      <slot name="footer" />
    </div>
  </div>
</template>
