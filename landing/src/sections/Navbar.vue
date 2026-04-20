<template>
  <header class="sticky top-0 z-50 border-b border-white/6 bg-ink-950/72 backdrop-blur-xl">
    <div class="section-shell flex h-20 items-center justify-between gap-4">
      <a href="#hero" class="group inline-flex items-center gap-3">
        <div class="brand-mark">
          <span>Y</span>
        </div>
        <div>
          <div class="font-display text-[1.02rem] font-semibold tracking-[0.06em] text-ink-100">YESYEAH</div>
          <div class="text-[11px] tracking-[0.12em] text-ink-500">AI 编码中转工作台</div>
        </div>
      </a>

      <nav class="hidden items-center gap-8 md:flex">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="text-sm font-medium tracking-[0.01em] text-ink-400 transition-colors duration-300 hover:text-ember-400"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="hidden items-center gap-3 md:flex">
        <a href="#tools" class="btn btn-secondary">快速接入</a>
        <a href="/login" class="btn btn-primary">登录控制台</a>
      </div>

      <button
        type="button"
        class="mobile-toggle md:hidden"
        :aria-expanded="menuOpen"
        aria-label="Toggle navigation"
        @click="menuOpen = !menuOpen"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <div v-if="menuOpen" class="border-t border-white/6 bg-ink-900/98 md:hidden">
      <div class="section-shell flex flex-col gap-2 py-4">
        <a
          v-for="link in links"
          :key="`mobile-${link.href}`"
          :href="link.href"
          class="rounded-2xl px-4 py-3 text-sm font-medium text-ink-200 transition-colors hover:bg-white/5 hover:text-ember-400"
          @click="menuOpen = false"
        >
          {{ link.label }}
        </a>
        <a href="/login" class="btn btn-primary mt-2 justify-center" @click="menuOpen = false">
          登录控制台
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { NavLink } from '@/data/content'

defineProps<{
  links: NavLink[]
}>()

const menuOpen = ref(false)
</script>
