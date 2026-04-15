<template>
  <section id="features" class="section-shell py-24 sm:py-28">
    <RevealBlock>
      <div class="section-header">
        <div class="eyebrow">为什么选择 YesYeah</div>
        <h2 class="section-title">减少配置复杂度，让你专注写代码</h2>
        <p class="section-copy">
          不同的 CLI、IDE 和模型厂商各有一套接入方式。YesYeah 把它们收拢到一个域名、一把 Key 背后，
          该用什么模型就用什么模型，不必在配置文件之间来回切换。
        </p>
      </div>
    </RevealBlock>

    <div class="mt-12 grid gap-6 lg:grid-cols-2">
      <RevealBlock v-for="(item, index) in items" :key="item.id" :delay="index * 90">
        <article class="feature-card">
          <div class="flex items-start justify-between gap-6">
            <div>
              <div class="feature-symbol">{{ item.symbol }}</div>
              <div class="mt-6 flex items-center gap-3">
                <span class="feature-index">{{ item.id }}</span>
                <h3 class="text-[1.88rem] font-display font-semibold leading-[1.42] tracking-[0.008em] text-ink-100">{{ item.title }}</h3>
              </div>
            </div>
          </div>
          <p class="mt-6 max-w-[30rem] text-[1.02rem] leading-[2] tracking-[0.008em] text-ink-300">
            {{ item.description }}
          </p>
          <div class="feature-bullet">
            {{ item.bullet }}
          </div>
        </article>
      </RevealBlock>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { FeatureItem } from '@/data/content'
import RevealBlock from '@/components/RevealBlock.vue'

defineProps<{
  items: FeatureItem[]
}>()
</script>
