<template>
  <section id="quota-monitor" class="section-shell py-24 sm:py-28">
    <RevealBlock>
      <div class="section-header">
        <div class="eyebrow">{{ content.eyebrow }}</div>
        <h2 class="section-title">{{ content.title }}</h2>
        <p class="section-copy">{{ content.summary }}</p>
      </div>
    </RevealBlock>

    <div class="mt-12 grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <RevealBlock>
        <article class="monitor-hero-card">
          <div class="flex flex-wrap items-center gap-3">
            <div class="eyebrow-pill">旁挂，不替换</div>
            <div class="eyebrow-pill">管理员 / 运维专题</div>
          </div>

          <p class="mt-6 max-w-[43rem] text-[1.04rem] leading-[2] tracking-[0.008em] text-ink-200">
            {{ content.positioning }}
          </p>

          <div class="mt-8 grid gap-4 sm:grid-cols-3">
            <div v-for="signal in content.signals" :key="signal.label" class="monitor-signal-card">
              <div class="monitor-signal-value">{{ signal.value }}</div>
              <div class="mt-4 text-sm font-medium tracking-[0.04em] text-ink-100">{{ signal.label }}</div>
              <p class="mt-3 text-sm leading-[1.9] tracking-[0.008em] text-ink-400">{{ signal.detail }}</p>
            </div>
          </div>

          <div class="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              :href="content.ctaHref"
              target="_blank"
              rel="noreferrer"
              class="btn btn-primary justify-center sm:justify-start"
            >
              {{ content.ctaLabel }}
            </a>
            <p class="text-sm leading-[1.9] tracking-[0.008em] text-ink-500">
              {{ content.note }}
            </p>
          </div>
        </article>
      </RevealBlock>

      <RevealBlock :delay="100">
        <article class="monitor-summary-panel">
          <div class="flex items-center justify-between gap-4">
            <div>
              <div class="terminal-label">部署摘要</div>
              <h3 class="mt-3 font-display text-[2rem] font-semibold leading-[1.42] tracking-[0.008em] text-ink-100">
                先稳住现网，再把监控补上
              </h3>
            </div>
            <div class="monitor-badge">Quota Ops</div>
          </div>

          <div class="mt-8 space-y-4">
            <div v-for="step in content.deploymentSteps" :key="step.id" class="monitor-step-row">
              <div class="monitor-step-index">{{ step.id }}</div>
              <div>
                <div class="text-sm font-medium tracking-[0.03em] text-ink-100">{{ step.title }}</div>
                <p class="mt-2 text-sm leading-[1.9] tracking-[0.008em] text-ink-400">{{ step.detail }}</p>
              </div>
            </div>
          </div>
        </article>
      </RevealBlock>
    </div>

    <RevealBlock :delay="140">
      <div class="glass-panel mt-6 overflow-hidden rounded-[1.75rem] border border-white/8">
        <div class="flex flex-col gap-3 border-b border-white/8 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="text-xs tracking-[0.12em] text-ink-500">能力收益矩阵</p>
            <p class="mt-2 max-w-[34rem] text-sm leading-[1.9] tracking-[0.008em] text-ink-300">
              这块专题主要讲运营和实施收益：现有网关继续跑业务，Quota Monitor 只负责把余额、签到、趋势和告警收口。
            </p>
          </div>
          <div class="price-chip">Ops Only</div>
        </div>

        <div class="overflow-x-auto">
          <table class="price-table min-w-[920px]">
            <thead>
              <tr>
                <th>能力项</th>
                <th>当前方式</th>
                <th>接入 Monitor 后</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in content.capabilities" :key="item.capability">
                <td class="font-medium text-ink-100">{{ item.capability }}</td>
                <td>{{ item.current }}</td>
                <td>{{ item.withMonitor }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </RevealBlock>

    <div class="mt-6 grid gap-6 lg:grid-cols-3">
      <RevealBlock :delay="180">
        <article class="monitor-list-card">
          <div class="terminal-label">初始化清单</div>
          <h3 class="mt-3 font-display text-[1.75rem] font-semibold leading-[1.42] tracking-[0.008em] text-ink-100">
            第一次上线前先把依赖准备完整
          </h3>
          <ul class="mt-7 space-y-3">
            <li v-for="item in content.initChecklist" :key="item" class="monitor-list-item">
              {{ item }}
            </li>
          </ul>
        </article>
      </RevealBlock>

      <RevealBlock :delay="220">
        <article class="monitor-list-card monitor-list-card--alert">
          <div class="terminal-label">安全红线</div>
          <h3 class="mt-3 font-display text-[1.75rem] font-semibold leading-[1.42] tracking-[0.008em] text-ink-100">
            旁挂方案再方便，也别越过凭据边界
          </h3>
          <ul class="mt-7 space-y-3">
            <li v-for="item in content.securityRules" :key="item" class="monitor-list-item">
              {{ item }}
            </li>
          </ul>
        </article>
      </RevealBlock>

      <RevealBlock :delay="260">
        <article class="monitor-list-card">
          <div class="terminal-label">上线检查项</div>
          <h3 class="mt-3 font-display text-[1.75rem] font-semibold leading-[1.42] tracking-[0.008em] text-ink-100">
            内容交付先说明白，再进入独立部署执行
          </h3>
          <ul class="mt-7 space-y-3">
            <li v-for="item in content.launchChecklist" :key="item" class="monitor-list-item">
              {{ item }}
            </li>
          </ul>
        </article>
      </RevealBlock>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { QuotaMonitorContent } from '@/data/content'
import RevealBlock from '@/components/RevealBlock.vue'

defineProps<{
  content: QuotaMonitorContent
}>()
</script>
