<script setup lang="ts">
import { socialLinks } from '@/data/links';
import LinkButton from '@/components/ui/LinkButton.vue';
</script>

<template>
  <section id="links" class="links section">
    <div class="links__container container">
      <h2 class="links__heading">
        <span class="links__heading-en">Links</span>
        <span class="links__heading-jp">リンク</span>
      </h2>

      <div class="links__grid">
        <LinkButton
          v-for="link in socialLinks"
          :key="link.id"
          :link="link"
          class="links__item"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.links {
  background: linear-gradient(180deg, $color-soft-white 0%, rgba($color-mem-pink, 0.05) 50%, $color-soft-white 100%);
  position: relative;

  &__heading {
    text-align: center;
    margin-bottom: $spacing-3xl;

    &-en {
      display: block;
      font-family: $font-accent;
      font-size: clamp(40px, 8vw, 64px);
      font-weight: $font-weight-bold;
      background: linear-gradient(135deg, $color-neon-purple, $color-mem-pink);
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

  &__grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: $spacing-lg;
    max-width: 700px;
    margin: 0 auto;
  }

  &__item {
    min-width: 280px;
    flex: 1;
    max-width: 320px;
  }
}
</style>
