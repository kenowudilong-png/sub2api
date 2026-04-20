<template>
  <section id="pricing" class="section-shell py-24 sm:py-28">
    <RevealBlock>
      <div class="section-header">
        <div class="eyebrow">模型与计费</div>
        <h2 class="section-title">倍率跟随官方口径，价格在控制台实时维护</h2>
        <p class="section-copy">
          以下为导航页的参考计费结构。最终价格以控制台公告和后台实际倍率配置为准。
          我们承诺：不做隐性加价，输入、输出、缓存分开计量，与官方计费方式对齐。
        </p>
      </div>
    </RevealBlock>

    <RevealBlock :delay="120">
      <div class="glass-panel mt-12 overflow-hidden rounded-[1.6rem] border border-white/8">
        <div class="flex flex-col gap-3 border-b border-white/8 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="text-xs tracking-[0.12em] text-ink-500">计费参考矩阵</p>
            <p class="mt-2 max-w-[32rem] text-sm leading-[1.9] tracking-[0.008em] text-ink-300">
              当前数据为导航页参考口径，最终以控制台公告和后台实际配置为准。
            </p>
          </div>
          <a href="/dashboard" class="btn btn-secondary shrink-0">进入控制台查看完整价格</a>
        </div>

        <div class="overflow-x-auto">
          <table class="price-table min-w-[980px]">
            <thead>
              <tr>
                <th>模型 / 通道</th>
                <th>协议</th>
                <th>分组倍率</th>
                <th>输入价格</th>
                <th>输出价格</th>
                <th>对比官方</th>
                <th>备注</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in rows" :key="row.model">
                <td>
                  <div class="font-medium text-ink-100">{{ row.model }}</div>
                  <div class="mt-1 text-xs tracking-[0.08em] text-ink-500">{{ row.route }}</div>
                </td>
                <td>{{ row.route }}</td>
                <td><span class="price-chip">{{ row.multiplier }}</span></td>
                <td>{{ row.input }}</td>
                <td>{{ row.output }}</td>
                <td>{{ row.official }}</td>
                <td>{{ row.note }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </RevealBlock>
  </section>
</template>

<script setup lang="ts">
import type { PricingRow } from '@/data/content'
import RevealBlock from '@/components/RevealBlock.vue'

defineProps<{
  rows: PricingRow[]
}>()
</script>
