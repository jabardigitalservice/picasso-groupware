<template>
  <div :class="{
    'card bg-white': true,
    'is-flat': $attrs.flat,
    'is-borderless': $attrs.borderless,
    'is-square': $attrs.square
  }">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.card {
  @apply p-4 rounded-lg
  border border-solid border-gray-300
  shadow;

  @screen md {
    @apply p-8;
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
