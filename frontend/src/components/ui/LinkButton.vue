<script setup lang="ts">
import type { SocialLink } from '@/types';
import { PhXLogo, PhGithubLogo, PhLink } from '@phosphor-icons/vue';

defineProps<{
  link: SocialLink;
}>();

const iconComponents = {
  twitter: PhXLogo,
  github: PhGithubLogo,
  default: PhLink,
};
</script>

<template>
  <a
    :href="link.url"
    target="_blank"
    rel="noopener noreferrer"
    class="link-button"
    :class="{ 'link-button--disabled': !link.isActive }"
  >
    <span class="link-button__icon">
      <component
        :is="iconComponents[link.icon as keyof typeof iconComponents] || iconComponents.default"
        weight="bold"
        :size="28"
      />
    </span>
    <span class="link-button__name">{{ link.name }}</span>
    <span v-if="!link.isActive" class="link-button__badge">準備中</span>
  </a>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.link-button {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  padding: $spacing-lg $spacing-xl;
  background: white;
  border-radius: $radius-lg;
  text-decoration: none;
  color: $color-cyber-navy;
  box-shadow: $shadow-md;
  transition: all $transition-base;
  position: relative;

  &:hover:not(.link-button--disabled) {
    transform: translateY(-4px);
    box-shadow: $shadow-lg, $shadow-glow-cyan;
    color: $color-cyber-navy;
  }

  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }

  &__icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $color-cyber-navy;
    color: $color-soft-white;
    border-radius: $radius-md;
  }

  &__name {
    font-family: $font-heading;
    font-size: 18px;
    font-weight: $font-weight-medium;
  }

  &__badge {
    position: absolute;
    top: $spacing-sm;
    right: $spacing-sm;
    font-size: 12px;
    padding: 2px $spacing-sm;
    background: $color-medium;
    color: white;
    border-radius: $radius-sm;
  }
}
</style>
