<template>
{{ companyName1 }}
</template>
    
<script setup>
import { computed } from 'vue';
const companyName1 = computed(() => import.meta.env.VITE_COMPANY_NAME_1 ?? '某 宇宙地上システム エンジニアリング企業');
</script>
    