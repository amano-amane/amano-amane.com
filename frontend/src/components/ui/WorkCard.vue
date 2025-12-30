<script setup lang="ts">
import type { Work } from '@/types';
import { workCategoryLabels, workStatusLabels } from '@/data/works';
import { PhGameController } from '@phosphor-icons/vue';

defineProps<{
  work: Work;
}>();
</script>

<template>
  <article class="work-card card">
    <div class="work-card__thumbnail">
      <img
        v-if="work.thumbnail"
        :src="work.thumbnail"
        :alt="work.title"
        class="work-card__image"
      />
      <div v-else class="work-card__placeholder">
        <PhGameController class="work-card__placeholder-icon" weight="duotone" />
      </div>
    </div>
    <div class="work-card__content">
      <div class="work-card__tags">
        <span class="work-card__category">{{ workCategoryLabels[work.category] }}</span>
        <span
          class="work-card__status"
          :class="`work-card__status--${work.status}`"
        >
          {{ workStatusLabels[work.status] }}
        </span>
      </div>
      <h3 class="work-card__title">{{ work.title }}</h3>
      <p class="work-card__description">{{ work.description }}</p>
      <div v-if="work.links && work.links.length > 0" class="work-card__links">
        <a
          v-for="link in work.links"
          :key="link.url"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="work-card__link btn btn--secondary"
        >
          {{ link.label || link.type }}
        </a>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.work-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0;

  &__thumbnail {
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background: linear-gradient(135deg, $color-cyber-navy, #0f1025);
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform $transition-base;

    .work-card:hover & {
      transform: scale(1.05);
    }
  }

  &__placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &-icon {
      width: 48px;
      height: 48px;
      color: rgba($color-electric-cyan, 0.5);
    }
  }

  &__content {
    padding: $spacing-lg;
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
    flex: 1;
  }

  &__tags {
    display: flex;
    gap: $spacing-sm;
    flex-wrap: wrap;
  }

  &__category {
    font-size: $font-size-small;
    font-weight: $font-weight-medium;
    color: $color-electric-cyan;
    background: rgba($color-electric-cyan, 0.1);
    padding: $spacing-xs $spacing-sm;
    border-radius: $radius-sm;
  }

  &__status {
    font-size: $font-size-small;
    font-weight: $font-weight-medium;
    padding: $spacing-xs $spacing-sm;
    border-radius: $radius-sm;

    &--released {
      color: $color-glitch-green;
      background: rgba($color-glitch-green, 0.1);
    }

    &--in-development {
      color: $color-mem-pink;
      background: rgba($color-mem-pink, 0.1);
    }

    &--planned {
      color: $color-medium;
      background: rgba($color-medium, 0.1);
    }
  }

  &__title {
    font-size: $font-size-h3;
    margin: $spacing-xs 0;

    @include mobile {
      font-size: $font-size-h3-mobile;
    }
  }

  &__description {
    color: $color-medium;
    font-size: $font-size-body;
    flex: 1;
  }

  &__links {
    display: flex;
    gap: $spacing-sm;
    margin-top: $spacing-md;
  }

  &__link {
    font-size: $font-size-small;
    padding: $spacing-xs $spacing-md;
  }
}
</style>
