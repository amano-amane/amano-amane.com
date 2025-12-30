<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'wave' | 'slant' | 'curve' | 'zigzag';
  flip?: boolean;
  color?: string;
}>(), {
  variant: 'wave',
  flip: false,
  color: '#FAFAFF',
});
</script>

<template>
  <div
    class="section-divider"
    :class="[
      `section-divider--${variant}`,
      { 'section-divider--flip': flip }
    ]"
    :style="{ '--divider-color': color }"
  >
    <svg
      v-if="variant === 'wave'"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      class="section-divider__svg"
    >
      <path
        d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z"
        :fill="color"
      />
    </svg>
    <svg
      v-else-if="variant === 'curve'"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      class="section-divider__svg"
    >
      <path
        d="M0,80 Q720,160 1440,80 L1440,120 L0,120 Z"
        :fill="color"
      />
    </svg>
    <svg
      v-else-if="variant === 'slant'"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      class="section-divider__svg"
    >
      <polygon
        points="0,120 1440,40 1440,120"
        :fill="color"
      />
    </svg>
    <svg
      v-else-if="variant === 'zigzag'"
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      class="section-divider__svg"
    >
      <polygon
        points="0,60 80,20 160,60 240,20 320,60 400,20 480,60 560,20 640,60 720,20 800,60 880,20 960,60 1040,20 1120,60 1200,20 1280,60 1360,20 1440,60 1440,60 0,60"
        :fill="color"
      />
    </svg>
  </div>
</template>

<style scoped lang="scss">
.section-divider {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  line-height: 0;
  overflow: hidden;

  &--flip {
    bottom: auto;
    top: 0;
    transform: rotate(180deg);
  }

  &__svg {
    display: block;
    width: 100%;
    height: 60px;

    @media (min-width: 768px) {
      height: 80px;
    }

    @media (min-width: 1024px) {
      height: 120px;
    }
  }
}
</style>
