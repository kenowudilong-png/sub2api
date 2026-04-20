<template>
  <section id="hero" class="section-shell relative overflow-hidden pb-24 pt-16 sm:pb-32 sm:pt-20">
    <div class="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[38rem] bg-hero-glow"></div>
    <div class="grid items-center gap-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
      <RevealBlock>
        <div class="max-w-[42rem]">
          <div class="eyebrow-pill mb-7">
            Unified Relay for Claude Code, Codex & Gemini CLI
          </div>
          <h1 class="hero-title">
            一条稳定线路，统一承载
            <span class="hero-title__accent">Claude Code、Codex 和 Gemini CLI</span>
          </h1>
          <p class="hero-copy">
            无论个人开发还是团队协作，YesYeah 用一个域名、一把 Key 接入主流编码模型。
            统一配置方式、计费视图与使用体验，更快开始、更稳运行，也更清晰掌握每一次调用成本。
          </p>
          <div class="mt-11 flex flex-col gap-4 sm:flex-row">
            <a href="/login" class="btn btn-primary justify-center sm:justify-start">立即体验</a>
            <a href="#tools" class="btn btn-secondary justify-center sm:justify-start">查看接入方式</a>
          </div>
          <div class="hero-metrics">
            <CountUp
              v-for="metric in metrics"
              :key="metric.label"
              :value="metric.value"
              :suffix="metric.suffix"
              :label="metric.label"
              :detail="metric.detail"
            />
          </div>
        </div>
      </RevealBlock>

      <RevealBlock :delay="120">
        <div class="relative">
          <div class="orb orb-large"></div>
          <div class="orb orb-small"></div>
          <div class="hero-terminal">
            <div class="hero-terminal__top">
              <div class="flex items-center gap-2">
                <span class="dot bg-[#ff5f57]"></span>
                <span class="dot bg-[#ffbd2e]"></span>
                <span class="dot bg-[#28c840]"></span>
              </div>
              <div class="text-xs tracking-[0.12em] text-ink-500">架构分流</div>
            </div>

            <div class="space-y-5 p-6">
              <div>
                <div class="terminal-label">导航页</div>
                <div class="terminal-card">
                  <p class="font-display text-[1.75rem] leading-[1.42] tracking-[0.008em] text-ink-100">品牌、接入说明与计费参考</p>
                  <p class="mt-3 text-sm leading-[1.9] tracking-[0.008em] text-ink-400">
                    访客首先看到专业的品牌官网，而不是开源框架默认页。接入模板、计费口径和合作入口一目了然。
                  </p>
                </div>
              </div>

              <div class="grid gap-4 sm:grid-cols-2">
                <div class="terminal-card">
                  <div class="terminal-label">根路径</div>
                  <div class="mt-3 font-mono text-xs leading-7 text-ember-400">
                    GET /
                    <br />
                    -> yesyeah-landing
                  </div>
                </div>
                <div class="terminal-card">
                  <div class="terminal-label">控制台入口</div>
                  <div class="mt-3 font-mono text-xs leading-7 text-ink-200">
                    /login
                    <br />
                    /dashboard
                    <br />
                    /admin/*
                  </div>
                </div>
              </div>

              <div class="terminal-card">
                <div class="terminal-label">路径说明</div>
                <div class="mt-3 grid gap-3">
                  <div class="route-row">
                    <span>/landing-assets/*</span>
                    <span>导航页静态资源</span>
                  </div>
                  <div class="route-row">
                    <span>/v1/*</span>
                    <span>OpenAI 兼容 API 入口</span>
                  </div>
                  <div class="route-row">
                    <span>/anthropic/*</span>
                    <span>Anthropic 协议入口</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealBlock>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { HeroMetric } from '@/data/content'
import CountUp from '@/components/CountUp.vue'
import RevealBlock from '@/components/RevealBlock.vue'

defineProps<{
  metrics: HeroMetric[]
}>()
</script>
