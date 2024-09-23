<script setup>
import { defineProps , computed} from 'vue'
import SkillIcons from './skil.json'
const props = defineProps({
  skill: String
})

const skillData = computed(() => SkillIcons[props.skill] || { name: 'Unknown', logo: '', class: '' })
</script>

<template>
  <img :src="skillData.logo" :alt="skillData.name" :class="skillData.class" class="size-7">
</template>
