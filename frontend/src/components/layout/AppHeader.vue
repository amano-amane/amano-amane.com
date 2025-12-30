<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { navItems } from '@/data/navigation';

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header class="header" :class="{ 'header--scrolled': isScrolled }">
    <div class="header__container container">
      <a href="#hero" class="header__logo" @click="closeMobileMenu">
        <span class="header__logo-text">天野あまね</span>
        <span class="header__logo-sub">Amano Amane</span>
      </a>

      <button
        class="header__hamburger"
        :class="{ 'header__hamburger--open': isMobileMenuOpen }"
        @click="toggleMobileMenu"
        aria-label="メニュー"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav class="header__nav" :class="{ 'header__nav--open': isMobileMenuOpen }">
        <ul class="header__nav-list">
          <li v-for="item in navItems" :key="item.id" class="header__nav-item">
            <a
              :href="item.href"
              class="header__nav-link"
              @click="closeMobileMenu"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: $header-height;
  z-index: 1000;
  background: rgba($color-soft-white, 0.95);
  backdrop-filter: blur(10px);

  &--scrolled {
    box-shadow: $shadow-md;
  }

  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  &__logo {
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: $spacing-sm;

    &-text {
      font-family: $font-heading;
      font-size: 20px;
      font-weight: $font-weight-medium;
      color: $color-cyber-navy;
      transition: color $transition-fast;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    &-sub {
      font-family: $font-accent;
      font-size: 10px;
      color: $color-medium;
      letter-spacing: 0.05em;
      transition: color $transition-fast;
      transform: translateY(5px);
    }

    &:hover {
      .header__logo-text,
      .header__logo-sub {
        color: $color-mem-pink;
      }
    }
  }

  &__hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
    width: 32px;
    height: 32px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;

    @include mobile {
      display: flex;
    }

    span {
      display: block;
      width: 100%;
      height: 2px;
      background: $color-cyber-navy;
      transition: all $transition-fast;
    }

    &--open {
      span:nth-child(1) {
        transform: rotate(45deg) translate(6px, 6px);
      }
      span:nth-child(2) {
        opacity: 0;
      }
      span:nth-child(3) {
        transform: rotate(-45deg) translate(6px, -6px);
      }
    }
  }

  &__nav {
    @include mobile {
      position: absolute;
      top: $header-height;
      left: 0;
      right: 0;
      background: rgba($color-soft-white, 0.98);
      backdrop-filter: blur(10px);
      padding: $spacing-lg;
      transform: translateY(-100%);
      opacity: 0;
      visibility: hidden;
      transition: all $transition-base;
      box-shadow: $shadow-lg;

      &--open {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }
    }

    &-list {
      display: flex;
      gap: $spacing-xl;
      list-style: none;

      @include mobile {
        flex-direction: column;
        gap: $spacing-md;
      }
    }

    &-link {
      font-family: $font-accent;
      font-size: $font-size-small;
      font-weight: $font-weight-medium;
      color: $color-cyber-navy;
      text-decoration: none;
      letter-spacing: 0.05em;
      transition: color $transition-fast;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 0;
        height: 2px;
        background: linear-gradient(90deg, $color-mem-pink, $color-electric-cyan);
        transition: width $transition-fast;
      }

      &:hover {
        color: $color-mem-pink;

        &::after {
          width: 100%;
        }
      }

      @include mobile {
        display: block;
        padding: $spacing-sm 0;
        font-size: $font-size-body;
      }
    }
  }
}
</style>
