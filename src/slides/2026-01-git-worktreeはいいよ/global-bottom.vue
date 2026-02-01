<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed, ref, watch } from 'vue'

/**
 * Glow effect system with blurred polygons
 * Based on antfu's implementation, customized with mint green theme
 *
 * Frontmatter properties:
 * - glow: 'left' | 'right' | 'top' | 'bottom' | 'full' | 'center'
 * - glowOpacity: number (default: 0.4)
 * - glowHue: number (default: 0)
 */

const { currentSlideRoute } = useNav()

type Range = [number, number]

type Distribution =
  | 'full'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'center'

const formatter = computed(() => (currentSlideRoute.value.meta?.slide as any)?.frontmatter || {})
const distribution = computed(() => (formatter.value.glow || 'full') as Distribution)
const opacity = computed<number>(() => +(formatter.value.glowOpacity || 0.4))
const hue = computed<number>(() => +(formatter.value.glowHue || 0))

const overflow = 0.3
const disturb = 0.3
const disturbChance = 0.3

// Simple seeded random number generator
function mulberry32(seed: number) {
  return function() {
    let t = seed += 0x6D2B79F5
    t = Math.imul(t ^ t >>> 15, t | 1)
    t ^= t + Math.imul(t ^ t >>> 7, t | 61)
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash)
}

function distributionToLimits(dist: Distribution) {
  const min = -0.2
  const max = 1.2
  let x: Range = [min, max]
  let y: Range = [min, max]

  function intersection(a: Range, b: Range): Range {
    return [Math.max(a[0], b[0]), Math.min(a[1], b[1])]
  }

  const limits = dist.split('-')

  for (const limit of limits) {
    switch (limit) {
      case 'top':
        y = intersection(y, [min, 0.6])
        break
      case 'bottom':
        y = intersection(y, [0.4, max])
        break
      case 'left':
        x = intersection(x, [min, 0.6])
        break
      case 'right':
        x = intersection(x, [0.4, max])
        break
      case 'xcenter':
        x = intersection(x, [0.25, 0.75])
        break
      case 'ycenter':
        y = intersection(y, [0.25, 0.75])
        break
      case 'center':
        x = intersection(x, [0.25, 0.75])
        y = intersection(y, [0.25, 0.75])
        break
      case 'full':
        x = intersection(x, [0, 1])
        y = intersection(y, [0, 1])
        break
      default:
        break
    }
  }

  return { x, y }
}

function distance2([x1, y1]: Range, [x2, y2]: Range) {
  return (x2 - x1) ** 2 + (y2 - y1) ** 2
}

function usePoly(number = 16, offset = 0) {
  function getPoints(): Range[] {
    const limits = distributionToLimits(distribution.value)
    const seedNum = hashString(`slide-${currentSlideRoute.value.no}-${offset}`)
    const rng = mulberry32(seedNum)

    function randomBetween([a, b]: Range) {
      return rng() * (b - a) + a
    }
    function applyOverflow(random: number, overflowVal: number) {
      random = random * (1 + overflowVal * 2) - overflowVal
      return rng() < disturbChance ? random + (rng() - 0.5) * disturb : random
    }
    return Array.from({ length: number })
      .fill(0)
      .map((): Range => [
        applyOverflow(randomBetween(limits.x), overflow),
        applyOverflow(randomBetween(limits.y), overflow),
      ])
  }

  const points = ref<Range[]>(getPoints())
  const poly = computed(() => points.value.map(([x, y]) => `${x * 100}% ${y * 100}%`).join(', '))

  function jumpPoints() {
    const newPoints = new Set(getPoints())
    points.value = points.value.map((o): Range => {
      let minDistance = Number.POSITIVE_INFINITY
      let closest: Range = o
      for (const n of newPoints) {
        const d = distance2(o, n)
        if (d < minDistance) {
          minDistance = d
          closest = n
        }
      }
      newPoints.delete(closest)
      return closest
    })
  }

  watch(currentSlideRoute, () => {
    jumpPoints()
  })

  return poly
}

const poly1 = usePoly(10, 1)
const poly2 = usePoly(6, 2)
const poly3 = usePoly(3, 3)
</script>

<template>
  <div
    class="bg transform-gpu overflow-hidden pointer-events-none"
    :style="{ filter: `blur(70px) hue-rotate(${hue}deg)` }"
    aria-hidden="true"
  >
    <!-- Green gradient -->
    <div
      class="clip bg-gradient-to-r from-[#22c55e] to-white/10"
      :style="{ 'clip-path': `polygon(${poly1})`, opacity }"
    />
    <!-- Teal gradient -->
    <div
      class="clip bg-gradient-to-l from-[#14b8a6] to-white/10"
      :style="{ 'clip-path': `polygon(${poly2})`, opacity }"
    />
    <!-- Cyan gradient -->
    <div
      class="clip bg-gradient-to-t from-[#06b6d4] to-white/10"
      :style="{ 'clip-path': `polygon(${poly3})`, opacity: 0.2 }"
    />
  </div>
</template>

<style scoped>
.bg,
.clip {
  transition: all 2.5s ease;
}

.bg {
  position: absolute;
  inset: 0;
  z-index: -10;
}

.clip {
  clip-path: circle(75%);
  aspect-ratio: 16 / 9;
  position: absolute;
  inset: 0;
}

.light .clip {
  opacity: 1 !important;
}
</style>
