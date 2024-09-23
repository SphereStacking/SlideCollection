<template>
{{ companyName2 }}
</template>
  
<script setup>
import { computed } from 'vue';
const companyName2 = computed(() => import.meta.env.VITE_COMPANY_NAME_2 ?? '某 中小企業DX支援SaaS企業');
</script>
