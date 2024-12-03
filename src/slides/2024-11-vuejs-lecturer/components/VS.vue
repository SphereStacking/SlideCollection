<template>
  <div class="flex flex-col gap-2">
    <div>
      <slot name="header" />
    </div>
    <div class="flex justify-between gap-4">
      <div class="border border-gray-300 rounded-md px-4 pb-2 shadow-xl shadow-teal-500 mr-5 w-3/5">
        <p class="text-center text-teal-300 font-bold text-4xl">
          <slot name="left-header" />
        </p>
        <slot name="left" />
      </div>
      <div class="flex h-100 justify-center items-center relative mx-5">
        <div 
          bg='clip-text gradient-to-r'
          from='fuchsia-500'
          via='purple-500'
          to='pink-500'
          text='transparent'
          class="absolute text-6xl font-black z-10 text-center p-5 mb-4 leading-none  drop-shadow-[1.5px_1.2px_1.2px_rgba(255,255,255,0.8)]"
        >
          VS
        </div>
        <div class="absolute text-7xl font-bold custom-spin-scale blur-xl z-0">
          VS
        </div>
      </div>
      <div class="border border-gray-300 rounded-md px-4 pb-2 shadow-xl shadow-sky-500 ml-5 w-3/5">
        <p class="text-center text-sky-300 font-bold text-4xl">
          <slot name="right-header" />
        </p>
        <slot name="right" />
      </div>
    </div>
    <div>
      <slot name="footer" />
    </div>
  </div>
</template>
<style scoped>
@keyframes customSpinScale {
  0% {
    transform: rotate(0deg) scale(1);
    color: rgb(20 184 166);
  }
  20% {
    transform: rotate(90deg) scale(1.5);
    color: rgb(14 165 233); 
  }
  40% {
    transform: rotate(180deg) scale(1.25);
    color: rgb(20 184 166); 
  }
  60% {
    transform: rotate(270deg) scale(1.75);
    color: rgb(14 165 233); 
  }
  80% {
    transform: rotate(360deg) scale(1.5);
    color: rgb(20 184 166); 
  }
  100% {
    transform: rotate(360deg) scale(1);
    color: rgb(14 165 233);
  }
}

.custom-spin-scale {
  animation: customSpinScale 5s linear infinite; /* 5秒で1回転、一定の速度でループ */
}
</style>
