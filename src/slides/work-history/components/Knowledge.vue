<script setup lang="ts">
import { computed } from 'vue'
import Skills from './skil.json'
const Knowledges = [
  {
    table: 1,
    category: '言語',
    skills: [
      { ...Skills.javascript },
      { ...Skills.typescript },
      { ...Skills.php },
      { ...Skills.cs },
      { ...Skills.cpp },
      { ...Skills.html },
      { ...Skills.css },
    ],
  },
  {
    table: 1,
    category: 'FW',
    skills: [
      { ...Skills.laravel },
      { ...Skills.vue },
      { ...Skills.tailwind },
      { ...Skills.nuxt },
      { ...Skills.angular },
      { ...Skills.dotnet },
      { ...Skills.wordpress },
      { ...Skills.vuetify },
    ],
  },
  {
    table: 1,
    category: 'Laravel ecosystem',
    skills: [
      { ...Skills.forge },
      { ...Skills.sail },
      { ...Skills.jetstream },
      { ...Skills.inertia },
      { ...Skills.scout }, 
      { ...Skills.socialite },
      { ...Skills.telescope },
      { ...Skills.pint },
    ],
  },
  {
    table: 1,
    category: 'ライブラリ',
    skills: [
      { ...Skills.vueuse },
      { ...Skills.aggrid },
      { ...Skills.chartjs },
      { ...Skills.swiperjs },
      { ...Skills.fullcalendar },
      { ...Skills.tiptap },
    ],
  },
  {
    table: 1,
    category: 'フォーマッター',
    skills: [
      { ...Skills.prettier },
      { ...Skills.eslint },
      { ...Skills.phpstan },
    ],
  },
  {
    table: 1,
    category: 'データベース',
    skills: [
      { ...Skills.postgresql },
      { ...Skills.sqlserver },
    ],
  },
  {
    table: 2,
    category: 'エディター',
    skills: [
      { ...Skills.cursor },
      { ...Skills.vscode },
      { ...Skills.visualstudio },
      { ...Skills.phpstorm },
    ],
  },
  {
    table: 2,
    category: 'ツール',
    skills: [
      { ...Skills.slack },
      { ...Skills.notion },
      { ...Skills.jira },
    ],
  },
  {
    table: 2,
    category: 'バージョン管理',
    skills: [
      { ...Skills.github },
      { ...Skills.gitlab },
    ],
  },
  {
    table: 2,
    category: 'CI/CD',
    skills: [
      { ...Skills.githubactions },
    ],
  },
  {
    table: 2,
    category: 'クラウド',
    skills: [
      { ...Skills.cloudflare },
      { ...Skills.aws },
      { ...Skills.digitalocean },
    ],
  },
  {
    table: 2,
    category: 'その他',
    skills: [
      { ...Skills.nginx },
      { ...Skills.winui },
      { ...Skills.sentry },
      { ...Skills.meilisearch },
      { ...Skills.googleanalytics },
      { ...Skills.googledevelopers },
      { ...Skills.slidev },
      { ...Skills.nodejs },
      { ...Skills.openapi },
      { ...Skills.vite },
      { ...Skills.docker },
    ],
  },
]

const computedKnowledges = computed(() => { 
  return Knowledges.filter((knowledge) => knowledge.table === 1)
})
const computedKnowledges2 = computed(() => { 
  return Knowledges.filter((knowledge) => knowledge.table === 2)
})
</script>

<template>
  <table >
    <tr>
      <th class="w-1/12 ">カテゴリ</th>
      <th class="w-5/12 ">スキル</th>
      <th class="w-1/12 ">カテゴリ</th>
      <th class="w-5/12 ">スキル</th>
    </tr>
    <tr v-for="(knowledge, index) in computedKnowledges" :key="knowledge.category" class=" leading-none">
      <td class="text-xs font-bold">{{ knowledge.category }}</td>
      <td class="flex flex-wrap gap-2">
        <div v-for="skill in knowledge.skills" :key="skill.name">
          <ruby>
            <img :src="skill.logo" :alt="skill.name" :class="skill.class" class="size-7">
            <rt>{{ skill.name }}</rt>
          </ruby>
        </div>
      </td>
      <td v-if="computedKnowledges2[index]" class="text-xs font-bold">{{ computedKnowledges2[index].category }}</td>
      <td v-if="computedKnowledges2[index]" class="flex flex-wrap gap-2">
        <div v-for="skill in computedKnowledges2[index].skills" :key="skill.name">
          <ruby>
            <img :src="skill.logo" :alt="skill.name" :class="skill.class" class="size-7">
            <rt>{{ skill.name }}</rt>
          </ruby>
        </div>
      </td>
    </tr>
  </table>
</template>

<style>
.slidev-layout td, .slidev-layout th {
    padding: 0.5rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
}

.slidev-layout th {
    font-size: 1rem; /* ヘッダのテキストサイズを変更 */
}
</style>
