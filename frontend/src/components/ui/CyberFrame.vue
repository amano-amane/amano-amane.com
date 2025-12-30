<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'default' | 'neon' | 'hud';
  glowColor?: 'pink' | 'cyan' | 'purple';
}>(), {
  variant: 'default',
  glowColor: 'cyan',
});
</script>

<template>
  <div
    class="cyber-frame"
    :class="[
      `cyber-frame--${variant}`,
      `cyber-frame--glow-${glowColor}`
    ]"
  >
    <div class="cyber-frame__corner cyber-frame__corner--tl" />
    <div class="cyber-frame__corner cyber-frame__corner--tr" />
    <div class="cyber-frame__corner cyber-frame__corner--bl" />
    <div class="cyber-frame__corner cyber-frame__corner--br" />
    <div class="cyber-frame__scanline" />
    <div class="cyber-frame__content">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.cyber-frame {
  position: relative;
  padding: $spacing-lg;
  background: rgba($color-cyber-navy, 0.9);
  border: 1px solid rgba($color-electric-cyan, 0.3);
  overflow: hidden;

  &--glow-pink {
    --glow-color: #{$color-mem-pink};
    border-color: rgba($color-mem-pink, 0.3);
  }

  &--glow-cyan {
    --glow-color: #{$color-electric-cyan};
    border-color: rgba($color-electric-cyan, 0.3);
  }

  &--glow-purple {
    --glow-color: #{$color-neon-purple};
    border-color: rgba($color-neon-purple, 0.3);
  }

  &__corner {
    position: absolute;
    width: 20px;
    height: 20px;
    border-color: var(--glow-color);
    border-style: solid;
    border-width: 0;

    &--tl {
      top: -1px;
      left: -1px;
      border-top-width: 3px;
      border-left-width: 3px;
    }

    &--tr {
      top: -1px;
      right: -1px;
      border-top-width: 3px;
      border-right-width: 3px;
    }

    &--bl {
      bottom: -1px;
      left: -1px;
      border-bottom-width: 3px;
      border-left-width: 3px;
    }

    &--br {
      bottom: -1px;
      right: -1px;
      border-bottom-width: 3px;
      border-right-width: 3px;
    }
  }

  &__scanline {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--glow-color), transparent);
    opacity: 0.5;
    animation: scanline 3s linear infinite;
  }

  &__content {
    position: relative;
    z-index: 1;
  }

  &--neon {
    box-shadow:
      0 0 10px rgba(var(--glow-color), 0.3),
      inset 0 0 20px rgba(var(--glow-color), 0.1);

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        135deg,
        transparent 0%,
        rgba(var(--glow-color), 0.05) 50%,
        transparent 100%
      );
    }
  }

  &--hud {
    clip-path: polygon(
      0 10px,
      10px 0,
      calc(100% - 10px) 0,
      100% 10px,
      100% calc(100% - 10px),
      calc(100% - 10px) 100%,
      10px 100%,
      0 calc(100% - 10px)
    );

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background:
        repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba($color-electric-cyan, 0.03) 2px,
          rgba($color-electric-cyan, 0.03) 4px
        );
    }
  }
}

@keyframes scanline {
  0% {
    top: 0;
    opacity: 0.5;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    top: 100%;
    opacity: 0.5;
  }
}
</style>
