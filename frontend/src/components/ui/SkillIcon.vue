<script setup lang="ts">
import type { Skill } from '@/types';
import type { Component } from 'vue';
import {
  PhGameController,
  PhLightbulb,
  PhPencilSimple,
  PhCloud,
  PhCode,
  PhShieldCheck,
} from '@phosphor-icons/vue';

const props = defineProps<{
  skill: Skill;
}>();

const iconMap: Record<string, Component> = {
  godot: PhGameController,
  algorithm: PhLightbulb,
  'clip-studio': PhPencilSimple,
  aws: PhCloud,
  vuejs: PhCode,
  security: PhShieldCheck,
};

const iconComponent = iconMap[props.skill.id] || PhCode;
</script>

<template>
  <div class="skill-icon">
    <div class="skill-icon__badge">
      <component :is="iconComponent" class="skill-icon__icon" weight="duotone" />
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

    .skill-icon__icon {
      color: $color-mem-pink;
    }
  }

  &__badge {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba($color-mem-pink, 0.1), rgba($color-electric-cyan, 0.1));
    border-radius: $radius-md;
    flex-shrink: 0;
  }

  &__icon {
    width: 28px;
    height: 28px;
    color: $color-electric-cyan;
    transition: color $transition-fast;
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
