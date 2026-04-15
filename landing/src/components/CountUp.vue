<template>
  <div ref="root" class="space-y-2.5">
    <div class="font-display text-[2rem] font-semibold tracking-[-0.02em] text-ink-100 sm:text-[2.6rem]">
      {{ prefix }}{{ displayValue }}{{ suffix }}
    </div>
    <div class="text-[13px] font-medium tracking-[0.08em] text-ember-400/90">
      {{ label }}
    </div>
    <p class="max-w-[15rem] text-sm leading-[1.9] tracking-[0.008em] text-ink-400">
      {{ detail }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    value: number
    label: string
    detail: string
    prefix?: string
    suffix?: string
    duration?: number
  }>(),
  {
    prefix: '',
    suffix: '',
    duration: 1500
  }
)

const root = ref<HTMLElement | null>(null)
const current = ref(0)
const started = ref(false)
let observer: IntersectionObserver | null = null
let frame = 0

const displayValue = computed(() => Math.round(current.value).toLocaleString('zh-CN'))

function animateValue(startTime: number, from: number) {
  const tick = (timestamp: number) => {
    const progress = Math.min((timestamp - startTime) / props.duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    current.value = from + (props.value - from) * eased

    if (progress < 1) {
      frame = window.requestAnimationFrame(tick)
    } else {
      current.value = props.value
    }
  }

  frame = window.requestAnimationFrame(tick)
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !started.value) {
          started.value = true
          animateValue(performance.now(), current.value)
          observer?.disconnect()
          observer = null
        }
      }
    },
    { threshold: 0.4 }
  )

  if (root.value) {
    observer.observe(root.value)
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
  window.cancelAnimationFrame(frame)
})
</script>
