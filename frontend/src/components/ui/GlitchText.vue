<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const props = withDefaults(defineProps<{
  text: string;
  tag?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
  glitchOnHover?: boolean;
  chromatic?: boolean;
}>(), {
  tag: 'span',
  glitchOnHover: false,
  chromatic: true,
});

const isGlitching = ref(false);
let glitchTimeout: ReturnType<typeof setTimeout> | null = null;

const triggerRandomGlitch = () => {
  if (props.glitchOnHover) return;

  const delay = Math.random() * 2000 + 3000; // 3-5秒間隔
  glitchTimeout = setTimeout(() => {
    isGlitching.value = true;
    setTimeout(() => {
      isGlitching.value = false;
      triggerRandomGlitch();
    }, 150 + Math.random() * 200);
  }, delay);
};

onMounted(() => {
  triggerRandomGlitch();
});

onUnmounted(() => {
  if (glitchTimeout) clearTimeout(glitchTimeout);
});
</script>

<template>
  <component
    :is="tag"
    class="glitch-text"
    :class="{
      'glitch-text--hover-only': glitchOnHover,
      'glitch-text--chromatic': chromatic,
      'glitch-text--active': isGlitching,
    }"
    :data-text="text"
  >
    <slot>{{ text }}</slot>
  </component>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.glitch-text {
  position: relative;
  display: inline-block;
  color: inherit;
  background: inherit;
  -webkit-background-clip: inherit;
  -webkit-text-fill-color: inherit;
  background-clip: inherit;

  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    pointer-events: none;
    -webkit-text-fill-color: initial;
  }

  &::before {
    color: $color-electric-cyan;
  }

  &::after {
    color: $color-mem-pink;
  }

  // 色収差モード（後ろに少しずらして重ねる）
  &--chromatic {
    &::before,
    &::after {
      opacity: 0.8;
      z-index: -1;
    }

    &::before {
      transform: translate(-3px, -2px);
    }

    &::after {
      transform: translate(3px, 2px);
    }
  }

  // アクティブグリッチ状態
  &--active {
    animation: text-shake 0.15s steps(2) infinite;

    &::before {
      opacity: 1 !important;
      transform: translate(-5px, -3px) !important;
    }

    &::after {
      opacity: 1 !important;
      transform: translate(5px, 3px) !important;
    }
  }

  // ホバー時のみ
  &--hover-only {
    &::before,
    &::after {
      opacity: 0;
      animation: none;
    }

    &:hover {
      &::before {
        opacity: 0.8;
        animation: glitch-intense-1 0.2s steps(2) infinite;
      }

      &::after {
        opacity: 0.8;
        animation: glitch-intense-2 0.2s steps(2) infinite;
      }
    }
  }
}

// 色収差アニメーション
@keyframes chromatic-cyan {
  0%, 100% {
    transform: translate(-2px, 0);
    opacity: 0.5;
  }
  25% {
    transform: translate(-3px, 1px);
    opacity: 0.7;
  }
  50% {
    transform: translate(-1px, 0);
    opacity: 0.4;
  }
  75% {
    transform: translate(-2px, -1px);
    opacity: 0.6;
  }
}

@keyframes chromatic-pink {
  0%, 100% {
    transform: translate(2px, 0);
    opacity: 0.5;
  }
  25% {
    transform: translate(3px, -1px);
    opacity: 0.7;
  }
  50% {
    transform: translate(1px, 0);
    opacity: 0.4;
  }
  75% {
    transform: translate(2px, 1px);
    opacity: 0.6;
  }
}

// 強烈なグリッチ
@keyframes glitch-intense-1 {
  0% {
    transform: translate(-5px, 2px);
    clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
  }
  25% {
    transform: translate(5px, -2px);
    clip-path: polygon(0 20%, 100% 20%, 100% 60%, 0 60%);
  }
  50% {
    transform: translate(-3px, 1px);
    clip-path: polygon(0 40%, 100% 40%, 100% 80%, 0 80%);
  }
  75% {
    transform: translate(3px, -1px);
    clip-path: polygon(0 10%, 100% 10%, 100% 50%, 0 50%);
  }
  100% {
    transform: translate(-5px, 2px);
    clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
  }
}

@keyframes glitch-intense-2 {
  0% {
    transform: translate(5px, -2px);
    clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
  }
  25% {
    transform: translate(-5px, 2px);
    clip-path: polygon(0 45%, 100% 45%, 100% 85%, 0 85%);
  }
  50% {
    transform: translate(3px, -1px);
    clip-path: polygon(0 25%, 100% 25%, 100% 65%, 0 65%);
  }
  75% {
    transform: translate(-3px, 1px);
    clip-path: polygon(0 55%, 100% 55%, 100% 95%, 0 95%);
  }
  100% {
    transform: translate(5px, -2px);
    clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
  }
}

@keyframes text-shake {
  0% { transform: translate(0) skewX(0); }
  25% { transform: translate(-2px, 1px) skewX(1deg); }
  50% { transform: translate(2px, -1px) skewX(-1deg); }
  75% { transform: translate(-1px, -1px) skewX(0.5deg); }
  100% { transform: translate(0) skewX(0); }
}
</style>
