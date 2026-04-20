<template>
  <footer id="footer" class="border-t border-white/8 pb-12 pt-16">
    <div class="section-shell">
      <div class="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <RevealBlock>
          <div class="max-w-2xl">
            <div class="eyebrow-pill mb-6">YesYeah · AI 编码中转工作台</div>
            <h2 class="font-display text-4xl font-semibold leading-[1.42] tracking-[0.008em] text-ink-100 sm:text-5xl">
              一条域名、一把 Key，
              统一接入主流编码模型。
            </h2>
            <p class="mt-6 text-[1.02rem] leading-[2] tracking-[0.008em] text-ink-300">
              首页负责品牌说明与接入指引，控制台负责日常操作与用量追踪。
              后续扩展文档页、状态页或动态价格源时，也无需改动现有控制台逻辑。
            </p>
          </div>
        </RevealBlock>

        <RevealBlock :delay="100">
          <div class="grid gap-8 sm:grid-cols-3 lg:grid-cols-2">
            <div v-for="group in groups" :key="group.title">
              <h3 class="text-sm font-medium tracking-[0.08em] text-ink-500">{{ group.title }}</h3>
              <div class="mt-4 flex flex-col gap-3">
                <a
                  v-for="link in group.links"
                  :key="`${group.title}-${link.label}`"
                  :href="link.href"
                  class="text-sm leading-[1.9] tracking-[0.008em] text-ink-300 transition-colors duration-300 hover:text-ember-400"
                >
                  {{ link.label }}
                </a>
              </div>
            </div>
          </div>
        </RevealBlock>
      </div>

      <div class="mt-14 flex flex-col gap-4 border-t border-white/8 pt-8 text-sm text-ink-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 YesYeah. All rights reserved.</p>
        <div class="font-mono tracking-[0.08em] text-ink-600">
          首页 landing · 控制台 /login · API /v1/* · Anthropic /anthropic/*
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { FooterGroup } from '@/data/content'
import RevealBlock from '@/components/RevealBlock.vue'

defineProps<{
  groups: FooterGroup[]
}>()
</script>
