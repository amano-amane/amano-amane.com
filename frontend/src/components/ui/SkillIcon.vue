<script setup lang="ts">
import type { Skill } from '@/types';
import { PhLightbulb, PhShieldCheck, PhCode, PhPaperclip } from '@phosphor-icons/vue';

// Brand SVG icons
import godotIcon from '@/assets/icons/godot.svg?raw';
import awsIcon from '@/assets/icons/aws.svg?raw';
import vuejsIcon from '@/assets/icons/vuejs.svg?raw';

const props = defineProps<{
  skill: Skill;
}>();

// SVG icons (brand logos)
const svgIcons: Record<string, string> = {
  godot: godotIcon,
  aws: awsIcon,
  vuejs: vuejsIcon,
};

// Phosphor icons (generic)
const phosphorIcons: Record<string, typeof PhCode> = {
  algorithm: PhLightbulb,
  security: PhShieldCheck,
  'clip-studio': PhPaperclip,
};

const hasSvgIcon = props.skill.id in svgIcons;
const hasPhosphorIcon = props.skill.id in phosphorIcons;
const phosphorIcon = phosphorIcons[props.skill.id] || PhCode;
</script>

<template>
  <div class="skill-icon">
    <div class="skill-icon__badge">
      <span v-if="hasSvgIcon" class="skill-icon__svg" v-html="svgIcons[skill.id]" />
      <component v-else :is="phosphorIcon" class="skill-icon__icon" weight="duotone" />
    </div>
    <div class="skill-icon__info">
      <span class="skill-icon__name">{{ skill.name }}</span>
      <span v-if="skill.note" class="skill-icon__note">{{ skill.note }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.skill-icon {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  padding: $spacing-md;
  background: white;
  border-radius: $radius-md;
  transition: all $transition-fast;
  box-shadow: $shadow-sm;

  &:hover {
    transform: translateY(-2px);
    box-shadow: $shadow-md;

    .skill-icon__icon,
    .skill-icon__svg :deep(svg) {
      color: $color-mem-pink;
      fill: $color-mem-pink;
    }
  }

  &__badge {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba($color-cyber-navy, 0.05);
    border-radius: $radius-md;
    flex-shrink: 0;
  }

  &__icon {
    width: 28px;
    height: 28px;
    color: #0099BB;
    transition: color $transition-fast;
  }

  &__svg {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;

    :deep(svg) {
      width: 100%;
      height: 100%;
      fill: #0099BB;
      transition: fill $transition-fast;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  &__name {
    font-family: $font-heading;
    font-weight: $font-weight-medium;
    color: $color-cyber-navy;
    font-size: $font-size-body;
  }

  &__note {
    font-size: $font-size-small;
    color: $color-medium;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
