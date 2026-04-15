<template>
  <section id="plans" class="section-shell py-24 sm:py-28">
    <RevealBlock>
      <div class="section-header">
        <div class="eyebrow">方案与定价</div>
        <h2 class="section-title">选择适合你的合作方式，随时可以升级</h2>
        <p class="section-copy">
          从按量充值到团队包月再到企业定制，按你的实际用量和协作规模选择。
          所有方案共享同一套控制台和 API 入口。
        </p>
      </div>
    </RevealBlock>

    <div class="mt-12 grid gap-6 xl:grid-cols-3">
      <RevealBlock v-for="(plan, index) in plans" :key="plan.name" :delay="index * 90">
        <article
          class="plan-card"
          :class="{
            'plan-card--featured': plan.badge,
            'plan-card--warm': plan.accent === 'ember'
          }"
        >
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-xs tracking-[0.12em] text-ink-500">{{ plan.name }}</p>
              <h3 class="mt-4 text-[2rem] font-display font-semibold leading-[1.42] tracking-[0.008em] text-ink-100">{{ plan.price }}</h3>
            </div>
            <span v-if="plan.badge" class="badge-pill">{{ plan.badge }}</span>
          </div>
          <p class="mt-5 text-[1.02rem] leading-[2] tracking-[0.008em] text-ink-300">{{ plan.description }}</p>
          <ul class="mt-8 space-y-3">
            <li v-for="bullet in plan.bullets" :key="bullet" class="plan-bullet">
              {{ bullet }}
            </li>
          </ul>
          <a :href="plan.ctaHref" class="btn mt-10 w-full justify-center" :class="plan.badge ? 'btn-primary' : 'btn-secondary'">
            {{ plan.ctaLabel }}
          </a>
        </article>
      </RevealBlock>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { PlanTier } from '@/data/content'
import RevealBlock from '@/components/RevealBlock.vue'

defineProps<{
  plans: PlanTier[]
}>()
</script>
