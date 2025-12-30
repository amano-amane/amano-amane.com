<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  variant?: 'hero' | 'default';
  density?: 'low' | 'medium' | 'high';
}>(), {
  variant: 'default',
  density: 'medium',
});

interface Decoration {
  id: number;
  type: 'circle' | 'star' | 'dot' | 'ring' | 'sparkle';
  size: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
  color: string;
}

const colors = ['#FF6B9D', '#00D4FF', '#A855F7', '#4ADE80'];

const decorations = computed<Decoration[]>(() => {
  const count = props.density === 'low' ? 8 : props.density === 'high' ? 20 : 12;
  const items: Decoration[] = [];

  const types: Decoration['type'][] = ['circle', 'star', 'dot', 'ring', 'sparkle'];

  for (let i = 0; i < count; i++) {
    const typeIndex = i % types.length;
    const colorIndex = i % colors.length;
    items.push({
      id: i,
      type: types[typeIndex] as Decoration['type'],
      size: 8 + Math.random() * 24,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 4,
      color: colors[colorIndex] as string,
    });
  }
  return items;
});
</script>

<template>
  <div class="floating-decorations" :class="`floating-decorations--${variant}`">
    <div
      v-for="deco in decorations"
      :key="deco.id"
      class="floating-decorations__item"
      :class="`floating-decorations__item--${deco.type}`"
      :style="{
        '--size': `${deco.size}px`,
        '--x': `${deco.x}%`,
        '--y': `${deco.y}%`,
        '--delay': `${deco.delay}s`,
        '--duration': `${deco.duration}s`,
        '--color': deco.color,
      }"
    />
  </div>
</template>

<style scoped lang="scss">
.floating-decorations {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;

  &__item {
    position: absolute;
    left: var(--x);
    top: var(--y);
    width: var(--size);
    height: var(--size);
    animation: float var(--duration) ease-in-out infinite;
    animation-delay: var(--delay);
    opacity: 0.6;

    &--circle {
      background: var(--color);
      border-radius: 50%;
    }

    &--dot {
      background: var(--color);
      border-radius: 50%;
      width: calc(var(--size) * 0.5);
      height: calc(var(--size) * 0.5);
    }

    &--ring {
      border: 2px solid var(--color);
      border-radius: 50%;
      background: transparent;
    }

    &--star {
      background: var(--color);
      clip-path: polygon(
        50% 0%,
        61% 35%,
        98% 35%,
        68% 57%,
        79% 91%,
        50% 70%,
        21% 91%,
        32% 57%,
        2% 35%,
        39% 35%
      );
    }

    &--sparkle {
      background: var(--color);
      clip-path: polygon(
        50% 0%,
        55% 40%,
        100% 50%,
        55% 60%,
        50% 100%,
        45% 60%,
        0% 50%,
        45% 40%
      );
      animation: float var(--duration) ease-in-out infinite,
                 sparkle 2s ease-in-out infinite;
      animation-delay: var(--delay);
    }
  }

  &--hero {
    .floating-decorations__item {
      opacity: 0.4;
    }
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-15px) rotate(5deg);
  }
  50% {
    transform: translateY(-25px) rotate(0deg);
  }
  75% {
    transform: translateY(-10px) rotate(-5deg);
  }
}

@keyframes sparkle {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

@media (prefers-reduced-motion: reduce) {
  .floating-decorations__item {
    animation: none;
  }
}
</style>
