<template>
  <div
    ref="root"
    class="reveal-block"
    :class="{ 'reveal-ready': initialized, 'reveal-visible': visible }"
    :style="{ transitionDelay: `${delay}ms` }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    delay?: number
  }>(),
  {
    delay: 0
  }
)

const root = ref<HTMLElement | null>(null)
const initialized = ref(false)
const visible = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  initialized.value = true

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          visible.value = true
          observer?.disconnect()
          observer = null
        }
      }
    },
    {
      threshold: 0.18,
      rootMargin: '0px 0px -12% 0px'
    }
  )

  if (root.value) {
    observer.observe(root.value)
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})
</script>
