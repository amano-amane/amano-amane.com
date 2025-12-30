<script setup lang="ts">
import { ref, computed } from 'vue';
import { PhPaperPlaneTilt, PhXLogo, PhClipboard, PhCheck } from '@phosphor-icons/vue';
import { contactConfig } from '@/data/contact';

type CopyState = 'idle' | 'success' | 'error';
const copyState = ref<CopyState>('idle');

const mailtoUrl = computed(() => {
  return `mailto:${contactConfig.email}`;
});

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(contactConfig.email);
    copyState.value = 'success';
    setTimeout(() => {
      copyState.value = 'idle';
    }, 2000);
  } catch {
    // Fallback for older browsers
    try {
      const textArea = document.createElement('textarea');
      textArea.value = contactConfig.email;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      copyState.value = 'success';
      setTimeout(() => {
        copyState.value = 'idle';
      }, 2000);
    } catch {
      copyState.value = 'error';
      setTimeout(() => {
        copyState.value = 'idle';
      }, 2000);
    }
  }
};

const copyButtonText = computed(() => {
  switch (copyState.value) {
    case 'success':
      return 'コピーしました！';
    case 'error':
      return 'コピーできませんでした';
    default:
      return 'メールアドレスをコピー';
  }
});
</script>

<template>
  <section id="contact" class="contact section">
    <div class="contact__background">
      <div class="contact__gradient" />
    </div>

    <div class="contact__container container">
      <h2 class="contact__heading">
        <span class="contact__heading-en">Contact</span>
        <span class="contact__heading-jp">お問い合わせ</span>
      </h2>

      <div class="contact__content">
        <div class="contact__card">
          <PhPaperPlaneTilt class="contact__icon" weight="duotone" />
          <p class="contact__description">
            お仕事のご相談はお気軽にどうぞ。<br />
            返信にお時間をいただく場合があります。
          </p>

          <a :href="mailtoUrl" class="contact__button contact__button--primary">
            <span class="contact__button-text">メールを送る</span>
            <span class="contact__button-arrow">→</span>
          </a>

          <button
            type="button"
            class="contact__button contact__button--secondary"
            :class="{
              'contact__button--success': copyState === 'success',
              'contact__button--error': copyState === 'error',
            }"
            :aria-label="copyButtonText"
            @click="copyEmail"
          >
            <PhCheck v-if="copyState === 'success'" class="contact__button-icon" weight="bold" />
            <PhClipboard v-else class="contact__button-icon" weight="regular" />
            <span class="contact__button-text">{{ copyButtonText }}</span>
          </button>

          <div class="contact__divider">
            <span>or</span>
          </div>

          <p class="contact__alternative">
            <a
              v-if="contactConfig.twitterUrl"
              :href="contactConfig.twitterUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="contact__link"
            >
              <PhXLogo class="contact__link-icon" weight="bold" />
              <span>の DM</span>
            </a>
            <span v-else class="contact__link contact__link--disabled">
              <PhXLogo class="contact__link-icon" weight="bold" />
              <span>の DM</span>
            </span>
            でも受け付けています
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.contact {
  background: $color-cyber-navy;
  position: relative;
  overflow: hidden;

  &__background {
    position: absolute;
    inset: 0;
  }

  &__gradient {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 50% 0%, rgba($color-mem-pink, 0.15) 0%, transparent 60%),
      radial-gradient(ellipse at 50% 100%, rgba($color-electric-cyan, 0.1) 0%, transparent 60%);
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
      background: linear-gradient(135deg, $color-electric-cyan, $color-glitch-green);
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
    display: flex;
    justify-content: center;
  }

  &__card {
    max-width: 480px;
    width: 100%;
    padding: $spacing-2xl;
    background: rgba($color-soft-white, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba($color-soft-white, 0.1);
    border-radius: $radius-lg;
    text-align: center;

    @include mobile {
      padding: $spacing-xl;
    }
  }

  &__icon {
    width: 48px;
    height: 48px;
    color: $color-electric-cyan;
    margin-bottom: $spacing-lg;
    filter: drop-shadow(0 0 15px rgba($color-electric-cyan, 0.5));
  }

  &__description {
    color: rgba($color-soft-white, 0.8);
    font-size: $font-size-body;
    line-height: 1.8;
    margin: 0 0 $spacing-xl;
  }

  &__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-sm;
    width: 100%;
    padding: $spacing-md $spacing-xl;
    font-family: $font-heading;
    font-size: $font-size-body;
    font-weight: $font-weight-medium;
    text-decoration: none;
    border-radius: $radius-md;
    transition: all $transition-base;
    cursor: pointer;

    &--primary {
      background: linear-gradient(135deg, $color-mem-pink, $color-neon-purple);
      color: white;
      border: none;
      box-shadow: 0 4px 20px rgba($color-mem-pink, 0.3);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 30px rgba($color-mem-pink, 0.4);
        color: white;

        .contact__button-arrow {
          transform: translateX(4px);
        }
      }
    }

    &--secondary {
      background: transparent;
      color: rgba($color-soft-white, 0.8);
      border: 1px solid rgba($color-soft-white, 0.2);
      margin-top: $spacing-md;

      &:hover {
        border-color: rgba($color-soft-white, 0.4);
        color: $color-soft-white;
      }
    }

    &--success {
      border-color: $color-glitch-green;
      color: $color-glitch-green;

      &:hover {
        border-color: $color-glitch-green;
        color: $color-glitch-green;
      }
    }

    &--error {
      border-color: $color-mem-pink;
      color: $color-mem-pink;

      &:hover {
        border-color: $color-mem-pink;
        color: $color-mem-pink;
      }
    }

    &-arrow {
      transition: transform $transition-fast;
    }

    &-icon {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
    }
  }

  &__divider {
    display: flex;
    align-items: center;
    gap: $spacing-md;
    margin: $spacing-xl 0;
    color: $color-medium;
    font-size: $font-size-small;

    &::before,
    &::after {
      content: '';
      flex: 1;
      height: 1px;
      background: rgba($color-soft-white, 0.1);
    }
  }

  &__alternative {
    color: rgba($color-soft-white, 0.7);
    font-size: $font-size-body;
    line-height: 1.5;
    margin: 0;
  }

  &__link {
    display: inline;
    color: $color-electric-cyan;
    text-decoration: none;
    transition: color $transition-fast;

    &-icon {
      display: inline;
      width: 1em;
      height: 1em;
      vertical-align: -0.1em;
      margin-right: $spacing-xs;
    }

    &:hover {
      color: $color-mem-pink;
    }

    &--disabled {
      color: $color-medium;
      cursor: not-allowed;

      &:hover {
        color: $color-medium;
      }
    }

  }
}
</style>
