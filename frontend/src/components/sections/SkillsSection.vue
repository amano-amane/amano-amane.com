<script setup lang="ts">
import { computed } from 'vue';
import type { Component } from 'vue';
import { skills, skillCategoryLabels } from '@/data/skills';
import SkillIcon from '@/components/ui/SkillIcon.vue';
import { PhGameController, PhPaintBrush, PhGlobe } from '@phosphor-icons/vue';

const skillsByCategory = computed(() => {
  const categories = ['game-dev', 'illustration', 'web-dev'];
  return categories.map(category => ({
    category,
    label: skillCategoryLabels[category],
    skills: skills.filter(s => s.category === category),
  })).filter(group => group.skills.length > 0);
});

const categoryIcons: Record<string, Component> = {
  'game-dev': PhGameController,
  illustration: PhPaintBrush,
  'web-dev': PhGlobe,
};
</script>

<template>
  <section id="skills" class="skills section">
    <div class="skills__container container">
      <h2 class="skills__heading">
        <span class="skills__heading-en">Skills</span>
        <span class="skills__heading-jp">スキル</span>
      </h2>

      <div class="skills__categories">
        <div
          v-for="(group, index) in skillsByCategory"
          :key="group.category"
          class="skills__category"
        >
          <div class="skills__category-header">
            <component
              :is="categoryIcons[group.category]"
              class="skills__category-icon"
              weight="duotone"
            />
            <h3 class="skills__category-title">{{ group.label }}</h3>
            <div class="skills__category-line" />
          </div>
          <div class="skills__grid">
            <SkillIcon
              v-for="skill in group.skills"
              :key="skill.id"
              :skill="skill"
              :style="{ '--delay': `${index * 0.1}s` }"
              class="skills__item"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.skills {
  background: $color-cyber-navy;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 10% 20%, rgba($color-mem-pink, 0.1) 0%, transparent 40%),
      radial-gradient(circle at 90% 80%, rgba($color-electric-cyan, 0.1) 0%, transparent 40%);
  }

  &__container {
    position: relative;
    z-index: 1;
  }

  &__heading {
    text-align: center;
    margin-bottom: $spacing-3xl;

    &-en {
      display: block;
      font-family: $font-accent;
      font-size: clamp(40px, 8vw, 64px);
      font-weight: $font-weight-bold;
      background: linear-gradient(135deg, $color-cyber-yellow, $color-glitch-green);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1.1;
    }

    &-jp {
      display: block;
      font-family: $font-heading;
      font-size: $font-size-body;
      color: $color-medium;
      margin-top: $spacing-xs;
    }
  }

  &__categories {
    display: flex;
    flex-direction: column;
    gap: $spacing-3xl;
  }

  &__category {
    &-header {
      display: flex;
      align-items: center;
      gap: $spacing-md;
      margin-bottom: $spacing-lg;
    }

    &-icon {
      width: 28px;
      height: 28px;
      color: #A2EF40;
      filter: drop-shadow(0 0 8px rgba(#A2EF40, 0.5));
    }

    &-title {
      font-family: $font-heading;
      font-size: $font-size-h3;
      color: $color-soft-white;
      margin: 0;
      white-space: nowrap;

      @include mobile {
        font-size: $font-size-h3-mobile;
      }
    }

    &-line {
      flex: 1;
      height: 1px;
      background: linear-gradient(90deg, rgba($color-electric-cyan, 0.5), transparent);
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: $spacing-md;

    @include mobile {
      grid-template-columns: 1fr;
    }
  }

  &__item {
    animation: fade-in-up 0.5s ease-out backwards;
    animation-delay: var(--delay);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
