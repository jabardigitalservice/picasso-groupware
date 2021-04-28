<template>
  <div class="workhour-progress-bar">
    <div class="workhour-progress-bar__desc">
      <span class="mr-2">Jam kerja kamu bulan ini:</span>
      <i
        v-if="isLoading"
        aria-hidden="true"
        class="inline-block w-8 h-2 rounded-full bg-shimmering">
      </i>
      <span v-else>
        <strong>{{ hours }}</strong> jam
      </span>
    </div>
    <div
      aria-hidden="true"
      :class="{
        'workhour-progress-bar__bar': true,
        'is-loading bg-shimmering': isLoading
      }">
      <div
        v-show="!isLoading"
        aria-hidden="true"
        class="workhour-progress-bar__bar-inner"
        :style="{ width: `${progress * 100}%` }">
      </div>
      <span
        v-show="!isLoading"
        class="workhour-progress-bar__bar-count">
        {{ hours }} JAM
      </span>
      <i
        aria-hidden="true"
        class="absolute right-0 far fa-clock mr-2 text-white">
      </i>
    </div>
    <p class="workhour-progress-bar__hint">
      Batas minimum jam kerja 170 jam/bulan
    </p>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean
    },
    hours: {
      type: Number
    }
  },
  data () {
    return {
      expectedHoursCount: 170
    }
  },
  computed: {
    progress () {
      if (typeof this.hours === 'number') {
        return Math.min(1, this.hours / this.expectedHoursCount)
      }
      return 0
    }
  }
}
</script>

<style lang="scss" scoped>
.workhour-progress-bar {
  &__desc {
    @apply mb-2 inline-flex flex-wrap justify-start items-center
    text-sm text-blue-600;
  }

  &__bar {
    z-index: 0;
    @apply relative overflow-hidden
    flex flex-row flex-no-wrap
    justify-start items-center
    h-12
    rounded
    bg-gray-200;

    &.is-loading {
      @apply bg-gray-300;
    }
  }

  &__bar-inner {
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAR0lEQVQoU2P0WR/wn4EA2CLJzMBISCFIkc/zv/gVwhSBLMRpIrIinArRFWFViE0RhkJcilAU4lMEV0hIEVghw4ng/6BwIgQAZewxv5repfoAAAAASUVORK5CYII=);
    @apply absolute;

    &::after {
      content: '';
      background: linear-gradient(to right, rgba(255,255,255, 0), rgba(255,255,255, 0.5));
      z-index: 1;
      @apply absolute inset-0;
    }
  }

  &__bar-count {
    z-index: 1;
    @apply relative px-4 py-2
    text-lg font-bold text-gray-700;
  }

  &__hint {
    @apply mt-1 text-xs text-gray-600;
  }
}
</style>
