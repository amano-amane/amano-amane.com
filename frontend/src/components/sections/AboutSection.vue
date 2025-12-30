<script setup lang="ts">
import SectionDivider from '@/components/ui/SectionDivider.vue';
import { PhPaintBrush, PhSparkle, PhFlag } from '@phosphor-icons/vue';
</script>

<template>
  <section id="about" class="about section">
    <SectionDivider variant="wave" flip :color="'#FAFAFF'" />

    <div class="about__container container">
      <h2 class="about__heading">
        <span class="about__heading-en">About</span>
        <span class="about__heading-jp">私について</span>
      </h2>

      <div class="about__content">
        <div class="about__image">
          <div class="about__avatar">
            <div class="about__avatar-inner">
              <PhPaintBrush class="about__avatar-icon" weight="duotone" />
            </div>
            <div class="about__avatar-decoration about__avatar-decoration--1" />
            <div class="about__avatar-decoration about__avatar-decoration--2" />
          </div>
        </div>

        <div class="about__text">
          <div class="about__profile">
            <h3 class="about__name">天野あまね</h3>
            <p class="about__role">
              <PhSparkle class="about__role-icon" weight="fill" />
              インディーゲームクリエイター
            </p>
          </div>

          <div class="about__bio">
            <p>ゲームを創っています。</p>
            <p>
              プログラミングもイラストも、全部一人でやる<strong>「個人開発」</strong>が好きです。
            </p>
            <p>2026年、最初のゲームをリリース予定。</p>
          </div>

          <div class="about__vision">
            <div class="about__vision-header">
              <PhFlag class="about__vision-icon" weight="duotone" />
              <span class="about__vision-label">Vision</span>
            </div>
            <p class="about__vision-text">
              個人でゲームを創って生きていく
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.about {
  background: $color-soft-white;
  position: relative;
  padding-top: $spacing-4xl + 60px;

  &__heading {
    text-align: center;
    margin-bottom: $spacing-3xl;

    &-en {
      display: block;
      font-family: $font-accent;
      font-size: clamp(40px, 8vw, 64px);
      font-weight: $font-weight-bold;
      background: linear-gradient(135deg, $color-mem-pink, $color-neon-purple);
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

  &__content {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: $spacing-3xl;
    align-items: start;
    max-width: 900px;
    margin: 0 auto;

    @include mobile {
      grid-template-columns: 1fr;
      gap: $spacing-xl;
    }
  }

  &__image {
    @include mobile {
      display: flex;
      justify-content: center;
    }
  }

  &__avatar {
    position: relative;
    width: 200px;
    height: 200px;

    @include mobile {
      width: 160px;
      height: 160px;
    }

    &-inner {
      position: absolute;
      inset: 20px;
      border-radius: $radius-lg;
      background: linear-gradient(135deg, rgba($color-electric-cyan, 0.1), rgba($color-mem-pink, 0.1));
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid rgba($color-electric-cyan, 0.2);
    }

    &-icon {
      width: 64px;
      height: 64px;
      color: $color-electric-cyan;
      filter: drop-shadow(0 0 10px rgba($color-electric-cyan, 0.5));

      @include mobile {
        width: 48px;
        height: 48px;
      }
    }

    &-decoration {
      position: absolute;
      border-radius: $radius-md;
      border: 2px dashed;

      &--1 {
        inset: 0;
        border-color: rgba($color-mem-pink, 0.3);
        animation: decoration-rotate 20s linear infinite;
      }

      &--2 {
        inset: 10px;
        border-color: rgba($color-electric-cyan, 0.3);
        animation: decoration-rotate 15s linear infinite reverse;
      }
    }
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: $spacing-xl;

    @include mobile {
      text-align: center;
    }
  }

  &__profile {
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;

    @include mobile {
      align-items: center;
    }
  }

  &__name {
    font-family: $font-heading;
    font-size: 28px;
    font-weight: $font-weight-bold;
    margin: 0;
    color: $color-cyber-navy;

    @include mobile {
      font-size: 24px;
    }
  }

  &__role {
    display: inline-flex;
    align-items: center;
    gap: $spacing-xs;
    font-family: $font-heading;
    font-size: $font-size-body;
    color: $color-mem-pink;
    margin: 0;

    &-icon {
      width: 16px;
      height: 16px;
      color: $color-mem-pink;
    }
  }

  &__bio {
    p {
      color: $color-dark;
      line-height: 1.9;
      margin-bottom: $spacing-sm;

      &:last-child {
        margin-bottom: 0;
      }

      strong {
        color: $color-cyber-navy;
        background: linear-gradient(transparent 60%, rgba($color-electric-cyan, 0.2) 60%);
      }
    }
  }

  &__vision {
    padding: $spacing-lg;
    background: $color-cyber-navy;
    border-radius: $radius-lg;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, $color-mem-pink, $color-electric-cyan);
    }

    @include mobile {
      text-align: left;
    }

    &-header {
      display: flex;
      align-items: center;
      gap: $spacing-sm;
      margin-bottom: $spacing-sm;
    }

    &-icon {
      width: 18px;
      height: 18px;
      color: $color-electric-cyan;
    }

    &-label {
      font-family: $font-accent;
      font-size: 12px;
      color: $color-electric-cyan;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    &-text {
      font-family: $font-heading;
      font-size: 18px;
      font-weight: $font-weight-medium;
      color: $color-soft-white;
      margin: 0;
    }
  }
}

@keyframes decoration-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
