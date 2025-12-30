<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
import HeroSection from '@/components/sections/HeroSection.vue';
import AboutSection from '@/components/sections/AboutSection.vue';
import WorksSection from '@/components/sections/WorksSection.vue';
import SkillsSection from '@/components/sections/SkillsSection.vue';
import LinksSection from '@/components/sections/LinksSection.vue';
import ContactSection from '@/components/sections/ContactSection.vue';
</script>

<template>
  <AppHeader />
  <main>
    <HeroSection />
    <AboutSection />
    <WorksSection />
    <SkillsSection />
    <LinksSection />
    <ContactSection />
  </main>
  <AppFooter />
</template>

<style lang="scss">
// Global styles are imported in main.ts
</style>
