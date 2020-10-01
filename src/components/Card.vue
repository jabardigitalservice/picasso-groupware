<template>
  <div :class="['card bg-white', attrsToClassList]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  computed: {
    attrsToClassList () {
      const attrs = [
        'paddingless',
        'flat',
        'borderless',
        'square'
      ]
      return attrs.filter((attr) => attr in this.$attrs)
        .map((attr) => `is-${attr}`)
        .join(' ')
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  @apply p-4 rounded-lg
  border border-solid border-gray-300
  shadow;

  @screen md {
    @apply p-8;
  }

  &.is-paddingless {
    @apply p-0;
  }

  &.is-flat {
    @apply shadow-none;
  }

  &.is-borderless {
    @apply border-none;
  }

  &.is-square {
    @apply rounded-none;
  }
}
</style>
