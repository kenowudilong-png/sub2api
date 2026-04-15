<template>
  <div class="app-shell">
    <div class="noise-layer"></div>
    <div class="grid-layer"></div>
    <div class="backdrop-glow backdrop-glow--primary"></div>
    <div class="backdrop-glow backdrop-glow--secondary"></div>

    <Navbar :links="navLinks" />

    <main class="relative z-10">
      <Hero :metrics="heroMetrics" />
      <Features :items="features" />
      <Tools :items="tools" />
      <Pricing :rows="pricingRows" />
      <Plans :plans="planTiers" />
    </main>

    <Footer :groups="footerGroups" />
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/sections/Navbar.vue'
import Hero from '@/sections/Hero.vue'
import Features from '@/sections/Features.vue'
import Tools from '@/sections/Tools.vue'
import Pricing from '@/sections/Pricing.vue'
import Plans from '@/sections/Plans.vue'
import Footer from '@/sections/Footer.vue'
import { features, footerGroups, heroMetrics, navLinks, planTiers, pricingRows, tools } from '@/data/content'
</script>
