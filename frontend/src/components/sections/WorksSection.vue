<script setup lang="ts">
import { works } from '@/data/works';
import WorkCard from '@/components/ui/WorkCard.vue';
import { PhRocketLaunch } from '@phosphor-icons/vue';
</script>

<template>
  <section id="works" class="works section">
    <div class="works__background">
      <div class="works__grid" />
    </div>

    <div class="works__container container">
      <h2 class="works__heading">
        <span class="works__heading-en">Works</span>
        <span class="works__heading-jp">作品</span>
      </h2>

      <div v-if="works.length > 0" class="works__grid-cards">
        <WorkCard
          v-for="work in works"
          :key="work.id"
          :work="work"
        />
      </div>

      <div v-else class="works__empty">
        <PhRocketLaunch class="works__empty-icon" weight="duotone" />
        <p class="works__empty-text">Coming Soon...</p>
        <p class="works__empty-sub">作品を準備中です</p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.works {
  background: linear-gradient(180deg, $color-soft-white 0%, rgba($color-cyber-navy, 0.03) 100%);
  position: relative;
  overflow: hidden;

  &__background {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  &__grid {
    position: absolute;
    inset: 0;
    background-image:
      radial-gradient(circle at 1px 1px, rgba($color-mem-pink, 0.1) 1px, transparent 1px);
    background-size: 40px 40px;
    opacity: 0.5;
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
      background: linear-gradient(135deg, $color-electric-cyan, $color-neon-purple);
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

  &__grid-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: $spacing-xl;

    @include mobile {
      grid-template-columns: 1fr;
    }
  }

  &__empty {
    text-align: center;
    padding: $spacing-4xl $spacing-lg;
    background: white;
    border-radius: $radius-lg;
    box-shadow: $shadow-md;
    max-width: 400px;
    margin: 0 auto;

    &-icon {
      width: 64px;
      height: 64px;
      color: $color-electric-cyan;
      margin-bottom: $spacing-lg;
      animation: bounce 2s ease-in-out infinite;
      filter: drop-shadow(0 0 15px rgba($color-electric-cyan, 0.5));
    }

    &-text {
      font-family: $font-accent;
      font-size: $font-size-h3;
      color: $color-cyber-navy;
      margin: 0 0 $spacing-xs;
    }

    &-sub {
      font-size: $font-size-body;
      color: $color-medium;
      margin: 0;
    }
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
