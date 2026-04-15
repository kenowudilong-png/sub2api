<template>
  <div class="glass-panel overflow-hidden rounded-[1.35rem] border border-white/8">
    <div class="flex items-center justify-between border-b border-white/8 px-4 py-3">
      <div>
        <p class="text-[11px] font-medium tracking-[0.12em] text-ink-500">{{ label }}</p>
        <p class="mt-1 text-sm leading-7 tracking-[0.008em] text-ink-300">{{ title }}</p>
      </div>
      <button type="button" class="copy-chip" @click="copyCode">
        {{ copied ? '已复制' : '复制' }}
      </button>
    </div>
    <pre class="overflow-x-auto px-4 py-4 text-sm leading-8 text-ink-100"><code>{{ code }}</code></pre>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

const props = defineProps<{
  label: string
  title: string
  code: string
}>()

const copied = ref(false)
let timer = 0

async function copyCode() {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    window.clearTimeout(timer)
    timer = window.setTimeout(() => {
      copied.value = false
    }, 1800)
  } catch (error) {
    console.error('Failed to copy code snippet', error)
  }
}

onBeforeUnmount(() => {
  window.clearTimeout(timer)
})
</script>
