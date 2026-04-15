<template>
  <section id="tools" class="section-shell py-24 sm:py-28">
    <RevealBlock>
      <div class="section-header">
        <div class="eyebrow">快速接入</div>
        <h2 class="section-title">复制、粘贴、开始编码</h2>
        <p class="section-copy">
          每个工具只需要一段环境变量。复制下面的模板，替换你的 Key，立即可用。
        </p>
      </div>
    </RevealBlock>

    <div class="mt-12 grid gap-6 xl:grid-cols-2">
      <RevealBlock v-for="(tool, index) in items" :key="tool.name" :delay="index * 90">
        <article class="tool-card">
          <div class="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <div class="eyebrow-pill inline-flex">{{ tool.tag }}</div>
              <h3 class="mt-5 text-[1.98rem] font-display font-semibold leading-[1.42] tracking-[0.008em] text-ink-100">{{ tool.name }}</h3>
              <p class="mt-4 max-w-xl text-[1.02rem] leading-[2] tracking-[0.008em] text-ink-300">
                {{ tool.summary }}
              </p>
            </div>
            <div class="tool-monogram">{{ tool.name.slice(0, 2).toUpperCase() }}</div>
          </div>

          <div class="mt-8">
            <CodeBlock :label="tool.setupLabel" :title="tool.name" :code="tool.snippet" />
          </div>

          <p class="mt-5 max-w-[40rem] text-sm leading-[1.9] tracking-[0.008em] text-ink-500">
            {{ tool.note }}
          </p>
        </article>
      </RevealBlock>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ToolItem } from '@/data/content'
import CodeBlock from '@/components/CodeBlock.vue'
import RevealBlock from '@/components/RevealBlock.vue'

defineProps<{
  items: ToolItem[]
}>()
</script>
