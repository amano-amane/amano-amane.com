<script setup lang="ts">
import FloatingDecorations from '@/components/ui/FloatingDecorations.vue';
import GlitchText from '@/components/ui/GlitchText.vue';
import { PhRocket } from '@phosphor-icons/vue';
</script>

<template>
  <section id="hero" class="hero">
    <div class="hero__background">
      <div class="hero__grid" />
      <div class="hero__gradient" />
      <FloatingDecorations variant="hero" density="high" />
    </div>

    <div class="hero__container container">
      <div class="hero__content">
        <h1 class="hero__title">
          <span class="hero__title-line">遊び心を</span>
          <span class="hero__title-line2">
            <span class="hero__title-accent">世界に</span><GlitchText text="感染" tag="span" class="hero__title-glitch" /><span class="hero__title-accent hero__title-accent--reverse">させる！</span>
          </span>
        </h1>

        <p class="hero__name">
          <span class="hero__name-jp">天野あまね</span>
          <span class="hero__name-en">Amano Amane</span>
        </p>

        <div class="hero__cta">
          <a href="#works" class="hero__cta-primary">
            <span class="hero__cta-text">View Works</span>
            <span class="hero__cta-arrow">→</span>
          </a>
          <a href="#about" class="hero__cta-secondary">About Me</a>
        </div>
      </div>

      <div class="hero__visual">
        <div class="hero__avatar-wrapper">
          <div class="hero__avatar-ring hero__avatar-ring--outer" />
          <div class="hero__avatar-ring hero__avatar-ring--inner" />
          <div class="hero__avatar">
            <PhRocket class="hero__avatar-icon" weight="fill" />
          </div>
                  </div>
      </div>
    </div>

    <a href="#about" class="hero__scroll" aria-label="スクロール">
      <div class="hero__scroll-mouse">
        <div class="hero__scroll-wheel" />
      </div>
      <span class="hero__scroll-text">Scroll</span>
    </a>

    <div class="hero__bottom-line" />
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: $spacing-4xl 0;
  padding-top: calc($header-height + $spacing-3xl);
  overflow: hidden;
  background: $color-cyber-navy;

  &__background {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  &__grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba($color-electric-cyan, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba($color-electric-cyan, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  &__gradient {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 20% 50%, rgba($color-mem-pink, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 50%, rgba($color-electric-cyan, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 50% 100%, rgba($color-neon-purple, 0.1) 0%, transparent 50%);
  }

  &__container {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $spacing-3xl;
    align-items: center;

    @include mobile {
      grid-template-columns: 1fr;
      text-align: center;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: $spacing-lg;

    @include mobile {
      order: 2;
      align-items: center;
    }
  }

  &__badge {
    display: inline-flex;
    align-items: center;
    gap: $spacing-sm;
    padding: $spacing-xs $spacing-md;
    background: rgba($color-light-pink, 0.15);
    border: 1px solid rgba($color-light-pink, 0.4);
    border-radius: $radius-full;
    width: fit-content;
    margin-top: $spacing-lg;

    &-icon {
      width: 16px;
      height: 16px;
      color: $color-light-pink;
    }

    &-text {
      font-family: $font-accent;
      font-size: 12px;
      font-weight: $font-weight-medium;
      color: $color-light-pink;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
  }

  &__title {
    font-family: $font-heading;
    font-size: clamp(36px, 6vw, 56px);
    line-height: 1.3;
    margin: 0;
    color: $color-soft-white;

    &-line {
      display: block;
      background: linear-gradient(90deg, $color-light-pink, $color-cyber-yellow);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    &-line2 {
      display: block;
      white-space: nowrap;
    }

    &-accent {
      background: linear-gradient(90deg, $color-light-pink, $color-cyber-yellow);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;

      &--reverse {
        background: linear-gradient(90deg, $color-cyber-yellow, $color-light-pink);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    }

    &-glitch {
      color: $color-cyber-yellow;
      -webkit-text-fill-color: $color-cyber-yellow;
    }
  }

  &__name {
    display: flex;
    flex-direction: column;
    gap: $spacing-xs;
    margin-top: $spacing-xl;

    @include mobile {
      align-items: center;
    }

    &-jp {
      font-family: $font-heading;
      font-size: 40px;
      font-weight: $font-weight-bold;
      color: $color-soft-white;
    }

    &-en {
      font-family: $font-accent;
      font-size: 16px;
      color: $color-light;
      letter-spacing: 0.15em;
    }
  }

  &__cta {
    display: flex;
    gap: $spacing-md;
    margin-top: $spacing-xl;

    @include mobile {
      flex-direction: column;
      width: 100%;
      max-width: 280px;
    }

    &-primary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: $spacing-sm;
      padding: $spacing-md $spacing-xl;
      background: linear-gradient(135deg, $color-mem-pink, $color-neon-purple);
      color: white;
      font-family: $font-accent;
      font-size: 14px;
      font-weight: $font-weight-medium;
      text-decoration: none;
      border-radius: $radius-md;
      transition: all $transition-base;
      box-shadow: 0 4px 20px rgba($color-mem-pink, 0.4);
      position: relative;
      overflow: hidden;
      white-space: nowrap;

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, transparent, rgba(white, 0.2), transparent);
        transform: translateX(-100%);
        transition: transform 0.5s;
      }

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 30px rgba($color-mem-pink, 0.5);
        color: white;

        &::before {
          transform: translateX(100%);
        }

        .hero__cta-arrow {
          transform: translateX(4px);
        }
      }
    }

    &-arrow {
      transition: transform $transition-fast;
    }

    &-secondary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: $spacing-md $spacing-xl;
      background: transparent;
      color: $color-electric-cyan;
      font-family: $font-accent;
      font-size: 14px;
      font-weight: $font-weight-medium;
      text-decoration: none;
      border: 2px solid $color-electric-cyan;
      border-radius: $radius-md;
      transition: all $transition-base;

      &:hover {
        background: rgba($color-electric-cyan, 0.1);
        box-shadow: 0 0 20px rgba($color-electric-cyan, 0.3);
        color: $color-electric-cyan;
      }
    }
  }

  &__visual {
    display: flex;
    justify-content: center;
    align-items: center;

    @include mobile {
      order: 1;
    }
  }

  &__avatar-wrapper {
    position: relative;
    width: 320px;
    height: 320px;

    @include mobile {
      width: 240px;
      height: 240px;
    }
  }

  &__avatar-ring {
    position: absolute;
    border-radius: 50%;
    border: 2px solid;

    &--outer {
      inset: 0;
      border-color: rgba($color-mem-pink, 0.3);
      animation: rotate 20s linear infinite;
      border-style: dashed;
    }

    &--inner {
      inset: 20px;
      border-color: rgba($color-electric-cyan, 0.3);
      animation: rotate 15s linear infinite reverse;
      border-style: dashed;
    }
  }

  &__avatar {
    position: absolute;
    inset: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, $color-mem-pink, $color-neon-purple);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow:
      0 0 40px rgba($color-mem-pink, 0.4),
      inset 0 0 40px rgba(white, 0.1);
    z-index: 2;
    cursor: pointer;
    transition: all $transition-fast;

    // RGBスプリット用の疑似要素
    &::before,
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: inherit;
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: none;
    }

    &::before {
      background: $color-electric-cyan;
      mix-blend-mode: screen;
    }

    &::after {
      background: $color-mem-pink;
      mix-blend-mode: screen;
    }

    &:hover {
      &::before {
        opacity: 0.4;
        transform: translate(-6px, -3px);
      }

      &::after {
        opacity: 0.4;
        transform: translate(6px, 3px);
      }
    }

    &-icon {
      width: 80px;
      height: 80px;
      color: white;
      filter: drop-shadow(0 0 20px rgba(white, 0.5));
      position: relative;
      z-index: 1;

      @include mobile {
        width: 60px;
        height: 60px;
      }
    }
  }

  
  &__scroll {
    position: absolute;
    bottom: $spacing-xl;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $spacing-sm;
    text-decoration: none;
    color: $color-medium;
    transition: color $transition-fast;
    z-index: 1;

    @include mobile {
      display: none;
    }

    &:hover {
      color: $color-electric-cyan;
    }

    &-mouse {
      width: 24px;
      height: 36px;
      border: 2px solid currentColor;
      border-radius: 12px;
      position: relative;
    }

    &-wheel {
      position: absolute;
      top: 6px;
      left: 50%;
      width: 4px;
      height: 6px;
      background: currentColor;
      border-radius: 2px;
      transform: translateX(-50%);
      animation: scroll-wheel 2s ease-in-out infinite;
    }

    &-text {
      font-family: $font-accent;
      font-size: 10px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
    }
  }

  &__bottom-line {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, $color-mem-pink, $color-electric-cyan, transparent);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}


@keyframes scroll-wheel {
  0%, 100% {
    opacity: 1;
    transform: translateX(-50%) translateY(-2px);
  }
  50% {
    opacity: 0.3;
    transform: translateX(-50%) translateY(6px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__avatar-ring,
  .hero__scroll-wheel {
    animation: none;
  }
}
</style>
