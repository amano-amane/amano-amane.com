<script setup lang="ts">
import { socialLinks } from '@/data/links';

const currentYear = new Date().getFullYear();
const activeLinks = socialLinks.filter(link => link.isActive);
</script>

<template>
  <footer class="footer">
    <div class="footer__container container">
      <div class="footer__social" v-if="activeLinks.length > 0">
        <a
          v-for="link in activeLinks"
          :key="link.id"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="footer__social-link"
          :aria-label="link.name"
        >
          <span class="footer__social-icon" :data-icon="link.icon">
            {{ link.icon === 'twitter' ? '𝕏' : link.icon.charAt(0).toUpperCase() }}
          </span>
        </a>
      </div>
      <p class="footer__copyright">
        &copy; {{ currentYear }} 天野あまね. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.footer {
  background: $color-cyber-navy;
  color: $color-soft-white;
  padding: $spacing-2xl 0;
  text-align: center;

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $spacing-lg;
  }

  &__social {
    display: flex;
    gap: $spacing-md;

    &-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: $radius-full;
      background: rgba($color-soft-white, 0.1);
      color: $color-soft-white;
      text-decoration: none;
      transition: all $transition-fast;

      &:hover {
        background: $color-mem-pink;
        transform: translateY(-2px);
      }
    }

    &-icon {
      font-size: 18px;
      font-weight: $font-weight-bold;
    }
  }

  &__copyright {
    font-size: $font-size-small;
    color: rgba($color-soft-white, 0.7);
    margin: 0;
  }
}
</style>
